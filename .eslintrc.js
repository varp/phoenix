module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "applescript": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "_": "readonly",
        "Keys": "readonly",
        "Events": "readonly",
        "Preferences": "readonly",
        "Require": "readonly",
        "Phoenix": "readonly",
        "Storage": "readonly",
        "Point": "readonly",
        "Size": "readonly",
        "Rectangle": "readonly",
        "Identifiable": "readonly",
        "Iterable": "readonly",
        "Key": "readonly",
        "Event": "readonly",
        "Timer": "readonly",
        "Task": "readonly",
        "Image": "readonly",
        "Modal": "readonly",
        "Screen": "readonly",
        "Space": "readonly",
        "Mouse": "readonly",
        "App": "readonly",
        "Window": "readonly",
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
};