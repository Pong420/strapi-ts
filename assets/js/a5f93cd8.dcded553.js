(self.webpackChunk_strapi_ts_docs=self.webpackChunk_strapi_ts_docs||[]).push([[516],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return u},kt:function(){return d}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(r),d=i,f=m["".concat(p,".").concat(d)]||m[d]||l[d]||a;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5336:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return u},default:function(){return m}});var n=r(4034),i=r(9973),a=(r(7294),r(3905)),o=["components"],s={title:"Project Structure"},p=void 0,c={unversionedId:"project-structure",id:"project-structure",isDocsHomePage:!1,title:"Project Structure",description:"Since Strapi does not has typescript support. So we use esbuild to compile ts in js quickly",source:"@site/docs/project-structure.md",sourceDirName:".",slug:"/project-structure",permalink:"/strapi-ts/project-structure",tags:[],version:"current",frontMatter:{title:"Project Structure"},sidebar:"docsSidebar",previous:{title:"Features",permalink:"/strapi-ts/features"},next:{title:"Permission",permalink:"/strapi-ts/permission"}},u=[{value:"Notes",id:"notes",children:[],level:3}],l={toc:u};function m(e){var t=e.components,r=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Since Strapi does not has typescript support. So we use ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/evanw/esbuild"},"esbuild")," to compile ts in js quickly"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},".\n\u251c\u2500\u2500 app\n\u251c\u2500\u2500 docs\n\u251c\u2500\u2500 eslint\n\u251c\u2500\u2500 scripts\n\u2502   \u251c\u2500\u2500 ...\n\u2502   \u2514\u2500\u2500 compile   # scripts/utility for complie typescript\n\u251c\u2500\u2500 strapi\n\u2502   \u251c\u2500\u2500 ...\n\u2502   \u251c\u2500\u2500 schema    # joi schema\n\u2502   \u251c\u2500\u2500 tests     # e2e test\n\u2502   \u251c\u2500\u2500 types     # types using in development\n\u2502   \u251c\u2500\u2500 typings   # types expect to share with the client\n\u2502   \u2514\u2500\u2500 ...\n\u2514\u2500\u2500 ...\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("h4",{parentName:"li",id:"strapi"},"strapi"),(0,a.kt)("p",{parentName:"li"},"The source code of the Strapi project written in typescript")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("h4",{parentName:"li",id:"app"},"app"),(0,a.kt)("p",{parentName:"li"},"The Strapi runtime scripts that complied from ",(0,a.kt)("inlineCode",{parentName:"p"},"/strapi"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("h4",{parentName:"li",id:"docs"},"docs"),(0,a.kt)("p",{parentName:"li"},"This documentation source code")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("h4",{parentName:"li",id:"eslint"},"eslint"),(0,a.kt)("p",{parentName:"li"},"local eslint plugin")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("h4",{parentName:"li",id:"scripts"},"scripts"),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"./helper-scripts"},"helper scripts")))),(0,a.kt)("h3",{id:"notes"},"Notes"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"To run the strapi command easier, we define ",(0,a.kt)("inlineCode",{parentName:"li"},"/strapi")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"/app")," as yarn workspace. But not ",(0,a.kt)("inlineCode",{parentName:"li"},"/docs"),". It is because",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Docusaurus do not work with yarn workspace. The solutions mentioned in this ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/facebook/docusaurus/issues/3515"},"issue")," does not work"),(0,a.kt)("li",{parentName:"ul"},"The version of React that use by Strapi is fixed to 16. We need to downgrade the React version to solve the limitation of ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/facebook/react/issues/13991"},"multiple instances of React"))))))}m.isMDXComponent=!0}}]);