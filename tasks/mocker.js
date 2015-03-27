/*
 * grunt-mocker
 * https://github.com/denisraslov/grunt-mocker
 *
 * Copyright (c) 2015 Denis Raslov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerTask('mocker', 'Generating jquery mockjax mocks for RESTful services', function () {

        var _ = require('lodash');

        var options = this.options({});

        var settings = grunt.file.readJSON(options.template);
        var templates = {
            data: grunt.file.read(__dirname + '/templates/data.js'),
            get: grunt.file.read(__dirname + '/templates/get.js'),
            put: grunt.file.read(__dirname + '/templates/put.js'),
            all: grunt.file.read(__dirname + '/templates/all.js')
        };

        var generatedData = {};

        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var generateEntities = function (entityIndex) {
            var entityTemplate,
                entities = [],
                entity,
                value,
                referEntityIndex,
                referEntities;

            if (!generatedData[entityIndex]) {

                entityTemplate = _.findWhere(settings, {entity: entityIndex});

                if (!entityTemplate) {
                    throw new Error('"' + entityIndex + '" doesn\'t found');
                }

                entities.lastId = 0;

                if (!entityTemplate.count) {
                    throw new Error('"count" field for "' + entityIndex + '" doesn\'t found');
                }

                for (var i = 0; i < entityTemplate.count; i++) {

                    entity = {};

                    entity.id = entityTemplate.entity + '-' + (++entities.lastId);

                    _.forIn(entityTemplate.data, function (value, index) {
                        switch (value) {
                            case 'Boolean':
                                value = (Math.random() < 0.5);
                                break;
                            case 'NumberInt':
                                value = Math.ceil(Math.random() * 100);
                                break;
                            case 'NumberFloat':
                                value = Math.random() * 100;
                                break;
                            case 'String':
                                value = index + '-' + entity.id;
                                break;
                            case 'Date':
                                value = (new Date()).getTime() - getRandomInt(1000, 10000) * 1000;
                                break;
                            default:
                                if (_.isArray(value)) {
                                    value = value[getRandomInt(0, value.length - 1)];

                                } else if (value[0] == '*') {

                                    referEntityIndex = value.substr(1, value.length - 1);
                                    generateEntities(referEntityIndex);

                                    referEntities = generatedData[referEntityIndex];

                                    value = referEntities[getRandomInt(0, referEntities.length - 1)].id;

                                } else if (value[0] == '[') {

                                    var endQuoteIndex = value.indexOf(']'),
                                        itemsCount = value.substr(1, endQuoteIndex - 1),
                                        referEntityIndex = value.substr(endQuoteIndex + 1,
                                            value.length - itemsCount.toString().length - 2);

                                    generateEntities(referEntityIndex);
                                    referEntities = generatedData[referEntityIndex];

                                    value = [];

                                    for (var i = 1; i <= itemsCount; i++) {
                                        value.push(referEntities[getRandomInt(0, referEntities.length - 1)].id)
                                    }
                                }
                                break;
                        }

                        entity[index] = value;
                    });

                    entities.push(entity);
                }

                generatedData[entityIndex] = entities;
            }
        };

        _.forEach(settings, function (entityTemplate) {
            generateEntities(entityTemplate.entity);
        });

        //-------------------- file writing ---------------------------

        _.forIn(generatedData, function (entities, index) {
            var content,
                url = options.url + '/' + index;

            content = grunt.template.process(templates.data, {
                data: {
                    data: JSON.stringify(entities)
                }
            });
            grunt.file.write(options.dest + '/' + index + '/data.js', content);

            content = grunt.template.process(templates.get, {
                data: {
                    url: url
                }
            });
            grunt.file.write(options.dest + '/' + index + '/get.js', content);

            content = grunt.template.process(templates.put, {
                data: {
                    url: url
                }
            });
            grunt.file.write(options.dest + '/' + index + '/put.js', content);

            grunt.log.writeln('Mocks for "' + index + '" generated.');
        });

        grunt.file.write(options.dest + '/mocks.js', grunt.template.process(templates.all, {
            data: {
                items: _.map(generatedData, function(entities, index) {
                    return index;
                })
            }
        }));
    });

};