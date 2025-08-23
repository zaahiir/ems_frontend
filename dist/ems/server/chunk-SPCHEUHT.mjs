import './polyfills.server.mjs';
import{a as dt}from"./chunk-IVRD3AOI.mjs";import{Ja as j,ra as $}from"./chunk-7JE25W2O.mjs";import{a as ut}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as X,F as q,N as J,Na as ct,Oa as mt,S as K,T as Q,aa as Z,b as W,ba as tt,j as H,oa as et,pa as it,q as Y,r as z,ra as nt,ta as rt,ua as ot,wa as at,ya as st,za as lt}from"./chunk-B4NKEOAB.mjs";import{e as O}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as V,Db as b,F as L,Fb as u,Gb as d,K as I,Lc as B,Mc as U,Qb as t,Rb as c,Sa as o,Sc as R,Ta as G,Tb as D,V as v,Vb as A,Wb as k,Xb as N,Zb as M,_b as P,f,ia as F,lb as y,mb as C,nb as l,sa as g,ta as h,ua as _,va as w,xb as i,yb as n,zb as T}from"./chunk-S7ATBOQE.mjs";import{g as pt,h as x}from"./chunk-COT65Y5O.mjs";var m=pt(ut());var xt=()=>["/forms/gst/add"],gt=()=>["/forms/gst/upload"],ht=a=>["/forms/gst/update",a];function St(a,S){if(a&1){let e=b();i(0,"tr"),t(1,`
              `),i(2,"th"),t(3),n(),t(4,`
              `),i(5,"td"),t(6),n(),t(7,`
              `),i(8,"td"),t(9),n(),t(10,`
              `),i(11,"td"),t(12),n(),t(13,`
              `),i(14,"td"),t(15),n(),t(16,`
              `),i(17,"td"),t(18),n(),t(19,`
              `),i(20,"td"),t(21),n(),t(22,`
              `),i(23,"td"),t(24),n(),t(25,`
              `),i(26,"td"),t(27),n(),t(28,`
              `),i(29,"td"),t(30,`
                `),i(31,"a",11),_(),T(32,"svg",12),n(),t(33,`
                `),w(),i(34,"a",13),u("click",function(){let r=g(e).$implicit,E=d();return h(E.deleteAum(r.id))}),_(),T(35,"svg",14),n(),t(36,`
              `),n(),t(37,`
            `),n()}if(a&2){let e=S.$implicit,s=S.index,r=d();o(3),c((r.currentPage-1)*r.itemsPerPage+s+1),o(3),c(e.gstInvoiceDate),o(3),c(e.gstInvoiceNumber),o(3),c(e.gstAmcName),o(3),c(e.gstTotalValue),o(3),c(e.gstTaxableValue),o(3),c(e.gstIGst),o(3),c(e.gstSGst),o(3),c(e.gstCGst),o(4),l("routerLink",V(14,ht,e.id))("cTooltip",r.tooltipEditText),o(),l("cIcon",r.icons.cilPen),o(2),l("cTooltip",r.tooltipDeleteText),o(),l("cIcon",r.icons.cilTrash)}}function Et(a,S){if(a&1){let e=b();i(0,"c-pagination",15),t(1,`
            `),i(2,"c-page-item"),t(3,`
              `),i(4,"a",16),u("click",function(){g(e);let r=d();return h(r.previousPage())}),t(5,"Previous"),n(),t(6,`
            `),n(),t(7,`
            `),i(8,"c-page-item"),t(9,`
              `),i(10,"a",17),t(11),n(),t(12,`
            `),n(),t(13,`
            `),i(14,"c-page-item"),t(15,`
              `),i(16,"a",16),u("click",function(){g(e);let r=d();return h(r.nextPage())}),t(17,"Next"),n(),t(18,`
            `),n(),t(19,`
          `),n()}if(a&2){let e=d();o(4),C("aria-disabled",e.currentPage===1),o(7),D("",e.currentPage," / ",e.totalPages,""),o(5),C("aria-disabled",!e.nextCursor)}}var Ot=(()=>{class a{constructor(e){this.gstEntryFormsService=e,this.icons={cilPen:$,cilTrash:j},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.gstInterfaceList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new f,this.currentSearchTerms={},this.unsubscribe$=new f}ngOnInit(){return x(this,null,function*(){yield this.loadGstList(),this.setupSearch()})}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}setupSearch(){this.searchTerms.pipe(v(this.unsubscribe$),L(300),I()).subscribe(e=>{this.searchTerm=e,this.resetPagination(),this.loadGstList()})}search(e){let s=e.target;this.searchTerms.next(s.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadGstList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadGstList())}loadGstList(){return x(this,null,function*(){this.isLoading||(this.isLoading=!0,this.gstEntryFormsService.listsGst(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(v(this.unsubscribe$)).subscribe(e=>{this.handleResponse(e)},e=>{this.handleError(e)}))})}handleResponse(e){this.isLoading=!1,e&&e.code===1&&Array.isArray(e.data)?(this.gstInterfaceList=e.data,this.totalItems=e.total_count||0,this.totalPages=e.total_pages||1,this.currentPage=e.current_page||1):(console.error("Unexpected API response structure:",e),m.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(e){this.isLoading=!1,console.error("Error loading AUM list:",e),m.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedAumList(){return this.gstInterfaceList}deleteAum(e){return x(this,null,function*(){if((yield m.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{(yield this.gstEntryFormsService.deleteGst(e.toString())).data.code===1?(yield m.default.fire("Deleted!","GST entry has been deleted.","success"),yield this.loadGstList()):yield m.default.fire("Error","Failed to delete GST entry","error")}catch(r){console.error("Error deleting GST entry:",r),yield m.default.fire("Error","An error occurred while deleting the GST entry","error")}})}static{this.\u0275fac=function(s){return new(s||a)(G(dt))}}static{this.\u0275cmp=F({type:a,selectors:[["app-list-gst-entry-form"]],standalone:!0,features:[M],decls:72,vars:10,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(s,r){s&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),t(6,"Create New GST Entry Form"),n()(),i(7,"div",3)(8,"a",4),t(9,"Upload New GST Entry Form"),n()()()()()(),i(10,"c-row"),t(11,`
    `),i(12,"c-col",0),t(13,`
      `),i(14,"c-card",1),t(15,`
        `),i(16,"c-card-body"),t(17,`
          `),i(18,"c-col",5),t(19,`
          `),i(20,"input",6),u("input",function(p){return r.search(p)}),N("ngModelChange",function(p){return k(r.searchTerm,p)||(r.searchTerm=p),p}),n(),t(21,`
          `),n(),t(22,`
          `),i(23,"table",7),t(24,`
            `),i(25,"thead"),t(26,`
            `),i(27,"tr"),t(28,`
              `),i(29,"th",8),t(30,"S.No"),n(),t(31,`
              `),i(32,"th",8),t(33,"Invoice Date"),n(),t(34,`
              `),i(35,"th",8),t(36,"Invoice No"),n(),t(37,`
              `),i(38,"th",8),t(39,"AMC Name"),n(),t(40,`
              `),i(41,"th",8),t(42,"Total Value"),n(),t(43,`
              `),i(44,"th",8),t(45,"Taxable Value"),n(),t(46,`
              `),i(47,"th",8),t(48,"IGST"),n(),t(49,`
              `),i(50,"th",8),t(51,"SGST"),n(),t(52,`
              `),i(53,"th",8),t(54,"CGST"),n(),t(55,`
              `),i(56,"th",8),t(57,"Action"),n(),t(58,`
            `),n(),t(59,`
            `),n(),t(60,`
            `),i(61,"tbody"),t(62,`
            `),y(63,St,38,16,"tr",9),t(64,`
            `),n(),t(65,`
          `),n(),t(66,`
          `),y(67,Et,20,4,"c-pagination",10),t(68,`
        `),n(),t(69,`
      `),n(),t(70,`
    `),n(),t(71,`
`),n()),s&2&&(o(5),l("routerLink",P(8,xt)),o(3),l("routerLink",P(9,gt)),o(12),A("ngModel",r.searchTerm),o(3),l("hover",!0)("striped",!0)("bordered",!0),o(40),l("ngForOf",r.paginatedAumList),o(4),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[R,B,U,it,W,O,Q,K,Y,z,mt,lt,nt,rt,ot,ct,st,at,q,J,H,et,tt,Z,X]})}}return a})();export{Ot as ListGstEntryFormComponent};
