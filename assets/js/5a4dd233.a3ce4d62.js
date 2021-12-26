"use strict";(self.webpackChunk_strapi_ts_docs=self.webpackChunk_strapi_ts_docs||[]).push([[655],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return f}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},l=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),m=c(t),f=i,d=m["".concat(p,".").concat(f)]||m[f]||u[f]||o;return t?r.createElement(d,s(s({ref:n},l),{},{components:t})):r.createElement(d,s({ref:n},l))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,s=new Array(o);s[0]=m;var a={};for(var p in n)hasOwnProperty.call(n,p)&&(a[p]=n[p]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var c=2;c<o;c++)s[c]=t[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},5302:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return a},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return l},default:function(){return m}});var r=t(3117),i=t(102),o=(t(7294),t(3905)),s=["components"],a={title:"Permission"},p=void 0,c={unversionedId:"permission",id:"permission",isDocsHomePage:!1,title:"Permission",description:"Permissions configuration is saved in a database if changing the database or in the testing environment, the permission will not synchronize. So we need to set the permissions on the application bootstrap.",source:"@site/docs/permission.md",sourceDirName:".",slug:"/permission",permalink:"/strapi-ts/permission",tags:[],version:"current",frontMatter:{title:"Permission"},sidebar:"docsSidebar",previous:{title:"Project Structure",permalink:"/strapi-ts/project-structure"},next:{title:"Helper Scripts",permalink:"/strapi-ts/helper-scripts"}},l=[{value:"Update Permissions",id:"update-permissions",children:[],level:3}],u={toc:l};function m(e){var n=e.components,t=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Permissions configuration is saved in a database if changing the database or in the testing environment, the permission will not synchronize. So we need to set the permissions on the application bootstrap."),(0,o.kt)("h3",{id:"update-permissions"},"Update Permissions"),(0,o.kt)("p",null,"Open ",(0,o.kt)("inlineCode",{parentName:"p"},"config/functions/bootstrap.js")," edit the functions ",(0,o.kt)("inlineCode",{parentName:"p"},"setAllPermissions")," for user role ",(0,o.kt)("inlineCode",{parentName:"p"},"public")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"authenticated")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=config/functions/bootstrap.js",title:"config/functions/bootstrap.js"},"const setAllPermissions = async () => {\n  setPermissions({\n    public: {\n      application: {\n        // ...\n      },\n      'users-permissions': {\n        //  ...\n      }\n    },\n    authenticated: {\n      application: {\n        // ...\n      },\n      'users-permissions': {\n        // ...\n      }\n    }\n  });\n};\n")),(0,o.kt)("p",null,"The type of ",(0,o.kt)("inlineCode",{parentName:"p"},"controller")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"action")," should be auto-generated during the development mode"))}m.isMDXComponent=!0}}]);