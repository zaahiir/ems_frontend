import{a as re}from"./chunk-NRIUNPUJ.js";import{a as ae}from"./chunk-AJEUVWKL.js";import{Aa as U,B as q,Ba as z,Ga as J,Ja as K,M as j,Ma as Q,N as L,Na as W,Oa as X,P as G,Pa as Y,Q as O,Ra as Z,Ta as ee,U as R,Ua as te,V as P,Va as ie,Z as B,_ as $,q as M,x as I,y as V,ya as H,za as u}from"./chunk-K3LN6DFK.js";import{$a as _,Ga as d,Ia as a,Lb as D,Mb as N,S,Sa as r,Sb as A,Ta as o,Ua as b,Ya as E,Z as F,_ as h,_a as g,fc as k,jb as e,k as x,kb as v,lb as w,pa as l,qa as C,sb as T}from"./chunk-WAGJM7NU.js";import{f as ne,g as p}from"./chunk-MYAK5QVS.js";var f=ne(ae());function le(n,c){if(n&1&&(r(0,"option",19),e(1),o()),n&2){let t=c.$implicit;a("value",t.id),l(),v(t.amcName)}}function se(n,c){n&1&&(r(0,"c-form-feedback",20),e(1,`
              Please select an AMC.
            `),o()),n&2&&a("valid",!1)}function me(n,c){if(n&1&&(r(0,"option",19),e(1),o()),n&2){let t=c.$implicit;a("value",t.id),l(),v(t.formTypeName)}}function ce(n,c){n&1&&(r(0,"c-form-feedback",20),e(1,`
              Please select a Form Type.
            `),o()),n&2&&a("valid",!1)}function de(n,c){n&1&&(r(0,"c-form-feedback",20),e(1,`
              Please provide a Description.
            `),o()),n&2&&a("valid",!1)}function fe(n,c){if(n&1&&(r(0,"c-form-feedback",20),e(1),o()),n&2){let t=_();a("valid",!1),l(),w(`
              `,t.fileError,`
            `)}}var Ie=(()=>{class n{constructor(t,s,i){this.fb=t,this.router=s,this.formsService=i,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.allowedFileTypes=[".jpeg",".jpg",".pdf",".docx",".xlsx",".csv",".txt"],this.amc=[],this.formTypes=[],this.formCreateForm=this.fb.group({formsAmcName:["",u.required],formsType:["",u.required],formsDescription:["",u.required],formsFile:[null,u.required]})}ngOnInit(){return p(this,null,function*(){yield this.loadAmcData(),yield this.loadFormType()})}get f(){return this.formCreateForm.controls}loadAmcData(){return p(this,null,function*(){try{let t=yield this.formsService.getAmc();this.amc=t.data}catch(t){console.error("Error loading AMC data:",t),yield f.default.fire("Error","Failed to load AMC data","error")}})}loadFormType(){return p(this,null,function*(){try{let t=yield this.formsService.getFormTypes();this.formTypes=t.data}catch(t){console.error("Error loading AMC data:",t),yield f.default.fire("Error","Failed to load AMC data","error")}})}onFileChange(t){let s=t.target;if(s.files&&s.files.length>0){let i=s.files[0],m="."+i.name.split(".").pop()?.toLowerCase();this.allowedFileTypes.includes(m)?(this.selectedFile=i,this.fileError=null):(this.selectedFile=null,this.fileError="Please choose a file with one of the following extensions: "+this.allowedFileTypes.join(", "))}else this.selectedFile=null,this.fileError="Please choose a file."}onSubmit(){return p(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.formCreateForm.invalid||!this.selectedFile){let i=this.getMissingFields();i.length>0&&(yield f.default.fire({title:"Missing Fields",html:`Please fill in the following required fields:<br>${i.join("<br>")}`,icon:"error"}));return}let t=new FormData;t.append("formsAmcName",this.f.formsAmcName.value),t.append("formsType",this.f.formsType.value),t.append("formsDescription",this.f.formsDescription.value),t.append("formsFile",this.selectedFile,this.selectedFile.name),t.append("hideStatus","0");let s="0";this.loading=!0;try{(yield x(this.formsService.processForms(t,"0"))).code===1?(yield f.default.fire("Added!","Forms created successfully","success"),this.router.navigate(["/forms/forms"])):yield f.default.fire("Failed!","Error creating forms","error")}catch(i){console.error("Error processing Forms:",i);let m="An error occurred while processing the forms entry.";i instanceof Error?m=i.message:typeof i=="string"&&(m=i),yield f.default.fire("Failed!",m,"error")}finally{this.loading=!1}})}getMissingFields(){let t=[];return this.f.formsAmcName.errors&&t.push("AMC Name"),this.f.formsType.errors&&t.push("Form Type"),this.f.formsDescription.errors&&t.push("Description"),this.selectedFile||t.push("File"),t}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.formCreateForm.reset()}static{this.\u0275fac=function(s){return new(s||n)(C(ee),C(k),C(re))}}static{this.\u0275cmp=S({type:n,selectors:[["app-create-forms"]],standalone:!0,features:[T],decls:82,vars:11,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","formsAmcName","required",""],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","formsType","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["md","12",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","formsDescription","rows","3","required",""],["cLabel","","for","validationCustom03",1,"ms-2"],["cLabel","","for","validationCustom04"],["cFormControl","","id","validationCustom04","formControlName","formsFile","required","","type","file","accept",".jpeg,.jpg,.pdf,.docx,.xlsx,.csv,.txt",3,"change"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"value"],[3,"valid"]],template:function(s,i){if(s&1){let m=E();r(0,"c-row"),e(1,`
  `),r(2,"c-col",1),e(3,`
    `),r(4,"c-card",2),e(5,`
      `),r(6,"c-card-header"),e(7,`
        `),r(8,"strong"),e(9,"New Form Entry"),o(),e(10,`
      `),o(),e(11,`
      `),r(12,"c-card-body"),e(13,`
        `),r(14,"form",3,0),g("ngSubmit",function(){return F(m),h(i.onSubmit())}),e(16,`
          
          `),r(17,"c-col",4),e(18,`
            `),r(19,"select",5),e(20,`
              `),r(21,"option",6),e(22,"Select an AMC"),o(),e(23,`
              `),d(24,le,2,2,"option",7),e(25,`
            `),o(),e(26,`
            `),r(27,"label",8),e(28,"AMC Name"),o(),e(29,`
            `),d(30,se,2,1,"c-form-feedback",9),e(31,`
          `),o(),e(32,`

          `),r(33,"c-col",4),e(34,`
            `),r(35,"select",10),e(36,`
              `),r(37,"option",6),e(38,"Select a Form Type"),o(),e(39,`
              `),d(40,me,2,2,"option",7),e(41,`
            `),o(),e(42,`
            `),r(43,"label",11),e(44,"Form Type"),o(),e(45,`
            `),d(46,ce,2,1,"c-form-feedback",9),e(47,`
          `),o(),e(48,`

          `),r(49,"c-col",12),e(50,`
            `),b(51,"textarea",13),e(52,`
            `),r(53,"label",14),e(54,"Description"),o(),e(55,`
            `),d(56,de,2,1,"c-form-feedback",9),e(57,`
          `),o(),e(58,`

          `),r(59,"c-col"),e(60,`
            `),r(61,"label",15),e(62,"File Upload"),o(),e(63,`
            `),r(64,"input",16),g("change",function(oe){return F(m),h(i.onFileChange(oe))}),o(),e(65,`
            `),d(66,fe,2,2,"c-form-feedback",9),e(67,`
          `),o(),e(68,`

          `),r(69,"c-col",1),e(70,`
            `),r(71,"button",17),e(72,`
              Save
            `),o(),e(73,`
            `),r(74,"button",18),g("click",function(){return F(m),h(i.onReset())}),e(75,`
              Reset
            `),o(),e(76,`
          `),o(),e(77,`
        `),o(),e(78,`
      `),o(),e(79,`
    `),o(),e(80,`
  `),o(),e(81,`
`),o()}s&2&&(l(14),a("formGroup",i.formCreateForm)("validated",i.customStylesValidated),l(3),a("cFormFloating",!0),l(7),a("ngForOf",i.amc),l(6),a("ngIf",i.f.formsAmcName.errors&&(i.f.formsAmcName.touched||i.submitted)),l(3),a("cFormFloating",!0),l(7),a("ngForOf",i.formTypes),l(6),a("ngIf",i.f.formsType.errors&&(i.f.formsType.touched||i.submitted)),l(3),a("cFormFloating",!0),l(7),a("ngIf",i.f.formsDescription.errors&&(i.f.formsDescription.touched||i.submitted)),l(10),a("ngIf",i.fileError&&(i.submitted||i.selectedFile)))},dependencies:[N,A,D,$,B,P,I,q,V,ie,J,X,Y,H,W,U,z,Z,K,Q,te,j,O,R,L,G,M]})}}return n})();export{Ie as CreateFormsComponent};
