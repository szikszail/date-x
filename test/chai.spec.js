'use strict';

const chai = require('chai');

describe("date-x chai plugin", () => {
    let expect;

    before(() => {
        chai.use(require('../chai'));
        expect = chai.expect;
    });

    it("should have method to test date format: inDateFormat", () => {
        expect(expect().inDateFormat).to.be.defined;
    });

    it("should throw error if called without any format string", () => {
        expect(() => {
            expect("2014").inDateFormat();
        }).to.throw(/set/);
    });

    it("should recognize datestring with given format [+]", () => {
        expect("03/12/2016 11:11:32").to.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
    });

    it("should recognize datestring with given format [-]", () => {
        expect(() => {
            expect("03/12/2016 11:11:32").to.not.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
        }).to.throw(/03\/12\/2016 11:11:32.*dd\/MM\/yyyy hh:mm:ss/);
    });

    it("should recognize datestring with not the given format [+]", () => {
        expect("Thuesday").to.not.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
    });

    it("should recognize datestring with not the given format [-]", () => {
        expect(() => {
            expect("Thuesday").to.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
        }).to.throw(/Thuesday.*dd\/MM\/yyyy hh:mm:ss/);
    }); 
});