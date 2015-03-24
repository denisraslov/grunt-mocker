# grunt-mocker

> Generating jquery mockjax mocks for RESTful services

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mocker --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mocker');
```

## The "mocker" task

### Overview
In your project's Gruntfile, add a section named `mocker` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mocker: {
    options: {
      // Task-specific options go here.
    },
  },
});
```

### Options

#### options.template
Type: `String`

A path to the file with template of mocks (see template format below).

#### options.dest
Type: `String`

A path to the folder where mocks files will created in.

### Template Format

```js
[
  {
    entity: {entity_name}
    count: {count}
    {field_name}: {FieldType} 
  },

]
```
## FieldType

## Primitive values

`String`, `NumberInt`, `NumberFloat`, `Boolean`, `Date`. 
It will be generated random value with according type.

## Values set

Use an array of allowable values to make mocker take random element from it.

For example: 

```js
"sortDirection": ["ASC", "DESC", "NONE"]
```

## References to another entities

If an entity must refer to another entity, use following syntax: 

`*{referred_entity_name}` - reference to `referred_entity_name`, it will taken random element of generated `referred_entity_name`.

`*{referred_entity_name}.id` - the same to previous but the only `id` of `referred_entity_name` element will taken.

`[{count}]{referred_entity_name}` - array (with the according length) of references to `referred_entity_name` elements, it will taken random elements of generated `referred entity name`-entities. 

`[{count}]{referred_entity_name}.id` - the same to previous but the only `id` of `referred_entity_name` elements will taken.

For example: 

```js
{
  "entity": "computer",
  {
    "user": "*users",
    "userId": "*users.id",
    "users": "[5]users",
    "userIds": "[5]users.id"
  }
}
```


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  mocker: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  mocker: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
