"use strict";(self.webpackChunk_ibyar_webpack=self.webpackChunk_ibyar_webpack||[]).push([[946],{946:(e,t,l)=>{l.r(t),l.d(t,{HostColorPickerComponent:()=>c});var o=l(608),a=l(619);let c=(()=>{let e,t,l,c,r=[(0,a.uAl)({selector:"host-color",extend:"div",template:'\n\t<div>Click on color name, to change host: background color</div>\n\t<div *for="let color of colors" data-color="{{color}}">\n\t\t{{color}}\n\t</div>\n\t<div>Current Color: {{ selectedColor || \'nothing\'}}.</div>'})],s=[],n=[],i=[],d=[];return class{static{t=this}static{const u="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;l=[(0,a.g$6)("style.backgroundColor")],c=[(0,a.Z$l)("click","$event")],(0,o.G4)(this,null,c,{kind:"method",name:"onHostClick",static:!1,private:!1,access:{has:e=>"onHostClick"in e,get:e=>e.onHostClick},metadata:u},null,n),(0,o.G4)(null,null,l,{kind:"field",name:"selectedColor",static:!1,private:!1,access:{has:e=>"selectedColor"in e,get:e=>e.selectedColor,set:(e,t)=>{e.selectedColor=t}},metadata:u},i,d),(0,o.G4)(null,e={value:t},r,{kind:"class",name:t.name,metadata:u},null,s),t=e.value,u&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:u}),(0,o.zF)(t,s)}colors=((0,o.zF)(this,n),["red","blue","green","yellow","purple","fuchsia","lime","teal","aqua","gray","silver","black","white"]);selectedColor=(0,o.zF)(this,i,"");onHostClick(e){const t=e.target;this.selectedColor=t.dataset.color||""}constructor(){(0,o.zF)(this,d)}},t})()}}]);