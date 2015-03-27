define(function(require, exports, module) {
    require('mockjax');

    $.mockjax({
        url: '<%- url %>',
        contentType: 'application/json',
        type: 'GET',

        status: 200,
        response: function(request) {
            var data = require('./data');

            this.responseText = data;
        }
    });
});