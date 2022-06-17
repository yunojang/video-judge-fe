var fs = require('fs');
var chalk = require('chalk');

module.exports = {
    input: [
        'src/*.{ts,tsx}',
        // Use ! to filter out files or directories
        '!app/**/*.spec.{js,jsx}',
        '!app/i18n/**',
        '!**/node_modules/**',
    ],
    output: './',
    options: {
        debug: true,
        // removeUnusedKeys: true,
        sort: true,
        func: {
            list: ['i18n', 'i18n.t', 't'],
            extensions: ['.ts', '.tsx']
        },
        trans: false,
        lngs: ['en','ko'],
        defaultLng: 'ko',
        defaultNs: 'resource',
        defaultValue: function(lng, ns, key, defaultValue) {
            return defaultValue.defaultValue;
            // return '__NOT_TRANSLATED__';
        },
        contextDefaultValues: ['en', 'ko'],
        resource: {
            loadPath: 'src/i18n/locales/{{lng}}/{{lng}}.json',
            savePath: 'src/i18n/locales/{{lng}}/{{lng}}.json',
            jsonIndent: 2,
            lineEnding: '\n'
        },
        nsSeparator: false, // namespace separator
        keySeparator: ".", // key separator
        interpolation: {
            prefix: '{{',
            suffix: '}}'
        }
    },
    transform: function customTransform(file, enc, done) {
        "use strict";
        const parser = this.parser;
        const content = fs.readFileSync(file.path, enc);
        let count = 0;
        parser
            .parseFuncFromString(content, { list: ['t']}, (key, options) => {
                ++count;
            });

        if (count > 0) {
            console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
        }

        done();
    }
};