define(function(require, exports, module) {
    var entities = require('./data'),
        _ = require('lodash');

    require('mockjax');

    $.mockjax({
        url: '<%= url + "/*" %>',
        contentType: 'application/json',
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