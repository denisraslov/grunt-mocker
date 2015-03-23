/*
 * grunt-mocker
 * https://github.com/denisraslov/grunt-mocker
 *
 * Copyright (c) 2015 Denis Raslov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('mocker', 'Generating jquery mockjax mocks for RESTful services', function () {

        var options = this.options({});

        var settings = grunt.file.readJSON(options.settings);
        var templates = {
            data: grunt.file.read('template/data.js'),
            get: grunt.file.read('template/get.js'),
            put: grunt.file.read('template/put.js')
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
                            default:
                                if (value[0] == '*') {
                                    referEntityIndex = value.substr(1, value.length - 1);
                                    generateEntities(referEntityIndex);

                                    referEntities = generatedData[referEntityIndex];

                                    value = referEntities[getRandomInt(0, referEntities.length - 1)].id;
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
            var content;

            content = grunt.template.process(templates.data, {
                data: {
                    data: JSON.stringify(entities)
                }
            });
            grunt.file.write(options.dest + '/' + index + '/data.js', content);

            content = grunt.template.process(templates.get, {
                data: {
                    url: index
                }
            });
            grunt.file.write(options.dest + '/' + index + '/get.js', content);

            content = grunt.template.process(templates.put, {
                data: {
                    url: index
                }
            });
            grunt.file.write(options.dest + '/' + index + '/put.js', content);

            grunt.log.writeln('Mocks for "' + index + '" generated.');
        });
    });

};
