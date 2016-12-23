'use strict';

const dateX = require('../lib/index.js');

module.exports = (chai, utils) => {
    const METHODS = {
        inDateFormat: function (format) {
            if (format === undefined) {
                throw new Error('The expected value must be set!');
            }
            var obj = this.__flags.object;
            
        }
    };

    Object.keys(METHODS).forEach(methodName => {
        const method = METHODS[methodName];
        chai.Assertion.addMethod(methodName, method); 
    });
};