(self.webpackChunk_strapi_ts_docs=self.webpackChunk_strapi_ts_docs||[]).push([[834],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),f=u(n),m=o,d=f["".concat(p,".").concat(m)]||f[m]||l[m]||i;return n?r.createElement(d,a(a({ref:t},c),{},{components:n})):r.createElement(d,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},3797:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return u},toc:function(){return c},default:function(){return f}});var r=n(4034),o=n(9973),i=(n(7294),n(3905)),a=["components"],s={title:"Notes"},p=void 0,u={unversionedId:"notes",id:"notes",isDocsHomePage:!1,title:"Notes",description:"- Do not remove the prefix field in the strapi/extensions/users-permissions/config/routes.json event if its value is empty. Because the controller will suspend and you cannot found any useful debug information",source:"@site/docs/notes.md",sourceDirName:".",slug:"/notes",permalink:"/strapi-ts/notes",tags:[],version:"current",frontMatter:{title:"Notes"},sidebar:"docsSidebar",previous:{title:"Test",permalink:"/strapi-ts/test"}},c=[],l={toc:c};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Do not remove the ",(0,i.kt)("inlineCode",{parentName:"p"},"prefix")," field in the ",(0,i.kt)("inlineCode",{parentName:"p"},"strapi/extensions/users-permissions/config/routes.json")," event if its value is empty. Because the controller will suspend and you cannot found any useful debug information")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Some of the ",(0,i.kt)("inlineCode",{parentName:"p"},"/auth/*")," routes have a rate-limit policy. These routes config is defined ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/strapi/strapi/blob/master/packages/strapi-plugin-users-permissions/config/routes.json"},"here")," and here is the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/strapi/strapi/blob/master/packages/strapi-plugin-users-permissions/config/request.json"},"rate limit config"),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Backup the database before create/update a model schema in ",(0,i.kt)("inlineCode",{parentName:"p"},"Strapi Admin Panel"),". Especially remove a relation field between collection.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If you have assign the policy ",(0,i.kt)("inlineCode",{parentName:"p"},"plugins::users-permissions.isAuthenticated"),". The value of ",(0,i.kt)("inlineCode",{parentName:"p"},"ctx.state.user")," is up to date and do not need to query again"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-js"},"strapi.query('user', 'users-permissions').findOne({ id: ctx.state.user.id });\n")))))}f.isMDXComponent=!0}}]);