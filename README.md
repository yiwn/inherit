# inherit

Inherit functionality and setup prototype chain from subclasses.

## Installation

Using [component](https://github.com/component/component)

    $ component install yiwn/inherit

Using [npm](http://npmjs.org/) for [browserify](http://browserify.org/)

    $ npm install yiwn-inherit

## Usage

Example:

```js
var inherit = require('yiwn-inherit');

function Parent(b){
    this.a = 'Aaa!',
    this.b = b;
    return this;
}

Parent.extend = inherit.bind(null, Parent);

// 
var Child = Parent.extend({
        print: function(){
            console.log(this.a, this.b);
        }
    });

var child = new Child('Boo!');

child.print(); // -> 'Aaa!', 'Boo!'
```

Supports replacement of constructor function as third argument.

```js
var Child = Parent.extend({
        print: function() {
            console.log(this.a, this.b)
        }
    }, init);

function init(b) {
    this.b = b + '!!!';
    return this;
}

var child = new Child('Boo!');

child.print(); // -> undefined, 'Boo!!!!'
```

## Test

Run tests with [mocha](http://mochajs.org/)

    $ make test

## Origins

Script replicates functionality of [Backbone's `.extend`](http://backbonejs.org/docs/backbone.html#section-208), extracted from [Koboldmaki](https://github.com/manuelstofer/koboldmaki).

## License

The MIT License

