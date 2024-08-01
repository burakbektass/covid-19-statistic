import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("should format an integer number correctly", () => {
    expect(formatNumber(1234567)).toBe("1.234.567");
  });

  it("should format a decimal number correctly", () => {
    expect(formatNumber(1234.56)).toBe("1.234,56");
  });

  it("should format a negative number correctly", () => {
    expect(formatNumber(-987654.321)).toBe("-987.654,321");
  });

  it("should format a number with leading zeros correctly", () => {
    expect(formatNumber(0.789)).toBe("0,789");
  });

  it("should return 'NaN' for non-numeric input", () => {
    expect(formatNumber("abc")).toBe("NaN");
  });

  it("should return 'NaN' for null input", () => {
    expect(formatNumber(null)).toBe("NaN");
  });

  it("should return 'NaN' for undefined input", () => {
    expect(formatNumber(undefined)).toBe("NaN");
  });
});
