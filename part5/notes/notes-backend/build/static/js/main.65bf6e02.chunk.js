(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(2),r=n(15),o=n.n(r),a=n(6),i=n(3),u=n(0),s=function(t){var e=t.notes,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[e.content," ",Object(u.jsx)("button",{onClick:n,children:c})]})},l=n(4),j=n.n(l),f="/api/notes",b={getAll:function(){return j.a.get(f).then((function(t){return t.data}))},create:function(t){return j.a.post(f,t).then((function(t){return t.data}))},update:function(t,e){return j.a.put("".concat(f,"/").concat(t),e).then((function(t){return t.data}))}},d=function(t){var e=t.message;return null===e?null:Object(u.jsx)("div",{className:"error",children:e})},p=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},m=function(){var t=Object(c.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],o=Object(c.useState)(""),l=Object(i.a)(o,2),j=l[0],f=l[1],m=Object(c.useState)(!1),O=Object(i.a)(m,2),h=O[0],v=O[1],x=Object(c.useState)(null),g=Object(i.a)(x,2),S=g[0],k=g[1];Object(c.useEffect)((function(){b.getAll().then((function(t){r(t)}))}),[]);var w=h?n:n.filter((function(t){return!0===t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(d,{message:S}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return v(!h)},children:["show ",h?"important":"all"]})}),Object(u.jsx)("ul",{children:w.map((function(t){return Object(u.jsx)(s,{notes:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});console.log("importance of ".concat(t," needs to be toggled")),b.update(t,c).then((function(e){r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(c){k("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){k(null)}),5e3),r(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:j,date:new Date};b.create(e).then((function(t){r(n.concat(t)),f("")}))},children:[Object(u.jsx)("input",{value:j,onChange:function(t){return f(t.target.value)},placeholder:"a new note..."}),Object(u.jsx)("button",{type:"submit",children:"save"})]}),Object(u.jsx)(p,{})]})};n(39);o.a.render(Object(u.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.65bf6e02.chunk.js.map