function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

/**
    Convert 12.34 with a precision of 3 into 12340
    @arg {number|string} number - Use strings for large numbers.  This may contain one decimal but no sign
    @arg {number} precision - number of implied decimal places (usually causes right zero padding)
    @return {string} -
*/
export function toImpliedDecimal(number: number | string, precision: number): string {
  if (typeof number === "number") {
    assert(number <= 9007199254740991, "overflow");
    number = "" + number;
  } else if ((number as any).toString) {
    number = number.toString();
  }
  assert(typeof number === "string", "number should be an actual number or string: " + (typeof number));
  number = number.trim();
  assert(/^[0-9]*\.?[0-9]*$/.test(number), "Invalid decimal number " + number);
  let [whole = "", decimal = ""] = number.split(".");
  let padding = precision - decimal.length;
  assert(padding >= 0, "Too many decimal digits in " + number + " to create an implied decimal of " + precision);
  for (let i = 0; i < padding; i++) decimal += "0";
  while (whole.charAt(0) === "0") whole = whole.substring(1);
  return whole + decimal;
}

export function fromImpliedDecimal(number: number | string, precision: number): string {
  if (typeof number === "number") {
    assert(number <= 9007199254740991, "overflow");
    number = "" + number;
  } else if ((number as any).toString) {
    number = number.toString();
  }
  while (number.length < precision + 1) number = "0" + number;
  let dec_string = number.substring(number.length - precision);
  return number.substring(0, number.length - precision) + (dec_string ? "." + dec_string : "");
} 