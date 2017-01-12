# Makefile

APP_NAME := aimbrain-web-sdk
DOCS_TITLE := "AimBrain WebSDK"

## Add binaries in node_modules to PATH
export PATH := $(PATH):node_modules/.bin

## Default APP_ENV to 'local' (local environment)
ifndef $(APP_ENV)
	export APP_ENV := local
endif

export BUNDLE_NAME := aimbrain-web-sdk.js
BUNDLE_FILES := $(shell find src -type f)
TS_FILES := $(shell find src test -type f)

ifeq ($(APP_ENV),production)
	export BUNDLE_NAME := aimbrain-web-sdk.min.js
endif

## Default task to run when typing 'make'
all: build/$(BUNDLE_NAME)

## --------------------------------------------------------
##  File targets
## --------------------------------------------------------

node_modules: package.json
	npm install --no-optional
	@touch node_modules

build/$(BUNDLE_NAME): node_modules $(BUNDLE_FILES)
	@mkdir -p $(@D)
	webpack --progress

build/tsc.stub: node_modules $(TS_FILES)
	@mkdir -p $(@D)
	tsc
	@touch $@


## --------------------------------------------------------
##  Phony targets
## --------------------------------------------------------

.PHONY: serve test lint clean distclean

serve: node_modules
	webpack-dev-server

lint: node_modules $(BUNDLE_FILES)
	tslint 'src/**/*.ts' 'test/**/*.ts'

test: build/tsc.stub lint
	ava 'build/test/**/*.js' --verbose

clean:
	@rm -rf build/docs
	@rm -rf dist build
	@rm -f npm-debug.log

distclean: clean
	@rm -rf node_modules

docs:
	@typedoc --tsconfig tsconfig.doc.json --out build/docs/ --theme docs/theme/ --readme docs/readme.md --includes docs/modules/ --name $(DOCS_TITLE) --excludeExternals --excludePrivate --ignoreCompilerErrors --mode file