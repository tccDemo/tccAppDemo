/*
 Javascript MD5 library - version 0.4

 Coded (2011) by Luigi Galli - LG@4e71.org - http://faultylabs.com

 Thanks to: Roberto Viola

 The below code is PUBLIC DOMAIN - NO WARRANTY!

 Changelog: 
            Version 0.4   - 2011-06-19
            + added compact version (md5_compact_min.js), this is a slower but smaller version 
              (more than 4KB lighter before stripping/minification)
            + added preliminary support for Typed Arrays (see: 
              https://developer.mozilla.org/en/JavaScript_typed_arrays and 
              http://www.khronos.org/registry/typedarray/specs/latest/)
              MD5() now accepts input data as ArrayBuffer, Float32Array, Float64Array, 
              Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array or Uint8Array 
            - moved unit tests to md5_test.js
            - minor refactoring 

            Version 0.3.* - 2011-06-##
            - Internal dev versions

            Version 0.2 - 2011-05-22 
            ** FIXED: serious integer overflow problems which could cause a wrong MD5 hash being returned

            Version 0.1 - 2011
            -Initial version
*/
if(typeof faultylabs=="undefined"){faultylabs={}}faultylabs.MD5=function(h){function c(s){var r=(s>>>0).toString(16);return"00000000".substr(0,8-r.length)+r}function b(t){var r=[];for(var s=0;s<t.length;s++){r=r.concat(o(t[s]))}return r}function q(s){var r=[];for(var t=0;t<8;t++){r.push(s&255);s=s>>>8}return r}function k(s,r){return((s<<r)&4294967295)|(s>>>(32-r))}function l(r,t,s){return(r&t)|(~r&s)}function i(r,t,s){return(s&r)|(~s&t)}function e(r,t,s){return r^t^s}function d(r,t,s){return t^(r|~s)}function n(r,s){return(r[s+3]<<24)|(r[s+2]<<16)|(r[s+1]<<8)|(r[s])}function o(v){var r=[];for(var u=0;u<v.length;u++){if(v.charCodeAt(u)<=127){r.push(v.charCodeAt(u))}else{var t=encodeURIComponent(v.charAt(u)).substr(1).split("%");for(var s=0;s<t.length;s++){r.push(parseInt(t[s],16))}}}return r}function p(s,r,z,y){var x="";var w=0;var u=0;for(var v=3;v>=0;v--){u=arguments[v];w=(u&255);u=u>>>8;w=w<<8;w=w|(u&255);u=u>>>8;w=w<<8;w=w|(u&255);u=u>>>8;w=w<<8;w=w|u;x=x+c(w)}return x}function j(t){var r=new Array(t.length);for(var s=0;s<t.length;s++){r[s]=t[s]}return r}var g=null;var m=null;if(typeof h=="string"){g=o(h)}else{if(h.constructor==Array){if(h.length===0){g=h}else{if(typeof h[0]=="string"){g=b(h)}else{if(typeof h[0]=="number"){g=h}else{m=typeof h[0]}}}}else{if(typeof ArrayBuffer!="undefined"){if(h instanceof ArrayBuffer){g=j(new Uint8Array(h))}else{if((h instanceof Uint8Array)||(h instanceof Int8Array)){g=j(h)}else{if((h instanceof Uint32Array)||(h instanceof Int32Array)||(h instanceof Uint16Array)||(h instanceof Int16Array)||(h instanceof Float32Array)||(h instanceof Float64Array)){g=j(new Uint8Array(h.buffer))}else{m=typeof h}}}}else{m=typeof h}}}if(m){alert("MD5 type mismatch, cannot process "+m)}function a(s,r){return 4294967295&(s+r)}return f();function f(){function u(H,I,F,E){var G=x;x=z;z=B;B=a(B,k(a(D,a(H,a(I,F))),E));D=G}var s=g.length;g.push(128);var v=g.length%64;if(v>56){for(var t=0;t<(64-v);t++){g.push(0)}v=g.length%64}for(t=0;t<(56-v);t++){g.push(0)}g=g.concat(q(s*8));var C=1732584193;var A=4023233417;var y=2562383102;var w=271733878;var D=0,B=0,z=0,x=0;for(t=0;t<g.length/64;t++){D=C;B=A;z=y;x=w;var r=t*64;u(l(B,z,x),3614090360,n(g,r),7);u(l(B,z,x),3905402710,n(g,r+4),12);u(l(B,z,x),606105819,n(g,r+8),17);u(l(B,z,x),3250441966,n(g,r+12),22);u(l(B,z,x),4118548399,n(g,r+16),7);u(l(B,z,x),1200080426,n(g,r+20),12);u(l(B,z,x),2821735955,n(g,r+24),17);u(l(B,z,x),4249261313,n(g,r+28),22);u(l(B,z,x),1770035416,n(g,r+32),7);u(l(B,z,x),2336552879,n(g,r+36),12);u(l(B,z,x),4294925233,n(g,r+40),17);u(l(B,z,x),2304563134,n(g,r+44),22);u(l(B,z,x),1804603682,n(g,r+48),7);u(l(B,z,x),4254626195,n(g,r+52),12);u(l(B,z,x),2792965006,n(g,r+56),17);u(l(B,z,x),1236535329,n(g,r+60),22);u(i(B,z,x),4129170786,n(g,r+4),5);u(i(B,z,x),3225465664,n(g,r+24),9);u(i(B,z,x),643717713,n(g,r+44),14);u(i(B,z,x),3921069994,n(g,r),20);u(i(B,z,x),3593408605,n(g,r+20),5);u(i(B,z,x),38016083,n(g,r+40),9);u(i(B,z,x),3634488961,n(g,r+60),14);u(i(B,z,x),3889429448,n(g,r+16),20);u(i(B,z,x),568446438,n(g,r+36),5);u(i(B,z,x),3275163606,n(g,r+56),9);u(i(B,z,x),4107603335,n(g,r+12),14);u(i(B,z,x),1163531501,n(g,r+32),20);u(i(B,z,x),2850285829,n(g,r+52),5);u(i(B,z,x),4243563512,n(g,r+8),9);u(i(B,z,x),1735328473,n(g,r+28),14);u(i(B,z,x),2368359562,n(g,r+48),20);u(e(B,z,x),4294588738,n(g,r+20),4);u(e(B,z,x),2272392833,n(g,r+32),11);u(e(B,z,x),1839030562,n(g,r+44),16);u(e(B,z,x),4259657740,n(g,r+56),23);u(e(B,z,x),2763975236,n(g,r+4),4);u(e(B,z,x),1272893353,n(g,r+16),11);u(e(B,z,x),4139469664,n(g,r+28),16);u(e(B,z,x),3200236656,n(g,r+40),23);u(e(B,z,x),681279174,n(g,r+52),4);u(e(B,z,x),3936430074,n(g,r),11);u(e(B,z,x),3572445317,n(g,r+12),16);u(e(B,z,x),76029189,n(g,r+24),23);u(e(B,z,x),3654602809,n(g,r+36),4);u(e(B,z,x),3873151461,n(g,r+48),11);u(e(B,z,x),530742520,n(g,r+60),16);u(e(B,z,x),3299628645,n(g,r+8),23);u(d(B,z,x),4096336452,n(g,r),6);u(d(B,z,x),1126891415,n(g,r+28),10);u(d(B,z,x),2878612391,n(g,r+56),15);u(d(B,z,x),4237533241,n(g,r+20),21);u(d(B,z,x),1700485571,n(g,r+48),6);u(d(B,z,x),2399980690,n(g,r+12),10);u(d(B,z,x),4293915773,n(g,r+40),15);u(d(B,z,x),2240044497,n(g,r+4),21);u(d(B,z,x),1873313359,n(g,r+32),6);u(d(B,z,x),4264355552,n(g,r+60),10);u(d(B,z,x),2734768916,n(g,r+24),15);u(d(B,z,x),1309151649,n(g,r+52),21);u(d(B,z,x),4149444226,n(g,r+16),6);u(d(B,z,x),3174756917,n(g,r+44),10);u(d(B,z,x),718787259,n(g,r+8),15);u(d(B,z,x),3951481745,n(g,r+36),21);C=a(C,D);A=a(A,B);y=a(y,z);w=a(w,x)}return p(w,y,A,C).toUpperCase()}};