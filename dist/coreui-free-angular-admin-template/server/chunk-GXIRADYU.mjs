import './polyfills.server.mjs';
import{a as se}from"./chunk-LODBKPEL.mjs";import{a as pe}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as ee,F as W,Fa as te,G as M,Ga as ie,H as B,Ha as oe,I as R,Ia as ne,J as $,Ka as re,Ma as le,N as z,Na as ae,O as H,Oa as me,S as J,T as K,j as q,q as A,r as L,ra as Q,sa as u,ta as X,u as G,ua as Y,za as Z}from"./chunk-B4NKEOAB.mjs";import{b as O,d as j}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as S,Fb as C,Gb as g,Lc as k,Mc as D,Pa as w,Pb as N,Qb as e,Rb as I,Sa as a,Sb as b,Sc as V,Ta as E,Zb as T,ia as U,lb as p,nb as l,qc as P,sa as v,ta as F,xb as n,yb as o,zb as f}from"./chunk-S7ATBOQE.mjs";import{g as de,h as x}from"./chunk-COT65Y5O.mjs";var c=de(pe());function ce(r,s){r&1&&(n(0,"c-form-feedback",38),e(1,`
              Please provide a Name.
            `),o()),r&2&&l("valid",!1)}function ue(r,s){r&1&&(n(0,"c-form-feedback",38),e(1,`
              Please provide an Email.
            `),o()),r&2&&l("valid",!1)}function fe(r,s){if(r&1&&(n(0,"option",39),e(1),o()),r&2){let i=s.$implicit;l("value",i.id),a(),b(`
                    `,i.dailCode,`
                  `)}}function ye(r,s){r&1&&(n(0,"c-form-feedback",38),e(1,`
              Please provide a valid Country Code and Phone Number.
            `),o()),r&2&&l("valid",!1)}function he(r,s){r&1&&(n(0,"c-form-feedback",38),e(1,`
              Please provide an Address.
            `),o()),r&2&&l("valid",!1)}function xe(r,s){r&1&&(n(0,"c-form-feedback",38),e(1,`
              Please provide Other Details.
            `),o()),r&2&&l("valid",!1)}function ge(r,s){if(r&1&&(n(0,"option",39),e(1),o()),r&2){let i=s.$implicit;l("value",i.id),a(),I(i.userTypeName)}}function ve(r,s){r&1&&(n(0,"c-form-feedback",38),e(1,`
              Please select a User Type.
            `),o()),r&2&&l("valid",!1)}function Fe(r,s){if(r&1&&(n(0,"div",43),e(1,`
                `),f(2,"img",44),e(3,`
              `),o()),r&2){let i=g(2);a(2),l("src",i.fileUrl,w)}}function Ce(r,s){if(r&1&&(n(0,"div",43),e(1,`
                `),n(2,"a",45),e(3,`
                  `),f(4,"i",46),e(5,` View PDF
                `),o(),e(6,`
              `),o()),r&2){let i=g(2);a(2),l("href",i.fileUrl,w)}}function Ee(r,s){if(r&1&&(n(0,"div",40),e(1,`
              `),n(2,"p",41)(3,"strong"),e(4,"Current File:"),o(),e(5),o(),e(6,`
              
              `),e(7,`
              `),p(8,Fe,4,1,"div",42),e(9,`
              
              `),e(10,`
              `),p(11,Ce,7,1,"div",42),e(12,`
            `),o()),r&2){let i=g();a(5),b(" ",i.currentFileName,""),a(3),l("ngIf",i.isImageFile),a(3),l("ngIf",i.isPdfFile)}}function be(r,s){if(r&1&&(n(0,"div",47),e(1,`
              `),n(2,"small")(3,"strong"),e(4,"New file selected:"),o(),e(5),o(),e(6,`
            `),o()),r&2){let i=g();a(5),b(" ",i.selectedFile.name,"")}}function _e(r,s){if(r&1&&(n(0,"c-form-feedback",38),e(1),o()),r&2){let i=g();l("valid",!1),a(),b(`
              `,i.fileError,`
            `)}}function we(r,s){r&1&&(n(0,"c-form-feedback",38),e(1,`
              Please provide a valid Password.
            `),o()),r&2&&l("valid",!1)}function Se(r,s){if(r&1){let i=S();n(0,"form",48),C("ngSubmit",function(){v(i);let t=g();return F(t.onPasswordSubmit())}),e(1,`
          `),n(2,"c-col",5),e(3,`
            `),f(4,"input",49),e(5,`
            `),n(6,"label",50),e(7,"New Password"),o(),e(8,`
            `),p(9,we,2,1,"c-form-feedback",8),e(10,`
          `),o(),e(11,`
          `),n(12,"c-col",2),e(13,`
            `),n(14,"button",51),e(15,`
              Update Password
            `),o(),e(16,`
          `),o(),e(17,`
        `),o()}if(r&2){let i=g();l("formGroup",i.passwordUpdateForm),a(2),l("cFormFloating",!0),a(7),l("ngIf",i.passwordForm.newPassword.errors&&(i.passwordForm.newPassword.touched||i.passwordSubmitted))}}var Be=(()=>{class r{constructor(i,m,t,d,y){this.fb=i,this.router=m,this.route=t,this.employeeService=d,this.cdr=y,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.passwordSubmitted=!1,this.selectedFile=null,this.fileError=null,this.userTypes=[],this.countries=[],this.employeeId="0",this.currentFileName="No file currently uploaded",this.fileUrl=null,this.showPasswordForm=!1,this.isImageFile=!1,this.isPdfFile=!1,this.employeeUpdateForm=this.fb.group({employeeName:["",u.required],employeeEmail:["",[u.required,u.email]],employeeCountryCode:["",u.required],employeePhone:["",[u.required,this.phoneNumberValidator]],employeeAddress:["",u.required],employeeOtherDetail:[""],employeeUserType:["",u.required],employeeFile:[null]}),this.passwordUpdateForm=this.fb.group({newPassword:["",[u.required,u.minLength(6)]]})}ngOnInit(){return x(this,null,function*(){yield this.loadUserTypes(),yield this.loadCountries(),this.route.params.subscribe(i=>x(this,null,function*(){this.employeeId=i.id||"0",yield this.loadEmployeeData(this.employeeId)}))})}get f(){return this.employeeUpdateForm.controls}get passwordForm(){return this.passwordUpdateForm.controls}loadUserTypes(){return x(this,null,function*(){try{let i=yield this.employeeService.getUserType();this.userTypes=i.data,this.cdr.detectChanges()}catch{yield c.default.fire("Error","Failed to load User Types","error")}})}loadCountries(){return x(this,null,function*(){try{let i=yield this.employeeService.getCountries();this.countries=i.data,this.cdr.detectChanges()}catch{yield c.default.fire("Error","Failed to load Countries","error")}})}loadEmployeeData(i){return x(this,null,function*(){try{let m=yield this.employeeService.listsEmployee(i);if(m.data.code===1&&m.data.data.length>0){let t=m.data.data[0],d=this.userTypes.find(h=>String(h.userTypeName)===String(t.employeeUserType))?.id,y=t.employeeCountryCode;if(this.employeeUpdateForm.patchValue({employeeName:t.employeeName,employeeEmail:t.employeeEmail,employeeCountryCode:y,employeePhone:t.employeePhone,employeeAddress:t.employeeAddress,employeeOtherDetail:t.employeeOtherDetail,employeeUserType:d}),t.employeeFile||t.employeePhotoUrl){let h=t.employeePhotoUrl||t.employeeFile||"";this.fileUrl=this.employeeService.getFileUrl(h),this.currentFileName=this.getFileName(h);let _=this.currentFileName.toLowerCase();this.isImageFile=_.endsWith(".jpg")||_.endsWith(".jpeg")||_.endsWith(".png"),this.isPdfFile=_.endsWith(".pdf")}this.cdr.detectChanges()}}catch{yield c.default.fire("Error","Failed to load employee data","error")}})}getFileUrl(i){return i?i.startsWith("http://")||i.startsWith("https://")?i:`https://backend.faiop.com/${i.startsWith("/")?i.substring(1):i}`:""}getFileName(i){return i?i.split("/").pop()||i:"No file"}validateFileType(i){return["image/jpeg","image/jpg","application/pdf"].includes(i.type)}onFileChange(i){let m=i.target;if(m.files&&m.files.length>0){let t=m.files[0];if(this.validateFileType(t)){this.selectedFile=t,this.currentFileName=t.name,this.fileError=null;let d=t.name.toLowerCase();this.isImageFile=d.endsWith(".jpg")||d.endsWith(".jpeg")||d.endsWith(".png"),this.isPdfFile=d.endsWith(".pdf")}else this.selectedFile=null,this.fileError="Please choose a JPG, JPEG, or PDF file."}else this.selectedFile=null,this.fileError=null;this.cdr.detectChanges()}onSubmit(){return x(this,null,function*(){if(this.submitted=!0,this.employeeUpdateForm.invalid){let t=this.getMissingFields();t.length>0&&(yield c.default.fire({title:"Validation Error",html:`Please correct the following issues:<br><br>${t.join("<br>")}`,icon:"error"}));return}let i=new FormData,m=this.employeeUpdateForm.value;Object.keys(m).forEach(t=>{t!=="employeeFile"&&i.append(t,m[t]!==null?m[t]:"")}),this.selectedFile&&i.append("employeeFile",this.selectedFile);try{this.loading=!0;let t=yield this.employeeService.processEmployee(i,this.employeeId);this.loading=!1,t.data&&t.data.code===1?(yield c.default.fire("Updated!",t.data.message,"success"),this.router.navigate(["/employees"])):yield c.default.fire("Failed!",t.data.message||"Unknown error occurred","error")}catch(t){this.loading=!1;let d=t.response?.data?.message||"An error occurred while updating the Employee entry.";yield c.default.fire("Failed!",d,"error")}})}phoneNumberValidator(i){let m=i.value;return m?/^\d{10}$/.test(m)?null:{invalidPhone:!0}:null}getMissingFields(){let i=[];return Object.keys(this.f).forEach(m=>{let t=this.f[m];t&&t.errors&&(t.errors.required?i.push(this.getFieldName(m)):m==="employeeEmail"&&t.errors.email?i.push("Invalid Email Format"):m==="employeePhone"&&t.errors.invalidPhone&&i.push("Phone Number (must be 10 digits)"))}),i}getFieldName(i){return{employeeName:"Employee Name",employeeEmail:"Employee Email",employeeCountryCode:"Country Code",employeePhone:"Phone Number",employeeAddress:"Address",employeeUserType:"User Type"}[i]||i}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/employees"])}togglePasswordForm(){this.showPasswordForm=!this.showPasswordForm}onPasswordSubmit(){return x(this,null,function*(){if(this.passwordSubmitted=!0,!this.passwordUpdateForm.invalid)try{this.loading=!0;let i=yield this.employeeService.updateEmployeePassword(this.employeeId,this.passwordUpdateForm.value.newPassword);this.loading=!1,i.data&&i.data.code===1?(yield c.default.fire("Updated!","Password updated successfully","success"),this.passwordUpdateForm.reset(),this.passwordSubmitted=!1,this.showPasswordForm=!1,this.router.navigate(["/employees"])):yield c.default.fire("Failed!",i.data.message||"Unknown error occurred","error")}catch(i){this.loading=!1;let m=i.response?.data?.message||"An error occurred while updating the password.";yield c.default.fire("Failed!",m,"error")}})}static{this.\u0275fac=function(m){return new(m||r)(E(le),E(j),E(O),E(se),E(P))}}static{this.\u0275cmp=U({type:r,selectors:[["app-update-employee"]],standalone:!0,features:[T],decls:148,vars:22,consts:[["customStylesForm","ngForm"],["fileInput",""],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","required","","formControlName","employeeName","type","text","placeholder","Name"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","required","","formControlName","employeeEmail","type","email","placeholder","Email"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cSelect","","id","countryCode","formControlName","employeeCountryCode","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["for","countryCode"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","validationCustom03","required","","formControlName","employeePhone","type","text","placeholder","Phone Number"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom05","rows","3","formControlName","employeeAddress","required","","placeholder","Address"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","rows","3","formControlName","employeeOtherDetail","required","","placeholder","Other Details"],["cLabel","","for","validationCustom06",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom08","formControlName","employeeUserType","required",""],["value","","disabled",""],["cLabel","","for","validationCustom08",1,"ms-2"],["md","6",1,"mt-1"],["cLabel","","for","validationCustom07",1,"mb-0","mt-2"],["class","mb-3",4,"ngIf"],[1,"input-group","mb-2"],["cFormControl","","id","validationCustom07","type","file","accept",".jpg,.jpeg,.pdf",3,"change"],["cButton","","color","secondary","type","button",3,"click"],["class","alert alert-info py-2 px-3 mb-2",4,"ngIf"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","info","type","button",1,"ms-1",3,"click"],["cForm","","class","row g-3 needs-validation mt-4",3,"formGroup","ngSubmit",4,"ngIf"],[3,"valid"],[3,"value"],[1,"mb-3"],[1,"mb-1"],["class","mb-2",4,"ngIf"],[1,"mb-2"],["alt","Employee Image",1,"border","rounded","p-1","shadow-sm",2,"max-width","200px","max-height","200px",3,"src"],["target","_blank",1,"btn","btn-sm","btn-outline-primary",3,"href"],[1,"cil-file"],[1,"alert","alert-info","py-2","px-3","mb-2"],["cForm","",1,"row","g-3","needs-validation","mt-4",3,"ngSubmit","formGroup"],["cFormControl","","id","validationCustom04","formControlName","newPassword","type","password","placeholder","New Password"],["cLabel","","for","validationCustom04",1,"ms-2"],["cButton","","color","primary","type","submit"]],template:function(m,t){if(m&1){let d=S();n(0,"c-row"),e(1,`
  `),n(2,"c-col",2),e(3,`
    `),n(4,"c-card",3),e(5,`
      `),n(6,"c-card-header"),e(7,`
        `),n(8,"strong"),e(9,"Update Employee"),o(),e(10,`
      `),o(),e(11,`
      `),n(12,"c-card-body"),e(13,`
        `),e(14,`
        `),n(15,"form",4,0),C("ngSubmit",function(){return v(d),F(t.onSubmit())}),e(17,`
          
          `),n(18,"c-col",5),e(19,`
            `),f(20,"input",6),e(21,`
            `),n(22,"label",7),e(23,"Name"),o(),e(24,`
            `),p(25,ce,2,1,"c-form-feedback",8),e(26,`
          `),o(),e(27,`

          `),n(28,"c-col",5),e(29,`
            `),f(30,"input",9),e(31,`
            `),n(32,"label",10),e(33,"Email"),o(),e(34,`
            `),p(35,ue,2,1,"c-form-feedback",8),e(36,`
          `),o(),e(37,`

          `),n(38,"c-col",11),e(39,`
            `),n(40,"c-input-group",12),e(41,`
              `),n(42,"c-col",13),e(43,`
                `),n(44,"select",14),e(45,`
                  `),n(46,"option",15),e(47,"Code"),o(),e(48,`
                  `),p(49,fe,2,2,"option",16),e(50,`
                `),o(),e(51,`
                `),n(52,"label",17),e(53,"Country Code"),o(),e(54,`
              `),o(),e(55,`
              `),n(56,"c-col",18),e(57,`
                `),f(58,"input",19),e(59,`
                `),n(60,"label",20),e(61,"Phone Number"),o(),e(62,`
              `),o(),e(63,`
            `),o(),e(64,`
            `),p(65,ye,2,1,"c-form-feedback",8),e(66,`
          `),o(),e(67,`

          `),n(68,"c-col",5),e(69,`
            `),f(70,"textarea",21),e(71,`
            `),n(72,"label",22),e(73,"Address"),o(),e(74,`
            `),p(75,he,2,1,"c-form-feedback",8),e(76,`
          `),o(),e(77,`

          `),n(78,"c-col",5),e(79,`
            `),f(80,"textarea",23),e(81,`
            `),n(82,"label",24),e(83,"Other Details"),o(),e(84,`
            `),p(85,xe,2,1,"c-form-feedback",8),e(86,`
          `),o(),e(87,`

          `),n(88,"c-col",5),e(89,`
            `),n(90,"select",25),e(91,`
              `),n(92,"option",26),e(93,"Select an User Type"),o(),e(94,`
              `),p(95,ge,2,2,"option",16),e(96,`
            `),o(),e(97,`
            `),n(98,"label",27),e(99,"User Type"),o(),e(100,`
            `),p(101,ve,2,1,"c-form-feedback",8),e(102,`
          `),o(),e(103,`

          `),n(104,"c-col",28),e(105,`
            `),n(106,"label",29),e(107,"Update File (optional)"),o(),e(108,`
            
            `),e(109,`
            `),p(110,Ee,13,3,"div",30),e(111,`
            
            `),e(112,`
            `),n(113,"div",31),e(114,`
              `),n(115,"input",32,1),C("change",function(h){return v(d),F(t.onFileChange(h))}),o(),e(117,`
              `),n(118,"button",33),C("click",function(){v(d);let h=N(116);return h.value="",F(t.selectedFile=null)}),e(119,`
                Clear
              `),o(),e(120,`
            `),o(),e(121,`
            
            `),e(122,`
            `),p(123,be,7,1,"div",34),e(124,`
            
            `),e(125,`
            `),p(126,_e,2,2,"c-form-feedback",8),e(127,`
          `),o(),e(128,`

          `),n(129,"c-col",2),e(130,`
            `),n(131,"button",35),e(132,`
              Update 
            `),o(),e(133,`
            `),n(134,"button",33),C("click",function(){return v(d),F(t.onCancel())}),e(135,`
              Cancel
            `),o(),e(136,`
            `),n(137,"button",36),C("click",function(){return v(d),F(t.togglePasswordForm())}),e(138),o(),e(139,`
          `),o(),e(140,`
        `),o(),e(141,`

        `),e(142,`
        `),p(143,Se,18,3,"form",37),e(144,`
      `),o(),e(145,`
    `),o(),e(146,`
  `),o(),e(147,`
`),o()}m&2&&(a(15),l("formGroup",t.employeeUpdateForm)("validated",t.customStylesValidated),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeName.errors&&(t.f.employeeName.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeEmail.errors&&(t.f.employeeEmail.touched||t.submitted)),a(7),l("cFormFloating",!0),a(7),l("ngForOf",t.countries),a(7),l("cFormFloating",!0),a(9),l("ngIf",t.f.employeeCountryCode.errors&&(t.f.employeeCountryCode.touched||t.submitted)||t.f.employeePhone.errors&&(t.f.employeePhone.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeAddress.errors&&(t.f.employeeAddress.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeOtherDetail.errors&&(t.f.employeeOtherDetail.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngForOf",t.userTypes),a(6),l("ngIf",t.f.employeeUserType.errors&&(t.f.employeeUserType.touched||t.submitted)),a(9),l("ngIf",t.fileUrl),a(13),l("ngIf",t.selectedFile),a(3),l("ngIf",t.fileError&&(t.submitted||t.selectedFile)),a(12),b(`
              `,t.showPasswordForm?"Hide":"Show",` Password Update
            `),a(5),l("ngIf",t.showPasswordForm))},dependencies:[V,k,D,me,Z,oe,ne,Q,ie,X,Y,re,ee,te,ae,K,J,A,G,L,W,$,H,z,M,B,R,q]})}}return r})();export{Be as UpdateEmployeesComponent};
