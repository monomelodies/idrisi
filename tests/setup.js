
"use strict";

require('angular');
require('angular-mocks');
require('./mock');

angular.module('tests', [])
    .config(['$httpProvider', $httpProvider => {
        $httpProvider.defaults.withCredentials = true;
    }])
    ;

window.noLinks = function (element) {
    element.find('a').attr('href', '#');
};

