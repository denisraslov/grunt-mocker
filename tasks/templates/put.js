define(function(require, exports, module) {
    var ajaxMock = require('kit/ajaxMock/ajaxMock'),
        entities = require('./data'),
        _ = require('lodash');

    return ajaxMock({
        url: '<%= url + "/*" %>',
        type: 'PUT',
        response: function(request) {
            var data = JSON.parse(request.data),
                id,
                entity;

            id = request.url.split('/').pop();

            entity = _.findWhere(entities, { id: id });
            _.extend(entity, data);

            this.responseText = entity;
        }
    });
});