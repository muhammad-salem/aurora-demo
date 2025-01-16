"use strict";(self.webpackChunkwebpack=self.webpackChunkwebpack||[]).push([[252],{252:(e,t,n)=>{n.r(t),n.d(t,{SimpleCustomInputElement:()=>s,SimpleCustomMessage:()=>p,SimpleCustomTextareaComponent:()=>o,SimpleForm:()=>i});var a=n(608),r=n(684);let o=(()=>{let e,t,n=[(0,r.uAl)({selector:"simple-custom-textarea",extend:"textarea",formAssociated:!0})],o=[];return class{static{t=this}static{const r="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,a.G4)(null,e={value:t},n,{kind:"class",name:t.name,metadata:r},null,o),t=e.value,r&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:r}),(0,a.zF)(t,o)}text="";_onChange=()=>{};onInit(){setTimeout((()=>this.updateTextarea("test textarea")),2e3),console.log(this)}updateTextarea(e){this.text=e,this._onChange(e)}writeValue(e){this.text="reset"!==e.mode?e.value:""}registerOnChange(e){this._onChange=e}onChanges(){console.log(JSON.parse(JSON.stringify(this)))}},t})(),p=(()=>{let e,t,n=[(0,r.uAl)({selector:"simple-custom-message",compiledTemplate:{children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"for",value:"message",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"for",range:[5,8]},computed:!1,optional:!1,range:[0,8]},right:{type:"Literal",value:"message",raw:"'message'",range:[11,20]},range:[0,20]},type:"ElementAttribute"},{name:"class",value:"form-label",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"form-label",raw:"'form-label'",range:[13,25]},range:[0,25]},type:"ElementAttribute"}],children:[{name:"textContent",value:"Message",type:"TextContent"}],tagName:"label",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"form-control",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"form-control",raw:"'form-control'",range:[13,27]},range:[0,27]},type:"ElementAttribute"},{name:"id",value:"message",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"id",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Literal",value:"message",raw:"'message'",range:[10,19]},range:[0,19]},type:"ElementAttribute"},{name:"name",value:"message-textarea",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"name",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"message-textarea",raw:"'message-textarea'",range:[12,30]},range:[0,30]},type:"ElementAttribute"},{name:"rows",value:3,expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"rows",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"3",raw:"'3'",range:[12,15]},range:[0,15]},type:"ElementAttribute"}],inputs:[{name:"disabled",value:"disabled",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"disabled",range:[5,13]},computed:!1,optional:!1,range:[0,13]},right:{type:"Identifier",name:"disabled",range:[0,8]}},type:"LiveAttribute"}],outputs:[{name:"change",value:"onMessageChange($event.target.value)",expression:{type:"CallExpression",callee:{type:"Identifier",name:"onMessageChange",range:[0,15]},arguments:[{type:"MemberExpression",object:{type:"MemberExpression",object:{type:"Identifier",name:"$event",range:[16,22]},property:{type:"Identifier",name:"target",range:[23,29]},computed:!1,optional:!1,range:[16,29]},property:{type:"Identifier",name:"value",range:[30,35]},computed:!1,optional:!1,range:[16,35]}],optional:!1,range:[0,36]},type:"LiveAttribute"}],twoWayBinding:[{name:"value",value:"message",expression:{type:"TwoWayAssignment",operator:"=::",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"value",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"Identifier",name:"message",range:[0,7]}},type:"LiveAttribute"}],children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"textarea",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"button",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"type",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"button",raw:"'button'",range:[12,20]},range:[0,20]},type:"ElementAttribute"},{name:"class",value:"btn btn-outline-primary m-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"btn btn-outline-primary m-3",raw:"'btn btn-outline-primary m-3'",range:[13,42]},range:[0,42]},type:"ElementAttribute"}],outputs:[{name:"click",value:"updateMessage()",expression:{type:"CallExpression",callee:{type:"Identifier",name:"updateMessage",range:[0,13]},arguments:[],optional:!1,range:[0,15]},type:"LiveAttribute"}],children:[{name:"textContent",value:"Update Message",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t  \t",type:"TextContent"}],type:"DomFragmentNode"},formAssociated:!0,signals:[{signal:"formValue",options:[{name:"message",alias:"message"}]}]})],o=[];return class{static{t=this}static{const r="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,a.G4)(null,e={value:t},n,{kind:"class",name:t.name,metadata:r},null,o),t=e.value,r&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:r}),(0,a.zF)(t,o)}message=(0,r.WUq)("");updateMessage(){this.message.set("test message")}onMessageChange(e){console.log("onMessageChange",e)}},t})(),s=(()=>{let e,t,n=[(0,r.uAl)({selector:"simple-custom-input",compiledTemplate:{attributes:[{name:"type",value:"number",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"type",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"number",raw:"'number'",range:[12,20]},range:[0,20]},type:"ElementAttribute"},{name:"class",value:"form-control",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"form-control",raw:"'form-control'",range:[13,27]},range:[0,27]},type:"ElementAttribute"},{name:"name",value:"custom-input",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"name",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"custom-input",raw:"'custom-input'",range:[12,26]},range:[0,26]},type:"ElementAttribute"}],inputs:[{name:"id",value:"elId",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"id",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Identifier",name:"elId",range:[0,4]}},type:"LiveAttribute"}],twoWayBinding:[{name:"value",value:"numberValue",expression:{type:"TwoWayAssignment",operator:"=::",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"value",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"Identifier",name:"numberValue",range:[0,11]}},type:"LiveAttribute"}],tagName:"input",type:"DomElementNode"},formAssociated:!0,signals:[{signal:"formValue",options:[{name:"numberValue",alias:"numberValue"}]},{signal:"input",options:[{name:"elId",alias:"id"}]}]})],o=[];return class{static{t=this}static{const r="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;(0,a.G4)(null,e={value:t},n,{kind:"class",name:t.name,metadata:r},null,o),t=e.value,r&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:r}),(0,a.zF)(t,o)}elId=(0,r.hFB)(void 0,{alias:"id"});numberValue=(0,r.WUq)(99);onInit(){setTimeout((()=>this.numberValue.set(666)),3e3)}},t})(),i=(()=>{let e,t,n,i,m=[(0,r.uAl)({selector:"simple-custom-form",extend:"form",compiledTemplate:{children:[{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"mb-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"mb-3",raw:"'mb-3'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"for",value:"test",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"for",range:[5,8]},computed:!1,optional:!1,range:[0,8]},right:{type:"Literal",value:"test",raw:"'test'",range:[11,17]},range:[0,17]},type:"ElementAttribute"},{name:"class",value:"form-label",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"form-label",raw:"'form-label'",range:[13,25]},range:[0,25]},type:"ElementAttribute"}],children:[{name:"textContent",value:"test",type:"TextContent"}],tagName:"label",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"id",value:"test",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"id",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Literal",value:"test",raw:"'test'",range:[10,16]},range:[0,16]},type:"ElementAttribute"},{name:"name",value:"test",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"name",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"test",raw:"'test'",range:[12,18]},range:[0,18]},type:"ElementAttribute"},{name:"type",value:"text",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"type",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"text",raw:"'text'",range:[12,18]},range:[0,18]},type:"ElementAttribute"}],twoWayBinding:[{name:"value",value:"model.test",expression:{type:"TwoWayAssignment",operator:"=::",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"value",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"MemberExpression",object:{type:"Identifier",name:"model",range:[0,5]},property:{type:"Identifier",name:"test",range:[6,10]},computed:!1,optional:!1,range:[0,10]}},type:"LiveAttribute"}],tagName:"input",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"mb-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"mb-3",raw:"'mb-3'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"for",value:"custom-input",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"for",range:[5,8]},computed:!1,optional:!1,range:[0,8]},right:{type:"Literal",value:"custom-input",raw:"'custom-input'",range:[11,25]},range:[0,25]},type:"ElementAttribute"},{name:"class",value:"form-label",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"form-label",raw:"'form-label'",range:[13,25]},range:[0,25]},type:"ElementAttribute"}],children:[{name:"textContent",value:"Index",type:"TextContent"}],tagName:"label",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"id",value:"custom-input",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"id",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Literal",value:"custom-input",raw:"'custom-input'",range:[10,24]},range:[0,24]},type:"ElementAttribute"},{name:"name",value:"index",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"name",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"index",raw:"'index'",range:[12,19]},range:[0,19]},type:"ElementAttribute"}],twoWayBinding:[{name:"value",value:"model.index",expression:{type:"TwoWayAssignment",operator:"=::",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"value",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"MemberExpression",object:{type:"Identifier",name:"model",range:[0,5]},property:{type:"Identifier",name:"index",range:[6,11]},computed:!1,optional:!1,range:[0,11]}},type:"LiveAttribute"}],tagName:"simple-custom-input",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"mb-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"mb-3",raw:"'mb-3'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"name",value:"message",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"name",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"message",raw:"'message'",range:[12,21]},range:[0,21]},type:"ElementAttribute"}],twoWayBinding:[{name:"value",value:"model.message",expression:{type:"TwoWayAssignment",operator:"=::",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"value",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"MemberExpression",object:{type:"Identifier",name:"model",range:[0,5]},property:{type:"Identifier",name:"message",range:[6,13]},computed:!1,optional:!1,range:[0,13]}},type:"LiveAttribute"}],tagName:"simple-custom-message",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"mb-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"mb-3",raw:"'mb-3'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"for",value:"custom-textarea",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"for",range:[5,8]},computed:!1,optional:!1,range:[0,8]},right:{type:"Literal",value:"custom-textarea",raw:"'custom-textarea'",range:[11,28]},range:[0,28]},type:"ElementAttribute"},{name:"class",value:"form-label",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"form-label",raw:"'form-label'",range:[13,25]},range:[0,25]},type:"ElementAttribute"}],children:[{name:"textContent",value:"Textarea",type:"TextContent"}],tagName:"label",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"id",value:"custom-textarea",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"id",range:[5,7]},computed:!1,optional:!1,range:[0,7]},right:{type:"Literal",value:"custom-textarea",raw:"'custom-textarea'",range:[10,27]},range:[0,27]},type:"ElementAttribute"},{name:"class",value:"form-control",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"form-control",raw:"'form-control'",range:[13,27]},range:[0,27]},type:"ElementAttribute"},{name:"name",value:"textArea",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"name",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"textArea",raw:"'textArea'",range:[12,22]},range:[0,22]},type:"ElementAttribute"}],twoWayBinding:[{name:"value",value:"model.textArea",expression:{type:"TwoWayAssignment",operator:"=::",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"value",range:[5,10]},computed:!1,optional:!1,range:[0,10]},right:{type:"MemberExpression",object:{type:"Identifier",name:"model",range:[0,5]},property:{type:"Identifier",name:"textArea",range:[6,14]},computed:!1,optional:!1,range:[0,14]}},type:"LiveAttribute"}],tagName:"simple-custom-textarea",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"mb-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"mb-3",raw:"'mb-3'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{attributes:[{name:"type",value:"submit",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"type",range:[5,9]},computed:!1,optional:!1,range:[0,9]},right:{type:"Literal",value:"submit",raw:"'submit'",range:[12,20]},range:[0,20]},type:"ElementAttribute"},{name:"class",value:"btn btn-outline-success m-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"btn btn-outline-success m-3",raw:"'btn btn-outline-success m-3'",range:[13,42]},range:[0,42]},type:"ElementAttribute"}],children:[{name:"textContent",value:"Submit",type:"TextContent"}],tagName:"button",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"},{attributes:[{name:"class",value:"mb-3",expression:{type:"AssignmentExpression",operator:"=",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"class",range:[5,11]},computed:!1,optional:!1,range:[0,11]},right:{type:"Literal",value:"mb-3",raw:"'mb-3'",range:[13,19]},range:[0,19]},type:"ElementAttribute"}],children:[{name:"textContent",value:"\n\t\t\t\t",type:"TextContent"},{name:"textContent",value:"data |> json",expression:{type:"OneWayAssignment",operator:"=:",left:{type:"MemberExpression",object:{type:"ThisExpression",range:[0,4]},property:{type:"Identifier",name:"textContent",range:[5,16]},computed:!1,optional:!1,range:[0,16]},right:{type:"PipelineExpression",left:{type:"Identifier",name:"data",range:[0,4]},right:{type:"Identifier",name:"json",range:[8,12]},arguments:[],range:[0,12]}},pipelineNames:["json"],type:"LiveTextContent"},{name:"textContent",value:"\n\t\t\t",type:"TextContent"}],tagName:"div",type:"DomElementNode"},{name:"textContent",value:"\n\t  \t",type:"TextContent"}],type:"DomFragmentNode"},imports:[o,p,s],signals:[]})],l=[],y=[];return class{static{t=this}static{const o="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0;n=[(0,r.Z$l)("submit",["$event"])],i=[(0,r.Z$l)("formdata",["$event"])],(0,a.G4)(this,null,n,{kind:"method",name:"onSubmit",static:!1,private:!1,access:{has:e=>"onSubmit"in e,get:e=>e.onSubmit},metadata:o},null,y),(0,a.G4)(this,null,i,{kind:"method",name:"onFormData",static:!1,private:!1,access:{has:e=>"onFormData"in e,get:e=>e.onFormData},metadata:o},null,y),(0,a.G4)(null,e={value:t},m,{kind:"class",name:t.name,metadata:o},null,l),t=e.value,o&&Object.defineProperty(t,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o}),(0,a.zF)(t,l)}model=((0,a.zF)(this,y),{test:"test",index:5,message:"default message",textArea:"default textarea"});data={};onSubmit(e){e.preventDefault(),console.log("$event",e);const t=new FormData(e.target),n={};t.forEach(((e,t)=>Reflect.set(n,t,e))),this.data=n,console.log("data",this.data)}onFormData(e){console.log("formData",e.formData),e.formData.forEach(((e,t)=>console.log("key",t,"value",e)))}},t})()}}]);