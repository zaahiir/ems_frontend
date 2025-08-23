import './polyfills.server.mjs';
import{a as Ce}from"./chunk-YOYBCKVQ.mjs";import{Ja as L}from"./chunk-7JE25W2O.mjs";import{a as Fe}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as le,F as Q,Fa as ae,G as H,Ga as ce,H as J,Ha as se,I as z,Ia as me,J as K,Ka as de,Ma as ue,N as X,Na as pe,O as Y,Oa as fe,S as Z,T as ee,b as W,j as P,pa as te,q as R,r as $,ra as ie,sa as f,ta as re,u as B,ua as oe,za as ne}from"./chunk-B4NKEOAB.mjs";import{b as j,d as G}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as _,Fb as b,Gb as y,Kc as M,Lc as q,Mb as k,Mc as A,Nb as U,Ob as T,Qb as e,Rb as S,Sa as c,Sb as E,Sc as O,Ta as v,Zb as V,ac as D,ia as N,lb as d,nb as a,p as w,sa as x,ta as g,ua as I,xb as r,yb as o,zb as h}from"./chunk-S7ATBOQE.mjs";import{g as he,h as p}from"./chunk-COT65Y5O.mjs";var u=he(Fe());var xe=["fileInput"],ge=(n,m,i,l,t,s)=>({"text-danger":n,"text-primary":m,"text-success":i,"text-warning":l,"text-info":t,"text-secondary":s});function ve(n,m){if(n&1&&(r(0,"option",28),e(1),o()),n&2){let i=m.$implicit;a("value",i.id),c(),S(i.clientName)}}function be(n,m){n&1&&(r(0,"c-form-feedback",29),e(1,"Please select a Client Name."),o()),n&2&&a("valid",!1)}function ye(n,m){n&1&&(r(0,"c-form-feedback",29),e(1,`
                Please provide an Address.
              `),o()),n&2&&a("valid",!1)}function _e(n,m){if(n&1&&(r(0,"option",28),e(1),o()),n&2){let i=m.$implicit;a("value",i.id),c(),E(`
                      `,i.dailCode,`
                    `)}}function Se(n,m){n&1&&(r(0,"c-form-feedback",29),e(1,`
                Please select a Country Code.
              `),o()),n&2&&a("valid",!1)}function Ee(n,m){n&1&&(r(0,"c-form-feedback",29),e(1,`
                Please provide a Mobile Number.
              `),o()),n&2&&a("valid",!1)}function we(n,m){n&1&&(r(0,"c-form-feedback",29),e(1,`
                Email is required
              `),o()),n&2&&a("valid",!1)}function Ne(n,m){n&1&&(r(0,"c-form-feedback",29),e(1,`
                Invalid email format
              `),o()),n&2&&a("valid",!1)}function Ie(n,m){if(n&1&&(r(0,"c-form-feedback",29),e(1),o()),n&2){let i=m.$implicit;a("valid",!1),c(),S(i)}}function ke(n,m){n&1&&(r(0,"c-form-feedback",29),e(1,`
                Please select at least one file.
              `),o()),n&2&&a("valid",!1)}function Ue(n,m){if(n&1){let i=_();r(0,"li",33),e(1,`
                      `),r(2,"span",34),e(3,`
                        `),h(4,"i",35),e(5,`
                      `),o(),e(6),r(7,"a",36),b("click",function(){let t=x(i).$implicit,s=y(2);return g(s.removeFile(t.id))}),I(),h(8,"svg",37),o(),e(9,`
                    `),o()}if(n&2){let i=m.$implicit,l=y(2);c(4),a("ngClass",D(4,ge,i.courierFile.endsWith(".pdf"),i.courierFile.endsWith(".doc")||i.courierFile.endsWith(".docx"),i.courierFile.endsWith(".xls")||i.courierFile.endsWith(".xlsx"),i.courierFile.endsWith(".csv"),i.courierFile.endsWith(".txt"),i.courierFile.endsWith(".jpg")||i.courierFile.endsWith(".jpeg"))),c(2),E(`                
                      `,l.getFileName(i.courierFile),`
                      `),c(),a("cTooltip",l.tooltipDeleteText),c(),a("cIcon",l.icons.cilTrash)}}function Te(n,m){if(n&1&&(r(0,"c-row",30),e(1,`
                `),r(2,"c-col",1),e(3,`
                  `),r(4,"ul",31),e(5,`
                    `),d(6,Ue,10,11,"li",32),e(7,`
                  `),o(),e(8,`
                `),o(),e(9,`
              `),o()),n&2){let i=y();c(6),a("ngForOf",i.existingFiles)}}var Ze=(()=>{class n{constructor(i,l,t,s){this.fb=i,this.router=l,this.route=t,this.courierService=s,this.icons={cilTrash:L},this.tooltipDeleteText="Remove",this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.selectedFiles=[],this.existingFiles=[],this.fileErrors=[],this.courierId="",this.clients=[],this.countries=[],this.initForm()}ngOnInit(){return p(this,null,function*(){this.courierId=this.route.snapshot.params.id,yield this.loadClients(),yield this.loadCountries(),yield this.loadCourierData(),yield this.loadCourierFiles()})}initForm(){this.courierUpdateForm=this.fb.group({courierClientName:["",f.required],courierClientAddress:["",f.required],courierCountryCode:["",f.required],courierMobileNumber:["",[f.required,f.pattern("^[0-9]{10}$")]],courierEmail:["",[f.required,f.email]],courierFile:[null]})}get f(){return this.courierUpdateForm.controls}loadClients(){return p(this,null,function*(){try{this.clients=yield this.courierService.getClientNames()}catch{yield u.default.fire("Error","Failed to load clients","error")}})}loadCountries(){return p(this,null,function*(){try{this.countries=yield this.courierService.getCountries()}catch{yield u.default.fire("Error","Failed to load countries","error")}})}loadCourierData(){return p(this,null,function*(){try{let i=yield this.courierService.getcourierById(this.courierId).toPromise();if(i&&i.code===1&&i.data){let l=i.data,t=this.clients.find(F=>String(F.clientName)===String(l.courierClientName))?.id,s=l.courierCountryCode,C=this.countries.find(F=>F.id===s);this.courierUpdateForm.patchValue({courierClientName:t,courierClientAddress:l.courierClientAddress,courierCountryCode:s,courierMobileNumber:l.courierMobileNumber,courierEmail:l.courierEmail})}else yield u.default.fire("Error","Failed to load courier data","error")}catch{yield u.default.fire("Error","Failed to load courier data","error")}})}loadCourierFiles(){return p(this,null,function*(){try{let i=yield this.courierService.listsCourierFiles(this.courierId);i.data.code===1&&(this.existingFiles=i.data.data,this.updateFormValidity())}catch(i){console.error("Error loading courier files:",i)}})}getFileName(i){return i.split("/").pop()||i}get hasFiles(){return this.existingFiles.length>0||this.selectedFiles.length>0}onFileChange(i){let l=i.target.files;this.selectedFiles=[],this.fileErrors=[];let t=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg","image/jpg","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","text/csv","text/plain"];for(let s=0;s<l.length;s++){let C=l[s];t.includes(C.type)?this.selectedFiles.push(C):this.fileErrors.push(`${C.name}: Invalid file type. Please select a PDF, Word document, JPEG, Excel, CSV, or text file.`)}this.updateFormValidity()}updateFormValidity(){this.hasFiles?this.courierUpdateForm.get("courierFile")?.setErrors(null):this.courierUpdateForm.get("courierFile")?.setErrors({required:!0})}onSubmit(){return p(this,null,function*(){this.customStylesValidated=!0,this.submitted=!0;let i=[];if(Object.keys(this.courierUpdateForm.controls).forEach(t=>{let s=this.courierUpdateForm.get(t);s?.invalid&&(t==="courierMobileNumber"&&s.errors?.pattern?i.push("Mobile number must be exactly 10 digits."):i.push(`${t.charAt(0).toUpperCase()+t.slice(1)} is required.`))}),this.hasFiles||i.push("At least one file is required."),i.length>0){yield u.default.fire({title:"Form Validation Error",html:i.join("<br>"),icon:"error"});return}let l=new FormData;l.append("courierClientName",this.f.courierClientName.value),l.append("courierClientAddress",this.f.courierClientAddress.value),l.append("courierCountryCode",this.f.courierCountryCode.value),l.append("courierMobileNumber",this.f.courierMobileNumber.value),l.append("courierEmail",this.f.courierEmail.value);for(let t=0;t<this.selectedFiles.length;t++)l.append("courierFile",this.selectedFiles[t],this.selectedFiles[t].name);this.existingFiles.forEach(t=>{l.append("existingFileIds",t.id)}),this.loading=!0;try{let t=yield w(this.courierService.processCourier(l,this.courierId));t.code===1?(yield u.default.fire("Updated!",t.message,"success"),this.router.navigate(["/forms/courier"])):yield u.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error updating Courier:",t),yield u.default.fire("Failed!","An error occurred while updating the Courier","error")}finally{this.loading=!1}})}removeFile(i){return p(this,null,function*(){try{let l=yield this.courierService.deleteCourierFile(i);l.data.code===1?(this.existingFiles=this.existingFiles.filter(t=>t.id!==i),yield u.default.fire("Removed!","File has been removed successfully.","success"),this.updateFormValidity()):yield u.default.fire("Failed!",l.data.message||"Unknown error occurred","error")}catch{yield u.default.fire("Failed!","An error occurred while removing the file.","error")}})}onCancel(){this.router.navigate(["/forms/courier"])}static{this.\u0275fac=function(l){return new(l||n)(v(ue),v(G),v(j),v(Ce))}}static{this.\u0275cmp=N({type:n,selectors:[["app-update-courier"]],viewQuery:function(l,t){if(l&1&&k(xe,5),l&2){let s;U(s=T())&&(t.fileInput=s.first)}},standalone:!0,features:[V],decls:114,vars:18,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","courierClientName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","courierClientAddress","required","","type","text","placeholder","Address"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cSelect","","id","courierCountryCode","formControlName","courierCountryCode","required",""],["for","courierCountryCode"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","courierMobileNumber","formControlName","courierMobileNumber","required","","type","text","placeholder","Mobile Number"],["cLabel","","for","courierMobileNumber",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","courierEmail","required","","type","email","placeholder","Email"],["cLabel","","for","validationCustom04",1,"ms-2"],["cLabel","","for","validationCustom05"],["cFormControl","","id","validationCustom05","formControlName","courierFile","multiple","","type","file","accept",".pdf,.doc,.docx,.jpeg,.jpg,.xls,.xlsx,.csv,.txt",3,"change"],[3,"valid",4,"ngFor","ngForOf"],["class","my-3",4,"ngIf"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"value"],[3,"valid"],[1,"my-3"],[1,"list-unstyled"],["class","mb-3 d-flex align-items-center",4,"ngFor","ngForOf"],[1,"mb-3","d-flex","align-items-center"],[1,"me-2"],[1,"cil-file",3,"ngClass"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"]],template:function(l,t){if(l&1){let s=_();r(0,"c-row"),e(1,`
    `),r(2,"c-col",1),e(3,`
      `),r(4,"c-card",2),e(5,`
        `),r(6,"c-card-header"),e(7,`
          `),r(8,"strong"),e(9,"Update Courier Form"),o(),e(10,`
        `),o(),e(11,`
        `),r(12,"c-card-body"),e(13,`
          `),r(14,"form",3,0),b("ngSubmit",function(){return x(s),g(t.onSubmit())}),e(16,`
            
              `),r(17,"c-col",4),e(18,`
                `),r(19,"select",5),e(20,`
                  `),r(21,"option",6),e(22,"Select a Client Name"),o(),e(23,`
                  `),d(24,ve,2,2,"option",7),e(25,`
                `),o(),e(26,`
                `),r(27,"label",8),e(28,"Client Name"),o(),e(29,`
                `),d(30,be,2,1,"c-form-feedback",9),e(31,`
              `),o(),e(32,`
  
            `),r(33,"c-col",4),e(34,`
              `),h(35,"input",10),e(36,`
              `),r(37,"label",11),e(38,"Address"),o(),e(39,`
              `),d(40,ye,2,1,"c-form-feedback",9),e(41,`
            `),o(),e(42,`

            `),r(43,"c-col",12),e(44,`
              `),r(45,"c-input-group",13),e(46,`
                `),r(47,"c-col",14),e(48,`
                  `),r(49,"select",15),e(50,`
                    `),r(51,"option",6),e(52,"Select Country Code"),o(),e(53,`
                    `),d(54,_e,2,2,"option",7),e(55,`
                  `),o(),e(56,`
                  `),r(57,"label",16),e(58,"Country Code"),o(),e(59,`
                `),o(),e(60,`
                `),r(61,"c-col",17),e(62,`
                  `),h(63,"input",18),e(64,`
                  `),r(65,"label",19),e(66,"Mobile Number"),o(),e(67,`
                `),o(),e(68,`
              `),o(),e(69,`
              `),d(70,Se,2,1,"c-form-feedback",9),e(71,`
              `),d(72,Ee,2,1,"c-form-feedback",9),e(73,`
            `),o(),e(74,`
  
            `),r(75,"c-col",4),e(76,`
              `),h(77,"input",20),e(78,`
              `),r(79,"label",21),e(80,"Email"),o(),e(81,`
              `),d(82,we,2,1,"c-form-feedback",9),e(83,`
              `),d(84,Ne,2,1,"c-form-feedback",9),e(85,`
            `),o(),e(86,`
  
            `),r(87,"c-col"),e(88,`
              `),r(89,"label",22),e(90,"Fund File"),o(),e(91,`
              `),r(92,"input",23),b("change",function(F){return x(s),g(t.onFileChange(F))}),o(),e(93,`
              `),d(94,Ie,2,2,"c-form-feedback",24),e(95,`
              `),d(96,ke,2,1,"c-form-feedback",9),e(97,`
              `),d(98,Te,10,1,"c-row",25),e(99,`
            `),o(),e(100,`
  
            `),r(101,"c-col",1),e(102,`
              `),r(103,"button",26),e(104,`
                Update
              `),o(),e(105,`
              `),r(106,"button",27),b("click",function(){return x(s),g(t.onCancel())}),e(107,`
                Cancel
              `),o(),e(108,`
            `),o(),e(109,`
          `),o(),e(110,`
        `),o(),e(111,`
      `),o(),e(112,`
    `),o(),e(113,`
  `),o()}l&2&&(c(14),a("formGroup",t.courierUpdateForm)("validated",t.customStylesValidated),c(3),a("cFormFloating",!0),c(7),a("ngForOf",t.clients),c(6),a("ngIf",t.f.courierClientName.errors&&(t.f.courierClientName.touched||t.submitted)),c(3),a("cFormFloating",!0),c(7),a("ngIf",t.f.courierClientAddress.errors&&(t.f.courierClientAddress.touched||t.submitted)),c(7),a("cFormFloating",!0),c(7),a("ngForOf",t.countries),c(7),a("cFormFloating",!0),c(9),a("ngIf",t.f.courierCountryCode.errors&&(t.f.courierCountryCode.touched||t.submitted)),c(2),a("ngIf",t.f.courierMobileNumber.errors&&(t.f.courierMobileNumber.touched||t.submitted)),c(3),a("cFormFloating",!0),c(7),a("ngIf",t.submitted&&(t.f.courierEmail.errors==null?null:t.f.courierEmail.errors.required)),c(2),a("ngIf",t.submitted&&(t.f.courierEmail.errors==null?null:t.f.courierEmail.errors.email)),c(10),a("ngForOf",t.fileErrors),c(2),a("ngIf",t.submitted&&!t.hasFiles&&(t.f.courierFile.errors==null?null:t.f.courierFile.errors.required)),c(2),a("ngIf",t.existingFiles.length>0))},dependencies:[te,W,A,O,M,q,ee,Z,R,Y,B,$,fe,ne,se,me,ie,ce,re,oe,de,le,ae,pe,Q,K,X,H,J,z,P]})}}return n})();export{Ze as UpdateCourierComponent};
