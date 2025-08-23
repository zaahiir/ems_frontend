import{a as ue}from"./chunk-NRIUNPUJ.js";import{Ja as W,ra as G}from"./chunk-HZTH2PGK.js";import{a as ge}from"./chunk-AJEUVWKL.js";import{Aa as ae,Ba as se,Da as le,Fa as ce,Ga as me,M as K,U as Q,Ua as de,Va as pe,Z as X,_ as Z,b as H,ga as ee,ha as te,ia as ie,q as Y,va as ne,wa as re,x as q,y as J,ya as oe}from"./chunk-K3LN6DFK.js";import{$ as b,$a as c,A as w,Ga as f,H as S,Ha as T,Ia as l,Lb as R,Mb as $,S as y,Sa as i,Sb as j,Ta as n,Ua as P,Ya as C,Z as g,_ as h,_a as d,aa as I,bc as O,c as F,gc as z,jb as e,kb as _,lb as k,mb as D,ob as N,pa as a,pb as A,qa as E,qb as M,sb as V,tb as U,ub as B,x as L}from"./chunk-WAGJM7NU.js";import{f as xe,g as v}from"./chunk-MYAK5QVS.js";var m=xe(ge());var he=()=>["/forms/forms/add"],fe=s=>["/forms/forms/update",s];function _e(s,p){if(s&1){let t=C();i(0,"button",17),d("click",function(){g(t);let r=c().$implicit,u=c();return h(u.previewFile(r.id,r.formsFile))}),e(1),n()}if(s&2){let t=c().$implicit,o=c();a(),k(`
                  `,o.getFileName(t.formsFile),`
                `)}}function ve(s,p){s&1&&(i(0,"span"),e(1,"No file"),n())}function Ce(s,p){if(s&1){let t=C();i(0,"tr"),e(1,`
              `),i(2,"th"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12),n(),e(13,`
              `),i(14,"td"),e(15,`
                `),f(16,_e,2,1,"button",11),e(17,`
                `),f(18,ve,2,0,"span",12),e(19,`
              `),n(),e(20,`
              `),i(21,"td"),e(22,`
                `),i(23,"a",13),b(),P(24,"svg",14),n(),e(25,`
                `),I(),i(26,"a",15),d("click",function(){let r=g(t).$implicit,u=c();return h(u.deleteForm(r.id))}),b(),P(27,"svg",16),n(),e(28,`
              `),n(),e(29,`
            `),n()}if(s&2){let t=p.$implicit,o=p.index,r=c();a(3),_((r.currentPage-1)*r.itemsPerPage+o+1),a(3),_(t.formsAmcName),a(3),_(t.formsType),a(3),_(t.formsDescription),a(4),l("ngIf",t.formsFile),a(2),l("ngIf",!t.formsFile),a(5),l("routerLink",B(11,fe,t.id))("cTooltip",r.tooltipEditText),a(),l("cIcon",r.icons.cilPen),a(2),l("cTooltip",r.tooltipDeleteText),a(),l("cIcon",r.icons.cilTrash)}}function Fe(s,p){if(s&1){let t=C();i(0,"c-pagination",18),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",19),d("click",function(){g(t);let r=c();return h(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),i(8,"c-page-item"),e(9,`
              `),i(10,"a",20),e(11),n(),e(12,`
            `),n(),e(13,`
            `),i(14,"c-page-item"),e(15,`
              `),i(16,"a",19),d("click",function(){g(t);let r=c();return h(r.nextPage())}),e(17,"Next"),n(),e(18,`
            `),n(),e(19,`
          `),n()}if(s&2){let t=c();a(4),T("aria-disabled",t.currentPage===1),a(7),D("",t.currentPage," / ",t.totalPages,""),a(5),T("aria-disabled",!t.nextCursor)}}var We=(()=>{class s{constructor(t,o){this.formsService=t,this.sanitizer=o,this.icons={cilPen:G,cilTrash:W},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.formsList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new F,this.currentSearchTerms={},this.unsubscribe$=new F}getFullUrl(t){return t?this.formsService.getFullUrl(t):""}previewFile(t,o){if(!o){m.default.fire("Error","No file path provided","error");return}let r=this.getFullUrl(o);window.open(r,"_blank")}getFileName(t){if(!t)return"";let o=t.split("/");return o[o.length-1]}ngOnInit(){return v(this,null,function*(){yield this.loadFormsList(),this.setupSearch()})}setupSearch(){this.searchTerms.pipe(S(this.unsubscribe$),L(300),w()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadFormsList()})}search(t){let o=t.target;this.searchTerms.next(o.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadFormsList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadFormsList())}loadFormsList(){return v(this,null,function*(){this.isLoading||(this.isLoading=!0,this.formsService.listsForms(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(S(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))})}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.formsList=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),m.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),m.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedFormsList(){return this.formsList}deleteForm(t){return v(this,null,function*(){if((yield m.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{yield this.formsService.deleteForms(t.toString()),yield m.default.fire("Deleted!","Form has been deleted.","success"),yield this.loadFormsList()}catch(r){console.error("Error deleting form:",r),yield m.default.fire("Error","An error occurred while deleting the form","error")}})}static{this.\u0275fac=function(o){return new(o||s)(E(ue),E(O))}}static{this.\u0275cmp=y({type:s,selectors:[["app-list-forms"]],standalone:!0,features:[V],decls:61,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation",4,"ngIf"],["class","btn btn-link p-0",3,"click",4,"ngIf"],[4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],[1,"btn","btn-link","p-0",3,"click"],["aria-label","Page navigation"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(o,r){o&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create New Form"),n()()()()()(),i(7,"c-row"),e(8,`
    `),i(9,"c-col",0),e(10,`
      `),i(11,"c-card",1),e(12,`
        `),i(13,"c-card-body"),e(14,`
          `),i(15,"c-col",5),e(16,`
          `),i(17,"input",6),d("input",function(x){return r.search(x)}),M("ngModelChange",function(x){return A(r.searchTerm,x)||(r.searchTerm=x),x}),n(),e(18,`
          `),n(),e(19,`
          `),i(20,"table",7),e(21,`
            `),i(22,"thead"),e(23,`
            `),i(24,"tr"),e(25,`
              `),i(26,"th",8),e(27,"S.No"),n(),e(28,`
              `),i(29,"th",8),e(30,"AMC Name"),n(),e(31,`
              `),i(32,"th",8),e(33,"Form Type"),n(),e(34,`
              `),i(35,"th",8),e(36,"Description"),n(),e(37,`
              `),i(38,"th",8),e(39,"File Upload"),n(),e(40,`
              `),i(41,"th",8),e(42,"Action"),n(),e(43,`  
            `),n(),e(44,`
            `),n(),e(45,`
            `),i(46,"tbody"),e(47,`
            `),f(48,Ce,30,13,"tr",9),e(49,`
            `),i(50,"tr"),e(51,`
            `),n(),i(52,"tr"),e(53,`
            `),n()(),e(54,`
          `),n(),e(55,`
          `),f(56,Fe,20,4,"c-pagination",10),e(57,`
        `),n(),e(58,`
      `),n(),e(59,`
    `),n(),e(60,`
`),n()),o&2&&(a(5),l("routerLink",U(7,he)),a(12),N("ngModel",r.searchTerm),a(3),l("hover",!0)("striped",!0)("bordered",!0),a(28),l("ngForOf",r.paginatedFormsList),a(8),l("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[j,R,$,re,H,z,Z,X,q,J,pe,me,oe,ae,se,de,ce,le,K,Q,Y,ne,ie,te,ee]})}}return s})();export{We as ListFormsComponent};
