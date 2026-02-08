import { use, expect as chaiExpect } from "chai";
import dateXPlugin from "../src/chai";

describe("date-x chai plugin", () => {
  beforeAll(() => {
    use(dateXPlugin);
  });

  test("should have method to test date format: inDateFormat", () => {
    expect(chaiExpect("dummy").inDateFormat).toBeDefined();
  });

  test("should throw error if called without any format string", () => {
    expect(() => {
      // @ts-expect-error Invalid argument, intentional
      chaiExpect("2014").inDateFormat();
    }).toThrow(/set/);
  });

  test("should recognize datestring with given format [+]", () => {
    chaiExpect("03/12/2016 11:11:32").to.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
  });

  test("should recognize datestring with given format [-]", () => {
    expect(() => {
      chaiExpect("03/12/2016 11:11:32").to.not.be.inDateFormat(
        "dd/MM/yyyy hh:mm:ss",
      );
    }).toThrow(/03\/12\/2016 11:11:32.*dd\/MM\/yyyy hh:mm:ss/);
  });

  test("should recognize datestring with not the given format [+]", () => {
    chaiExpect("Thuesday").to.not.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
  });

  test("should recognize datestring with not the given format [-]", () => {
    expect(() => {
      chaiExpect("Thuesday").to.be.inDateFormat("dd/MM/yyyy hh:mm:ss");
    }).toThrow(/Thuesday.*dd\/MM\/yyyy hh:mm:ss/);
  });
});
