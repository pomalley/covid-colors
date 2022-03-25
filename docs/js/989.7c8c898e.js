"use strict";(self["webpackChunkcovid_colors"]=self["webpackChunkcovid_colors"]||[]).push([[989],{2620:(e,t,o)=>{function l(e){return{city:e["City/Town"],county:e["County"],population:Number(e["Population"]),pct_positivity:Number(e["Percent Positivity"]),daily_rate:Number(e["Average Daily Rate"]),color:e["Color"],report_date:a(e["Report Date"]),start_date:a(e["Start_Date"]),end_date:a(e["End_Date"]),testing_rate:Number(e["Testing Rate"]),avg_daily_rate:Number(e["Average Daily Rate"]),total_case_count:Number(e["Total Case Counts"]),total_positive_tests:Number(e["Total Positive Tests"]),total_tests:Number(e["Total Tests"]),total_tests_last_two_weeks:Number(e["Total Tests Last Two Weeks"]),two_week_case_counts:Number(e["Two Week Case Counts"])}}function a(e){return`20${e.substring(6,8)}-${e.substring(0,2)}-${e.substring(3,5)}`}var i;function n(e){switch(e){case i.RED:return"red";case i.ORANGE:return"orange";case i.YELLOW:return"yellow-7";case i.BLUE:return"blue"}}o.d(t,{DU:()=>n,vF:()=>l,wL:()=>i}),function(e){e["RED"]="red",e["ORANGE"]="orange",e["YELLOW"]="yellow",e["BLUE"]="blue"}(i||(i={}))},989:(e,t,o)=>{o.r(t),o.d(t,{default:()=>b});var l=o(9835),a=o(6970),i=o(499),n=o(2620);const r=(0,l.Uk)("Active"),u=(0,l.Uk)(" Remove "),s=(0,l.Uk)(" No results "),c=(0,l.Uk)(" Add ");var d;(function(e){e[e["POSITIVITY"]=0]="POSITIVITY",e[e["DAILY_RATE"]=1]="DAILY_RATE"})(d||(d={}));const w=(0,l.aZ)({props:{data:null,cityList:null,dateList:null,positivityThresholds:null,dailyRateThresholds:null},setup(e){const t=e,o=new Intl.NumberFormat("en-US",{maximumSignificantDigits:3,style:"percent"}),w=new Intl.NumberFormat("en-US",{maximumSignificantDigits:3}),m=(0,i.iH)(f()),p=(0,i.iH)("");function f(){return Array.from(t.cityList.values()).sort()}function y(){return Array.from(t.dateList.values()).sort().reverse()}function L(e,t){t((()=>{const t=e.toLowerCase();m.value=f().filter((e=>e.toLowerCase().indexOf(t)>-1))}))}const v=(0,i.iH)("");(0,l.YP)(t.dateList,(()=>{v.value=y()[0]}));const _=(0,i.qj)([]);function g(e){e&&t.cityList.has(e)?void 0===_.find((t=>t.city===e))?_.push({city:e,weight:50,active:!0}):console.log(`Cravenly refusing to add another ${e}.`):console.log(`Invalid city: ${e}.`)}function h(e){let t=-1;while((t=_.findIndex((t=>t.city===e.city)))>-1)_.splice(t,1)}function U(){return _.filter((e=>e.active)).map((e=>e.weight)).reduce(((e,t)=>e+t),0)}function T(e,o,l){const a=t.data.find((t=>t.city===e&&t.report_date===o));if(!a)throw`Unable to find record for ${e} and report date ${o}`;switch(l){case d.DAILY_RATE:return a.daily_rate;case d.POSITIVITY:return a.pct_positivity}}function E(e){return T(e.city,v.value,d.POSITIVITY)}function R(e){return T(e.city,v.value,d.DAILY_RATE)}function b(){return _.map(k).reduce(((e,t)=>e+t),0)}function k(e){return e.active?T(e.city,v.value,d.POSITIVITY)*e.weight/U():0}function D(e){return e.active?T(e.city,v.value,d.DAILY_RATE)*e.weight/U():0}function I(){return _.map(D).reduce(((e,t)=>e+t),0)}function A(e){return e>=t.positivityThresholds.red?n.wL.RED:e>=t.positivityThresholds.orange?n.wL.ORANGE:e>=t.positivityThresholds.yellow?n.wL.YELLOW:n.wL.BLUE}function S(e){return e>=t.dailyRateThresholds.red?n.wL.RED:e>=t.dailyRateThresholds.orange?n.wL.ORANGE:e>=t.dailyRateThresholds.yellow?n.wL.YELLOW:n.wL.BLUE}function W(e,t){const o=A(e),l=S(t);return o==n.wL.RED||l==n.wL.RED?n.wL.RED:o==n.wL.ORANGE||l==n.wL.ORANGE?n.wL.ORANGE:o==n.wL.YELLOW||l==n.wL.YELLOW?n.wL.YELLOW:n.wL.BLUE}return(t,d)=>{const f=(0,l.up)("q-spinner-hearts"),U=(0,l.up)("q-item"),T=(0,l.up)("q-chip"),N=(0,l.up)("q-slider"),O=(0,l.up)("q-toggle"),V=(0,l.up)("q-btn"),Y=(0,l.up)("q-item-section"),C=(0,l.up)("q-select"),q=(0,l.up)("q-list"),P=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(P,{class:"row items-center justify-evenly"},{default:(0,l.w5)((()=>[e.data&&0!==e.data.length?(0,l.kq)("",!0):((0,l.wg)(),(0,l.j4)(f,{key:0,size:"40%",color:"pink"})),e.data&&e.data.length>0?((0,l.wg)(),(0,l.j4)(q,{key:1},{default:(0,l.w5)((()=>[(0,l.Wm)(U,null,{default:(0,l.w5)((()=>[(0,l.Uk)(" Net positivity: "+(0,a.zw)((0,i.SU)(o).format(b())),1)])),_:1}),(0,l.Wm)(U,null,{default:(0,l.w5)((()=>[(0,l.Uk)(" Net daily rate: "+(0,a.zw)((0,i.SU)(w).format(I())),1)])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,i.SU)(_),(e=>((0,l.wg)(),(0,l.j4)(U,{key:e.city},{default:(0,l.w5)((()=>[(0,l.Wm)(T,{color:(0,i.SU)(n.DU)(W(E(e),R(e)))},{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(e.city),1)])),_:2},1032,["color"]),(0,l.Wm)(T,{color:(0,i.SU)(n.DU)(A(E(e)))},{default:(0,l.w5)((()=>[(0,l.Uk)(" Positivity: "+(0,a.zw)((0,i.SU)(o).format(E(e))),1)])),_:2},1032,["color"]),(0,l.Wm)(T,{color:(0,i.SU)(n.DU)(S(R(e)))},{default:(0,l.w5)((()=>[(0,l.Uk)(" Daily Rate: "+(0,a.zw)((0,i.SU)(w).format(R(e))),1)])),_:2},1032,["color"]),(0,l.Wm)(N,{modelValue:e.weight,"onUpdate:modelValue":t=>e.weight=t,min:0,max:100,label:"","label-always":""},null,8,["modelValue","onUpdate:modelValue"]),(0,l.Uk)(" Contribution: "+(0,a.zw)((0,i.SU)(o).format(k(e)))+" "+(0,a.zw)((0,i.SU)(w).format(D(e)))+" ",1),(0,l.Wm)(O,{modelValue:e.active,"onUpdate:modelValue":t=>e.active=t},{default:(0,l.w5)((()=>[r])),_:2},1032,["modelValue","onUpdate:modelValue"]),(0,l.Wm)(V,{onClick:t=>h(e),color:"primary",rounded:"",outline:""},{default:(0,l.w5)((()=>[u])),_:2},1032,["onClick"])])),_:2},1024)))),128)),(0,l.Wm)(U,null,{default:(0,l.w5)((()=>[(0,l.Wm)(C,{rounded:"",outlined:"",modelValue:p.value,"onUpdate:modelValue":d[0]||(d[0]=e=>p.value=e),label:"Add City","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",options:m.value,onFilter:L},{"no-option":(0,l.w5)((()=>[(0,l.Wm)(U,null,{default:(0,l.w5)((()=>[(0,l.Wm)(Y,{class:"text-grey"},{default:(0,l.w5)((()=>[s])),_:1})])),_:1})])),_:1},8,["modelValue","options"]),(0,l.Wm)(V,{onClick:d[1]||(d[1]=()=>{g(p.value),p.value=""}),disable:!(p.value&&e.cityList.has(p.value)),color:"primary",rounded:""},{default:(0,l.w5)((()=>[c])),_:1},8,["disable"])])),_:1}),(0,l.Wm)(U,null,{default:(0,l.w5)((()=>[(0,l.Wm)(C,{rounded:"",outlined:"",modelValue:v.value,"onUpdate:modelValue":d[2]||(d[2]=e=>v.value=e),label:"Report Date",options:y()},null,8,["modelValue","options"])])),_:1})])),_:1})):(0,l.kq)("",!0)])),_:1})}}});var m=o(9885),p=o(4090),f=o(3246),y=o(490),L=o(7691),v=o(8423),_=o(592),g=o(9379),h=o(769),U=o(1233),T=o(9984),E=o.n(T);const R=w,b=R;E()(w,"components",{QPage:m.Z,QSpinnerHearts:p.Z,QList:f.Z,QItem:y.Z,QChip:L.Z,QSlider:v.Z,QToggle:_.Z,QBtn:g.Z,QSelect:h.Z,QItemSection:U.Z})}}]);