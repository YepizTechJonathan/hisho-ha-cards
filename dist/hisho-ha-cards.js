var l1=globalThis,v1=l1.ShadowRoot&&(l1.ShadyCSS===void 0||l1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G1=Symbol(),x2=new WeakMap,Y=class{constructor(C,H,V){if(this._$cssResult$=!0,V!==G1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=C,this.t=H}get styleSheet(){let C=this.o,H=this.t;if(v1&&C===void 0){let V=H!==void 0&&H.length===1;V&&(C=x2.get(H)),C===void 0&&((this.o=C=new CSSStyleSheet).replaceSync(this.cssText),V&&x2.set(H,C))}return C}toString(){return this.cssText}},x1=L=>new Y(typeof L=="string"?L:L+"",void 0,G1),F=(L,...C)=>{let H=L.length===1?L[0]:C.reduce((V,M,r)=>V+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(M)+L[r+1],L[0]);return new Y(H,L,G1)},Z2=(L,C)=>{if(v1)L.adoptedStyleSheets=C.map(H=>H instanceof CSSStyleSheet?H:H.styleSheet);else for(let H of C){let V=document.createElement("style"),M=l1.litNonce;M!==void 0&&V.setAttribute("nonce",M),V.textContent=H.cssText,L.appendChild(V)}},Q1=v1?L=>L:L=>L instanceof CSSStyleSheet?(C=>{let H="";for(let V of C.cssRules)H+=V.cssText;return x1(H)})(L):L;var{is:Z5,defineProperty:s5,getOwnPropertyDescriptor:u5,getOwnPropertyNames:S5,getOwnPropertySymbols:c5,getPrototypeOf:h5}=Object,Z1=globalThis,s2=Z1.trustedTypes,O5=s2?s2.emptyScript:"",g5=Z1.reactiveElementPolyfillSupport,C1=(L,C)=>L,z1={toAttribute(L,C){switch(C){case Boolean:L=L?O5:null;break;case Object:case Array:L=L==null?L:JSON.stringify(L)}return L},fromAttribute(L,C){let H=L;switch(C){case Boolean:H=L!==null;break;case Number:H=L===null?null:Number(L);break;case Object:case Array:try{H=JSON.parse(L)}catch{H=null}}return H}},S2=(L,C)=>!Z5(L,C),u2={attribute:!0,type:String,converter:z1,reflect:!1,useDefault:!1,hasChanged:S2};Symbol.metadata??=Symbol("metadata"),Z1.litPropertyMetadata??=new WeakMap;var E=class extends HTMLElement{static addInitializer(C){this._$Ei(),(this.l??=[]).push(C)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(C,H=u2){if(H.state&&(H.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(C)&&((H=Object.create(H)).wrapped=!0),this.elementProperties.set(C,H),!H.noAccessor){let V=Symbol(),M=this.getPropertyDescriptor(C,V,H);M!==void 0&&s5(this.prototype,C,M)}}static getPropertyDescriptor(C,H,V){let{get:M,set:r}=u5(this.prototype,C)??{get(){return this[H]},set(e){this[H]=e}};return{get:M,set(e){let i=M?.call(this);r?.call(this,e),this.requestUpdate(C,i,V)},configurable:!0,enumerable:!0}}static getPropertyOptions(C){return this.elementProperties.get(C)??u2}static _$Ei(){if(this.hasOwnProperty(C1("elementProperties")))return;let C=h5(this);C.finalize(),C.l!==void 0&&(this.l=[...C.l]),this.elementProperties=new Map(C.elementProperties)}static finalize(){if(this.hasOwnProperty(C1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C1("properties"))){let H=this.properties,V=[...S5(H),...c5(H)];for(let M of V)this.createProperty(M,H[M])}let C=this[Symbol.metadata];if(C!==null){let H=litPropertyMetadata.get(C);if(H!==void 0)for(let[V,M]of H)this.elementProperties.set(V,M)}this._$Eh=new Map;for(let[H,V]of this.elementProperties){let M=this._$Eu(H,V);M!==void 0&&this._$Eh.set(M,H)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(C){let H=[];if(Array.isArray(C)){let V=new Set(C.flat(1/0).reverse());for(let M of V)H.unshift(Q1(M))}else C!==void 0&&H.push(Q1(C));return H}static _$Eu(C,H){let V=H.attribute;return V===!1?void 0:typeof V=="string"?V:typeof C=="string"?C.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(C=>this.enableUpdating=C),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(C=>C(this))}addController(C){(this._$EO??=new Set).add(C),this.renderRoot!==void 0&&this.isConnected&&C.hostConnected?.()}removeController(C){this._$EO?.delete(C)}_$E_(){let C=new Map,H=this.constructor.elementProperties;for(let V of H.keys())this.hasOwnProperty(V)&&(C.set(V,this[V]),delete this[V]);C.size>0&&(this._$Ep=C)}createRenderRoot(){let C=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Z2(C,this.constructor.elementStyles),C}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(C=>C.hostConnected?.())}enableUpdating(C){}disconnectedCallback(){this._$EO?.forEach(C=>C.hostDisconnected?.())}attributeChangedCallback(C,H,V){this._$AK(C,V)}_$ET(C,H){let V=this.constructor.elementProperties.get(C),M=this.constructor._$Eu(C,V);if(M!==void 0&&V.reflect===!0){let r=(V.converter?.toAttribute!==void 0?V.converter:z1).toAttribute(H,V.type);this._$Em=C,r==null?this.removeAttribute(M):this.setAttribute(M,r),this._$Em=null}}_$AK(C,H){let V=this.constructor,M=V._$Eh.get(C);if(M!==void 0&&this._$Em!==M){let r=V.getPropertyOptions(M),e=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:z1;this._$Em=M;let i=e.fromAttribute(H,r.type);this[M]=i??this._$Ej?.get(M)??i,this._$Em=null}}requestUpdate(C,H,V,M=!1,r){if(C!==void 0){let e=this.constructor;if(M===!1&&(r=this[C]),V??=e.getPropertyOptions(C),!((V.hasChanged??S2)(r,H)||V.useDefault&&V.reflect&&r===this._$Ej?.get(C)&&!this.hasAttribute(e._$Eu(C,V))))return;this.C(C,H,V)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(C,H,{useDefault:V,reflect:M,wrapped:r},e){V&&!(this._$Ej??=new Map).has(C)&&(this._$Ej.set(C,e??H??this[C]),r!==!0||e!==void 0)||(this._$AL.has(C)||(this.hasUpdated||V||(H=void 0),this._$AL.set(C,H)),M===!0&&this._$Em!==C&&(this._$Eq??=new Set).add(C))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(H){Promise.reject(H)}let C=this.scheduleUpdate();return C!=null&&await C,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[M,r]of this._$Ep)this[M]=r;this._$Ep=void 0}let V=this.constructor.elementProperties;if(V.size>0)for(let[M,r]of V){let{wrapped:e}=r,i=this[M];e!==!0||this._$AL.has(M)||i===void 0||this.C(M,void 0,r,i)}}let C=!1,H=this._$AL;try{C=this.shouldUpdate(H),C?(this.willUpdate(H),this._$EO?.forEach(V=>V.hostUpdate?.()),this.update(H)):this._$EM()}catch(V){throw C=!1,this._$EM(),V}C&&this._$AE(H)}willUpdate(C){}_$AE(C){this._$EO?.forEach(H=>H.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(C)),this.updated(C)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(C){return!0}update(C){this._$Eq&&=this._$Eq.forEach(H=>this._$ET(H,this[H])),this._$EM()}updated(C){}firstUpdated(C){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C1("elementProperties")]=new Map,E[C1("finalized")]=new Map,g5?.({ReactiveElement:E}),(Z1.reactiveElementVersions??=[]).push("2.1.2");var C2=globalThis,c2=L=>L,s1=C2.trustedTypes,h2=s1?s1.createPolicy("lit-html",{createHTML:L=>L}):void 0,y2="$lit$",W=`lit$${Math.random().toFixed(9).slice(2)}$`,w2="?"+W,f5=`<${w2}>`,Q=document,V1=()=>Q.createComment(""),L1=L=>L===null||typeof L!="object"&&typeof L!="function",H2=Array.isArray,k5=L=>H2(L)||typeof L?.[Symbol.iterator]=="function",K1=`[ 	
\f\r]`,H1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O2=/-->/g,g2=/>/g,U=RegExp(`>|${K1}(?:([^\\s"'>=/]+)(${K1}*=${K1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),f2=/'/g,k2=/"/g,B2=/^(?:script|style|textarea|title)$/i,V2=L=>(C,...H)=>({_$litType$:L,strings:C,values:H}),t=V2(1),e1=V2(2),H3=V2(3),z=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),b2=new WeakMap,G=Q.createTreeWalker(Q,129);function P2(L,C){if(!H2(L)||!L.hasOwnProperty("raw"))throw Error("invalid template strings array");return h2!==void 0?h2.createHTML(C):C}var b5=(L,C)=>{let H=L.length-1,V=[],M,r=C===2?"<svg>":C===3?"<math>":"",e=H1;for(let i=0;i<H;i++){let o=L[i],a,d,A=-1,p=0;for(;p<o.length&&(e.lastIndex=p,d=e.exec(o),d!==null);)p=e.lastIndex,e===H1?d[1]==="!--"?e=O2:d[1]!==void 0?e=g2:d[2]!==void 0?(B2.test(d[2])&&(M=RegExp("</"+d[2],"g")),e=U):d[3]!==void 0&&(e=U):e===U?d[0]===">"?(e=M??H1,A=-1):d[1]===void 0?A=-2:(A=e.lastIndex-d[2].length,a=d[1],e=d[3]===void 0?U:d[3]==='"'?k2:f2):e===k2||e===f2?e=U:e===O2||e===g2?e=H1:(e=U,M=void 0);let v=e===U&&L[i+1].startsWith("/>")?" ":"";r+=e===H1?o+f5:A>=0?(V.push(a),o.slice(0,A)+y2+o.slice(A)+W+v):o+W+(A===-2?i:v)}return[P2(L,r+(L[H]||"<?>")+(C===2?"</svg>":C===3?"</math>":"")),V]},M1=class L{constructor({strings:C,_$litType$:H},V){let M;this.parts=[];let r=0,e=0,i=C.length-1,o=this.parts,[a,d]=b5(C,H);if(this.el=L.createElement(a,V),G.currentNode=this.el.content,H===2||H===3){let A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(M=G.nextNode())!==null&&o.length<i;){if(M.nodeType===1){if(M.hasAttributes())for(let A of M.getAttributeNames())if(A.endsWith(y2)){let p=d[e++],v=M.getAttribute(A).split(W),x=/([.?@])?(.*)/.exec(p);o.push({type:1,index:r,name:x[2],strings:v,ctor:x[1]==="."?q1:x[1]==="?"?X1:x[1]==="@"?J1:q}),M.removeAttribute(A)}else A.startsWith(W)&&(o.push({type:6,index:r}),M.removeAttribute(A));if(B2.test(M.tagName)){let A=M.textContent.split(W),p=A.length-1;if(p>0){M.textContent=s1?s1.emptyScript:"";for(let v=0;v<p;v++)M.append(A[v],V1()),G.nextNode(),o.push({type:2,index:++r});M.append(A[p],V1())}}}else if(M.nodeType===8)if(M.data===w2)o.push({type:2,index:r});else{let A=-1;for(;(A=M.data.indexOf(W,A+1))!==-1;)o.push({type:7,index:r}),A+=W.length-1}r++}}static createElement(C,H){let V=Q.createElement("template");return V.innerHTML=C,V}};function j(L,C,H=L,V){if(C===z)return C;let M=V!==void 0?H._$Co?.[V]:H._$Cl,r=L1(C)?void 0:C._$litDirective$;return M?.constructor!==r&&(M?._$AO?.(!1),r===void 0?M=void 0:(M=new r(L),M._$AT(L,H,V)),V!==void 0?(H._$Co??=[])[V]=M:H._$Cl=M),M!==void 0&&(C=j(L,M._$AS(L,C.values),M,V)),C}var j1=class{constructor(C,H){this._$AV=[],this._$AN=void 0,this._$AD=C,this._$AM=H}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(C){let{el:{content:H},parts:V}=this._$AD,M=(C?.creationScope??Q).importNode(H,!0);G.currentNode=M;let r=G.nextNode(),e=0,i=0,o=V[0];for(;o!==void 0;){if(e===o.index){let a;o.type===2?a=new r1(r,r.nextSibling,this,C):o.type===1?a=new o.ctor(r,o.name,o.strings,this,C):o.type===6&&(a=new Y1(r,this,C)),this._$AV.push(a),o=V[++i]}e!==o?.index&&(r=G.nextNode(),e++)}return G.currentNode=Q,M}p(C){let H=0;for(let V of this._$AV)V!==void 0&&(V.strings!==void 0?(V._$AI(C,V,H),H+=V.strings.length-2):V._$AI(C[H])),H++}},r1=class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(C,H,V,M){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=C,this._$AB=H,this._$AM=V,this.options=M,this._$Cv=M?.isConnected??!0}get parentNode(){let C=this._$AA.parentNode,H=this._$AM;return H!==void 0&&C?.nodeType===11&&(C=H.parentNode),C}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(C,H=this){C=j(this,C,H),L1(C)?C===h||C==null||C===""?(this._$AH!==h&&this._$AR(),this._$AH=h):C!==this._$AH&&C!==z&&this._(C):C._$litType$!==void 0?this.$(C):C.nodeType!==void 0?this.T(C):k5(C)?this.k(C):this._(C)}O(C){return this._$AA.parentNode.insertBefore(C,this._$AB)}T(C){this._$AH!==C&&(this._$AR(),this._$AH=this.O(C))}_(C){this._$AH!==h&&L1(this._$AH)?this._$AA.nextSibling.data=C:this.T(Q.createTextNode(C)),this._$AH=C}$(C){let{values:H,_$litType$:V}=C,M=typeof V=="number"?this._$AC(C):(V.el===void 0&&(V.el=M1.createElement(P2(V.h,V.h[0]),this.options)),V);if(this._$AH?._$AD===M)this._$AH.p(H);else{let r=new j1(M,this),e=r.u(this.options);r.p(H),this.T(e),this._$AH=r}}_$AC(C){let H=b2.get(C.strings);return H===void 0&&b2.set(C.strings,H=new M1(C)),H}k(C){H2(this._$AH)||(this._$AH=[],this._$AR());let H=this._$AH,V,M=0;for(let r of C)M===H.length?H.push(V=new L(this.O(V1()),this.O(V1()),this,this.options)):V=H[M],V._$AI(r),M++;M<H.length&&(this._$AR(V&&V._$AB.nextSibling,M),H.length=M)}_$AR(C=this._$AA.nextSibling,H){for(this._$AP?.(!1,!0,H);C!==this._$AB;){let V=c2(C).nextSibling;c2(C).remove(),C=V}}setConnected(C){this._$AM===void 0&&(this._$Cv=C,this._$AP?.(C))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(C,H,V,M,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=C,this.name=H,this._$AM=M,this.options=r,V.length>2||V[0]!==""||V[1]!==""?(this._$AH=Array(V.length-1).fill(new String),this.strings=V):this._$AH=h}_$AI(C,H=this,V,M){let r=this.strings,e=!1;if(r===void 0)C=j(this,C,H,0),e=!L1(C)||C!==this._$AH&&C!==z,e&&(this._$AH=C);else{let i=C,o,a;for(C=r[0],o=0;o<r.length-1;o++)a=j(this,i[V+o],H,o),a===z&&(a=this._$AH[o]),e||=!L1(a)||a!==this._$AH[o],a===h?C=h:C!==h&&(C+=(a??"")+r[o+1]),this._$AH[o]=a}e&&!M&&this.j(C)}j(C){C===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,C??"")}},q1=class extends q{constructor(){super(...arguments),this.type=3}j(C){this.element[this.name]=C===h?void 0:C}},X1=class extends q{constructor(){super(...arguments),this.type=4}j(C){this.element.toggleAttribute(this.name,!!C&&C!==h)}},J1=class extends q{constructor(C,H,V,M,r){super(C,H,V,M,r),this.type=5}_$AI(C,H=this){if((C=j(this,C,H,0)??h)===z)return;let V=this._$AH,M=C===h&&V!==h||C.capture!==V.capture||C.once!==V.once||C.passive!==V.passive,r=C!==h&&(V===h||M);M&&this.element.removeEventListener(this.name,this,V),r&&this.element.addEventListener(this.name,this,C),this._$AH=C}handleEvent(C){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,C):this._$AH.handleEvent(C)}},Y1=class{constructor(C,H,V){this.element=C,this.type=6,this._$AN=void 0,this._$AM=H,this.options=V}get _$AU(){return this._$AM._$AU}_$AI(C){j(this,C)}};var y5=C2.litHtmlPolyfillSupport;y5?.(M1,r1),(C2.litHtmlVersions??=[]).push("3.3.3");var T2=(L,C,H)=>{let V=H?.renderBefore??C,M=V._$litPart$;if(M===void 0){let r=H?.renderBefore??null;V._$litPart$=M=new r1(C.insertBefore(V1(),r),r,void 0,H??{})}return M._$AI(L),M};var L2=globalThis,B=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let C=super.createRenderRoot();return this.renderOptions.renderBefore??=C.firstChild,C}update(C){let H=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(C),this._$Do=T2(H,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};B._$litElement$=!0,B.finalized=!0,L2.litElementHydrateSupport?.({LitElement:B});var w5=L2.litElementPolyfillSupport;w5?.({LitElement:B});(L2.litElementVersions??=[]).push("4.2.2");var B5="/hisho_static/forest.jpg";function F2(L=B5){return`${L?`linear-gradient(rgba(6, 10, 7, 0.22), rgba(6, 10, 7, 0.5)), url("${L}") center / cover no-repeat, `:""}linear-gradient(180deg, #0a110d 0%, #1b2219 45%, #4a3a27 62%, #121a13 80%, #0a100b 100%) fixed`}var R2="ha-card { background: rgba(14, 20, 16, 0.6); backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%); border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 22px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35); --primary-text-color: #eef0ea; --secondary-text-color: #a7ae9f; --divider-color: rgba(255, 255, 255, 0.08); --primary-color: #5f9e74; --card-background-color: transparent; --ha-card-background: transparent; }",X=F`
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
  .switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.86em; }
  .switch input { accent-color: var(--hisho-accent); width: 15px; height: 15px; }
  .kv { display: grid; grid-template-columns: auto 1fr; gap: 3px 12px; font-size: 0.84em; }
  .kv > span:nth-child(odd) { color: var(--hisho-text-2); }
  .kv > span:nth-child(even) { text-align: right; font-variant-numeric: tabular-nums; }
  .chev { transition: transform 0.2s; color: var(--hisho-text-2); flex: none; display: inline-flex; }
  .chev svg { width: 18px; height: 18px; fill: currentColor; }
  .chev.open { transform: rotate(90deg); }
`;function b(L){switch(L){case"up":case"on":case"ok":case"running":case"active":case"done":return"ok";case"warn":case"maintenance":case"away":case"needs_setup":case"blocked":case"queued":case"routed":return"warn";case"faulted":case"unreachable":case"problem":case"down":case"error":case"failed":case"critical":return"bad";case"decision":return"decide";default:return"off"}}function u1(L){let C=L===void 0?NaN:parseFloat(L);return Number.isFinite(C)?Math.max(0,Math.min(100,C)):void 0}var P5=[["machines_online","hub"],["machine_state","machine"],["box_state","box"],["addon_status","addon"]],D2=new WeakMap;function M2(L){let C=D2.get(L.entities??{});if(C&&C.devices===L.devices)return C.list;let H=T5(L);return L.entities&&D2.set(L.entities,{devices:L.devices,list:H}),H}function $2(L){return M2(L).flatMap(C=>Object.values(C.entities).flat())}function T5(L){let C=new Map;for(let V of Object.values(L.entities||{})){if(V.platform!=="hisho"||!V.device_id||!V.translation_key)continue;let M=C.get(V.device_id)??{};(M[V.translation_key]??=[]).push(V.entity_id),C.set(V.device_id,M)}let H=[];for(let[V,M]of C){let r=P5.find(([i])=>i in M)?.[1];if(!r)continue;let e=L.devices?.[V];H.push({id:V,name:e?.name_by_user||e?.name||V,kind:r,model:e?.model||"",entities:M})}return H.sort((V,M)=>V.name.localeCompare(M.name))}function N(L,C){return M2(L).filter(H=>H.kind===C)}function O(L){return N(L,"hub")[0]}function t1(L,C,H){if(!C)return;let V=C.toLowerCase();return M2(L).find(M=>(!H||M.kind===H)&&(M.id===C||M.name.toLowerCase()===V))}function S(L,C){return L?.entities[C]?.[0]}function n(L,C,H){let V=S(C,H);return V?L.states[V]:void 0}function I(L,C,H){return(C?.entities[H]??[]).map(V=>L.states[V]).filter(V=>!!V)}function w(L){return!!L&&L.state!=="unavailable"&&L.state!=="unknown"}function y(L){let C=n(L,O(L),"actions_allowed");return new Set(C?.attributes.allowed??[])}function K(L,C){let H=L?.attributes.friendly_name??"",V=C?C.name+" ":"";return H.startsWith(V)?H.slice(V.length):H}var u=class extends B{static{this.properties={hass:{attribute:!1},config:{attribute:!1}}}static{this.styles=X}setConfig(C){if(!C)throw new Error("Invalid configuration");this.config=C}shouldUpdate(C){if(!C.has("hass")||C.size>1)return!0;let H=C.get("hass");return!H||H.entities!==this.hass.entities||H.devices!==this.hass.devices||H.user!==this.hass.user?!0:$2(this.hass).some(V=>H.states[V]!==this.hass.states[V])}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}frame(C){return this.config.embedded?t`<div class="embedded">${C}</div>`:t`<ha-card>${C}</ha-card>`}render(){return!this.hass||!this.config?t``:this.hass.user&&!this.hass.user.is_admin?t`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`:O(this.hass)?this.body():t`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`}heading(C){let H=this.config.title??C;return H?t`<div class="title">${H}</div>`:t``}};var r2=class extends B{static{this.properties={text:{},open:{type:Boolean,reflect:!0}}}static{this.styles=F`
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
  `}ask(C){return this.text=C,this.open=!0,new Promise(H=>this.resolve=H)}done(C){this.open=!1,this.resolve?.(C),this.resolve=void 0}render(){return t`<div class="box" role="alertdialog" aria-modal="true">
      <p>${this.text}</p>
      <div class="row">
        <button @click=${()=>this.done(!1)}>Cancel</button>
        <button class="yes" @click=${()=>this.done(!0)}>Yes</button>
      </div>
    </div>`}};customElements.get("hisho-confirm")||customElements.define("hisho-confirm",r2);function S1(L,C){let H=L.shadowRoot??L,V=H.querySelector("hisho-confirm");return V||(V=document.createElement("hisho-confirm"),H.appendChild(V)),V.ask(C)}async function l(L,C,H,V="",M={},r){return r&&!await S1(L,r)?!1:(await C.callService("hisho","run_action",{action:H,target:V,args:M,confirm:!!r}),!0)}async function R(L,C,H,V,M){return M&&!await S1(L,M)?!1:(await C.callService("switch",V?"turn_on":"turn_off",{},{entity_id:H}),!0)}async function E2(L,C,H,V){return V&&!await S1(L,V)?!1:(await C.callService("button","press",{},{entity_id:H}),!0)}function D(L,C){L.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}function Z(L,C="i"){return t`<svg class=${C} viewBox="0 0 24 24" aria-hidden="true">${e1`<path d=${L}></path>`}</svg>`}function c1(L,C){let V=2*Math.PI*22,M=V*.75,r=C>=95?"var(--hisho-crit)":C>=85?"var(--hisho-warn)":"var(--hisho-accent-text)";return t`<div class="ring" title="${L} ${Math.round(C)}%">
    <svg viewBox="0 0 56 56">${e1`
      <circle class="track" cx="28" cy="28" r=${22} fill="none" stroke-width="4.5" stroke-linecap="round"
        stroke-dasharray="${M} ${V}" transform="rotate(135 28 28)"></circle>
      <circle class="val" cx="28" cy="28" r=${22} fill="none" stroke-width="4.5" stroke-linecap="round" style="color:${r}"
        stroke=${r} stroke-dasharray="${M} ${V}" stroke-dashoffset=${M*(1-C/100)}
        transform="rotate(135 28 28)"></circle>`}
    </svg>
    <span class="rv">${Math.round(C)}<small>%</small></span><span class="rl">${L}</span>
  </div>`}function e2(L,C=new Date){let H=L.config?.time_zone,V=M=>new Intl.DateTimeFormat("en-US",{...M,timeZone:H}).format(C);return{hour:Number(V({hour:"numeric",hourCycle:"h23"}))%24,time:V({hour:"numeric",minute:"2-digit"}),date:V({weekday:"long",month:"long",day:"numeric"})}}function N2(L,C=new Date){let{hour:H}=e2(L,C),V=H<5?"Good night":H<12?"Good morning":H<18?"Good afternoon":H<22?"Good evening":"Good night",M=L.user?.name?.split(" ")[0];return M?`${V}, ${M}.`:`${V}.`}function t2(L){let C=window.location.pathname.split("/")[1]??"";window.history.pushState(null,"",`/${C}/${L}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}var I2=5*6e4,W2=new Map;function F5(L,C,H=24,V=48,M=Date.now()){let r=`${C}|${H}|${V}`,e=W2.get(r);if(e&&M-e.at<I2)return e.points;let i=M-H*36e5,o=L.callWS({type:"history/history_during_period",start_time:new Date(i).toISOString(),end_time:new Date(M).toISOString(),entity_ids:[C],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}).then(a=>R5((a?.[C]??[]).map(d=>[d.lu*1e3,parseFloat(d.s)]).filter(([,d])=>Number.isFinite(d)),i,M,V)).catch(()=>[]);return W2.set(r,{at:M,points:o}),o}function R5(L,C,H,V){if(!L.length)return[];let M=[],r=0,e=L[0][1];for(let i=1;i<=V;i++){let o=C+(H-C)*i/V;for(;r<L.length&&L[r][0]<=o;)e=L[r++][1];M.push(e)}return M}function D5(L,C,H){let V=C??Math.min(...L),r=(H??Math.max(...L))-V||1,e=L.map((o,a)=>[a/Math.max(1,L.length-1)*100,30-(o-V)/r*24-2]),i=`M${e[0][0]},${e[0][1]}`;for(let o=0;o<e.length-1;o++){let a=e[o-1]??e[o],d=e[o],A=e[o+1],p=e[o+2]??A;i+=` C${d[0]+(A[0]-a[0])/6},${d[1]+(A[1]-a[1])/6} ${A[0]-(p[0]-d[0])/6},${A[1]-(p[1]-d[1])/6} ${A[0]},${A[1]}`}return{line:i,area:`${i} L100,30 L0,30 Z`}}var $5=0,i2=class extends B{constructor(){super();this.gradId=`hs${++$5}`;this.fetched=0;this.hours=24,this.points=[],this.tone="var(--hisho-accent-text, #8cc7a1)"}static{this.properties={hass:{attribute:!1},entity:{},hours:{type:Number},tone:{},min:{type:Number},max:{type:Number},points:{state:!0}}}static{this.styles=F`
    :host { display: block; height: 46px; pointer-events: none; }
    svg { width: 100%; height: 100%; display: block; }
  `}willUpdate(H){this.hass&&this.entity&&(H.has("entity")||Date.now()-this.fetched>I2)&&(this.fetched=Date.now(),F5(this.hass,this.entity,this.hours).then(V=>this.points=V))}render(){if(this.points.length<2)return t``;let{line:H,area:V}=D5(this.points,this.min,this.max);return t`<svg viewBox="0 0 100 30" preserveAspectRatio="none">${e1`
      <defs><linearGradient id=${this.gradId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.tone} stop-opacity="0.32"></stop>
        <stop offset="1" stop-color=${this.tone} stop-opacity="0"></stop></linearGradient></defs>
      <path d=${V} fill="url(#${this.gradId})"></path>
      <path d=${H} fill="none" stroke=${this.tone} stroke-width="1.6" vector-effect="non-scaling-stroke"
        stroke-linejoin="round" stroke-linecap="round"></path>`}</svg>`}};customElements.get("hisho-spark")||customElements.define("hisho-spark",i2);var _2="M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14M17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12M17,10A7,7 0 0,1 24,17A7,7 0 0,1 17,24C14.21,24 11.8,22.36 10.67,20H1V17C1,14.34 6.33,13 9,13C9.6,13 10.34,13.07 11.12,13.2C12.36,11.28 14.53,10 17,10M10,17C10,16.3 10.1,15.62 10.29,15C9.87,14.93 9.43,14.9 9,14.9C6.03,14.9 2.9,16.36 2.9,17V18.1H10.09C10.03,17.74 10,17.37 10,17M9,4A4,4 0 0,1 13,8A4,4 0 0,1 9,12A4,4 0 0,1 5,8A4,4 0 0,1 9,4M9,5.9A2.1,2.1 0 0,0 6.9,8A2.1,2.1 0 0,0 9,10.1A2.1,2.1 0 0,0 11.1,8A2.1,2.1 0 0,0 9,5.9Z";var U2="M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M9,11H12.63L9,15.2V17H15V15H11.37L15,10.8V9H9V11Z";var h1="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";var G2="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7";var Q2="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";var z2="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var K2="M11,17V7H4V17H11M11,3A2,2 0 0,1 13,5V19A2,2 0 0,1 11,21H4C2.89,21 2,20.1 2,19V5A2,2 0 0,1 4,3H11M16.5,3H21.5A1.5,1.5 0 0,1 23,4.5V7.5A1.5,1.5 0 0,1 21.5,9H18L15,12V9L15,4.5A1.5,1.5 0 0,1 16.5,3Z";var j2="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var i1="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z";var q2="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z";var O1="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";var X2="M13 19C13 19.34 13.04 19.67 13.09 20H6.5C5 20 3.69 19.5 2.61 18.43C1.54 17.38 1 16.09 1 14.58C1 13.28 1.39 12.12 2.17 11.1S4 9.43 5.25 9.15C5.67 7.62 6.5 6.38 7.75 5.43S10.42 4 12 4C13.95 4 15.6 4.68 16.96 6.04C18.32 7.4 19 9.05 19 11C20.15 11.13 21.1 11.63 21.86 12.5C22.37 13.07 22.7 13.71 22.86 14.42C21.82 13.54 20.5 13 19 13C18.89 13 18.79 13 18.68 13C18.62 13 18.56 13 18.5 13H17V11C17 9.62 16.5 8.44 15.54 7.46C14.56 6.5 13.38 6 12 6S9.44 6.5 8.46 7.46C7.5 8.44 7 9.62 7 11H6.5C5.53 11 4.71 11.34 4.03 12.03C3.34 12.71 3 13.53 3 14.5S3.34 16.29 4.03 17C4.71 17.66 5.53 18 6.5 18H13.09C13.04 18.33 13 18.66 13 19M17.75 19.43L16.16 17.84L15 19L17.75 22L22.5 17.25L21.34 15.84L17.75 19.43Z";var J2="M19.8 22.6L17.15 20H6.5Q4.2 20 2.6 18.4T1 14.5Q1 12.58 2.19 11.08 3.38 9.57 5.25 9.15 5.33 8.95 5.4 8.76 5.5 8.57 5.55 8.35L1.4 4.2L2.8 2.8L21.2 21.2M6.5 18H15.15L7.1 9.95Q7.05 10.23 7.03 10.5 7 10.73 7 11H6.5Q5.05 11 4.03 12.03 3 13.05 3 14.5 3 15.95 4.03 17 5.05 18 6.5 18M11.13 14M21.6 18.75L20.15 17.35Q20.58 17 20.79 16.54 21 16.08 21 15.5 21 14.45 20.27 13.73 19.55 13 18.5 13H17V11Q17 8.93 15.54 7.46 14.08 6 12 6 11.33 6 10.7 6.16 10.07 6.33 9.5 6.68L8.05 5.23Q8.93 4.63 9.91 4.31 10.9 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 16.5 22.63 17.31 22.25 18.15 21.6 18.75M14.83 12.03Z";var Y2="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z";var g1="M11.7 20H11.3L10.9 17.4C9.7 17.2 8.7 16.5 7.9 15.6L5.5 16.6L4.7 15.3L6.8 13.7C6.4 12.5 6.4 11.3 6.8 10.1L4.7 8.7L5.5 7.4L7.9 8.4C8.7 7.5 9.7 6.9 10.9 6.6L11.2 4H12.7L13.1 6.6C14.3 6.8 15.4 7.5 16.1 8.4L18.5 7.4L19.3 8.7L17.2 10.2C17.4 10.8 17.5 11.4 17.5 12H18C18.5 12 19 12.1 19.5 12.2V12L19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11L4.5 12L4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C12.1 21.4 11.9 20.7 11.7 20M16 12.3V12C16 9.8 14.2 8 12 8S8 9.8 8 12C8 14.2 9.8 16 12 16C12.7 14.3 14.2 12.9 16 12.3M10 12C10 10.9 10.9 10 12 10S14 10.9 14 12 13.1 14 12 14 10 13.1 10 12M18 14.5V13L15.8 15.2L18 17.4V16C19.4 16 20.5 17.1 20.5 18.5C20.5 18.9 20.4 19.3 20.2 19.6L21.3 20.7C22.5 18.9 22 16.4 20.2 15.2C19.6 14.7 18.8 14.5 18 14.5M18 21C16.6 21 15.5 19.9 15.5 18.5C15.5 18.1 15.6 17.7 15.8 17.4L14.7 16.3C13.5 18.1 14 20.6 15.8 21.8C16.5 22.2 17.2 22.5 18 22.5V24L20.2 21.8L18 19.5V21Z";var C5="M22,18H17A1,1 0 0,1 16,17V7A1,1 0 0,1 17,6H22A1,1 0 0,1 23,7V17A1,1 0 0,1 22,18M22,8H17V9H22V8M22,10H17V11H22V10M9,15V17H10V18H5V17H6V15H2A1,1 0 0,1 1,14V7A1,1 0 0,1 2,6H13A1,1 0 0,1 14,7V14A1,1 0 0,1 13,15H9M12,8H3V13H12V8Z";var H5="M2 7H4.5V17H3V8.5H2M22 7V16H14V17H7V16H6V7M10 9H8V12H10M13 9H11V12H13M20 9H15V14H20V9Z";var V5="M20 17H22V15H20V17M20 7V13H22V7M4 2C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H16C17.11 22 18 21.11 18 20V8L12 2M4 4H11V9H16V20H4Z";var L5="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z";var o2="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var M5="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";var r5="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var e5="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var A2="M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z";var f1="M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z";var t5="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z",i5="M11,13H13V7H11M21,4H15V10L17.24,7.76C18.32,8.85 19,10.34 19,12C19,14.61 17.33,16.83 15,17.65V19.74C18.45,18.85 21,15.73 21,12C21,9.79 20.09,7.8 18.64,6.36M11,17H13V15H11M3,12C3,14.21 3.91,16.2 5.36,17.64L3,20H9V14L6.76,16.24C5.68,15.15 5,13.66 5,12C5,9.39 6.67,7.17 9,6.35V4.26C5.55,5.15 3,8.27 3,12Z";var a2="M6,2V8H6V8L10,12L6,16V16H6V22H18V16H18V16L14,12L18,8V8H18V2H6M16,16.5V20H8V16.5L12,12.5L16,16.5M12,11.5L8,7.5V4H16V7.5L12,11.5Z";var k1="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var E5=[[/gpu/i,H5],[/workstation|desktop/i,C5],[/control|core/i,f1],[/tools|nas|storage/i,A2]];function d2(L){return E5.find(([C])=>C.test(L.model))?.[1]??A2}function N5(L){let C=S(L,"gpu_usage"),H=S(L,"memory_usage");return/gpu/i.test(L.model)&&C?[C,"GPU"]:H?[H,"Memory"]:C?[C,"GPU"]:void 0}function p2(L,C){let H=L.hass,V=n(H,C,"machine_state"),M=n(H,C,"online"),r=n(H,C,"awake"),e=V?.attributes.power??[],i=y(H),o=V?.attributes.machine??C.name,a=S(C,"maintenance"),d=a?H.states[a]?.state==="on":!1,A=L.expanded.has(C.id),p=M?.state==="on",v=w(r)?r.state:V?.attributes.reason&&!p?String(V.attributes.reason):V?.attributes.role??"",x=d?"brown":b(V?.state),f=(c,T)=>{let $=n(H,C,c);return w($)?t`<span>${T}</span><span>${$.state}${$.attributes.unit_of_measurement?" "+$.attributes.unit_of_measurement:""}</span>`:""},m=I(H,C,"service"),s=m.filter(c=>c.state!=="on").length,k=[["Mem","memory_usage"],["Disk","disk_usage"],["GPU","gpu_usage"]].map(([c,T])=>[c,u1(n(H,C,T)?.state)]).filter(c=>c[1]!==void 0),P=N5(C);return t`<div class="tile mtile ${x} ${p?"":"asleep"}">
    <div class="mhead" @click=${()=>L.flip(C.id)}>
      <span class="bubble ${p?x==="ok"?"accent":x:"off"}">${Z(d2(C),"")}</span>
      <span class="grow"><span class="name">${C.name}</span>${v?t`<span class="muted ellipsis sub">${v}</span>`:""}</span>
      <span class="chip ${x}">${d?"maintenance":V?.state??"unknown"}</span>
      <span class="chev ${A?"open":""}">${Z(O1,"")}</span>
    </div>
    ${k.length?t`<div class="rings">${k.map(([c,T])=>c1(c,T))}</div>`:""}
    ${A?t`<div class="kv">
        ${f("jobs_running","Jobs running")} ${f("jobs_queued","Jobs queued")}
        ${f("containers_running","Containers")} ${f("sync_connected","Sync")}
        ${m.length?t`<span>Services</span><span>${m.length-s} of ${m.length} running</span>`:""}
      </div>`:""}
    <div class="row acts">
      ${e.includes("wake")&&i.has("machine.wake")?t`<button class="act" @click=${()=>l(L,H,"machine.wake",o)}>${Z(r5,"")}Wake</button>`:""}
      ${e.includes("park")&&i.has("machine.park")?t`<button class="act danger" @click=${()=>l(L,H,"machine.park",o,{},`Park ${C.name}? It powers off until something needs it.`)}>${Z(e5,"")}Park</button>`:""}
      ${a?t`<button class="act ${d?"brown":""}" title="Maintenance holds its alerts and auto-park"
          @click=${()=>R(L,H,a,!d,d?void 0:`Put ${C.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${Z(k1,"")}${d?"End maintenance":"Maintenance"}</button>`:""}
      ${A&&V?t`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${()=>D(L,V.entity_id)}>History…</button>`:""}
    </div>
    ${P?t`<div class="sparkwrap"><span class="sparkl">${P[1]} · 24 h</span>
      <hisho-spark .hass=${H} .entity=${P[0]} .min=${0} .max=${100}
        .tone=${x==="bad"?"var(--hisho-crit)":"var(--hisho-accent-text)"}></hisho-spark></div>`:""}
  </div>`}function W5(L,C){let H=L.hass.states[C]?.state==="on";return t`<label class="switch" title="Fleet maintenance">
    <input type="checkbox" .checked=${H}
      @change=${V=>{let M=V.target;R(L,L.hass,C,M.checked,M.checked?"Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.":void 0).then(r=>{r||(M.checked=H)})}} />Fleet maintenance</label>`}var b1=class extends u{static{this.properties={...u.properties,expanded:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-fleet-card"}}constructor(){super(),this.expanded=new Set}flip(C){let H=new Set(this.expanded);H.delete(C)||H.add(C),this.expanded=H}body(){let C=N(this.hass,"machine"),H=O(this.hass),V=n(this.hass,H,"machines_online"),M=S(H,"fleet_maintenance"),r=n(this.hass,H,"core_reachable");return this.frame(t`
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${r?.state==="off"?t`<span class="chip bad">Hisho Core unreachable</span>`:""}
          ${V?t`<span class="chip num">${V.state} of ${C.length} online</span>`:""}
          ${M?W5(this,M):""}
        </div>
      </div>
      <div class="grid">${C.map(e=>p2(this,e))}</div>
    `)}};var y1="M12.11 3.1C13.79 4.04 15.71 5.53 16.58 6.6L18.46 4.66C17.5 3.56 15.48 2.2 13.86 1.33ZM19.33 2.43C18.55 6.24 17.32 9.74 15.46 12.74V6.17H12.78V16.32C11.43 17.81 9.85 19.12 8.04 20.22C8.68 20.63 9.59 21.61 9.98 22.16C11.01 21.5 11.95 20.79 12.82 20.03C13.03 21.89 13.81 22.48 15.78 22.48C16.26 22.48 17.87 22.48 18.37 22.48C20.46 22.48 21.12 21.32 21.4 17.81C20.66 17.6 19.59 17.14 18.99 16.69C18.9 19.39 18.76 19.99 18.12 19.99C17.77 19.99 16.51 19.99 16.24 19.99C15.57 19.99 15.46 19.85 15.46 18.84V17.37C17.02 15.52 18.28 13.43 19.31 11.14C19.93 12.97 20.41 15.04 20.5 16.48L23 15.79C22.82 13.91 22.06 11.14 21.05 9.01L20.07 9.28C20.8 7.34 21.4 5.25 21.9 3.03ZM8.1 1.47C6.41 2.23 3.66 2.89 1.21 3.26C1.5 3.83 1.85 4.75 1.96 5.34C2.83 5.23 3.73 5.09 4.64 4.93V7.61H1.39V10.13H4.14C3.38 12.36 2.19 14.81 1 16.32C1.41 17.01 2.05 18.18 2.28 18.96C3.13 17.79 3.96 16.09 4.64 14.3V22.67H7.26V13.39C7.69 14.1 8.08 14.83 8.29 15.33L9.64 13.66C9.39 14.62 9.09 15.49 8.68 16.21L10.81 17.19C11.89 15.36 12.25 12.38 12.46 9.7L10.26 9.26C10.17 10.59 10.01 11.92 9.75 13.16C9.23 12.52 7.78 10.98 7.26 10.52V10.13H9.66V7.61H7.26V4.38C8.22 4.13 9.14 3.85 9.96 3.53Z",o5={kanji:y1};function A5(L,C=[]){for(let H of Array.from(L.querySelectorAll("*")))H.localName==="ha-icon"&&C.push(H),H.shadowRoot&&A5(H.shadowRoot,C);return C}async function I5(L=document){let C=A5(L).filter(H=>typeof H.icon=="string"&&H.icon.startsWith("hisho:"));for(let H of C){let V=H.icon;H._legacy=!1,H.icon=void 0,await H.updateComplete,H.icon=V}return C.length}function a5(L=window){if(L.customIcons=L.customIcons||{},L.customIcons.hisho={getIcon:async C=>({path:o5[C]??y1,viewBox:"0 0 24 24"}),getIconList:async()=>Object.keys(o5).map(C=>({name:C}))},typeof document<"u")for(let C of[0,1500,5e3])setTimeout(()=>{I5().catch(()=>{})},C)}var w1=class extends u{static{this.properties={...u.properties,expanded:{state:!0}}}static{this.styles=[X,F`
    ha-card {
      background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none;
      padding: clamp(14px, 3vw, 36px) clamp(12px, 3vw, 40px) 32px; max-width: 1680px; margin: 0 auto;
    }
    .glass {
      background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
      backdrop-filter: blur(20px) saturate(130%); -webkit-backdrop-filter: blur(20px) saturate(130%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .hero { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin: 4px 0 22px; }
    .when { font-size: 0.8em; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hisho-brown-text); font-weight: 600; }
    h1 { margin: 6px 0 6px; font-size: clamp(1.7em, 4.2vw, 2.9em); font-weight: 300; letter-spacing: -0.01em; line-height: 1.1;
      text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45); }
    .summary { margin: 0; color: var(--hisho-text); opacity: 0.86; font-size: 1.02em; max-width: 60ch; line-height: 1.45; }
    .seal { display: flex; align-items: center; gap: 12px; padding: 10px 16px 10px 10px; flex: none; }
    .seal .bubble { width: 46px; height: 46px; }
    .seal .bubble svg { width: 26px; height: 26px; }
    .seal b { display: block; font-size: 1.05em; }
    .seal small { color: var(--hisho-text-2); font-size: 0.82em; }

    .badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
    .badge {
      font: inherit; color: inherit; display: inline-flex; align-items: center; gap: 9px; padding: 6px 14px 6px 6px;
      border-radius: 999px; cursor: pointer; text-align: left;
    }
    .badge:hover { background: rgba(30, 40, 32, 0.75); }
    .badge b { display: block; font-size: 0.8em; font-weight: 600; }
    .badge small { display: block; font-size: 0.74em; color: var(--hisho-text-2); }
    .badge.on { border-color: color-mix(in srgb, var(--hisho-brown-text) 60%, transparent); }

    .live { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 18px; }
    .lt { position: relative; overflow: hidden; padding: 16px 18px 0; cursor: pointer; display: flex; flex-direction: column;
      min-height: 132px; transition: transform 0.15s, border-color 0.15s; }
    .lt:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.16); }
    .lt .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .lt .lv { font-size: 2.6em; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
    .lt .lv small { font-size: 0.42em; color: var(--hisho-text-2); margin-left: 3px; font-weight: 400; }
    .lt .ll { margin-top: 6px; font-size: 0.86em; font-weight: 500; }
    .lt .ls { font-size: 0.76em; color: var(--hisho-text-2); }
    .lt .bubble { width: 34px; height: 34px; } .lt .bubble svg { width: 19px; height: 19px; }
    .lt hisho-spark { margin: auto -18px 0; height: 44px; }
    .lt.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }

    .body { display: grid; grid-template-columns: minmax(0, 1.75fr) minmax(330px, 1fr); gap: 18px; align-items: start; }
    .panel { padding: 16px 18px 18px; min-width: 0; }
    .side { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
    .machines .grid { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 14px; }

    @container (max-width: 980px) { .live { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @container (max-width: 860px) {
      .body { grid-template-columns: 1fr; }
      .side { order: -1; }
      .seal { display: none; }
    }
    @container (max-width: 420px) { .lt .lv { font-size: 2.1em; } .badge small { display: none; } }
  `]}static getStubConfig(){return{type:"custom:hisho-control-center-card"}}constructor(){super(),this.expanded=new Set}connectedCallback(){super.connectedCallback(),this.clock=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.clock)}getGridOptions(){return{columns:"full",min_columns:12}}getCardSize(){return 12}flip(C){let H=new Set(this.expanded);H.delete(C)||H.add(C),this.expanded=H}body(){let C=this.hass,H=O(C),V=N(C,"machine"),M=n(C,H,"core_reachable"),r=n(C,H,"machines_online"),e=n(C,H,"machines_faulted"),i=n(C,H,"needs_you_count"),o=i?.attributes.alerts??[],a=o.filter(g=>g.severity==="critical").length,d=o.filter(g=>g.severity==="decision").length,A=n(C,H,"jobs_active"),p=A?.attributes.jobs??[],v=p.filter(g=>["queued","routed","running"].includes(g.status)).length,x=p.filter(g=>g.status==="failed").length,f=n(C,H,"sync_problem"),m=n(C,H,"sync_conflicts"),s=n(C,H,"projects_waiting"),k=S(H,"fleet_maintenance"),P=k?C.states[k]?.state==="on":!1,c=M?.state==="off",T=w(r)?Number(r.state):void 0,$=w(e)?Number(e.state):0,o1=w(m)?Number(m.state)||0:void 0,A1=o.length,a1=f?.state==="on",{time:n5,date:l5}=e2(C),d1=(g,W1,m1,I1,_1,U1,n1,v5="var(--hisho-accent-text)",x5)=>t`
      <div class="lt glass ${g}" @click=${()=>n1&&D(this,n1)}>
        <div class="top"><div><div class="lv">${W1}${m1?t`<small>${m1}</small>`:""}</div>
          <div class="ll">${I1}</div><div class="ls">${_1}</div></div>
          <span class="bubble ${g==="ok"?"accent":g||"brown"}">${Z(U1,"")}</span></div>
        ${n1?t`<hisho-spark .hass=${C} .entity=${n1} .min=${0} .max=${x5} .tone=${g==="bad"?"var(--hisho-crit)":v5}></hisho-spark>`:""}
      </div>`,p1=(g,W1,m1,I1,_1,U1="")=>t`
      <button class="badge glass ${U1}" @click=${_1}>
        <span class="bubble sm ${g}">${Z(W1,"")}</span><span><b>${m1}</b><small>${I1}</small></span></button>`;return this.frame(t`
      <div class="hero">
        <div>
          <div class="when">${l5} · ${n5}</div>
          <h1>${this.config.title??N2(C)}</h1>
          <p class="summary">${this.summary(c,T,V.length,$,A1,a,v,x,a1)}</p>
        </div>
        <div class="seal glass">
          <span class="bubble ${c?"bad":"accent"}">${Z(y1,"")}</span>
          <span><b>Hisho</b><small>${c?"Core unreachable":"Core answering"}</small></span>
        </div>
      </div>

      <div class="badges">
        ${p1(c?"bad":"accent",c?J2:X2,"Hisho Core",c?"Unreachable":"Up",()=>M&&D(this,M.entity_id))}
        ${p1(a1?"bad":"accent",a1?i5:t5,"Sync",a1?"Problem":"In sync",()=>f&&D(this,f.entity_id))}
        ${w(s)?p1(Number(s.state)?"brown":"accent",_2,"Projects",Number(s.state)?`${s.state} waiting on you`:"Nothing waiting",()=>t2("projects")):""}
        ${k?p1(P?"brown":"off",k1,"Fleet maintenance",P?"On: alerts held":"Off",()=>R(this,C,k,!P,P?void 0:"Put the whole fleet in maintenance? Alerts, auto-park and jobs are held."),P?"on":""):""}
      </div>

      <div class="live">
        ${d1($?"bad":T===V.length?"ok":"",T??"\u2013",`/${V.length}`,"Machines online",$?`${$} faulted`:V.length-(T??0)?`${V.length-(T??0)} parked or off`:"All up",f1,r?.entity_id,void 0,V.length)}
        ${d1(a?"bad":A1?"warn":"ok",A1,"","Needs you",a?`${a} critical`:d?`${d} to decide`:A1?"Nothing critical":"All clear",z2,i?.entity_id,"var(--hisho-brown-text)")}
        ${d1(x?"warn":"ok",v,"","Jobs running",x?`${x} failed`:`${p.length} recent`,g1,A?.entity_id)}
        ${d1(o1?"warn":"ok",o1??"\u2013","","Sync conflicts",o1?"Files to sort out":"None",o1?V5:q2,m?.entity_id,"var(--hisho-brown-text)")}
      </div>

      <div class="body">
        <section class="panel glass machines">
          <div class="head"><span class="title">Machines</span>
            <button class="more" @click=${()=>t2("machines")}>All machines ${Z(Q2,"")}</button></div>
          <div class="grid">${V.map(g=>p2(this,g))}</div>
        </section>
        <div class="side">
          <section class="panel glass">
            <hisho-needs-you-card .hass=${C} .config=${{type:"custom:hisho-needs-you-card",embedded:!0,compact:!0,limit:this.config.needs_you_limit??6}}></hisho-needs-you-card>
          </section>
          <section class="panel glass">
            <hisho-jobs-card .hass=${C} .config=${{type:"custom:hisho-jobs-card",embedded:!0,limit:this.config.jobs_limit??5}}></hisho-jobs-card>
          </section>
        </div>
      </div>
    `)}summary(C,H,V,M,r,e,i,o,a){if(C)return"Hisho Core isn't answering Home Assistant, so what you see here may be out of date.";let d=[];H!==void 0&&d.push(M?`${M} machine${M>1?"s":""} faulted`:`${H} of ${V} machines are up`),d.push(e?`${r} thing${r>1?"s":""} need${r>1?"":"s"} you (${e} critical)`:r?`${r} thing${r>1?"s":""} need${r>1?"":"s"} you`:"nothing needs you"),i&&d.push(`${i} job${i>1?"s":""} running`),o&&d.push(`${o} failed`),a&&d.push("sync has a problem");let A=d.join(", ");return A.charAt(0).toUpperCase()+A.slice(1)+"."}};var B1=class extends u{static getStubConfig(C){return{type:"custom:hisho-machine-card",machine:(C?Object.values(C.devices??{}).find(V=>V.model&&V.via_device_id):void 0)?.name??""}}setConfig(C){if(!C?.machine)throw new Error("Say which machine: machine: <name>");super.setConfig(C)}body(){let C=this.hass,H=t1(C,this.config.machine,"machine");if(!H)return t`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;let V=n(C,H,"machine_state"),M=V?.attributes.machine??H.name,r=y(C),e=V?.attributes.power??[],i=V?.attributes.items??[],o=I(C,H,"unit"),a=I(C,H,"restart_unit"),d=I(C,H,"service"),A=S(H,"maintenance"),p=(m,s)=>{let k=n(C,H,m);return w(k)?t`<div class="row spread"><span class="muted">${s}</span>
        <span>${k.state}${k.attributes.unit_of_measurement?" "+k.attributes.unit_of_measurement:""}</span></div>`:""},v=n(C,H,"online")?.state==="on",x=b(V?.state),f=[["Mem","memory_usage"],["Disk","disk_usage"],["GPU","gpu_usage"]].map(([m,s])=>[m,u1(n(C,H,s)?.state)]).filter(m=>m[1]!==void 0);return t`<ha-card>
      <div class="mhead" style="margin-bottom:14px">
        <span class="bubble ${v?x==="ok"?"accent":x:"off"}">${Z(d2(H),"")}</span>
        <span class="grow"><span class="name">${this.config.title??H.name}</span>
          ${V?.attributes.role?t`<span class="muted ellipsis sub">${V.attributes.role}</span>`:""}</span>
        <span class="chip ${x}">${V?.state??"unknown"}</span>
      </div>
      ${f.length?t`<div class="rings" style="margin-bottom:12px">${f.map(([m,s])=>c1(m,s))}</div>`:""}
      ${p("awake","Parking")} ${p("jobs_running","Jobs running")} ${p("jobs_queued","Jobs queued")}
      ${p("containers_running","Containers")} ${p("sync_connected","Sync")}
      <div class="row" style="margin-top:8px">
        ${e.includes("wake")&&r.has("machine.wake")?t`<button class="act" @click=${()=>l(this,C,"machine.wake",M)}>Wake</button>`:""}
        ${e.includes("park")&&r.has("machine.park")?t`<button class="act danger" @click=${()=>l(this,C,"machine.park",M,{},`Park ${H.name}? It powers off until something needs it.`)}>Park</button>`:""}
        ${A?t`<button class="act ${C.states[A]?.state==="on"?"":"danger"}" @click=${()=>{let m=C.states[A]?.state==="on";R(this,C,A,!m,m?void 0:`Put ${H.name} in maintenance? Its alerts are held and its VM shuts down.`)}}>${C.states[A]?.state==="on"?"End maintenance":"Maintenance"}</button>`:""}
      </div>
      ${d.length||o.length?t`<div class="eyebrow" style="margin-top:18px">Services</div>`:""}
      <ul class="list">
        ${d.map(m=>t`<li><div class="row spread"><span>${K(m,H)}</span>
          <span class="chip ${m.state==="on"?"ok":"bad"}">${m.state==="on"?"running":m.attributes.state??"stopped"}</span></div></li>`)}
        ${o.map(m=>{let s=K(m,H),k=a.find(c=>K(c,H)===`Restart ${s}`),P=m.state;return t`<li><div class="row spread"><span>${s}</span><span class="row">
            ${w(m)?t`<button class="act ${m.state==="on"?"danger":""}" @click=${()=>R(this,C,m.entity_id,m.state!=="on",m.state==="on"?`Stop ${s} on ${H.name}?`:void 0)}>
              ${m.state==="on"?"Stop":"Start"}</button>`:t`<span class="muted">${P}</span>`}
            ${k?t`<button class="act" @click=${()=>E2(this,C,k.entity_id)}>Restart</button>`:""}
          </span></div></li>`})}
      </ul>
      ${i.length?t`<div class="eyebrow" style="margin-top:18px">From add-ons</div>`:""}
      <ul class="list">${i.map(m=>t`<li>
        <div class="row spread"><span>${m.name}</span><span class="chip ${b(m.state)}">${m.state}</span></div>
        ${m.facts?.length?t`<div class="detail">${m.facts.join(" \xB7 ")}</div>`:""}
        ${r.has("device.press")&&m.actions?.length?t`<div class="row">${m.actions.map(s=>t`
          <button class="act ${s.danger?"danger":""}" @click=${()=>l(this,C,"device.press",m.addon,{entry:m.entry,item:m.id,action:s.id},s.danger?`${s.label}: ${m.name} on ${H.name}?`:void 0)}>${s.label}</button>`)}</div>`:""}
      </li>`)}</ul>
      <button class="link" style="margin-top:12px;font-size:0.86em" @click=${()=>V&&D(this,V.entity_id)}>History…</button>
    </ha-card>`}};var _5={critical:"bad",decision:"decide",warn:"warn",info:"off"},U5={critical:G2,decision:L5,warn:h1,info:o2},P1=class extends u{static{this.properties={...u.properties,items:{state:!0},showDone:{state:!0},expanded:{state:!0},showAll:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-needs-you-card"}}constructor(){super(),this.items=[],this.showDone=!1,this.expanded=new Set,this.showAll=!1}updated(C){super.updated(C);let H=S(O(this.hass),"needs_you"),V=H?this.hass.states[H]?.last_changed+"|"+this.hass.states[H]?.state:void 0;H&&V!==this.seen&&(this.seen=V,this.hass.callWS({type:"todo/item/list",entity_id:H}).then(M=>this.items=M.items??[]).catch(()=>this.items=[]))}body(){let C=this.hass,H=O(C),V=n(C,H,"needs_you_count")?.attributes.alerts??[],M=new Map(V.map(A=>[A.id,A.severity])),r=V.filter(A=>A.severity==="decision"&&/asks to connect/.test(A.title)),e=this.items.filter(A=>this.showDone||A.status==="needs_action"),i=this.items.filter(A=>A.status==="completed").length,o=this.config.limit??50,a=this.showAll?e:e.slice(0,o),d=y(C);return this.frame(t`
      <div class="head">${this.heading("Needs you")}
        <span class="row">${e.length?t`<span class="chip ${V.some(A=>A.severity==="critical")?"bad":"warn"} num">${e.filter(A=>A.status==="needs_action").length} open</span>`:""}
        ${i?t`<button class="act" @click=${()=>this.showDone=!this.showDone}>
          ${this.showDone?"Hide":"Show"} ${i} acknowledged</button>`:""}</span></div>
      ${r.map(A=>t`<div class="tile decide" style="margin-bottom:8px"><span class="row"><span class="chip decide">decide</span>
        <span>${A.title}</span></span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${e.length?"":t`<div class="empty">${Z(i1,"")}Nothing needs you right now.</div>`}
      <ul class="list">${a.map(A=>{let p=M.get(A.uid)??(A.description?.split(":")[0]||"").toLowerCase(),v=A.status==="completed",x=!this.config.compact||this.expanded.has(A.uid),f=v?"off":_5[p]??b(p);return t`<li class="item bubbled ${f}">
          <span class="bubble sm ${f}">${Z(U5[p]??o2,"")}</span>
          <div class="bodycol">
          <div class="row spread" style="cursor:${this.config.compact?"pointer":"default"}" @click=${()=>this.flip(A.uid)}>
            <span class="grow"><span class="summary ${this.config.compact&&!x?"ellipsis":""}">${A.summary}</span>
              <span class="chip ${f} plain sev">${v?"acknowledged":p||"alert"}</span></span>
            ${this.config.compact?t`<span class="chev ${x?"open":""}">${Z(O1,"")}</span>`:""}</div>
          ${x&&A.description?t`<div class="detail">${A.description.replace(/^[A-Z]+:\s*/,"")}</div>`:""}
          ${x&&d.has("alert.ack")?t`<div class="row">
            ${v?t`<button class="act" @click=${()=>this.alert(A.uid,"unack")}>Un-acknowledge</button>`:t`<button class="act primary" @click=${()=>this.alert(A.uid,"ack")}>${Z(j2,"")}Acknowledge</button>
                     <button class="act" @click=${()=>this.alert(A.uid,"snooze")}>${Z(U2,"")}Snooze 1 h</button>`}
            <button class="act" @click=${()=>this.alert(A.uid,"investigate")}>${Z(M5,"")}Investigate</button>
            <button class="act" @click=${()=>this.alert(A.uid,"notify")}>${Z(K2,"")}Send to phone</button>
          </div>`:""}
          </div>
        </li>`})}</ul>
      ${e.length>a.length||this.showAll?t`<button class="link" style="margin-top:6px;font-size:0.86em"
        @click=${()=>this.showAll=!this.showAll}>${this.showAll?"Show fewer":`Show all ${e.length}`}</button>`:""}
    `)}flip(C){if(!this.config.compact)return;let H=new Set(this.expanded);H.delete(C)||H.add(C),this.expanded=H}alert(C,H){return l(this,this.hass,`alert.${H}`,C,H==="snooze"?{hours:1}:{})}};function n2(L,C){let H=C??{};return Object.entries(L??{}).map(([V,M])=>{let r=M.endsWith("?"),e=M.replace(/\?$/,""),i=/^list\((.*)\)$/.exec(e);return{key:V,type:i?"list":e,optional:r,choices:i?i[1].split("|").map(o=>o.trim()).filter(Boolean):[],label:H[V]??V.replace(/_/g," ")}})}var m2=L=>L.type==="password"||L.type==="secret",G5=/^[A-Z][A-Z0-9_]{2,127}$/;function l2(L,C){let H=L.key;if(L.type==="bool")return t`<input type="checkbox" name=${H} .checked=${!!C} />`;if(L.type==="list")return t`<select name=${H}>${L.choices.map(r=>t`<option value=${r} ?selected=${r===C}>${r}</option>`)}</select>`;let V=L.type==="int"||L.type==="port"?"number":L.type==="url"?"url":"text",M=m2(L)?"secret's name, e.g. CLOUDFLARE_EXAMPLE_TOKEN":L.optional?"optional":"";return t`<input type=${V} name=${H} .value=${C??""} placeholder=${M}
    pattern=${m2(L)?"[A-Z][A-Z0-9_]{2,127}":".*"} />`}function v2(L,C,H={}){let V={};for(let M of C){let r=L.elements.namedItem(M.key);if(!r)continue;let e=r instanceof HTMLInputElement&&r.type==="checkbox"?r.checked:r.value.trim();if((M.type==="int"||M.type==="port")&&e!==""&&(e=Number(e)),m2(M)&&e&&!G5.test(e))return{values:V,error:`${M.label}: give the secret's name, not its value (paste values in Hisho's dashboard).`};e!==(H[M.key]??(M.type==="bool"?!1:""))&&(V[M.key]=e)}return{values:V}}var d5=`
  form.settings { display: grid; grid-template-columns: minmax(110px, 38%) 1fr; gap: 6px 10px; align-items: center; margin: 8px 0; }
  form.settings label { color: var(--secondary-text-color); font-size: 0.9em; overflow-wrap: anywhere; }
  form.settings input, form.settings select {
    font: inherit; padding: 4px 6px; border-radius: 6px; border: 1px solid var(--divider-color);
    background: var(--card-background-color); color: var(--primary-text-color); min-width: 0;
  }
  form.settings input[type=checkbox] { justify-self: start; }
  form.settings .full { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; }
  .error { color: var(--error-color, #db4437); font-size: 0.9em; }
`;var Q5=(L,C)=>y(L).has(C),T1=class extends u{static{this.properties={...u.properties,error:{state:!0}}}static{this.styles=[X,F`${x1(d5)}`]}static getStubConfig(){return{type:"custom:hisho-device-card",device:""}}setConfig(C){if(!C?.device)throw new Error("Say which device: device: <name>");super.setConfig(C)}body(){let C=t1(this.hass,this.config.device,"box")??t1(this.hass,this.config.device,"addon");return C?C.kind==="addon"?this.addon(C):this.box(C):t`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`}maintenance(C,H){let V=S(C,"maintenance");if(!V)return"";let M=this.hass.states[V]?.state==="on";return t`<button class="act ${M?"":"danger"}" @click=${()=>R(this,this.hass,V,!M,M?void 0:`Put ${H} in maintenance? Its alerts are held.`)}>
      ${M?"End maintenance":"Maintenance"}</button>`}box(C){let H=this.hass,V=n(H,C,"box_state"),M=n(H,C,"box_health"),r=y(H);return t`<ha-card>
      <div class="head"><div class="title">${this.config.title??C.name}</div>
        <span class="row"><span class="chip ${b(V?.state)}">${V?.state??"unknown"}</span>
          <span class="chip ${b(M?.state)}">${M?.state??"unknown"}</span></span></div>
      ${M?.attributes.summary?t`<div class="detail">${M.attributes.summary}</div>`:""}
      <ul class="list" style="margin-top:10px">${I(H,C,"box_item").map(e=>{let i=e.attributes;return t`<li>
          <div class="row spread"><span class="name" @click=${()=>D(this,e.entity_id)}>${K(e,C)}</span>
            <span class="chip ${b(e.state)}">${w(e)?e.state:"unavailable"}</span></div>
          ${i.facts?.length?t`<div class="detail">${i.facts.join(" \xB7 ")}</div>`:""}
          ${r.has("device.press")&&i.actions?.length?t`<div class="row">${i.actions.map(o=>t`
            <button class="act ${o.danger?"danger":""}" @click=${()=>l(this,H,"device.press",i.addon,{entry:i.entry,item:i.item_id,action:o.id},o.danger?`${o.label}: ${K(e,C)} on ${C.name}?`:void 0)}>${o.label}</button>`)}</div>`:""}
        </li>`})}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(C,C.name)}</div>
    </ha-card>`}addon(C){let H=this.hass,V=n(H,C,"addon_status"),M=S(C,"addon_enabled"),r=V?.attributes??{},e=y(H);return t`<ha-card>
      <div class="head"><div class="title">${this.config.title??C.name}</div>
        <span class="chip ${b(V?.state)}">${V?.state??"unknown"}</span></div>
      <div class="muted">${[r.kind,r.version&&"v"+r.version,r.host&&"on "+r.host].filter(Boolean).join(" \xB7 ")}</div>
      ${r.problems?.length?t`<ul class="list" style="margin-top:8px">${r.problems.map(i=>t`<li><span class="detail">${i}</span></li>`)}</ul>`:""}
      <div class="row" style="margin-top:10px">
        ${e.has("addon.run")?(r.actions??[]).map(i=>t`<button class="act ${i.danger?"danger":""}"
          @click=${()=>l(this,H,"addon.run",r.addon,{action:i.id},i.danger?`${i.label} (${C.name})?`:void 0)}>${i.label}</button>`):""}
        ${this.maintenance(C,C.name)}
        ${M?t`<button class="act ${H.states[M]?.state==="on"?"danger":""}" @click=${()=>{let i=H.states[M]?.state==="on";R(this,H,M,!i,i?`Turn ${C.name} off? Hisho stops running it.`:void 0)}}>${H.states[M]?.state==="on"?"Turn off":"Turn on"}</button>`:""}
      </div>
      ${e.has("addon.config")?this.settings(r):""}
    </ha-card>`}settings(C){let H=this.hass,V=C.settings??{},M=n2(V.schema,{}),r=n2(V.entry_schema,V.entry_form),e=V.entries??[];if(!M.length&&!r.length)return"";let i=async a=>{a.preventDefault();let{values:d,error:A}=v2(a.target,M,V.options??{});this.error=A??"",!(A||!Object.keys(d).length)&&await l(this,H,"addon.config",C.addon,{settings:d})},o=async(a,d)=>{a.preventDefault();let A=a.target.closest("form"),p=A.elements.namedItem("__entry").value.trim(),{values:v,error:x}=v2(A,r);this.error=x??(p?"":"Give the entry a name."),!this.error&&await l(this,H,d?"addon.test":"addon.entry",C.addon,{entry:p,settings:v})};return t`<details style="margin-top:12px"><summary class="muted">Settings</summary>
      ${this.error?t`<div class="error">${this.error}</div>`:""}
      ${M.length?t`<form class="settings" @submit=${i}>
        ${M.map(a=>t`<label>${a.label}</label>${l2(a,(V.options??{})[a.key])}`)}
        <div class="full"><button class="act" type="submit">Save</button>
          ${Q5(H,"addon.apply")?t`<button class="act" type="button" @click=${()=>l(this,H,"addon.apply",C.addon)}>Apply on its machine</button>`:""}</div>
      </form>`:""}
      ${r.length?t`<div class="muted" style="margin-top:8px">${V.entry_label??"Entries"}</div>
        <ul class="list">${e.map(a=>t`<li><div class="row spread"><span>${a}</span>
          <button class="act danger" @click=${()=>l(this,H,"addon.entry",C.addon,{entry:a,settings:{_remove:!0}},`Remove ${a} from ${C.addon}?`)}>Remove</button></div></li>`)}</ul>
        <form class="settings" @submit=${a=>o(a,!1)}>
          <label>Name</label><input name="__entry" placeholder="a short name" />
          ${r.map(a=>t`<label>${a.label}</label>${l2(a,void 0)}`)}
          <div class="full"><button class="act" type="button" @click=${a=>o(a,!0)}>Test</button>
            <button class="act" type="submit">Add or replace</button></div>
        </form>`:""}
    </details>`}};var z5={running:g1,queued:a2,routed:a2,failed:h1,done:i1},F1=class extends u{static getStubConfig(){return{type:"custom:hisho-jobs-card"}}body(){let C=this.hass,H=n(C,O(C),"jobs_active")?.attributes.jobs??[],V=y(C),M=this.config.limit??10;return this.frame(t`
      <div class="head">${this.heading("Jobs")}
        ${V.has("jobs.reap")?t`<button class="act" @click=${()=>l(this,C,"jobs.reap")}>Fail stuck jobs</button>`:""}</div>
      ${H.length?"":t`<div class="empty">${Z(i1,"")}No jobs.</div>`}
      <ul class="list">${H.slice(0,M).map(r=>{let e=["queued","routed","running"].includes(r.status),i=b(r.status);return t`<li class="item bubbled ${i}">
          <span class="bubble sm ${i==="ok"?"accent":i}">${Z(z5[r.status]??Y2,"")}</span>
          <div class="bodycol">
          <div class="row spread"><span class="ellipsis">${r.kind}${r.worker?t` <span class="muted">on ${r.worker}</span>`:""}</span>
            <span class="row" style="flex-wrap:nowrap">
            ${e&&V.has("job.cancel")?t`<button class="act danger" @click=${()=>l(this,C,"job.cancel",r.id,{},`Cancel this ${r.kind} job?`)}>Cancel</button>`:""}
            ${r.status==="failed"&&V.has("job.retry")?t`<button class="act" @click=${()=>l(this,C,"job.retry",r.id)}>Retry</button>`:""}
            ${!e&&V.has("job.clear")?t`<button class="act" @click=${()=>l(this,C,"job.clear",r.id)}>Clear</button>`:""}
            <span class="chip ${b(r.status)}">${r.status}</span></span></div>
          ${r.reason?t`<div class="detail">${r.reason}</div>`:""}
          </div>
        </li>`})}</ul>
      ${H.length>M?t`<div class="muted" style="margin-top:6px">${H.length-M} more on the Projects page</div>`:""}
    `)}},R1=class extends u{static getStubConfig(){return{type:"custom:hisho-projects-card"}}body(){let C=this.hass,H=n(C,O(C),"projects_active")?.attributes.projects??[],V=y(C),M=e=>!!e.asks?.length||!["","claude","hisho"].includes(String(e.waiting_on??"").toLowerCase()),r=H.filter(e=>e.status==="active").sort((e,i)=>Number(M(i))-Number(M(e)));return this.frame(t`
      <div class="head">${this.heading("Projects")}<span class="muted">${r.length} active</span></div>
      <ul class="list">${r.slice(0,this.config.limit??20).map(e=>t`<li>
        <div class="row spread"><span class="ellipsis">${e.title}${e.company?t` <span class="muted">${e.company}</span>`:""}</span>
          ${M(e)?t`<span class="chip warn">waiting on you</span>`:""}</div>
        ${e.asks?.length?t`<div class="detail">${e.asks.join(`
`)}</div>`:e.next?t`<div class="detail">Next: ${e.next}</div>`:""}
        <div class="row">
          ${V.has("project.open")?t`<button class="act" @click=${()=>l(this,C,"project.open",e.name)}>Open</button>`:""}
          ${V.has("project.archive")?t`<button class="act danger" @click=${()=>l(this,C,"project.archive",e.name,{},`Archive ${e.title}? Nothing is deleted; it can be restored.`)}>Archive</button>`:""}
        </div>
      </li>`)}</ul>
    `)}};var D1=class extends u{static getStubConfig(){return{type:"custom:hisho-store-card"}}body(){let C=this.hass,H=n(C,O(C),"addon_updates"),V=H?.attributes.store??[],M=H?.attributes.repositories??[],r=y(C);if(!r.has("store.install")&&!r.has("store.update"))return t`<ha-card><div class="head">${this.heading("Add-on store")}</div>
        <div class="empty">Hisho does not let this Home Assistant change its add-ons.</div></ha-card>`;let e=[...V].sort((i,o)=>+!!o.update_available-+!!i.update_available||+!!o.installed-+!!i.installed||String(i.title).localeCompare(String(o.title)));return t`<ha-card>
      <div class="head">${this.heading("Add-on store")}<span class="muted">${V.filter(i=>i.installed).length} installed</span></div>
      <ul class="list">${e.map(i=>t`<li>
        <div class="row spread"><span>${i.title}</span>
          <span class="chip ${i.update_available?"warn":i.installed?"ok":"off"}">${i.update_available?i.installed_version===i.version?`v${i.version} \xB7 update available`:`${i.installed_version} \u2192 ${i.version}`:i.installed?`v${i.installed_version}`:`v${i.version}`}</span></div>
        ${i.description?t`<div class="detail">${i.description}</div>`:""}
        <div class="row">
          ${!i.installed&&r.has("store.install")?t`<button class="act" @click=${()=>l(this,C,"store.install",i.name)}>Install</button>`:""}
          ${i.update_available&&r.has("store.update")?t`<button class="act" @click=${()=>l(this,C,"store.update",i.name,{host:i.host??""})}>Update</button>`:""}
          ${i.installed&&i.previous&&r.has("store.rollback")?t`<button class="act danger" @click=${()=>l(this,C,"store.rollback",i.name,{host:i.host??""},`Roll ${i.title} back to the version before? Its settings are kept.`)}>Roll back</button>`:""}
          ${i.installed&&r.has("store.remove")?t`<button class="act danger" @click=${()=>l(this,C,"store.remove",i.name,{host:i.host??""},`Remove ${i.title}? Its settings are kept; install it again any time.`)}>Remove</button>`:""}
        </div></li>`)}</ul>
      <div class="title" style="margin-top:14px;font-size:1em">Repositories</div>
      <ul class="list">${M.map(i=>t`<li><div class="row spread">
        <span>${i.name}${i.listed==="store"?t` <span class="muted">store</span>`:""}</span>
        <span class="row">
          ${r.has("repository.update")?t`<button class="act" @click=${()=>l(this,C,"repository.update",i.url)}>Update</button>`:""}
          ${i.listed!=="store"&&r.has("repository.remove")?t`<button class="act danger" @click=${()=>l(this,C,"repository.remove",i.url,{},`Remove the repository ${i.name}?`)}>Remove</button>`:""}
        </span></div></li>`)}</ul>
      ${r.has("repository.add")?t`<form class="row" style="margin-top:8px" @submit=${i=>{i.preventDefault();let o=i.target.elements.namedItem("url");o.value.trim()&&l(this,C,"repository.add",o.value.trim()).then(()=>o.value="")}}><input name="url" placeholder="https://github.com/you/hisho-addon-name" style="flex:1;font:inherit;padding:4px 6px;
        border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)" />
        <button class="act" type="submit">Add repository</button></form>`:""}
    </ha-card>`}};function $1(L){return{...L,card_mod:{style:R2}}}var E1={grid_options:{columns:"full"}};function J(L,C){return{...L,type:"sections",max_columns:4,dense_section_placement:!0,sections:C.filter(H=>(Array.isArray(H)?H:H.cards).length).map(H=>Array.isArray(H)?{type:"grid",cards:H}:H)}}var p5=["Server","Vm","Storage","Device","Network"],K5={Server:"Servers",Vm:"Virtual machines",Storage:"Storage",Device:"Devices",Network:"Network"};function j5(L,C={}){let H=O(L);if(!H)return{title:"Hisho",views:[{title:"Hisho",path:"hisho",icon:"mdi:server-network",cards:[{type:"markdown",content:"The **Hisho** integration is not set up yet: Settings \u203A Devices & services \u203A Add integration \u203A Hisho."}]}]};let V=N(L,"machine"),M=N(L,"box"),r=N(L,"addon"),e=S(H,"today"),i=S(H,"due_dates"),o=["phone","phone_alerts","clear_phone","hide_acked"].map(p=>S(H,p)).filter(p=>!!p),a=new Map;for(let p of M){let v=p5.includes(p.model)?p.model:"Device";a.set(v,[...a.get(v)??[],p.name])}let d=F2(C.background);return{title:"Hisho",views:[{title:"Overview",path:"overview",icon:"mdi:view-dashboard",type:"panel",cards:[{type:"custom:hisho-control-center-card"}]},J({title:"Machines",path:"machines",icon:"mdi:server"},V.map(p=>[{type:"custom:hisho-machine-card",machine:p.name}])),J({title:"Devices",path:"devices",icon:"mdi:devices"},p5.filter(p=>a.has(p)).map(p=>({type:"grid",column_span:Math.min(4,a.get(p).length),cards:[{type:"heading",heading:K5[p]},...a.get(p).map(v=>({type:"custom:hisho-device-card",device:v}))]}))),J({title:"Add-ons",path:"addons",icon:"mdi:puzzle"},[...S(H,"addon_updates")?[{type:"grid",column_span:2,cards:[{type:"custom:hisho-store-card",...E1}]}]:[],...r.map(p=>[{type:"custom:hisho-device-card",device:p.name}])]),...e||i?[J({title:"Today",path:"today",icon:"mdi:calendar-today"},[e?[$1({type:"todo-list",entity:e,title:"Today"})]:[],i?{type:"grid",column_span:3,cards:[$1({type:"calendar",entities:[i],initial_view:"dayGridMonth",title:"Due dates",...E1})]}:[]])]:[],J({title:"Projects",path:"projects",icon:"mdi:folder-multiple"},[{type:"grid",column_span:2,cards:[{type:"custom:hisho-projects-card",...E1}]},{type:"grid",column_span:2,cards:[{type:"custom:hisho-jobs-card",title:"All jobs",limit:50,...E1}]}]),J({title:"Phone",path:"phone",icon:"mdi:cellphone-message"},[[$1({type:"entities",title:"Hisho phone app",entities:o}),$1({type:"markdown",content:"Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity."})]])].map(p=>({...p,background:d}))}}var N1=class extends HTMLElement{static async generate(C,H){return j5(H,C)}};var q5="0.5.0";a5();var m5=[["hisho-control-center-card",w1,"Hisho control center","Hisho's Overview in one wide card: stats, machine tiles, needs you and jobs. Best in a panel view."],["hisho-fleet-card",b1,"Hisho fleet","Every machine: state, readings, wake / park, maintenance."],["hisho-machine-card",B1,"Hisho machine","One machine in full: readings, services, its add-on buttons."],["hisho-needs-you-card",P1,"Hisho needs you","Hisho's needs-you list: acknowledge, snooze, investigate."],["hisho-device-card",T1,"Hisho device","A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],["hisho-jobs-card",F1,"Hisho jobs","Hisho's jobs: cancel, retry, clear."],["hisho-projects-card",R1,"Hisho projects","Active projects, what waits on you, open or archive."],["hisho-store-card",D1,"Hisho add-on store","Install, update, roll back or remove add-ons; repositories."]];for(let[L,C]of m5)customElements.get(L)||customElements.define(L,C);customElements.get("ll-strategy-dashboard-hisho")||customElements.define("ll-strategy-dashboard-hisho",N1);var _=window;_.customCards=_.customCards||[];for(let[L,,C,H]of m5)_.customCards.some(V=>V.type===L)||_.customCards.push({type:L,name:C,description:H,preview:!1,documentationURL:"https://github.com/YepizTechJonathan/hisho-ha-cards"});_.customStrategies=_.customStrategies||[];_.customStrategies.some(L=>L.type==="hisho")||_.customStrategies.push({type:"hisho",strategyType:"dashboard",name:"Hisho",description:"A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects."});console.info(`%c HISHO-HA-CARDS %c ${q5} `,"background:#151515;color:#eee","background:#444;color:#fff");export{q5 as VERSION};
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
