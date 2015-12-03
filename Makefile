all: build

build:
	npm run build

clean:
	rm -f dist/*

test:
	npm test

.PHONY: build clean test
