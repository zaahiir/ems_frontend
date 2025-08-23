import{a as ie}from"./chunk-3IPB5M6Y.js";import{a as ne}from"./chunk-AJEUVWKL.js";import{Aa as B,B as V,Ba as $,Ga as z,Ha as H,Ja as J,M as R,Ma as K,N as T,Na as Q,Oa as W,P as q,Pa as X,Q as O,Ra as Y,Ta as Z,U as G,Ua as ee,V as L,Va as te,Z as P,_ as j,q as k,x as D,y as I,ya as U,za as d}from"./chunk-K3LN6DFK.js";import{Ga as u,Ia as a,Lb as N,Mb as _,S as F,Sa as t,Sb as M,Ta as i,Ua as A,Ya as S,Z as v,_ as C,_a as b,fc as w,jb as e,k as E,kb as g,pa as m,qa as y,sb as x}from"./chunk-WAGJM7NU.js";import{f as re,g as h}from"./chunk-MYAK5QVS.js";var p=re(ne());function oe(o,s){if(o&1&&(t(0,"option",20),e(1),i()),o&2){let n=s.$implicit;a("value",n.id),m(),g(n.arnNumber)}}function ae(o,s){o&1&&(t(0,"c-form-feedback",21),e(1,"Please select an ARN."),i()),o&2&&a("valid",!1)}function me(o,s){if(o&1&&(t(0,"option",20),e(1),i()),o&2){let n=s.$implicit;a("value",n.id),m(),g(n.amcName)}}function le(o,s){o&1&&(t(0,"c-form-feedback",21),e(1,"Please select an AMC."),i()),o&2&&a("valid",!1)}function ce(o,s){o&1&&(t(0,"c-form-feedback",21),e(1,"Please provide an AUM."),i()),o&2&&a("valid",!1)}function se(o,s){o&1&&(t(0,"c-form-feedback",21),e(1,"Please select a month."),i()),o&2&&a("valid",!1)}var De=(()=>{class o{constructor(n,c,r){this.fb=n,this.router=c,this.aumEntryService=r,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.arn=[],this.amc=[],this.aumEntryForm=this.fb.group({aumArnNumber:["",d.required],aumAmcName:["",d.required],aumAmount:["",[d.required,d.min(0)]],aumMonth:["",[d.required,d.pattern(/^\d{4}-\d{2}$/)]]})}ngOnInit(){return h(this,null,function*(){try{yield Promise.all([this.loadArn(),this.loadAmc()])}catch(n){console.error("Error initializing component:",n),yield p.default.fire("Error","Failed to initialize the form. Please try again.","error")}})}get f(){return this.aumEntryForm.controls}loadArn(){return h(this,null,function*(){try{let n=yield this.aumEntryService.getArn();this.arn=n.data}catch(n){throw console.error("Error loading ARN:",n),n}})}loadAmc(){return h(this,null,function*(){try{let n=yield this.aumEntryService.getAmc();this.amc=n.data}catch(n){throw console.error("Error loading AMC:",n),n}})}onSubmit(){return h(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.aumEntryForm.invalid){let r=Object.keys(this.aumEntryForm.controls).filter(l=>this.aumEntryForm.get(l)?.invalid).map(l=>{switch(l){case"aumArnNumber":return"ARN Number";case"aumAmcName":return"AMC Name";case"aumAmount":return"Amount";case"aumMonth":return"Month";default:return l}});yield p.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${r.join("<br>")}`,icon:"error"}),Object.keys(this.aumEntryForm.controls).forEach(l=>{let f=this.aumEntryForm.get(l);f&&f.invalid&&f.markAsTouched()});return}if(this.loading)return;this.loading=!0;let n=this.f.aumMonth.value,c={aumArnNumber:this.f.aumArnNumber.value,aumAmcName:this.f.aumAmcName.value,aumAmount:this.f.aumAmount.value,aumMonth:n,hideStatus:0};try{let r=yield E(this.aumEntryService.processAum(c,"0"));r.code===1?(yield p.default.fire("Added!",r.message,"success"),this.router.navigate(["/forms/aum"])):yield p.default.fire("Failed!",r.message,"error")}catch(r){console.error("Error processing AUM:",r),yield p.default.fire("Failed!","An error occurred while processing the AUM entry.","error")}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.aumEntryForm.reset()}static{this.\u0275fac=function(c){return new(c||o)(y(Z),y(w),y(ie))}}static{this.\u0275cmp=F({type:o,selectors:[["app-create-aum-entry"]],standalone:!0,features:[x],decls:82,vars:12,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","3",3,"cFormFloating"],["cSelect","","id","validationCustom01","formControlName","aumArnNumber","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["md","4",3,"cFormFloating"],["cSelect","","id","validationCustom02","formControlName","aumAmcName","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","aumAmount","required","","type","number","step","0.01","placeholder","AUM"],["cLabel","","for","validationCustom04",1,"ms-2"],["md","2",3,"cFormFloating"],["cFormControl","","id","validationCustom05","formControlName","aumMonth","required","","type","month","placeholder","Month"],["cLabel","","for","validationCustom05",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"value"],[3,"valid"]],template:function(c,r){if(c&1){let l=S();t(0,"c-row"),e(1,`
  `),t(2,"c-col",1),e(3,`
    `),t(4,"c-card",2),e(5,`
      `),t(6,"c-card-header"),e(7,`
        `),t(8,"strong"),e(9,"New AUM Entry Form"),i(),e(10,`
      `),i(),e(11,`
      `),t(12,"c-card-body"),e(13,`
        `),t(14,"form",3,0),b("ngSubmit",function(){return v(l),C(r.onSubmit())}),e(16,`
          `),t(17,"c-col",4),e(18,`
            `),t(19,"select",5),e(20,`
              `),t(21,"option",6),e(22,"Select an ARN"),i(),e(23,`
              `),u(24,oe,2,2,"option",7),e(25,`
            `),i(),e(26,`
            `),t(27,"label",8),e(28,"ARN"),i(),e(29,`
            `),u(30,ae,2,1,"c-form-feedback",9),e(31,`
          `),i(),e(32,`

          `),t(33,"c-col",10),e(34,`
            `),t(35,"select",11),e(36,`
              `),t(37,"option",6),e(38,"Select an AMC"),i(),e(39,`
              `),u(40,me,2,2,"option",7),e(41,`
            `),i(),e(42,`
            `),t(43,"label",12),e(44,"AMC"),i(),e(45,`
            `),u(46,le,2,1,"c-form-feedback",9),e(47,`
          `),i(),e(48,`

          `),t(49,"c-col",4),e(50,`
            `),A(51,"input",13),e(52,`
            `),t(53,"label",14),e(54,"AUM"),i(),e(55,`
            `),u(56,ce,2,1,"c-form-feedback",9),e(57,`
          `),i(),e(58,`

          `),t(59,"c-col",15),e(60,`
            `),A(61,"input",16),e(62,`
            `),t(63,"label",17),e(64,"Month"),i(),e(65,`
            `),u(66,se,2,1,"c-form-feedback",9),e(67,`
          `),i(),e(68,`

          `),t(69,"c-col",1),e(70,`
            `),t(71,"button",18),e(72,`
              Save
            `),i(),e(73,`
            `),t(74,"button",19),b("click",function(){return v(l),C(r.onReset())}),e(75,`
              Reset
            `),i(),e(76,`
          `),i(),e(77,`
        `),i(),e(78,`
      `),i(),e(79,`
    `),i(),e(80,`
  `),i(),e(81,`
`),i()}c&2&&(m(14),a("formGroup",r.aumEntryForm)("validated",r.customStylesValidated),m(3),a("cFormFloating",!0),m(7),a("ngForOf",r.arn),m(6),a("ngIf",r.f.aumArnNumber.errors&&(r.f.aumArnNumber.touched||r.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngForOf",r.amc),m(6),a("ngIf",r.f.aumAmcName.errors&&(r.f.aumAmcName.touched||r.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngIf",r.f.aumAmount.errors&&(r.f.aumAmount.touched||r.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngIf",r.f.aumMonth.errors&&(r.f.aumMonth.touched||r.submitted)))},dependencies:[_,M,N,j,P,D,V,I,te,z,W,X,U,H,Q,B,$,Y,J,K,L,ee,R,O,G,T,q,k]})}}return o})();export{De as CreateAumEntryComponent};
