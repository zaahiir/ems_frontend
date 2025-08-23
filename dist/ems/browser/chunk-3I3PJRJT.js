import{a as ne}from"./chunk-TKJ3GRVU.js";import{a as re}from"./chunk-AJEUVWKL.js";import{Aa as H,B as P,Ba as K,Ga as J,Ja as Q,M,Ma as W,N as R,Na as X,Oa as Y,P as G,Pa as Z,Q as j,Ra as ee,Ta as te,U as O,Ua as ie,V as B,Va as ae,Z as A,_ as z,q as U,x as q,y as V,ya as $,za as c}from"./chunk-K3LN6DFK.js";import{Bb as D,Ga as m,Ia as r,Lb as E,Mb as L,S as x,Sa as a,Sb as w,Ta as n,Ua as p,Ya as S,Z as v,_ as h,_a as F,dc as I,fc as N,jb as e,k as b,kb as y,pa as l,qa as f,sb as _,y as T}from"./chunk-WAGJM7NU.js";import{f as oe,g}from"./chunk-MYAK5QVS.js";var k=oe(re());function se(o,d){o&1&&(a(0,"c-form-feedback",25),e(1,`
              Please provide a Task Title.
            `),n()),o&2&&r("valid",!1)}function le(o,d){if(o&1&&(a(0,"option",26),e(1),n()),o&2){let t=d.$implicit;r("value",t.id),l(),y(t.clientName)}}function me(o,d){o&1&&(a(0,"c-form-feedback",25),e(1,`
              Please select a Client.
            `),n()),o&2&&r("valid",!1)}function de(o,d){o&1&&(a(0,"c-form-feedback",25),e(1,`
              Please select a Date.
            `),n()),o&2&&r("valid",!1)}function ce(o,d){o&1&&(a(0,"c-form-feedback",25),e(1,`
              Please select a Time.
            `),n()),o&2&&r("valid",!1)}function pe(o,d){o&1&&(a(0,"c-form-feedback",25),e(1,`
              Please provide a Latitude.
            `),n()),o&2&&r("valid",!1)}function ue(o,d){o&1&&(a(0,"c-form-feedback",25),e(1,`
              Please provide a Longitude.
            `),n()),o&2&&r("valid",!1)}function fe(o,d){o&1&&(a(0,"c-form-feedback",25),e(1,`
              Please provide a Description.
            `),n()),o&2&&r("valid",!1)}var qe=(()=>{class o{constructor(t,s,i,u,C){this.fb=t,this.router=s,this.route=i,this.taskService=u,this.cdr=C,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.taskId="0",this.clients=[],this.initForm()}initForm(){this.taskUpdateForm=this.fb.group({taskTitle:["",c.required],taskClient:["",c.required],taskDate:["",c.required],taskTime:["",c.required],taskLatitude:["",c.required],taskLongtitude:["",c.required],taskDescription:["",c.required]})}ngOnInit(){return g(this,null,function*(){try{yield this.loadClients();let t=yield this.route.params.pipe(T(1)).toPromise();this.taskId=t?t.id:"0",yield this.loadTaskData()}catch(t){console.error("Error initializing component:",t),yield k.default.fire("Error","Failed to initialize the component. Please try again.","error")}})}get f(){return this.taskUpdateForm.controls}loadClients(){return g(this,null,function*(){try{let t=yield this.taskService.getClient();this.clients=t.data,this.cdr.detectChanges()}catch(t){throw console.error("Error loading clients:",t),t}})}loadTaskData(){return g(this,null,function*(){try{let t=yield this.taskService.getTaskById(this.taskId.toString()).toPromise();if(t&&t.code===1&&t.data){let s=t.data,i=this.clients.find(u=>u.clientName===s.taskClient)?.id;this.taskUpdateForm.patchValue({taskTitle:s.taskTitle,taskClient:i,taskDate:s.taskDate,taskTime:s.taskTime,taskLatitude:s.taskLatitude,taskLongtitude:s.taskLongtitude,taskDescription:s.taskDescription}),this.cdr.detectChanges()}}catch(t){throw console.error("Error loading TASK data:",t),t}})}getMissingFields(){let t=[];return Object.keys(this.f).forEach(s=>{this.f[s].errors?.required&&t.push(this.getFieldDisplayName(s))}),t}getFieldDisplayName(t){return{taskTitle:"Task Title",taskClient:"Client",taskDate:"Date",taskTime:"Time",taskLatitude:"Latitude",taskLongtitude:"Longitude",taskDescription:"Description"}[t]||t}onSubmit(){return g(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.taskUpdateForm.invalid){let t=this.getMissingFields();t.length>0&&(yield k.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${t.join("<br>")}`,icon:"error"}));return}console.log("Submit..."),this.loading=!0;try{let t=this.taskUpdateForm.value,s={taskTitle:t.taskTitle,taskClient:t.taskClient,taskDate:t.taskDate,taskTime:t.taskTime,taskLatitude:t.taskLatitude,taskLongtitude:t.taskLongtitude,taskDescription:t.taskDescription,hideStatus:0},i=yield b(this.taskService.processTask(s,this.taskId));i.code==1?(yield k.default.fire("Updated!",i.message,"success"),this.router.navigate(["/forms/tasks"])):yield k.default.fire("Failed!",i.message,"error")}catch(t){console.error("Error updating Tasks entry:",t),yield k.default.fire("Failed!",t instanceof Error?t.message:"An unknown error occurred","error")}finally{this.loading=!1}})}onCancel(){this.customStylesValidated=!1,console.log("Reset..."),this.taskUpdateForm.reset(),this.submitted=!1}static{this.\u0275fac=function(s){return new(s||o)(f(te),f(N),f(I),f(ne),f(D))}}static{this.\u0275cmp=x({type:o,selectors:[["app-update-tasks"]],standalone:!0,features:[_],decls:103,vars:17,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","taskTitle","required","","type","text","placeholder","Task Title"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","taskClient","required",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","3",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","taskDate","required","","type","date","placeholder","Date"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","taskTime","required","","type","time","placeholder","Time"],["cLabel","","for","validationCustom04",1,"ms-2"],["cFormControl","","id","validationCustom05","formControlName","taskLatitude","required","","type","text","placeholder","Latitude"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","taskLongtitude","required","","type","text","placeholder","Longitude"],["cLabel","","for","validationCustom06",1,"ms-2"],[3,"cFormFloating"],["cFormControl","","id","validationCustom07","formControlName","taskDescription","rows","3","required","","placeholder","Description"],["cLabel","","for","validationCustom07",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"valid"],[3,"value"]],template:function(s,i){if(s&1){let u=S();a(0,"c-row"),e(1,`
  `),a(2,"c-col",1),e(3,`
    `),a(4,"c-card",2),e(5,`
      `),a(6,"c-card-header"),e(7,`
        `),a(8,"strong"),e(9,"Update Task"),n(),e(10,`
      `),n(),e(11,`
      `),a(12,"c-card-body"),e(13,`
        `),a(14,"form",3,0),F("ngSubmit",function(){return v(u),h(i.onSubmit())}),e(16,`
          
          `),a(17,"c-col",4),e(18,`
            `),p(19,"input",5),e(20,`
            `),a(21,"label",6),e(22,"Task Title"),n(),e(23,`
            `),m(24,se,2,1,"c-form-feedback",7),e(25,`
          `),n(),e(26,`

          `),a(27,"c-col",4),e(28,`
            `),a(29,"select",8),e(30,`
              `),m(31,le,2,2,"option",9),e(32,`
            `),n(),e(33,`
            `),a(34,"label",10),e(35,"Client"),n(),e(36,`
            `),m(37,me,2,1,"c-form-feedback",7),e(38,`
          `),n(),e(39,`

          `),a(40,"c-col",11),e(41,`
            `),p(42,"input",12),e(43,`
            `),a(44,"label",13),e(45,"Date"),n(),e(46,`
            `),m(47,de,2,1,"c-form-feedback",7),e(48,`
          `),n(),e(49,`

          `),a(50,"c-col",11),e(51,`
            `),p(52,"input",14),e(53,`
            `),a(54,"label",15),e(55,"Time"),n(),e(56,`
            `),m(57,ce,2,1,"c-form-feedback",7),e(58,`
          `),n(),e(59,`

          `),a(60,"c-col",11),e(61,`
            `),p(62,"input",16),e(63,`
            `),a(64,"label",17),e(65,"Latitude"),n(),e(66,`
            `),m(67,pe,2,1,"c-form-feedback",7),e(68,`
          `),n(),e(69,`

          `),a(70,"c-col",11),e(71,`
            `),p(72,"input",18),e(73,`
            `),a(74,"label",19),e(75,"Longitude"),n(),e(76,`
            `),m(77,ue,2,1,"c-form-feedback",7),e(78,`
          `),n(),e(79,`

          `),a(80,"c-col",20),e(81,`
            `),p(82,"textarea",21),e(83,`
            `),a(84,"label",22),e(85,"Description"),n(),e(86,`
            `),m(87,fe,2,1,"c-form-feedback",7),e(88,`
          `),n(),e(89,`

          `),a(90,"c-col",1),e(91,`
            `),a(92,"button",23),e(93,`
              Update
            `),n(),e(94,`
            `),a(95,"button",24),F("click",function(){return v(u),h(i.onCancel())}),e(96,`
              Cancel
            `),n(),e(97,`
          `),n(),e(98,`
        `),n(),e(99,`
      `),n(),e(100,`
    `),n(),e(101,`
  `),n(),e(102,`
`),n()}s&2&&(l(14),r("formGroup",i.taskUpdateForm)("validated",i.customStylesValidated),l(3),r("cFormFloating",!0),l(7),r("ngIf",i.f.taskTitle.errors&&(i.f.taskTitle.touched||i.submitted)),l(3),r("cFormFloating",!0),l(4),r("ngForOf",i.clients),l(6),r("ngIf",i.f.taskClient.errors&&(i.f.taskClient.touched||i.submitted)),l(3),r("cFormFloating",!0),l(7),r("ngIf",i.f.taskDate.errors&&(i.f.taskDate.touched||i.submitted)),l(3),r("cFormFloating",!0),l(7),r("ngIf",i.f.taskTime.errors&&(i.f.taskTime.touched||i.submitted)),l(3),r("cFormFloating",!0),l(7),r("ngIf",i.f.taskLatitude.errors&&(i.f.taskLatitude.touched||i.submitted)),l(3),r("cFormFloating",!0),l(7),r("ngIf",i.f.taskLongtitude.errors&&(i.f.taskLongtitude.touched||i.submitted)),l(3),r("cFormFloating",!0),l(7),r("ngIf",i.f.taskDescription.errors&&(i.f.taskDescription.touched||i.submitted)))},dependencies:[w,E,L,z,A,q,P,B,V,ae,J,Y,Z,$,X,H,K,ee,Q,W,ie,M,j,O,R,G,U]})}}return o})();export{qe as UpdateTasksComponent};
