var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [
            'mocha', 'chai', 'sinon'
        ],
        
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'test/**/*.html': ['html2js']
        },

        files: [
            'test/**/*.ts',
            'test/**/*.html'
        ],

        exclude: [], 
        
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },

        html2JsPreprocessor: {
            stripPrefix: 'test/',
        },

        reporters: [
            'progress'
        ],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS', /*'VirtualBoxEdge14','VirtualBoxIE11onWin8', 'PhantomJS', 'Chrome', 'Firefox', 'Safari' */],
        captureTimeout: 60000,
        browserNoActivityTimeout: 300000,
        singleRun: true,
        
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
    })    
} 
