"use strict";(self.webpackChunk_ibyar_webpack=self.webpackChunk_ibyar_webpack||[]).push([[327],{4327:(t,n,e)=>{e.r(n),e.d(n,{CLASS_EXAMPLE:()=>r,CLASS_SUPER_EXAMPLE:()=>d,FUNCTION_SCOPES:()=>u,IMPORT_ALL:()=>a,IMPORT_DEFAULT:()=>o,IMPORT_NAMED:()=>l,IMPORT_NAMED_ALIAS:()=>i,MODULE_A:()=>s,PLAY:()=>c});const s="\nexport const user = {\n  name: 'alex',\n  age: 25\n};\nexport const app = {\n  name: 'aurora',\n  lang: ['ts', 'js', 'html', 'css'],\n};\nexport default 'defaultName';\n",a="\nimport * as foo from 'moduleA';\nconsole.log('foo', foo);\n",o="\nimport defaultName from 'moduleA';\nconsole.log('user', user);\n",l="\nimport {user, app} from 'moduleA';\nconsole.log('user', user);\nconsole.log('app', app);\n",i="\nimport {default as defaultName, user as bar} from 'moduleA';\nconsole.log('user', bar);\nconsole.log('name', defaultName);\n",c="\nlet Y = class YY {\n  static FF = 10;\n  i = 9;\n  #j = 'hello';\n  getJ(){ \n    return this.#j + ' world ' + this.constructor.FF;\n  }\n};\n\nlet y = new Y();\nconsole.log(y.i, y.getJ());\n",r="\nclass ClassWithPublicField {\n  publicField = 9;\n}\nconsole.log(new ClassWithPublicField().publicField);\n\n\nclass ClassWithPublicMethod {\n  publicMethod() { return 8; }\n}\nconsole.log(new ClassWithPublicMethod().publicMethod());\n\n\nclass ClassWithPrivateField {\n  #privateField = 99;\n\n  getPrivate() {\n    return this.#privateField;\n  }\n}\nconsole.log(new ClassWithPrivateField().getPrivate());\n\nclass ClassWithPrivateMethod {\n  #privateMethod() {\n    return 'hello world';\n  }\n\n  getPrivate() {\n    return this.#privateMethod();\n  }\n}\n\nconsole.log(new ClassWithPrivateMethod().getPrivate());\n\nclass ClassWithPublicStaticField {\n  static PUBLIC_STATIC_FIELD = 77;\n}\n\nconsole.log(ClassWithPublicStaticField.PUBLIC_STATIC_FIELD);\n\n\nclass ClassWithPublicStaticMethod {\n  static publicStaticMethod() { return 88; };\n}\n\nconsole.log(ClassWithPublicStaticMethod.publicStaticMethod());\n\n\nclass ClassWithPrivateStaticField {\n  static #PRIVATE_STATIC_FIELD = 55;\n\n  static getPrivate() {\n    return this.#PRIVATE_STATIC_FIELD;\n  }\n}\n\nconsole.log(ClassWithPrivateStaticField.getPrivate());\n\nclass ClassWithPrivateStaticMethod {\n  static #privateStaticMethod() {\n    return 'hello world';\n  }\n\n  static getPrivate() {\n    return this.#privateStaticMethod();\n  }\n}\nconsole.log(ClassWithPrivateStaticMethod.getPrivate());\n\n\n",d='\nclass Base {\n  baseGetX() { return 1; }\n  static staticBaseGetX() { return 3; }\n}\nclass AnotherBase {\n  baseGetX() { return 2; }\n  static staticBaseGetX() { return 4; }\n}\nclass Extended extends Base {\n  getX() { return super.baseGetX(); }\n  static staticGetX() { return super.staticBaseGetX(); }\n}\n\nconst e = new Extended();\n// Reset instance inheritance\nObject.setPrototypeOf(Extended.prototype, AnotherBase.prototype);\nconsole.log(e.getX()); // Logs "2" instead of "1", because the prototype chain has changed\nconsole.log(Extended.staticGetX()); // Still logs "3", because we haven\'t modified the static part yet\n// Reset static inheritance\nObject.setPrototypeOf(Extended, AnotherBase);\nconsole.log(Extended.staticGetX()); // Now logs "4"\n',u="\nfunction f(d) {\n  function g() {\n  const d = 100;\n    const a = ({c}) => c + d;\n    return a;\n  }\n  const b = g();\n  return [d, b({ c: 12 })];\n}\nconsole.log(f(10));\n"}}]);