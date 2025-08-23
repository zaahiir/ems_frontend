import './polyfills.server.mjs';
import{a as oe}from"./chunk-ND5M5W3N.mjs";import{a as me}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as X,F as L,Fa as Y,G as O,Ga as Z,Ha as ee,I as R,Ia as te,J as B,Ka as ie,Ma as re,N as P,Na as ne,O as $,Oa as ae,S as H,T as z,j as V,q as j,r as q,ra as J,sa as y,ta as K,u as G,ua as Q,za as W}from"./chunk-B4NKEOAB.mjs";import{b as A,d as U}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as N,Fb as v,Gb as _,Lc as T,Mc as w,Qb as e,Rb as S,Sa as c,Sb as E,Sc as I,Ta as u,Zb as D,ia as b,lb as f,nb as l,p as x,qc as M,sa as h,ta as F,xb as r,yb as n,zb as C}from"./chunk-S7ATBOQE.mjs";import{g as le,h as p}from"./chunk-COT65Y5O.mjs";var s=le(me());function ce(o,d){if(o&1&&(r(0,"option",20),e(1),n()),o&2){let t=d.$implicit;l("value",t.id),c(),S(t.amcName)}}function se(o,d){o&1&&(r(0,"c-form-feedback",21),e(1,`
                Please select an AMC.
              `),n()),o&2&&l("valid",!1)}function de(o,d){if(o&1&&(r(0,"option",20),e(1),n()),o&2){let t=d.$implicit;l("value",t.id),c(),S(t.fileTypeName)}}function pe(o,d){o&1&&(r(0,"c-form-feedback",21),e(1,`
                Please select a File Type.
              `),n()),o&2&&l("valid",!1)}function fe(o,d){o&1&&(r(0,"c-form-feedback",21),e(1,`
                Please provide a Description.
              `),n()),o&2&&l("valid",!1)}function ge(o,d){if(o&1&&(r(0,"c-form-feedback",21),e(1),n()),o&2){let t=_();l("valid",!1),c(),E(`
                `,t.fileError,`
              `)}}var Ae=(()=>{class o{constructor(t,a,i,m,g){this.fb=t,this.router=a,this.route=i,this.marketingService=m,this.cdr=g,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.amcs=[],this.fileType=[],this.marketingId="0",this.currentFileName="No file currently uploaded",this.marketingUpdateForm=this.fb.group({marketingAmcName:["",y.required],marketingType:["",y.required],marketingDescription:["",y.required],marketingFile:[null]})}ngOnInit(){return p(this,null,function*(){yield this.loadAmcs(),yield this.loadFileType(),this.route.params.subscribe(t=>p(this,null,function*(){this.marketingId=t.id||"0",yield this.loadMarketingData(this.marketingId)}))})}get f(){return this.marketingUpdateForm.controls}loadAmcs(){return p(this,null,function*(){try{let t=yield this.marketingService.getAmc();this.amcs=t.data,this.cdr.detectChanges()}catch(t){console.error("Error loading AMCs:",t),yield s.default.fire("Error","Failed to load AMCs","error")}})}loadFileType(){return p(this,null,function*(){try{let t=yield this.marketingService.getFileType();this.fileType=t.data}catch(t){console.error("Error loading FileType data:",t),yield s.default.fire("Error","Failed to load AMC data","error")}})}loadMarketingData(t){return p(this,null,function*(){try{let a=yield this.marketingService.getMarketingById(t).toPromise();if(a&&a.code===1&&a.data){let i=a.data,m=this.amcs.find(k=>String(k.amcName)===String(i.marketingAmcName))?.id,g=this.fileType.find(k=>String(k.fileTypeName)===String(i.marketingType))?.id;this.marketingUpdateForm.patchValue({marketingAmcName:m,marketingType:g,marketingDescription:i.marketingDescription}),this.currentFileName=i.marketingFile?this.getFileName(i.marketingFile):"No file currently uploaded",this.cdr.detectChanges()}}catch(a){console.error("Error loading Marketing data:",a),yield s.default.fire("Error","Failed to load marketing data","error")}})}getFileName(t){return t.split("/").pop()||t}onFileChange(t){let a=t.target;a.files&&a.files.length>0?(this.selectedFile=a.files[0],this.currentFileName=this.selectedFile.name.split("\\").pop()?.split("/").pop()||"No file selected",this.fileError=null):(this.selectedFile=null,this.currentFileName="No file selected",this.fileError="Please choose a file."),this.cdr.detectChanges()}onSubmit(){return p(this,null,function*(){this.customStylesValidated=!0,this.submitted=!0;let t=[];if(Object.keys(this.f).forEach(m=>{this.f[m].invalid&&t.push(this.getFieldName(m))}),t.length>0){yield s.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${t.join("<br>")}`,icon:"error"});return}console.log("Submit...");let a=new FormData,i=this.marketingUpdateForm.value;a.append("marketingAmcName",i.marketingAmcName),a.append("marketingType",i.marketingType),a.append("marketingDescription",i.marketingDescription),this.selectedFile&&a.append("marketingFile",this.selectedFile,this.selectedFile.name),a.append("hideStatus","0"),this.loading=!0;try{let m=yield x(this.marketingService.processMarketing(a,this.marketingId));m.code===1?(yield s.default.fire("Updated!",m.message,"success"),this.router.navigate(["/forms/marketing"])):yield s.default.fire("Failed!",m.message,"error")}catch(m){console.error("Error updating Marketing:",m),yield s.default.fire("Failed!","An error occurred while updating the Marketing","error")}finally{this.loading=!1}})}getFieldName(t){return{marketingAmcName:"AMC Name",marketingType:"Marketing Type",marketingDescription:"Marketing Description",marketingFile:"Marketing File"}[t]||t}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/forms/marketing"])}static{this.\u0275fac=function(a){return new(a||o)(u(re),u(U),u(A),u(oe),u(M))}}static{this.\u0275cmp=b({type:o,selectors:[["app-update-marketing"]],standalone:!0,features:[D],decls:81,vars:12,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","marketingAmcName","required",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","marketingType","required",""],["value","","disabled",""],["cLabel","","for","validationCustom02",1,"ms-2"],["md","12",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","marketingDescription","rows","3","required","","placeholder","Description"],["cLabel","","for","validationCustom03",1,"ms-2"],["cLabel","","for","validationCustom04"],["cFormControl","","id","validationCustom04","formControlName","marketingFile","type","file","accept",".pdf,.doc,.docx,.jpg,.jpeg,.xls,.xlsx,.csv,.txt,.mp4",3,"change"],["cFormControl","","id","fileNameDisplay","plaintext","","readonly","","type","text",3,"value"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"value"],[3,"valid"]],template:function(a,i){if(a&1){let m=N();r(0,"c-row"),e(1,`
    `),r(2,"c-col",1),e(3,`
      `),r(4,"c-card",2),e(5,`
        `),r(6,"c-card-header"),e(7,`
          `),r(8,"strong"),e(9,"Update Marketing"),n(),e(10,`
        `),n(),e(11,`
        `),r(12,"c-card-body"),e(13,`
          `),r(14,"form",3,0),v("ngSubmit",function(){return h(m),F(i.onSubmit())}),e(16,`
            
            `),r(17,"c-col",4),e(18,`
              `),r(19,"select",5),e(20,`
                `),f(21,ce,2,2,"option",6),e(22,`
              `),n(),e(23,`
              `),r(24,"label",7),e(25,"AMC Name"),n(),e(26,`
              `),f(27,se,2,1,"c-form-feedback",8),e(28,`
            `),n(),e(29,`
            
            `),r(30,"c-col",4),e(31,`
              `),r(32,"select",9),e(33,`
                `),r(34,"option",10),e(35,"Select an FileType"),n(),e(36,`
                `),f(37,de,2,2,"option",6),e(38,`
              `),n(),e(39,`
              `),r(40,"label",11),e(41,"File Type"),n(),e(42,`
              `),f(43,pe,2,1,"c-form-feedback",8),e(44,`
            `),n(),e(45,`
  
            `),r(46,"c-col",12),e(47,`
              `),C(48,"textarea",13),e(49,`
              `),r(50,"label",14),e(51,"Description"),n(),e(52,`
              `),f(53,fe,2,1,"c-form-feedback",8),e(54,`
            `),n(),e(55,`
  
            `),r(56,"c-col"),e(57,`
              `),r(58,"label",15),e(59,"File Upload"),n(),e(60,`
              `),r(61,"input",16),v("change",function(k){return h(m),F(i.onFileChange(k))}),n(),e(62,`
              `),C(63,"input",17),e(64,`
              `),f(65,ge,2,2,"c-form-feedback",8),e(66,`
            `),n(),e(67,`
  
            `),r(68,"c-col",1),e(69,`
              `),r(70,"button",18),e(71,`
                Update
              `),n(),e(72,`
              `),r(73,"button",19),v("click",function(){return h(m),F(i.onCancel())}),e(74,`
                Cancel
              `),n(),e(75,`
            `),n(),e(76,`
          `),n(),e(77,`
        `),n(),e(78,`
      `),n(),e(79,`
    `),n(),e(80,`
  `),n()}a&2&&(c(14),l("formGroup",i.marketingUpdateForm)("validated",i.customStylesValidated),c(3),l("cFormFloating",!0),c(4),l("ngForOf",i.amcs),c(6),l("ngIf",i.f.marketingAmcName.errors&&(i.f.marketingAmcName.touched||i.submitted)),c(3),l("cFormFloating",!0),c(7),l("ngForOf",i.fileType),c(6),l("ngIf",i.f.marketingType.errors&&(i.f.marketingType.touched||i.submitted)),c(3),l("cFormFloating",!0),c(7),l("ngIf",i.f.marketingDescription.errors&&(i.f.marketingDescription.touched||i.submitted)),c(10),l("value",i.currentFileName),c(2),l("ngIf",i.fileError&&(i.submitted||i.selectedFile)))},dependencies:[I,T,w,ae,W,ee,te,J,Z,K,Q,ie,X,Y,ne,z,H,j,G,q,L,B,$,P,O,R,V]})}}return o})();export{Ae as UpdateMarketingComponent};
