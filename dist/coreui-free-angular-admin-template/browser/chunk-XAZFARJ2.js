import{a as ht}from"./chunk-MTLOIHVI.js";import{Ja as Y,ra as H}from"./chunk-HZTH2PGK.js";import{a as gt}from"./chunk-AJEUVWKL.js";import{Aa as st,Ba as ct,Da as mt,Fa as dt,Ga as pt,M as Q,U as X,Ua as ut,Va as yt,Z,_ as tt,b as z,ga as et,ha as it,ia as nt,q,ua as rt,va as at,wa as ot,x as J,y as K,ya as lt}from"./chunk-K3LN6DFK.js";import{$ as v,$a as c,A as T,Ga as _,H as f,Ha as C,Ia as s,Lb as $,Mb as j,Qb as G,S as w,Sa as i,Sb as U,Ta as n,Ua as D,Ya as S,Z as h,_ as x,_a as u,aa as L,c as E,gc as W,jb as t,kb as m,mb as F,ob as k,pa as a,pb as M,qa as I,qb as N,sb as B,tb as V,ub as A,wb as O,x as b,yb as R}from"./chunk-WAGJM7NU.js";import{f as xt,g as P}from"./chunk-MYAK5QVS.js";var y=xt(gt());var Et=()=>["/forms/dailyEntry/add"],ft=o=>["/forms/dailyEntry/update",o];function vt(o,g){if(o&1){let e=S();i(0,"tr"),t(1,`
              `),i(2,"th"),t(3),n(),t(4,`
              `),i(5,"td"),t(6),O(7,"date"),n(),t(8,`
              `),i(9,"td"),t(10),n(),t(11,`
              `),i(12,"td"),t(13),n(),t(14,`
              `),i(15,"td"),t(16),n(),t(17,`
              `),i(18,"td"),t(19,`
                `),i(20,"a",11),v(),D(21,"svg",12),n(),t(22,`
                `),L(),i(23,"a",13),u("click",function(){let r=h(e).$implicit,d=c();return x(d.deleteDailyEntry(r.id))}),v(),D(24,"svg",14),n(),t(25,`
              `),n(),t(26,`
            `),n()}if(o&2){let e=g.$implicit,l=g.index,r=c();a(3),m((r.currentPage-1)*r.itemsPerPage+l+1),a(3),m(R(7,10,e.applicationDate,"yyyy-MM-dd")),a(4),m(e.dailyEntryClientName),a(3),m(e.dailyEntryFundName),a(3),m(e.dailyEntryIssueType),a(4),s("routerLink",A(13,ft,e.id))("cTooltip",r.tooltipEditText),a(),s("cIcon",r.icons.cilPen),a(2),s("cTooltip",r.tooltipDeleteText),a(),s("cIcon",r.icons.cilTrash)}}function _t(o,g){if(o&1){let e=S();i(0,"c-pagination",15),t(1,`
          `),i(2,"c-page-item"),t(3,`
            `),i(4,"a",16),u("click",function(){h(e);let r=c();return x(r.previousPage())}),t(5,"Previous"),n(),t(6,`
          `),n(),t(7,`
          `),i(8,"c-page-item"),t(9,`
            `),i(10,"a",17),t(11),n(),t(12,`
          `),n(),t(13,`
          `),i(14,"c-page-item"),t(15,`
            `),i(16,"a",16),u("click",function(){h(e);let r=c();return x(r.nextPage())}),t(17,"Next"),n(),t(18,`
          `),n(),t(19,`
        `),n()}if(o&2){let e=c();a(4),C("aria-disabled",e.currentPage===1),a(7),F("",e.currentPage," / ",e.totalPages,""),a(5),C("aria-disabled",!e.nextCursor)}}var Ut=(()=>{class o{constructor(e){this.dailyEntryService=e,this.icons={cilPen:H,cilTrash:Y},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.dailyEntryList=[],this.currentPage=1,this.itemsPerPage=10,this.totalItems=0,this.totalPages=1,this.searchTerm="",this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new E,this.currentSearchTerms={},this.unsubscribe$=new E}ngOnInit(){this.loadDailyEntries(),this.setupSearch()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}setupSearch(){this.searchTerms.pipe(f(this.unsubscribe$),b(300),T()).subscribe(e=>{this.searchTerm=e,this.resetPagination(),this.loadDailyEntries()})}search(e){let l=e.target;this.searchTerms.next(l.value)}resetPagination(){this.currentPage=1}loadDailyEntries(){this.isLoading=!0,this.dailyEntryService.listDailyEntries(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(f(this.unsubscribe$)).subscribe(e=>{this.handleResponse(e)},e=>{this.handleError(e)})}handleResponse(e){if(this.isLoading=!1,e&&e.code===1&&Array.isArray(e.data))this.dailyEntryList=e.data,this.totalItems=e.total_count||0,this.totalPages=e.total_pages||1,this.currentPage=e.current_page||1;else throw new Error("Failed to load Daily Entry list: Unexpected API response structure")}updateTotalItems(){this.dailyEntryService.getTotalCount(this.searchTerm).subscribe(e=>{this.totalItems=e,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage)},e=>{console.error("Error fetching total count:",e)})}handleError(e){this.isLoading=!1,y.default.fire("Error","An error occurred while loading the Daily Entry list","error")}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadDailyEntries())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadDailyEntries())}deleteDailyEntry(e){return P(this,null,function*(){if((yield y.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{let r=yield this.dailyEntryService.deleteDailyEntry(e.toString()).toPromise();if(r&&r.code===1)this.dailyEntryList=this.dailyEntryList.filter(d=>d.id!==e),yield y.default.fire("Deleted!","Daily Entry has been deleted.","success"),this.dailyEntryList.length===0&&this.currentPage>1?this.previousPage():this.loadDailyEntries();else throw new Error("Failed to delete Daily Entry")}catch{yield y.default.fire("Error","An error occurred while deleting the Daily Entry","error")}})}static{this.\u0275fac=function(l){return new(l||o)(I(ht))}}static{this.\u0275cmp=w({type:o,selectors:[["app-list-daily-entry"]],standalone:!0,features:[B],decls:57,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","Edit Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","Delete Icon",3,"cIcon"],["aria-label","Page navigation"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(l,r){l&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),t(6,"Create New Daily Entry"),n()()()()()(),i(7,"c-row"),t(8,`
  `),i(9,"c-col",0),t(10,`
    `),i(11,"c-card",1),t(12,`
      `),i(13,"c-card-body"),t(14,`
        `),i(15,"c-col",5),t(16,`
          `),i(17,"input",6),u("input",function(p){return r.search(p)}),N("ngModelChange",function(p){return M(r.searchTerm,p)||(r.searchTerm=p),p}),n(),t(18,`
        `),n(),t(19,`
        `),i(20,"table",7),t(21,`
          `),i(22,"thead"),t(23,`
            `),i(24,"tr"),t(25,`
              `),i(26,"th",8),t(27,"S.No"),n(),t(28,`
              `),i(29,"th",8),t(30,"Application Date"),n(),t(31,`
              `),i(32,"th",8),t(33,"Client Name"),n(),t(34,`
              `),i(35,"th",8),t(36,"Fund Name"),n(),t(37,`
              `),i(38,"th",8),t(39,"Issue Type"),n(),t(40,`
              `),i(41,"th",8),t(42,"Action"),n(),t(43,`  
            `),n(),t(44,`
          `),n(),t(45,`
          `),i(46,"tbody"),t(47,`
            `),_(48,vt,27,15,"tr",9),t(49,`
          `),n(),t(50,`
        `),n(),t(51,`
        `),_(52,_t,20,4,"c-pagination",10),t(53,`
      `),n(),t(54,`
    `),n(),t(55,`
  `),n(),t(56,`
`),n()),l&2&&(a(5),s("routerLink",V(7,Et)),a(12),k("ngModel",r.searchTerm),a(3),s("hover",!0)("striped",!0)("bordered",!0),a(28),s("ngForOf",r.dailyEntryList),a(4),s("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[U,$,j,G,ot,z,W,tt,Z,J,K,yt,pt,lt,st,ct,ut,dt,mt,Q,X,q,at,nt,it,et,rt]})}}return o})();export{Ut as ListDailyEntryComponent};
