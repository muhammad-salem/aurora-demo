"use strict";(self.webpackChunkwebpack=self.webpackChunkwebpack||[]).push([[754],{754:(e,t,n)=>{n.r(t),n.d(t,{FetchApp:()=>r});var a=n(608),i=n(684);let r=(()=>{let e,t,n=[(0,i.uAl)({selector:"fetch-app",zone:"manual",compiledTemplate:{children:[{name:"textContent",value:"\t",type:"TextContent"},{attributes:[{name:"class",value:"row gx-5",type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t",type:"TextContent"},{attributes:[{name:"class",value:"col",type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"list-group",type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{inputs:[{name:"forOf",value:"list",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"forOf",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"Identifier",name:"list",range:[0,4]}},type:"LiveAttribute"}],name:"*for",value:"let item of list",node:{attributes:[{name:"class",value:"list-group-item",type:"ElementAttribute"}],inputs:[{name:"class",value:"{'active': selected === item}",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"ObjectExpression",properties:[{type:"Property",key:{type:"Literal",value:"active",raw:"'active'",range:[2,10]},value:{type:"BinaryExpression",operator:"===",left:{type:"Identifier",name:"selected",range:[12,20]},right:{type:"Identifier",name:"item",range:[25,29]},range:[12,29]},kind:"init",range:[2,29]}],range:[1,30]}},type:"LiveAttribute"}],outputs:[{name:"click",value:"selected = item",expression:{type:"AssignmentExpression",operator:"=",left:{type:"Identifier",name:"selected",range:[0,8]},right:{type:"Identifier",name:"item",range:[11,15]},range:[0,15]},type:"LiveAttribute"}],attributeDirectives:[{name:"class",type:"DomAttributeDirectiveNode"}],children:[{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{name:"textContent",value:"item",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"item",range:[0,4]}},type:"LiveTextContent"},{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"}],tagName:"li",type:"DomElementNode"},templateExpressions:[{type:"VariableDeclaration",kind:"let",declarations:[{type:"VariableDeclarator",id:{type:"Identifier",name:"item",range:[4,8]},init:{type:"Identifier",name:"$implicit"},range:[1,4]}],range:[0,4]}],type:"DomStructuralDirectiveNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"ul",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{attributes:[{name:"class",value:"col",type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"button",type:"ElementAttribute"},{name:"class",value:"btn btn-link",type:"ElementAttribute"}],outputs:[{name:"click",value:"move(list.indexOf(selected), -1)",expression:{type:"CallExpression",callee:{type:"Identifier",name:"move",range:[0,4]},arguments:[{type:"CallExpression",callee:{type:"MemberExpression",object:{type:"Identifier",name:"list",range:[5,9]},property:{type:"Identifier",name:"indexOf",range:[10,17]},computed:!1,optional:!1,range:[5,17]},arguments:[{type:"Identifier",name:"selected",range:[18,26]}],optional:!1,range:[5,27]},{type:"UnaryExpression",operator:"-",argument:{type:"Literal",value:1,raw:"1",range:[30,30]},prefix:!0,range:[29,31]}],optional:!1,range:[0,32]},type:"LiveAttribute"}],children:[{name:"textContent",value:"UP",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"button",type:"ElementAttribute"},{name:"class",value:"btn btn-link",type:"ElementAttribute"}],outputs:[{name:"click",value:"move(list.indexOf(selected), +1)",expression:{type:"CallExpression",callee:{type:"Identifier",name:"move",range:[0,4]},arguments:[{type:"CallExpression",callee:{type:"MemberExpression",object:{type:"Identifier",name:"list",range:[5,9]},property:{type:"Identifier",name:"indexOf",range:[10,17]},computed:!1,optional:!1,range:[5,17]},arguments:[{type:"Identifier",name:"selected",range:[18,26]}],optional:!1,range:[5,27]},{type:"UnaryExpression",operator:"+",argument:{type:"Literal",value:1,raw:"1",range:[30,30]},prefix:!0,range:[29,31]}],optional:!1,range:[0,32]},type:"LiveAttribute"}],children:[{name:"textContent",value:"Down",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"button",type:"ElementAttribute"},{name:"class",value:"btn btn-link",type:"ElementAttribute"}],outputs:[{name:"click",value:"sortItems(+1)",expression:{type:"CallExpression",callee:{type:"Identifier",name:"sortItems",range:[0,9]},arguments:[{type:"UnaryExpression",operator:"+",argument:{type:"Literal",value:1,raw:"1",range:[11,11]},prefix:!0,range:[10,12]}],optional:!1,range:[0,13]},type:"LiveAttribute"}],children:[{name:"textContent",value:"SORT",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"button",type:"ElementAttribute"},{name:"class",value:"btn btn-link",type:"ElementAttribute"}],outputs:[{name:"click",value:"sortItems(-1)",expression:{type:"CallExpression",callee:{type:"Identifier",name:"sortItems",range:[0,9]},arguments:[{type:"UnaryExpression",operator:"-",argument:{type:"Literal",value:1,raw:"1",range:[11,11]},prefix:!0,range:[10,12]}],optional:!1,range:[0,13]},type:"LiveAttribute"}],children:[{name:"textContent",value:"Reverse SORT",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"button",type:"ElementAttribute"},{name:"class",value:"btn btn-link",type:"ElementAttribute"}],outputs:[{name:"click",value:"delete(list.indexOf(selected))",expression:{type:"CallExpression",callee:{type:"Identifier",name:"delete",range:[0,6]},arguments:[{type:"CallExpression",callee:{type:"MemberExpression",object:{type:"Identifier",name:"list",range:[7,11]},property:{type:"Identifier",name:"indexOf",range:[12,19]},computed:!1,optional:!1,range:[7,19]},arguments:[{type:"Identifier",name:"selected",range:[20,28]}],optional:!1,range:[7,29]}],optional:!1,range:[0,30]},type:"LiveAttribute"}],children:[{name:"textContent",value:"DELETE",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"button",type:"ElementAttribute"},{name:"class",value:"btn btn-link",type:"ElementAttribute"}],outputs:[{name:"click",value:"appendItem()",expression:{type:"CallExpression",callee:{type:"Identifier",name:"appendItem",range:[0,10]},arguments:[],optional:!1,range:[0,12]},type:"LiveAttribute"}],children:[{name:"textContent",value:"APPEND",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"}],type:"DomFragmentNode"}})],r=[];return class{static{t=this}static{const i="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,a.G4)(null,e={value:t},n,{kind:"class",name:t.name,metadata:i},null,r),t=e.value,i&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:i}),(0,a.zF)(t,r)}_cd;list=[];selected=1;constructor(e){this._cd=e}onInit(){fetch("https://raw.githubusercontent.com/ibyar/aurora/dev/example/src/fetch/data.json").then((e=>e.json())).then((e=>this.list=e.map((e=>+e)))).then((()=>this._cd.markForCheck()))}move(e,t){this.list&&(-1==t&&e>0?this.list.splice(e+t,2,this.list[e],this.list[e+t]):1==t&&e<this.list.length-1&&this.list.splice(e,2,this.list[e+t],this.list[e]))}delete(e){return this.selected=this.list.at(e-1)??0,this.list.splice(e,1)[0]}appendItem(){this.list.push(this.list.length>0?Math.max.apply(Math,this.list)+1:0),this.selected=this.list.length-1}sortItems(e){this.list.sort(((t,n)=>(t-n)*e))}},t})()}}]);