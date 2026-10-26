// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t3, e4, o5) {
    if (this._$cssResult$ = true, o5 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s4 = this.t;
    if (e && void 0 === t3) {
      const e4 = void 0 !== s4 && 1 === s4.length;
      e4 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s4, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
var i = (t3, ...e4) => {
  const o5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s4, o6) => e5 + ((t4) => {
    if (true === t4._$cssResult$) return t4.cssText;
    if ("number" == typeof t4) return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t3[o6 + 1], t3[0]);
  return new n(o5, t3, s);
};
var S = (s4, o5) => {
  if (e) s4.adoptedStyleSheets = o5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
  else for (const e4 of o5) {
    const o6 = document.createElement("style"), n4 = t.litNonce;
    void 0 !== n4 && o6.setAttribute("nonce", n4), o6.textContent = e4.cssText, s4.appendChild(o6);
  }
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s4 of t4.cssRules) e4 += s4.cssText;
  return r(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t3, s4) => t3;
var u = { toAttribute(t3, s4) {
  switch (s4) {
    case Boolean:
      t3 = t3 ? l : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, s4) {
  let i5 = t3;
  switch (s4) {
    case Boolean:
      i5 = null !== t3;
      break;
    case Number:
      i5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t3);
      } catch (t4) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t3, s4) => !i2(t3, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ??= []).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t3, s4), !s4.noAccessor) {
      const i5 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t3, i5, s4);
      void 0 !== h3 && e2(this.prototype, t3, h3);
    }
  }
  static getPropertyDescriptor(t3, s4, i5) {
    const { get: e4, set: r4 } = h(this.prototype, t3) ?? { get() {
      return this[s4];
    }, set(t4) {
      this[s4] = t4;
    } };
    return { get: e4, set(s5) {
      const h3 = e4?.call(this);
      r4?.call(this, s5), this.requestUpdate(t3, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t3 = n2(this);
    t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t4 = this.properties, s4 = [...r2(t4), ...o2(t4)];
      for (const i5 of s4) this.createProperty(i5, t4[i5]);
    }
    const t3 = this[Symbol.metadata];
    if (null !== t3) {
      const s4 = litPropertyMetadata.get(t3);
      if (void 0 !== s4) for (const [t4, i5] of s4) this.elementProperties.set(t4, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t4, s4] of this.elementProperties) {
      const i5 = this._$Eu(t4, s4);
      void 0 !== i5 && this._$Eh.set(i5, t4);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i5 = [];
    if (Array.isArray(s4)) {
      const e4 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e4) i5.unshift(c(s5));
    } else void 0 !== s4 && i5.push(c(s4));
    return i5;
  }
  static _$Eu(t3, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
  }
  addController(t3) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
  }
  removeController(t3) {
    this._$EO?.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t3) => t3.hostDisconnected?.());
  }
  attributeChangedCallback(t3, s4, i5) {
    this._$AK(t3, i5);
  }
  _$ET(t3, s4) {
    const i5 = this.constructor.elementProperties.get(t3), e4 = this.constructor._$Eu(t3, i5);
    if (void 0 !== e4 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t3, null == h3 ? this.removeAttribute(e4) : this.setAttribute(e4, h3), this._$Em = null;
    }
  }
  _$AK(t3, s4) {
    const i5 = this.constructor, e4 = i5._$Eh.get(t3);
    if (void 0 !== e4 && this._$Em !== e4) {
      const t4 = i5.getPropertyOptions(e4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
      this._$Em = e4;
      const r4 = h3.fromAttribute(s4, t4.type);
      this[e4] = r4 ?? this._$Ej?.get(e4) ?? r4, this._$Em = null;
    }
  }
  requestUpdate(t3, s4, i5, e4 = false, h3) {
    if (void 0 !== t3) {
      const r4 = this.constructor;
      if (false === e4 && (h3 = this[t3]), i5 ??= r4.getPropertyOptions(t3), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t3) && !this.hasAttribute(r4._$Eu(t3, i5)))) return;
      this.C(t3, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t3, s4, { useDefault: i5, reflect: e4, wrapped: h3 }, r4) {
    i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t3) && (this._$Ej.set(t3, r4 ?? s4 ?? this[t3]), true !== h3 || void 0 !== r4) || (this._$AL.has(t3) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t3, s4)), true === e4 && this._$Em !== t3 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t3));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t5, s5] of this._$Ep) this[t5] = s5;
        this._$Ep = void 0;
      }
      const t4 = this.constructor.elementProperties;
      if (t4.size > 0) for (const [s5, i5] of t4) {
        const { wrapped: t5 } = i5, e4 = this[s5];
        true !== t5 || this._$AL.has(s5) || void 0 === e4 || this.C(s5, void 0, i5, e4);
      }
    }
    let t3 = false;
    const s4 = this._$AL;
    try {
      t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t3 = false, this._$EM(), s5;
    }
    t3 && this._$AE(s4);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$Eq &&= this._$Eq.forEach((t4) => this._$ET(t4, this[t4])), this._$EM();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t3) => t3;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u2 = Array.isArray;
