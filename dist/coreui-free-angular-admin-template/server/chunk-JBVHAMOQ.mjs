import './polyfills.server.mjs';
import{a as fe}from"./chunk-IVRD3AOI.mjs";import{a as be}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Aa as ae,Ca as oe,F as P,Fa as se,G as B,Ga as le,Ha as me,I as z,Ia as ce,J as H,K as J,Ka as de,L as K,M as Q,Ma as ue,N as W,Na as pe,O as X,Oa as ge,S as Y,T as Z,j as q,q as M,qa as ee,r as O,ra as te,sa as f,ta as ie,u as j,ua as re,za as ne}from"./chunk-B4NKEOAB.mjs";import{b as L,d as $}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as A,F as V,Fb as S,Lc as U,Mc as k,Qb as e,Rb as E,Sa as l,Sc as R,Ta as h,V as b,Zb as D,f as C,ia as T,lb as u,nb as s,p as _,qc as w,sa as x,ta as y,xb as t,yb as i,zb as p}from"./chunk-S7ATBOQE.mjs";import{a as I,b as N,g as he,h as v}from"./chunk-COT65Y5O.mjs";var g=he(be());function Fe(n,d){n&1&&(t(0,"c-form-feedback",26),e(1,"Please select an Invoice Date."),i()),n&2&&s("valid",!1)}function Ce(n,d){n&1&&(t(0,"c-form-feedback",26),e(1,"Please provide an Invoice Number."),i()),n&2&&s("valid",!1)}function xe(n,d){if(n&1&&(t(0,"option",27),e(1),i()),n&2){let a=d.$implicit;s("value",a.id),l(),E(a.arnNumber)}}function ye(n,d){n&1&&(t(0,"c-form-feedback",26),e(1,"Please select an ARN."),i()),n&2&&s("valid",!1)}function Se(n,d){if(n&1&&(t(0,"option",27),e(1),i()),n&2){let a=d.$implicit;s("value",a.id),l(),E(a.amcName)}}function Ee(n,d){n&1&&(t(0,"c-form-feedback",26),e(1,"Please select an AMC."),i()),n&2&&s("valid",!1)}function Ge(n,d){n&1&&(t(0,"c-form-feedback",26),e(1,"Please provide a Total Value."),i()),n&2&&s("valid",!1)}function Ie(n,d){n&1&&(t(0,"c-col",4),e(1,`
            `),p(2,"input",28),e(3,`
            `),t(4,"label",29),e(5,"SGST"),i(),e(6,`
          `),i()),n&2&&s("cFormFloating",!0)}function Ne(n,d){n&1&&(t(0,"c-col",4),e(1,`
            `),p(2,"input",30),e(3,`
            `),t(4,"label",31),e(5,"CGST"),i(),e(6,`
          `),i()),n&2&&s("cFormFloating",!0)}function _e(n,d){n&1&&(t(0,"c-col",4),e(1,`
            `),p(2,"input",32),e(3,`
            `),t(4,"label",33),e(5,"IGST"),i(),e(6,`
          `),i()),n&2&&s("cFormFloating",!0)}var Je=(()=>{class n{constructor(a,o,r,c,m){this.fb=a,this.router=o,this.route=r,this.gstEntryFormsService=c,this.cdr=m,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.gstId="0",this.amc=[],this.arn=[],this.destroy$=new C,this.calculateGst$=new C,this.initForm()}initForm(){this.gstUpdateForm=this.fb.group({gstInvoiceDate:["",f.required],gstInvoiceNumber:["",f.required],gstAmcName:["",f.required],gstArnNumber:["",f.required],gstRegistered:[!0],gstTotalValue:["",[f.required,f.min(0)]],gstTaxableValue:[{value:"",disabled:!0}],gstIGst:[{value:"",disabled:!0}],gstSGst:[{value:"",disabled:!0}],gstCGst:[{value:"",disabled:!0}]})}ngOnInit(){return v(this,null,function*(){try{yield this.loadAumData(),yield this.loadArnData();let a=yield new Promise(o=>this.route.params.subscribe(r=>o(r)));this.gstId=a.id||"0",yield this.loadGstData(),this.setupFormValueChanges(),this.setupGstCalculation()}catch(a){console.error("Error initializing component:",a),yield g.default.fire("Error","Failed to initialize the component","error")}})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}get f(){return this.gstUpdateForm.controls}loadAumData(){return v(this,null,function*(){try{let a=yield this.gstEntryFormsService.getAmc();this.amc=a.data,this.cdr.detectChanges()}catch(a){console.error("Error loading AMCs:",a),yield g.default.fire("Error","Failed to load AMC data","error")}})}loadArnData(){return v(this,null,function*(){try{let a=yield this.gstEntryFormsService.getArn();this.arn=a.data,this.cdr.detectChanges()}catch(a){console.error("Error loading ARNs:",a),yield g.default.fire("Error","Failed to load ARN data","error")}})}loadGstData(){return v(this,null,function*(){try{let a=yield this.gstEntryFormsService.getGstById(this.gstId.toString()).toPromise();if(a&&a.code===1&&a.data){let o=a.data,r=this.amc.find(m=>m.amcName===o.gstAmcName)?.id,c=this.arn.find(m=>m.arnNumber===o.gstArnNumber)?.id;this.gstUpdateForm.patchValue({gstInvoiceDate:o.gstInvoiceDate,gstInvoiceNumber:o.gstInvoiceNumber,gstAmcName:r,gstArnNumber:c,gstRegistered:o.gstRegistered!==void 0?o.gstRegistered:!0,gstTotalValue:o.gstTotalValue,gstTaxableValue:o.gstTaxableValue,gstIGst:o.gstIGst,gstSGst:o.gstSGst,gstCGst:o.gstCGst}),this.cdr.detectChanges()}}catch(a){console.error("Error loading GST data:",a),yield g.default.fire("Error","Failed to load GST data","error")}})}setupFormValueChanges(){this.gstUpdateForm.get("gstAmcName")?.valueChanges.pipe(b(this.destroy$)).subscribe(()=>this.calculateGst$.next()),this.gstUpdateForm.get("gstTotalValue")?.valueChanges.pipe(b(this.destroy$)).subscribe(()=>this.calculateGst$.next()),this.gstUpdateForm.get("gstRegistered")?.valueChanges.pipe(b(this.destroy$)).subscribe(()=>this.calculateGst$.next())}setupGstCalculation(){this.calculateGst$.pipe(V(300),b(this.destroy$)).subscribe(()=>this.calculateGst())}calculateGst(){let a=this.f.gstAmcName.value,o=parseFloat(this.f.gstTotalValue.value),r=this.f.gstRegistered.value;if(a&&!isNaN(o)&&o>0){let c=this.amc.find(m=>m.id==a);if(c){if(r){let m=c.amcGstType==="IGST",G=o/(1+.18),F=o-G,ve={gstTaxableValue:G.toFixed(2),gstIGst:m?F.toFixed(2):"0.00",gstSGst:m?"0.00":(F/2).toFixed(2),gstCGst:m?"0.00":(F/2).toFixed(2)};this.gstUpdateForm.patchValue(ve,{emitEvent:!1})}else{let m={gstTaxableValue:o.toFixed(2),gstIGst:"0.00",gstSGst:"0.00",gstCGst:"0.00"};this.gstUpdateForm.patchValue(m,{emitEvent:!1})}this.gstUpdateForm.updateValueAndValidity(),this.cdr.detectChanges()}}else this.resetGstFields()}resetGstFields(){this.gstUpdateForm.patchValue({gstTaxableValue:"",gstIGst:"",gstSGst:"",gstCGst:""})}onSubmit(){return v(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.gstUpdateForm.invalid){let r=Object.keys(this.gstUpdateForm.controls).filter(c=>this.gstUpdateForm.get(c)?.invalid).map(c=>{switch(c){case"gstInvoiceDate":return"Invoice Date";case"gstInvoiceNumber":return"Invoice Number";case"gstAmcName":return"AMC Name";case"gstArnNumber":return"ARN Number";case"gstTotalValue":return"Total Value";default:return c}});yield g.default.fire({title:"Form Validation Error",html:`Please fill in the following required fields:<br>${r.join("<br>")}`,icon:"error"});return}let a=this.gstUpdateForm.getRawValue(),o=N(I({},a),{hideStatus:0});this.loading=!0;try{let r=yield _(this.gstEntryFormsService.processGst(o,this.gstId));r.code===1?(yield g.default.fire("Updated!",r.message,"success"),this.router.navigate(["/forms/gst"])):yield g.default.fire("Failed!",r.message,"error")}catch(r){console.error("Error updating GST entry:",r),yield g.default.fire("Failed!",r instanceof Error?r.message:"An unknown error occurred","error")}finally{this.loading=!1}})}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/forms/gst"])}static{this.\u0275fac=function(o){return new(o||n)(h(ue),h($),h(L),h(fe),h(w))}}static{this.\u0275cmp=T({type:n,selectors:[["app-update-gst-entry-form"]],standalone:!0,features:[D],decls:117,vars:18,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","gstInvoiceDate","required","","type","date","placeholder","Invoice Date"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","gstInvoiceNumber","required","","type","text","placeholder","Invoice Number"],["cLabel","","for","validationCustom02",1,"ms-2"],["cSelect","","id","validationCustom03","formControlName","gstArnNumber","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom03",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom04","formControlName","gstAmcName","required",""],["cLabel","","for","validationCustom04",1,"ms-2"],["md","12"],["cFormCheckInput","","id","gstRegistered","type","checkbox","formControlName","gstRegistered"],["cFormCheckLabel","","for","gstRegistered"],["cFormControl","","id","validationCustom05","formControlName","gstTotalValue","required","","type","number","placeholder","Total Value"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","gstTaxableValue","type","number","step","0.01","readonly","","placeholder","Taxable Value"],["cLabel","","for","validationCustom06",1,"ms-2"],["md","6",3,"cFormFloating",4,"ngIf"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"valid"],[3,"value"],["cFormControl","","id","validationCustom07","formControlName","gstSGst","type","number","step","0.01","readonly","","placeholder","SGST"],["cLabel","","for","validationCustom07",1,"ms-2"],["cFormControl","","id","validationCustom08","formControlName","gstCGst","type","number","step","0.01","readonly","","placeholder","CGST"],["cLabel","","for","validationCustom08",1,"ms-2"],["cFormControl","","id","validationCustom09","formControlName","gstIGst","type","number","step","0.01","readonly","","placeholder","IGST"],["cLabel","","for","validationCustom09",1,"ms-2"]],template:function(o,r){if(o&1){let c=A();t(0,"c-row"),e(1,`
  `),t(2,"c-col",1),e(3,`
    `),t(4,"c-card",2),e(5,`
      `),t(6,"c-card-header"),e(7,`
        `),t(8,"strong"),e(9,"Update GST Entry Form"),i(),e(10,`
      `),i(),e(11,`
      `),t(12,"c-card-body"),e(13,`
        `),t(14,"form",3,0),S("ngSubmit",function(){return x(c),y(r.onSubmit())}),e(16,`
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
              `),u(44,xe,2,2,"option",12),e(45,`
            `),i(),e(46,`
            `),t(47,"label",13),e(48,"ARN"),i(),e(49,`
            `),u(50,ye,2,1,"c-form-feedback",7),e(51,`
          `),i(),e(52,`

          `),t(53,"c-col",4),e(54,`
            `),t(55,"select",14),e(56,`
              `),t(57,"option",11),e(58,"Select an AMC"),i(),e(59,`
              `),u(60,Se,2,2,"option",12),e(61,`
            `),i(),e(62,`
            `),t(63,"label",15),e(64,"AMC Name"),i(),e(65,`
            `),u(66,Ee,2,1,"c-form-feedback",7),e(67,`
          `),i(),e(68,`

          `),t(69,"c-col",16),e(70,`
            `),t(71,"c-form-check"),e(72,`
              `),p(73,"input",17),e(74,`
              `),t(75,"label",18),e(76,"GST Registered"),i(),e(77,`
            `),i(),e(78,`
          `),i(),e(79,`

          `),t(80,"c-col",4),e(81,`
            `),p(82,"input",19),e(83,`
            `),t(84,"label",20),e(85,"Total Value"),i(),e(86,`
            `),u(87,Ge,2,1,"c-form-feedback",7),e(88,`
          `),i(),e(89,`

          `),t(90,"c-col",4),e(91,`
            `),p(92,"input",21),e(93,`
            `),t(94,"label",22),e(95,"Taxable Value"),i(),e(96,`
          `),i(),e(97,`

          `),u(98,Ie,7,1,"c-col",23),e(99,`

          `),u(100,Ne,7,1,"c-col",23),e(101,`

          `),u(102,_e,7,1,"c-col",23),e(103,`

          `),t(104,"c-col",1),e(105,`
            `),t(106,"button",24),e(107,`
              Update
            `),i(),e(108,`
            `),t(109,"button",25),S("click",function(){return x(c),y(r.onCancel())}),e(110,`
              Cancel
            `),i(),e(111,`
          `),i(),e(112,`
        `),i(),e(113,`
      `),i(),e(114,`
    `),i(),e(115,`
  `),i(),e(116,`
`),i()}o&2&&(l(14),s("formGroup",r.gstUpdateForm)("validated",r.customStylesValidated),l(3),s("cFormFloating",!0),l(7),s("ngIf",r.f.gstInvoiceDate.errors&&(r.f.gstInvoiceDate.touched||r.submitted)),l(3),s("cFormFloating",!0),l(7),s("ngIf",r.f.gstInvoiceNumber.errors&&(r.f.gstInvoiceNumber.touched||r.submitted)),l(3),s("cFormFloating",!0),l(7),s("ngForOf",r.arn),l(6),s("ngIf",r.f.gstArnNumber.errors&&(r.f.gstArnNumber.touched||r.submitted)),l(3),s("cFormFloating",!0),l(7),s("ngForOf",r.amc),l(6),s("ngIf",r.f.gstAmcName.errors&&(r.f.gstAmcName.touched||r.submitted)),l(14),s("cFormFloating",!0),l(7),s("ngIf",r.f.gstTotalValue.errors&&(r.f.gstTotalValue.touched||r.submitted)),l(3),s("cFormFloating",!0),l(8),s("ngIf",r.f.gstRegistered.value),l(2),s("ngIf",r.f.gstRegistered.value),l(2),s("ngIf",r.f.gstRegistered.value))},dependencies:[k,R,U,Z,Y,M,j,X,O,ge,ne,me,ce,te,ae,ee,le,ie,re,de,oe,se,pe,P,H,W,B,z,K,Q,J,q]})}}return n})();export{Je as UpdateGstEntryFormComponent};
