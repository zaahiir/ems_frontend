import './polyfills.server.mjs';
import{a as pe}from"./chunk-IVRD3AOI.mjs";import{a as ve}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Aa as re,Ca as ne,F as P,Fa as oe,G as j,Ga as ae,Ha as le,I as B,Ia as se,J as H,K as U,Ka as me,L as z,M as J,Ma as ce,N as K,Na as de,O as Q,Oa as ue,S as W,T as X,j as L,q,qa as Y,r as M,ra as Z,sa as g,ta as ee,u as O,ua as te,za as ie}from"./chunk-B4NKEOAB.mjs";import{d as $}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as A,F as I,Fb as S,Lc as k,Mc as w,Qb as e,Rb as E,Sa as l,Sc as R,Ta as C,V as F,Zb as D,f as b,ia as T,lb as u,nb as o,p as V,sa as x,ta as h,xb as t,yb as i,zb as p}from"./chunk-S7ATBOQE.mjs";import{a as N,b as _,g as fe,h as v}from"./chunk-COT65Y5O.mjs";var f=fe(ve());function Fe(r,d){r&1&&(t(0,"c-form-feedback",25),e(1,"Please select an Invoice Date."),i()),r&2&&o("valid",!1)}function Ce(r,d){r&1&&(t(0,"c-form-feedback",25),e(1,"Please provide an Invoice Number."),i()),r&2&&o("valid",!1)}function ye(r,d){if(r&1&&(t(0,"option",26),e(1),i()),r&2){let a=d.$implicit;o("value",a.id),l(),E(a.arnNumber)}}function be(r,d){r&1&&(t(0,"c-form-feedback",25),e(1,"Please select an ARN."),i()),r&2&&o("valid",!1)}function xe(r,d){if(r&1&&(t(0,"option",26),e(1),i()),r&2){let a=d.$implicit;o("value",a.id),l(),E(a.amcName)}}function he(r,d){r&1&&(t(0,"c-form-feedback",25),e(1,"Please select an AMC."),i()),r&2&&o("valid",!1)}function Se(r,d){r&1&&(t(0,"c-form-feedback",25),e(1,"Please provide a Total Value."),i()),r&2&&o("valid",!1)}function Ee(r,d){r&1&&(t(0,"c-col",4),e(1,`
            `),p(2,"input",27),e(3,`
            `),t(4,"label",28),e(5,"SGST"),i(),e(6,`
          `),i()),r&2&&o("cFormFloating",!0)}function Ge(r,d){r&1&&(t(0,"c-col",4),e(1,`
            `),p(2,"input",29),e(3,`
            `),t(4,"label",30),e(5,"CGST"),i(),e(6,`
          `),i()),r&2&&o("cFormFloating",!0)}function Ne(r,d){r&1&&(t(0,"c-col",4),e(1,`
            `),p(2,"input",31),e(3,`
            `),t(4,"label",32),e(5,"IGST"),i(),e(6,`
          `),i()),r&2&&o("cFormFloating",!0)}var ze=(()=>{class r{constructor(a,s,n){this.fb=a,this.router=s,this.gstEntryFormsService=n,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.amc=[],this.arn=[],this.destroy$=new b,this.calculateGst$=new b,this.initForm()}initForm(){this.gstEntryForm=this.fb.group({gstInvoiceDate:["",g.required],gstInvoiceNumber:["",g.required],gstAmcName:["",g.required],gstArnNumber:["",g.required],gstRegistered:[!0],gstTotalValue:["",[g.required,g.min(0)]],gstTaxableValue:[{value:"",disabled:!0}],gstIGst:[{value:"",disabled:!0}],gstSGst:[{value:"",disabled:!0}],gstCGst:[{value:"",disabled:!0}]})}ngOnInit(){return v(this,null,function*(){yield this.loadAumData(),yield this.loadArnData(),this.setupFormValueChanges(),this.setupGstCalculation()})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}get f(){return this.gstEntryForm.controls}loadAumData(){return v(this,null,function*(){try{let a=yield this.gstEntryFormsService.getAmc();this.amc=a.data}catch{yield f.default.fire("Error","Failed to load AMC data","error")}})}loadArnData(){return v(this,null,function*(){try{let a=yield this.gstEntryFormsService.getArn();this.arn=a.data}catch{yield f.default.fire("Error","Failed to load ARN data","error")}})}setupFormValueChanges(){this.gstEntryForm.get("gstAmcName")?.valueChanges.pipe(F(this.destroy$)).subscribe(()=>this.calculateGst$.next()),this.gstEntryForm.get("gstTotalValue")?.valueChanges.pipe(F(this.destroy$)).subscribe(()=>this.calculateGst$.next()),this.gstEntryForm.get("gstRegistered")?.valueChanges.pipe(F(this.destroy$)).subscribe(()=>this.calculateGst$.next())}setupGstCalculation(){this.calculateGst$.pipe(I(300),F(this.destroy$)).subscribe(()=>this.calculateGst())}calculateGst(){let a=this.f.gstAmcName.value,s=parseFloat(this.f.gstTotalValue.value),n=this.f.gstRegistered.value;if(a&&!isNaN(s)&&s>0){let c=this.amc.find(m=>m.id==a);if(c){if(n){let m=c.amcGstType==="IGST",G=s/(1+.18),y=s-G,ge={gstTaxableValue:G.toFixed(2),gstIGst:m?y.toFixed(2):"0.00",gstSGst:m?"0.00":(y/2).toFixed(2),gstCGst:m?"0.00":(y/2).toFixed(2)};this.gstEntryForm.patchValue(ge,{emitEvent:!1})}else{let m={gstTaxableValue:s.toFixed(2),gstIGst:"0.00",gstSGst:"0.00",gstCGst:"0.00"};this.gstEntryForm.patchValue(m,{emitEvent:!1})}this.gstEntryForm.updateValueAndValidity()}}else this.resetGstFields()}resetGstFields(){this.gstEntryForm.patchValue({gstTaxableValue:"",gstIGst:"",gstSGst:"",gstCGst:""})}onSubmit(){return v(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.gstEntryForm.invalid){let c=Object.keys(this.gstEntryForm.controls).filter(m=>this.gstEntryForm.get(m)?.invalid).map(m=>{switch(m){case"gstInvoiceDate":return"Invoice Date";case"gstInvoiceNumber":return"Invoice Number";case"gstAmcName":return"AMC Name";case"gstArnNumber":return"ARN Number";case"gstTotalValue":return"Total Value";default:return m}});yield f.default.fire({title:"Form Validation Error",html:`Please fill in the following required fields:<br>${c.join("<br>")}`,icon:"error"});return}let a=this.gstEntryForm.getRawValue(),s=_(N({},a),{hideStatus:0}),n="0";this.loading=!0;try{let c=yield V(this.gstEntryFormsService.processGst(s,"0"));c.code===1?(yield f.default.fire("Added!",c.message,"success"),this.router.navigate(["/forms/gst"])):yield f.default.fire("Failed!",c.message,"error")}catch(c){console.error("Error processing GST entry:",c),yield f.default.fire("Failed!","An unexpected error occurred. Please try again.","error")}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,this.gstEntryForm.reset(),this.gstEntryForm.patchValue({gstRegistered:!0}),this.resetGstFields()}static{this.\u0275fac=function(s){return new(s||r)(C(ce),C($),C(pe))}}static{this.\u0275cmp=T({type:r,selectors:[["app-create-gst-entry-form"]],standalone:!0,features:[D],decls:117,vars:18,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","gstInvoiceDate","required","","type","date","placeholder","Invoice Date"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","gstInvoiceNumber","required","","type","text","placeholder","Invoice Number"],["cLabel","","for","validationCustom02",1,"ms-2"],["cSelect","","id","validationCustom01","formControlName","gstArnNumber","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cSelect","","cFormControl","","id","validationCustom03","formControlName","gstAmcName","required",""],["cLabel","","for","validationCustom03",1,"ms-2"],["md","12"],["cFormCheckInput","","id","gstRegistered","type","checkbox","formControlName","gstRegistered"],["cFormCheckLabel","","for","gstRegistered"],["cFormControl","","id","validationCustom04","formControlName","gstTotalValue","required","","type","number","placeholder","Total Value"],["cLabel","","for","validationCustom04",1,"ms-2"],["cFormControl","","id","validationCustom05","formControlName","gstTaxableValue","type","number","step","0.01","readonly","","placeholder","Taxable Value"],["cLabel","","for","validationCustom05",1,"ms-2"],["md","6",3,"cFormFloating",4,"ngIf"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"valid"],[3,"value"],["cFormControl","","id","validationCustom07","formControlName","gstSGst","type","number","step","0.01","readonly","","placeholder","SGST"],["cLabel","","for","validationCustom07",1,"ms-2"],["cFormControl","","id","validationCustom08","formControlName","gstCGst","type","number","step","0.01","readonly","","placeholder","CGST"],["cLabel","","for","validationCustom08",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","gstIGst","type","number","step","0.01","readonly","","placeholder","IGST"],["cLabel","","for","validationCustom06",1,"ms-2"]],template:function(s,n){if(s&1){let c=A();t(0,"c-row"),e(1,`
  `),t(2,"c-col",1),e(3,`
    `),t(4,"c-card",2),e(5,`
      `),t(6,"c-card-header"),e(7,`
        `),t(8,"strong"),e(9,"New GST Entry Form"),i(),e(10,`
      `),i(),e(11,`
      `),t(12,"c-card-body"),e(13,`
        `),t(14,"form",3,0),S("ngSubmit",function(){return x(c),h(n.onSubmit())}),e(16,`
          `),t(17,"c-col",4),e(18,`
            `),p(19,"input",5),e(20,`
            `),t(21,"label",6),e(22,"Invoice Date"),i(),e(23,`
            `),u(24,Fe,2,1,"c-form-feedback",7),e(25,`
          `),i(),e(26,`

          `),t(27,"c-col",4),e(28,`
            `),p(29,"input",8),e(30,`
            `),t(31,"label",9),e(32,"Invoice Number"),i(),e(33,`
            `),u(34,Ce,2,1,"c-form-feedback",7),e(35,`
          `),i(),e(36,`

          `),t(37,"c-col",4),e(38,`
            `),t(39,"select",10),e(40,`
              `),t(41,"option",11),e(42,"Select an ARN"),i(),e(43,`
              `),u(44,ye,2,2,"option",12),e(45,`
            `),i(),e(46,`
            `),t(47,"label",6),e(48,"ARN"),i(),e(49,`
            `),u(50,be,2,1,"c-form-feedback",7),e(51,`
          `),i(),e(52,`

          `),t(53,"c-col",4),e(54,`
            `),t(55,"select",13),e(56,`
              `),t(57,"option",11),e(58,"Select an AMC"),i(),e(59,`
              `),u(60,xe,2,2,"option",12),e(61,`
            `),i(),e(62,`
            `),t(63,"label",14),e(64,"AMC Name"),i(),e(65,`
            `),u(66,he,2,1,"c-form-feedback",7),e(67,`
          `),i(),e(68,`

          `),t(69,"c-col",15),e(70,`
            `),t(71,"c-form-check"),e(72,`
              `),p(73,"input",16),e(74,`
              `),t(75,"label",17),e(76,"GST Registered"),i(),e(77,`
            `),i(),e(78,`
          `),i(),e(79,`

          `),t(80,"c-col",4),e(81,`
            `),p(82,"input",18),e(83,`
            `),t(84,"label",19),e(85,"Total Value"),i(),e(86,`
            `),u(87,Se,2,1,"c-form-feedback",7),e(88,`
          `),i(),e(89,`

          `),t(90,"c-col",4),e(91,`
            `),p(92,"input",20),e(93,`
            `),t(94,"label",21),e(95,"Taxable Value"),i(),e(96,`
          `),i(),e(97,`

          `),u(98,Ee,7,1,"c-col",22),e(99,`

          `),u(100,Ge,7,1,"c-col",22),e(101,`

          `),u(102,Ne,7,1,"c-col",22),e(103,`

          `),t(104,"c-col",1),e(105,`
            `),t(106,"button",23),e(107,`
              Save
            `),i(),e(108,`
            `),t(109,"button",24),S("click",function(){return x(c),h(n.onReset())}),e(110,`
              Reset
            `),i(),e(111,`
          `),i(),e(112,`
        `),i(),e(113,`
      `),i(),e(114,`
    `),i(),e(115,`
  `),i(),e(116,`
`),i()}s&2&&(l(14),o("formGroup",n.gstEntryForm)("validated",n.customStylesValidated),l(3),o("cFormFloating",!0),l(7),o("ngIf",n.f.gstInvoiceDate.errors&&(n.f.gstInvoiceDate.touched||n.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngIf",n.f.gstInvoiceNumber.errors&&(n.f.gstInvoiceNumber.touched||n.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngForOf",n.arn),l(6),o("ngIf",n.f.gstArnNumber.errors&&(n.f.gstArnNumber.touched||n.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngForOf",n.amc),l(6),o("ngIf",n.f.gstAmcName.errors&&(n.f.gstAmcName.touched||n.submitted)),l(14),o("cFormFloating",!0),l(7),o("ngIf",n.f.gstTotalValue.errors&&(n.f.gstTotalValue.touched||n.submitted)),l(3),o("cFormFloating",!0),l(8),o("ngIf",n.f.gstRegistered.value),l(2),o("ngIf",n.f.gstRegistered.value),l(2),o("ngIf",n.f.gstRegistered.value))},dependencies:[w,R,k,X,W,q,Q,O,M,ue,ie,le,se,Z,re,Y,ae,ee,te,me,ne,oe,de,P,H,K,j,B,z,J,U,L]})}}return r})();export{ze as CreateGstEntryFormComponent};