var d2 = (t3) => u2(t3) || "function" == typeof t3?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t3) => (i5, ...s4) => ({ _$litType$: t3, strings: i5, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t3, i5) {
  if (!u2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var N = (t3, i5) => {
  const s4 = t3.length - 1, e4 = [];
  let n4, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t3[i6];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n4 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n4 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n4 = void 0);
    const x2 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e4.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
  }
  return [V(t3, l3 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e4];
};
var S2 = class _S {
  constructor({ strings: t3, _$litType$: i5 }, e4) {
    let r4;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t3.length - 1, d3 = this.parts, [f3, v2] = N(t3, i5);
    if (this.el = _S.createElement(f3, e4), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (r4 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r4.nodeType) {
        if (r4.hasAttributes()) for (const t4 of r4.getAttributeNames()) if (t4.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r4.getAttribute(t4).split(o3), e5 = /([.?@])?(.*)/.exec(i6);
          d3.push({ type: 1, index: l3, name: e5[2], strings: s4, ctor: "." === e5[1] ? I : "?" === e5[1] ? L : "@" === e5[1] ? z : H }), r4.removeAttribute(t4);
        } else t4.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r4.removeAttribute(t4));
        if (y2.test(r4.tagName)) {
          const t4 = r4.textContent.split(o3), i6 = t4.length - 1;
          if (i6 > 0) {
            r4.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r4.append(t4[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r4.append(t4[i6], c3());
          }
        }
      } else if (8 === r4.nodeType) if (r4.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = r4.data.indexOf(o3, t4 + 1)); ) d3.push({ type: 7, index: l3 }), t4 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t3, i5) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t3, s4;
  }
};
function M(t3, i5, s4 = t3, e4) {
  if (i5 === E) return i5;
  let h3 = void 0 !== e4 ? s4._$Co?.[e4] : s4._$Cl;
  const o5 = a2(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o5 && (h3?._$AO?.(false), void 0 === o5 ? h3 = void 0 : (h3 = new o5(t3), h3._$AT(t3, s4, e4)), void 0 !== e4 ? (s4._$Co ??= [])[e4] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t3, h3._$AS(t3, i5.values), h3, e4)), i5;
}
var R = class {
  constructor(t3, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e4 = (t3?.creationScope ?? l2).importNode(i5, true);
    P.currentNode = e4;
    let h3 = P.nextNode(), o5 = 0, n4 = 0, r4 = s4[0];
    for (; void 0 !== r4; ) {
      if (o5 === r4.index) {
        let i6;
        2 === r4.type ? i6 = new k(h3, h3.nextSibling, this, t3) : 1 === r4.type ? i6 = new r4.ctor(h3, r4.name, r4.strings, this, t3) : 6 === r4.type && (i6 = new Z(h3, this, t3)), this._$AV.push(i6), r4 = s4[++n4];
      }
      o5 !== r4?.index && (h3 = P.nextNode(), o5++);
    }
    return P.currentNode = l2, e4;
  }
  p(t3) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t3[i5])), i5++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t3, i5, s4, e4) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s4, this.options = e4, this._$Cv = e4?.isConnected ?? true;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i5 = this) {
    t3 = M(this, t3, i5), a2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d2(t3) ? this.k(t3) : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  _(t3) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l2.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    const { values: i5, _$litType$: s4 } = t3, e4 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e4) this._$AH.p(i5);
    else {
      const t4 = new R(e4, this), s5 = t4.u(this.options);
      t4.p(i5), this.T(s5), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i5 = C.get(t3.strings);
    return void 0 === i5 && C.set(t3.strings, i5 = new S2(t3)), i5;
  }
  k(t3) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e4 = 0;
    for (const h3 of t3) e4 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e4], s4._$AI(h3), e4++;
    e4 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), i5.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t3 !== this._$AB; ) {
      const s5 = i3(t3).nextSibling;
      i3(t3).remove(), t3 = s5;
    }
  }
  setConnected(t3) {
    void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, i5, s4, e4, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e4, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t3, i5 = this, s4, e4) {
    const h3 = this.strings;
    let o5 = false;
    if (void 0 === h3) t3 = M(this, t3, i5, 0), o5 = !a2(t3) || t3 !== this._$AH && t3 !== E, o5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let n4, r4;
      for (t3 = h3[0], n4 = 0; n4 < h3.length - 1; n4++) r4 = M(this, e5[s4 + n4], i5, n4), r4 === E && (r4 = this._$AH[n4]), o5 ||= !a2(r4) || r4 !== this._$AH[n4], r4 === A ? t3 = A : t3 !== A && (t3 += (r4 ?? "") + h3[n4 + 1]), this._$AH[n4] = r4;
    }
    o5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
  }
};
var z = class extends H {
  constructor(t3, i5, s4, e4, h3) {
    super(t3, i5, s4, e4, h3), this.type = 5;
  }
  _$AI(t3, i5 = this) {
    if ((t3 = M(this, t3, i5, 0) ?? A) === E) return;
    const s4 = this._$AH, e4 = t3 === A && s4 !== A || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h3 = t3 !== A && (s4 === A || e4);
    e4 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var Z = class {
  constructor(t3, i5, s4) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    M(this, t3);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
var D = (t3, i5, s4) => {
  const e4 = s4?.renderBefore ?? i5;
  let h3 = e4._$litPart$;
  if (void 0 === h3) {
    const t4 = s4?.renderBefore ?? null;
    e4._$litPart$ = h3 = new k(i5.insertBefore(c3(), t4), t4, void 0, s4 ?? {});
  }
  return h3._$AI(t3), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t3 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t3.firstChild, t3;
  }
  update(t3) {
    const r4 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.2");

// src/styles.ts
var cardStyles = i`
  :host {
    display: block;
    --hisho-ok: var(--success-color, #2f855a);
    --hisho-warn: var(--warning-color, #b7791f);
    --hisho-crit: var(--error-color, #c0392b);
    --hisho-decide: var(--info-color, #2d6cdf);
    --hisho-off: var(--disabled-text-color, #8a8a85);
    --hisho-line: var(--divider-color, rgba(127, 127, 127, 0.25));
    --hisho-soft: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    --hisho-radius: calc(var(--ha-card-border-radius, 12px) - 4px);
  }
  ha-card { padding: 12px 14px; container-type: inline-size; }
  .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; min-height: 28px; }
  /* Hisho's own dashboard labels its sections in spaced capitals ("NEEDS YOU", "MACHINES"): the same here. */
  .title { font-size: 0.86em; font-weight: 600; color: var(--primary-text-color); letter-spacing: 0.08em; text-transform: uppercase; }
  .eyebrow {
    font-size: 0.72em; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--secondary-text-color); margin: 0 0 6px;
  }
  .muted { color: var(--secondary-text-color); font-size: 0.88em; }
  .num { font-variant-numeric: tabular-nums; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 10px; }
  .tile {
    --stripe: var(--hisho-off);
    border: 1px solid var(--hisho-line); border-left: 3px solid var(--stripe); border-radius: var(--hisho-radius);
    padding: 9px 10px; display: flex; flex-direction: column; gap: 6px; min-width: 0;
  }
  .tile.ok { --stripe: var(--hisho-ok); } .tile.warn { --stripe: var(--hisho-warn); }
  .tile.bad { --stripe: var(--hisho-crit); } .tile.decide { --stripe: var(--hisho-decide); }
  .tile.off { --stripe: var(--hisho-off); }
  .tile .name { font-weight: 600; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0; }
  .spread { justify-content: space-between; flex-wrap: nowrap; }
  .grow { flex: 1; min-width: 0; }
  .ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chip {
    display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 1px 8px; font-size: 0.76em;
    font-weight: 500; background: var(--hisho-soft); color: var(--primary-text-color); white-space: nowrap; flex: none;
  }
  .chip.ok { background: color-mix(in srgb, var(--hisho-ok) 20%, transparent); }
  .chip.warn { background: color-mix(in srgb, var(--hisho-warn) 24%, transparent); }
  .chip.bad { background: color-mix(in srgb, var(--hisho-crit) 24%, transparent); }
  .chip.decide { background: color-mix(in srgb, var(--hisho-decide) 22%, transparent); }
  .chip.off { color: var(--secondary-text-color); }
  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex: none; background: var(--hisho-off); }
  .dot.on { background: var(--hisho-ok); }
  .dot.offline { background: var(--hisho-off); }
  .meters { display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 4px 10px; }
  .meter { display: flex; flex-direction: column; gap: 3px; font-size: 0.78em; min-width: 0; }
  .meter .mlabel { display: flex; justify-content: space-between; color: var(--secondary-text-color); }
  .meter .mlabel b { font-weight: 500; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }
  .bar { height: 4px; border-radius: 2px; background: var(--hisho-soft); overflow: hidden; }
  .bar > span { display: block; height: 100%; background: var(--primary-color); }
  .bar.high > span { background: var(--hisho-warn); }
  .bar.full > span { background: var(--hisho-crit); }
  button.act {
    font: inherit; font-size: 0.8em; border: 1px solid var(--hisho-line); background: transparent;
    color: var(--primary-color); border-radius: 999px; padding: 2px 10px; cursor: pointer; line-height: 1.5;
  }
  button.act:hover { background: var(--hisho-soft); }
  button.act.danger { color: var(--hisho-crit); }
  button.act.on { background: color-mix(in srgb, var(--hisho-decide) 18%, transparent); color: var(--primary-text-color); }
  button.act[disabled] { opacity: 0.5; cursor: default; }
  button.link { font: inherit; border: none; background: none; color: var(--primary-color); cursor: pointer; padding: 0; }
  ul.list { list-style: none; margin: 0; padding: 0; }
  ul.list > li { padding: 8px 0; border-top: 1px solid var(--hisho-line); display: flex; flex-direction: column; gap: 5px; }
  ul.list > li:first-child { border-top: none; padding-top: 0; }
  ul.list > li.item { --stripe: transparent; border-left: 3px solid var(--stripe); padding-left: 9px; }
  ul.list > li.item.ok { --stripe: var(--hisho-ok); } ul.list > li.item.warn { --stripe: var(--hisho-warn); }
  ul.list > li.item.bad { --stripe: var(--hisho-crit); } ul.list > li.item.decide { --stripe: var(--hisho-decide); }
  ul.list > li.item.off { --stripe: var(--hisho-off); }
  .detail { color: var(--secondary-text-color); font-size: 0.86em; white-space: pre-wrap; }
  .empty { color: var(--secondary-text-color); padding: 6px 0; font-size: 0.92em; }
  .switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.86em; }
  .kv { display: grid; grid-template-columns: auto 1fr; gap: 2px 12px; font-size: 0.86em; }
  .kv > span:nth-child(odd) { color: var(--secondary-text-color); }
  .kv > span:nth-child(even) { text-align: right; font-variant-numeric: tabular-nums; }
  .chev { transition: transform 0.15s; color: var(--secondary-text-color); font-size: 0.8em; flex: none; }
  .chev.open { transform: rotate(90deg); }
`;
function stateClass(state) {
  switch (state) {
    case "up":
    case "on":
    case "ok":
    case "running":
    case "active":
    case "done":
      return "ok";
    case "warn":
    case "maintenance":
    case "away":
    case "needs_setup":
    case "blocked":
    case "queued":
    case "routed":
      return "warn";
    case "faulted":
    case "unreachable":
    case "problem":
    case "down":
    case "error":
    case "failed":
    case "critical":
      return "bad";
    case "decision":
      return "decide";
    default:
      return "off";
  }
}
function pct(value) {
  const n4 = value === void 0 ? NaN : parseFloat(value);
  return Number.isFinite(n4) ? Math.max(0, Math.min(100, n4)) : void 0;
}

// src/model.ts
var KIND_BY_KEY = [
  ["machines_online", "hub"],
  ["machine_state", "machine"],
  ["box_state", "box"],
  ["addon_status", "addon"]
];
var cache = /* @__PURE__ */ new WeakMap();
function hishoDevices(hass2) {
  const hit = cache.get(hass2.entities ?? {});
  if (hit && hit.devices === hass2.devices) return hit.list;
  const list = indexDevices(hass2);
  if (hass2.entities) cache.set(hass2.entities, { devices: hass2.devices, list });
  return list;
}
function hishoEntityIds(hass2) {
  return hishoDevices(hass2).flatMap((d3) => Object.values(d3.entities).flat());
}
function indexDevices(hass2) {
  const byDevice = /* @__PURE__ */ new Map();
  for (const entry of Object.values(hass2.entities || {})) {
    if (entry.platform !== "hisho" || !entry.device_id || !entry.translation_key) continue;
    const keys = byDevice.get(entry.device_id) ?? {};
    (keys[entry.translation_key] ??= []).push(entry.entity_id);
    byDevice.set(entry.device_id, keys);
  }
  const out = [];
  for (const [id, entities2] of byDevice) {
    const kind = KIND_BY_KEY.find(([key]) => key in entities2)?.[1];
    if (!kind) continue;
    const dev = hass2.devices?.[id];
    out.push({
      id,
      name: dev?.name_by_user || dev?.name || id,
      kind,
      model: dev?.model || "",
      entities: entities2
    });
  }
  return out.sort((a3, b3) => a3.name.localeCompare(b3.name));
}
function byKind(hass2, kind) {
  return hishoDevices(hass2).filter((d3) => d3.kind === kind);
}
function hub(hass2) {
  return byKind(hass2, "hub")[0];
}
function findDevice(hass2, ref, kind) {
  if (!ref) return void 0;
  const wanted = ref.toLowerCase();
  return hishoDevices(hass2).find(
    (d3) => (!kind || d3.kind === kind) && (d3.id === ref || d3.name.toLowerCase() === wanted)
  );
}
function entityId(dev, key) {
  return dev?.entities[key]?.[0];
}
function entity(hass2, dev, key) {
  const id = entityId(dev, key);
  return id ? hass2.states[id] : void 0;
}
function entities(hass2, dev, key) {
  return (dev?.entities[key] ?? []).map((id) => hass2.states[id]).filter((s4) => !!s4);
}
function available(s4) {
  return !!s4 && s4.state !== "unavailable" && s4.state !== "unknown";
}
function allowed(hass2) {
  const s4 = entity(hass2, hub(hass2), "actions_allowed");
  return new Set(s4?.attributes.allowed ?? []);
}
function friendly(s4, device) {
  const name = s4?.attributes.friendly_name ?? "";
  const prefix = device ? device.name + " " : "";
  return name.startsWith(prefix) ? name.slice(prefix.length) : name;
}

// src/base.ts
var HishoCard = class extends i4 {
  static {
    this.properties = { hass: { attribute: false }, config: { attribute: false } };
  }
  static {
    this.styles = cardStyles;
  }
  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this.config = config;
  }
  /** Re-render only when one of Hisho's entities changed (or the config, the user, the registries). */
  shouldUpdate(changed) {
    if (!changed.has("hass") || changed.size > 1) return true;
    const old = changed.get("hass");
    if (!old || old.entities !== this.hass.entities || old.devices !== this.hass.devices || old.user !== this.hass.user) {
      return true;
    }
    return hishoEntityIds(this.hass).some((id) => old.states[id] !== this.hass.states[id]);
  }
  getCardSize() {
    return 4;
  }
  /** HA's sections view: a Hisho card takes its section's full width (sections are the columns). */
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  /** The card's frame: an ha-card, or a plain block when the Control Center embeds it (no card in a card). */
  frame(inner) {
    return this.config.embedded ? b2`<div class="embedded">${inner}</div>` : b2`<ha-card>${inner}</ha-card>`;
  }
  render() {
    if (!this.hass || !this.config) return b2``;
    if (this.hass.user && !this.hass.user.is_admin) {
      return b2`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`;
    }
    if (!hub(this.hass)) {
      return b2`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`;
    }
    return this.body();
  }
  heading(fallback) {
    const text = this.config.title ?? fallback;
    return text ? b2`<div class="title">${text}</div>` : b2``;
  }
};

// src/confirm.ts
var HishoConfirm = class extends i4 {
  static {
    this.properties = { text: {}, open: { type: Boolean, reflect: true } };
  }
  static {
    this.styles = i`
    :host { display: none; }
    :host([open]) {
      display: flex; position: fixed; inset: 0; z-index: 1000; align-items: center; justify-content: center;
      background: rgba(0, 0, 0, 0.45);
    }
    .box {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color); border-radius: var(--ha-card-border-radius, 12px);
      padding: 20px 24px 12px; max-width: min(420px, 90vw); box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
    }
    p { margin: 0 0 16px; line-height: 1.45; }
    .row { display: flex; justify-content: flex-end; gap: 8px; }
    button {
      font: inherit; border: none; border-radius: 18px; padding: 8px 16px; cursor: pointer;
      background: transparent; color: var(--primary-color);
    }
    button.yes { background: var(--error-color, #db4437); color: var(--text-primary-color, #fff); }
  `;
  }
  ask(text) {
    this.text = text;
    this.open = true;
    return new Promise((resolve) => this.resolve = resolve);
  }
  done(ok) {
    this.open = false;
    this.resolve?.(ok);
    this.resolve = void 0;
  }
  render() {
    return b2`<div class="box" role="alertdialog" aria-modal="true">
      <p>${this.text}</p>
      <div class="row">
        <button @click=${() => this.done(false)}>Cancel</button>
        <button class="yes" @click=${() => this.done(true)}>Yes</button>
      </div>
    </div>`;
  }
};
if (!customElements.get("hisho-confirm")) customElements.define("hisho-confirm", HishoConfirm);
function confirmDialog(host, text) {
  const root = host.shadowRoot ?? host;
  let dialog = root.querySelector("hisho-confirm");
  if (!dialog) {
    dialog = document.createElement("hisho-confirm");
    root.appendChild(dialog);
  }
  return dialog.ask(text);
}

// src/actions.ts
async function runAction(host, hass2, action, target = "", args = {}, ask) {
  if (ask && !await confirmDialog(host, ask)) return false;
  await hass2.callService("hisho", "run_action", { action, target, args, confirm: !!ask });
  return true;
}
async function toggle(host, hass2, entityId2, on, ask) {
  if (ask && !await confirmDialog(host, ask)) return false;
  await hass2.callService("switch", on ? "turn_on" : "turn_off", {}, { entity_id: entityId2 });
  return true;
}
async function press(host, hass2, entityId2, ask) {
  if (ask && !await confirmDialog(host, ask)) return false;
  await hass2.callService("button", "press", {}, { entity_id: entityId2 });
  return true;
}
function moreInfo(host, entityId2) {
  host.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entityId2 }, bubbles: true, composed: true }));
}

