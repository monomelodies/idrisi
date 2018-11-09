
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'jasmine'],
        files: [
            'https://maps.googleapis.com/maps/api/js?sensor=false', //<--this one
            'tests/setup.js',
            {pattern: 'tests/*.spec.js', load: false}
        ],
        exclude: [
        ],
        preprocessors: {
            'tests/*.js': ['browserify']
        },
        reporters: ['progress'],
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        babelPreprocessor: {
            options: {
                "presets": ["env"],
                "plugins": ["transform-runtime", "transform-async-to-generator"]
            }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chromium',
                flags: ['--headless', '--disable-gpu', '--ignore-certificate-errors', '--disable-browser-check', '--remote-debugging-port=9222', '--no-sandbox']
            }
        },
        singleRun: true
    });
};
