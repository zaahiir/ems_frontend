import{a as ne}from"./chunk-DUJ2QR6G.js";import{a as ae}from"./chunk-AJEUVWKL.js";import{Aa as H,B as O,Ba as J,Ga as K,Ja as Q,M,Ma as X,N as P,Na as Y,Oa as Z,P as j,Pa as ee,Q as B,Ra as te,Ta as ie,U as G,Ua as se,V as $,Va as oe,Z as A,_ as z,q as V,x as L,y as q,ya as W,za as f}from"./chunk-K3LN6DFK.js";import{Ga as p,Ia as a,Jb as S,Lb as w,Mb as N,S as _,Sa as s,Sb as U,Ta as o,Ua as I,Ya as T,Z as y,_ as g,_a as D,c as b,dc as R,fc as k,jb as e,k as x,kb as F,pa as u,qa as C,sb as E}from"./chunk-WAGJM7NU.js";import{f as re,g as h}from"./chunk-MYAK5QVS.js";var d=re(ae());function le(r,c){if(r&1&&(s(0,"option",21),e(1),o()),r&2){let i=c.$implicit;a("value",i.id),u(),F(i.clientName)}}function ue(r,c){r&1&&(s(0,"c-form-feedback",22),e(1,"Please select a Client Name."),o()),r&2&&a("valid",!1)}function de(r,c){if(r&1&&(s(0,"option",21),e(1),o()),r&2){let i=c.$implicit;a("value",i.id),u(),F(i.issueTypeName)}}function me(r,c){r&1&&(s(0,"c-form-feedback",22),e(1,"Please provide an Issue Type."),o()),r&2&&a("valid",!1)}function ce(r,c){r&1&&(s(0,"c-form-feedback",22),e(1,"Please select an Issue Date."),o()),r&2&&a("valid",!1)}function pe(r,c){r&1&&(s(0,"c-form-feedback",22),e(1,"Please select an Issue Resolution Date."),o()),r&2&&a("valid",!1)}function fe(r,c){r&1&&(s(0,"c-form-feedback",22),e(1,"Please provide a Description."),o()),r&2&&a("valid",!1)}var Ee=(()=>{class r{constructor(i,n,t,l){this.fb=i,this.router=n,this.route=t,this.issueService=l,this.customStylesValidated=!1,this.submitted=!1,this.loading=!1,this.dataLoading=!0,this.issueTypes=[],this.clients=[],this.destroy$=new b,this.issueId="0",this.currentDate=S(new Date,"yyyy-MM-dd","en"),this.issueUpdateForm=this.initForm()}initForm(){return this.fb.group({issueClientName:["",f.required],issueType:["",f.required],issueDate:["",f.required],issueResolutionDate:["",f.required],issueDescription:["",f.required]})}ngOnInit(){this.route.params.subscribe(i=>{this.issueId=i.id||"0",Promise.all([this.loadClient(),this.loadIssueType()]).then(()=>this.loadInitialData(this.issueId)).catch(n=>{console.error("Error initializing component:",n),d.default.fire("Error","Failed to initialize the component","error")})})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}loadIssueType(){return h(this,null,function*(){try{let i=yield this.issueService.getIssueType();this.issueTypes=i.data}catch(i){console.error("Error loading Issue Types:",i),yield d.default.fire("Error","Failed to load Issue Types","error")}})}loadClient(){return h(this,null,function*(){try{let i=yield this.issueService.getClientName();this.clients=i.data}catch(i){console.error("Error loading Clients:",i),yield d.default.fire("Error","Failed to load Clients","error")}})}loadInitialData(i){return h(this,null,function*(){try{this.showLoader("Loading data...");let n=yield this.issueService.getIssueById(i).toPromise();if(n&&n.code===1&&n.data){let t=n.data,l=this.clients.find(v=>v.clientName===t.issueClientName)?.id,m=this.issueTypes.find(v=>v.issueTypeName===t.issueType)?.id;if(!l||!m){console.error("Could not find matching Client or Issue Type"),yield d.default.fire("Error","Failed to match Client or Issue Type data","error");return}this.issueUpdateForm?this.issueUpdateForm.patchValue({issueClientName:l,issueType:m,issueDate:t.issueDate,issueResolutionDate:t.issueResolutionDate,issueDescription:t.issueDescription}):console.error("Form is not initialized")}else console.error("Invalid response structure:",n)}catch(n){console.error("Error loading Issue data:",n),yield d.default.fire("Error","Failed to load Issue data","error")}finally{this.dataLoading=!1,this.hideLoader()}})}onIssueTypeChange(){this.updateResolutionDate()}onIssueDateChange(){this.updateResolutionDate()}updateResolutionDate(){let i=this.issueUpdateForm.get("issueType")?.value,n=this.issueUpdateForm.get("issueDate")?.value;if(!i||!n)return;let t=new Date(n),l=this.issueTypes.find(m=>m.id===Number(i));if(l){let m=this.calculateResolutionDate(t,l.estimatedIssueDay);this.issueUpdateForm.patchValue({issueResolutionDate:S(m,"yyyy-MM-dd","en")},{emitEvent:!1})}}calculateResolutionDate(i,n){let t=new Date(i.getTime()),l=0;for(;l<n;)t.setDate(t.getDate()+1),this.isWorkingDay(t)&&l++;return t}isWorkingDay(i){let n=i.getDay();return n>=1&&n<=5}get f(){return this.issueUpdateForm.controls}onSubmit(){return h(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.issueUpdateForm.invalid){let t=Object.keys(this.issueUpdateForm.controls).filter(l=>this.issueUpdateForm.get(l)?.invalid).map(l=>{switch(l){case"issueClientName":return"Client Name";case"issueType":return"Issue Type";case"issueDate":return"Issue Date";case"issueResolutionDate":return"Resolution Date";case"issueDescription":return"Issue Description";default:return l}});yield d.default.fire({title:"Form Validation Error",html:`Please fill in the following required fields:<br>${t.join("<br>")}`,icon:"error"});return}if(this.loading)return;this.loading=!0,this.showLoader("Updating...");let i=this.issueUpdateForm.value,n={issueClientName:i.issueClientName,issueType:i.issueType,issueDate:i.issueDate,issueResolutionDate:i.issueResolutionDate,issueDescription:i.issueDescription,hideStatus:0};try{let t=yield x(this.issueService.processIssue(n,this.issueId));t.code===1?(yield d.default.fire("Updated!",t.message,"success"),this.router.navigate(["/forms/issue"])):yield d.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error updating Issue:",t),yield d.default.fire("Failed!","An error occurred while updating the Issue","error")}finally{this.loading=!1,this.hideLoader()}})}onCancel(){this.router.navigate(["/forms/issue"])}showLoader(i="Loading..."){d.default.fire({title:i,allowOutsideClick:!1,didOpen:()=>{d.default.showLoading()}})}hideLoader(){d.default.close()}static{this.\u0275fac=function(n){return new(n||r)(C(ie),C(k),C(R),C(ne))}}static{this.\u0275cmp=_({type:r,selectors:[["app-update-issue"]],standalone:!0,features:[E],decls:92,vars:14,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","issueClientName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","issueType","required","",3,"change"],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","issueDate","required","","type","date","placeholder","Issue Date",3,"change"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","issueResolutionDate","required","","type","date","placeholder","Issue Resolution Date"],["cLabel","","for","validationCustom04",1,"ms-2"],[3,"cFormFloating"],["cFormControl","","id","validationCustom05","formControlName","issueDescription","rows","3","required","","placeholder","Description"],["cLabel","","for","validationCustom05",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"value"],[3,"valid"]],template:function(n,t){if(n&1){let l=T();s(0,"c-row"),e(1,`
  `),s(2,"c-col",1),e(3,`
    `),s(4,"c-card",2),e(5,`
      `),s(6,"c-card-header"),e(7,`
        `),s(8,"strong"),e(9,"Update Issue"),o(),e(10,`
      `),o(),e(11,`
      `),s(12,"c-card-body"),e(13,`
        `),s(14,"form",3,0),D("ngSubmit",function(){return y(l),g(t.onSubmit())}),e(16,`
          `),s(17,"c-col",4),e(18,`
            `),s(19,"select",5),e(20,`
              `),s(21,"option",6),e(22,"Select a Client Name"),o(),e(23,`
              `),p(24,le,2,2,"option",7),e(25,`
            `),o(),e(26,`
            `),s(27,"label",8),e(28,"Client Name"),o(),e(29,`
            `),p(30,ue,2,1,"c-form-feedback",9),e(31,`
          `),o(),e(32,`
          
          `),s(33,"c-col",4),e(34,`
            `),s(35,"select",10),D("change",function(){return y(l),g(t.onIssueTypeChange())}),e(36,`
              `),s(37,"option",6),e(38,"Select an Issue Type"),o(),e(39,`
              `),p(40,de,2,2,"option",7),e(41,`
            `),o(),e(42,`
            `),s(43,"label",11),e(44,"Issue Type"),o(),e(45,`
            `),p(46,me,2,1,"c-form-feedback",9),e(47,`
          `),o(),e(48,`
          
          `),s(49,"c-col",4),e(50,`
            `),s(51,"input",12),D("change",function(){return y(l),g(t.onIssueDateChange())}),o(),e(52,`
            `),s(53,"label",13),e(54,"Issue Date"),o(),e(55,`
            `),p(56,ce,2,1,"c-form-feedback",9),e(57,`
          `),o(),e(58,`
          
          `),s(59,"c-col",4),e(60,`
            `),I(61,"input",14),e(62,`
            `),s(63,"label",15),e(64,"Issue Resolution Date"),o(),e(65,`
            `),p(66,pe,2,1,"c-form-feedback",9),e(67,`
          `),o(),e(68,`
          
          `),s(69,"c-col",16),e(70,`
            `),I(71,"textarea",17),e(72,`
            `),s(73,"label",18),e(74,"Description"),o(),e(75,`
            `),p(76,fe,2,1,"c-form-feedback",9),e(77,`
          `),o(),e(78,`
          
          `),s(79,"c-col",1),e(80,`
            `),s(81,"button",19),e(82,`
              Update
            `),o(),e(83,`
            `),s(84,"button",20),D("click",function(){return y(l),g(t.onCancel())}),e(85,`
              Cancel
            `),o(),e(86,`
          `),o(),e(87,`
        `),o(),e(88,`
      `),o(),e(89,`
    `),o(),e(90,`
  `),o(),e(91,`
`),o()}n&2&&(u(14),a("formGroup",t.issueUpdateForm)("validated",t.customStylesValidated),u(3),a("cFormFloating",!0),u(7),a("ngForOf",t.clients),u(6),a("ngIf",t.f.issueClientName.errors&&(t.f.issueClientName.touched||t.submitted)),u(3),a("cFormFloating",!0),u(7),a("ngForOf",t.issueTypes),u(6),a("ngIf",t.f.issueType.errors&&(t.f.issueType.touched||t.submitted)),u(3),a("cFormFloating",!0),u(7),a("ngIf",t.f.issueDate.errors&&(t.f.issueDate.touched||t.submitted)),u(3),a("cFormFloating",!0),u(7),a("ngIf",t.f.issueResolutionDate.errors&&(t.f.issueResolutionDate.touched||t.submitted)),u(3),a("cFormFloating",!0),u(7),a("ngIf",t.f.issueDescription.errors&&(t.f.issueDescription.touched||t.submitted)))},dependencies:[U,w,N,z,A,L,O,q,oe,K,Z,ee,W,Y,H,J,te,Q,X,$,se,M,B,G,P,j,V]})}}return r})();export{Ee as UpdateIssueComponent};
