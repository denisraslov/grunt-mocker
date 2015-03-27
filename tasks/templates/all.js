define(function(require, exports, module) {
   <% for (var i = 0; i < items.length; i++) { %>
        <%= "require('mocks/" + items[i] + "/get');" %>
        <%= "require('mocks/" + items[i] + "/put');" %>
    <% } %>
});