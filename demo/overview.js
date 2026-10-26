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
    let a3, u3, d4 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n4 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n4 ?? v, d4 = -1) : void 0 === u3[1] ? d4 = -2 : (d4 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n4 = void 0);
    const x2 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d4 >= 0 ? (e4.push(a3), s5.slice(0, d4) + h2 + s5.slice(d4) + o3 + x2) : s5 + o3 + (-2 === d4 ? i6 : x2);
  }
  return [V(t3, l3 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e4];
};
var S2 = class _S {
  constructor({ strings: t3, _$litType$: i5 }, e4) {
    let r4;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t3.length - 1, d4 = this.parts, [f3, v2] = N(t3, i5);
    if (this.el = _S.createElement(f3, e4), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (r4 = P.nextNode()) && d4.length < u3; ) {
      if (1 === r4.nodeType) {
        if (r4.hasAttributes()) for (const t4 of r4.getAttributeNames()) if (t4.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r4.getAttribute(t4).split(o3), e5 = /([.?@])?(.*)/.exec(i6);
          d4.push({ type: 1, index: l3, name: e5[2], strings: s4, ctor: "." === e5[1] ? I : "?" === e5[1] ? L : "@" === e5[1] ? z : H }), r4.removeAttribute(t4);
        } else t4.startsWith(o3) && (d4.push({ type: 6, index: l3 }), r4.removeAttribute(t4));
        if (y2.test(r4.tagName)) {
          const t4 = r4.textContent.split(o3), i6 = t4.length - 1;
          if (i6 > 0) {
            r4.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r4.append(t4[s4], c3()), P.nextNode(), d4.push({ type: 2, index: ++l3 });
            r4.append(t4[i6], c3());
          }
        }
      } else if (8 === r4.nodeType) if (r4.data === n3) d4.push({ type: 2, index: l3 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = r4.data.indexOf(o3, t4 + 1)); ) d4.push({ type: 7, index: l3 }), t4 += o3.length - 1;
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
var DEFAULT_PICTURE = "/hisho_static/forest.jpg";
function viewBackground(picture = DEFAULT_PICTURE) {
  const pic = picture ? `linear-gradient(rgba(6, 10, 7, 0.22), rgba(6, 10, 7, 0.5)), url("${picture}") center / cover no-repeat, ` : "";
  return `${pic}linear-gradient(180deg, #0a110d 0%, #1b2219 45%, #4a3a27 62%, #121a13 80%, #0a100b 100%) fixed`;
}
var HA_CARD_GLASS = "ha-card { background: rgba(14, 20, 16, 0.6); backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%); border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 22px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35); --primary-text-color: #eef0ea; --secondary-text-color: #a7ae9f; --divider-color: rgba(255, 255, 255, 0.08); --primary-color: #5f9e74; --card-background-color: transparent; --ha-card-background: transparent; }";
var cardStyles = i`
  :host {
    display: block;
    /* Forest green and warm brown; the state colours sit in the same earthy family. */
    --hisho-accent: var(--hisho-theme-accent, #3f7d58);
    --hisho-accent-text: var(--hisho-theme-accent-text, #8cc7a1);
    --hisho-brown: var(--hisho-theme-brown, #9c7148);
    --hisho-brown-text: var(--hisho-theme-brown-text, #d4ab7c);
    --hisho-accent-2: var(--hisho-brown);
    --hisho-ok: #6fbf8a;
    --hisho-warn: #dba64b;
    --hisho-crit: #e06a5f;
    --hisho-decide: #93aed0;
    --hisho-off: #848b7e;
    --hisho-glass: var(--hisho-theme-glass, rgba(14, 20, 16, 0.6));
    --hisho-inset: rgba(255, 255, 255, 0.045);
    --hisho-inset-hi: rgba(255, 255, 255, 0.085);
    --hisho-edge: rgba(255, 255, 255, 0.09);
    --hisho-line: rgba(255, 255, 255, 0.07);
    --hisho-soft: rgba(255, 255, 255, 0.06);
    --hisho-text: #eef0ea;
    --hisho-text-2: #a7ae9f;
    --hisho-radius: 16px;
    --hisho-radius-lg: 22px;
    color: var(--hisho-text);
    font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif));
    /* HA's own elements inside a card (dialogs aside) read these. */
    --primary-text-color: var(--hisho-text);
    --secondary-text-color: var(--hisho-text-2);
  }
  ha-card {
    padding: 16px 18px; container-type: inline-size; color: var(--hisho-text);
    background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
    backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  .embedded { container-type: inline-size; }
  /* One machine in full: side by side when there's room (readings | services), stacked when not. */
  .mcard { display: grid; grid-template-columns: 1fr; gap: 18px; }
  .mright:empty { display: none; }
  .kvrow { font-size: 0.9em; padding: 3px 0; max-width: 420px; }
  @container (min-width: 760px) { .mcard { grid-template-columns: minmax(300px, 420px) 1fr; gap: 28px; } }
  @container (max-width: 400px) { ul.list .row.spread { flex-wrap: wrap; } }
  .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; min-height: 28px; }
  .title { font-size: 0.8em; font-weight: 600; color: var(--hisho-brown-text); letter-spacing: 0.12em; text-transform: uppercase; }
  .eyebrow {
    font-size: 0.74em; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--hisho-text-2); margin: 0 0 10px;
  }
  .muted { color: var(--hisho-text-2); font-size: 0.88em; }
  .num { font-variant-numeric: tabular-nums; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; }

  /* An inset panel inside a card: a machine, a box, a store entry. A thin gradient along its top says its state. */
  .tile {
    --stripe: var(--hisho-off);
    position: relative; overflow: hidden; background: var(--hisho-inset); border: 1px solid var(--hisho-line);
    border-radius: var(--hisho-radius); padding: 12px 13px; display: flex; flex-direction: column; gap: 8px; min-width: 0;
    transition: background 0.2s, border-color 0.2s;
  }
  .tile::before {
    content: ""; position: absolute; inset: 0 0 auto 0; height: 2px;
    background: linear-gradient(90deg, var(--stripe), transparent 75%); opacity: 0.9;
  }
  .tile:hover { background: var(--hisho-inset-hi); }
  .tile.ok { --stripe: var(--hisho-ok); } .tile.warn { --stripe: var(--hisho-warn); }
  .tile.bad { --stripe: var(--hisho-crit); } .tile.decide { --stripe: var(--hisho-decide); }
  .tile.off { --stripe: var(--hisho-off); } .tile.brown { --stripe: var(--hisho-brown-text); }
  .tile.mtile { padding-bottom: 0; gap: 10px; }
  .tile.mtile.asleep .rings { opacity: 0.45; }
  .mhead { display: flex; align-items: center; gap: 10px; cursor: pointer; min-width: 0; }
  .mhead .grow { display: flex; flex-direction: column; gap: 1px; }
  .mhead .name { font-size: 1.02em; font-weight: 600; }
  .mhead .sub { font-size: 0.8em; }
  .tile .acts:empty { display: none; }
  .sparkwrap { position: relative; margin: 0 -13px; height: 46px; }
  .sparkwrap .sparkl { position: absolute; right: 13px; top: 0; font-size: 0.66em; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--hisho-text-2); z-index: 1; }
  .tile.mtile > .acts:last-child { padding-bottom: 12px; }
  .tile .name { font-weight: 600; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0; }
  .spread { justify-content: space-between; flex-wrap: nowrap; }
  .grow { flex: 1; min-width: 0; }
  .ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* A state word in its colour, with a dot. */
  .chip {
    --c: var(--hisho-off);
    display: inline-flex; align-items: center; gap: 5px; border-radius: 999px; padding: 2px 9px 2px 8px;
    font-size: 0.74em; font-weight: 600; letter-spacing: 0.02em; white-space: nowrap; flex: none;
    color: color-mix(in srgb, var(--c) 85%, white); background: color-mix(in srgb, var(--c) 16%, transparent);
  }
  .chip::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--c); flex: none; }
  .chip.ok { --c: var(--hisho-ok); } .chip.warn { --c: var(--hisho-warn); } .chip.bad { --c: var(--hisho-crit); }
  .chip.decide { --c: var(--hisho-decide); } .chip.off { --c: var(--hisho-off); color: var(--hisho-text-2); }
  .chip.brown { --c: var(--hisho-brown-text); }
  .chip.plain::before { display: none; }

  /* A round icon in a soft circle of its state's colour (examples: the machine, a needs-you severity). */
  .bubble {
    --c: var(--hisho-off);
    width: 38px; height: 38px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
    flex: none; color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent);
  }
  .bubble svg { width: 21px; height: 21px; fill: currentColor; }
  .bubble.sm { width: 30px; height: 30px; } .bubble.sm svg { width: 17px; height: 17px; }
  .bubble.ok { --c: var(--hisho-ok); } .bubble.warn { --c: var(--hisho-warn); } .bubble.bad { --c: var(--hisho-crit); }
  .bubble.decide { --c: var(--hisho-decide); } .bubble.accent { --c: var(--hisho-accent-text); }
  .bubble.brown { --c: var(--hisho-brown-text); } .bubble.off { --c: var(--hisho-off); }
  .bubble.pulse { animation: hisho-pulse 2.4s ease-in-out infinite; }
  @keyframes hisho-pulse {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 45%, transparent); }
    50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--c) 0%, transparent); }
  }
  svg.i { width: 16px; height: 16px; fill: currentColor; flex: none; }

  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex: none; background: var(--hisho-off); }
  .dot.on { background: var(--hisho-ok); box-shadow: 0 0 8px var(--hisho-ok); }
  .dot.offline { background: var(--hisho-off); }

  /* Readings as rings. */
  .rings { display: flex; gap: 6px; justify-content: space-between; }
  .ring { position: relative; width: 62px; height: 56px; flex: 1; display: flex; justify-content: center; }
  .ring svg { width: 62px; height: 56px; overflow: visible; }
  .ring .track { stroke: rgba(255, 255, 255, 0.08); }
  .ring .val { transition: stroke-dashoffset 0.8s ease; filter: drop-shadow(0 0 3px color-mix(in srgb, currentColor 60%, transparent)); }
  .ring .rv { position: absolute; top: 17px; left: 0; right: 0; text-align: center; font-size: 1em; font-weight: 300;
    font-variant-numeric: tabular-nums; line-height: 1; }
  .ring .rv small { font-size: 0.6em; color: var(--hisho-text-2); }
  .ring .rl { position: absolute; bottom: -2px; left: 0; right: 0; text-align: center; font-size: 0.66em; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--hisho-text-2); }

  /* Buttons: glass pills; the risky ones in red, an active toggle in the accent. */
  button.act {
    font: inherit; font-size: 0.8em; font-weight: 500; border: 1px solid var(--hisho-edge); background: var(--hisho-soft);
    color: var(--hisho-text); border-radius: 999px; padding: 4px 12px; cursor: pointer; line-height: 1.5;
    display: inline-flex; align-items: center; gap: 5px; transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }
  button.act svg { width: 14px; height: 14px; fill: currentColor; }
  button.act:hover { background: var(--hisho-inset-hi); border-color: rgba(255, 255, 255, 0.16); }
  button.act:active { transform: scale(0.97); }
  button.act.danger { color: #f0968c; }
  button.act.brown { background: color-mix(in srgb, var(--hisho-brown) 55%, transparent); border-color: transparent; }
  button.act.on, button.act.primary { background: var(--hisho-accent); border-color: transparent; color: #fff;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--hisho-accent) 40%, transparent); }
  button.act[disabled] { opacity: 0.5; cursor: default; }
  button.link { font: inherit; border: none; background: none; color: var(--hisho-accent-text); cursor: pointer; padding: 0; }
  /* "All machines →" beside a section's name, like a tile dashboard's "More". */
  button.more {
    font: inherit; font-size: 0.74em; font-weight: 500; border: none; border-radius: 8px; padding: 4px 9px; cursor: pointer;
    background: var(--hisho-soft); color: var(--hisho-text); display: inline-flex; align-items: center; gap: 4px;
  }
  button.more:hover { background: var(--hisho-inset-hi); }
  button.more svg { width: 14px; height: 14px; fill: currentColor; }

  ul.list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  ul.list > li {
    padding: 10px 12px; border-radius: 14px; background: var(--hisho-inset); border: 1px solid var(--hisho-line);
    display: flex; flex-direction: column; gap: 7px; position: relative;
  }
  ul.list > li.item { --stripe: transparent; padding-left: 16px; }
  ul.list > li.item::before {
    content: ""; position: absolute; left: 6px; top: 10px; bottom: 10px; width: 3px; border-radius: 2px; background: var(--stripe);
  }
  ul.list > li.item.ok { --stripe: var(--hisho-ok); } ul.list > li.item.warn { --stripe: var(--hisho-warn); }
  ul.list > li.item.bad { --stripe: var(--hisho-crit); } ul.list > li.item.decide { --stripe: var(--hisho-decide); }
  ul.list > li.item.off { --stripe: var(--hisho-off); }
  ul.list > li.bubbled { padding-left: 12px; flex-direction: row; align-items: flex-start; gap: 11px; }
  ul.list > li.bubbled::before { display: none; }
  ul.list > li.bubbled > .bodycol { display: flex; flex-direction: column; gap: 7px; flex: 1; min-width: 0; }
  li .summary { font-weight: 500; line-height: 1.35; margin-right: 6px; }
  li .summary.ellipsis { display: block; }
  li .sev { margin-top: 4px; padding-left: 0; background: none; font-size: 0.68em; text-transform: uppercase; letter-spacing: 0.1em; }
  .detail { color: var(--hisho-text-2); font-size: 0.86em; white-space: pre-wrap; line-height: 1.45; }
  .empty { color: var(--hisho-text-2); padding: 10px 2px; font-size: 0.92em; display: flex; align-items: center; gap: 8px; }
  .empty svg { width: 18px; height: 18px; fill: var(--hisho-ok); }
  /* Your day: to-dos with a round tick, and dates coming due. */
  ul.todos, ul.dues { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  ul.todos li { display: flex; align-items: flex-start; gap: 11px; padding: 9px 2px; border-top: 1px solid var(--hisho-line); line-height: 1.4; }
  ul.todos li:first-child { border-top: none; }
  button.tick { flex: none; width: 20px; height: 20px; margin-top: 1px; border-radius: 50%; cursor: pointer; padding: 0;
    border: 1.5px solid var(--hisho-accent-text); background: transparent; transition: background 0.15s; }
  button.tick:hover { background: color-mix(in srgb, var(--hisho-accent) 45%, transparent); }
  ul.dues li { display: flex; align-items: center; gap: 10px; padding: 6px 0; min-width: 0; }
  ul.dues .when { font-size: 0.8em; color: var(--hisho-brown-text); white-space: nowrap; font-weight: 500; }
  form.addrow { display: flex; gap: 8px; margin-bottom: 10px; }
  form.addrow input, form.ask input {
    flex: 1; min-width: 0; font: inherit; color: var(--hisho-text); background: var(--hisho-inset); border: 1px solid var(--hisho-edge);
    border-radius: 999px; padding: 8px 14px; outline: none;
  }
  form.addrow input:focus, form.ask input:focus { border-color: color-mix(in srgb, var(--hisho-accent-text) 60%, transparent); }
  /* Ask Hisho: one line to type in, the answer under it. */
  form.ask { display: flex; align-items: center; gap: 10px; }
  form.ask input { padding: 11px 16px; font-size: 1em; background: rgba(0, 0, 0, 0.25); }
  form.ask input::placeholder, form.addrow input::placeholder { color: var(--hisho-text-2); }
  button.send { flex: none; width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; color: #fff;
    background: var(--hisho-accent); display: inline-flex; align-items: center; justify-content: center; }
  button.send svg { width: 20px; height: 20px; fill: currentColor; }
  button.send[disabled] { opacity: 0.5; }
  .answer { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
  .answer .q { align-self: flex-end; background: color-mix(in srgb, var(--hisho-accent) 35%, transparent); padding: 6px 12px;
    border-radius: 14px 14px 4px 14px; font-size: 0.9em; max-width: 85%; }
  .answer .a { background: var(--hisho-inset); padding: 9px 13px; border-radius: 14px 14px 14px 4px; font-size: 0.92em;
    line-height: 1.45; white-space: pre-wrap; max-width: 92%; }
  .thinking { display: inline-flex; align-items: center; gap: 6px; color: var(--hisho-text-2); }
  .thinking svg { width: 16px; height: 16px; fill: currentColor; animation: hisho-spin 1.4s linear infinite; }
  @keyframes hisho-spin { to { transform: rotate(360deg); } }
  .switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.86em; }
  .switch input { accent-color: var(--hisho-accent); width: 15px; height: 15px; }
  .kv { display: grid; grid-template-columns: auto 1fr; gap: 3px 12px; font-size: 0.84em; }
  .kv > span:nth-child(odd) { color: var(--hisho-text-2); }
  .kv > span:nth-child(even) { text-align: right; font-variant-numeric: tabular-nums; }
  .chev { transition: transform 0.2s; color: var(--hisho-text-2); flex: none; display: inline-flex; }
  .chev svg { width: 18px; height: 18px; fill: currentColor; }
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
  return hishoDevices(hass2).flatMap((d4) => Object.values(d4.entities).flat());
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
  return hishoDevices(hass2).filter((d4) => d4.kind === kind);
}
function hub(hass2) {
  return byKind(hass2, "hub")[0];
}
function findDevice(hass2, ref, kind) {
  if (!ref) return void 0;
  const wanted = ref.toLowerCase();
  return hishoDevices(hass2).find(
    (d4) => (!kind || d4.kind === kind) && (d4.id === ref || d4.name.toLowerCase() === wanted)
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

// src/ui.ts
function icon(path, cls = "i") {
  return b2`<svg class=${cls} viewBox="0 0 24 24" aria-hidden="true">${w`<path d=${path}></path>`}</svg>`;
}
function ring(label, value) {
  const r4 = 22, c4 = 2 * Math.PI * r4, arc = c4 * 0.75;
  const tone = value >= 95 ? "var(--hisho-crit)" : value >= 85 ? "var(--hisho-warn)" : "var(--hisho-accent-text)";
  return b2`<div class="ring" title="${label} ${Math.round(value)}%">
    <svg viewBox="0 0 56 56">${w`
      <circle class="track" cx="28" cy="28" r=${r4} fill="none" stroke-width="4.5" stroke-linecap="round"
        stroke-dasharray="${arc} ${c4}" transform="rotate(135 28 28)"></circle>
      <circle class="val" cx="28" cy="28" r=${r4} fill="none" stroke-width="4.5" stroke-linecap="round" style="color:${tone}"
        stroke=${tone} stroke-dasharray="${arc} ${c4}" stroke-dashoffset=${arc * (1 - value / 100)}
        transform="rotate(135 28 28)"></circle>`}
    </svg>
    <span class="rv">${Math.round(value)}<small>%</small></span><span class="rl">${label}</span>
  </div>`;
}
function localParts(hass2, now = /* @__PURE__ */ new Date()) {
  const tz = hass2.config?.time_zone;
  const opt = (o5) => new Intl.DateTimeFormat("en-US", { ...o5, timeZone: tz }).format(now);
  return {
    hour: Number(opt({ hour: "numeric", hourCycle: "h23" })) % 24,
    time: opt({ hour: "numeric", minute: "2-digit" }),
    date: opt({ weekday: "long", month: "long", day: "numeric" })
  };
}
function greeting(hass2, now = /* @__PURE__ */ new Date()) {
  const { hour } = localParts(hass2, now);
  const part = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : hour < 22 ? "Good evening" : "Good night";
  const name = hass2.user?.name?.split(" ")[0];
  return name ? `${part}, ${name}.` : `${part}.`;
}
function navigate(view) {
  const base = window.location.pathname.split("/")[1] ?? "";
  window.history.pushState(null, "", `/${base}/${view}`);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
}

// src/spark.ts
var TTL = 5 * 6e4;
var cache2 = /* @__PURE__ */ new Map();
function series(hass2, entityId2, hours = 24, buckets = 48, now = Date.now()) {
  const key = `${entityId2}|${hours}|${buckets}`;
  const hit = cache2.get(key);
  if (hit && now - hit.at < TTL) return hit.points;
  const start = now - hours * 36e5;
  const points = hass2.callWS({
    type: "history/history_during_period",
    start_time: new Date(start).toISOString(),
    end_time: new Date(now).toISOString(),
    entity_ids: [entityId2],
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false
  }).then((r4) => bucket((r4?.[entityId2] ?? []).map((p3) => [p3.lu * 1e3, parseFloat(p3.s)]).filter(([, v2]) => Number.isFinite(v2)), start, now, buckets)).catch(() => []);
  cache2.set(key, { at: now, points });
  return points;
}
function bucket(changes, start, end, buckets) {
  if (!changes.length) return [];
  const out = [];
  let i5 = 0, last = changes[0][1];
  for (let b3 = 1; b3 <= buckets; b3++) {
    const until = start + (end - start) * b3 / buckets;
    while (i5 < changes.length && changes[i5][0] <= until) last = changes[i5++][1];
    out.push(last);
  }
  return out;
}
function sparkPath(points, min, max) {
  const lo = min ?? Math.min(...points), hi = max ?? Math.max(...points);
  const span = hi - lo || 1;
  const xy = points.map((v2, i5) => [i5 / Math.max(1, points.length - 1) * 100, 30 - (v2 - lo) / span * 24 - 2]);
  let line = `M${xy[0][0]},${xy[0][1]}`;
  for (let i5 = 0; i5 < xy.length - 1; i5++) {
    const p0 = xy[i5 - 1] ?? xy[i5], p1 = xy[i5], p22 = xy[i5 + 1], p3 = xy[i5 + 2] ?? p22;
    line += ` C${p1[0] + (p22[0] - p0[0]) / 6},${p1[1] + (p22[1] - p0[1]) / 6} ${p22[0] - (p3[0] - p1[0]) / 6},${p22[1] - (p3[1] - p1[1]) / 6} ${p22[0]},${p22[1]}`;
  }
  return { line, area: `${line} L100,30 L0,30 Z` };
}
var uid = 0;
var HishoSpark = class extends i4 {
  constructor() {
    super();
    this.gradId = `hs${++uid}`;
    this.fetched = 0;
    this.hours = 24;
    this.points = [];
    this.tone = "var(--hisho-accent-text, #8cc7a1)";
  }
  static {
    this.properties = {
      hass: { attribute: false },
      entity: {},
      hours: { type: Number },
      tone: {},
      min: { type: Number },
      max: { type: Number },
      points: { state: true }
    };
  }
  static {
    this.styles = i`
    :host { display: block; height: 46px; pointer-events: none; }
    svg { width: 100%; height: 100%; display: block; }
  `;
  }
  willUpdate(changed) {
    if (this.hass && this.entity && (changed.has("entity") || Date.now() - this.fetched > TTL)) {
      this.fetched = Date.now();
      void series(this.hass, this.entity, this.hours).then((p3) => this.points = p3);
    }
  }
  render() {
    if (this.points.length < 2) return b2``;
    const { line, area } = sparkPath(this.points, this.min, this.max);
    return b2`<svg viewBox="0 0 100 30" preserveAspectRatio="none">${w`
      <defs><linearGradient id=${this.gradId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.tone} stop-opacity="0.32"></stop>
        <stop offset="1" stop-color=${this.tone} stop-opacity="0"></stop></linearGradient></defs>
      <path d=${area} fill="url(#${this.gradId})"></path>
      <path d=${line} fill="none" stroke=${this.tone} stroke-width="1.6" vector-effect="non-scaling-stroke"
        stroke-linejoin="round" stroke-linecap="round"></path>`}</svg>`;
  }
};
if (!customElements.get("hisho-spark")) customElements.define("hisho-spark", HishoSpark);

// node_modules/@mdi/js/mdi.js
var mdiAlarmSnooze = "M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M9,11H12.63L9,15.2V17H15V15H11.37L15,10.8V9H9V11Z";
var mdiAlertCircleOutline = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";
var mdiAlertOctagonOutline = "M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7";
var mdiArrowRight = "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";
var mdiArrowUp = "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";
var mdiBellRingOutline = "M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";
var mdiCalendarClock = "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z";
var mdiCellphoneMessage = "M11,17V7H4V17H11M11,3A2,2 0 0,1 13,5V19A2,2 0 0,1 11,21H4C2.89,21 2,20.1 2,19V5A2,2 0 0,1 4,3H11M16.5,3H21.5A1.5,1.5 0 0,1 23,4.5V7.5A1.5,1.5 0 0,1 21.5,9H18L15,12V9L15,4.5A1.5,1.5 0 0,1 16.5,3Z";
var mdiCheck = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";
var mdiCheckCircleOutline = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z";
var mdiCheckDecagramOutline = "M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z";
var mdiChevronRight = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
var mdiCoffeeOutline = "M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z";
var mdiCogOutline = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z";
var mdiCogSyncOutline = "M11.7 20H11.3L10.9 17.4C9.7 17.2 8.7 16.5 7.9 15.6L5.5 16.6L4.7 15.3L6.8 13.7C6.4 12.5 6.4 11.3 6.8 10.1L4.7 8.7L5.5 7.4L7.9 8.4C8.7 7.5 9.7 6.9 10.9 6.6L11.2 4H12.7L13.1 6.6C14.3 6.8 15.4 7.5 16.1 8.4L18.5 7.4L19.3 8.7L17.2 10.2C17.4 10.8 17.5 11.4 17.5 12H18C18.5 12 19 12.1 19.5 12.2V12L19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11L4.5 12L4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C12.1 21.4 11.9 20.7 11.7 20M16 12.3V12C16 9.8 14.2 8 12 8S8 9.8 8 12C8 14.2 9.8 16 12 16C12.7 14.3 14.2 12.9 16 12.3M10 12C10 10.9 10.9 10 12 10S14 10.9 14 12 13.1 14 12 14 10 13.1 10 12M18 14.5V13L15.8 15.2L18 17.4V16C19.4 16 20.5 17.1 20.5 18.5C20.5 18.9 20.4 19.3 20.2 19.6L21.3 20.7C22.5 18.9 22 16.4 20.2 15.2C19.6 14.7 18.8 14.5 18 14.5M18 21C16.6 21 15.5 19.9 15.5 18.5C15.5 18.1 15.6 17.7 15.8 17.4L14.7 16.3C13.5 18.1 14 20.6 15.8 21.8C16.5 22.2 17.2 22.5 18 22.5V24L20.2 21.8L18 19.5V21Z";
var mdiDesktopTowerMonitor = "M22,18H17A1,1 0 0,1 16,17V7A1,1 0 0,1 17,6H22A1,1 0 0,1 23,7V17A1,1 0 0,1 22,18M22,8H17V9H22V8M22,10H17V11H22V10M9,15V17H10V18H5V17H6V15H2A1,1 0 0,1 1,14V7A1,1 0 0,1 2,6H13A1,1 0 0,1 14,7V14A1,1 0 0,1 13,15H9M12,8H3V13H12V8Z";
var mdiExpansionCardVariant = "M2 7H4.5V17H3V8.5H2M22 7V16H14V17H7V16H6V7M10 9H8V12H10M13 9H11V12H13M20 9H15V14H20V9Z";
var mdiFileAlertOutline = "M20 17H22V15H20V17M20 7V13H22V7M4 2C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H16C17.11 22 18 21.11 18 20V8L12 2M4 4H11V9H16V20H4Z";
var mdiFolderAccountOutline = "M15 14C16.33 14 19 14.67 19 16V17H11V16C11 14.67 13.67 14 15 14M15 13C16.11 13 17 12.11 17 11S16.11 9 15 9C13.9 9 13 9.89 13 11C13 12.11 13.9 13 15 13M22 8V18C22 19.11 21.11 20 20 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H10L12 6H20C21.11 6 22 6.9 22 8M20 8H4V18H20V8Z";
var mdiHelpCircleOutline = "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z";
var mdiInformationOutline = "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";
var mdiMagnify = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
var mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
var mdiPower = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";
var mdiPowerSleep = "M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";
var mdiProgressClock = "M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
var mdiServer = "M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z";
var mdiServerNetwork = "M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z";
var mdiShieldAlertOutline = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z";
var mdiShieldCheckOutline = "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9";
var mdiTimerSandEmpty = "M6,2V8H6V8L10,12L6,16V16H6V22H18V16H18V16L14,12L18,8V8H18V2H6M16,16.5V20H8V16.5L12,12.5L16,16.5M12,11.5L8,7.5V4H16V7.5L12,11.5Z";
var mdiWrenchOutline = "M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";

// src/cards/fleet-card.ts
var MACHINE_ICONS = [
  [/gpu/i, mdiExpansionCardVariant],
  [/workstation|desktop/i, mdiDesktopTowerMonitor],
  [/control|core/i, mdiServerNetwork],
  [/tools|nas|storage/i, mdiServer]
];
function machineIcon(m2) {
  return MACHINE_ICONS.find(([re]) => re.test(m2.model))?.[1] ?? mdiServer;
}
function sparkReading(m2) {
  const gpu = entityId(m2, "gpu_usage"), mem = entityId(m2, "memory_usage");
  return /gpu/i.test(m2.model) && gpu ? [gpu, "GPU"] : mem ? [mem, "Memory"] : gpu ? [gpu, "GPU"] : void 0;
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
  const isOn = online?.state === "on";
  const sub = available(parking) ? parking.state : state?.attributes.reason && !isOn ? String(state.attributes.reason) : state?.attributes.role ?? "";
  const tone = inMaint ? "brown" : stateClass(state?.state);
  const kv = (key, label) => {
    const s4 = entity(hass2, m2, key);
    return available(s4) ? b2`<span>${label}</span><span>${s4.state}${s4.attributes.unit_of_measurement ? " " + s4.attributes.unit_of_measurement : ""}</span>` : "";
  };
  const services = entities(hass2, m2, "service");
  const down = services.filter((s4) => s4.state !== "on").length;
  const readings = [["Mem", "memory_usage"], ["Disk", "disk_usage"], ["GPU", "gpu_usage"]].map(([label, key]) => [label, pct(entity(hass2, m2, key)?.state)]).filter((r4) => r4[1] !== void 0);
  const spark = sparkReading(m2);
  return b2`<div class="tile mtile ${tone} ${isOn ? "" : "asleep"}">
    <div class="mhead" @click=${() => card.flip(m2.id)}>
      <span class="bubble ${isOn ? tone === "ok" ? "accent" : tone : "off"}">${icon(machineIcon(m2), "")}</span>
      <span class="grow"><span class="name">${m2.name}</span>${sub ? b2`<span class="muted ellipsis sub">${sub}</span>` : ""}</span>
      <span class="chip ${tone}">${inMaint ? "maintenance" : state?.state ?? "unknown"}</span>
      <span class="chev ${isOpen ? "open" : ""}">${icon(mdiChevronRight, "")}</span>
    </div>
    ${readings.length ? b2`<div class="rings">${readings.map(([label, v2]) => ring(label, v2))}</div>` : ""}
    ${isOpen ? b2`<div class="kv">
        ${kv("jobs_running", "Jobs running")} ${kv("jobs_queued", "Jobs queued")}
        ${kv("containers_running", "Containers")} ${kv("sync_connected", "Sync")}
        ${services.length ? b2`<span>Services</span><span>${services.length - down} of ${services.length} running</span>` : ""}
      </div>` : ""}
    <div class="row acts">
      ${power.includes("wake") && can2.has("machine.wake") ? b2`<button class="act" @click=${() => runAction(card, hass2, "machine.wake", target)}>${icon(mdiPower, "")}Wake</button>` : ""}
      ${power.includes("park") && can2.has("machine.park") ? b2`<button class="act danger" @click=${() => runAction(
    card,
    hass2,
    "machine.park",
    target,
    {},
    `Park ${m2.name}? It powers off until something needs it.`
  )}>${icon(mdiPowerSleep, "")}Park</button>` : ""}
      ${maint ? b2`<button class="act ${inMaint ? "brown" : ""}" title="Maintenance holds its alerts and auto-park"
          @click=${() => toggle(card, hass2, maint, !inMaint, inMaint ? void 0 : `Put ${m2.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${icon(mdiWrenchOutline, "")}${inMaint ? "End maintenance" : "Maintenance"}</button>` : ""}
      ${isOpen && state ? b2`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${() => moreInfo(card, state.entity_id)}>History…</button>` : ""}
    </div>
    ${spark ? b2`<div class="sparkwrap"><span class="sparkl">${spark[1]} · 24 h</span>
      <hisho-spark .hass=${hass2} .entity=${spark[0]} .min=${0} .max=${100}
        .tone=${tone === "bad" ? "var(--hisho-crit)" : "var(--hisho-accent-text)"}></hisho-spark></div>` : ""}
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

// src/icons.ts
var KANJI = "M12.11 3.1C13.79 4.04 15.71 5.53 16.58 6.6L18.46 4.66C17.5 3.56 15.48 2.2 13.86 1.33ZM19.33 2.43C18.55 6.24 17.32 9.74 15.46 12.74V6.17H12.78V16.32C11.43 17.81 9.85 19.12 8.04 20.22C8.68 20.63 9.59 21.61 9.98 22.16C11.01 21.5 11.95 20.79 12.82 20.03C13.03 21.89 13.81 22.48 15.78 22.48C16.26 22.48 17.87 22.48 18.37 22.48C20.46 22.48 21.12 21.32 21.4 17.81C20.66 17.6 19.59 17.14 18.99 16.69C18.9 19.39 18.76 19.99 18.12 19.99C17.77 19.99 16.51 19.99 16.24 19.99C15.57 19.99 15.46 19.85 15.46 18.84V17.37C17.02 15.52 18.28 13.43 19.31 11.14C19.93 12.97 20.41 15.04 20.5 16.48L23 15.79C22.82 13.91 22.06 11.14 21.05 9.01L20.07 9.28C20.8 7.34 21.4 5.25 21.9 3.03ZM8.1 1.47C6.41 2.23 3.66 2.89 1.21 3.26C1.5 3.83 1.85 4.75 1.96 5.34C2.83 5.23 3.73 5.09 4.64 4.93V7.61H1.39V10.13H4.14C3.38 12.36 2.19 14.81 1 16.32C1.41 17.01 2.05 18.18 2.28 18.96C3.13 17.79 3.96 16.09 4.64 14.3V22.67H7.26V13.39C7.69 14.1 8.08 14.83 8.29 15.33L9.64 13.66C9.39 14.62 9.09 15.49 8.68 16.21L10.81 17.19C11.89 15.36 12.25 12.38 12.46 9.7L10.26 9.26C10.17 10.59 10.01 11.92 9.75 13.16C9.23 12.52 7.78 10.98 7.26 10.52V10.13H9.66V7.61H7.26V4.38C8.22 4.13 9.14 3.85 9.96 3.53Z";
var ICONS = { kanji: KANJI };
function haIcons(root, out = []) {
  for (const el2 of Array.from(root.querySelectorAll("*"))) {
    if (el2.localName === "ha-icon") out.push(el2);
    if (el2.shadowRoot) haIcons(el2.shadowRoot, out);
  }
  return out;
}
async function refreshIcons(doc = document) {
  const stale = haIcons(doc).filter((i5) => typeof i5.icon === "string" && i5.icon.startsWith("hisho:"));
  for (const i5 of stale) {
    const name = i5.icon;
    i5._legacy = false;
    i5.icon = void 0;
    await i5.updateComplete;
    i5.icon = name;
  }
  return stale.length;
}
function registerIcons(w3 = window) {
  w3.customIcons = w3.customIcons || {};
  w3.customIcons.hisho = {
    getIcon: async (name) => ({ path: ICONS[name] ?? KANJI, viewBox: "0 0 24 24" }),
    getIconList: async () => Object.keys(ICONS).map((name) => ({ name }))
  };
  if (typeof document !== "undefined") {
    for (const ms of [0, 1500, 5e3]) setTimeout(() => void refreshIcons().catch(() => void 0), ms);
  }
}

// src/cards/assistant.ts
var VERB = {
  transcribe: "Transcribing",
  install: "Installing",
  build: "Building",
  deploy: "Deploying",
  investigate: "Looking into",
  backup: "Backing up",
  sync: "Syncing",
  test: "Testing",
  update: "Updating",
  upgrade: "Upgrading"
};
var DONE = {
  transcribe: "Transcribed",
  install: "Installed",
  build: "Built",
  deploy: "Deployed",
  investigate: "Looked into",
  backup: "Backed up",
  sync: "Synced",
  test: "Tested",
  update: "Updated",
  upgrade: "Upgraded"
};
function workerName(hass2, worker) {
  const m2 = hass2 ? byKind(hass2, "machine").find((d4) => entity(hass2, d4, "machine_state")?.attributes.machine === worker || d4.name.toLowerCase() === worker.toLowerCase()) : void 0;
  return m2?.name ?? worker.replace(/(^|-)(\w)/g, (_2, dash, c4) => (dash ? " " : "") + c4.toUpperCase());
}
function jobWords(j, done = false, hass2) {
  const kind = String(j.kind ?? "job");
  const verb = (done ? DONE[kind] ?? `Finished ${kind}` : VERB[kind]) ?? kind.replace(/^\w/, (c4) => c4.toUpperCase());
  return j.worker ? `${verb} on ${workerName(hass2, String(j.worker))}` : verb;
}
function ago(iso2, now = Date.now()) {
  const t3 = iso2 ? Date.parse(iso2) : NaN;
  if (!Number.isFinite(t3)) return "";
  const min = Math.round((now - t3) / 6e4);
  if (min < 2) return "just now";
  if (min < 60) return `${min} min ago`;
  const h3 = Math.round(min / 60);
  return h3 < 24 ? `${h3} h ago` : `${Math.round(h3 / 24)} d ago`;
}
function dueWords(day2, now = /* @__PURE__ */ new Date()) {
  const [y3, m2, d4] = day2.slice(0, 10).split("-").map(Number);
  const due = new Date(y3, m2 - 1, d4);
  const today2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((due.getTime() - today2.getTime()) / 864e5);
  if (days < 0) return days === -1 ? "Yesterday" : `${-days} days late`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return due.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function workingOn(hass2) {
  const h3 = hub(hass2);
  const jobs = entity(hass2, h3, "jobs_active")?.attributes.jobs ?? [];
  const projects = entity(hass2, h3, "projects_active")?.attributes.projects ?? [];
  const live = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).map((j) => ({
    what: jobWords(j, false, hass2),
    sub: j.status === "running" ? `started ${ago(j.updated_at)}`.trim() : "waiting its turn",
    path: j.status === "running" ? mdiCogSyncOutline : mdiTimerSandEmpty,
    tone: j.status === "running" ? "accent" : "off"
  }));
  const mine = projects.filter((p3) => p3.status === "active" && ["claude", "hisho"].includes(String(p3.waiting_on ?? "").toLowerCase())).map((p3) => ({ what: p3.title, sub: p3.next ? `Next: ${p3.next}` : "In progress", path: mdiFolderAccountOutline, tone: "brown" }));
  return [...live, ...mine];
}
function doneForYou(hass2, now = Date.now()) {
  const feed = entity(hass2, hub(hass2), "done_for_you");
  if (feed && Array.isArray(feed.attributes.items)) {
    return feed.attributes.items.map((i5) => ({ what: String(i5.text), when: ago(i5.at, now) }));
  }
  const jobs = entity(hass2, hub(hass2), "jobs_active")?.attributes.jobs ?? [];
  return jobs.filter((j) => j.status === "done" && now - Date.parse(j.updated_at ?? "") < 864e5).sort((a3, b3) => Date.parse(b3.updated_at) - Date.parse(a3.updated_at)).map((j) => ({ what: jobWords(j, true, hass2), when: ago(j.updated_at, now) }));
}
function waitingOnYou(hass2) {
  const projects = entity(hass2, hub(hass2), "projects_active")?.attributes.projects ?? [];
  return projects.filter((p3) => p3.status === "active" && (p3.asks?.length || !["", "claude", "hisho"].includes(String(p3.waiting_on ?? "").toLowerCase())));
}
var HishoDay = class extends i4 {
  static {
    this.properties = { hass: { attribute: false }, items: { state: true }, due: { state: true }, adding: { state: true } };
  }
  static {
    this.styles = cardStyles;
  }
  constructor() {
    super();
    this.items = [];
    this.due = [];
    this.adding = false;
  }
  ids() {
    const h3 = hub(this.hass);
    return { todo: entityId(h3, "today"), cal: entityId(h3, "due_dates") };
  }
  updated(changed) {
    if (!changed.has("hass") || !this.hass) return;
    const { todo: todo2, cal } = this.ids();
    const stamp = [todo2, cal].map((id) => id ? `${this.hass.states[id]?.last_changed}|${this.hass.states[id]?.state}` : "").join(";");
    if (stamp === this.seen) return;
    this.seen = stamp;
    if (todo2) {
      this.hass.callWS({ type: "todo/item/list", entity_id: todo2 }).then((r4) => this.items = r4.items ?? []).catch(() => this.items = []);
    }
    if (cal && this.hass.callApi) {
      const start = /* @__PURE__ */ new Date(), end = new Date(Date.now() + 14 * 864e5);
      this.hass.callApi("GET", `calendars/${cal}?start=${start.toISOString()}&end=${end.toISOString()}`).then((r4) => this.due = r4 ?? []).catch(() => this.due = []);
    }
  }
  tick(item) {
    const { todo: todo2 } = this.ids();
    if (todo2) void this.hass.callService("todo", "update_item", { item: item.uid, status: "completed" }, { entity_id: todo2 });
  }
  add(e4) {
    e4.preventDefault();
    const input = e4.target.querySelector("input");
    const { todo: todo2 } = this.ids();
    if (todo2 && input.value.trim()) void this.hass.callService("todo", "add_item", { item: input.value.trim() }, { entity_id: todo2 });
    input.value = "";
    this.adding = false;
  }
  render() {
    const open = this.items.filter((i5) => i5.status === "needs_action");
    const { todo: todo2 } = this.ids();
    return b2`
      <div class="head"><span class="title">Your day</span>
        ${todo2 ? b2`<button class="more" @click=${() => this.adding = !this.adding}>${icon(mdiPlus, "")}Add</button>` : ""}</div>
      ${this.adding ? b2`<form class="addrow" @submit=${this.add}><input placeholder="A new to-do for Today" autofocus />
        <button class="act primary" type="submit">Add</button></form>` : ""}
      ${open.length ? b2`<ul class="todos">${open.map((i5) => b2`<li>
          <button class="tick" title="Done" @click=${() => this.tick(i5)}></button><span>${i5.summary}</span></li>`)}</ul>` : b2`<div class="empty">${icon(mdiCheckCircleOutline, "")}Nothing left on today's list.</div>`}
      ${this.due.length ? b2`<div class="eyebrow" style="margin-top:16px">Coming due</div>
        <ul class="dues">${this.due.slice(0, 4).map((d4) => {
      const when = dueWords(d4.start.date ?? d4.start.dateTime ?? "");
      return b2`<li><span class="bubble sm ${/late|Today/.test(when) ? "warn" : "brown"}">${icon(mdiCalendarClock, "")}</span>
            <span class="grow ellipsis">${d4.summary}</span><span class="when">${when}</span></li>`;
    })}</ul>` : ""}`;
  }
};
var HishoAsk = class extends i4 {
  static {
    this.properties = { hass: { attribute: false }, asked: { state: true }, answer: { state: true }, busy: { state: true } };
  }
  static {
    this.styles = cardStyles;
  }
  constructor() {
    super();
    this.asked = "";
    this.answer = "";
    this.busy = false;
  }
  async ask(e4) {
    e4.preventDefault();
    const input = e4.target.querySelector("input");
    const text = input.value.trim();
    const agent = entityId(hub(this.hass), "assistant");
    if (!text || !agent || this.busy) return;
    input.value = "";
    this.asked = text;
    this.answer = "";
    this.busy = true;
    try {
      const r4 = await this.hass.callWS({
        type: "conversation/process",
        text,
        agent_id: agent,
        conversation_id: this.conversation,
        language: "en"
      });
      this.conversation = r4?.conversation_id ?? this.conversation;
      this.answer = r4?.response?.speech?.plain?.speech ?? "Hisho didn't answer.";
    } catch (err) {
      this.answer = `I couldn't reach Hisho (${err?.message ?? "error"}).`;
    } finally {
      this.busy = false;
    }
  }
  render() {
    if (!entityId(hub(this.hass), "assistant")) return b2``;
    return b2`
      <form class="ask" @submit=${this.ask}>
        <span class="bubble sm accent">${icon(KANJI, "")}</span>
        <input placeholder="Ask Hisho anything…" aria-label="Ask Hisho" />
        <button class="send" type="submit" title="Ask" ?disabled=${this.busy}>${icon(mdiArrowUp, "")}</button>
      </form>
      ${this.asked ? b2`<div class="answer"><div class="q">${this.asked}</div>
        <div class="a">${this.busy ? b2`<span class="thinking">${icon(mdiProgressClock, "")}Thinking…</span>` : this.answer}</div></div>` : ""}`;
  }
};
for (const [tag, cls] of [["hisho-day", HishoDay], ["hisho-ask", HishoAsk]]) {
  if (!customElements.get(tag)) customElements.define(tag, cls);
}

// src/cards/control-center.ts
var HishoControlCenterCard = class extends HishoCard {
  static {
    this.properties = { ...HishoCard.properties, selected: { state: true } };
  }
  static {
    this.styles = [cardStyles, i`
    ha-card {
      background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none;
      padding: clamp(14px, 3vw, 36px) clamp(12px, 3vw, 40px) 32px; max-width: 1680px; margin: 0 auto;
    }
    .glass {
      background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
      backdrop-filter: blur(20px) saturate(130%); -webkit-backdrop-filter: blur(20px) saturate(130%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .hero { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 1fr); align-items: end; gap: 24px; margin: 4px 0 22px; }
    .when { font-size: 0.8em; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hisho-brown-text); font-weight: 600; }
    h1 { margin: 6px 0 8px; font-size: clamp(1.7em, 4.2vw, 2.9em); font-weight: 300; letter-spacing: -0.01em; line-height: 1.1;
      text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45); }
    .summary { margin: 0; color: var(--hisho-text); opacity: 0.9; font-size: 1.05em; max-width: 62ch; line-height: 1.5; }
    .askwrap { padding: 12px; }

    .body { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; align-items: start; }
    .col { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
    .panel { padding: 16px 18px 18px; min-width: 0; }
    ul.dones { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
    ul.dones li { display: flex; align-items: center; gap: 9px; padding: 5px 0; font-size: 0.92em; }
    ul.dones li > svg { width: 16px; height: 16px; fill: var(--hisho-accent-text); flex: none; }

    /* The system: one line, every part as a status pill, the full card of one a tap away. */
    .system { margin-bottom: 18px; padding: 12px 16px 14px; }
    .sysbar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .sysline { font-size: 0.92em; color: var(--hisho-text); }
    .sysline b { font-weight: 600; } .sysline b.bad { color: var(--hisho-crit); } .sysline b.warnc { color: var(--hisho-warn); }
    .sysgrid { display: flex; flex-wrap: wrap; gap: 6px 26px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--hisho-line); }
    .sysgroup .eyebrow { margin-bottom: 7px; font-size: 0.68em; }
    .pills { display: flex; flex-wrap: wrap; gap: 6px; }
    button.pill {
      font: inherit; color: var(--hisho-text); display: inline-flex; align-items: center; gap: 7px; cursor: pointer;
      background: var(--hisho-inset); border: 1px solid var(--hisho-line); border-radius: 10px; padding: 5px 10px 5px 9px;
      transition: background 0.15s, border-color 0.15s;
    }
    button.pill:hover { background: var(--hisho-inset-hi); }
    button.pill.sel { border-color: color-mix(in srgb, var(--hisho-accent-text) 70%, transparent); background: var(--hisho-inset-hi); }
    button.pill.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }
    button.pill.warn { border-color: color-mix(in srgb, var(--hisho-warn) 40%, transparent); }
    .pill .pn { font-size: 0.86em; font-weight: 500; white-space: nowrap; }
    .pill .ps { font-size: 0.72em; color: var(--hisho-text-2); white-space: nowrap; }
    .dot.ok { background: var(--hisho-ok); box-shadow: 0 0 7px var(--hisho-ok); } .dot.warn { background: var(--hisho-warn); }
    .dot.bad { background: var(--hisho-crit); box-shadow: 0 0 7px var(--hisho-crit); } .dot.decide { background: var(--hisho-decide); }
    .dot.brown { background: var(--hisho-brown-text); }
    .drawer { position: relative; margin-top: 14px; padding: 14px 52px 14px 16px; border-radius: var(--hisho-radius);
      background: var(--hisho-inset); border: 1px solid var(--hisho-line); animation: hisho-open 0.18s ease-out; }
    @keyframes hisho-open { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
    .drawer .close { position: absolute; top: 10px; right: 10px; border: none; background: var(--hisho-soft); color: var(--hisho-text);
      width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; z-index: 1; }
    .drawer .close svg { width: 16px; height: 16px; fill: currentColor; }

    @container (max-width: 860px) {
      .hero { grid-template-columns: 1fr; }
      .body { grid-template-columns: 1fr; }
      .body > .col:last-child { order: -1; }
    }
    @container (max-width: 560px) {
      .sysline { flex: 1 1 calc(100% - 52px); }
      .sysbar > button { flex: 1 1 auto; justify-content: center; }
    }
  `];
  }
  static getStubConfig() {
    return { type: "custom:hisho-control-center-card" };
  }
  connectedCallback() {
    super.connectedCallback();
    this.clock = window.setInterval(() => this.requestUpdate(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.clock);
  }
  getGridOptions() {
    return { columns: "full", min_columns: 12 };
  }
  getCardSize() {
    return 12;
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
    const jobsEnt = entity(hass2, h3, "jobs_active");
    const jobs = jobsEnt?.attributes.jobs ?? [];
    const running = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).length;
    const failed = jobs.filter((j) => j.status === "failed").length;
    const syncProblem = entity(hass2, h3, "sync_problem");
    const conflicts = entity(hass2, h3, "sync_conflicts");
    const fleetMaint = entityId(h3, "fleet_maintenance");
    const maintOn = fleetMaint ? hass2.states[fleetMaint]?.state === "on" : false;
    const coreDown = reach?.state === "off";
    const nOnline = available(online) ? Number(online.state) : void 0;
    const nFaulted = available(faulted) ? Number(faulted.state) : 0;
    const nConflicts = available(conflicts) ? Number(conflicts.state) || 0 : void 0;
    const open = alerts.length;
    const syncBad = syncProblem?.state === "on";
    const { time, date } = localParts(hass2);
    const working = workingOn(hass2);
    const done = doneForYou(hass2);
    const projectsWaiting = waitingOnYou(hass2);
    const todayOpen = Number(entity(hass2, h3, "today")?.state) || 0;
    return this.frame(b2`
      <div class="hero">
        <div class="hello">
          <div class="when">${date} · ${time}</div>
          <h1>${this.config.title ?? greeting(hass2)}</h1>
          <p class="summary">${this.summary(coreDown, open, critical, todayOpen, working.length, projectsWaiting.length)}</p>
        </div>
        <div class="askwrap glass"><hisho-ask .hass=${hass2}></hisho-ask></div>
      </div>

      ${this.system(machines.length, nOnline, nFaulted, coreDown, syncBad, nConflicts, running, fleetMaint, maintOn)}

      <div class="body">
        <div class="col">
          <section class="panel glass"><hisho-day .hass=${hass2}></hisho-day></section>
          <section class="panel glass">
            <div class="head"><span class="title">Hisho is working on</span>
              ${failed ? b2`<span class="chip warn">${failed} failed</span>` : ""}</div>
            ${working.length ? b2`<ul class="list">${working.map((w3) => b2`<li class="item bubbled">
                <span class="bubble sm ${w3.tone}">${icon(w3.path, "")}</span>
                <div class="bodycol"><span class="summary">${w3.what}</span><span class="muted">${w3.sub}</span></div></li>`)}</ul>` : b2`<div class="empty">${icon(mdiCoffeeOutline, "")}Nothing running right now. Ask Hisho for something.</div>`}
            ${done.length ? b2`<div class="eyebrow" style="margin-top:16px">Done for you · last 24 hours</div>
              <ul class="dones">${done.slice(0, 6).map((d4) => b2`<li>${icon(mdiCheck, "")}<span class="grow">${d4.what}</span>
                <span class="muted">${d4.when}</span></li>`)}</ul>` : ""}
          </section>
        </div>
        <div class="col">
          <section class="panel glass">
            <hisho-needs-you-card .hass=${hass2} .config=${{
      type: "custom:hisho-needs-you-card",
      embedded: true,
      compact: true,
      title: "Needs your decision",
      limit: this.config.needs_you_limit ?? 6
    }}></hisho-needs-you-card>
            ${projectsWaiting.length ? b2`<div class="eyebrow" style="margin-top:16px">Projects waiting on you</div>
              <ul class="list">${projectsWaiting.slice(0, 4).map((p3) => b2`<li class="item bubbled">
                <span class="bubble sm brown">${icon(mdiFolderAccountOutline, "")}</span>
                <div class="bodycol"><span class="summary">${p3.title}</span>
                  ${p3.asks?.length ? b2`<span class="muted">${p3.asks[0]}</span>` : p3.next ? b2`<span class="muted">Next: ${p3.next}</span>` : ""}</div>
              </li>`)}</ul>` : ""}
          </section>
        </div>
      </div>

    `);
  }
  /** The system, compact but all there: one line, then every machine, device and add-on as a status pill. Tap one
   *  to open its full card (readings, services, buttons) right here. */
  system(total, up, faulted, coreDown, syncBad, conflicts, running, fleetMaint, maintOn) {
    const hass2 = this.hass;
    const asleep = total - (up ?? 0);
    const machines = byKind(hass2, "machine"), boxes = byKind(hass2, "box"), addons = byKind(hass2, "addon");
    const tone = (d4) => {
      const maint = entityId(d4, "maintenance");
      if (maint && hass2.states[maint]?.state === "on") return ["brown", "maintenance"];
      if (d4.kind === "machine") {
        const st = entity(hass2, d4, "machine_state")?.state ?? "unknown";
        return [stateClass(st), st];
      }
      if (d4.kind === "addon") {
        const st = entity(hass2, d4, "addon_status")?.state ?? "unknown";
        return [stateClass(st), st];
      }
      const health = entity(hass2, d4, "box_health")?.state, power = entity(hass2, d4, "box_state")?.state;
      return health && stateClass(health) !== "ok" && stateClass(health) !== "off" ? [stateClass(health), health] : [stateClass(power ?? health), power ?? health ?? "unknown"];
    };
    const problems = [...machines, ...boxes, ...addons].filter((d4) => ["bad", "warn"].includes(tone(d4)[0])).length;
    const healthy = !coreDown && !faulted && !syncBad && !problems;
    const pill = (d4) => {
      const [t3, word] = tone(d4);
      return b2`<button class="pill ${t3} ${this.selected === d4.id ? "sel" : ""}"
        @click=${() => this.selected = this.selected === d4.id ? void 0 : d4.id}>
        <span class="dot ${t3}"></span><span class="pn">${d4.name}</span><span class="ps">${word}</span></button>`;
    };
    const chosen = [...machines, ...boxes, ...addons].find((d4) => d4.id === this.selected);
    const group = (label, list) => list.length ? b2`<div class="sysgroup"><div class="eyebrow">${label}</div><div class="pills">${list.map(pill)}</div></div>` : "";
    return b2`<section class="system glass">
      <div class="sysbar">
        <span class="bubble sm ${healthy ? "accent" : "bad"}">${icon(healthy ? mdiShieldCheckOutline : mdiShieldAlertOutline, "")}</span>
        <span class="grow sysline">${coreDown ? b2`<b class="bad">Hisho Core isn't answering</b>` : b2`<b>${up ?? "\u2013"} of ${total}</b> machines up${asleep ? b2` <span class="muted">(${asleep} parked)</span>` : ""}${faulted ? b2`, <b class="bad">${faulted} faulted</b>` : ""} ·
          Sync ${syncBad ? b2`<b class="bad">has a problem</b>` : "OK"}${conflicts ? ` \xB7 ${conflicts} conflict files` : ""}${problems ? b2` · <b class="warnc">${problems} need${problems === 1 ? "s" : ""} a look</b>` : ""}${running ? ` \xB7 ${running} job${running > 1 ? "s" : ""} running` : ""}`}</span>
        ${fleetMaint ? b2`<button class="act ${maintOn ? "brown" : ""}" @click=${() => toggle(this, hass2, fleetMaint, !maintOn, maintOn ? void 0 : "Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.")}>${icon(mdiWrenchOutline, "")}${maintOn ? "End fleet maintenance" : "Fleet maintenance"}</button>` : ""}
        <button class="more" @click=${() => navigate("machines")}>Machines ${icon(mdiArrowRight, "")}</button>
      </div>
      <div class="sysgrid">${group("Machines", machines)}${group("Devices", boxes)}${group("Add-ons", addons)}</div>
      ${chosen ? b2`<div class="drawer">
        <button class="close" title="Close" @click=${() => this.selected = void 0}>${icon(mdiClose, "")}</button>
        ${chosen.kind === "machine" ? b2`<hisho-machine-card .hass=${hass2} .config=${{ type: "custom:hisho-machine-card", machine: chosen.name, embedded: true }}></hisho-machine-card>` : b2`<hisho-device-card .hass=${hass2} .config=${{ type: "custom:hisho-device-card", device: chosen.name, embedded: true }}></hisho-device-card>`}
      </div>` : ""}
    </section>`;
  }
  /** One plain sentence about your day, most important first. */
  summary(coreDown, open, critical, todo2, working, projects) {
    if (coreDown) return "Hisho Core isn't answering Home Assistant, so what you see here may be out of date.";
    const plural = (n4, one, many = one + "s") => `${n4} ${n4 === 1 ? one : many}`;
    const parts = [];
    const rest = open - critical;
    if (critical) parts.push(rest ? `${plural(critical, "urgent thing")} and ${rest} more need you` : `${plural(critical, "urgent thing")} needs you`);
    else if (open) parts.push(`${plural(open, "thing")} need${open === 1 ? "s" : ""} your answer`);
    if (projects) parts.push(`${plural(projects, "project")} waiting on you`);
    if (todo2) parts.push(`${plural(todo2, "to-do")} left today`);
    const lead = parts.length ? parts.join(", ").replace(/^\w/, (c4) => c4.toUpperCase()) + "." : "Nothing needs you right now.";
    return working ? `${lead} Hisho is working on ${plural(working, "thing")} for you.` : lead;
  }
};

// src/cards/machine-card.ts
var HishoMachineCard = class extends HishoCard {
  static getStubConfig(hass2) {
    const first = hass2 ? Object.values(hass2.devices ?? {}).find((d4) => d4.model && d4.via_device_id) : void 0;
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
      return available(s4) ? b2`<div class="row spread kvrow"><span class="muted">${label}</span>
        <span>${s4.state}${s4.attributes.unit_of_measurement ? " " + s4.attributes.unit_of_measurement : ""}</span></div>` : "";
    };
    const isOn = entity(hass2, m2, "online")?.state === "on";
    const spark = sparkReading(m2);
    const tone = stateClass(state?.state);
    const readings = [["Mem", "memory_usage"], ["Disk", "disk_usage"], ["GPU", "gpu_usage"]].map(([label, key]) => [label, pct(entity(hass2, m2, key)?.state)]).filter((r4) => r4[1] !== void 0);
    return this.frame(b2`<div class="mcard"><div class="mleft">
      <div class="mhead" style="margin-bottom:14px">
        <span class="bubble ${isOn ? tone === "ok" ? "accent" : tone : "off"}">${icon(machineIcon(m2), "")}</span>
        <span class="grow"><span class="name">${this.config.title ?? m2.name}</span>
          ${state?.attributes.role ? b2`<span class="muted ellipsis sub">${state.attributes.role}</span>` : ""}</span>
        <span class="chip ${tone}">${state?.state ?? "unknown"}</span>
      </div>
      ${readings.length ? b2`<div class="rings" style="margin-bottom:12px;max-width:340px">${readings.map(([label, v2]) => ring(label, v2))}</div>` : ""}
      ${row("awake", "Parking")} ${row("jobs_running", "Jobs running")} ${row("jobs_queued", "Jobs queued")}
      ${row("containers_running", "Containers")} ${row("sync_connected", "Sync")}
      <div class="row" style="margin-top:8px">
        ${power.includes("wake") && can2.has("machine.wake") ? b2`<button class="act" @click=${() => runAction(this, hass2, "machine.wake", target)}>${icon(mdiPower, "")}Wake</button>` : ""}
        ${power.includes("park") && can2.has("machine.park") ? b2`<button class="act danger" @click=${() => runAction(
      this,
      hass2,
      "machine.park",
      target,
      {},
      `Park ${m2.name}? It powers off until something needs it.`
    )}>${icon(mdiPowerSleep, "")}Park</button>` : ""}
        ${maint ? b2`<button class="act ${hass2.states[maint]?.state === "on" ? "brown" : ""}" @click=${() => {
      const on = hass2.states[maint]?.state === "on";
      toggle(this, hass2, maint, !on, on ? void 0 : `Put ${m2.name} in maintenance? Its alerts are held and its VM shuts down.`);
    }}>${icon(mdiWrenchOutline, "")}${hass2.states[maint]?.state === "on" ? "End maintenance" : "Maintenance"}</button>` : ""}
      </div>
      ${spark ? b2`<div class="eyebrow" style="margin-top:18px">${spark[1]} · last 24 hours</div>
        <hisho-spark .hass=${hass2} .entity=${spark[0]} .min=${0} .max=${100} style="height:56px"></hisho-spark>` : ""}
      </div><div class="mright">
      ${services.length || units.length ? b2`<div class="eyebrow">Services</div>` : ""}
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
      ${items.length ? b2`<div class="eyebrow" style="margin-top:18px">From add-ons</div>` : ""}
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
    </div></div>
      <button class="link" style="margin-top:12px;font-size:0.86em" @click=${() => state && moreInfo(this, state.entity_id)}>History…</button>`);
  }
};

// src/cards/needs-you-card.ts
var SEVERITY_CLASS = { critical: "bad", decision: "decide", warn: "warn", info: "off" };
var SEVERITY_ICON = {
  critical: mdiAlertOctagonOutline,
  decision: mdiHelpCircleOutline,
  warn: mdiAlertCircleOutline,
  info: mdiInformationOutline
};
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
    const todo2 = entityId(hub(this.hass), "needs_you");
    const stamp = todo2 ? this.hass.states[todo2]?.last_changed + "|" + this.hass.states[todo2]?.state : void 0;
    if (todo2 && stamp !== this.seen) {
      this.seen = stamp;
      this.hass.callWS({ type: "todo/item/list", entity_id: todo2 }).then((r4) => this.items = r4.items ?? []).catch(() => this.items = []);
    }
  }
  body() {
    const hass2 = this.hass;
    const h3 = hub(hass2);
    const open = entity(hass2, h3, "needs_you_count")?.attributes.alerts ?? [];
    const severity = new Map(open.map((a3) => [a3.id, a3.severity]));
    const pairing = open.filter((a3) => a3.severity === "decision" && /asks to connect/.test(a3.title));
    const todo2 = this.items.filter((i5) => this.showDone || i5.status === "needs_action");
    const done = this.items.filter((i5) => i5.status === "completed").length;
    const limit = this.config.limit ?? 50;
    const shown = this.showAll ? todo2 : todo2.slice(0, limit);
    const can2 = allowed(hass2);
    return this.frame(b2`
      <div class="head">${this.heading("Needs you")}
        <span class="row">${todo2.length ? b2`<span class="chip ${open.some((a3) => a3.severity === "critical") ? "bad" : "warn"} num">${todo2.filter((i5) => i5.status === "needs_action").length} open</span>` : ""}
        ${done ? b2`<button class="act" @click=${() => this.showDone = !this.showDone}>
          ${this.showDone ? "Hide" : "Show"} ${done} acknowledged</button>` : ""}</span></div>
      ${pairing.map((p3) => b2`<div class="tile decide" style="margin-bottom:8px"><span class="row"><span class="chip decide">decide</span>
        <span>${p3.title}</span></span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${todo2.length ? "" : b2`<div class="empty">${icon(mdiCheckCircleOutline, "")}Nothing needs you right now.</div>`}
      <ul class="list">${shown.map((i5) => {
      const sev = severity.get(i5.uid) ?? (i5.description?.split(":")[0] || "").toLowerCase();
      const acked = i5.status === "completed";
      const isOpen = !this.config.compact || this.expanded.has(i5.uid);
      const tone = acked ? "off" : SEVERITY_CLASS[sev] ?? stateClass(sev);
      return b2`<li class="item bubbled ${tone}">
          <span class="bubble sm ${tone}">${icon(SEVERITY_ICON[sev] ?? mdiInformationOutline, "")}</span>
          <div class="bodycol">
          <div class="row spread" style="cursor:${this.config.compact ? "pointer" : "default"}" @click=${() => this.flip(i5.uid)}>
            <span class="grow"><span class="summary ${this.config.compact && !isOpen ? "ellipsis" : ""}">${i5.summary}</span>
              <span class="chip ${tone} plain sev">${acked ? "acknowledged" : sev || "alert"}</span></span>
            ${this.config.compact ? b2`<span class="chev ${isOpen ? "open" : ""}">${icon(mdiChevronRight, "")}</span>` : ""}</div>
          ${isOpen && i5.description ? b2`<div class="detail">${i5.description.replace(/^[A-Z]+:\s*/, "")}</div>` : ""}
          ${isOpen && can2.has("alert.ack") ? b2`<div class="row">
            ${acked ? b2`<button class="act" @click=${() => this.alert(i5.uid, "unack")}>Un-acknowledge</button>` : b2`<button class="act primary" @click=${() => this.alert(i5.uid, "ack")}>${icon(mdiCheck, "")}Acknowledge</button>
                     <button class="act" @click=${() => this.alert(i5.uid, "snooze")}>${icon(mdiAlarmSnooze, "")}Snooze 1 h</button>`}
            <button class="act" @click=${() => this.alert(i5.uid, "investigate")}>${icon(mdiMagnify, "")}Investigate</button>
            <button class="act" @click=${() => this.alert(i5.uid, "notify")}>${icon(mdiCellphoneMessage, "")}Send to phone</button>
          </div>` : ""}
          </div>
        </li>`;
    })}</ul>
      ${todo2.length > shown.length || this.showAll ? b2`<button class="link" style="margin-top:6px;font-size:0.86em"
        @click=${() => this.showAll = !this.showAll}>${this.showAll ? "Show fewer" : `Show all ${todo2.length}`}</button>` : ""}
    `);
  }
  flip(uid2) {
    if (!this.config.compact) return;
    const next = new Set(this.expanded);
    if (!next.delete(uid2)) next.add(uid2);
    this.expanded = next;
  }
  alert(id, verb) {
    return runAction(this, this.hass, `alert.${verb}`, id, verb === "snooze" ? { hours: 1 } : {});
  }
};

// src/cards/settings.ts
function fields(schema, labels) {
  const names = labels ?? {};
  return Object.entries(schema ?? {}).map(([key, raw]) => {
    const optional = raw.endsWith("?");
    const base = raw.replace(/\?$/, "");
    const list = /^list\((.*)\)$/.exec(base);
    return {
      key,
      type: list ? "list" : base,
      optional,
      choices: list ? list[1].split("|").map((c4) => c4.trim()).filter(Boolean) : [],
      label: names[key] ?? key.replace(/_/g, " ")
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
    return this.frame(b2`
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
    `);
  }
  addon(dev) {
    const hass2 = this.hass;
    const status = entity(hass2, dev, "addon_status");
    const enabled = entityId(dev, "addon_enabled");
    const a3 = status?.attributes ?? {};
    const allowedNow = allowed(hass2);
    return this.frame(b2`
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
    `);
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
var JOB_ICON = {
  running: mdiCogSyncOutline,
  queued: mdiTimerSandEmpty,
  routed: mdiTimerSandEmpty,
  failed: mdiAlertCircleOutline,
  done: mdiCheckCircleOutline
};
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
      ${jobs.length ? "" : b2`<div class="empty">${icon(mdiCheckCircleOutline, "")}No jobs.</div>`}
      <ul class="list">${jobs.slice(0, limit).map((j) => {
      const live = ["queued", "routed", "running"].includes(j.status);
      const tone = stateClass(j.status);
      return b2`<li class="item bubbled ${tone}">
          <span class="bubble sm ${tone === "ok" ? "accent" : tone}">${icon(JOB_ICON[j.status] ?? mdiCogOutline, "")}</span>
          <div class="bodycol">
          <div class="row spread"><span class="ellipsis">${j.kind}${j.worker ? b2` <span class="muted">on ${j.worker}</span>` : ""}</span>
            <span class="row" style="flex-wrap:nowrap">
            ${live && can2.has("job.cancel") ? b2`<button class="act danger" @click=${() => runAction(this, hass2, "job.cancel", j.id, {}, `Cancel this ${j.kind} job?`)}>Cancel</button>` : ""}
            ${j.status === "failed" && can2.has("job.retry") ? b2`<button class="act" @click=${() => runAction(this, hass2, "job.retry", j.id)}>Retry</button>` : ""}
            ${!live && can2.has("job.clear") ? b2`<button class="act" @click=${() => runAction(this, hass2, "job.clear", j.id)}>Clear</button>` : ""}
            <span class="chip ${stateClass(j.status)}">${j.status}</span></span></div>
          ${j.reason ? b2`<div class="detail">${j.reason}</div>` : ""}
          </div>
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

// src/cards/pulse-card.ts
var HishoPulseCard = class extends HishoCard {
  static {
    this.styles = [cardStyles, i`
    ha-card { background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; padding: 0; }
    .live { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
    .lt { position: relative; overflow: hidden; padding: 16px 18px 0; cursor: pointer; display: flex; flex-direction: column;
      min-height: 132px; transition: transform 0.15s, border-color 0.15s;
      background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
      backdrop-filter: blur(20px) saturate(130%); -webkit-backdrop-filter: blur(20px) saturate(130%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
    .lt:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.16); }
    .lt .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .lt .lv { font-size: 2.6em; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
    .lt .lv small { font-size: 0.42em; color: var(--hisho-text-2); margin-left: 3px; font-weight: 400; }
    .lt .ll { margin-top: 6px; font-size: 0.86em; font-weight: 500; }
    .lt .ls { font-size: 0.76em; color: var(--hisho-text-2); }
    .lt .bubble { width: 34px; height: 34px; } .lt .bubble svg { width: 19px; height: 19px; }
    .lt hisho-spark { margin: auto -18px 0; height: 44px; }
    .lt.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }
    @container (max-width: 760px) { .live { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  `];
  }
  static getStubConfig() {
    return { type: "custom:hisho-pulse-card" };
  }
  getGridOptions() {
    return { columns: "full", min_columns: 6 };
  }
  body() {
    const hass2 = this.hass;
    const h3 = hub(hass2);
    const machines = byKind(hass2, "machine");
    const online = entity(hass2, h3, "machines_online");
    const faulted = entity(hass2, h3, "machines_faulted");
    const needs = entity(hass2, h3, "needs_you_count");
    const alerts = needs?.attributes.alerts ?? [];
    const critical = alerts.filter((a3) => a3.severity === "critical").length;
    const jobs = entity(hass2, h3, "jobs_active")?.attributes.jobs ?? [];
    const running = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).length;
    const failed = jobs.filter((j) => j.status === "failed").length;
    const conflicts = entity(hass2, h3, "sync_conflicts");
    const nOnline = available(online) ? Number(online.state) : void 0;
    const nFaulted = available(faulted) ? Number(faulted.state) : 0;
    const nConflicts = available(conflicts) ? Number(conflicts.state) || 0 : void 0;
    const tile = (tone, value, of, label, sub, path, id, spark = "var(--hisho-accent-text)", max) => b2`
      <div class="lt ${tone}" @click=${() => id && moreInfo(this, id)}>
        <div class="top"><div><div class="lv">${value}${of ? b2`<small>${of}</small>` : ""}</div>
          <div class="ll">${label}</div><div class="ls">${sub}</div></div>
          <span class="bubble ${tone === "ok" ? "accent" : tone || "brown"}">${icon(path, "")}</span></div>
        ${id ? b2`<hisho-spark .hass=${hass2} .entity=${id} .min=${0} .max=${max}
          .tone=${tone === "bad" ? "var(--hisho-crit)" : spark}></hisho-spark>` : ""}
      </div>`;
    return this.frame(b2`<div class="live">
      ${tile(
      nFaulted ? "bad" : nOnline === machines.length ? "ok" : "",
      nOnline ?? "\u2013",
      `/${machines.length}`,
      "Machines online",
      nFaulted ? `${nFaulted} faulted` : machines.length - (nOnline ?? 0) ? `${machines.length - (nOnline ?? 0)} parked or off` : "All up",
      mdiServerNetwork,
      online?.entity_id,
      void 0,
      machines.length
    )}
      ${tile(
      critical ? "bad" : alerts.length ? "warn" : "ok",
      alerts.length,
      "",
      "Needs you",
      critical ? `${critical} critical` : alerts.length ? "Nothing critical" : "All clear",
      mdiBellRingOutline,
      needs?.entity_id,
      "var(--hisho-brown-text)"
    )}
      ${tile(
      failed ? "warn" : "ok",
      running,
      "",
      "Jobs running",
      failed ? `${failed} failed` : `${jobs.length} recent`,
      mdiCogSyncOutline,
      entityId(h3, "jobs_active")
    )}
      ${tile(
      nConflicts ? "warn" : "ok",
      nConflicts ?? "\u2013",
      "",
      "Sync conflicts",
      nConflicts ? "Files to sort out" : "None",
      nConflicts ? mdiFileAlertOutline : mdiCheckDecagramOutline,
      conflicts?.entity_id,
      "var(--hisho-brown-text)"
    )}
    </div>`);
  }
};

// src/strategy.ts
function glass(card) {
  return { ...card, card_mod: { style: HA_CARD_GLASS } };
}
var FULL = { grid_options: { columns: "full" } };
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
function generateDashboard(hass2, config = {}) {
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
  const background = viewBackground(config.background);
  const views = [
    // The Control Center fills the screen: a panel view is one card, full width.
    {
      title: "Overview",
      path: "overview",
      icon: "mdi:view-dashboard",
      type: "panel",
      cards: [{ type: "custom:hisho-control-center-card" }]
    },
    // The system lives here, not on the Overview: the fleet's pulse across the top, then each machine.
    sections({ title: "Machines", path: "machines", icon: "mdi:server" }, [
      { type: "grid", column_span: 4, cards: [{ type: "custom:hisho-pulse-card", ...FULL }] },
      ...machines.map((m2) => [{ type: "custom:hisho-machine-card", machine: m2.name }])
    ]),
    // A group as wide as its devices (up to the four columns), its cards side by side inside it.
    sections(
      { title: "Devices", path: "devices", icon: "mdi:devices" },
      KIND_ORDER.filter((k2) => groups.has(k2)).map((k2) => ({
        type: "grid",
        column_span: Math.min(4, groups.get(k2).length),
        cards: [
          { type: "heading", heading: KIND_TITLE[k2] },
          ...groups.get(k2).map((name) => ({ type: "custom:hisho-device-card", device: name }))
        ]
      }))
    ),
    sections({ title: "Add-ons", path: "addons", icon: "mdi:puzzle" }, [
      ...entityId(h3, "addon_updates") ? [{ type: "grid", column_span: 2, cards: [{ type: "custom:hisho-store-card", ...FULL }] }] : [],
      ...addons.map((a3) => [{ type: "custom:hisho-device-card", device: a3.name }])
    ]),
    ...todayList || dueDates ? [sections({ title: "Today", path: "today", icon: "mdi:calendar-today" }, [
      todayList ? [glass({ type: "todo-list", entity: todayList, title: "Today" })] : [],
      dueDates ? { type: "grid", column_span: 3, cards: [
        glass({ type: "calendar", entities: [dueDates], initial_view: "dayGridMonth", title: "Due dates", ...FULL })
      ] } : []
    ])] : [],
    sections({ title: "Projects", path: "projects", icon: "mdi:folder-multiple" }, [
      { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-projects-card", ...FULL }] },
      { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-jobs-card", title: "All jobs", limit: 50, ...FULL }] }
    ]),
    sections({ title: "Phone", path: "phone", icon: "mdi:cellphone-message" }, [[
      glass({ type: "entities", title: "Hisho phone app", entities: phone }),
      glass({ type: "markdown", content: "Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity." })
    ]])
  ];
  return { title: "Hisho", views: views.map((v2) => ({ ...v2, background })) };
}
var HishoDashboardStrategy = class extends HTMLElement {
  static async generate(config, hass2) {
    return generateDashboard(hass2, config);
  }
};

// src/index.ts
var VERSION = "0.5.0";
registerIcons();
var CARDS = [
  [
    "hisho-control-center-card",
    HishoControlCenterCard,
    "Hisho control center",
    "Hisho's Overview in one wide card: your day, decisions, what Hisho is doing and did, Ask Hisho. Best in a panel view."
  ],
  ["hisho-pulse-card", HishoPulseCard, "Hisho pulse", "Machines online, needs you, jobs, sync conflicts, with their last 24 hours."],
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
add("sensor.ten_mem", "ten", "memory_usage", "9");
add("sensor.ten_disk", "ten", "disk_usage", "41");
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
hass.user = { id: "u", name: "Jonathan Yepiz", is_admin: true };
hass.config = { time_zone: "America/Los_Angeles" };
add("binary_sensor.hisho_sync_problem", "hub", "sync_problem", "off");
add("sensor.hisho_sync_conflicts", "hub", "sync_conflicts", "0");
add("sensor.hisho_projects_waiting", "hub", "projects_waiting", "2");
var todo = { items: [
  {
    uid: "a1",
    summary: "TrueNAS: pool Potter is unhealthy",
    status: "needs_action",
    description: "CRITICAL: Pool Potter is online but ZFS reports 224 data errors from the last scrub.\n\nClaude: disk sdh, or its cable; the disks also run hot (57 \xB0C)."
  },
  { uid: "a3", summary: "Rotate the reused password everywhere it was used", status: "needs_action", description: "DECISION: Security follow-ups" },
  { uid: "a4", summary: "Semaphore: Authorized Keys - Manual Guarded failed", status: "needs_action", description: "WARN: failed on October 25" },
  { uid: "a5", summary: "PatriotPoint: SAM.gov renewal due October 29", status: "needs_action", description: "WARN: confirm it was approved" }
] };
var day = (id) => {
  const now = Date.now() / 1e3, cur = parseFloat(hass.states[id]?.state ?? "0") || 0;
  let h3 = 0;
  for (const c4 of id) h3 = (h3 * 31 + c4.charCodeAt(0)) % 9973;
  const count = /online|needs|jobs|conflicts/.test(id);
  return Array.from({ length: 49 }, (_2, i5) => {
    const t3 = i5 / 48, w3 = Math.sin(t3 * 9 + h3) * 0.5 + Math.sin(t3 * 23 + h3 * 2) * 0.3 + Math.sin(t3 * 3 + h3) * 0.6;
    const v2 = count ? Math.max(0, Math.round(cur + w3 * 1.3 * (i5 < 46 ? 1 : 0))) : Math.max(0, Math.min(100, cur + w3 * Math.max(4, cur * 0.35) * (i5 < 48 ? 1 : 0)));
    return { s: String(v2), lu: now - (48 - i5) * 1800 };
  });
};
var iso = (min) => new Date(Date.now() - min * 6e4).toISOString();
add("conversation.hisho", "hub", "assistant", "2026-10-26T09:00:00Z");
add("sensor.hisho_done_for_you", "hub", "done_for_you", "5", { items: [
  { at: iso(25), event: "answered", text: "Answered 3 questions for you" },
  { at: iso(95), event: "job-transition", text: "Installed on Hashira Ren" },
  { at: iso(160), event: "alert-investigate", text: "Looked into \u201CTrueNAS: pool Potter is unhealthy\u201D: disk sdh, or its cable; the disks also run hot (57 \xB0C)" },
  { at: iso(240), event: "host-sleep", text: "Parked Hashira Ten while nothing needed it" },
  { at: iso(420), event: "today-note", text: "Wrote today's note" }
] });
hass.states["todo.hisho_today"].state = "3";
hass.states["sensor.hisho_jobs_active"].attributes.jobs = [
  { id: "job-1", kind: "transcribe", status: "running", worker: "souko", updated_at: iso(12) },
  { id: "job-2", kind: "transcribe", status: "failed", worker: "souko", reason: "no input", updated_at: iso(300) },
  { id: "job-3", kind: "install", status: "done", worker: "hashira-ren", updated_at: iso(95) },
  { id: "job-4", kind: "transcribe", status: "done", worker: "hashira-ten", updated_at: iso(420) }
];
hass.states["sensor.hisho_projects_active"].attributes.projects = [
  { name: "ha", title: "Hisho in Home Assistant", status: "active", waiting_on: "claude", next: "Assistant-first Overview" },
  { name: "sec", title: "Security follow-ups", status: "active", waiting_on: "jonathan", asks: ["Rotate the reused password"] },
  { name: "pp", title: "Patriot Point website", status: "active", waiting_on: "jonathan", asks: ["Approve the new home page"] }
];
var today = { items: [
  { uid: "t1", summary: "Swap the failing disk in Potter (ZX212N0K)", status: "needs_action" },
  { uid: "t2", summary: "Confirm the SAM.gov renewal for Patriot Point", status: "needs_action" },
  { uid: "t3", summary: "Send Randy the Web Factory notes", status: "needs_action" },
  { uid: "t4", summary: "Review the Hisho dashboard redesign", status: "completed" }
] };
var d3 = (n4) => {
  const x2 = /* @__PURE__ */ new Date();
  x2.setDate(x2.getDate() + n4);
  return x2.toISOString().slice(0, 10);
};
hass.callApi = async (method, path) => path.startsWith("calendars/") ? [
  { summary: "PatriotPoint: SAM.gov renewal", start: { date: d3(3) } },
  { summary: "YepizTech: Golden Coast invoice", start: { date: d3(5) } },
  { summary: "Skybuilders: site launch", start: { date: d3(11) } }
] : [];
hass.callWS = async (msg) => msg.type === "history/history_during_period" ? Object.fromEntries(msg.entity_ids.map((id) => [id, day(id)])) : msg.type === "todo/item/list" && msg.entity_id === "todo.hisho_today" ? today : todo;
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
