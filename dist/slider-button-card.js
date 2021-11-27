/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,i,o){var r,s=arguments.length,n=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(s<3?r(n):s>3?r(e,i,n):r(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}var e=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,i="[^\\s]+",o=/\[([^]*?)\]/gm;function r(t,e){for(var i=[],o=0,r=t.length;o<r;o++)i.push(t[o].substr(0,e));return i}var s=function(t){return function(e,i){var o=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return o>-1?o:null}};function n(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var o=0,r=e;o<r.length;o++){var s=r[o];for(var n in s)t[n]=s[n]}return t}var a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=["January","February","March","April","May","June","July","August","September","October","November","December"],c=r(l,3),h={dayNamesShort:r(a,3),dayNames:a,monthNamesShort:c,monthNames:l,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},d=n({},h),u=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},p={D:function(t){return String(t.getDate())},DD:function(t){return u(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return u(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return u(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return u(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return u(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return u(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return u(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return u(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return u(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return u(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return u(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+u(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+u(Math.floor(Math.abs(e)/60),2)+":"+u(Math.abs(e)%60,2)}},g=function(t){return+t-1},f=[null,"[1-9]\\d?"],b=[null,i],m=["isPm",i,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],_=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],v=(s("monthNamesShort"),s("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var y=function(t,i,r){if(void 0===i&&(i=v.default),void 0===r&&(r={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var s=[];i=(i=v[i]||i).replace(o,(function(t,e){return s.push(e),"@@@"}));var a=n(n({},d),r);return(i=i.replace(e,(function(e){return p[e](t,a)}))).replace(/@@@/g,(function(){return s.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();function w(t){return t.substr(0,t.indexOf("."))}function k(t){return w(t.entity_id)}var S="hass:bookmark",x=["closed","locked","off"],O=function(t,e,i,o){o=o||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return r.detail=i,t.dispatchEvent(r),r},T={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function C(t,e){if(t in T)return T[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return e&&"off"===e?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===e?"hass:window-closed":"hass:window-open";case"lock":return e&&"unlocked"===e?"hass:lock-open":"hass:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"hass:cast-connected":"hass:cast";case"zwave":switch(e){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),S}}var M=function(t){O(window,"haptic",t)},P=function(t,e){return function(t,e,i){void 0===i&&(i=!0);var o,r=w(e),s="group"===r?"homeassistant":r;switch(r){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}return t.callService(s,o,{entity_id:e})}(t,e,x.includes(t.states[e].state))},E=function(t,e,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(M("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&O(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),O(window,"location-changed",{replace:i})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(P(e,i.entity),M("success"));break;case"call-service":if(!o.service)return void M("failure");var r=o.service.split(".",2);e.callService(r[0],r[1],o.service_data),M("success");break;case"fire-dom-event":O(t,"ll-custom",o)}},A=function(t,e,i,o){var r;"double_tap"===o&&i.double_tap_action?r=i.double_tap_action:"hold"===o&&i.hold_action?r=i.hold_action:"tap"===o&&i.tap_action&&(r=i.tap_action),E(t,e,i,r)};var $={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},N={binary_sensor:function(t){var e=t.state&&"off"===t.state;switch(t.attributes.device_class){case"battery":return e?"hass:battery":"hass:battery-outline";case"cold":return e?"hass:thermometer":"hass:snowflake";case"connectivity":return e?"hass:server-network-off":"hass:server-network";case"door":return e?"hass:door-closed":"hass:door-open";case"garage_door":return e?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return e?"hass:shield-check":"hass:alert";case"heat":return e?"hass:thermometer":"hass:fire";case"light":return e?"hass:brightness-5":"hass:brightness-7";case"lock":return e?"hass:lock":"hass:lock-open";case"moisture":return e?"hass:water-off":"hass:water";case"motion":return e?"hass:walk":"hass:run";case"occupancy":return e?"hass:home-outline":"hass:home";case"opening":return e?"hass:square":"hass:square-outline";case"plug":return e?"hass:power-plug-off":"hass:power-plug";case"presence":return e?"hass:home-outline":"hass:home";case"sound":return e?"hass:music-note-off":"hass:music-note";case"vibration":return e?"hass:crop-portrait":"hass:vibrate";case"window":return e?"hass:window-closed":"hass:window-open";default:return e?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"hass:garage-open":"hass:garage";case"door":return e?"hass:door-open":"hass:door-closed";case"shutter":return e?"hass:window-shutter-open":"hass:window-shutter";case"blind":return e?"hass:blinds-open":"hass:blinds";case"window":return e?"hass:window-open":"hass:window-closed";default:return C("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in $)return $[e];if("battery"===e){var i=Number(t.state);if(isNaN(i))return"hass:battery-unknown";var o=10*Math.round(i/10);return o>=100?"hass:battery":o<=0?"hass:battery-alert":"hass:battery-"+o}var r=t.attributes.unit_of_measurement;return"°C"===r||"°F"===r?"hass:thermometer":C("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?C("input_datetime"):"hass:calendar":"hass:clock"}},j=function(t){if(!t)return S;if(t.attributes.icon)return t.attributes.icon;var e=w(t.entity_id);return e in N?N[e](t):C(e,t.state)},R=Function.prototype.toString,I=Object.create,V=Object.defineProperty,z=Object.getOwnPropertyDescriptor,H=Object.getOwnPropertyNames,L=Object.getOwnPropertySymbols,U=Object.getPrototypeOf,D=Object.prototype,F=D.hasOwnProperty,B=D.propertyIsEnumerable,q="function"==typeof L,G="function"==typeof WeakMap,Y=function(t,e){if(!t.constructor)return I(null);var i=t.constructor,o=t.__proto__||U(t);if(i===e.Object)return o===e.Object.prototype?{}:I(o);if(~R.call(i).indexOf("[native code]"))try{return new i}catch(t){}return I(o)},W=function(t,e,i,o){var r=Y(t,e);for(var s in o.set(t,r),t)F.call(t,s)&&(r[s]=i(t[s],o));if(q){var n=L(t),a=n.length;if(a)for(var l=0,c=void 0;l<a;l++)c=n[l],B.call(t,c)&&(r[c]=i(t[c],o))}return r},Z=function(t,e,i,o){var r=Y(t,e);o.set(t,r);var s=q?H(t).concat(L(t)):H(t),n=s.length;if(n)for(var a=0,l=void 0,c=void 0;a<n;a++)if("callee"!==(l=s[a])&&"caller"!==l)if(c=z(t,l)){c.get||c.set||(c.value=i(t[l],o));try{V(r,l,c)}catch(t){r[l]=c.value}}else r[l]=i(t[l],o);return r},K=Array.isArray,J="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void(console&&console.error&&console.error('Unable to locate global object, returning "this".'));function X(t,e){var i=!(!e||!e.isStrict),o=e&&e.realm||J,r=i?Z:W,s=function(t,e){if(!t||"object"!=typeof t)return t;if(e.has(t))return e.get(t);var n,a,l,c=t.constructor;if(c===o.Object)return r(t,o,s,e);if(K(t)){if(i)return Z(t,o,s,e);var h=t.length;n=new c,e.set(t,n);for(var d=0;d<h;d++)n[d]=s(t[d],e);return n}if(t instanceof o.Date)return new c(t.getTime());if(t instanceof o.RegExp)return(n=new c(t.source,t.flags||(l="",(a=t).global&&(l+="g"),a.ignoreCase&&(l+="i"),a.multiline&&(l+="m"),a.unicode&&(l+="u"),a.sticky&&(l+="y"),l))).lastIndex=t.lastIndex,n;if(o.Map&&t instanceof o.Map)return n=new c,e.set(t,n),t.forEach((function(t,i){n.set(i,s(t,e))})),n;if(o.Set&&t instanceof o.Set)return n=new c,e.set(t,n),t.forEach((function(t){n.add(s(t,e))})),n;if(o.Blob&&t instanceof o.Blob)return t.slice(0,t.size,t.type);if(o.Buffer&&o.Buffer.isBuffer(t))return n=o.Buffer.allocUnsafe?o.Buffer.allocUnsafe(t.length):new c(t.length),e.set(t,n),t.copy(n),n;if(o.ArrayBuffer){if(o.ArrayBuffer.isView(t))return n=new c(t.buffer.slice(0)),e.set(t,n),n;if(t instanceof o.ArrayBuffer)return n=t.slice(0),e.set(t,n),n}return"function"==typeof t.then||t instanceof Error||o.WeakMap&&t instanceof o.WeakMap||o.WeakSet&&t instanceof o.WeakSet?t:r(t,o,s,e)};return s(t,function(){if(G)return new WeakMap;var t=I({has:function(e){return!!~t._keys.indexOf(e)},set:function(e,i){t._keys.push(e),t._values.push(i)},get:function(e){return t._values[t._keys.indexOf(e)]}});return t._keys=[],t._values=[],t}())}X.default=X,X.strict=function(t,e){return X(t,{isStrict:!0,realm:e?e.realm:void 0})};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Q="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,tt=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},et=`{{lit-${String(Math.random()).slice(2)}}}`,it=`\x3c!--${et}--\x3e`,ot=new RegExp(`${et}|${it}`);class rt{constructor(t,e){this.parts=[],this.element=e;const i=[],o=[],r=document.createTreeWalker(e.content,133,null,!1);let s=0,n=-1,a=0;const{strings:l,values:{length:c}}=t;for(;a<c;){const t=r.nextNode();if(null!==t){if(n++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let o=0;for(let t=0;t<i;t++)st(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=l[a],i=lt.exec(e)[2],o=i.toLowerCase()+"$lit$",r=t.getAttribute(o);t.removeAttribute(o);const s=r.split(ot);this.parts.push({type:"attribute",index:n,name:i,strings:s}),a+=s.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(et)>=0){const o=t.parentNode,r=e.split(ot),s=r.length-1;for(let e=0;e<s;e++){let i,s=r[e];if(""===s)i=at();else{const t=lt.exec(s);null!==t&&st(t[2],"$lit$")&&(s=s.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(s)}o.insertBefore(i,t),this.parts.push({type:"node",index:++n})}""===r[s]?(o.insertBefore(at(),t),i.push(t)):t.data=r[s],a+=s}}else if(8===t.nodeType)if(t.data===et){const e=t.parentNode;null!==t.previousSibling&&n!==s||(n++,e.insertBefore(at(),t)),s=n,this.parts.push({type:"node",index:n}),null===t.nextSibling?t.data="":(i.push(t),n--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(et,e+1));)this.parts.push({type:"node",index:-1}),a++}}else r.currentNode=o.pop()}for(const t of i)t.parentNode.removeChild(t)}}const st=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},nt=t=>-1!==t.index,at=()=>document.createComment(""),lt=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function ct(t,e){const{element:{content:i},parts:o}=t,r=document.createTreeWalker(i,133,null,!1);let s=dt(o),n=o[s],a=-1,l=0;const c=[];let h=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==n&&n.index===a;)n.index=null!==h?-1:n.index-l,s=dt(o,s),n=o[s]}c.forEach(t=>t.parentNode.removeChild(t))}const ht=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},dt=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(nt(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const ut=new WeakMap,pt=t=>(...e)=>{const i=t(...e);return ut.set(i,!0),i},gt=t=>"function"==typeof t&&ut.has(t),ft={},bt={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class mt{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=Q?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let r,s=0,n=0,a=o.nextNode();for(;s<i.length;)if(r=i[s],nt(r)){for(;n<r.index;)n++,"TEMPLATE"===a.nodeName&&(e.push(a),o.currentNode=a.content),null===(a=o.nextNode())&&(o.currentNode=e.pop(),a=o.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,r.name,r.strings,this.options));s++}else this.__parts.push(void 0),s++;return Q&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const _t=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),vt=` ${et} `;class yt{constructor(t,e,i,o){this.strings=t,this.values=e,this.type=i,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let o=0;o<t;o++){const t=this.strings[o],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const s=lt.exec(t);e+=null===s?t+(i?vt:it):t.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+et}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==_t&&(e=_t.createHTML(e)),t.innerHTML=e,t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const wt=t=>null===t||!("object"==typeof t||"function"==typeof t),kt=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class St{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new xt(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!kt(t))return t}let o="";for(let r=0;r<e;r++){o+=t[r];const e=i[r];if(void 0!==e){const t=e.value;if(wt(t)||!kt(t))o+="string"==typeof t?t:String(t);else for(const e of t)o+="string"==typeof e?e:String(e)}}return o+=t[e],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class xt{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===ft||wt(t)&&t===this.value||(this.value=t,gt(t)||(this.committer.dirty=!0))}commit(){for(;gt(this.value);){const t=this.value;this.value=ft,t(this)}this.value!==ft&&this.committer.commit()}}class Ot{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(at()),this.endNode=t.appendChild(at())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=at()),t.__insert(this.endNode=at())}insertAfterPart(t){t.__insert(this.startNode=at()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;gt(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=ft,t(this)}const t=this.__pendingValue;t!==ft&&(wt(t)?t!==this.value&&this.__commitText(t):t instanceof yt?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):kt(t)?this.__commitIterable(t):t===bt?(this.value=bt,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof mt&&this.value.template===e)this.value.update(t.values);else{const i=new mt(e,t.processor,this.options),o=i._clone();i.update(t.values),this.__commitNode(o),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,o=0;for(const r of t)i=e[o],void 0===i&&(i=new Ot(this.options),e.push(i),0===o?i.appendIntoPart(this):i.insertAfterPart(e[o-1])),i.setValue(r),i.commit(),o++;o<e.length&&(e.length=o,this.clear(i&&i.endNode))}clear(t=this.startNode){tt(this.startNode.parentNode,t.nextSibling,this.endNode)}}class Tt{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;gt(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=ft,t(this)}if(this.__pendingValue===ft)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=ft}}class Ct extends St{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new Mt(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class Mt extends xt{}let Pt=!1;(()=>{try{const t={get capture(){return Pt=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class Et{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;gt(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=ft,t(this)}if(this.__pendingValue===ft)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=At(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=ft}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const At=t=>t&&(Pt?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function $t(t){let e=Nt.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},Nt.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const o=t.strings.join(et);return i=e.keyString.get(o),void 0===i&&(i=new rt(t,t.getTemplateElement()),e.keyString.set(o,i)),e.stringsArray.set(t.strings,i),i}const Nt=new Map,jt=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Rt=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,i,o){const r=e[0];if("."===r){return new Ct(t,e.slice(1),i).parts}if("@"===r)return[new Et(t,e.slice(1),o.eventContext)];if("?"===r)return[new Tt(t,e.slice(1),i)];return new St(t,e,i).parts}handleTextExpression(t){return new Ot(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const It=(t,...e)=>new yt(t,e,"html",Rt)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,Vt=(t,e)=>`${t}--${e}`;let zt=!0;void 0===window.ShadyCSS?zt=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),zt=!1);const Ht=t=>e=>{const i=Vt(e.type,t);let o=Nt.get(i);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},Nt.set(i,o));let r=o.stringsArray.get(e.strings);if(void 0!==r)return r;const s=e.strings.join(et);if(r=o.keyString.get(s),void 0===r){const i=e.getTemplateElement();zt&&window.ShadyCSS.prepareTemplateDom(i,t),r=new rt(e,i),o.keyString.set(s,r)}return o.stringsArray.set(e.strings,r),r},Lt=["html","svg"],Ut=new Set,Dt=(t,e,i)=>{Ut.add(t);const o=i?i.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:s}=r;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(o,t);const n=document.createElement("style");for(let t=0;t<s;t++){const e=r[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}(t=>{Lt.forEach(e=>{const i=Nt.get(Vt(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),ct(t,i)})})})(t);const a=o.content;i?function(t,e,i=null){const{element:{content:o},parts:r}=t;if(null==i)return void o.appendChild(e);const s=document.createTreeWalker(o,133,null,!1);let n=dt(r),a=0,l=-1;for(;s.nextNode();){l++;for(s.currentNode===i&&(a=ht(e),i.parentNode.insertBefore(e,i));-1!==n&&r[n].index===l;){if(a>0){for(;-1!==n;)r[n].index+=a,n=dt(r,n);return}n=dt(r,n)}}}(i,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(n,a.firstChild);const t=new Set;t.add(n),ct(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const Ft={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},Bt=(t,e)=>e!==t&&(e==e||t==t),qt={attribute:!0,type:String,converter:Ft,reflect:!1,hasChanged:Bt};class Gt extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const o=this._attributeNameForProperty(i,e);void 0!==o&&(this._attributeToPropertyMap.set(o,i),t.push(o))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=qt){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const r=this[t];this[e]=o,this.requestUpdateInternal(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||qt}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=Bt){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,o=e.converter||Ft,r="function"==typeof o?o:o.fromAttribute;return r?r(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,o=e.converter;return(o&&o.toAttribute||Ft.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=qt){const o=this.constructor,r=o._attributeNameForProperty(t,i);if(void 0!==r){const t=o._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,o=i._attributeToPropertyMap.get(t);if(void 0!==o){const t=i.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let o=!0;if(void 0!==t){const r=this.constructor;i=i||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Gt.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Yt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e),Wt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Zt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Wt(t,e)}const Kt=t=>function(t){return Zt({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}(t);function Jt(t,e){return(i,o)=>{const r={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};if(e){const e=void 0!==o?o:i.key,s="symbol"==typeof e?Symbol():"__"+e;r.get=function(){return void 0===this[s]&&(this[s]=this.renderRoot.querySelector(t)),this[s]}}return void 0!==o?Xt(r,i,o):Qt(r,i)}}const Xt=(t,e,i)=>{Object.defineProperty(e,i,t)},Qt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t})
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,te=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol();class ie{constructor(t,e){if(e!==ee)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(te?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const oe=(t,...e)=>{const i=e.reduce((e,i,o)=>e+(t=>{if(t instanceof ie)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[o+1],t[0]);return new ie(i,ee)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const re={};class se extends Gt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),o=[];i.forEach(t=>o.unshift(t)),this._styles=o}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!te){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new ie(String(e),ee)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?te?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==re&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return re}}se.finalized=!0,se.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const o=i.scopeName,r=jt.has(e),s=zt&&11===e.nodeType&&!!e.host,n=s&&!Ut.has(o),a=n?document.createDocumentFragment():e;if(((t,e,i)=>{let o=jt.get(e);void 0===o&&(tt(e,e.firstChild),jt.set(e,o=new Ot(Object.assign({templateFactory:$t},i))),o.appendInto(e)),o.setValue(t),o.commit()})(t,a,Object.assign({templateFactory:Ht(o)},i)),n){const t=jt.get(a);jt.delete(a);const i=t.value instanceof mt?t.value.template:void 0;Dt(o,a,i),tt(e,e.firstChild),e.appendChild(a),jt.set(e,t)}!r&&s&&window.ShadyCSS.styleElement(e.host)},se.shadowRootOptions={mode:"open"};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class ne{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach(e=>t+=e+" "),this.element.setAttribute("class",t)}}}const ae=new WeakMap,le=pt(t=>e=>{if(!(e instanceof xt)||e instanceof Mt||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:i}=e,{element:o}=i;let r=ae.get(e);void 0===r&&(o.setAttribute("class",i.strings.join(" ")),ae.set(e,r=new Set));const s=o.classList||new ne(o);r.forEach(e=>{e in t||(s.remove(e),r.delete(e))});for(const e in t){const i=t[e];i!=r.has(e)&&(i?(s.add(e),r.add(e)):(s.remove(e),r.delete(e)))}"function"==typeof s.commit&&s.commit()}),ce=new WeakMap,he=pt(t=>e=>{const i=ce.get(e);if(void 0===t&&e instanceof xt){if(void 0!==i||!ce.has(e)){const t=e.committer.name;e.committer.element.removeAttribute(t)}}else t!==i&&e.setValue(t);ce.set(e,t)}),de=new WeakMap,ue=pt(t=>e=>{if(!(e instanceof xt)||e instanceof Mt||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:o}=i.element;let r=de.get(e);void 0===r&&(o.cssText=i.strings.join(" "),de.set(e,r=new Set)),r.forEach(e=>{e in t||(r.delete(e),-1===e.indexOf("-")?o[e]=null:o.removeProperty(e))});for(const e in t)r.add(e),-1===e.indexOf("-")?o[e]=t[e]:o.setProperty(e,t[e])}),pe="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class ge extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:pe?"100px":"50px",height:pe?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},o=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?O(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,O(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,O(t,"action",{action:"double_tap"})):O(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",o),t.addEventListener("touchcancel",o),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",o),t.addEventListener("keyup",t=>{13===t.keyCode&&o(t)})}startAnimation(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-slider-button",ge);const fe=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-slider-button"))return t.querySelector("action-handler-slider-button");const e=document.createElement("action-handler-slider-button");return t.appendChild(e),e})();i&&i.bind(t,e)},be=pt((t={})=>e=>{fe(e.committer.element,t)});var me,_e,ve,ye,we;!function(t){t.OVERLAY="overlay",t.CORNER="corner"}(me||(me={})),function(t){t.TOGGLE="toggle",t.CUSTOM="custom"}(_e||(_e={})),function(t){t.LEFT_RIGHT="left-right",t.TOP_BOTTOM="top-bottom",t.BOTTOM_TOP="bottom-top"}(ve||(ve={})),function(t){t.SOLID="solid",t.GRADIENT="gradient",t.TRIANGLE="triangle",t.STRIPED="striped",t.CUSTOM="custom"}(ye||(ye={})),function(t){t.LIGHT="light",t.SWITCH="switch",t.FAN="fan",t.COVER="cover",t.INPUT_BOOLEAN="input_boolean",t.MEDIA_PLAYER="media_player",t.CLIMATE="climate",t.LOCK="lock"}(we||(we={}));const ke={mode:_e.TOGGLE,icon:"mdi:power",show:!0,show_spinner:!0,tap_action:{action:"toggle"}},Se={show:!0,use_state_color:!0,tap_action:{action:"more-info"}},xe={enabled:!1,duration:5,layout:me.CORNER},Oe={direction:ve.LEFT_RIGHT,background:ye.SOLID,use_percentage_bg_opacity:!1,use_state_color:!1,show_track:!1,toggle_on_click:!1,force_square:!1,lock:xe},Te=new Map([[we.LIGHT,{direction:ve.LEFT_RIGHT,background:ye.GRADIENT,use_state_color:!0,use_percentage_bg_opacity:!1,show_track:!1,toggle_on_click:!1,force_square:!1}],[we.FAN,{direction:ve.LEFT_RIGHT,background:ye.SOLID,use_state_color:!1,use_percentage_bg_opacity:!1,show_track:!1,toggle_on_click:!1,force_square:!1}],[we.SWITCH,{direction:ve.LEFT_RIGHT,background:ye.SOLID,use_state_color:!1,use_percentage_bg_opacity:!1,show_track:!1,toggle_on_click:!0,force_square:!1}],[we.COVER,{direction:ve.TOP_BOTTOM,background:ye.STRIPED,use_state_color:!1,use_percentage_bg_opacity:!1,toggle_on_click:!1,show_track:!1,force_square:!1,invert:!0}],[we.INPUT_BOOLEAN,{direction:ve.LEFT_RIGHT,background:ye.SOLID,use_state_color:!1,use_percentage_bg_opacity:!1,show_track:!1,toggle_on_click:!0,force_square:!1}],[we.MEDIA_PLAYER,{direction:ve.LEFT_RIGHT,background:ye.TRIANGLE,use_state_color:!1,use_percentage_bg_opacity:!1,show_track:!0,toggle_on_click:!1,force_square:!1}],[we.LOCK,{direction:ve.LEFT_RIGHT,background:ye.SOLID,use_state_color:!1,use_percentage_bg_opacity:!1,show_track:!1,toggle_on_click:!0,force_square:!1}],[we.CLIMATE,{direction:ve.LEFT_RIGHT,background:ye.TRIANGLE,use_state_color:!1,use_percentage_bg_opacity:!1,show_track:!0,toggle_on_click:!1,force_square:!1}]]);var Ce,Me,Pe;function Ee(t,e){(function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");var i=function(t){return"string"==typeof t&&-1!==t.indexOf("%")}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),i&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function Ae(t){return Math.min(1,Math.max(0,t))}function $e(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Ne(t){return t<=1?100*Number(t)+"%":t}function je(t){return 1===t.length?"0"+t:String(t)}function Re(t,e,i){t=Ee(t,255),e=Ee(e,255),i=Ee(i,255);var o=Math.max(t,e,i),r=Math.min(t,e,i),s=0,n=0,a=(o+r)/2;if(o===r)n=0,s=0;else{var l=o-r;switch(n=a>.5?l/(2-o-r):l/(o+r),o){case t:s=(e-i)/l+(e<i?6:0);break;case e:s=(i-t)/l+2;break;case i:s=(t-e)/l+4}s/=6}return{h:s,s:n,l:a}}function Ie(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*i*(e-t):i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function Ve(t,e,i){t=Ee(t,255),e=Ee(e,255),i=Ee(i,255);var o=Math.max(t,e,i),r=Math.min(t,e,i),s=0,n=o,a=o-r,l=0===o?0:a/o;if(o===r)s=0;else{switch(o){case t:s=(e-i)/a+(e<i?6:0);break;case e:s=(i-t)/a+2;break;case i:s=(t-e)/a+4}s/=6}return{h:s,s:l,v:n}}function ze(t,e,i,o){var r=[je(Math.round(t).toString(16)),je(Math.round(e).toString(16)),je(Math.round(i).toString(16))];return o&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function He(t){return Le(t)/255}function Le(t){return parseInt(t,16)}!function(t){t.COLOR_TEMP="color_temp",t.BRIGHTNESS="brightness",t.BRIGHTNESS_PCT="brightness_pct",t.HUE="hue",t.SATURATION="saturation",t.ON_OFF="onoff"}(Ce||(Ce={})),function(t){t.COLOR_TEMP="color_temp",t.BRIGHTNESS="brightness",t.HS="hs",t.ON_OFF="onoff"}(Me||(Me={})),function(t){t.POSITION="position",t.TILT="tilt"}(Pe||(Pe={}));var Ue={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function De(t){var e={r:0,g:0,b:0},i=1,o=null,r=null,s=null,n=!1,a=!1;return"string"==typeof t&&(t=function(t){if(0===(t=t.trim().toLowerCase()).length)return!1;var e=!1;if(Ue[t])t=Ue[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var i=Ge.rgb.exec(t);if(i)return{r:i[1],g:i[2],b:i[3]};if(i=Ge.rgba.exec(t))return{r:i[1],g:i[2],b:i[3],a:i[4]};if(i=Ge.hsl.exec(t))return{h:i[1],s:i[2],l:i[3]};if(i=Ge.hsla.exec(t))return{h:i[1],s:i[2],l:i[3],a:i[4]};if(i=Ge.hsv.exec(t))return{h:i[1],s:i[2],v:i[3]};if(i=Ge.hsva.exec(t))return{h:i[1],s:i[2],v:i[3],a:i[4]};if(i=Ge.hex8.exec(t))return{r:Le(i[1]),g:Le(i[2]),b:Le(i[3]),a:He(i[4]),format:e?"name":"hex8"};if(i=Ge.hex6.exec(t))return{r:Le(i[1]),g:Le(i[2]),b:Le(i[3]),format:e?"name":"hex"};if(i=Ge.hex4.exec(t))return{r:Le(i[1]+i[1]),g:Le(i[2]+i[2]),b:Le(i[3]+i[3]),a:He(i[4]+i[4]),format:e?"name":"hex8"};if(i=Ge.hex3.exec(t))return{r:Le(i[1]+i[1]),g:Le(i[2]+i[2]),b:Le(i[3]+i[3]),format:e?"name":"hex"};return!1}(t)),"object"==typeof t&&(Ye(t.r)&&Ye(t.g)&&Ye(t.b)?(e=function(t,e,i){return{r:255*Ee(t,255),g:255*Ee(e,255),b:255*Ee(i,255)}}(t.r,t.g,t.b),n=!0,a="%"===String(t.r).substr(-1)?"prgb":"rgb"):Ye(t.h)&&Ye(t.s)&&Ye(t.v)?(o=Ne(t.s),r=Ne(t.v),e=function(t,e,i){t=6*Ee(t,360),e=Ee(e,100),i=Ee(i,100);var o=Math.floor(t),r=t-o,s=i*(1-e),n=i*(1-r*e),a=i*(1-(1-r)*e),l=o%6;return{r:255*[i,n,s,s,a,i][l],g:255*[a,i,i,n,s,s][l],b:255*[s,s,a,i,i,n][l]}}(t.h,o,r),n=!0,a="hsv"):Ye(t.h)&&Ye(t.s)&&Ye(t.l)&&(o=Ne(t.s),s=Ne(t.l),e=function(t,e,i){var o,r,s;if(t=Ee(t,360),e=Ee(e,100),i=Ee(i,100),0===e)r=i,s=i,o=i;else{var n=i<.5?i*(1+e):i+e-i*e,a=2*i-n;o=Ie(a,n,t+1/3),r=Ie(a,n,t),s=Ie(a,n,t-1/3)}return{r:255*o,g:255*r,b:255*s}}(t.h,o,s),n=!0,a="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(i=t.a)),i=$e(i),{ok:n,format:t.format||a,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:i}}var Fe="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",Be="[\\s|\\(]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")\\s*\\)?",qe="[\\s|\\(]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")[,|\\s]+("+Fe+")\\s*\\)?",Ge={CSS_UNIT:new RegExp(Fe),rgb:new RegExp("rgb"+Be),rgba:new RegExp("rgba"+qe),hsl:new RegExp("hsl"+Be),hsla:new RegExp("hsla"+qe),hsv:new RegExp("hsv"+Be),hsva:new RegExp("hsva"+qe),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Ye(t){return Boolean(Ge.CSS_UNIT.exec(String(t)))}var We=function(){function t(e,i){var o;if(void 0===e&&(e=""),void 0===i&&(i={}),e instanceof t)return e;"number"==typeof e&&(e=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(e)),this.originalInput=e;var r=De(e);this.originalInput=e,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(o=i.format)&&void 0!==o?o:r.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},t.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,i=t.g/255,o=t.b/255;return.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4))+.0722*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))},t.prototype.getAlpha=function(){return this.a},t.prototype.setAlpha=function(t){return this.a=$e(t),this.roundA=Math.round(100*this.a)/100,this},t.prototype.toHsv=function(){var t=Ve(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},t.prototype.toHsvString=function(){var t=Ve(this.r,this.g,this.b),e=Math.round(360*t.h),i=Math.round(100*t.s),o=Math.round(100*t.v);return 1===this.a?"hsv("+e+", "+i+"%, "+o+"%)":"hsva("+e+", "+i+"%, "+o+"%, "+this.roundA+")"},t.prototype.toHsl=function(){var t=Re(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},t.prototype.toHslString=function(){var t=Re(this.r,this.g,this.b),e=Math.round(360*t.h),i=Math.round(100*t.s),o=Math.round(100*t.l);return 1===this.a?"hsl("+e+", "+i+"%, "+o+"%)":"hsla("+e+", "+i+"%, "+o+"%, "+this.roundA+")"},t.prototype.toHex=function(t){return void 0===t&&(t=!1),ze(this.r,this.g,this.b,t)},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,e,i,o,r){var s,n=[je(Math.round(t).toString(16)),je(Math.round(e).toString(16)),je(Math.round(i).toString(16)),je((s=o,Math.round(255*parseFloat(s)).toString(16)))];return r&&n[0].startsWith(n[0].charAt(1))&&n[1].startsWith(n[1].charAt(1))&&n[2].startsWith(n[2].charAt(1))&&n[3].startsWith(n[3].charAt(1))?n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0)+n[3].charAt(0):n.join("")}(this.r,this.g,this.b,this.a,t)},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),i=Math.round(this.b);return 1===this.a?"rgb("+t+", "+e+", "+i+")":"rgba("+t+", "+e+", "+i+", "+this.roundA+")"},t.prototype.toPercentageRgb=function(){var t=function(t){return Math.round(100*Ee(t,255))+"%"};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*Ee(t,255))};return 1===this.a?"rgb("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%)":"rgba("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%, "+this.roundA+")"},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+ze(this.r,this.g,this.b,!1),e=0,i=Object.entries(Ue);e<i.length;e++){var o=i[e],r=o[0];if(t===o[1])return r}return!1},t.prototype.toString=function(t){var e=Boolean(t);t=null!=t?t:this.format;var i=!1,o=this.a<1&&this.a>=0;return e||!o||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(i=this.toRgbString()),"prgb"===t&&(i=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(i=this.toHexString()),"hex3"===t&&(i=this.toHexString(!0)),"hex4"===t&&(i=this.toHex8String(!0)),"hex8"===t&&(i=this.toHex8String()),"name"===t&&(i=this.toName()),"hsl"===t&&(i=this.toHslString()),"hsv"===t&&(i=this.toHsvString()),i||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},t.prototype.lighten=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.l+=e/100,i.l=Ae(i.l),new t(i)},t.prototype.brighten=function(e){void 0===e&&(e=10);var i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(-e/100*255))),i.g=Math.max(0,Math.min(255,i.g-Math.round(-e/100*255))),i.b=Math.max(0,Math.min(255,i.b-Math.round(-e/100*255))),new t(i)},t.prototype.darken=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.l-=e/100,i.l=Ae(i.l),new t(i)},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},t.prototype.desaturate=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.s-=e/100,i.s=Ae(i.s),new t(i)},t.prototype.saturate=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.s+=e/100,i.s=Ae(i.s),new t(i)},t.prototype.greyscale=function(){return this.desaturate(100)},t.prototype.spin=function(e){var i=this.toHsl(),o=(i.h+e)%360;return i.h=o<0?360+o:o,new t(i)},t.prototype.mix=function(e,i){void 0===i&&(i=50);var o=this.toRgb(),r=new t(e).toRgb(),s=i/100;return new t({r:(r.r-o.r)*s+o.r,g:(r.g-o.g)*s+o.g,b:(r.b-o.b)*s+o.b,a:(r.a-o.a)*s+o.a})},t.prototype.analogous=function(e,i){void 0===e&&(e=6),void 0===i&&(i=30);var o=this.toHsl(),r=360/i,s=[this];for(o.h=(o.h-(r*e>>1)+720)%360;--e;)o.h=(o.h+r)%360,s.push(new t(o));return s},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e)},t.prototype.monochromatic=function(e){void 0===e&&(e=6);for(var i=this.toHsv(),o=i.h,r=i.s,s=i.v,n=[],a=1/e;e--;)n.push(new t({h:o,s:r,v:s})),s=(s+a)%1;return n},t.prototype.splitcomplement=function(){var e=this.toHsl(),i=e.h;return[this,new t({h:(i+72)%360,s:e.s,l:e.l}),new t({h:(i+216)%360,s:e.s,l:e.l})]},t.prototype.onBackground=function(e){var i=this.toRgb(),o=new t(e).toRgb();return new t({r:o.r+(i.r-o.r)*i.a,g:o.g+(i.g-o.g)*i.a,b:o.b+(i.b-o.b)*i.a})},t.prototype.triad=function(){return this.polyad(3)},t.prototype.tetrad=function(){return this.polyad(4)},t.prototype.polyad=function(e){for(var i=this.toHsl(),o=i.h,r=[this],s=360/e,n=1;n<e;n++)r.push(new t({h:(o+n*s)%360,s:i.s,l:i.l}));return r},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()},t}();function Ze(t,e){return void 0===t&&(t=""),void 0===e&&(e={}),new We(t,e)}function Ke(t){return Object.keys(t).map(e=>t[e]).filter(t=>"string"==typeof t)}const Je=(t,e,i)=>{if(1!==e.length)return t[e[0]]||(t[e[0]]={}),Je(t[e[0]],e.slice(1),i);t[e[0]]=i};function Xe(t){const e=w(t)||we.LIGHT;return X(Te.get(e)||Oe)}function Qe(t,e,i){const o=new We("rgb(255, 160, 0)"),r=new We("rgb(166, 209, 255)"),s=new We("white"),n=(t-e)/(i-e)*100;return n<50?Ze(r).mix(s,2*n).toRgbString():Ze(s).mix(o,2*(n-50)).toRgbString()}function ti(t,e,i){return(t-e)/i*100}function ei(t,e,i){return Math.floor(t*(i-e)/100+e)}class ii{constructor(t){this._sliderPrevColor="",this._config=t}set hass(t){this._hass=t}get stateObj(){return this._hass.states[this._config.entity]}get domain(){return k(this.stateObj)}get name(){var t,e;return this._config.name?this._config.name:(null===(e=null===(t=this.stateObj)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.friendly_name)?this.stateObj.attributes.friendly_name:""}get icon(){var t,e,i;return"string"==typeof(null===(t=this._config.icon)||void 0===t?void 0:t.icon)&&(null===(e=this._config.icon)||void 0===e?void 0:e.icon.length)?this._config.icon.icon:(null===(i=this.stateObj.attributes)||void 0===i?void 0:i.icon)?this.stateObj.attributes.icon:C(this.domain,this.stateObj.state)}get value(){return this._value?Math.round(this._value/this.step)*this.step:this.min}set value(t){t!==this.value&&(this._value=t)}get targetValue(){return 0===this._targetValue?0:this._targetValue?Math.round(this._targetValue/this.step)*this.step:this.value?this.value:0}set targetValue(t){t!==this.targetValue&&(this._targetValue=t)}get label(){return""+this.targetValue}get hidden(){return!1}get hasSlider(){return!0}get hasToggle(){var t,e;return null!==(e=null===(t=this._config.slider)||void 0===t?void 0:t.toggle_on_click)&&void 0!==e&&e}get toggleValue(){return this.value===this.min?this.max:this.min}get state(){var t;return null===(t=this.stateObj)||void 0===t?void 0:t.state}get isOff(){return 0===this.percentage}get isUnavailable(){return!this.state||"unavailable"===this.state}get isSliderDisabled(){return this.isUnavailable?this.isUnavailable:this.hasToggle}get min(){var t,e,i;return null!==(i=null!==(e=null===(t=this._config.slider)||void 0===t?void 0:t.min)&&void 0!==e?e:this._min)&&void 0!==i?i:0}get max(){var t,e,i;return null!==(i=null!==(e=null===(t=this._config.slider)||void 0===t?void 0:t.max)&&void 0!==e?e:this._max)&&void 0!==i?i:100}get step(){var t,e,i;return null!==(i=null!==(e=null===(t=this._config.slider)||void 0===t?void 0:t.step)&&void 0!==e?e:this._step)&&void 0!==i?i:5}get invert(){var t,e,i;return null!==(i=null!==(e=null===(t=this._config.slider)||void 0===t?void 0:t.invert)&&void 0!==e?e:this._invert)&&void 0!==i&&i}get isValuePercentage(){return!0}get percentage(){return Math.round(100*(this.targetValue-(this.invert?this.max:this.min))/(this.max-this.min)*(this.invert?-1:1))}get valueFromPercentage(){return ei(this.percentage,this.min,this.max)}get allowedAttributes(){return[]}get style(){return{icon:{filter:this.iconFilter,color:this.iconColor,rotateSpeed:this.iconRotateSpeed},slider:{filter:this.sliderFilter,color:this.sliderColor}}}get iconFilter(){var t;return(null===(t=this._config.icon)||void 0===t?void 0:t.use_state_color)&&0!==this.percentage?`brightness(${(this.percentage+100)/2}%)`:"brightness(100%)"}get iconColor(){var t;if(null===(t=this._config.icon)||void 0===t?void 0:t.use_state_color){if(!this.stateObj.attributes.hs_color)return this.percentage>0?"var(--paper-item-icon-active-color, #fdd835)":"var(--paper-item-icon-color, #44739e)";{const[t,e]=this.stateObj.attributes.hs_color;if(e>10)return`hsl(${t}, 100%, ${100-e/2}%)`}}return""}get iconRotateSpeed(){return"0s"}get sliderFilter(){var t;return(null===(t=this._config.slider)||void 0===t?void 0:t.use_percentage_bg_opacity)&&0!==this.percentage&&this._config.slider.background!==ye.GRADIENT?`brightness(${(this.percentage+100)/2}%)`:"brightness(100%)"}get sliderColor(){var t;if(null===(t=this._config.slider)||void 0===t?void 0:t.use_state_color)if(this.stateObj.attributes.hs_color){const[t,e]=this.stateObj.attributes.hs_color;if(e>10){const i=`hsl(${t}, 100%, ${100-e/2}%)`;return this._sliderPrevColor=i,i}}else{if(this.stateObj.attributes.color_temp&&this.stateObj.attributes.min_mireds&&this.stateObj.attributes.max_mireds){const t=Qe(this.stateObj.attributes.color_temp,this.stateObj.attributes.min_mireds,this.stateObj.attributes.max_mireds);return this._sliderPrevColor=t,t}if(this._sliderPrevColor.startsWith("hsl")||this._sliderPrevColor.startsWith("rgb"))return this._sliderPrevColor}return"inherit"}moveSlider(t,{left:e,top:i,width:o,height:r}){let s=this.calcMovementPercentage(t,{left:e,top:i,width:o,height:r});var n,a,l;return s=this.applyStep(s),n=s,a=0,l=100,s=isNaN(n)||isNaN(a)||isNaN(l)?0:n>l?l:n<a?a:n,this.isValuePercentage||(s=ei(s,this.min,this.max)),s}calcMovementPercentage(t,{left:e,top:i,width:o,height:r}){var s;let n;switch(null===(s=this._config.slider)||void 0===s?void 0:s.direction){case ve.LEFT_RIGHT:n=ti(t.clientX,e,o),this.invert&&(n=100-n);break;case ve.TOP_BOTTOM:n=ti(t.clientY,i,r),this.invert&&(n=100-n);break;case ve.BOTTOM_TOP:n=ti(t.clientY,i,r),this.invert||(n=100-n)}return n}applyStep(t){return Math.round(t/this.step)*this.step}log(t="",e=""){this._config.debug&&console.log(`${this._config.entity}: ${t}`,e)}}class oi extends ii{constructor(){super(...arguments),this._invert=!1}get _value(){return this.stateObj.attributes.temperature}set _value(t){this._hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,temperature:t})}get isOff(){return x.includes(this.state)}get _step(){var t;return(null===(t=this.stateObj.attributes)||void 0===t?void 0:t.target_temp_step)||1}get _min(){var t;return(null===(t=this.stateObj.attributes)||void 0===t?void 0:t.min_temp)||7}get _max(){var t;return(null===(t=this.stateObj.attributes)||void 0===t?void 0:t.max_temp)||35}get isValuePercentage(){return!1}get label(){const t=this._hass.config.unit_system.temperature,e=(i=this.state)&&i[0].toUpperCase()+i.slice(1)||"";var i;return`${this.targetValue}${t} | ${e}`}}class ri extends ii{constructor(){super(...arguments),this._min=0,this._invert=!0}get attribute(){var t,e,i,o;return(null===(e=null===(t=this._config.slider)||void 0===t?void 0:t.attribute)||void 0===e?void 0:e.length)&&this.allowedAttributes.includes(null===(i=this._config.slider)||void 0===i?void 0:i.attribute)?null===(o=this._config.slider)||void 0===o?void 0:o.attribute:Pe.POSITION}get icon(){var t,e;return"string"==typeof(null===(t=this._config.icon)||void 0===t?void 0:t.icon)&&(null===(e=this._config.icon)||void 0===e?void 0:e.icon.length)?this._config.icon.icon:j(this.stateObj)}get allowedAttributes(){return Ke(Pe)}get _value(){var t;switch(this.attribute){case Pe.POSITION:return"closed"===(null===(t=this.stateObj)||void 0===t?void 0:t.state)?0:this.stateObj.attributes.current_position;case Pe.TILT:return this.stateObj.attributes.current_tilt_position;default:return 0}}set _value(t){if(this.hasSlider)switch(this.attribute){case Pe.POSITION:this._hass.callService("cover","set_cover_position",{entity_id:this.stateObj.entity_id,position:t});break;case Pe.TILT:this._hass.callService("cover","set_cover_tilt_position",{entity_id:this.stateObj.entity_id,tilt_position:t})}else{const e=t>0?"open_cover":"close_cover";this._hass.callService("cover",e,{entity_id:this.stateObj.entity_id})}}get _step(){return 1}get label(){const t=this._hass.localize("component.cover.state._."+this.state),e=this._hass.localize("component.cover.state._.closed"),i=this._hass.localize("component.cover.state._.open");if(!this.hasSlider)return t;switch(this.attribute){case Pe.POSITION:return 0===this.percentage?this.invert?i:e:100===this.percentage?this.invert?e:i:this.percentage+"%";case Pe.TILT:return""+this.percentage}return t}get hasSlider(){switch(this.attribute){case Pe.POSITION:if("current_position"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&4&this.stateObj.attributes.supported_features)return!0;break;case Pe.TILT:if("current_tilt_position"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&128&this.stateObj.attributes.supported_features)return!0;break;default:return!1}return!1}get _max(){return this.hasSlider?100:1}}class si extends ii{constructor(){super(...arguments),this._min=0,this._invert=!1}get _value(){return this.isUnavailable||x.includes(this.state)?0:this.hasSlider?this.stateObj.attributes.percentage:1}set _value(t){const e=t>0?"turn_on":"turn_off";t>0&&this.hasSlider?this._hass.callService("fan","set_percentage",{entity_id:this.stateObj.entity_id,percentage:t}):this._hass.callService("fan",e,{entity_id:this.stateObj.entity_id})}get _step(){return this.stateObj.attributes.percentage_step}get label(){return this.percentage>0?this.hasSlider?this.percentage+"%":this._hass.localize("component.fan.state._.on"):this._hass.localize("component.fan.state._.off")}get hasSlider(){return"speed"in this.stateObj.attributes}get _max(){return this.hasSlider?100:1}get iconRotateSpeed(){let t=0;return this.percentage>0&&(t=3-this.percentage/100*2),t+"s"}}class ni extends ii{constructor(){super(...arguments),this._min=0,this._max=1,this._invert=!1}get _value(){return x.includes(this.stateObj.state)?0:1}set _value(t){const e=t>0?"turn_on":"turn_off";this._hass.callService("input_boolean",e,{entity_id:this.stateObj.entity_id})}get _step(){return 1}get label(){return this.percentage>0?this._hass.localize("component.input_boolean.state._.on"):this._hass.localize("component.input_boolean.state._.off")}}const ai={hue:0,saturation:1};class li extends ii{constructor(){super(...arguments),this._step=1,this._invert=!1}get attribute(){var t,e,i,o,r;const s=null===(t=this._config.slider)||void 0===t?void 0:t.attribute;let n=Ce.BRIGHTNESS_PCT,a=[];if(Array.isArray(null===(i=null===(e=this.stateObj)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.supported_color_modes)&&(a=null===(r=null===(o=this.stateObj)||void 0===o?void 0:o.attributes)||void 0===r?void 0:r.supported_color_modes),1===a.length&&a[0]===Ce.ON_OFF&&(n=Ce.ON_OFF),(null==s?void 0:s.length)&&this.allowedAttributes.includes(s))switch(n=s,s){case Ce.COLOR_TEMP:a.includes("color_temp")||(n=Ce.BRIGHTNESS_PCT);break;case Ce.HUE:case Ce.SATURATION:a.includes("hs")||(n=Ce.BRIGHTNESS_PCT)}return n}get allowedAttributes(){return Ke(Ce)}get colorMode(){var t,e;return null===(e=null===(t=this.stateObj)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.color_mode}get _value(){if(!this.stateObj||x.includes(this.state))return this.isValuePercentage?0:this.min;const t=this.stateObj.attributes;switch(this.attribute){case Ce.COLOR_TEMP:return t.color_temp?Math.round(t.color_temp):this.min;case Ce.BRIGHTNESS:return Math.round(t.brightness);case Ce.BRIGHTNESS_PCT:return Math.round(100*t.brightness/255);case Ce.ON_OFF:return 1;case Ce.HUE:case Ce.SATURATION:return t.hs_color?Math.round(t.hs_color[ai[this.attribute]]):0;default:return 0}}set _value(t){if(!this.stateObj)return;let e,i=this.attribute,o=t>0?"turn_on":"turn_off",r={entity_id:this.stateObj.entity_id};switch(i){case Ce.BRIGHTNESS:case Ce.BRIGHTNESS_PCT:(t=i===Ce.BRIGHTNESS?Math.round(t):Math.round(t/100*255))?(i="brightness",r=Object.assign(Object.assign({},r),{[i]:t})):o="turn_off";break;case Ce.HUE:case Ce.SATURATION:e=this.stateObj.attributes.hs_color||[0,0],e[ai[i]]=t,t=e,i="hs_color",o="turn_on",r=Object.assign(Object.assign({},r),{[i]:t});break;case Ce.COLOR_TEMP:i="color_temp",o="turn_on",r=Object.assign(Object.assign({},r),{[i]:t})}this._hass.callService("light",o,Object.assign({},r))}get _min(){var t;switch(this.attribute){case Ce.COLOR_TEMP:return this.stateObj&&(null===(t=this.stateObj.attributes)||void 0===t?void 0:t.min_mireds)?this.stateObj.attributes.min_mireds:153;default:return 0}}get _max(){var t;switch(this.attribute){case Ce.COLOR_TEMP:return this.stateObj&&(null===(t=this.stateObj.attributes)||void 0===t?void 0:t.max_mireds)?this.stateObj.attributes.max_mireds:500;case Ce.BRIGHTNESS:return 255;case Ce.HUE:return 360;case Ce.ON_OFF:return 1;default:return 100}}get isValuePercentage(){switch(this.attribute){case Ce.COLOR_TEMP:case Ce.HUE:case Ce.BRIGHTNESS:return!1;default:return!0}}get isOff(){switch(this.attribute){case Ce.COLOR_TEMP:case Ce.HUE:case Ce.SATURATION:case Ce.BRIGHTNESS:case Ce.ON_OFF:return x.includes(this.state);default:return this.colorMode===Me.ON_OFF?x.includes(this.state):0===this.percentage}}get label(){if(this.isOff)return this._hass.localize("component.light.state._.off");if(this.colorMode===Me.ON_OFF)return this._hass.localize("component.light.state._.on");switch(this.attribute){case Ce.ON_OFF:return this._hass.localize("component.light.state._.on");case Ce.COLOR_TEMP:case Ce.BRIGHTNESS:return""+this.targetValue;case Ce.BRIGHTNESS_PCT:case Ce.SATURATION:return this.targetValue+"%";case Ce.HUE:return this.targetValue+"°";default:return""+this.targetValue}}get hasToggle(){var t,e,i,o,r,s;let n=[];return Array.isArray(null===(e=null===(t=this.stateObj)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.supported_color_modes)&&(n=null===(o=null===(i=this.stateObj)||void 0===i?void 0:i.attributes)||void 0===o?void 0:o.supported_color_modes),1===n.length&&n[0]===Ce.ON_OFF||null!==(s=null===(r=this._config.slider)||void 0===r?void 0:r.toggle_on_click)&&void 0!==s&&s}get hasSlider(){var t,e;if(!this.stateObj)return!1;switch(this.attribute){case Ce.ON_OFF:return!1;case Ce.BRIGHTNESS:case Ce.BRIGHTNESS_PCT:return"brightness"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&1&(null===(e=null===(t=this.stateObj)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.supported_features));case Ce.COLOR_TEMP:return"color_temp"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&2&this.stateObj.attributes.supported_features);case Ce.HUE:case Ce.SATURATION:return"hs_color"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&16&this.stateObj.attributes.supported_features);default:return!1}}get sliderColor(){var t;let e="inherit";if(null===(t=this._config.slider)||void 0===t?void 0:t.use_state_color)if(this.stateObj.attributes.hs_color&&this.attribute!==Ce.COLOR_TEMP){const[t,i]=this.stateObj.attributes.hs_color;let o=t,r=i;switch(this.attribute){case Ce.HUE:o=this.valueFromPercentage;break;case Ce.SATURATION:r=this.percentage}r>10&&(e=`hsl(${o}, 100%, ${100-r/2}%)`,this._sliderPrevColor=e)}else if(this.attribute===Ce.HUE||this.attribute===Ce.SATURATION){let t=0,i=20;switch(this.attribute){case Ce.HUE:t=this.valueFromPercentage;break;case Ce.SATURATION:i=this.percentage}i>10&&(e=`hsl(${t}, 100%, ${100-i/2}%)`,this._sliderPrevColor=e)}else this.stateObj.attributes.color_temp&&this.stateObj.attributes.min_mireds&&this.stateObj.attributes.max_mireds?(e=Qe(this.attribute===Ce.COLOR_TEMP?this.valueFromPercentage:this.stateObj.attributes.color_temp,this.stateObj.attributes.min_mireds,this.stateObj.attributes.max_mireds),this._sliderPrevColor=e):this.attribute===Ce.COLOR_TEMP?(e=Qe(this.valueFromPercentage,153,500),this._sliderPrevColor=e):(this._sliderPrevColor.startsWith("hsl")||this._sliderPrevColor.startsWith("rgb"))&&(e=this._sliderPrevColor);return e}}class ci extends ii{constructor(){super(...arguments),this._min=0,this._max=1,this._invert=!1}get _value(){return x.includes(this.stateObj.state)?0:1}set _value(t){const e=t>0?"lock":"unlock";this._hass.callService("lock",e,{entity_id:this.stateObj.entity_id})}get _step(){return 1}get label(){return this.percentage>0?this._hass.localize("component.lock.state._.unlocked"):this._hass.localize("component.lock.state._.locked")}}class hi extends ii{constructor(){super(...arguments),this._min=0,this._max=100,this._step=1,this._invert=!1}get _value(){var t,e;return this.isUnavailable||(null===(e=null===(t=this.stateObj)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.is_volume_muted)?0:Math.floor(100*parseFloat(Number.parseFloat(this.stateObj.attributes.volume_level).toPrecision(2)))}set _value(t){t/=100,this._hass.callService("media_player","volume_set",{entity_id:this.stateObj.entity_id,volume_level:t}),t&&this._hass.callService("media_player","volume_mute",{entity_id:this.stateObj.entity_id,is_volume_muted:!1})}get isOff(){return"off"===this.stateObj.state}get label(){return this.stateObj.attributes.is_volume_muted?"-":this.stateObj.attributes.volume_level?this.percentage+"%":this._hass.localize("component.media_player.state._."+this.state)}}class di extends ii{constructor(){super(...arguments),this._min=0,this._max=1,this._invert=!1}get _value(){return x.includes(this.stateObj.state)?0:1}set _value(t){const e=t>0?"turn_on":"turn_off";this._hass.callService("switch",e,{entity_id:this.stateObj.entity_id})}get _step(){return 1}get label(){return this.percentage>0?this._hass.localize("component.switch.state._.on"):this._hass.localize("component.switch.state._.off")}}var ui={version:"v",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},pi={general:{title:"General",entity:"Entity (Required)",name:"Name (Optional)",show_name:"Show name?",show_state:"Show state?",compact:"Compact?"},icon:{title:"Icon",icon:"Icon (Optional)",show_icon:"Show icon?",use_state_color:"Use state color?",tap_action:"Tap action"},slider:{title:"Slider",direction:"Direction",background:"Background",use_brightness:"Use brightness?",show_track:"Show track?",toggle_on_click:"Act as a toggle (disable sliding)",force_square:"Force square?",lock:{enabled:"Lock enabled?",duration:"Lock duration in seconds"}},action_button:{title:"Action button",mode:"Mode",icon:"Icon",show_button:"Show button?",show_spinner:"Show spinner?",tap_action:"Tap action"}},gi={off:"Off",on:"On"},fi={"left-right":"Left to right","top-bottom":"Top to bottom","bottom-top":"Bottom to top"},bi={striped:"Striped",gradient:"Gradient",solid:"Solid",triangle:"Triangle",custom:"Custom"},mi={toggle:"Toggle",custom:"Custom"},_i={common:ui,tabs:pi,state:gi,direction:fi,background:bi,mode:mi},vi={version:"v",invalid_configuration:"Ungültige Konfiguration",show_warning:"Zeige Warnung",show_error:"Zeige Fehler"},yi={general:{title:"Allgemein",entity:"Entiät (vorgeschrieben)",name:"Name (optional)",show_name:"Namen zeigen?",show_state:"Zustand zeigen?",compact:"Kompakt?"},icon:{title:"Icon",icon:"Icon (optional)",show_icon:"Icon zeigen?",use_state_color:"Zustandsfarbe verwenden?",tap_action:"Tap action"},slider:{title:"Schieberegler",direction:"Richtung",background:"Hintergrund",use_brightness:"Helligkeit benutzen?",show_track:"Spur anzeigen?",toggle_on_click:"Als Schalter benutzen (schieben deaktivieren)",force_square:"Quadrat erzwingen?",lock:{enabled:"Sperre aktiviert?",duration:"Sperrdauer in Sekunden"}},action_button:{title:"Action-Knopf",mode:"Modus",icon:"Icon",show_button:"Knopf zeigen?",show_spinner:"Spinner anzeigen?",tap_action:"Tap action"}},wi={off:"Aus",on:"An"},ki={"left-right":"Links nach Rechts","top-bottom":"Oben nach Unten","bottom-top":"Unten nach Oben"},Si={striped:"gestreift",gradient:"Farbverlauf",solid:"Einfarbig",triangle:"Dreieck",custom:"benuzerdefiniert"},xi={toggle:"Umschalter",custom:"benuzerdefiniert"},Oi={common:vi,tabs:yi,state:wi,direction:ki,background:Si,mode:xi},Ti={version:"v",invalid_configuration:"תצורה לא חוקית",show_warning:"הצג אזהרה",show_error:"הצג שגיאה"},Ci={general:{title:"כללי",entity:"ישיות (נדרש)",name:"שם (אופציונלי)",show_name:"להציג שם?",show_state:"להציג מצב?",compact:"קוֹמפָּקטִי?"},icon:{title:"סמליל",icon:"סמליל (אופציונלי)",show_icon:"להציג סמליל?",use_state_color:"להשתמש בצבע מצב?",tap_action:"פעולה בהקשה"},slider:{title:"גלילה",direction:"כיוון",background:"רקע",use_brightness:"להשתמש בבהירות?",show_track:"להציג מסלול?",toggle_on_click:"פעל כמתג (השבת החלקה)",force_square:"כוח מרובע?",lock:{enabled:"נעילה מופעלת?",duration:"משך נעילה בשניות"}},action_button:{title:"כפתור פעולה",mode:"מצב",icon:"סמליל",show_button:"להציג כפתור?",show_spinner:"להציג ספינר?",tap_action:"פעולה בהקשה"}},Mi={off:"כבוי",on:"פועל"},Pi={"left-right":"שמאל לימין","top-bottom":"מלמעלה למטה","bottom-top":"מלמטה למעלה"},Ei={striped:"מפוספס",gradient:"שיפוע",solid:"מוצק",triangle:"משולש",custom:"מותאם אישית"},Ai={toggle:"החלפה",custom:"מותאם אישית"},$i={common:Ti,tabs:Ci,state:Mi,direction:Pi,background:Ei,mode:Ai},Ni={version:"v",invalid_configuration:"Ongeldige configuratie",show_warning:"Toon waarschuwing",show_error:"Toon fout"},ji={general:{title:"Algemeen",entity:"Entiteit (Verplicht)",name:"Naam (Optioneel)",show_name:"Toon naam?",show_state:"Toon status?",compact:"Compact?"},icon:{title:"Icoon",icon:"Icoon (Optioneel)",show_icon:"Toon icoon?",use_state_color:"Gebruik status kleur?",tap_action:"Tap actie"},slider:{title:"Schuifregelaar",direction:"Richting",background:"Actergrond",use_brightness:"Gebruik helderheid?",show_track:"Toon spoor?",toggle_on_click:"Fungeren als een schakelaar (schuiven uitschakelen)",force_square:"Forceer vierkant?",lock:{enabled:"Vergrendelen ingeschakeld?",duration:"Vergrendelingsduur in seconden"}},action_button:{title:"Actie button",mode:"Modus",icon:"Icoon",show_button:"Toon button?",show_spinner:"Toon spinner?",tap_action:"Tap actie"}},Ri={off:"Uit",on:"Aan"},Ii={"left-right":"Links naar rechts","top-bottom":"Boven naar onder","bottom-top":"Onder naar boven"},Vi={striped:"Gestreept",gradient:"Verloop",solid:"Vast",triangle:"Driehoek",custom:"Aangepast"},zi={toggle:"Schakelaar",custom:"Aangepast"},Hi={common:Ni,tabs:ji,state:Ri,direction:Ii,background:Vi,mode:zi},Li={version:"v",invalid_configuration:"Nieprawidłowa konfiguracja",show_warning:"Pokaż ostrzeżenia",show_error:"Pokaż błędy"},Ui={general:{title:"Ogólne",entity:"Encja (Wymagana)",name:"Nazwa (Opcjonalna)",show_name:"Pokazać nazwę?",show_state:"Pokazać stan?",compact:"Kompaktowy?"},icon:{title:"Ikona",icon:"Ikona (Opcjonalna)",show_icon:"Pokazać ikonę?",use_state_color:"Uzyć kolor stanu?",tap_action:"Akcja kliknięcia"},slider:{title:"Suwak",direction:"Kierunek",background:"Tło",use_brightness:"Użyć jasności?",show_track:"Pokazać ślad?",toggle_on_click:"Działaj jako przełącznik (wyłącz przesuwanie)",force_square:"Wymusić kwadrat?",lock:{enabled:"Blokada włączona?",duration:"Czas blokady w sekundach"}},action_button:{title:"Przycisk akcji",mode:"Tryb",icon:"Ikona",show_button:"Pokazać przycisk?",show_spinner:"Pokazać spinner?",tap_action:"Akcja kliknięcia"}},Di={off:"Wyłączony",on:"Włączony"},Fi={"left-right":"Z lewej do prawej","top-bottom":"Z góry na dół","bottom-top":"Z dołu do góry"},Bi={striped:"W paski",gradient:"Gradient",solid:"Pełne tło",triangle:"Trójkąt",custom:"Ustawienia własne"},qi={toggle:"Przełącznik",custom:"Ustawienia własne"},Gi={common:Li,tabs:Ui,state:Di,direction:Fi,background:Bi,mode:qi},Yi={version:"v",invalid_configuration:"Configuração Inválida",show_warning:"Mostrar Aviso",show_error:"Mostrar Erro"},Wi={general:{title:"Geral",entity:"Entidade (Obrigatório)",name:"Nome (Opcional)",show_name:"Mostrar Nome?",show_state:"Mostrar Estado?",compact:"Compactar?"},icon:{title:"Ícone",icon:"Ícone (Opcional)",show_icon:"Mostrar Ícone?",use_state_color:"Usar Cor de Estado?",tap_action:"Ação de Toque"},slider:{title:"Slider",direction:"Direção",background:"Fundo",use_brightness:"Usar Brilho?",show_track:"Mostrar Acompanhamento?",toggle_on_click:"Atua como um alternador (desative o deslizamento)",force_square:"Forçar Quadrado?",lock:{enabled:"Bloqueio ativado?",duration:"Duração do bloqueio em segundos"}},action_button:{title:"Botão de Ação",mode:"Modo",icon:"Ícone",show_button:"Mostrar Botão?",show_spinner:"Mostrar Spinner?",tap_action:"Ação de Toque"}},Zi={off:"Desligar",on:"Ligar"},Ki={"left-right":"Esquerda para a Direita","top-bottom":"De Cima para Baixo","bottom-top":"De Baixo para Cima"},Ji={striped:"Listrado",gradient:"Gradiente",solid:"Sólido",triangle:"Triângulo",custom:"Personalizado"},Xi={toggle:"Alternancia",custom:"Personalizado"},Qi={common:Yi,tabs:Wi,state:Zi,direction:Ki,background:Ji,mode:Xi},to={version:"v",invalid_configuration:"Неверная конфигурация",show_warning:"Показать предупреждения",show_error:"Показать ошибки"},eo={general:{title:"Общие",entity:"Объект (обязательно)",name:"Имя (Опционально)",show_name:"Отображать имя?",show_state:"Отображать статус?",compact:"Компактный?"},icon:{title:"Иконка",icon:"Иконка (Опционально)",show_icon:"Показать иконку?",use_state_color:"Использовать цвет статуса?",tap_action:"Действие по нажатию"},slider:{title:"Слайдер",direction:"Направление",background:"Фон",use_brightness:"Использовать яркость?",show_track:"Показать трек?",toggle_on_click:"Действовать как переключатель (отключить скольжение)",force_square:"Отображать квадратным?",lock:{enabled:"Блокировка включена?",duration:"Длительность блокировки в секундах"}},action_button:{title:"Кнопка действия",mode:"Режим",icon:"Иконка",show_button:"Отобразить кнопку?",show_spinner:"Отобразить спиннер?",tap_action:"Действие по нажатию"}},io={off:"Выкл",on:"Вкл"},oo={"left-right":"Слева направо","top-bottom":"Сверху вниз","bottom-top":"Снизу вверх"},ro={striped:"Полосатый",gradient:"Градиент",solid:"Сплошной цвет",triangle:"Треугольник",custom:"Свои настройки"},so={toggle:"Переключатель",custom:"Свои настройки"},no={common:to,tabs:eo,state:io,direction:oo,background:ro,mode:so},ao={version:"v",invalid_configuration:"유효하지 않은 설정입니다",show_warning:"경고 표시",show_error:"에러 표시"},lo={general:{title:"일반",entity:"구성 요소 (필수)",name:"이름 (옵션)",show_name:"이름 표시",show_state:"상태 표시",compact:"슬림 모드"},icon:{title:"아이콘",icon:"아이콘 (옵션)",show_icon:"아이콘 표시",use_state_color:"상태 색상 사용",tap_action:"탭 액션"},slider:{title:"슬라이더",direction:"방향 지정",background:"배경",use_brightness:"밝기 사용",show_track:"범위 표시",toggle_on_click:"토글 버튼으로 동작(슬라이더 비활성화)",force_square:"정사각형 모양으로 고정",lock:{enabled:"잠금을 사용 하시겠습니까?",duration:"잠금 기간 (초)"}},action_button:{title:"액션 버튼",mode:"모드",icon:"아이콘",show_button:"버튼 표시",show_spinner:"로딩 스피너 표시",tap_action:"탭 액셥"}},co={off:"꺼짐",on:"켜짐"},ho={"left-right":"왼쪽에서 오른쪽","top-bottom":"위에서 아래","bottom-top":"아래에서 위"},uo={striped:"줄무늬",gradient:"그레디언트",solid:"단색",triangle:"삼각형",custom:"커스텀"},po={toggle:"토글 모드",custom:"커스텀 모드"},go={common:ao,tabs:lo,state:co,direction:ho,background:uo,mode:po};const fo={en:Object.freeze({__proto__:null,common:ui,tabs:pi,state:gi,direction:fi,background:bi,mode:mi,default:_i}),de:Object.freeze({__proto__:null,common:vi,tabs:yi,state:wi,direction:ki,background:Si,mode:xi,default:Oi}),he:Object.freeze({__proto__:null,common:Ti,tabs:Ci,state:Mi,direction:Pi,background:Ei,mode:Ai,default:$i}),nl:Object.freeze({__proto__:null,common:Ni,tabs:ji,state:Ri,direction:Ii,background:Vi,mode:zi,default:Hi}),pl:Object.freeze({__proto__:null,common:Li,tabs:Ui,state:Di,direction:Fi,background:Bi,mode:qi,default:Gi}),pt:Object.freeze({__proto__:null,common:Yi,tabs:Wi,state:Zi,direction:Ki,background:Ji,mode:Xi,default:Qi}),ru:Object.freeze({__proto__:null,common:to,tabs:eo,state:io,direction:oo,background:ro,mode:so,default:no}),ko:Object.freeze({__proto__:null,common:ao,tabs:lo,state:co,direction:ho,background:uo,mode:po,default:go})};function bo(t,e="",i=""){const o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce((t,e)=>t[e],fo[o])}catch(e){r=t.split(".").reduce((t,e)=>t[e],fo.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],fo.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}let mo=class extends se{constructor(){super(...arguments),this._initialized=!1,this.directions=Ke(ve),this.backgrounds=Ke(ye),this.actionModes=Ke(_e),this.actions=["more-info","toggle","navigate","url","call-service","none"]}async setConfig(t){this._config=t,void 0===this._helpers&&await this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _show_name(){var t,e;return void 0===(null===(t=this._config)||void 0===t?void 0:t.show_name)||(null===(e=this._config)||void 0===e?void 0:e.show_name)}get _show_state(){var t,e;return void 0===(null===(t=this._config)||void 0===t?void 0:t.show_state)||(null===(e=this._config)||void 0===e?void 0:e.show_state)}get _compact(){var t,e;return"boolean"==typeof(null===(t=this._config)||void 0===t?void 0:t.compact)&&(null===(e=this._config)||void 0===e?void 0:e.compact)}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _icon(){var t;return(null===(t=this._config)||void 0===t?void 0:t.icon)||Se}get _slider(){var t;return(null===(t=this._config)||void 0===t?void 0:t.slider)||Oe}get _action_button(){var t;return(null===(t=this._config)||void 0===t?void 0:t.action_button)||ke}render(){var t,e,i,o,r;return this.hass&&this._helpers?(this._helpers.importMoreInfoControl("climate"),It`
      <div class="card-config">
        <div class="tabs">
          <div class="tab">
            <input type="checkbox" id="entity" class="tab-checkbox">
            <label class="tab-label" for="entity">${bo("tabs.general.title")}</label>
            <div class="tab-content">
              <ha-entity-picker
                .hass=${this.hass}
                .includeDomains=${Ke(we)}
                .value=${this._entity}
                .configValue=${"entity"}
                label="${bo("tabs.general.entity")}"
                allow-custom-entity
                @value-changed=${this._valueChangedEntity}
              ></ha-entity-picker>
              <paper-input
                label="${bo("tabs.general.name")}"
                .value=${this._name}
                .placeholder=${this._name||(null===(e=null===(t=this.hass.states[this._entity])||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.friendly_name)}
                .configValue=${"name"}
                @value-changed=${this._valueChanged}
              ></paper-input>
              <div class="side-by-side">
                <ha-formfield .label=${bo("tabs.general.show_name")}>
                  <ha-switch
                    .checked=${this._show_name}
                    .configValue=${"show_name"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${bo("tabs.general.show_state")}>
                  <ha-switch
                    .checked=${this._show_state}
                    .configValue=${"show_state"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${bo("tabs.general.compact")}>
                  <ha-switch
                    .checked=${this._compact}
                    .configValue=${"compact"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            </div>
          </div>

          <div class="tab">
            <input type="checkbox" id="icon" class="tab-checkbox">
            <label class="tab-label" for="icon">${bo("tabs.icon.title")}</label>
            <div class="tab-content">
              <ha-icon-input
              label="${bo("tabs.icon.icon")}"
              .value=${this._icon.icon}
              .placeholder=${this._icon.icon||j(this.hass.states[this._entity])}
              .configValue=${"icon.icon"}
              @value-changed=${this._valueChanged}
              >
              </ha-icon-input>
              <div class="side-by-side">
                <ha-formfield label="${bo("tabs.icon.show_icon")}">
                  <ha-switch
                    .checked=${this._icon.show}
                    .configValue=${"icon.show"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                ${this.renderStateColor("icon")}
              </div>
              <hui-action-editor
                label="${bo("tabs.icon.tap_action")}"
                .hass=${this.hass}
                .config=${this._icon.tap_action}
                .actions=${this.actions}
                .configValue=${"icon.tap_action"}
                @value-changed=${this._valueChanged}
              ></hui-action-editor>
            </div>
          </div>
          
          <div class="tab">
            <input type="checkbox" id="slider" class="tab-checkbox">
            <label class="tab-label" for="slider">${bo("tabs.slider.title")}</label>
            <div class="tab-content">
              <div class="side-by-side">
                <paper-dropdown-menu
                  label="${bo("tabs.slider.direction")}"
                >
                  <paper-listbox 
                    slot="dropdown-content" 
                    attr-for-selected="item-value"
                    .configValue=${"slider.direction"}
                    @selected-item-changed=${this._valueChangedSelect}
                    .selected=${this._slider.direction}
                  >
                    ${this.directions.map(t=>It`
                        <paper-item .itemValue=${t}>${bo("direction."+t)}</paper-item>
                      `)}
                  </paper-listbox>
                </paper-dropdown-menu>
                <paper-dropdown-menu
                  label="${bo("tabs.slider.background")}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    attr-for-selected="item-value"
                    .configValue=${"slider.background"}
                    @selected-item-changed=${this._valueChangedSelect}
                    .selected=${this._slider.background}
                  >
                    ${this.backgrounds.map(t=>It`
                        <paper-item .itemValue=${t}>${bo("background."+t)}</paper-item>
                      `)}
                  </paper-listbox>
                </paper-dropdown-menu>

              </div>
              <div class="side-by-side">
                ${this.renderBrightness("slider")}
                ${this.renderStateColor("slider")}
                <ha-formfield .label=${bo("tabs.slider.show_track")}>
                  <ha-switch
                    .checked=${this._slider.show_track}
                    .configValue=${"slider.show_track"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${bo("tabs.slider.toggle_on_click")}>
                  <ha-switch
                    .checked=${this._slider.toggle_on_click}
                    .configValue=${"slider.toggle_on_click"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${bo("tabs.slider.force_square")}>
                  <ha-switch
                    .checked=${this._slider.force_square}
                    .configValue=${"slider.force_square"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
              <div class="side-by-side">
                <ha-formfield .label=${bo("tabs.slider.lock.enabled")}>
                  <ha-switch
                    .checked=${null===(i=this._slider.lock)||void 0===i?void 0:i.enabled}
                    .configValue=${"slider.lock.enabled"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                ${(null===(o=this._slider.lock)||void 0===o?void 0:o.enabled)?It`
                    <paper-input
                      pattern="[0-9]+([\\\\.][0-9]+)?"
                      .label=${bo("tabs.slider.lock.duration")}
                      .noLabelFloat=${!1}
                      .min=${1}
                      .max=${10}
                      .value=${(null===(r=this._slider.lock)||void 0===r?void 0:r.duration)||xe.duration}
                      .step=${.1}
                      type="number"
                      auto-validate
                      .configValue=${"slider.lock.duration"}
                      @value-changed=${this._numberChanged}
                    ></paper-input>
                `:""}
              </div>
            </div>
          </div>
          
          <div class="tab">
            <input type="checkbox" id="action" class="tab-checkbox">
            <label class="tab-label" for="action">${bo("tabs.action_button.title")}</label>
            <div class="tab-content">
              <paper-dropdown-menu
                label="${bo("tabs.action_button.mode")}"
              >
                <paper-listbox
                  slot="dropdown-content"
                  attr-for-selected="item-value"
                  .configValue=${"action_button.mode"}
                  @selected-item-changed=${this._valueChangedSelect}
                  .selected=${this._action_button.mode}
                >
                  ${this.actionModes.map(t=>It`
                        <paper-item .itemValue=${t}>${bo("mode."+t)}</paper-item>
                      `)}
                </paper-listbox>
              </paper-dropdown-menu>              
              ${this._action_button.mode===_e.CUSTOM?It`
                  <ha-icon-input
                    label="${bo("tabs.action_button.icon")}"
                    .value=${this._action_button.icon}
                    .placeholder=${this._action_button.icon||"mdi:power"}
                    .configValue=${"action_button.icon"}
                    @value-changed=${this._valueChanged}
                  >
                  </ha-icon-input>
                `:""}
              <div class="side-by-side">
                <ha-formfield .label=${bo("tabs.action_button.show_button")}>
                  <ha-switch
                    .checked=${this._action_button.show}
                    .configValue=${"action_button.show"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                ${this._action_button.mode===_e.CUSTOM?It`
                    <ha-formfield .label=${bo("tabs.action_button.show_spinner")}>
                      <ha-switch
                        .checked=${this._action_button.show_spinner}
                        .configValue=${"action_button.show_spinner"}
                        @change=${this._valueChanged}
                      ></ha-switch>
                    </ha-formfield>
                `:""}
              </div>
              ${this._action_button.mode===_e.CUSTOM?It`
                  <hui-action-editor
                    label="${bo("tabs.action_button.tap_action")}"
                    .hass=${this.hass}
                    .config=${this._action_button.tap_action}
                    .actions=${this.actions}
                    .configValue=${"action_button.tap_action"}
                    @value-changed=${this._valueChanged}
                  ></hui-action-editor>
                `:""}
            </div>
          </div>
        </div>
      </div>
    `):It``}renderBrightness(t){const e=this["_"+t];return It`
      <ha-formfield .label=${bo("tabs.slider.use_brightness")}>
        <ha-switch
          .checked=${e.use_percentage_bg_opacity}
          .configValue="${t}.use_percentage_bg_opacity"
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `}renderStateColor(t){const e=this["_"+t];return It`
      <ha-formfield .label=${bo("tabs.icon.use_state_color")}>
        <ha-switch
          .checked=${e.use_state_color}
          .configValue="${t}.use_state_color"
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChangedSelect(t){var e;const i=t.detail.value;i&&this._changeValue(null===(e=i.parentElement)||void 0===e?void 0:e.configValue,i.itemValue)}_valueChangedEntity(t){var e,i;const o=t.target,r=null===(e=t.detail)||void 0===e?void 0:e.value,s=w(r)!==w((null===(i=this._config)||void 0===i?void 0:i.entity)||"light.dummy");if(this._changeValue("name",""),this._changeValue("icon.icon",""),this._changeValue(o.configValue,r),s){const t=X(this._config);Je(t,["slider"],Xe(r)),this._config=t,O(this,"config-changed",{config:this._config})}}_valueChanged(t){var e;const i=t.target,o=null===(e=t.detail)||void 0===e?void 0:e.value;this._changeValue(i.configValue,void 0!==i.checked?i.checked:o)}_numberChanged(t){t.stopPropagation();const e=t.target,i=""===e.value||isNaN(e.value)?xe.duration:Number(e.value);this._changeValue(e.configValue,i)}_changeValue(t,e){if(this._config&&this.hass&&(void 0===this["_"+t]||this["_"+t]!==e)){if(t){const i=X(this._config);Je(i,[...t.split(".")],e),this._config=i,""===e&&delete this._config[t]}O(this,"config-changed",{config:this._config})}}static get styles(){return oe`
      ha-switch {
        padding: 16px 6px;
      }
      .side-by-side {
        display: flex;
        flex-flow: row wrap;
      }
      .side-by-side > * {
        padding-right: 8px;
        width: 50%;
        flex-flow: column wrap;
        box-sizing: border-box;
      }
      .side-by-side > *:last-child {
        flex: 1;
        padding-right: 0;
      }
      .suffix {
        margin: 0 8px;
      }
      .group {
        padding: 15px;
        border: 1px solid var(--primary-text-color)
      }
      .tabs {
        overflow: hidden;        
      }
      .tab {
        width: 100%;
        color: var(--primary-text-color);
        overflow: hidden;
      }
      .tab-label {
        display: flex;
        justify-content: space-between;
        padding: 1em 1em 1em 0em;
        border-bottom: 1px solid var(--secondary-text-color);
        font-weight: bold;
        cursor: pointer;
      }
      .tab-label:hover {
        /*background: #1a252f;*/
      }
      .tab-label::after {
        content: "❯";
        width: 1em;
        height: 1em;
        text-align: center;
        transition: all 0.35s;
      }
      .tab-content {
        max-height: 0;
        padding: 0 1em;
        background: var(--secondary-background-color);
        transition: all 0.35s;
      }
      input.tab-checkbox {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }      
      input.tab-checkbox:checked + .tab-label {
        border-color: var(--accent-color);
      }
      input.tab-checkbox:checked + .tab-label::after {
        transform: rotate(90deg);
      }
      input.tab-checkbox:checked ~ .tab-content {
        max-height: 100vh;
        padding: 1em;
      }
    `}};t([Zt({attribute:!1})],mo.prototype,"hass",void 0),t([Kt()],mo.prototype,"_config",void 0),t([Kt()],mo.prototype,"_helpers",void 0),mo=t([Yt("slider-button-card-editor")],mo),console.info(`%c  SLIDER-BUTTON-CARD %c ${bo("common.version")}1.10.2 %c`,"background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border: 1px solid #555;border-radius: 3px 0 0 3px;font-family: Roboto,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)","background-color: transparent;color: #555;padding: 3px 3px 3px 2px;border: 1px solid #555; border-radius: 0 3px 3px 0;font-family: Roboto,Verdana,Geneva,sans-serif","background-color: transparent"),window.customCards=window.customCards||[],window.customCards.push({type:"slider-button-card",name:"Slider button Card",description:"A button card with slider",preview:!0});let _o=class extends se{constructor(){super(...arguments),this.changing=!1,this.changed=!1,this.locked=!1}static async getConfigElement(){return document.createElement("slider-button-card-editor")}static getStubConfig(t,e){const i=e.find(t=>t.startsWith("light"))||"";return{entity:i,slider:Xe(i),show_name:!0,show_state:!0,compact:!1,icon:X(Se),action_button:X(ke)}}getCardSize(){return 0}setConfig(t){var e,i;if(!t)throw new Error(bo("common.invalid_configuration"));if(!t.entity)throw new Error(bo("common.invalid_configuration"));this.config=Object.assign({slider:Xe(t.entity),icon:X(Se),show_name:!0,show_state:!0,compact:!1,action_button:X(ke),debug:!1},t),this.ctrl=class{static getInstance(t){const e=w(t.entity),i={[we.LIGHT]:li,[we.FAN]:si,[we.SWITCH]:di,[we.COVER]:ri,[we.INPUT_BOOLEAN]:ni,[we.MEDIA_PLAYER]:hi,[we.CLIMATE]:oi,[we.LOCK]:ci};if(void 0===i[e])throw new Error("Unsupported entity type: "+e);return new i[e](t)}}.getInstance(this.config),(null===(i=null===(e=this.config.slider)||void 0===e?void 0:e.lock)||void 0===i?void 0:i.enabled)&&(this.locked=!0)}shouldUpdate(t){if(!this.config)return!1;const e=t.get("hass");return e&&e.themes===this.hass.themes&&e.language===this.hass.language?function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1):(this.ctrl.log("shouldUpdate","forced true"),!0)}updated(t){this.updateValue(this.ctrl.value,!1),this.animateActionEnd();const e=t.get("hass"),i=t.get("config");(null==e?void 0:e.themes)===this.hass.themes&&(null==i?void 0:i.theme)===this.config.theme||(this.ctrl.log("Theme","updated"),function(t,e,i,o){void 0===o&&(o=!1),t._themes||(t._themes={});var r=e.default_theme;("default"===i||i&&e.themes[i])&&(r=i);var s=Object.assign({},t._themes);if("default"!==r){var n=e.themes[r];Object.keys(n).forEach((function(e){var i="--"+e;t._themes[i]="",s[i]=n[e]}))}if(t.updateStyles?t.updateStyles(s):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,s),o){var a=document.querySelector("meta[name=theme-color]");if(a){a.hasAttribute("default-content")||a.setAttribute("default-content",a.getAttribute("content"));var l=s["--primary-color"]||a.getAttribute("default-content");a.setAttribute("content",l)}}}(this,this.hass.themes,this.config.theme)),this.ctrl.log("Updated",this.ctrl.value)}firstUpdated(t){super.firstUpdated(t)}render(){var t,e,i,o,r,s,n,a,l;return this.ctrl.hass=this.hass,this.ctrl.stateObj?It`
      <ha-card
        tabindex="0"
        .label=${"SliderButton: "+(this.config.entity||"No Entity Defined")}
        class="${le({square:(null===(t=this.config.slider)||void 0===t?void 0:t.force_square)||!1,"hide-name":!this.config.show_name,"hide-state":!this.config.show_state,"hide-action":!(null===(e=this.config.action_button)||void 0===e?void 0:e.show),compact:!0===this.config.compact,locked:this.locked})}"
      >
        <div class="button ${le({off:this.ctrl.isOff,unavailable:this.ctrl.isUnavailable})}"
             data-lock-layout="${(null===(o=null===(i=this.config.slider)||void 0===i?void 0:i.lock)||void 0===o?void 0:o.layout)||me.CORNER}"
             style=${ue({"--slider-value":this.ctrl.percentage+"%","--slider-bg-filter":this.ctrl.style.slider.filter,"--slider-color":this.ctrl.style.slider.color,"--icon-filter":this.ctrl.style.icon.filter,"--icon-color":this.ctrl.style.icon.color})}
             >
          ${(null===(s=null===(r=this.config.slider)||void 0===r?void 0:r.lock)||void 0===s?void 0:s.enabled)?It`
                <div class="lock-overlay" @click=${this.handleLockClick}>
                  <ha-icon
                    tabindex="-1"
                    .icon=${"mdi:lock-outline"}
                  ></ha-icon>
                </div>
                `:""}
          <div class="slider"
               data-show-track="${null===(n=this.config.slider)||void 0===n?void 0:n.show_track}"
               data-mode="${null===(a=this.config.slider)||void 0===a?void 0:a.direction}"
               data-background="${null===(l=this.config.slider)||void 0===l?void 0:l.background}"
               data-is-toggle="${this.ctrl.hasToggle}"
               @pointerdown=${this.onPointerDown}
               @pointermove=${this.onPointerMove}
               @pointerup=${this.onPointerUp}
          >
            ${this.ctrl.hasToggle?It`
                <div class="toggle-overlay" @click=${this.handleClick}></div>
                `:""}
            <div class="slider-bg"></div>
            <div class="slider-thumb"></div>           
          </div>
          ${this.renderText()}
          ${this.renderAction()}
          ${this.renderIcon()}
        </div>
      </ha-card>
    `:this._showError(bo("common.show_error"))}renderText(){return this.config.show_name||this.config.show_state?It`
          <div class="text">
            ${this.config.show_name?It`
                <div class="name">${this.ctrl.name}</div>
                `:""}
            ${this.config.show_state?It`
                <div class="state">
                  ${this.ctrl.isUnavailable?It`
                    ${this.hass.localize("state.default.unavailable")}
                    `:It`
                    ${this.ctrl.label}
                  `}
                </div>
                `:""}
          </div>
    `:It``}renderIcon(){var t;if(!1===(null===(t=this.config.icon)||void 0===t?void 0:t.show))return It``;let e=!1,i="";return this.ctrl.stateObj.attributes.entity_picture&&(i=`url(${this.ctrl.stateObj.attributes.entity_picture})`,e=!0),It`
      <div class="icon ${le({"has-picture":e})}"
           @action=${t=>this._handleAction(t,this.config.icon)}
           .actionHandler=${be({hasHold:!1,hasDoubleClick:!1})}
           style=${ue({"background-image":""+i})}
           >
        <ha-icon
          tabindex="-1"
          data-domain=${k(this.ctrl.stateObj)}
          data-state=${he(this.ctrl.stateObj?this.ctrl.state:void 0)}          
          .icon=${this.ctrl.icon}
        />
      </div>
    `}renderAction(){var t,e,i,o,r;return!1===(null===(t=this.config.action_button)||void 0===t?void 0:t.show)?It``:(null===(e=this.config.action_button)||void 0===e?void 0:e.mode)===_e.TOGGLE?It`
        <div class="action">
          <ha-switch
            .disabled=${this.ctrl.isUnavailable}
            .checked=${!x.includes(this.ctrl.state)}
            @change=${this._toggle}
          ></ha-switch>
        </div>
      `:It`
      <div class="action"
           @action=${t=>this._handleAction(t,this.config.action_button)}
           .actionHandler=${be({hasHold:!1,hasDoubleClick:!1})}           
           >
        <ha-icon
          tabindex="-1"
          .icon=${(null===(i=this.config.action_button)||void 0===i?void 0:i.icon)||"mdi:power"}
        ></ha-icon>
        ${void 0===(null===(o=this.config.action_button)||void 0===o?void 0:o.show_spinner)||(null===(r=this.config.action_button)||void 0===r?void 0:r.show_spinner)?It`
            <svg class="circular-loader" viewBox="25 25 50 50">
              <circle class="loader-path" cx="50" cy="50" r="20"></circle>
            </svg>
                `:""}
      </div>
    `}_handleAction(t,e){var i;this.hass&&this.config&&t.detail.action&&("toggle"!==(null===(i=e.tap_action)||void 0===i?void 0:i.action)||this.ctrl.isUnavailable||this.animateActionStart(),A(this,this.hass,Object.assign(Object.assign({},e),{entity:this.config.entity}),t.detail.action))}handleLockClick(t){t.preventDefault(),this.locked?this.unlockCard():this.lockCard()}lockCard(){clearTimeout(this.lockTimeout),this.locked=!0,this.card.classList.add("locked")}unlockCard(){var t,e;clearTimeout(this.lockTimeout),this.locked=!1,this.card.classList.remove("locked"),this.lockTimeout=setTimeout(()=>{this.lockCard()},1e3*((null===(e=null===(t=this.config.slider)||void 0===t?void 0:t.lock)||void 0===e?void 0:e.duration)||5))}async handleClick(t){this.ctrl.hasToggle&&!this.ctrl.isUnavailable&&(t.preventDefault(),this.animateActionStart(),this.ctrl.log("Toggle"),await P(this.hass,this.config.entity))}_toggle(){this.hass&&this.config&&A(this,this.hass,{tap_action:{action:"toggle"},entity:this.config.entity},"tap")}setStateValue(t){this.ctrl.log("setStateValue",t),this.updateValue(t,!1),this.ctrl.value=t,this.animateActionStart()}animateActionStart(){this.animateActionEnd(),this.action&&this.action.classList.add("loading")}animateActionEnd(){this.action&&(clearTimeout(this.actionTimeout),this.actionTimeout=setTimeout(()=>{this.action.classList.remove("loading")},750))}updateValue(t,e=!0){this.changing=e,this.changed=!e,this.ctrl.log("updateValue",t),this.ctrl.targetValue=t,this.button&&(this.button.classList.remove("off"),e?this.button.classList.add("changing"):(this.button.classList.remove("changing"),this.ctrl.isOff&&this.button.classList.add("off")),this.stateText&&(this.stateText.innerHTML=this.ctrl.isUnavailable?""+this.hass.localize("state.default.unavailable"):this.ctrl.label),this.button.style.setProperty("--slider-value",this.ctrl.percentage+"%"),this.button.style.setProperty("--slider-bg-filter",this.ctrl.style.slider.filter),this.button.style.setProperty("--slider-color",this.ctrl.style.slider.color),this.button.style.setProperty("--icon-filter",this.ctrl.style.icon.filter),this.button.style.setProperty("--icon-color",this.ctrl.style.icon.color),this.button.style.setProperty("--icon-rotate-speed",this.ctrl.style.icon.rotateSpeed||"0s"))}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),It`
      ${e}
    `}getColorFromVariable(t){if(void 0!==t&&"var"===t.substring(0,3)){let e=window.getComputedStyle(this).getPropertyValue(t.substring(4).slice(0,-1)).trim();return e.length||(e=window.getComputedStyle(document.documentElement).getPropertyValue(t.substring(4).slice(0,-1)).trim()),e}return t}onPointerDown(t){t.preventDefault(),t.stopPropagation(),this.ctrl.isSliderDisabled||this.slider.setPointerCapture(t.pointerId)}onPointerUp(t){t.stopPropagation(),this.ctrl.isSliderDisabled||(this.setStateValue(this.ctrl.targetValue),this.slider.releasePointerCapture(t.pointerId))}onPointerMove(t){if(this.ctrl.isSliderDisabled)return;if(!this.slider.hasPointerCapture(t.pointerId))return;const{left:e,top:i,width:o,height:r}=this.slider.getBoundingClientRect(),s=this.ctrl.moveSlider(t,{left:e,top:i,width:o,height:r});this.ctrl.log("onPointerMove",s),this.updateValue(s)}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}static get styles(){return oe`
    ha-card {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      min-height: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      touch-action: none;
      overflow: hidden;      
      --mdc-icon-size: 2.2em;
    }
    ha-card.square {
      aspect-ratio: 1 / 1;
    }
    ha-card.compact {
      min-height: 3rem !important;
    }
    ha-card.locked {
      touch-action: auto;
    }
    :host {
      --slider-bg-default-color: var(--primary-color, rgb(95, 124, 171));
      --slider-bg: var(--slider-color);
      --slider-bg-filter: brightness(100%);
      --slider-bg-direction: to right;
      --slider-track-color: #2b374e; 
      --slider-tracker-color: transparent;
      --slider-value: 0%;
      --slider-transition-duration: 0.2s;      
      /*--label-text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
      /*--label-color-on: var(--primary-text-color, white);*/
      /*--label-color-off: var(--primary-text-color, white);*/
      --icon-filter: brightness(100%);
      --icon-color: var(--paper-item-icon-color);
      --icon-rotate-speed: 0s;
      /*--state-color-on: #BAC0C6; */
      /*--state-color-off: var(--disabled-text-color);*/
      /*--state-text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
      --btn-bg-color-off: rgba(43,55,78,1);
      --btn-bg-color-on: #20293c;
      /*--action-icon-color-on: var(--paper-item-icon-color, black);*/
      /*--action-icon-color-off: var(--paper-item-icon-color, black);*/      
      /*--action-spinner-color: var(--label-badge-text-color, white);*/
    }
    /* --- BUTTON --- */
    
    .button {
      position: relative;
      padding: 0.8rem;
      box-sizing: border-box;
      height: 100%;
      min-height: 7rem;
      width: 100%;
      display: block;
      overflow: hidden;           
      transition: all 0.2s ease-in-out;
      touch-action: none;
    }
    ha-card.compact .button {
      min-height: 3rem !important;
    }
    .button.off {
      background-color: var(--btn-bg-color-off);
    }
    ha-card.locked .button {
      touch-action: auto;
    }

    /* --- ICON --- */
    
    .icon {
      position: relative;
      cursor: pointer;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      box-sizing: border-box;
      padding: 0;
      outline: none;
      animation: var(--icon-rotate-speed, 0s) linear 0s infinite normal both running rotate;
      -webkit-tap-highlight-color: transparent;
    }
    .icon ha-icon {
      filter: var(--icon-filter, brightness(100%));
      color: var(--icon-color);
      transition: color 0.4s ease-in-out 0s, filter 0.2s linear 0s;
    }
    .icon.has-picture {
      background-size: cover;
      border-radius: 50%;
    }
    .icon.has-picture ha-icon{
      display: none;
    }
    .unavailable .icon ha-icon {
      color: var(--disabled-text-color);
    }
    .compact .icon {
      float: left;
    }

    /* --- TEXT --- */
    
    .text {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0.8rem;
      pointer-events: none;
      user-select: none;
      font-size: 1.1rem;
      line-height: 1.3rem;
      max-width: calc(100% - 2em);
      /*text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
    }
    .compact .text {
      position: relative;
      top: 0.5rem;
      left: 0.5rem;
      display: inline-block;
      padding: 0;
      height: 1.3rem;
      width: 100%;
      overflow: hidden;
      max-width: calc(100% - 4em);
    }
    .compact.hide-action .text {         
      max-width: calc(100% - 2em);      
    }    

    /* --- LABEL --- */
    
    .name {
      color: var(--label-color-on, var(--primary-text-color, white));      
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-shadow: var(--label-text-shadow, none);
    }
    .off .name {
      color: var(--label-color-off, var(--primary-text-color, white));
    }
    .unavailable.off .name,
    .unavailable .name {
      color: var(--disabled-text-color);
    }
    .compact .name {
      display: inline-block;   
      max-width: calc(100% - 3.5em);
    }    
    
    /* --- STATE --- */
    
    .state {      
      color: var(--state-color-on, var(--label-badge-text-color, white));      
      text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow: var(--state-text-shadow);
      transition: font-size 0.1s ease-in-out;
    }
    .changing .state {
      font-size: 150%;
    }
    .off .state {
      color: var(--state-color-off, var(--disabled-text-color));
    }
    .unavailable .state {
      color: var(--disabled-text-color);
    }
    .compact .state {
      display: inline-block;
      max-width: calc(100% - 0em);
      overflow: hidden;
    }
    
    
    /* --- SLIDER --- */    
    
    .slider {
      position: absolute;      
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      background-color: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-on, black)) );
      cursor: ew-resize;
      z-index: 0;
    }
    .slider[data-mode="bottom-top"] {
      cursor: ns-resize;
    }
    .slider[data-mode="top-bottom"] {
      cursor: ns-resize;
    }
    .slider:active {
      cursor: grabbing;
    }
    
    /* --- SLIDER OVERLAY --- */      
      
    .lock-overlay {
      position: absolute;      
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      cursor: pointer;
      opacity: 0;
      display: block;
      pointer-events: none;
      z-index: 99999;
      transition: opacity 0.5s ease-in-out;    
    }    
    [data-lock-layout="overlay"] .lock-overlay {
      background: rgba(0, 0, 0, 0.1);
    } 
    .lock-overlay ha-icon{
      --mdc-icon-size: 20px;
      position: absolute;      
      bottom: 0px;
      right: 0px;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      color: var(--label-color-on, var(--primary-text-color, black));
      opacity: 0.5;
    }    
    [data-lock-layout="corner"] .lock-overlay ha-icon {
      margin: 0.4rem;
    }     
    .compact [data-lock-layout="corner"] .lock-overlay ha-icon {
      margin: 0;
      bottom: unset;
      top: 1.2rem;
      right: 3.2rem;
    }     
    .compact.hide-action [data-lock-layout="corner"] .lock-overlay ha-icon {
      right: 1.2rem;
    }     
    [data-lock-layout="overlay"] .lock-overlay ha-icon {
      --mdc-icon-size: 30px;
      bottom: unset;
      right: unset;
      top: 50%;
      left: 50%;
      margin-top: -15px;
      margin-left: -15px;      
    }     
    .locked .lock-overlay {
      pointer-events: all;
      opacity: 1;
    }
    
    .slider .toggle-overlay {
      position: absolute;      
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      cursor: pointer;
      opacity: 0;
      z-index: 999;    
    }
    
    /* --- SLIDER BACKGROUND --- */   
     
    .slider-bg {       
      position: absolute;
      top: 0;
      left: 0px;
      height: 100%;
      width: 100%;
      background: var(--slider-bg);
      background-size: var(--slider-bg-size, 100% 100%);
      background-color: var(--slider-bg-color, transparent);
      background-position: var(--slider-bg-position, 0 0);
      filter: var(--slider-bg-filter, brightness(100%));
    }
    .off .slider .slider-bg {
      background-color: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-off, black)) );
    }
    .slider[data-background="solid"] .slider-bg {            
      --slider-bg-color: var(--slider-color);
    }
    .slider[data-background="triangle"] .slider-bg {      
      --slider-bg-direction: to bottom right;    
      --slider-bg: linear-gradient(var(--slider-bg-direction), transparent 0%, transparent 50%, var(--slider-color) 50%, var(--slider-color) 100%);
      border-right: 0px solid;
    }    
    .slider[data-background="triangle"][data-mode="bottom-top"] .slider-bg {
      --slider-bg-direction: to top left;      
    }    
    .slider[data-background="triangle"][data-mode="top-bottom"] .slider-bg {
      --slider-bg-direction: to bottom left;      
    }
    .slider[data-background="custom"] .slider-bg {    
      --slider-bg: repeating-linear-gradient(-45deg, var(--slider-color) 0, var(--slider-color) 1px, var(--slider-color) 0, transparent 10%);
      --slider-bg-size: 30px 30px;
    }    
    .slider[data-background="gradient"] .slider-bg {
      --slider-bg: linear-gradient(var(--slider-bg-direction), rgba(0, 0, 0, 0) -10%, var(--slider-color) 100%);
    }    
    .slider[data-background="striped"] .slider-bg {
      --slider-bg: linear-gradient(var(--slider-bg-direction), var(--slider-color), var(--slider-color) 50%, transparent 50%, transparent);
      --slider-bg-size: 4px 100%;
    }
    .slider[data-background="striped"][data-mode="bottom-top"] .slider-bg,
    .slider[data-background="striped"][data-mode="top-bottom"] .slider-bg {      
      --slider-bg-size: 100% 4px;
    }    
    .slider[data-mode="bottom-top"] .slider-bg {
      --slider-bg-direction: to top;      
    }    
    .slider[data-mode="top-bottom"] .slider-bg {
      --slider-bg-direction: to bottom;      
    }
    
    /* --- SLIDER THUMB --- */        
    
    .slider-thumb {
      position: relative;
      width: 100%;
      height: 100%;      
      transform: translateX(var(--slider-value));
      background: transparent;
      transition: transform var(--slider-transition-duration) ease-in;
    }
    .changing .slider .slider-thumb {
      transition: none;
    }    
    .slider[data-mode="top-bottom"] .slider-thumb {
      transform: translateY(var(--slider-value)) !important;
    }
    .slider[data-mode="bottom-top"] .slider-thumb {
      transform: translateY(calc(var(--slider-value) * -1))  !important;
    }
    
    .slider-thumb:before {
      content: '';
      position: absolute;
      top: 0;
      left: -2px;
      height: 100%;
      width: 2px;          
      background: var(--slider-color);
      opacity: 0;       
      transition: opacity 0.2s ease-in-out 0s;   
      box-shadow: var(--slider-color) 0px 1px 5px 1px;
      z-index: 999;
    }
    .slider[data-mode="top-bottom"] .slider-thumb:before {
      top: -2px;
      left: 0px;
      height: 2px;
      width: 100%;              
    }    
    .changing .slider-thumb:before {
      opacity: 0.5;    
    }
    .off.changing .slider-thumb:before {
      opacity: 0;    
    }
    
    .slider-thumb:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0px;
      height: 100%;
      width: 100%;          
      background: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-on, black)) );
      opacity: 1;            
    }
    .slider[data-show-track="true"] .slider-thumb:after {
      opacity: 0.9;
    }
    .off .slider[data-show-track="true"] .slider-thumb:after {
      opacity: 1;
    }
                  
    /* --- ACTION BUTTON --- */      
              
    .action {
      position: relative;
      float: right;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      color: var(--action-icon-color-on, var(--paper-item-icon-color, black));
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }    
    .action ha-switch {
      position: absolute;
      right: 0;
      top: 5px;
    }    
    .off .action {
      color: var(--action-icon-color-off, var(--paper-item-icon-color, black));
    }
    .unavailable .action {
      color: var(--disabled-text-color);
    }
    

    .circular-loader {
      position: absolute;
      left: -8px;
      top: -8px;
      width: calc(var(--mdc-icon-size, 24px) + 16px);
      height: calc(var(--mdc-icon-size, 24px) + 16px);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      animation: rotate 2s linear infinite; 
    }   
    .action.loading .circular-loader {
      opacity: 1;      
    }    

    .loader-path {
      fill: none;
      stroke-width: 2px;
      stroke: var(--action-spinner-color, var(--label-badge-text-color, white));
      animation: animate-stroke 1.5s ease-in-out infinite both;        
      stroke-linecap: round;
    }
    
    /* --- MISC --- */    
    
    .unavailable .slider .toggle-overlay,
    .unavailable .action,
    .unavailable .action ha-switch,    
    .unavailable .slider {
      cursor: not-allowed !important;
    }
    
    
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes animate-stroke {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
      }
    }     
    `}};t([Zt({attribute:!1})],_o.prototype,"hass",void 0),t([Kt()],_o.prototype,"config",void 0),t([Jt(".state")],_o.prototype,"stateText",void 0),t([Jt(".button")],_o.prototype,"button",void 0),t([Jt(".action")],_o.prototype,"action",void 0),t([Jt(".slider")],_o.prototype,"slider",void 0),t([Jt(".type-custom-slider-button-card")],_o.prototype,"card",void 0),_o=t([Yt("slider-button-card")],_o);export{_o as SliderButtonCard};
