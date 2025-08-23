import './polyfills.server.mjs';
import{a as dt}from"./chunk-Z2ZYHXKQ.mjs";import{Ja as $,ra as R}from"./chunk-7JE25W2O.mjs";import{a as pt}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as X,F as q,N as J,Na as ct,Oa as mt,S as K,T as Q,aa as Z,b as j,ba as tt,j as W,oa as et,pa as it,q as H,r as z,ra as nt,ta as rt,ua as ot,wa as at,ya as st,za as lt}from"./chunk-B4NKEOAB.mjs";import{e as O}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as N,Db as S,F as A,Fb as u,Gb as m,K as P,Lc as U,Mc as V,Qb as t,Rb as p,Sa as o,Sc as B,Ta as I,Tb as Y,V as E,Vb as D,Wb as G,Xb as M,Zb as F,_b as k,f,ia as T,lb as v,mb as w,nb as l,sa as h,ta as g,ua as _,va as L,xb as i,yb as n,zb as C}from"./chunk-S7ATBOQE.mjs";import{g as ut,h as b}from"./chunk-COT65Y5O.mjs";var c=ut(pt());var ht=()=>["/forms/yoyGrowth/add"],gt=a=>["/forms/yoyGrowth/update",a];function xt(a,x){if(a&1){let e=S();i(0,"tr"),t(1,`
              `),i(2,"th"),t(3),n(),t(4,`
              `),i(5,"td"),t(6),n(),t(7,`
              `),i(8,"td"),t(9),n(),t(10,`
              `),i(11,"td"),t(12),n(),t(13,`
              `),i(14,"td"),t(15,`
                `),i(16,"a",11),_(),C(17,"svg",12),n(),t(18,`
                `),L(),i(19,"a",13),u("click",function(){let r=h(e).$implicit,y=m();return g(y.deleteAum(r.id))}),_(),C(20,"svg",14),n(),t(21,`
              `),n(),t(22,`
            `),n()}if(a&2){let e=x.$implicit,s=x.index,r=m();o(3),p((r.currentPage-1)*r.itemsPerPage+s+1),o(3),p(e.aumYoyGrowthAmcName),o(3),p(e.aumYoyGrowthAmount),o(3),p(e.aumYoyGrowthDate),o(4),l("routerLink",N(9,gt,e.id))("cTooltip",r.tooltipEditText),o(),l("cIcon",r.icons.cilPen),o(2),l("cTooltip",r.tooltipDeleteText),o(),l("cIcon",r.icons.cilTrash)}}function yt(a,x){if(a&1){let e=S();i(0,"c-pagination",15),t(1,`
            `),i(2,"c-page-item"),t(3,`
              `),i(4,"a",16),u("click",function(){h(e);let r=m();return g(r.previousPage())}),t(5,"Previous"),n(),t(6,`
            `),n(),t(7,`
            `),i(8,"c-page-item"),t(9,`
              `),i(10,"a",17),t(11),n(),t(12,`
            `),n(),t(13,`
            `),i(14,"c-page-item"),t(15,`
              `),i(16,"a",16),u("click",function(){h(e);let r=m();return g(r.nextPage())}),t(17,"Next"),n(),t(18,`
            `),n(),t(19,`
          `),n()}if(a&2){let e=m();o(4),w("aria-disabled",e.currentPage===1),o(7),Y("",e.currentPage," / ",e.totalPages,""),o(5),w("aria-disabled",!e.nextCursor)}}var Bt=(()=>{class a{constructor(e){this.aumEntryYoyGrowthService=e,this.icons={cilPen:R,cilTrash:$},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.aumYoyInterfaceList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new f,this.currentSearchTerms={},this.unsubscribe$=new f}ngOnInit(){this.loadAumList(),this.setupSearch()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}setupSearch(){this.searchTerms.pipe(E(this.unsubscribe$),A(300),P()).subscribe(e=>{this.searchTerm=e,this.resetPagination(),this.loadAumList()})}search(e){let s=e.target;this.searchTerms.next(s.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadAumList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadAumList())}loadAumList(){this.isLoading||(this.isLoading=!0,this.aumEntryYoyGrowthService.listsAumYoyGrowthEntry(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(E(this.unsubscribe$)).subscribe(e=>{this.handleResponse(e)},e=>{this.handleError(e)}))}handleResponse(e){this.isLoading=!1,e&&e.code===1&&Array.isArray(e.data)?(this.aumYoyInterfaceList=e.data,this.totalItems=e.total_count||0,this.totalPages=e.total_pages||1,this.currentPage=e.current_page||1):(console.error("Unexpected API response structure:",e),c.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(e){this.isLoading=!1,console.error("Error loading AUM list:",e),c.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedAumList(){return this.aumYoyInterfaceList}deleteAum(e){return b(this,null,function*(){if((yield c.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{(yield this.aumEntryYoyGrowthService.deleteAumYoyGrowthEntry(e.toString())).data.code===1?(yield c.default.fire("Deleted!","AUM has been deleted.","success"),yield this.loadAumList()):yield c.default.fire("Error","Failed to delete AUM","error")}catch(r){console.error("Error deleting AUM:",r),yield c.default.fire("Error","An error occurred while deleting the AUM","error")}})}static{this.\u0275fac=function(s){return new(s||a)(I(dt))}}static{this.\u0275cmp=T({type:a,selectors:[["app-list-aum-entry-yoy-growth"]],standalone:!0,features:[F],decls:54,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(s,r){s&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),t(6,"Create New AUM Entry YOY Growth"),n()()()()()(),i(7,"c-row"),t(8,`
    `),i(9,"c-col",0),t(10,`
      `),i(11,"c-card",1),t(12,`
        `),i(13,"c-card-body"),t(14,`
          `),i(15,"c-col",5),t(16,`
          `),i(17,"input",6),u("input",function(d){return r.search(d)}),M("ngModelChange",function(d){return G(r.searchTerm,d)||(r.searchTerm=d),d}),n(),t(18,`
          `),n(),t(19,`
          `),i(20,"table",7),t(21,`
            `),i(22,"thead"),t(23,`
            `),i(24,"tr"),t(25,`
              `),i(26,"th",8),t(27,"S.No"),n(),t(28,`
              `),i(29,"th",8),t(30,"AMC Name"),n(),t(31,`
              `),i(32,"th",8),t(33,"AUM"),n(),t(34,`
              `),i(35,"th",8),t(36,"AUM Date"),n(),t(37,`
              `),i(38,"th",8),t(39,"Action"),n(),t(40,`  
            `),n(),t(41,`
            `),n(),t(42,`
            `),i(43,"tbody"),t(44,`
            `),v(45,xt,23,11,"tr",9),t(46,`
            `),n(),t(47,`
          `),n(),t(48,`
          `),v(49,yt,20,4,"c-pagination",10),t(50,`
        `),n(),t(51,`
      `),n(),t(52,`
    `),n(),t(53,`
`),n()),s&2&&(o(5),l("routerLink",k(7,ht)),o(12),D("ngModel",r.searchTerm),o(3),l("hover",!0)("striped",!0)("bordered",!0),o(25),l("ngForOf",r.paginatedAumList),o(4),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[B,U,V,it,j,O,Q,K,H,z,mt,lt,nt,rt,ot,ct,st,at,q,J,W,et,tt,Z,X]})}}return a})();export{Bt as ListAumEntryYoyGrowthComponent};
