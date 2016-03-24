all: build

build:
	npm run build

clean:
	rm -f dist/*

test:
	npm test

svg:
	./node_modules/.bin/svgo --pretty -f icons

simpletest:
	npm run simpletest

.PHONY: build clean test simpletest
