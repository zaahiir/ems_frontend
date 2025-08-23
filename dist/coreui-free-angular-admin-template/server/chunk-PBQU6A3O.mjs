import './polyfills.server.mjs';
import{a as dt}from"./chunk-I62Y5RZT.mjs";import{Ja as G,ra as j}from"./chunk-7JE25W2O.mjs";import{a as ut}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as X,F as q,N as J,Na as mt,Oa as ct,S as K,T as Q,aa as Z,b as W,ba as tt,j as H,oa as et,pa as it,q as Y,r as z,ra as nt,ta as rt,ua as at,wa as ot,ya as st,za as lt}from"./chunk-B4NKEOAB.mjs";import{e as $}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as B,Db as T,F as L,Fb as u,Gb as d,K as y,Lc as U,Mc as R,Qb as t,Rb as m,Sa as a,Sc as O,Ta as A,Tb as D,V as _,Vb as N,Wb as F,Xb as k,Zb as M,_b as V,f as v,ia as I,lb as b,mb as P,nb as l,sa as h,ta as g,ua as C,va as w,xb as i,yb as n,zb as E}from"./chunk-S7ATBOQE.mjs";import{g as pt,h as x}from"./chunk-COT65Y5O.mjs";var c=pt(ut());var xt=()=>["/forms/statement/add"],ht=o=>["/forms/statement/update",o];function gt(o,S){if(o&1){let e=T();i(0,"tr"),t(1,`
              `),i(2,"td"),t(3),n(),t(4,`
              `),i(5,"td"),t(6),n(),t(7,`
              `),i(8,"td"),t(9),n(),t(10,`
              `),i(11,"td"),t(12),n(),t(13,`
              `),i(14,"td"),t(15),n(),t(16,`
              `),i(17,"td"),t(18),n(),t(19,`
              `),i(20,"td"),t(21,`
                `),i(22,"a",11),C(),E(23,"svg",12),n(),t(24,`
                `),w(),i(25,"a",13),u("click",function(){let r=h(e).$implicit,f=d();return g(f.deleteAum(r.id))}),C(),E(26,"svg",14),n(),t(27,`
              `),n(),t(28,`
            `),n()}if(o&2){let e=S.$implicit,s=S.index,r=d();a(3),m((r.currentPage-1)*r.itemsPerPage+s+1),a(3),m(e.statementDate),a(3),m(e.statementInvestorName),a(3),m(e.statementInvestorPanNo),a(3),m(e.statementAmcName),a(3),m(e.statementFundName),a(4),l("routerLink",B(11,ht,e.id))("cTooltip",r.tooltipEditText),a(),l("cIcon",r.icons.cilPen),a(2),l("cTooltip",r.tooltipDeleteText),a(),l("cIcon",r.icons.cilTrash)}}function St(o,S){if(o&1){let e=T();i(0,"c-pagination",15),t(1,`
            `),i(2,"c-page-item"),t(3,`
              `),i(4,"a",16),u("click",function(){h(e);let r=d();return g(r.previousPage())}),t(5,"Previous"),n(),t(6,`
            `),n(),t(7,`
            `),i(8,"c-page-item"),t(9,`
              `),i(10,"a",17),t(11),n(),t(12,`
            `),n(),t(13,`
            `),i(14,"c-page-item"),t(15,`
              `),i(16,"a",16),u("click",function(){h(e);let r=d();return g(r.nextPage())}),t(17,"Next"),n(),t(18,`
            `),n(),t(19,`
          `),n()}if(o&2){let e=d();a(4),P("aria-disabled",e.currentPage===1),a(7),D("",e.currentPage," / ",e.totalPages,""),a(5),P("aria-disabled",!e.nextCursor)}}var Ot=(()=>{class o{constructor(e){this.statementService=e,this.icons={cilPen:j,cilTrash:G},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.statementInterfaceList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new v,this.currentSearchTerms={},this.unsubscribe$=new v}ngOnInit(){return x(this,null,function*(){yield this.loadAumList(),this.setupSearch()})}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}setupSearch(){this.searchTerms.pipe(_(this.unsubscribe$),L(300),y()).subscribe(e=>{this.searchTerm=e,this.resetPagination(),this.loadAumList()})}search(e){let s=e.target;this.searchTerms.next(s.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadAumList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadAumList())}loadAumList(){return x(this,null,function*(){this.isLoading||(this.isLoading=!0,this.statementService.listsStatement(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(_(this.unsubscribe$)).subscribe(e=>{this.handleResponse(e)},e=>{this.handleError(e)}))})}handleResponse(e){this.isLoading=!1,e&&e.code===1&&Array.isArray(e.data)?(this.statementInterfaceList=e.data,this.totalItems=e.total_count||0,this.totalPages=e.total_pages||1,this.currentPage=e.current_page||1):(console.error("Unexpected API response structure:",e),c.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(e){this.isLoading=!1,console.error("Error loading AUM list:",e),c.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedAumList(){return this.statementInterfaceList}deleteAum(e){return x(this,null,function*(){if((yield c.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{(yield this.statementService.deleteStatement(e.toString())).data.code===1?(yield c.default.fire("Deleted!","Statement has been deleted.","success"),yield this.loadAumList()):yield c.default.fire("Error","Failed to delete Statement","error")}catch(r){console.error("Error deleting Statement:",r),yield c.default.fire("Error","An error occurred while deleting the Statement","error")}})}static{this.\u0275fac=function(s){return new(s||o)(A(dt))}}static{this.\u0275cmp=I({type:o,selectors:[["app-list-statement"]],standalone:!0,features:[M],decls:60,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(s,r){s&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),t(6,"Create New Statement Form"),n()()()()()(),i(7,"c-row"),t(8,`
    `),i(9,"c-col",0),t(10,`
      `),i(11,"c-card",1),t(12,`
        `),i(13,"c-card-body"),t(14,`
          `),i(15,"c-col",5),t(16,`
          `),i(17,"input",6),u("input",function(p){return r.search(p)}),k("ngModelChange",function(p){return F(r.searchTerm,p)||(r.searchTerm=p),p}),n(),t(18,`
          `),n(),t(19,`
          `),i(20,"table",7),t(21,`
            `),i(22,"thead"),t(23,`
            `),i(24,"tr"),t(25,`
              `),i(26,"th",8),t(27,"S.No"),n(),t(28,`
              `),i(29,"th",8),t(30,"Statement Date"),n(),t(31,`
              `),i(32,"th",8),t(33,"Investor Name"),n(),t(34,`
              `),i(35,"th",8),t(36,"Investor PAN No"),n(),t(37,`
              `),i(38,"th",8),t(39,"AMC Name"),n(),t(40,`
              `),i(41,"th",8),t(42,"Fund Name"),n(),t(43,`
              `),i(44,"th",8),t(45,"Action"),n(),t(46,`  
            `),n(),t(47,`
            `),n(),t(48,`
            `),i(49,"tbody"),t(50,`
            `),b(51,gt,29,13,"tr",9),t(52,`
            `),n(),t(53,`
          `),n(),t(54,`
          `),b(55,St,20,4,"c-pagination",10),t(56,`
        `),n(),t(57,`
      `),n(),t(58,`
    `),n(),t(59,`
`),n()),s&2&&(a(5),l("routerLink",V(7,xt)),a(12),N("ngModel",r.searchTerm),a(3),l("hover",!0)("striped",!0)("bordered",!0),a(31),l("ngForOf",r.paginatedAumList),a(4),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[O,U,R,it,W,$,Q,K,Y,z,ct,lt,nt,rt,at,mt,st,ot,q,J,H,et,tt,Z,X]})}}return o})();export{Ot as ListStatementComponent};
