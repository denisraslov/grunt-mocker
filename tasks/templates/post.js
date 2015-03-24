define(function(require, exports, module) {

    var ajaxMock = require('kit/ajaxMock/ajaxMock');

    return ajaxMock({
        url: '/legalEntities/*/bankAccounts',
        type: 'POST',
        response: function(request) {

            var data = JSON.parse(request.data);

            data.id = _.uniqueId('bankAccount');

            this.responseText = data;
        }
    });
});