"use strict";(self.webpackChunkwebpack=self.webpackChunkwebpack||[]).push([[898],{898:(e,t,n)=>{n.r(t),n.d(t,{ControlFlowExample:()=>o});var a=n(608),r=n(684);let o=(()=>{let e,t,n=[(0,r.uAl)({selector:"control-flow",compiledTemplate:{children:[{name:"textContent",value:"\n\t\tescape @ by adding double \\\\ before @\n\t\t",type:"TextContent"},{inputs:[{name:"of",value:"list",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"of",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Identifier",name:"list",range:[0,4]}},type:"LiveAttribute"}],name:"*for",value:"let item of list; let i = index, isFirst = first, isLast = last;",node:{children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{inputs:[{name:"if",value:"isFirst",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"if",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Identifier",name:"isFirst",range:[0,7]}},type:"LiveAttribute"}],name:"*if",value:"isFirst",node:{children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{tagName:"hr",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[],type:"DomStructuralDirectiveNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"index: ",type:"TextContent"},{name:"textContent",value:"i",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"i",range:[0,1]}},type:"LiveTextContent"},{name:"textContent",value:", item: ",type:"TextContent"},{name:"textContent",value:"item",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"item",range:[0,4]}},type:"LiveTextContent"}],tagName:"p",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{inputs:[{name:"if",value:"isLast",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"if",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Identifier",name:"isLast",range:[0,6]}},type:"LiveAttribute"}],name:"*if",value:"isLast",node:{children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{tagName:"hr",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[],type:"DomStructuralDirectiveNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[{type:"VariableDeclaration",kind:"let",declarations:[{type:"VariableDeclarator",id:{type:"Identifier",name:"item",range:[4,8]},init:{type:"Identifier",name:"$implicit"},range:[1,4]}],range:[0,4]},{type:"VariableDeclaration",kind:"let",declarations:[{type:"VariableDeclarator",id:{type:"Identifier",name:"i",range:[22,23]},init:{type:"Identifier",name:"index",range:[26,31]},range:[1,4]},{type:"VariableDeclarator",id:{type:"Identifier",name:"isFirst",range:[33,40]},init:{type:"Identifier",name:"first",range:[43,48]},range:[5,8]},{type:"VariableDeclarator",id:{type:"Identifier",name:"isLast",range:[50,56]},init:{type:"Identifier",name:"last",range:[59,63]},range:[9,12]}],range:[18,12]}],type:"DomStructuralDirectiveNode"},{name:"textContent",value:"\n\t\tprint yes => ",type:"TextContent"},{inputs:[{name:"of",value:"[ ]",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"of",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"ArrayExpression",elements:[],range:[0,3]}},type:"LiveAttribute"}],name:"*for",value:"let x of []",node:{children:[{name:"textContent",value:"x",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[{type:"VariableDeclaration",kind:"let",declarations:[{type:"VariableDeclarator",id:{type:"Identifier",name:"x",range:[4,5]},init:{type:"Identifier",name:"$implicit"},range:[1,4]}],range:[0,4]}],type:"DomStructuralDirectiveNode"},{name:"*empty",node:{children:[{name:"textContent",value:"y",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[],type:"DomStructuralDirectiveNode"},{inputs:[{name:"if",value:"'bool'",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"if",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Literal",value:"bool",raw:"'bool'",range:[0,6]}},type:"LiveAttribute"}],name:"*if",value:"'bool'",node:{children:[{name:"textContent",value:"e",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[],type:"DomStructuralDirectiveNode"},{name:"*else if",value:"false",node:{children:[{name:"textContent",value:"b",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[],type:"DomStructuralDirectiveNode"},{name:"*else",node:{children:[{name:"textContent",value:"c",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[],type:"DomStructuralDirectiveNode"},{inputs:[{name:"of",value:"[ ]",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"of",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"ArrayExpression",elements:[],range:[0,3]}},type:"LiveAttribute"}],name:"*for",value:"let x of []",node:{children:[{name:"textContent",value:"m",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[{type:"VariableDeclaration",kind:"let",declarations:[{type:"VariableDeclarator",id:{type:"Identifier",name:"x",range:[4,5]},init:{type:"Identifier",name:"$implicit"},range:[1,4]}],range:[0,4]}],type:"DomStructuralDirectiveNode"},{name:"*empty",node:{children:[{name:"textContent",value:"s",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[],type:"DomStructuralDirectiveNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{tagName:"hr",type:"DomElementNode"},{name:"textContent",value:"\n\t\tLocal template variables ==>  @let double = 2 * x; @let y = x + 2, z = x - 2;\n\t\t",type:"TextContent"},{tagName:"hr",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{declarations:"double = 2 * x",variables:[{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"double",range:[4,10]},right:{type:"BinaryExpression",operator:"*",left:{type:"Literal",value:2,raw:"2",range:[13,13]},right:{type:"Identifier",name:"x",range:[17,18]},range:[13,18]}}}],type:"LocalTemplateVariables"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{declarations:"y = x + 2, z = x - 2",variables:[{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"y",range:[4,5]},right:{type:"BinaryExpression",operator:"+",left:{type:"Identifier",name:"x",range:[8,9]},right:{type:"Literal",value:2,raw:"2",range:[12,12]},range:[8,13]}}},{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"z",range:[15,16]},right:{type:"BinaryExpression",operator:"-",left:{type:"Identifier",name:"x",range:[19,20]},right:{type:"Literal",value:2,raw:"2",range:[23,23]},range:[19,24]}}}],type:"LocalTemplateVariables"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{attributes:[{name:"class",value:"d-flex flex-column",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"d-flex flex-column",raw:"'d-flex flex-column'",range:[13,33]},range:[0,33]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"ms-5",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"ms-5",raw:"'ms-5'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:" x - 2 = ",type:"TextContent"},{name:"textContent",value:"z",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"z",range:[0,1]}},type:"LiveTextContent"}],tagName:"span",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"ms-5",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"ms-5",raw:"'ms-5'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:"x = ",type:"TextContent"},{name:"textContent",value:"x",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"x",range:[0,1]}},type:"LiveTextContent"},{name:"textContent",value:" ",type:"TextContent"}],tagName:"span",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"ms-5",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"ms-5",raw:"'ms-5'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:" x + 2 = ",type:"TextContent"},{name:"textContent",value:"y",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"y",range:[0,1]}},type:"LiveTextContent"}],tagName:"span",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"ms-5",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"ms-5",raw:"'ms-5'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:" x * 2 = ",type:"TextContent"},{name:"textContent",value:"double",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"double",range:[0,6]}},type:"LiveTextContent"}],tagName:"span",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{tagName:"hr",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{attributes:[{name:"class",value:"table",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"table",raw:"'table'",range:[13,20]},range:[0,20]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"number",type:"TextContent"}],tagName:"th",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"number + 2",type:"TextContent"}],tagName:"th",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"number - 2",type:"TextContent"}],tagName:"th",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"number * 2",type:"TextContent"}],tagName:"th",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"number / 2",type:"TextContent"}],tagName:"th",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"number % 2",type:"TextContent"}],tagName:"th",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"}],tagName:"tr",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"thead",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{inputs:[{name:"of",value:"[ 1 , 2 , 3 , 4 , 5 ]",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"of",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"ArrayExpression",elements:[{type:"Literal",value:1,raw:"1",range:[2,2]},{type:"Literal",value:2,raw:"2",range:[6,6]},{type:"Literal",value:3,raw:"3",range:[10,10]},{type:"Literal",value:4,raw:"4",range:[14,14]},{type:"Literal",value:5,raw:"5",range:[18,18]}],range:[0,21]}},type:"LiveAttribute"}],name:"*for",value:"let num of [1,2,3,4,5]",node:{children:[{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{declarations:"a = num + 2, b = num -2, c = num * 2, d = num /2, e = num %2",variables:[{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"a",range:[4,5]},right:{type:"BinaryExpression",operator:"+",left:{type:"Identifier",name:"num",range:[8,11]},right:{type:"Literal",value:2,raw:"2",range:[14,14]},range:[8,15]}}},{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"b",range:[17,18]},right:{type:"BinaryExpression",operator:"-",left:{type:"Identifier",name:"num",range:[21,24]},right:{type:"Literal",value:2,raw:"2",range:[26,26]},range:[21,27]}}},{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"c",range:[29,30]},right:{type:"BinaryExpression",operator:"*",left:{type:"Identifier",name:"num",range:[33,36]},right:{type:"Literal",value:2,raw:"2",range:[39,39]},range:[33,40]}}},{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"d",range:[42,43]},right:{type:"BinaryExpression",operator:"/",left:{type:"Identifier",name:"num",range:[46,49]},right:{type:"Literal",value:2,raw:"2",range:[51,51]},range:[46,52]}}},{expression:{type:"OneWayAssignment",operator:"=:",left:{type:"Identifier",name:"e",range:[54,55]},right:{type:"BinaryExpression",operator:"%",left:{type:"Identifier",name:"num",range:[58,61]},right:{type:"Literal",value:2,raw:"2",range:[63,63]},range:[58,64]}}}],type:"LocalTemplateVariables"},{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"\n\t\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"num",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"num",range:[0,3]}},type:"LiveTextContent"}],tagName:"td",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"a",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"a",range:[0,1]}},type:"LiveTextContent"}],tagName:"td",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"b",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"b",range:[0,1]}},type:"LiveTextContent"}],tagName:"td",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"c",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"c",range:[0,1]}},type:"LiveTextContent"}],tagName:"td",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"d",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"d",range:[0,1]}},type:"LiveTextContent"}],tagName:"td",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t\t",type:"TextContent"},{children:[{name:"textContent",value:"e",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"Identifier",name:"e",range:[0,1]}},type:"LiveTextContent"}],tagName:"td",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t\t",type:"TextContent"}],tagName:"tr",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"}],type:"DomFragmentNode"},templateExpressions:[{type:"VariableDeclaration",kind:"let",declarations:[{type:"VariableDeclarator",id:{type:"Identifier",name:"num",range:[4,7]},init:{type:"Identifier",name:"$implicit"},range:[1,4]}],range:[0,4]}],type:"DomStructuralDirectiveNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"tbody",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"}],tagName:"table",type:"DomElementNode"},{name:"textContent",value:"\n\t\t",type:"TextContent"},{tagName:"hr",type:"DomElementNode"},{name:"textContent",value:"\n\t",type:"TextContent"}],type:"DomFragmentNode"},signals:[]})],o=[];return class{static{t=this}static{const r="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,a.G4)(null,e={value:t},n,{kind:"class",name:t.name,metadata:r},null,o),t=e.value,r&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:r}),(0,a.zF)(t,o)}x=4;list=[1,2,3,4,5,6,7,8,9];interval;onInit(){this.interval=setInterval((()=>this.x++),1e3)}onDestroy(){clearInterval(this.interval)}},t})()}}]);