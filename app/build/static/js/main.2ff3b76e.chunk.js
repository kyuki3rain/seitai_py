(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{18:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),i=n.n(a),r=n(10),s=n.n(r),o=(n(18),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))}),j=(n(6),n(2)),d=n.n(j),u=n(4),l=n(3),b=window.eel,h=["init","app","cal"],O=["serial","test"],f=function(e){var t=e.setMode,n=(e.children,Object(a.useState)()),i=Object(l.a)(n,2),r=i[0],s=i[1],o=Object(a.useState)(),j=Object(l.a)(o,2),f=j[0],x=j[1],p=Object(a.useState)("test"),v=Object(l.a)(p,2),g=v[0],m=v[1],w=Object(a.useState)("cal"),y=Object(l.a)(w,2),C=y[0],S=y[1],_=Object(a.useState)(1),k=Object(l.a)(_,2),L=k[0],F=k[1],E=function(){var e=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get_ports()();case 2:t=e.sent,s(t),x(t[0]);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){E()}),[]),r?Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{class:"row",children:[Object(c.jsx)("div",{children:"port select"}),Object(c.jsx)("select",{value:f,onChange:function(e){x(e.target.value)},children:r.map((function(e){return Object(c.jsx)("option",{value:e,children:e})}))})]}),Object(c.jsxs)("div",{class:"row",children:[Object(c.jsx)("div",{children:"datamode select"}),Object(c.jsx)("select",{value:g,onChange:function(e){m(e.target.value)},children:O.map((function(e){return Object(c.jsx)("option",{value:e,children:e})}))})]}),Object(c.jsxs)("div",{class:"row",children:[Object(c.jsx)("div",{children:"mode select"}),Object(c.jsx)("select",{value:C,onChange:function(e){S(e.target.value)},children:h.map((function(e){return Object(c.jsx)("option",{value:e,children:e})}))})]}),Object(c.jsxs)("div",{class:"row",children:[Object(c.jsx)("div",{children:"mode select"}),Object(c.jsx)("input",{type:"textarea",value:L,onChange:function(e){F(Number(e.target.value))}})]}),Object(c.jsx)("button",{onClick:function(){b.set_args({port:f,data_mode:g,mode:C,data_length:L}),t(C)},children:"start"})]})}):Object(c.jsx)("div",{children:"loading..."})},x=n(5);var p=function(){var e=Object(a.useState)(),t=Object(l.a)(e,2),n=t[0],i=t[1],r=function(){var e=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get_result()();case 2:t=e.sent,i(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){console.log("app load!"),b.start_app()}),[]),Object(x.a)((function(){r()}),1e3),n?Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{style:{height:400,width:1e3,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},children:n.map((function(e){var t=e>=.5?"red":"white";return Object(c.jsx)("div",{style:{width:190,height:190,backgroundColor:t}})}))})}):Object(c.jsx)("div",{children:"loading..."})},v=n(12),g=n(11),m=n.n(g),w=function(e){return Object(c.jsx)(m.a,{type:"line",options:{chart:{height:500,width:750,zoom:{enabled:!1},animations:{enabled:!0,easing:"linear",dynamicAnimation:{enabled:!0}}},xaxis:{type:"datetime",range:2},yaxis:{show:!1,min:0,max:200,labels:{formatter:function(e){return e.toFixed(0)}}}},series:e.dataList})},y=function(e,t,n){return e.length>50&&e.shift(),[].concat(Object(v.a)(e),[{x:t,y:n}])};var C=function(){var e=["a","b","c","d","e"].map((function(e){return{name:e,data:[]}})),t=Object(a.useState)(e),n=Object(l.a)(t,2),i=n[0],r=n[1],s=function(){var e=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get_data()();case 2:t=e.sent,console.log(t),r(i.map((function(e,n){return{name:e.name,data:y(e.data,t[0],t[n+1])}})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(x.a)((function(){s()}),100),i?Object(c.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(c.jsx)("div",{style:{width:200,height:150},children:Object(c.jsx)(w,{dataList:[i[0]]})}),Object(c.jsx)("div",{style:{width:200,height:150},children:Object(c.jsx)(w,{dataList:[i[1]]})}),Object(c.jsx)("div",{style:{width:200,height:150},children:Object(c.jsx)(w,{dataList:[i[2]]})}),Object(c.jsx)("div",{style:{width:200,height:150},children:Object(c.jsx)(w,{dataList:[i[3]]})}),Object(c.jsx)("div",{style:{width:200,height:150},children:Object(c.jsx)(w,{dataList:[i[4]]})})]}):Object(c.jsx)("div",{children:"loading..."})};var S=function(){var e=Object(a.useState)(),t=Object(l.a)(e,2),n=t[0],i=t[1],r=function(){var e=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("get_mode ok!"),e.next=3,b.get_mode()();case 3:t=e.sent,console.log(t),i(t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){r()}),[]),Object(a.useEffect)((function(){"cal"===n&&b.start_app()}),[n]),Object(x.a)((function(){"cal"==n&&r()}),1e3),"init"===n?Object(c.jsx)(f,{setMode:i}):"app"===n?Object(c.jsxs)("div",{children:[Object(c.jsx)(p,{}),Object(c.jsx)(C,{})]}):Object(c.jsx)("div",{children:"loading..."})};s.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)("div",{className:"App",children:Object(c.jsx)("header",{className:"App-header",children:Object(c.jsx)(S,{})})})}),document.getElementById("root")),o()},6:function(e,t,n){}},[[24,1,2]]]);
//# sourceMappingURL=main.2ff3b76e.chunk.js.map