export function parse(value = "") {
  const sliced = value.slice(1);
  if (value.startsWith("=")) {
    try {
      return eval(sliced)
    } catch (e) {
      return value;
    }
  }
  return value
}
