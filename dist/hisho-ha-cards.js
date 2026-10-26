var Z=globalThis,Q=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,dt=Symbol(),xt=new WeakMap,V=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==dt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=xt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&xt.set(e,t))}return t}toString(){return this.cssText}},At=n=>new V(typeof n=="string"?n:n+"",void 0,dt),B=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new V(e,n,dt)},kt=(n,t)=>{if(Q)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=Z.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},lt=Q?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return At(e)})(n):n;var{is:Yt,defineProperty:Gt,getOwnPropertyDescriptor:Zt,getOwnPropertyNames:Qt,getOwnPropertySymbols:Xt,getPrototypeOf:te}=Object,X=globalThis,St=X.trustedTypes,ee=St?St.emptyScript:"",se=X.reactiveElementPolyfillSupport,K=(n,t)=>n,ht={toAttribute(n,t){switch(t){case Boolean:n=n?ee:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Ct=(n,t)=>!Yt(n,t),Et={attribute:!0,type:String,converter:ht,reflect:!1,useDefault:!1,hasChanged:Ct};Symbol.metadata??=Symbol("metadata"),X.litPropertyMetadata??=new WeakMap;var k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Gt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Zt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){let c=i?.call(this);o?.call(this,a),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Et}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;let t=te(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){let e=this.properties,s=[...Qt(e),...Xt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(lt(i))}else t!==void 0&&e.push(lt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:ht).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:ht;this._$Em=i;let c=a.fromAttribute(e,o.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let a=this.constructor;if(i===!1&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??Ct)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:a}=o,c=this[i];a!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[K("elementProperties")]=new Map,k[K("finalized")]=new Map,se?.({ReactiveElement:k}),(X.reactiveElementVersions??=[]).push("2.1.2");var vt=globalThis,Ht=n=>n,tt=vt.trustedTypes,Pt=tt?tt.createPolicy("lit-html",{createHTML:n=>n}):void 0,jt="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+S,ie=`<${Ut}>`,T=document,q=()=>T.createComment(""),F=n=>n===null||typeof n!="object"&&typeof n!="function",yt=Array.isArray,ne=n=>yt(n)||typeof n?.[Symbol.iterator]=="function",pt=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,Tt=/>/g,P=RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mt=/'/g,Rt=/"/g,Ot=/^(?:script|style|textarea|title)$/i,bt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),r=bt(1),$e=bt(2),ve=bt(3),M=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Nt=new WeakMap,D=T.createTreeWalker(T,129);function Lt(n,t){if(!yt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pt!==void 0?Pt.createHTML(t):t}var oe=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",a=W;for(let c=0;c<e;c++){let l=n[c],d,h,u=-1,y=0;for(;y<l.length&&(a.lastIndex=y,h=a.exec(l),h!==null);)y=a.lastIndex,a===W?h[1]==="!--"?a=Dt:h[1]!==void 0?a=Tt:h[2]!==void 0?(Ot.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=P):h[3]!==void 0&&(a=P):a===P?h[0]===">"?(a=i??W,u=-1):h[1]===void 0?u=-2:(u=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?P:h[3]==='"'?Rt:Mt):a===Rt||a===Mt?a=P:a===Dt||a===Tt?a=W:(a=P,i=void 0);let p=a===P&&n[c+1].startsWith("/>")?" ":"";o+=a===W?l+ie:u>=0?(s.push(d),l.slice(0,u)+jt+l.slice(u)+S+p):l+S+(u===-2?c:p)}return[Lt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},J=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,a=0,c=t.length-1,l=this.parts,[d,h]=oe(t,e);if(this.el=n.createElement(d,s),D.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=D.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(jt)){let y=h[a++],p=i.getAttribute(u).split(S),$=/([.?@])?(.*)/.exec(y);l.push({type:1,index:o,name:$[2],strings:p,ctor:$[1]==="."?mt:$[1]==="?"?ft:$[1]==="@"?gt:L}),i.removeAttribute(u)}else u.startsWith(S)&&(l.push({type:6,index:o}),i.removeAttribute(u));if(Ot.test(i.tagName)){let u=i.textContent.split(S),y=u.length-1;if(y>0){i.textContent=tt?tt.emptyScript:"";for(let p=0;p<y;p++)i.append(u[p],q()),D.nextNode(),l.push({type:2,index:++o});i.append(u[y],q())}}}else if(i.nodeType===8)if(i.data===Ut)l.push({type:2,index:o});else{let u=-1;for(;(u=i.data.indexOf(S,u+1))!==-1;)l.push({type:7,index:o}),u+=S.length-1}o++}}static createElement(t,e){let s=T.createElement("template");return s.innerHTML=t,s}};function O(n,t,e=n,s){if(t===M)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=F(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=O(n,i._$AS(n,t.values),i,s)),t}var ut=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);D.currentNode=i;let o=D.nextNode(),a=0,c=0,l=s[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Y(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new $t(o,this,t)),this._$AV.push(d),l=s[++c]}a!==l?.index&&(o=D.nextNode(),a++)}return D.currentNode=T,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Y=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),F(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ne(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=J.createElement(Lt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new ut(i,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=Nt.get(t.strings);return e===void 0&&Nt.set(t.strings,e=new J(t)),e}k(t){yt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(q()),this.O(q()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Ht(t).nextSibling;Ht(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},L=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(t,e=this,s,i){let o=this.strings,a=!1;if(o===void 0)t=O(this,t,e,0),a=!F(t)||t!==this._$AH&&t!==M,a&&(this._$AH=t);else{let c=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=O(this,c[s+l],e,l),d===M&&(d=this._$AH[l]),a||=!F(d)||d!==this._$AH[l],d===g?t=g:t!==g&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!i&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},mt=class extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}},ft=class extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}},gt=class extends L{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??g)===M)return;let s=this._$AH,i=t===g&&s!==g||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==g&&(s===g||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},$t=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}};var ae=vt.litHtmlPolyfillSupport;ae?.(J,Y),(vt.litHtmlVersions??=[]).push("3.3.3");var It=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new Y(t.insertBefore(q(),o),o,void 0,e??{})}return i._$AI(n),i};var _t=globalThis,A=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=It(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};A._$litElement$=!0,A.finalized=!0,_t.litElementHydrateSupport?.({LitElement:A});var re=_t.litElementPolyfillSupport;re?.({LitElement:A});(_t.litElementVersions??=[]).push("4.2.2");var zt=B`
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
`;function b(n){switch(n){case"up":case"on":case"ok":case"running":case"active":return"ok";case"warn":case"maintenance":case"away":case"needs_setup":case"blocked":return"warn";case"faulted":case"unreachable":case"problem":case"down":case"error":case"failed":return"bad";default:return"off"}}function Vt(n){let t=n===void 0?NaN:parseFloat(n);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):void 0}var ce=[["machines_online","hub"],["machine_state","machine"],["box_state","box"],["addon_status","addon"]];function Bt(n){let t=new Map;for(let s of Object.values(n.entities||{})){if(s.platform!=="hisho"||!s.device_id||!s.translation_key)continue;let i=t.get(s.device_id)??{};(i[s.translation_key]??=[]).push(s.entity_id),t.set(s.device_id,i)}let e=[];for(let[s,i]of t){let o=ce.find(([c])=>c in i)?.[1];if(!o)continue;let a=n.devices?.[s];e.push({id:s,name:a?.name_by_user||a?.name||s,kind:o,model:a?.model||"",entities:i})}return e.sort((s,i)=>s.name.localeCompare(i.name))}function R(n,t){return Bt(n).filter(e=>e.kind===t)}function w(n){return R(n,"hub")[0]}function G(n,t,e){if(!t)return;let s=t.toLowerCase();return Bt(n).find(i=>(!e||i.kind===e)&&(i.id===t||i.name.toLowerCase()===s))}function v(n,t){return n?.entities[t]?.[0]}function m(n,t,e){let s=v(t,e);return s?n.states[s]:void 0}function I(n,t,e){return(t?.entities[e]??[]).map(s=>n.states[s]).filter(s=>!!s)}function N(n){return!!n&&n.state!=="unavailable"&&n.state!=="unknown"}function x(n){let t=m(n,w(n),"actions_allowed");return new Set(t?.attributes.allowed??[])}function j(n,t){let e=n?.attributes.friendly_name??"",s=t?t.name+" ":"";return e.startsWith(s)?e.slice(s.length):e}var _=class extends A{static{this.properties={hass:{attribute:!1},config:{attribute:!1}}}static{this.styles=zt}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t}getCardSize(){return 4}render(){return!this.hass||!this.config?r``:this.hass.user&&!this.hass.user.is_admin?r`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`:w(this.hass)?this.body():r`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`}heading(t){let e=this.config.title??t;return e?r`<div class="title">${e}</div>`:r``}};var wt=class extends A{static{this.properties={text:{},open:{type:Boolean,reflect:!0}}}static{this.styles=B`
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
    </div>`}};customElements.get("hisho-confirm")||customElements.define("hisho-confirm",wt);function et(n,t){let e=n.shadowRoot??n,s=e.querySelector("hisho-confirm");return s||(s=document.createElement("hisho-confirm"),e.appendChild(s)),s.ask(t)}async function f(n,t,e,s="",i={},o){return o&&!await et(n,o)?!1:(await t.callService("hisho","run_action",{action:e,target:s,args:i,confirm:!!o}),!0)}async function E(n,t,e,s,i){return i&&!await et(n,i)?!1:(await t.callService("switch",s?"turn_on":"turn_off",{},{entity_id:e}),!0)}async function Kt(n,t,e,s){return s&&!await et(n,s)?!1:(await t.callService("button","press",{},{entity_id:e}),!0)}function z(n,t){n.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}function U(n,t){let e=Vt(t);return e===void 0?r``:r`<div class="meter"><span class="muted">${n}</span>
    <div class="bar ${e>=85?"high":""}"><span style="width:${e}%"></span></div>
    <span>${Math.round(e)}%</span></div>`}var st=class extends _{static getStubConfig(){return{type:"custom:hisho-fleet-card"}}body(){let t=R(this.hass,"machine"),e=w(this.hass),s=m(this.hass,e,"machines_online"),i=v(e,"fleet_maintenance"),o=m(this.hass,e,"core_reachable");return r`<ha-card>
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
        @change=${o=>{let a=o.target;E(this,this.hass,t,a.checked,a.checked?s:void 0).then(c=>{c||(a.checked=i)})}} />${e}</label>`}tile(t){let e=this.hass,s=m(e,t,"machine_state"),i=m(e,t,"online"),o=m(e,t,"awake"),a=s?.attributes.power??[],c=x(e),l=s?.attributes.machine??t.name,d=v(t,"maintenance");return r`<div class="tile">
      <div class="row spread">
        <span class="row"><span class="dot ${i?.state==="on"?"on":"offline"}"></span>
          <span class="name" @click=${()=>s&&z(this,s.entity_id)}>${t.name}</span></span>
        <span class="chip ${b(s?.state)}">${s?.state??"unknown"}</span>
      </div>
      ${N(o)?r`<span class="muted">${o.state}</span>`:""}
      ${s?.attributes.reason&&i?.state!=="on"?r`<span class="muted">${s.attributes.reason}</span>`:""}
      ${U("Memory",m(e,t,"memory_usage")?.state)}
      ${U("Disk",m(e,t,"disk_usage")?.state)}
      ${U("GPU",m(e,t,"gpu_usage")?.state)}
      <div class="row">
        ${a.includes("wake")&&c.has("machine.wake")?r`<button class="act" @click=${()=>f(this,e,"machine.wake",l)}>Wake</button>`:""}
        ${a.includes("park")&&c.has("machine.park")?r`<button class="act danger" @click=${()=>f(this,e,"machine.park",l,{},`Park ${t.name}? It powers off until something needs it.`)}>Park</button>`:""}
        ${d?this.maintSwitch(d,"Maintenance",`Put ${t.name} in maintenance? Its alerts are held and its VM shuts down.`):""}
      </div>
    </div>`}};var it=class extends _{static getStubConfig(t){return{type:"custom:hisho-machine-card",machine:(t?Object.values(t.devices??{}).find(s=>s.model&&s.via_device_id):void 0)?.name??""}}setConfig(t){if(!t?.machine)throw new Error("Say which machine: machine: <name>");super.setConfig(t)}body(){let t=this.hass,e=G(t,this.config.machine,"machine");if(!e)return r`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;let s=m(t,e,"machine_state"),i=s?.attributes.machine??e.name,o=x(t),a=s?.attributes.power??[],c=s?.attributes.items??[],l=I(t,e,"unit"),d=I(t,e,"restart_unit"),h=I(t,e,"service"),u=v(e,"maintenance"),y=(p,$)=>{let H=m(t,e,p);return N(H)?r`<div class="row spread"><span class="muted">${$}</span>
        <span>${H.state}${H.attributes.unit_of_measurement?" "+H.attributes.unit_of_measurement:""}</span></div>`:""};return r`<ha-card>
      <div class="head">
        <div class="title">${this.config.title??e.name}</div>
        <span class="chip ${b(s?.state)}">${s?.state??"unknown"}</span>
      </div>
      ${s?.attributes.role?r`<div class="muted">${s.attributes.role}</div>`:""}
      ${U("Memory",m(t,e,"memory_usage")?.state)}
      ${U("Disk",m(t,e,"disk_usage")?.state)}
      ${U("GPU",m(t,e,"gpu_usage")?.state)}
      ${y("awake","Parking")} ${y("jobs_running","Jobs running")} ${y("jobs_queued","Jobs queued")}
      ${y("containers_running","Containers")} ${y("sync_connected","Sync")}
      <div class="row" style="margin-top:8px">
        ${a.includes("wake")&&o.has("machine.wake")?r`<button class="act" @click=${()=>f(this,t,"machine.wake",i)}>Wake</button>`:""}
        ${a.includes("park")&&o.has("machine.park")?r`<button class="act danger" @click=${()=>f(this,t,"machine.park",i,{},`Park ${e.name}? It powers off until something needs it.`)}>Park</button>`:""}
        ${u?r`<button class="act ${t.states[u]?.state==="on"?"":"danger"}" @click=${()=>{let p=t.states[u]?.state==="on";E(this,t,u,!p,p?void 0:`Put ${e.name} in maintenance? Its alerts are held and its VM shuts down.`)}}>${t.states[u]?.state==="on"?"End maintenance":"Maintenance"}</button>`:""}
      </div>
      ${h.length||l.length?r`<div class="title" style="margin-top:14px;font-size:1em">Services</div>`:""}
      <ul class="list">
        ${h.map(p=>r`<li><div class="row spread"><span>${j(p,e)}</span>
          <span class="chip ${p.state==="on"?"ok":"bad"}">${p.state==="on"?"running":p.attributes.state??"stopped"}</span></div></li>`)}
        ${l.map(p=>{let $=j(p,e),H=d.find(Jt=>j(Jt,e)===`Restart ${$}`),Ft=p.state;return r`<li><div class="row spread"><span>${$}</span><span class="row">
            ${N(p)?r`<button class="act ${p.state==="on"?"danger":""}" @click=${()=>E(this,t,p.entity_id,p.state!=="on",p.state==="on"?`Stop ${$} on ${e.name}?`:void 0)}>
              ${p.state==="on"?"Stop":"Start"}</button>`:r`<span class="muted">${Ft}</span>`}
            ${H?r`<button class="act" @click=${()=>Kt(this,t,H.entity_id)}>Restart</button>`:""}
          </span></div></li>`})}
      </ul>
      ${c.length?r`<div class="title" style="margin-top:14px;font-size:1em">From add-ons</div>`:""}
      <ul class="list">${c.map(p=>r`<li>
        <div class="row spread"><span>${p.name}</span><span class="chip ${b(p.state)}">${p.state}</span></div>
        ${p.facts?.length?r`<div class="detail">${p.facts.join(" \xB7 ")}</div>`:""}
        ${o.has("device.press")&&p.actions?.length?r`<div class="row">${p.actions.map($=>r`
          <button class="act ${$.danger?"danger":""}" @click=${()=>f(this,t,"device.press",p.addon,{entry:p.entry,item:p.id,action:$.id},$.danger?`${$.label}: ${p.name} on ${e.name}?`:void 0)}>${$.label}</button>`)}</div>`:""}
      </li>`)}</ul>
      <div class="muted" style="margin-top:8px;cursor:pointer" @click=${()=>s&&z(this,s.entity_id)}>History…</div>
    </ha-card>`}};var de={critical:"bad",decision:"warn",warn:"warn",info:"off"},nt=class extends _{static{this.properties={..._.properties,items:{state:!0},showDone:{state:!0}}}static getStubConfig(){return{type:"custom:hisho-needs-you-card"}}constructor(){super(),this.items=[],this.showDone=!1}updated(t){super.updated(t);let e=v(w(this.hass),"needs_you"),s=e?this.hass.states[e]?.last_changed+"|"+this.hass.states[e]?.state:void 0;e&&s!==this.seen&&(this.seen=s,this.hass.callWS({type:"todo/item/list",entity_id:e}).then(i=>this.items=i.items??[]).catch(()=>this.items=[]))}body(){let t=this.hass,e=w(t),s=m(t,e,"needs_you_count")?.attributes.alerts??[],i=new Map(s.map(d=>[d.id,d.severity])),o=s.filter(d=>d.severity==="decision"&&/asks to connect/.test(d.title)),a=this.items.filter(d=>this.showDone||d.status==="needs_action"),c=this.items.filter(d=>d.status==="completed").length,l=x(t);return r`<ha-card>
      <div class="head">${this.heading("Needs you")}
        ${c?r`<button class="act" @click=${()=>this.showDone=!this.showDone}>
          ${this.showDone?"Hide":"Show"} ${c} acknowledged</button>`:""}</div>
      ${o.map(d=>r`<div class="tile" style="margin-bottom:10px"><span class="chip warn">decide</span>
        <span>${d.title}</span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${a.length?"":r`<div class="empty">Nothing needs you right now.</div>`}
      <ul class="list">${a.map(d=>{let h=i.get(d.uid)??(d.description?.split(":")[0]||"").toLowerCase(),u=d.status==="completed";return r`<li>
          <div class="row"><span class="chip ${de[h]??b(h)}">${u?"acknowledged":h||"alert"}</span>
            <span>${d.summary}</span></div>
          ${d.description?r`<div class="detail">${d.description.replace(/^[A-Z]+:\s*/,"")}</div>`:""}
          ${l.has("alert.ack")?r`<div class="row">
            ${u?r`<button class="act" @click=${()=>this.alert(d.uid,"unack")}>Un-acknowledge</button>`:r`<button class="act" @click=${()=>this.alert(d.uid,"ack")}>Acknowledge</button>
                     <button class="act" @click=${()=>this.alert(d.uid,"snooze")}>Snooze 1 h</button>`}
            <button class="act" @click=${()=>this.alert(d.uid,"investigate")}>Investigate</button>
            <button class="act" @click=${()=>this.alert(d.uid,"notify")}>Send to phone</button>
          </div>`:""}
        </li>`})}</ul>
    </ha-card>`}alert(t,e){return f(this,this.hass,`alert.${e}`,t,e==="snooze"?{hours:1}:{})}};var ot=class extends _{static getStubConfig(){return{type:"custom:hisho-device-card",device:""}}setConfig(t){if(!t?.device)throw new Error("Say which device: device: <name>");super.setConfig(t)}body(){let t=G(this.hass,this.config.device,"box")??G(this.hass,this.config.device,"addon");return t?t.kind==="addon"?this.addon(t):this.box(t):r`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`}maintenance(t,e){let s=v(t,"maintenance");if(!s)return"";let i=this.hass.states[s]?.state==="on";return r`<button class="act ${i?"":"danger"}" @click=${()=>E(this,this.hass,s,!i,i?void 0:`Put ${e} in maintenance? Its alerts are held.`)}>
      ${i?"End maintenance":"Maintenance"}</button>`}box(t){let e=this.hass,s=m(e,t,"box_state"),i=m(e,t,"box_health"),o=x(e);return r`<ha-card>
      <div class="head"><div class="title">${this.config.title??t.name}</div>
        <span class="row"><span class="chip ${b(s?.state)}">${s?.state??"unknown"}</span>
          <span class="chip ${b(i?.state)}">${i?.state??"unknown"}</span></span></div>
      ${i?.attributes.summary?r`<div class="detail">${i.attributes.summary}</div>`:""}
      <ul class="list" style="margin-top:10px">${I(e,t,"box_item").map(a=>{let c=a.attributes;return r`<li>
          <div class="row spread"><span class="name" @click=${()=>z(this,a.entity_id)}>${j(a,t)}</span>
            <span class="chip ${b(a.state)}">${N(a)?a.state:"unavailable"}</span></div>
          ${c.facts?.length?r`<div class="detail">${c.facts.join(" \xB7 ")}</div>`:""}
          ${o.has("device.press")&&c.actions?.length?r`<div class="row">${c.actions.map(l=>r`
            <button class="act ${l.danger?"danger":""}" @click=${()=>f(this,e,"device.press",c.addon,{entry:c.entry,item:c.item_id,action:l.id},l.danger?`${l.label}: ${j(a,t)} on ${t.name}?`:void 0)}>${l.label}</button>`)}</div>`:""}
        </li>`})}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(t,t.name)}</div>
    </ha-card>`}addon(t){let e=this.hass,s=m(e,t,"addon_status"),i=v(t,"addon_enabled"),o=s?.attributes??{},a=x(e);return r`<ha-card>
      <div class="head"><div class="title">${this.config.title??t.name}</div>
        <span class="chip ${b(s?.state)}">${s?.state??"unknown"}</span></div>
      <div class="muted">${[o.kind,o.version&&"v"+o.version,o.host&&"on "+o.host].filter(Boolean).join(" \xB7 ")}</div>
      ${o.problems?.length?r`<ul class="list" style="margin-top:8px">${o.problems.map(c=>r`<li><span class="detail">${c}</span></li>`)}</ul>`:""}
      <div class="row" style="margin-top:10px">
        ${a.has("addon.run")?(o.actions??[]).map(c=>r`<button class="act ${c.danger?"danger":""}"
          @click=${()=>f(this,e,"addon.run",o.addon,{action:c.id},c.danger?`${c.label} (${t.name})?`:void 0)}>${c.label}</button>`):""}
        ${this.maintenance(t,t.name)}
        ${i?r`<button class="act ${e.states[i]?.state==="on"?"danger":""}" @click=${()=>{let c=e.states[i]?.state==="on";E(this,e,i,!c,c?`Turn ${t.name} off? Hisho stops running it.`:void 0)}}>${e.states[i]?.state==="on"?"Turn off":"Turn on"}</button>`:""}
      </div>
    </ha-card>`}};var at=class extends _{static getStubConfig(){return{type:"custom:hisho-jobs-card"}}body(){let t=this.hass,e=m(t,w(t),"jobs_active")?.attributes.jobs??[],s=x(t),i=this.config.limit??10;return r`<ha-card>
      <div class="head">${this.heading("Jobs")}
        ${s.has("jobs.reap")?r`<button class="act" @click=${()=>f(this,t,"jobs.reap")}>Fail stuck jobs</button>`:""}</div>
      ${e.length?"":r`<div class="empty">No jobs.</div>`}
      <ul class="list">${e.slice(0,i).map(o=>{let a=["queued","routed","running"].includes(o.status);return r`<li>
          <div class="row spread"><span>${o.kind}${o.worker?r` <span class="muted">on ${o.worker}</span>`:""}</span>
            <span class="chip ${b(o.status==="done"?"ok":o.status)}">${o.status}</span></div>
          ${o.reason?r`<div class="detail">${o.reason}</div>`:""}
          <div class="row">
            ${a&&s.has("job.cancel")?r`<button class="act danger" @click=${()=>f(this,t,"job.cancel",o.id,{},`Cancel this ${o.kind} job?`)}>Cancel</button>`:""}
            ${o.status==="failed"&&s.has("job.retry")?r`<button class="act" @click=${()=>f(this,t,"job.retry",o.id)}>Retry</button>`:""}
            ${!a&&s.has("job.clear")?r`<button class="act" @click=${()=>f(this,t,"job.clear",o.id)}>Clear</button>`:""}
          </div>
        </li>`})}</ul>
    </ha-card>`}},rt=class extends _{static getStubConfig(){return{type:"custom:hisho-projects-card"}}body(){let t=this.hass,e=m(t,w(t),"projects_active")?.attributes.projects??[],s=x(t),i=a=>!!a.asks?.length||!["","claude","hisho"].includes(String(a.waiting_on??"").toLowerCase()),o=e.filter(a=>a.status==="active").sort((a,c)=>Number(i(c))-Number(i(a)));return r`<ha-card>
      <div class="head">${this.heading("Projects")}<span class="muted">${o.length} active</span></div>
      <ul class="list">${o.slice(0,this.config.limit??20).map(a=>r`<li>
        <div class="row spread"><span>${a.title}${a.company?r` <span class="muted">${a.company}</span>`:""}</span>
          ${i(a)?r`<span class="chip warn">waiting on you</span>`:""}</div>
        ${a.asks?.length?r`<div class="detail">${a.asks.join(`
`)}</div>`:a.next?r`<div class="detail">Next: ${a.next}</div>`:""}
        <div class="row">
          ${s.has("project.open")?r`<button class="act" @click=${()=>f(this,t,"project.open",a.name)}>Open</button>`:""}
          ${s.has("project.archive")?r`<button class="act danger" @click=${()=>f(this,t,"project.archive",a.name,{},`Archive ${a.title}? Nothing is deleted; it can be restored.`)}>Archive</button>`:""}
        </div>
      </li>`)}</ul>
    </ha-card>`}};var Wt=["Server","Vm","Storage","Device","Network"],le={Server:"Servers",Vm:"Virtual machines",Storage:"Storage",Device:"Devices",Network:"Network"};function he(n){let t=w(n);if(!t)return{title:"Hisho",views:[{title:"Hisho",path:"hisho",icon:"mdi:server-network",cards:[{type:"markdown",content:"The **Hisho** integration is not set up yet: Settings \u203A Devices & services \u203A Add integration \u203A Hisho."}]}]};let e=R(n,"machine"),s=R(n,"box"),i=R(n,"addon"),o=["core_reachable","critical_alert","needs_you_count","machines_online","machines_faulted","jobs_active","jobs_failed","sync_problem","sync_conflicts"].map(h=>v(t,h)).filter(h=>!!h),a=v(t,"today"),c=v(t,"due_dates"),l=["phone","clear_phone","hide_acked"].map(h=>v(t,h)).filter(h=>!!h),d=new Map;for(let h of s){let u=Wt.includes(h.model)?h.model:"Device";d.set(u,[...d.get(u)??[],h.name])}return{title:"Hisho",views:[{title:"Overview",path:"overview",icon:"mdi:view-dashboard",cards:[{type:"custom:hisho-fleet-card"},{type:"custom:hisho-needs-you-card"},{type:"custom:hisho-jobs-card",limit:6},{type:"entities",title:"Hisho",state_color:!0,entities:o}]},{title:"Machines",path:"machines",icon:"mdi:server",cards:e.map(h=>({type:"custom:hisho-machine-card",machine:h.name}))},{title:"Devices",path:"devices",icon:"mdi:devices",cards:Wt.filter(h=>d.has(h)).flatMap(h=>[{type:"heading",heading:le[h]},...d.get(h).map(u=>({type:"custom:hisho-device-card",device:u}))])},{title:"Add-ons",path:"addons",icon:"mdi:puzzle",cards:i.map(h=>({type:"custom:hisho-device-card",device:h.name}))},...a||c?[{title:"Today",path:"today",icon:"mdi:calendar-today",cards:[...a?[{type:"todo-list",entity:a,title:"Today"}]:[],...c?[{type:"calendar",entities:[c],initial_view:"dayGridMonth",title:"Due dates"}]:[]]}]:[],{title:"Projects",path:"projects",icon:"mdi:folder-multiple",cards:[{type:"custom:hisho-projects-card"},{type:"custom:hisho-jobs-card",title:"All jobs",limit:50}]},{title:"Phone",path:"phone",icon:"mdi:cellphone-message",cards:[{type:"entities",title:"Hisho phone app",entities:l},{type:"markdown",content:"Send a message to the Hisho phone app from an automation or script with `notify.send_message` on the **Hisho Phone app** entity."}]}]}}var ct=class extends HTMLElement{static async generate(t,e){return he(e)}};var pe="0.2.0",qt=[["hisho-fleet-card",st,"Hisho fleet","Every machine: state, readings, wake / park, maintenance."],["hisho-machine-card",it,"Hisho machine","One machine in full: readings, services, its add-on buttons."],["hisho-needs-you-card",nt,"Hisho needs you","Hisho's needs-you list: acknowledge, snooze, investigate."],["hisho-device-card",ot,"Hisho device","A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],["hisho-jobs-card",at,"Hisho jobs","Hisho's jobs: cancel, retry, clear."],["hisho-projects-card",rt,"Hisho projects","Active projects, what waits on you, open or archive."]];for(let[n,t]of qt)customElements.get(n)||customElements.define(n,t);customElements.get("ll-strategy-dashboard-hisho")||customElements.define("ll-strategy-dashboard-hisho",ct);var C=window;C.customCards=C.customCards||[];for(let[n,,t,e]of qt)C.customCards.some(s=>s.type===n)||C.customCards.push({type:n,name:t,description:e,preview:!1,documentationURL:"https://github.com/YepizTechJonathan/hisho-ha-cards"});C.customStrategies=C.customStrategies||[];C.customStrategies.some(n=>n.type==="hisho")||C.customStrategies.push({type:"hisho",strategyType:"dashboard",name:"Hisho",description:"A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects."});console.info(`%c HISHO-HA-CARDS %c ${pe} `,"background:#151515;color:#eee","background:#444;color:#fff");export{pe as VERSION};
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
