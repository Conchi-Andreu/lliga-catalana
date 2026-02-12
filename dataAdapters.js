var llistaParellsKeyValue = {};
var llistaParellsKeyValueAdapters = {};
llistaParellsKeyValue['divisionsFilials'] = jQuery.parseJSON('[{"value":"1","label":"Divisi\u00f3 Honor"},{"value":"2","label":"Primera Divisi\u00f3"},{"value":"3","label":"Segona Divisi\u00f3"},{"value":"4","label":"Preferent"},{"value":"5","label":"Primera Provincial"},{"value":"6","label":"Segona Provincial"},{"value":"7","label":"Tercera Provincial"},{"value":"8","label":"Promoci\u00f3 SUB-12"},{"value":"101","label":"Interclubs"},{"value":"102","label":"Interclubs"}]');
var groupsSourcedivisionsFilials = {

                 datatype: 'array',

                 datafields: [

                     { name: 'label', type: 'string' },

                     { name: 'value', type: 'string' }

                 ],
                 localdata: llistaParellsKeyValue['divisionsFilials']

            };

    

    llistaParellsKeyValueAdapters['divisionsFilials'] = new jQuery.jqx.dataAdapter(groupsSourcedivisionsFilials, {

                autoBind: true

            });
llistaParellsKeyValue['configCarrecs'] = jQuery.parseJSON('[{"value":"1","label":"Principal"},{"value":"2","label":"Adjunt"},{"value":"3","label":"Auxiliar"},{"value":"4","label":"Pr\u00e0ctiques"}]');
var groupsSourceconfigCarrecs = {

                 datatype: 'array',

                 datafields: [

                     { name: 'label', type: 'string' },

                     { name: 'value', type: 'string' }

                 ],
                 localdata: llistaParellsKeyValue['configCarrecs']

            };

    

    llistaParellsKeyValueAdapters['configCarrecs'] = new jQuery.jqx.dataAdapter(groupsSourceconfigCarrecs, {

                autoBind: true

            });
