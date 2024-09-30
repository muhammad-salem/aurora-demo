"use strict";(self.webpackChunkwebpack=self.webpackChunkwebpack||[]).push([[361],{726:(t,e,n)=>{n.d(e,{Y:()=>o});var s=n(712),l=n(618);function o(t,e){return void 0===t&&(t=0),void 0===e&&(e=s.E),t<0&&(t=0),(0,l.O)(t,t,e)}},618:(t,e,n)=>{n.d(e,{O:()=>a});var s=n(509),l=n(712),o=n(460);function a(t,e,n){void 0===t&&(t=0),void 0===n&&(n=l.b);var a,r=-1;return null!=e&&((a=e)&&(0,o.T)(a.schedule)?n=e:r=e),new s.c((function(e){var s=function(t){return t instanceof Date&&!isNaN(t)}(t)?+t-n.now():t;s<0&&(s=0);var l=0;return n.schedule((function(){e.closed||(e.next(l++),0<=r?this.schedule(void 0,r):e.complete())}),s)}))}},361:(t,e,n)=>{n.r(e),n.d(e,{PipeAppComponent:()=>a});var s=n(608),l=n(684),o=n(726);let a=(()=>{let t,e,n=[(0,l.uAl)({selector:"pipe-app",template:'\n\t<style>.bs-color{color: var({{currentColor}});}</style>\n\t<div style="color: var({{currentColor}});"> set style color by style="color: var({{currentColor}});"</div>\n\t<div [style]="\'color: var(\' + currentColor + \');\'"> set style color by [style]="\'color: var(\' + currentColor + \');\'" </div>\n\t<div [style.color]="\'var(\' + currentColor + \')\'"> set style color by [style.color]="\'var(\' + currentColor + \')\'" </div>\n\t<div [style]="{color: \'var(\' + currentColor + \')\'}"> set style color by [style]="{color: \'var(\' + currentColor + \')\'}" </div>\n\t<div [class.bs-color]="currentColor === \'--bs-red\' "> set style color by [class.bs-color]="currentColor === \'--bs-red\' " </div>\n\t<div *for="var color of colors">\n\t\tcolor: {{color}} <span *if="color === currentColor" class="bs-color"> => Current Color =\'{{currentColor}}\'</span>\n\t</div>\n    <table class="table">\n        <thead>\n            <tr>\n                <th class="bs-color" scope="col">pipe</th>\n                <th class="bs-color" scope="col">expression</th>\n                <th class="bs-color" scope="col">view</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>async</td>\n                <td>observable |> async</td>\n                <td>{{observable |> async}}</td>\n            </tr>\n            <tr>\n                <td>*</td>\n                <td>text</td>\n                <td>{{text}}</td>\n            </tr>\n            <tr>\n                <td>lowercase</td>\n                <td>text |> lowercase</td>\n                <td>{{text |> lowercase}}</td>\n            </tr>\n            <tr>\n                <td>titlecase</td>\n                <td>text |> titlecase</td>\n                <td>{{text |> titlecase}}</td>\n            </tr>\n            <tr>\n                <td>uppercase</td>\n                <td>text |> uppercase</td>\n                <td>{{text |> uppercase}}</td>\n            </tr>\n            <tr>\n                <td>json</td>\n                <td>obj |> json</td>\n                <td>{{obj |> json}}</td>\n            </tr>\n            <tr>\n                <td>json <small>pre element</small></td>\n                <td>obj |> json:undefined:2</td>\n                <td>\n                    <pre>{{obj |> json:undefined:2}}</pre>\n                </td>\n            </tr>\n            <tr>\n                <td>keyvalue</td>\n                <td>keyValueObject |> keyvalue</td>\n                <td>{{keyValueObject |> keyvalue |> json}}</td>\n            </tr>\n            <tr>\n                <td>keyvalue</td>\n                <td>keyValueObject |> keyvalue</td>\n                <td>{{keyValueObject |> keyvalue |> json}}</td>\n            </tr>\n            <tr>\n                <td>keyvalue</td>\n                <td>keyValueMap |> keyvalue</td>\n                <td>{{keyValueMap |> keyvalue |> json}}</td>\n            </tr>\n            <tr>\n                <td>slice</td>\n                <td>array |> slice:1:3</td>\n                <td>{{array |> slice:1:3}}</td>\n            </tr>\n            <tr>\n                <td>slice</td>\n                <td>slice(array, 1, 3)</td>\n                <td>{{slice(array, 1, 3)}}</td>\n            </tr>\n            <tr>\n                <td>call windows method directly</td>\n                <td>3345.54645 |> Math.trunc</td>\n                <td>{{3345.54645 |> Math.trunc}}</td>\n            </tr>\n            <tr>\n                <td>Relative Time Format</td>\n                <td>date |> rtf:unit:lang:options</td>\n                <td>\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-2">\n\t\t\t\t\t\t\t{{date |> rtf:unit:lang:options}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-10">\n\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t<div class="col-2">\n\t\t\t\t\t\t\t\t\t<label>unit:</label>\n\t\t\t\t\t\t\t\t\t<select #selectUnit class="form-select col-3" (change)="unit = selectUnit.value">\n\t\t\t\t\t\t\t\t\t\t<option *forOf="let u of units" [value]="u" [selected]="unit === u">{{u}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="col-2">\n\t\t\t\t\t\t\t\t\t<label>lang:</label>\n\t\t\t\t\t\t\t\t\t<select #selectLang class="form-select col-3" (change)="lang = selectLang.value">\n\t\t\t\t\t\t\t\t\t\t<option *forOf="let l of langs" [value]="l" [selected]="lang === l">{{l}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="col-2">\n\t\t\t\t\t\t\t\t\t<label>numeric:</label>\n\t\t\t\t\t\t\t\t\t<select class="form-select col-3" (change)="updateOptions(\'numeric\', this.value)">\n\t\t\t\t\t\t\t\t\t\t<option *forOf="let n of numerics" [value]="n" [selected]="options.numeric === n">{{n}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="col-2">\n\t\t\t\t\t\t\t\t\t<label>style:</label>\n\t\t\t\t\t\t\t\t\t<select class="form-select col-3" (change)="updateOptions(\'style\', this.value)">\n\t\t\t\t\t\t\t\t\t\t<option *forOf="let s of styles" [value]="s" [selected]="options.style === s">{{s}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="col-2">\n\t\t\t\t\t\t\t\t\t<label>localeMatcher:</label>\n\t\t\t\t\t\t\t\t\t<select class="form-select col-3" (change)="updateOptions(\'localeMatcher\', this.value)">\n\t\t\t\t\t\t\t\t\t\t<option *forOf="let m of localeMatchers" [value]="m" [selected]="options.localeMatcher === m">{{m}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n            </tr>\n        </tbody>\n    </table>\n\n\t<table class="table" aria-label="table">\n\t\t<thead>\n\t\t\t<tr elHeight="350px">\n\t\t\t\t<th scope="col">#</th>\n\t\t\t\t<th scope="col">First</th>\n\t\t\t\t<th scope="col">Last</th>\n\t\t\t\t<th scope="col">Age</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\t\t\t<template *forOf="let user of users; index as idx; even as isEven; odd as isOdd; count as tableLength; first as isFirst; last as isLast">\n\t\t\t\t<tr [class]="{\'table-info\': isEven, \'table-danger\': isOdd}">\n\t\t\t\t\t<th scope="row">{{ ({idx, tableLength, isEven, isOdd, isFirst, isLast }) |> json }}</th>\n\t\t\t\t\t<td>{{user.firstName}}</td>\n\t\t\t\t\t<td>{{user.lastName}}</td>\n\t\t\t\t\t<td>{{user.age}}<div *if="user.age > 18">🕺</div></td>\n\t\t\t\t</tr>\n\t\t\t</template>\n\t\t</tbody>\n\t</table>\n    '})],a=[];return class{static{e=this}static{const l="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,s.G4)(null,t={value:e},n,{kind:"class",name:e.name,metadata:l},null,a),e=t.value,l&&Object.defineProperty(e,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l}),(0,s.zF)(e,a)}text="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups";obj={a:[1,2,3],b:"property b",c:{d:[],e:4,f:[{5:"g"}]}};keyValueObject={1:100,a:"A00"};keyValueArray=[200,300];keyValueMap=new Map([[1,400],[2,500],[3,"B200"]]);observable=(0,o.Y)(1e3);array=["a","b","c","d"];users=[{firstName:"Tinu",lastName:"Elejogun",age:14},{firstName:"Mark",lastName:"Kostrzewski",age:25},{firstName:"Lily",lastName:"McGarrett",age:18},{firstName:"Adela",lastName:"Athanasios",age:22}];colors=["--bs-blue","--bs-indigo","--bs-purple","--bs-pink","--bs-red","--bs-orange","--bs-yellow","--bs-green","--bs-teal","--bs-cyan","--bs-white","--bs-gray","--bs-gray-dark"];currentColor=this.colors[0];date=new Date;lang="ar";options={numeric:"auto",style:"long",localeMatcher:"best fit"};unit="day";langs=["ar","bn","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","nl","no","pl","pt","ro","ru","sk","sv","ta","th","tr","zh"];units=["year","years","quarter","quarters","month","months","week","weeks","day","days","hour","hours","minute","minutes","second","seconds"];numerics=["always","auto"];styles=["short","long","narrow"];localeMatchers=["best fit","lookup"];_subscription;onInit(){let t=0;this._subscription=this.observable.subscribe((()=>{t===this.colors.length&&(t=0),this.currentColor=this.colors[t++]}))}updateOptions(t,e){this.options=Object.assign({},this.options,{[t]:e})}onDestroy(){this._subscription.unsubscribe()}},e})()}}]);