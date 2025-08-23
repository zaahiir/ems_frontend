import './polyfills.server.mjs';
import{a as ie}from"./chunk-YOYBCKVQ.mjs";import{a as oe}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as J,F as G,Fa as K,H as j,Ha as P,I as q,Ia as X,J as O,Ka as Y,Ma as Z,N as T,Na as ee,O as U,Oa as te,S as R,T as B,q as L,r as W,ra as Q,ta as $,u as A,ua as H,za as z}from"./chunk-B4NKEOAB.mjs";import{b as k}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as h,Fb as S,Gb as s,Kc as D,Lc as I,Mb as _,Mc as V,Nb as b,Ob as w,Qb as e,Sa as a,Sb as y,Sc as M,Ta as x,Zb as E,ac as N,ia as g,lb as f,nb as c,sa as F,ta as C,xb as i,yb as r,zb as d}from"./chunk-S7ATBOQE.mjs";import{g as re,h as p}from"./chunk-COT65Y5O.mjs";var v=re(oe());var ne=["fileInput"],le=(n,u,t,o,l,m)=>({"text-danger":n,"text-primary":u,"text-success":t,"text-warning":o,"text-info":l,"text-secondary":m});function ae(n,u){if(n&1){let t=h();i(0,"li",27),e(1,`
                      `),i(2,"span",28),e(3,`
                        `),d(4,"i",29),e(5,`
                      `),r(),e(6,` 
                      `),i(7,"span",30),S("click",function(){let l=F(t).$implicit,m=s(2);return C(m.previewFile(l.courierFile))})("keyup.enter",function(){let l=F(t).$implicit,m=s(2);return C(m.previewFile(l.courierFile))}),e(8),r(),e(9,`
                    `),r()}if(n&2){let t=u.$implicit,o=s(2);a(4),c("ngClass",N(2,le,t.courierFile.endsWith(".pdf"),t.courierFile.endsWith(".doc")||t.courierFile.endsWith(".docx"),t.courierFile.endsWith(".xls")||t.courierFile.endsWith(".xlsx"),t.courierFile.endsWith(".csv"),t.courierFile.endsWith(".txt"),t.courierFile.endsWith(".jpg")||t.courierFile.endsWith(".jpeg"))),a(4),y(`
                        `,o.getFileName(t.courierFile),`
                      `)}}function ce(n,u){if(n&1&&(i(0,"c-row",24),e(1,`
                `),i(2,"c-col",1),e(3,`
                  `),i(4,"ul",25),e(5,`
                    `),f(6,ae,10,9,"li",26),e(7,`
                  `),r(),e(8,`
                `),r(),e(9,`
              `),r()),n&2){let t=s();a(6),c("ngForOf",t.existingFiles)}}var Ie=(()=>{class n{constructor(t,o,l){this.fb=t,this.route=o,this.courierService=l,this.loading=!1,this.submitted=!1,this.selectedFiles=[],this.existingFiles=[],this.fileErrors=[],this.courierId="",this.initForm()}ngOnInit(){return p(this,null,function*(){this.courierId=this.route.snapshot.params.id,yield this.loadCourierData(),yield this.loadCourierFiles()})}initForm(){this.courierUpdateForm=this.fb.group({courierClientName:[{value:"",disabled:!0}],courierClientAddress:[{value:"",disabled:!0}],courierMobileNumber:[{value:"",disabled:!0}],courierEmail:[{value:"",disabled:!0}],courierFile:[{value:null,disabled:!0}]})}get f(){return this.courierUpdateForm.controls}loadCourierData(){return p(this,null,function*(){try{let t=yield this.courierService.getcourierById(this.courierId).toPromise();if(t&&t.code===1&&t.data){let o=t.data;this.courierUpdateForm.patchValue({courierClientName:o.courierClientName,courierClientAddress:o.courierClientAddress,courierMobileNumber:o.courierMobileNumber,courierEmail:o.courierEmail})}else yield v.default.fire("Error","Failed to load courier data","error")}catch(t){console.error("Error loading courier data:",t),yield v.default.fire("Error","Failed to load courier data","error")}})}loadCourierFiles(){return p(this,null,function*(){try{let t=yield this.courierService.listsCourierFiles(this.courierId);t.data.code===1?this.existingFiles=t.data.data:console.error("Failed to load courier files")}catch(t){console.error("Error loading courier files:",t)}})}getFileName(t){return t.split("/").pop()||t}previewFile(t){let o=this.courierService.getFullUrl(t);window.open(o,"_blank")}static{this.\u0275fac=function(o){return new(o||n)(x(Z),x(k),x(ie))}}static{this.\u0275cmp=g({type:n,selectors:[["app-view-courier"]],viewQuery:function(o,l){if(o&1&&_(ne,5),o&2){let m;b(m=w())&&(l.fileInput=m.first)}},standalone:!0,features:[E],decls:83,vars:7,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3",3,"formGroup"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","courierClientName","required","","type","text","placeholder","Client Name"],["cLabel","","for","validationCustom01",1,"ms-2"],["cFormControl","","id","validationCustom02","formControlName","courierClientAddress","required","","type","text","placeholder","Address"],["cLabel","","for","validationCustom02",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cSelect","","id","dialcode","required",""],["value","","disabled","","selected",""],[3,"value"],["for","dialcode"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","validationCustom03","formControlName","courierMobileNumber","required","","type","text","placeholder","Mobile Number"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","courierEmail","required","","type","email","placeholder","Email"],["cLabel","","for","validationCustom04",1,"ms-2"],["cLabel","","for","validationCustom05"],["cFormControl","","id","validationCustom05","formControlName","courierFile","multiple","","type","file","accept",".pdf,.doc,.docx,.jpeg,.jpg,.xls,.xlsx,.csv,.txt"],["class","my-3",4,"ngIf"],[1,"my-3"],[1,"list-unstyled"],["class","mb-3 d-flex align-items-center",4,"ngFor","ngForOf"],[1,"mb-3","d-flex","align-items-center"],[1,"me-2"],[1,"cil-file",3,"ngClass"],["tabindex","0","role","button",2,"cursor","pointer","text-decoration","underline",3,"click","keyup.enter"]],template:function(o,l){o&1&&(i(0,"c-row"),e(1,`
    `),i(2,"c-col",1),e(3,`
      `),i(4,"c-card",2),e(5,`
        `),i(6,"c-card-header"),e(7,`
          `),i(8,"strong"),e(9,"View Courier Form"),r(),e(10,`
        `),r(),e(11,`
        `),i(12,"c-card-body"),e(13,`
          `),i(14,"form",3,0),e(16,`
            
            `),i(17,"c-col",4),e(18,`
              `),d(19,"input",5),e(20,`
              `),i(21,"label",6),e(22,"Client Name"),r(),e(23,`
            `),r(),e(24,`
  
            `),i(25,"c-col",4),e(26,`
              `),d(27,"input",7),e(28,`
              `),i(29,"label",8),e(30,"Address"),r(),e(31,`
            `),r(),e(32,`

            `),i(33,"c-col",9),e(34,`
              `),i(35,"c-input-group",10),e(36,`
                `),i(37,"c-col",11),e(38,`
                  `),i(39,"select",12),e(40,`
                    `),i(41,"option",13),e(42,"code"),r(),e(43,`
                    `),d(44,"option",14),e(45,`
                  `),r(),e(46,`
                  `),i(47,"label",15),e(48,"Country Code"),r(),e(49,`
                `),r(),e(50,`
                `),i(51,"c-col",16),e(52,`
                  `),d(53,"input",17),e(54,`
                  `),i(55,"label",18),e(56,"Mobile Number"),r(),e(57,`
                `),r(),e(58,`
              `),r(),e(59,`
            `),r(),e(60,`
  
            `),i(61,"c-col",4),e(62,`
              `),d(63,"input",19),e(64,`
              `),i(65,"label",20),e(66,"Email"),r(),e(67,`
            `),r(),e(68,`
  
            `),i(69,"c-col"),e(70,`
              `),i(71,"label",21),e(72,"Fund File"),r(),e(73,`
              `),d(74,"input",22),e(75,`
              `),f(76,ce,10,1,"c-row",23),e(77,`
            `),r(),e(78,`
          `),r(),e(79,`
        `),r(),e(80,`
      `),r(),e(81,`
    `),r(),e(82,`
  `),r()),o&2&&(a(14),c("formGroup",l.courierUpdateForm),a(3),c("cFormFloating",!0),a(8),c("cFormFloating",!0),a(12),c("cFormFloating",!0),a(14),c("cFormFloating",!0),a(10),c("cFormFloating",!0),a(15),c("ngIf",l.existingFiles.length>0))},dependencies:[V,M,D,I,B,R,L,U,A,W,te,z,P,X,Q,$,H,Y,J,K,ee,G,O,T,j,q]})}}return n})();export{Ie as ViewCourierComponent};
