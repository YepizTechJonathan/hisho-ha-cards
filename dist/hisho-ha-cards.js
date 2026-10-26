var nt=globalThis,ot=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,yt=Symbol(),Bt=new WeakMap,Y=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==yt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ot&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Bt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Bt.set(e,t))}return t}toString(){return this.cssText}},at=i=>new Y(typeof i=="string"?i:i+"",void 0,yt),H=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new Y(e,i,yt)},Kt=(i,t)=>{if(ot)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=nt.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},xt=ot?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return at(e)})(i):i;var{is:ge,defineProperty:ve,getOwnPropertyDescriptor:be,getOwnPropertyNames:$e,getOwnPropertySymbols:ye,getPrototypeOf:xe}=Object,rt=globalThis,qt=rt.trustedTypes,we=qt?qt.emptyScript:"",_e=rt.reactiveElementPolyfillSupport,Z=(i,t)=>i,wt={toAttribute(i,t){switch(t){case Boolean:i=i?we:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Gt=(i,t)=>!ge(i,t),Wt={attribute:!0,type:String,converter:wt,reflect:!1,useDefault:!1,hasChanged:Gt};Symbol.metadata??=Symbol("metadata"),rt.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Wt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&ve(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:o}=be(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:n,set(a){let c=n?.call(this);o?.call(this,a),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Wt}static _$Ei(){if(this.hasOwnProperty(Z("elementProperties")))return;let t=xe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Z("properties"))){let e=this.properties,s=[...$e(e),...ye(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(xt(n))}else t!==void 0&&e.push(xt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Kt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:wt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let o=s.getPropertyOptions(n),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:wt;this._$Em=n;let c=a.fromAttribute(e,o.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(t,e,s,n=!1,o){if(t!==void 0){let a=this.constructor;if(n===!1&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??Gt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:a}=o,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[Z("elementProperties")]=new Map,C[Z("finalized")]=new Map,_e?.({ReactiveElement:C}),(rt.reactiveElementVersions??=[]).push("2.1.2");var Ct=globalThis,Jt=i=>i,ct=Ct.trustedTypes,Yt=ct?ct.createPolicy("lit-html",{createHTML:i=>i}):void 0,se="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+D,Ae=`<${ie}>`,V=document,Q=()=>V.createComment(""),tt=i=>i===null||typeof i!="object"&&typeof i!="function",Tt=Array.isArray,ke=i=>Tt(i)||typeof i?.[Symbol.iterator]=="function",_t=`[ 	
\f\r]`,X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zt=/-->/g,Xt=/>/g,U=RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qt=/'/g,te=/"/g,ne=/^(?:script|style|textarea|title)$/i,Rt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),r=Rt(1),Ve=Rt(2),Fe=Rt(3),F=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),ee=new WeakMap,z=V.createTreeWalker(V,129);function oe(i,t){if(!Tt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yt!==void 0?Yt.createHTML(t):t}var Se=(i,t)=>{let e=i.length-1,s=[],n,o=t===2?"<svg>":t===3?"<math>":"",a=X;for(let c=0;c<e;c++){let h=i[c],d,u,l=-1,v=0;for(;v<h.length&&(a.lastIndex=v,u=a.exec(h),u!==null);)v=a.lastIndex,a===X?u[1]==="!--"?a=Zt:u[1]!==void 0?a=Xt:u[2]!==void 0?(ne.test(u[2])&&(n=RegExp("</"+u[2],"g")),a=U):u[3]!==void 0&&(a=U):a===U?u[0]===">"?(a=n??X,l=-1):u[1]===void 0?l=-2:(l=a.lastIndex-u[2].length,d=u[1],a=u[3]===void 0?U:u[3]==='"'?te:Qt):a===te||a===Qt?a=U:a===Zt||a===Xt?a=X:(a=U,n=void 0);let p=a===U&&i[c+1].startsWith("/>")?" ":"";o+=a===X?h+Ae:l>=0?(s.push(d),h.slice(0,l)+se+h.slice(l)+D+p):h+D+(l===-2?c:p)}return[oe(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},et=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let o=0,a=0,c=t.length-1,h=this.parts,[d,u]=Se(t,e);if(this.el=i.createElement(d,s),z.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(n=z.nextNode())!==null&&h.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let l of n.getAttributeNames())if(l.endsWith(se)){let v=u[a++],p=n.getAttribute(l).split(D),m=/([.?@])?(.*)/.exec(v);h.push({type:1,index:o,name:m[2],strings:p,ctor:m[1]==="."?kt:m[1]==="?"?St:m[1]==="@"?Et:q}),n.removeAttribute(l)}else l.startsWith(D)&&(h.push({type:6,index:o}),n.removeAttribute(l));if(ne.test(n.tagName)){let l=n.textContent.split(D),v=l.length-1;if(v>0){n.textContent=ct?ct.emptyScript:"";for(let p=0;p<v;p++)n.append(l[p],Q()),z.nextNode(),h.push({type:2,index:++o});n.append(l[v],Q())}}}else if(n.nodeType===8)if(n.data===ie)h.push({type:2,index:o});else{let l=-1;for(;(l=n.data.indexOf(D,l+1))!==-1;)h.push({type:7,index:o}),l+=D.length-1}o++}}static createElement(t,e){let s=V.createElement("template");return s.innerHTML=t,s}};function K(i,t,e=i,s){if(t===F)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,o=tt(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=K(i,n._$AS(i,t.values),n,s)),t}var At=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??V).importNode(e,!0);z.currentNode=n;let o=z.nextNode(),a=0,c=0,h=s[0];for(;h!==void 0;){if(a===h.index){let d;h.type===2?d=new st(o,o.nextSibling,this,t):h.type===1?d=new h.ctor(o,h.name,h.strings,this,t):h.type===6&&(d=new Ht(o,this,t)),this._$AV.push(d),h=s[++c]}a!==h?.index&&(o=z.nextNode(),a++)}return z.currentNode=V,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},st=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),tt(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ke(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&tt(this._$AH)?this._$AA.nextSibling.data=t:this.T(V.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=et.createElement(oe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let o=new At(n,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=ee.get(t.strings);return e===void 0&&ee.set(t.strings,e=new et(t)),e}k(t){Tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let o of t)n===e.length?e.push(s=new i(this.O(Q()),this.O(Q()),this,this.options)):s=e[n],s._$AI(o),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Jt(t).nextSibling;Jt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}_$AI(t,e=this,s,n){let o=this.strings,a=!1;if(o===void 0)t=K(this,t,e,0),a=!tt(t)||t!==this._$AH&&t!==F,a&&(this._$AH=t);else{let c=t,h,d;for(t=o[0],h=0;h<o.length-1;h++)d=K(this,c[s+h],e,h),d===F&&(d=this._$AH[h]),a||=!tt(d)||d!==this._$AH[h],d===y?t=y:t!==y&&(t+=(d??"")+o[h+1]),this._$AH[h]=d}a&&!n&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},kt=class extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}},St=class extends q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},Et=class extends q{constructor(t,e,s,n,o){super(t,e,s,n,o),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??y)===F)return;let s=this._$AH,n=t===y&&s!==y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==y&&(s===y||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ht=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}};var Ee=Ct.litHtmlPolyfillSupport;Ee?.(et,st),(Ct.litHtmlVersions??=[]).push("3.3.3");var ae=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let o=e?.renderBefore??null;s._$litPart$=n=new st(t.insertBefore(Q(),o),o,void 0,e??{})}return n._$AI(i),n};var Mt=globalThis,E=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ae(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};E._$litElement$=!0,E.finalized=!0,Mt.litElementHydrateSupport?.({LitElement:E});var He=Mt.litElementPolyfillSupport;He?.({LitElement:E});(Mt.litElementVersions??=[]).push("4.2.2");var W=H`
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
`;function _(i){switch(i){case"up":case"on":case"ok":case"running":case"active":case"done":return"ok";case"warn":case"maintenance":case"away":case"needs_setup":case"blocked":case"queued":case"routed":return"warn";case"faulted":case"unreachable":case"problem":case"down":case"error":case"failed":case"critical":return"bad";case"decision":return"decide";default:return"off"}}function Pt(i){let t=i===void 0?NaN:parseFloat(i);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):void 0}var Ce=[["machines_online","hub"],["machine_state","machine"],["box_state","box"],["addon_status","addon"]],re=new WeakMap;function Dt(i){let t=re.get(i.entities??{});if(t&&t.devices===i.devices)return t.list;let e=Te(i);return i.entities&&re.set(i.entities,{devices:i.devices,list:e}),e}function ce(i){return Dt(i).flatMap(t=>Object.values(t.entities).flat())}function Te(i){let t=new Map;for(let s of Object.values(i.entities||{})){if(s.platform!=="hisho"||!s.device_id||!s.translation_key)continue;let n=t.get(s.device_id)??{};(n[s.translation_key]??=[]).push(s.entity_id),t.set(s.device_id,n)}let e=[];for(let[s,n]of t){let o=Ce.find(([c])=>c in n)?.[1];if(!o)continue;let a=i.devices?.[s];e.push({id:s,name:a?.name_by_user||a?.name||s,kind:o,model:a?.model||"",entities:n})}return e.sort((s,n)=>s.name.localeCompare(n.name))}function T(i,t){return Dt(i).filter(e=>e.kind===t)}function x(i){return T(i,"hub")[0]}function it(i,t,e){if(!t)return;let s=t.toLowerCase();return Dt(i).find(n=>(!e||n.kind===e)&&(n.id===t||n.name.toLowerCase()===s))}function $(i,t){return i?.entities[t]?.[0]}function f(i,t,e){let s=$(t,e);return s?i.states[s]:void 0}function j(i,t,e){return(t?.entities[e]??[]).map(s=>i.states[s]).filter(s=>!!s)}function k(i){return!!i&&i.state!=="unavailable"&&i.state!=="unknown"}function A(i){let t=f(i,x(i),"actions_allowed");return new Set(t?.attributes.allowed??[])}function B(i,t){let e=i?.attributes.friendly_name??"",s=t?t.name+" ":"";return e.startsWith(s)?e.slice(s.length):e}var b=class extends E{static{this.properties={hass:{attribute:!1},config:{attribute:!1}}}static{this.styles=W}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;let e=t.get("hass");return!e||e.entities!==this.hass.entities||e.devices!==this.hass.devices||e.user!==this.hass.user?!0:ce(this.hass).some(s=>e.states[s]!==this.hass.states[s])}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}frame(t){return this.config.embedded?r`<div class="embedded">${t}</div>`:r`<ha-card>${t}</ha-card>`}render(){return!this.hass||!this.config?r``:this.hass.user&&!this.hass.user.is_admin?r`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`:x(this.hass)?this.body():r`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`}heading(t){let e=this.config.title??t;return e?r`<div class="title">${e}</div>`:r``}};var jt=class extends E{static{this.properties={text:{},open:{type:Boolean,reflect:!0}}}static{this.styles=H`
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
  `}ask(t){return this.text=t,this.open=!0,new Promise(e=>this.resolve=e)}done(t){this.open=!1,this.resolve?.(t),this.resolve=void 0}render(){return r`<div class="box" role="alertdialog" aria-modal="true">
      <p>${this.text}</p>
      <div class="row">
        <button @click=${()=>this.done(!1)}>Cancel</button>
        <button class="yes" @click=${()=>this.done(!0)}>Yes</button>
      </div>
    </div>`}};customElements.get("hisho-confirm")||customElements.define("hisho-confirm",jt);function lt(i,t){let e=i.shadowRoot??i,s=e.querySelector("hisho-confirm");return s||(s=document.createElement("hisho-confirm"),e.appendChild(s)),s.ask(t)}async function g(i,t,e,s="",n={},o){return o&&!await lt(i,o)?!1:(await t.callService("hisho","run_action",{action:e,target:s,args:n,confirm:!!o}),!0)}async function R(i,t,e,s,n){return n&&!await lt(i,n)?!1:(await t.callService("switch",s?"turn_on":"turn_off",{},{entity_id:e}),!0)}async function le(i,t,e,s){return s&&!await lt(i,s)?!1:(await t.callService("button","press",{},{entity_id:e}),!0)}function N(i,t){i.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}function Re(i,t){let e=Pt(t);return e===void 0?r``:r`<div class="meter"><div class="mlabel"><span>${i}</span><b>${Math.round(e)}%</b></div>
    <div class="bar ${e>=95?"full":e>=85?"high":""}"><span style="width:${e}%"></span></div></div>`}function Nt(i,t){let e=[["Mem","memory_usage"],["Disk","disk_usage"],["GPU","gpu_usage"]].filter(([,s])=>Pt(f(i,t,s)?.state)!==void 0);return e.length?r`<div class="meters">${e.map(([s,n])=>Re(s,f(i,t,n)?.state))}</div>`:r``}function Ot(i,t){let e=i.hass,s=f(e,t,"machine_state"),n=f(e,t,"online"),o=f(e,t,"awake"),a=s?.attributes.power??[],c=A(e),h=s?.attributes.machine??t.name,d=$(t,"maintenance"),u=d?e.states[d]?.state==="on":!1,l=i.expanded.has(t.id),v=k(o)?o.state:s?.attributes.reason&&n?.state!=="on"?String(s.attributes.reason):s?.attributes.role??"",p=u?"decide":_(s?.state),m=(I,L)=>{let P=f(e,t,I);return k(P)?r`<span>${L}</span><span>${P.state}${P.attributes.unit_of_measurement?" "+P.attributes.unit_of_measurement:""}</span>`:""},w=j(e,t,"service"),M=w.filter(I=>I.state!=="on").length;return r`<div class="tile ${p}">
    <div class="row spread" style="cursor:pointer" @click=${()=>i.flip(t.id)}>
      <span class="row grow" style="flex-wrap:nowrap"><span class="dot ${n?.state==="on"?"on":"offline"}"></span>
        <span class="name">${t.name}</span></span>
      <span class="row" style="flex-wrap:nowrap"><span class="chip ${p}">${u?"maintenance":s?.state??"unknown"}</span>
        <span class="chev ${l?"open":""}">▶</span></span>
    </div>
    ${v?r`<span class="muted ellipsis">${v}</span>`:""}
    ${Nt(e,t)}
    ${l?r`<div class="kv">
        ${m("jobs_running","Jobs running")} ${m("jobs_queued","Jobs queued")}
        ${m("containers_running","Containers")} ${m("sync_connected","Sync")}
        ${w.length?r`<span>Services</span><span>${w.length-M} of ${w.length} running</span>`:""}
      </div>`:""}
    <div class="row">
      ${a.includes("wake")&&c.has("machine.wake")?r`<button class="act" @click=${()=>g(i,e,"machine.wake",h)}>Wake</button>`:""}
      ${a.includes("park")&&c.has("machine.park")?r`<button class="act danger" @click=${()=>g(i,e,"machine.park",h,{},`Park ${t.name}? It powers off until something needs it.`)}>Park</button>`:""}
      ${d?r`<button class="act ${u?"on":""}" title="Maintenance holds its alerts and auto-park"
          @click=${()=>R(i,e,d,!u,u?void 0:`Put ${t.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${u?"End maintenance":"Maintenance"}</button>`:""}
      ${l&&s?r`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${()=>N(i,s.entity_id)}>History…</button>`:""}
    </div>
  </div>`}function It(i,t){let e=i.hass.states[t]?.state==="on";return r`<label class="switch" title="Fleet maintenance">
    <input type="checkbox" .checked=${e}
      @change=${s=>{let n=s.target;R(i,i.hass,t,n.checked,n.checked?"Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.":void 0).then(o=>{o||(n.checked=e)})}} />Fleet maintenance</label>`}var dt=class extends b{static{this.properties={...b.properties,expanded:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-fleet-card"}}constructor(){super(),this.expanded=new Set}flip(t){let e=new Set(this.expanded);e.delete(t)||e.add(t),this.expanded=e}body(){let t=T(this.hass,"machine"),e=x(this.hass),s=f(this.hass,e,"machines_online"),n=$(e,"fleet_maintenance"),o=f(this.hass,e,"core_reachable");return this.frame(r`
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${o?.state==="off"?r`<span class="chip bad">Hisho Core unreachable</span>`:""}
          ${s?r`<span class="chip num">${s.state} of ${t.length} online</span>`:""}
          ${n?It(this,n):""}
        </div>
      </div>
      <div class="grid">${t.map(a=>Ot(this,a))}</div>
    `)}};var ht=class extends b{static{this.properties={...b.properties,expanded:{state:!0}}}static{this.styles=[W,H`
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
  `]}static getStubConfig(){return{type:"custom:hisho-control-center-card"}}constructor(){super(),this.expanded=new Set}getGridOptions(){return{columns:"full",min_columns:12}}getCardSize(){return 12}flip(t){let e=new Set(this.expanded);e.delete(t)||e.add(t),this.expanded=e}body(){let t=this.hass,e=x(t),s=T(t,"machine"),n=f(t,e,"core_reachable"),o=f(t,e,"machines_online"),a=f(t,e,"machines_faulted"),c=f(t,e,"needs_you_count"),h=c?.attributes.alerts??[],d=h.filter(S=>S.severity==="critical").length,u=h.filter(S=>S.severity==="decision").length,l=f(t,e,"jobs_active")?.attributes.jobs??[],v=l.filter(S=>["queued","routed","running"].includes(S.status)).length,p=l.filter(S=>S.status==="failed").length,m=f(t,e,"sync_problem"),w=f(t,e,"sync_conflicts"),M=$(e,"fleet_maintenance"),I=M?t.states[M]?.state==="on":!1,L=k(o)?Number(o.state):void 0,P=k(a)?Number(a.state):0,J=(S,ue,me,fe,Ft)=>r`
      <div class="stat ${S}" @click=${()=>Ft&&N(this,Ft)}>
        <span class="l">${me}</span><span class="v">${ue}</span><span class="s">${fe}</span></div>`,$t=h.length;return this.frame(r`
      <div class="head">
        <div class="brand">${this.config.title??r`<span class="kanji">秘書</span> Hisho`}</div>
        <div class="row">${I?r`<span class="chip decide">fleet in maintenance</span>`:""}
          ${M?It(this,M):""}</div>
      </div>
      <div class="stats">
        ${J(n?.state==="off"?"bad":"ok",n?.state==="off"?"Down":"Up","Hisho Core",n?.state==="off"?"Unreachable from Home Assistant":"Answering",n?.entity_id)}
        ${J(P?"bad":L===s.length?"ok":"",L!==void 0?`${L}/${s.length}`:"\u2013","Machines online",P?`${P} faulted`:s.length-(L??0)?`${s.length-(L??0)} parked or off`:"All up",o?.entity_id)}
        ${J(d?"bad":$t?"warn":"ok",$t,"Needs you",d?`${d} critical`:u?`${u} to decide`:$t?"Nothing critical":"All clear",c?.entity_id)}
        ${J(p?"bad":v?"decide":"ok",v,"Jobs running",p?`${p} failed`:`${l.length} recent`,$(e,"jobs_active"))}
        ${J(m?.state==="on"?"bad":"ok",m?.state==="on"?"Problem":"OK","Sync",k(w)&&Number(w.state)?`${w.state} conflict files`:"In sync",m?.entity_id)}
      </div>
      <div class="body">
        <div class="machines">
          <div class="eyebrow">Machines</div>
          <div class="grid">${s.map(S=>Ot(this,S))}</div>
        </div>
        <div class="side">
          <hisho-needs-you-card .hass=${t} .config=${{type:"custom:hisho-needs-you-card",embedded:!0,compact:!0,limit:this.config.needs_you_limit??6}}></hisho-needs-you-card>
          <hisho-jobs-card .hass=${t} .config=${{type:"custom:hisho-jobs-card",embedded:!0,limit:this.config.jobs_limit??5}}></hisho-jobs-card>
        </div>
      </div>
    `)}};var pt=class extends b{static getStubConfig(t){return{type:"custom:hisho-machine-card",machine:(t?Object.values(t.devices??{}).find(s=>s.model&&s.via_device_id):void 0)?.name??""}}setConfig(t){if(!t?.machine)throw new Error("Say which machine: machine: <name>");super.setConfig(t)}body(){let t=this.hass,e=it(t,this.config.machine,"machine");if(!e)return r`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;let s=f(t,e,"machine_state"),n=s?.attributes.machine??e.name,o=A(t),a=s?.attributes.power??[],c=s?.attributes.items??[],h=j(t,e,"unit"),d=j(t,e,"restart_unit"),u=j(t,e,"service"),l=$(e,"maintenance"),v=(p,m)=>{let w=f(t,e,p);return k(w)?r`<div class="row spread"><span class="muted">${m}</span>
        <span>${w.state}${w.attributes.unit_of_measurement?" "+w.attributes.unit_of_measurement:""}</span></div>`:""};return r`<ha-card>
      <div class="head">
        <div class="title">${this.config.title??e.name}</div>
        <span class="chip ${_(s?.state)}">${s?.state??"unknown"}</span>
      </div>
      ${s?.attributes.role?r`<div class="muted">${s.attributes.role}</div>`:""}
      <div style="margin:6px 0 8px">${Nt(t,e)}</div>
      ${v("awake","Parking")} ${v("jobs_running","Jobs running")} ${v("jobs_queued","Jobs queued")}
      ${v("containers_running","Containers")} ${v("sync_connected","Sync")}
      <div class="row" style="margin-top:8px">
        ${a.includes("wake")&&o.has("machine.wake")?r`<button class="act" @click=${()=>g(this,t,"machine.wake",n)}>Wake</button>`:""}
        ${a.includes("park")&&o.has("machine.park")?r`<button class="act danger" @click=${()=>g(this,t,"machine.park",n,{},`Park ${e.name}? It powers off until something needs it.`)}>Park</button>`:""}
        ${l?r`<button class="act ${t.states[l]?.state==="on"?"":"danger"}" @click=${()=>{let p=t.states[l]?.state==="on";R(this,t,l,!p,p?void 0:`Put ${e.name} in maintenance? Its alerts are held and its VM shuts down.`)}}>${t.states[l]?.state==="on"?"End maintenance":"Maintenance"}</button>`:""}
      </div>
      ${u.length||h.length?r`<div class="title" style="margin-top:14px;font-size:1em">Services</div>`:""}
      <ul class="list">
        ${u.map(p=>r`<li><div class="row spread"><span>${B(p,e)}</span>
          <span class="chip ${p.state==="on"?"ok":"bad"}">${p.state==="on"?"running":p.attributes.state??"stopped"}</span></div></li>`)}
        ${h.map(p=>{let m=B(p,e),w=d.find(I=>B(I,e)===`Restart ${m}`),M=p.state;return r`<li><div class="row spread"><span>${m}</span><span class="row">
            ${k(p)?r`<button class="act ${p.state==="on"?"danger":""}" @click=${()=>R(this,t,p.entity_id,p.state!=="on",p.state==="on"?`Stop ${m} on ${e.name}?`:void 0)}>
              ${p.state==="on"?"Stop":"Start"}</button>`:r`<span class="muted">${M}</span>`}
            ${w?r`<button class="act" @click=${()=>le(this,t,w.entity_id)}>Restart</button>`:""}
          </span></div></li>`})}
      </ul>
      ${c.length?r`<div class="title" style="margin-top:14px;font-size:1em">From add-ons</div>`:""}
      <ul class="list">${c.map(p=>r`<li>
        <div class="row spread"><span>${p.name}</span><span class="chip ${_(p.state)}">${p.state}</span></div>
        ${p.facts?.length?r`<div class="detail">${p.facts.join(" \xB7 ")}</div>`:""}
        ${o.has("device.press")&&p.actions?.length?r`<div class="row">${p.actions.map(m=>r`
          <button class="act ${m.danger?"danger":""}" @click=${()=>g(this,t,"device.press",p.addon,{entry:p.entry,item:p.id,action:m.id},m.danger?`${m.label}: ${p.name} on ${e.name}?`:void 0)}>${m.label}</button>`)}</div>`:""}
      </li>`)}</ul>
      <div class="muted" style="margin-top:8px;cursor:pointer" @click=${()=>s&&N(this,s.entity_id)}>History…</div>
    </ha-card>`}};var Me={critical:"bad",decision:"decide",warn:"warn",info:"off"},ut=class extends b{static{this.properties={...b.properties,items:{state:!0},showDone:{state:!0},expanded:{state:!0},showAll:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-needs-you-card"}}constructor(){super(),this.items=[],this.showDone=!1,this.expanded=new Set,this.showAll=!1}updated(t){super.updated(t);let e=$(x(this.hass),"needs_you"),s=e?this.hass.states[e]?.last_changed+"|"+this.hass.states[e]?.state:void 0;e&&s!==this.seen&&(this.seen=s,this.hass.callWS({type:"todo/item/list",entity_id:e}).then(n=>this.items=n.items??[]).catch(()=>this.items=[]))}body(){let t=this.hass,e=x(t),s=f(t,e,"needs_you_count")?.attributes.alerts??[],n=new Map(s.map(l=>[l.id,l.severity])),o=s.filter(l=>l.severity==="decision"&&/asks to connect/.test(l.title)),a=this.items.filter(l=>this.showDone||l.status==="needs_action"),c=this.items.filter(l=>l.status==="completed").length,h=this.config.limit??50,d=this.showAll?a:a.slice(0,h),u=A(t);return this.frame(r`
      <div class="head">${this.heading("Needs you")}
        <span class="row">${a.length?r`<span class="chip ${s.some(l=>l.severity==="critical")?"bad":"warn"} num">${a.filter(l=>l.status==="needs_action").length} open</span>`:""}
        ${c?r`<button class="act" @click=${()=>this.showDone=!this.showDone}>
          ${this.showDone?"Hide":"Show"} ${c} acknowledged</button>`:""}</span></div>
      ${o.map(l=>r`<div class="tile decide" style="margin-bottom:8px"><span class="row"><span class="chip decide">decide</span>
        <span>${l.title}</span></span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${a.length?"":r`<div class="empty">Nothing needs you right now.</div>`}
      <ul class="list">${d.map(l=>{let v=n.get(l.uid)??(l.description?.split(":")[0]||"").toLowerCase(),p=l.status==="completed",m=!this.config.compact||this.expanded.has(l.uid);return r`<li class="item ${p?"off":_(v==="warn"?"warn":v)}">
          <div class="row spread" style="cursor:${this.config.compact?"pointer":"default"}" @click=${()=>this.flip(l.uid)}>
            <span class="row grow" style="flex-wrap:nowrap"><span class="chip ${p?"off":Me[v]??_(v)}">${p?"acknowledged":v||"alert"}</span>
              <span class=${this.config.compact&&!m?"ellipsis":""}>${l.summary}</span></span>
            ${this.config.compact?r`<span class="chev ${m?"open":""}">▶</span>`:""}</div>
          ${m&&l.description?r`<div class="detail">${l.description.replace(/^[A-Z]+:\s*/,"")}</div>`:""}
          ${m&&u.has("alert.ack")?r`<div class="row">
            ${p?r`<button class="act" @click=${()=>this.alert(l.uid,"unack")}>Un-acknowledge</button>`:r`<button class="act" @click=${()=>this.alert(l.uid,"ack")}>Acknowledge</button>
                     <button class="act" @click=${()=>this.alert(l.uid,"snooze")}>Snooze 1 h</button>`}
            <button class="act" @click=${()=>this.alert(l.uid,"investigate")}>Investigate</button>
            <button class="act" @click=${()=>this.alert(l.uid,"notify")}>Send to phone</button>
          </div>`:""}
        </li>`})}</ul>
      ${a.length>d.length||this.showAll?r`<button class="link" style="margin-top:6px;font-size:0.86em"
        @click=${()=>this.showAll=!this.showAll}>${this.showAll?"Show fewer":`Show all ${a.length}`}</button>`:""}
    `)}flip(t){if(!this.config.compact)return;let e=new Set(this.expanded);e.delete(t)||e.add(t),this.expanded=e}alert(t,e){return g(this,this.hass,`alert.${e}`,t,e==="snooze"?{hours:1}:{})}};function Ut(i={},t={}){return Object.entries(i).map(([e,s])=>{let n=s.endsWith("?"),o=s.replace(/\?$/,""),a=/^list\((.*)\)$/.exec(o);return{key:e,type:a?"list":o,optional:n,choices:a?a[1].split("|").map(c=>c.trim()).filter(Boolean):[],label:t[e]??e.replace(/_/g," ")}})}var Lt=i=>i.type==="password"||i.type==="secret",Pe=/^[A-Z][A-Z0-9_]{2,127}$/;function zt(i,t){let e=i.key;if(i.type==="bool")return r`<input type="checkbox" name=${e} .checked=${!!t} />`;if(i.type==="list")return r`<select name=${e}>${i.choices.map(o=>r`<option value=${o} ?selected=${o===t}>${o}</option>`)}</select>`;let s=i.type==="int"||i.type==="port"?"number":i.type==="url"?"url":"text",n=Lt(i)?"secret's name, e.g. CLOUDFLARE_EXAMPLE_TOKEN":i.optional?"optional":"";return r`<input type=${s} name=${e} .value=${t??""} placeholder=${n}
    pattern=${Lt(i)?"[A-Z][A-Z0-9_]{2,127}":".*"} />`}function Vt(i,t,e={}){let s={};for(let n of t){let o=i.elements.namedItem(n.key);if(!o)continue;let a=o instanceof HTMLInputElement&&o.type==="checkbox"?o.checked:o.value.trim();if((n.type==="int"||n.type==="port")&&a!==""&&(a=Number(a)),Lt(n)&&a&&!Pe.test(a))return{values:s,error:`${n.label}: give the secret's name, not its value (paste values in Hisho's dashboard).`};a!==(e[n.key]??(n.type==="bool"?!1:""))&&(s[n.key]=a)}return{values:s}}var de=`
  form.settings { display: grid; grid-template-columns: minmax(110px, 38%) 1fr; gap: 6px 10px; align-items: center; margin: 8px 0; }
  form.settings label { color: var(--secondary-text-color); font-size: 0.9em; overflow-wrap: anywhere; }
  form.settings input, form.settings select {
    font: inherit; padding: 4px 6px; border-radius: 6px; border: 1px solid var(--divider-color);
    background: var(--card-background-color); color: var(--primary-text-color); min-width: 0;
  }
  form.settings input[type=checkbox] { justify-self: start; }
  form.settings .full { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; }
  .error { color: var(--error-color, #db4437); font-size: 0.9em; }
`;var De=(i,t)=>A(i).has(t),mt=class extends b{static{this.properties={...b.properties,error:{state:!0}}}static{this.styles=[W,H`${at(de)}`]}static getStubConfig(){return{type:"custom:hisho-device-card",device:""}}setConfig(t){if(!t?.device)throw new Error("Say which device: device: <name>");super.setConfig(t)}body(){let t=it(this.hass,this.config.device,"box")??it(this.hass,this.config.device,"addon");return t?t.kind==="addon"?this.addon(t):this.box(t):r`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`}maintenance(t,e){let s=$(t,"maintenance");if(!s)return"";let n=this.hass.states[s]?.state==="on";return r`<button class="act ${n?"":"danger"}" @click=${()=>R(this,this.hass,s,!n,n?void 0:`Put ${e} in maintenance? Its alerts are held.`)}>
      ${n?"End maintenance":"Maintenance"}</button>`}box(t){let e=this.hass,s=f(e,t,"box_state"),n=f(e,t,"box_health"),o=A(e);return r`<ha-card>
      <div class="head"><div class="title">${this.config.title??t.name}</div>
        <span class="row"><span class="chip ${_(s?.state)}">${s?.state??"unknown"}</span>
          <span class="chip ${_(n?.state)}">${n?.state??"unknown"}</span></span></div>
      ${n?.attributes.summary?r`<div class="detail">${n.attributes.summary}</div>`:""}
      <ul class="list" style="margin-top:10px">${j(e,t,"box_item").map(a=>{let c=a.attributes;return r`<li>
          <div class="row spread"><span class="name" @click=${()=>N(this,a.entity_id)}>${B(a,t)}</span>
            <span class="chip ${_(a.state)}">${k(a)?a.state:"unavailable"}</span></div>
          ${c.facts?.length?r`<div class="detail">${c.facts.join(" \xB7 ")}</div>`:""}
          ${o.has("device.press")&&c.actions?.length?r`<div class="row">${c.actions.map(h=>r`
            <button class="act ${h.danger?"danger":""}" @click=${()=>g(this,e,"device.press",c.addon,{entry:c.entry,item:c.item_id,action:h.id},h.danger?`${h.label}: ${B(a,t)} on ${t.name}?`:void 0)}>${h.label}</button>`)}</div>`:""}
        </li>`})}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(t,t.name)}</div>
    </ha-card>`}addon(t){let e=this.hass,s=f(e,t,"addon_status"),n=$(t,"addon_enabled"),o=s?.attributes??{},a=A(e);return r`<ha-card>
      <div class="head"><div class="title">${this.config.title??t.name}</div>
        <span class="chip ${_(s?.state)}">${s?.state??"unknown"}</span></div>
      <div class="muted">${[o.kind,o.version&&"v"+o.version,o.host&&"on "+o.host].filter(Boolean).join(" \xB7 ")}</div>
      ${o.problems?.length?r`<ul class="list" style="margin-top:8px">${o.problems.map(c=>r`<li><span class="detail">${c}</span></li>`)}</ul>`:""}
      <div class="row" style="margin-top:10px">
        ${a.has("addon.run")?(o.actions??[]).map(c=>r`<button class="act ${c.danger?"danger":""}"
          @click=${()=>g(this,e,"addon.run",o.addon,{action:c.id},c.danger?`${c.label} (${t.name})?`:void 0)}>${c.label}</button>`):""}
        ${this.maintenance(t,t.name)}
        ${n?r`<button class="act ${e.states[n]?.state==="on"?"danger":""}" @click=${()=>{let c=e.states[n]?.state==="on";R(this,e,n,!c,c?`Turn ${t.name} off? Hisho stops running it.`:void 0)}}>${e.states[n]?.state==="on"?"Turn off":"Turn on"}</button>`:""}
      </div>
      ${a.has("addon.config")?this.settings(o):""}
    </ha-card>`}settings(t){let e=this.hass,s=t.settings??{},n=Ut(s.schema,{}),o=Ut(s.entry_schema,s.entry_form),a=s.entries??[];if(!n.length&&!o.length)return"";let c=async d=>{d.preventDefault();let{values:u,error:l}=Vt(d.target,n,s.options??{});this.error=l??"",!(l||!Object.keys(u).length)&&await g(this,e,"addon.config",t.addon,{settings:u})},h=async(d,u)=>{d.preventDefault();let l=d.target.closest("form"),v=l.elements.namedItem("__entry").value.trim(),{values:p,error:m}=Vt(l,o);this.error=m??(v?"":"Give the entry a name."),!this.error&&await g(this,e,u?"addon.test":"addon.entry",t.addon,{entry:v,settings:p})};return r`<details style="margin-top:12px"><summary class="muted">Settings</summary>
      ${this.error?r`<div class="error">${this.error}</div>`:""}
      ${n.length?r`<form class="settings" @submit=${c}>
        ${n.map(d=>r`<label>${d.label}</label>${zt(d,(s.options??{})[d.key])}`)}
        <div class="full"><button class="act" type="submit">Save</button>
          ${De(e,"addon.apply")?r`<button class="act" type="button" @click=${()=>g(this,e,"addon.apply",t.addon)}>Apply on its machine</button>`:""}</div>
      </form>`:""}
      ${o.length?r`<div class="muted" style="margin-top:8px">${s.entry_label??"Entries"}</div>
        <ul class="list">${a.map(d=>r`<li><div class="row spread"><span>${d}</span>
          <button class="act danger" @click=${()=>g(this,e,"addon.entry",t.addon,{entry:d,settings:{_remove:!0}},`Remove ${d} from ${t.addon}?`)}>Remove</button></div></li>`)}</ul>
        <form class="settings" @submit=${d=>h(d,!1)}>
          <label>Name</label><input name="__entry" placeholder="a short name" />
          ${o.map(d=>r`<label>${d.label}</label>${zt(d,void 0)}`)}
          <div class="full"><button class="act" type="button" @click=${d=>h(d,!0)}>Test</button>
            <button class="act" type="submit">Add or replace</button></div>
        </form>`:""}
    </details>`}};var ft=class extends b{static getStubConfig(){return{type:"custom:hisho-jobs-card"}}body(){let t=this.hass,e=f(t,x(t),"jobs_active")?.attributes.jobs??[],s=A(t),n=this.config.limit??10;return this.frame(r`
      <div class="head">${this.heading("Jobs")}
        ${s.has("jobs.reap")?r`<button class="act" @click=${()=>g(this,t,"jobs.reap")}>Fail stuck jobs</button>`:""}</div>
      ${e.length?"":r`<div class="empty">No jobs.</div>`}
      <ul class="list">${e.slice(0,n).map(o=>{let a=["queued","routed","running"].includes(o.status);return r`<li class="item ${_(o.status)}">
          <div class="row spread"><span class="ellipsis">${o.kind}${o.worker?r` <span class="muted">on ${o.worker}</span>`:""}</span>
            <span class="row" style="flex-wrap:nowrap">
            ${a&&s.has("job.cancel")?r`<button class="act danger" @click=${()=>g(this,t,"job.cancel",o.id,{},`Cancel this ${o.kind} job?`)}>Cancel</button>`:""}
            ${o.status==="failed"&&s.has("job.retry")?r`<button class="act" @click=${()=>g(this,t,"job.retry",o.id)}>Retry</button>`:""}
            ${!a&&s.has("job.clear")?r`<button class="act" @click=${()=>g(this,t,"job.clear",o.id)}>Clear</button>`:""}
            <span class="chip ${_(o.status)}">${o.status}</span></span></div>
          ${o.reason?r`<div class="detail">${o.reason}</div>`:""}
        </li>`})}</ul>
      ${e.length>n?r`<div class="muted" style="margin-top:6px">${e.length-n} more on the Projects page</div>`:""}
    `)}},gt=class extends b{static getStubConfig(){return{type:"custom:hisho-projects-card"}}body(){let t=this.hass,e=f(t,x(t),"projects_active")?.attributes.projects??[],s=A(t),n=a=>!!a.asks?.length||!["","claude","hisho"].includes(String(a.waiting_on??"").toLowerCase()),o=e.filter(a=>a.status==="active").sort((a,c)=>Number(n(c))-Number(n(a)));return this.frame(r`
      <div class="head">${this.heading("Projects")}<span class="muted">${o.length} active</span></div>
      <ul class="list">${o.slice(0,this.config.limit??20).map(a=>r`<li>
        <div class="row spread"><span class="ellipsis">${a.title}${a.company?r` <span class="muted">${a.company}</span>`:""}</span>
          ${n(a)?r`<span class="chip warn">waiting on you</span>`:""}</div>
        ${a.asks?.length?r`<div class="detail">${a.asks.join(`
`)}</div>`:a.next?r`<div class="detail">Next: ${a.next}</div>`:""}
        <div class="row">
          ${s.has("project.open")?r`<button class="act" @click=${()=>g(this,t,"project.open",a.name)}>Open</button>`:""}
          ${s.has("project.archive")?r`<button class="act danger" @click=${()=>g(this,t,"project.archive",a.name,{},`Archive ${a.title}? Nothing is deleted; it can be restored.`)}>Archive</button>`:""}
        </div>
      </li>`)}</ul>
    `)}};var vt=class extends b{static getStubConfig(){return{type:"custom:hisho-store-card"}}body(){let t=this.hass,e=f(t,x(t),"addon_updates"),s=e?.attributes.store??[],n=e?.attributes.repositories??[],o=A(t);if(!o.has("store.install")&&!o.has("store.update"))return r`<ha-card><div class="head">${this.heading("Add-on store")}</div>
        <div class="empty">Hisho does not let this Home Assistant change its add-ons.</div></ha-card>`;let a=[...s].sort((c,h)=>+!!h.update_available-+!!c.update_available||+!!h.installed-+!!c.installed||String(c.title).localeCompare(String(h.title)));return r`<ha-card>
      <div class="head">${this.heading("Add-on store")}<span class="muted">${s.filter(c=>c.installed).length} installed</span></div>
      <ul class="list">${a.map(c=>r`<li>
        <div class="row spread"><span>${c.title}</span>
          <span class="chip ${c.update_available?"warn":c.installed?"ok":"off"}">${c.update_available?c.installed_version===c.version?`v${c.version} \xB7 update available`:`${c.installed_version} \u2192 ${c.version}`:c.installed?`v${c.installed_version}`:`v${c.version}`}</span></div>
        ${c.description?r`<div class="detail">${c.description}</div>`:""}
        <div class="row">
          ${!c.installed&&o.has("store.install")?r`<button class="act" @click=${()=>g(this,t,"store.install",c.name)}>Install</button>`:""}
          ${c.update_available&&o.has("store.update")?r`<button class="act" @click=${()=>g(this,t,"store.update",c.name,{host:c.host??""})}>Update</button>`:""}
          ${c.installed&&c.previous&&o.has("store.rollback")?r`<button class="act danger" @click=${()=>g(this,t,"store.rollback",c.name,{host:c.host??""},`Roll ${c.title} back to the version before? Its settings are kept.`)}>Roll back</button>`:""}
          ${c.installed&&o.has("store.remove")?r`<button class="act danger" @click=${()=>g(this,t,"store.remove",c.name,{host:c.host??""},`Remove ${c.title}? Its settings are kept; install it again any time.`)}>Remove</button>`:""}
        </div></li>`)}</ul>
      <div class="title" style="margin-top:14px;font-size:1em">Repositories</div>
      <ul class="list">${n.map(c=>r`<li><div class="row spread">
        <span>${c.name}${c.listed==="store"?r` <span class="muted">store</span>`:""}</span>
        <span class="row">
          ${o.has("repository.update")?r`<button class="act" @click=${()=>g(this,t,"repository.update",c.url)}>Update</button>`:""}
          ${c.listed!=="store"&&o.has("repository.remove")?r`<button class="act danger" @click=${()=>g(this,t,"repository.remove",c.url,{},`Remove the repository ${c.name}?`)}>Remove</button>`:""}
        </span></div></li>`)}</ul>
      ${o.has("repository.add")?r`<form class="row" style="margin-top:8px" @submit=${c=>{c.preventDefault();let h=c.target.elements.namedItem("url");h.value.trim()&&g(this,t,"repository.add",h.value.trim()).then(()=>h.value="")}}><input name="url" placeholder="https://github.com/you/hisho-addon-name" style="flex:1;font:inherit;padding:4px 6px;
        border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)" />
        <button class="act" type="submit">Add repository</button></form>`:""}
    </ha-card>`}};function G(i,t){return{...i,type:"sections",max_columns:4,dense_section_placement:!0,sections:t.filter(e=>(Array.isArray(e)?e:e.cards).length).map(e=>Array.isArray(e)?{type:"grid",cards:e}:e)}}var he=["Server","Vm","Storage","Device","Network"],je={Server:"Servers",Vm:"Virtual machines",Storage:"Storage",Device:"Devices",Network:"Network"};function Ne(i){let t=x(i);if(!t)return{title:"Hisho",views:[{title:"Hisho",path:"hisho",icon:"mdi:server-network",cards:[{type:"markdown",content:"The **Hisho** integration is not set up yet: Settings \u203A Devices & services \u203A Add integration \u203A Hisho."}]}]};let e=T(i,"machine"),s=T(i,"box"),n=T(i,"addon"),o=$(t,"today"),a=$(t,"due_dates"),c=["phone","phone_alerts","clear_phone","hide_acked"].map(d=>$(t,d)).filter(d=>!!d),h=new Map;for(let d of s){let u=he.includes(d.model)?d.model:"Device";h.set(u,[...h.get(u)??[],d.name])}return{title:"Hisho",views:[{title:"Overview",path:"overview",icon:"mdi:view-dashboard",type:"panel",cards:[{type:"custom:hisho-control-center-card"}]},G({title:"Machines",path:"machines",icon:"mdi:server"},e.map(d=>[{type:"custom:hisho-machine-card",machine:d.name}])),G({title:"Devices",path:"devices",icon:"mdi:devices"},he.filter(d=>h.has(d)).map(d=>[{type:"heading",heading:je[d]},...h.get(d).map(u=>({type:"custom:hisho-device-card",device:u}))])),G({title:"Add-ons",path:"addons",icon:"mdi:puzzle"},[...$(t,"addon_updates")?[{type:"grid",column_span:2,cards:[{type:"custom:hisho-store-card"}]}]:[],...n.map(d=>[{type:"custom:hisho-device-card",device:d.name}])]),...o||a?[G({title:"Today",path:"today",icon:"mdi:calendar-today"},[o?[{type:"todo-list",entity:o,title:"Today"}]:[],a?{type:"grid",column_span:3,cards:[{type:"calendar",entities:[a],initial_view:"dayGridMonth",title:"Due dates"}]}:[]])]:[],G({title:"Projects",path:"projects",icon:"mdi:folder-multiple"},[{type:"grid",column_span:2,cards:[{type:"custom:hisho-projects-card"}]},{type:"grid",column_span:2,cards:[{type:"custom:hisho-jobs-card",title:"All jobs",limit:50}]}]),G({title:"Phone",path:"phone",icon:"mdi:cellphone-message"},[[{type:"entities",title:"Hisho phone app",entities:c},{type:"markdown",content:"Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity."}]])]}}var bt=class extends HTMLElement{static async generate(t,e){return Ne(e)}};var Oe="0.4.0",pe=[["hisho-control-center-card",ht,"Hisho control center","Hisho's Overview in one wide card: stats, machine tiles, needs you and jobs. Best in a panel view."],["hisho-fleet-card",dt,"Hisho fleet","Every machine: state, readings, wake / park, maintenance."],["hisho-machine-card",pt,"Hisho machine","One machine in full: readings, services, its add-on buttons."],["hisho-needs-you-card",ut,"Hisho needs you","Hisho's needs-you list: acknowledge, snooze, investigate."],["hisho-device-card",mt,"Hisho device","A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],["hisho-jobs-card",ft,"Hisho jobs","Hisho's jobs: cancel, retry, clear."],["hisho-projects-card",gt,"Hisho projects","Active projects, what waits on you, open or archive."],["hisho-store-card",vt,"Hisho add-on store","Install, update, roll back or remove add-ons; repositories."]];for(let[i,t]of pe)customElements.get(i)||customElements.define(i,t);customElements.get("ll-strategy-dashboard-hisho")||customElements.define("ll-strategy-dashboard-hisho",bt);var O=window;O.customCards=O.customCards||[];for(let[i,,t,e]of pe)O.customCards.some(s=>s.type===i)||O.customCards.push({type:i,name:t,description:e,preview:!1,documentationURL:"https://github.com/YepizTechJonathan/hisho-ha-cards"});O.customStrategies=O.customStrategies||[];O.customStrategies.some(i=>i.type==="hisho")||O.customStrategies.push({type:"hisho",strategyType:"dashboard",name:"Hisho",description:"A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects."});console.info(`%c HISHO-HA-CARDS %c ${Oe} `,"background:#151515;color:#eee","background:#444;color:#fff");export{Oe as VERSION};
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
