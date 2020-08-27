
export function capitalize(string) {
  if (typeof string !== "string") {
    return;
  }
  return string[0].toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
    .fill(null).map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(window.localStorage.getItem(key))
  }
  window.localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b;
}

export function separateStyle(style) {
  return style.replace(/[A-Z]/, (match) => "-" + match.toLowerCase())
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${separateStyle(key)}:${styles[key]}`)
    .join(";");
}

export function debounce(f, ms) {
  let isCooldown = false;
  return function(...args) {
    if (isCooldown) return;
    f(...args);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function storageName(param) {
  return `excel:` + param
}

export function getDate(date) {
  const d = new Date(date);
  return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`
}

export function preventDefault(e) {
  e.preventDefault()
}
