"use strict";(self.webpackChunk_ibyar_webpack=self.webpackChunk_ibyar_webpack||[]).push([[624],{624:(t,e,o)=>{o.r(e),o.d(e,{Editor:()=>d,EditorApp:()=>s});var i=o(163),r=o(809);let d=class{constructor(){this.text=""}};(0,i.gn)([(0,r.IIB)(),(0,i.w6)("design:type",Object)],d.prototype,"text",void 0),d=(0,i.gn)([(0,r.wA2)({selector:"text-editor",template:'<input type="number" [(value)]="text" />'})],d);let s=class{constructor(){this.model={text:"25"}}};s=(0,i.gn)([(0,r.wA2)({selector:"app-edit",template:'\n\t<div>{{ model |> json }}</div>\n\t<text-editor id="editor_0" [(text)]="model.text" ></text-editor>\n\t<text-editor id="editor_1" [(text)]="model.text" *if="+model.text > 30"></text-editor>\n\t',imports:[d]})],s)}}]);