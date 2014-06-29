build: test
	@./node_modules/.bin/component build

test: lint
	@./node_modules/.bin/mocha

lint: ./lib/*.js
	@./node_modules/.bin/jshint $^

clean:
	rm -fr build components node_modules

.PHONY: test lint build clean
