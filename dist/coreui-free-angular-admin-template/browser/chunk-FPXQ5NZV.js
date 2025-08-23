import{a as se}from"./chunk-UUAEYMST.js";import{a as ce}from"./chunk-AJEUVWKL.js";import{Aa as Q,B as T,Ba as W,Ga as X,Ja as Y,M as O,Ma as Z,N as j,Na as ee,Oa as te,P as G,Pa as ie,Q as B,Ra as oe,Ta as ne,U as $,Ua as re,V as z,Va as me,Z as H,_ as J,q as P,x as q,y as L,ya as K,za as f}from"./chunk-K3LN6DFK.js";import{Ga as u,Ia as m,Lb as w,Mb as D,Qb as F,S,Sa as i,Sb as U,Ta as o,Ua as y,Ya as x,Z as A,_ as E,_a as N,dc as k,fc as R,gc as V,jb as e,k as g,kb as b,pa as a,qa as C,rb as _,sb as M,tb as I}from"./chunk-WAGJM7NU.js";import{f as ae,g as h}from"./chunk-MYAK5QVS.js";var l=ae(ce());var le=()=>["/forms/commission"];function de(r,p){if(r&1&&(i(0,"option",18),e(1),o()),r&2){let n=p.$implicit;m("value",n.id),a(),b(n.arnNumber)}}function pe(r,p){r&1&&(i(0,"c-form-feedback",19),e(1,"Please select an ARN."),o()),r&2&&m("valid",!1)}function ue(r,p){if(r&1&&(i(0,"option",18),e(1),o()),r&2){let n=p.$implicit;m("value",n.id),a(),b(n.amcName)}}function fe(r,p){r&1&&(i(0,"c-form-feedback",19),e(1,"Please select an AMC."),o()),r&2&&m("valid",!1)}function he(r,p){r&1&&(i(0,"c-form-feedback",19),e(1,"Please provide a commission."),o()),r&2&&m("valid",!1)}function Ce(r,p){r&1&&(i(0,"c-form-feedback",19),e(1,"Please select a month."),o()),r&2&&m("valid",!1)}var Pe=(()=>{class r{constructor(n,s,t,c,d){this.fb=n,this.router=s,this.route=t,this.datePipe=c,this.commissionEntryFormService=d,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.commissionId="0",this.arns=[],this.amcs=[],this.initForm()}ngOnInit(){return h(this,null,function*(){try{yield Promise.all([this.loadArn(),this.loadAmc()]),this.route.params.subscribe(n=>{this.commissionId=n.id||"0",this.loadCommissionData(this.commissionId)})}catch(n){console.error("Error initializing component:",n),yield l.default.fire("Error","Failed to initialize the component","error")}})}initForm(){this.commissionUpdateForm=this.fb.group({commissionArnNumber:["",f.required],commissionAmcName:["",f.required],commissionAmount:["",[f.required,f.min(0)]],commissionMonth:["",[f.required,f.pattern(/^\d{4}-\d{2}$/)]]})}get f(){return this.commissionUpdateForm.controls}loadArn(){return h(this,null,function*(){try{let n=yield this.commissionEntryFormService.getArn();this.arns=n.data}catch(n){console.error("Error loading ARNs:",n),yield l.default.fire("Error","Failed to load ARNs","error")}})}loadAmc(){return h(this,null,function*(){try{let n=yield this.commissionEntryFormService.getAmc();this.amcs=n.data}catch(n){console.error("Error loading AMCs:",n),yield l.default.fire("Error","Failed to load AMCs","error")}})}loadCommissionData(n){return h(this,null,function*(){try{let s=yield this.commissionEntryFormService.getCommissionById(n).toPromise();if(s&&s.code===1&&s.data){let t=s.data,c=this.arns.find(v=>v.arnNumber===t.commissionArnNumber)?.id,d=this.amcs.find(v=>v.amcName===t.commissionAmcName)?.id;if(!c||!d){console.error("Could not find matching ARN or AMC"),yield l.default.fire("Error","Failed to match ARN or AMC data","error");return}this.commissionUpdateForm.patchValue({commissionArnNumber:c,commissionAmcName:d,commissionAmount:t.commissionAmount,commissionMonth:this.datePipe.transform(t.commissionMonth,"yyyy-MM")})}else console.error("Invalid response structure:",s)}catch(s){console.error("Error loading Commission data:",s),yield l.default.fire("Error","Failed to load Commission data","error")}})}onSubmit(){return h(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.commissionUpdateForm.invalid){let t=Object.keys(this.commissionUpdateForm.controls).filter(c=>this.commissionUpdateForm.get(c)?.invalid).map(c=>{switch(c){case"commissionArnNumber":return"ARN Number";case"commissionAmcName":return"AMC Name";case"commissionAmount":return"Commission Amount";case"commissionMonth":return"Commission Month";default:return c}});yield l.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${t.join("<br>")}`,icon:"error"}),Object.keys(this.commissionUpdateForm.controls).forEach(c=>{let d=this.commissionUpdateForm.get(c);d&&d.invalid&&d.markAsTouched()});return}if(this.loading)return;this.loading=!0;let n=this.commissionUpdateForm.value,s={commissionArnNumber:n.commissionArnNumber,commissionAmcName:n.commissionAmcName,commissionAmount:n.commissionAmount,commissionMonth:n.commissionMonth,hideStatus:0};try{let t=yield g(this.commissionEntryFormService.processCommission(s,this.commissionId));t.code===1?(yield l.default.fire("Updated!",t.message,"success"),this.router.navigate(["/forms/commission"])):yield l.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error updating Commission:",t),yield l.default.fire("Failed!","An error occurred while updating the Commission","error")}finally{this.loading=!1}})}onCancel(){this.router.navigate(["/forms/commission"])}static{this.\u0275fac=function(s){return new(s||r)(C(ne),C(R),C(k),C(F),C(se))}}static{this.\u0275cmp=S({type:r,selectors:[["app-update-commission-entry-form"]],standalone:!0,features:[_([F]),M],decls:82,vars:14,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","id","validationCustom01","formControlName","commissionArnNumber","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","id","validationCustom02","formControlName","commissionAmcName","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","commissionAmount","required","","type","text","placeholder","Commission"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","commissionMonth","required","","type","month","placeholder","Month"],["cLabel","","for","validationCustom04",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"routerLink"],[3,"value"],[3,"valid"]],template:function(s,t){if(s&1){let c=x();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"Update Commission Entry Form"),o(),e(10,`
      `),o(),e(11,`
      `),i(12,"c-card-body"),e(13,` 
        `),i(14,"form",3,0),N("ngSubmit",function(){return A(c),E(t.onSubmit())}),e(16,`
          `),i(17,"c-col",4),e(18,`
            `),i(19,"select",5),e(20,`
              `),i(21,"option",6),e(22,"Select an ARN"),o(),e(23,`
              `),u(24,de,2,2,"option",7),e(25,`
            `),o(),e(26,`
            `),i(27,"label",8),e(28,"ARN"),o(),e(29,`
            `),u(30,pe,2,1,"c-form-feedback",9),e(31,`
          `),o(),e(32,`

          `),i(33,"c-col",4),e(34,`
            `),i(35,"select",10),e(36,`
              `),i(37,"option",6),e(38,"Select an AMC"),o(),e(39,`
              `),u(40,ue,2,2,"option",7),e(41,`
            `),o(),e(42,`
            `),i(43,"label",11),e(44,"AMC"),o(),e(45,`
            `),u(46,fe,2,1,"c-form-feedback",9),e(47,`
          `),o(),e(48,`

          `),i(49,"c-col",4),e(50,`
            `),y(51,"input",12),e(52,`
            `),i(53,"label",13),e(54,"Commission"),o(),e(55,`
            `),u(56,he,2,1,"c-form-feedback",9),e(57,`
          `),o(),e(58,`

          `),i(59,"c-col",4),e(60,`
            `),y(61,"input",14),e(62,`
            `),i(63,"label",15),e(64,"Month"),o(),e(65,`
            `),u(66,Ce,2,1,"c-form-feedback",9),e(67,`
          `),o(),e(68,`

          `),i(69,"c-col",1),e(70,`
            `),i(71,"button",16),e(72,`
              Update
            `),o(),e(73,`
            `),i(74,"button",17),e(75,`
              Cancel
            `),o(),e(76,`
          `),o(),e(77,`
        `),o(),e(78,`
      `),o(),e(79,`
    `),o(),e(80,`
  `),o(),e(81,`
`),o()}s&2&&(a(14),m("formGroup",t.commissionUpdateForm)("validated",t.customStylesValidated),a(3),m("cFormFloating",!0),a(7),m("ngForOf",t.arns),a(6),m("ngIf",t.f.commissionArnNumber.errors&&(t.f.commissionArnNumber.touched||t.submitted)),a(3),m("cFormFloating",!0),a(7),m("ngForOf",t.amcs),a(6),m("ngIf",t.f.commissionAmcName.errors&&(t.f.commissionAmcName.touched||t.submitted)),a(3),m("cFormFloating",!0),a(7),m("ngIf",t.f.commissionAmount.errors&&(t.f.commissionAmount.touched||t.submitted)),a(3),m("cFormFloating",!0),a(7),m("ngIf",t.f.commissionMonth.errors&&(t.f.commissionMonth.touched||t.submitted)),a(8),m("routerLink",I(13,le)))},dependencies:[U,w,D,V,J,H,q,z,T,L,me,X,te,ie,K,ee,Q,W,oe,Y,Z,re,O,B,$,j,G,P]})}}return r})();export{Pe as UpdateCommissionEntryFormComponent};
