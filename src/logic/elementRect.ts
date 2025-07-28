// extended type
export {};

declare global {
  interface DOMRect {
    /**
     * Elements top pixel position in document (including windows scrollY)
     */
    readonly realTop: number;
    /**
     * Elements bottom pixel position in document (including windows scrollY)
     */
    readonly realBottom: number;
  }

}

// adding getter
Object.defineProperty(DOMRect.prototype, 'realTop', {
  get: function () {
    return this.top + window.scrollY
   
  },
  configurable: true,
  enumerable: true,
});

Object.defineProperty(DOMRect.prototype, 'realBottom', {
  get: function () {
    return this.bottom + window.scrollY
   
  },
  configurable: true,
  enumerable: true,
});