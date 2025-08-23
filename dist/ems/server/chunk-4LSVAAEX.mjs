import './polyfills.server.mjs';
import{a as dt}from"./chunk-HYEXKEQI.mjs";import{Ja as G,ra as j}from"./chunk-7JE25W2O.mjs";import{a as pt}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as X,F as q,N as J,Na as ct,Oa as mt,S as K,T as Q,aa as Z,b as W,ba as tt,j as H,oa as et,pa as it,q as Y,r as z,ra as nt,ta as rt,ua as ot,wa as at,ya as st,za as lt}from"./chunk-B4NKEOAB.mjs";import{e as $}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as V,Db as I,F as b,Fb as p,Gb as c,K as P,Lc as B,Mc as R,Qb as t,Rb as m,Sa as o,Sc as O,Ta as w,Tb as D,V as _,Vb as M,Wb as F,Xb as k,Zb as N,_b as U,f as E,ia as T,lb as A,mb as S,nb as l,sa as h,ta as x,ua as v,va as L,xb as i,yb as n,zb as C}from"./chunk-S7ATBOQE.mjs";import{g as ut,h as f}from"./chunk-COT65Y5O.mjs";var d=ut(pt());var ht=()=>["/forms/industryAum/add"],xt=a=>["/forms/industryAum/update",a];function gt(a,g){if(a&1){let e=I();i(0,"tr"),t(1,`
              `),i(2,"th"),t(3),n(),t(4,`
              `),i(5,"td"),t(6),n(),t(7,`
              `),i(8,"td"),t(9),n(),t(10,`
              `),i(11,"td"),t(12),n(),t(13,`
              `),i(14,"td"),t(15),n(),t(16,`
              `),i(17,"td"),t(18,`
                `),i(19,"a",11),v(),C(20,"svg",12),n(),t(21,`
                `),L(),i(22,"a",13),p("click",function(){let r=h(e).$implicit,y=c();return x(y.deleteIndAum(r.id))}),v(),C(23,"svg",14),n(),t(24,`
              `),n(),t(25,`
            `),n()}if(a&2){let e=g.$implicit,s=g.index,r=c();o(3),m((r.currentPage-1)*r.itemsPerPage+s+1),o(3),m(e.industryName),o(3),m(e.industryAumAmount),o(3),m(e.industryAumMode),o(3),m(e.industryAumDate),o(4),l("routerLink",V(10,xt,e.id))("cTooltip",r.tooltipEditText),o(),l("cIcon",r.icons.cilPen),o(2),l("cTooltip",r.tooltipDeleteText),o(),l("cIcon",r.icons.cilTrash)}}function yt(a,g){if(a&1){let e=I();i(0,"c-pagination",15),t(1,`
            `),i(2,"c-page-item"),t(3,`
              `),i(4,"a",16),p("click",function(){h(e);let r=c();return x(r.previousPage())}),t(5,"Previous"),n(),t(6,`
            `),n(),t(7,`
            `),i(8,"c-page-item"),t(9,`
              `),i(10,"a",17),t(11),n(),t(12,`
            `),n(),t(13,`
            `),i(14,"c-page-item"),t(15,`
              `),i(16,"a",16),p("click",function(){h(e);let r=c();return x(r.nextPage())}),t(17,"Next"),n(),t(18,`
            `),n(),t(19,`
          `),n()}if(a&2){let e=c();o(4),S("aria-disabled",e.currentPage===1),o(7),D("",e.currentPage," / ",e.totalPages,""),o(5),S("aria-disabled",!e.nextCursor)}}var Ot=(()=>{class a{constructor(e){this.industryAumEntryService=e,this.icons={cilPen:j,cilTrash:G},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.industryAumInterfaceList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new E,this.currentSearchTerms={},this.unsubscribe$=new E}ngOnInit(){this.loadIndustryAumList(),this.setupSearch()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}setupSearch(){this.searchTerms.pipe(_(this.unsubscribe$),b(300),P()).subscribe(e=>{this.searchTerm=e,this.resetPagination(),this.loadIndustryAumList()})}search(e){let s=e.target;this.searchTerms.next(s.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadIndustryAumList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadIndustryAumList())}loadIndustryAumList(){return f(this,null,function*(){this.isLoading||(this.isLoading=!0,this.industryAumEntryService.listsIndustryAumEntry(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(_(this.unsubscribe$)).subscribe(e=>{this.handleResponse(e)},e=>{this.handleError(e)}))})}handleResponse(e){this.isLoading=!1,e&&e.code===1&&Array.isArray(e.data)?(this.industryAumInterfaceList=e.data,this.totalItems=e.total_count||0,this.totalPages=e.total_pages||1,this.currentPage=e.current_page||1):(console.error("Unexpected API response structure:",e),d.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(e){this.isLoading=!1,console.error("Error loading AUM list:",e),d.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedAumList(){return this.industryAumInterfaceList}deleteIndAum(e){return f(this,null,function*(){if((yield d.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{if((yield this.industryAumEntryService.deleteIndustryAumEntry(e.toString())).data.code===1)yield d.default.fire("Deleted!","AUM has been deleted.","success"),yield this.loadIndustryAumList();else throw new Error("Failed to delete AUM")}catch(r){console.error("Error deleting AUM:",r),yield d.default.fire("Error","An error occurred while deleting the AUM","error")}})}static{this.\u0275fac=function(s){return new(s||a)(w(dt))}}static{this.\u0275cmp=T({type:a,selectors:[["app-list-industry-aum-entry"]],standalone:!0,features:[N],decls:57,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(s,r){s&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),t(6,"Create New Entry Form Industry AUM"),n()()()()()(),i(7,"c-row"),t(8,`
    `),i(9,"c-col",0),t(10,`
      `),i(11,"c-card",1),t(12,`
        `),i(13,"c-card-body"),t(14,`
          `),i(15,"c-col",5),t(16,`
          `),i(17,"input",6),p("input",function(u){return r.search(u)}),k("ngModelChange",function(u){return F(r.searchTerm,u)||(r.searchTerm=u),u}),n(),t(18,`
          `),n(),t(19,`
          `),i(20,"table",7),t(21,`
            `),i(22,"thead"),t(23,`
            `),i(24,"tr"),t(25,`
              `),i(26,"th",8),t(27,"S.No"),n(),t(28,`
              `),i(29,"th",8),t(30,"Industry Name"),n(),t(31,`
              `),i(32,"th",8),t(33,"AUM"),n(),t(34,`
              `),i(35,"th",8),t(36,"Mode"),n(),t(37,`
              `),i(38,"th",8),t(39,"Date"),n(),t(40,`
              `),i(41,"th",8),t(42,"Action"),n(),t(43,`  
            `),n(),t(44,`
            `),n(),t(45,`
            `),i(46,"tbody"),t(47,`
            `),A(48,gt,26,12,"tr",9),t(49,`
            `),n(),t(50,`
          `),n(),t(51,`
          `),A(52,yt,20,4,"c-pagination",10),t(53,`
        `),n(),t(54,`
      `),n(),t(55,`
    `),n(),t(56,`
`),n()),s&2&&(o(5),l("routerLink",U(7,ht)),o(12),M("ngModel",r.searchTerm),o(3),l("hover",!0)("striped",!0)("bordered",!0),o(28),l("ngForOf",r.paginatedAumList),o(4),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[O,B,R,it,W,$,Q,K,Y,z,mt,lt,nt,rt,ot,ct,st,at,q,J,H,et,tt,Z,X]})}}return a})();export{Ot as ListIndustryAumEntryComponent};
