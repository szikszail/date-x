import dateX from "..";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      inDateFormat: (format: string) => Assertion;
    }
  }
}

const plugin: Chai.ChaiPlugin = (
  chai: Chai.ChaiStatic,
  _utils: Chai.ChaiUtils,
) => {
  chai.Assertion.addMethod("inDateFormat", function (format: string) {
    if (!format) {
      throw new Error(
        "The expected value must be set to a date format string!",
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateString = (this as any).__flags.object;
    this.assert(
      dateX.test(format, dateString),
      `expected "${dateString}" to be formatted as "${format}"`,
      `expected "${dateString}" not to be formatted as "${format}"`,
      dateString,
      format,
    );
  });
};

export default plugin;
