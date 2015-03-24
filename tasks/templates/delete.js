define(function(require, exports, module) {
    //requirements
    var ajaxMock = require('kit/ajaxMock/ajaxMock');

    ajaxMock({
        url: '/legalEntities/*/bankAccounts/*',
        type: 'DELETE',
        status: 204
    });
});