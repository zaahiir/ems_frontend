import './polyfills.server.mjs';
import{a as de}from"./chunk-73YZNJRK.mjs";import{Ja as W,ra as G}from"./chunk-7JE25W2O.mjs";import{a as pe}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as X,F as q,N as J,Na as ce,Oa as me,S as K,T as Q,aa as Z,b as $,ba as ee,j as H,oa as te,pa as ie,q as Y,r as z,ra as ne,ta as re,ua as oe,wa as ae,ya as se,za as le}from"./chunk-B4NKEOAB.mjs";import{e as j}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as B,Db as b,F as T,Fb as p,Gb as d,K as L,Lc as R,Mc as U,Qb as e,Rb as c,Sa as o,Sc as O,Ta as D,Tb as F,V as I,Vb as A,Wb as k,Xb as M,Zb as N,_b as V,f as _,ia as y,lb as C,mb as E,nb as l,sa as h,ta as g,ua as S,va as w,xb as i,yb as n,zb as P}from"./chunk-S7ATBOQE.mjs";import{g as ue,h as x}from"./chunk-COT65Y5O.mjs";var m=ue(pe());var xe=()=>["/forms/issue/add"],he=a=>["/forms/issue/update",a];function ge(a,f){if(a&1){let t=b();i(0,"tr"),e(1,`
              `),i(2,"th"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12),n(),e(13,`
              `),i(14,"td"),e(15),n(),e(16,`
              `),i(17,"td"),e(18),n(),e(19,`
              `),i(20,"td"),e(21,`
                `),i(22,"a",11),S(),P(23,"svg",12),n(),e(24,`
                `),w(),i(25,"a",13),p("click",function(){let r=h(t).$implicit,v=d();return g(v.deleteIndAum(r.id))}),S(),P(26,"svg",14),n(),e(27,`
              `),n(),e(28,`
            `),n()}if(a&2){let t=f.$implicit,s=f.index,r=d();o(3),c((r.currentPage-1)*r.itemsPerPage+s+1),o(3),c(t.issueClientName),o(3),c(t.issueType),o(3),c(t.issueDate),o(3),c(t.issueResolutionDate),o(3),c(t.issueDescription),o(4),l("routerLink",B(11,he,t.id))("cTooltip",r.tooltipEditText),o(),l("cIcon",r.icons.cilPen),o(2),l("cTooltip",r.tooltipDeleteText),o(),l("cIcon",r.icons.cilTrash)}}function fe(a,f){if(a&1){let t=b();i(0,"c-pagination",15),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",16),p("click",function(){h(t);let r=d();return g(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),i(8,"c-page-item"),e(9,`
              `),i(10,"a",17),e(11),n(),e(12,`
            `),n(),e(13,`
            `),i(14,"c-page-item"),e(15,`
              `),i(16,"a",16),p("click",function(){h(t);let r=d();return g(r.nextPage())}),e(17,"Next"),n(),e(18,`
            `),n(),e(19,`
          `),n()}if(a&2){let t=d();o(4),E("aria-disabled",t.currentPage===1),o(7),F("",t.currentPage," / ",t.totalPages,""),o(5),E("aria-disabled",!t.nextCursor)}}var Oe=(()=>{class a{constructor(t){this.issueService=t,this.icons={cilPen:G,cilTrash:W},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.issueInterfaceList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new _,this.currentSearchTerms={},this.unsubscribe$=new _}ngOnInit(){return x(this,null,function*(){yield this.loadIssueList(),this.setupSearch()})}setupSearch(){this.searchTerms.pipe(I(this.unsubscribe$),T(300),L()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadIssueList()})}search(t){let s=t.target;this.searchTerms.next(s.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadIssueList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadIssueList())}loadIssueList(){return x(this,null,function*(){this.isLoading||(this.isLoading=!0,this.issueService.listsIssue(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(I(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))})}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.issueInterfaceList=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),m.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),m.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedAumList(){return this.issueInterfaceList}deleteIndAum(t){return x(this,null,function*(){if((yield m.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{(yield this.issueService.deleteIssue(t.toString())).data.code===1?(yield m.default.fire("Deleted!","Issue has been deleted.","success"),yield this.loadIssueList()):yield m.default.fire("Error","Failed to delete issue","error")}catch(r){console.error("Error deleting issue:",r),yield m.default.fire("Error","An error occurred while deleting the issue","error")}})}static{this.\u0275fac=function(s){return new(s||a)(D(de))}}static{this.\u0275cmp=y({type:a,selectors:[["app-list-issue"]],standalone:!0,features:[N],decls:60,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(s,r){s&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create New Issue Form"),n()()()()()(),i(7,"c-row"),e(8,`
    `),i(9,"c-col",0),e(10,`
      `),i(11,"c-card",1),e(12,`
        `),i(13,"c-card-body"),e(14,`
          `),i(15,"c-col",5),e(16,`
          `),i(17,"input",6),p("input",function(u){return r.search(u)}),M("ngModelChange",function(u){return k(r.searchTerm,u)||(r.searchTerm=u),u}),n(),e(18,`
          `),n(),e(19,`
          `),i(20,"table",7),e(21,`
            `),i(22,"thead"),e(23,`
            `),i(24,"tr"),e(25,`
              `),i(26,"th",8),e(27,"S.No"),n(),e(28,`
              `),i(29,"th",8),e(30,"Issue Name"),n(),e(31,`
              `),i(32,"th",8),e(33,"Issue Type"),n(),e(34,`
              `),i(35,"th",8),e(36,"Issue Date"),n(),e(37,`
              `),i(38,"th",8),e(39,"Resolution Date"),n(),e(40,`
              `),i(41,"th",8),e(42,"Description"),n(),e(43,`
              `),i(44,"th",8),e(45,"Action"),n(),e(46,`  
            `),n(),e(47,`
            `),n(),e(48,`
            `),i(49,"tbody"),e(50,`
            `),C(51,ge,29,13,"tr",9),e(52,`
            `),n(),e(53,`
          `),n(),e(54,`
          `),C(55,fe,20,4,"c-pagination",10),e(56,`
        `),n(),e(57,`
      `),n(),e(58,`
    `),n(),e(59,`
`),n()),s&2&&(o(5),l("routerLink",V(7,xe)),o(12),A("ngModel",r.searchTerm),o(3),l("hover",!0)("striped",!0)("bordered",!0),o(31),l("ngForOf",r.paginatedAumList),o(4),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[O,R,U,ie,$,j,Q,K,Y,z,me,le,ne,re,oe,ce,se,ae,q,J,H,te,ee,Z,X]})}}return a})();export{Oe as ListIssueComponent};
