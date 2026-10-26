var Y=globalThis,X=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol(),Tt=new WeakMap,V=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(X&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Tt.set(e,t))}return t}toString(){return this.cssText}},Q=n=>new V(typeof n=="string"?n:n+"",void 0,pt),T=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new V(e,n,pt)},Rt=(n,t)=>{if(X)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=Y.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},ut=X?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Q(e)})(n):n;var{is:ee,defineProperty:se,getOwnPropertyDescriptor:ie,getOwnPropertyNames:ne,getOwnPropertySymbols:oe,getPrototypeOf:ae}=Object,tt=globalThis,Pt=tt.trustedTypes,re=Pt?Pt.emptyScript:"",ce=tt.reactiveElementPolyfillSupport,B=(n,t)=>n,mt={toAttribute(n,t){switch(t){case Boolean:n=n?re:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Dt=(n,t)=>!ee(n,t),Mt={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:Dt};Symbol.metadata??=Symbol("metadata"),tt.litPropertyMetadata??=new WeakMap;var k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Mt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&se(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=ie(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){let c=i?.call(this);o?.call(this,a),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Mt}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;let t=ae(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){let e=this.properties,s=[...ne(e),...oe(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ut(i))}else t!==void 0&&e.push(ut(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Rt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:mt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:mt;this._$Em=i;let c=a.fromAttribute(e,o.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let a=this.constructor;if(i===!1&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??Dt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:a}=o,c=this[i];a!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[B("elementProperties")]=new Map,k[B("finalized")]=new Map,ce?.({ReactiveElement:k}),(tt.reactiveElementVersions??=[]).push("2.1.2");var _t=globalThis,Nt=n=>n,et=_t.trustedTypes,jt=et?et.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ft="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Vt="?"+S,le=`<${Vt}>`,M=document,W=()=>M.createComment(""),q=n=>n===null||typeof n!="object"&&typeof n!="function",xt=Array.isArray,de=n=>xt(n)||typeof n?.[Symbol.iterator]=="function",ft=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lt=/-->/g,It=/>/g,R=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ut=/'/g,Ot=/"/g,Bt=/^(?:script|style|textarea|title)$/i,wt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),r=wt(1),ke=wt(2),Se=wt(3),D=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),zt=new WeakMap,P=M.createTreeWalker(M,129);function Kt(n,t){if(!xt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return jt!==void 0?jt.createHTML(t):t}var he=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",a=K;for(let c=0;c<e;c++){let d=n[c],l,h,p=-1,g=0;for(;g<d.length&&(a.lastIndex=g,h=a.exec(d),h!==null);)g=a.lastIndex,a===K?h[1]==="!--"?a=Lt:h[1]!==void 0?a=It:h[2]!==void 0?(Bt.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=R):h[3]!==void 0&&(a=R):a===R?h[0]===">"?(a=i??K,p=-1):h[1]===void 0?p=-2:(p=a.lastIndex-h[2].length,l=h[1],a=h[3]===void 0?R:h[3]==='"'?Ot:Ut):a===Ot||a===Ut?a=R:a===Lt||a===It?a=K:(a=R,i=void 0);let u=a===R&&n[c+1].startsWith("/>")?" ":"";o+=a===K?d+le:p>=0?(s.push(l),d.slice(0,p)+Ft+d.slice(p)+S+u):d+S+(p===-2?c:u)}return[Kt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},G=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,a=0,c=t.length-1,d=this.parts,[l,h]=he(t,e);if(this.el=n.createElement(l,s),P.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=P.nextNode())!==null&&d.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(Ft)){let g=h[a++],u=i.getAttribute(p).split(S),$=/([.?@])?(.*)/.exec(g);d.push({type:1,index:o,name:$[2],strings:u,ctor:$[1]==="."?$t:$[1]==="?"?vt:$[1]==="@"?yt:O}),i.removeAttribute(p)}else p.startsWith(S)&&(d.push({type:6,index:o}),i.removeAttribute(p));if(Bt.test(i.tagName)){let p=i.textContent.split(S),g=p.length-1;if(g>0){i.textContent=et?et.emptyScript:"";for(let u=0;u<g;u++)i.append(p[u],W()),P.nextNode(),d.push({type:2,index:++o});i.append(p[g],W())}}}else if(i.nodeType===8)if(i.data===Vt)d.push({type:2,index:o});else{let p=-1;for(;(p=i.data.indexOf(S,p+1))!==-1;)d.push({type:7,index:o}),p+=S.length-1}o++}}static createElement(t,e){let s=M.createElement("template");return s.innerHTML=t,s}};function U(n,t,e=n,s){if(t===D)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=q(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=U(n,i._$AS(n,t.values),i,s)),t}var gt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);P.currentNode=i;let o=P.nextNode(),a=0,c=0,d=s[0];for(;d!==void 0;){if(a===d.index){let l;d.type===2?l=new J(o,o.nextSibling,this,t):d.type===1?l=new d.ctor(o,d.name,d.strings,this,t):d.type===6&&(l=new bt(o,this,t)),this._$AV.push(l),d=s[++c]}a!==d?.index&&(o=P.nextNode(),a++)}return P.currentNode=M,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},J=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=U(this,t,e),q(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==D&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):de(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&q(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=G.createElement(Kt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new gt(i,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=zt.get(t.strings);return e===void 0&&zt.set(t.strings,e=new G(t)),e}k(t){xt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(W()),this.O(W()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Nt(t).nextSibling;Nt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){let o=this.strings,a=!1;if(o===void 0)t=U(this,t,e,0),a=!q(t)||t!==this._$AH&&t!==D,a&&(this._$AH=t);else{let c=t,d,l;for(t=o[0],d=0;d<o.length-1;d++)l=U(this,c[s+d],e,d),l===D&&(l=this._$AH[d]),a||=!q(l)||l!==this._$AH[d],l===v?t=v:t!==v&&(t+=(l??"")+o[d+1]),this._$AH[d]=l}a&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},$t=class extends O{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},vt=class extends O{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},yt=class extends O{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=U(this,t,e,0)??v)===D)return;let s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},bt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}};var pe=_t.litHtmlPolyfillSupport;pe?.(G,J),(_t.litHtmlVersions??=[]).push("3.3.3");var Wt=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new J(t.insertBefore(W(),o),o,void 0,e??{})}return i._$AI(n),i};var At=globalThis,A=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};A._$litElement$=!0,A.finalized=!0,At.litElementHydrateSupport?.({LitElement:A});var ue=At.litElementPolyfillSupport;ue?.({LitElement:A});(At.litElementVersions??=[]).push("4.2.2");var st=T`
  :host { display: block; }
  ha-card { padding: 16px; }
  .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; }
  .title { font-size: 1.15em; font-weight: 500; color: var(--primary-text-color); }
  .muted { color: var(--secondary-text-color); font-size: 0.9em; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .tile {
    border: 1px solid var(--divider-color); border-radius: calc(var(--ha-card-border-radius, 12px) - 4px);
    padding: 12px; display: flex; flex-direction: column; gap: 8px; min-width: 0;
  }
  .tile .name { font-weight: 500; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .spread { justify-content: space-between; }
  .chip {
    display: inline-flex; align-items: center; gap: 4px; border-radius: 10px; padding: 1px 8px; font-size: 0.8em;
    background: var(--secondary-background-color); color: var(--primary-text-color); white-space: nowrap;
  }
  .ok { background: color-mix(in srgb, var(--success-color, #43a047) 22%, transparent); }
  .warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 25%, transparent); }
  .bad { background: color-mix(in srgb, var(--error-color, #db4437) 25%, transparent); }
  .off { background: var(--secondary-background-color); color: var(--secondary-text-color); }
  .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex: none; }
  .dot.on { background: var(--success-color, #43a047); }
  .dot.offline { background: var(--disabled-text-color, #9e9e9e); }
  .bar { height: 6px; border-radius: 3px; background: var(--secondary-background-color); overflow: hidden; flex: 1; }
  .bar > span { display: block; height: 100%; background: var(--primary-color); }
  .bar.high > span { background: var(--warning-color, #ffa600); }
  .meter { display: grid; grid-template-columns: 44px 1fr 38px; align-items: center; gap: 6px; font-size: 0.85em; }
  button.act {
    font: inherit; font-size: 0.85em; border: 1px solid var(--divider-color); background: transparent;
    color: var(--primary-color); border-radius: 14px; padding: 3px 10px; cursor: pointer;
  }
  button.act:hover { background: var(--secondary-background-color); }
  button.act.danger { color: var(--error-color, #db4437); }
  button.act[disabled] { opacity: 0.5; cursor: default; }
  ul.list { list-style: none; margin: 0; padding: 0; }
  ul.list > li { padding: 10px 0; border-top: 1px solid var(--divider-color); display: flex; flex-direction: column; gap: 6px; }
  ul.list > li:first-child { border-top: none; padding-top: 0; }
  .detail { color: var(--secondary-text-color); font-size: 0.9em; white-space: pre-wrap; }
  .empty { color: var(--secondary-text-color); padding: 8px 0; }
  .switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.9em; }
`;function w(n){switch(n){case"up":case"on":case"ok":case"running":case"active":return"ok";case"warn":case"maintenance":case"away":case"needs_setup":case"blocked":return"warn";case"faulted":case"unreachable":case"problem":case"down":case"error":case"failed":return"bad";default:return"off"}}function qt(n){let t=n===void 0?NaN:parseFloat(n);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):void 0}var me=[["machines_online","hub"],["machine_state","machine"],["box_state","box"],["addon_status","addon"]];function Gt(n){let t=new Map;for(let s of Object.values(n.entities||{})){if(s.platform!=="hisho"||!s.device_id||!s.translation_key)continue;let i=t.get(s.device_id)??{};(i[s.translation_key]??=[]).push(s.entity_id),t.set(s.device_id,i)}let e=[];for(let[s,i]of t){let o=me.find(([c])=>c in i)?.[1];if(!o)continue;let a=n.devices?.[s];e.push({id:s,name:a?.name_by_user||a?.name||s,kind:o,model:a?.model||"",entities:i})}return e.sort((s,i)=>s.name.localeCompare(i.name))}function N(n,t){return Gt(n).filter(e=>e.kind===t)}function _(n){return N(n,"hub")[0]}function Z(n,t,e){if(!t)return;let s=t.toLowerCase();return Gt(n).find(i=>(!e||i.kind===e)&&(i.id===t||i.name.toLowerCase()===s))}function y(n,t){return n?.entities[t]?.[0]}function f(n,t,e){let s=y(t,e);return s?n.states[s]:void 0}function z(n,t,e){return(t?.entities[e]??[]).map(s=>n.states[s]).filter(s=>!!s)}function j(n){return!!n&&n.state!=="unavailable"&&n.state!=="unknown"}function x(n){let t=f(n,_(n),"actions_allowed");return new Set(t?.attributes.allowed??[])}function L(n,t){let e=n?.attributes.friendly_name??"",s=t?t.name+" ":"";return e.startsWith(s)?e.slice(s.length):e}var b=class extends A{static{this.properties={hass:{attribute:!1},config:{attribute:!1}}}static{this.styles=st}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t}getCardSize(){return 4}render(){return!this.hass||!this.config?r``:this.hass.user&&!this.hass.user.is_admin?r`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`:_(this.hass)?this.body():r`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`}heading(t){let e=this.config.title??t;return e?r`<div class="title">${e}</div>`:r``}};var kt=class extends A{static{this.properties={text:{},open:{type:Boolean,reflect:!0}}}static{this.styles=T`
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
    </div>`}};customElements.get("hisho-confirm")||customElements.define("hisho-confirm",kt);function it(n,t){let e=n.shadowRoot??n,s=e.querySelector("hisho-confirm");return s||(s=document.createElement("hisho-confirm"),e.appendChild(s)),s.ask(t)}async function m(n,t,e,s="",i={},o){return o&&!await it(n,o)?!1:(await t.callService("hisho","run_action",{action:e,target:s,args:i,confirm:!!o}),!0)}async function E(n,t,e,s,i){return i&&!await it(n,i)?!1:(await t.callService("switch",s?"turn_on":"turn_off",{},{entity_id:e}),!0)}async function Jt(n,t,e,s){return s&&!await it(n,s)?!1:(await t.callService("button","press",{},{entity_id:e}),!0)}function F(n,t){n.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}function I(n,t){let e=qt(t);return e===void 0?r``:r`<div class="meter"><span class="muted">${n}</span>
    <div class="bar ${e>=85?"high":""}"><span style="width:${e}%"></span></div>
    <span>${Math.round(e)}%</span></div>`}var nt=class extends b{static getStubConfig(){return{type:"custom:hisho-fleet-card"}}body(){let t=N(this.hass,"machine"),e=_(this.hass),s=f(this.hass,e,"machines_online"),i=y(e,"fleet_maintenance"),o=f(this.hass,e,"core_reachable");return r`<ha-card>
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${o?.state==="off"?r`<span class="chip bad">Hisho Core unreachable</span>`:""}
          ${s?r`<span class="chip">${s.state} of ${t.length} online</span>`:""}
          ${i?this.maintSwitch(i,"Fleet maintenance","Put the whole fleet in maintenance? Alerts, auto-park and jobs are held."):""}
        </div>
      </div>
      <div class="grid">${t.map(a=>this.tile(a))}</div>
    </ha-card>`}maintSwitch(t,e,s){let i=this.hass.states[t]?.state==="on";return r`<label class="switch" title=${e}>
      <input type="checkbox" .checked=${i}
        @change=${o=>{let a=o.target;E(this,this.hass,t,a.checked,a.checked?s:void 0).then(c=>{c||(a.checked=i)})}} />${e}</label>`}tile(t){let e=this.hass,s=f(e,t,"machine_state"),i=f(e,t,"online"),o=f(e,t,"awake"),a=s?.attributes.power??[],c=x(e),d=s?.attributes.machine??t.name,l=y(t,"maintenance");return r`<div class="tile">
      <div class="row spread">
        <span class="row"><span class="dot ${i?.state==="on"?"on":"offline"}"></span>
          <span class="name" @click=${()=>s&&F(this,s.entity_id)}>${t.name}</span></span>
        <span class="chip ${w(s?.state)}">${s?.state??"unknown"}</span>
      </div>
      ${j(o)?r`<span class="muted">${o.state}</span>`:""}
      ${s?.attributes.reason&&i?.state!=="on"?r`<span class="muted">${s.attributes.reason}</span>`:""}
      ${I("Memory",f(e,t,"memory_usage")?.state)}
      ${I("Disk",f(e,t,"disk_usage")?.state)}
      ${I("GPU",f(e,t,"gpu_usage")?.state)}
      <div class="row">
        ${a.includes("wake")&&c.has("machine.wake")?r`<button class="act" @click=${()=>m(this,e,"machine.wake",d)}>Wake</button>`:""}
        ${a.includes("park")&&c.has("machine.park")?r`<button class="act danger" @click=${()=>m(this,e,"machine.park",d,{},`Park ${t.name}? It powers off until something needs it.`)}>Park</button>`:""}
        ${l?this.maintSwitch(l,"Maintenance",`Put ${t.name} in maintenance? Its alerts are held and its VM shuts down.`):""}
      </div>
    </div>`}};var ot=class extends b{static getStubConfig(t){return{type:"custom:hisho-machine-card",machine:(t?Object.values(t.devices??{}).find(s=>s.model&&s.via_device_id):void 0)?.name??""}}setConfig(t){if(!t?.machine)throw new Error("Say which machine: machine: <name>");super.setConfig(t)}body(){let t=this.hass,e=Z(t,this.config.machine,"machine");if(!e)return r`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;let s=f(t,e,"machine_state"),i=s?.attributes.machine??e.name,o=x(t),a=s?.attributes.power??[],c=s?.attributes.items??[],d=z(t,e,"unit"),l=z(t,e,"restart_unit"),h=z(t,e,"service"),p=y(e,"maintenance"),g=(u,$)=>{let C=f(t,e,u);return j(C)?r`<div class="row spread"><span class="muted">${$}</span>
        <span>${C.state}${C.attributes.unit_of_measurement?" "+C.attributes.unit_of_measurement:""}</span></div>`:""};return r`<ha-card>
      <div class="head">
        <div class="title">${this.config.title??e.name}</div>
        <span class="chip ${w(s?.state)}">${s?.state??"unknown"}</span>
      </div>
      ${s?.attributes.role?r`<div class="muted">${s.attributes.role}</div>`:""}
      ${I("Memory",f(t,e,"memory_usage")?.state)}
      ${I("Disk",f(t,e,"disk_usage")?.state)}
      ${I("GPU",f(t,e,"gpu_usage")?.state)}
      ${g("awake","Parking")} ${g("jobs_running","Jobs running")} ${g("jobs_queued","Jobs queued")}
      ${g("containers_running","Containers")} ${g("sync_connected","Sync")}
      <div class="row" style="margin-top:8px">
        ${a.includes("wake")&&o.has("machine.wake")?r`<button class="act" @click=${()=>m(this,t,"machine.wake",i)}>Wake</button>`:""}
        ${a.includes("park")&&o.has("machine.park")?r`<button class="act danger" @click=${()=>m(this,t,"machine.park",i,{},`Park ${e.name}? It powers off until something needs it.`)}>Park</button>`:""}
        ${p?r`<button class="act ${t.states[p]?.state==="on"?"":"danger"}" @click=${()=>{let u=t.states[p]?.state==="on";E(this,t,p,!u,u?void 0:`Put ${e.name} in maintenance? Its alerts are held and its VM shuts down.`)}}>${t.states[p]?.state==="on"?"End maintenance":"Maintenance"}</button>`:""}
      </div>
      ${h.length||d.length?r`<div class="title" style="margin-top:14px;font-size:1em">Services</div>`:""}
      <ul class="list">
        ${h.map(u=>r`<li><div class="row spread"><span>${L(u,e)}</span>
          <span class="chip ${u.state==="on"?"ok":"bad"}">${u.state==="on"?"running":u.attributes.state??"stopped"}</span></div></li>`)}
        ${d.map(u=>{let $=L(u,e),C=l.find(te=>L(te,e)===`Restart ${$}`),Qt=u.state;return r`<li><div class="row spread"><span>${$}</span><span class="row">
            ${j(u)?r`<button class="act ${u.state==="on"?"danger":""}" @click=${()=>E(this,t,u.entity_id,u.state!=="on",u.state==="on"?`Stop ${$} on ${e.name}?`:void 0)}>
              ${u.state==="on"?"Stop":"Start"}</button>`:r`<span class="muted">${Qt}</span>`}
            ${C?r`<button class="act" @click=${()=>Jt(this,t,C.entity_id)}>Restart</button>`:""}
          </span></div></li>`})}
      </ul>
      ${c.length?r`<div class="title" style="margin-top:14px;font-size:1em">From add-ons</div>`:""}
      <ul class="list">${c.map(u=>r`<li>
        <div class="row spread"><span>${u.name}</span><span class="chip ${w(u.state)}">${u.state}</span></div>
        ${u.facts?.length?r`<div class="detail">${u.facts.join(" \xB7 ")}</div>`:""}
        ${o.has("device.press")&&u.actions?.length?r`<div class="row">${u.actions.map($=>r`
          <button class="act ${$.danger?"danger":""}" @click=${()=>m(this,t,"device.press",u.addon,{entry:u.entry,item:u.id,action:$.id},$.danger?`${$.label}: ${u.name} on ${e.name}?`:void 0)}>${$.label}</button>`)}</div>`:""}
      </li>`)}</ul>
      <div class="muted" style="margin-top:8px;cursor:pointer" @click=${()=>s&&F(this,s.entity_id)}>History…</div>
    </ha-card>`}};var fe={critical:"bad",decision:"warn",warn:"warn",info:"off"},at=class extends b{static{this.properties={...b.properties,items:{state:!0},showDone:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-needs-you-card"}}constructor(){super(),this.items=[],this.showDone=!1}updated(t){super.updated(t);let e=y(_(this.hass),"needs_you"),s=e?this.hass.states[e]?.last_changed+"|"+this.hass.states[e]?.state:void 0;e&&s!==this.seen&&(this.seen=s,this.hass.callWS({type:"todo/item/list",entity_id:e}).then(i=>this.items=i.items??[]).catch(()=>this.items=[]))}body(){let t=this.hass,e=_(t),s=f(t,e,"needs_you_count")?.attributes.alerts??[],i=new Map(s.map(l=>[l.id,l.severity])),o=s.filter(l=>l.severity==="decision"&&/asks to connect/.test(l.title)),a=this.items.filter(l=>this.showDone||l.status==="needs_action"),c=this.items.filter(l=>l.status==="completed").length,d=x(t);return r`<ha-card>
      <div class="head">${this.heading("Needs you")}
        ${c?r`<button class="act" @click=${()=>this.showDone=!this.showDone}>
          ${this.showDone?"Hide":"Show"} ${c} acknowledged</button>`:""}</div>
      ${o.map(l=>r`<div class="tile" style="margin-bottom:10px"><span class="chip warn">decide</span>
        <span>${l.title}</span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${a.length?"":r`<div class="empty">Nothing needs you right now.</div>`}
      <ul class="list">${a.map(l=>{let h=i.get(l.uid)??(l.description?.split(":")[0]||"").toLowerCase(),p=l.status==="completed";return r`<li>
          <div class="row"><span class="chip ${fe[h]??w(h)}">${p?"acknowledged":h||"alert"}</span>
            <span>${l.summary}</span></div>
          ${l.description?r`<div class="detail">${l.description.replace(/^[A-Z]+:\s*/,"")}</div>`:""}
          ${d.has("alert.ack")?r`<div class="row">
            ${p?r`<button class="act" @click=${()=>this.alert(l.uid,"unack")}>Un-acknowledge</button>`:r`<button class="act" @click=${()=>this.alert(l.uid,"ack")}>Acknowledge</button>
                     <button class="act" @click=${()=>this.alert(l.uid,"snooze")}>Snooze 1 h</button>`}
            <button class="act" @click=${()=>this.alert(l.uid,"investigate")}>Investigate</button>
            <button class="act" @click=${()=>this.alert(l.uid,"notify")}>Send to phone</button>
          </div>`:""}
        </li>`})}</ul>
    </ha-card>`}alert(t,e){return m(this,this.hass,`alert.${e}`,t,e==="snooze"?{hours:1}:{})}};function Et(n={},t={}){return Object.entries(n).map(([e,s])=>{let i=s.endsWith("?"),o=s.replace(/\?$/,""),a=/^list\((.*)\)$/.exec(o);return{key:e,type:a?"list":o,optional:i,choices:a?a[1].split("|").map(c=>c.trim()).filter(Boolean):[],label:t[e]??e.replace(/_/g," ")}})}var St=n=>n.type==="password"||n.type==="secret",ge=/^[A-Z][A-Z0-9_]{2,127}$/;function Ht(n,t){let e=n.key;if(n.type==="bool")return r`<input type="checkbox" name=${e} .checked=${!!t} />`;if(n.type==="list")return r`<select name=${e}>${n.choices.map(o=>r`<option value=${o} ?selected=${o===t}>${o}</option>`)}</select>`;let s=n.type==="int"||n.type==="port"?"number":n.type==="url"?"url":"text",i=St(n)?"secret's name, e.g. CLOUDFLARE_EXAMPLE_TOKEN":n.optional?"optional":"";return r`<input type=${s} name=${e} .value=${t??""} placeholder=${i}
    pattern=${St(n)?"[A-Z][A-Z0-9_]{2,127}":".*"} />`}function Ct(n,t,e={}){let s={};for(let i of t){let o=n.elements.namedItem(i.key);if(!o)continue;let a=o instanceof HTMLInputElement&&o.type==="checkbox"?o.checked:o.value.trim();if((i.type==="int"||i.type==="port")&&a!==""&&(a=Number(a)),St(i)&&a&&!ge.test(a))return{values:s,error:`${i.label}: give the secret's name, not its value (paste values in Hisho's dashboard).`};a!==(e[i.key]??(i.type==="bool"?!1:""))&&(s[i.key]=a)}return{values:s}}var Zt=`
  form.settings { display: grid; grid-template-columns: minmax(110px, 38%) 1fr; gap: 6px 10px; align-items: center; margin: 8px 0; }
  form.settings label { color: var(--secondary-text-color); font-size: 0.9em; overflow-wrap: anywhere; }
  form.settings input, form.settings select {
    font: inherit; padding: 4px 6px; border-radius: 6px; border: 1px solid var(--divider-color);
    background: var(--card-background-color); color: var(--primary-text-color); min-width: 0;
  }
  form.settings input[type=checkbox] { justify-self: start; }
  form.settings .full { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; }
  .error { color: var(--error-color, #db4437); font-size: 0.9em; }
`;var $e=(n,t)=>x(n).has(t),rt=class extends b{static{this.properties={...b.properties,error:{state:!0}}}static{this.styles=[st,T`${Q(Zt)}`]}static getStubConfig(){return{type:"custom:hisho-device-card",device:""}}setConfig(t){if(!t?.device)throw new Error("Say which device: device: <name>");super.setConfig(t)}body(){let t=Z(this.hass,this.config.device,"box")??Z(this.hass,this.config.device,"addon");return t?t.kind==="addon"?this.addon(t):this.box(t):r`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`}maintenance(t,e){let s=y(t,"maintenance");if(!s)return"";let i=this.hass.states[s]?.state==="on";return r`<button class="act ${i?"":"danger"}" @click=${()=>E(this,this.hass,s,!i,i?void 0:`Put ${e} in maintenance? Its alerts are held.`)}>
      ${i?"End maintenance":"Maintenance"}</button>`}box(t){let e=this.hass,s=f(e,t,"box_state"),i=f(e,t,"box_health"),o=x(e);return r`<ha-card>
      <div class="head"><div class="title">${this.config.title??t.name}</div>
        <span class="row"><span class="chip ${w(s?.state)}">${s?.state??"unknown"}</span>
          <span class="chip ${w(i?.state)}">${i?.state??"unknown"}</span></span></div>
      ${i?.attributes.summary?r`<div class="detail">${i.attributes.summary}</div>`:""}
      <ul class="list" style="margin-top:10px">${z(e,t,"box_item").map(a=>{let c=a.attributes;return r`<li>
          <div class="row spread"><span class="name" @click=${()=>F(this,a.entity_id)}>${L(a,t)}</span>
            <span class="chip ${w(a.state)}">${j(a)?a.state:"unavailable"}</span></div>
          ${c.facts?.length?r`<div class="detail">${c.facts.join(" \xB7 ")}</div>`:""}
          ${o.has("device.press")&&c.actions?.length?r`<div class="row">${c.actions.map(d=>r`
            <button class="act ${d.danger?"danger":""}" @click=${()=>m(this,e,"device.press",c.addon,{entry:c.entry,item:c.item_id,action:d.id},d.danger?`${d.label}: ${L(a,t)} on ${t.name}?`:void 0)}>${d.label}</button>`)}</div>`:""}
        </li>`})}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(t,t.name)}</div>
    </ha-card>`}addon(t){let e=this.hass,s=f(e,t,"addon_status"),i=y(t,"addon_enabled"),o=s?.attributes??{},a=x(e);return r`<ha-card>
      <div class="head"><div class="title">${this.config.title??t.name}</div>
        <span class="chip ${w(s?.state)}">${s?.state??"unknown"}</span></div>
      <div class="muted">${[o.kind,o.version&&"v"+o.version,o.host&&"on "+o.host].filter(Boolean).join(" \xB7 ")}</div>
      ${o.problems?.length?r`<ul class="list" style="margin-top:8px">${o.problems.map(c=>r`<li><span class="detail">${c}</span></li>`)}</ul>`:""}
      <div class="row" style="margin-top:10px">
        ${a.has("addon.run")?(o.actions??[]).map(c=>r`<button class="act ${c.danger?"danger":""}"
          @click=${()=>m(this,e,"addon.run",o.addon,{action:c.id},c.danger?`${c.label} (${t.name})?`:void 0)}>${c.label}</button>`):""}
        ${this.maintenance(t,t.name)}
        ${i?r`<button class="act ${e.states[i]?.state==="on"?"danger":""}" @click=${()=>{let c=e.states[i]?.state==="on";E(this,e,i,!c,c?`Turn ${t.name} off? Hisho stops running it.`:void 0)}}>${e.states[i]?.state==="on"?"Turn off":"Turn on"}</button>`:""}
      </div>
      ${a.has("addon.config")?this.settings(o):""}
    </ha-card>`}settings(t){let e=this.hass,s=t.settings??{},i=Et(s.schema,{}),o=Et(s.entry_schema,s.entry_form),a=s.entries??[];if(!i.length&&!o.length)return"";let c=async l=>{l.preventDefault();let{values:h,error:p}=Ct(l.target,i,s.options??{});this.error=p??"",!(p||!Object.keys(h).length)&&await m(this,e,"addon.config",t.addon,{settings:h})},d=async(l,h)=>{l.preventDefault();let p=l.target.closest("form"),g=p.elements.namedItem("__entry").value.trim(),{values:u,error:$}=Ct(p,o);this.error=$??(g?"":"Give the entry a name."),!this.error&&await m(this,e,h?"addon.test":"addon.entry",t.addon,{entry:g,settings:u})};return r`<details style="margin-top:12px"><summary class="muted">Settings</summary>
      ${this.error?r`<div class="error">${this.error}</div>`:""}
      ${i.length?r`<form class="settings" @submit=${c}>
        ${i.map(l=>r`<label>${l.label}</label>${Ht(l,(s.options??{})[l.key])}`)}
        <div class="full"><button class="act" type="submit">Save</button>
          ${$e(e,"addon.apply")?r`<button class="act" type="button" @click=${()=>m(this,e,"addon.apply",t.addon)}>Apply on its machine</button>`:""}</div>
      </form>`:""}
      ${o.length?r`<div class="muted" style="margin-top:8px">${s.entry_label??"Entries"}</div>
        <ul class="list">${a.map(l=>r`<li><div class="row spread"><span>${l}</span>
          <button class="act danger" @click=${()=>m(this,e,"addon.entry",t.addon,{entry:l,settings:{_remove:!0}},`Remove ${l} from ${t.addon}?`)}>Remove</button></div></li>`)}</ul>
        <form class="settings" @submit=${l=>d(l,!1)}>
          <label>Name</label><input name="__entry" placeholder="a short name" />
          ${o.map(l=>r`<label>${l.label}</label>${Ht(l,void 0)}`)}
          <div class="full"><button class="act" type="button" @click=${l=>d(l,!0)}>Test</button>
            <button class="act" type="submit">Add or replace</button></div>
        </form>`:""}
    </details>`}};var ct=class extends b{static getStubConfig(){return{type:"custom:hisho-jobs-card"}}body(){let t=this.hass,e=f(t,_(t),"jobs_active")?.attributes.jobs??[],s=x(t),i=this.config.limit??10;return r`<ha-card>
      <div class="head">${this.heading("Jobs")}
        ${s.has("jobs.reap")?r`<button class="act" @click=${()=>m(this,t,"jobs.reap")}>Fail stuck jobs</button>`:""}</div>
      ${e.length?"":r`<div class="empty">No jobs.</div>`}
      <ul class="list">${e.slice(0,i).map(o=>{let a=["queued","routed","running"].includes(o.status);return r`<li>
          <div class="row spread"><span>${o.kind}${o.worker?r` <span class="muted">on ${o.worker}</span>`:""}</span>
            <span class="chip ${w(o.status==="done"?"ok":o.status)}">${o.status}</span></div>
          ${o.reason?r`<div class="detail">${o.reason}</div>`:""}
          <div class="row">
            ${a&&s.has("job.cancel")?r`<button class="act danger" @click=${()=>m(this,t,"job.cancel",o.id,{},`Cancel this ${o.kind} job?`)}>Cancel</button>`:""}
            ${o.status==="failed"&&s.has("job.retry")?r`<button class="act" @click=${()=>m(this,t,"job.retry",o.id)}>Retry</button>`:""}
            ${!a&&s.has("job.clear")?r`<button class="act" @click=${()=>m(this,t,"job.clear",o.id)}>Clear</button>`:""}
          </div>
        </li>`})}</ul>
    </ha-card>`}},lt=class extends b{static getStubConfig(){return{type:"custom:hisho-projects-card"}}body(){let t=this.hass,e=f(t,_(t),"projects_active")?.attributes.projects??[],s=x(t),i=a=>!!a.asks?.length||!["","claude","hisho"].includes(String(a.waiting_on??"").toLowerCase()),o=e.filter(a=>a.status==="active").sort((a,c)=>Number(i(c))-Number(i(a)));return r`<ha-card>
      <div class="head">${this.heading("Projects")}<span class="muted">${o.length} active</span></div>
      <ul class="list">${o.slice(0,this.config.limit??20).map(a=>r`<li>
        <div class="row spread"><span>${a.title}${a.company?r` <span class="muted">${a.company}</span>`:""}</span>
          ${i(a)?r`<span class="chip warn">waiting on you</span>`:""}</div>
        ${a.asks?.length?r`<div class="detail">${a.asks.join(`
`)}</div>`:a.next?r`<div class="detail">Next: ${a.next}</div>`:""}
        <div class="row">
          ${s.has("project.open")?r`<button class="act" @click=${()=>m(this,t,"project.open",a.name)}>Open</button>`:""}
          ${s.has("project.archive")?r`<button class="act danger" @click=${()=>m(this,t,"project.archive",a.name,{},`Archive ${a.title}? Nothing is deleted; it can be restored.`)}>Archive</button>`:""}
        </div>
      </li>`)}</ul>
    </ha-card>`}};var dt=class extends b{static getStubConfig(){return{type:"custom:hisho-store-card"}}body(){let t=this.hass,e=f(t,_(t),"addon_updates"),s=e?.attributes.store??[],i=e?.attributes.repositories??[],o=x(t);if(!o.has("store.install")&&!o.has("store.update"))return r`<ha-card><div class="head">${this.heading("Add-on store")}</div>
        <div class="empty">Hisho does not let this Home Assistant change its add-ons.</div></ha-card>`;let a=[...s].sort((c,d)=>+!!d.update_available-+!!c.update_available||+!!d.installed-+!!c.installed||String(c.title).localeCompare(String(d.title)));return r`<ha-card>
      <div class="head">${this.heading("Add-on store")}<span class="muted">${s.filter(c=>c.installed).length} installed</span></div>
      <ul class="list">${a.map(c=>r`<li>
        <div class="row spread"><span>${c.title}</span>
          <span class="chip ${c.update_available?"warn":c.installed?"ok":"off"}">${c.update_available?`${c.installed_version} \u2192 ${c.version}`:c.installed?`v${c.installed_version}`:`v${c.version}`}</span></div>
        ${c.description?r`<div class="detail">${c.description}</div>`:""}
        <div class="row">
          ${!c.installed&&o.has("store.install")?r`<button class="act" @click=${()=>m(this,t,"store.install",c.name)}>Install</button>`:""}
          ${c.update_available&&o.has("store.update")?r`<button class="act" @click=${()=>m(this,t,"store.update",c.name,{host:c.host??""})}>Update</button>`:""}
          ${c.installed&&c.previous&&o.has("store.rollback")?r`<button class="act danger" @click=${()=>m(this,t,"store.rollback",c.name,{host:c.host??""},`Roll ${c.title} back to the version before? Its settings are kept.`)}>Roll back</button>`:""}
          ${c.installed&&o.has("store.remove")?r`<button class="act danger" @click=${()=>m(this,t,"store.remove",c.name,{host:c.host??""},`Remove ${c.title}? Its settings are kept; install it again any time.`)}>Remove</button>`:""}
        </div></li>`)}</ul>
      <div class="title" style="margin-top:14px;font-size:1em">Repositories</div>
      <ul class="list">${i.map(c=>r`<li><div class="row spread">
        <span>${c.name}${c.listed==="store"?r` <span class="muted">store</span>`:""}</span>
        <span class="row">
          ${o.has("repository.update")?r`<button class="act" @click=${()=>m(this,t,"repository.update",c.url)}>Update</button>`:""}
          ${c.listed!=="store"&&o.has("repository.remove")?r`<button class="act danger" @click=${()=>m(this,t,"repository.remove",c.url,{},`Remove the repository ${c.name}?`)}>Remove</button>`:""}
        </span></div></li>`)}</ul>
      ${o.has("repository.add")?r`<form class="row" style="margin-top:8px" @submit=${c=>{c.preventDefault();let d=c.target.elements.namedItem("url");d.value.trim()&&m(this,t,"repository.add",d.value.trim()).then(()=>d.value="")}}><input name="url" placeholder="https://github.com/you/hisho-addon-name" style="flex:1;font:inherit;padding:4px 6px;
        border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)" />
        <button class="act" type="submit">Add repository</button></form>`:""}
    </ha-card>`}};var Yt=["Server","Vm","Storage","Device","Network"],ve={Server:"Servers",Vm:"Virtual machines",Storage:"Storage",Device:"Devices",Network:"Network"};function ye(n){let t=_(n);if(!t)return{title:"Hisho",views:[{title:"Hisho",path:"hisho",icon:"mdi:server-network",cards:[{type:"markdown",content:"The **Hisho** integration is not set up yet: Settings \u203A Devices & services \u203A Add integration \u203A Hisho."}]}]};let e=N(n,"machine"),s=N(n,"box"),i=N(n,"addon"),o=["core_reachable","critical_alert","needs_you_count","machines_online","machines_faulted","jobs_active","jobs_failed","sync_problem","sync_conflicts"].map(h=>y(t,h)).filter(h=>!!h),a=y(t,"today"),c=y(t,"due_dates"),d=["phone","phone_alerts","clear_phone","hide_acked"].map(h=>y(t,h)).filter(h=>!!h),l=new Map;for(let h of s){let p=Yt.includes(h.model)?h.model:"Device";l.set(p,[...l.get(p)??[],h.name])}return{title:"Hisho",views:[{title:"Overview",path:"overview",icon:"mdi:view-dashboard",cards:[{type:"custom:hisho-fleet-card"},{type:"custom:hisho-needs-you-card"},{type:"custom:hisho-jobs-card",limit:6},{type:"entities",title:"Hisho",state_color:!0,entities:o}]},{title:"Machines",path:"machines",icon:"mdi:server",cards:e.map(h=>({type:"custom:hisho-machine-card",machine:h.name}))},{title:"Devices",path:"devices",icon:"mdi:devices",cards:Yt.filter(h=>l.has(h)).flatMap(h=>[{type:"heading",heading:ve[h]},...l.get(h).map(p=>({type:"custom:hisho-device-card",device:p}))])},{title:"Add-ons",path:"addons",icon:"mdi:puzzle",cards:[...y(t,"addon_updates")?[{type:"custom:hisho-store-card"}]:[],...i.map(h=>({type:"custom:hisho-device-card",device:h.name}))]},...a||c?[{title:"Today",path:"today",icon:"mdi:calendar-today",cards:[...a?[{type:"todo-list",entity:a,title:"Today"}]:[],...c?[{type:"calendar",entities:[c],initial_view:"dayGridMonth",title:"Due dates"}]:[]]}]:[],{title:"Projects",path:"projects",icon:"mdi:folder-multiple",cards:[{type:"custom:hisho-projects-card"},{type:"custom:hisho-jobs-card",title:"All jobs",limit:50}]},{title:"Phone",path:"phone",icon:"mdi:cellphone-message",cards:[{type:"entities",title:"Hisho phone app",entities:d},{type:"markdown",content:"Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity."}]}]}}var ht=class extends HTMLElement{static async generate(t,e){return ye(e)}};var be="0.3.0",Xt=[["hisho-fleet-card",nt,"Hisho fleet","Every machine: state, readings, wake / park, maintenance."],["hisho-machine-card",ot,"Hisho machine","One machine in full: readings, services, its add-on buttons."],["hisho-needs-you-card",at,"Hisho needs you","Hisho's needs-you list: acknowledge, snooze, investigate."],["hisho-device-card",rt,"Hisho device","A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],["hisho-jobs-card",ct,"Hisho jobs","Hisho's jobs: cancel, retry, clear."],["hisho-projects-card",lt,"Hisho projects","Active projects, what waits on you, open or archive."],["hisho-store-card",dt,"Hisho add-on store","Install, update, roll back or remove add-ons; repositories."]];for(let[n,t]of Xt)customElements.get(n)||customElements.define(n,t);customElements.get("ll-strategy-dashboard-hisho")||customElements.define("ll-strategy-dashboard-hisho",ht);var H=window;H.customCards=H.customCards||[];for(let[n,,t,e]of Xt)H.customCards.some(s=>s.type===n)||H.customCards.push({type:n,name:t,description:e,preview:!1,documentationURL:"https://github.com/YepizTechJonathan/hisho-ha-cards"});H.customStrategies=H.customStrategies||[];H.customStrategies.some(n=>n.type==="hisho")||H.customStrategies.push({type:"hisho",strategyType:"dashboard",name:"Hisho",description:"A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects."});console.info(`%c HISHO-HA-CARDS %c ${be} `,"background:#151515;color:#eee","background:#444;color:#fff");export{be as VERSION};
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
