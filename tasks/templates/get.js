define(function(require, exports, module) {
    var ajaxMock = require('ajaxMock');

    return ajaxMock({
        url: '/<%- url %>',
        type: 'GET',

        status: 200,
        responseText: require('./data')
    });
});