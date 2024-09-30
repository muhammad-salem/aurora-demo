"use strict";(self.webpackChunkwebpack=self.webpackChunkwebpack||[]).push([[155],{869:(t,e,n)=>{n.d(e,{_:()=>o});var r=n(608);function o(t,e,n,r,o){return new i(t,e,n,r,o)}var i=function(t){function e(e,n,r,o,i,u){var s=t.call(this,e)||this;return s.onFinalize=i,s.shouldUnsubscribe=u,s._next=n?function(t){try{n(t)}catch(t){e.error(t)}}:t.prototype._next,s._error=o?function(t){try{o(t)}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._error,s._complete=r?function(){try{r()}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,s}return(0,r.C6)(e,t),e.prototype.unsubscribe=function(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;t.prototype.unsubscribe.call(this),!n&&(null===(e=this.onFinalize)||void 0===e||e.call(this))}},e}(n(852).vU)},45:(t,e,n)=>{n.d(e,{T:()=>i});var r=n(185),o=n(869);function i(t,e){return(0,r.N)((function(n,r){var i=0;n.subscribe((0,o._)(r,(function(n){r.next(t.call(e,n,i++))})))}))}},185:(t,e,n)=>{n.d(e,{N:()=>o});var r=n(460);function o(t){return function(e){if(function(t){return(0,r.T)(null==t?void 0:t.lift)}(e))return e.lift((function(e){try{return t(e,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}},155:(t,e,n)=>{n.r(e),n.d(e,{ExpressionEditorComponent:()=>S});var r=n(608),o=n(684),i=function(t){return t&&"number"==typeof t.length&&"function"!=typeof t},u=n(460),s=n(509),c=n(805),l="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator",a=n(585);function d(t){if(t instanceof s.c)return t;if(null!=t){if(function(t){return(0,u.T)(t[c.s])}(t))return h=t,new s.c((function(t){var e=h[c.s]();if((0,u.T)(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(i(t))return d=t,new s.c((function(t){for(var e=0;e<d.length&&!t.closed;e++)t.next(d[e]);t.complete()}));if(o=t,(0,u.T)(null==o?void 0:o.then))return n=t,new s.c((function(t){n.then((function(e){t.closed||(t.next(e),t.complete())}),(function(e){return t.error(e)})).then(null,a.m)}));if(function(t){return Symbol.asyncIterator&&(0,u.T)(null==t?void 0:t[Symbol.asyncIterator])}(t))return f(t);if(function(t){return(0,u.T)(null==t?void 0:t[l])}(t))return e=t,new s.c((function(t){var n,o;try{for(var i=(0,r.Ju)(e),u=i.next();!u.done;u=i.next()){var s=u.value;if(t.next(s),t.closed)return}}catch(t){n={error:t}}finally{try{u&&!u.done&&(o=i.return)&&o.call(i)}finally{if(n)throw n.error}}t.complete()}));if(function(t){return(0,u.T)(null==t?void 0:t.getReader)}(t))return f(function(t){return(0,r.AQ)(this,arguments,(function(){var e,n,o;return(0,r.YH)(this,(function(i){switch(i.label){case 0:e=t.getReader(),i.label=1;case 1:i.trys.push([1,,9,10]),i.label=2;case 2:return[4,(0,r.N3)(e.read())];case 3:return n=i.sent(),o=n.value,n.done?[4,(0,r.N3)(void 0)]:[3,5];case 4:return[2,i.sent()];case 5:return[4,(0,r.N3)(o)];case 6:return[4,i.sent()];case 7:return i.sent(),[3,2];case 8:return[3,10];case 9:return e.releaseLock(),[7];case 10:return[2]}}))}))}(t))}var e,n,o,d,h;throw function(t){return new TypeError("You provided "+(null!==t&&"object"==typeof t?"an invalid object":"'"+t+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}(t)}function f(t){return new s.c((function(e){(function(t,e){var n,o,i,u;return(0,r.sH)(this,void 0,void 0,(function(){var s,c;return(0,r.YH)(this,(function(l){switch(l.label){case 0:l.trys.push([0,5,6,11]),n=(0,r.xN)(t),l.label=1;case 1:return[4,n.next()];case 2:if((o=l.sent()).done)return[3,4];if(s=o.value,e.next(s),e.closed)return[2];l.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return c=l.sent(),i={error:c},[3,11];case 6:return l.trys.push([6,,9,10]),o&&!o.done&&(u=n.return)?[4,u.call(n)]:[3,8];case 7:l.sent(),l.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return e.complete(),[2]}}))}))})(t,e).catch((function(t){return e.error(t)}))}))}var h=n(45),v=n(185),m=n(869);function p(t,e,n){return void 0===n&&(n=1/0),(0,u.T)(e)?p((function(n,r){return(0,h.T)((function(t,o){return e(n,t,r,o)}))(d(t(n,r)))}),n):("number"==typeof e&&(n=e),(0,v.N)((function(e,r){return function(t,e,n,r){var o=[],i=0,u=0,s=!1,c=function(){!s||o.length||i||e.complete()},l=function(t){return i<r?a(t):o.push(t)},a=function(t){i++;var s=!1;d(n(t,u++)).subscribe((0,m._)(e,(function(t){e.next(t)}),(function(){s=!0}),void 0,(function(){if(s)try{i--;for(var t=function(){var t=o.shift();a(t)};o.length&&i<r;)t();c()}catch(t){e.error(t)}})))};return t.subscribe((0,m._)(e,l,(function(){s=!0,c()}))),function(){}}(e,r,t,n)})))}var b=Array.isArray;var y=["addListener","removeListener"],x=["addEventListener","removeEventListener"],g=["on","off"];function w(t,e,n,o){if((0,u.T)(n)&&(o=n,n=void 0),o)return w(t,e,n).pipe((c=o,(0,h.T)((function(t){return function(t,e){return b(e)?t.apply(void 0,(0,r.fX)([],(0,r.zs)(e))):t(e)}(c,t)}))));var c,l=(0,r.zs)(function(t){return(0,u.T)(t.addEventListener)&&(0,u.T)(t.removeEventListener)}(t)?x.map((function(r){return function(o){return t[r](e,o,n)}})):function(t){return(0,u.T)(t.addListener)&&(0,u.T)(t.removeListener)}(t)?y.map(T(t,e)):function(t){return(0,u.T)(t.on)&&(0,u.T)(t.off)}(t)?g.map(T(t,e)):[],2),a=l[0],f=l[1];if(!a&&i(t))return p((function(t){return w(t,e,n)}))(d(t));if(!a)throw new TypeError("Invalid event target");return new s.c((function(t){var e=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return t.next(1<e.length?e:e[0])};return a(e),function(){return f(e)}}))}function T(t,e){return function(n){return function(r){return t[n](e,r)}}}var A=n(712),_=n(254);function E(t,e){return t===e}let S=(()=>{let t,e,i,u,s,c,l=[(0,o.uAl)({selector:"expression-editor",zone:"manual",template:'\n\t\t<div class="content w-100 h-100">\n\t\t\t<div class="box">\n\t\t\t\t<div class="column column1">\n\t\t\t\t\t<div class="h-25 d-flex flex-column d-flex justify-content-start gap-1">\n\t\t\t\t\t\t<button class="btn"\n\t\t\t\t\t\t\t*for="let name of examples"\n\t\t\t\t\t\t\t@click="loadExample(name)"\n\t\t\t\t\t\t\t[class]="{\'btn-outline-primary\': example == name, \'btn-link\': example != name}"\n\t\t\t\t\t\t\t>{{name |> replaceUnderscore |> titlecase}}</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<div class="column">\n\t\t\t\t\t\t<h5>/moduleB</h5>\n\t\t\t\t\t\t<textarea #moduleB cols="40" rows="500">...</textarea>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="column">\n\t\t\t\t\t\t<h5>/moduleA</h5>\n\t\t\t\t\t\t<textarea #moduleA cols="40" rows="200">...</textarea>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="column"><pre>{{ast}}</pre></div>\n\t\t\t\t<div class="column">\n\t\t\t\t\t<div class="d-flex flex-column">\n\t\t\t\t\t\t<pre class="text-success">{{str}}</pre>\n\t\t\t\t\t\t<button class="btn btn-outline-primary" (click)="executeCode()">Run</button>\n\t\t\t\t\t\t<pre class="text-secondary" #logs></pre>\n\t\t\t\t\t\t<pre class="text-danger" #error></pre>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t',styles:"\n\t.content {\n\t\tflex: 1;\n\t\tdisplay: flex;\n\t}\n\n\t.box {\n\t\tdisplay: flex;\n\t\tmin-height: min-content;\n\t}\n\n\t.column {\n\t\tpadding: 20px;\n\t\tborder-right: 1px solid #999;\n\t\toverflow-y: auto;\n\t\tmax-width: 700px;\n\t}\n\n\t.column1 {\n\t\twidth: 200px;\n\t}\n\n\ttextarea {\n\t\theight: 750px;\n\t\toverflow: unset !important;\n\t}\n"})],a=[],d=[],f=[],p=[],b=[],y=[],x=[],g=[],T=[];return class{static{e=this}static{const n="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;i=[(0,o.Uct)("moduleA")],u=[(0,o.Uct)("moduleB")],s=[(0,o.Uct)("logs")],c=[(0,o.Uct)("error")],(0,r.G4)(null,null,i,{kind:"field",name:"moduleA",static:!1,private:!1,access:{has:t=>"moduleA"in t,get:t=>t.moduleA,set:(t,e)=>{t.moduleA=e}},metadata:n},d,f),(0,r.G4)(null,null,u,{kind:"field",name:"moduleB",static:!1,private:!1,access:{has:t=>"moduleB"in t,get:t=>t.moduleB,set:(t,e)=>{t.moduleB=e}},metadata:n},p,b),(0,r.G4)(null,null,s,{kind:"field",name:"logs",static:!1,private:!1,access:{has:t=>"logs"in t,get:t=>t.logs,set:(t,e)=>{t.logs=e}},metadata:n},y,x),(0,r.G4)(null,null,c,{kind:"field",name:"error",static:!1,private:!1,access:{has:t=>"error"in t,get:t=>t.error,set:(t,e)=>{t.error=e}},metadata:n},g,T),(0,r.G4)(null,t={value:e},l,{kind:"class",name:e.name,metadata:n},null,a),e=t.value,n&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:n}),(0,r.zF)(e,a)}_cd;ast="";str="";node;moduleA=(0,r.zF)(this,d,void 0);moduleB=((0,r.zF)(this,f),(0,r.zF)(this,p,void 0));logs=((0,r.zF)(this,b),(0,r.zF)(this,y,void 0));error=((0,r.zF)(this,x),(0,r.zF)(this,g,void 0));examples=((0,r.zF)(this,T),["FUNCTION_SCOPES","IMPORT_ALL","IMPORT_DEFAULT","IMPORT_NAMED","IMPORT_NAMED_ALIAS","PLAY","CLASS_EXAMPLE","CLASS_SUPER_EXAMPLE"]);example;constructor(t){this._cd=t}onInit(){this.loadExample("FUNCTION_SCOPES")}loadExample(t){this.example=t,n.e(535).then(n.bind(n,535)).then((t=>(this.error.innerText="",t))).then((e=>this.loadCode(e[t]))).then((t=>this.moduleB.value=t)).then((()=>this._cd.detectChanges()))}afterViewInit(){var t,e,r;w(this.moduleB,"change").pipe((0,h.T)((()=>this.moduleB.value)),(void 0===r&&(r=A.E),(0,v.N)((function(t,e){var n=null,o=null,i=null,u=function(){if(n){n.unsubscribe(),n=null;var t=o;o=null,e.next(t)}};function s(){var t=i+400,o=r.now();if(o<t)return n=this.schedule(void 0,t-o),void e.add(n);u()}t.subscribe((0,m._)(e,(function(t){o=t,i=r.now(),n||(n=r.schedule(s,400),e.add(n))}),(function(){u(),e.complete()}),void 0,(function(){o=n=null})))}))),(void 0===e&&(e=_.D),t=null!=t?t:E,(0,v.N)((function(n,r){var o,i=!0;n.subscribe((0,m._)(r,(function(n){var u=e(n);!i&&t(o,u)||(i=!1,o=u,r.next(n))})))})))).subscribe((t=>this.loadCode(t))),n.e(535).then(n.bind(n,535)).then((t=>this.moduleA.value=t.MODULE_A))}loadCode(t){if(!t)return this.ast="",void(this.str="");try{const e=o.pmW.parse(t,{mode:o.Adm.Strict});this.ast=JSON.stringify(e.toJSON(),void 0,2),this.str=e.toString(),this.node=e}catch(t){this.error.innerText=t.stack??t??"exception",console.error(t)}finally{this._cd.detectChanges()}return t}stringify(t){return"object"!=typeof t?t:JSON.stringify(t,void 0,1)}executeCode(){this.logs.innerText="",this.error.innerText="";try{const t={log:(...t)=>{this.logs.innerText+=t.map((t=>this.stringify(t))).join(" ").concat("\n"),console.log(...t)}};t.log("run code...");const e={Object,console:t},n=new o.BJc(o.HGh.for(e)),r={"/moduleA":this.moduleA.value,"/moduleB":this.moduleB.value};new o.x4m(n,r,{allowImportExternal:!1}).resolve("/moduleB")}catch(t){this.error.innerText=t.stack??t??"exception",console.error(t)}finally{this._cd.detectChanges()}}replaceUnderscore(t){return t.replace(/_/g," ")}},e})()}}]);