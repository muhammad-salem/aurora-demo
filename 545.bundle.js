"use strict";(self.webpackChunk_ibyar_webpack=self.webpackChunk_ibyar_webpack||[]).push([[545],{121:(e,t,a)=>{a.d(t,{F:()=>o});var n=a(508),s=a(948);function o(e,t){return void 0===e&&(e=0),void 0===t&&(t=n.z),e<0&&(e=0),(0,s.H)(e,e,t)}},948:(e,t,a)=>{a.d(t,{H:()=>i});var n=a(919),s=a(508),o=a(126);function i(e,t,a){void 0===e&&(e=0),void 0===a&&(a=s.P);var i,r=-1;return null!=t&&((i=t)&&(0,o.m)(i.schedule)?a=t:r=t),new n.y((function(t){var n=function(e){return e instanceof Date&&!isNaN(e)}(e)?+e-a.now():e;n<0&&(n=0);var s=0;return a.schedule((function(){t.closed||(t.next(s++),0<=r?this.schedule(void 0,r):t.complete())}),n)}))}},545:(e,t,a)=>{a.r(t),a.d(t,{Binding2Way:()=>i});var n=a(163),s=a(809),o=a(121);let i=class{constructor(){this.data1="two way data binding",this.data2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet",this.timer=(0,o.F)(1e3)}onDataOneChange(){console.log(`onDataOneChange ==> ${this.data1}`)}onDataTwoChange(){console.log(`onDataTwoChange  ==> ${this.data2}`)}};(0,n.gn)([(0,s.L6J)("data1"),(0,n.w6)("design:type",Function),(0,n.w6)("design:paramtypes",[]),(0,n.w6)("design:returntype",void 0)],i.prototype,"onDataOneChange",null),(0,n.gn)([(0,s.L6J)("data2"),(0,n.w6)("design:type",Function),(0,n.w6)("design:paramtypes",[]),(0,n.w6)("design:returntype",void 0)],i.prototype,"onDataTwoChange",null),i=(0,n.gn)([(0,s.wA2)({selector:"bind-2way",extend:"div",template:'\n    <div class="row">\n        <input class="col-sm-12" type="text" [(value)]="data1" />\n        <pre class="col-sm-12">{{data1}} {{timer |> async}}</pre>\n\t\t<input class="col-sm-12" type="text" [(value)]="data1" />\n    </div>\n    <div class="row">\n        <input class="col-sm-12" type="text" [(value)]="data2" />\n        <pre class="col-sm-12">{{data2 |> lowercase}} {{timer |> async}}</pre>\n    </div>\n    <hr />\n    '})],i)}}]);