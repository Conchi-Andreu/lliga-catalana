'use strict';

/**
 * @ngdoc overview
 * @name fceApp
 * @description
 * # fceApp
 *
 * Main module of the application.
 */
angular
  .module('fceApp', [
    'ui.router',
    'ui.bootstrap'])
  .constant('baseURL', 'https://escacs.cat/components/com_fce/')
  .constant('_ID_ADMIN_', 348)  
  .config(['$stateProvider', '$urlRouterProvider', 'baseURL', function ($stateProvider, $urlRouterProvider, baseURL) {
    var base = baseURL;
    $urlRouterProvider
      .otherwise('/app');

    $stateProvider
      .state('app', {
        abtract : true,
        url : '/app',
        template : '<ui-view/>'
      })
      .state('app.licitacions', {
        abtract : true,
        url: '/licitacions',
        template: '<ui-view/>'
      })
      .state('app.licitacions.arbitre', {
        url: '/arbitre',
        controller : 'LicitacioarbitreCtrl',
        templateUrl : function () {
          return base + 'templates/licitacioArbitre.tmpl.html';
        },
        resolve : {
          esArbitre : ['userAuthService', '$q', function (userAuthService, $q) {
            return new $q(function (resolve, reject) {
              userAuthService.ready.then(function () {
                  resolve(userAuthService.tePermis('arbitre'));
                })
                .catch(function (err) {
                  reject(err);
                });
            });
          }],
          llicenciaArbitreActiva : ['userAuthService', '$q', function (userAuthService, $q) {
            return new $q(function (resolve, reject) {
              userAuthService.ready.then(function () {
                  resolve(userAuthService.llicenciaActiva('arbitre'));
                })
                .catch(function (err) {
                  reject(err);
                });
            });
          }]
        }
      })
      .state('app.admin', {
        abtract : true,
        url: '/admin',
        template: '<ui-view/>'
      })
      .state('app.admin.documentacio', {
        abtract : true,
        url: '/documentacio',
        templateUrl: function () {
          return base + 'templates/validaDocumentacio.tmpl.html';
        },
        controller : 'ValidaDocumentacioCtrl as vd',
        resolve : {
          esAdmin : ['userAuthService', '$q', function (userAuthService, $q) {
            return new $q(function (resolve, reject) {
              userAuthService.ready.then(function () {
                  resolve(userAuthService.tePermis('admin'));
                })
                .catch(function (err) {
                  reject(err);
                });
            });
          }]
        }
      })	  
      .state('app.error', {
        url : '/error/:codiError',
        templateUrl : function () {
          return base + 'templates/error.tmpl.html';
        },
        controller : 'ErrorsCrtl'
      });

  }]);
