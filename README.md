# Aimbrain WebSDK

## Docs

You can find the integration documentation for the project in `/docs`

## Pre-built package

You can find the pre-built package in `/downloads`

## Pre-requisites

* Node.js `^6.9`
* GNU Make

## Setup

Make sure you have all pre-requisites set up on your machine.

You don't need to have anything else. GNU Make will download all other
project dependencies for you.

It is highly recommended to use [VSCode] for development with an
[EditorConfig extension].

For Mac OS X users: make sure you have XCode tools installed.

For Windows users: check out [msys2].

## Workflow

### Run unit tests

To execute unit tests run in project directory:

```
npm run test
```

To execute unit tests with coverage run in project directory

```
npm run coverage
```

Check `karma.unit.js` and `karma.coverage.js` for enabled browsers.

### Run unit tests on Microsoft browsers using Virtual Box

*Prerequisites:*

Patch file `node_modules/karma-virtualbox-ie11-launcher/src/module.js`

Line:
```
return execute(`VBoxManage guestcontrol {${ uuid }} --password Passw0rd! --username IEUser run --exe "C:\\Program Files\\Internet Explorer\\iexplore.exe" --wait-stderr --wait-stdout -- -extoff -private ${ url.replace(/localhost:/, '10.0.2.2:') }`, log);
        
```
to (note removed `-extoff`): 
```
return execute(`VBoxManage guestcontrol {${ uuid }} --password Passw0rd! --username IEUser run --exe "C:\\Program Files\\Internet Explorer\\iexplore.exe" --wait-stderr --wait-stdout -- -private ${ url.replace(/localhost:/, '10.0.2.2:') }`, log);
              
```            
Otherwise IndexedDB related tests will fail.

To run tests:
1) Install Virtual Box with http://modern.ie images for IE and Edge
2) Update `karma.unit.js` and `karma.coverage.js` to use correct VM UUIDs
3) Add snapshots 'testing-snapshot' for each VM. Test runner will restore image to this snapshot before running tests.

### Run manual tests using a built-in server

Run 

```
make serve
```

After starting server open `localhost:3000` to access pages with manual test cases.

### Build

> Resulting bundle will be located at `build/bundle.js`

A debuggable version of the bundle:

```
make
```

A minified version of the bundle:

```
make APP_ENV=production
```

Resulting bundle will be generated in `build/` directory.

### Clean

Clean build artifacts:

```
make clean
```

Clean absolutely everything:

```
make distclean
```

## Code style

Please, stick to this [Typescript styleguide].

Use `make test` before committing to check code for errors.

[vscode]: https://code.visualstudio.com/
[editorconfig extension]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[msys2]: http://msys2.github.io/
[typescript styleguide]: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
