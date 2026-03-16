document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const seasonSelect = document.getElementById('season');
    const categorySelect = document.getElementById('categoryId');
    const clubIdInput = document.getElementById('clubId');
    const searchBtn = document.getElementById('searchBtn');
    // const testBtn = document.getElementById('testBtn'); // Removed
    const exportBtn = document.getElementById('exportBtn'); // New Button
    const exportTxtBtn = document.getElementById('exportTxtBtn'); // New Button
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsBody = document.getElementById('resultsBody');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    const statusMsg = document.getElementById('statusMsg');
    const playerCountSpan = document.getElementById('playerCount');

    // State
    const BASE_URL = 'https://escacs.cat/index.php/component/fce';
    const API_URL = 'https://escacs.cat/components/com_fce/gmvw20/conn/serveisLliga.php';

    // List of CORS proxies to try in order
    const CORS_PROXIES = [
        { url: 'https://api.codetabs.com/v1/proxy?quest=', encode: true, jsonWrapper: false },
        { url: 'https://cors.eu.org/', encode: false, jsonWrapper: false },
        { url: 'https://api.allorigins.win/get?url=', encode: true, jsonWrapper: true }
    ];

    let currentProxyIndex = Math.floor(Math.random() * CORS_PROXIES.length);

    const KNOWN_CLUB_CODES = {
        "SANT MARTI": "SMA",
        "SANT ADRIA": "SAD",
        "MOLLET": "MOL",
        "VILAFRANCA": "VIL",
        "BARCELONA": "BCN",
        "SABADELL": "SAB",
        "TERRASSA": "TER",
        "MATARO": "MAT",
        "BADALONA": "BAD",
        "GERUNDA": "GER",
        "LLEIDA": "LLE",
        "TARRAGONA": "TAR"
    };

    // Init Logic
    populateClubSelect();
    // Default to current season or 2026 if not set
    if (!seasonSelect.value) seasonSelect.value = "2026";
    populateCategorySelect(seasonSelect.value);

    // Event Listeners
    // Event Listeners
    searchBtn.addEventListener('click', handleSearch);
    seasonSelect.addEventListener('change', (e) => {
        populateCategorySelect(e.target.value);
        // Reset and show all clubs when season changes until category is picked
        populateClubSelect();
    });

    categorySelect.addEventListener('change', (e) => {
        const groupId = e.target.value;
        if (groupId) {
            filterClubsByGroup(seasonSelect.value, groupId);
        } else {
            populateClubSelect(); // Reset to all
        }
    });

    // Export Listeners
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const clubName = clubIdInput.options[clubIdInput.selectedIndex]?.text || "Club";
            const season = seasonSelect.value;
            exportTableToExcel('resultsTableBody', `Resultados_${clubName}_${season}`);
        });
    }

    async function filterClubsByGroup(season, groupId) {
        // Show loading state in club select
        clubIdInput.innerHTML = '<option value="">Cargando clubs...</option>';
        clubIdInput.disabled = true;

        try {
            const targetUrl = `${API_URL}?task=calendari&idTemp=${season}&idGrup=${groupId}`;
            const data = await fetchData(targetUrl);

            if (!Array.isArray(data)) throw new Error("Invalid calendar data");

            // Extract unique team names from matches
            const teamNames = new Set();
            data.forEach(round => {
                if (round.partides) {
                    round.partides.forEach(match => {
                        // match: [Local, Result, Visitor, Id]
                        // names are at 0 and 2
                        if (match[0]) teamNames.add(normalizeTeamName(match[0]));
                        if (match[2]) teamNames.add(normalizeTeamName(match[2]));
                    });
                }
            });

            // Filter CLUBS
            const filteredClubs = CLUBS.filter(club => {
                const cleanClubName = normalizeTeamName(club.name);

                for (const team of teamNames) {
                    // Strategy: Exact match OR one starts with the other followed by space
                    // This avoids "PENYA MOLLET" matching "MOLLET"
                    if (cleanClubName === team ||
                        cleanClubName.startsWith(team + ' ') ||
                        team.startsWith(cleanClubName + ' ')) {
                        return true;
                    }
                }
                return false;
            });

            // Sort filtered clubs
            filteredClubs.sort((a, b) => a.name.localeCompare(b.name));

            // Repopulate Dropdown
            clubIdInput.innerHTML = '<option value="">Selecciona un club (Filtrado)</option>';
            // Add option to show all if needed
            const showAllOpt = document.createElement('option');
            showAllOpt.value = "ALL";
            showAllOpt.textContent = "--- Ver todos los clubs ---";
            clubIdInput.appendChild(showAllOpt);

            filteredClubs.forEach(club => {
                const option = document.createElement('option');
                option.value = club.id;
                option.textContent = `${club.name} (${club.id})`;
                clubIdInput.appendChild(option);
            });

            // Add listener to handle "ALL" selection
            clubIdInput.addEventListener('change', function handler(e) {
                if (e.target.value === "ALL") {
                    populateClubSelect();
                    clubIdInput.value = ""; // Reset value
                    clubIdInput.removeEventListener('change', handler);
                }
            });

        } catch (error) {
            console.error("Error filtering clubs:", error);
            // Fallback to all clubs
            populateClubSelect();
        } finally {
            clubIdInput.disabled = false;
        }
    }

    function normalizeTeamName(name) {
        if (!name) return "";
        return name.toLowerCase()
            .replace(/[.,]/g, '') // remove punctuation
            .replace(/\s+/g, ' ') // normalize spaces
            // remove common club prefixes/suffixes (C.E., P.E., A.E., etc)
            .replace(/\b(c\.?e\.?|c\.?a\.?|c\.?p\.?|c\.?c\.?|u\.?e\.?|a\.?e\.?|p\.?e\.?|s\.?c\.?r\.?|e\.?c\.?)\b/gi, '')
            .replace(/\bclub\b/g, '')
            .replace(/\bescacs\b/g, '')
            .replace(/\bassociaci[oó]\b/g, '')
            .replace(/\bce\b/g, '')
            // Remove team letters " B", " C", " D" at end
            .replace(/\s+[b-z]$/i, '')
            .trim();
    }

    function getClubAbbreviation(name) {
        const clean = normalizeTeamName(name).toUpperCase();

        // 1. Check Manual Mapping
        if (KNOWN_CLUB_CODES[clean]) return KNOWN_CLUB_CODES[clean];

        // Search for partial match in mapping
        for (const [fullName, code] of Object.entries(KNOWN_CLUB_CODES)) {
            if (clean.includes(fullName)) return code;
        }

        // 2. Heuristic: "SANT FRUITOS" -> "SFR", "SANT MARTI" -> "SMA"
        if (clean.startsWith("SANT ") || clean.startsWith("SANTA ")) {
            const parts = clean.split(' ');
            if (parts.length > 1) {
                const secondWord = parts[1];
                return ("S" + secondWord.substring(0, 2)).toUpperCase();
            }
        }

        // 3. Fallback: First 3 letters of first significant word
        const words = clean.split(' ').filter(w => w.length > 2);
        if (words.length > 0) {
            return words[0].substring(0, 3).toUpperCase();
        }

        return clean.substring(0, 3).toUpperCase();
    }

    if (exportTxtBtn) {
        exportTxtBtn.addEventListener('click', () => {
            const clubName = clubIdInput.options[clubIdInput.selectedIndex]?.text || "Club";
            const season = seasonSelect.value;
            exportTableToTXT(`Resultados_${clubName}_${season}`);
        });
    }

    function exportTableToTXT(filename = '') {
        const table = document.querySelector('#resultsContainer table');
        if (!table) {
            showStatus("Error: No hay datos para exportar", "error");
            return;
        }

        const categoryTitle = document.getElementById('resultsTitle')?.textContent || "Resultados";
        let txtContent = categoryTitle + "\n\n";

        // Headers
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
        txtContent += headers.join('\t') + "\n";

        // Rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
            txtContent += cells.join('\t') + "\n";
        });

        const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");

        downloadLink.href = url;
        downloadLink.download = filename ? `${filename}.txt` : 'resultados.txt';

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    // exportTableToExcel moved to the end of the file to avoid duplication

    async function fetchData(targetUrl) {
        let lastError;
        let triedProxies = [];

        // Build a fresh proxy list starting from the current index
        const proxiesToTry = [];
        for (let i = 0; i < CORS_PROXIES.length; i++) {
            proxiesToTry.push(CORS_PROXIES[(currentProxyIndex + i) % CORS_PROXIES.length]);
        }

        // Advance the proxy index for the next call
        currentProxyIndex = (currentProxyIndex + 1) % CORS_PROXIES.length;

        for (const proxy of proxiesToTry) {
            try {
                triedProxies.push(proxy.url);

                // Add a timeout of 7 seconds to each proxy request
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 7000);

                const fetchUrl = proxy.url + (proxy.encode ? encodeURIComponent(targetUrl) : targetUrl);
                const response = await fetch(fetchUrl, {
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`Status ${response.status}`);
                }

                let data = await response.json();

                // If proxy wraps the response in a JSON object with a .contents string
                if (proxy.jsonWrapper && data && data.contents) {
                    try {
                        data = JSON.parse(data.contents);
                    } catch (err) {
                        throw new Error("Invalid format in proxy contents");
                    }
                }

                // Some proxies might return 200 OK but with an object containing an error message
                if (data && data.error) {
                    throw new Error(data.error);
                }

                return data;
            } catch (error) {
                const isTimeout = error.name === 'AbortError';
                const isJsonError = error instanceof SyntaxError;
                console.warn(`Failed to fetch via ${proxy.url}:`, isTimeout ? 'Timeout' : (isJsonError ? 'Invalid JSON' : error.message));
                lastError = error;
            }
        }

        const errorMsg = `No se pudo obtener datos de Escacs.cat después de intentar con ${triedProxies.length} servidores auxiliares. 
        Esto puede deberse a un bloqueo temporal o problemas con los proxies. 
        Error final: ${lastError?.message || 'Error de parsing o red'}`;

        throw new Error(errorMsg);
    }

    async function populateCategorySelect(season) {
        categorySelect.innerHTML = '<option value="">Cargando...</option>';
        categorySelect.disabled = true;

        try {
            // Fetch categories: task=grupsActes&idTemp=2025&resultats=true
            const targetUrl = `${API_URL}?task=grupsActes&idTemp=${season}&resultats=true`;

            const data = await fetchData(targetUrl);

            categorySelect.innerHTML = '<option value="">Totes les categories</option>';

            if (Array.isArray(data)) {
                const fragment = document.createDocumentFragment();
                data.forEach(item => {
                    // item is [id, name]
                    const option = document.createElement('option');
                    option.value = item[0];
                    option.textContent = item[1];
                    fragment.appendChild(option);
                });
                categorySelect.appendChild(fragment);
            } else {
                throw new Error("Data format invalid");
            }

        } catch (error) {
            console.error(error);
            categorySelect.innerHTML = '<option value="">Error al cargar (Intenta recargar)</option>';
            // Add a retry button interaction or just let user reload
            showStatus(`Error cargando categorías: ${error.message}. Intenta recargar la página.`, 'error');
        } finally {
            categorySelect.disabled = false;
        }
    }

    function populateClubSelect() {
        if (typeof CLUBS === 'undefined') {
            console.error("CLUBS object not found. Check clubs.js");
            return;
        }

        // Sort clubs by name
        CLUBS.sort((a, b) => a.name.localeCompare(b.name));

        const fragment = document.createDocumentFragment();
        CLUBS.forEach(club => {
            const option = document.createElement('option');
            option.value = club.id;
            option.textContent = `${club.name} (${club.id})`;
            fragment.appendChild(option);
        });
        clubIdInput.appendChild(fragment);
    }

    async function handleSearch() {
        const season = seasonSelect.value;
        const clubId = clubIdInput.value.trim();
        const categoryId = categorySelect.value;
        const clubNameText = clubIdInput.options[clubIdInput.selectedIndex]?.text || "";

        if (!clubId) {
            showStatus('Por favor, selecciona un Club.', 'error');
            return;
        }

        showLoading(true);
        hideResults();
        showStatus('Obteniendo calendario...', 'info');
        resultsBody.innerHTML = ''; // Clear previous results

        try {
            // 1. Fetch Calendar
            let calendarUrl = `${API_URL}?task=calendari&idTemp=${season}&idClub=${clubId}`;
            if (categoryId) calendarUrl += `&idGrup=${categoryId}`;

            const calendarData = await fetchData(calendarUrl);

            if (!Array.isArray(calendarData) || calendarData.length === 0) {
                showEmptyState(true);
                showLoading(false);
                return;
            }

            // 2. Extract Acta IDs
            const actaIds = [];
            calendarData.forEach(round => {
                if (round.partides && Array.isArray(round.partides)) {
                    round.partides.forEach(match => {
                        // match is usually ["Team A", "Result", "Team B", "ACTA_ID"]
                        // We need to check if our club is part of specific match if needed,
                        // but usually the calendar endpoint already filters by club.
                        const actaId = match[3];
                        if (actaId) {
                            actaIds.push({
                                id: actaId,
                                roundName: round.entradaCalendari
                            });
                        }
                    });
                }
            });

            if (actaIds.length === 0) {
                showStatus('No se encontraron actas para este club/temporada.', 'warning');
                showLoading(false);
                return;
            }

            showStatus(`Procesando ${actaIds.length} actas en paralelo...`, 'info');

            // 2.1 Extract Opponent per Round from calendarData
            const roundOpponents = {};
            calendarData.forEach(round => {
                const rMatch = round.entradaCalendari.match(/Ronda:\s*(\d+)/i);
                const rNum = rMatch ? parseInt(rMatch[1], 10) : 0;

                if (rNum > 0 && round.partides && round.partides.length > 0) {
                    const match = round.partides[0]; // Calendar usually has one match entry per round for the club
                    const teamA = match[0];
                    const teamB = match[2];

                    const myNameNorm = normalizeTeamName(clubNameText);
                    const teamANorm = normalizeTeamName(teamA);

                    if (teamANorm.includes(myNameNorm) || myNameNorm.includes(teamANorm)) {
                        roundOpponents[rNum] = teamB;
                    } else {
                        roundOpponents[rNum] = teamA;
                    }
                }
            });

            // 3. Fetch details for each Acta SEQUENTIALLY with proxy rotation and rate limit delay
            const resultsArrays = [];
            for (let i = 0; i < actaIds.length; i++) {
                const acta = actaIds[i];
                try {
                    showStatus(`Procesando acta ${i + 1} de ${actaIds.length}... (${acta.roundName})`, 'info');
                    const actaUrl = `${API_URL}?task=obtePartidesCalendari&resultats=true&idCalendari=${acta.id}`;
                    const actaData = await fetchData(actaUrl);

                    if (actaData && Array.isArray(actaData.partides)) {
                        resultsArrays.push(parseActa(actaData, clubId, acta.roundName));
                    }

                    // Delay between fetches to avoid spamming the current proxy and triggering Error 400
                    if (i < actaIds.length - 1) {
                        await new Promise(r => setTimeout(r, 600)); // 600ms delay
                    }
                } catch (e) {
                    console.error(`Error fetching acta ${acta.id}`, e);
                }
            }

            const allPlayerResults = resultsArrays.flat();

            renderResults(allPlayerResults, roundOpponents);
            showEmptyState(allPlayerResults.length === 0);

        } catch (error) {
            console.error(error);
            showStatus(`Error: ${error.message}`, 'error');
        } finally {
            showLoading(false);
        }
    }

    function parseActa(actaData, myClubId, roundName) {
        const results = [];
        const isLocal = actaData.idClubLocal == myClubId;
        const isVisitor = actaData.idClubVisitant == myClubId;

        // Extract Round Number from "Name - Name - Ronda: X - Date"
        const roundMatch = roundName.match(/Ronda:\s*(\d+)/i);
        const roundNumber = roundMatch ? parseInt(roundMatch[1], 10) : 0;

        actaData.partides.forEach(p => {
            // Determine side
            const mySide = isLocal ? 'Local' : 'Visitant';

            // Extract data
            const id = p[`codi${mySide}`]; // Use ID for unique identification
            const nombre = p[`nom${mySide}`];
            const elo = p[`elo${mySide}`];
            const titol = p[`titol${mySide}`];
            const orden = p[`ordre${mySide}`];

            // Determine result
            let score = p.resultat;
            let playerResult = '-';

            if (score) {
                // Remove whitespace
                score = score.replace(/\s+/g, '');

                // Typical formats: "1-0", "0-1", "1/2-1/2", "½-½"
                if (score.includes('-')) {
                    const parts = score.split('-');
                    const myScoreIndex = isLocal ? 0 : 1;
                    const rawScore = parts[myScoreIndex];

                    if (rawScore === '1') playerResult = '1';
                    else if (rawScore === '0') playerResult = '0';
                    else if (rawScore === '1/2' || rawScore === '½') playerResult = '½';
                    // Note: If result is just "+" or "-" (default), handle accordingly if needed
                }
            }

            // Only add if there is a valid player name 
            if (nombre && nombre.toUpperCase() !== "VACANT" && id) {
                results.push({
                    id: id,
                    ronda: roundNumber,
                    nombre: nombre,
                    orden: parseInt(orden, 10) || 999, // For sorting
                    titulo: titol,
                    elo: elo,
                    resultado: playerResult
                });
            }
        });

        return results;
    }

    function renderResults(flatResults, roundOpponents = {}) {
        resultsBody.innerHTML = '';
        const resultsHeader = document.querySelector('#resultsContainer thead tr');

        if (flatResults.length === 0) {
            resultsContainer.classList.add('hidden');
            return;
        }

        // 0. Set Season and Category Title
        const seasonVal = seasonSelect.value;
        const categoryName = categorySelect.options[categorySelect.selectedIndex]?.text || "Totes les categories";

        let titleContainer = document.getElementById('resultsTitleContainer');
        if (!titleContainer) {
            titleContainer = document.createElement('div');
            titleContainer.id = 'resultsTitleContainer';
            titleContainer.className = 'px-6 pt-4 mb-4';
            resultsContainer.insertBefore(titleContainer, resultsContainer.firstChild);
        }

        titleContainer.innerHTML = `
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Temporada ${seasonVal}</div>
            <h2 id="resultsTitle" class="text-xl font-bold text-brand-700">${categoryName}</h2>
        `;


        // 1. Process Data: Group by Player
        const playersMap = new Map();
        let maxRound = 0;

        flatResults.forEach(r => {
            if (r.ronda > maxRound) maxRound = r.ronda;

            if (!playersMap.has(r.id)) {
                playersMap.set(r.id, {
                    id: r.id,
                    nombre: r.nombre,
                    orden: r.orden,
                    titulo: r.titulo,
                    elo: r.elo,
                    results: {} // Map round -> result
                });
            }
            playersMap.get(r.id).results[r.ronda] = r.resultado;
        });

        const players = Array.from(playersMap.values());

        // Sort by 'orden'
        players.sort((a, b) => a.orden - b.orden);
        playerCountSpan.textContent = players.length;

        // 2. Build Header dynamically
        // Columns: Jugador | Orden | Título | ELO | R1 | R2 | ...
        resultsHeader.innerHTML = `
            <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Jugador</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Orden</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Título</th>
            <th class="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">ELO</th>
        `;

        for (let i = 1; i <= maxRound; i++) {
            const th = document.createElement('th');
            th.className = "px-2 py-3 text-center text-xs font-bold text-brand-700 uppercase tracking-wider border-b-2 border-brand-200 bg-brand-50";

            const opponent = roundOpponents[i];
            if (opponent) {
                th.textContent = getClubAbbreviation(opponent);
                th.title = opponent; // Full name on hover
            } else {
                th.textContent = `R${i}`;
            }

            resultsHeader.appendChild(th);
        }

        // Add TOTAL column at the end of header
        const totalTh = document.createElement('th');
        totalTh.className = "px-4 py-3 text-center text-xs font-bold text-brand-900 uppercase tracking-wider bg-brand-100 border-x-2 border-brand-200";
        totalTh.textContent = "TOTAL";
        resultsHeader.appendChild(totalTh);

        // 3. Render Rows
        const roundTotals = new Array(maxRound + 1).fill(0); // Index 0 unused

        players.forEach(p => {
            const row = document.createElement('tr');
            row.className = 'hover-row fade-in border-b border-slate-100';

            // Calculate player total and build rounds HTML
            let playerTotal = 0;
            let roundsHtml = '';
            for (let i = 1; i <= maxRound; i++) {
                const res = p.results[i] || '-';
                const colorClass = getResultColor(res);

                // Add to player total
                if (res === '1') playerTotal += 1;
                else if (res === '½') playerTotal += 0.5;

                // Add to round totals (column totals)
                let val = 0;
                if (res === '1') val = 1;
                else if (res === '½') val = 0.5;
                roundTotals[i] += val;

                roundsHtml += `<td class="px-2 py-3 whitespace-nowrap text-sm font-bold text-center ${colorClass}">${res}</td>`;
            }

            // Fixed Info + Rounds + Total at end
            row.innerHTML = `
                <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-brand-600">${p.nombre}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-slate-500">${p.orden}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-slate-500"><span class="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold">${p.titulo}</span></td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-slate-500">${Number(p.elo).toLocaleString('es-ES')}</td>
                ${roundsHtml}
                <td class="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-brand-900 bg-brand-100/30 border-x-2 border-brand-200">${playerTotal.toLocaleString('es-ES')}</td>
            `;

            resultsBody.appendChild(row);
        });

        // 4. Render Totals Row
        const totalRow = document.createElement('tr');
        totalRow.className = 'bg-brand-50 font-bold border-t-2 border-brand-100';

        const grandTotal = roundTotals.reduce((a, b) => a + b, 0);
        let totalHtml = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-brand-800">TOTAL RONDA</td>
            <td colspan="3"></td>
        `;

        for (let i = 1; i <= maxRound; i++) {
            const valStr = roundTotals[i].toLocaleString('es-ES');
            totalHtml += `<td class="px-2 py-4 whitespace-nowrap text-sm text-center text-brand-700">${valStr}</td>`;
        }

        // Add Grand Total at the end of the totals row
        totalHtml += `<td class="px-4 py-4 whitespace-nowrap text-sm text-center text-brand-900 bg-brand-100/50 border-x-2 border-brand-200">${grandTotal.toLocaleString('es-ES')}</td>`;

        totalRow.innerHTML = totalHtml;
        resultsBody.appendChild(totalRow);

        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function exportTableToExcel(tableId, filename = '') {
        try {
            const table = document.querySelector('#resultsContainer table');
            if (!table) {
                console.error("Tabla no encontrada para exportar");
                showStatus("Error: No hay datos para exportar", "error");
                return;
            }

            const categoryTitle = document.getElementById('resultsTitle')?.textContent || "Resultados";

            // Minimalist HTML for Excel with BOM for UTF-8
            // We use mso-number-format:"\@" to force ALL cells to be treated as TEXT.
            // This ensures "2.361" stays "2.361" and isn't converted to 2361.0 or similar.
            const uri = 'data:application/vnd.ms-excel;base64,';
            const template = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Resultados</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<meta charset="utf-8">
<style>
.text-green-600 { color: #059669; }
.text-red-500 { color: #ef4444; }
.text-amber-600 { color: #d97706; }
table, td, th { border: 1px solid black; text-align: center; mso-number-format:"\@"; } 
</style>
</head>
<body>
<h3>${categoryTitle}</h3>
<table>${table.innerHTML}</table>
</body>
</html>`;

            const blob = new Blob(['\ufeff', template], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });

            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement("a");

            downloadLink.href = url;
            downloadLink.download = filename ? `${filename}.xls` : 'resultados.xls';

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

        } catch (e) {
            console.error("Error exportando:", e);
            showStatus("Error al exportar el archivo", "error");
        }
    }

    function getResultColor(result) {
        if (result === '1') return 'text-green-600';
        if (result === '0') return 'text-red-500';
        if (result === '½') return 'text-amber-600';
        return 'text-slate-300';
    }

    // UI Helpers
    function showLoading(isLoading) {
        if (isLoading) {
            loadingState.classList.remove('hidden');
            // Mock hidden during loading
            resultsContainer.classList.add('hidden');
            emptyState.classList.add('hidden');
        } else {
            loadingState.classList.add('hidden');
        }
    }

    function hideResults() {
        resultsContainer.classList.add('hidden');
        emptyState.classList.add('hidden');
    }

    function showEmptyState(show) {
        if (show) {
            emptyState.classList.remove('hidden');
            resultsContainer.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    function showStatus(msg, type) {
        statusMsg.textContent = msg;
        statusMsg.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');

        if (msg) {
            if (type === 'error') {
                statusMsg.classList.add('bg-red-100', 'text-red-700');
            } else if (type === 'success') {
                statusMsg.classList.add('bg-green-100', 'text-green-700');
            }
        } else {
            statusMsg.classList.add('hidden');
        }
    }
});
