"use strict";(self.webpackChunk_ibyar_webpack=self.webpackChunk_ibyar_webpack||[]).push([[934],{7934:(e,a,t)=>{t.r(a),t.d(a,{VideoPlayList:()=>n,VideoPlayer:()=>i});var l=t(2970),o=t(8558);let i=(()=>{let e,a,t,i=[(0,o.wA2)({selector:"video-player",extend:"video",encapsulation:"shadow-dom",shadowRootInit:{mode:"open",delegatesFocus:!0}})],n=[],s=[],c=[];return class{static{a=this}static{const d="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;t=[(0,o.G7x)()],(0,l.xE)(null,null,t,{kind:"field",name:"player",static:!1,private:!1,access:{has:e=>"player"in e,get:e=>e.player,set:(e,a)=>{e.player=a}},metadata:d},c,s),(0,l.xE)(null,e={value:a},i,{kind:"class",name:a.name,metadata:d},null,n),a=e.value,d&&Object.defineProperty(a,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:d}),(0,l.Co)(a,n)}player=((0,l.Co)(this,s),(0,l.Co)(this,c,void 0));onInit(){console.log("src",this.player.src)}},a})(),n=(()=>{let e,a,t=[(0,o.wA2)({selector:"video-play-list",template:'\n\t<div class="row">\n\t\t<div class="col-12" *forOf="let fileName of names">\n\t\t\t<a href="javascript:void(0);" (click)="allowLoad && playVideo(fileName)">{{fileName}}</a>\n\t\t</div>\n\t</div>\n\t<video-player *if="file; else noMedia" controls autoplay name="media">\n\t\t<source [src]="file" type="video/mp4" />\n\t</video-player>\n\t<template #noMedia>No Video Source Found</template>\n\t',imports:[i]})],n=[];return class{static{a=this}static{const o="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,l.xE)(null,e={value:a},t,{kind:"class",name:a.name,metadata:o},null,n),a=e.value,o&&Object.defineProperty(a,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o}),(0,l.Co)(a,n)}allowLoad=!0;names=["http://github.com/mediaelement/mediaelement-files/blob/master/big_buck_bunny.mp4?raw=true"];file=void 0;playVideo(e){this.file=e,console.log(e)}},a})()}}]);