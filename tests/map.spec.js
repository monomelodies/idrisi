"use strict";

import map from '../src/Map';

describe('Map component', () => {
    let element = undefined;
    let $rootScope = undefined;
    let scope = undefined;
    let $compile = undefined;
    let tpl = undefined;
    let $httpBackend = undefined;
    let $timeout = undefined;
    
    angular.module('test.map', ['tests', map]);

    beforeEach(angular.mock.module('test.map'));

    beforeEach(inject((_$rootScope_, _$compile_, _$httpBackend_, _$timeout_) => {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $timeout = _$timeout_;
        $compile = _$compile_;
        tpl = angular.element('<idrisi-map></sds-map>');
        element = $compile(tpl)(scope);
        scope.$digest();
    }));

    it('does something', () => {
        expect(true).toBe(true);
    });
});

