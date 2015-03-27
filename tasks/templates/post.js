define(function(require, exports, module) {
    require('mockjax');

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