// src/cards/fleet-card.ts
function meter(label, value) {
  const n4 = pct(value);
  if (n4 === void 0) return b2``;
  return b2`<div class="meter"><div class="mlabel"><span>${label}</span><b>${Math.round(n4)}%</b></div>
    <div class="bar ${n4 >= 95 ? "full" : n4 >= 85 ? "high" : ""}"><span style="width:${n4}%"></span></div></div>`;
}
function meters(hass2, m2) {
  const parts = [["Mem", "memory_usage"], ["Disk", "disk_usage"], ["GPU", "gpu_usage"]].filter(([, key]) => pct(entity(hass2, m2, key)?.state) !== void 0);
  return parts.length ? b2`<div class="meters">${parts.map(([label, key]) => meter(label, entity(hass2, m2, key)?.state))}</div>` : b2``;
}
function machineTile(card, m2) {
  const hass2 = card.hass;
  const state = entity(hass2, m2, "machine_state");
  const online = entity(hass2, m2, "online");
  const parking = entity(hass2, m2, "awake");
  const power = state?.attributes.power ?? [];
  const can2 = allowed(hass2);
  const target = state?.attributes.machine ?? m2.name;
  const maint = entityId(m2, "maintenance");
  const inMaint = maint ? hass2.states[maint]?.state === "on" : false;
  const isOpen = card.expanded.has(m2.id);
  const sub = available(parking) ? parking.state : state?.attributes.reason && online?.state !== "on" ? String(state.attributes.reason) : state?.attributes.role ?? "";
  const tone = inMaint ? "decide" : stateClass(state?.state);
  const kv = (key, label) => {
    const s4 = entity(hass2, m2, key);
    return available(s4) ? b2`<span>${label}</span><span>${s4.state}${s4.attributes.unit_of_measurement ? " " + s4.attributes.unit_of_measurement : ""}</span>` : "";
  };
  const services = entities(hass2, m2, "service");
  const down = services.filter((s4) => s4.state !== "on").length;
  return b2`<div class="tile ${tone}">
    <div class="row spread" style="cursor:pointer" @click=${() => card.flip(m2.id)}>
      <span class="row grow" style="flex-wrap:nowrap"><span class="dot ${online?.state === "on" ? "on" : "offline"}"></span>
        <span class="name">${m2.name}</span></span>
      <span class="row" style="flex-wrap:nowrap"><span class="chip ${tone}">${inMaint ? "maintenance" : state?.state ?? "unknown"}</span>
        <span class="chev ${isOpen ? "open" : ""}">▶</span></span>
    </div>
    ${sub ? b2`<span class="muted ellipsis">${sub}</span>` : ""}
    ${meters(hass2, m2)}
    ${isOpen ? b2`<div class="kv">
        ${kv("jobs_running", "Jobs running")} ${kv("jobs_queued", "Jobs queued")}
        ${kv("containers_running", "Containers")} ${kv("sync_connected", "Sync")}
        ${services.length ? b2`<span>Services</span><span>${services.length - down} of ${services.length} running</span>` : ""}
      </div>` : ""}
    <div class="row">
      ${power.includes("wake") && can2.has("machine.wake") ? b2`<button class="act" @click=${() => runAction(card, hass2, "machine.wake", target)}>Wake</button>` : ""}
      ${power.includes("park") && can2.has("machine.park") ? b2`<button class="act danger" @click=${() => runAction(
    card,
    hass2,
    "machine.park",
    target,
    {},
    `Park ${m2.name}? It powers off until something needs it.`
  )}>Park</button>` : ""}
      ${maint ? b2`<button class="act ${inMaint ? "on" : ""}" title="Maintenance holds its alerts and auto-park"
          @click=${() => toggle(card, hass2, maint, !inMaint, inMaint ? void 0 : `Put ${m2.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${inMaint ? "End maintenance" : "Maintenance"}</button>` : ""}
      ${isOpen && state ? b2`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${() => moreInfo(card, state.entity_id)}>History…</button>` : ""}
    </div>
  </div>`;
}
function fleetMaintSwitch(card, id) {
  const on = card.hass.states[id]?.state === "on";
  return b2`<label class="switch" title="Fleet maintenance">
    <input type="checkbox" .checked=${on}
      @change=${(e4) => {
    const box = e4.target;
    toggle(card, card.hass, id, box.checked, box.checked ? "Put the whole fleet in maintenance? Alerts, auto-park and jobs are held." : void 0).then((done) => {
      if (!done) box.checked = on;
    });
  }} />Fleet maintenance</label>`;
}
var HishoFleetCard = class extends HishoCard {
  static {
    this.properties = { ...HishoCard.properties, expanded: { state: true } };
  }
  static getStubConfig() {
    return { type: "custom:hisho-fleet-card" };
  }
  constructor() {
    super();
    this.expanded = /* @__PURE__ */ new Set();
  }
  flip(id) {
    const next = new Set(this.expanded);
    if (!next.delete(id)) next.add(id);
    this.expanded = next;
  }
  body() {
    const machines = byKind(this.hass, "machine");
    const h3 = hub(this.hass);
    const online = entity(this.hass, h3, "machines_online");
    const fleetMaint = entityId(h3, "fleet_maintenance");
    const reachable = entity(this.hass, h3, "core_reachable");
    return this.frame(b2`
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${reachable?.state === "off" ? b2`<span class="chip bad">Hisho Core unreachable</span>` : ""}
          ${online ? b2`<span class="chip num">${online.state} of ${machines.length} online</span>` : ""}
          ${fleetMaint ? fleetMaintSwitch(this, fleetMaint) : ""}
        </div>
      </div>
      <div class="grid">${machines.map((m2) => machineTile(this, m2))}</div>
    `);
  }
};

// src/cards/control-center.ts
var HishoControlCenterCard = class extends HishoCard {
  static {
    this.properties = { ...HishoCard.properties, expanded: { state: true } };
  }
  static {
    this.styles = [cardStyles, i`
    ha-card { padding: 14px 16px 16px; }
    .brand { font-size: 1.3em; font-weight: 700; letter-spacing: 0.01em; }
    .brand .kanji { font-weight: 600; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(104px, 1fr)); gap: 8px; margin-bottom: 14px; }
    .stat {
      border: 1px solid var(--hisho-line); border-radius: var(--hisho-radius); padding: 8px 10px; min-width: 0;
      display: flex; flex-direction: column; gap: 2px; cursor: pointer; border-top: 3px solid var(--stripe, var(--hisho-line));
    }
    .stat.ok { --stripe: var(--hisho-ok); } .stat.warn { --stripe: var(--hisho-warn); }
    .stat.bad { --stripe: var(--hisho-crit); } .stat.decide { --stripe: var(--hisho-decide); }
    .stat .v { font-size: 1.35em; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.2; }
    .stat .l { font-size: 0.74em; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.06em; }
    .stat .s { font-size: 0.8em; color: var(--secondary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .body { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(320px, 1fr); gap: 16px; align-items: start; }
    .side { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
    .side > * { border: 1px solid var(--hisho-line); border-radius: var(--hisho-radius); padding: 10px 12px; }
    .machines .grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
    @container (max-width: 820px) {
      .body { grid-template-columns: 1fr; }
      .side { order: -1; }
    }
  `];
  }
  static getStubConfig() {
    return { type: "custom:hisho-control-center-card" };
  }
  constructor() {
    super();
    this.expanded = /* @__PURE__ */ new Set();
  }
  getGridOptions() {
    return { columns: "full", min_columns: 12 };
  }
  getCardSize() {
    return 12;
  }
  flip(id) {
    const next = new Set(this.expanded);
    if (!next.delete(id)) next.add(id);
    this.expanded = next;
  }
  body() {
    const hass2 = this.hass;
    const h3 = hub(hass2);
    const machines = byKind(hass2, "machine");
    const reach = entity(hass2, h3, "core_reachable");
    const online = entity(hass2, h3, "machines_online");
    const faulted = entity(hass2, h3, "machines_faulted");
    const needs = entity(hass2, h3, "needs_you_count");
    const alerts = needs?.attributes.alerts ?? [];
    const critical = alerts.filter((a3) => a3.severity === "critical").length;
    const decide = alerts.filter((a3) => a3.severity === "decision").length;
    const jobs = entity(hass2, h3, "jobs_active")?.attributes.jobs ?? [];
    const running = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).length;
    const failed = jobs.filter((j) => j.status === "failed").length;
    const syncProblem = entity(hass2, h3, "sync_problem");
    const conflicts = entity(hass2, h3, "sync_conflicts");
    const fleetMaint = entityId(h3, "fleet_maintenance");
    const maintOn = fleetMaint ? hass2.states[fleetMaint]?.state === "on" : false;
    const nOnline = available(online) ? Number(online.state) : void 0;
    const nFaulted = available(faulted) ? Number(faulted.state) : 0;
    const stat = (tone, value, label, sub, id) => b2`
      <div class="stat ${tone}" @click=${() => id && moreInfo(this, id)}>
        <span class="l">${label}</span><span class="v">${value}</span><span class="s">${sub}</span></div>`;
    const open = alerts.length;
    return this.frame(b2`
      <div class="head">
        <div class="brand">${this.config.title ?? b2`<span class="kanji">秘書</span> Hisho`}</div>
        <div class="row">${maintOn ? b2`<span class="chip decide">fleet in maintenance</span>` : ""}
          ${fleetMaint ? fleetMaintSwitch(this, fleetMaint) : ""}</div>
      </div>
      <div class="stats">
        ${stat(
      reach?.state === "off" ? "bad" : "ok",
      reach?.state === "off" ? "Down" : "Up",
      "Hisho Core",
      reach?.state === "off" ? "Unreachable from Home Assistant" : "Answering",
      reach?.entity_id
    )}
        ${stat(
      nFaulted ? "bad" : nOnline === machines.length ? "ok" : "",
      nOnline !== void 0 ? `${nOnline}/${machines.length}` : "\u2013",
      "Machines online",
      nFaulted ? `${nFaulted} faulted` : machines.length - (nOnline ?? 0) ? `${machines.length - (nOnline ?? 0)} parked or off` : "All up",
      online?.entity_id
    )}
        ${stat(
      critical ? "bad" : open ? "warn" : "ok",
      open,
      "Needs you",
      critical ? `${critical} critical` : decide ? `${decide} to decide` : open ? "Nothing critical" : "All clear",
      needs?.entity_id
    )}
        ${stat(
      failed ? "bad" : running ? "decide" : "ok",
      running,
      "Jobs running",
      failed ? `${failed} failed` : `${jobs.length} recent`,
      entityId(h3, "jobs_active")
    )}
        ${stat(
      syncProblem?.state === "on" ? "bad" : "ok",
      syncProblem?.state === "on" ? "Problem" : "OK",
      "Sync",
      available(conflicts) && Number(conflicts.state) ? `${conflicts.state} conflict files` : "In sync",
      syncProblem?.entity_id
    )}
      </div>
      <div class="body">
        <div class="machines">
          <div class="eyebrow">Machines</div>
          <div class="grid">${machines.map((m2) => machineTile(this, m2))}</div>
        </div>
        <div class="side">
          <hisho-needs-you-card .hass=${hass2} .config=${{
      type: "custom:hisho-needs-you-card",
      embedded: true,
      compact: true,
      limit: this.config.needs_you_limit ?? 6
    }}></hisho-needs-you-card>
          <hisho-jobs-card .hass=${hass2} .config=${{
      type: "custom:hisho-jobs-card",
      embedded: true,
      limit: this.config.jobs_limit ?? 5
    }}></hisho-jobs-card>
        </div>
      </div>
    `);
  }
};

// src/cards/machine-card.ts
var HishoMachineCard = class extends HishoCard {
  static getStubConfig(hass2) {
    const first = hass2 ? Object.values(hass2.devices ?? {}).find((d3) => d3.model && d3.via_device_id) : void 0;
    return { type: "custom:hisho-machine-card", machine: first?.name ?? "" };
  }
  setConfig(config) {
    if (!config?.machine) throw new Error("Say which machine: machine: <name>");
    super.setConfig(config);
  }
  body() {
    const hass2 = this.hass;
    const m2 = findDevice(hass2, this.config.machine, "machine");
    if (!m2) return b2`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;
    const state = entity(hass2, m2, "machine_state");
    const target = state?.attributes.machine ?? m2.name;
    const can2 = allowed(hass2);
    const power = state?.attributes.power ?? [];
    const items = state?.attributes.items ?? [];
    const units = entities(hass2, m2, "unit");
    const restarts = entities(hass2, m2, "restart_unit");
    const services = entities(hass2, m2, "service");
    const maint = entityId(m2, "maintenance");
    const row = (key, label) => {
      const s4 = entity(hass2, m2, key);
      return available(s4) ? b2`<div class="row spread"><span class="muted">${label}</span>
        <span>${s4.state}${s4.attributes.unit_of_measurement ? " " + s4.attributes.unit_of_measurement : ""}</span></div>` : "";
    };
    return b2`<ha-card>
      <div class="head">
        <div class="title">${this.config.title ?? m2.name}</div>
        <span class="chip ${stateClass(state?.state)}">${state?.state ?? "unknown"}</span>
      </div>
      ${state?.attributes.role ? b2`<div class="muted">${state.attributes.role}</div>` : ""}
      <div style="margin:6px 0 8px">${meters(hass2, m2)}</div>
      ${row("awake", "Parking")} ${row("jobs_running", "Jobs running")} ${row("jobs_queued", "Jobs queued")}
      ${row("containers_running", "Containers")} ${row("sync_connected", "Sync")}
      <div class="row" style="margin-top:8px">
        ${power.includes("wake") && can2.has("machine.wake") ? b2`<button class="act" @click=${() => runAction(this, hass2, "machine.wake", target)}>Wake</button>` : ""}
        ${power.includes("park") && can2.has("machine.park") ? b2`<button class="act danger" @click=${() => runAction(
      this,
      hass2,
      "machine.park",
      target,
      {},
      `Park ${m2.name}? It powers off until something needs it.`
    )}>Park</button>` : ""}
        ${maint ? b2`<button class="act ${hass2.states[maint]?.state === "on" ? "" : "danger"}" @click=${() => {
      const on = hass2.states[maint]?.state === "on";
      toggle(this, hass2, maint, !on, on ? void 0 : `Put ${m2.name} in maintenance? Its alerts are held and its VM shuts down.`);
    }}>${hass2.states[maint]?.state === "on" ? "End maintenance" : "Maintenance"}</button>` : ""}
      </div>
      ${services.length || units.length ? b2`<div class="title" style="margin-top:14px;font-size:1em">Services</div>` : ""}
      <ul class="list">
        ${services.map((s4) => b2`<li><div class="row spread"><span>${friendly(s4, m2)}</span>
          <span class="chip ${s4.state === "on" ? "ok" : "bad"}">${s4.state === "on" ? "running" : s4.attributes.state ?? "stopped"}</span></div></li>`)}
        ${units.map((u3) => {
      const label = friendly(u3, m2);
      const restart = restarts.find((r4) => friendly(r4, m2) === `Restart ${label}`);
      const unitState = u3.state;
      return b2`<li><div class="row spread"><span>${label}</span><span class="row">
            ${available(u3) ? b2`<button class="act ${u3.state === "on" ? "danger" : ""}" @click=${() => toggle(this, hass2, u3.entity_id, u3.state !== "on", u3.state === "on" ? `Stop ${label} on ${m2.name}?` : void 0)}>
              ${u3.state === "on" ? "Stop" : "Start"}</button>` : b2`<span class="muted">${unitState}</span>`}
            ${restart ? b2`<button class="act" @click=${() => press(this, hass2, restart.entity_id)}>Restart</button>` : ""}
          </span></div></li>`;
    })}
      </ul>
      ${items.length ? b2`<div class="title" style="margin-top:14px;font-size:1em">From add-ons</div>` : ""}
      <ul class="list">${items.map((it) => b2`<li>
        <div class="row spread"><span>${it.name}</span><span class="chip ${stateClass(it.state)}">${it.state}</span></div>
        ${it.facts?.length ? b2`<div class="detail">${it.facts.join(" \xB7 ")}</div>` : ""}
        ${can2.has("device.press") && it.actions?.length ? b2`<div class="row">${it.actions.map((a3) => b2`
          <button class="act ${a3.danger ? "danger" : ""}" @click=${() => runAction(
      this,
      hass2,
      "device.press",
      it.addon,
      { entry: it.entry, item: it.id, action: a3.id },
      a3.danger ? `${a3.label}: ${it.name} on ${m2.name}?` : void 0
    )}>${a3.label}</button>`)}</div>` : ""}
      </li>`)}</ul>
      <div class="muted" style="margin-top:8px;cursor:pointer" @click=${() => state && moreInfo(this, state.entity_id)}>History…</div>
    </ha-card>`;
  }
};

// src/cards/needs-you-card.ts
var SEVERITY_CLASS = { critical: "bad", decision: "decide", warn: "warn", info: "off" };
var HishoNeedsYouCard = class extends HishoCard {
  static {
    this.properties = {
      ...HishoCard.properties,
      items: { state: true },
      showDone: { state: true },
      expanded: { state: true },
      showAll: { state: true }
    };
  }
  static getStubConfig() {
    return { type: "custom:hisho-needs-you-card" };
  }
  constructor() {
    super();
    this.items = [];
    this.showDone = false;
    this.expanded = /* @__PURE__ */ new Set();
    this.showAll = false;
  }
  updated(changed) {
    super.updated(changed);
    const todo = entityId(hub(this.hass), "needs_you");
    const stamp = todo ? this.hass.states[todo]?.last_changed + "|" + this.hass.states[todo]?.state : void 0;
    if (todo && stamp !== this.seen) {
      this.seen = stamp;
      this.hass.callWS({ type: "todo/item/list", entity_id: todo }).then((r4) => this.items = r4.items ?? []).catch(() => this.items = []);
    }
  }
  body() {
    const hass2 = this.hass;
    const h3 = hub(hass2);
    const open = entity(hass2, h3, "needs_you_count")?.attributes.alerts ?? [];
    const severity = new Map(open.map((a3) => [a3.id, a3.severity]));
    const pairing = open.filter((a3) => a3.severity === "decision" && /asks to connect/.test(a3.title));
    const todo = this.items.filter((i5) => this.showDone || i5.status === "needs_action");
    const done = this.items.filter((i5) => i5.status === "completed").length;
    const limit = this.config.limit ?? 50;
    const shown = this.showAll ? todo : todo.slice(0, limit);
    const can2 = allowed(hass2);
    return this.frame(b2`
      <div class="head">${this.heading("Needs you")}
        <span class="row">${todo.length ? b2`<span class="chip ${open.some((a3) => a3.severity === "critical") ? "bad" : "warn"} num">${todo.filter((i5) => i5.status === "needs_action").length} open</span>` : ""}
        ${done ? b2`<button class="act" @click=${() => this.showDone = !this.showDone}>
          ${this.showDone ? "Hide" : "Show"} ${done} acknowledged</button>` : ""}</span></div>
      ${pairing.map((p3) => b2`<div class="tile decide" style="margin-bottom:8px"><span class="row"><span class="chip decide">decide</span>
        <span>${p3.title}</span></span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${todo.length ? "" : b2`<div class="empty">Nothing needs you right now.</div>`}
      <ul class="list">${shown.map((i5) => {
      const sev = severity.get(i5.uid) ?? (i5.description?.split(":")[0] || "").toLowerCase();
      const acked = i5.status === "completed";
      const isOpen = !this.config.compact || this.expanded.has(i5.uid);
      return b2`<li class="item ${acked ? "off" : stateClass(sev === "warn" ? "warn" : sev)}">
          <div class="row spread" style="cursor:${this.config.compact ? "pointer" : "default"}" @click=${() => this.flip(i5.uid)}>
            <span class="row grow" style="flex-wrap:nowrap"><span class="chip ${acked ? "off" : SEVERITY_CLASS[sev] ?? stateClass(sev)}">${acked ? "acknowledged" : sev || "alert"}</span>
              <span class=${this.config.compact && !isOpen ? "ellipsis" : ""}>${i5.summary}</span></span>
            ${this.config.compact ? b2`<span class="chev ${isOpen ? "open" : ""}">▶</span>` : ""}</div>
          ${isOpen && i5.description ? b2`<div class="detail">${i5.description.replace(/^[A-Z]+:\s*/, "")}</div>` : ""}
          ${isOpen && can2.has("alert.ack") ? b2`<div class="row">
            ${acked ? b2`<button class="act" @click=${() => this.alert(i5.uid, "unack")}>Un-acknowledge</button>` : b2`<button class="act" @click=${() => this.alert(i5.uid, "ack")}>Acknowledge</button>
                     <button class="act" @click=${() => this.alert(i5.uid, "snooze")}>Snooze 1 h</button>`}
            <button class="act" @click=${() => this.alert(i5.uid, "investigate")}>Investigate</button>
            <button class="act" @click=${() => this.alert(i5.uid, "notify")}>Send to phone</button>
          </div>` : ""}
        </li>`;
    })}</ul>
      ${todo.length > shown.length || this.showAll ? b2`<button class="link" style="margin-top:6px;font-size:0.86em"
        @click=${() => this.showAll = !this.showAll}>${this.showAll ? "Show fewer" : `Show all ${todo.length}`}</button>` : ""}
    `);
  }
  flip(uid) {
    if (!this.config.compact) return;
    const next = new Set(this.expanded);
    if (!next.delete(uid)) next.add(uid);
    this.expanded = next;
  }
  alert(id, verb) {
    return runAction(this, this.hass, `alert.${verb}`, id, verb === "snooze" ? { hours: 1 } : {});
  }
};

// src/cards/settings.ts
function fields(schema = {}, labels = {}) {
  return Object.entries(schema).map(([key, raw]) => {
    const optional = raw.endsWith("?");
    const base = raw.replace(/\?$/, "");
    const list = /^list\((.*)\)$/.exec(base);
    return {
      key,
      type: list ? "list" : base,
      optional,
      choices: list ? list[1].split("|").map((c4) => c4.trim()).filter(Boolean) : [],
      label: labels[key] ?? key.replace(/_/g, " ")
    };
  });
}
var isSecret = (f3) => f3.type === "password" || f3.type === "secret";
var SECRET_NAME = /^[A-Z][A-Z0-9_]{2,127}$/;
function fieldInput(f3, value) {
  const name = f3.key;
  if (f3.type === "bool") return b2`<input type="checkbox" name=${name} .checked=${!!value} />`;
  if (f3.type === "list") {
    return b2`<select name=${name}>${f3.choices.map((c4) => b2`<option value=${c4} ?selected=${c4 === value}>${c4}</option>`)}</select>`;
  }
  const type = f3.type === "int" || f3.type === "port" ? "number" : f3.type === "url" ? "url" : "text";
  const hint = isSecret(f3) ? "secret's name, e.g. CLOUDFLARE_EXAMPLE_TOKEN" : f3.optional ? "optional" : "";
  return b2`<input type=${type} name=${name} .value=${value ?? ""} placeholder=${hint}
    pattern=${isSecret(f3) ? "[A-Z][A-Z0-9_]{2,127}" : ".*"} />`;
}
function readForm(form, list, before = {}) {
  const values = {};
  for (const f3 of list) {
    const el2 = form.elements.namedItem(f3.key);
    if (!el2) continue;
    let v2 = el2 instanceof HTMLInputElement && el2.type === "checkbox" ? el2.checked : el2.value.trim();
    if ((f3.type === "int" || f3.type === "port") && v2 !== "") v2 = Number(v2);
    if (isSecret(f3) && v2 && !SECRET_NAME.test(v2)) {
      return { values, error: `${f3.label}: give the secret's name, not its value (paste values in Hisho's dashboard).` };
    }
    if (v2 !== (before[f3.key] ?? (f3.type === "bool" ? false : ""))) values[f3.key] = v2;
  }
  return { values };
}
var formStyles = `
  form.settings { display: grid; grid-template-columns: minmax(110px, 38%) 1fr; gap: 6px 10px; align-items: center; margin: 8px 0; }
  form.settings label { color: var(--secondary-text-color); font-size: 0.9em; overflow-wrap: anywhere; }
  form.settings input, form.settings select {
    font: inherit; padding: 4px 6px; border-radius: 6px; border: 1px solid var(--divider-color);
    background: var(--card-background-color); color: var(--primary-text-color); min-width: 0;
  }
  form.settings input[type=checkbox] { justify-self: start; }
  form.settings .full { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; }
  .error { color: var(--error-color, #db4437); font-size: 0.9em; }
`;

// src/cards/device-card.ts
var can = (hass2, action) => allowed(hass2).has(action);
var HishoDeviceCard = class extends HishoCard {
  static {
    this.properties = { ...HishoCard.properties, error: { state: true } };
  }
  static {
    this.styles = [cardStyles, i`${r(formStyles)}`];
  }
  static getStubConfig() {
    return { type: "custom:hisho-device-card", device: "" };
  }
  setConfig(config) {
    if (!config?.device) throw new Error("Say which device: device: <name>");
    super.setConfig(config);
  }
  body() {
    const dev = findDevice(this.hass, this.config.device, "box") ?? findDevice(this.hass, this.config.device, "addon");
    if (!dev) return b2`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`;
    return dev.kind === "addon" ? this.addon(dev) : this.box(dev);
  }
  maintenance(dev, what) {
    const id = entityId(dev, "maintenance");
    if (!id) return "";
    const on = this.hass.states[id]?.state === "on";
    return b2`<button class="act ${on ? "" : "danger"}" @click=${() => toggle(this, this.hass, id, !on, on ? void 0 : `Put ${what} in maintenance? Its alerts are held.`)}>
      ${on ? "End maintenance" : "Maintenance"}</button>`;
  }
  box(dev) {
    const hass2 = this.hass;
    const power = entity(hass2, dev, "box_state");
    const health = entity(hass2, dev, "box_health");
    const can2 = allowed(hass2);
    return b2`<ha-card>
      <div class="head"><div class="title">${this.config.title ?? dev.name}</div>
        <span class="row"><span class="chip ${stateClass(power?.state)}">${power?.state ?? "unknown"}</span>
          <span class="chip ${stateClass(health?.state)}">${health?.state ?? "unknown"}</span></span></div>
      ${health?.attributes.summary ? b2`<div class="detail">${health.attributes.summary}</div>` : ""}
      <ul class="list" style="margin-top:10px">${entities(hass2, dev, "box_item").map((it) => {
      const a3 = it.attributes;
      return b2`<li>
          <div class="row spread"><span class="name" @click=${() => moreInfo(this, it.entity_id)}>${friendly(it, dev)}</span>
            <span class="chip ${stateClass(it.state)}">${available(it) ? it.state : "unavailable"}</span></div>
          ${a3.facts?.length ? b2`<div class="detail">${a3.facts.join(" \xB7 ")}</div>` : ""}
          ${can2.has("device.press") && a3.actions?.length ? b2`<div class="row">${a3.actions.map((act) => b2`
            <button class="act ${act.danger ? "danger" : ""}" @click=${() => runAction(
        this,
        hass2,
        "device.press",
        a3.addon,
        { entry: a3.entry, item: a3.item_id, action: act.id },
        act.danger ? `${act.label}: ${friendly(it, dev)} on ${dev.name}?` : void 0
      )}>${act.label}</button>`)}</div>` : ""}
        </li>`;
    })}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(dev, dev.name)}</div>
    </ha-card>`;
  }
  addon(dev) {
    const hass2 = this.hass;
    const status = entity(hass2, dev, "addon_status");
    const enabled = entityId(dev, "addon_enabled");
    const a3 = status?.attributes ?? {};
    const allowedNow = allowed(hass2);
    return b2`<ha-card>
      <div class="head"><div class="title">${this.config.title ?? dev.name}</div>
        <span class="chip ${stateClass(status?.state)}">${status?.state ?? "unknown"}</span></div>
      <div class="muted">${[a3.kind, a3.version && "v" + a3.version, a3.host && "on " + a3.host].filter(Boolean).join(" \xB7 ")}</div>
      ${a3.problems?.length ? b2`<ul class="list" style="margin-top:8px">${a3.problems.map((p3) => b2`<li><span class="detail">${p3}</span></li>`)}</ul>` : ""}
      <div class="row" style="margin-top:10px">
        ${allowedNow.has("addon.run") ? (a3.actions ?? []).map((act) => b2`<button class="act ${act.danger ? "danger" : ""}"
          @click=${() => runAction(
      this,
      hass2,
      "addon.run",
      a3.addon,
      { action: act.id },
      act.danger ? `${act.label} (${dev.name})?` : void 0
    )}>${act.label}</button>`) : ""}
        ${this.maintenance(dev, dev.name)}
        ${enabled ? b2`<button class="act ${hass2.states[enabled]?.state === "on" ? "danger" : ""}" @click=${() => {
      const on = hass2.states[enabled]?.state === "on";
      toggle(this, hass2, enabled, !on, on ? `Turn ${dev.name} off? Hisho stops running it.` : void 0);
    }}>${hass2.states[enabled]?.state === "on" ? "Turn off" : "Turn on"}</button>` : ""}
      </div>
      ${allowedNow.has("addon.config") ? this.settings(a3) : ""}
    </ha-card>`;
  }
  settings(a3) {
    const hass2 = this.hass;
    const s4 = a3.settings ?? {};
    const list = fields(s4.schema, {});
    const entryFields = fields(s4.entry_schema, s4.entry_form);
    const entries = s4.entries ?? [];
    if (!list.length && !entryFields.length) return "";
    const save = async (e4) => {
      e4.preventDefault();
      const { values, error } = readForm(e4.target, list, s4.options ?? {});
      this.error = error ?? "";
      if (error || !Object.keys(values).length) return;
      await runAction(this, hass2, "addon.config", a3.addon, { settings: values });
    };
    const addEntry = async (e4, test) => {
      e4.preventDefault();
      const form = e4.target.closest("form");
      const name = form.elements.namedItem("__entry").value.trim();
      const { values, error } = readForm(form, entryFields);
      this.error = error ?? (name ? "" : "Give the entry a name.");
      if (this.error) return;
      await runAction(this, hass2, test ? "addon.test" : "addon.entry", a3.addon, { entry: name, settings: values });
    };
    return b2`<details style="margin-top:12px"><summary class="muted">Settings</summary>
      ${this.error ? b2`<div class="error">${this.error}</div>` : ""}
      ${list.length ? b2`<form class="settings" @submit=${save}>
        ${list.map((f3) => b2`<label>${f3.label}</label>${fieldInput(f3, (s4.options ?? {})[f3.key])}`)}
        <div class="full"><button class="act" type="submit">Save</button>
          ${can(hass2, "addon.apply") ? b2`<button class="act" type="button" @click=${() => runAction(this, hass2, "addon.apply", a3.addon)}>Apply on its machine</button>` : ""}</div>
      </form>` : ""}
      ${entryFields.length ? b2`<div class="muted" style="margin-top:8px">${s4.entry_label ?? "Entries"}</div>
        <ul class="list">${entries.map((name) => b2`<li><div class="row spread"><span>${name}</span>
          <button class="act danger" @click=${() => runAction(
      this,
      hass2,
      "addon.entry",
      a3.addon,
      { entry: name, settings: { _remove: true } },
      `Remove ${name} from ${a3.addon}?`
    )}>Remove</button></div></li>`)}</ul>
        <form class="settings" @submit=${(e4) => addEntry(e4, false)}>
          <label>Name</label><input name="__entry" placeholder="a short name" />
          ${entryFields.map((f3) => b2`<label>${f3.label}</label>${fieldInput(f3, void 0)}`)}
          <div class="full"><button class="act" type="button" @click=${(e4) => addEntry(e4, true)}>Test</button>
            <button class="act" type="submit">Add or replace</button></div>
        </form>` : ""}
    </details>`;
  }
};

// src/cards/lists.ts
var HishoJobsCard = class extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-jobs-card" };
  }
  body() {
    const hass2 = this.hass;
    const jobs = entity(hass2, hub(hass2), "jobs_active")?.attributes.jobs ?? [];
    const can2 = allowed(hass2);
    const limit = this.config.limit ?? 10;
    return this.frame(b2`
      <div class="head">${this.heading("Jobs")}
        ${can2.has("jobs.reap") ? b2`<button class="act" @click=${() => runAction(this, hass2, "jobs.reap")}>Fail stuck jobs</button>` : ""}</div>
      ${jobs.length ? "" : b2`<div class="empty">No jobs.</div>`}
      <ul class="list">${jobs.slice(0, limit).map((j) => {
      const live = ["queued", "routed", "running"].includes(j.status);
      return b2`<li class="item ${stateClass(j.status)}">
          <div class="row spread"><span class="ellipsis">${j.kind}${j.worker ? b2` <span class="muted">on ${j.worker}</span>` : ""}</span>
            <span class="row" style="flex-wrap:nowrap">
            ${live && can2.has("job.cancel") ? b2`<button class="act danger" @click=${() => runAction(this, hass2, "job.cancel", j.id, {}, `Cancel this ${j.kind} job?`)}>Cancel</button>` : ""}
            ${j.status === "failed" && can2.has("job.retry") ? b2`<button class="act" @click=${() => runAction(this, hass2, "job.retry", j.id)}>Retry</button>` : ""}
            ${!live && can2.has("job.clear") ? b2`<button class="act" @click=${() => runAction(this, hass2, "job.clear", j.id)}>Clear</button>` : ""}
            <span class="chip ${stateClass(j.status)}">${j.status}</span></span></div>
          ${j.reason ? b2`<div class="detail">${j.reason}</div>` : ""}
        </li>`;
    })}</ul>
      ${jobs.length > limit ? b2`<div class="muted" style="margin-top:6px">${jobs.length - limit} more on the Projects page</div>` : ""}
    `);
  }
};
var HishoProjectsCard = class extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-projects-card" };
  }
  body() {
    const hass2 = this.hass;
    const all = entity(hass2, hub(hass2), "projects_active")?.attributes.projects ?? [];
    const can2 = allowed(hass2);
    const waiting = (p3) => !!p3.asks?.length || !["", "claude", "hisho"].includes(String(p3.waiting_on ?? "").toLowerCase());
    const shown = all.filter((p3) => p3.status === "active").sort((a3, b3) => Number(waiting(b3)) - Number(waiting(a3)));
    return this.frame(b2`
      <div class="head">${this.heading("Projects")}<span class="muted">${shown.length} active</span></div>
      <ul class="list">${shown.slice(0, this.config.limit ?? 20).map((p3) => b2`<li>
        <div class="row spread"><span class="ellipsis">${p3.title}${p3.company ? b2` <span class="muted">${p3.company}</span>` : ""}</span>
          ${waiting(p3) ? b2`<span class="chip warn">waiting on you</span>` : ""}</div>
        ${p3.asks?.length ? b2`<div class="detail">${p3.asks.join("\n")}</div>` : p3.next ? b2`<div class="detail">Next: ${p3.next}</div>` : ""}
        <div class="row">
          ${can2.has("project.open") ? b2`<button class="act" @click=${() => runAction(this, hass2, "project.open", p3.name)}>Open</button>` : ""}
          ${can2.has("project.archive") ? b2`<button class="act danger" @click=${() => runAction(this, hass2, "project.archive", p3.name, {}, `Archive ${p3.title}? Nothing is deleted; it can be restored.`)}>Archive</button>` : ""}
        </div>
      </li>`)}</ul>
    `);
  }
};

// src/cards/store-card.ts
var HishoStoreCard = class extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-store-card" };
  }
  body() {
    const hass2 = this.hass;
    const sensor = entity(hass2, hub(hass2), "addon_updates");
    const store = sensor?.attributes.store ?? [];
    const repos = sensor?.attributes.repositories ?? [];
    const can2 = allowed(hass2);
    if (!can2.has("store.install") && !can2.has("store.update")) {
      return b2`<ha-card><div class="head">${this.heading("Add-on store")}</div>
        <div class="empty">Hisho does not let this Home Assistant change its add-ons.</div></ha-card>`;
    }
    const sorted = [...store].sort((a3, b3) => Number(!!b3.update_available) - Number(!!a3.update_available) || Number(!!b3.installed) - Number(!!a3.installed) || String(a3.title).localeCompare(String(b3.title)));
    return b2`<ha-card>
      <div class="head">${this.heading("Add-on store")}<span class="muted">${store.filter((a3) => a3.installed).length} installed</span></div>
      <ul class="list">${sorted.map((a3) => b2`<li>
        <div class="row spread"><span>${a3.title}</span>
          <span class="chip ${a3.update_available ? "warn" : a3.installed ? "ok" : "off"}">${a3.update_available ? a3.installed_version === a3.version ? `v${a3.version} \xB7 update available` : `${a3.installed_version} \u2192 ${a3.version}` : a3.installed ? `v${a3.installed_version}` : `v${a3.version}`}</span></div>
        ${a3.description ? b2`<div class="detail">${a3.description}</div>` : ""}
        <div class="row">
          ${!a3.installed && can2.has("store.install") ? b2`<button class="act" @click=${() => runAction(this, hass2, "store.install", a3.name)}>Install</button>` : ""}
          ${a3.update_available && can2.has("store.update") ? b2`<button class="act" @click=${() => runAction(this, hass2, "store.update", a3.name, { host: a3.host ?? "" })}>Update</button>` : ""}
          ${a3.installed && a3.previous && can2.has("store.rollback") ? b2`<button class="act danger" @click=${() => runAction(
      this,
      hass2,
      "store.rollback",
      a3.name,
      { host: a3.host ?? "" },
      `Roll ${a3.title} back to the version before? Its settings are kept.`
    )}>Roll back</button>` : ""}
          ${a3.installed && can2.has("store.remove") ? b2`<button class="act danger" @click=${() => runAction(
      this,
      hass2,
      "store.remove",
      a3.name,
      { host: a3.host ?? "" },
      `Remove ${a3.title}? Its settings are kept; install it again any time.`
    )}>Remove</button>` : ""}
        </div></li>`)}</ul>
      <div class="title" style="margin-top:14px;font-size:1em">Repositories</div>
      <ul class="list">${repos.map((r4) => b2`<li><div class="row spread">
        <span>${r4.name}${r4.listed === "store" ? b2` <span class="muted">store</span>` : ""}</span>
        <span class="row">
          ${can2.has("repository.update") ? b2`<button class="act" @click=${() => runAction(this, hass2, "repository.update", r4.url)}>Update</button>` : ""}
          ${r4.listed !== "store" && can2.has("repository.remove") ? b2`<button class="act danger" @click=${() => runAction(this, hass2, "repository.remove", r4.url, {}, `Remove the repository ${r4.name}?`)}>Remove</button>` : ""}
        </span></div></li>`)}</ul>
      ${can2.has("repository.add") ? b2`<form class="row" style="margin-top:8px" @submit=${(e4) => {
      e4.preventDefault();
      const input = e4.target.elements.namedItem("url");
      if (input.value.trim()) runAction(this, hass2, "repository.add", input.value.trim()).then(() => input.value = "");
    }}><input name="url" placeholder="https://github.com/you/hisho-addon-name" style="flex:1;font:inherit;padding:4px 6px;
        border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)" />
        <button class="act" type="submit">Add repository</button></form>` : ""}
    </ha-card>`;
  }
};

// src/strategy.ts
function sections(view, groups) {
  return {
    ...view,
    type: "sections",
    max_columns: 4,
    dense_section_placement: true,
    sections: groups.filter((g2) => (Array.isArray(g2) ? g2 : g2.cards).length).map((g2) => Array.isArray(g2) ? { type: "grid", cards: g2 } : g2)
  };
}
var KIND_ORDER = ["Server", "Vm", "Storage", "Device", "Network"];
var KIND_TITLE = {
  Server: "Servers",
  Vm: "Virtual machines",
  Storage: "Storage",
  Device: "Devices",
  Network: "Network"
};
function generateDashboard(hass2) {
  const h3 = hub(hass2);
  if (!h3) {
    return {
      title: "Hisho",
      views: [{ title: "Hisho", path: "hisho", icon: "mdi:server-network", cards: [{
        type: "markdown",
        content: "The **Hisho** integration is not set up yet: Settings \u203A Devices & services \u203A Add integration \u203A Hisho."
      }] }]
    };
  }
  const machines = byKind(hass2, "machine");
  const boxes = byKind(hass2, "box");
  const addons = byKind(hass2, "addon");
  const todayList = entityId(h3, "today");
  const dueDates = entityId(h3, "due_dates");
  const phone = ["phone", "phone_alerts", "clear_phone", "hide_acked"].map((k2) => entityId(h3, k2)).filter((id) => !!id);
  const groups = /* @__PURE__ */ new Map();
  for (const b3 of boxes) {
    const kind = KIND_ORDER.includes(b3.model) ? b3.model : "Device";
    groups.set(kind, [...groups.get(kind) ?? [], b3.name]);
  }
  return {
    title: "Hisho",
    views: [
      // The Control Center fills the screen: a panel view is one card, full width.
      {
        title: "Overview",
        path: "overview",
        icon: "mdi:view-dashboard",
        type: "panel",
        cards: [{ type: "custom:hisho-control-center-card" }]
      },
      sections(
        { title: "Machines", path: "machines", icon: "mdi:server" },
        machines.map((m2) => [{ type: "custom:hisho-machine-card", machine: m2.name }])
      ),
      sections(
        { title: "Devices", path: "devices", icon: "mdi:devices" },
        KIND_ORDER.filter((k2) => groups.has(k2)).map((k2) => [
          { type: "heading", heading: KIND_TITLE[k2] },
          ...groups.get(k2).map((name) => ({ type: "custom:hisho-device-card", device: name }))
        ])
      ),
      sections({ title: "Add-ons", path: "addons", icon: "mdi:puzzle" }, [
        ...entityId(h3, "addon_updates") ? [{ type: "grid", column_span: 2, cards: [{ type: "custom:hisho-store-card" }] }] : [],
        ...addons.map((a3) => [{ type: "custom:hisho-device-card", device: a3.name }])
      ]),
      ...todayList || dueDates ? [sections({ title: "Today", path: "today", icon: "mdi:calendar-today" }, [
        todayList ? [{ type: "todo-list", entity: todayList, title: "Today" }] : [],
        dueDates ? { type: "grid", column_span: 3, cards: [
          { type: "calendar", entities: [dueDates], initial_view: "dayGridMonth", title: "Due dates" }
        ] } : []
      ])] : [],
      sections({ title: "Projects", path: "projects", icon: "mdi:folder-multiple" }, [
        { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-projects-card" }] },
        { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-jobs-card", title: "All jobs", limit: 50 }] }
      ]),
      sections({ title: "Phone", path: "phone", icon: "mdi:cellphone-message" }, [[
        { type: "entities", title: "Hisho phone app", entities: phone },
        { type: "markdown", content: "Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity." }
      ]])
    ]
  };
}
var HishoDashboardStrategy = class extends HTMLElement {
  static async generate(_config, hass2) {
    return generateDashboard(hass2);
  }
};

// src/index.ts
var VERSION = "0.4.0";
var CARDS = [
  [
    "hisho-control-center-card",
    HishoControlCenterCard,
    "Hisho control center",
    "Hisho's Overview in one wide card: stats, machine tiles, needs you and jobs. Best in a panel view."
  ],
  ["hisho-fleet-card", HishoFleetCard, "Hisho fleet", "Every machine: state, readings, wake / park, maintenance."],
  ["hisho-machine-card", HishoMachineCard, "Hisho machine", "One machine in full: readings, services, its add-on buttons."],
  ["hisho-needs-you-card", HishoNeedsYouCard, "Hisho needs you", "Hisho's needs-you list: acknowledge, snooze, investigate."],
  ["hisho-device-card", HishoDeviceCard, "Hisho device", "A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],
  ["hisho-jobs-card", HishoJobsCard, "Hisho jobs", "Hisho's jobs: cancel, retry, clear."],
  ["hisho-projects-card", HishoProjectsCard, "Hisho projects", "Active projects, what waits on you, open or archive."],
  ["hisho-store-card", HishoStoreCard, "Hisho add-on store", "Install, update, roll back or remove add-ons; repositories."]
];
for (const [tag, cls] of CARDS) {
  if (!customElements.get(tag)) customElements.define(tag, cls);
}
if (!customElements.get("ll-strategy-dashboard-hisho")) {
  customElements.define("ll-strategy-dashboard-hisho", HishoDashboardStrategy);
}
var w2 = window;
w2.customCards = w2.customCards || [];
for (const [tag, , name, description] of CARDS) {
  if (!w2.customCards.some((c4) => c4.type === tag)) {
    w2.customCards.push({ type: tag, name, description, preview: false, documentationURL: "https://github.com/YepizTechJonathan/hisho-ha-cards" });
  }
}
w2.customStrategies = w2.customStrategies || [];
if (!w2.customStrategies.some((s4) => s4.type === "hisho")) {
  w2.customStrategies.push({
    type: "hisho",
    strategyType: "dashboard",
    name: "Hisho",
    description: "A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects."
  });
}
console.info(`%c HISHO-HA-CARDS %c ${VERSION} `, "background:#151515;color:#eee", "background:#444;color:#fff");

// demo/vitest-shim.js
var vi = { fn: () => {
  const f3 = (...a3) => f3.impl(...a3);
  f3.mockResolvedValue = (v2) => {
    f3.impl = async () => v2;
    return f3;
  };
  f3.impl = async () => ({});
  return f3;
} };

// tests/fake-hass.ts
function fakeHass(overrides = {}) {
  const allowed2 = overrides.allowed ?? [
    "machine.wake",
    "machine.park",
    "alert.ack",
    "alert.unack",
    "alert.snooze",
    "alert.investigate",
    "alert.notify",
    "device.press",
    "addon.run",
    "job.cancel",
    "job.retry",
    "job.clear",
    "jobs.reap",
    "project.open",
    "project.archive",
    "unit.start",
    "unit.stop",
    "unit.restart",
    "maintenance.on",
    "maintenance.off",
    "addon.enable",
    "addon.disable",
    "addon.config",
    "addon.entry",
    "addon.test",
    "addon.apply",
    "store.install",
    "store.update",
    "store.rollback",
    "store.remove",
    "repository.add",
    "repository.update",
    "repository.remove"
  ];
  const devices = {
    hub: { id: "hub", name: "Hisho", model: "Control plane", entry_type: "service" },
    ren: { id: "ren", name: "Hashira Ren", model: "hashira-gpu", via_device_id: "hub" },
    souko: { id: "souko", name: "Souko", model: "Souko workstation", via_device_id: "hub" },
    truenas: { id: "truenas", name: "truenas", model: "Storage", via_device_id: "hub" },
    ionos: { id: "ionos", name: "ionos", model: "Server", via_device_id: "hub" },
    wf: { id: "wf", name: "Web Factory", model: "Add-on", via_device_id: "hub", entry_type: "service" }
  };
  const ents = [
    ["sensor.hisho_machines_online", "hub", "machines_online", "2"],
    ["binary_sensor.hisho_core_reachable", "hub", "core_reachable", "on"],
    ["sensor.hisho_actions_allowed", "hub", "actions_allowed", String(allowed2.length), { allowed: allowed2 }],
    ["sensor.hisho_needs_you", "hub", "needs_you_count", "1", { alerts: [
      { id: "a1", severity: "critical", title: "TrueNAS: pool Potter is unhealthy" }
    ] }],
    ["todo.hisho_needs_you", "hub", "needs_you", "1"],
    ["switch.hisho_fleet_maintenance", "hub", "fleet_maintenance", "off"],
    ["todo.hisho_today", "hub", "today", "1"],
    ["sensor.hisho_addon_updates", "hub", "addon_updates", "1", {
      store: [
        {
          name: "web-factory",
          title: "Web Factory",
          installed: true,
          installed_version: "0.6.0",
          version: "0.7.0",
          update_available: true,
          host: "kihon",
          previous: "0.5.0",
          description: "Builds sites"
        },
        { name: "vikunja", title: "Vikunja", installed: false, version: "0.2.0", description: "Tasks" }
      ],
      repositories: [{ url: "https://github.com/me/hisho-addon-x", name: "me/hisho-addon-x", listed: null }]
    }],
    ["calendar.hisho_due_dates", "hub", "due_dates", "off"],
    ["sensor.hisho_jobs_active", "hub", "jobs_active", "1", { jobs: [
      { id: "job-1", kind: "transcribe", status: "running", worker: "souko" },
      { id: "job-2", kind: "transcribe", status: "failed", worker: "souko", reason: "no input" }
    ] }],
    ["sensor.hisho_projects_active", "hub", "projects_active", "2", { projects: [
      { name: "AMP", title: "AMP", status: "active", asks: [] },
      {
        name: "Security follow-ups",
        title: "Security follow-ups",
        status: "active",
        waiting_on: "jonathan",
        asks: ["Rotate the password"]
      }
    ] }],
    ["sensor.hashira_ren_state", "ren", "machine_state", "up", { machine: "hashira-ren", power: ["park", "wake"], items: [] }],
    ["binary_sensor.hashira_ren_online", "ren", "online", "on"],
    ["sensor.hashira_ren_memory_usage", "ren", "memory_usage", "2.0"],
    ["sensor.hashira_ren_parking", "ren", "awake", "parks in 16m"],
    ["switch.hashira_ren_maintenance", "ren", "maintenance", "off"],
    ["sensor.souko_state", "souko", "machine_state", "up", { machine: "souko", power: [], items: [
      {
        addon: "prometheus",
        entry: "souko",
        id: "exporter",
        name: "node_exporter",
        state: "up",
        facts: [],
        actions: [{ id: "install", label: "Reinstall", danger: true }]
      }
    ] }],
    ["binary_sensor.souko_online", "souko", "online", "on"],
    ["switch.souko_ollama", "souko", "unit", "off", { friendly_name: "Souko Ollama" }],
    ["sensor.truenas_power", "truenas", "box_state", "on"],
    ["sensor.truenas_health", "truenas", "box_health", "problem", { summary: "Pool Potter not ok" }],
    ["sensor.truenas_truenasce", "truenas", "box_item", "up", {
      friendly_name: "truenas TruenasCE",
      addon: "proxmox",
      entry: "PVE",
      item_id: "521",
      facts: ["VM 521 on pve"],
      actions: [{ id: "shutdown", label: "shut down", danger: true }]
    }],
    ["sensor.ionos_power", "ionos", "box_state", "on"],
    ["sensor.web_factory_status", "wf", "addon_status", "ok", {
      addon: "web-factory",
      kind: "integration",
      version: "0.6.0",
      problems: [],
      actions: [{ id: "deploy-dev", label: "Deploy dev now", danger: false }],
      settings: {
        schema: { builder: "list(claude|codex)", builder_timeout: "int", worker_token: "password" },
        options: { builder: "claude", builder_timeout: 1800, worker_token: "WEBFACTORY_TOKEN" },
        entry_label: "Site",
        entry_schema: { domain: "str", token: "password?" },
        entry_form: { domain: "Domain" },
        entries: ["yepiz-tech"]
      }
    }]
  ];
  const states = {};
  const entities2 = {};
  for (const [id, device, key, state, attrs] of ents) {
    if (overrides.noHisho) break;
    states[id] = { entity_id: id, state, attributes: attrs ?? {}, last_changed: "2026-10-25T00:00:00Z" };
    entities2[id] = { entity_id: id, device_id: device, platform: "hisho", translation_key: key };
  }
  return {
    states,
    entities: entities2,
    devices,
    callService: vi.fn().mockResolvedValue({}),
    callWS: vi.fn().mockResolvedValue({ items: [
      {
        uid: "a1",
        summary: "TrueNAS: pool Potter is unhealthy",
        status: "needs_action",
        description: "CRITICAL: Pool Potter is online but ZFS reports errors.\n\nClaude: Disk sdh, or its cable."
      },
      { uid: "a2", summary: "IONOS: updates", status: "completed", description: "WARN: 21 pending" }
    ] })
  };
}

// <stdin>
var hass = fakeHass();
var add = (id, device, key, state, attributes = {}) => {
  hass.states[id] = { entity_id: id, state, attributes, last_changed: "2026-10-25T00:00:00Z" };
  hass.entities[id] = { entity_id: id, device_id: device, platform: "hisho", translation_key: key };
};
hass.devices.kihon = { id: "kihon", name: "Kihon", model: "control plane", via_device_id: "hub" };
hass.devices.ten = { id: "ten", name: "Hashira Ten", model: "hashira-tools", via_device_id: "hub" };
add("sensor.kihon_state", "kihon", "machine_state", "up", { machine: "kihon", power: [], role: "Hisho Core + dashboard" });
add("binary_sensor.kihon_online", "kihon", "online", "on");
add("sensor.kihon_memory", "kihon", "memory_usage", "21");
add("sensor.kihon_disk", "kihon", "disk_usage", "15");
add("switch.kihon_maint", "kihon", "maintenance", "off");
add("sensor.kihon_containers", "kihon", "containers_running", "14");
add("sensor.ten_state", "ten", "machine_state", "parked", { machine: "hashira-ten", power: ["wake"], reason: "parked: idle 30 min" });
add("binary_sensor.ten_online", "ten", "online", "off");
add("switch.ten_maint", "ten", "maintenance", "off");
add("sensor.ren_disk", "ren", "disk_usage", "35");
add("sensor.ren_gpu", "ren", "gpu_usage", "62");
add("sensor.souko_mem", "souko", "memory_usage", "11");
add("sensor.souko_disk", "souko", "disk_usage", "4");
add("sensor.souko_gpu", "souko", "gpu_usage", "6");
add("switch.souko_maint", "souko", "maintenance", "off");
hass.states["sensor.hisho_machines_online"].state = "3";
hass.states["sensor.hisho_needs_you"].state = "4";
hass.states["sensor.hisho_needs_you"].attributes.alerts = [
  { id: "a1", severity: "critical", title: "TrueNAS: pool Potter is unhealthy" },
  { id: "a3", severity: "decision", title: "Rotate the reused password everywhere it was used" },
  { id: "a4", severity: "warn", title: "Semaphore: Authorized Keys - Manual Guarded failed" },
  { id: "a5", severity: "warn", title: "PatriotPoint: SAM.gov renewal due October 29" }
];
hass.callWS = async () => ({ items: [
  {
    uid: "a1",
    summary: "TrueNAS: pool Potter is unhealthy",
    status: "needs_action",
    description: "CRITICAL: Pool Potter is online but ZFS reports 224 data errors from the last scrub.\n\nClaude: disk sdh, or its cable; the disks also run hot (57 \xB0C)."
  },
  { uid: "a3", summary: "Rotate the reused password everywhere it was used", status: "needs_action", description: "DECISION: Security follow-ups" },
  { uid: "a4", summary: "Semaphore: Authorized Keys - Manual Guarded failed", status: "needs_action", description: "WARN: failed on October 25" },
  { uid: "a5", summary: "PatriotPoint: SAM.gov renewal due October 29", status: "needs_action", description: "WARN: confirm it was approved" }
] });
var el = document.createElement("hisho-control-center-card");
el.setConfig({ type: "custom:hisho-control-center-card" });
el.hass = hass;
document.getElementById("panel").appendChild(el);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
