import './polyfills.server.mjs';
import{a as ce}from"./chunk-UQ4ZCVJL.mjs";import{Ja as W,ra as G}from"./chunk-7JE25W2O.mjs";import{a as de}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as Q,F as z,N as q,Na as se,Oa as le,S as J,T as K,aa as U,b as j,ba as X,j as H,oa as Z,pa as ee,q as Y,r as $,ra as te,ta as ie,ua as ne,wa as re,ya as ae,za as oe}from"./chunk-B4NKEOAB.mjs";import{e as O}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as S,Db as C,Fb as g,Gb as m,Kc as k,Lc as R,Mc as V,Qb as e,Rb as d,Sa as o,Sc as B,Ta as y,Vb as M,Wb as F,Xb as N,Zb as D,_b as I,ia as b,lb as _,mb as v,nb as l,sa as x,ta as f,ua as P,va as A,xb as i,yb as n,zb as w}from"./chunk-S7ATBOQE.mjs";import{a as E,b as T,g as me,h as L}from"./chunk-COT65Y5O.mjs";var p=me(de());var pe=()=>["/forms/arn/add"],ge=s=>["/forms/arn/update",s],ue=s=>({active:s});function he(s,u){if(s&1){let t=C();i(0,"tr"),e(1,`
              `),i(2,"td"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12),n(),e(13,`
              `),i(14,"td"),e(15),n(),e(16,`
              `),i(17,"td"),e(18,`
                `),i(19,"a",11),P(),w(20,"svg",12),n(),e(21,`
                `),A(),i(22,"a",13),g("click",function(){let r=x(t).$implicit,c=m();return f(c.deleteArn(r.id))}),P(),w(23,"svg",14),n(),e(24,`
              `),n(),e(25,`
            `),n()}if(s&2){let t=u.$implicit,a=u.index,r=m();o(3),d((r.currentPage-1)*r.itemsPerPage+a+1),o(3),d(t.arnNumber),o(3),d(t.arnName),o(3),d(t.fullMobile),o(3),d(t.arnAddress),o(4),l("routerLink",S(10,ge,t.id))("cTooltip",r.tooltipEditText),o(),l("cIcon",r.icons.cilPen),o(2),l("cTooltip",r.tooltipDeleteText),o(),l("cIcon",r.icons.cilTrash)}}function xe(s,u){if(s&1){let t=C();i(0,"c-page-item"),e(1,`
              `),i(2,"a",17),g("click",function(){let r=x(t).$implicit,c=m(2);return f(c.changePage(r))}),e(3),n(),e(4,`
            `),n()}if(s&2){let t=u.$implicit,a=m(2);o(2),l("ngClass",S(2,ue,a.currentPage===t)),o(),d(t)}}function fe(s,u){if(s&1){let t=C();i(0,"c-pagination",15),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",16),g("click",function(){x(t);let r=m();return f(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),_(8,xe,5,4,"c-page-item",9),e(9,`
            `),i(10,"c-page-item"),e(11,`
              `),i(12,"a",16),g("click",function(){x(t);let r=m();return f(r.nextPage())}),e(13,"Next"),n(),e(14,`
            `),n(),e(15,`
          `),n()}if(s&2){let t=m();o(4),v("aria-disabled",t.currentPage===1),o(4),l("ngForOf",t.pageRange),o(4),v("aria-disabled",t.currentPage===t.totalPages)}}var Ve=(()=>{class s{constructor(t){this.arnMasterFormService=t,this.icons={cilPen:G,cilTrash:W},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.arnList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.isLoading=!1,this.searchTerm=""}ngOnInit(){this.loadArnList()}updatePageRange(){let t=this.totalPages,a=Math.max(1,this.currentPage-1);Math.min(t,a+2)===t&&(a=Math.max(1,t-2)),this.pageRange=Array.from({length:Math.min(3,t)},(c,h)=>a+h)}changePage(t){t>=1&&t<=this.totalPages&&!this.isLoading&&(this.currentPage=t,this.updatePageRange())}nextPage(){this.currentPage<this.totalPages&&!this.isLoading&&this.changePage(this.currentPage+1)}previousPage(){this.currentPage>1&&!this.isLoading&&this.changePage(this.currentPage-1)}loadArnList(){return L(this,null,function*(){if(!this.isLoading){this.isLoading=!0;try{let t=yield this.arnMasterFormService.listsArn("0");t.data.code===1?(this.arnList=t.data.data.map(a=>T(E({},a),{fullMobile:a.full_mobile})),this.updatePageRange()):yield p.default.fire("Error","Failed to load ARN list","error")}catch(t){console.error("Error loading ARN list:",t),yield p.default.fire("Error","An error occurred while loading the ARN list","error")}finally{this.isLoading=!1}}})}search(){this.currentPage=1,this.updatePageRange()}get paginatedArnList(){let t=this.arnList;this.searchTerm&&(t=this.arnList.filter(r=>r.arnNumber.toLowerCase().includes(this.searchTerm.toLowerCase())||r.arnName.toLowerCase().includes(this.searchTerm.toLowerCase())||r.fullMobile.toLowerCase().includes(this.searchTerm.toLowerCase())));let a=(this.currentPage-1)*this.itemsPerPage;return t.slice(a,a+this.itemsPerPage)}get totalPages(){let t=this.searchTerm?this.arnList.filter(a=>a.arnNumber.toLowerCase().includes(this.searchTerm.toLowerCase())||a.arnName.toLowerCase().includes(this.searchTerm.toLowerCase())||a.arnMobile.toLowerCase().includes(this.searchTerm.toLowerCase())).length:this.arnList.length;return Math.ceil(t/this.itemsPerPage)}deleteArn(t){return L(this,null,function*(){if(this.isLoading)return;if((yield p.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed){this.isLoading=!0;try{(yield this.arnMasterFormService.deleteArn(t.toString())).data.code===1?(this.arnList=this.arnList.filter(c=>c.id!==t),yield p.default.fire("Deleted!","ARN has been deleted.","success"),yield this.loadArnList()):yield p.default.fire("Error","Failed to delete ARN","error")}catch(r){console.error("Error deleting ARN:",r),yield p.default.fire("Error","An error occurred while deleting the ARN","error")}finally{this.isLoading=!1}}})}static{this.\u0275fac=function(a){return new(a||s)(y(ce))}}static{this.\u0275cmp=b({type:s,selectors:[["app-list-arn-master-form"]],standalone:!0,features:[D],decls:57,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink","",3,"click","ngClass"]],template:function(a,r){a&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create New ARN Entry"),n()()()()()(),i(7,"c-row"),e(8,`
    `),i(9,"c-col",0),e(10,`
      `),i(11,"c-card",1),e(12,`
        `),i(13,"c-card-body"),e(14,`
          `),i(15,"c-col",5),e(16,`
          `),i(17,"input",6),g("input",function(){return r.search()}),N("ngModelChange",function(h){return F(r.searchTerm,h)||(r.searchTerm=h),h}),n(),e(18,`
          `),n(),e(19,`
          `),i(20,"table",7),e(21,`
            `),i(22,"thead"),e(23,`
            `),i(24,"tr"),e(25,`
              `),i(26,"th",8),e(27,"S.No"),n(),e(28,`
              `),i(29,"th",8),e(30,"ARN"),n(),e(31,`
              `),i(32,"th",8),e(33,"Name"),n(),e(34,`
              `),i(35,"th",8),e(36,"Mobile Number"),n(),e(37,`
              `),i(38,"th",8),e(39,"Address"),n(),e(40,`
              `),i(41,"th",8),e(42,"Action"),n(),e(43,`  
            `),n(),e(44,`
            `),n(),e(45,`
            `),i(46,"tbody"),e(47,`
            `),_(48,he,26,12,"tr",9),e(49,`
            `),n(),e(50,`
          `),n(),e(51,`
          `),_(52,fe,16,3,"c-pagination",10),e(53,`
        `),n(),e(54,`
      `),n(),e(55,`
    `),n(),e(56,`
`),n()),a&2&&(o(5),l("routerLink",I(7,pe)),o(12),M("ngModel",r.searchTerm),o(3),l("hover",!0)("striped",!0)("bordered",!0),o(28),l("ngForOf",r.paginatedArnList),o(4),l("ngIf",r.arnList.length>r.itemsPerPage))},dependencies:[k,B,R,V,ee,j,O,K,J,Y,$,le,oe,te,ie,ne,se,ae,re,z,q,H,Z,X,U,Q]})}}return s})();export{Ve as ListArnMasterFormComponent};
