import './polyfills.server.mjs';
import{a as pe}from"./chunk-4NBKPKCB.mjs";import{Ja as W,ra as G}from"./chunk-7JE25W2O.mjs";import{a as he}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as Z,F as J,N as K,Na as me,Oa as de,S as Q,T as X,aa as ee,b as H,ba as te,j as Y,oa as ie,pa as ne,q as z,r as q,ra as re,ta as ae,ua as oe,wa as se,ya as le,za as ce}from"./chunk-B4NKEOAB.mjs";import{e as $}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as U,Db as P,F as L,Fb as p,Gb as c,K as y,Lc as R,Mc as j,Qb as e,Rb as u,Sa as a,Sc as O,Ta as D,Tb as F,V as _,Vb as A,Wb as M,Xb as B,Zb as N,_b as V,f as k,g as E,ia as w,lb as C,mb as S,nb as l,sa as h,ta as g,ua as v,va as I,xb as i,yb as n,zb as b}from"./chunk-S7ATBOQE.mjs";import{g as ue,h as f}from"./chunk-COT65Y5O.mjs";var m=ue(he());var ge=()=>["/tasks/add"],xe=o=>["/tasks/update",o];function Te(o,x){if(o&1){let t=P();i(0,"tr"),e(1,`
              `),i(2,"th"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12),n(),e(13,`
              `),i(14,"td"),e(15,`
                `),i(16,"a",11),v(),b(17,"svg",12),n(),e(18,`
                `),I(),i(19,"a",13),p("click",function(){let r=h(t).$implicit,T=c();return g(T.deleteAum(r.id))}),v(),b(20,"svg",14),n(),e(21,`
              `),n(),e(22,`
            `),n()}if(o&2){let t=x.$implicit,s=x.index,r=c();a(3),u((r.currentPage-1)*r.itemsPerPage+s+1),a(3),u(t.taskTitle),a(3),u(t.taskClient),a(3),u(t.taskDate),a(4),l("routerLink",U(9,xe,t.id))("cTooltip",r.tooltipEditText),a(),l("cIcon",r.icons.cilPen),a(2),l("cTooltip",r.tooltipDeleteText),a(),l("cIcon",r.icons.cilTrash)}}function fe(o,x){if(o&1){let t=P();i(0,"c-pagination",15),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",16),p("click",function(){h(t);let r=c();return g(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),i(8,"c-page-item"),e(9,`
              `),i(10,"a",17),e(11),n(),e(12,`
            `),n(),e(13,`
            `),i(14,"c-page-item"),e(15,`
              `),i(16,"a",16),p("click",function(){h(t);let r=c();return g(r.nextPage())}),e(17,"Next"),n(),e(18,`
            `),n(),e(19,`
          `),n()}if(o&2){let t=c();a(4),S("aria-disabled",t.currentPage===1),a(7),F("",t.currentPage," / ",t.totalPages,""),a(5),S("aria-disabled",!t.nextCursor)}}var Oe=(()=>{class o{constructor(t){this.taskService=t,this.icons={cilPen:G,cilTrash:W},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.tasksSubject=new E([]),this.tasksInterface=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new k,this.currentSearchTerms={},this.unsubscribe$=new k}ngOnInit(){this.loadTaskList(),this.setupSearch()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}setupSearch(){this.searchTerms.pipe(_(this.unsubscribe$),L(300),y()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadTaskList()})}search(t){let s=t.target;this.searchTerms.next(s.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadTaskList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadTaskList())}loadTaskList(){return f(this,null,function*(){this.isLoading||(this.isLoading=!0,this.taskService.listsTask(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(_(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))})}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.tasksInterface=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),m.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),m.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedTaskList(){return this.tasksInterface}deleteAum(t){return f(this,null,function*(){if((yield m.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{if((yield this.taskService.deleteTask(t.toString())).data.code===1)yield m.default.fire("Deleted!","Task has been deleted.","success"),yield this.loadTaskList();else throw new Error("Failed to delete task")}catch(r){console.error("Error deleting task:",r),yield m.default.fire("Error","An error occurred while deleting the task","error")}})}static{this.\u0275fac=function(s){return new(s||o)(D(pe))}}static{this.\u0275cmp=w({type:o,selectors:[["app-list-tasks"]],standalone:!0,features:[N],decls:54,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(s,r){s&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create Task"),n()()()()()(),i(7,"c-row"),e(8,`
    `),i(9,"c-col",0),e(10,`
      `),i(11,"c-card",1),e(12,`
        `),i(13,"c-card-body"),e(14,`
          `),i(15,"c-col",5),e(16,`
          `),i(17,"input",6),p("input",function(d){return r.search(d)}),B("ngModelChange",function(d){return M(r.searchTerm,d)||(r.searchTerm=d),d}),n(),e(18,`
          `),n(),e(19,`
          `),i(20,"table",7),e(21,`
            `),i(22,"thead"),e(23,`
            `),i(24,"tr"),e(25,`
              `),i(26,"th",8),e(27,"S.No"),n(),e(28,`
              `),i(29,"th",8),e(30,"Task Title"),n(),e(31,`
              `),i(32,"th",8),e(33,"Client"),n(),e(34,`
              `),i(35,"th",8),e(36,"Task Date"),n(),e(37,`
              `),i(38,"th",8),e(39,"Action"),n(),e(40,`  
            `),n(),e(41,`
            `),n(),e(42,`
            `),i(43,"tbody"),e(44,`
            `),C(45,Te,23,11,"tr",9),e(46,`
            `),n(),e(47,`
          `),n(),e(48,`
          `),C(49,fe,20,4,"c-pagination",10),e(50,`
        `),n(),e(51,`
      `),n(),e(52,`
    `),n(),e(53,`
`),n()),s&2&&(a(5),l("routerLink",V(7,ge)),a(12),A("ngModel",r.searchTerm),a(3),l("hover",!0)("striped",!0)("bordered",!0),a(25),l("ngForOf",r.paginatedTaskList),a(4),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[O,R,j,ne,H,$,X,Q,z,q,de,ce,re,ae,oe,me,le,se,J,K,Y,ie,te,ee,Z]})}}return o})();export{Oe as ListTasksComponent};
