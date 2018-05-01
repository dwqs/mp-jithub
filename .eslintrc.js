module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        allowImportExportEverywhere: false,
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: 'vue',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    rules: {
        'indent': [2, 4],
        'quotes': [2, 'single', { 'allowTemplateLiterals': true }],
        'linebreak-style': [2, 'unix'],
        'semi': [2,  'always'],
        'eqeqeq': [2, 'always'],
        'strict': [2, 'global'],
        'key-spacing': [2, { 'afterColon': true }],
        'no-console': 0,
        'no-debugger': 0,
        'no-empty': 0,
        'no-unused-vars': 0,
        'no-constant-condition': 0,
        'no-undef': 0,
        'no-trailing-spaces': 0
    },
    globals: {
        App: true,
        Page: true,
        wx: true,
        getApp: true,
        getPage: true
    }
};
