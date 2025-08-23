import './polyfills.server.mjs';
import{a as oe}from"./chunk-J7ALGH4D.mjs";import{a as me}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Aa as Q,Ca as W,F as T,Fa as X,G as q,Ga as Y,Ha as Z,I as L,Ia as ee,J as O,Ka as te,Ma as ie,N as j,Na as re,O as G,Oa as ne,S as B,T as $,j as D,q as V,r as R,ra as z,sa as f,ta as H,u as P,ua as J,za as K}from"./chunk-B4NKEOAB.mjs";import{b as I,d as k}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as x,Fb as g,Lc as M,Mc as U,Qb as e,Qc as v,Rb as C,Sa as l,Sc as w,Ta as A,Yb as N,Zb as _,ia as E,lb as p,nb as a,p as S,sa as y,ta as F,xb as r,yb as n,zb as b}from"./chunk-S7ATBOQE.mjs";import{g as ae,h}from"./chunk-COT65Y5O.mjs";var s=ae(me());function le(o,u){if(o&1&&(r(0,"option",20),e(1),n()),o&2){let t=u.$implicit;a("value",t.id),l(),C(t.arnNumber)}}function ce(o,u){o&1&&(r(0,"c-form-feedback",21),e(1,"Please select an ARN."),n()),o&2&&a("valid",!1)}function de(o,u){if(o&1&&(r(0,"option",20),e(1),n()),o&2){let t=u.$implicit;a("value",t.id),l(),C(t.amcName)}}function se(o,u){o&1&&(r(0,"c-form-feedback",21),e(1,"Please select an AMC."),n()),o&2&&a("valid",!1)}function ue(o,u){o&1&&(r(0,"c-form-feedback",21),e(1,"Please provide an AUM."),n()),o&2&&a("valid",!1)}function pe(o,u){o&1&&(r(0,"c-form-feedback",21),e(1,"Please select a month."),n()),o&2&&a("valid",!1)}var ke=(()=>{class o{constructor(t,c,i,m,d){this.fb=t,this.router=c,this.route=i,this.datePipe=m,this.aumEntryService=d,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.aumId="0",this.arns=[],this.amcs=[],this.initForm()}ngOnInit(){return h(this,null,function*(){try{yield Promise.all([this.loadArn(),this.loadAmc()]),this.route.params.subscribe(t=>{this.aumId=t.id||"0",this.loadAumData()})}catch(t){console.error("Error initializing component:",t),yield s.default.fire("Error","Failed to initialize the form. Please try again.","error")}})}initForm(){this.aumUpdateForm=this.fb.group({aumArnNumber:["",f.required],aumAmcName:["",f.required],aumAmount:["",[f.required,f.min(0)]],aumMonth:["",[f.required,f.pattern(/^\d{4}-\d{2}$/)]]})}get f(){return this.aumUpdateForm.controls}loadArn(){return h(this,null,function*(){try{let t=yield this.aumEntryService.getArn();this.arns=t.data}catch(t){console.error("Error loading ARNs:",t),yield s.default.fire("Error","Failed to load ARNs","error")}})}loadAmc(){return h(this,null,function*(){try{let t=yield this.aumEntryService.getAmc();this.amcs=t.data}catch(t){console.error("Error loading AMCs:",t),yield s.default.fire("Error","Failed to load AMCs","error")}})}loadAumData(){return h(this,null,function*(){try{let t=yield this.aumEntryService.getAumById(this.aumId.toString()).toPromise();if(t&&t.code===1&&t.data){let c=t.data,i=this.arns.find(d=>d.arnNumber===c.aumArnNumber)?.id,m=this.amcs.find(d=>d.amcName===c.aumAmcName)?.id;if(!i||!m){console.error("Could not find matching ARN or AMC"),yield s.default.fire("Error","Failed to match ARN or AMC data","error");return}this.aumUpdateForm.patchValue({aumArnNumber:i,aumAmcName:m,aumAmount:c.aumAmount,aumMonth:this.datePipe.transform(c.aumMonth,"yyyy-MM")})}else console.error("Invalid response structure:",t)}catch(t){console.error("Error loading AUM data:",t),yield s.default.fire("Error","Failed to load AUM data","error")}})}onSubmit(){return h(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.aumUpdateForm.invalid){let i=Object.keys(this.aumUpdateForm.controls).filter(m=>this.aumUpdateForm.get(m)?.invalid).map(m=>{switch(m){case"aumArnNumber":return"ARN Number";case"aumAmcName":return"AMC Name";case"aumAmount":return"Amount";case"aumMonth":return"Month";default:return m}});yield s.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${i.join("<br>")}`,icon:"error"}),Object.keys(this.aumUpdateForm.controls).forEach(m=>{let d=this.aumUpdateForm.get(m);d&&d.invalid&&d.markAsTouched()});return}if(this.loading)return;this.loading=!0;let t=this.aumUpdateForm.value,c={aumArnNumber:t.aumArnNumber,aumAmcName:t.aumAmcName,aumAmount:t.aumAmount,aumMonth:t.aumMonth,hideStatus:0};try{let i=yield S(this.aumEntryService.processAum(c,this.aumId));i.code===1?(yield s.default.fire("Updated!",i.message,"success"),this.router.navigate(["/forms/aum"])):yield s.default.fire("Failed!",i.message,"error")}catch(i){console.error("Error updating AUM:",i),yield s.default.fire("Failed!","An error occurred while updating the AUM","error")}finally{this.loading=!1}})}onCancel(){this.router.navigate(["/forms/aum"])}static{this.\u0275fac=function(c){return new(c||o)(A(ie),A(k),A(I),A(v),A(oe))}}static{this.\u0275cmp=E({type:o,selectors:[["app-update-aum-entry"]],standalone:!0,features:[N([v]),_],decls:82,vars:12,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","3",3,"cFormFloating"],["cSelect","","id","validationCustom01","formControlName","aumArnNumber","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["md","4",3,"cFormFloating"],["cSelect","","id","validationCustom02","formControlName","aumAmcName","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","aumAmount","required","","type","number","step","0.01","placeholder","AUM"],["cLabel","","for","validationCustom04",1,"ms-2"],["md","2",3,"cFormFloating"],["cFormControl","","id","validationCustom05","formControlName","aumMonth","required","","type","month","placeholder","Month"],["cLabel","","for","validationCustom05",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"value"],[3,"valid"]],template:function(c,i){if(c&1){let m=x();r(0,"c-row"),e(1,`
  `),r(2,"c-col",1),e(3,`
    `),r(4,"c-card",2),e(5,`
      `),r(6,"c-card-header"),e(7,`
        `),r(8,"strong"),e(9,"Update AUM Entry Form"),n(),e(10,`
      `),n(),e(11,`
      `),r(12,"c-card-body"),e(13,`
        `),r(14,"form",3,0),g("ngSubmit",function(){return y(m),F(i.onSubmit())}),e(16,`
          `),r(17,"c-col",4),e(18,`
            `),r(19,"select",5),e(20,`
              `),r(21,"option",6),e(22,"Select an ARN"),n(),e(23,`
              `),p(24,le,2,2,"option",7),e(25,`
            `),n(),e(26,`
            `),r(27,"label",8),e(28,"ARN"),n(),e(29,`
            `),p(30,ce,2,1,"c-form-feedback",9),e(31,`
          `),n(),e(32,`

          `),r(33,"c-col",10),e(34,`
            `),r(35,"select",11),e(36,`
              `),r(37,"option",6),e(38,"Select an AMC"),n(),e(39,`
              `),p(40,de,2,2,"option",7),e(41,`
            `),n(),e(42,`
            `),r(43,"label",12),e(44,"AMC"),n(),e(45,`
            `),p(46,se,2,1,"c-form-feedback",9),e(47,`
          `),n(),e(48,`

          `),r(49,"c-col",4),e(50,`
            `),b(51,"input",13),e(52,`
            `),r(53,"label",14),e(54,"AUM"),n(),e(55,`
            `),p(56,ue,2,1,"c-form-feedback",9),e(57,`
          `),n(),e(58,`

          `),r(59,"c-col",15),e(60,`
            `),b(61,"input",16),e(62,`
            `),r(63,"label",17),e(64,"Month"),n(),e(65,`
            `),p(66,pe,2,1,"c-form-feedback",9),e(67,`
          `),n(),e(68,`

          `),r(69,"c-col",1),e(70,`
            `),r(71,"button",18),e(72,`
              Update
            `),n(),e(73,`
            `),r(74,"button",19),g("click",function(){return y(m),F(i.onCancel())}),e(75,`
              Cancel
            `),n(),e(76,`
          `),n(),e(77,`
        `),n(),e(78,`
      `),n(),e(79,`
    `),n(),e(80,`
  `),n(),e(81,`
`),n()}c&2&&(l(14),a("formGroup",i.aumUpdateForm)("validated",i.customStylesValidated),l(3),a("cFormFloating",!0),l(7),a("ngForOf",i.arns),l(6),a("ngIf",i.f.aumArnNumber.errors&&(i.f.aumArnNumber.touched||i.submitted)),l(3),a("cFormFloating",!0),l(7),a("ngForOf",i.amcs),l(6),a("ngIf",i.f.aumAmcName.errors&&(i.f.aumAmcName.touched||i.submitted)),l(3),a("cFormFloating",!0),l(7),a("ngIf",i.f.aumAmount.errors&&(i.f.aumAmount.touched||i.submitted)),l(3),a("cFormFloating",!0),l(7),a("ngIf",i.f.aumMonth.errors&&(i.f.aumMonth.touched||i.submitted)))},dependencies:[w,M,U,$,B,V,P,G,R,ne,K,Z,ee,z,Q,Y,H,J,te,W,X,re,T,O,j,q,L,D]})}}return o})();export{ke as UpdateAumEntryComponent};
