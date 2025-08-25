import{s as y,a as m}from"./index-OWGvG8Ug.js";import{B as v,s as x,c as i,o as l,r as g,m as C,d,a as w,b as $,u as t,e as k,f as B,g as p,h as a,w as A,n as b,i as D,j as S}from"./index-C85iR68a.js";import{u as V,a as W,c as G}from"./useWeather-cCbYSWMa.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";var I=`
    .p-buttongroup {
        display: inline-flex;
    }

    .p-buttongroup .p-button {
        margin: 0;
    }

    .p-buttongroup .p-button:not(:last-child),
    .p-buttongroup .p-button:not(:last-child):hover {
        border-inline-end: 0 none;
    }

    .p-buttongroup .p-button:not(:first-of-type):not(:last-of-type) {
        border-radius: 0;
    }

    .p-buttongroup .p-button:first-of-type:not(:only-of-type) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-buttongroup .p-button:last-of-type:not(:only-of-type) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-buttongroup .p-button:focus {
        position: relative;
        z-index: 1;
    }
`,R={root:"p-buttongroup p-component"},P=v.extend({name:"buttongroup",style:I,classes:R}),j={name:"BaseButtonGroup",extends:x,style:P,provide:function(){return{$pcButtonGroup:this,$parentInstance:this}}},_={name:"ButtonGroup",extends:j,inheritAttrs:!1};function z(o,e,n,r,u,s){return l(),i("span",C({class:o.cx("root"),role:"group"},o.ptmi("root")),[g(o.$slots,"default")],16)}_.render=z;const H={colorScheme:{light:{color:"#fff",background:"#4380AD",overlay:{color:"#fff",background:"#2F73A5",border:{color:"#1A669C"}},option:{color:"#fff",focus:{color:"#fff",background:"#4380AD"},selected:{color:"#fff",background:"#4380AD",focus:{color:"#fff",background:"#4380AD"}}},border:{color:"rgba(233, 233, 243, 0.1)"},hover:{border:{color:"rgba(255,255,255,0.3)"}},focus:{border:{color:"#1A669C"}},placeholder:{color:"#fff"},dropdown:{color:"#fff"}}}},L=d({__name:"CitySelect",setup(o){const e=V(),n=W();function r(){n.initCurrentWeather({city:e.currentCity.id}),n.initDayWeather({city:e.currentCity.id}),n.initWeakWeather({city:e.currentCity.id})}const u=w(H);return(s,c)=>(l(),$(t(y),{modelValue:t(e).currentCity,"onUpdate:modelValue":c[0]||(c[0]=h=>t(e).currentCity=h),options:t(G),dt:u.value,"option-label":"name.ru","scroll-height":"15rem",placeholder:"Выберите город",class:"inline-flex items-center text-sm md:text-xl w-full md:w-56",onChange:r},null,8,["modelValue","options","dt"]))}}),N=f(L,[["__scopeId","data-v-11b588cb"]]),E={class:"flex justify-between space-y-4 sm:space-y-0 sm:space-x-5 flex-col sm:flex-row"},F={class:"nav"},U=d({__name:"AppHeader",setup(o){const e=D(),n=B(),r=k(()=>n.path);return(u,s)=>(l(),i("header",E,[p("nav",F,[a(t(_),{class:"text-sm md:text-xl"},{default:A(()=>[a(t(m),{label:"Главная",class:b(["nav__item",{active:r.value==="/"}]),onClick:s[0]||(s[0]=c=>t(e).push({path:"/"}))},null,8,["class"]),a(t(m),{label:"Погода за неделю",class:b(["nav__item",{active:r.value==="/weather-for-week"}]),onClick:s[1]||(s[1]=c=>t(e).push({path:"/weather-for-week"}))},null,8,["class"])]),_:1})]),a(t(N))]))}}),q=f(U,[["__scopeId","data-v-b3b4dc6a"]]),J={class:"main flex flex-grow flex-col p-3 md:p-10"},K={class:"flex flex-col flex-grow mt-8 md:mt-14"},M=d({__name:"DefaultLayout",setup(o){return(e,n)=>{const r=S("RouterView");return l(),i("div",J,[p("div",null,[a(t(q))]),p("main",K,[a(r)])])}}}),Y=f(M,[["__scopeId","data-v-3f6ca15b"]]);export{Y as default};
