
var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        frameworks: [
            'mocha', 'chai', 'sinon', "karma-typescript"
        ],
        
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"],
            "test/**/*.ts": ["karma-typescript"],
            'test/**/*.html': ['html2js']
        },

        files: [
            "src/**/*.ts",
            "test/**/*.ts",
            "test/**/*.html"
        ],

        karmaTypescriptConfig: {
            compilerOptions: {
                "target": "es5",
                "module": "commonjs",
                "moduleResolution": "node",
                "noImplicitAny": false,
                "sourceMap": true,
                "outDir": "build",
                "lib": [
                    "dom",
                    "es5",
                    "es2015.promise",
                    "es2015.iterable"
                ],
                "types": [
                ]
            }
        },

        html2JsPreprocessor: {
            stripPrefix: 'test/',
        },
        
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },

        reporters: [
            "progress", "karma-typescript"
        ],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS', /*'VirtualBoxEdge14','VirtualBoxIE11onWin8', 'PhantomJS', 'Chrome', 'Firefox', 'Safari' */],
        singleRun: true,
        concurrency: Infinity,

        customLaunchers: {
            VirtualBoxIE11onWin8: {
                base: 'VirtualBoxIE11',
                keepAlive: true,
                snapshot: 'testing-snapshot',
                uuid: '4b884a40-25cc-4ae3-bb32-f8f1b03a306b'
            },

            VirtualBoxEdge14: {
                base: 'VirtualBoxEdge',
                keepAlive: true,
                snapshot: 'testing-snapshot',
                uuid: '63680d79-49da-4e5d-85ad-b3adf7874202'
            }
        }
    });
};


