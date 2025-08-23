import './polyfills.server.mjs';
import{a as re}from"./chunk-ND5M5W3N.mjs";import{a as oe}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as K,F as O,Fa as Q,G,Ga as W,Ha as X,I as L,Ia as Y,J as R,Ka as Z,Ma as ee,N as j,Na as te,O as P,Oa as ie,S as B,T as $,j as A,q as I,r as V,ra as H,sa as g,ta as U,u as q,ua as z,za as J}from"./chunk-B4NKEOAB.mjs";import{d as w}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as b,Fb as k,Gb as _,Lc as N,Mc as D,Qb as e,Rb as v,Sa as m,Sb as E,Sc as T,Ta as h,Zb as M,ia as x,lb as d,nb as l,p as y,sa as F,ta as C,xb as t,yb as i,zb as S}from"./chunk-S7ATBOQE.mjs";import{g as ae,h as u}from"./chunk-COT65Y5O.mjs";var p=ae(oe());function le(n,c){if(n&1&&(t(0,"option",19),e(1),i()),n&2){let r=c.$implicit;l("value",r.id),m(),v(r.amcName)}}function me(n,c){n&1&&(t(0,"c-form-feedback",20),e(1,`
                Please select an AMC.
              `),i()),n&2&&l("valid",!1)}function se(n,c){if(n&1&&(t(0,"option",19),e(1),i()),n&2){let r=c.$implicit;l("value",r.id),m(),v(r.fileTypeName)}}function ce(n,c){n&1&&(t(0,"c-form-feedback",20),e(1,`
                Please select a File Type.
              `),i()),n&2&&l("valid",!1)}function de(n,c){n&1&&(t(0,"c-form-feedback",20),e(1,`
                Please provide a Description.
              `),i()),n&2&&l("valid",!1)}function pe(n,c){if(n&1&&(t(0,"c-form-feedback",20),e(1),i()),n&2){let r=_();l("valid",!1),m(),E(`
                `,r.fileError,`
              `)}}var Ie=(()=>{class n{constructor(r,o,a){this.fb=r,this.router=o,this.marketingService=a,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.amc=[],this.fileType=[],this.marketingCreateForm=this.fb.group({marketingAmcName:["",g.required],marketingType:["",g.required],marketingDescription:["",g.required],marketingFile:[null,g.required]})}ngOnInit(){return u(this,null,function*(){yield this.loadAmcData(),yield this.loadFileType()})}get f(){return this.marketingCreateForm.controls}loadAmcData(){return u(this,null,function*(){try{let r=yield this.marketingService.getAmc();this.amc=r.data}catch(r){console.error("Error loading AMC data:",r),yield p.default.fire("Error","Failed to load AMC data","error")}})}loadFileType(){return u(this,null,function*(){try{let r=yield this.marketingService.getFileType();this.fileType=r.data}catch(r){console.error("Error loading FileType data:",r),yield p.default.fire("Error","Failed to load AMC data","error")}})}onFileChange(r){let o=r.target;o.files&&o.files.length>0?(this.selectedFile=o.files[0],this.fileError=null):(this.selectedFile=null,this.fileError="Please choose a file.")}onSubmit(){return u(this,null,function*(){this.customStylesValidated=!0,this.submitted=!0;let r=[];if(Object.keys(this.f).forEach(s=>{this.f[s].invalid&&r.push(this.getFieldName(s))}),this.selectedFile||(r.push("Marketing File"),this.fileError="Please choose a file."),r.length>0){yield p.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${r.join("<br>")}`,icon:"error"});return}let o=new FormData;o.append("marketingAmcName",this.f.marketingAmcName.value),o.append("marketingType",this.f.marketingType.value),o.append("marketingDescription",this.f.marketingDescription.value),this.selectedFile&&o.append("marketingFile",this.selectedFile,this.selectedFile.name),o.append("hideStatus","0");let a="0";this.loading=!0;try{(yield y(this.marketingService.processMarketing(o,"0"))).code===1?(yield p.default.fire("Added!","Marketing created successfully","success"),this.router.navigate(["/forms/marketing"])):yield p.default.fire("Failed!","Error creating marketing","error")}catch(s){console.error("Error processing Marketing:",s);let f="An error occurred while processing the marketing entry.";s instanceof Error?f=s.message:typeof s=="string"&&(f=s),yield p.default.fire("Failed!",f,"error")}finally{this.loading=!1}})}getFieldName(r){return{marketingAmcName:"AMC Name",marketingType:"Marketing Type",marketingDescription:"Marketing Description",marketingFile:"Marketing File"}[r]||r}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.marketingCreateForm.reset()}static{this.\u0275fac=function(o){return new(o||n)(h(ee),h(w),h(re))}}static{this.\u0275cmp=x({type:n,selectors:[["app-create-marketing"]],standalone:!0,features:[M],decls:82,vars:11,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","marketingAmcName","required",""],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","marketingType","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["md","12",3,"cFormFloating"],["cFormControl","","id","validationCustom03","rows","3","formControlName","marketingDescription","required","","placeholder","Description"],["cLabel","","for","validationCustom03",1,"ms-2"],["cLabel","","for","validationCustom04"],["cFormControl","","id","validationCustom04","formControlName","marketingFile","required","","type","file","accept",".pdf,.doc,.docx,.jpg,.jpeg,.xls,.xlsx,.csv,.txt,.mp4",3,"change"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"value"],[3,"valid"]],template:function(o,a){if(o&1){let s=b();t(0,"c-row"),e(1,`
    `),t(2,"c-col",1),e(3,`
      `),t(4,"c-card",2),e(5,`
        `),t(6,"c-card-header"),e(7,`
          `),t(8,"strong"),e(9,"New Marketing"),i(),e(10,`
        `),i(),e(11,`
        `),t(12,"c-card-body"),e(13,`
          `),t(14,"form",3,0),k("ngSubmit",function(){return F(s),C(a.onSubmit())}),e(16,`
            
            `),t(17,"c-col",4),e(18,`
              `),t(19,"select",5),e(20,`
                `),t(21,"option",6),e(22,"Select an AMC"),i(),e(23,`
                `),d(24,le,2,2,"option",7),e(25,`
              `),i(),e(26,`
              `),t(27,"label",8),e(28,"AMC Name"),i(),e(29,`
              `),d(30,me,2,1,"c-form-feedback",9),e(31,`
            `),i(),e(32,`
            
            `),t(33,"c-col",4),e(34,`
              `),t(35,"select",10),e(36,`
                `),t(37,"option",6),e(38,"Select an FileType"),i(),e(39,`
                `),d(40,se,2,2,"option",7),e(41,`
              `),i(),e(42,`
              `),t(43,"label",11),e(44,"File Type"),i(),e(45,`
              `),d(46,ce,2,1,"c-form-feedback",9),e(47,`
            `),i(),e(48,`
  
            `),t(49,"c-col",12),e(50,`
              `),S(51,"textarea",13),e(52,`
              `),t(53,"label",14),e(54,"Description"),i(),e(55,`
              `),d(56,de,2,1,"c-form-feedback",9),e(57,`
            `),i(),e(58,`
  
            `),t(59,"c-col"),e(60,`
              `),t(61,"label",15),e(62,"File Upload"),i(),e(63,`
              `),t(64,"input",16),k("change",function(ne){return F(s),C(a.onFileChange(ne))}),i(),e(65,`
              `),d(66,pe,2,2,"c-form-feedback",9),e(67,`
            `),i(),e(68,`
  
            `),t(69,"c-col",1),e(70,`
              `),t(71,"button",17),e(72,`
                Save
              `),i(),e(73,`
              `),t(74,"button",18),k("click",function(){return F(s),C(a.onReset())}),e(75,`
                Reset
              `),i(),e(76,`
            `),i(),e(77,`
          `),i(),e(78,`
        `),i(),e(79,`
      `),i(),e(80,`
    `),i(),e(81,`
  `),i()}o&2&&(m(14),l("formGroup",a.marketingCreateForm)("validated",a.customStylesValidated),m(3),l("cFormFloating",!0),m(7),l("ngForOf",a.amc),m(6),l("ngIf",a.f.marketingAmcName.errors&&(a.f.marketingAmcName.touched||a.submitted)),m(3),l("cFormFloating",!0),m(7),l("ngForOf",a.fileType),m(6),l("ngIf",a.f.marketingType.errors&&(a.f.marketingType.touched||a.submitted)),m(3),l("cFormFloating",!0),m(7),l("ngIf",a.f.marketingDescription.errors&&(a.f.marketingDescription.touched||a.submitted)),m(10),l("ngIf",a.fileError&&(a.submitted||a.selectedFile)))},dependencies:[D,T,N,$,B,I,P,q,V,ie,J,X,Y,H,W,U,z,Z,K,Q,te,O,R,j,G,L,A]})}}return n})();export{Ie as CreateMarketingComponent};
