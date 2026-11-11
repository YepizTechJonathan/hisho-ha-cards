var x1=globalThis,Z1=x1.ShadowRoot&&(x1.ShadyCSS===void 0||x1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X1=Symbol(),y2=new WeakMap,i1=class{constructor(C,H,V){if(this._$cssResult$=!0,V!==X1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=C,this.t=H}get styleSheet(){let C=this.o,H=this.t;if(Z1&&C===void 0){let V=H!==void 0&&H.length===1;V&&(C=y2.get(H)),C===void 0&&((this.o=C=new CSSStyleSheet).replaceSync(this.cssText),V&&y2.set(H,C))}return C}toString(){return this.cssText}},u1=L=>new i1(typeof L=="string"?L:L+"",void 0,X1),B=(L,...C)=>{let H=L.length===1?L[0]:C.reduce((V,M,r)=>V+(t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(M)+L[r+1],L[0]);return new i1(H,L,X1)},w2=(L,C)=>{if(Z1)L.adoptedStyleSheets=C.map(H=>H instanceof CSSStyleSheet?H:H.styleSheet);else for(let H of C){let V=document.createElement("style"),M=x1.litNonce;M!==void 0&&V.setAttribute("nonce",M),V.textContent=H.cssText,L.appendChild(V)}},J1=Z1?L=>L:L=>L instanceof CSSStyleSheet?(C=>{let H="";for(let V of C.cssRules)H+=V.cssText;return u1(H)})(L):L;var{is:U5,defineProperty:Q5,getOwnPropertyDescriptor:z5,getOwnPropertyNames:K5,getOwnPropertySymbols:j5,getPrototypeOf:q5}=Object,c1=globalThis,B2=c1.trustedTypes,Y5=B2?B2.emptyScript:"",X5=c1.reactiveElementPolyfillSupport,o1=(L,C)=>L,C2={toAttribute(L,C){switch(C){case Boolean:L=L?Y5:null;break;case Object:case Array:L=L==null?L:JSON.stringify(L)}return L},fromAttribute(L,C){let H=L;switch(C){case Boolean:H=L!==null;break;case Number:H=L===null?null:Number(L);break;case Object:case Array:try{H=JSON.parse(L)}catch{H=null}}return H}},T2=(L,C)=>!U5(L,C),P2={attribute:!0,type:String,converter:C2,reflect:!1,useDefault:!1,hasChanged:T2};Symbol.metadata??=Symbol("metadata"),c1.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(C){this._$Ei(),(this.l??=[]).push(C)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(C,H=P2){if(H.state&&(H.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(C)&&((H=Object.create(H)).wrapped=!0),this.elementProperties.set(C,H),!H.noAccessor){let V=Symbol(),M=this.getPropertyDescriptor(C,V,H);M!==void 0&&Q5(this.prototype,C,M)}}static getPropertyDescriptor(C,H,V){let{get:M,set:r}=z5(this.prototype,C)??{get(){return this[H]},set(t){this[H]=t}};return{get:M,set(t){let i=M?.call(this);r?.call(this,t),this.requestUpdate(C,i,V)},configurable:!0,enumerable:!0}}static getPropertyOptions(C){return this.elementProperties.get(C)??P2}static _$Ei(){if(this.hasOwnProperty(o1("elementProperties")))return;let C=q5(this);C.finalize(),C.l!==void 0&&(this.l=[...C.l]),this.elementProperties=new Map(C.elementProperties)}static finalize(){if(this.hasOwnProperty(o1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(o1("properties"))){let H=this.properties,V=[...K5(H),...j5(H)];for(let M of V)this.createProperty(M,H[M])}let C=this[Symbol.metadata];if(C!==null){let H=litPropertyMetadata.get(C);if(H!==void 0)for(let[V,M]of H)this.elementProperties.set(V,M)}this._$Eh=new Map;for(let[H,V]of this.elementProperties){let M=this._$Eu(H,V);M!==void 0&&this._$Eh.set(M,H)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(C){let H=[];if(Array.isArray(C)){let V=new Set(C.flat(1/0).reverse());for(let M of V)H.unshift(J1(M))}else C!==void 0&&H.push(J1(C));return H}static _$Eu(C,H){let V=H.attribute;return V===!1?void 0:typeof V=="string"?V:typeof C=="string"?C.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(C=>this.enableUpdating=C),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(C=>C(this))}addController(C){(this._$EO??=new Set).add(C),this.renderRoot!==void 0&&this.isConnected&&C.hostConnected?.()}removeController(C){this._$EO?.delete(C)}_$E_(){let C=new Map,H=this.constructor.elementProperties;for(let V of H.keys())this.hasOwnProperty(V)&&(C.set(V,this[V]),delete this[V]);C.size>0&&(this._$Ep=C)}createRenderRoot(){let C=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return w2(C,this.constructor.elementStyles),C}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(C=>C.hostConnected?.())}enableUpdating(C){}disconnectedCallback(){this._$EO?.forEach(C=>C.hostDisconnected?.())}attributeChangedCallback(C,H,V){this._$AK(C,V)}_$ET(C,H){let V=this.constructor.elementProperties.get(C),M=this.constructor._$Eu(C,V);if(M!==void 0&&V.reflect===!0){let r=(V.converter?.toAttribute!==void 0?V.converter:C2).toAttribute(H,V.type);this._$Em=C,r==null?this.removeAttribute(M):this.setAttribute(M,r),this._$Em=null}}_$AK(C,H){let V=this.constructor,M=V._$Eh.get(C);if(M!==void 0&&this._$Em!==M){let r=V.getPropertyOptions(M),t=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:C2;this._$Em=M;let i=t.fromAttribute(H,r.type);this[M]=i??this._$Ej?.get(M)??i,this._$Em=null}}requestUpdate(C,H,V,M=!1,r){if(C!==void 0){let t=this.constructor;if(M===!1&&(r=this[C]),V??=t.getPropertyOptions(C),!((V.hasChanged??T2)(r,H)||V.useDefault&&V.reflect&&r===this._$Ej?.get(C)&&!this.hasAttribute(t._$Eu(C,V))))return;this.C(C,H,V)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(C,H,{useDefault:V,reflect:M,wrapped:r},t){V&&!(this._$Ej??=new Map).has(C)&&(this._$Ej.set(C,t??H??this[C]),r!==!0||t!==void 0)||(this._$AL.has(C)||(this.hasUpdated||V||(H=void 0),this._$AL.set(C,H)),M===!0&&this._$Em!==C&&(this._$Eq??=new Set).add(C))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(H){Promise.reject(H)}let C=this.scheduleUpdate();return C!=null&&await C,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[M,r]of this._$Ep)this[M]=r;this._$Ep=void 0}let V=this.constructor.elementProperties;if(V.size>0)for(let[M,r]of V){let{wrapped:t}=r,i=this[M];t!==!0||this._$AL.has(M)||i===void 0||this.C(M,void 0,r,i)}}let C=!1,H=this._$AL;try{C=this.shouldUpdate(H),C?(this.willUpdate(H),this._$EO?.forEach(V=>V.hostUpdate?.()),this.update(H)):this._$EM()}catch(V){throw C=!1,this._$EM(),V}C&&this._$AE(H)}willUpdate(C){}_$AE(C){this._$EO?.forEach(H=>H.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(C)),this.updated(C)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(C){return!0}update(C){this._$Eq&&=this._$Eq.forEach(H=>this._$ET(H,this[H])),this._$EM()}updated(C){}firstUpdated(C){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[o1("elementProperties")]=new Map,I[o1("finalized")]=new Map,X5?.({ReactiveElement:I}),(c1.reactiveElementVersions??=[]).push("2.1.2");var t2=globalThis,F2=L=>L,S1=t2.trustedTypes,R2=S1?S1.createPolicy("lit-html",{createHTML:L=>L}):void 0,W2="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,I2="?"+U,J5=`<${I2}>`,X=document,A1=()=>X.createComment(""),d1=L=>L===null||typeof L!="object"&&typeof L!="function",i2=Array.isArray,C3=L=>i2(L)||typeof L?.[Symbol.iterator]=="function",H2=`[ 	
\f\r]`,a1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$2=/-->/g,D2=/>/g,q=RegExp(`>|${H2}(?:([^\\s"'>=/]+)(${H2}*=${H2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),E2=/'/g,_2=/"/g,G2=/^(?:script|style|textarea|title)$/i,o2=L=>(C,...H)=>({_$litType$:L,strings:C,values:H}),e=o2(1),m1=o2(2),E3=o2(3),J=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),N2=new WeakMap,Y=X.createTreeWalker(X,129);function U2(L,C){if(!i2(L)||!L.hasOwnProperty("raw"))throw Error("invalid template strings array");return R2!==void 0?R2.createHTML(C):C}var H3=(L,C)=>{let H=L.length-1,V=[],M,r=C===2?"<svg>":C===3?"<math>":"",t=a1;for(let i=0;i<H;i++){let a=L[i],d,A,o=-1,p=0;for(;p<a.length&&(t.lastIndex=p,A=t.exec(a),A!==null);)p=t.lastIndex,t===a1?A[1]==="!--"?t=$2:A[1]!==void 0?t=D2:A[2]!==void 0?(G2.test(A[2])&&(M=RegExp("</"+A[2],"g")),t=q):A[3]!==void 0&&(t=q):t===q?A[0]===">"?(t=M??a1,o=-1):A[1]===void 0?o=-2:(o=t.lastIndex-A[2].length,d=A[1],t=A[3]===void 0?q:A[3]==='"'?_2:E2):t===_2||t===E2?t=q:t===$2||t===D2?t=a1:(t=q,M=void 0);let v=t===q&&L[i+1].startsWith("/>")?" ":"";r+=t===a1?a+J5:o>=0?(V.push(d),a.slice(0,o)+W2+a.slice(o)+U+v):a+U+(o===-2?i:v)}return[U2(L,r+(L[H]||"<?>")+(C===2?"</svg>":C===3?"</math>":"")),V]},n1=class L{constructor({strings:C,_$litType$:H},V){let M;this.parts=[];let r=0,t=0,i=C.length-1,a=this.parts,[d,A]=H3(C,H);if(this.el=L.createElement(d,V),Y.currentNode=this.el.content,H===2||H===3){let o=this.el.content.firstChild;o.replaceWith(...o.childNodes)}for(;(M=Y.nextNode())!==null&&a.length<i;){if(M.nodeType===1){if(M.hasAttributes())for(let o of M.getAttributeNames())if(o.endsWith(W2)){let p=A[t++],v=M.getAttribute(o).split(U),u=/([.?@])?(.*)/.exec(p);a.push({type:1,index:r,name:u[2],strings:v,ctor:u[1]==="."?L2:u[1]==="?"?M2:u[1]==="@"?r2:M1}),M.removeAttribute(o)}else o.startsWith(U)&&(a.push({type:6,index:r}),M.removeAttribute(o));if(G2.test(M.tagName)){let o=M.textContent.split(U),p=o.length-1;if(p>0){M.textContent=S1?S1.emptyScript:"";for(let v=0;v<p;v++)M.append(o[v],A1()),Y.nextNode(),a.push({type:2,index:++r});M.append(o[p],A1())}}}else if(M.nodeType===8)if(M.data===I2)a.push({type:2,index:r});else{let o=-1;for(;(o=M.data.indexOf(U,o+1))!==-1;)a.push({type:7,index:r}),o+=U.length-1}r++}}static createElement(C,H){let V=X.createElement("template");return V.innerHTML=C,V}};function L1(L,C,H=L,V){if(C===J)return C;let M=V!==void 0?H._$Co?.[V]:H._$Cl,r=d1(C)?void 0:C._$litDirective$;return M?.constructor!==r&&(M?._$AO?.(!1),r===void 0?M=void 0:(M=new r(L),M._$AT(L,H,V)),V!==void 0?(H._$Co??=[])[V]=M:H._$Cl=M),M!==void 0&&(C=L1(L,M._$AS(L,C.values),M,V)),C}var V2=class{constructor(C,H){this._$AV=[],this._$AN=void 0,this._$AD=C,this._$AM=H}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(C){let{el:{content:H},parts:V}=this._$AD,M=(C?.creationScope??X).importNode(H,!0);Y.currentNode=M;let r=Y.nextNode(),t=0,i=0,a=V[0];for(;a!==void 0;){if(t===a.index){let d;a.type===2?d=new p1(r,r.nextSibling,this,C):a.type===1?d=new a.ctor(r,a.name,a.strings,this,C):a.type===6&&(d=new e2(r,this,C)),this._$AV.push(d),a=V[++i]}t!==a?.index&&(r=Y.nextNode(),t++)}return Y.currentNode=X,M}p(C){let H=0;for(let V of this._$AV)V!==void 0&&(V.strings!==void 0?(V._$AI(C,V,H),H+=V.strings.length-2):V._$AI(C[H])),H++}},p1=class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(C,H,V,M){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=C,this._$AB=H,this._$AM=V,this.options=M,this._$Cv=M?.isConnected??!0}get parentNode(){let C=this._$AA.parentNode,H=this._$AM;return H!==void 0&&C?.nodeType===11&&(C=H.parentNode),C}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(C,H=this){C=L1(this,C,H),d1(C)?C===T||C==null||C===""?(this._$AH!==T&&this._$AR(),this._$AH=T):C!==this._$AH&&C!==J&&this._(C):C._$litType$!==void 0?this.$(C):C.nodeType!==void 0?this.T(C):C3(C)?this.k(C):this._(C)}O(C){return this._$AA.parentNode.insertBefore(C,this._$AB)}T(C){this._$AH!==C&&(this._$AR(),this._$AH=this.O(C))}_(C){this._$AH!==T&&d1(this._$AH)?this._$AA.nextSibling.data=C:this.T(X.createTextNode(C)),this._$AH=C}$(C){let{values:H,_$litType$:V}=C,M=typeof V=="number"?this._$AC(C):(V.el===void 0&&(V.el=n1.createElement(U2(V.h,V.h[0]),this.options)),V);if(this._$AH?._$AD===M)this._$AH.p(H);else{let r=new V2(M,this),t=r.u(this.options);r.p(H),this.T(t),this._$AH=r}}_$AC(C){let H=N2.get(C.strings);return H===void 0&&N2.set(C.strings,H=new n1(C)),H}k(C){i2(this._$AH)||(this._$AH=[],this._$AR());let H=this._$AH,V,M=0;for(let r of C)M===H.length?H.push(V=new L(this.O(A1()),this.O(A1()),this,this.options)):V=H[M],V._$AI(r),M++;M<H.length&&(this._$AR(V&&V._$AB.nextSibling,M),H.length=M)}_$AR(C=this._$AA.nextSibling,H){for(this._$AP?.(!1,!0,H);C!==this._$AB;){let V=F2(C).nextSibling;F2(C).remove(),C=V}}setConnected(C){this._$AM===void 0&&(this._$Cv=C,this._$AP?.(C))}},M1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(C,H,V,M,r){this.type=1,this._$AH=T,this._$AN=void 0,this.element=C,this.name=H,this._$AM=M,this.options=r,V.length>2||V[0]!==""||V[1]!==""?(this._$AH=Array(V.length-1).fill(new String),this.strings=V):this._$AH=T}_$AI(C,H=this,V,M){let r=this.strings,t=!1;if(r===void 0)C=L1(this,C,H,0),t=!d1(C)||C!==this._$AH&&C!==J,t&&(this._$AH=C);else{let i=C,a,d;for(C=r[0],a=0;a<r.length-1;a++)d=L1(this,i[V+a],H,a),d===J&&(d=this._$AH[a]),t||=!d1(d)||d!==this._$AH[a],d===T?C=T:C!==T&&(C+=(d??"")+r[a+1]),this._$AH[a]=d}t&&!M&&this.j(C)}j(C){C===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,C??"")}},L2=class extends M1{constructor(){super(...arguments),this.type=3}j(C){this.element[this.name]=C===T?void 0:C}},M2=class extends M1{constructor(){super(...arguments),this.type=4}j(C){this.element.toggleAttribute(this.name,!!C&&C!==T)}},r2=class extends M1{constructor(C,H,V,M,r){super(C,H,V,M,r),this.type=5}_$AI(C,H=this){if((C=L1(this,C,H,0)??T)===J)return;let V=this._$AH,M=C===T&&V!==T||C.capture!==V.capture||C.once!==V.once||C.passive!==V.passive,r=C!==T&&(V===T||M);M&&this.element.removeEventListener(this.name,this,V),r&&this.element.addEventListener(this.name,this,C),this._$AH=C}handleEvent(C){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,C):this._$AH.handleEvent(C)}},e2=class{constructor(C,H,V){this.element=C,this.type=6,this._$AN=void 0,this._$AM=H,this.options=V}get _$AU(){return this._$AM._$AU}_$AI(C){L1(this,C)}};var V3=t2.litHtmlPolyfillSupport;V3?.(n1,p1),(t2.litHtmlVersions??=[]).push("3.3.3");var Q2=(L,C,H)=>{let V=H?.renderBefore??C,M=V._$litPart$;if(M===void 0){let r=H?.renderBefore??null;V._$litPart$=M=new p1(C.insertBefore(A1(),r),r,void 0,H??{})}return M._$AI(L),M};var a2=globalThis,D=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let C=super.createRenderRoot();return this.renderOptions.renderBefore??=C.firstChild,C}update(C){let H=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(C),this._$Do=Q2(H,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}};D._$litElement$=!0,D.finalized=!0,a2.litElementHydrateSupport?.({LitElement:D});var L3=a2.litElementPolyfillSupport;L3?.({LitElement:D});(a2.litElementVersions??=[]).push("4.2.2");var M3="/hisho_static/forest.jpg";function z2(L=M3){return`${L?`linear-gradient(rgba(6, 10, 7, 0.22), rgba(6, 10, 7, 0.5)), url("${L}") center / cover no-repeat, `:""}linear-gradient(180deg, #0a110d 0%, #1b2219 45%, #4a3a27 62%, #121a13 80%, #0a100b 100%) fixed`}var K2="ha-card { background: rgba(14, 20, 16, 0.6); backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%); border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 22px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35); --primary-text-color: #eef0ea; --secondary-text-color: #a7ae9f; --divider-color: rgba(255, 255, 255, 0.08); --primary-color: #5f9e74; --card-background-color: transparent; --ha-card-background: transparent; }",R=B`
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
`;function O(L){switch(L){case"up":case"on":case"ok":case"running":case"active":case"done":return"ok";case"warn":case"maintenance":case"away":case"needs_setup":case"blocked":case"queued":case"routed":return"warn";case"faulted":case"unreachable":case"problem":case"down":case"error":case"failed":case"critical":return"bad";case"decision":return"decide";default:return"off"}}function h1(L){let C=L===void 0?NaN:parseFloat(L);return Number.isFinite(C)?Math.max(0,Math.min(100,C)):void 0}var r3=[["machines_online","hub"],["machine_state","machine"],["box_state","box"],["addon_status","addon"]],j2=new WeakMap;function A2(L){let C=j2.get(L.entities??{});if(C&&C.devices===L.devices)return C.list;let H=e3(L);return L.entities&&j2.set(L.entities,{devices:L.devices,list:H}),H}function q2(L){return A2(L).flatMap(C=>Object.values(C.entities).flat())}function e3(L){let C=new Map;for(let V of Object.values(L.entities||{})){if(V.platform!=="hisho"||!V.device_id||!V.translation_key)continue;let M=C.get(V.device_id)??{};(M[V.translation_key]??=[]).push(V.entity_id),C.set(V.device_id,M)}let H=[];for(let[V,M]of C){let r=r3.find(([i])=>i in M)?.[1];if(!r)continue;let t=L.devices?.[V];H.push({id:V,name:t?.name_by_user||t?.name||V,kind:r,model:t?.model||"",entities:M})}return H.sort((V,M)=>V.name.localeCompare(M.name))}function P(L,C){return A2(L).filter(H=>H.kind===C)}function Z(L){return P(L,"hub")[0]}function l1(L,C,H){if(!C)return;let V=C.toLowerCase();return A2(L).find(M=>(!H||M.kind===H)&&(M.id===C||M.name.toLowerCase()===V))}function x(L,C){return L?.entities[C]?.[0]}function n(L,C,H){let V=x(C,H);return V?L.states[V]:void 0}function Q(L,C,H){return(C?.entities[H]??[]).map(V=>L.states[V]).filter(V=>!!V)}function y(L){return!!L&&L.state!=="unavailable"&&L.state!=="unknown"}function E(L){let C=n(L,Z(L),"actions_allowed");return new Set(C?.attributes.allowed??[])}function C1(L,C){let H=L?.attributes.friendly_name??"",V=C?C.name+" ":"";return H.startsWith(V)?H.slice(V.length):H}var c=class extends D{static{this.properties={hass:{attribute:!1},config:{attribute:!1}}}static{this.styles=R}setConfig(C){if(!C)throw new Error("Invalid configuration");this.config=C}shouldUpdate(C){if(!C.has("hass")||C.size>1)return!0;let H=C.get("hass");return!H||H.entities!==this.hass.entities||H.devices!==this.hass.devices||H.user!==this.hass.user?!0:q2(this.hass).some(V=>H.states[V]!==this.hass.states[V])}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}frame(C){return this.config.embedded?e`<div class="embedded">${C}</div>`:e`<ha-card>${C}</ha-card>`}render(){return!this.hass||!this.config?e``:this.hass.user&&!this.hass.user.is_admin?e`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`:Z(this.hass)?this.body():e`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`}heading(C){let H=this.config.title??C;return H?e`<div class="title">${H}</div>`:e``}};var d2=class extends D{static{this.properties={text:{},open:{type:Boolean,reflect:!0}}}static{this.styles=B`
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
  `}ask(C){return this.text=C,this.open=!0,new Promise(H=>this.resolve=H)}done(C){this.open=!1,this.resolve?.(C),this.resolve=void 0}render(){return e`<div class="box" role="alertdialog" aria-modal="true">
      <p>${this.text}</p>
      <div class="row">
        <button @click=${()=>this.done(!1)}>Cancel</button>
        <button class="yes" @click=${()=>this.done(!0)}>Yes</button>
      </div>
    </div>`}};customElements.get("hisho-confirm")||customElements.define("hisho-confirm",d2);function r1(L,C){let H=L.shadowRoot??L,V=H.querySelector("hisho-confirm");return V||(V=document.createElement("hisho-confirm"),H.appendChild(V)),V.ask(C)}async function h(L,C,H,V="",M={},r){return r&&!await r1(L,r)?!1:(await C.callService("hisho","run_action",{action:H,target:V,args:M,confirm:!!r}),!0)}async function N(L,C,H,V,M){return M&&!await r1(L,M)?!1:(await C.callService("switch",V?"turn_on":"turn_off",{},{entity_id:H}),!0)}async function g1(L,C,H,V){return V&&!await r1(L,V)?!1:(await C.callService("button","press",{},{entity_id:H}),!0)}function _(L,C){L.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}function s(L,C="i"){return e`<svg class=${C} viewBox="0 0 24 24" aria-hidden="true">${m1`<path d=${L}></path>`}</svg>`}function f1(L,C){let V=2*Math.PI*22,M=V*.75,r=C>=95?"var(--hisho-crit)":C>=85?"var(--hisho-warn)":"var(--hisho-accent-text)";return e`<div class="ring" title="${L} ${Math.round(C)}%">
    <svg viewBox="0 0 56 56">${m1`
      <circle class="track" cx="28" cy="28" r=${22} fill="none" stroke-width="4.5" stroke-linecap="round"
        stroke-dasharray="${M} ${V}" transform="rotate(135 28 28)"></circle>
      <circle class="val" cx="28" cy="28" r=${22} fill="none" stroke-width="4.5" stroke-linecap="round" style="color:${r}"
        stroke=${r} stroke-dasharray="${M} ${V}" stroke-dashoffset=${M*(1-C/100)}
        transform="rotate(135 28 28)"></circle>`}
    </svg>
    <span class="rv">${Math.round(C)}<small>%</small></span><span class="rl">${L}</span>
  </div>`}function v1(L,C=new Date){let H=L.config?.time_zone,V=M=>new Intl.DateTimeFormat("en-US",{...M,timeZone:H}).format(C);return{hour:Number(V({hour:"numeric",hourCycle:"h23"}))%24,time:V({hour:"numeric",minute:"2-digit"}),date:V({weekday:"long",month:"long",day:"numeric"})}}function Y2(L,C=new Date){let{hour:H}=v1(L,C),V=H<5?"Good night":H<12?"Good morning":H<18?"Good afternoon":H<22?"Good evening":"Good night",M=L.user?.name?.split(" ")[0];return M?`${V}, ${M}.`:`${V}.`}function X2(L){let C=window.location.pathname.split("/")[1]??"";window.history.pushState(null,"",`/${C}/${L}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}var C5=5*6e4,J2=new Map;function t3(L,C,H=24,V=48,M=Date.now()){let r=`${C}|${H}|${V}`,t=J2.get(r);if(t&&M-t.at<C5)return t.points;let i=M-H*36e5,a=L.callWS({type:"history/history_during_period",start_time:new Date(i).toISOString(),end_time:new Date(M).toISOString(),entity_ids:[C],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}).then(d=>i3((d?.[C]??[]).map(A=>[A.lu*1e3,parseFloat(A.s)]).filter(([,A])=>Number.isFinite(A)),i,M,V)).catch(()=>[]);return J2.set(r,{at:M,points:a}),a}function i3(L,C,H,V){if(!L.length)return[];let M=[],r=0,t=L[0][1];for(let i=1;i<=V;i++){let a=C+(H-C)*i/V;for(;r<L.length&&L[r][0]<=a;)t=L[r++][1];M.push(t)}return M}function o3(L,C,H){let V=C??Math.min(...L),r=(H??Math.max(...L))-V||1,t=L.map((a,d)=>[d/Math.max(1,L.length-1)*100,30-(a-V)/r*24-2]),i=`M${t[0][0]},${t[0][1]}`;for(let a=0;a<t.length-1;a++){let d=t[a-1]??t[a],A=t[a],o=t[a+1],p=t[a+2]??o;i+=` C${A[0]+(o[0]-d[0])/6},${A[1]+(o[1]-d[1])/6} ${o[0]-(p[0]-A[0])/6},${o[1]-(p[1]-A[1])/6} ${o[0]},${o[1]}`}return{line:i,area:`${i} L100,30 L0,30 Z`}}var a3=0,n2=class extends D{constructor(){super();this.gradId=`hs${++a3}`;this.fetched=0;this.hours=24,this.points=[],this.tone="var(--hisho-accent-text, #8cc7a1)"}static{this.properties={hass:{attribute:!1},entity:{},hours:{type:Number},tone:{},min:{type:Number},max:{type:Number},points:{state:!0}}}static{this.styles=B`
    :host { display: block; height: 46px; pointer-events: none; }
    svg { width: 100%; height: 100%; display: block; }
  `}willUpdate(H){this.hass&&this.entity&&(H.has("entity")||Date.now()-this.fetched>C5)&&(this.fetched=Date.now(),t3(this.hass,this.entity,this.hours).then(V=>this.points=V))}render(){if(this.points.length<2)return e``;let{line:H,area:V}=o3(this.points,this.min,this.max);return e`<svg viewBox="0 0 100 30" preserveAspectRatio="none">${m1`
      <defs><linearGradient id=${this.gradId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.tone} stop-opacity="0.32"></stop>
        <stop offset="1" stop-color=${this.tone} stop-opacity="0"></stop></linearGradient></defs>
      <path d=${V} fill="url(#${this.gradId})"></path>
      <path d=${H} fill="none" stroke=${this.tone} stroke-width="1.6" vector-effect="non-scaling-stroke"
        stroke-linejoin="round" stroke-linecap="round"></path>`}</svg>`}};customElements.get("hisho-spark")||customElements.define("hisho-spark",n2);var H5="M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M9,11H12.63L9,15.2V17H15V15H11.37L15,10.8V9H9V11Z";var O1="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";var V5="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7";var L5="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";var M5="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";var r5="M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z";var e5="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var t5="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z";var i5="M11,17V7H4V17H11M11,3A2,2 0 0,1 13,5V19A2,2 0 0,1 11,21H4C2.89,21 2,20.1 2,19V5A2,2 0 0,1 4,3H11M16.5,3H21.5A1.5,1.5 0 0,1 23,4.5V7.5A1.5,1.5 0 0,1 21.5,9H18L15,12V9L15,4.5A1.5,1.5 0 0,1 16.5,3Z";var b1="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var H1="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z";var o5="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z";var k1="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";var a5="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H9.18C9.6,1.84 10.7,1 12,1C13.3,1 14.4,1.84 14.82,3H19M12,3A1,1 0 0,0 11,4A1,1 0 0,0 12,5A1,1 0 0,0 13,4A1,1 0 0,0 12,3M7,7V5H5V19H19V5H17V7H7M11,9H13V13.5H11V9M11,15H13V17H11V15Z";var A5="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z";var d5="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var n5="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z";var p5="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z";var e1="M11.7 20H11.3L10.9 17.4C9.7 17.2 8.7 16.5 7.9 15.6L5.5 16.6L4.7 15.3L6.8 13.7C6.4 12.5 6.4 11.3 6.8 10.1L4.7 8.7L5.5 7.4L7.9 8.4C8.7 7.5 9.7 6.9 10.9 6.6L11.2 4H12.7L13.1 6.6C14.3 6.8 15.4 7.5 16.1 8.4L18.5 7.4L19.3 8.7L17.2 10.2C17.4 10.8 17.5 11.4 17.5 12H18C18.5 12 19 12.1 19.5 12.2V12L19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11L4.5 12L4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C12.1 21.4 11.9 20.7 11.7 20M16 12.3V12C16 9.8 14.2 8 12 8S8 9.8 8 12C8 14.2 9.8 16 12 16C12.7 14.3 14.2 12.9 16 12.3M10 12C10 10.9 10.9 10 12 10S14 10.9 14 12 13.1 14 12 14 10 13.1 10 12M18 14.5V13L15.8 15.2L18 17.4V16C19.4 16 20.5 17.1 20.5 18.5C20.5 18.9 20.4 19.3 20.2 19.6L21.3 20.7C22.5 18.9 22 16.4 20.2 15.2C19.6 14.7 18.8 14.5 18 14.5M18 21C16.6 21 15.5 19.9 15.5 18.5C15.5 18.1 15.6 17.7 15.8 17.4L14.7 16.3C13.5 18.1 14 20.6 15.8 21.8C16.5 22.2 17.2 22.5 18 22.5V24L20.2 21.8L18 19.5V21Z";var m5="M22,18H17A1,1 0 0,1 16,17V7A1,1 0 0,1 17,6H22A1,1 0 0,1 23,7V17A1,1 0 0,1 22,18M22,8H17V9H22V8M22,10H17V11H22V10M9,15V17H10V18H5V17H6V15H2A1,1 0 0,1 1,14V7A1,1 0 0,1 2,6H13A1,1 0 0,1 14,7V14A1,1 0 0,1 13,15H9M12,8H3V13H12V8Z";var l5="M2 7H4.5V17H3V8.5H2M22 7V16H14V17H7V16H6V7M10 9H8V12H10M13 9H11V12H13M20 9H15V14H20V9Z";var v5="M20 17H22V15H20V17M20 7V13H22V7M4 2C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H16C17.11 22 18 21.11 18 20V8L12 2M4 4H11V9H16V20H4Z";var y1="M15 14C16.33 14 19 14.67 19 16V17H11V16C11 14.67 13.67 14 15 14M15 13C16.11 13 17 12.11 17 11S16.11 9 15 9C13.9 9 13 9.89 13 11C13 12.11 13.9 13 15 13M22 8V18C22 19.11 21.11 20 20 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H10L12 6H20C21.11 6 22 6.9 22 8M20 8H4V18H20V8Z";var s5="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z";var p2="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var x5="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";var Z5="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var w1="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var B1="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var u5="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var m2="M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z";var P1="M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z";var c5="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z";var S5="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9";var h5="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M12,6A3,3 0 0,1 15,9C15,10.31 14.17,11.42 13,11.83V14H15V16H13V18H11V11.83C9.83,11.42 9,10.31 9,9A3,3 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z";var g5="M21 11C21 16.5 17.2 21.7 12 23C6.8 21.7 3 16.5 3 11V5L12 1L21 5V11M12 21C15.8 20 19 15.5 19 11.2V6.3L12 3.2L5 6.3V11.2C5 15.5 8.2 20 12 21M14.8 11H10.5V8.5C10.5 7.7 11.2 7.2 12 7.2S13.5 7.7 13.5 8.5V9H14.8V8.5C14.8 7.1 13.4 6 12 6S9.2 7.1 9.2 8.5V11C8.6 11 8 11.6 8 12.2V15.7C8 16.4 8.6 17 9.2 17H14.7C15.4 17 16 16.4 16 15.8V12.3C16 11.6 15.4 11 14.8 11Z",f5="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M14.8,11V9.5C14.8,8.1 13.4,7 12,7C10.6,7 9.2,8.1 9.2,9.5V11C8.6,11 8,11.6 8,12.2V15.7C8,16.4 8.6,17 9.2,17H14.7C15.4,17 16,16.4 16,15.8V12.3C16,11.6 15.4,11 14.8,11M13.5,11H10.5V9.5C10.5,8.7 11.2,8.2 12,8.2C12.8,8.2 13.5,8.7 13.5,9.5V11Z";var O5="M12,3A3,3 0 0,0 9,6C9,9 14,13 6,13A2,2 0 0,0 4,15V17H20V15A2,2 0 0,0 18,13C10,13 15,9 15,6C15,4 13.66,3 12,3M6,19V21H18V19H6Z";var s1="M6,2V8H6V8L10,12L6,16V16H6V22H18V16H18V16L14,12L18,8V8H18V2H6M16,16.5V20H8V16.5L12,12.5L16,16.5M12,11.5L8,7.5V4H16V7.5L12,11.5Z";var t1="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var A3=[[/gpu/i,l5],[/workstation|desktop/i,m5],[/control|core/i,P1],[/tools|nas|storage/i,m2]];function l2(L){return A3.find(([C])=>C.test(L.model))?.[1]??m2}function v2(L){let C=x(L,"gpu_usage"),H=x(L,"memory_usage");return/gpu/i.test(L.model)&&C?[C,"GPU"]:H?[H,"Memory"]:C?[C,"GPU"]:void 0}function d3(L,C){let H=L.hass,V=n(H,C,"machine_state"),M=n(H,C,"online"),r=n(H,C,"awake"),t=V?.attributes.power??[],i=E(H),a=V?.attributes.machine??C.name,d=x(C,"maintenance"),A=d?H.states[d]?.state==="on":!1,o=L.expanded.has(C.id),p=M?.state==="on",v=y(r)?r.state:V?.attributes.reason&&!p?String(V.attributes.reason):V?.attributes.role??"",u=A?"brown":O(V?.state),l=(w,S)=>{let F=n(H,C,w);return y(F)?e`<span>${S}</span><span>${F.state}${F.attributes.unit_of_measurement?" "+F.attributes.unit_of_measurement:""}</span>`:""},g=Q(H,C,"service"),m=g.filter(w=>w.state!=="on").length,f=[["Mem","memory_usage"],["Disk","disk_usage"],["GPU","gpu_usage"]].map(([w,S])=>[w,h1(n(H,C,S)?.state)]).filter(w=>w[1]!==void 0),b=v2(C);return e`<div class="tile mtile ${u} ${p?"":"asleep"}">
    <div class="mhead" @click=${()=>L.flip(C.id)}>
      <span class="bubble ${p?u==="ok"?"accent":u:"off"}">${s(l2(C),"")}</span>
      <span class="grow"><span class="name">${C.name}</span>${v?e`<span class="muted ellipsis sub">${v}</span>`:""}</span>
      <span class="chip ${u}">${A?"maintenance":V?.state??"unknown"}</span>
      <span class="chev ${o?"open":""}">${s(k1,"")}</span>
    </div>
    ${f.length?e`<div class="rings">${f.map(([w,S])=>f1(w,S))}</div>`:""}
    ${o?e`<div class="kv">
        ${l("jobs_running","Jobs running")} ${l("jobs_queued","Jobs queued")}
        ${l("containers_running","Containers")} ${l("sync_connected","Sync")}
        ${g.length?e`<span>Services</span><span>${g.length-m} of ${g.length} running</span>`:""}
      </div>`:""}
    <div class="row acts">
      ${t.includes("wake")&&i.has("machine.wake")?e`<button class="act" @click=${()=>h(L,H,"machine.wake",a)}>${s(w1,"")}Wake</button>`:""}
      ${t.includes("park")&&i.has("machine.park")?e`<button class="act danger" @click=${()=>h(L,H,"machine.park",a,{},`Park ${C.name}? It powers off until something needs it.`)}>${s(B1,"")}Park</button>`:""}
      ${d?e`<button class="act ${A?"brown":""}" title="Maintenance holds its alerts and auto-park"
          @click=${()=>N(L,H,d,!A,A?void 0:`Put ${C.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${s(t1,"")}${A?"End maintenance":"Maintenance"}</button>`:""}
      ${o&&V?e`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${()=>_(L,V.entity_id)}>History…</button>`:""}
    </div>
    ${b?e`<div class="sparkwrap"><span class="sparkl">${b[1]} · 24 h</span>
      <hisho-spark .hass=${H} .entity=${b[0]} .min=${0} .max=${100}
        .tone=${u==="bad"?"var(--hisho-crit)":"var(--hisho-accent-text)"}></hisho-spark></div>`:""}
  </div>`}function n3(L,C){let H=L.hass.states[C]?.state==="on";return e`<label class="switch" title="Fleet maintenance">
    <input type="checkbox" .checked=${H}
      @change=${V=>{let M=V.target;N(L,L.hass,C,M.checked,M.checked?"Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.":void 0).then(r=>{r||(M.checked=H)})}} />Fleet maintenance</label>`}var T1=class extends c{static{this.properties={...c.properties,expanded:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-fleet-card"}}constructor(){super(),this.expanded=new Set}flip(C){let H=new Set(this.expanded);H.delete(C)||H.add(C),this.expanded=H}body(){let C=P(this.hass,"machine"),H=Z(this.hass),V=n(this.hass,H,"machines_online"),M=x(H,"fleet_maintenance"),r=n(this.hass,H,"core_reachable");return this.frame(e`
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${r?.state==="off"?e`<span class="chip bad">Hisho Core unreachable</span>`:""}
          ${V?e`<span class="chip num">${V.state} of ${C.length} online</span>`:""}
          ${M?n3(this,M):""}
        </div>
      </div>
      <div class="grid">${C.map(t=>d3(this,t))}</div>
    `)}};var F1="M12.11 3.1C13.79 4.04 15.71 5.53 16.58 6.6L18.46 4.66C17.5 3.56 15.48 2.2 13.86 1.33ZM19.33 2.43C18.55 6.24 17.32 9.74 15.46 12.74V6.17H12.78V16.32C11.43 17.81 9.85 19.12 8.04 20.22C8.68 20.63 9.59 21.61 9.98 22.16C11.01 21.5 11.95 20.79 12.82 20.03C13.03 21.89 13.81 22.48 15.78 22.48C16.26 22.48 17.87 22.48 18.37 22.48C20.46 22.48 21.12 21.32 21.4 17.81C20.66 17.6 19.59 17.14 18.99 16.69C18.9 19.39 18.76 19.99 18.12 19.99C17.77 19.99 16.51 19.99 16.24 19.99C15.57 19.99 15.46 19.85 15.46 18.84V17.37C17.02 15.52 18.28 13.43 19.31 11.14C19.93 12.97 20.41 15.04 20.5 16.48L23 15.79C22.82 13.91 22.06 11.14 21.05 9.01L20.07 9.28C20.8 7.34 21.4 5.25 21.9 3.03ZM8.1 1.47C6.41 2.23 3.66 2.89 1.21 3.26C1.5 3.83 1.85 4.75 1.96 5.34C2.83 5.23 3.73 5.09 4.64 4.93V7.61H1.39V10.13H4.14C3.38 12.36 2.19 14.81 1 16.32C1.41 17.01 2.05 18.18 2.28 18.96C3.13 17.79 3.96 16.09 4.64 14.3V22.67H7.26V13.39C7.69 14.1 8.08 14.83 8.29 15.33L9.64 13.66C9.39 14.62 9.09 15.49 8.68 16.21L10.81 17.19C11.89 15.36 12.25 12.38 12.46 9.7L10.26 9.26C10.17 10.59 10.01 11.92 9.75 13.16C9.23 12.52 7.78 10.98 7.26 10.52V10.13H9.66V7.61H7.26V4.38C8.22 4.13 9.14 3.85 9.96 3.53Z",b5={kanji:F1};function k5(L,C=[]){for(let H of Array.from(L.querySelectorAll("*")))H.localName==="ha-icon"&&C.push(H),H.shadowRoot&&k5(H.shadowRoot,C);return C}async function p3(L=document){let C=k5(L).filter(H=>typeof H.icon=="string"&&H.icon.startsWith("hisho:"));for(let H of C){let V=H.icon;H._legacy=!1,H.icon=void 0,await H.updateComplete,H.icon=V}return C.length}function y5(L=window){if(L.customIcons=L.customIcons||{},L.customIcons.hisho={getIcon:async C=>({path:b5[C]??F1,viewBox:"0 0 24 24"}),getIconList:async()=>Object.keys(b5).map(C=>({name:C}))},typeof document<"u")for(let C of[0,1500,5e3])setTimeout(()=>{p3().catch(()=>{})},C)}var m3={transcribe:"Transcribing",install:"Installing",build:"Building",deploy:"Deploying",investigate:"Looking into",backup:"Backing up",sync:"Syncing",test:"Testing",update:"Updating",upgrade:"Upgrading"},l3={transcribe:"Transcribed",install:"Installed",build:"Built",deploy:"Deployed",investigate:"Looked into",backup:"Backed up",sync:"Synced",test:"Tested",update:"Updated",upgrade:"Upgraded"};function v3(L,C){return(L?P(L,"machine").find(V=>n(L,V,"machine_state")?.attributes.machine===C||V.name.toLowerCase()===C.toLowerCase()):void 0)?.name??C.replace(/(^|-)(\w)/g,(V,M,r)=>(M?" ":"")+r.toUpperCase())}function w5(L,C=!1,H){let V=String(L.kind??"job"),M=(C?l3[V]??`Finished ${V}`:m3[V])??V.replace(/^\w/,r=>r.toUpperCase());return L.worker?`${M} on ${v3(H,String(L.worker))}`:M}function s2(L,C=Date.now()){let H=L?Date.parse(L):NaN;if(!Number.isFinite(H))return"";let V=Math.round((C-H)/6e4);if(V<2)return"just now";if(V<60)return`${V} min ago`;let M=Math.round(V/60);return M<24?`${M} h ago`:`${Math.round(M/24)} d ago`}function s3(L,C=new Date){let[H,V,M]=L.slice(0,10).split("-").map(Number),r=new Date(H,V-1,M),t=new Date(C.getFullYear(),C.getMonth(),C.getDate()),i=Math.round((r.getTime()-t.getTime())/864e5);return i<0?i===-1?"Yesterday":`${-i} days late`:i===0?"Today":i===1?"Tomorrow":r.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function B5(L){let C=Z(L),H=n(L,C,"jobs_active")?.attributes.jobs??[],V=n(L,C,"projects_active")?.attributes.projects??[],M=H.filter(t=>["queued","routed","running"].includes(t.status)).map(t=>({what:w5(t,!1,L),sub:t.status==="running"?`started ${s2(t.updated_at)}`.trim():"waiting its turn",path:t.status==="running"?e1:s1,tone:t.status==="running"?"accent":"off"})),r=V.filter(t=>t.status==="active"&&["claude","hisho"].includes(String(t.waiting_on??"").toLowerCase())).map(t=>({what:t.title,sub:t.next?`Next: ${t.next}`:"In progress",path:y1,tone:"brown"}));return[...M,...r]}function P5(L,C=Date.now()){let H=n(L,Z(L),"done_for_you");return H&&Array.isArray(H.attributes.items)?H.attributes.items.map(M=>({what:String(M.text),when:s2(M.at,C)})):(n(L,Z(L),"jobs_active")?.attributes.jobs??[]).filter(M=>M.status==="done"&&C-Date.parse(M.updated_at??"")<864e5).sort((M,r)=>Date.parse(r.updated_at)-Date.parse(M.updated_at)).map(M=>({what:w5(M,!0,L),when:s2(M.updated_at,C)}))}function T5(L){return(n(L,Z(L),"projects_active")?.attributes.projects??[]).filter(H=>H.status==="active"&&(H.asks?.length||!["","claude","hisho"].includes(String(H.waiting_on??"").toLowerCase())))}var x2=class extends D{static{this.properties={hass:{attribute:!1},items:{state:!0},due:{state:!0},adding:{state:!0}}}static{this.styles=R}constructor(){super(),this.items=[],this.due=[],this.adding=!1}ids(){let C=Z(this.hass);return{todo:x(C,"today"),cal:x(C,"due_dates")}}updated(C){if(!C.has("hass")||!this.hass)return;let{todo:H,cal:V}=this.ids(),M=[H,V].map(r=>r?`${this.hass.states[r]?.last_changed}|${this.hass.states[r]?.state}`:"").join(";");if(M!==this.seen&&(this.seen=M,H&&this.hass.callWS({type:"todo/item/list",entity_id:H}).then(r=>this.items=r.items??[]).catch(()=>this.items=[]),V&&this.hass.callApi)){let r=new Date,t=new Date(Date.now()+14*864e5);this.hass.callApi("GET",`calendars/${V}?start=${r.toISOString()}&end=${t.toISOString()}`).then(i=>this.due=i??[]).catch(()=>this.due=[])}}tick(C){let{todo:H}=this.ids();H&&this.hass.callService("todo","update_item",{item:C.uid,status:"completed"},{entity_id:H})}add(C){C.preventDefault();let H=C.target.querySelector("input"),{todo:V}=this.ids();V&&H.value.trim()&&this.hass.callService("todo","add_item",{item:H.value.trim()},{entity_id:V}),H.value="",this.adding=!1}render(){let C=this.items.filter(V=>V.status==="needs_action"),{todo:H}=this.ids();return e`
      <div class="head"><span class="title">Your day</span>
        ${H?e`<button class="more" @click=${()=>this.adding=!this.adding}>${s(Z5,"")}Add</button>`:""}</div>
      ${this.adding?e`<form class="addrow" @submit=${this.add}><input placeholder="A new to-do for Today" autofocus />
        <button class="act primary" type="submit">Add</button></form>`:""}
      ${C.length?e`<ul class="todos">${C.map(V=>e`<li>
          <button class="tick" title="Done" @click=${()=>this.tick(V)}></button><span>${V.summary}</span></li>`)}</ul>`:e`<div class="empty">${s(H1,"")}Nothing left on today's list.</div>`}
      ${this.due.length?e`<div class="eyebrow" style="margin-top:16px">Coming due</div>
        <ul class="dues">${this.due.slice(0,4).map(V=>{let M=s3(V.start.date??V.start.dateTime??"");return e`<li><span class="bubble sm ${/late|Today/.test(M)?"warn":"brown"}">${s(t5,"")}</span>
            <span class="grow ellipsis">${V.summary}</span><span class="when">${M}</span></li>`})}</ul>`:""}`}},Z2=class extends D{static{this.properties={hass:{attribute:!1},asked:{state:!0},answer:{state:!0},busy:{state:!0}}}static{this.styles=R}constructor(){super(),this.asked="",this.answer="",this.busy=!1}async ask(C){C.preventDefault();let H=C.target.querySelector("input"),V=H.value.trim(),M=x(Z(this.hass),"assistant");if(!(!V||!M||this.busy)){H.value="",this.asked=V,this.answer="",this.busy=!0;try{let r=await this.hass.callWS({type:"conversation/process",text:V,agent_id:M,conversation_id:this.conversation,language:"en"});this.conversation=r?.conversation_id??this.conversation,this.answer=r?.response?.speech?.plain?.speech??"Hisho didn't answer."}catch(r){this.answer=`I couldn't reach Hisho (${r?.message??"error"}).`}finally{this.busy=!1}}}render(){return x(Z(this.hass),"assistant")?e`
      <form class="ask" @submit=${this.ask}>
        <span class="bubble sm accent">${s(F1,"")}</span>
        <input placeholder="Ask Hisho anything…" aria-label="Ask Hisho" />
        <button class="send" type="submit" title="Ask" ?disabled=${this.busy}>${s(M5,"")}</button>
      </form>
      ${this.asked?e`<div class="answer"><div class="q">${this.asked}</div>
        <div class="a">${this.busy?e`<span class="thinking">${s(u5,"")}Thinking…</span>`:this.answer}</div></div>`:""}`:e``}};for(let[L,C]of[["hisho-day",x2],["hisho-ask",Z2]])customElements.get(L)||customElements.define(L,C);function F5(L,C){let H=n(L,C,"addon_status")?.attributes.card;return H&&Array.isArray(H.rows)&&H.rows.length?H:void 0}function R5(L){return P(L,"addon").flatMap(C=>{let H=F5(L,C);return H?[[C,H]]:[]})}function x3(L,C){if(/^https?:\/\//.test(C))return C;if(C.startsWith("#/")){let H=Z(L),V=H&&L.devices?.[H.id]?.configuration_url||"";return/^https?:\/\//.test(V)?V.replace(/\/+$/,"")+"/"+C:""}return""}function u2(L,C,H){return e`<div class="acard">
    <div class="head"><span class="title">${H.title||C.name}</span></div>
    <ul class="arows">${H.rows.map(V=>{let M=x3(L,V.url),r=M?e`<a href=${M} target="_blank" rel="noopener">${V.label}</a>`:V.label;return e`<li class="arow ${V.indent?"indent":""}">
        <span class="dot ${V.state?O(V.state):"none"}"></span>
        <div class="acol"><span class="alabel">${r}</span>${V.detail?e`<span class="muted">${V.detail}</span>`:""}</div>
        <span class="avalue">${V.value}</span></li>`})}</ul></div>`}var c2=B`
  .acard .head { display: flex; align-items: center; margin-bottom: 8px; }
  .arows { list-style: none; margin: 0; padding: 0; }
  .arow { display: flex; align-items: flex-start; gap: 10px; padding: 7px 0; border-top: 1px solid var(--hisho-line, rgba(255,255,255,0.08)); }
  .arow:first-child { border-top: 0; }
  .arow.indent { padding-left: 18px; }
  .arow .dot { margin-top: 6px; flex: none; }
  .arow .dot.none { visibility: hidden; }
  .arow .dot.ok { background: var(--hisho-ok); } .arow .dot.warn { background: var(--hisho-warn); }
  .arow .dot.bad { background: var(--hisho-crit); }
  .acol { display: flex; flex-direction: column; min-width: 0; flex: 1; }
  .alabel a { color: inherit; text-decoration: none; border-bottom: 1px dotted currentColor; }
  .acol .muted { font-size: 0.82em; overflow-wrap: anywhere; }
  .avalue { font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
`,R1=class extends c{static{this.styles=[R,c2]}static getStubConfig(){return{type:"custom:hisho-addon-card",addon:"gov-bids"}}body(){let C=this.hass,H=String(this.config.addon??"").toLowerCase(),V=P(C,"addon").find(r=>{let t=n(C,r,"addon_status")?.attributes.addon;return String(t??"").toLowerCase()===H||r.name.toLowerCase()===H});if(!V)return this.frame(e`<div class="empty">No Hisho add-on named ${this.config.addon??"(addon: not set)"}.</div>`);let M=F5(C,V);return this.frame(M?u2(C,V,M):e`<div class="empty">${V.name} has no overview card (or needs Hisho integration 1.19.0).</div>`)}};var $1=class extends c{static{this.properties={...c.properties,selected:{state:!0}}}static{this.styles=[R,c2,B`
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
    .addoncards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-top: 18px; }
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
  `]}static getStubConfig(){return{type:"custom:hisho-control-center-card"}}connectedCallback(){super.connectedCallback(),this.clock=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.clock)}getGridOptions(){return{columns:"full",min_columns:12}}getCardSize(){return 12}body(){let C=this.hass,H=Z(C),V=P(C,"machine"),M=n(C,H,"core_reachable"),r=n(C,H,"machines_online"),t=n(C,H,"machines_faulted"),a=n(C,H,"needs_you_count")?.attributes.alerts??[],d=a.filter(k=>k.severity==="critical").length,o=n(C,H,"jobs_active")?.attributes.jobs??[],p=o.filter(k=>["queued","routed","running"].includes(k.status)).length,v=o.filter(k=>k.status==="failed").length,u=n(C,H,"sync_problem"),l=n(C,H,"sync_conflicts"),g=x(H,"fleet_maintenance"),m=g?C.states[g]?.state==="on":!1,f=M?.state==="off",b=y(r)?Number(r.state):void 0,w=y(t)?Number(t.state):0,S=y(l)?Number(l.state)||0:void 0,F=a.length,$=u?.state==="on",{time:V1,date:W}=v1(C),q1=B5(C),b2=P5(C),Y1=T5(C),I5=Number(n(C,H,"today")?.state)||0,k2=R5(C);return this.frame(e`
      <div class="hero">
        <div class="hello">
          <div class="when">${W} · ${V1}</div>
          <h1>${this.config.title??Y2(C)}</h1>
          <p class="summary">${this.summary(f,F,d,I5,q1.length,Y1.length)}</p>
        </div>
        <div class="askwrap glass"><hisho-ask .hass=${C}></hisho-ask></div>
      </div>

      ${this.system(V.length,b,w,f,$,S,p,g,m)}

      <div class="body">
        <div class="col">
          <section class="panel glass"><hisho-day .hass=${C}></hisho-day></section>
          <section class="panel glass">
            <div class="head"><span class="title">Hisho is working on</span>
              ${v?e`<span class="chip warn">${v} failed</span>`:""}</div>
            ${q1.length?e`<ul class="list">${q1.map(k=>e`<li class="item bubbled">
                <span class="bubble sm ${k.tone}">${s(k.path,"")}</span>
                <div class="bodycol"><span class="summary">${k.what}</span><span class="muted">${k.sub}</span></div></li>`)}</ul>`:e`<div class="empty">${s(n5,"")}Nothing running right now. Ask Hisho for something.</div>`}
            ${b2.length?e`<div class="eyebrow" style="margin-top:16px">Done for you · last 24 hours</div>
              <ul class="dones">${b2.slice(0,6).map(k=>e`<li>${s(b1,"")}<span class="grow">${k.what}</span>
                <span class="muted">${k.when}</span></li>`)}</ul>`:""}
          </section>
        </div>
        <div class="col">
          <section class="panel glass">
            <hisho-needs-you-card .hass=${C} .config=${{type:"custom:hisho-needs-you-card",embedded:!0,compact:!0,title:"Needs your decision",limit:this.config.needs_you_limit??6}}></hisho-needs-you-card>
            ${Y1.length?e`<div class="eyebrow" style="margin-top:16px">Projects waiting on you</div>
              <ul class="list">${Y1.slice(0,4).map(k=>e`<li class="item bubbled">
                <span class="bubble sm brown">${s(y1,"")}</span>
                <div class="bodycol"><span class="summary">${k.title}</span>
                  ${k.asks?.length?e`<span class="muted">${k.asks[0]}</span>`:k.next?e`<span class="muted">Next: ${k.next}</span>`:""}</div>
              </li>`)}</ul>`:""}
          </section>
        </div>
      </div>
      ${k2.length?e`<div class="addoncards">${k2.map(([k,G5])=>e`<section class="panel glass">${u2(C,k,G5)}</section>`)}</div>`:""}
    `)}system(C,H,V,M,r,t,i,a,d){let A=this.hass,o=C-(H??0),p=P(A,"machine"),v=P(A,"box"),u=P(A,"addon"),l=S=>{let F=x(S,"maintenance");if(F&&A.states[F]?.state==="on")return["brown","maintenance"];if(S.kind==="machine"){let W=n(A,S,"machine_state")?.state??"unknown";return[O(W),W]}if(S.kind==="addon"){let W=n(A,S,"addon_status")?.state??"unknown";return[O(W),W]}let $=n(A,S,"box_health")?.state,V1=n(A,S,"box_state")?.state;return $&&O($)!=="ok"&&O($)!=="off"?[O($),$]:[O(V1??$),V1??$??"unknown"]},g=[...p,...v,...u].filter(S=>["bad","warn"].includes(l(S)[0])).length,m=!M&&!V&&!r&&!g,f=S=>{let[F,$]=l(S);return e`<button class="pill ${F} ${this.selected===S.id?"sel":""}"
        @click=${()=>this.selected=this.selected===S.id?void 0:S.id}>
        <span class="dot ${F}"></span><span class="pn">${S.name}</span><span class="ps">${$}</span></button>`},b=[...p,...v,...u].find(S=>S.id===this.selected),w=(S,F)=>F.length?e`<div class="sysgroup"><div class="eyebrow">${S}</div><div class="pills">${F.map(f)}</div></div>`:"";return e`<section class="system glass">
      <div class="sysbar">
        <span class="bubble sm ${m?"accent":"bad"}">${s(m?S5:c5,"")}</span>
        <span class="grow sysline">${M?e`<b class="bad">Hisho Core isn't answering</b>`:e`<b>${H??"\u2013"} of ${C}</b> machines up${o?e` <span class="muted">(${o} parked)</span>`:""}${V?e`, <b class="bad">${V} faulted</b>`:""} ·
          Sync ${r?e`<b class="bad">has a problem</b>`:"OK"}${t?` \xB7 ${t} conflict files`:""}${g?e` · <b class="warnc">${g} need${g===1?"s":""} a look</b>`:""}${i?` \xB7 ${i} job${i>1?"s":""} running`:""}`}</span>
        ${a?e`<button class="act ${d?"brown":""}" @click=${()=>N(this,A,a,!d,d?void 0:"Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.")}>${s(t1,"")}${d?"End fleet maintenance":"Fleet maintenance"}</button>`:""}
        <button class="more" @click=${()=>X2("machines")}>Machines ${s(L5,"")}</button>
      </div>
      <div class="sysgrid">${w("Machines",p)}${w("Devices",v)}${w("Add-ons",u)}</div>
      ${b?e`<div class="drawer">
        <button class="close" title="Close" @click=${()=>this.selected=void 0}>${s(d5,"")}</button>
        ${b.kind==="machine"?e`<hisho-machine-card .hass=${A} .config=${{type:"custom:hisho-machine-card",machine:b.name,embedded:!0}}></hisho-machine-card>`:e`<hisho-device-card .hass=${A} .config=${{type:"custom:hisho-device-card",device:b.name,embedded:!0}}></hisho-device-card>`}
      </div>`:""}
    </section>`}summary(C,H,V,M,r,t){if(C)return"Hisho Core isn't answering Home Assistant, so what you see here may be out of date.";let i=(o,p,v=p+"s")=>`${o} ${o===1?p:v}`,a=[],d=H-V;V?a.push(d?`${i(V,"urgent thing")} and ${d} more need you`:`${i(V,"urgent thing")} needs you`):H&&a.push(`${i(H,"thing")} need${H===1?"s":""} your answer`),t&&a.push(`${i(t,"project")} waiting on you`),M&&a.push(`${i(M,"to-do")} left today`);let A=a.length?a.join(", ").replace(/^\w/,o=>o.toUpperCase())+".":"Nothing needs you right now.";return r?`${A} Hisho is working on ${i(r,"thing")} for you.`:A}};function Z3(L,C){if(!y(L))return["off","no data"];let H=L.attributes.state??"";if(H==="probe-error")return["off","no data"];if(L.attributes.kind==="scheduled"){if(L.state==="on"){let V=L.attributes.last_run?new Date(L.attributes.last_run).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZone:C||void 0}):"";return["ok",V?`ok \xB7 ran ${V}`:H==="waiting-for-first-run"?"waiting for its first run":"ok"]}return H.startsWith("missed")?["bad","missed"]:H==="not-scheduled"?["warn","not scheduled"]:["bad","failed"]}return L.state==="on"?["ok","running"]:["bad",H||"stopped"]}var D1=class extends c{static getStubConfig(C){return{type:"custom:hisho-machine-card",machine:(C?Object.values(C.devices??{}).find(V=>V.model&&V.via_device_id):void 0)?.name??""}}setConfig(C){if(!C?.machine)throw new Error("Say which machine: machine: <name>");super.setConfig(C)}body(){let C=this.hass,H=l1(C,this.config.machine,"machine");if(!H)return e`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;let V=n(C,H,"machine_state"),M=V?.attributes.machine??H.name,r=E(C),t=V?.attributes.power??[],i=V?.attributes.items??[],a=Q(C,H,"unit"),d=Q(C,H,"restart_unit"),A=Q(C,H,"service"),o=x(H,"maintenance"),p=(m,f)=>{let b=n(C,H,m);return y(b)?e`<div class="row spread kvrow"><span class="muted">${f}</span>
        <span>${b.state}${b.attributes.unit_of_measurement?" "+b.attributes.unit_of_measurement:""}</span></div>`:""},v=n(C,H,"online")?.state==="on",u=v2(H),l=O(V?.state),g=[["Mem","memory_usage"],["Disk","disk_usage"],["GPU","gpu_usage"]].map(([m,f])=>[m,h1(n(C,H,f)?.state)]).filter(m=>m[1]!==void 0);return this.frame(e`<div class="mcard"><div class="mleft">
      <div class="mhead" style="margin-bottom:14px">
        <span class="bubble ${v?l==="ok"?"accent":l:"off"}">${s(l2(H),"")}</span>
        <span class="grow"><span class="name">${this.config.title??H.name}</span>
          ${V?.attributes.role?e`<span class="muted ellipsis sub">${V.attributes.role}</span>`:""}</span>
        <span class="chip ${l}">${V?.state??"unknown"}</span>
      </div>
      ${g.length?e`<div class="rings" style="margin-bottom:12px;max-width:340px">${g.map(([m,f])=>f1(m,f))}</div>`:""}
      ${p("awake","Parking")} ${p("jobs_running","Jobs running")} ${p("jobs_queued","Jobs queued")}
      ${p("containers_running","Containers")} ${p("sync_connected","Sync")}
      <div class="row" style="margin-top:8px">
        ${t.includes("wake")&&r.has("machine.wake")?e`<button class="act" @click=${()=>h(this,C,"machine.wake",M)}>${s(w1,"")}Wake</button>`:""}
        ${t.includes("park")&&r.has("machine.park")?e`<button class="act danger" @click=${()=>h(this,C,"machine.park",M,{},`Park ${H.name}? It powers off until something needs it.`)}>${s(B1,"")}Park</button>`:""}
        ${o?e`<button class="act ${C.states[o]?.state==="on"?"brown":""}" @click=${()=>{let m=C.states[o]?.state==="on";N(this,C,o,!m,m?void 0:`Put ${H.name} in maintenance? Its alerts are held and its VM shuts down.`)}}>${s(t1,"")}${C.states[o]?.state==="on"?"End maintenance":"Maintenance"}</button>`:""}
      </div>
      ${u?e`<div class="eyebrow" style="margin-top:18px">${u[1]} · last 24 hours</div>
        <hisho-spark .hass=${C} .entity=${u[0]} .min=${0} .max=${100} style="height:56px"></hisho-spark>`:""}
      </div><div class="mright">
      ${A.length||a.length?e`<div class="eyebrow">Services</div>`:""}
      <ul class="list">
        ${A.map(m=>{let[f,b]=Z3(m,C.config?.time_zone);return e`<li><div class="row spread"><span>${C1(m,H)}</span>
          <span class="chip ${f}" title=${m.attributes.state??""}>${b}</span></div></li>`})}
        ${a.map(m=>{let f=C1(m,H),b=d.find(S=>C1(S,H)===`Restart ${f}`),w=m.state;return e`<li><div class="row spread"><span>${f}</span><span class="row">
            ${y(m)?e`<button class="act ${m.state==="on"?"danger":""}" @click=${()=>N(this,C,m.entity_id,m.state!=="on",m.state==="on"?`Stop ${f} on ${H.name}?`:void 0)}>
              ${m.state==="on"?"Stop":"Start"}</button>`:e`<span class="muted">${w}</span>`}
            ${b?e`<button class="act" @click=${()=>g1(this,C,b.entity_id)}>Restart</button>`:""}
          </span></div></li>`})}
      </ul>
      ${i.length?e`<div class="eyebrow" style="margin-top:18px">From add-ons</div>`:""}
      <ul class="list">${i.map(m=>e`<li>
        <div class="row spread"><span>${m.name}</span><span class="chip ${O(m.state)}">${m.state}</span></div>
        ${m.facts?.length?e`<div class="detail">${m.facts.join(" \xB7 ")}</div>`:""}
        ${r.has("device.press")&&m.actions?.length?e`<div class="row">${m.actions.map(f=>e`
          <button class="act ${f.danger?"danger":""}" @click=${()=>h(this,C,"device.press",m.addon,{entry:m.entry,item:m.id,action:f.id},f.danger?`${f.label}: ${m.name} on ${H.name}?`:void 0)}>${f.label}</button>`)}</div>`:""}
      </li>`)}</ul>
    </div></div>
      <button class="link" style="margin-top:12px;font-size:0.86em" @click=${()=>V&&_(this,V.entity_id)}>History…</button>`)}};var u3={critical:"bad",decision:"decide",warn:"warn",info:"off"},c3={critical:V5,decision:s5,warn:O1,info:p2},E1=class extends c{static{this.properties={...c.properties,items:{state:!0},showDone:{state:!0},expanded:{state:!0},showAll:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-needs-you-card"}}constructor(){super(),this.items=[],this.showDone=!1,this.expanded=new Set,this.showAll=!1}updated(C){super.updated(C);let H=x(Z(this.hass),"needs_you"),V=H?this.hass.states[H]?.last_changed+"|"+this.hass.states[H]?.state:void 0;H&&V!==this.seen&&(this.seen=V,this.hass.callWS({type:"todo/item/list",entity_id:H}).then(M=>this.items=M.items??[]).catch(()=>this.items=[]))}body(){let C=this.hass,H=Z(C),V=n(C,H,"needs_you_count")?.attributes.alerts??[],M=new Map(V.map(o=>[o.id,o.severity])),r=V.filter(o=>o.severity==="decision"&&/asks to connect/.test(o.title)),t=this.items.filter(o=>this.showDone||o.status==="needs_action"),i=this.items.filter(o=>o.status==="completed").length,a=this.config.limit??50,d=this.showAll?t:t.slice(0,a),A=E(C);return this.frame(e`
      <div class="head">${this.heading("Needs you")}
        <span class="row">${t.length?e`<span class="chip ${V.some(o=>o.severity==="critical")?"bad":"warn"} num">${t.filter(o=>o.status==="needs_action").length} open</span>`:""}
        ${i?e`<button class="act" @click=${()=>this.showDone=!this.showDone}>
          ${this.showDone?"Hide":"Show"} ${i} acknowledged</button>`:""}</span></div>
      ${r.map(o=>e`<div class="tile decide" style="margin-bottom:8px"><span class="row"><span class="chip decide">decide</span>
        <span>${o.title}</span></span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${t.length?"":e`<div class="empty">${s(H1,"")}Nothing needs you right now.</div>`}
      <ul class="list">${d.map(o=>{let p=M.get(o.uid)??(o.description?.split(":")[0]||"").toLowerCase(),v=o.status==="completed",u=!this.config.compact||this.expanded.has(o.uid),l=v?"off":u3[p]??O(p);return e`<li class="item bubbled ${l}">
          <span class="bubble sm ${l}">${s(c3[p]??p2,"")}</span>
          <div class="bodycol">
          <div class="row spread" style="cursor:${this.config.compact?"pointer":"default"}" @click=${()=>this.flip(o.uid)}>
            <span class="grow"><span class="summary ${this.config.compact&&!u?"ellipsis":""}">${o.summary}</span>
              <span class="chip ${l} plain sev">${v?"acknowledged":p||"alert"}</span></span>
            ${this.config.compact?e`<span class="chev ${u?"open":""}">${s(k1,"")}</span>`:""}</div>
          ${u&&o.description?e`<div class="detail">${o.description.replace(/^[A-Z]+:\s*/,"")}</div>`:""}
          ${u&&A.has("alert.ack")?e`<div class="row">
            ${v?e`<button class="act" @click=${()=>this.alert(o.uid,"unack")}>Un-acknowledge</button>`:e`<button class="act primary" @click=${()=>this.alert(o.uid,"ack")}>${s(b1,"")}Acknowledge</button>
                     <button class="act" @click=${()=>this.alert(o.uid,"snooze")}>${s(H5,"")}Snooze 1 h</button>`}
            <button class="act" @click=${()=>this.alert(o.uid,"investigate")}>${s(x5,"")}Investigate</button>
            <button class="act" @click=${()=>this.alert(o.uid,"notify")}>${s(i5,"")}Send to phone</button>
          </div>`:""}
          </div>
        </li>`})}</ul>
      ${t.length>d.length||this.showAll?e`<button class="link" style="margin-top:6px;font-size:0.86em"
        @click=${()=>this.showAll=!this.showAll}>${this.showAll?"Show fewer":`Show all ${t.length}`}</button>`:""}
    `)}flip(C){if(!this.config.compact)return;let H=new Set(this.expanded);H.delete(C)||H.add(C),this.expanded=H}alert(C,H){return h(this,this.hass,`alert.${H}`,C,H==="snooze"?{hours:1}:{})}};function h2(L,C){let H=C??{};return Object.entries(L??{}).map(([V,M])=>{let r=M.endsWith("?"),t=M.replace(/\?$/,""),i=/^list\((.*)\)$/.exec(t);return{key:V,type:i?"list":t,optional:r,choices:i?i[1].split("|").map(a=>a.trim()).filter(Boolean):[],label:H[V]??V.replace(/_/g," ")}})}var S2=L=>L.type==="password"||L.type==="secret",S3=/^[A-Z][A-Z0-9_]{2,127}$/;function g2(L,C){let H=L.key;if(L.type==="bool")return e`<input type="checkbox" name=${H} .checked=${!!C} />`;if(L.type==="list")return e`<select name=${H}>${L.choices.map(r=>e`<option value=${r} ?selected=${r===C}>${r}</option>`)}</select>`;let V=L.type==="int"||L.type==="port"?"number":L.type==="url"?"url":"text",M=S2(L)?"secret's name, e.g. CLOUDFLARE_EXAMPLE_TOKEN":L.optional?"optional":"";return e`<input type=${V} name=${H} .value=${C??""} placeholder=${M}
    pattern=${S2(L)?"[A-Z][A-Z0-9_]{2,127}":".*"} />`}function f2(L,C,H={}){let V={};for(let M of C){let r=L.elements.namedItem(M.key);if(!r)continue;let t=r instanceof HTMLInputElement&&r.type==="checkbox"?r.checked:r.value.trim();if((M.type==="int"||M.type==="port")&&t!==""&&(t=Number(t)),S2(M)&&t&&!S3.test(t))return{values:V,error:`${M.label}: give the secret's name, not its value (paste values in Hisho's dashboard).`};t!==(H[M.key]??(M.type==="bool"?!1:""))&&(V[M.key]=t)}return{values:V}}var $5=`
  form.settings { display: grid; grid-template-columns: minmax(110px, 38%) 1fr; gap: 6px 10px; align-items: center; margin: 8px 0; }
  form.settings label { color: var(--secondary-text-color); font-size: 0.9em; overflow-wrap: anywhere; }
  form.settings input, form.settings select {
    font: inherit; padding: 4px 6px; border-radius: 6px; border: 1px solid var(--divider-color);
    background: var(--card-background-color); color: var(--primary-text-color); min-width: 0;
  }
  form.settings input[type=checkbox] { justify-self: start; }
  form.settings .full { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; }
  .error { color: var(--error-color, #db4437); font-size: 0.9em; }
`;var h3=(L,C)=>E(L).has(C),_1=class extends c{static{this.properties={...c.properties,error:{state:!0}}}static{this.styles=[R,B`${u1($5)}`]}static getStubConfig(){return{type:"custom:hisho-device-card",device:""}}setConfig(C){if(!C?.device)throw new Error("Say which device: device: <name>");super.setConfig(C)}body(){let C=l1(this.hass,this.config.device,"box")??l1(this.hass,this.config.device,"addon");return C?C.kind==="addon"?this.addon(C):this.box(C):e`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`}maintenance(C,H){let V=x(C,"maintenance");if(!V)return"";let M=this.hass.states[V]?.state==="on";return e`<button class="act ${M?"":"danger"}" @click=${()=>N(this,this.hass,V,!M,M?void 0:`Put ${H} in maintenance? Its alerts are held.`)}>
      ${M?"End maintenance":"Maintenance"}</button>`}box(C){let H=this.hass,V=n(H,C,"box_state"),M=n(H,C,"box_health"),r=E(H);return this.frame(e`
      <div class="head"><div class="title">${this.config.title??C.name}</div>
        <span class="row"><span class="chip ${O(V?.state)}">${V?.state??"unknown"}</span>
          <span class="chip ${O(M?.state)}">${M?.state??"unknown"}</span></span></div>
      ${M?.attributes.summary?e`<div class="detail">${M.attributes.summary}</div>`:""}
      <ul class="list" style="margin-top:10px">${Q(H,C,"box_item").map(t=>{let i=t.attributes;return e`<li>
          <div class="row spread"><span class="name" @click=${()=>_(this,t.entity_id)}>${C1(t,C)}</span>
            <span class="chip ${O(t.state)}">${y(t)?t.state:"unavailable"}</span></div>
          ${i.facts?.length?e`<div class="detail">${i.facts.join(" \xB7 ")}</div>`:""}
          ${r.has("device.press")&&i.actions?.length?e`<div class="row">${i.actions.map(a=>e`
            <button class="act ${a.danger?"danger":""}" @click=${()=>h(this,H,"device.press",i.addon,{entry:i.entry,item:i.item_id,action:a.id},a.danger?`${a.label}: ${C1(t,C)} on ${C.name}?`:void 0)}>${a.label}</button>`)}</div>`:""}
        </li>`})}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(C,C.name)}</div>
    `)}addon(C){let H=this.hass,V=n(H,C,"addon_status"),M=x(C,"addon_enabled"),r=V?.attributes??{},t=E(H);return this.frame(e`
      <div class="head"><div class="title">${this.config.title??C.name}</div>
        <span class="chip ${O(V?.state)}">${V?.state??"unknown"}</span></div>
      <div class="muted">${[r.kind,r.version&&"v"+r.version,r.host&&"on "+r.host].filter(Boolean).join(" \xB7 ")}</div>
      ${r.problems?.length?e`<ul class="list" style="margin-top:8px">${r.problems.map(i=>e`<li><span class="detail">${i}</span></li>`)}</ul>`:""}
      <div class="row" style="margin-top:10px">
        ${t.has("addon.run")?(r.actions??[]).map(i=>e`<button class="act ${i.danger?"danger":""}"
          @click=${()=>h(this,H,"addon.run",r.addon,{action:i.id},i.danger?`${i.label} (${C.name})?`:void 0)}>${i.label}</button>`):""}
        ${this.maintenance(C,C.name)}
        ${M?e`<button class="act ${H.states[M]?.state==="on"?"danger":""}" @click=${()=>{let i=H.states[M]?.state==="on";N(this,H,M,!i,i?`Turn ${C.name} off? Hisho stops running it.`:void 0)}}>${H.states[M]?.state==="on"?"Turn off":"Turn on"}</button>`:""}
      </div>
      ${t.has("addon.config")?this.settings(r):""}
    `)}settings(C){let H=this.hass,V=C.settings??{},M=h2(V.schema,{}),r=h2(V.entry_schema,V.entry_form),t=V.entries??[];if(!M.length&&!r.length)return"";let i=async d=>{d.preventDefault();let{values:A,error:o}=f2(d.target,M,V.options??{});this.error=o??"",!(o||!Object.keys(A).length)&&await h(this,H,"addon.config",C.addon,{settings:A})},a=async(d,A)=>{d.preventDefault();let o=d.target.closest("form"),p=o.elements.namedItem("__entry").value.trim(),{values:v,error:u}=f2(o,r);this.error=u??(p?"":"Give the entry a name."),!this.error&&await h(this,H,A?"addon.test":"addon.entry",C.addon,{entry:p,settings:v})};return e`<details style="margin-top:12px"><summary class="muted">Settings</summary>
      ${this.error?e`<div class="error">${this.error}</div>`:""}
      ${M.length?e`<form class="settings" @submit=${i}>
        ${M.map(d=>e`<label>${d.label}</label>${g2(d,(V.options??{})[d.key])}`)}
        <div class="full"><button class="act" type="submit">Save</button>
          ${h3(H,"addon.apply")?e`<button class="act" type="button" @click=${()=>h(this,H,"addon.apply",C.addon)}>Apply on its machine</button>`:""}</div>
      </form>`:""}
      ${r.length?e`<div class="muted" style="margin-top:8px">${V.entry_label??"Entries"}</div>
        <ul class="list">${t.map(d=>e`<li><div class="row spread"><span>${d}</span>
          <button class="act danger" @click=${()=>h(this,H,"addon.entry",C.addon,{entry:d,settings:{_remove:!0}},`Remove ${d} from ${C.addon}?`)}>Remove</button></div></li>`)}</ul>
        <form class="settings" @submit=${d=>a(d,!1)}>
          <label>Name</label><input name="__entry" placeholder="a short name" />
          ${r.map(d=>e`<label>${d.label}</label>${g2(d,void 0)}`)}
          <div class="full"><button class="act" type="button" @click=${d=>a(d,!0)}>Test</button>
            <button class="act" type="submit">Add or replace</button></div>
        </form>`:""}
    </details>`}};var g3={running:e1,queued:s1,routed:s1,failed:O1,done:H1},N1=class extends c{static getStubConfig(){return{type:"custom:hisho-jobs-card"}}body(){let C=this.hass,H=n(C,Z(C),"jobs_active")?.attributes.jobs??[],V=E(C),M=this.config.limit??10;return this.frame(e`
      <div class="head">${this.heading("Jobs")}
        ${V.has("jobs.reap")?e`<button class="act" @click=${()=>h(this,C,"jobs.reap")}>Fail stuck jobs</button>`:""}</div>
      ${H.length?"":e`<div class="empty">${s(H1,"")}No jobs.</div>`}
      <ul class="list">${H.slice(0,M).map(r=>{let t=["queued","routed","running"].includes(r.status),i=O(r.status);return e`<li class="item bubbled ${i}">
          <span class="bubble sm ${i==="ok"?"accent":i}">${s(g3[r.status]??p5,"")}</span>
          <div class="bodycol">
          <div class="row spread"><span class="ellipsis">${r.kind}${r.worker?e` <span class="muted">on ${r.worker}</span>`:""}</span>
            <span class="row" style="flex-wrap:nowrap">
            ${t&&V.has("job.cancel")?e`<button class="act danger" @click=${()=>h(this,C,"job.cancel",r.id,{},`Cancel this ${r.kind} job?`)}>Cancel</button>`:""}
            ${r.status==="failed"&&V.has("job.retry")?e`<button class="act" @click=${()=>h(this,C,"job.retry",r.id)}>Retry</button>`:""}
            ${!t&&V.has("job.clear")?e`<button class="act" @click=${()=>h(this,C,"job.clear",r.id)}>Clear</button>`:""}
            <span class="chip ${O(r.status)}">${r.status}</span></span></div>
          ${r.reason?e`<div class="detail">${r.reason}</div>`:""}
          </div>
        </li>`})}</ul>
      ${H.length>M?e`<div class="muted" style="margin-top:6px">${H.length-M} more on the Projects page</div>`:""}
    `)}},W1=class extends c{static getStubConfig(){return{type:"custom:hisho-projects-card"}}body(){let C=this.hass,H=n(C,Z(C),"projects_active")?.attributes.projects??[],V=E(C),M=t=>!!t.asks?.length||!["","claude","hisho"].includes(String(t.waiting_on??"").toLowerCase()),r=H.filter(t=>t.status==="active").sort((t,i)=>Number(M(i))-Number(M(t)));return this.frame(e`
      <div class="head">${this.heading("Projects")}<span class="muted">${r.length} active</span></div>
      <ul class="list">${r.slice(0,this.config.limit??20).map(t=>e`<li>
        <div class="row spread"><span class="ellipsis">${t.title}${t.company?e` <span class="muted">${t.company}</span>`:""}</span>
          ${M(t)?e`<span class="chip warn">waiting on you</span>`:""}</div>
        ${t.asks?.length?e`<div class="detail">${t.asks.join(`
`)}</div>`:t.next?e`<div class="detail">Next: ${t.next}</div>`:""}
        <div class="row">
          ${V.has("project.open")?e`<button class="act" @click=${()=>h(this,C,"project.open",t.name)}>Open</button>`:""}
          ${V.has("project.archive")?e`<button class="act danger" @click=${()=>h(this,C,"project.archive",t.name,{},`Archive ${t.title}? Nothing is deleted; it can be restored.`)}>Archive</button>`:""}
        </div>
      </li>`)}</ul>
    `)}};var I1=class extends c{static getStubConfig(){return{type:"custom:hisho-store-card"}}body(){let C=this.hass,H=n(C,Z(C),"addon_updates"),V=H?.attributes.store??[],M=H?.attributes.repositories??[],r=E(C);if(!r.has("store.install")&&!r.has("store.update"))return e`<ha-card><div class="head">${this.heading("Add-on store")}</div>
        <div class="empty">Hisho does not let this Home Assistant change its add-ons.</div></ha-card>`;let t=[...V].sort((i,a)=>+!!a.update_available-+!!i.update_available||+!!a.installed-+!!i.installed||String(i.title).localeCompare(String(a.title)));return e`<ha-card>
      <div class="head">${this.heading("Add-on store")}<span class="muted">${V.filter(i=>i.installed).length} installed</span></div>
      <ul class="list">${t.map(i=>e`<li>
        <div class="row spread"><span>${i.title}</span>
          <span class="chip ${i.update_available?"warn":i.installed?"ok":"off"}">${i.update_available?i.installed_version===i.version?`v${i.version} \xB7 update available`:`${i.installed_version} \u2192 ${i.version}`:i.installed?`v${i.installed_version}`:`v${i.version}`}</span></div>
        ${i.description?e`<div class="detail">${i.description}</div>`:""}
        <div class="row">
          ${!i.installed&&r.has("store.install")?e`<button class="act" @click=${()=>h(this,C,"store.install",i.name)}>Install</button>`:""}
          ${i.update_available&&r.has("store.update")?e`<button class="act" @click=${()=>h(this,C,"store.update",i.name,{host:i.host??""})}>Update</button>`:""}
          ${i.installed&&i.previous&&r.has("store.rollback")?e`<button class="act danger" @click=${()=>h(this,C,"store.rollback",i.name,{host:i.host??""},`Roll ${i.title} back to the version before? Its settings are kept.`)}>Roll back</button>`:""}
          ${i.installed&&r.has("store.remove")?e`<button class="act danger" @click=${()=>h(this,C,"store.remove",i.name,{host:i.host??""},`Remove ${i.title}? Its settings are kept; install it again any time.`)}>Remove</button>`:""}
        </div></li>`)}</ul>
      <div class="title" style="margin-top:14px;font-size:1em">Repositories</div>
      <ul class="list">${M.map(i=>e`<li><div class="row spread">
        <span>${i.name}${i.listed==="store"?e` <span class="muted">store</span>`:""}</span>
        <span class="row">
          ${r.has("repository.update")?e`<button class="act" @click=${()=>h(this,C,"repository.update",i.url)}>Update</button>`:""}
          ${i.listed!=="store"&&r.has("repository.remove")?e`<button class="act danger" @click=${()=>h(this,C,"repository.remove",i.url,{},`Remove the repository ${i.name}?`)}>Remove</button>`:""}
        </span></div></li>`)}</ul>
      ${r.has("repository.add")?e`<form class="row" style="margin-top:8px" @submit=${i=>{i.preventDefault();let a=i.target.elements.namedItem("url");a.value.trim()&&h(this,C,"repository.add",a.value.trim()).then(()=>a.value="")}}><input name="url" placeholder="https://github.com/you/hisho-addon-name" style="flex:1;font:inherit;padding:4px 6px;
        border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)" />
        <button class="act" type="submit">Add repository</button></form>`:""}
    </ha-card>`}};var G1=class extends c{static{this.styles=[R,B`
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
  `]}static getStubConfig(){return{type:"custom:hisho-pulse-card"}}getGridOptions(){return{columns:"full",min_columns:6}}body(){let C=this.hass,H=Z(C),V=P(C,"machine"),M=n(C,H,"machines_online"),r=n(C,H,"machines_faulted"),t=n(C,H,"needs_you_count"),i=t?.attributes.alerts??[],a=i.filter(m=>m.severity==="critical").length,d=n(C,H,"jobs_active")?.attributes.jobs??[],A=d.filter(m=>["queued","routed","running"].includes(m.status)).length,o=d.filter(m=>m.status==="failed").length,p=n(C,H,"sync_conflicts"),v=y(M)?Number(M.state):void 0,u=y(r)?Number(r.state):0,l=y(p)?Number(p.state)||0:void 0,g=(m,f,b,w,S,F,$,V1="var(--hisho-accent-text)",W)=>e`
      <div class="lt ${m}" @click=${()=>$&&_(this,$)}>
        <div class="top"><div><div class="lv">${f}${b?e`<small>${b}</small>`:""}</div>
          <div class="ll">${w}</div><div class="ls">${S}</div></div>
          <span class="bubble ${m==="ok"?"accent":m||"brown"}">${s(F,"")}</span></div>
        ${$?e`<hisho-spark .hass=${C} .entity=${$} .min=${0} .max=${W}
          .tone=${m==="bad"?"var(--hisho-crit)":V1}></hisho-spark>`:""}
      </div>`;return this.frame(e`<div class="live">
      ${g(u?"bad":v===V.length?"ok":"",v??"\u2013",`/${V.length}`,"Machines online",u?`${u} faulted`:V.length-(v??0)?`${V.length-(v??0)} parked or off`:"All up",P1,M?.entity_id,void 0,V.length)}
      ${g(a?"bad":i.length?"warn":"ok",i.length,"","Needs you",a?`${a} critical`:i.length?"Nothing critical":"All clear",e5,t?.entity_id,"var(--hisho-brown-text)")}
      ${g(o?"warn":"ok",A,"","Jobs running",o?`${o} failed`:`${d.length} recent`,e1,x(H,"jobs_active"))}
      ${g(l?"warn":"ok",l??"\u2013","","Sync conflicts",l?"Files to sort out":"None",l?v5:o5,p?.entity_id,"var(--hisho-brown-text)")}
    </div>`)}};function O2(L,C=Date.now()){let H=L?Date.parse(L):NaN;if(Number.isNaN(H))return"";let V=Math.max(0,Math.round((C-H)/6e4));return V<60?`${V} min ago`:V<2880?`${Math.round(V/60)} h ago`:`${Math.round(V/1440)} days ago`}function E5(L,C){return C?v1(L,new Date(C)).time:""}function D5(L){return L?{dashboard:"the dashboard",timer:"its timer",cli:"the command line"}[L]??L:"something Hisho didn't record"}function f3(L,C,H=Date.now()){let V=Object.entries(C.open_on??{});if(V.length){let t=V.map(([i,a])=>`by ${D5(a.by)} on ${i}`).join("; ");return`${C.always?"Until you end it":`Claude acts without asking until ${E5(L,C.until)}`}, opened ${t}`}let M=(C.recent??[])[0];if(!M||!M.started)return"Claude asks first";let r=Number(M.commands_total)||0;return`Claude asks first. Last window: ${M.machine}, ${O2(M.started,H)} by ${D5(M.by)}, ${r} tool${r===1?"":"s"} run (listed on Hisho's dashboard)`}var U1=class extends c{static{this.styles=[R,B`
    ha-card { background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; padding: 0; }
    .live { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
    .lt { position: relative; padding: 16px 18px; cursor: pointer; display: flex; flex-direction: column; gap: 4px;
      min-height: 112px; transition: transform 0.15s, border-color 0.15s;
      background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
      backdrop-filter: blur(20px) saturate(130%); -webkit-backdrop-filter: blur(20px) saturate(130%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
    .lt:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.16); }
    .lt .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .lt .lv { font-size: 1.7em; font-weight: 300; line-height: 1.1; }
    .lt .ll { font-size: 0.86em; font-weight: 500; }
    .lt .ls { font-size: 0.76em; color: var(--hisho-text-2); }
    .lt .bubble { width: 34px; height: 34px; } .lt .bubble svg { width: 19px; height: 19px; }
    .lt .go { margin-top: auto; align-self: flex-start; }
    .lt.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }
    .lt.warn { border-color: color-mix(in srgb, var(--hisho-warn) 45%, transparent); }
  `]}static getStubConfig(){return{type:"custom:hisho-setup-card"}}getGridOptions(){return{columns:"full",min_columns:6}}async pressKey(C,H){C.stopPropagation();let V=x(Z(this.hass),H);V&&await g1(this,this.hass,V)}body(){let C=this.hass,H=Z(C),V=(A,o,p,v,u,l,g)=>e`
      <div class="lt ${A}" @click=${()=>l&&_(this,l)}>
        <div class="top"><div><div class="lv">${o}</div><div class="ll">${p}</div></div>
          <span class="bubble ${A==="ok"?"accent":A||"brown"}">${s(u,"")}</span></div>
        <div class="ls">${v}</div>${g??""}
      </div>`,M=[],r=n(C,H,"souko_check");if(r){let A=(r.attributes.checks??[]).filter(v=>v.ok===!1),o=r.state,p=x(H,"check_souko")?e`<button class="go" ?disabled=${o==="running"}
        @click=${v=>this.pressKey(v,"check_souko")}>Check now</button>`:"";M.push(V(o==="problems"?"bad":o==="passed"?"ok":"",o==="passed"?"All passed":o==="problems"?`${A.length} to look at`:o==="running"?"Checking\u2026":"Not run","Check my Souko",o==="problems"?A.map(v=>v.name).join(", "):O2(r.attributes.at),o==="problems"?a5:A5,r.entity_id,p))}let t=n(C,H,"backup_last_good");if(t){let A=y(t)?t.state:void 0,o=A?(Date.now()-Date.parse(A))/36e5:1/0;M.push(V(o>48?"bad":o>26?"warn":"ok",A?O2(A):"Never","Last good backup",t.attributes.ok===!1?`Last try failed: ${t.attributes.error??"see Hisho"}`:"Hisho's state, nightly",r5,t.entity_id))}let i=n(C,H,"approvals_waiting");if(y(i)){let A=Number(i.state)||0,o=(i.attributes.approvals??[])[0];M.push(V(A?"warn":"ok",A,"Approvals waiting",A?`${o?.title??""}${A>1?` and ${A-1} more`:""} (decide on Hisho's dashboard)`:"Nothing to decide",O5,i.entity_id))}let a=n(C,H,"logins_not_in_vault");if(y(a)){let A=Number(a.state)||0,o=(a.attributes.logins??[]).filter(p=>(p.waiting??[]).length);M.push(V(A?"warn":"ok",A,"Logins not in the vault",A?o.map(p=>p.title).join(", "):"Every login is saved",h5,a.entity_id))}let d=n(C,H,"trust_window");if(d){let A=d.state==="on",o=A&&x(H,"trust_end")?e`<button class="go" @click=${v=>this.pressKey(v,"trust_end")}>End now</button>`:"",p=A&&!d.attributes.open_on?d.attributes.always?"Until you end it":`Claude acts without asking until ${E5(C,d.attributes.until)}`:f3(C,d.attributes);M.push(V(A?"warn":"ok",A?"Open":"Closed","Trust window",p,A?g5:f5,d.entity_id,o))}return M.length?this.frame(e`<div class="live">${M}</div>`):e``}};function _5(L,C){if(!L)return"";let H={month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"};try{return new Date(L).toLocaleString("en-US",{...H,timeZone:C||void 0})}catch{return new Date(L).toLocaleString("en-US",H)}}var Q1=class extends c{constructor(){super();this.timezone=null;this.keepDays=30;this.loaded=!1;this.list=[],this.open=null,this.transcript=null,this.person="",this.error="",this.loading=!1,this.sending=null}static{this.properties={...c.properties,list:{state:!0},open:{state:!0},transcript:{state:!0},person:{state:!0},error:{state:!0},loading:{state:!0},sending:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-conversations-card"}}updated(H){super.updated(H),!this.loaded&&this.hass&&Z(this.hass)&&this.hass.user?.is_admin!==!1&&(this.loaded=!0,this.load())}ws(H){let V=this.config.config_entry_id?{config_entry_id:this.config.config_entry_id}:{};return this.hass.callWS({...H,...V})}async load(){this.loading=!0;try{let H=await this.ws({type:"hisho/conversations/list",limit:this.config.limit??200});this.list=H.conversations??[],this.timezone=H.timezone??null,this.keepDays=H.keep_days??30,this.error=""}catch(H){this.error=H?.code==="unauthorized"?"Only Home Assistant administrators can see these.":`Couldn't load them: ${H?.message??H}`}finally{this.loading=!1}}async toggle(H){if(this.open===H){this.open=null;return}this.open=H,this.transcript=null;try{this.transcript=await this.ws({type:"hisho/conversations/get",conversation_id:H})}catch(V){this.open=null,this.error=`Couldn't open it: ${V?.message??V}`}}async forget(H){let V=H.person?`${H.person}'s`:"this";if(await r1(this,`Delete ${V} conversation "${H.title??""}"? It can't be brought back.`))try{await this.ws({type:"hisho/conversations/delete",conversation_id:H.session_id}),this.list=this.list.filter(M=>M.session_id!==H.session_id),this.open===H.session_id&&(this.open=null)}catch(M){this.error=`Couldn't delete it: ${M?.message??M}`}}mine(H){return!!H.person_id&&H.person_id===this.hass.user?.id}async send(H,V){let M=V.elements.namedItem("text"),r=M.value.trim();if(!(!r||this.sending)){this.sending=r,this.error="";try{await this.ws({type:"hisho/conversations/continue",conversation_id:H.session_id,text:r}),M.value="",this.transcript=await this.ws({type:"hisho/conversations/get",conversation_id:H.session_id}),this.load()}catch(t){this.error=`Couldn't continue it: ${t?.message??t}`}finally{this.sending=null}}}continueBox(H){if(!this.transcript)return"";if(!this.mine(H))return e`<div class="muted">Only ${H.person??"the person who had it"} can continue this conversation.</div>`;let V=(this.transcript.messages??[]).filter(r=>r.role==="assistant"),M=String(V[V.length-1]?.text??"").trim().endsWith("?");return e`<form class="go-on" @submit=${r=>{r.preventDefault(),this.send(H,r.target)}}>
      <textarea name="text" rows="2" ?disabled=${!!this.sending} aria-label="Continue"
        placeholder=${M?"Hisho asked you something: answer it here":"Continue this conversation"}
        @keydown=${r=>{r.key==="Enter"&&!r.shiftKey&&(r.preventDefault(),this.send(H,r.target.form))}}></textarea>
      <button class="act" type="submit" ?disabled=${!!this.sending}>${this.sending?"Asking\u2026":"Continue"}</button>
    </form>`}source(H){return[H.person??"someone",H.area].filter(Boolean).join(" \xB7 ")+(H.via==="service"?" (automation)":"")}messages(){let H=this.transcript;return H?e`<div class="talk">${(H.messages??[]).map(V=>V.role==="user"?e`<div class="q"><span class="muted">${_5(V.at,this.timezone)}${V.area?` \xB7 ${V.area}`:""}</span>
          <div class="text">${V.text}</div></div>`:e`<div class="a ${V.ok===!1?"failed":""}"><div class="text">${V.text||V.error||"(no answer)"}</div>
          <span class="muted">${[V.model,V.seconds!==void 0?`${V.seconds} s`:"",V.ok===!1&&V.error?V.error:""].filter(Boolean).join(" \xB7 ")}</span></div>`)}
      ${this.sending?e`<div class="q"><div class="text">${this.sending}</div></div>
        <div class="a"><div class="text">Hisho is thinking…</div></div>`:""}</div>`:e`<div class="empty">Loading…</div>`}body(){let H=[...new Set(this.list.map(M=>M.person??"someone"))].sort(),V=this.person?this.list.filter(M=>(M.person??"someone")===this.person):this.list;return this.frame(e`
      <style>
        .talk { display: flex; flex-direction: column; gap: 6px; padding: 4px 0 2px; }
        .talk .q, .talk .a { border-radius: var(--hisho-radius); padding: 6px 9px; max-width: 85%; }
        .talk .text { white-space: pre-wrap; }
        .talk .q { align-self: flex-end; background: color-mix(in srgb, var(--hisho-decide) 14%, transparent); }
        .talk .a { align-self: flex-start; background: var(--hisho-soft); }
        .talk .a.failed { border-left: 3px solid var(--hisho-crit); }
        .talk .muted { display: block; font-size: 0.76em; margin-top: 2px; }
        select { font: inherit; font-size: 0.86em; padding: 2px 6px; border-radius: 6px; border: 1px solid var(--hisho-line);
          background: var(--hisho-glass, transparent); color: var(--primary-text-color); }
        li .open { cursor: pointer; }
        .go-on { display: flex; gap: 8px; align-items: flex-end; margin-top: 4px; }
        .go-on textarea { flex: 1; font: inherit; padding: 6px 9px; border-radius: var(--hisho-radius); resize: vertical;
          border: 1px solid var(--hisho-line); background: var(--hisho-glass, transparent); color: var(--primary-text-color); }
      </style>
      <div class="head">${this.heading("Conversations")}
        <span class="row" style="flex-wrap:nowrap">
          ${H.length>1?e`<select aria-label="Person" @change=${M=>this.person=M.target.value}>
            <option value="">Everyone</option>
            ${H.map(M=>e`<option value=${M} ?selected=${M===this.person}>${M}</option>`)}</select>`:""}
          <button class="act" ?disabled=${this.loading} @click=${()=>this.load()}>Refresh</button></span></div>
      ${this.error?e`<div class="detail" style="color:var(--hisho-crit)">${this.error}</div>`:""}
      ${!V.length&&!this.loading&&!this.error?e`<div class="empty">
        No conversations with Hisho in the last ${this.keepDays} days.</div>`:""}
      <ul class="list">${V.map(M=>e`<li>
        <div class="row spread open" @click=${()=>this.toggle(M.session_id)}>
          <span class="grow ellipsis"><span class="chev ${this.open===M.session_id?"open":""}">▶</span>
            ${M.title||"(no question)"}</span>
          <span class="muted num" style="flex:none">${_5(M.updated,this.timezone)}</span></div>
        <div class="row spread"><span class="muted ellipsis">${this.source(M)} · ${(M.messages??0)/2|0} Q</span>
          <button class="act danger" @click=${()=>this.forget(M)}>Delete</button></div>
        ${this.open===M.session_id?e`${this.messages()}${this.continueBox(M)}`:""}
      </li>`)}</ul>
      <div class="muted" style="margin-top:8px">Everything people asked Hisho through Home Assistant, kept
        ${this.keepDays} days${this.timezone?e`; times in ${this.timezone.replace(/_/g," ")}`:""}.</div>
    `)}};var O3=864e5,b3="#8a8f98";function k3(L,C,H){let V=/(?:^|\n)Company: (.+)/.exec(L.description??"")?.[1]?.trim()??"",M=/^\S+\s+([^:]+):\s+(.*)$/u.exec(L.summary),r=V||(M&&M[1]in C?M[1]:""),t=M&&M[1]===r?M[2]:L.summary,i=!!L.start.date,a=i?new Date(`${L.start.date}T12:00:00`):new Date(L.start.dateTime??""),d=i?L.start.date:a.toLocaleDateString("en-CA"),A=i?"all day":a.toLocaleTimeString(H,{hour:"numeric",minute:"2-digit"});return{day:d,time:A,title:t,company:r,color:C[r]??b3,due:/Hisho due date/.test(L.description??""),place:L.location??""}}var z1=class extends c{static{this.properties={...c.properties,events:{state:!0}}}static{this.styles=[R,B`
    .legend { display: flex; flex-wrap: wrap; gap: 6px 14px; margin: 2px 0 10px; font-size: 0.82em; color: var(--hisho-text-2); }
    .legend span { display: inline-flex; align-items: center; gap: 6px; }
    .sw { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
    .day { margin: 12px 0 4px; font-size: 0.78em; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
      color: var(--hisho-text-2); }
    .ev { display: grid; grid-template-columns: 4px 72px 1fr; gap: 10px; align-items: center; padding: 6px 0; cursor: pointer; }
    .bar { align-self: stretch; border-radius: 2px; }
    .t { font-size: 0.86em; color: var(--hisho-text-2); font-variant-numeric: tabular-nums; }
    .what { min-width: 0; }
    .what .n { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .what .s { font-size: 0.78em; color: var(--hisho-text-2); }
    .warn { color: var(--hisho-warn, #f0a020); font-size: 0.86em; margin: 4px 0; }
  `]}constructor(){super(),this.events=null}static getStubConfig(){return{type:"custom:hisho-calendar-card"}}calId(){return this.config.entity??x(Z(this.hass),"my_calendar")}updated(C){super.updated?.(C);let H=this.calId();if(!this.hass||!H||!this.hass.callApi)return;let V=this.hass.states[H],M=`${H}|${V?.last_changed}|${V?.state}|${JSON.stringify(V?.attributes?.companies??{})}`;if(M===this.seen)return;this.seen=M;let r=Number(this.config.days??14),t=new Date(new Date().setHours(0,0,0,0)),i=new Date(t.getTime()+r*O3);this.hass.callApi("GET",`calendars/${H}?start=${t.toISOString()}&end=${i.toISOString()}`).then(a=>this.events=a??[]).catch(()=>this.events=[])}body(){let C=this.calId(),H=C?this.hass.states[C]:n(this.hass,Z(this.hass),"my_calendar");if(!C||!H)return this.frame(e`${this.heading("My calendar")}<div class="empty">No calendar yet: Hisho's
        System/Config/Calendar.yaml lists your accounts.</div>`);let V=H.attributes.companies??{},M=H.attributes.problems??[],r=(this.events??[]).map(d=>k3(d,V,this.hass.locale?.language)),t=new Date().toLocaleDateString("en-CA"),i=d=>d<=t?"Today":new Date(`${d}T12:00:00`).toLocaleDateString(this.hass.locale?.language,{weekday:"long",month:"short",day:"numeric"}),a=[];for(let d of r){let A=d.day<t?t:d.day,o=a[a.length-1];o&&o[0]===A?o[1].push(d):a.push([A,[d]])}return this.frame(e`${this.heading("My calendar")}
      <div class="legend">${Object.entries(V).map(([d,A])=>e`<span><i class="sw" style="background:${A}"></i>${d}</span>`)}</div>
      ${M.map(d=>e`<div class="warn">⚠ Can't read ${d}</div>`)}
      ${this.events===null?e`<div class="empty">Loading…</div>`:a.length?a.map(([d,A])=>e`<div class="day">${i(d)}</div>
          ${A.map(o=>e`<div class="ev" @click=${()=>_(this,C)}>
            <span class="bar" style="background:${o.color}"></span><span class="t">${o.time}</span>
            <div class="what"><div class="n">${o.title}</div>
              <div class="s">${[o.company,o.due?"Hisho due date":"",o.place].filter(Boolean).join(" \xB7 ")}</div></div>
          </div>`)}`):e`<div class="empty">Nothing on your calendar in the next ${this.config.days??14} days.</div>`}`)}};function G(L){return{...L,card_mod:{style:K2}}}var z={grid_options:{columns:"full"}};function K(L,C){return{...L,type:"sections",max_columns:4,dense_section_placement:!0,sections:C.filter(H=>(Array.isArray(H)?H:H.cards).length).map(H=>Array.isArray(H)?{type:"grid",cards:H}:H)}}function K1(L,C,H,V){let M={action:"perform-action",perform_action:"button.press",target:{entity_id:L},...V?{confirmation:{text:V}}:{}};return G({type:"tile",entity:L,name:C,icon:H,tap_action:M,icon_tap_action:M})}function y3(L,C){let H=d=>x(C,d),V=d=>{let A=H(d);return A&&L.states[A]?A:void 0},M=[{type:"heading",heading:C.name.replace(/^Hashira Kocho /,"")+"'s PC"}];for(let[d,A]of[["parental_time_left","Time left today"],["parental_played_today","Played today"],["parental_signed_in","Signed in"]]){let o=V(d);o&&M.push(G({type:"tile",entity:o,name:A}))}let r=V("parental_lock"),t=V("parental_more"),i=V("parental_stop"),a=V("parental_off");return r&&M.push(K1(r,"Lock screen","mdi:lock")),t&&M.push(K1(t,"30 more minutes","mdi:timer-plus")),i&&M.push(K1(i,"Time's up for today","mdi:timer-off",`End ${C.name.replace(/^Hashira Kocho /,"")}'s play for today?`)),a&&M.push(K1(a,"Shut down","mdi:power",`Shut down ${C.name}?`)),{type:"grid",cards:M}}function w3(L){let C=x(L,"game_cache_used"),H=x(L,"game_cache_share_24h");if(!C&&!H)return;let V=`{% set d = state_attr('${C??H}', 'last_download') %}{% if d %}Newest download: **{{ d.pc }}**, {{ d.gb_from_cache }} GB from the cache and {{ d.gb_from_internet }} GB from the internet ({{ d.percent_from_cache if d.percent_from_cache is not none else '\u2013' }}% from the cache).{% else %}No game has gone through the cache yet: the first PC to download a game fills it, every PC after that gets it from here.{% endif %}`;return{type:"grid",cards:[{type:"heading",heading:"Game cache"},...C?[G({type:"tile",entity:C,name:"Used"})]:[],...H?[G({type:"tile",entity:H,name:"From the cache, last 24 h"})]:[],G({type:"markdown",content:V})]}}var N5=["Server","Vm","Storage","Device","Network"],B3={Server:"Servers",Vm:"Virtual machines",Storage:"Storage",Device:"Devices",Network:"Network"};function P3(L,C={}){let H=Z(L);if(!H)return{title:"Hisho",views:[{title:"Hisho",path:"hisho",icon:"mdi:server-network",cards:[{type:"markdown",content:"The **Hisho** integration is not set up yet: Settings \u203A Devices & services \u203A Add integration \u203A Hisho."}]}]};let V=P(L,"machine"),M=P(L,"box"),r=P(L,"addon"),t=x(H,"today"),i=x(H,"due_dates"),a=x(H,"my_calendar"),d=["phone","phone_alerts","clear_phone","hide_acked"].map(l=>x(H,l)).filter(l=>!!l),A=new Map;for(let l of M){let g=N5.includes(l.model)?l.model:"Device";A.set(g,[...A.get(g)??[],l.name])}let o=V.filter(l=>x(l,"parental_time_left")),p=w3(H),v=z2(C.background);return{title:"Hisho",views:[{title:"Overview",path:"overview",icon:"mdi:view-dashboard",type:"panel",cards:[{type:"custom:hisho-control-center-card"}]},K({title:"Machines",path:"machines",icon:"mdi:server"},[{type:"grid",column_span:4,cards:[{type:"custom:hisho-pulse-card",...z}]},...["souko_check","backup_last_good","approvals_waiting","logins_not_in_vault","trust_window"].some(l=>x(H,l))?[{type:"grid",column_span:4,cards:[{type:"custom:hisho-setup-card",...z}]}]:[],...V.map(l=>[{type:"custom:hisho-machine-card",machine:l.name}])]),K({title:"Devices",path:"devices",icon:"mdi:devices"},N5.filter(l=>A.has(l)).map(l=>({type:"grid",column_span:Math.min(4,A.get(l).length),cards:[{type:"heading",heading:B3[l]},...A.get(l).map(g=>({type:"custom:hisho-device-card",device:g}))]}))),K({title:"Add-ons",path:"addons",icon:"mdi:puzzle"},[...x(H,"addon_updates")?[{type:"grid",column_span:2,cards:[{type:"custom:hisho-store-card",...z}]}]:[],...r.map(l=>[{type:"custom:hisho-device-card",device:l.name}])]),...t||i||a?[K({title:"Today",path:"today",icon:"mdi:calendar-today"},[t?[G({type:"todo-list",entity:t,title:"Today"})]:[],a?{type:"grid",column_span:3,cards:[{type:"custom:hisho-calendar-card",...z}]}:i?{type:"grid",column_span:3,cards:[G({type:"calendar",entities:[i],initial_view:"dayGridMonth",title:"Due dates",...z})]}:[]])]:[],...o.length||p?[K({title:"Kids' PCs",path:"kids",icon:"mdi:human-child"},[...o.map(l=>y3(L,l)),...p?[p]:[]])]:[],K({title:"Projects",path:"projects",icon:"mdi:folder-multiple"},[{type:"grid",column_span:2,cards:[{type:"custom:hisho-projects-card",...z}]},{type:"grid",column_span:2,cards:[{type:"custom:hisho-jobs-card",title:"All jobs",limit:50,...z}]}]),K({title:"Conversations",path:"conversations",icon:"mdi:message-text-clock"},[{type:"grid",column_span:3,cards:[{type:"custom:hisho-conversations-card",...z}]}]),K({title:"Phone",path:"phone",icon:"mdi:cellphone-message"},[[G({type:"entities",title:"Hisho phone app",entities:d}),G({type:"markdown",content:"Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity."})]])].map(l=>({...l,background:v}))}}var j1=class extends HTMLElement{static async generate(C,H){return P3(H,C)}};var T3="0.12.0";y5();var W5=[["hisho-control-center-card",$1,"Hisho control center","Hisho's Overview in one wide card: your day, decisions, what Hisho is doing and did, Ask Hisho. Best in a panel view."],["hisho-pulse-card",G1,"Hisho pulse","Machines online, needs you, jobs, sync conflicts, with their last 24 hours."],["hisho-setup-card",U1,"Hisho setup","Check my Souko, last good backup, approvals waiting, logins not in the vault, the trust window (End now)."],["hisho-fleet-card",T1,"Hisho fleet","Every machine: state, readings, wake / park, maintenance."],["hisho-machine-card",D1,"Hisho machine","One machine in full: readings, services, its add-on buttons."],["hisho-needs-you-card",E1,"Hisho needs you","Hisho's needs-you list: acknowledge, snooze, investigate."],["hisho-device-card",_1,"Hisho device","A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],["hisho-addon-card",R1,"Hisho add-on card","An add-on's own overview card (Gov bids, Invoicing's Money): its rows, each linking to its page."],["hisho-jobs-card",N1,"Hisho jobs","Hisho's jobs: cancel, retry, clear."],["hisho-projects-card",W1,"Hisho projects","Active projects, what waits on you, open or archive."],["hisho-store-card",I1,"Hisho add-on store","Install, update, roll back or remove add-ons; repositories."],["hisho-calendar-card",z1,"Hisho calendar","Your calendar: every company's events and Hisho's due dates in one agenda, each in its company's colour."],["hisho-conversations-card",Q1,"Hisho conversations","What people asked Hisho through Home Assistant (30 days): who, where, when; open or delete one. Admins only."]];for(let[L,C]of W5)customElements.get(L)||customElements.define(L,C);customElements.get("ll-strategy-dashboard-hisho")||customElements.define("ll-strategy-dashboard-hisho",j1);var j=window;j.customCards=j.customCards||[];for(let[L,,C,H]of W5)j.customCards.some(V=>V.type===L)||j.customCards.push({type:L,name:C,description:H,preview:!1,documentationURL:"https://github.com/YepizTechJonathan/hisho-ha-cards"});j.customStrategies=j.customStrategies||[];j.customStrategies.some(L=>L.type==="hisho")||j.customStrategies.push({type:"hisho",strategyType:"dashboard",name:"Hisho",description:"A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects, conversations."});console.info(`%c HISHO-HA-CARDS %c ${T3} `,"background:#151515;color:#eee","background:#444;color:#fff");export{T3 as VERSION};
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
