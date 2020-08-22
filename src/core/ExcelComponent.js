import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $getState() {
    return this.store.getState()
  }

  storeChanged() {
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMlisteners();
  }

  destroy() {
    this.removeDOMlisteners();
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
