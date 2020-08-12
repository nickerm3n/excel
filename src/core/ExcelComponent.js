import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
  }

  toHTML() {
    return "";
  }

  prepare() {
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  init() {
    this.initDOMlisteners();
  }

  destroy() {
    this.removeDOMlisteners();
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
