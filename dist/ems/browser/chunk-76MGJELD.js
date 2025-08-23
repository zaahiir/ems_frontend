import{a as se}from"./chunk-3LZCO7FD.js";import{a as le}from"./chunk-AJEUVWKL.js";import{Aa as K,B as L,Ba as H,Ga as J,Ha as Q,Ja as W,M as B,Ma as X,N as q,Na as Z,Oa as ee,P as O,Pa as te,Q as R,Qa as ie,Ra as ae,Ta as ne,U as P,Ua as oe,V as z,Va as re,Z as G,_ as j,q as V,ta as $,x as k,y as T,ya as Y,za as g}from"./chunk-K3LN6DFK.js";import{Bb as I,Ga as c,Ia as s,Lb as E,Mb as w,S,Sa as o,Sb as D,Ta as r,Ua as f,Ya as x,Z as N,_ as C,_a as y,c as b,dc as U,fc as M,jb as e,kb as A,lb as F,pa as d,qa as h,sb as _}from"./chunk-WAGJM7NU.js";import{f as de,g as p}from"./chunk-MYAK5QVS.js";var u=de(le());function me(a,m){a&1&&f(0,"c-spinner",23)}function ce(a,m){if(a&1&&(o(0,"option",24),e(1),r()),a&2){let t=m.$implicit;s("value",t.id),d(),A(t.amcName)}}function ue(a,m){a&1&&(o(0,"c-form-feedback",25),e(1,`
            Please select an AMC.
          `),r()),a&2&&s("valid",!1)}function pe(a,m){if(a&1&&(o(0,"option",24),e(1),r()),a&2){let t=m.$implicit;s("value",t.id),d(),A(t.fundName)}}function fe(a,m){a&1&&(o(0,"c-form-feedback",25),e(1,`
            Please select a Fund Name for the chosen AMC.
          `),r()),a&2&&s("valid",!1)}function ve(a,m){a&1&&(o(0,"c-form-feedback",26),e(1,`
            `),f(2,"i",27),e(3,` Fund selection is required when AMC is selected.
          `),r()),a&2&&s("valid",!1)}function he(a,m){a&1&&(o(0,"c-form-feedback",28),e(1,`
            `),f(2,"i",29),e(3,` No funds available for the selected AMC.
          `),r()),a&2&&s("valid",!1)}function ge(a,m){a&1&&f(0,"c-spinner",30)}function Fe(a,m){a&1&&(o(0,"c-form-feedback",25),e(1,`
            Please provide a valid Nav.
          `),r()),a&2&&s("valid",!1)}function Ne(a,m){a&1&&(o(0,"c-form-feedback",25),e(1,`
            Please select a date.
          `),r()),a&2&&s("valid",!1)}function Ce(a,m){a&1&&f(0,"c-spinner",31)}var Oe=(()=>{class a{constructor(t,n,i,v,l){this.fb=t,this.router=n,this.route=i,this.navService=v,this.cdr=l,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.navId="0",this.amcs=[],this.funds=[],this.loadingFunds=!1,this.isEditMode=!1,this.loadingNavData=!1,this.previousAmcId="",this.destroy$=new b,this.navUpdateForm=this.fb.group({navAmcName:["",g.required],navFundName:[{value:"",disabled:!0},g.required],nav:["",[g.required,g.min(0)]],navDate:["",g.required]})}ngOnInit(){return p(this,null,function*(){try{yield this.loadAmcs(),this.route.params.subscribe(t=>p(this,null,function*(){this.navId=t.id||"0",this.isEditMode=this.navId!=="0",console.log("Route params:",t),console.log("Nav ID:",this.navId),console.log("Edit mode:",this.isEditMode),this.isEditMode?yield this.loadNavUpdateData():this.setupAmcChangeListener()}))}catch(t){console.error("Error during initialization:",t),yield u.default.fire("Error","Failed to initialize the form","error")}})}setupAmcChangeListener(){this.navUpdateForm.get("navAmcName")?.valueChanges.subscribe(t=>p(this,null,function*(){if(console.log("AMC changed to:",t),t){if(this.isEditMode&&this.previousAmcId&&this.previousAmcId!==t&&!(yield this.showAmcChangeNotification())){this.navUpdateForm.get("navAmcName")?.setValue(this.previousAmcId,{emitEvent:!1});return}this.navUpdateForm.get("navFundName")?.setValue(""),this.updateFundOptions(Number(t)),this.previousAmcId=t}else this.funds=[],this.navUpdateForm.get("navFundName")?.disable(),this.navUpdateForm.get("navFundName")?.setValue(""),this.previousAmcId=""}))}showAmcChangeNotification(){return p(this,null,function*(){return this.isEditMode?(yield u.default.fire({title:"AMC Changed",text:"You have changed the AMC. Please select the appropriate fund for this AMC.",icon:"info",confirmButtonText:"OK, I will select a fund",showCancelButton:!0,cancelButtonText:"Cancel change",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33"})).isConfirmed:!0})}get f(){return this.navUpdateForm.controls}loadNavUpdateData(){return p(this,null,function*(){if(this.navId!=="0"){this.loadingNavData=!0;try{console.log("Loading NAV data for ID:",this.navId);let t=yield this.navService.getNavUpdateData(this.navId);if(console.log("Full API response:",t),t&&t.data){let n;if(t.data.code===1&&t.data.data)n=t.data.data;else if(t.data.navId)n=t.data;else throw new Error("Invalid response structure");if(console.log("Extracted NAV data:",n),!n.amcId||!n.fundId)throw new Error("Missing required AMC or Fund ID in response");this.previousAmcId=n.amcId.toString(),console.log("Loading funds for AMC ID:",n.amcId),this.loadingFunds=!0;try{this.funds=yield this.navService.getFundsByAmc(n.amcId.toString()),console.log("Loaded funds:",this.funds),this.navUpdateForm.get("navFundName")?.enable(),this.navUpdateForm.patchValue({navAmcName:n.amcId.toString(),navFundName:n.fundId.toString(),nav:n.nav,navDate:n.navDate}),console.log("Form values after patch:",this.navUpdateForm.value),console.log("Form controls status:",{navAmcName:this.navUpdateForm.get("navAmcName")?.value,navFundName:this.navUpdateForm.get("navFundName")?.value,nav:this.navUpdateForm.get("nav")?.value,navDate:this.navUpdateForm.get("navDate")?.value}),this.setupAmcChangeListener()}catch(i){console.error("Error loading funds:",i),yield u.default.fire("Error","Failed to load funds for the selected AMC","error")}finally{this.loadingFunds=!1}this.cdr.detectChanges()}else throw new Error("Invalid API response")}catch(t){console.error("Error loading NAV update data:",t),yield u.default.fire("Error","Failed to load NAV data","error")}finally{this.loadingNavData=!1}}})}updateFundOptions(t){return p(this,null,function*(){this.loadingFunds=!0;try{console.log("Updating fund options for AMC ID:",t),this.funds=yield this.navService.getFundsByAmc(t.toString()),console.log("Loaded funds:",this.funds),this.navUpdateForm.get("navFundName")?.enable(),!this.isEditMode&&this.funds.length>0&&this.navUpdateForm.get("navFundName")?.setValue(this.funds[0].id.toString())}catch(n){console.error("Error fetching funds:",n),yield u.default.fire("Error","An error occurred while fetching funds","error")}finally{this.loadingFunds=!1,this.cdr.detectChanges()}})}loadAmcs(){return p(this,null,function*(){try{let t=yield this.navService.getAmc();t&&t.data?Array.isArray(t.data)?this.amcs=t.data:t.data.results&&Array.isArray(t.data.results)?this.amcs=t.data.results:t.data.data&&Array.isArray(t.data.data)?this.amcs=t.data.data:(console.error("AMC data is not an array:",t.data),this.amcs=[]):this.amcs=[],console.log("AMCs loaded:",this.amcs)}catch(t){throw console.error("Error loading AMCs:",t),this.amcs=[],t}})}onSubmit(){return p(this,null,function*(){this.customStylesValidated=!0,this.submitted=!0;let t=this.navUpdateForm.get("navAmcName")?.value,n=this.navUpdateForm.get("navFundName")?.value;if(t&&!n){yield u.default.fire({title:"Fund Selection Required",text:"Please select a fund for the chosen AMC.",icon:"warning",confirmButtonText:"OK",confirmButtonColor:"#3085d6"});return}if(this.navUpdateForm.invalid){let l=this.getMissingFields();l.length>0&&(yield u.default.fire({title:"Missing Required Fields",html:`Please fill in the following required fields:<br><br>${l.join("<br>")}`,icon:"error",confirmButtonColor:"#d33"}));return}let i=this.navUpdateForm.getRawValue(),v={navDate:i.navDate,nav:i.nav,navFundName:i.navFundName,navAmcName:i.navAmcName};this.loading=!0;try{let l=yield this.navService.updateNav(v,this.navId).toPromise();l&&l.data&&l.data.code===1?(yield u.default.fire("Updated!",l.data.message,"success"),this.router.navigate(["/forms/nav"])):yield u.default.fire("Failed!",l?.data?.message||"Unknown error occurred","error")}catch(l){console.error("Error updating NAV:",l),yield u.default.fire("Failed!","An error occurred while updating the NAV entry.","error")}finally{this.loading=!1}})}getMissingFields(){let t=[],n=this.navUpdateForm.controls;return n.navAmcName.invalid&&t.push("AMC Name"),n.navFundName.invalid&&t.push("Fund Name"),n.nav.invalid&&t.push("NAV"),n.navDate.invalid&&t.push("NAV Date"),t}checkFundSelection(){let t=this.navUpdateForm.get("navAmcName")?.value,n=this.navUpdateForm.get("navFundName")?.value;return!(t&&!n&&this.funds.length>0)}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/forms/nav"])}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static{this.\u0275fac=function(n){return new(n||a)(h(ne),h(M),h(U),h(se),h(I))}}static{this.\u0275cmp=S({type:a,selectors:[["app-update-nav"]],standalone:!0,features:[_],decls:100,vars:22,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["color","primary","size","sm","class","ms-2",4,"ngIf"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","validationCustom01","formControlName","navAmcName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","navFundName","required",""],["cLabel","","for","validationCustom02",1,"ms-2"],["class","text-warning",3,"valid",4,"ngIf"],["class","text-info",3,"valid",4,"ngIf"],["color","primary","size","sm","class","position-absolute","style","right: 30px; top: 50%; transform: translateY(-50%);",4,"ngIf"],["cFormControl","","id","validationCustom03","formControlName","nav","required","","type","number","step","0.0001","min","0","placeholder","Nav"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","navDate","required","","type","date","placeholder","Date"],["cLabel","","for","validationCustom04",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1",3,"disabled"],["color","light","size","sm","class","ms-2",4,"ngIf"],["cButton","","color","secondary",3,"click","disabled"],["color","primary","size","sm",1,"ms-2"],[3,"value"],[3,"valid"],[1,"text-warning",3,"valid"],[1,"fas","fa-exclamation-triangle"],[1,"text-info",3,"valid"],[1,"fas","fa-info-circle"],["color","primary","size","sm",1,"position-absolute",2,"right","30px","top","50%","transform","translateY(-50%)"],["color","light","size","sm",1,"ms-2"]],template:function(n,i){if(n&1){let v=x();o(0,"c-row"),e(1,`
  `),o(2,"c-col",1),e(3,`
    `),o(4,"c-card",2),e(5,`
      `),o(6,"c-card-header"),e(7,`
        `),o(8,"strong"),e(9),r(),e(10,`
        `),c(11,me,1,0,"c-spinner",3),e(12,`
      `),r(),e(13,`
      `),o(14,"c-card-body"),e(15,`
        `),o(16,"form",4,0),y("ngSubmit",function(){return N(v),C(i.onSubmit())}),e(18,`

        `),e(19,`
        `),o(20,"c-col",5),e(21,`
          `),o(22,"select",6),e(23,`
            `),o(24,"option",7),e(25,"Select an AMC"),r(),e(26,`
            `),c(27,ce,2,2,"option",8),e(28,`
          `),r(),e(29,`
          `),o(30,"label",9),e(31,"AMC Name"),r(),e(32,`
          `),c(33,ue,2,1,"c-form-feedback",10),e(34,`
        `),r(),e(35,`

        `),e(36,`
        `),o(37,"c-col",5),e(38,`
          `),o(39,"select",11),e(40,`
            `),o(41,"option",7),e(42),r(),e(43,`
            `),c(44,pe,2,2,"option",8),e(45,`
          `),r(),e(46,`
          `),o(47,"label",12),e(48,"Fund Name"),r(),e(49,`

          `),e(50,`
          `),c(51,fe,2,1,"c-form-feedback",10),e(52,`

          `),e(53,`
          `),c(54,ve,4,1,"c-form-feedback",13),e(55,`

          `),e(56,`
          `),c(57,he,4,1,"c-form-feedback",14),e(58,`

          `),c(59,ge,1,0,"c-spinner",15),e(60,`
        `),r(),e(61,`

        `),e(62,`
        `),o(63,"c-col",5),e(64,`
          `),f(65,"input",16),e(66,`
          `),o(67,"label",17),e(68,"Nav"),r(),e(69,`
          `),c(70,Fe,2,1,"c-form-feedback",10),e(71,`
        `),r(),e(72,`

        `),e(73,`
        `),o(74,"c-col",5),e(75,`
          `),f(76,"input",18),e(77,`
          `),o(78,"label",19),e(79,"Date"),r(),e(80,`
          `),c(81,Ne,2,1,"c-form-feedback",10),e(82,`
        `),r(),e(83,`

        `),e(84,`
        `),o(85,"c-col",1),e(86,`
          `),o(87,"button",20),e(88),c(89,Ce,1,0,"c-spinner",21),e(90,`
          `),r(),e(91,`
          `),o(92,"button",22),y("click",function(){return N(v),C(i.onCancel())}),e(93,`
            Cancel
          `),r(),e(94,`
        `),r(),e(95,`

        `),r(),e(96,`
      `),r(),e(97,`
    `),r(),e(98,`
  `),r(),e(99,`
`),r()}n&2&&(d(9),F("",i.isEditMode?"Update":"Create"," Nav Form"),d(2),s("ngIf",i.loadingNavData),d(5),s("formGroup",i.navUpdateForm)("validated",i.customStylesValidated),d(4),s("cFormFloating",!0),d(7),s("ngForOf",i.amcs),d(6),s("ngIf",i.f.navAmcName.errors&&(i.f.navAmcName.touched||i.submitted)),d(4),s("cFormFloating",!0),d(5),F(`
              `,i.loadingFunds?"Loading funds...":i.funds.length===0?"Select AMC first":"Select a Fund Name",`
            `),d(2),s("ngForOf",i.funds),d(7),s("ngIf",i.f.navFundName.errors&&(i.f.navFundName.touched||i.submitted)),d(3),s("ngIf",i.f.navAmcName.value&&!i.f.navFundName.value&&i.funds.length>0&&(i.f.navFundName.touched||i.submitted)),d(3),s("ngIf",i.f.navAmcName.value&&i.funds.length===0&&!i.loadingFunds),d(2),s("ngIf",i.loadingFunds),d(4),s("cFormFloating",!0),d(7),s("ngIf",i.f.nav.errors&&(i.f.nav.touched||i.submitted)),d(4),s("cFormFloating",!0),d(7),s("ngIf",i.f.navDate.errors&&(i.f.navDate.touched||i.submitted)),d(6),s("disabled",i.loading||i.loadingFunds||i.loadingNavData),d(),F(`
            `,i.isEditMode?"Update":"Create",`
            `),d(),s("ngIf",i.loading),d(3),s("disabled",i.loading||i.loadingNavData))},dependencies:[D,E,w,j,G,k,L,z,T,re,J,ee,te,Y,Q,Z,K,H,ae,ie,W,X,oe,B,R,P,q,O,V,$]})}}return a})();export{Oe as UpdateNavComponent};
