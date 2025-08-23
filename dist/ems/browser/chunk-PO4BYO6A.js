import{a as re}from"./chunk-DUJ2QR6G.js";import{a as se}from"./chunk-AJEUVWKL.js";import{Aa as H,B as q,Ba as J,Ga as K,Ja as Q,M,Ma as U,N as R,Na as W,Oa as X,P,Pa as Y,Q as j,Ra as Z,Ta as ee,U as G,Ua as te,V as $,Va as ie,Z as B,_ as A,q as L,x as V,y as O,ya as z,za as u}from"./chunk-K3LN6DFK.js";import{Ga as c,Ia as o,Jb as E,Lb as w,Mb as N,S as x,Sa as i,Sb as T,Ta as r,Ua as v,Ya as I,Z as y,_ as C,_a as h,c as F,fc as k,jb as e,k as b,kb as g,lb as D,pa as a,qa as p,sb as _}from"./chunk-WAGJM7NU.js";import{f as oe,g as f}from"./chunk-MYAK5QVS.js";var m=oe(se());function ae(n,d){if(n&1&&(i(0,"option",19),e(1),r()),n&2){let l=d.$implicit;o("value",l.id),a(),g(l.clientName)}}function le(n,d){n&1&&(i(0,"c-form-feedback",20),e(1,"Please select a Client Name."),r()),n&2&&o("valid",!1)}function me(n,d){if(n&1&&(i(0,"option",19),e(1),r()),n&2){let l=d.$implicit;o("value",l.id),a(),g(l.issueTypeName)}}function de(n,d){n&1&&(i(0,"c-form-feedback",20),e(1,"Please select an Issue Type."),r()),n&2&&o("valid",!1)}function ce(n,d){n&1&&(i(0,"c-form-feedback",20),e(1,"Please select an Issue Date."),r()),n&2&&o("valid",!1)}function ue(n,d){n&1&&(i(0,"c-form-feedback",20),e(1,"Please provide a Description."),r()),n&2&&o("valid",!1)}var we=(()=>{class n{constructor(l,s,t){this.fb=l,this.router=s,this.issueService=t,this.customStylesValidated=!1,this.submitted=!1,this.loading=!1,this.dataLoading=!0,this.issueTypes=[],this.clients=[],this.destroy$=new F,this.currentDate=E(new Date,"yyyy-MM-dd","en"),this.issueForm=this.initForm()}initForm(){return this.fb.group({issueClientName:["",u.required],issueType:["",u.required],issueDate:[this.currentDate,u.required],issueDescription:["",u.required]})}ngOnInit(){this.loadInitialData()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadInitialData(){return f(this,null,function*(){try{this.showLoader("Loading data...");let[l,s]=yield Promise.all([this.issueService.getIssueType(),this.issueService.getClientName()]);this.issueTypes=l.data,this.clients=s.data}catch{yield m.default.fire("Error","Failed to initialize the form. Please try again.","error")}finally{this.dataLoading=!1,this.hideLoader()}})}get f(){return this.issueForm.controls}onSubmit(){return f(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.issueForm.invalid){let s=Object.keys(this.issueForm.controls).filter(t=>this.issueForm.get(t)?.invalid).map(t=>{switch(t){case"issueClientName":return"Client Name";case"issueType":return"Issue Type";case"issueDate":return"Issue Date";case"issueDescription":return"Issue Description";default:return t}});yield m.default.fire({title:"Form Validation Error",html:`Please fill in the following required fields:<br>${s.join("<br>")}`,icon:"error"});return}if(this.loading)return;this.loading=!0,this.showLoader("Submitting...");let l=this.issueForm.value;try{(yield b(this.issueService.processIssue(l,"0"))).code===1?(yield m.default.fire("Added!","Issue created successfully","success"),this.router.navigate(["/forms/issue"])):yield m.default.fire("Failed!","Error creating issue","error")}catch(s){console.error("Error processing Issue:",s);let t="An error occurred while processing the issue entry.";s instanceof Error?t=s.message:typeof s=="string"&&(t=s),yield m.default.fire("Failed!",t,"error")}finally{this.loading=!1,this.hideLoader()}})}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.issueForm.reset({issueDate:this.currentDate})}showLoader(l="Loading..."){m.default.fire({title:l,allowOutsideClick:!1,didOpen:()=>{m.default.showLoading()}})}hideLoader(){m.default.close()}static{this.\u0275fac=function(s){return new(s||n)(p(ee),p(k),p(re))}}static{this.\u0275cmp=x({type:n,selectors:[["app-create-issue"]],standalone:!0,features:[_],decls:82,vars:15,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","issueClientName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","issueType","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","issueDate","required","","type","date","placeholder","Issue Date"],["cLabel","","for","validationCustom03",1,"ms-2"],[3,"cFormFloating"],["cFormControl","","id","validationCustom05","formControlName","issueDescription","rows","3","required","","placeholder","Description"],["cLabel","","for","validationCustom05",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1",3,"disabled"],["cButton","","color","secondary","type","reset",3,"click","disabled"],[3,"value"],[3,"valid"]],template:function(s,t){if(s&1){let S=I();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"New Issue"),r(),e(10,`
      `),r(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),h("ngSubmit",function(){return y(S),C(t.onSubmit())}),e(16,`
          `),i(17,"c-col",4),e(18,`
            `),i(19,"select",5),e(20,`
              `),i(21,"option",6),e(22,"Select a Client Name"),r(),e(23,`
              `),c(24,ae,2,2,"option",7),e(25,`
            `),r(),e(26,`
            `),i(27,"label",8),e(28,"Client Name"),r(),e(29,`
            `),c(30,le,2,1,"c-form-feedback",9),e(31,`
          `),r(),e(32,`
          
          `),i(33,"c-col",4),e(34,`
            `),i(35,"select",10),e(36,`
              `),i(37,"option",6),e(38,"Select an Issue Type"),r(),e(39,`
              `),c(40,me,2,2,"option",7),e(41,`
            `),r(),e(42,`
            `),i(43,"label",11),e(44,"Issue Type"),r(),e(45,`
            `),c(46,de,2,1,"c-form-feedback",9),e(47,`
          `),r(),e(48,`
          
          `),i(49,"c-col",4),e(50,`
            `),v(51,"input",12),e(52,`
            `),i(53,"label",13),e(54,"Issue Date"),r(),e(55,`
            `),c(56,ce,2,1,"c-form-feedback",9),e(57,`
          `),r(),e(58,`
          
          `),i(59,"c-col",14),e(60,`
            `),v(61,"textarea",15),e(62,`
            `),i(63,"label",16),e(64,"Description"),r(),e(65,`
            `),c(66,ue,2,1,"c-form-feedback",9),e(67,`
          `),r(),e(68,`
          
          `),i(69,"c-col",1),e(70,`
            `),i(71,"button",17),e(72),r(),e(73,`
            `),i(74,"button",18),h("click",function(){return y(S),C(t.onReset())}),e(75,`
              Reset
            `),r(),e(76,`
          `),r(),e(77,`
        `),r(),e(78,`
      `),r(),e(79,`
    `),r(),e(80,`
  `),r(),e(81,`
`),r()}s&2&&(a(14),o("formGroup",t.issueForm)("validated",t.customStylesValidated),a(3),o("cFormFloating",!0),a(7),o("ngForOf",t.clients),a(6),o("ngIf",t.f.issueClientName.errors&&(t.f.issueClientName.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngForOf",t.issueTypes),a(6),o("ngIf",t.f.issueType.errors&&(t.f.issueType.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.issueDate.errors&&(t.f.issueDate.touched||t.submitted)),a(3),o("cFormFloating",!0),a(7),o("ngIf",t.f.issueDescription.errors&&(t.f.issueDescription.touched||t.submitted)),a(5),o("disabled",t.loading),a(),D(`
              `,t.loading?"Saving...":"Save",`
            `),a(2),o("disabled",t.loading))},dependencies:[N,T,w,A,B,V,q,O,ie,K,X,Y,z,W,H,J,Z,Q,U,$,te,M,j,G,R,P,L]})}}return n})();export{we as CreateIssueComponent};
