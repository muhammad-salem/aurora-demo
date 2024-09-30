"use strict";(self.webpackChunkwebpack=self.webpackChunkwebpack||[]).push([[749],{618:(t,e,n)=>{n.d(e,{O:()=>l});var a=n(509),s=n(712),i=n(460);function l(t,e,n){void 0===t&&(t=0),void 0===n&&(n=s.b);var l,o=-1;return null!=e&&((l=e)&&(0,i.T)(l.schedule)?n=e:o=e),new a.c((function(e){var a=function(t){return t instanceof Date&&!isNaN(t)}(t)?+t-n.now():t;a<0&&(a=0);var s=0;return n.schedule((function(){e.closed||(e.next(s++),0<=o?this.schedule(void 0,o):e.complete())}),a)}))}},869:(t,e,n)=>{n.d(e,{_:()=>s});var a=n(608);function s(t,e,n,a,s){return new i(t,e,n,a,s)}var i=function(t){function e(e,n,a,s,i,l){var o=t.call(this,e)||this;return o.onFinalize=i,o.shouldUnsubscribe=l,o._next=n?function(t){try{n(t)}catch(t){e.error(t)}}:t.prototype._next,o._error=s?function(t){try{s(t)}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._error,o._complete=a?function(){try{a()}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,o}return(0,a.C6)(e,t),e.prototype.unsubscribe=function(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;t.prototype.unsubscribe.call(this),!n&&(null===(e=this.onFinalize)||void 0===e||e.call(this))}},e}(n(852).vU)},45:(t,e,n)=>{n.d(e,{T:()=>i});var a=n(185),s=n(869);function i(t,e){return(0,a.N)((function(n,a){var i=0;n.subscribe((0,s._)(a,(function(n){a.next(t.call(e,n,i++))})))}))}},185:(t,e,n)=>{n.d(e,{N:()=>s});var a=n(460);function s(t){return function(e){if(function(t){return(0,a.T)(null==t?void 0:t.lift)}(e))return e.lift((function(e){try{return t(e,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}},749:(t,e,n)=>{n.r(e),n.d(e,{PersonApp:()=>b});var a=n(608),s=n(684);let i=(()=>{let t,e,n,i=[(0,s.uAl)({selector:"note-component",template:'<div class="alert alert-success" role="alert">structural directive name: \'{{directiveName}}\'</div>'})],l=[],o=[],r=[];return class{static{e=this}static{const c="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,s.pde)()],(0,a.G4)(null,null,n,{kind:"field",name:"directiveName",static:!1,private:!1,access:{has:t=>"directiveName"in t,get:t=>t.directiveName,set:(t,e)=>{t.directiveName=e}},metadata:c},o,r),(0,a.G4)(null,t={value:e},i,{kind:"class",name:e.name,metadata:c},null,l),e=t.value,c&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:c}),(0,a.zF)(e,l)}directiveName=(0,a.zF)(this,o,void 0);constructor(){(0,a.zF)(this,r)}},e})(),l=(()=>{let t,e,n=[(0,s.WLR)({selector:"*add-note"})],l=[],o=s.rk$;return class extends o{static{e=this}static{const s="function"==typeof Symbol&&Symbol.metadata?Object.create(o[Symbol.metadata]??null):void 0;(0,a.G4)(null,t={value:e},n,{kind:"class",name:e.name,metadata:s},null,l),e=t.value,s&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:s}),(0,a.zF)(e,l)}onInit(){this.viewContainerRef.createEmbeddedView(this.templateRef),this.viewContainerRef.createComponent(i).directiveName="*add-note"}onDestroy(){this.viewContainerRef.clear()}},e})(),o=(()=>{let t,e,n,i,l=[(0,s.uAl)({selector:"notify-component",template:'<div class="alert alert-{{notifyType}}" role="alert">{{notifyMessage}}</div>'})],o=[],r=[],c=[],d=[],p=[];return class{static{e=this}static{const u="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,s.pde)()],i=[(0,s.pde)()],(0,a.G4)(null,null,n,{kind:"field",name:"notifyMessage",static:!1,private:!1,access:{has:t=>"notifyMessage"in t,get:t=>t.notifyMessage,set:(t,e)=>{t.notifyMessage=e}},metadata:u},r,c),(0,a.G4)(null,null,i,{kind:"field",name:"notifyType",static:!1,private:!1,access:{has:t=>"notifyType"in t,get:t=>t.notifyType,set:(t,e)=>{t.notifyType=e}},metadata:u},d,p),(0,a.G4)(null,t={value:e},l,{kind:"class",name:e.name,metadata:u},null,o),e=t.value,u&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:u}),(0,a.zF)(e,o)}notifyMessage=(0,a.zF)(this,r,void 0);notifyType=((0,a.zF)(this,c),(0,a.zF)(this,d,void 0));constructor(){(0,a.zF)(this,p)}},e})(),r=(()=>{let t,e,n,i,l=[(0,s.WLR)({selector:"*notify-user"})],r=[],c=s.rk$,d=[];return class extends c{static{e=this}static{const o="function"==typeof Symbol&&Symbol.metadata?Object.create(c[Symbol.metadata]??null):void 0;n=[(0,s.pde)("message")],i=[(0,s.pde)("type")],(0,a.G4)(this,null,n,{kind:"setter",name:"notifyMessage",static:!1,private:!1,access:{has:t=>"notifyMessage"in t,set:(t,e)=>{t.notifyMessage=e}},metadata:o},null,d),(0,a.G4)(this,null,i,{kind:"setter",name:"notifyType",static:!1,private:!1,access:{has:t=>"notifyType"in t,set:(t,e)=>{t.notifyType=e}},metadata:o},null,d),(0,a.G4)(null,t={value:e},l,{kind:"class",name:e.name,metadata:o},null,r),e=t.value,o&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o}),(0,a.zF)(e,r)}context=((0,a.zF)(this,d),{notifyMessage:"no message",notifyType:"primary"});scopeSubscription;set notifyMessage(t){this.context.notifyMessage=t}set notifyType(t){this.context.notifyType=t}elements=[];fragment;onInit(){const t=this.viewContainerRef.createComponent(o);t.notifyMessage=this.context.notifyMessage,t.notifyType=this.context.notifyType,this.context=t}onDestroy(){this.viewContainerRef.clear()}},e})();var c=n(618),d=n(154),p=n(45);(()=>{let t,e,n=[(0,s.nT_)({name:"toDate"})],i=[];(class{static{e=this}static{const s="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,a.G4)(null,t={value:e},n,{kind:"class",name:e.name,metadata:s},null,i),e=t.value,s&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:s}),(0,a.zF)(e,i)}transform(t){return new Date(t)}})})();let u=(()=>{let t,e,n,i,l,o,r,c=[(0,s.uAl)({selector:"show-time",template:'<div class="alert alert-success" role="alert">\n\t\t\t<ul>\n\t\t\t\t<li>HH:MM:SS {{hh}}:{{mm}}:{{ss}}</li>\n\t\t\t\t<li>hh:mm:ss {{`${hh}:${mm}:${ss}`}} format using string literal ==> `${hh}:${mm}:${ss}`</li>\n\t\t\t\t<li>Time: {{time |> toDate}}</li>\n\t\t\t\t<li>Data: {{date}}</li>\n\t\t\t</ul>\n\t\t</div>'})],d=[],p=[],u=[],m=[],h=[],v=[],f=[],g=[],b=[],y=[],w=[];return class{static{e=this}static{const k="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,s.pde)()],i=[(0,s.pde)()],l=[(0,s.pde)()],o=[(0,s.pde)()],r=[(0,s.pde)()],(0,a.G4)(null,null,n,{kind:"field",name:"time",static:!1,private:!1,access:{has:t=>"time"in t,get:t=>t.time,set:(t,e)=>{t.time=e}},metadata:k},p,u),(0,a.G4)(null,null,i,{kind:"field",name:"date",static:!1,private:!1,access:{has:t=>"date"in t,get:t=>t.date,set:(t,e)=>{t.date=e}},metadata:k},m,h),(0,a.G4)(null,null,l,{kind:"field",name:"hh",static:!1,private:!1,access:{has:t=>"hh"in t,get:t=>t.hh,set:(t,e)=>{t.hh=e}},metadata:k},v,f),(0,a.G4)(null,null,o,{kind:"field",name:"mm",static:!1,private:!1,access:{has:t=>"mm"in t,get:t=>t.mm,set:(t,e)=>{t.mm=e}},metadata:k},g,b),(0,a.G4)(null,null,r,{kind:"field",name:"ss",static:!1,private:!1,access:{has:t=>"ss"in t,get:t=>t.ss,set:(t,e)=>{t.ss=e}},metadata:k},y,w),(0,a.G4)(null,t={value:e},c,{kind:"class",name:e.name,metadata:k},null,d),e=t.value,k&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:k}),(0,a.zF)(e,d)}time=(0,a.zF)(this,p,0);date=((0,a.zF)(this,u),(0,a.zF)(this,m,0));hh=((0,a.zF)(this,h),(0,a.zF)(this,v,0));mm=((0,a.zF)(this,f),(0,a.zF)(this,g,0));ss=((0,a.zF)(this,b),(0,a.zF)(this,y,0));constructor(){(0,a.zF)(this,w)}},e})(),m=(()=>{let t,e,n=[(0,s.WLR)({selector:"*time"})],i=[],l=s.rk$;return class extends l{static{e=this}static{const s="function"==typeof Symbol&&Symbol.metadata?Object.create(l[Symbol.metadata]??null):void 0;(0,a.G4)(null,t={value:e},n,{kind:"class",name:e.name,metadata:s},null,i),e=t.value,s&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:s}),(0,a.zF)(e,i)}dateSubscription;context;onInit(){this.templateRef.astNode?.children?.length?this.initUserView():this.initDefaultView(),this.startTimer()}initUserView(){const t=this.viewContainerRef.createEmbeddedView(this.templateRef,{context:{time:0,date:0,hh:0,mm:0,ss:0}});this.context=t.context}initDefaultView(){this.context=this.viewContainerRef.createComponent(u)}startTimer(){var t;this.dateSubscription=(0,c.O)(1e3,1e3).pipe((void 0===t&&(t=d.U),(0,p.T)((function(e){return{value:e,timestamp:t.now()}}))),(0,p.T)((t=>t.timestamp)),(0,p.T)((t=>new Date(t))),(0,p.T)((t=>({time:t.getTime(),date:t.getDate(),hh:t.getHours(),mm:t.getMinutes(),ss:t.getSeconds()})))).subscribe((t=>Object.assign(this.context,t)))}onDestroy(){this.dateSubscription.unsubscribe(),this.viewContainerRef.clear()}},e})(),h=(()=>{let t,e,n=[(0,s._qm)({})],i=[];return class{static{e=this}static{const s="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,a.G4)(null,t={value:e},n,{kind:"class",name:e.name,metadata:s},null,i),e=t.value,s&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:s}),(0,a.zF)(e,i)}info(t){let e=new Date;console.log(`${e.getHours()}:${e.getMinutes()}:${e.getSeconds()} -- ${t}`)}log(...t){let e=new Date;console.log(`${e.getHours()}:${e.getMinutes()}:${e.getSeconds()} -- `,...t)}},e})(),v=(()=>{let t,e,n,i,l,o,r,c,d,p,u,m,v,f,g,b,y,w=[(0,s.uAl)({selector:"person-view",template:'\n\t\t\t<p id="p-name" #nameArea class="{{className}}" onclick="onResize()">\n\t\t\t\tPerson name is {{person.name}}\n\t\t\t</p>\n\t\t\t<p id="p-age" #ageArea>your age is: {{person.age}}, born in Year of {{yearOfBirth}}</p>\n\t\t\t<button class="btn btn-outline-primary" (click)="addOneYear()">+1</button>\n\t\t\t<button class="btn btn-outline-secondary" (click)="person.age--">-1</button>\n\t\t\t<div *if="person.age >= 18">\n\t\t\t\tCan have license\n\t\t\t\t<p>Data</p>\n\t\t\t</div>',styles:"\n\n.valid {\n\tdisplay: inline-block;\n    width: 5rem;\n    height: 5rem;\n    margin: 0.25rem;\n    background-color: #f5f5f5;\n\tborder-color: #198754\n}\n\n.invalid {\n\tdisplay: inline-block;\n    width: 5rem;\n    height: 5rem;\n    margin: 0.25rem;\n    background-color: #f5f5f5;\n\tborder-color: #dc3545\n}\n"})],k=[],F=[],z=[],S=[],O=[],G=[],x=[],C=[],T=[],P=[],$=[],M=[],A=[],N=[],j=[],_=[],D=[],R=[],I=[],V=[];return class{static{e=this}static{const h="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,s.pde)()],i=[(0,s.k7i)()],l=[(0,s.k7i)("select",{bubbles:!0})],o=[(0,s.Ss2)()],r=[(0,s.Uct)(HTMLParagraphElement,{id:"p-name"})],c=[(0,s.Uct)(HTMLParagraphElement,{id:"p-age"})],d=[(0,s.b2L)(HTMLParagraphElement)],p=[(0,s.g$6)("class.on")],u=[(0,s.g$6)("class.off")],m=[(0,s.Z$l)("window:load",["$event"])],v=[(0,s.Z$l)("window:resize",["$event"])],f=[(0,s.Z$l)("click",["$event.target"])],g=[(0,s.Z$l)("select","$event.detail")],b=[(0,s.Z$l)("person.age")],y=[(0,s.pde)()],(0,a.G4)(this,null,m,{kind:"method",name:"onLoad",static:!1,private:!1,access:{has:t=>"onLoad"in t,get:t=>t.onLoad},metadata:h},null,F),(0,a.G4)(this,null,v,{kind:"method",name:"onResize",static:!1,private:!1,access:{has:t=>"onResize"in t,get:t=>t.onResize},metadata:h},null,F),(0,a.G4)(this,null,f,{kind:"method",name:"onClick",static:!1,private:!1,access:{has:t=>"onClick"in t,get:t=>t.onClick},metadata:h},null,F),(0,a.G4)(this,null,g,{kind:"method",name:"onClose",static:!1,private:!1,access:{has:t=>"onClose"in t,get:t=>t.onClose},metadata:h},null,F),(0,a.G4)(this,null,b,{kind:"method",name:"personChange",static:!1,private:!1,access:{has:t=>"personChange"in t,get:t=>t.personChange},metadata:h},null,F),(0,a.G4)(this,null,y,{kind:"setter",name:"resize",static:!1,private:!1,access:{has:t=>"resize"in t,set:(t,e)=>{t.resize=e}},metadata:h},null,F),(0,a.G4)(null,null,n,{kind:"field",name:"person",static:!1,private:!1,access:{has:t=>"person"in t,get:t=>t.person,set:(t,e)=>{t.person=e}},metadata:h},z,S),(0,a.G4)(null,null,i,{kind:"field",name:"open",static:!1,private:!1,access:{has:t=>"open"in t,get:t=>t.open,set:(t,e)=>{t.open=e}},metadata:h},O,G),(0,a.G4)(null,null,l,{kind:"field",name:"_select",static:!1,private:!1,access:{has:t=>"_select"in t,get:t=>t._select,set:(t,e)=>{t._select=e}},metadata:h},x,C),(0,a.G4)(null,null,o,{kind:"field",name:"view",static:!1,private:!1,access:{has:t=>"view"in t,get:t=>t.view,set:(t,e)=>{t.view=e}},metadata:h},T,P),(0,a.G4)(null,null,r,{kind:"field",name:"childName",static:!1,private:!1,access:{has:t=>"childName"in t,get:t=>t.childName,set:(t,e)=>{t.childName=e}},metadata:h},$,M),(0,a.G4)(null,null,c,{kind:"field",name:"childAge",static:!1,private:!1,access:{has:t=>"childAge"in t,get:t=>t.childAge,set:(t,e)=>{t.childAge=e}},metadata:h},A,N),(0,a.G4)(null,null,d,{kind:"field",name:"children",static:!1,private:!1,access:{has:t=>"children"in t,get:t=>t.children,set:(t,e)=>{t.children=e}},metadata:h},j,_),(0,a.G4)(null,null,p,{kind:"field",name:"on",static:!1,private:!1,access:{has:t=>"on"in t,get:t=>t.on,set:(t,e)=>{t.on=e}},metadata:h},D,R),(0,a.G4)(null,null,u,{kind:"field",name:"off",static:!1,private:!1,access:{has:t=>"off"in t,get:t=>t.off,set:(t,e)=>{t.off=e}},metadata:h},I,V),(0,a.G4)(null,t={value:e},w,{kind:"class",name:e.name,metadata:h},null,k),e=t.value,h&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h}),(0,a.zF)(e,k)}person=((0,a.zF)(this,F),(0,a.zF)(this,z,{name:"Delilah",age:24}));open=((0,a.zF)(this,S),(0,a.zF)(this,O,new s.bkB));_select=((0,a.zF)(this,G),(0,a.zF)(this,x,new s.bkB));className=((0,a.zF)(this,C),"p1 m1");view=(0,a.zF)(this,T,void 0);childName=((0,a.zF)(this,P),(0,a.zF)(this,$,void 0));childAge=((0,a.zF)(this,M),(0,a.zF)(this,A,void 0));children=((0,a.zF)(this,N),(0,a.zF)(this,j,void 0));on=((0,a.zF)(this,_),(0,a.zF)(this,D,void 0));off=((0,a.zF)(this,R),(0,a.zF)(this,I,void 0));logger=((0,a.zF)(this,V),(0,s.WQX)(h));onInit(){this.on=!0,this.off=!this.on,this.logger.log("onInit",this),this.open.emit("init data")}get yearOfBirth(){return 2021-this.person.age}onLoad(t){this.logger.log(this,t)}onResize(t){this.logger.log(this,t)}onClick(t){this.logger.log("target",t),this._select.emit(this.person),this.off=this.on,this.on=!this.on}onClose(t){this.logger.log("select person",t)}personChange(){this.logger.log("age change",this.person.age)}set resize(t){this.logger.log(this,t)}collectData(t,e,n){return[]}addOneYear(){this.person.age++}},e})(),f=(()=>{let t,e,n,i,l,o=[(0,s.uAl)({selector:"person-edit",template:'<form #form>\n\t\t\t\t\t<input if="show" type="text" [(value)]="person.name" />\n\t\t\t\t\t<input type="number" [(value)]="person.age" />\n\t\t\t\t\t<input type="button" (click)="printPerson()" value="Save" />\n\t\t\t\t</form>'})],r=[],c=[],d=[],p=[],u=[],m=[],v=[];return class{static{e=this}static{const h="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,s.pde)()],i=[(0,s.pde)()],l=[(0,s.k7i)()],(0,a.G4)(null,null,n,{kind:"field",name:"person",static:!1,private:!1,access:{has:t=>"person"in t,get:t=>t.person,set:(t,e)=>{t.person=e}},metadata:h},c,d),(0,a.G4)(null,null,i,{kind:"field",name:"show",static:!1,private:!1,access:{has:t=>"show"in t,get:t=>t.show,set:(t,e)=>{t.show=e}},metadata:h},p,u),(0,a.G4)(null,null,l,{kind:"field",name:"save",static:!1,private:!1,access:{has:t=>"save"in t,get:t=>t.save,set:(t,e)=>{t.save=e}},metadata:h},m,v),(0,a.G4)(null,t={value:e},o,{kind:"class",name:e.name,metadata:h},null,r),e=t.value,h&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h}),(0,a.zF)(e,r)}person=(0,a.zF)(this,c,void 0);show=((0,a.zF)(this,d),(0,a.zF)(this,p,!0));save=((0,a.zF)(this,u),(0,a.zF)(this,m,new s.bkB));logger=((0,a.zF)(this,v),(0,s.WQX)(h));printPerson(){this.logger.log(this.person),this.save.emit(this.person)}},e})(),g=((()=>{let t,e,n,i,l=[(0,s.uAl)({selector:"progress-bar",template:'<progress [max]="max" [value]="value"></progress>'})],o=[],r=[],c=[],d=[],p=[];(class{static{e=this}static{const u="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,s.pde)()],i=[(0,s.pde)()],(0,a.G4)(null,null,n,{kind:"field",name:"max",static:!1,private:!1,access:{has:t=>"max"in t,get:t=>t.max,set:(t,e)=>{t.max=e}},metadata:u},r,c),(0,a.G4)(null,null,i,{kind:"field",name:"value",static:!1,private:!1,access:{has:t=>"value"in t,get:t=>t.value,set:(t,e)=>{t.value=e}},metadata:u},d,p),(0,a.G4)(null,t={value:e},l,{kind:"class",name:e.name,metadata:u},null,o),e=t.value,u&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:u}),(0,a.zF)(e,o)}max=(0,a.zF)(this,r,void 0);value=((0,a.zF)(this,c),(0,a.zF)(this,d,void 0));constructor(){(0,a.zF)(this,p)}})})(),(()=>{let t,e,n,i,l=[(0,s.WLR)({selector:"color-toggle",exportAs:"colorToggle"})],o=[],r=s.OA0,c=[];return class extends r{static{e=this}static{const d="function"==typeof Symbol&&Symbol.metadata?Object.create(r[Symbol.metadata]??null):void 0;n=[(0,s.Z$l)("mouseover")],i=[(0,s.Z$l)("mouseleave")],(0,a.G4)(this,null,n,{kind:"method",name:"onMouseOver",static:!1,private:!1,access:{has:t=>"onMouseOver"in t,get:t=>t.onMouseOver},metadata:d},null,c),(0,a.G4)(this,null,i,{kind:"method",name:"onMouseLeave",static:!1,private:!1,access:{has:t=>"onMouseLeave"in t,get:t=>t.onMouseLeave},metadata:d},null,c),(0,a.G4)(null,t={value:e},l,{kind:"class",name:e.name,metadata:d},null,o),e=t.value,d&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:d}),(0,a.zF)(e,o)}onMouseOver(){this.toggleColor()}onMouseLeave(){this.toggleColor()}toggleColor(){let t="red"==this.el.style.color?"black":"red";this.el.style.color=t}constructor(){super(...arguments),(0,a.zF)(this,c)}},e})()),b=(()=>{let t,e,n,i,o,c,d,p,u=[(0,s.uAl)({selector:"person-app",imports:[l,r,m,g,v,f],template:'\n\t\t<div *time></div>\n\t\t<template *time let-HH="hh" let-MM="mm" let-SS="ss">{{HH}}:{{MM}}:{{SS}}</template>\n\t\t<div *add-note>\n\t\t\t{{appVersion}}\n\t\t\t{{appName}}\n\t\t</div>\n\t\t<notify-user type="primary" message="A simple primary alert—check it out!"></notify-user>\n\n\t\t<div [color-toggle]="" #colorToggle="colorToggle"> Welcome to you! </div>\n\t\t<button class="btn btn-outline-primary" (click)="colorToggle.toggleColor()">Toggle</button>\n\n\t\t<h1 [textContent]="title"></h1>\n\t\t\n\t\t<red-note>text child in directive</red-note>\n\n\t\t<div class="row">\n\t\t\t<div class="col-4">\n\t\t\t\t{{personUtils.getDetails(people[0])}}\n\t\t\t</div>\n\t\t\t<template *forOf="let {key, value} of people[0] |> keyvalue">\n\t\t\t\t<div class="col-4">{{key}}: {{value}}</div>\n\t\t\t</template>\n\t\t</div>\n\n\t\t<person-edit #personEdit [(person)]="people[0]" (save)="printPerson($event)"></person-edit>\n\n\t\t<progress-bar [value]="+people[0].age" max="100"></progress-bar>\n\n\t\t\n\t\t<h6>if(...){template ref #1} else {template ref #2} else if(....){template ref #3} else {template ref #4}</h6>\n\t\t<template\t\t\t\t\t*if="people[0].age < 20; else between_20_39"\t\t\t\t\t\t>age is less than 20</template>\n\t\t<template #between_20_39\t*if="people[0].age > 19 && people[0].age < 40; else between_40_79"\t>age is between 20 and 39</template>\n\t\t<template #between_40_79\t*if="people[0].age > 39 && people[0].age < 60; else between_80_100" >age is between 40 and 59</template>\n\t\t<template #between_80_100\t*if="people[0].age > 59 && people[0].age < 80; else showTest" \t\t>age is between 60 and 79</template>\n\t\t<template #showTest\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t>age is more than 80</template>\n\n\t\t<div class="row" (select)="selectPersonView($event)">\n\t\t\t<div class="col-3">\n\t\t\t\t<person-view #pm1 [(person)]="people[0]" name="dddddddd" age="34" allowed="true"\n\t\t\t\t\t@click="onPersonViewClick(\'person:clicked\', people[0])"></person-view>\n\t\t\t</div>\n\t\t\t<div class="col-3">\n\t\t\t\t<person-view #pm2 [(person)]="people[1]" name="alex2" age="19"></person-view>\n\t\t\t</div>\n\t\t\t<div class="col-3">\n\t\t\t\t<person-view #pm3 [(person)]="people[2]" name="jones" age="25"></person-view>\n\t\t\t</div>\n\t\t\t<div class="col-3">\n\t\t\t\t<person-view #pm4 person="{{people[3]}}" name="alex" age="29"></person-view>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<hr>\n\n\t\t<h1>*For Of Directive</h1>\n\t\t<h5>*forOf="let user of people"</h5>\n\t\t<div class="row">\n\t\t\t<div class="col-3" *forOf="let user of people">\n\t\t\t\t<p>Name: <span>{{user.name}}</span></p>\n\t\t\t\t<p>Age: <span>{{user.age}}</span></p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<h1>*For In Directive</h1>\n\t\t<h5>*forIn="let key in people[0]"</h5>\n\t\t<div class="row">\n\t\t\t<div class="col-3" *forIn="let key in people[0]">\n\t\t\t\t<p>Key: <span>{{key}}</span></p>\n\t\t\t\t<p>Value: <span>{{people[0][key]}}</span></p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<h1>*For Await OF Directive</h1>\n\t\t<h5>*forAwait="let num of asyncIterable"</h5>\n\t\t<div class="row">\n\t\t\t<div class="col-3" *forAwait="let num of asyncIterable">\n\t\t\t\t<p>num = <span>{{num}}</span></p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<hr>\n\n\t\t<h1>Switch Case Directive</h1>\n\t\t<h5>*switch="selectFruit"</h5>\n\t\t<ul class="list-group">\n\t\t\t<li class="list-group-item row">\n\t\t\t\t<div class="col-3" *switch="selectFruit">\n\t\t\t\t\t<div *case="\'oranges\'">Oranges</div>\n\t\t\t\t\t<div *case="\'apples\'">Apples</div>\n\t\t\t\t\t<div *case="\'bananas\'">Bananas</div>\n\t\t\t\t\t<div *default>Not Found</div>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class="list-group-item row">\n\t\t\t\t<select class="form-select col-3" (change)="selectFruit = this.value">\n\t\t\t\t\t<option *forOf="let fruit of fruits" [value]="fruit" [selected]="selectFruit === fruit">{{fruit |> titlecase}}</option>\n\t\t\t\t</select>\n\t\t\t</li>\n\t\t</ul>\n\t\t<hr>\n\n\t\t<h1>Control Flow</h1>\n\t\t<h2>*For Of Directive</h2>\n\t\t<h5>{{controlFlowSyntax[0]}}</h5>\n\t\t<h5>{{controlFlowSyntax[1]}}</h5>\n\t\t<div class="row">\n\t\t\t@forOf(let user of people){\n\t\t\t\t<div class="col-3">\n\t\t\t\t\t<p>Name: <span>{{user.name}}</span></p>\n\t\t\t\t\t<p>Age: <span>{{user.age}}</span></p>\n\t\t\t\t</div>\n\t\t\t}\n\t\t</div>\n\n\t\t<h2>*For In Directive</h2>\n\t\t<h5>{{controlFlowSyntax[2]}}</h5>\n\t\t<div class="row">\n\t\t\t@forIn(let key in people[0]){\n\t\t\t\t<div class="col-3">\n\t\t\t\t\t<p>Key: <span>{{key}}</span></p>\n\t\t\t\t\t<p>Value: <span>{{people[0][key]}}</span></p>\n\t\t\t\t</div>\n\t\t\t}\n\t\t</div>\n\n\t\t<h2>*For Await OF Directive</h2>\n\t\t<h5>{{controlFlowSyntax[3]}}</h5>\n\t\t<div class="row">\n\t\t\t@forAwait(let num of asyncIterable){\n\t\t\t\t<div class="col-3">\n\t\t\t\t\t<p>num = <span>{{num}}</span></p>\n\t\t\t\t</div>\n\t\t\t}\n\t\t</div>\n\n\t\t<hr>\n\n\t\t<h1>Switch Case Directive</h1>\n\t\t<h5><pre>{{controlFlowSyntax[4]}}</pre></h5>\n\t\t<ul class="list-group">\n\t\t\t<li class="list-group-item row">\n\t\t\t\t@switch(selectFruit){\n\t\t\t\t\t@case(\'oranges\'){<div>Oranges</div>}\n\t\t\t\t\t@case(\'apples\'){<div>Apples</div>}\n\t\t\t\t\t@case(\'bananas\'){<div>Bananas</div>}\n\t\t\t\t\t@default{<div>Not Found</div>}\n\t\t\t\t}\n\t\t\t</li>\n\t\t\t<li class="list-group-item row">\n\t\t\t\t<select class="form-select col-3" (change)="selectFruit = this.value">\n\t\t\t\t\t@for(let fruit of fruits){<option [value]="fruit" [selected]="selectFruit === fruit">{{fruit |> titlecase}}</option>}\n\t\t\t\t</select>\n\t\t\t</li>\n\t\t</ul>\n\t\t'})],h=[],b=[],y=[],w=[],k=[],F=[],z=[],S=[],O=[],G=[];return class{static{e=this}static{const l="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,s.pde)()],i=[(0,s.pde)()],o=[(0,s.pde)()],c=[(0,s.Ss2)()],d=[(0,s.Z$l)("personEdit:input",["$event"])],p=[(0,s.Z$l)("personEdit:save",["$event"])],(0,a.G4)(this,null,d,{kind:"method",name:"onPersonEdit",static:!1,private:!1,access:{has:t=>"onPersonEdit"in t,get:t=>t.onPersonEdit},metadata:l},null,b),(0,a.G4)(this,null,p,{kind:"method",name:"onPerson",static:!1,private:!1,access:{has:t=>"onPerson"in t,get:t=>t.onPerson},metadata:l},null,b),(0,a.G4)(null,null,n,{kind:"field",name:"appVersion",static:!1,private:!1,access:{has:t=>"appVersion"in t,get:t=>t.appVersion,set:(t,e)=>{t.appVersion=e}},metadata:l},y,w),(0,a.G4)(null,null,i,{kind:"field",name:"appName",static:!1,private:!1,access:{has:t=>"appName"in t,get:t=>t.appName,set:(t,e)=>{t.appName=e}},metadata:l},k,F),(0,a.G4)(null,null,o,{kind:"field",name:"name",static:!1,private:!1,access:{has:t=>"name"in t,get:t=>t.name,set:(t,e)=>{t.name=e}},metadata:l},z,S),(0,a.G4)(null,null,c,{kind:"field",name:"view",static:!1,private:!1,access:{has:t=>"view"in t,get:t=>t.view,set:(t,e)=>{t.view=e}},metadata:l},O,G),(0,a.G4)(null,t={value:e},u,{kind:"class",name:e.name,metadata:l},null,h),e=t.value,l&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l}),(0,a.zF)(e,h)}appVersion=((0,a.zF)(this,b),(0,a.zF)(this,y,"2022.08.05"));title=((0,a.zF)(this,w),"Testing Components");appName=(0,a.zF)(this,k,"Ibyar Aurora");name=((0,a.zF)(this,F),(0,a.zF)(this,z,"alice"));view=((0,a.zF)(this,S),(0,a.zF)(this,O,void 0));people=((0,a.zF)(this,G),[{name:"alice",age:39},{name:"alex",age:46},{name:"delilah",age:25},{name:"alice",age:14}]);i=0;fruits=["mangoes","oranges","apples","bananas","cherries"];selectFruit="bananas";asyncIterable={[Symbol.asyncIterator]:()=>({i:0,next(){return this.i<3?Promise.resolve({value:this.i++,done:!1}):Promise.resolve({done:!0})}})};personUtils={x:3,getDetails:t=>`${t.name} is ${t.age} years old.`};controlFlowSyntax=["@for(let user of people) {...}","@forOf(let user of people) {...}","@forIn(let key in people[0]) {...}","@forAwait(let num of asyncIterable) {...}","@switch(selectFruit){\n\t@case('oranges'){<div>Oranges</div>}\n\t@case('apples'){<div>Apples</div>}\n\t@case('bananas'){<div>Bananas</div>}\n\t@default{<div>Not Found</div>}\n}"];onPersonEdit(t){console.log("personEdit:input",t,this.view)}onPerson(t){console.log("personEdit:save",t.detail,this.view)}printPerson(t){console.log("printPerson",t)}onPersonViewClick(t,e){console.log(t,e)}selectPersonView(t){console.log("person age",t.detail.age)}},e})()}}]);