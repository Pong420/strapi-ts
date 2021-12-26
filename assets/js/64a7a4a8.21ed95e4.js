"use strict";(self.webpackChunk_strapi_ts_docs=self.webpackChunk_strapi_ts_docs||[]).push([[285],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=s(n),d=a,h=m["".concat(c,".").concat(d)]||m[d]||p[d]||i;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6620:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return m}});var r=n(3117),a=n(102),i=(n(7294),n(3905)),o=["components"],l={title:"Schema"},c=void 0,s={unversionedId:"schema",id:"schema",isDocsHomePage:!1,title:"Schema",description:"A schema defines how the data will be sent over the network which similar to DTO in NestJS. You could use the createSchemaPolicy function to create a strapi policy",source:"@site/docs/schema.md",sourceDirName:".",slug:"/schema",permalink:"/strapi-ts/schema",tags:[],version:"current",frontMatter:{title:"Schema"},sidebar:"docsSidebar",previous:{title:"Helper Scripts",permalink:"/strapi-ts/helper-scripts"},next:{title:"Test",permalink:"/strapi-ts/test"}},u=[{value:"Joi",id:"joi",children:[],level:3},{value:"Custom schema",id:"custom-schema",children:[],level:3},{value:"Notes",id:"notes",children:[],level:3},{value:"Create a schema",id:"create-a-schema",children:[],level:3}],p={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A schema defines how the data will be sent over the network which similar to ",(0,i.kt)("strong",{parentName:"p"},"DTO")," in ",(0,i.kt)("inlineCode",{parentName:"p"},"NestJS"),". You could use the ",(0,i.kt)("inlineCode",{parentName:"p"},"createSchemaPolicy")," function to create a strapi policy"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { createSchemaPolicy } from '@/schema';\nimport { RegistrationSchema } from '@/schema/auth/Registration';\n\nmodule.exports = createSchemaPolicy(RegistrationSchema, 'body');\n")),(0,i.kt)("h3",{id:"joi"},"Joi"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://joi.dev/api/"},"Joi")," is used for the schema definition. Be careful there is some preset configuration"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Joi.string()")," will automatically trimed"),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"presence")," option is ",(0,i.kt)("inlineCode",{parentName:"li"},"required")," by default. This means all fields defined in the schema are mark as ",(0,i.kt)("inlineCode",{parentName:"li"},"required()")," unless you add ",(0,i.kt)("inlineCode",{parentName:"li"},"optional()"),". Also fields that not defined in the schema will be consider as invalid")),(0,i.kt)("p",null,"For more details, see ",(0,i.kt)("inlineCode",{parentName:"p"},"strapi/schema/joi/joi.ts")),(0,i.kt)("h3",{id:"custom-schema"},"Custom schema"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Joi.mongoId()")," - Valid if the value is a mongoid"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Joi.file()")," - Valid if the value is ",(0,i.kt)("inlineCode",{parentName:"li"},"File")," instance of ",(0,i.kt)("inlineCode",{parentName:"li"},"formidable"),". Also you could validate the file size and extension with ",(0,i.kt)("inlineCode",{parentName:"li"},".maxSize(1)")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"extension(['png'])")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Joi.enum({ EnumObject })")," - Equals to ",(0,i.kt)("inlineCode",{parentName:"li"},"Joi.valid(...Object.values(EnumObject))"))),(0,i.kt)("h3",{id:"notes"},"Notes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Be careful when using the ",(0,i.kt)("inlineCode",{parentName:"li"},"Joi.default()"),", If it will share with others. For example",(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const create = {\n  subscribed: Joi.boolean().default(false)\n};\nconst update = {\n  subscribed: create.subscribed.optional()\n};\nconst result = update.validate({});\nconsole.log(result.value); // { subscribed: false }\n")))),(0,i.kt)("h3",{id:"create-a-schema"},"Create a schema"),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"/helper-scripts"},"Helper Scripts")))}m.isMDXComponent=!0}}]);