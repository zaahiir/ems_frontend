import{a as ee}from"./chunk-TKJ3GRVU.js";import{a as ne}from"./chunk-AJEUVWKL.js";import{Aa as A,B as q,Ba as $,Ga as H,Ja as z,M as I,Ma as J,N as V,Na as K,Oa as Q,P as M,Pa as U,Q as R,Ra as W,Ta as X,U as G,Ua as Y,V as O,Va as Z,Z as P,_ as j,q as L,x as N,y as w,ya as B,za as c}from"./chunk-K3LN6DFK.js";import{Ga as m,Ia as o,Lb as T,Mb as _,S as x,Sa as i,Sb as E,Ta as n,Ua as p,Ya as h,Z as C,_ as v,_a as g,fc as D,jb as e,k as b,kb as S,pa as l,qa as k,sb as y}from"./chunk-WAGJM7NU.js";import{f as ie,g as f}from"./chunk-MYAK5QVS.js";var u=ie(ne());function ae(a,d){a&1&&(i(0,"c-form-feedback",26),e(1,`
              Please provide a Task Title.
            `),n()),a&2&&o("valid",!1)}function oe(a,d){if(a&1&&(i(0,"option",27),e(1),n()),a&2){let r=d.$implicit;o("value",r.id),l(),S(r.clientName)}}function re(a,d){a&1&&(i(0,"c-form-feedback",26),e(1,`
              Please select a Client.
            `),n()),a&2&&o("valid",!1)}function le(a,d){a&1&&(i(0,"c-form-feedback",26),e(1,`
              Please select a Date.
            `),n()),a&2&&o("valid",!1)}function se(a,d){a&1&&(i(0,"c-form-feedback",26),e(1,`
              Please select a Time.
            `),n()),a&2&&o("valid",!1)}function me(a,d){a&1&&(i(0,"c-form-feedback",26),e(1,`
              Please provide a Latitude.
            `),n()),a&2&&o("valid",!1)}function de(a,d){a&1&&(i(0,"c-form-feedback",26),e(1,`
              Please provide a Longitude.
            `),n()),a&2&&o("valid",!1)}function ce(a,d){a&1&&(i(0,"c-form-feedback",26),e(1,`
              Please provide a Description.
            `),n()),a&2&&o("valid",!1)}var qe=(()=>{class a{constructor(r,s,t){this.fb=r,this.router=s,this.taskService=t,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.client=[],this.taskEntryForm=this.fb.group({taskTitle:["",c.required],taskClient:["",c.required],taskDate:["",c.required],taskTime:["",c.required],taskLatitude:["",c.required],taskLongtitude:["",c.required],taskDescription:["",c.required]})}ngOnInit(){return f(this,null,function*(){yield this.loadClient()})}get f(){return this.taskEntryForm.controls}loadClient(){return f(this,null,function*(){try{let r=yield this.taskService.getClient();this.client=r.data}catch(r){console.error("Error loading clients:",r)}})}getMissingFields(){let r=[];return Object.keys(this.f).forEach(s=>{this.f[s].errors?.required&&r.push(this.getFieldDisplayName(s))}),r}getFieldDisplayName(r){return{taskTitle:"Task Title",taskClient:"Client",taskDate:"Date",taskTime:"Time",taskLatitude:"Latitude",taskLongtitude:"Longitude",taskDescription:"Description"}[r]||r}onSubmit(){return f(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.taskEntryForm.invalid){let t=this.getMissingFields();t.length>0&&(yield u.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br>${t.join("<br>")}`,icon:"error"}));return}console.log("Submit...");let r={taskTitle:this.f.taskTitle.value,taskClient:this.f.taskClient.value,taskDate:this.f.taskDate.value,taskTime:this.f.taskTime.value,taskLatitude:this.f.taskLatitude.value,taskLongtitude:this.f.taskLongtitude.value,taskDescription:this.f.taskDescription.value,hideStatus:0};console.log("taskClient value:",this.f.taskClient.value);let s="0";this.loading=!0;try{let t=yield b(this.taskService.processTask(r,"0"));t.code==1?(yield u.default.fire("Added!",t.message,"success"),this.router.navigate(["/tasks"])):yield u.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error processing task:",t),yield u.default.fire("Failed!","An error occurred while processing the task.","error")}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,console.log("Reset... 1")}static{this.\u0275fac=function(s){return new(s||a)(k(X),k(D),k(ee))}}static{this.\u0275cmp=x({type:a,selectors:[["app-create-tasks"]],standalone:!0,features:[y],decls:106,vars:17,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","taskTitle","required","","type","text","placeholder","Task Title"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","cFormControl","","id","validationCustom02","formControlName","taskClient","required",""],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","3",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","taskDate","required","","type","date","placeholder","Date"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","taskTime","required","","type","time","placeholder","Time"],["cLabel","","for","validationCustom04",1,"ms-2"],["cFormControl","","id","validationCustom05","formControlName","taskLatitude","required","","type","text","placeholder","Latitude"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","taskLongtitude","required","","type","text","placeholder","Longitude"],["cLabel","","for","validationCustom06",1,"ms-2"],[3,"cFormFloating"],["cFormControl","","id","validationCustom07","formControlName","taskDescription","rows","3","required","","placeholder","Description"],["cLabel","","for","validationCustom07",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"valid"],[3,"value"]],template:function(s,t){if(s&1){let F=h();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"Create Task"),n(),e(10,`
      `),n(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),g("ngSubmit",function(){return C(F),v(t.onSubmit())}),e(16,`
          
          `),i(17,"c-col",4),e(18,`
            `),p(19,"input",5),e(20,`
            `),i(21,"label",6),e(22,"Task Title"),n(),e(23,`
            `),m(24,ae,2,1,"c-form-feedback",7),e(25,`
          `),n(),e(26,`

          `),i(27,"c-col",4),e(28,`
            `),i(29,"select",8),e(30,`
              `),i(31,"option",9),e(32,"Select a Client"),n(),e(33,`
              `),m(34,oe,2,2,"option",10),e(35,`
            `),n(),e(36,`
            `),i(37,"label",11),e(38,"Client"),n(),e(39,`
            `),m(40,re,2,1,"c-form-feedback",7),e(41,`
          `),n(),e(42,`

          `),i(43,"c-col",12),e(44,`
            `),p(45,"input",13),e(46,`
            `),i(47,"label",14),e(48,"Date"),n(),e(49,`
            `),m(50,le,2,1,"c-form-feedback",7),e(51,`
          `),n(),e(52,`

          `),i(53,"c-col",12),e(54,`
            `),p(55,"input",15),e(56,`
            `),i(57,"label",16),e(58,"Time"),n(),e(59,`
            `),m(60,se,2,1,"c-form-feedback",7),e(61,`
          `),n(),e(62,`

          `),i(63,"c-col",12),e(64,`
            `),p(65,"input",17),e(66,`
            `),i(67,"label",18),e(68,"Latitude"),n(),e(69,`
            `),m(70,me,2,1,"c-form-feedback",7),e(71,`
          `),n(),e(72,`

          `),i(73,"c-col",12),e(74,`
            `),p(75,"input",19),e(76,`
            `),i(77,"label",20),e(78,"Longitude"),n(),e(79,`
            `),m(80,de,2,1,"c-form-feedback",7),e(81,`
          `),n(),e(82,`

          `),i(83,"c-col",21),e(84,`
            `),p(85,"textarea",22),e(86,`
            `),i(87,"label",23),e(88,"Description"),n(),e(89,`
            `),m(90,ce,2,1,"c-form-feedback",7),e(91,`
          `),n(),e(92,`

          `),i(93,"c-col",1),e(94,`
            `),i(95,"button",24),e(96,`
              Save
            `),n(),e(97,`
            `),i(98,"button",25),g("click",function(){return C(F),v(t.onReset())}),e(99,`
              Reset
            `),n(),e(100,`
          `),n(),e(101,`
        `),n(),e(102,`
      `),n(),e(103,`
    `),n(),e(104,`
  `),n(),e(105,`
`),n()}s&2&&(l(14),o("formGroup",t.taskEntryForm)("validated",t.customStylesValidated),l(3),o("cFormFloating",!0),l(7),o("ngIf",t.f.taskTitle.errors&&(t.f.taskTitle.touched||t.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngForOf",t.client),l(6),o("ngIf",t.f.taskClient.errors&&(t.f.taskClient.touched||t.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngIf",t.f.taskDate.errors&&(t.f.taskDate.touched||t.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngIf",t.f.taskTime.errors&&(t.f.taskTime.touched||t.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngIf",t.f.taskLatitude.errors&&(t.f.taskLatitude.touched||t.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngIf",t.f.taskLongtitude.errors&&(t.f.taskLongtitude.touched||t.submitted)),l(3),o("cFormFloating",!0),l(7),o("ngIf",t.f.taskDescription.errors&&(t.f.taskDescription.touched||t.submitted)))},dependencies:[_,E,T,j,P,N,O,q,w,Z,H,Q,U,B,K,A,$,W,z,J,Y,I,R,G,V,M,L]})}}return a})();export{qe as CreateTasksComponent};
