if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const c=e=>n(e,d),t={module:{uri:d},exports:o,require:c};i[d]=Promise.all(s.map((e=>t[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-4d257be7.js",revision:null},{url:"assets/index-dd334bad.css",revision:null},{url:"index.html",revision:"62b3ed651fc2e72ddb2f49943b62b866"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"dc978dcc080b726fed236d84cd41302c"},{url:"icon-192.png",revision:"be3a43556dd1327e126d46e0c763105b"},{url:"icon-512.png",revision:"920ef079478897e41058cacdb86d7750"},{url:"icon-192-maskable.png",revision:"7bb0d5339da6ca240a8078bdba17ab56"},{url:"icon-512-maskable.png",revision:"204b94e6deb9b4e32ca0e90431439640"},{url:"manifest.webmanifest",revision:"a89bee5277d8f3937206161cb4630eab"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
