import './polyfills.server.mjs';
import{a as ie}from"./chunk-Z2ZYHXKQ.mjs";import{a as ne}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Aa as J,Ca as K,F as V,Fa as Q,G as q,Ga as W,Ha as X,I as O,Ia as Z,J as T,Ka as ee,Ma as te,N as L,Na as oe,O as R,Oa as re,S as j,T as B,j as N,q as I,r as M,ra as P,sa as y,ta as $,u as k,ua as z,za as H}from"./chunk-B4NKEOAB.mjs";import{b as _,d as U}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as A,Fb as g,Lc as E,Mc as x,Qb as e,Rb as F,Sa as c,Sc as D,Ta as s,Zb as S,ia as G,lb as p,nb as n,p as C,qc as b,sa as w,ta as v,xb as r,yb as i,zb as Y}from"./chunk-S7ATBOQE.mjs";import{g as ae,h as u}from"./chunk-COT65Y5O.mjs";var d=ae(ne());function me(a,h){if(a&1&&(r(0,"option",16),e(1),i()),a&2){let t=h.$implicit;n("value",t.id),c(),F(t.amcName)}}function le(a,h){a&1&&(r(0,"c-form-feedback",17),e(1,"Please select an AMC."),i()),a&2&&n("valid",!1)}function ce(a,h){a&1&&(r(0,"c-form-feedback",17),e(1,"Please provide an AUM."),i()),a&2&&n("valid",!1)}function de(a,h){a&1&&(r(0,"c-form-feedback",17),e(1,"Please select a date."),i()),a&2&&n("valid",!1)}var De=(()=>{class a{constructor(t,m,o,l,f){this.fb=t,this.router=m,this.route=o,this.aumEntryYoyGrowthService=l,this.cdr=f,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.aumId="0",this.amcs=[],this.aumYoyUpdateForm=this.fb.group({aumYoyGrowthAmcName:["",y.required],aumYoyGrowthAmount:["",y.required],aumYoyGrowthDate:["",y.required]})}ngOnInit(){return u(this,null,function*(){try{yield this.loadAmcs(),this.route.params.subscribe(t=>{this.aumId=t.id||"0",this.loadAumData()})}catch(t){console.error("Error in ngOnInit:",t),yield d.default.fire("Error","Failed to initialize the component","error")}})}get f(){return this.aumYoyUpdateForm.controls}loadAmcs(){return u(this,null,function*(){try{let t=yield this.aumEntryYoyGrowthService.getAmc();this.amcs=t.data,this.cdr.detectChanges()}catch(t){console.error("Error loading AMCs:",t),yield d.default.fire("Error","Failed to load AMCs","error")}})}loadAumData(){return u(this,null,function*(){try{let t=yield this.aumEntryYoyGrowthService.getAumYoyGrowthById(this.aumId.toString()).toPromise();if(t&&t.code===1&&t.data){let m=t.data,o=this.amcs.find(l=>l.amcName===m.aumYoyGrowthAmcName)?.id;this.aumYoyUpdateForm.patchValue({aumYoyGrowthAmcName:o,aumYoyGrowthAmount:m.aumYoyGrowthAmount,aumYoyGrowthDate:m.aumYoyGrowthDate}),this.cdr.detectChanges()}else console.error("Invalid response structure:",t)}catch(t){console.error("Error loading AUM data:",t),yield d.default.fire("Error","Failed to load AUM data","error")}})}onSubmit(){return u(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.aumYoyUpdateForm.invalid){let o=Object.keys(this.aumYoyUpdateForm.controls).filter(l=>this.aumYoyUpdateForm.get(l)?.invalid).map(l=>{switch(l){case"aumYoyGrowthAmcName":return"AMC Name";case"aumYoyGrowthAmount":return"AUM YoY Growth Amount";case"aumYoyGrowthDate":return"AUM YoY Growth Date";default:return l}});yield d.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br>${o.join("<br>")}`,icon:"error"});return}if(this.loading)return;this.loading=!0;let t=this.aumYoyUpdateForm.value,m={aumYoyGrowthAmcName:t.aumYoyGrowthAmcName,aumYoyGrowthAmount:t.aumYoyGrowthAmount,aumYoyGrowthDate:t.aumYoyGrowthDate,hideStatus:0};try{let o=yield C(this.aumEntryYoyGrowthService.processAumYoyGrowthEntry(m,this.aumId));o.code==1?(yield d.default.fire("Updated!",o.message,"success"),this.router.navigate(["/forms/yoyGrowth"])):yield d.default.fire("Failed!",o.message,"error")}catch(o){console.error("Error updating AUM YoY Growth:",o),yield d.default.fire("Failed!","An error occurred while updating","error")}finally{this.loading=!1}})}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/forms/yoyGrowth"])}static{this.\u0275fac=function(m){return new(m||a)(s(te),s(U),s(_),s(ie),s(b))}}static{this.\u0275cmp=G({type:a,selectors:[["app-update-aum-entry-yoy-growth"]],standalone:!0,features:[S],decls:66,vars:9,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","id","validationCustom01","formControlName","aumYoyGrowthAmcName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","aumYoyGrowthAmount","required","","type","number","step","0.01","placeholder","AUM"],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","required","","type","date","formControlName","aumYoyGrowthDate","placeholder","Date"],["cLabel","","for","validationCustom03",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"value"],[3,"valid"]],template:function(m,o){if(m&1){let l=A();r(0,"c-row"),e(1,`
  `),r(2,"c-col",1),e(3,`
    `),r(4,"c-card",2),e(5,`
      `),r(6,"c-card-header"),e(7,`
        `),r(8,"strong"),e(9,"Update AUM YOY Growth Entry Form"),i(),e(10,`
      `),i(),e(11,`
      `),r(12,"c-card-body"),e(13,`
        `),r(14,"form",3,0),g("ngSubmit",function(){return w(l),v(o.onSubmit())}),e(16,`
          `),r(17,"c-col",4),e(18,`
            `),r(19,"select",5),e(20,`
              `),r(21,"option",6),e(22,"Select an AMC"),i(),e(23,`
              `),p(24,me,2,2,"option",7),e(25,`
            `),i(),e(26,`
            `),r(27,"label",8),e(28,"AMC Name"),i(),e(29,`
            `),p(30,le,2,1,"c-form-feedback",9),e(31,`
          `),i(),e(32,`

          `),r(33,"c-col",4),e(34,`
            `),Y(35,"input",10),e(36,`
            `),r(37,"label",11),e(38,"AUM"),i(),e(39,`
            `),p(40,ce,2,1,"c-form-feedback",9),e(41,`
          `),i(),e(42,`

          `),r(43,"c-col",4),e(44,`
            `),Y(45,"input",12),e(46,`
            `),r(47,"label",13),e(48,"Date"),i(),e(49,`
            `),p(50,de,2,1,"c-form-feedback",9),e(51,`
          `),i(),e(52,`

          `),r(53,"c-col",1),e(54,`
            `),r(55,"button",14),e(56,`
              Update
            `),i(),e(57,`
            `),r(58,"button",15),g("click",function(){return w(l),v(o.onCancel())}),e(59,`
              Cancel
            `),i(),e(60,`
          `),i(),e(61,`
        `),i(),e(62,`
      `),i(),e(63,`
    `),i(),e(64,`
  `),i(),e(65,`
`),i()}m&2&&(c(14),n("formGroup",o.aumYoyUpdateForm)("validated",o.customStylesValidated),c(3),n("cFormFloating",!0),c(7),n("ngForOf",o.amcs),c(6),n("ngIf",o.f.aumYoyGrowthAmcName.errors&&(o.f.aumYoyGrowthAmcName.touched||o.submitted)),c(3),n("cFormFloating",!0),c(7),n("ngIf",o.f.aumYoyGrowthAmount.errors&&(o.f.aumYoyGrowthAmount.touched||o.submitted)),c(3),n("cFormFloating",!0),c(7),n("ngIf",o.f.aumYoyGrowthDate.errors&&(o.f.aumYoyGrowthDate.touched||o.submitted)))},dependencies:[D,E,x,B,j,I,k,R,M,re,H,X,Z,P,J,W,$,z,ee,K,Q,oe,V,T,L,q,O,N]})}}return a})();export{De as UpdateAumEntryYoyGrowthComponent};
