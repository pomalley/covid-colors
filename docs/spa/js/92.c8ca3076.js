"use strict";(self["webpackChunkcovid_colors"]=self["webpackChunkcovid_colors"]||[]).push([[92],{2620:(e,t,a)=>{function l(e){return{city:e["City/Town"],county:e["County"],population:Number(e["Population"]),pct_positivity:Number(e["Percent Positivity"]),daily_rate:Number(e["Average Daily Rate"]),color:e["Color"],report_date:o(e["Report Date"]),start_date:o(e["Start_Date"]),end_date:o(e["End_Date"]),testing_rate:Number(e["Testing Rate"]),avg_daily_rate:Number(e["Average Daily Rate"]),total_case_count:Number(e["Total Case Counts"]),total_positive_tests:Number(e["Total Positive Tests"]),total_tests:Number(e["Total Tests"]),total_tests_last_two_weeks:Number(e["Total Tests Last Two Weeks"]),two_week_case_counts:Number(e["Two Week Case Counts"])}}function o(e){return`20${e.substring(6,8)}-${e.substring(0,2)}-${e.substring(3,5)}`}var n;function s(e){switch(e){case n.RED:return"red";case n.ORANGE:return"orange";case n.YELLOW:return"yellow-7";case n.BLUE:return"blue"}}a.d(t,{DU:()=>s,vF:()=>l,wL:()=>n}),function(e){e["RED"]="red",e["ORANGE"]="orange",e["YELLOW"]="yellow",e["BLUE"]="blue"}(n||(n={}))},92:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Q});var l=a(9835),o=a(499),n=a(6970),s=a(1957),i=a(2620);const u={class:"column"},r={class:"column"},d={class:"column"},c=(0,l.Uk)(" Active "),m=(0,l.Uk)(" Remove "),p={class:"row items-center q-mx-md"},w=(0,l.Uk)(" No results "),f={key:0,class:"row items-center q-mx-md"};var y;(function(e){e[e["POSITIVITY"]=0]="POSITIVITY",e[e["DAILY_RATE"]=1]="DAILY_RATE"})(y||(y={}));const v=(0,l.aZ)({props:{modelValue:null,positivityThresholds:null,dailyRateThresholds:null,data:null,cityList:null},emits:["update:modelValue"],setup(e,{emit:t}){const a=e,v=new Intl.NumberFormat("en-US",{maximumSignificantDigits:3,style:"percent"}),h=new Intl.NumberFormat("en-US",{maximumSignificantDigits:3}),_=(0,o.iH)(g()),U=(0,o.iH)("");function g(){return Array.from(a.cityList.values()).sort()}function L(e,t){t((()=>{const t=e.toLowerCase();_.value=g().filter((e=>e.toLowerCase().indexOf(t)>-1))}))}function I(e){if(!e)return;const l=a.modelValue;l.name=e,t("update:modelValue",l)}function S(e,l){const o=a.modelValue;o.dataInputs[l].active=e,t("update:modelValue",o)}function V(e,l){if(null===e)return;const o=a.modelValue;o.dataInputs[l].weight=e,t("update:modelValue",o)}function T(e){if(!e||!a.cityList.has(e))return void console.log(`Invalid city: ${e}.`);if(void 0!==a.modelValue.dataInputs.find((t=>t.city===e)))return void console.log(`Cravenly refusing to add another ${e}.`);const l=a.modelValue;l.dataInputs.push({city:e,weight:50,active:!0}),t("update:modelValue",l)}function k(e){let l=-1;const o=a.modelValue;while((l=o.dataInputs.findIndex((t=>t.city===e.city)))>-1)o.dataInputs.splice(l,1);t("update:modelValue",o)}function D(){return a.modelValue.dataInputs.filter((e=>e.active)).map((e=>e.weight)).reduce(((e,t)=>e+t),0)}function E(e,t){const l=a.data[e];if(!l)throw`Unable to find record for ${e}`;switch(t){case y.DAILY_RATE:return l.daily_rate;case y.POSITIVITY:return l.pct_positivity}}function b(e){return E(e.city,y.POSITIVITY)}function R(e){return E(e.city,y.DAILY_RATE)}function W(){return a.modelValue.dataInputs.map(N).reduce(((e,t)=>e+t),0)}function N(e){return e.active?E(e.city,y.POSITIVITY)*e.weight/D():0}function q(e){return e.active?E(e.city,y.DAILY_RATE)*e.weight/D():0}function O(){return a.modelValue.dataInputs.map(q).reduce(((e,t)=>e+t),0)}function A(e){return e>=a.positivityThresholds.red?i.wL.RED:e>=a.positivityThresholds.orange?i.wL.ORANGE:e>=a.positivityThresholds.yellow?i.wL.YELLOW:i.wL.BLUE}function C(e){return e>=a.dailyRateThresholds.red?i.wL.RED:e>=a.dailyRateThresholds.orange?i.wL.ORANGE:e>=a.dailyRateThresholds.yellow?i.wL.YELLOW:i.wL.BLUE}function Y(e,t){const a=A(e),l=C(t);return a==i.wL.RED||l==i.wL.RED?i.wL.RED:a==i.wL.ORANGE||l==i.wL.ORANGE?i.wL.ORANGE:a==i.wL.YELLOW||l==i.wL.YELLOW?i.wL.YELLOW:i.wL.BLUE}return(e,t)=>{const y=(0,l.up)("q-input"),g=(0,l.up)("q-popup-edit"),D=(0,l.up)("q-chip"),E=(0,l.up)("q-item"),Z=(0,l.up)("q-slider"),j=(0,l.up)("q-toggle"),Q=(0,l.up)("q-btn"),P=(0,l.up)("q-item-section"),x=(0,l.up)("q-select"),z=(0,l.up)("q-list"),$=(0,l.up)("q-card");return(0,l.wg)(),(0,l.j4)($,{class:"q-ma-md",bordered:"",style:{}},{default:(0,l.w5)((()=>[(0,l.Wm)(z,null,{default:(0,l.w5)((()=>[(0,l.Wm)(E,{class:"justify-center"},{default:(0,l.w5)((()=>[(0,l.Wm)(D,{color:(0,o.SU)(i.DU)(Y(W(),O())),size:"xl"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(a.modelValue.name||"[unnamed config]")+" ",1),(0,l.Wm)(g,{"auto-save":"",title:"New Name","model-value":a.modelValue.name,"onUpdate:modelValue":I},{default:(0,l.w5)((e=>[(0,l.Wm)(y,{modelValue:e.value,"onUpdate:modelValue":t=>e.value=t,dense:"",autofocus:"",counter:"",onKeyup:(0,s.D2)(e.set,["enter"])},null,8,["modelValue","onUpdate:modelValue","onKeyup"])])),_:1},8,["model-value"])])),_:1},8,["color"])])),_:1}),(0,l.Wm)(E,{class:"justify-center"},{default:(0,l.w5)((()=>[(0,l.Wm)(D,{color:(0,o.SU)(i.DU)(A(W()))},{default:(0,l.w5)((()=>[(0,l.Uk)(" Net positivity: "+(0,n.zw)((0,o.SU)(v).format(W())),1)])),_:1},8,["color"]),(0,l.Wm)(D,{color:(0,o.SU)(i.DU)(C(O()))},{default:(0,l.w5)((()=>[(0,l.Uk)(" Net daily rate: "+(0,n.zw)((0,o.SU)(h).format(O())),1)])),_:1},8,["color"])])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(a.modelValue.dataInputs,((e,t)=>((0,l.wg)(),(0,l.j4)(E,{key:e.city,class:"row justify-center"},{default:(0,l.w5)((()=>[(0,l._)("div",u,[(0,l.Wm)(D,{color:(0,o.SU)(i.DU)(Y(b(e),R(e)))},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.city),1)])),_:2},1032,["color"]),(0,l.Wm)(D,{color:(0,o.SU)(i.DU)(A(b(e)))},{default:(0,l.w5)((()=>[(0,l.Uk)(" Positivity: "+(0,n.zw)((0,o.SU)(v).format(b(e))),1)])),_:2},1032,["color"]),(0,l.Wm)(D,{color:(0,o.SU)(i.DU)(C(R(e)))},{default:(0,l.w5)((()=>[(0,l.Uk)(" Daily Rate: "+(0,n.zw)((0,o.SU)(h).format(R(e))),1)])),_:2},1032,["color"])]),(0,l._)("div",r,[(0,l.Wm)(Z,{"model-value":e.weight,"onUpdate:modelValue":e=>V(e,t),min:0,max:100,label:"","label-always":""},null,8,["model-value","onUpdate:modelValue"]),(0,l.Uk)(" Contribution: "+(0,n.zw)((0,o.SU)(v).format(N(e)))+" "+(0,n.zw)((0,o.SU)(h).format(q(e))),1)]),(0,l._)("div",d,[(0,l.Wm)(j,{"model-value":e.active,"onUpdate:modelValue":e=>S(e,t)},{default:(0,l.w5)((()=>[c])),_:2},1032,["model-value","onUpdate:modelValue"]),(0,l.Wm)(Q,{onClick:t=>k(e),color:"primary",rounded:"",outline:""},{default:(0,l.w5)((()=>[m])),_:2},1032,["onClick"])])])),_:2},1024)))),128)),(0,l.Wm)(E,{class:"row justify-center"},{default:(0,l.w5)((()=>[(0,l._)("div",p,[(0,l.Wm)(x,{dense:"",outlined:"",modelValue:U.value,"onUpdate:modelValue":[t[0]||(t[0]=e=>U.value=e),t[1]||(t[1]=e=>{T(e),U.value=""})],label:"Add City","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",options:_.value,onFilter:L,class:"q-px-sm",autocomplete:"new-password"},{"no-option":(0,l.w5)((()=>[(0,l.Wm)(E,null,{default:(0,l.w5)((()=>[(0,l.Wm)(P,{class:"text-grey"},{default:(0,l.w5)((()=>[w])),_:1})])),_:1})])),_:1},8,["modelValue","options"])]),e.$slots.footer?((0,l.wg)(),(0,l.iD)("div",f,[(0,l.WI)(e.$slots,"footer")])):(0,l.kq)("",!0)])),_:3})])),_:3})])),_:3})}}});var h=a(4458),_=a(3246),U=a(490),g=a(7691),L=a(9843),I=a(6611),S=a(8423),V=a(592),T=a(9379),k=a(9867),D=a(1233),E=a(9984),b=a.n(E);const R=v,W=R;b()(v,"components",{QCard:h.Z,QList:_.Z,QItem:U.Z,QChip:g.Z,QPopupEdit:L.Z,QInput:I.Z,QSlider:S.Z,QToggle:V.Z,QBtn:T.Z,QSelect:k.Z,QItemSection:D.Z});const N={key:1,class:"column justify-evenly",style:{width:"100%"}},q=(0,l.Uk)(" Delete Config "),O={class:"row justify-center"},A={class:"row q-ma-sm justify-center"},C=(0,l.aZ)({props:{data:null,cityList:null,dateList:null,positivityThresholds:null,dailyRateThresholds:null},setup(e){const t=e;function a(){const e={};return t.data.forEach((t=>{t.report_date===s.value&&(e[t.city]=t)})),e}(0,l.bv)((()=>{p()}));const s=(0,o.iH)("");function i(){return Array.from(t.dateList.values()).sort().reverse()}(0,l.YP)(t.dateList,(()=>{s.value=i()[0]}));const u=(0,o.qj)([]),r=(0,o.qj)({name:"",dataInputs:[]});function d(){if(!r.name)return;const e=u.find((e=>e.name===r.name));e?e.dataInputs=JSON.parse(JSON.stringify(r.dataInputs)):u.push(JSON.parse(JSON.stringify(r))),r.name="",r.dataInputs=[]}function c(e){u.splice(e,1)}const m="dataConfigs";function p(){const e=localStorage.getItem(m);e&&Object.assign(u,JSON.parse(e))}return(0,l.YP)(u,(e=>{localStorage.setItem(m,JSON.stringify(e))})),(t,m)=>{const p=(0,l.up)("q-spinner-hearts"),w=(0,l.up)("q-btn"),f=(0,l.up)("q-select"),y=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(y,{class:"row items-center justify-evenly"},{default:(0,l.w5)((()=>[e.data&&0!==e.data.length?(0,l.kq)("",!0):((0,l.wg)(),(0,l.j4)(p,{key:0,size:"40%",color:"pink"})),e.data&&e.data.length>0?((0,l.wg)(),(0,l.iD)("div",N,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,o.SU)(u),((t,n)=>((0,l.wg)(),(0,l.j4)(W,{key:t.name,"selected-date":s.value,"positivity-thresholds":e.positivityThresholds,"daily-rate-thresholds":e.dailyRateThresholds,data:a(),"city-list":e.cityList,modelValue:(0,o.SU)(u)[n],"onUpdate:modelValue":e=>(0,o.SU)(u)[n]=e},{footer:(0,l.w5)((()=>[(0,l.Wm)(w,{color:"warning",outline:"",onClick:()=>c(n)},{default:(0,l.w5)((()=>[q])),_:2},1032,["onClick"])])),_:2},1032,["selected-date","positivity-thresholds","daily-rate-thresholds","data","city-list","modelValue","onUpdate:modelValue"])))),128)),(0,l.Wm)(W,{"selected-date":s.value,"positivity-thresholds":e.positivityThresholds,"daily-rate-thresholds":e.dailyRateThresholds,data:a(),"city-list":e.cityList,modelValue:(0,o.SU)(r),"onUpdate:modelValue":m[0]||(m[0]=e=>(0,o.dq)(r)?r.value=e:r=e)},{footer:(0,l.w5)((()=>[(0,l._)("div",O,[(0,l.Wm)(w,{color:"secondary",outline:"",class:"q-ma-xs",onClick:d,disable:!(0,o.SU)(r).name||!(0,o.SU)(r).dataInputs.length},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)((0,o.SU)(r).name?(0,o.SU)(r).dataInputs.length?`Save "${(0,o.SU)(r).name}"`:"Add a city":"Set a name"),1)])),_:1},8,["disable"])])])),_:1},8,["selected-date","positivity-thresholds","daily-rate-thresholds","data","city-list","modelValue"]),(0,l._)("div",A,[(0,l.Wm)(f,{rounded:"",outlined:"",modelValue:s.value,"onUpdate:modelValue":m[1]||(m[1]=e=>s.value=e),label:"Report Date",options:i()},null,8,["modelValue","options"])])])):(0,l.kq)("",!0)])),_:1})}}});var Y=a(9885),Z=a(4090);const j=C,Q=j;b()(C,"components",{QPage:Y.Z,QSpinnerHearts:Z.Z,QBtn:T.Z,QSelect:k.Z})}}]);