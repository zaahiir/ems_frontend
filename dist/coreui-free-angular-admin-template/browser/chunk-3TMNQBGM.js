import{a as re}from"./chunk-ZHEVBZ5L.js";import{a as oe}from"./chunk-AJEUVWKL.js";import{Aa as $,B as q,Ba as H,Ga as J,Ja as K,M as T,Ma as Q,N as L,Na as W,Oa as X,P as G,Pa as Y,Q as R,Ra as Z,Ta as ee,U as j,Ua as te,V as O,Va as ie,Z as P,_ as B,q as w,x as k,y as V,ya as z,za as f}from"./chunk-K3LN6DFK.js";import{Bb as I,Ga as c,Ia as m,Lb as M,Mb as _,S,Sa as r,Sb as D,Ta as n,Ua as A,Ya as E,Z as h,_ as g,_a as F,dc as N,fc as U,jb as e,k as C,kb as b,pa as d,qa as l,sb as x}from"./chunk-WAGJM7NU.js";import{f as ne,g as y}from"./chunk-MYAK5QVS.js";var s=ne(oe());function ae(o,p){o&1&&(r(0,"c-form-feedback",18),e(1,"Please provide a Name."),n()),o&2&&m("valid",!1)}function me(o,p){o&1&&(r(0,"c-form-feedback",18),e(1,"Please select a date."),n()),o&2&&m("valid",!1)}function de(o,p){o&1&&(r(0,"c-form-feedback",18),e(1,"Please provide an AUM."),n()),o&2&&m("valid",!1)}function se(o,p){if(o&1&&(r(0,"option",19),e(1),n()),o&2){let i=p.$implicit;m("value",i.id),d(),b(i.modeName)}}function ue(o,p){o&1&&(r(0,"c-form-feedback",18),e(1,"Please select a Mode."),n()),o&2&&m("valid",!1)}var De=(()=>{class o{constructor(i,a,t,u,v){this.fb=i,this.router=a,this.route=t,this.industryAumEntryService=u,this.cdr=v,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.aumId="0",this.modes=[],this.industryAumUpdateForm=this.fb.group({industryName:["",f.required],industryAumDate:["",f.required],industryAumAmount:["",f.required],industryAumMode:["",f.required]})}ngOnInit(){return y(this,null,function*(){try{yield this.loadModes();let i=yield new Promise(a=>this.route.params.subscribe(t=>a(t)));this.aumId=i.id||"0",yield this.loadIndustryAumData()}catch(i){console.error("Error initializing component:",i),yield s.default.fire("Error","Failed to initialize the component","error")}})}get f(){return this.industryAumUpdateForm.controls}loadModes(){return y(this,null,function*(){try{let i=yield this.industryAumEntryService.getMode();this.modes=i.data,this.cdr.detectChanges()}catch(i){console.error("Error loading Modes:",i),yield s.default.fire("Error","Failed to load Mode data","error")}})}loadIndustryAumData(){return y(this,null,function*(){try{let i=yield this.industryAumEntryService.getAumById(this.aumId.toString()).toPromise();if(i&&i.code===1&&i.data){let a=i.data,t=this.modes.find(u=>u.modeName===a.industryAumMode)?.id;this.industryAumUpdateForm.patchValue({industryName:a.industryName,industryAumDate:a.industryAumDate,industryAumAmount:a.industryAumAmount,industryAumMode:t}),this.cdr.detectChanges()}else console.error("Invalid response structure:",i)}catch(i){console.error("Error loading AUM data:",i),yield s.default.fire("Error","Failed to load AUM data","error")}})}onSubmit(){return y(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.industryAumUpdateForm.invalid){let t=this.getMissingFields();yield s.default.fire({title:"Missing Required Fields",html:`Please fill in the following required fields:<br>${t.join("<br>")}`,icon:"error"});return}let i=this.industryAumUpdateForm.value,a={industryName:i.industryName,industryAumDate:i.industryAumDate,industryAumAmount:i.industryAumAmount,industryAumMode:i.industryAumMode,hideStatus:0};this.loading=!0;try{let t=yield C(this.industryAumEntryService.processIndustryAumEntry(a,this.aumId));t.code===1?(yield s.default.fire("Updated!",t.message,"success"),this.router.navigate(["/forms/industryAum"])):yield s.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error updating Industry AUM entry:",t),yield s.default.fire("Failed!",t instanceof Error?t.message:"An unknown error occurred","error")}finally{this.loading=!1}})}getMissingFields(){let i=[];return Object.keys(this.f).forEach(a=>{this.f[a].errors?.required&&i.push(this.getFieldName(a))}),i}getFieldName(i){return{industryName:"Industry Name",industryAumDate:"Industry AUM Date",industryAumAmount:"Industry AUM Amount",industryAumMode:"Industry AUM Mode"}[i]||i}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/forms/industryAum"])}static{this.\u0275fac=function(a){return new(a||o)(l(ee),l(U),l(N),l(re),l(I))}}static{this.\u0275cmp=S({type:o,selectors:[["app-update-industry-aum-entry"]],standalone:!0,features:[x],decls:76,vars:11,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","industryName","required","","type","text","placeholder","Name"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","industryAumDate","required","","type","date","placeholder","Date"],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","industryAumAmount","required","","type","text","placeholder","AUM"],["cLabel","","for","validationCustom03",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom04","formControlName","industryAumMode","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom04",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"valid"],[3,"value"]],template:function(a,t){if(a&1){let u=E();r(0,"c-row"),e(1,`
  `),r(2,"c-col",1),e(3,`
    `),r(4,"c-card",2),e(5,`
      `),r(6,"c-card-header"),e(7,`
        `),r(8,"strong"),e(9,"Update Industry AUM Entry Form"),n(),e(10,`
      `),n(),e(11,`
      `),r(12,"c-card-body"),e(13,`
        `),r(14,"form",3,0),F("ngSubmit",function(){return h(u),g(t.onSubmit())}),e(16,`
          `),r(17,"c-col",4),e(18,`
            `),A(19,"input",5),e(20,`
            `),r(21,"label",6),e(22,"Name"),n(),e(23,`
            `),c(24,ae,2,1,"c-form-feedback",7),e(25,`
          `),n(),e(26,`

          `),r(27,"c-col",4),e(28,`
            `),A(29,"input",8),e(30,`
            `),r(31,"label",9),e(32,"Date"),n(),e(33,`
            `),c(34,me,2,1,"c-form-feedback",7),e(35,`
          `),n(),e(36,`

          `),r(37,"c-col",4),e(38,`
            `),A(39,"input",10),e(40,`
            `),r(41,"label",11),e(42,"AUM"),n(),e(43,`
            `),c(44,de,2,1,"c-form-feedback",7),e(45,`
          `),n(),e(46,`

          `),r(47,"c-col",4),e(48,`
            `),r(49,"select",12),e(50,`
              `),r(51,"option",13),e(52,"Select a Mode"),n(),e(53,`
              `),c(54,se,2,2,"option",14),e(55,`
            `),n(),e(56,`
            `),r(57,"label",15),e(58,"Mode"),n(),e(59,`
            `),c(60,ue,2,1,"c-form-feedback",7),e(61,`
          `),n(),e(62,`

          `),r(63,"c-col",1),e(64,`
            `),r(65,"button",16),e(66,`
              Update
            `),n(),e(67,`
            `),r(68,"button",17),F("click",function(){return h(u),g(t.onCancel())}),e(69,`
              Cancel
            `),n(),e(70,`
          `),n(),e(71,`
        `),n(),e(72,`
      `),n(),e(73,`
    `),n(),e(74,`
  `),n(),e(75,`
`),n()}a&2&&(d(14),m("formGroup",t.industryAumUpdateForm)("validated",t.customStylesValidated),d(3),m("cFormFloating",!0),d(7),m("ngIf",t.f.industryName.errors&&(t.f.industryName.touched||t.submitted)),d(3),m("cFormFloating",!0),d(7),m("ngIf",t.f.industryAumDate.errors&&(t.f.industryAumDate.touched||t.submitted)),d(3),m("cFormFloating",!0),d(7),m("ngIf",t.f.industryAumAmount.errors&&(t.f.industryAumAmount.touched||t.submitted)),d(3),m("cFormFloating",!0),d(7),m("ngForOf",t.modes),d(6),m("ngIf",t.f.industryAumMode.errors&&(t.f.industryAumMode.touched||t.submitted)))},dependencies:[D,M,_,B,P,k,q,O,V,ie,J,X,Y,z,W,$,H,Z,K,Q,te,T,R,j,L,G,w]})}}return o})();export{De as UpdateIndustryAumEntryComponent};
