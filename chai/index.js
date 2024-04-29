'use strict';

const dateX = require('../lib/index.js');

module.exports = (chai, utils) => {
    const METHODS = {
        inDateFormat: function (format) {
            if (!format) {
                throw new Error('The expected value must be set to a date format string!');
            }
            const dateString = this.__flags.object;
            this.assert(
                dateX.test(format, dateString),
                `expected "${dateString}" to be formatted as "${format}"`,
                `expected "${dateString}" not to be formatted as "${format}"`,
                dateString,
                format
            );
        }
    };

    Object.keys(METHODS).forEach(methodName => {
        const method = METHODS[methodName];
        chai.Assertion.addMethod(methodName, method);
    });
};