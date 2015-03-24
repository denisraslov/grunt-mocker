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
    entity: {entity name}
    count: {number of entries needs to be generated}
    {fieldName}: {FieldType} 
  },

]
```

`FieldType` - can be `String`, `NumberInt`, `NumberFloat`, `Boolean`, `Date`, `*{referred entity name}`

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
