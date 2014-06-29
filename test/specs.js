var expect = require('chai').expect;

var inherit = require('../index.js');

describe('Extend', function(){

    function Parent(arg) {
        this.keep(arg);
        return this;
    }

    Parent.prototype.test = function(){ };

    Parent.prototype.keep = function(arg) {
        this.arg1 = arg;
        return this;
    };

    it('should work with main arguments supplied', function(){
        var Child = inherit(Parent, {
                keep: function(arg) {
                    this.arg1 = arg * 10;
                    return this;
                }
            });

        var child = new Child(10);

        expect(child)
            .to.respondTo('keep')
            .to.respondTo('test');

        expect(child.arg1)
            .to.equal(100);
    });

    it('should keep inheritence chain', function(){
        var ArcheChild  = inherit(Parent),
            Child       = inherit(ArcheChild);

        var child = new Child();

        expect(child)
            .to.be.instanceof(Child)
            .to.be.instanceof(ArcheChild)
            .to.be.instanceof(Parent);
    });

    it('should override constructor function on demand', function(){
        var Child = inherit(Parent, {}, c);

        var child = new Child(5);

        expect(child.arg0)
            .to.equal(5);

        expect(child.arg1)
            .to.be.an('undefined');

        function c(n) {
            this.arg0 = n;
            return this;
        }
    });
});
