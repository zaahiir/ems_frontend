import './polyfills.server.mjs';
import{a as ae}from"./chunk-GMWXNEGE.mjs";import{a as me}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as X,F as G,Fa as Y,G as O,Ga as Z,Ha as ee,I as P,Ia as te,J as B,Ka as ie,Ma as re,N as R,Na as oe,O as $,Oa as ne,S as z,T as H,j as M,q as j,r as L,ra as J,sa as C,ta as K,u as q,ua as Q,za as W}from"./chunk-B4NKEOAB.mjs";import{b as k,d as V}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as _,Fb as v,Gb as N,Lc as I,Mc as A,Qb as e,Rb as S,Sa as m,Sb as T,Sc as U,Ta as F,Zb as w,ia as E,lb as p,nb as s,p as b,qc as D,sa as g,ta as y,xb as r,yb as o,zb as x}from"./chunk-S7ATBOQE.mjs";import{g as se,h as u}from"./chunk-COT65Y5O.mjs";var c=se(me());function le(a,d){if(a&1&&(r(0,"option",20),e(1),o()),a&2){let t=d.$implicit;s("value",t.id),m(),S(t.amcName)}}function ce(a,d){a&1&&(r(0,"c-form-feedback",21),e(1,`
              Please select an AMC.
            `),o()),a&2&&s("valid",!1)}function de(a,d){if(a&1&&(r(0,"option",20),e(1),o()),a&2){let t=d.$implicit;s("value",t.id),m(),S(t.formTypeName)}}function pe(a,d){a&1&&(r(0,"c-form-feedback",21),e(1,`
              Please provide a Form Type.
            `),o()),a&2&&s("valid",!1)}function fe(a,d){a&1&&(r(0,"c-form-feedback",21),e(1,`
              Please provide a Description.
            `),o()),a&2&&s("valid",!1)}function ue(a,d){if(a&1&&(r(0,"c-form-feedback",21),e(1),o()),a&2){let t=N();s("valid",!1),m(),T(`
              `,t.fileError,`
            `)}}var ke=(()=>{class a{constructor(t,n,i,l,f){this.fb=t,this.router=n,this.route=i,this.formsService=l,this.cdr=f,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.amcs=[],this.formTypes=[],this.formId="0",this.currentFileName="No file currently uploaded",this.allowedFileTypes=[".jpeg",".jpg",".pdf",".docx",".xlsx",".csv",".txt"],this.formUpdateForm=this.fb.group({formsAmcName:["",C.required],formsType:["",C.required],formsDescription:["",C.required],formsFile:[null]})}ngOnInit(){return u(this,null,function*(){try{yield this.loadAmcs(),yield this.loadFormTypes();let t=yield new Promise(n=>this.route.params.subscribe(i=>n(i)));this.formId=t.id||"0",yield this.loadFormDetails(this.formId)}catch(t){console.error("Error initializing component:",t),yield c.default.fire("Error","Failed to initialize the component","error")}})}get f(){return this.formUpdateForm.controls}loadAmcs(){return u(this,null,function*(){try{let t=yield this.formsService.getAmc();this.amcs=t.data,this.cdr.detectChanges()}catch(t){console.error("Error loading AMCs:",t),yield c.default.fire("Error","Failed to load AMC data","error")}})}loadFormTypes(){return u(this,null,function*(){try{let t=yield this.formsService.getFormTypes();this.formTypes=t.data,this.cdr.detectChanges()}catch(t){console.error("Error loading Form Types:",t),yield c.default.fire("Error","Failed to load Form Types","error")}})}loadFormDetails(t){return u(this,null,function*(){try{let n=yield this.formsService.getFormsById(t).toPromise();if(n&&n.code===1&&n.data){let i=n.data,l=this.amcs.find(h=>String(h.amcName)===String(i.formsAmcName))?.id,f=this.formTypes.find(h=>String(h.formTypeName)===String(i.formsType))?.id;this.formUpdateForm.patchValue({formsAmcName:l,formsType:f,formsDescription:i.formsDescription}),this.currentFileName=i.formsFile?this.getFileName(i.formsFile):"No file currently uploaded",this.cdr.detectChanges()}}catch(n){console.error("Error loading form details:",n),yield c.default.fire("Error","Failed to load form details","error")}})}getFileName(t){return t.split("/").pop()||t}onFileChange(t){let n=t.target;if(n.files&&n.files.length>0){let i=n.files[0],l="."+i.name.split(".").pop()?.toLowerCase();this.allowedFileTypes.includes(l)?(this.selectedFile=i,this.currentFileName=i.name,this.fileError=null):(this.selectedFile=null,this.currentFileName="No file selected",this.fileError="Please choose a file with one of the following extensions: "+this.allowedFileTypes.join(", "))}else this.selectedFile=null,this.currentFileName="No file selected",this.fileError="Please choose a file.";this.cdr.detectChanges()}onSubmit(){return u(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.formUpdateForm.invalid){let n=this.getMissingFields();n.length>0&&(yield c.default.fire({title:"Missing Fields",html:`Please fill in the following required fields:<br>${n.join("<br>")}`,icon:"error"}));return}let t=new FormData;t.append("formsAmcName",this.f.formsAmcName.value),t.append("formsType",this.f.formsType.value),t.append("formsDescription",this.f.formsDescription.value),this.selectedFile&&t.append("formsFile",this.selectedFile,this.selectedFile.name),t.append("hideStatus","0"),this.loading=!0;try{let n=yield b(this.formsService.processForms(t,this.formId));n.code===1?(yield c.default.fire("Updated!",n.message,"success"),this.router.navigate(["/forms/forms"])):yield c.default.fire("Failed!",n.message,"error")}catch(n){console.error("Error updating Forms:",n),yield c.default.fire("Failed!","An error occurred while updating the Forms","error")}finally{this.loading=!1}})}getMissingFields(){let t=[];return this.f.formsAmcName.errors&&t.push("AMC Name"),this.f.formsType.errors&&t.push("Form Type"),this.f.formsDescription.errors&&t.push("Description"),t}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/forms/forms"])}static{this.\u0275fac=function(n){return new(n||a)(F(re),F(V),F(k),F(ae),F(D))}}static{this.\u0275cmp=E({type:a,selectors:[["app-update-forms"]],standalone:!0,features:[w],decls:81,vars:12,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","formsAmcName","required",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","formsType","required",""],["disabled",""],["cLabel","","for","validationCustom02",1,"ms-2"],["md","12",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","formsDescription","rows","3","required",""],["cLabel","","for","validationCustom03",1,"ms-2"],["cLabel","","for","validationCustom04"],["cFormControl","","id","validationCustom04","formControlName","formsFile","type","file","accept",".jpeg,.jpg,.pdf,.docx,.xlsx,.csv,.txt",3,"change"],["cFormControl","","id","fileNameDisplay","plaintext","","readonly","","type","text",3,"value"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"value"],[3,"valid"]],template:function(n,i){if(n&1){let l=_();r(0,"c-row"),e(1,`
  `),r(2,"c-col",1),e(3,`
    `),r(4,"c-card",2),e(5,`
      `),r(6,"c-card-header"),e(7,`
        `),r(8,"strong"),e(9,"Update Form Entry"),o(),e(10,`
      `),o(),e(11,`
      `),r(12,"c-card-body"),e(13,`
        `),r(14,"form",3,0),v("ngSubmit",function(){return g(l),y(i.onSubmit())}),e(16,`
          
          `),r(17,"c-col",4),e(18,`
            `),r(19,"select",5),e(20,`
              `),p(21,le,2,2,"option",6),e(22,`
            `),o(),e(23,`
            `),r(24,"label",7),e(25,"AMC Name"),o(),e(26,`
            `),p(27,ce,2,1,"c-form-feedback",8),e(28,`
          `),o(),e(29,`

          `),r(30,"c-col",4),e(31,`
            `),r(32,"select",9),e(33,`
              `),r(34,"option",10),e(35,"Select a Form Type"),o(),e(36,`
              `),p(37,de,2,2,"option",6),e(38,`
            `),o(),e(39,`
            `),r(40,"label",11),e(41,"Form Type"),o(),e(42,`
            `),p(43,pe,2,1,"c-form-feedback",8),e(44,`
          `),o(),e(45,`

          `),r(46,"c-col",12),e(47,`
            `),x(48,"textarea",13),e(49,`
            `),r(50,"label",14),e(51,"Description"),o(),e(52,`
            `),p(53,fe,2,1,"c-form-feedback",8),e(54,`
          `),o(),e(55,`

          `),r(56,"c-col"),e(57,`
            `),r(58,"label",15),e(59,"File Upload"),o(),e(60,`
            `),r(61,"input",16),v("change",function(h){return g(l),y(i.onFileChange(h))}),o(),e(62,`
            `),x(63,"input",17),e(64,`
            `),p(65,ue,2,2,"c-form-feedback",8),e(66,`
          `),o(),e(67,`

          `),r(68,"c-col",1),e(69,`
            `),r(70,"button",18),e(71,`
              Update
            `),o(),e(72,`
            `),r(73,"button",19),v("click",function(){return g(l),y(i.onCancel())}),e(74,`
              Cancel
            `),o(),e(75,`
          `),o(),e(76,`
        `),o(),e(77,`
      `),o(),e(78,`
    `),o(),e(79,`
  `),o(),e(80,`
`),o()}n&2&&(m(14),s("formGroup",i.formUpdateForm)("validated",i.customStylesValidated),m(3),s("cFormFloating",!0),m(4),s("ngForOf",i.amcs),m(6),s("ngIf",i.f.formsAmcName.errors&&(i.f.formsAmcName.touched||i.submitted)),m(3),s("cFormFloating",!0),m(7),s("ngForOf",i.formTypes),m(6),s("ngIf",i.f.formsType.errors&&(i.f.formsType.touched||i.submitted)),m(3),s("cFormFloating",!0),m(7),s("ngIf",i.f.formsDescription.errors&&(i.f.formsDescription.touched||i.submitted)),m(10),s("value",i.currentFileName),m(2),s("ngIf",i.fileError&&(i.submitted||i.selectedFile)))},dependencies:[U,I,A,ne,W,ee,te,J,Z,K,Q,ie,X,Y,oe,H,z,j,q,L,$,G,B,R,O,P,M]})}}return a})();export{ke as UpdateFormsComponent};
