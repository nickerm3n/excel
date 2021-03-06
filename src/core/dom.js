class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    }

    if (this.$el.tagName.toLocaleLowerCase() === 'input') {
      return this.$el.value;
    }

    return this.$el.textContent.trim();
  }

  focus() {
    this.$el.focus();
    return this;
  }

  clear() {
    this.html("");
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset;
  }

  updateDataValue(value) {
    this.$el.dataset.value = value;
    return this;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  css(styles = {color: "red"}) {
    for (const [key, value] of Object.entries(styles)) {
      this.$el.style[key] = value
    }
  }

  attr(name, value) {
    if (name) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name)
  }

  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$el.style[style];
      return res;
    }, {})
  }

  width() {
    return this.$el.offsetWidth
  }

  id(parse) {
    if (parse) {
      const parse = this.id().split(":");
      return {
        row: +parse[0],
        col: +parse[1],
      }
    }
    return this.data.id
  }

  addClass(selector) {
    this.$el.classList.add(selector);
    return this;
  }

  removeClass(selector) {
    this.$el.classList.remove(selector);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
