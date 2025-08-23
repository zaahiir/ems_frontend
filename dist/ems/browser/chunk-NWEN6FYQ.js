import{a as ie}from"./chunk-UUAEYMST.js";import{a as re}from"./chunk-AJEUVWKL.js";import{Aa as z,B as R,Ba as H,Ga as J,Ja as K,M as T,Ma as Q,N as q,Na as U,Oa as W,P as O,Pa as X,Q as P,Ra as Y,Ta as Z,U as G,Ua as ee,V as L,Va as te,Z as j,_ as B,q as D,x as I,y as V,ya as $,za as u}from"./chunk-K3LN6DFK.js";import{Ga as d,Ia as m,Lb as _,Mb as w,Qb as F,S,Sa as i,Sb as M,Ta as o,Ua as y,Ya as x,Z as h,_ as v,_a as E,fc as k,jb as e,k as g,kb as b,pa as a,qa as C,rb as A,sb as N}from"./chunk-WAGJM7NU.js";import{f as ne,g as f}from"./chunk-MYAK5QVS.js";var p=ne(re());function me(r,c){if(r&1&&(i(0,"option",18),e(1),o()),r&2){let n=c.$implicit;m("value",n.id),a(),b(n.arnNumber)}}function se(r,c){r&1&&(i(0,"c-form-feedback",19),e(1,"Please select an ARN."),o()),r&2&&m("valid",!1)}function ae(r,c){if(r&1&&(i(0,"option",18),e(1),o()),r&2){let n=c.$implicit;m("value",n.id),a(),b(n.amcName)}}function le(r,c){r&1&&(i(0,"c-form-feedback",19),e(1,"Please select an AMC."),o()),r&2&&m("valid",!1)}function ce(r,c){r&1&&(i(0,"c-form-feedback",19),e(1,"Please provide a commission."),o()),r&2&&m("valid",!1)}function de(r,c){r&1&&(i(0,"c-form-feedback",19),e(1,"Please select a month."),o()),r&2&&m("valid",!1)}var Ie=(()=>{class r{constructor(n,l,t,s){this.fb=n,this.router=l,this.datePipe=t,this.commissionEntryFormService=s,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.arn=[],this.amc=[],this.initForm()}initForm(){this.commissionEntryForm=this.fb.group({commissionArnNumber:["",u.required],commissionAmcName:["",u.required],commissionAmount:["",u.required],commissionMonth:["",[u.required,u.pattern(/^\d{4}-\d{2}$/)]]})}ngOnInit(){return f(this,null,function*(){try{yield Promise.all([this.loadArn(),this.loadAmc()])}catch(n){console.error("Error initializing component:",n),yield p.default.fire("Error","Failed to load initial data","error")}})}get f(){return this.commissionEntryForm.controls}loadArn(){return f(this,null,function*(){try{let n=yield this.commissionEntryFormService.getArn();this.arn=n.data}catch(n){throw console.error("Error loading ARN:",n),n}})}loadAmc(){return f(this,null,function*(){try{let n=yield this.commissionEntryFormService.getAmc();this.amc=n.data}catch(n){throw console.error("Error loading AMC:",n),n}})}onSubmit(){return f(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.commissionEntryForm.invalid){let t=Object.keys(this.commissionEntryForm.controls).filter(s=>this.commissionEntryForm.get(s)?.invalid).map(s=>{switch(s){case"commissionArnNumber":return"ARN Number";case"commissionAmcName":return"AMC Name";case"commissionAmount":return"Commission Amount";case"commissionMonth":return"Commission Month";default:return s}});yield p.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${t.join("<br>")}`,icon:"error"}),Object.values(this.commissionEntryForm.controls).forEach(s=>{s.invalid&&s.markAsTouched()});return}if(this.loading)return;this.loading=!0;let n=this.commissionEntryForm.value,l={commissionArnNumber:n.commissionArnNumber,commissionAmcName:n.commissionAmcName,commissionAmount:n.commissionAmount,commissionMonth:n.commissionMonth,hideStatus:0};try{let t=yield g(this.commissionEntryFormService.processCommission(l,"0"));t.code===1?(yield p.default.fire("Added!",t.message,"success"),this.router.navigate(["/forms/commission"])):yield p.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error processing Commission:",t);let s="An error occurred while processing the commission entry.";t instanceof Error?s=t.message:typeof t=="string"&&(s=t),yield p.default.fire("Failed!",s,"error")}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.commissionEntryForm.reset()}static{this.\u0275fac=function(l){return new(l||r)(C(Z),C(k),C(F),C(ie))}}static{this.\u0275cmp=S({type:r,selectors:[["app-create-commission-entry-form"]],standalone:!0,features:[A([F]),N],decls:82,vars:12,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","id","validationCustom01","formControlName","commissionArnNumber","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","id","validationCustom02","formControlName","commissionAmcName","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","commissionAmount","required","","type","text","placeholder","Commission"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","commissionMonth","required","","type","month","placeholder","Month"],["cLabel","","for","validationCustom04",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"value"],[3,"valid"]],template:function(l,t){if(l&1){let s=x();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"New Commission Entry Form"),o(),e(10,`
      `),o(),e(11,`
      `),i(12,"c-card-body"),e(13,` 
        `),i(14,"form",3,0),E("ngSubmit",function(){return h(s),v(t.onSubmit())}),e(16,`
          `),i(17,"c-col",4),e(18,`
            `),i(19,"select",5),e(20,`
              `),i(21,"option",6),e(22,"Select an ARN"),o(),e(23,`
              `),d(24,me,2,2,"option",7),e(25,`
            `),o(),e(26,`
            `),i(27,"label",8),e(28,"ARN"),o(),e(29,`
            `),d(30,se,2,1,"c-form-feedback",9),e(31,`
          `),o(),e(32,`

          `),i(33,"c-col",4),e(34,`
            `),i(35,"select",10),e(36,`
              `),i(37,"option",6),e(38,"Select an AMC"),o(),e(39,`
              `),d(40,ae,2,2,"option",7),e(41,`
            `),o(),e(42,`
            `),i(43,"label",11),e(44,"AMC"),o(),e(45,`
            `),d(46,le,2,1,"c-form-feedback",9),e(47,`
          `),o(),e(48,`

          `),i(49,"c-col",4),e(50,`
            `),y(51,"input",12),e(52,`
            `),i(53,"label",13),e(54,"Commission"),o(),e(55,`
            `),d(56,ce,2,1,"c-form-feedback",9),e(57,`
          `),o(),e(58,`

          `),i(59,"c-col",4),e(60,`
            `),y(61,"input",14),e(62,`
            `),i(63,"label",15),e(64,"Month"),o(),e(65,`
            `),d(66,de,2,1,"c-form-feedback",9),e(67,`
          `),o(),e(68,`

          `),i(69,"c-col",1),e(70,`
            `),i(71,"button",16),e(72,`
              Save
            `),o(),e(73,`
            `),i(74,"button",17),E("click",function(){return h(s),v(t.onReset())}),e(75,`
              Reset
            `),o(),e(76,`
          `),o(),e(77,`
        `),o(),e(78,`
      `),o(),e(79,`
    `),o(),e(80,`
  `),o(),e(81,`
`),o()}l&2&&(a(14),m("formGroup",t.commissionEntryForm)("validated",t.customStylesValidated),a(3),m("cFormFloating",!0),a(7),m("ngForOf",t.arn),a(6),m("ngIf",t.f.commissionArnNumber.errors&&(t.f.commissionArnNumber.touched||t.submitted)),a(3),m("cFormFloating",!0),a(7),m("ngForOf",t.amc),a(6),m("ngIf",t.f.commissionAmcName.errors&&(t.f.commissionAmcName.touched||t.submitted)),a(3),m("cFormFloating",!0),a(7),m("ngIf",t.f.commissionAmount.errors&&(t.f.commissionAmount.touched||t.submitted)),a(3),m("cFormFloating",!0),a(7),m("ngIf",t.f.commissionMonth.errors&&(t.f.commissionMonth.touched||t.submitted)))},dependencies:[w,M,_,B,j,L,I,R,V,te,J,W,X,$,U,z,H,Y,K,Q,ee,T,P,G,q,O,D]})}}return r})();export{Ie as CreateCommissionEntryFormComponent};
