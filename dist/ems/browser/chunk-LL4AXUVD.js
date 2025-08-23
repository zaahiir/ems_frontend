import{a as ee}from"./chunk-ZHEVBZ5L.js";import{a as re}from"./chunk-AJEUVWKL.js";import{Aa as j,B as k,Ba as B,Ga as $,Ja as H,M as V,Ma as z,N as q,Na as J,Oa as K,P as T,Pa as Q,Q as R,Ra as W,Ta as X,U as G,Ua as Y,V as L,Va as Z,Z as O,_ as U,q as I,x as D,y as w,ya as P,za as c}from"./chunk-K3LN6DFK.js";import{Ga as l,Ia as a,Lb as b,Mb as _,S,Sa as i,Sb as M,Ta as r,Ua as y,Ya as h,Z as v,_ as A,_a as C,fc as N,jb as e,k as F,kb as x,pa as m,qa as f,sb as E}from"./chunk-WAGJM7NU.js";import{f as ie,g as p}from"./chunk-MYAK5QVS.js";var s=ie(re());function ne(n,u){n&1&&(i(0,"c-form-feedback",18),e(1,"Please provide a Name."),r()),n&2&&a("valid",!1)}function oe(n,u){n&1&&(i(0,"c-form-feedback",18),e(1,"Please select a date."),r()),n&2&&a("valid",!1)}function ae(n,u){n&1&&(i(0,"c-form-feedback",18),e(1,"Please provide an AUM."),r()),n&2&&a("valid",!1)}function me(n,u){if(n&1&&(i(0,"option",19),e(1),r()),n&2){let o=u.$implicit;a("value",o.id),m(),x(o.modeName)}}function de(n,u){n&1&&(i(0,"c-form-feedback",18),e(1,"Please provide a Mode."),r()),n&2&&a("valid",!1)}var Ie=(()=>{class n{constructor(o,d,t){this.fb=o,this.router=d,this.industryAumEntryService=t,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.mode=[],this.industryAumEntryForm=this.fb.group({industryName:["",c.required],industryAumDate:["",c.required],industryAumAmount:["",c.required],industryAumMode:["",c.required]})}ngOnInit(){return p(this,null,function*(){yield this.loadMode()})}get f(){return this.industryAumEntryForm.controls}loadMode(){return p(this,null,function*(){try{let o=yield this.industryAumEntryService.getMode();this.mode=o.data}catch(o){console.error("Error loading AMC data:",o),yield s.default.fire("Error","Failed to load AMC data","error")}})}onSubmit(){return p(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.industryAumEntryForm.invalid){let t=this.getMissingFields();yield s.default.fire({title:"Missing Required Fields",html:`Please fill in the following required fields:<br>${t.join("<br>")}`,icon:"error"});return}if(this.loading)return;this.loading=!0;let o={industryName:this.f.industryName.value,industryAumDate:this.f.industryAumDate.value,industryAumAmount:this.f.industryAumAmount.value,industryAumMode:this.f.industryAumMode.value,hideStatus:0},d="0";try{let t=yield F(this.industryAumEntryService.processIndustryAumEntry(o,"0"));t.code===1?(yield s.default.fire("Added!",t.message,"success"),yield this.router.navigate(["/forms/industryAum"])):yield s.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error processing industry AUM entry:",t),yield s.default.fire("Failed!","An unexpected error occurred. Please try again.","error")}finally{this.loading=!1}})}getMissingFields(){let o=[];return Object.keys(this.f).forEach(d=>{this.f[d].errors?.required&&o.push(this.getFieldName(d))}),o}getFieldName(o){return{industryName:"Industry Name",industryAumDate:"Industry AUM Date",industryAumAmount:"Industry AUM Amount",industryAumMode:"Industry AUM Mode"}[o]||o}onReset(){this.customStylesValidated=!1,console.log("Reset... 1")}static{this.\u0275fac=function(d){return new(d||n)(f(X),f(N),f(ee))}}static{this.\u0275cmp=S({type:n,selectors:[["app-create-industry-aum-entry"]],standalone:!0,features:[E],decls:76,vars:11,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","industryName","required","","type","text","placeholder","Name"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","industryAumDate","required","","type","date","placeholder","Date"],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","industryAumAmount","required","","type","text","placeholder","AUM"],["cLabel","","for","validationCustom03",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom04","formControlName","industryAumMode","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom04",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"valid"],[3,"value"]],template:function(d,t){if(d&1){let g=h();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"New Industry AUM Entry Form"),r(),e(10,`
      `),r(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),C("ngSubmit",function(){return v(g),A(t.onSubmit())}),e(16,`
          `),i(17,"c-col",4),e(18,`
            `),y(19,"input",5),e(20,`
            `),i(21,"label",6),e(22,"Name"),r(),e(23,`
            `),l(24,ne,2,1,"c-form-feedback",7),e(25,`
          `),r(),e(26,`

          `),i(27,"c-col",4),e(28,`
            `),y(29,"input",8),e(30,`
            `),i(31,"label",9),e(32,"Date"),r(),e(33,`
            `),l(34,oe,2,1,"c-form-feedback",7),e(35,`
          `),r(),e(36,`

          `),i(37,"c-col",4),e(38,`
            `),y(39,"input",10),e(40,`
            `),i(41,"label",11),e(42,"AUM"),r(),e(43,`
            `),l(44,ae,2,1,"c-form-feedback",7),e(45,`
          `),r(),e(46,`

          `),i(47,"c-col",4),e(48,`
            `),i(49,"select",12),e(50,`
              `),i(51,"option",13),e(52,"Select a Mode"),r(),e(53,`
              `),l(54,me,2,2,"option",14),e(55,`
            `),r(),e(56,`
            `),i(57,"label",15),e(58,"Mode"),r(),e(59,`
            `),l(60,de,2,1,"c-form-feedback",7),e(61,`
          `),r(),e(62,`

          `),i(63,"c-col",1),e(64,`
            `),i(65,"button",16),e(66,`
              Save
            `),r(),e(67,`
            `),i(68,"button",17),C("click",function(){return v(g),A(t.onReset())}),e(69,`
              Reset
            `),r(),e(70,`
          `),r(),e(71,`
        `),r(),e(72,`
      `),r(),e(73,`
    `),r(),e(74,`
  `),r(),e(75,`
`),r()}d&2&&(m(14),a("formGroup",t.industryAumEntryForm)("validated",t.customStylesValidated),m(3),a("cFormFloating",!0),m(7),a("ngIf",t.f.industryName.errors&&(t.f.industryName.touched||t.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngIf",t.f.industryAumDate.errors&&(t.f.industryAumDate.touched||t.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngIf",t.f.industryAumAmount.errors&&(t.f.industryAumAmount.touched||t.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngForOf",t.mode),m(6),a("ngIf",t.f.industryAumMode.errors&&(t.f.industryAumMode.touched||t.submitted)))},dependencies:[_,M,b,U,O,D,L,k,w,Z,$,K,Q,P,J,j,B,W,H,z,Y,V,R,G,q,T,I]})}}return n})();export{Ie as CreateIndustryAumEntryComponent};
