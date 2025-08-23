import './polyfills.server.mjs';
import{a as le}from"./chunk-YOYBCKVQ.mjs";import{a as me}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as X,F as j,Fa as Y,G,Ga as Z,H as L,Ha as ee,I as R,Ia as te,J as $,Ka as ie,Ma as re,N as B,Na as oe,O as Q,Oa as ne,S as H,T as J,j as T,q as A,r as O,ra as U,sa as p,ta as W,u as P,ua as z,za as K}from"./chunk-B4NKEOAB.mjs";import{d as q}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as E,Fb as b,Lc as M,Mb as _,Mc as V,Nb as N,Ob as w,Qb as e,Rb as k,Sa as m,Sb as x,Sc as D,Ta as v,Zb as I,ia as y,lb as u,nb as a,p as S,sa as C,ta as h,xb as t,yb as i,zb as F}from"./chunk-S7ATBOQE.mjs";import{g as ce,h as g}from"./chunk-COT65Y5O.mjs";var f=ce(me());var se=["fileInput"];function de(o,d){if(o&1&&(t(0,"option",27),e(1),i()),o&2){let n=d.$implicit;a("value",n.id),m(),k(n.clientName)}}function ue(o,d){o&1&&(t(0,"c-form-feedback",28),e(1,"Please select a Client Name."),i()),o&2&&a("valid",!1)}function pe(o,d){o&1&&(t(0,"c-form-feedback",28),e(1,`
              Please provide an Address.
            `),i()),o&2&&a("valid",!1)}function fe(o,d){if(o&1&&(t(0,"option",27),e(1),i()),o&2){let n=d.$implicit;a("value",n.id),m(),x(`
                    `,n.dailCode,`
                  `)}}function Ce(o,d){o&1&&(t(0,"c-form-feedback",28),e(1,`
              Please select a Country Code.
            `),i()),o&2&&a("valid",!1)}function he(o,d){o&1&&(t(0,"c-form-feedback",28),e(1,`
              Please provide a Mobile Number.
            `),i()),o&2&&a("valid",!1)}function ve(o,d){o&1&&(t(0,"c-form-feedback",28),e(1,`
              Please provide an Email.
            `),i()),o&2&&a("valid",!1)}function Fe(o,d){if(o&1&&(t(0,"c-form-feedback",28),e(1),i()),o&2){let n=d.$implicit;a("valid",!1),m(),x(`
            `,n,`
          `)}}var je=(()=>{class o{constructor(n,c,r){this.fb=n,this.router=c,this.courierService=r,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.selectedFiles=[],this.fileErrors=[],this.clients=[],this.countries=[],this.initForm()}ngOnInit(){this.loadClients(),this.loadCountries()}initForm(){this.courierForm=this.fb.group({courierClientName:["",p.required],courierClientAddress:["",p.required],courierCountryCode:["",p.required],courierMobileNumber:["",[p.required,p.pattern("^[0-9]{10}$")]],courierEmail:["",[p.required,p.email]],courierFile:[null,p.required]})}loadClients(){this.courierService.getClientNames().then(n=>{this.clients=n},n=>{console.error("Error fetching clients:",n),f.default.fire("Error","Failed to load clients","error")})}loadCountries(){this.courierService.getCountries().then(n=>{this.countries=n},n=>{console.error("Error fetching countries:",n),f.default.fire("Error","Failed to load countries","error")})}get f(){return this.courierForm.controls}onFileChange(n){let c=n.target.files;this.selectedFiles=[],this.fileErrors=[];let r=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg","image/jpg","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","text/csv","text/plain"];for(let l=0;l<c.length;l++){let s=c[l];r.includes(s.type)?this.selectedFiles.push(s):this.fileErrors.push(`${s.name}: Invalid file type. Please select a PDF, Word document, JPEG, Excel, CSV, or text file.`)}this.selectedFiles.length===0&&this.fileErrors.push("Please select at least one valid file.")}onSubmit(){return g(this,null,function*(){this.customStylesValidated=!0,this.submitted=!0;let n=[];if(Object.keys(this.courierForm.controls).forEach(l=>{let s=this.courierForm.get(l);s?.invalid&&(l==="courierMobileNumber"&&s.errors?.pattern?n.push("Mobile number must be exactly 10 digits."):n.push(`${l.charAt(0).toUpperCase()+l.slice(1)} is required.`))}),this.selectedFiles.length===0&&n.push("Please choose at least one file."),n.length>0){yield f.default.fire({title:"Form Validation Error",html:n.join("<br>"),icon:"error"});return}let c=new FormData;c.append("courierClientName",this.f.courierClientName.value),c.append("courierClientAddress",this.f.courierClientAddress.value),c.append("courierCountryCode",this.f.courierCountryCode.value),c.append("courierMobileNumber",this.f.courierMobileNumber.value),c.append("courierEmail",this.f.courierEmail.value);for(let l=0;l<this.selectedFiles.length;l++)c.append("courierFile",this.selectedFiles[l],this.selectedFiles[l].name);c.append("hideStatus","0");let r="0";this.loading=!0;try{(yield S(this.courierService.processCourier(c,"0"))).code===1?(yield f.default.fire("Added!","Courier created successfully","success"),this.router.navigate(["/forms/courier"])):yield f.default.fire("Failed!","Error creating courier","error")}catch(l){console.error("Error processing Courier:",l);let s="An error occurred while processing the courier entry.";l instanceof Error?s=l.message:typeof l=="string"&&(s=l),yield f.default.fire("Failed!",s,"error")}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.selectedFiles=[],this.fileErrors=[],this.courierForm.reset(),this.fileInput&&(this.fileInput.nativeElement.value="")}static{this.\u0275fac=function(c){return new(c||o)(v(re),v(q),v(le))}}static{this.\u0275cmp=y({type:o,selectors:[["app-create-courier"]],viewQuery:function(c,r){if(c&1&&_(se,5),c&2){let l;N(l=w())&&(r.fileInput=l.first)}},standalone:!0,features:[I],decls:108,vars:15,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","courierClientName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","courierClientAddress","required","","type","text","placeholder","Address"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cSelect","","id","courierCountryCode","formControlName","courierCountryCode","required",""],["for","courierCountryCode"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","courierMobileNumber","formControlName","courierMobileNumber","required","","type","text","placeholder","Mobile Number"],["cLabel","","for","courierMobileNumber",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","courierEmail","required","","type","email","placeholder","Email"],["cLabel","","for","validationCustom04",1,"ms-2"],["cLabel","","for","validationCustom05"],["cFormControl","","id","validationCustom05","formControlName","courierFile","required","","multiple","","type","file","accept",".pdf,.doc,.docx,.jpeg,.jpg,.xls,.xlsx,.csv,.txt",3,"change"],[3,"valid",4,"ngFor","ngForOf"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"value"],[3,"valid"]],template:function(c,r){if(c&1){let l=E();t(0,"c-row"),e(1,`
  `),t(2,"c-col",1),e(3,`
    `),t(4,"c-card",2),e(5,`
      `),t(6,"c-card-header"),e(7,`
        `),t(8,"strong"),e(9,"New Courier Entry Form"),i(),e(10,`
      `),i(),e(11,`
      `),t(12,"c-card-body"),e(13,` 
        `),t(14,"form",3,0),b("ngSubmit",function(){return C(l),h(r.onSubmit())}),e(16,`

            `),t(17,"c-col",4),e(18,`
              `),t(19,"select",5),e(20,`
                `),t(21,"option",6),e(22,"Select a Client Name"),i(),e(23,`
                `),u(24,de,2,2,"option",7),e(25,`
              `),i(),e(26,`
              `),t(27,"label",8),e(28,"Client Name"),i(),e(29,`
              `),u(30,ue,2,1,"c-form-feedback",9),e(31,`
            `),i(),e(32,`

          `),t(33,"c-col",4),e(34,`
            `),F(35,"input",10),e(36,`
            `),t(37,"label",11),e(38,"Address"),i(),e(39,`
            `),u(40,pe,2,1,"c-form-feedback",9),e(41,`
          `),i(),e(42,`

          `),t(43,"c-col",12),e(44,`
            `),t(45,"c-input-group",13),e(46,`
              `),t(47,"c-col",14),e(48,`
                `),t(49,"select",15),e(50,`
                  `),t(51,"option",6),e(52,"Select Country Code"),i(),e(53,`
                  `),u(54,fe,2,2,"option",7),e(55,`
                `),i(),e(56,`
                `),t(57,"label",16),e(58,"Country Code"),i(),e(59,`
              `),i(),e(60,`
              `),t(61,"c-col",17),e(62,`
                `),F(63,"input",18),e(64,`
                `),t(65,"label",19),e(66,"Mobile Number"),i(),e(67,`
              `),i(),e(68,`
            `),i(),e(69,`
            `),u(70,Ce,2,1,"c-form-feedback",9),e(71,`
            `),u(72,he,2,1,"c-form-feedback",9),e(73,`
          `),i(),e(74,`

          `),t(75,"c-col",4),e(76,`
            `),F(77,"input",20),e(78,`
            `),t(79,"label",21),e(80,"Email"),i(),e(81,`
            `),u(82,ve,2,1,"c-form-feedback",9),e(83,`
          `),i(),e(84,`

          `),t(85,"c-col"),e(86,`
          `),t(87,"label",22),e(88,"Fund File"),i(),e(89,`
          `),t(90,"input",23),b("change",function(ae){return C(l),h(r.onFileChange(ae))}),i(),e(91,`
          `),u(92,Fe,2,2,"c-form-feedback",24),e(93,`
          `),i(),e(94,`

          `),t(95,"c-col",1),e(96,`
            `),t(97,"button",25),e(98,`
              Save
            `),i(),e(99,`
            `),t(100,"button",26),b("click",function(){return C(l),h(r.onReset())}),e(101,`
              Reset
            `),i(),e(102,`
          `),i(),e(103,`
        `),i(),e(104,`
      `),i(),e(105,`
    `),i(),e(106,`
  `),i(),e(107,`
`),i()}c&2&&(m(14),a("formGroup",r.courierForm)("validated",r.customStylesValidated),m(3),a("cFormFloating",!0),m(7),a("ngForOf",r.clients),m(6),a("ngIf",r.f.courierClientName.errors&&(r.f.courierClientName.touched||r.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngIf",r.f.courierClientAddress.errors&&(r.f.courierClientAddress.touched||r.submitted)),m(7),a("cFormFloating",!0),m(7),a("ngForOf",r.countries),m(7),a("cFormFloating",!0),m(9),a("ngIf",r.f.courierCountryCode.errors&&(r.f.courierCountryCode.touched||r.submitted)),m(2),a("ngIf",r.f.courierMobileNumber.errors&&(r.f.courierMobileNumber.touched||r.submitted)),m(3),a("cFormFloating",!0),m(7),a("ngIf",r.f.courierEmail.errors&&(r.f.courierEmail.touched||r.submitted)),m(10),a("ngForOf",r.fileErrors))},dependencies:[V,D,M,J,H,Q,A,P,O,ne,K,ee,te,U,Z,W,z,ie,X,Y,oe,j,$,B,G,L,R,T]})}}return o})();export{je as CreateCourierComponent};
