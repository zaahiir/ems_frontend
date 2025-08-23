import './polyfills.server.mjs';
import{a as oe}from"./chunk-UQ4ZCVJL.mjs";import{a as le}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as Q,F as P,Fa as W,G as R,Ga as X,H as V,Ha as Y,I as L,Ia as ee,J as O,Ka as te,Ma as re,N as $,Na as ie,O as j,Oa as ne,S as Z,T as B,j as T,q as D,r as G,ra as z,sa as s,ta as H,u as U,ua as J,za as K}from"./chunk-B4NKEOAB.mjs";import{b as I,d as q}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as N,Fb as S,Lc as w,Mc as M,Qb as e,Rb as _,Sa as m,Sc as k,Ta as b,Zb as A,ia as g,lb as u,nb as o,sa as F,ta as x,xb as t,yb as r,zb as p}from"./chunk-S7ATBOQE.mjs";import{a as y,b as h,g as ae,h as C}from"./chunk-COT65Y5O.mjs";var E=ae(le());function me(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide an ARN."),r()),n&2&&o("valid",!1)}function de(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide a Name."),r()),n&2&&o("valid",!1)}function se(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide a Mobile Number."),r()),n&2&&o("valid",!1)}function ce(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide an Address."),r()),n&2&&o("valid",!1)}function ue(n,f){if(n&1&&(t(0,"option",36),e(1),r()),n&2){let a=f.$implicit;o("value",a.id),m(),_(a.stateName)}}function pe(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide State."),r()),n&2&&o("valid",!1)}function fe(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide a Pincode."),r()),n&2&&o("valid",!1)}function Ce(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide an Email."),r()),n&2&&o("valid",!1)}function ve(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide an EVIN."),r()),n&2&&o("valid",!1)}function be(n,f){n&1&&(t(0,"c-form-feedback",35),e(1,"Please provide a GST No."),r()),n&2&&o("valid",!1)}var Ue=(()=>{class n{constructor(a,d,i,l){this.fb=a,this.router=d,this.route=i,this.arnMasterFormService=l,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.states=[],this.countries=[],this.defaultCountry={id:1,code:"IN",name:"India",dial_code:"+91"},this.arnId="",this.arnEntryForm=this.fb.group({arnNumber:["",s.required],arnName:["",s.required],arnCountryCode:[{value:"",disabled:!0},s.required],arnMobile:["",[s.required,s.pattern("^[0-9]{10}$")]],arnAddress:["",s.required],arnCountry:[{value:"",disabled:!0},s.required],arnPinCode:["",[s.required,s.pattern("^[0-9]{6}$")]],arnEmail:["",[s.required,s.email]],arnEuin:["",s.required],arnGstNo:["",[s.required,s.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")]],arnState:["",s.required]})}ngOnInit(){return C(this,null,function*(){try{yield this.loadStates(),yield this.loadCountries(),this.route.params.subscribe(a=>{this.arnId=a.id,this.loadArnData(this.arnId)})}catch(a){console.error("Error during initialization:",a),yield this.showError("An error occurred during initialization.")}})}get f(){return this.arnEntryForm.controls}loadCountries(){return C(this,null,function*(){try{let a=yield this.arnMasterFormService.getCountries();this.countries=a.data;let d=this.countries.find(i=>i.code==="IN");d&&(this.defaultCountry=d)}catch(a){throw console.error("Error loading countries:",a),a}})}loadStates(){return C(this,null,function*(){try{let a=yield this.arnMasterFormService.getStates();this.states=a.data}catch(a){throw console.error("Error loading states:",a),a}})}loadArnData(a){return C(this,null,function*(){try{let d=yield this.arnMasterFormService.listsArn(a);if(d.data.code===1&&d.data.data.length>0){let i=d.data.data[0],l=this.countries.find(c=>c.id===i.arnCountry);this.arnEntryForm.patchValue(h(y({},i),{arnState:typeof i.arnState=="object"?i.arnState.id:i.arnState,arnCountry:l?l.name:this.defaultCountry.name,arnCountryCode:l?l.dial_code:this.defaultCountry.dial_code}))}}catch(d){console.error("Error loading ARN data:",d),yield this.showError("Failed to load ARN data.")}})}onSubmit(){return C(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.arnEntryForm.invalid){let l="";this.f.arnPinCode.errors?.pattern&&(l+=`PIN code must be 6 digits.
`),this.f.arnGstNo.errors?.pattern&&(l+=`GST number is invalid. It should be in the format: 22AAAAA0000A1Z5
`),this.f.arnMobile.errors?.pattern&&(l+=`Mobile number must be 10 digits.
`),l&&(yield this.showError(l)),Object.values(this.arnEntryForm.controls).forEach(c=>{c.invalid&&c.markAsTouched()});return}this.loading=!0;let a=this.arnEntryForm.getRawValue(),d=this.countries.find(l=>l.name===a.arnCountry),i=h(y({},a),{arnCountryCode:d?d.id:this.defaultCountry.id,arnCountry:d?d.id:this.defaultCountry.id,hideStatus:0});try{let l=yield this.arnMasterFormService.processArn(i,this.arnId);if(l.data.code===1)yield E.default.fire("Updated!",l.data.message,"success"),this.router.navigate(["/forms/arn"]);else{let c="";if(l.data.error){let v=l.data.error;v.arnEmail&&(c+=`ARN Email: ${v.arnEmail[0]}
`),v.arnNumber&&(c+=`ARN Number: ${v.arnNumber[0]}
`),v.arnGstNo&&(c+=`ARN GST Number: ${v.arnGstNo[0]}
`)}c?yield this.showError(c):yield this.showError(l.data.message)}}catch(l){console.error("Error updating ARN:",l),yield this.showError("An error occurred while updating the ARN.")}finally{this.loading=!1}})}onCancel(){this.router.navigate(["/forms/arn"])}showError(a){return C(this,null,function*(){yield E.default.fire("Failed!",a,"error")})}static{this.\u0275fac=function(d){return new(d||n)(b(re),b(q),b(I),b(oe))}}static{this.\u0275cmp=g({type:n,selectors:[["app-update-arn-master-form"]],standalone:!0,features:[A],decls:145,vars:23,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","arnNumber","required","","type","text","placeholder","ARN"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","arnName","required","","type","text","placeholder","Name"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cFormControl","","id","arnCountryCode","formControlName","arnCountryCode","readonly","","type","text","placeholder","Country Code"],["cLabel","","for","arnCountryCode",1,"ms-2"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","arnMobile","required","","type","text","placeholder","Mobile"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","arnAddress","required","","type","text","placeholder","Address"],["cLabel","","for","validationCustom04",1,"ms-2"],["cSelect","","id","validationCustom05","formControlName","arnState","required",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","arnCountry","readonly","","type","text","placeholder","Country"],["cLabel","","for","validationCustom06",1,"ms-2"],["cFormControl","","id","validationCustom07","formControlName","arnPinCode","required","","type","text","placeholder","Pincode"],["cLabel","","for","validationCustom07",1,"ms-2"],["cFormControl","","id","validationCustom08","formControlName","arnEmail","required","","type","text","placeholder","Email"],["cLabel","","for","validationCustom08",1,"ms-2"],["cFormControl","","id","validationCustom09","formControlName","arnEuin","required","","type","text","placeholder","EUIN"],["cLabel","","for","validationCustom09",1,"ms-2"],["cFormControl","","id","validationCustom10","formControlName","arnGstNo","required","","type","text","placeholder","GST No"],["cLabel","","for","validationCustom10",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"valid"],[3,"value"]],template:function(d,i){if(d&1){let l=N();t(0,"c-row"),e(1,`
  `),t(2,"c-col",1),e(3,`
    `),t(4,"c-card",2),e(5,`
      `),t(6,"c-card-header"),e(7,`
        `),t(8,"strong"),e(9,"Update ARN Entry Form"),r(),e(10,`
      `),r(),e(11,`
      `),t(12,"c-card-body"),e(13,`
        `),t(14,"form",3,0),S("ngSubmit",function(){return F(l),x(i.onSubmit())}),e(16,`
          `),t(17,"c-col",4),e(18,`
            `),p(19,"input",5),e(20,`
            `),t(21,"label",6),e(22,"ARN"),r(),e(23,`
            `),u(24,me,2,1,"c-form-feedback",7),e(25,`
          `),r(),e(26,`
          
          `),t(27,"c-col",4),e(28,`
            `),p(29,"input",8),e(30,`
            `),t(31,"label",9),e(32,"Name"),r(),e(33,`
            `),u(34,de,2,1,"c-form-feedback",7),e(35,`
          `),r(),e(36,`

          `),t(37,"c-col",10),e(38,`
            `),t(39,"c-input-group",11),e(40,`
              `),t(41,"c-col",12),e(42,`
                `),p(43,"input",13),e(44,`
                `),t(45,"label",14),e(46,"Country Code"),r(),e(47,`
              `),r(),e(48,`
              `),t(49,"c-col",15),e(50,`
                `),p(51,"input",16),e(52,`
                `),t(53,"label",17),e(54,"Mobile"),r(),e(55,`
              `),r(),e(56,`
            `),r(),e(57,`
            `),u(58,se,2,1,"c-form-feedback",7),e(59,`
          `),r(),e(60,`
          
          `),t(61,"c-col",4),e(62,`
            `),p(63,"input",18),e(64,`
            `),t(65,"label",19),e(66,"Address"),r(),e(67,`
            `),u(68,ce,2,1,"c-form-feedback",7),e(69,`
          `),r(),e(70,`
          
          `),t(71,"c-col",4),e(72,`
            `),t(73,"select",20),e(74,`
              `),u(75,ue,2,2,"option",21),e(76,`
            `),r(),e(77,`
            `),t(78,"label",22),e(79,"State"),r(),e(80,`
            `),u(81,pe,2,1,"c-form-feedback",7),e(82,`
          `),r(),e(83,`

          `),t(84,"c-col",4),e(85,`
            `),p(86,"input",23),e(87,`
            `),t(88,"label",24),e(89,"Country"),r(),e(90,`
          `),r(),e(91,`
          
          `),t(92,"c-col",4),e(93,`
            `),p(94,"input",25),e(95,`
            `),t(96,"label",26),e(97,"Pincode"),r(),e(98,`
            `),u(99,fe,2,1,"c-form-feedback",7),e(100,`
          `),r(),e(101,`
          
          `),t(102,"c-col",4),e(103,`
            `),p(104,"input",27),e(105,`
            `),t(106,"label",28),e(107,"Email"),r(),e(108,`
            `),u(109,Ce,2,1,"c-form-feedback",7),e(110,`
          `),r(),e(111,`
          
          `),t(112,"c-col",4),e(113,`
            `),p(114,"input",29),e(115,`
            `),t(116,"label",30),e(117,"EUIN"),r(),e(118,`
            `),u(119,ve,2,1,"c-form-feedback",7),e(120,`
          `),r(),e(121,`
          
          `),t(122,"c-col",4),e(123,`
            `),p(124,"input",31),e(125,`
            `),t(126,"label",32),e(127,"GST No"),r(),e(128,`
            `),u(129,be,2,1,"c-form-feedback",7),e(130,`
          `),r(),e(131,`
          
          `),t(132,"c-col",1),e(133,`
            `),t(134,"button",33),e(135,`
              Update
            `),r(),e(136,`
            `),t(137,"button",34),S("click",function(){return F(l),x(i.onCancel())}),e(138,`
              Cancel
            `),r(),e(139,`
          `),r(),e(140,`
        `),r(),e(141,`
      `),r(),e(142,`
    `),r(),e(143,`
  `),r(),e(144,`
`),r()}d&2&&(m(14),o("formGroup",i.arnEntryForm)("validated",i.customStylesValidated),m(3),o("cFormFloating",!0),m(7),o("ngIf",i.f.arnNumber.errors&&(i.f.arnNumber.touched||i.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",i.f.arnName.errors&&(i.f.arnName.touched||i.submitted)),m(7),o("cFormFloating",!0),m(8),o("cFormFloating",!0),m(9),o("ngIf",i.f.arnMobile.errors&&(i.f.arnMobile.touched||i.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",i.f.arnAddress.errors&&(i.f.arnAddress.touched||i.submitted)),m(3),o("cFormFloating",!0),m(4),o("ngForOf",i.states),m(6),o("ngIf",i.f.arnState.errors&&(i.f.arnState.touched||i.submitted)),m(3),o("cFormFloating",!0),m(8),o("cFormFloating",!0),m(7),o("ngIf",i.f.arnPinCode.errors&&(i.f.arnPinCode.touched||i.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",i.f.arnEmail.errors&&(i.f.arnEmail.touched||i.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",i.f.arnEuin.errors&&(i.f.arnEuin.touched||i.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",i.f.arnGstNo.errors&&(i.f.arnGstNo.touched||i.submitted)))},dependencies:[M,k,w,B,Z,D,j,U,G,ne,K,Y,ee,z,X,H,J,te,Q,W,ie,P,O,$,R,V,L,T]})}}return n})();export{Ue as UpdateArnMasterFormComponent};
