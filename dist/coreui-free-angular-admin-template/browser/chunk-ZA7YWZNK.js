import{Ja as G,ra as j}from"./chunk-HZTH2PGK.js";import{a as de}from"./chunk-3IPB5M6Y.js";import{a as pe}from"./chunk-AJEUVWKL.js";import{Aa as re,Ba as oe,Da as ae,Fa as se,Ga as le,M as q,U as J,Ua as ce,Va as me,Z as K,_ as Q,b as W,ga as X,ha as Z,ia as ee,q as H,va as te,wa as ie,x as Y,y as z,ya as ne}from"./chunk-K3LN6DFK.js";import{$ as _,$a as c,A as T,Ga as y,H as v,Ha as C,Ia as l,Lb as B,Mb as R,S as w,Sa as i,Sb as O,Ta as n,Ua as S,Ya as b,Z as x,_ as g,_a as h,aa as I,c as E,gc as $,jb as e,kb as m,mb as D,ob as k,pa as o,pb as F,qa as M,qb as N,sb as U,tb as A,ub as V,x as L}from"./chunk-WAGJM7NU.js";import{f as ue,g as P}from"./chunk-MYAK5QVS.js";var d=ue(pe());var he=()=>["/forms/aum/add"],xe=()=>["/forms/aum/upload"],ge=s=>["/forms/aum/update",s];function fe(s,f){if(s&1){let t=b();i(0,"tr"),e(1,`
              `),i(2,"th"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12),n(),e(13,`
              `),i(14,"td"),e(15),n(),e(16,`
              `),i(17,"td"),e(18,`
                `),i(19,"a",11),_(),S(20,"svg",12),n(),e(21,`
                `),I(),i(22,"a",13),h("click",function(){let r=x(t).$implicit,u=c();return g(u.deleteAum(r.id))}),_(),S(23,"svg",14),n(),e(24,`
              `),n(),e(25,`
            `),n()}if(s&2){let t=f.$implicit,a=f.index,r=c();o(3),m((r.currentPage-1)*r.itemsPerPage+a+1),o(3),m(t.aumArnNumber),o(3),m(t.aumAmcName),o(3),m(t.aumAmount),o(3),m(t.aumMonth),o(4),l("routerLink",V(10,ge,t.id))("cTooltip",r.tooltipEditText),o(),l("cIcon",r.icons.cilPen),o(2),l("cTooltip",r.tooltipDeleteText),o(),l("cIcon",r.icons.cilTrash)}}function Ee(s,f){if(s&1){let t=b();i(0,"c-pagination",15),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",16),h("click",function(){x(t);let r=c();return g(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),i(8,"c-page-item"),e(9,`
              `),i(10,"a",17),e(11),n(),e(12,`
            `),n(),e(13,`
            `),i(14,"c-page-item"),e(15,`
              `),i(16,"a",16),h("click",function(){x(t);let r=c();return g(r.nextPage())}),e(17,"Next"),n(),e(18,`
            `),n(),e(19,`
          `),n()}if(s&2){let t=c();o(4),C("aria-disabled",t.currentPage===1),o(7),D("",t.currentPage," / ",t.totalPages,""),o(5),C("aria-disabled",!t.nextCursor)}}var Oe=(()=>{class s{constructor(t){this.aumEntryService=t,this.icons={cilPen:j,cilTrash:G},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.aumList=[],this.currentPage=1,this.itemsPerPage=10,this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.searchTerm="",this.nextCursor=null,this.prevCursors=[],this.searchTerms=new E,this.currentSearchTerms={},this.unsubscribe$=new E}ngOnInit(){this.loadAumList(),this.setupSearch()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}setupSearch(){this.searchTerms.pipe(v(this.unsubscribe$),L(300),T()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadAumList()})}search(t){let a=t.target;this.searchTerms.next(a.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadAumList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadAumList())}loadAumList(){this.isLoading||(this.isLoading=!0,this.aumEntryService.listsAum(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(v(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.aumList=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),d.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),d.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedAumList(){return this.aumList}deleteAum(t){return P(this,null,function*(){if(!this.isLoading)try{if((yield d.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed){this.isLoading=!0;let r=yield this.aumEntryService.deleteAum(t.toString());if(r.data&&r.data.code===1)this.aumList=this.aumList.filter(u=>u.id!==t),yield d.default.fire("Deleted!","AUM has been deleted.","success"),this.loadAumList();else throw new Error("Failed to delete AUM")}}catch(a){console.error("Error deleting AUM:",a),yield d.default.fire("Error","An error occurred while deleting the AUM. Please check your network connection and try again.","error")}finally{this.isLoading=!1}})}static{this.\u0275fac=function(a){return new(a||s)(M(de))}}static{this.\u0275cmp=w({type:s,selectors:[["app-list-aum-entry"]],standalone:!0,features:[U],decls:60,vars:10,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(a,r){a&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create New AUM Entry"),n()(),i(7,"div",3)(8,"a",4),e(9,"Upload New AUM Entry"),n()()()()()(),i(10,"c-row"),e(11,`
    `),i(12,"c-col",0),e(13,`
      `),i(14,"c-card",1),e(15,`
        `),i(16,"c-card-body"),e(17,`
          `),i(18,"c-col",5),e(19,`
          `),i(20,"input",6),h("input",function(p){return r.search(p)}),N("ngModelChange",function(p){return F(r.searchTerm,p)||(r.searchTerm=p),p}),n(),e(21,`
          `),n(),e(22,`
          `),i(23,"table",7),e(24,`
            `),i(25,"thead"),e(26,`
            `),i(27,"tr"),e(28,`
              `),i(29,"th",8),e(30,"S.No"),n(),e(31,`
              `),i(32,"th",8),e(33,"ARN"),n(),e(34,`
              `),i(35,"th",8),e(36,"AMC Name"),n(),e(37,`
              `),i(38,"th",8),e(39,"AUM"),n(),e(40,`
              `),i(41,"th",8),e(42,"Month"),n(),e(43,`
              `),i(44,"th",8),e(45,"Action"),n(),e(46,`
            `),n(),e(47,`
            `),n(),e(48,`
            `),i(49,"tbody"),e(50,`
            `),y(51,fe,26,12,"tr",9),e(52,`
            `),n(),e(53,`
          `),n(),e(54,`
          `),y(55,Ee,20,4,"c-pagination",10),e(56,`
        `),n(),e(57,`
      `),n(),e(58,`
    `),n(),e(59,`
`),n()),a&2&&(o(5),l("routerLink",A(8,he)),o(3),l("routerLink",A(9,xe)),o(12),k("ngModel",r.searchTerm),o(3),l("hover",!0)("striped",!0)("bordered",!0),o(28),l("ngForOf",r.paginatedAumList),o(4),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[O,B,R,ie,W,$,Q,K,Y,z,me,le,ne,re,oe,ce,se,ae,q,J,H,te,ee,Z,X]})}}return s})();export{Oe as ListAumEntryComponent};
