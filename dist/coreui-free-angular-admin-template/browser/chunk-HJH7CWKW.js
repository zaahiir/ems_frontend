import{a as te}from"./chunk-O4BR7GYM.js";import{a as ie}from"./chunk-AJEUVWKL.js";import{Aa as j,B as M,Ba as B,Ga as P,Ha as $,Ja as z,M as k,Ma as H,N as V,Na as J,Oa as K,P as I,Pa as Q,Q as q,Ra as W,Ta as X,U as O,Ua as Z,V as T,Va as ee,Z as R,_ as L,q as _,x as D,y as N,ya as U,za as u}from"./chunk-K3LN6DFK.js";import{Ga as s,Ia as m,Lb as E,Mb as A,S as g,Sa as t,Sb as b,Ta as o,Ua as w,Ya as F,Z as f,_ as h,_a as v,fc as x,jb as e,k as G,kb as S,pa as l,qa as y,sb as Y}from"./chunk-WAGJM7NU.js";import{f as re,g as p}from"./chunk-MYAK5QVS.js";var c=re(ie());function ne(i,d){if(i&1&&(t(0,"option",16),e(1),o()),i&2){let n=d.$implicit;m("value",n.id),l(),S(n.amcName)}}function ae(i,d){i&1&&(t(0,"c-form-feedback",17),e(1,"Please select an AMC."),o()),i&2&&m("valid",!1)}function me(i,d){i&1&&(t(0,"c-form-feedback",17),e(1,"Please provide an AUM."),o()),i&2&&m("valid",!1)}function le(i,d){i&1&&(t(0,"c-form-feedback",17),e(1,"Please select a date."),o()),i&2&&m("valid",!1)}var _e=(()=>{class i{constructor(n,a,r){this.fb=n,this.router=a,this.aumEntryYoyGrowthService=r,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.amc=[],this.aumYoyGrowthEntryForm=this.fb.group({aumYoyGrowthAmcName:["",u.required],aumYoyGrowthAmount:["",[u.required,u.min(0)]],aumYoyGrowthDate:["",u.required]})}ngOnInit(){return p(this,null,function*(){try{yield this.loadAmcData()}catch(n){console.error("Error initializing component:",n),yield c.default.fire("Error","Failed to load AMC data. Please try again.","error")}})}get f(){return this.aumYoyGrowthEntryForm.controls}loadAmcData(){return p(this,null,function*(){try{let n=yield this.aumEntryYoyGrowthService.getAmc();this.amc=n.data}catch(n){throw console.error("Error loading AMC data:",n),n}})}onSubmit(){return p(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.aumYoyGrowthEntryForm.invalid){let a=Object.keys(this.aumYoyGrowthEntryForm.controls).filter(r=>this.aumYoyGrowthEntryForm.get(r)?.invalid).map(r=>{switch(r){case"aumYoyGrowthAmcName":return"AMC Name";case"aumYoyGrowthAmount":return"AUM YoY Growth Amount";case"aumYoyGrowthDate":return"AUM YoY Growth Date";default:return r}});yield c.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br>${a.join("<br>")}`,icon:"error"});return}if(this.loading)return;this.loading=!0;let n={aumYoyGrowthAmcName:this.f.aumYoyGrowthAmcName.value,aumYoyGrowthAmount:this.f.aumYoyGrowthAmount.value,aumYoyGrowthDate:this.f.aumYoyGrowthDate.value,hideStatus:0};try{let a=yield G(this.aumEntryYoyGrowthService.processAumYoyGrowthEntry(n,"0"));a.code===1?(yield c.default.fire("Added!",a.message,"success"),this.router.navigate(["/forms/yoyGrowth"])):yield c.default.fire("Failed!",a.message,"error")}catch(a){console.error("Error processing AUM YoY Growth entry:",a),yield c.default.fire("Failed!","An error occurred while processing the entry.","error")}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.aumYoyGrowthEntryForm.reset()}static{this.\u0275fac=function(a){return new(a||i)(y(X),y(x),y(te))}}static{this.\u0275cmp=g({type:i,selectors:[["app-create-aum-entry-yoy-growth"]],standalone:!0,features:[Y],decls:66,vars:9,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","id","validationCustom01","formControlName","aumYoyGrowthAmcName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","aumYoyGrowthAmount","required","","type","number","step","0.01","placeholder","AUM"],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","required","","type","date","formControlName","aumYoyGrowthDate","placeholder","Date"],["cLabel","","for","validationCustom03",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"value"],[3,"valid"]],template:function(a,r){if(a&1){let C=F();t(0,"c-row"),e(1,`
  `),t(2,"c-col",1),e(3,`
    `),t(4,"c-card",2),e(5,`
      `),t(6,"c-card-header"),e(7,`
        `),t(8,"strong"),e(9,"New AUM YOY Growth Entry Form"),o(),e(10,`
      `),o(),e(11,`
      `),t(12,"c-card-body"),e(13,` 
        `),t(14,"form",3,0),v("ngSubmit",function(){return f(C),h(r.onSubmit())}),e(16,`
          `),t(17,"c-col",4),e(18,`
            `),t(19,"select",5),e(20,`
              `),t(21,"option",6),e(22,"Select an AMC"),o(),e(23,`
              `),s(24,ne,2,2,"option",7),e(25,`
            `),o(),e(26,`
            `),t(27,"label",8),e(28,"AMC Name"),o(),e(29,`
            `),s(30,ae,2,1,"c-form-feedback",9),e(31,`
          `),o(),e(32,`

          `),t(33,"c-col",4),e(34,`
            `),w(35,"input",10),e(36,`
            `),t(37,"label",11),e(38,"AUM"),o(),e(39,`
            `),s(40,me,2,1,"c-form-feedback",9),e(41,`
          `),o(),e(42,`

          `),t(43,"c-col",4),e(44,`
            `),w(45,"input",12),e(46,`
            `),t(47,"label",13),e(48,"Date"),o(),e(49,`
            `),s(50,le,2,1,"c-form-feedback",9),e(51,`
          `),o(),e(52,`

          `),t(53,"c-col",1),e(54,`
            `),t(55,"button",14),e(56,`
              Save
            `),o(),e(57,`
            `),t(58,"button",15),v("click",function(){return f(C),h(r.onReset())}),e(59,`
              Reset
            `),o(),e(60,`
          `),o(),e(61,`
        `),o(),e(62,`
      `),o(),e(63,`
    `),o(),e(64,`
  `),o(),e(65,`
`),o()}a&2&&(l(14),m("formGroup",r.aumYoyGrowthEntryForm)("validated",r.customStylesValidated),l(3),m("cFormFloating",!0),l(7),m("ngForOf",r.amc),l(6),m("ngIf",r.f.aumYoyGrowthAmcName.errors&&(r.f.aumYoyGrowthAmcName.touched||r.submitted)),l(3),m("cFormFloating",!0),l(7),m("ngIf",r.f.aumYoyGrowthAmount.errors&&(r.f.aumYoyGrowthAmount.touched||r.submitted)),l(3),m("cFormFloating",!0),l(7),m("ngIf",r.f.aumYoyGrowthDate.errors&&(r.f.aumYoyGrowthDate.touched||r.submitted)))},dependencies:[A,b,E,L,R,D,T,M,N,ee,P,K,Q,U,$,J,j,B,W,z,H,Z,k,q,O,V,I,_]})}}return i})();export{_e as CreateAumEntryYoyGrowthComponent};
