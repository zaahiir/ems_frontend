import{a as ie}from"./chunk-3AQQD4W2.js";import{a as ne}from"./chunk-AJEUVWKL.js";import{Aa as $,B as q,Ba as J,Ga as H,Ja as z,M as O,Ma as K,N as V,Na as Q,O as A,Oa as W,P as U,Pa as X,Q as L,Ra as Y,Ta as Z,U as G,Ua as ee,V as j,Va as te,Z as M,_ as R,q as w,x as k,y as I,ya as B,za as s}from"./chunk-K3LN6DFK.js";import{$a as x,Ga as p,Ia as l,Lb as N,Mb as P,S as b,Sa as i,Sb as T,Ta as o,Ua as c,Ya as g,Z as f,_ as y,_a as C,fc as D,jb as e,kb as S,lb as F,pa as a,qa as h,sb as _}from"./chunk-WAGJM7NU.js";import{f as re}from"./chunk-MYAK5QVS.js";var u=re(ne());function le(n,d){n&1&&(i(0,"c-form-feedback",34),e(1,`
              Please provide a Name.
            `),o()),n&2&&l("valid",!1)}function ae(n,d){n&1&&(i(0,"c-form-feedback",34),e(1,`
              Please provide an Email.
            `),o()),n&2&&l("valid",!1)}function me(n,d){if(n&1&&(i(0,"option",35),e(1),o()),n&2){let r=d.$implicit;l("value",r.id),a(),F(`
                    `,r.dailCode,`
                  `)}}function se(n,d){n&1&&(i(0,"c-form-feedback",34),e(1,`
              Please provide a valid Country Code and Phone Number.
            `),o()),n&2&&l("valid",!1)}function de(n,d){n&1&&(i(0,"c-form-feedback",34),e(1,`
              Please provide a Password.
            `),o()),n&2&&l("valid",!1)}function pe(n,d){n&1&&(i(0,"c-form-feedback",34),e(1,`
              Please provide an Address.
            `),o()),n&2&&l("valid",!1)}function ce(n,d){n&1&&(i(0,"c-form-feedback",34),e(1,`
              Please provide Other Details.
            `),o()),n&2&&l("valid",!1)}function ue(n,d){if(n&1&&(i(0,"c-form-feedback",34),e(1),o()),n&2){let r=x();l("valid",!1),a(),F(`
              `,r.fileError,`
            `)}}function fe(n,d){if(n&1&&(i(0,"option",35),e(1),o()),n&2){let r=d.$implicit;l("value",r.id),a(),S(r.userTypeName)}}function ye(n,d){n&1&&(i(0,"c-form-feedback",34),e(1,`
              Please select a User Type.
            `),o()),n&2&&l("valid",!1)}var Oe=(()=>{class n{constructor(r,m,t){this.fb=r,this.router=m,this.employeeService=t,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.userType=[],this.countries=[],this.employeeCreateForm=this.fb.group({employeeName:["",s.required],employeeEmail:["",[s.required,s.email]],employeeCountryCode:["",s.required],employeePhone:["",[s.required,this.phoneNumberValidator]],employeePassword:["",[s.required,s.minLength(6)]],employeeAddress:["",s.required],employeeOtherDetail:["",s.required],employeeUserType:["",s.required],employeeFile:[null,s.required]})}phoneNumberValidator(r){let m=r.value;return/^\d{10}$/.test(m)?null:{invalidPhone:!0}}ngOnInit(){this.loadUserTypeData(),this.loadCountryData()}get f(){return this.employeeCreateForm.controls}loadUserTypeData(){this.employeeService.getUserType().then(r=>{this.userType=r.data}).catch(r=>console.error("Error loading userType data:",r))}loadCountryData(){this.employeeService.getCountries().then(r=>{this.countries=r.data}).catch(r=>console.error("Error loading country data:",r))}validateFileType(r){return["image/jpeg","image/jpg","application/pdf"].includes(r.type)}onFileChange(r){let m=r.target;if(m.files&&m.files.length>0){let t=m.files[0];this.validateFileType(t)?(this.selectedFile=t,this.fileError=null):(this.selectedFile=null,this.fileError="Please choose a JPG, JPEG, or PDF file.")}else this.selectedFile=null,this.fileError="Please choose a file."}onSubmit(){if(this.customStylesValidated=!0,this.submitted=!0,this.employeeCreateForm.invalid||!this.selectedFile){let t=this.getMissingFields();t.length>0&&u.default.fire({title:"Validation Error",html:`Please correct the following issues:<br><br>${t.join("<br>")}`,icon:"error"});return}let r=new FormData;r.append("employeeName",this.f.employeeName.value),r.append("employeeEmail",this.f.employeeEmail.value),r.append("employeeCountryCode",this.f.employeeCountryCode.value),r.append("employeePhone",this.f.employeePhone.value),r.append("employeePassword",this.f.employeePassword.value),r.append("employeeAddress",this.f.employeeAddress.value),r.append("employeeOtherDetail",this.f.employeeOtherDetail.value),r.append("employeeUserType",this.f.employeeUserType.value),r.append("employeeFile",this.selectedFile,this.selectedFile.name),r.append("hideStatus","0");let m="0";this.loading=!0,this.employeeService.processEmployee(r,m).then(t=>{t.data.code===1?u.default.fire("Added!",t.data.message,"success").then(()=>{this.router.navigate(["/employees"])}):u.default.fire("Failed!",t.data.message,"error")}).catch(t=>{u.default.fire("Failed!",t.message||"An unknown error occurred","error")}).finally(()=>{this.loading=!1})}getMissingFields(){let r=[];return Object.keys(this.f).forEach(m=>{let t=this.f[m];t&&t.errors&&(t.errors.required?r.push(this.getFieldName(m)):m==="employeePhone"&&t.errors.invalidPhone&&r.push("Phone Number (must be 10 digits)"))}),this.selectedFile||r.push("Employee File"),r}getFieldName(r){return{employeeName:"Employee Name",employeeEmail:"Employee Email",employeeCountryCode:"Country Code",employeePhone:"Phone Number",employeePassword:"Password",employeeAddress:"Address",employeeOtherDetail:"Other Details",employeeUserType:"User Type"}[r]||r}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.selectedFile=null,this.fileError=null,this.employeeCreateForm.reset()}static{this.\u0275fac=function(m){return new(m||n)(h(Z),h(D),h(ie))}}static{this.\u0275cmp=b({type:n,selectors:[["app-create-employees"]],standalone:!0,features:[_],decls:136,vars:20,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","required","","formControlName","employeeName","type","text","placeholder","Name"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","required","","formControlName","employeeEmail","type","email","placeholder","Email"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cSelect","","id","countryCode","formControlName","employeeCountryCode","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["for","countryCode"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","validationCustom03","required","","formControlName","employeePhone","type","text","placeholder","Phone Number"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","required","","formControlName","employeePassword","type","password","placeholder","Password"],["cLabel","","for","validationCustom04",1,"ms-2"],["cFormControl","","id","validationCustom05","rows","3","formControlName","employeeAddress","required","","placeholder","Address"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","rows","3","formControlName","employeeOtherDetail","required","","placeholder","Other Details"],["cLabel","","for","validationCustom06",1,"ms-2"],["md","6",1,"mt-1"],["cLabel","","for","validationCustom07",1,"mb-0","mt-2"],["cFormControl","","id","validationCustom07","formControlName","employeeFile","required","","type","file","accept",".jpg,.jpeg,.pdf",3,"change"],["cSelect","","cFormControl","","id","validationCustom08","formControlName","employeeUserType","required",""],["value","","disabled",""],["cLabel","","for","validationCustom08",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"valid"],[3,"value"]],template:function(m,t){if(m&1){let v=g();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"Create Employee"),o(),e(10,`
      `),o(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),C("ngSubmit",function(){return f(v),y(t.onSubmit())}),e(16,`       
          
          `),i(17,"c-col",4),e(18,`
            `),c(19,"input",5),e(20,`
            `),i(21,"label",6),e(22,"Name"),o(),e(23,`
            `),p(24,le,2,1,"c-form-feedback",7),e(25,`
          `),o(),e(26,`

          `),i(27,"c-col",4),e(28,`
            `),c(29,"input",8),e(30,`
            `),i(31,"label",9),e(32,"Email"),o(),e(33,`
            `),p(34,ae,2,1,"c-form-feedback",7),e(35,`
          `),o(),e(36,`

          `),i(37,"c-col",10),e(38,`
            `),i(39,"c-input-group",11),e(40,`
              `),i(41,"c-col",12),e(42,`
                `),i(43,"select",13),e(44,`
                  `),i(45,"option",14),e(46,"Code"),o(),e(47,`
                  `),p(48,me,2,2,"option",15),e(49,`
                `),o(),e(50,`
                `),i(51,"label",16),e(52,"Country Code"),o(),e(53,`
              `),o(),e(54,`
              `),i(55,"c-col",17),e(56,`
                `),c(57,"input",18),e(58,`
                `),i(59,"label",19),e(60,"Phone Number"),o(),e(61,`
              `),o(),e(62,`
            `),o(),e(63,`
            `),p(64,se,2,1,"c-form-feedback",7),e(65,`
          `),o(),e(66,`

          `),i(67,"c-col",4),e(68,`
            `),c(69,"input",20),e(70,`
            `),i(71,"label",21),e(72,"Password"),o(),e(73,`
            `),p(74,de,2,1,"c-form-feedback",7),e(75,`
          `),o(),e(76,`

          `),i(77,"c-col",4),e(78,`
            `),c(79,"textarea",22),e(80,`
            `),i(81,"label",23),e(82,"Address"),o(),e(83,`
            `),p(84,pe,2,1,"c-form-feedback",7),e(85,`
          `),o(),e(86,`

          `),i(87,"c-col",4),e(88,`
            `),c(89,"textarea",24),e(90,`
            `),i(91,"label",25),e(92,"Other Details"),o(),e(93,`
            `),p(94,ce,2,1,"c-form-feedback",7),e(95,`
          `),o(),e(96,`

          `),i(97,"c-col",26),e(98,`
            `),i(99,"label",27),e(100,"File Upload"),o(),e(101,`
            `),i(102,"input",28),C("change",function(oe){return f(v),y(t.onFileChange(oe))}),o(),e(103,`
            `),p(104,ue,2,2,"c-form-feedback",7),e(105,`
          `),o(),e(106,`

          `),i(107,"c-col",4),e(108,`
            `),i(109,"select",29),e(110,`
              `),i(111,"option",30),e(112,"Select an User Type"),o(),e(113,`
              `),p(114,fe,2,2,"option",15),e(115,`
            `),o(),e(116,`
            `),i(117,"label",31),e(118,"User Type"),o(),e(119,`
            `),p(120,ye,2,1,"c-form-feedback",7),e(121,`
          `),o(),e(122,`

          `),i(123,"c-col",1),e(124,`
            `),i(125,"button",32),e(126,`
              Save
            `),o(),e(127,`
            `),i(128,"button",33),C("click",function(){return f(v),y(t.onReset())}),e(129,`
              Reset
            `),o(),e(130,`
          `),o(),e(131,`
        `),o(),e(132,`
      `),o(),e(133,`
    `),o(),e(134,`
  `),o(),e(135,`
`),o()}m&2&&(a(14),l("formGroup",t.employeeCreateForm)("validated",t.customStylesValidated),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeName.errors&&(t.f.employeeName.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeEmail.errors&&(t.f.employeeEmail.touched||t.submitted)),a(7),l("cFormFloating",!0),a(7),l("ngForOf",t.countries),a(7),l("cFormFloating",!0),a(9),l("ngIf",t.f.employeeCountryCode.errors&&(t.f.employeeCountryCode.touched||t.submitted)||t.f.employeePhone.errors&&(t.f.employeePhone.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeePassword.errors&&(t.f.employeePassword.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeAddress.errors&&(t.f.employeeAddress.touched||t.submitted)),a(3),l("cFormFloating",!0),a(7),l("ngIf",t.f.employeeOtherDetail.errors&&(t.f.employeeOtherDetail.touched||t.submitted)),a(10),l("ngIf",t.fileError&&(t.submitted||t.selectedFile)),a(3),l("cFormFloating",!0),a(7),l("ngForOf",t.userType),a(6),l("ngIf",t.f.employeeUserType.errors&&(t.f.employeeUserType.touched||t.submitted)))},dependencies:[P,T,N,R,M,k,j,q,I,te,H,W,X,B,Q,$,J,Y,z,K,ee,O,L,G,V,A,U,w]})}}return n})();export{Oe as CreateEmployeesComponent};
