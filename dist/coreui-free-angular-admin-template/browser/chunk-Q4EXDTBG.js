import{a as ne}from"./chunk-CEB5S2F6.js";import{a as ce}from"./chunk-AJEUVWKL.js";import{Aa as J,B as L,Ba as K,Ga as Q,Ja as W,M as q,Ma as X,N as O,Na as Y,Oa as ee,P as j,Pa as te,Q as R,Ra as ie,Ta as re,U as Z,Ua as oe,V as $,Va as ae,Z as B,_ as z,q as P,x as V,y as U,ya as H,za as p}from"./chunk-K3LN6DFK.js";import{Ga as C,Ia as n,Lb as G,Mb as I,S as N,Sa as i,Sb as M,Ta as r,Ua as y,Ya as T,Z as S,_ as g,_a as x,dc as k,fc as D,jb as e,kb as F,pa as l,qa as h,sb as w}from"./chunk-WAGJM7NU.js";import{a as E,b as _,f as me,g as f}from"./chunk-MYAK5QVS.js";var b=me(ce());function le(a,u){a&1&&(i(0,"c-form-feedback",24),e(1,"Please provide an AMC Name."),r()),a&2&&n("valid",!1)}function se(a,u){a&1&&(i(0,"c-form-feedback",24),e(1,"Please provide an address."),r()),a&2&&n("valid",!1)}function de(a,u){if(a&1&&(i(0,"option",25),e(1),r()),a&2){let o=u.$implicit;n("value",o.id),l(),F(o.stateName)}}function pe(a,u){a&1&&(i(0,"c-form-feedback",24),e(1,"Please select a State."),r()),a&2&&n("valid",!1)}function ue(a,u){a&1&&(i(0,"c-form-feedback",24),e(1,"Please provide a Pincode."),r()),a&2&&n("valid",!1)}function fe(a,u){a&1&&(i(0,"c-form-feedback",24),e(1,"Please provide a GST No."),r()),a&2&&n("valid",!1)}function Ce(a,u){if(a&1&&(i(0,"option",25),e(1),r()),a&2){let o=u.$implicit;n("value",o.id),l(),F(o.gstTypeName)}}function ye(a,u){a&1&&(i(0,"c-form-feedback",24),e(1,"Please select a GST Type."),r()),a&2&&n("valid",!1)}var ke=(()=>{class a{constructor(o,c,t,m){this.fb=o,this.amcService=c,this.route=t,this.router=m,this.customStylesValidated=!1,this.countries=[],this.defaultCountry={id:1,code:"IN",name:"India",dial_code:"+91"},this.states=[],this.gstTypes=[],this.amcId="0",this.loading=!1,this.submitted=!1,this.amcForm=this.fb.group({amcName:["",p.required],amcAddress:["",p.required],amcState:["",p.required],amcCountry:[{value:"",disabled:!0},p.required],amcPinCode:["",[p.required,p.pattern("^[0-9]{6}$")]],amcGstNo:["",[p.required,p.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")]],amcGstType:["",p.required]})}ngOnInit(){return f(this,null,function*(){try{yield Promise.all([this.loadCountries(),this.loadGstTypes(),this.loadStates()]),this.route.params.subscribe(o=>f(this,null,function*(){this.amcId=o.id||"0",yield this.loadAmcData(this.amcId)}))}catch(o){console.error("Error during initialization:",o),yield this.showError("An error occurred during initialization.")}})}get f(){return this.amcForm.controls}loadCountries(){return f(this,null,function*(){try{let o=yield this.amcService.getCountries();this.countries=o.data;let c=this.countries.find(t=>t.code==="IN");c&&(this.defaultCountry=c)}catch(o){throw console.error("Error loading countries:",o),o}})}loadStates(){return f(this,null,function*(){try{let o=yield this.amcService.getStates();this.states=o.data}catch(o){throw console.error("Error loading states:",o),o}})}loadGstTypes(){return f(this,null,function*(){try{let o=yield this.amcService.getGstTypes();this.gstTypes=o.data}catch(o){throw console.error("Error loading GST types:",o),o}})}loadAmcData(o){return f(this,null,function*(){try{let c=yield this.amcService.listsAmc(o);if(c.data.code===1&&c.data.data.length>0){let t=c.data.data[0],m=this.gstTypes.find(v=>v.gstTypeName===t.amcGstType)?.id||null,s=null;typeof t.amcState=="object"&&t.amcState!==null?s=t.amcState.id:typeof t.amcState=="number"&&(s=t.amcState);let d=typeof t.amcCountry=="string"?parseInt(t.amcCountry,10):t.amcCountry,A=this.countries.find(v=>v.id===d);this.amcForm.patchValue({amcName:t.amcName||"",amcAddress:t.amcAddress||"",amcState:s,amcCountry:A?A.name:this.defaultCountry.name,amcPinCode:t.amcPinCode||"",amcGstNo:t.amcGstNo||"",amcGstType:m}),this.amcForm.get("amcCountry")?.disable(),console.log("Loaded AMC data:",t),console.log("Form values after patch:",this.amcForm.value)}}catch(c){throw console.error("Error loading AMC data:",c),c}})}onSubmit(){return f(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.amcForm.invalid){let m="";this.f.amcPinCode.errors?.pattern&&(m+=`PIN code must be 6 digits.
`),this.f.amcGstNo.errors?.pattern&&(m+=`GST number is invalid. It should be in the format: 22AAAAA0000A1Z5
`),m&&(yield this.showError(m)),Object.keys(this.amcForm.controls).forEach(s=>{let d=this.amcForm.get(s);d&&d.invalid&&d.markAsTouched()});return}this.loading=!0;let o=this.amcForm.value,c=this.countries.find(m=>m.name===o.amcCountry),t=_(E({},o),{amcCountry:c?c.id:this.defaultCountry.id,hideStatus:0});console.log("Data being sent:",t);try{let m=yield this.amcService.processAmc(t,this.amcId);if(m.data.code===1)yield b.default.fire("Updated!",m.data.message,"success"),this.router.navigate(["/forms/amc"]);else{let s="";if(m.data.error){let d=m.data.error;d.amcName&&(s+=`AMC Name: ${d.amcName[0]}
`),d.amcGstNo&&(s+=`AMC GST Number: ${d.amcGstNo[0]}
`)}s?yield this.showError(s):yield this.showError(m.data.message)}}catch(m){console.error("Error updating AMC:",m),yield this.showError("An error occurred while updating the AMC.")}finally{this.loading=!1}})}onCancel(){this.router.navigate(["/forms/amc"])}showError(o){return f(this,null,function*(){yield b.default.fire("Failed!",o,"error")})}static{this.\u0275fac=function(c){return new(c||a)(h(re),h(ne),h(k),h(D))}}static{this.\u0275cmp=N({type:a,selectors:[["app-update-amc-master-form"]],standalone:!0,features:[w],decls:110,vars:17,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom02","formControlName","amcName","required","","type","text","placeholder","AMC Name"],["cLabel","","for","validationCustom02",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom04","formControlName","amcAddress","required","","type","text","placeholder","Address"],["cLabel","","for","validationCustom04",1,"ms-2"],["cSelect","","id","validationCustom05","formControlName","amcState"],["value","null"],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","amcCountry","readonly","","type","text","placeholder","Country"],["cLabel","","for","validationCustom06",1,"ms-2"],["cFormControl","","id","validationCustom07","formControlName","amcPinCode","required","","type","text","placeholder","Pincode"],["cLabel","","for","validationCustom07",1,"ms-2"],["cFormControl","","id","validationCustom08","formControlName","amcGstNo","required","","type","text","placeholder","GST No"],["cLabel","","for","validationCustom08",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom09","formControlName","amcGstType"],["cLabel","","for","validationCustom09",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"valid"],[3,"value"]],template:function(c,t){if(c&1){let m=T();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"Update AMC Entry Form"),r(),e(10,`
      `),r(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),x("ngSubmit",function(){return S(m),g(t.onSubmit())}),e(16,`
          
          `),i(17,"c-col",4),e(18,`
            `),y(19,"input",5),e(20,`
            `),i(21,"label",6),e(22,"AMC Name"),r(),e(23,`
            `),C(24,le,2,1,"c-form-feedback",7),e(25,`
          `),r(),e(26,`
          
          `),i(27,"c-col",4),e(28,`
            `),y(29,"input",8),e(30,`
            `),i(31,"label",9),e(32,"Address"),r(),e(33,`
            `),C(34,se,2,1,"c-form-feedback",7),e(35,`
          `),r(),e(36,`
          
          `),i(37,"c-col",4),e(38,`
            `),i(39,"select",10),e(40,`
              `),i(41,"option",11),e(42,"Select State"),r(),e(43,`
              `),C(44,de,2,2,"option",12),e(45,`
            `),r(),e(46,`
            `),i(47,"label",13),e(48,"State"),r(),e(49,`
            `),C(50,pe,2,1,"c-form-feedback",7),e(51,`
          `),r(),e(52,`

          `),i(53,"c-col",4),e(54,`
            `),y(55,"input",14),e(56,`
            `),i(57,"label",15),e(58,"Country"),r(),e(59,`
          `),r(),e(60,`
          
          `),i(61,"c-col",4),e(62,`
            `),y(63,"input",16),e(64,`
            `),i(65,"label",17),e(66,"Pincode"),r(),e(67,`
            `),C(68,ue,2,1,"c-form-feedback",7),e(69,`
          `),r(),e(70,`
          
          `),i(71,"c-col",4),e(72,`
            `),y(73,"input",18),e(74,`
            `),i(75,"label",19),e(76,"GST No"),r(),e(77,`
            `),C(78,fe,2,1,"c-form-feedback",7),e(79,`
          `),r(),e(80,`
          
          `),i(81,"c-col",4),e(82,`
            `),i(83,"select",20),e(84,`
              `),i(85,"option",11),e(86,"Select GST Type"),r(),e(87,`
              `),C(88,Ce,2,2,"option",12),e(89,`
            `),r(),e(90,`
            `),i(91,"label",21),e(92,"GST Type"),r(),e(93,`
            `),C(94,ye,2,1,"c-form-feedback",7),e(95,`
          `),r(),e(96,`
          
          `),i(97,"c-col",1),e(98,`
            `),i(99,"button",22),e(100,`
              Update
            `),r(),e(101,`
            `),i(102,"button",23),x("click",function(){return S(m),g(t.onCancel())}),e(103,`
              Cancel
            `),r(),e(104,`
          `),r(),e(105,`
        `),r(),e(106,`
      `),r(),e(107,`
    `),r(),e(108,`
  `),r(),e(109,`
`),r()}c&2&&(l(14),n("formGroup",t.amcForm)("validated",t.customStylesValidated),l(3),n("cFormFloating",!0),l(7),n("ngIf",t.f.amcName.errors&&t.f.amcName.touched),l(3),n("cFormFloating",!0),l(7),n("ngIf",t.f.amcAddress.errors&&t.f.amcAddress.touched),l(3),n("cFormFloating",!0),l(7),n("ngForOf",t.states),l(6),n("ngIf",t.f.amcState.errors&&t.f.amcState.touched),l(3),n("cFormFloating",!0),l(8),n("cFormFloating",!0),l(7),n("ngIf",t.f.amcPinCode.errors&&t.f.amcPinCode.touched),l(3),n("cFormFloating",!0),l(7),n("ngIf",t.f.amcGstNo.errors&&t.f.amcGstNo.touched),l(3),n("cFormFloating",!0),l(7),n("ngForOf",t.gstTypes),l(6),n("ngIf",t.f.amcGstType.errors&&(t.f.amcGstType.touched||t.submitted)))},dependencies:[M,G,I,z,B,V,L,$,U,ae,Q,ee,te,H,Y,J,K,ie,W,X,oe,q,R,Z,O,j,P]})}}return a})();export{ke as UpdateAmcMasterFormComponent};
