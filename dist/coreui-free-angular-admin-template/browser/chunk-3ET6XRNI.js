import{a as de}from"./chunk-UUAEYMST.js";import{Ja as W,ra as G}from"./chunk-HZTH2PGK.js";import{a as ue}from"./chunk-AJEUVWKL.js";import{Aa as re,Ba as oe,Da as ae,Fa as se,Ga as me,M as q,U as J,Ua as ce,Va as le,Z as K,_ as Q,b as $,ga as X,ha as Z,ia as ee,q as H,va as te,wa as ie,x as Y,y as z,ya as ne}from"./chunk-K3LN6DFK.js";import{$ as _,$a as l,A as L,Ga as v,H as E,Ha as y,Ia as m,Lb as B,Mb as R,S as I,Sa as i,Sb as U,Ta as n,Ua as P,Ya as b,Z as h,_ as x,_a as u,aa as w,c as S,gc as j,jb as e,kb as d,mb as M,ob as D,pa as o,pb as N,qa as F,qb as A,sb as k,tb as O,ub as V,x as T}from"./chunk-WAGJM7NU.js";import{f as pe,g as f}from"./chunk-MYAK5QVS.js";var c=pe(ue());var he=()=>["/forms/commission/add"],xe=a=>["/forms/commission/update",a];function ge(a,g){if(a&1){let t=b();i(0,"tr"),e(1,`
              `),i(2,"th"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12),n(),e(13,`
              `),i(14,"td"),e(15),n(),e(16,`
              `),i(17,"td"),e(18,`
                `),i(19,"a",11),_(),P(20,"svg",12),n(),e(21,`
                `),w(),i(22,"a",13),u("click",function(){let r=h(t).$implicit,C=l();return x(C.deleteCommission(r.id))}),_(),P(23,"svg",14),n(),e(24,`
              `),n(),e(25,`
            `),n()}if(a&2){let t=g.$implicit,s=g.index,r=l();o(3),d((r.currentPage-1)*r.itemsPerPage+s+1),o(3),d(t.commissionArnNumber),o(3),d(t.commissionAmcName),o(3),d(t.commissionAmount),o(3),d(t.commissionMonth),o(4),m("routerLink",V(10,xe,t.id))("cTooltip",r.tooltipEditText),o(),m("cIcon",r.icons.cilPen),o(2),m("cTooltip",r.tooltipDeleteText),o(),m("cIcon",r.icons.cilTrash)}}function Ce(a,g){if(a&1){let t=b();i(0,"c-pagination",15),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",16),u("click",function(){h(t);let r=l();return x(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),i(8,"c-page-item"),e(9,`
              `),i(10,"a",17),e(11),n(),e(12,`
            `),n(),e(13,`
            `),i(14,"c-page-item"),e(15,`
              `),i(16,"a",16),u("click",function(){h(t);let r=l();return x(r.nextPage())}),e(17,"Next"),n(),e(18,`
            `),n(),e(19,`
          `),n()}if(a&2){let t=l();o(4),y("aria-disabled",t.currentPage===1),o(7),M("",t.currentPage," / ",t.totalPages,""),o(5),y("aria-disabled",!t.nextCursor)}}var Ue=(()=>{class a{constructor(t){this.commissionEntryService=t,this.icons={cilPen:G,cilTrash:W},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.commissionList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.searchTerm="",this.nextCursor=null,this.prevCursors=[],this.searchTerms=new S,this.currentSearchTerms={},this.unsubscribe$=new S}ngOnInit(){this.loadCommissionList(),this.setupSearch()}setupSearch(){this.searchTerms.pipe(E(this.unsubscribe$),T(300),L()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadCommissionList()})}search(t){let s=t.target;this.searchTerms.next(s.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadCommissionList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadCommissionList())}loadCommissionList(){return f(this,null,function*(){this.isLoading||(this.isLoading=!0,this.commissionEntryService.listsCommission(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(E(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))})}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.commissionList=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),c.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),c.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedCommissionList(){return this.commissionList}deleteCommission(t){return f(this,null,function*(){if((yield c.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{(yield this.commissionEntryService.deleteCommission(t.toString())).data.code===1?(yield c.default.fire("Deleted!","COMMISSION has been deleted.","success"),yield this.loadCommissionList()):yield c.default.fire("Error","Failed to delete COMMISSION","error")}catch(r){console.error("Error deleting COMMISSION:",r),yield c.default.fire("Error","An error occurred while deleting the COMMISSION","error")}})}static{this.\u0275fac=function(s){return new(s||a)(F(de))}}static{this.\u0275cmp=I({type:a,selectors:[["app-list-commission-entry-form"]],standalone:!0,features:[k],decls:57,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(s,r){s&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create New Commission Entry Form"),n()()()()()(),i(7,"c-row"),e(8,`
    `),i(9,"c-col",0),e(10,`
      `),i(11,"c-card",1),e(12,`
        `),i(13,"c-card-body"),e(14,`
          `),i(15,"c-col",5),e(16,`
          `),i(17,"input",6),u("input",function(p){return r.search(p)}),A("ngModelChange",function(p){return N(r.searchTerm,p)||(r.searchTerm=p),p}),n(),e(18,`
          `),n(),e(19,`
          `),i(20,"table",7),e(21,`
            `),i(22,"thead"),e(23,`
            `),i(24,"tr"),e(25,`
              `),i(26,"th",8),e(27,"S.No"),n(),e(28,`
              `),i(29,"th",8),e(30,"ARN"),n(),e(31,`
              `),i(32,"th",8),e(33,"AMC Name"),n(),e(34,`
              `),i(35,"th",8),e(36,"Commission"),n(),e(37,`
              `),i(38,"th",8),e(39,"Month"),n(),e(40,`
              `),i(41,"th",8),e(42,"Action"),n(),e(43,`  
            `),n(),e(44,`
            `),n(),e(45,`
            `),i(46,"tbody"),e(47,`
            `),v(48,ge,26,12,"tr",9),e(49,`
            `),n(),e(50,`
          `),n(),e(51,`
          `),v(52,Ce,20,4,"c-pagination",10),e(53,`
        `),n(),e(54,`
      `),n(),e(55,`
    `),n(),e(56,`
`),n()),s&2&&(o(5),m("routerLink",O(7,he)),o(12),D("ngModel",r.searchTerm),o(3),m("hover",!0)("striped",!0)("bordered",!0),o(28),m("ngForOf",r.paginatedCommissionList),o(4),m("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[U,B,R,ie,$,j,Q,K,Y,z,le,me,ne,re,oe,ce,se,ae,q,J,H,te,ee,Z,X]})}}return a})();export{Ue as ListCommissionEntryFormComponent};
