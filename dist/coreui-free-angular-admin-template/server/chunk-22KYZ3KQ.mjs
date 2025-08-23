import './polyfills.server.mjs';
import{a as ue}from"./chunk-YOYBCKVQ.mjs";import{H as j,Ja as W,ra as H}from"./chunk-7JE25W2O.mjs";import{a as he}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as Z,F as J,N as K,Na as me,Oa as de,S as Q,T as X,aa as ee,b as $,ba as te,j as Y,oa as ie,pa as re,q as z,r as q,ra as ne,ta as oe,ua as ae,wa as le,ya as ce,za as se}from"./chunk-B4NKEOAB.mjs";import{e as O}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as w,Db as L,F as y,Fb as p,Gb as s,K as I,Lc as U,Mc as R,Qb as e,Rb as m,Sa as o,Sc as G,Ta as D,Tb as F,V as b,Vb as M,Wb as A,Xb as V,Zb as N,_b as B,f as S,ia as k,lb as P,mb as T,nb as c,sa as h,ta as g,ua as x,va as E,xb as i,yb as r,zb as C}from"./chunk-S7ATBOQE.mjs";import{g as pe,h as _}from"./chunk-COT65Y5O.mjs";var d=pe(he());var ge=()=>["/forms/courier/add"],xe=a=>["/forms/courier/update",a],Ce=a=>["/forms/courier/view",a];function fe(a,f){if(a&1){let t=L();i(0,"tr"),e(1,`
                `),i(2,"th"),e(3),r(),e(4,`
                `),i(5,"td"),e(6),r(),e(7,`
                `),i(8,"td"),e(9),r(),e(10,`
                `),i(11,"td"),e(12),r(),e(13,`
                `),i(14,"td"),e(15),r(),e(16,`
                `),i(17,"td"),e(18,`
                  `),i(19,"a",11),x(),C(20,"svg",12),r(),e(21,`
                  `),E(),i(22,"a",13),x(),C(23,"svg",14),r(),e(24,`
                  `),E(),i(25,"a",15),p("click",function(){let n=h(t).$implicit,v=s();return g(v.deleteCourier(n.id))}),x(),C(26,"svg",16),r(),e(27,`
                `),r(),e(28,`
              `),r()}if(a&2){let t=f.$implicit,l=f.index,n=s();o(3),m((n.currentPage-1)*n.itemsPerPage+l+1),o(3),m(t.courierClientName),o(3),m(t.courierClientAddress),o(3),m(t.full_mobile),o(3),m(t.courierEmail),o(4),c("routerLink",w(13,xe,t.id))("cTooltip",n.tooltipEditText),o(),c("cIcon",n.icons.cilPen),o(2),c("routerLink",w(15,Ce,t.id))("cTooltip",n.tooltipViewText),o(),c("cIcon",n.icons.cilCheck),o(2),c("cTooltip",n.tooltipDeleteText),o(),c("cIcon",n.icons.cilTrash)}}function ve(a,f){if(a&1){let t=L();i(0,"c-pagination",17),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",18),p("click",function(){h(t);let n=s();return g(n.previousPage())}),e(5,"Previous"),r(),e(6,`
            `),r(),e(7,`
            `),i(8,"c-page-item"),e(9,`
              `),i(10,"a",19),e(11),r(),e(12,`
            `),r(),e(13,`
            `),i(14,"c-page-item"),e(15,`
              `),i(16,"a",18),p("click",function(){h(t);let n=s();return g(n.nextPage())}),e(17,"Next"),r(),e(18,`
            `),r(),e(19,`
          `),r()}if(a&2){let t=s();o(4),T("aria-disabled",t.currentPage===1),o(7),F("",t.currentPage," / ",t.totalPages,""),o(5),T("aria-disabled",!t.nextCursor)}}var je=(()=>{class a{constructor(t){this.courierService=t,this.icons={cilPen:H,cilTrash:W,cilCheck:j},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.tooltipViewText="View Details",this.courierInterfaceList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.loading=!1,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new S,this.currentSearchTerms={},this.unsubscribe$=new S}ngOnInit(){this.loadCourierList(),this.setupSearch()}setupSearch(){this.searchTerms.pipe(b(this.unsubscribe$),y(300),I()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadCourierList()})}search(t){let l=t.target;this.searchTerms.next(l.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadCourierList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadCourierList())}loadCourierList(){return _(this,null,function*(){this.isLoading||(this.isLoading=!0,this.courierService.listsCourier(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(b(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))})}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.courierInterfaceList=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),d.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),d.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedCourierList(){return this.courierInterfaceList}deleteCourier(t){return _(this,null,function*(){if((yield d.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed){this.loading=!0;try{let n=yield this.courierService.deleteCourier(t.toString());if(n.data.code===1)yield d.default.fire("Deleted!","Courier has been deleted.","success"),yield this.loadCourierList();else throw new Error(n.data.message||"Failed to delete courier")}catch(n){console.error("Error deleting courier:",n),yield d.default.fire("Error",n instanceof Error?n.message:"An error occurred while deleting the courier","error")}finally{this.loading=!1}}})}static{this.\u0275fac=function(l){return new(l||a)(D(ue))}}static{this.\u0275cmp=k({type:a,selectors:[["app-list-courier"]],standalone:!0,features:[N],decls:57,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-dark","border-0","py-0",3,"routerLink","cTooltip"],["width","25","title","Share Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(l,n){l&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create New Courier Form"),r()()()()()(),i(7,"c-row"),e(8,`
    `),i(9,"c-col",0),e(10,`
      `),i(11,"c-card",1),e(12,`
        `),i(13,"c-card-body"),e(14,`
          `),i(15,"c-col",5),e(16,`
          `),i(17,"input",6),p("input",function(u){return n.search(u)}),V("ngModelChange",function(u){return A(n.searchTerm,u)||(n.searchTerm=u),u}),r(),e(18,`
          `),r(),e(19,`
          `),i(20,"table",7),e(21,`
            `),i(22,"thead"),e(23,`
              `),i(24,"tr"),e(25,`
                `),i(26,"th",8),e(27,"S.No"),r(),e(28,`
                `),i(29,"th",8),e(30,"Client Name"),r(),e(31,`
                `),i(32,"th",8),e(33,"Address"),r(),e(34,`
                `),i(35,"th",8),e(36,"Mobile"),r(),e(37,`
                `),i(38,"th",8),e(39,"Email"),r(),e(40,`
                `),i(41,"th",8),e(42,"Action"),r(),e(43,`  
              `),r(),e(44,`
            `),r(),e(45,`
            `),i(46,"tbody"),e(47,`
              `),P(48,fe,29,17,"tr",9),e(49,`
            `),r(),e(50,`
          `),r(),e(51,`
          `),P(52,ve,20,4,"c-pagination",10),e(53,`
        `),r(),e(54,`
      `),r(),e(55,`
    `),r(),e(56,`
`),r()),l&2&&(o(5),c("routerLink",B(7,ge)),o(12),M("ngModel",n.searchTerm),o(3),c("hover",!0)("striped",!0)("bordered",!0),o(28),c("ngForOf",n.paginatedCourierList),o(4),c("ngIf",n.totalItems>n.itemsPerPage))},dependencies:[G,U,R,re,$,O,X,Q,z,q,de,se,ne,oe,ae,me,ce,le,J,K,Y,ie,te,ee,Z]})}}return a})();export{je as ListCourierComponent};
