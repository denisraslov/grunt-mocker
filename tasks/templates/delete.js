define(function(require, exports, module) {
    //requirements
    var ajaxMock = require('kit/ajaxMock/ajaxMock');

    ajaxMock({
        url: '<%- url %>/*',
        contentType: 'application/json',
        type: 'DELETE',
        status: 204
    });
});