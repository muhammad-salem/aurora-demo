"use strict";(self.webpackChunkwebpack_example=self.webpackChunkwebpack_example||[]).push([[946],{946:(e,t,n)=>{n.r(t),n.d(t,{HostColorPickerComponent:()=>r});var o=n(608),a=n(684);let r=(()=>{let e,t,n,r,l=[(0,a.uAl)({selector:"host-color",extend:"div",disabledFeatures:["internals","shadow"],compiledTemplate:{children:[{name:"textContent",value:"\n\t",type:"TextContent"},{children:[{name:"textContent",value:"Click on color name, to change host: background color",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t",type:"TextContent"},{inputs:[{name:"of",value:"colors",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"of",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Identifier",name:"colors",range:[0,6]}},type:"LiveAttribute"}],name:"*for",value:"let color of colors",node:{attributes:[],inputs:[{name:"data-color",value:"color",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"dataset",range:[5,12]},computed:!1,optional:!1,range:[0,12]},property:{type:"Identifier",name:"color",range:[13,18]},computed:!1,optional:!1,range:[0,18]},right:{type:"Identifier",name:"color",range:[0,5]}},type:"LiveAttribute"}],children:[{name:"textContent",value:"\n\t\t",type:"TextContent"},{name:"textContent",value:"color",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"color",range:[0,5]}},type:"LiveTextContent"},{name:"textContent",value:"\n\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},templateExpressions:[{type:"VariableDeclaration",kind:"let",declarations:[{type:"VariableDeclarator",id:{type:"Identifier",name:"color",range:[4,9]},init:{type:"Identifier",name:"$implicit"},range:[1,4]}],range:[0,4]}],type:"DomStructuralDirectiveNode"},{name:"textContent",value:"\n\t",type:"TextContent"},{children:[{name:"textContent",value:"Current Color: ",type:"TextContent"},{name:"textContent",value:" selectedColor || 'nothing'",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"LogicalExpression",operator:"||",left:{type:"Identifier",name:"selectedColor",range:[1,14]},right:{type:"Literal",value:"nothing",raw:"'nothing'",range:[18,27]},range:[1,27]}},type:"LiveTextContent"},{name:"textContent",value:".",type:"TextContent"}],tagName:"div",type:"DomElementNode"}],type:"DomFragmentNode"},signals:[]})],i=[],s=[],p=[],c=[];return class{static{t=this}static{const m="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,a.g$6)("style.background-color")],r=[(0,a.Z$l)("click","$event")],(0,o.G4)(this,null,r,{kind:"method",name:"onHostClick",static:!1,private:!1,access:{has:e=>"onHostClick"in e,get:e=>e.onHostClick},metadata:m},null,s),(0,o.G4)(null,null,n,{kind:"field",name:"selectedColor",static:!1,private:!1,access:{has:e=>"selectedColor"in e,get:e=>e.selectedColor,set:(e,t)=>{e.selectedColor=t}},metadata:m},p,c),(0,o.G4)(null,e={value:t},l,{kind:"class",name:t.name,metadata:m},null,i),t=e.value,m&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:m}),(0,o.zF)(t,i)}colors=((0,o.zF)(this,s),["red","blue","green","yellow","purple","fuchsia","lime","teal","aqua","gray","silver","black","white"]);selectedColor=(0,o.zF)(this,p,"");onHostClick(e){const t=e.target;this.selectedColor=t.dataset.color||""}constructor(){(0,o.zF)(this,c)}},t})()}}]);