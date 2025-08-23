import './polyfills.server.mjs';
import{a as ie}from"./chunk-UQ4ZCVJL.mjs";import{a as oe}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as J,F as P,Fa as K,G as D,Ga as Q,H as R,Ha as W,I as V,Ia as X,J as L,Ka as Y,Ma as ee,N as O,Na as te,O as $,Oa as re,S as Z,T as B,j as I,q,r as T,ra as j,sa as m,ta as z,u as G,ua as U,za as H}from"./chunk-B4NKEOAB.mjs";import{d as w}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as g,Fb as x,Lc as A,Mc as M,Qb as e,Rb as N,Sa as a,Sc as k,Ta as y,Zb as _,ia as E,lb as c,nb as o,sa as b,ta as v,xb as r,yb as i,zb as u}from"./chunk-S7ATBOQE.mjs";import{a as h,b as S,g as ne,h as C}from"./chunk-COT65Y5O.mjs";var F=ne(oe());function ae(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide an ARN."),i()),n&2&&o("valid",!1)}function le(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide a Name."),i()),n&2&&o("valid",!1)}function me(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide a Mobile Number."),i()),n&2&&o("valid",!1)}function de(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide an Address."),i()),n&2&&o("valid",!1)}function se(n,f){if(n&1&&(r(0,"option",37),e(1),i()),n&2){let l=f.$implicit;o("value",l.id),a(),N(l.stateName)}}function ce(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide State."),i()),n&2&&o("valid",!1)}function ue(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide a Pincode"),i()),n&2&&o("valid",!1)}function fe(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide an Email."),i()),n&2&&o("valid",!1)}function pe(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide an EVIN."),i()),n&2&&o("valid",!1)}function Ce(n,f){n&1&&(r(0,"c-form-feedback",36),e(1,"Please provide a GST No."),i()),n&2&&o("valid",!1)}var Ge=(()=>{class n{constructor(l,d,t){this.fb=l,this.router=d,this.arnMasterFormService=t,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.states=[],this.countries=[],this.defaultCountry={id:1,code:"IN",name:"India",dial_code:"+91"},this.arnEntryForm=this.fb.group({arnNumber:["",m.required],arnName:["",m.required],arnCountryCode:[{value:this.defaultCountry.dial_code,disabled:!0},m.required],arnMobile:["",[m.required,m.pattern("^[0-9]{10}$")]],arnAddress:["",m.required],arnCountry:[{value:this.defaultCountry.name,disabled:!0},m.required],arnPinCode:["",[m.required,m.pattern("^[0-9]{6}$")]],arnEmail:["",[m.required,m.email]],arnEuin:["",m.required],arnGstNo:["",[m.required,m.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")]],arnState:["",m.required]})}ngOnInit(){return C(this,null,function*(){try{yield this.loadStates(),yield this.loadCountries()}catch(l){console.error("Error during initialization:",l),yield this.showError("An error occurred during initialization.")}})}get f(){return this.arnEntryForm.controls}loadCountries(){return C(this,null,function*(){try{let l=yield this.arnMasterFormService.getCountries();this.countries=l.data;let d=this.countries.find(t=>t.code==="IN");d&&(this.defaultCountry=d,this.arnEntryForm.patchValue({arnCountryCode:this.defaultCountry.dial_code,arnCountry:this.defaultCountry.name}))}catch(l){throw console.error("Error loading countries:",l),l}})}loadStates(){return C(this,null,function*(){try{let l=yield this.arnMasterFormService.getStates();this.states=l.data}catch(l){throw console.error("Error loading states:",l),l}})}onSubmit(){return C(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.arnEntryForm.invalid){let t="";this.f.arnPinCode.errors?.pattern&&(t+=`PIN code must be 6 digits.
`),this.f.arnGstNo.errors?.pattern&&(t+=`GST number is invalid. It should be in the format: 22AAAAA0000A1Z5
`),this.f.arnMobile.errors?.pattern&&(t+=`Mobile number must be 10 digits.
`),t&&(yield this.showError(t)),Object.values(this.arnEntryForm.controls).forEach(s=>{s.invalid&&s.markAsTouched()});return}this.loading=!0;let l=this.arnEntryForm.getRawValue(),d=S(h({},l),{arnCountryCode:this.defaultCountry.id,arnCountry:this.defaultCountry.id,hideStatus:0});try{let t=yield this.arnMasterFormService.processArn(d,"0");if(t.data.code===1)yield F.default.fire("Added!",t.data.message,"success"),this.router.navigate(["/forms/arn"]);else{let s="";if(t.data.error){let p=t.data.error;p.arnEmail&&(s+=`ARN Email: ${p.arnEmail[0]}
`),p.arnNumber&&(s+=`ARN Number: ${p.arnNumber[0]}
`),p.arnGstNo&&(s+=`ARN GST Number: ${p.arnGstNo[0]}
`)}s?yield this.showError(s):yield this.showError(t.data.message)}}catch(t){console.error("Error processing ARN:",t),yield this.showError("An error occurred while processing the ARN.")}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.arnEntryForm.reset({arnCountryCode:this.defaultCountry.dial_code,arnCountry:this.defaultCountry.name}),console.log("Form reset")}showError(l){return C(this,null,function*(){yield F.default.fire("Failed!",l,"error")})}static{this.\u0275fac=function(d){return new(d||n)(y(ee),y(w),y(ie))}}static{this.\u0275cmp=E({type:n,selectors:[["app-create-arn-master-form"]],standalone:!0,features:[_],decls:148,vars:23,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","arnNumber","required","","type","text","placeholder","ARN"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","arnName","required","","type","text","placeholder","Name"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cFormControl","","id","arnCountryCode","formControlName","arnCountryCode","readonly","","type","text","placeholder","Country Code"],["cLabel","","for","arnCountryCode",1,"ms-2"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","arnMobile","required","","type","text","placeholder","Mobile"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","arnAddress","required","","type","text","placeholder","Address"],["cLabel","","for","validationCustom04",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom05","formControlName","arnState","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","arnCountry","readonly","","type","text","placeholder","Country"],["cLabel","","for","validationCustom06",1,"ms-2"],["cFormControl","","id","validationCustom07","formControlName","arnPinCode","required","","type","text","placeholder","Pincode"],["cLabel","","for","validationCustom07",1,"ms-2"],["cFormControl","","id","validationCustom08","formControlName","arnEmail","required","","type","text","placeholder","Email"],["cLabel","","for","validationCustom08",1,"ms-2"],["cFormControl","","id","validationCustom09","formControlName","arnEuin","required","","type","text","placeholder","EUIN"],["cLabel","","for","validationCustom09",1,"ms-2"],["cFormControl","","id","validationCustom10","formControlName","arnGstNo","required","","type","text","placeholder","GST No"],["cLabel","","for","validationCustom10",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"valid"],[3,"value"]],template:function(d,t){if(d&1){let s=g();r(0,"c-row"),e(1,`
  `),r(2,"c-col",1),e(3,`
    `),r(4,"c-card",2),e(5,`
      `),r(6,"c-card-header"),e(7,`
        `),r(8,"strong"),e(9,"New ARN Entry Form"),i(),e(10,`
      `),i(),e(11,`
      `),r(12,"c-card-body"),e(13,`
        `),r(14,"form",3,0),x("ngSubmit",function(){return b(s),v(t.onSubmit())}),e(16,`
          `),r(17,"c-col",4),e(18,`
            `),u(19,"input",5),e(20,`
            `),r(21,"label",6),e(22,"ARN"),i(),e(23,`
            `),c(24,ae,2,1,"c-form-feedback",7),e(25,`
          `),i(),e(26,`
          
          `),r(27,"c-col",4),e(28,`
            `),u(29,"input",8),e(30,`
            `),r(31,"label",9),e(32,"Name"),i(),e(33,`
            `),c(34,le,2,1,"c-form-feedback",7),e(35,`
          `),i(),e(36,`

          `),r(37,"c-col",10),e(38,`
            `),r(39,"c-input-group",11),e(40,`
              `),r(41,"c-col",12),e(42,`
                `),u(43,"input",13),e(44,`
                `),r(45,"label",14),e(46,"Country Code"),i(),e(47,`
              `),i(),e(48,`
              `),r(49,"c-col",15),e(50,`
                `),u(51,"input",16),e(52,`
                `),r(53,"label",17),e(54,"Mobile"),i(),e(55,`
              `),i(),e(56,`
            `),i(),e(57,`
            `),c(58,me,2,1,"c-form-feedback",7),e(59,`
          `),i(),e(60,`
          
          `),r(61,"c-col",4),e(62,`
            `),u(63,"input",18),e(64,`
            `),r(65,"label",19),e(66,"Address"),i(),e(67,`
            `),c(68,de,2,1,"c-form-feedback",7),e(69,`
          `),i(),e(70,`
          
          `),r(71,"c-col",4),e(72,`
            `),r(73,"select",20),e(74,`
              `),r(75,"option",21),e(76,"Select State"),i(),e(77,`
              `),c(78,se,2,2,"option",22),e(79,`
            `),i(),e(80,`
            `),r(81,"label",23),e(82,"State"),i(),e(83,`
            `),c(84,ce,2,1,"c-form-feedback",7),e(85,`
          `),i(),e(86,`

          `),r(87,"c-col",4),e(88,`
            `),u(89,"input",24),e(90,`
            `),r(91,"label",25),e(92,"Country"),i(),e(93,`
          `),i(),e(94,`
          
          `),r(95,"c-col",4),e(96,`
            `),u(97,"input",26),e(98,`
            `),r(99,"label",27),e(100,"Pincode"),i(),e(101,`
            `),c(102,ue,2,1,"c-form-feedback",7),e(103,`
          `),i(),e(104,`
          
          `),r(105,"c-col",4),e(106,`
            `),u(107,"input",28),e(108,`
            `),r(109,"label",29),e(110,"Email"),i(),e(111,`
            `),c(112,fe,2,1,"c-form-feedback",7),e(113,`
          `),i(),e(114,`
          
          `),r(115,"c-col",4),e(116,`
            `),u(117,"input",30),e(118,`
            `),r(119,"label",31),e(120,"EUIN"),i(),e(121,`
            `),c(122,pe,2,1,"c-form-feedback",7),e(123,`
          `),i(),e(124,`
          
          `),r(125,"c-col",4),e(126,`
            `),u(127,"input",32),e(128,`
            `),r(129,"label",33),e(130,"GST No"),i(),e(131,`
            `),c(132,Ce,2,1,"c-form-feedback",7),e(133,`
          `),i(),e(134,`
          
          `),r(135,"c-col",1),e(136,`
            `),r(137,"button",34),e(138,`
              Save
            `),i(),e(139,`
            `),r(140,"button",35),x("click",function(){return b(s),v(t.onReset())}),e(141,`
              Reset
            `),i(),e(142,`
          `),i(),e(143,`
        `),i(),e(144,`
      `),i(),e(145,`
    `),i(),e(146,`
  `),i(),e(147,`
`),i()}d&2&&(a(14),o("formGroup",t.arnEntryForm)("validated",t.customStylesValidated),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.arnNumber.errors&&(t.f.arnNumber.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.arnName.errors&&(t.f.arnName.touched||t.submitted)),a(7),o("cFormFloating",!0),a(8),o("cFormFloating",!0),a(9),o("ngIf",t.f.arnMobile.errors&&(t.f.arnMobile.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.arnAddress.errors&&(t.f.arnAddress.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngForOf",t.states),a(6),o("ngIf",t.f.arnState.errors&&(t.f.arnState.touched||t.submitted)),a(3),o("cFormFloating",!0),a(8),o("cFormFloating",!0),a(7),o("ngIf",t.f.arnPinCode.errors&&(t.f.arnPinCode.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.arnEmail.errors&&(t.f.arnEmail.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.arnEuin.errors&&(t.f.arnEuin.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.arnGstNo.errors&&(t.f.arnGstNo.touched||t.submitted)))},dependencies:[M,k,A,B,Z,q,$,G,T,re,H,W,X,j,Q,z,U,Y,J,K,te,P,L,O,D,R,V,I]})}}return n})();export{Ge as CreateArnMasterFormComponent};
