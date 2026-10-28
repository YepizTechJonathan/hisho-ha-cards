var v1=globalThis,x1=v1.ShadowRoot&&(v1.ShadyCSS===void 0||v1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q1=Symbol(),u2=new WeakMap,t1=class{constructor(C,H,V){if(this._$cssResult$=!0,V!==Q1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=C,this.t=H}get styleSheet(){let C=this.o,H=this.t;if(x1&&C===void 0){let V=H!==void 0&&H.length===1;V&&(C=u2.get(H)),C===void 0&&((this.o=C=new CSSStyleSheet).replaceSync(this.cssText),V&&u2.set(H,C))}return C}toString(){return this.cssText}},s1=M=>new t1(typeof M=="string"?M:M+"",void 0,Q1),D=(M,...C)=>{let H=M.length===1?M[0]:C.reduce((V,L,r)=>V+(t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+M[r+1],M[0]);return new t1(H,M,Q1)},c2=(M,C)=>{if(x1)M.adoptedStyleSheets=C.map(H=>H instanceof CSSStyleSheet?H:H.styleSheet);else for(let H of C){let V=document.createElement("style"),L=v1.litNonce;L!==void 0&&V.setAttribute("nonce",L),V.textContent=H.cssText,M.appendChild(V)}},z1=x1?M=>M:M=>M instanceof CSSStyleSheet?(C=>{let H="";for(let V of C.cssRules)H+=V.cssText;return s1(H)})(M):M;var{is:O5,defineProperty:g5,getOwnPropertyDescriptor:f5,getOwnPropertyNames:b5,getOwnPropertySymbols:k5,getPrototypeOf:y5}=Object,Z1=globalThis,S2=Z1.trustedTypes,w5=S2?S2.emptyScript:"",B5=Z1.reactiveElementPolyfillSupport,i1=(M,C)=>M,K1={toAttribute(M,C){switch(C){case Boolean:M=M?w5:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,C){let H=M;switch(C){case Boolean:H=M!==null;break;case Number:H=M===null?null:Number(M);break;case Object:case Array:try{H=JSON.parse(M)}catch{H=null}}return H}},O2=(M,C)=>!O5(M,C),h2={attribute:!0,type:String,converter:K1,reflect:!1,useDefault:!1,hasChanged:O2};Symbol.metadata??=Symbol("metadata"),Z1.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(C){this._$Ei(),(this.l??=[]).push(C)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(C,H=h2){if(H.state&&(H.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(C)&&((H=Object.create(H)).wrapped=!0),this.elementProperties.set(C,H),!H.noAccessor){let V=Symbol(),L=this.getPropertyDescriptor(C,V,H);L!==void 0&&g5(this.prototype,C,L)}}static getPropertyDescriptor(C,H,V){let{get:L,set:r}=f5(this.prototype,C)??{get(){return this[H]},set(t){this[H]=t}};return{get:L,set(t){let i=L?.call(this);r?.call(this,t),this.requestUpdate(C,i,V)},configurable:!0,enumerable:!0}}static getPropertyOptions(C){return this.elementProperties.get(C)??h2}static _$Ei(){if(this.hasOwnProperty(i1("elementProperties")))return;let C=y5(this);C.finalize(),C.l!==void 0&&(this.l=[...C.l]),this.elementProperties=new Map(C.elementProperties)}static finalize(){if(this.hasOwnProperty(i1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(i1("properties"))){let H=this.properties,V=[...b5(H),...k5(H)];for(let L of V)this.createProperty(L,H[L])}let C=this[Symbol.metadata];if(C!==null){let H=litPropertyMetadata.get(C);if(H!==void 0)for(let[V,L]of H)this.elementProperties.set(V,L)}this._$Eh=new Map;for(let[H,V]of this.elementProperties){let L=this._$Eu(H,V);L!==void 0&&this._$Eh.set(L,H)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(C){let H=[];if(Array.isArray(C)){let V=new Set(C.flat(1/0).reverse());for(let L of V)H.unshift(z1(L))}else C!==void 0&&H.push(z1(C));return H}static _$Eu(C,H){let V=H.attribute;return V===!1?void 0:typeof V=="string"?V:typeof C=="string"?C.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(C=>this.enableUpdating=C),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(C=>C(this))}addController(C){(this._$EO??=new Set).add(C),this.renderRoot!==void 0&&this.isConnected&&C.hostConnected?.()}removeController(C){this._$EO?.delete(C)}_$E_(){let C=new Map,H=this.constructor.elementProperties;for(let V of H.keys())this.hasOwnProperty(V)&&(C.set(V,this[V]),delete this[V]);C.size>0&&(this._$Ep=C)}createRenderRoot(){let C=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c2(C,this.constructor.elementStyles),C}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(C=>C.hostConnected?.())}enableUpdating(C){}disconnectedCallback(){this._$EO?.forEach(C=>C.hostDisconnected?.())}attributeChangedCallback(C,H,V){this._$AK(C,V)}_$ET(C,H){let V=this.constructor.elementProperties.get(C),L=this.constructor._$Eu(C,V);if(L!==void 0&&V.reflect===!0){let r=(V.converter?.toAttribute!==void 0?V.converter:K1).toAttribute(H,V.type);this._$Em=C,r==null?this.removeAttribute(L):this.setAttribute(L,r),this._$Em=null}}_$AK(C,H){let V=this.constructor,L=V._$Eh.get(C);if(L!==void 0&&this._$Em!==L){let r=V.getPropertyOptions(L),t=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:K1;this._$Em=L;let i=t.fromAttribute(H,r.type);this[L]=i??this._$Ej?.get(L)??i,this._$Em=null}}requestUpdate(C,H,V,L=!1,r){if(C!==void 0){let t=this.constructor;if(L===!1&&(r=this[C]),V??=t.getPropertyOptions(C),!((V.hasChanged??O2)(r,H)||V.useDefault&&V.reflect&&r===this._$Ej?.get(C)&&!this.hasAttribute(t._$Eu(C,V))))return;this.C(C,H,V)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(C,H,{useDefault:V,reflect:L,wrapped:r},t){V&&!(this._$Ej??=new Map).has(C)&&(this._$Ej.set(C,t??H??this[C]),r!==!0||t!==void 0)||(this._$AL.has(C)||(this.hasUpdated||V||(H=void 0),this._$AL.set(C,H)),L===!0&&this._$Em!==C&&(this._$Eq??=new Set).add(C))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(H){Promise.reject(H)}let C=this.scheduleUpdate();return C!=null&&await C,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,r]of this._$Ep)this[L]=r;this._$Ep=void 0}let V=this.constructor.elementProperties;if(V.size>0)for(let[L,r]of V){let{wrapped:t}=r,i=this[L];t!==!0||this._$AL.has(L)||i===void 0||this.C(L,void 0,r,i)}}let C=!1,H=this._$AL;try{C=this.shouldUpdate(H),C?(this.willUpdate(H),this._$EO?.forEach(V=>V.hostUpdate?.()),this.update(H)):this._$EM()}catch(V){throw C=!1,this._$EM(),V}C&&this._$AE(H)}willUpdate(C){}_$AE(C){this._$EO?.forEach(H=>H.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(C)),this.updated(C)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(C){return!0}update(C){this._$Eq&&=this._$Eq.forEach(H=>this._$ET(H,this[H])),this._$EM()}updated(C){}firstUpdated(C){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[i1("elementProperties")]=new Map,W[i1("finalized")]=new Map,B5?.({ReactiveElement:W}),(Z1.reactiveElementVersions??=[]).push("2.1.2");var H2=globalThis,g2=M=>M,u1=H2.trustedTypes,f2=u1?u1.createPolicy("lit-html",{createHTML:M=>M}):void 0,P2="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,T2="?"+I,P5=`<${T2}>`,j=document,a1=()=>j.createComment(""),A1=M=>M===null||typeof M!="object"&&typeof M!="function",V2=Array.isArray,T5=M=>V2(M)||typeof M?.[Symbol.iterator]=="function",j1=`[ 	
\f\r]`,o1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,b2=/-->/g,k2=/>/g,z=RegExp(`>|${j1}(?:([^\\s"'>=/]+)(${j1}*=${j1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),y2=/'/g,w2=/"/g,F2=/^(?:script|style|textarea|title)$/i,L2=M=>(C,...H)=>({_$litType$:M,strings:C,values:H}),e=L2(1),n1=L2(2),A3=L2(3),q=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),B2=new WeakMap,K=j.createTreeWalker(j,129);function R2(M,C){if(!V2(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return f2!==void 0?f2.createHTML(C):C}var F5=(M,C)=>{let H=M.length-1,V=[],L,r=C===2?"<svg>":C===3?"<math>":"",t=o1;for(let i=0;i<H;i++){let o=M[i],A,d,a=-1,p=0;for(;p<o.length&&(t.lastIndex=p,d=t.exec(o),d!==null);)p=t.lastIndex,t===o1?d[1]==="!--"?t=b2:d[1]!==void 0?t=k2:d[2]!==void 0?(F2.test(d[2])&&(L=RegExp("</"+d[2],"g")),t=z):d[3]!==void 0&&(t=z):t===z?d[0]===">"?(t=L??o1,a=-1):d[1]===void 0?a=-2:(a=t.lastIndex-d[2].length,A=d[1],t=d[3]===void 0?z:d[3]==='"'?w2:y2):t===w2||t===y2?t=z:t===b2||t===k2?t=o1:(t=z,L=void 0);let v=t===z&&M[i+1].startsWith("/>")?" ":"";r+=t===o1?o+P5:a>=0?(V.push(A),o.slice(0,a)+P2+o.slice(a)+I+v):o+I+(a===-2?i:v)}return[R2(M,r+(M[H]||"<?>")+(C===2?"</svg>":C===3?"</math>":"")),V]},d1=class M{constructor({strings:C,_$litType$:H},V){let L;this.parts=[];let r=0,t=0,i=C.length-1,o=this.parts,[A,d]=F5(C,H);if(this.el=M.createElement(A,V),K.currentNode=this.el.content,H===2||H===3){let a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(L=K.nextNode())!==null&&o.length<i;){if(L.nodeType===1){if(L.hasAttributes())for(let a of L.getAttributeNames())if(a.endsWith(P2)){let p=d[t++],v=L.getAttribute(a).split(I),x=/([.?@])?(.*)/.exec(p);o.push({type:1,index:r,name:x[2],strings:v,ctor:x[1]==="."?Y1:x[1]==="?"?X1:x[1]==="@"?J1:V1}),L.removeAttribute(a)}else a.startsWith(I)&&(o.push({type:6,index:r}),L.removeAttribute(a));if(F2.test(L.tagName)){let a=L.textContent.split(I),p=a.length-1;if(p>0){L.textContent=u1?u1.emptyScript:"";for(let v=0;v<p;v++)L.append(a[v],a1()),K.nextNode(),o.push({type:2,index:++r});L.append(a[p],a1())}}}else if(L.nodeType===8)if(L.data===T2)o.push({type:2,index:r});else{let a=-1;for(;(a=L.data.indexOf(I,a+1))!==-1;)o.push({type:7,index:r}),a+=I.length-1}r++}}static createElement(C,H){let V=j.createElement("template");return V.innerHTML=C,V}};function H1(M,C,H=M,V){if(C===q)return C;let L=V!==void 0?H._$Co?.[V]:H._$Cl,r=A1(C)?void 0:C._$litDirective$;return L?.constructor!==r&&(L?._$AO?.(!1),r===void 0?L=void 0:(L=new r(M),L._$AT(M,H,V)),V!==void 0?(H._$Co??=[])[V]=L:H._$Cl=L),L!==void 0&&(C=H1(M,L._$AS(M,C.values),L,V)),C}var q1=class{constructor(C,H){this._$AV=[],this._$AN=void 0,this._$AD=C,this._$AM=H}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(C){let{el:{content:H},parts:V}=this._$AD,L=(C?.creationScope??j).importNode(H,!0);K.currentNode=L;let r=K.nextNode(),t=0,i=0,o=V[0];for(;o!==void 0;){if(t===o.index){let A;o.type===2?A=new p1(r,r.nextSibling,this,C):o.type===1?A=new o.ctor(r,o.name,o.strings,this,C):o.type===6&&(A=new C2(r,this,C)),this._$AV.push(A),o=V[++i]}t!==o?.index&&(r=K.nextNode(),t++)}return K.currentNode=j,L}p(C){let H=0;for(let V of this._$AV)V!==void 0&&(V.strings!==void 0?(V._$AI(C,V,H),H+=V.strings.length-2):V._$AI(C[H])),H++}},p1=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(C,H,V,L){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=C,this._$AB=H,this._$AM=V,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let C=this._$AA.parentNode,H=this._$AM;return H!==void 0&&C?.nodeType===11&&(C=H.parentNode),C}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(C,H=this){C=H1(this,C,H),A1(C)?C===w||C==null||C===""?(this._$AH!==w&&this._$AR(),this._$AH=w):C!==this._$AH&&C!==q&&this._(C):C._$litType$!==void 0?this.$(C):C.nodeType!==void 0?this.T(C):T5(C)?this.k(C):this._(C)}O(C){return this._$AA.parentNode.insertBefore(C,this._$AB)}T(C){this._$AH!==C&&(this._$AR(),this._$AH=this.O(C))}_(C){this._$AH!==w&&A1(this._$AH)?this._$AA.nextSibling.data=C:this.T(j.createTextNode(C)),this._$AH=C}$(C){let{values:H,_$litType$:V}=C,L=typeof V=="number"?this._$AC(C):(V.el===void 0&&(V.el=d1.createElement(R2(V.h,V.h[0]),this.options)),V);if(this._$AH?._$AD===L)this._$AH.p(H);else{let r=new q1(L,this),t=r.u(this.options);r.p(H),this.T(t),this._$AH=r}}_$AC(C){let H=B2.get(C.strings);return H===void 0&&B2.set(C.strings,H=new d1(C)),H}k(C){V2(this._$AH)||(this._$AH=[],this._$AR());let H=this._$AH,V,L=0;for(let r of C)L===H.length?H.push(V=new M(this.O(a1()),this.O(a1()),this,this.options)):V=H[L],V._$AI(r),L++;L<H.length&&(this._$AR(V&&V._$AB.nextSibling,L),H.length=L)}_$AR(C=this._$AA.nextSibling,H){for(this._$AP?.(!1,!0,H);C!==this._$AB;){let V=g2(C).nextSibling;g2(C).remove(),C=V}}setConnected(C){this._$AM===void 0&&(this._$Cv=C,this._$AP?.(C))}},V1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(C,H,V,L,r){this.type=1,this._$AH=w,this._$AN=void 0,this.element=C,this.name=H,this._$AM=L,this.options=r,V.length>2||V[0]!==""||V[1]!==""?(this._$AH=Array(V.length-1).fill(new String),this.strings=V):this._$AH=w}_$AI(C,H=this,V,L){let r=this.strings,t=!1;if(r===void 0)C=H1(this,C,H,0),t=!A1(C)||C!==this._$AH&&C!==q,t&&(this._$AH=C);else{let i=C,o,A;for(C=r[0],o=0;o<r.length-1;o++)A=H1(this,i[V+o],H,o),A===q&&(A=this._$AH[o]),t||=!A1(A)||A!==this._$AH[o],A===w?C=w:C!==w&&(C+=(A??"")+r[o+1]),this._$AH[o]=A}t&&!L&&this.j(C)}j(C){C===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,C??"")}},Y1=class extends V1{constructor(){super(...arguments),this.type=3}j(C){this.element[this.name]=C===w?void 0:C}},X1=class extends V1{constructor(){super(...arguments),this.type=4}j(C){this.element.toggleAttribute(this.name,!!C&&C!==w)}},J1=class extends V1{constructor(C,H,V,L,r){super(C,H,V,L,r),this.type=5}_$AI(C,H=this){if((C=H1(this,C,H,0)??w)===q)return;let V=this._$AH,L=C===w&&V!==w||C.capture!==V.capture||C.once!==V.once||C.passive!==V.passive,r=C!==w&&(V===w||L);L&&this.element.removeEventListener(this.name,this,V),r&&this.element.addEventListener(this.name,this,C),this._$AH=C}handleEvent(C){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,C):this._$AH.handleEvent(C)}},C2=class{constructor(C,H,V){this.element=C,this.type=6,this._$AN=void 0,this._$AM=H,this.options=V}get _$AU(){return this._$AM._$AU}_$AI(C){H1(this,C)}};var R5=H2.litHtmlPolyfillSupport;R5?.(d1,p1),(H2.litHtmlVersions??=[]).push("3.3.3");var $2=(M,C,H)=>{let V=H?.renderBefore??C,L=V._$litPart$;if(L===void 0){let r=H?.renderBefore??null;V._$litPart$=L=new p1(C.insertBefore(a1(),r),r,void 0,H??{})}return L._$AI(M),L};var M2=globalThis,R=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let C=super.createRenderRoot();return this.renderOptions.renderBefore??=C.firstChild,C}update(C){let H=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(C),this._$Do=$2(H,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};R._$litElement$=!0,R.finalized=!0,M2.litElementHydrateSupport?.({LitElement:R});var $5=M2.litElementPolyfillSupport;$5?.({LitElement:R});(M2.litElementVersions??=[]).push("4.2.2");var D5="/hisho_static/forest.jpg";function D2(M=D5){return`${M?`linear-gradient(rgba(6, 10, 7, 0.22), rgba(6, 10, 7, 0.5)), url("${M}") center / cover no-repeat, `:""}linear-gradient(180deg, #0a110d 0%, #1b2219 45%, #4a3a27 62%, #121a13 80%, #0a100b 100%) fixed`}var E2="ha-card { background: rgba(14, 20, 16, 0.6); backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%); border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 22px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35); --primary-text-color: #eef0ea; --secondary-text-color: #a7ae9f; --divider-color: rgba(255, 255, 255, 0.08); --primary-color: #5f9e74; --card-background-color: transparent; --ha-card-background: transparent; }",E=D`
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
`;function g(M){switch(M){case"up":case"on":case"ok":case"running":case"active":case"done":return"ok";case"warn":case"maintenance":case"away":case"needs_setup":case"blocked":case"queued":case"routed":return"warn";case"faulted":case"unreachable":case"problem":case"down":case"error":case"failed":case"critical":return"bad";case"decision":return"decide";default:return"off"}}function c1(M){let C=M===void 0?NaN:parseFloat(M);return Number.isFinite(C)?Math.max(0,Math.min(100,C)):void 0}var E5=[["machines_online","hub"],["machine_state","machine"],["box_state","box"],["addon_status","addon"]],N2=new WeakMap;function r2(M){let C=N2.get(M.entities??{});if(C&&C.devices===M.devices)return C.list;let H=N5(M);return M.entities&&N2.set(M.entities,{devices:M.devices,list:H}),H}function _2(M){return r2(M).flatMap(C=>Object.values(C.entities).flat())}function N5(M){let C=new Map;for(let V of Object.values(M.entities||{})){if(V.platform!=="hisho"||!V.device_id||!V.translation_key)continue;let L=C.get(V.device_id)??{};(L[V.translation_key]??=[]).push(V.entity_id),C.set(V.device_id,L)}let H=[];for(let[V,L]of C){let r=E5.find(([i])=>i in L)?.[1];if(!r)continue;let t=M.devices?.[V];H.push({id:V,name:t?.name_by_user||t?.name||V,kind:r,model:t?.model||"",entities:L})}return H.sort((V,L)=>V.name.localeCompare(L.name))}function T(M,C){return r2(M).filter(H=>H.kind===C)}function u(M){return T(M,"hub")[0]}function m1(M,C,H){if(!C)return;let V=C.toLowerCase();return r2(M).find(L=>(!H||L.kind===H)&&(L.id===C||L.name.toLowerCase()===V))}function c(M,C){return M?.entities[C]?.[0]}function m(M,C,H){let V=c(C,H);return V?M.states[V]:void 0}function U(M,C,H){return(C?.entities[H]??[]).map(V=>M.states[V]).filter(V=>!!V)}function F(M){return!!M&&M.state!=="unavailable"&&M.state!=="unknown"}function $(M){let C=m(M,u(M),"actions_allowed");return new Set(C?.attributes.allowed??[])}function Y(M,C){let H=M?.attributes.friendly_name??"",V=C?C.name+" ":"";return H.startsWith(V)?H.slice(V.length):H}var S=class extends R{static{this.properties={hass:{attribute:!1},config:{attribute:!1}}}static{this.styles=E}setConfig(C){if(!C)throw new Error("Invalid configuration");this.config=C}shouldUpdate(C){if(!C.has("hass")||C.size>1)return!0;let H=C.get("hass");return!H||H.entities!==this.hass.entities||H.devices!==this.hass.devices||H.user!==this.hass.user?!0:_2(this.hass).some(V=>H.states[V]!==this.hass.states[V])}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:6}}frame(C){return this.config.embedded?e`<div class="embedded">${C}</div>`:e`<ha-card>${C}</ha-card>`}render(){return!this.hass||!this.config?e``:this.hass.user&&!this.hass.user.is_admin?e`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`:u(this.hass)?this.body():e`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`}heading(C){let H=this.config.title??C;return H?e`<div class="title">${H}</div>`:e``}};var e2=class extends R{static{this.properties={text:{},open:{type:Boolean,reflect:!0}}}static{this.styles=D`
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
    </div>`}};customElements.get("hisho-confirm")||customElements.define("hisho-confirm",e2);function L1(M,C){let H=M.shadowRoot??M,V=H.querySelector("hisho-confirm");return V||(V=document.createElement("hisho-confirm"),H.appendChild(V)),V.ask(C)}async function Z(M,C,H,V="",L={},r){return r&&!await L1(M,r)?!1:(await C.callService("hisho","run_action",{action:H,target:V,args:L,confirm:!!r}),!0)}async function N(M,C,H,V,L){return L&&!await L1(M,L)?!1:(await C.callService("switch",V?"turn_on":"turn_off",{},{entity_id:H}),!0)}async function W2(M,C,H,V){return V&&!await L1(M,V)?!1:(await C.callService("button","press",{},{entity_id:H}),!0)}function G(M,C){M.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}function l(M,C="i"){return e`<svg class=${C} viewBox="0 0 24 24" aria-hidden="true">${n1`<path d=${M}></path>`}</svg>`}function S1(M,C){let V=2*Math.PI*22,L=V*.75,r=C>=95?"var(--hisho-crit)":C>=85?"var(--hisho-warn)":"var(--hisho-accent-text)";return e`<div class="ring" title="${M} ${Math.round(C)}%">
    <svg viewBox="0 0 56 56">${n1`
      <circle class="track" cx="28" cy="28" r=${22} fill="none" stroke-width="4.5" stroke-linecap="round"
        stroke-dasharray="${L} ${V}" transform="rotate(135 28 28)"></circle>
      <circle class="val" cx="28" cy="28" r=${22} fill="none" stroke-width="4.5" stroke-linecap="round" style="color:${r}"
        stroke=${r} stroke-dasharray="${L} ${V}" stroke-dashoffset=${L*(1-C/100)}
        transform="rotate(135 28 28)"></circle>`}
    </svg>
    <span class="rv">${Math.round(C)}<small>%</small></span><span class="rl">${M}</span>
  </div>`}function t2(M,C=new Date){let H=M.config?.time_zone,V=L=>new Intl.DateTimeFormat("en-US",{...L,timeZone:H}).format(C);return{hour:Number(V({hour:"numeric",hourCycle:"h23"}))%24,time:V({hour:"numeric",minute:"2-digit"}),date:V({weekday:"long",month:"long",day:"numeric"})}}function I2(M,C=new Date){let{hour:H}=t2(M,C),V=H<5?"Good night":H<12?"Good morning":H<18?"Good afternoon":H<22?"Good evening":"Good night",L=M.user?.name?.split(" ")[0];return L?`${V}, ${L}.`:`${V}.`}function U2(M){let C=window.location.pathname.split("/")[1]??"";window.history.pushState(null,"",`/${C}/${M}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}var Q2=5*6e4,G2=new Map;function _5(M,C,H=24,V=48,L=Date.now()){let r=`${C}|${H}|${V}`,t=G2.get(r);if(t&&L-t.at<Q2)return t.points;let i=L-H*36e5,o=M.callWS({type:"history/history_during_period",start_time:new Date(i).toISOString(),end_time:new Date(L).toISOString(),entity_ids:[C],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}).then(A=>W5((A?.[C]??[]).map(d=>[d.lu*1e3,parseFloat(d.s)]).filter(([,d])=>Number.isFinite(d)),i,L,V)).catch(()=>[]);return G2.set(r,{at:L,points:o}),o}function W5(M,C,H,V){if(!M.length)return[];let L=[],r=0,t=M[0][1];for(let i=1;i<=V;i++){let o=C+(H-C)*i/V;for(;r<M.length&&M[r][0]<=o;)t=M[r++][1];L.push(t)}return L}function I5(M,C,H){let V=C??Math.min(...M),r=(H??Math.max(...M))-V||1,t=M.map((o,A)=>[A/Math.max(1,M.length-1)*100,30-(o-V)/r*24-2]),i=`M${t[0][0]},${t[0][1]}`;for(let o=0;o<t.length-1;o++){let A=t[o-1]??t[o],d=t[o],a=t[o+1],p=t[o+2]??a;i+=` C${d[0]+(a[0]-A[0])/6},${d[1]+(a[1]-A[1])/6} ${a[0]-(p[0]-d[0])/6},${a[1]-(p[1]-d[1])/6} ${a[0]},${a[1]}`}return{line:i,area:`${i} L100,30 L0,30 Z`}}var U5=0,i2=class extends R{constructor(){super();this.gradId=`hs${++U5}`;this.fetched=0;this.hours=24,this.points=[],this.tone="var(--hisho-accent-text, #8cc7a1)"}static{this.properties={hass:{attribute:!1},entity:{},hours:{type:Number},tone:{},min:{type:Number},max:{type:Number},points:{state:!0}}}static{this.styles=D`
    :host { display: block; height: 46px; pointer-events: none; }
    svg { width: 100%; height: 100%; display: block; }
  `}willUpdate(H){this.hass&&this.entity&&(H.has("entity")||Date.now()-this.fetched>Q2)&&(this.fetched=Date.now(),_5(this.hass,this.entity,this.hours).then(V=>this.points=V))}render(){if(this.points.length<2)return e``;let{line:H,area:V}=I5(this.points,this.min,this.max);return e`<svg viewBox="0 0 100 30" preserveAspectRatio="none">${n1`
      <defs><linearGradient id=${this.gradId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.tone} stop-opacity="0.32"></stop>
        <stop offset="1" stop-color=${this.tone} stop-opacity="0"></stop></linearGradient></defs>
      <path d=${V} fill="url(#${this.gradId})"></path>
      <path d=${H} fill="none" stroke=${this.tone} stroke-width="1.6" vector-effect="non-scaling-stroke"
        stroke-linejoin="round" stroke-linecap="round"></path>`}</svg>`}};customElements.get("hisho-spark")||customElements.define("hisho-spark",i2);var z2="M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M9,11H12.63L9,15.2V17H15V15H11.37L15,10.8V9H9V11Z";var h1="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";var K2="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7";var j2="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";var q2="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";var Y2="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var X2="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z";var J2="M11,17V7H4V17H11M11,3A2,2 0 0,1 13,5V19A2,2 0 0,1 11,21H4C2.89,21 2,20.1 2,19V5A2,2 0 0,1 4,3H11M16.5,3H21.5A1.5,1.5 0 0,1 23,4.5V7.5A1.5,1.5 0 0,1 21.5,9H18L15,12V9L15,4.5A1.5,1.5 0 0,1 16.5,3Z";var O1="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var X="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z";var C5="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z";var g1="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";var H5="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var V5="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z";var L5="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z";var M1="M11.7 20H11.3L10.9 17.4C9.7 17.2 8.7 16.5 7.9 15.6L5.5 16.6L4.7 15.3L6.8 13.7C6.4 12.5 6.4 11.3 6.8 10.1L4.7 8.7L5.5 7.4L7.9 8.4C8.7 7.5 9.7 6.9 10.9 6.6L11.2 4H12.7L13.1 6.6C14.3 6.8 15.4 7.5 16.1 8.4L18.5 7.4L19.3 8.7L17.2 10.2C17.4 10.8 17.5 11.4 17.5 12H18C18.5 12 19 12.1 19.5 12.2V12L19.4 11L21.5 9.4C21.7 9.2 21.7 9 21.6 8.8L19.6 5.3C19.5 5 19.3 5 19 5L16.5 6C16 5.6 15.4 5.3 14.8 5L14.4 2.3C14.5 2.2 14.2 2 14 2H10C9.8 2 9.5 2.2 9.5 2.4L9.1 5.1C8.5 5.3 8 5.7 7.4 6L5 5C4.7 5 4.5 5 4.3 5.3L2.3 8.8C2.2 9 2.3 9.2 2.5 9.4L4.6 11L4.5 12L4.6 13L2.5 14.7C2.3 14.9 2.3 15.1 2.4 15.3L4.4 18.8C4.5 19 4.7 19 5 19L7.5 18C8 18.4 8.6 18.7 9.2 19L9.6 21.7C9.6 21.9 9.8 22.1 10.1 22.1H12.6C12.1 21.4 11.9 20.7 11.7 20M16 12.3V12C16 9.8 14.2 8 12 8S8 9.8 8 12C8 14.2 9.8 16 12 16C12.7 14.3 14.2 12.9 16 12.3M10 12C10 10.9 10.9 10 12 10S14 10.9 14 12 13.1 14 12 14 10 13.1 10 12M18 14.5V13L15.8 15.2L18 17.4V16C19.4 16 20.5 17.1 20.5 18.5C20.5 18.9 20.4 19.3 20.2 19.6L21.3 20.7C22.5 18.9 22 16.4 20.2 15.2C19.6 14.7 18.8 14.5 18 14.5M18 21C16.6 21 15.5 19.9 15.5 18.5C15.5 18.1 15.6 17.7 15.8 17.4L14.7 16.3C13.5 18.1 14 20.6 15.8 21.8C16.5 22.2 17.2 22.5 18 22.5V24L20.2 21.8L18 19.5V21Z";var M5="M22,18H17A1,1 0 0,1 16,17V7A1,1 0 0,1 17,6H22A1,1 0 0,1 23,7V17A1,1 0 0,1 22,18M22,8H17V9H22V8M22,10H17V11H22V10M9,15V17H10V18H5V17H6V15H2A1,1 0 0,1 1,14V7A1,1 0 0,1 2,6H13A1,1 0 0,1 14,7V14A1,1 0 0,1 13,15H9M12,8H3V13H12V8Z";var r5="M2 7H4.5V17H3V8.5H2M22 7V16H14V17H7V16H6V7M10 9H8V12H10M13 9H11V12H13M20 9H15V14H20V9Z";var e5="M20 17H22V15H20V17M20 7V13H22V7M4 2C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H16C17.11 22 18 21.11 18 20V8L12 2M4 4H11V9H16V20H4Z";var f1="M15 14C16.33 14 19 14.67 19 16V17H11V16C11 14.67 13.67 14 15 14M15 13C16.11 13 17 12.11 17 11S16.11 9 15 9C13.9 9 13 9.89 13 11C13 12.11 13.9 13 15 13M22 8V18C22 19.11 21.11 20 20 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H10L12 6H20C21.11 6 22 6.9 22 8M20 8H4V18H20V8Z";var t5="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z";var o2="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var i5="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";var o5="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var b1="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var k1="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var a5="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var a2="M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z";var y1="M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z";var A5="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,7H13V13H11V7M11,15H13V17H11V15Z";var d5="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9";var l1="M6,2V8H6V8L10,12L6,16V16H6V22H18V16H18V16L14,12L18,8V8H18V2H6M16,16.5V20H8V16.5L12,12.5L16,16.5M12,11.5L8,7.5V4H16V7.5L12,11.5Z";var r1="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var G5=[[/gpu/i,r5],[/workstation|desktop/i,M5],[/control|core/i,y1],[/tools|nas|storage/i,a2]];function A2(M){return G5.find(([C])=>C.test(M.model))?.[1]??a2}function d2(M){let C=c(M,"gpu_usage"),H=c(M,"memory_usage");return/gpu/i.test(M.model)&&C?[C,"GPU"]:H?[H,"Memory"]:C?[C,"GPU"]:void 0}function Q5(M,C){let H=M.hass,V=m(H,C,"machine_state"),L=m(H,C,"online"),r=m(H,C,"awake"),t=V?.attributes.power??[],i=$(H),o=V?.attributes.machine??C.name,A=c(C,"maintenance"),d=A?H.states[A]?.state==="on":!1,a=M.expanded.has(C.id),p=L?.state==="on",v=F(r)?r.state:V?.attributes.reason&&!p?String(V.attributes.reason):V?.attributes.role??"",x=d?"brown":g(V?.state),O=(k,s)=>{let B=m(H,C,k);return F(B)?e`<span>${s}</span><span>${B.state}${B.attributes.unit_of_measurement?" "+B.attributes.unit_of_measurement:""}</span>`:""},f=U(H,C,"service"),n=f.filter(k=>k.state!=="on").length,h=[["Mem","memory_usage"],["Disk","disk_usage"],["GPU","gpu_usage"]].map(([k,s])=>[k,c1(m(H,C,s)?.state)]).filter(k=>k[1]!==void 0),b=d2(C);return e`<div class="tile mtile ${x} ${p?"":"asleep"}">
    <div class="mhead" @click=${()=>M.flip(C.id)}>
      <span class="bubble ${p?x==="ok"?"accent":x:"off"}">${l(A2(C),"")}</span>
      <span class="grow"><span class="name">${C.name}</span>${v?e`<span class="muted ellipsis sub">${v}</span>`:""}</span>
      <span class="chip ${x}">${d?"maintenance":V?.state??"unknown"}</span>
      <span class="chev ${a?"open":""}">${l(g1,"")}</span>
    </div>
    ${h.length?e`<div class="rings">${h.map(([k,s])=>S1(k,s))}</div>`:""}
    ${a?e`<div class="kv">
        ${O("jobs_running","Jobs running")} ${O("jobs_queued","Jobs queued")}
        ${O("containers_running","Containers")} ${O("sync_connected","Sync")}
        ${f.length?e`<span>Services</span><span>${f.length-n} of ${f.length} running</span>`:""}
      </div>`:""}
    <div class="row acts">
      ${t.includes("wake")&&i.has("machine.wake")?e`<button class="act" @click=${()=>Z(M,H,"machine.wake",o)}>${l(b1,"")}Wake</button>`:""}
      ${t.includes("park")&&i.has("machine.park")?e`<button class="act danger" @click=${()=>Z(M,H,"machine.park",o,{},`Park ${C.name}? It powers off until something needs it.`)}>${l(k1,"")}Park</button>`:""}
      ${A?e`<button class="act ${d?"brown":""}" title="Maintenance holds its alerts and auto-park"
          @click=${()=>N(M,H,A,!d,d?void 0:`Put ${C.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${l(r1,"")}${d?"End maintenance":"Maintenance"}</button>`:""}
      ${a&&V?e`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${()=>G(M,V.entity_id)}>History…</button>`:""}
    </div>
    ${b?e`<div class="sparkwrap"><span class="sparkl">${b[1]} · 24 h</span>
      <hisho-spark .hass=${H} .entity=${b[0]} .min=${0} .max=${100}
        .tone=${x==="bad"?"var(--hisho-crit)":"var(--hisho-accent-text)"}></hisho-spark></div>`:""}
  </div>`}function z5(M,C){let H=M.hass.states[C]?.state==="on";return e`<label class="switch" title="Fleet maintenance">
    <input type="checkbox" .checked=${H}
      @change=${V=>{let L=V.target;N(M,M.hass,C,L.checked,L.checked?"Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.":void 0).then(r=>{r||(L.checked=H)})}} />Fleet maintenance</label>`}var w1=class extends S{static{this.properties={...S.properties,expanded:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-fleet-card"}}constructor(){super(),this.expanded=new Set}flip(C){let H=new Set(this.expanded);H.delete(C)||H.add(C),this.expanded=H}body(){let C=T(this.hass,"machine"),H=u(this.hass),V=m(this.hass,H,"machines_online"),L=c(H,"fleet_maintenance"),r=m(this.hass,H,"core_reachable");return this.frame(e`
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${r?.state==="off"?e`<span class="chip bad">Hisho Core unreachable</span>`:""}
          ${V?e`<span class="chip num">${V.state} of ${C.length} online</span>`:""}
          ${L?z5(this,L):""}
        </div>
      </div>
      <div class="grid">${C.map(t=>Q5(this,t))}</div>
    `)}};var B1="M12.11 3.1C13.79 4.04 15.71 5.53 16.58 6.6L18.46 4.66C17.5 3.56 15.48 2.2 13.86 1.33ZM19.33 2.43C18.55 6.24 17.32 9.74 15.46 12.74V6.17H12.78V16.32C11.43 17.81 9.85 19.12 8.04 20.22C8.68 20.63 9.59 21.61 9.98 22.16C11.01 21.5 11.95 20.79 12.82 20.03C13.03 21.89 13.81 22.48 15.78 22.48C16.26 22.48 17.87 22.48 18.37 22.48C20.46 22.48 21.12 21.32 21.4 17.81C20.66 17.6 19.59 17.14 18.99 16.69C18.9 19.39 18.76 19.99 18.12 19.99C17.77 19.99 16.51 19.99 16.24 19.99C15.57 19.99 15.46 19.85 15.46 18.84V17.37C17.02 15.52 18.28 13.43 19.31 11.14C19.93 12.97 20.41 15.04 20.5 16.48L23 15.79C22.82 13.91 22.06 11.14 21.05 9.01L20.07 9.28C20.8 7.34 21.4 5.25 21.9 3.03ZM8.1 1.47C6.41 2.23 3.66 2.89 1.21 3.26C1.5 3.83 1.85 4.75 1.96 5.34C2.83 5.23 3.73 5.09 4.64 4.93V7.61H1.39V10.13H4.14C3.38 12.36 2.19 14.81 1 16.32C1.41 17.01 2.05 18.18 2.28 18.96C3.13 17.79 3.96 16.09 4.64 14.3V22.67H7.26V13.39C7.69 14.1 8.08 14.83 8.29 15.33L9.64 13.66C9.39 14.62 9.09 15.49 8.68 16.21L10.81 17.19C11.89 15.36 12.25 12.38 12.46 9.7L10.26 9.26C10.17 10.59 10.01 11.92 9.75 13.16C9.23 12.52 7.78 10.98 7.26 10.52V10.13H9.66V7.61H7.26V4.38C8.22 4.13 9.14 3.85 9.96 3.53Z",p5={kanji:B1};function n5(M,C=[]){for(let H of Array.from(M.querySelectorAll("*")))H.localName==="ha-icon"&&C.push(H),H.shadowRoot&&n5(H.shadowRoot,C);return C}async function K5(M=document){let C=n5(M).filter(H=>typeof H.icon=="string"&&H.icon.startsWith("hisho:"));for(let H of C){let V=H.icon;H._legacy=!1,H.icon=void 0,await H.updateComplete,H.icon=V}return C.length}function m5(M=window){if(M.customIcons=M.customIcons||{},M.customIcons.hisho={getIcon:async C=>({path:p5[C]??B1,viewBox:"0 0 24 24"}),getIconList:async()=>Object.keys(p5).map(C=>({name:C}))},typeof document<"u")for(let C of[0,1500,5e3])setTimeout(()=>{K5().catch(()=>{})},C)}var j5={transcribe:"Transcribing",install:"Installing",build:"Building",deploy:"Deploying",investigate:"Looking into",backup:"Backing up",sync:"Syncing",test:"Testing",update:"Updating",upgrade:"Upgrading"},q5={transcribe:"Transcribed",install:"Installed",build:"Built",deploy:"Deployed",investigate:"Looked into",backup:"Backed up",sync:"Synced",test:"Tested",update:"Updated",upgrade:"Upgraded"};function Y5(M,C){return(M?T(M,"machine").find(V=>m(M,V,"machine_state")?.attributes.machine===C||V.name.toLowerCase()===C.toLowerCase()):void 0)?.name??C.replace(/(^|-)(\w)/g,(V,L,r)=>(L?" ":"")+r.toUpperCase())}function l5(M,C=!1,H){let V=String(M.kind??"job"),L=(C?q5[V]??`Finished ${V}`:j5[V])??V.replace(/^\w/,r=>r.toUpperCase());return M.worker?`${L} on ${Y5(H,String(M.worker))}`:L}function p2(M,C=Date.now()){let H=M?Date.parse(M):NaN;if(!Number.isFinite(H))return"";let V=Math.round((C-H)/6e4);if(V<2)return"just now";if(V<60)return`${V} min ago`;let L=Math.round(V/60);return L<24?`${L} h ago`:`${Math.round(L/24)} d ago`}function X5(M,C=new Date){let[H,V,L]=M.slice(0,10).split("-").map(Number),r=new Date(H,V-1,L),t=new Date(C.getFullYear(),C.getMonth(),C.getDate()),i=Math.round((r.getTime()-t.getTime())/864e5);return i<0?i===-1?"Yesterday":`${-i} days late`:i===0?"Today":i===1?"Tomorrow":r.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}function v5(M){let C=u(M),H=m(M,C,"jobs_active")?.attributes.jobs??[],V=m(M,C,"projects_active")?.attributes.projects??[],L=H.filter(t=>["queued","routed","running"].includes(t.status)).map(t=>({what:l5(t,!1,M),sub:t.status==="running"?`started ${p2(t.updated_at)}`.trim():"waiting its turn",path:t.status==="running"?M1:l1,tone:t.status==="running"?"accent":"off"})),r=V.filter(t=>t.status==="active"&&["claude","hisho"].includes(String(t.waiting_on??"").toLowerCase())).map(t=>({what:t.title,sub:t.next?`Next: ${t.next}`:"In progress",path:f1,tone:"brown"}));return[...L,...r]}function x5(M,C=Date.now()){let H=m(M,u(M),"done_for_you");return H&&Array.isArray(H.attributes.items)?H.attributes.items.map(L=>({what:String(L.text),when:p2(L.at,C)})):(m(M,u(M),"jobs_active")?.attributes.jobs??[]).filter(L=>L.status==="done"&&C-Date.parse(L.updated_at??"")<864e5).sort((L,r)=>Date.parse(r.updated_at)-Date.parse(L.updated_at)).map(L=>({what:l5(L,!0,M),when:p2(L.updated_at,C)}))}function s5(M){return(m(M,u(M),"projects_active")?.attributes.projects??[]).filter(H=>H.status==="active"&&(H.asks?.length||!["","claude","hisho"].includes(String(H.waiting_on??"").toLowerCase())))}var n2=class extends R{static{this.properties={hass:{attribute:!1},items:{state:!0},due:{state:!0},adding:{state:!0}}}static{this.styles=E}constructor(){super(),this.items=[],this.due=[],this.adding=!1}ids(){let C=u(this.hass);return{todo:c(C,"today"),cal:c(C,"due_dates")}}updated(C){if(!C.has("hass")||!this.hass)return;let{todo:H,cal:V}=this.ids(),L=[H,V].map(r=>r?`${this.hass.states[r]?.last_changed}|${this.hass.states[r]?.state}`:"").join(";");if(L!==this.seen&&(this.seen=L,H&&this.hass.callWS({type:"todo/item/list",entity_id:H}).then(r=>this.items=r.items??[]).catch(()=>this.items=[]),V&&this.hass.callApi)){let r=new Date,t=new Date(Date.now()+14*864e5);this.hass.callApi("GET",`calendars/${V}?start=${r.toISOString()}&end=${t.toISOString()}`).then(i=>this.due=i??[]).catch(()=>this.due=[])}}tick(C){let{todo:H}=this.ids();H&&this.hass.callService("todo","update_item",{item:C.uid,status:"completed"},{entity_id:H})}add(C){C.preventDefault();let H=C.target.querySelector("input"),{todo:V}=this.ids();V&&H.value.trim()&&this.hass.callService("todo","add_item",{item:H.value.trim()},{entity_id:V}),H.value="",this.adding=!1}render(){let C=this.items.filter(V=>V.status==="needs_action"),{todo:H}=this.ids();return e`
      <div class="head"><span class="title">Your day</span>
        ${H?e`<button class="more" @click=${()=>this.adding=!this.adding}>${l(o5,"")}Add</button>`:""}</div>
      ${this.adding?e`<form class="addrow" @submit=${this.add}><input placeholder="A new to-do for Today" autofocus />
        <button class="act primary" type="submit">Add</button></form>`:""}
      ${C.length?e`<ul class="todos">${C.map(V=>e`<li>
          <button class="tick" title="Done" @click=${()=>this.tick(V)}></button><span>${V.summary}</span></li>`)}</ul>`:e`<div class="empty">${l(X,"")}Nothing left on today's list.</div>`}
      ${this.due.length?e`<div class="eyebrow" style="margin-top:16px">Coming due</div>
        <ul class="dues">${this.due.slice(0,4).map(V=>{let L=X5(V.start.date??V.start.dateTime??"");return e`<li><span class="bubble sm ${/late|Today/.test(L)?"warn":"brown"}">${l(X2,"")}</span>
            <span class="grow ellipsis">${V.summary}</span><span class="when">${L}</span></li>`})}</ul>`:""}`}},m2=class extends R{static{this.properties={hass:{attribute:!1},asked:{state:!0},answer:{state:!0},busy:{state:!0}}}static{this.styles=E}constructor(){super(),this.asked="",this.answer="",this.busy=!1}async ask(C){C.preventDefault();let H=C.target.querySelector("input"),V=H.value.trim(),L=c(u(this.hass),"assistant");if(!(!V||!L||this.busy)){H.value="",this.asked=V,this.answer="",this.busy=!0;try{let r=await this.hass.callWS({type:"conversation/process",text:V,agent_id:L,conversation_id:this.conversation,language:"en"});this.conversation=r?.conversation_id??this.conversation,this.answer=r?.response?.speech?.plain?.speech??"Hisho didn't answer."}catch(r){this.answer=`I couldn't reach Hisho (${r?.message??"error"}).`}finally{this.busy=!1}}}render(){return c(u(this.hass),"assistant")?e`
      <form class="ask" @submit=${this.ask}>
        <span class="bubble sm accent">${l(B1,"")}</span>
        <input placeholder="Ask Hisho anything…" aria-label="Ask Hisho" />
        <button class="send" type="submit" title="Ask" ?disabled=${this.busy}>${l(q2,"")}</button>
      </form>
      ${this.asked?e`<div class="answer"><div class="q">${this.asked}</div>
        <div class="a">${this.busy?e`<span class="thinking">${l(a5,"")}Thinking…</span>`:this.answer}</div></div>`:""}`:e``}};for(let[M,C]of[["hisho-day",n2],["hisho-ask",m2]])customElements.get(M)||customElements.define(M,C);var P1=class extends S{static{this.properties={...S.properties,selected:{state:!0}}}static{this.styles=[E,D`
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
  `]}static getStubConfig(){return{type:"custom:hisho-control-center-card"}}connectedCallback(){super.connectedCallback(),this.clock=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.clock)}getGridOptions(){return{columns:"full",min_columns:12}}getCardSize(){return 12}body(){let C=this.hass,H=u(C),V=T(C,"machine"),L=m(C,H,"core_reachable"),r=m(C,H,"machines_online"),t=m(C,H,"machines_faulted"),o=m(C,H,"needs_you_count")?.attributes.alerts??[],A=o.filter(y=>y.severity==="critical").length,a=m(C,H,"jobs_active")?.attributes.jobs??[],p=a.filter(y=>["queued","routed","running"].includes(y.status)).length,v=a.filter(y=>y.status==="failed").length,x=m(C,H,"sync_problem"),O=m(C,H,"sync_conflicts"),f=c(H,"fleet_maintenance"),n=f?C.states[f]?.state==="on":!1,h=L?.state==="off",b=F(r)?Number(r.state):void 0,k=F(t)?Number(t.state):0,s=F(O)?Number(O.state)||0:void 0,B=o.length,P=x?.state==="on",{time:C1,date:_}=t2(C),U1=v5(C),Z2=x5(C),G1=s5(C),h5=Number(m(C,H,"today")?.state)||0;return this.frame(e`
      <div class="hero">
        <div class="hello">
          <div class="when">${_} · ${C1}</div>
          <h1>${this.config.title??I2(C)}</h1>
          <p class="summary">${this.summary(h,B,A,h5,U1.length,G1.length)}</p>
        </div>
        <div class="askwrap glass"><hisho-ask .hass=${C}></hisho-ask></div>
      </div>

      ${this.system(V.length,b,k,h,P,s,p,f,n)}

      <div class="body">
        <div class="col">
          <section class="panel glass"><hisho-day .hass=${C}></hisho-day></section>
          <section class="panel glass">
            <div class="head"><span class="title">Hisho is working on</span>
              ${v?e`<span class="chip warn">${v} failed</span>`:""}</div>
            ${U1.length?e`<ul class="list">${U1.map(y=>e`<li class="item bubbled">
                <span class="bubble sm ${y.tone}">${l(y.path,"")}</span>
                <div class="bodycol"><span class="summary">${y.what}</span><span class="muted">${y.sub}</span></div></li>`)}</ul>`:e`<div class="empty">${l(V5,"")}Nothing running right now. Ask Hisho for something.</div>`}
            ${Z2.length?e`<div class="eyebrow" style="margin-top:16px">Done for you · last 24 hours</div>
              <ul class="dones">${Z2.slice(0,6).map(y=>e`<li>${l(O1,"")}<span class="grow">${y.what}</span>
                <span class="muted">${y.when}</span></li>`)}</ul>`:""}
          </section>
        </div>
        <div class="col">
          <section class="panel glass">
            <hisho-needs-you-card .hass=${C} .config=${{type:"custom:hisho-needs-you-card",embedded:!0,compact:!0,title:"Needs your decision",limit:this.config.needs_you_limit??6}}></hisho-needs-you-card>
            ${G1.length?e`<div class="eyebrow" style="margin-top:16px">Projects waiting on you</div>
              <ul class="list">${G1.slice(0,4).map(y=>e`<li class="item bubbled">
                <span class="bubble sm brown">${l(f1,"")}</span>
                <div class="bodycol"><span class="summary">${y.title}</span>
                  ${y.asks?.length?e`<span class="muted">${y.asks[0]}</span>`:y.next?e`<span class="muted">Next: ${y.next}</span>`:""}</div>
              </li>`)}</ul>`:""}
          </section>
        </div>
      </div>

    `)}system(C,H,V,L,r,t,i,o,A){let d=this.hass,a=C-(H??0),p=T(d,"machine"),v=T(d,"box"),x=T(d,"addon"),O=s=>{let B=c(s,"maintenance");if(B&&d.states[B]?.state==="on")return["brown","maintenance"];if(s.kind==="machine"){let _=m(d,s,"machine_state")?.state??"unknown";return[g(_),_]}if(s.kind==="addon"){let _=m(d,s,"addon_status")?.state??"unknown";return[g(_),_]}let P=m(d,s,"box_health")?.state,C1=m(d,s,"box_state")?.state;return P&&g(P)!=="ok"&&g(P)!=="off"?[g(P),P]:[g(C1??P),C1??P??"unknown"]},f=[...p,...v,...x].filter(s=>["bad","warn"].includes(O(s)[0])).length,n=!L&&!V&&!r&&!f,h=s=>{let[B,P]=O(s);return e`<button class="pill ${B} ${this.selected===s.id?"sel":""}"
        @click=${()=>this.selected=this.selected===s.id?void 0:s.id}>
        <span class="dot ${B}"></span><span class="pn">${s.name}</span><span class="ps">${P}</span></button>`},b=[...p,...v,...x].find(s=>s.id===this.selected),k=(s,B)=>B.length?e`<div class="sysgroup"><div class="eyebrow">${s}</div><div class="pills">${B.map(h)}</div></div>`:"";return e`<section class="system glass">
      <div class="sysbar">
        <span class="bubble sm ${n?"accent":"bad"}">${l(n?d5:A5,"")}</span>
        <span class="grow sysline">${L?e`<b class="bad">Hisho Core isn't answering</b>`:e`<b>${H??"\u2013"} of ${C}</b> machines up${a?e` <span class="muted">(${a} parked)</span>`:""}${V?e`, <b class="bad">${V} faulted</b>`:""} ·
          Sync ${r?e`<b class="bad">has a problem</b>`:"OK"}${t?` \xB7 ${t} conflict files`:""}${f?e` · <b class="warnc">${f} need${f===1?"s":""} a look</b>`:""}${i?` \xB7 ${i} job${i>1?"s":""} running`:""}`}</span>
        ${o?e`<button class="act ${A?"brown":""}" @click=${()=>N(this,d,o,!A,A?void 0:"Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.")}>${l(r1,"")}${A?"End fleet maintenance":"Fleet maintenance"}</button>`:""}
        <button class="more" @click=${()=>U2("machines")}>Machines ${l(j2,"")}</button>
      </div>
      <div class="sysgrid">${k("Machines",p)}${k("Devices",v)}${k("Add-ons",x)}</div>
      ${b?e`<div class="drawer">
        <button class="close" title="Close" @click=${()=>this.selected=void 0}>${l(H5,"")}</button>
        ${b.kind==="machine"?e`<hisho-machine-card .hass=${d} .config=${{type:"custom:hisho-machine-card",machine:b.name,embedded:!0}}></hisho-machine-card>`:e`<hisho-device-card .hass=${d} .config=${{type:"custom:hisho-device-card",device:b.name,embedded:!0}}></hisho-device-card>`}
      </div>`:""}
    </section>`}summary(C,H,V,L,r,t){if(C)return"Hisho Core isn't answering Home Assistant, so what you see here may be out of date.";let i=(a,p,v=p+"s")=>`${a} ${a===1?p:v}`,o=[],A=H-V;V?o.push(A?`${i(V,"urgent thing")} and ${A} more need you`:`${i(V,"urgent thing")} needs you`):H&&o.push(`${i(H,"thing")} need${H===1?"s":""} your answer`),t&&o.push(`${i(t,"project")} waiting on you`),L&&o.push(`${i(L,"to-do")} left today`);let d=o.length?o.join(", ").replace(/^\w/,a=>a.toUpperCase())+".":"Nothing needs you right now.";return r?`${d} Hisho is working on ${i(r,"thing")} for you.`:d}};var T1=class extends S{static getStubConfig(C){return{type:"custom:hisho-machine-card",machine:(C?Object.values(C.devices??{}).find(V=>V.model&&V.via_device_id):void 0)?.name??""}}setConfig(C){if(!C?.machine)throw new Error("Say which machine: machine: <name>");super.setConfig(C)}body(){let C=this.hass,H=m1(C,this.config.machine,"machine");if(!H)return e`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;let V=m(C,H,"machine_state"),L=V?.attributes.machine??H.name,r=$(C),t=V?.attributes.power??[],i=V?.attributes.items??[],o=U(C,H,"unit"),A=U(C,H,"restart_unit"),d=U(C,H,"service"),a=c(H,"maintenance"),p=(n,h)=>{let b=m(C,H,n);return F(b)?e`<div class="row spread kvrow"><span class="muted">${h}</span>
        <span>${b.state}${b.attributes.unit_of_measurement?" "+b.attributes.unit_of_measurement:""}</span></div>`:""},v=m(C,H,"online")?.state==="on",x=d2(H),O=g(V?.state),f=[["Mem","memory_usage"],["Disk","disk_usage"],["GPU","gpu_usage"]].map(([n,h])=>[n,c1(m(C,H,h)?.state)]).filter(n=>n[1]!==void 0);return this.frame(e`<div class="mcard"><div class="mleft">
      <div class="mhead" style="margin-bottom:14px">
        <span class="bubble ${v?O==="ok"?"accent":O:"off"}">${l(A2(H),"")}</span>
        <span class="grow"><span class="name">${this.config.title??H.name}</span>
          ${V?.attributes.role?e`<span class="muted ellipsis sub">${V.attributes.role}</span>`:""}</span>
        <span class="chip ${O}">${V?.state??"unknown"}</span>
      </div>
      ${f.length?e`<div class="rings" style="margin-bottom:12px;max-width:340px">${f.map(([n,h])=>S1(n,h))}</div>`:""}
      ${p("awake","Parking")} ${p("jobs_running","Jobs running")} ${p("jobs_queued","Jobs queued")}
      ${p("containers_running","Containers")} ${p("sync_connected","Sync")}
      <div class="row" style="margin-top:8px">
        ${t.includes("wake")&&r.has("machine.wake")?e`<button class="act" @click=${()=>Z(this,C,"machine.wake",L)}>${l(b1,"")}Wake</button>`:""}
        ${t.includes("park")&&r.has("machine.park")?e`<button class="act danger" @click=${()=>Z(this,C,"machine.park",L,{},`Park ${H.name}? It powers off until something needs it.`)}>${l(k1,"")}Park</button>`:""}
        ${a?e`<button class="act ${C.states[a]?.state==="on"?"brown":""}" @click=${()=>{let n=C.states[a]?.state==="on";N(this,C,a,!n,n?void 0:`Put ${H.name} in maintenance? Its alerts are held and its VM shuts down.`)}}>${l(r1,"")}${C.states[a]?.state==="on"?"End maintenance":"Maintenance"}</button>`:""}
      </div>
      ${x?e`<div class="eyebrow" style="margin-top:18px">${x[1]} · last 24 hours</div>
        <hisho-spark .hass=${C} .entity=${x[0]} .min=${0} .max=${100} style="height:56px"></hisho-spark>`:""}
      </div><div class="mright">
      ${d.length||o.length?e`<div class="eyebrow">Services</div>`:""}
      <ul class="list">
        ${d.map(n=>e`<li><div class="row spread"><span>${Y(n,H)}</span>
          <span class="chip ${n.state==="on"?"ok":"bad"}">${n.state==="on"?"running":n.attributes.state??"stopped"}</span></div></li>`)}
        ${o.map(n=>{let h=Y(n,H),b=A.find(s=>Y(s,H)===`Restart ${h}`),k=n.state;return e`<li><div class="row spread"><span>${h}</span><span class="row">
            ${F(n)?e`<button class="act ${n.state==="on"?"danger":""}" @click=${()=>N(this,C,n.entity_id,n.state!=="on",n.state==="on"?`Stop ${h} on ${H.name}?`:void 0)}>
              ${n.state==="on"?"Stop":"Start"}</button>`:e`<span class="muted">${k}</span>`}
            ${b?e`<button class="act" @click=${()=>W2(this,C,b.entity_id)}>Restart</button>`:""}
          </span></div></li>`})}
      </ul>
      ${i.length?e`<div class="eyebrow" style="margin-top:18px">From add-ons</div>`:""}
      <ul class="list">${i.map(n=>e`<li>
        <div class="row spread"><span>${n.name}</span><span class="chip ${g(n.state)}">${n.state}</span></div>
        ${n.facts?.length?e`<div class="detail">${n.facts.join(" \xB7 ")}</div>`:""}
        ${r.has("device.press")&&n.actions?.length?e`<div class="row">${n.actions.map(h=>e`
          <button class="act ${h.danger?"danger":""}" @click=${()=>Z(this,C,"device.press",n.addon,{entry:n.entry,item:n.id,action:h.id},h.danger?`${h.label}: ${n.name} on ${H.name}?`:void 0)}>${h.label}</button>`)}</div>`:""}
      </li>`)}</ul>
    </div></div>
      <button class="link" style="margin-top:12px;font-size:0.86em" @click=${()=>V&&G(this,V.entity_id)}>History…</button>`)}};var J5={critical:"bad",decision:"decide",warn:"warn",info:"off"},C3={critical:K2,decision:t5,warn:h1,info:o2},F1=class extends S{static{this.properties={...S.properties,items:{state:!0},showDone:{state:!0},expanded:{state:!0},showAll:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-needs-you-card"}}constructor(){super(),this.items=[],this.showDone=!1,this.expanded=new Set,this.showAll=!1}updated(C){super.updated(C);let H=c(u(this.hass),"needs_you"),V=H?this.hass.states[H]?.last_changed+"|"+this.hass.states[H]?.state:void 0;H&&V!==this.seen&&(this.seen=V,this.hass.callWS({type:"todo/item/list",entity_id:H}).then(L=>this.items=L.items??[]).catch(()=>this.items=[]))}body(){let C=this.hass,H=u(C),V=m(C,H,"needs_you_count")?.attributes.alerts??[],L=new Map(V.map(a=>[a.id,a.severity])),r=V.filter(a=>a.severity==="decision"&&/asks to connect/.test(a.title)),t=this.items.filter(a=>this.showDone||a.status==="needs_action"),i=this.items.filter(a=>a.status==="completed").length,o=this.config.limit??50,A=this.showAll?t:t.slice(0,o),d=$(C);return this.frame(e`
      <div class="head">${this.heading("Needs you")}
        <span class="row">${t.length?e`<span class="chip ${V.some(a=>a.severity==="critical")?"bad":"warn"} num">${t.filter(a=>a.status==="needs_action").length} open</span>`:""}
        ${i?e`<button class="act" @click=${()=>this.showDone=!this.showDone}>
          ${this.showDone?"Hide":"Show"} ${i} acknowledged</button>`:""}</span></div>
      ${r.map(a=>e`<div class="tile decide" style="margin-bottom:8px"><span class="row"><span class="chip decide">decide</span>
        <span>${a.title}</span></span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${t.length?"":e`<div class="empty">${l(X,"")}Nothing needs you right now.</div>`}
      <ul class="list">${A.map(a=>{let p=L.get(a.uid)??(a.description?.split(":")[0]||"").toLowerCase(),v=a.status==="completed",x=!this.config.compact||this.expanded.has(a.uid),O=v?"off":J5[p]??g(p);return e`<li class="item bubbled ${O}">
          <span class="bubble sm ${O}">${l(C3[p]??o2,"")}</span>
          <div class="bodycol">
          <div class="row spread" style="cursor:${this.config.compact?"pointer":"default"}" @click=${()=>this.flip(a.uid)}>
            <span class="grow"><span class="summary ${this.config.compact&&!x?"ellipsis":""}">${a.summary}</span>
              <span class="chip ${O} plain sev">${v?"acknowledged":p||"alert"}</span></span>
            ${this.config.compact?e`<span class="chev ${x?"open":""}">${l(g1,"")}</span>`:""}</div>
          ${x&&a.description?e`<div class="detail">${a.description.replace(/^[A-Z]+:\s*/,"")}</div>`:""}
          ${x&&d.has("alert.ack")?e`<div class="row">
            ${v?e`<button class="act" @click=${()=>this.alert(a.uid,"unack")}>Un-acknowledge</button>`:e`<button class="act primary" @click=${()=>this.alert(a.uid,"ack")}>${l(O1,"")}Acknowledge</button>
                     <button class="act" @click=${()=>this.alert(a.uid,"snooze")}>${l(z2,"")}Snooze 1 h</button>`}
            <button class="act" @click=${()=>this.alert(a.uid,"investigate")}>${l(i5,"")}Investigate</button>
            <button class="act" @click=${()=>this.alert(a.uid,"notify")}>${l(J2,"")}Send to phone</button>
          </div>`:""}
          </div>
        </li>`})}</ul>
      ${t.length>A.length||this.showAll?e`<button class="link" style="margin-top:6px;font-size:0.86em"
        @click=${()=>this.showAll=!this.showAll}>${this.showAll?"Show fewer":`Show all ${t.length}`}</button>`:""}
    `)}flip(C){if(!this.config.compact)return;let H=new Set(this.expanded);H.delete(C)||H.add(C),this.expanded=H}alert(C,H){return Z(this,this.hass,`alert.${H}`,C,H==="snooze"?{hours:1}:{})}};function v2(M,C){let H=C??{};return Object.entries(M??{}).map(([V,L])=>{let r=L.endsWith("?"),t=L.replace(/\?$/,""),i=/^list\((.*)\)$/.exec(t);return{key:V,type:i?"list":t,optional:r,choices:i?i[1].split("|").map(o=>o.trim()).filter(Boolean):[],label:H[V]??V.replace(/_/g," ")}})}var l2=M=>M.type==="password"||M.type==="secret",H3=/^[A-Z][A-Z0-9_]{2,127}$/;function x2(M,C){let H=M.key;if(M.type==="bool")return e`<input type="checkbox" name=${H} .checked=${!!C} />`;if(M.type==="list")return e`<select name=${H}>${M.choices.map(r=>e`<option value=${r} ?selected=${r===C}>${r}</option>`)}</select>`;let V=M.type==="int"||M.type==="port"?"number":M.type==="url"?"url":"text",L=l2(M)?"secret's name, e.g. CLOUDFLARE_EXAMPLE_TOKEN":M.optional?"optional":"";return e`<input type=${V} name=${H} .value=${C??""} placeholder=${L}
    pattern=${l2(M)?"[A-Z][A-Z0-9_]{2,127}":".*"} />`}function s2(M,C,H={}){let V={};for(let L of C){let r=M.elements.namedItem(L.key);if(!r)continue;let t=r instanceof HTMLInputElement&&r.type==="checkbox"?r.checked:r.value.trim();if((L.type==="int"||L.type==="port")&&t!==""&&(t=Number(t)),l2(L)&&t&&!H3.test(t))return{values:V,error:`${L.label}: give the secret's name, not its value (paste values in Hisho's dashboard).`};t!==(H[L.key]??(L.type==="bool"?!1:""))&&(V[L.key]=t)}return{values:V}}var Z5=`
  form.settings { display: grid; grid-template-columns: minmax(110px, 38%) 1fr; gap: 6px 10px; align-items: center; margin: 8px 0; }
  form.settings label { color: var(--secondary-text-color); font-size: 0.9em; overflow-wrap: anywhere; }
  form.settings input, form.settings select {
    font: inherit; padding: 4px 6px; border-radius: 6px; border: 1px solid var(--divider-color);
    background: var(--card-background-color); color: var(--primary-text-color); min-width: 0;
  }
  form.settings input[type=checkbox] { justify-self: start; }
  form.settings .full { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; }
  .error { color: var(--error-color, #db4437); font-size: 0.9em; }
`;var V3=(M,C)=>$(M).has(C),R1=class extends S{static{this.properties={...S.properties,error:{state:!0}}}static{this.styles=[E,D`${s1(Z5)}`]}static getStubConfig(){return{type:"custom:hisho-device-card",device:""}}setConfig(C){if(!C?.device)throw new Error("Say which device: device: <name>");super.setConfig(C)}body(){let C=m1(this.hass,this.config.device,"box")??m1(this.hass,this.config.device,"addon");return C?C.kind==="addon"?this.addon(C):this.box(C):e`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`}maintenance(C,H){let V=c(C,"maintenance");if(!V)return"";let L=this.hass.states[V]?.state==="on";return e`<button class="act ${L?"":"danger"}" @click=${()=>N(this,this.hass,V,!L,L?void 0:`Put ${H} in maintenance? Its alerts are held.`)}>
      ${L?"End maintenance":"Maintenance"}</button>`}box(C){let H=this.hass,V=m(H,C,"box_state"),L=m(H,C,"box_health"),r=$(H);return this.frame(e`
      <div class="head"><div class="title">${this.config.title??C.name}</div>
        <span class="row"><span class="chip ${g(V?.state)}">${V?.state??"unknown"}</span>
          <span class="chip ${g(L?.state)}">${L?.state??"unknown"}</span></span></div>
      ${L?.attributes.summary?e`<div class="detail">${L.attributes.summary}</div>`:""}
      <ul class="list" style="margin-top:10px">${U(H,C,"box_item").map(t=>{let i=t.attributes;return e`<li>
          <div class="row spread"><span class="name" @click=${()=>G(this,t.entity_id)}>${Y(t,C)}</span>
            <span class="chip ${g(t.state)}">${F(t)?t.state:"unavailable"}</span></div>
          ${i.facts?.length?e`<div class="detail">${i.facts.join(" \xB7 ")}</div>`:""}
          ${r.has("device.press")&&i.actions?.length?e`<div class="row">${i.actions.map(o=>e`
            <button class="act ${o.danger?"danger":""}" @click=${()=>Z(this,H,"device.press",i.addon,{entry:i.entry,item:i.item_id,action:o.id},o.danger?`${o.label}: ${Y(t,C)} on ${C.name}?`:void 0)}>${o.label}</button>`)}</div>`:""}
        </li>`})}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(C,C.name)}</div>
    `)}addon(C){let H=this.hass,V=m(H,C,"addon_status"),L=c(C,"addon_enabled"),r=V?.attributes??{},t=$(H);return this.frame(e`
      <div class="head"><div class="title">${this.config.title??C.name}</div>
        <span class="chip ${g(V?.state)}">${V?.state??"unknown"}</span></div>
      <div class="muted">${[r.kind,r.version&&"v"+r.version,r.host&&"on "+r.host].filter(Boolean).join(" \xB7 ")}</div>
      ${r.problems?.length?e`<ul class="list" style="margin-top:8px">${r.problems.map(i=>e`<li><span class="detail">${i}</span></li>`)}</ul>`:""}
      <div class="row" style="margin-top:10px">
        ${t.has("addon.run")?(r.actions??[]).map(i=>e`<button class="act ${i.danger?"danger":""}"
          @click=${()=>Z(this,H,"addon.run",r.addon,{action:i.id},i.danger?`${i.label} (${C.name})?`:void 0)}>${i.label}</button>`):""}
        ${this.maintenance(C,C.name)}
        ${L?e`<button class="act ${H.states[L]?.state==="on"?"danger":""}" @click=${()=>{let i=H.states[L]?.state==="on";N(this,H,L,!i,i?`Turn ${C.name} off? Hisho stops running it.`:void 0)}}>${H.states[L]?.state==="on"?"Turn off":"Turn on"}</button>`:""}
      </div>
      ${t.has("addon.config")?this.settings(r):""}
    `)}settings(C){let H=this.hass,V=C.settings??{},L=v2(V.schema,{}),r=v2(V.entry_schema,V.entry_form),t=V.entries??[];if(!L.length&&!r.length)return"";let i=async A=>{A.preventDefault();let{values:d,error:a}=s2(A.target,L,V.options??{});this.error=a??"",!(a||!Object.keys(d).length)&&await Z(this,H,"addon.config",C.addon,{settings:d})},o=async(A,d)=>{A.preventDefault();let a=A.target.closest("form"),p=a.elements.namedItem("__entry").value.trim(),{values:v,error:x}=s2(a,r);this.error=x??(p?"":"Give the entry a name."),!this.error&&await Z(this,H,d?"addon.test":"addon.entry",C.addon,{entry:p,settings:v})};return e`<details style="margin-top:12px"><summary class="muted">Settings</summary>
      ${this.error?e`<div class="error">${this.error}</div>`:""}
      ${L.length?e`<form class="settings" @submit=${i}>
        ${L.map(A=>e`<label>${A.label}</label>${x2(A,(V.options??{})[A.key])}`)}
        <div class="full"><button class="act" type="submit">Save</button>
          ${V3(H,"addon.apply")?e`<button class="act" type="button" @click=${()=>Z(this,H,"addon.apply",C.addon)}>Apply on its machine</button>`:""}</div>
      </form>`:""}
      ${r.length?e`<div class="muted" style="margin-top:8px">${V.entry_label??"Entries"}</div>
        <ul class="list">${t.map(A=>e`<li><div class="row spread"><span>${A}</span>
          <button class="act danger" @click=${()=>Z(this,H,"addon.entry",C.addon,{entry:A,settings:{_remove:!0}},`Remove ${A} from ${C.addon}?`)}>Remove</button></div></li>`)}</ul>
        <form class="settings" @submit=${A=>o(A,!1)}>
          <label>Name</label><input name="__entry" placeholder="a short name" />
          ${r.map(A=>e`<label>${A.label}</label>${x2(A,void 0)}`)}
          <div class="full"><button class="act" type="button" @click=${A=>o(A,!0)}>Test</button>
            <button class="act" type="submit">Add or replace</button></div>
        </form>`:""}
    </details>`}};var L3={running:M1,queued:l1,routed:l1,failed:h1,done:X},$1=class extends S{static getStubConfig(){return{type:"custom:hisho-jobs-card"}}body(){let C=this.hass,H=m(C,u(C),"jobs_active")?.attributes.jobs??[],V=$(C),L=this.config.limit??10;return this.frame(e`
      <div class="head">${this.heading("Jobs")}
        ${V.has("jobs.reap")?e`<button class="act" @click=${()=>Z(this,C,"jobs.reap")}>Fail stuck jobs</button>`:""}</div>
      ${H.length?"":e`<div class="empty">${l(X,"")}No jobs.</div>`}
      <ul class="list">${H.slice(0,L).map(r=>{let t=["queued","routed","running"].includes(r.status),i=g(r.status);return e`<li class="item bubbled ${i}">
          <span class="bubble sm ${i==="ok"?"accent":i}">${l(L3[r.status]??L5,"")}</span>
          <div class="bodycol">
          <div class="row spread"><span class="ellipsis">${r.kind}${r.worker?e` <span class="muted">on ${r.worker}</span>`:""}</span>
            <span class="row" style="flex-wrap:nowrap">
            ${t&&V.has("job.cancel")?e`<button class="act danger" @click=${()=>Z(this,C,"job.cancel",r.id,{},`Cancel this ${r.kind} job?`)}>Cancel</button>`:""}
            ${r.status==="failed"&&V.has("job.retry")?e`<button class="act" @click=${()=>Z(this,C,"job.retry",r.id)}>Retry</button>`:""}
            ${!t&&V.has("job.clear")?e`<button class="act" @click=${()=>Z(this,C,"job.clear",r.id)}>Clear</button>`:""}
            <span class="chip ${g(r.status)}">${r.status}</span></span></div>
          ${r.reason?e`<div class="detail">${r.reason}</div>`:""}
          </div>
        </li>`})}</ul>
      ${H.length>L?e`<div class="muted" style="margin-top:6px">${H.length-L} more on the Projects page</div>`:""}
    `)}},D1=class extends S{static getStubConfig(){return{type:"custom:hisho-projects-card"}}body(){let C=this.hass,H=m(C,u(C),"projects_active")?.attributes.projects??[],V=$(C),L=t=>!!t.asks?.length||!["","claude","hisho"].includes(String(t.waiting_on??"").toLowerCase()),r=H.filter(t=>t.status==="active").sort((t,i)=>Number(L(i))-Number(L(t)));return this.frame(e`
      <div class="head">${this.heading("Projects")}<span class="muted">${r.length} active</span></div>
      <ul class="list">${r.slice(0,this.config.limit??20).map(t=>e`<li>
        <div class="row spread"><span class="ellipsis">${t.title}${t.company?e` <span class="muted">${t.company}</span>`:""}</span>
          ${L(t)?e`<span class="chip warn">waiting on you</span>`:""}</div>
        ${t.asks?.length?e`<div class="detail">${t.asks.join(`
`)}</div>`:t.next?e`<div class="detail">Next: ${t.next}</div>`:""}
        <div class="row">
          ${V.has("project.open")?e`<button class="act" @click=${()=>Z(this,C,"project.open",t.name)}>Open</button>`:""}
          ${V.has("project.archive")?e`<button class="act danger" @click=${()=>Z(this,C,"project.archive",t.name,{},`Archive ${t.title}? Nothing is deleted; it can be restored.`)}>Archive</button>`:""}
        </div>
      </li>`)}</ul>
    `)}};var E1=class extends S{static getStubConfig(){return{type:"custom:hisho-store-card"}}body(){let C=this.hass,H=m(C,u(C),"addon_updates"),V=H?.attributes.store??[],L=H?.attributes.repositories??[],r=$(C);if(!r.has("store.install")&&!r.has("store.update"))return e`<ha-card><div class="head">${this.heading("Add-on store")}</div>
        <div class="empty">Hisho does not let this Home Assistant change its add-ons.</div></ha-card>`;let t=[...V].sort((i,o)=>+!!o.update_available-+!!i.update_available||+!!o.installed-+!!i.installed||String(i.title).localeCompare(String(o.title)));return e`<ha-card>
      <div class="head">${this.heading("Add-on store")}<span class="muted">${V.filter(i=>i.installed).length} installed</span></div>
      <ul class="list">${t.map(i=>e`<li>
        <div class="row spread"><span>${i.title}</span>
          <span class="chip ${i.update_available?"warn":i.installed?"ok":"off"}">${i.update_available?i.installed_version===i.version?`v${i.version} \xB7 update available`:`${i.installed_version} \u2192 ${i.version}`:i.installed?`v${i.installed_version}`:`v${i.version}`}</span></div>
        ${i.description?e`<div class="detail">${i.description}</div>`:""}
        <div class="row">
          ${!i.installed&&r.has("store.install")?e`<button class="act" @click=${()=>Z(this,C,"store.install",i.name)}>Install</button>`:""}
          ${i.update_available&&r.has("store.update")?e`<button class="act" @click=${()=>Z(this,C,"store.update",i.name,{host:i.host??""})}>Update</button>`:""}
          ${i.installed&&i.previous&&r.has("store.rollback")?e`<button class="act danger" @click=${()=>Z(this,C,"store.rollback",i.name,{host:i.host??""},`Roll ${i.title} back to the version before? Its settings are kept.`)}>Roll back</button>`:""}
          ${i.installed&&r.has("store.remove")?e`<button class="act danger" @click=${()=>Z(this,C,"store.remove",i.name,{host:i.host??""},`Remove ${i.title}? Its settings are kept; install it again any time.`)}>Remove</button>`:""}
        </div></li>`)}</ul>
      <div class="title" style="margin-top:14px;font-size:1em">Repositories</div>
      <ul class="list">${L.map(i=>e`<li><div class="row spread">
        <span>${i.name}${i.listed==="store"?e` <span class="muted">store</span>`:""}</span>
        <span class="row">
          ${r.has("repository.update")?e`<button class="act" @click=${()=>Z(this,C,"repository.update",i.url)}>Update</button>`:""}
          ${i.listed!=="store"&&r.has("repository.remove")?e`<button class="act danger" @click=${()=>Z(this,C,"repository.remove",i.url,{},`Remove the repository ${i.name}?`)}>Remove</button>`:""}
        </span></div></li>`)}</ul>
      ${r.has("repository.add")?e`<form class="row" style="margin-top:8px" @submit=${i=>{i.preventDefault();let o=i.target.elements.namedItem("url");o.value.trim()&&Z(this,C,"repository.add",o.value.trim()).then(()=>o.value="")}}><input name="url" placeholder="https://github.com/you/hisho-addon-name" style="flex:1;font:inherit;padding:4px 6px;
        border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)" />
        <button class="act" type="submit">Add repository</button></form>`:""}
    </ha-card>`}};var N1=class extends S{static{this.styles=[E,D`
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
  `]}static getStubConfig(){return{type:"custom:hisho-pulse-card"}}getGridOptions(){return{columns:"full",min_columns:6}}body(){let C=this.hass,H=u(C),V=T(C,"machine"),L=m(C,H,"machines_online"),r=m(C,H,"machines_faulted"),t=m(C,H,"needs_you_count"),i=t?.attributes.alerts??[],o=i.filter(n=>n.severity==="critical").length,A=m(C,H,"jobs_active")?.attributes.jobs??[],d=A.filter(n=>["queued","routed","running"].includes(n.status)).length,a=A.filter(n=>n.status==="failed").length,p=m(C,H,"sync_conflicts"),v=F(L)?Number(L.state):void 0,x=F(r)?Number(r.state):0,O=F(p)?Number(p.state)||0:void 0,f=(n,h,b,k,s,B,P,C1="var(--hisho-accent-text)",_)=>e`
      <div class="lt ${n}" @click=${()=>P&&G(this,P)}>
        <div class="top"><div><div class="lv">${h}${b?e`<small>${b}</small>`:""}</div>
          <div class="ll">${k}</div><div class="ls">${s}</div></div>
          <span class="bubble ${n==="ok"?"accent":n||"brown"}">${l(B,"")}</span></div>
        ${P?e`<hisho-spark .hass=${C} .entity=${P} .min=${0} .max=${_}
          .tone=${n==="bad"?"var(--hisho-crit)":C1}></hisho-spark>`:""}
      </div>`;return this.frame(e`<div class="live">
      ${f(x?"bad":v===V.length?"ok":"",v??"\u2013",`/${V.length}`,"Machines online",x?`${x} faulted`:V.length-(v??0)?`${V.length-(v??0)} parked or off`:"All up",y1,L?.entity_id,void 0,V.length)}
      ${f(o?"bad":i.length?"warn":"ok",i.length,"","Needs you",o?`${o} critical`:i.length?"Nothing critical":"All clear",Y2,t?.entity_id,"var(--hisho-brown-text)")}
      ${f(a?"warn":"ok",d,"","Jobs running",a?`${a} failed`:`${A.length} recent`,M1,c(H,"jobs_active"))}
      ${f(O?"warn":"ok",O??"\u2013","","Sync conflicts",O?"Files to sort out":"None",O?e5:C5,p?.entity_id,"var(--hisho-brown-text)")}
    </div>`)}};function u5(M,C){if(!M)return"";let H={month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"};try{return new Date(M).toLocaleString("en-US",{...H,timeZone:C||void 0})}catch{return new Date(M).toLocaleString("en-US",H)}}var _1=class extends S{constructor(){super();this.timezone=null;this.keepDays=30;this.loaded=!1;this.list=[],this.open=null,this.transcript=null,this.person="",this.error="",this.loading=!1}static{this.properties={...S.properties,list:{state:!0},open:{state:!0},transcript:{state:!0},person:{state:!0},error:{state:!0},loading:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-conversations-card"}}updated(H){super.updated(H),!this.loaded&&this.hass&&u(this.hass)&&this.hass.user?.is_admin!==!1&&(this.loaded=!0,this.load())}ws(H){let V=this.config.config_entry_id?{config_entry_id:this.config.config_entry_id}:{};return this.hass.callWS({...H,...V})}async load(){this.loading=!0;try{let H=await this.ws({type:"hisho/conversations/list",limit:this.config.limit??200});this.list=H.conversations??[],this.timezone=H.timezone??null,this.keepDays=H.keep_days??30,this.error=""}catch(H){this.error=H?.code==="unauthorized"?"Only Home Assistant administrators can see these.":`Couldn't load them: ${H?.message??H}`}finally{this.loading=!1}}async toggle(H){if(this.open===H){this.open=null;return}this.open=H,this.transcript=null;try{this.transcript=await this.ws({type:"hisho/conversations/get",conversation_id:H})}catch(V){this.open=null,this.error=`Couldn't open it: ${V?.message??V}`}}async forget(H){let V=H.person?`${H.person}'s`:"this";if(await L1(this,`Delete ${V} conversation "${H.title??""}"? It can't be brought back.`))try{await this.ws({type:"hisho/conversations/delete",conversation_id:H.session_id}),this.list=this.list.filter(L=>L.session_id!==H.session_id),this.open===H.session_id&&(this.open=null)}catch(L){this.error=`Couldn't delete it: ${L?.message??L}`}}source(H){return[H.person??"someone",H.area].filter(Boolean).join(" \xB7 ")+(H.via==="service"?" (automation)":"")}messages(){let H=this.transcript;return H?e`<div class="talk">${(H.messages??[]).map(V=>V.role==="user"?e`<div class="q"><span class="muted">${u5(V.at,this.timezone)}${V.area?` \xB7 ${V.area}`:""}</span>
          <div class="text">${V.text}</div></div>`:e`<div class="a ${V.ok===!1?"failed":""}"><div class="text">${V.text||V.error||"(no answer)"}</div>
          <span class="muted">${[V.model,V.seconds!==void 0?`${V.seconds} s`:"",V.ok===!1&&V.error?V.error:""].filter(Boolean).join(" \xB7 ")}</span></div>`)}</div>`:e`<div class="empty">Loading…</div>`}body(){let H=[...new Set(this.list.map(L=>L.person??"someone"))].sort(),V=this.person?this.list.filter(L=>(L.person??"someone")===this.person):this.list;return this.frame(e`
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
      </style>
      <div class="head">${this.heading("Conversations")}
        <span class="row" style="flex-wrap:nowrap">
          ${H.length>1?e`<select aria-label="Person" @change=${L=>this.person=L.target.value}>
            <option value="">Everyone</option>
            ${H.map(L=>e`<option value=${L} ?selected=${L===this.person}>${L}</option>`)}</select>`:""}
          <button class="act" ?disabled=${this.loading} @click=${()=>this.load()}>Refresh</button></span></div>
      ${this.error?e`<div class="detail" style="color:var(--hisho-crit)">${this.error}</div>`:""}
      ${!V.length&&!this.loading&&!this.error?e`<div class="empty">
        No conversations with Hisho in the last ${this.keepDays} days.</div>`:""}
      <ul class="list">${V.map(L=>e`<li>
        <div class="row spread open" @click=${()=>this.toggle(L.session_id)}>
          <span class="grow ellipsis"><span class="chev ${this.open===L.session_id?"open":""}">▶</span>
            ${L.title||"(no question)"}</span>
          <span class="muted num" style="flex:none">${u5(L.updated,this.timezone)}</span></div>
        <div class="row spread"><span class="muted ellipsis">${this.source(L)} · ${(L.messages??0)/2|0} Q</span>
          <button class="act danger" @click=${()=>this.forget(L)}>Delete</button></div>
        ${this.open===L.session_id?this.messages():""}
      </li>`)}</ul>
      <div class="muted" style="margin-top:8px">Everything people asked Hisho through Home Assistant, kept
        ${this.keepDays} days${this.timezone?e`; times in ${this.timezone.replace(/_/g," ")}`:""}.</div>
    `)}};function W1(M){return{...M,card_mod:{style:E2}}}var e1={grid_options:{columns:"full"}};function J(M,C){return{...M,type:"sections",max_columns:4,dense_section_placement:!0,sections:C.filter(H=>(Array.isArray(H)?H:H.cards).length).map(H=>Array.isArray(H)?{type:"grid",cards:H}:H)}}var c5=["Server","Vm","Storage","Device","Network"],M3={Server:"Servers",Vm:"Virtual machines",Storage:"Storage",Device:"Devices",Network:"Network"};function r3(M,C={}){let H=u(M);if(!H)return{title:"Hisho",views:[{title:"Hisho",path:"hisho",icon:"mdi:server-network",cards:[{type:"markdown",content:"The **Hisho** integration is not set up yet: Settings \u203A Devices & services \u203A Add integration \u203A Hisho."}]}]};let V=T(M,"machine"),L=T(M,"box"),r=T(M,"addon"),t=c(H,"today"),i=c(H,"due_dates"),o=["phone","phone_alerts","clear_phone","hide_acked"].map(p=>c(H,p)).filter(p=>!!p),A=new Map;for(let p of L){let v=c5.includes(p.model)?p.model:"Device";A.set(v,[...A.get(v)??[],p.name])}let d=D2(C.background);return{title:"Hisho",views:[{title:"Overview",path:"overview",icon:"mdi:view-dashboard",type:"panel",cards:[{type:"custom:hisho-control-center-card"}]},J({title:"Machines",path:"machines",icon:"mdi:server"},[{type:"grid",column_span:4,cards:[{type:"custom:hisho-pulse-card",...e1}]},...V.map(p=>[{type:"custom:hisho-machine-card",machine:p.name}])]),J({title:"Devices",path:"devices",icon:"mdi:devices"},c5.filter(p=>A.has(p)).map(p=>({type:"grid",column_span:Math.min(4,A.get(p).length),cards:[{type:"heading",heading:M3[p]},...A.get(p).map(v=>({type:"custom:hisho-device-card",device:v}))]}))),J({title:"Add-ons",path:"addons",icon:"mdi:puzzle"},[...c(H,"addon_updates")?[{type:"grid",column_span:2,cards:[{type:"custom:hisho-store-card",...e1}]}]:[],...r.map(p=>[{type:"custom:hisho-device-card",device:p.name}])]),...t||i?[J({title:"Today",path:"today",icon:"mdi:calendar-today"},[t?[W1({type:"todo-list",entity:t,title:"Today"})]:[],i?{type:"grid",column_span:3,cards:[W1({type:"calendar",entities:[i],initial_view:"dayGridMonth",title:"Due dates",...e1})]}:[]])]:[],J({title:"Projects",path:"projects",icon:"mdi:folder-multiple"},[{type:"grid",column_span:2,cards:[{type:"custom:hisho-projects-card",...e1}]},{type:"grid",column_span:2,cards:[{type:"custom:hisho-jobs-card",title:"All jobs",limit:50,...e1}]}]),J({title:"Conversations",path:"conversations",icon:"mdi:message-text-clock"},[{type:"grid",column_span:3,cards:[{type:"custom:hisho-conversations-card",...e1}]}]),J({title:"Phone",path:"phone",icon:"mdi:cellphone-message"},[[W1({type:"entities",title:"Hisho phone app",entities:o}),W1({type:"markdown",content:"Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity."})]])].map(p=>({...p,background:d}))}}var I1=class extends HTMLElement{static async generate(C,H){return r3(H,C)}};var e3="0.6.1";m5();var S5=[["hisho-control-center-card",P1,"Hisho control center","Hisho's Overview in one wide card: your day, decisions, what Hisho is doing and did, Ask Hisho. Best in a panel view."],["hisho-pulse-card",N1,"Hisho pulse","Machines online, needs you, jobs, sync conflicts, with their last 24 hours."],["hisho-fleet-card",w1,"Hisho fleet","Every machine: state, readings, wake / park, maintenance."],["hisho-machine-card",T1,"Hisho machine","One machine in full: readings, services, its add-on buttons."],["hisho-needs-you-card",F1,"Hisho needs you","Hisho's needs-you list: acknowledge, snooze, investigate."],["hisho-device-card",R1,"Hisho device","A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],["hisho-jobs-card",$1,"Hisho jobs","Hisho's jobs: cancel, retry, clear."],["hisho-projects-card",D1,"Hisho projects","Active projects, what waits on you, open or archive."],["hisho-store-card",E1,"Hisho add-on store","Install, update, roll back or remove add-ons; repositories."],["hisho-conversations-card",_1,"Hisho conversations","What people asked Hisho through Home Assistant (30 days): who, where, when; open or delete one. Admins only."]];for(let[M,C]of S5)customElements.get(M)||customElements.define(M,C);customElements.get("ll-strategy-dashboard-hisho")||customElements.define("ll-strategy-dashboard-hisho",I1);var Q=window;Q.customCards=Q.customCards||[];for(let[M,,C,H]of S5)Q.customCards.some(V=>V.type===M)||Q.customCards.push({type:M,name:C,description:H,preview:!1,documentationURL:"https://github.com/YepizTechJonathan/hisho-ha-cards"});Q.customStrategies=Q.customStrategies||[];Q.customStrategies.some(M=>M.type==="hisho")||Q.customStrategies.push({type:"hisho",strategyType:"dashboard",name:"Hisho",description:"A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects, conversations."});console.info(`%c HISHO-HA-CARDS %c ${e3} `,"background:#151515;color:#eee","background:#444;color:#fff");export{e3 as VERSION};
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
