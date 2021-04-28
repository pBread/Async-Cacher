function t(){const t=new WeakMap;return async(e,...n)=>{const a=function(...t){const e=JSON.stringify(t);for(var n=0,a=0;n<e.length;n++)a=Math.imul(31,a)+e.charCodeAt(n)|0;return a}(n);if(t.has(e)){const r=t.get(e);return r.has(a)?r.get(a):r.set(a,await e(...n)).get(a)}return t.set(e,(new Map).set(a,await e(...n))).get(e).get(a)}}export default t;
//# sourceMappingURL=index.modern.js.map
