all: build

build:
	npm run build

clean:
	rm -f dist/*

test:
	npm test

simpletest:
	npm run simpletest

.PHONY: build clean test simpletest
