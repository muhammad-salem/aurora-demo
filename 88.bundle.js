"use strict";(self.webpackChunk_ibyar_webpack=self.webpackChunk_ibyar_webpack||[]).push([[88],{88:(o,e,t)=>{t.r(e),t.d(e,{HostColorPickerComponent:()=>c});var l=t(163),r=t(809);let c=class{constructor(){this.colors=["red","blue","green","yellow","purple","fuchsia","lime","teal","aqua","gray","silver","black","white"],this.selectedColor=""}onHostClick(o){const e=o.target;this.selectedColor=e.dataset.color||""}};(0,l.gn)([(0,r.pfw)("style.backgroundColor"),(0,l.w6)("design:type",Object)],c.prototype,"selectedColor",void 0),(0,l.gn)([(0,r.L6J)("click","$event"),(0,l.w6)("design:type",Function),(0,l.w6)("design:paramtypes",[Event]),(0,l.w6)("design:returntype",void 0)],c.prototype,"onHostClick",null),c=(0,l.gn)([(0,r.wA2)({selector:"host-color",extend:"div",template:'\n\t<div>Click on color name, to change host: background color</div>\n\t<div *for="let color of colors" data-color="{{color}}">\n\t\t{{color}}\n\t</div>\n\t<div>Current Color: {{ selectedColor || \'nothing\'}}.</div>'})],c)}}]);