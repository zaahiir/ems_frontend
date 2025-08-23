import './polyfills.server.mjs';
import{a as ue}from"./chunk-LQCIOYUW.mjs";import{Ja as z,Pa as H,ra as O}from"./chunk-7JE25W2O.mjs";import{a as _e}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as ee,F as K,N as q,Na as he,Oa as ge,S as Q,T as Z,aa as te,b as J,ba as ie,j as U,ma as ne,na as ae,oa as re,pa as oe,q as X,r as Y,ra as se,ta as ce,ua as le,wa as me,ya as de,za as pe}from"./chunk-B4NKEOAB.mjs";import{e as $}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as D,Db as f,Fb as u,Gb as m,Kc as W,Lc as G,Mc as R,Qb as e,Rb as _,Sa as o,Sb as F,Sc as j,Ta as k,Tb as T,Ub as A,V as w,Vb as S,Wb as P,Xb as y,Zb as B,f as I,ia as V,lb as d,mb as E,nb as s,pb as b,sa as h,ta as g,ua as C,va as M,xb as n,yb as a,zb as x}from"./chunk-S7ATBOQE.mjs";import{g as xe,h as N}from"./chunk-COT65Y5O.mjs";var v=xe(_e());var ve=r=>({"d-none":r}),fe=r=>["/forms/nav/update",r];function Ce(r,l){if(r&1){let t=f();n(0,"div",16)(1,"a",17),u("click",function(){h(t);let i=m();return g(i.activateMode("single"))}),e(2,"Get Nav Data"),a(),n(3,"a",17),u("click",function(){h(t);let i=m();return g(i.activateMode("historic"))}),e(4,"Get Historic Nav Data"),a()()}}function Se(r,l){r&1&&x(0,"c-spinner",22)}function Pe(r,l){r&1&&(n(0,"span"),e(1,"Submit"),a())}function ye(r,l){if(r&1){let t=f();n(0,"div",16)(1,"input",18),y("ngModelChange",function(i){h(t);let p=m();return P(p.singleDate,i)||(p.singleDate=i),g(i)}),a(),n(2,"a",19),u("click",function(){h(t);let i=m();return g(i.submitSingleDate())}),d(3,Se,1,0,"c-spinner",8)(4,Pe,2,0,"span",9),a(),n(5,"a",20),u("click",function(){h(t);let i=m();return g(i.resetMode())}),C(),x(6,"svg",21),a()()}if(r&2){let t=m();o(),S("ngModel",t.singleDate),o(),s("disabled",t.isLoading),o(),s("ngIf",t.isLoading),o(),s("ngIf",!t.isLoading),o(),s("cTooltip",t.tooltipBackText),o(),s("cIcon",t.icons.cilXCircle)}}function Le(r,l){r&1&&x(0,"c-spinner",22)}function Ne(r,l){r&1&&(n(0,"span"),e(1,"Submit"),a())}function Ee(r,l){if(r&1){let t=f();n(0,"div",16)(1,"input",23),y("ngModelChange",function(i){h(t);let p=m();return P(p.startDate,i)||(p.startDate=i),g(i)}),a(),n(2,"input",24),y("ngModelChange",function(i){h(t);let p=m();return P(p.endDate,i)||(p.endDate=i),g(i)}),a(),n(3,"a",19),u("click",function(){h(t);let i=m();return g(i.submitDateRange())}),d(4,Le,1,0,"c-spinner",8)(5,Ne,2,0,"span",9),a(),n(6,"a",20),u("click",function(){h(t);let i=m();return g(i.resetMode())}),C(),x(7,"svg",21),a()()}if(r&2){let t=m();o(),S("ngModel",t.startDate),o(),S("ngModel",t.endDate),o(),s("disabled",t.isLoading),o(),s("ngIf",t.isLoading),o(),s("ngIf",!t.isLoading),o(),s("cTooltip",t.tooltipBackText),o(),s("cIcon",t.icons.cilXCircle)}}function be(r,l){r&1&&x(0,"c-spinner",22)}function Te(r,l){r&1&&(n(0,"span"),e(1,"Search"),a())}function De(r,l){if(r&1){let t=f();n(0,"button",25),u("click",function(){h(t);let i=m();return g(i.clearSearch())}),e(1,`
              Clear
            `),a()}if(r&2){let t=m();s("disabled",t.isSearching)}}function Ie(r,l){if(r&1&&(n(0,"div",26),e(1,`
          `),n(2,"div",27),e(3),a(),e(4,`
          `),n(5,"div",27),e(6),a(),e(7,`
        `),a()),r&2){let t=m();o(3),T(`
            Showing `,t.getCurrentPageRange()," of ",t.totalItems,` records
          `),o(3),T(`
            Page `,t.currentPage," of ",t.totalPages,`
          `)}}function we(r,l){if(r&1&&(n(0,"tr"),e(1,`
              `),n(2,"td",28),e(3,`
                `),x(4,"c-spinner",22),e(5,`
                `),n(6,"span",29),e(7),a(),e(8,`
              `),a(),e(9,`
            `),a()),r&2){let t=m();o(7),F("Loading",t.paginationDirection==="next"?" next":" previous"," page...")}}function Ve(r,l){r&1&&(n(0,"tr"),e(1,`
              `),n(2,"td",28),e(3,`
                `),x(4,"c-spinner",22),e(5,`
                `),n(6,"span",29),e(7,"Searching..."),a(),e(8,`
              `),a(),e(9,`
            `),a())}function Me(r,l){r&1&&(n(0,"tr"),e(1,`
              `),n(2,"td",28),e(3,`
                `),n(4,"span",30),e(5,"No records found"),a(),e(6,`
              `),a(),e(7,`
            `),a())}function ke(r,l){if(r&1){let t=f();n(0,"tr",31),e(1,`
              `),n(2,"th"),e(3),a(),e(4,`
              `),n(5,"td"),e(6),a(),e(7,`
              `),n(8,"td"),e(9),a(),e(10,`
              `),n(11,"td"),e(12),a(),e(13,`
              `),n(14,"td"),e(15),a(),e(16,`
              `),n(17,"td"),e(18,`
                `),n(19,"a",32),C(),x(20,"svg",21),a(),e(21,`
                `),M(),n(22,"a",33),u("click",function(){let i=h(t).$implicit,p=m();return g(p.deleteAum(i.id))}),C(),x(23,"svg",34),a(),e(24,`
              `),a(),e(25,`
            `),a()}if(r&2){let t=l.$implicit,c=l.index,i=m();s("ngClass",D(11,ve,i.isSearching||i.isPaginating)),o(3),_(i.getCurrentSerialNumber(c)),o(3),_(t.amcName),o(3),_(t.navFundName),o(3),_(t.nav),o(3),_(t.navDate),o(4),s("routerLink",D(13,fe,t.id))("cTooltip",i.tooltipEditText),o(),s("cIcon",i.icons.cilPen),o(2),s("cTooltip",i.tooltipDeleteText),o(),s("cIcon",i.icons.cilTrash)}}function Fe(r,l){r&1&&x(0,"c-spinner",42)}function Ae(r,l){r&1&&(n(0,"span"),e(1,"Previous"),a())}function Be(r,l){if(r&1&&(n(0,"c-page-item"),e(1,`
              `),n(2,"a",43),e(3),a(),e(4,`
            `),a()),r&2){let t=m(2);o(3),_(t.currentPage+1)}}function We(r,l){r&1&&(n(0,"c-page-item",44),e(1,`
              `),n(2,"a",40),e(3,"..."),a(),e(4,`
            `),a())}function Ge(r,l){if(r&1&&(n(0,"c-page-item"),e(1,`
              `),n(2,"a",43),e(3),a(),e(4,`
            `),a()),r&2){let t=m(2);o(3),_(t.totalPages)}}function Re(r,l){r&1&&x(0,"c-spinner",42)}function je(r,l){r&1&&(n(0,"span"),e(1,"Next"),a())}function $e(r,l){if(r&1){let t=f();n(0,"div",35),e(1,`
          `),e(2,`
          `),n(3,"c-pagination",36),e(4,`
            `),n(5,"c-page-item"),e(6,`
              `),n(7,"a",37),u("click",function(){h(t);let i=m();return g(i.previousPage())}),e(8,`
                `),d(9,Fe,1,0,"c-spinner",38),e(10,`
                `),d(11,Ae,2,0,"span",9),e(12,`
              `),a(),e(13,`
            `),a(),e(14,`

            `),e(15,`
            `),n(16,"c-page-item",39),e(17,`
              `),n(18,"a",40),e(19),a(),e(20,`
            `),a(),e(21,`

            `),e(22,`
            `),d(23,Be,5,1,"c-page-item",9),e(24,`

            `),e(25,`
            `),d(26,We,5,0,"c-page-item",41),e(27,`

            `),e(28,`
            `),d(29,Ge,5,1,"c-page-item",9),e(30,`

            `),n(31,"c-page-item"),e(32,`
              `),n(33,"a",37),u("click",function(){h(t);let i=m();return g(i.nextPage())}),e(34,`
                `),d(35,Re,1,0,"c-spinner",38),e(36,`
                `),d(37,je,2,0,"span",9),e(38,`
              `),a(),e(39,`
            `),a(),e(40,`
          `),a(),e(41,`

          `),e(42,`
          `),n(43,"div",27),e(44),a(),e(45,`
        `),a()}if(r&2){let t=m();o(7),b("disabled",!t.canGoPrevious()),E("aria-disabled",!t.canGoPrevious()),o(2),s("ngIf",t.isPaginating&&t.paginationDirection==="prev"),o(2),s("ngIf",!t.isPaginating||t.paginationDirection!=="prev"),o(8),_(t.currentPage),o(4),s("ngIf",t.currentPage<t.totalPages),o(3),s("ngIf",t.currentPage+1<t.totalPages),o(3),s("ngIf",t.currentPage+1<t.totalPages),o(4),b("disabled",!t.canGoNext()),E("aria-disabled",!t.canGoNext()),o(2),s("ngIf",t.isPaginating&&t.paginationDirection==="next"),o(2),s("ngIf",!t.isPaginating||t.paginationDirection!=="next"),o(7),A(`
            Page `,t.currentPage," of ",t.totalPages," (",t.totalItems,` total records)
          `)}}var dt=(()=>{class r{constructor(t){this.navService=t,this.icons={cilPen:O,cilTrash:z,cilXCircle:H},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.tooltipBackText="Back",this.navInterfaceList=[],this.currentPage=1,this.itemsPerPage=100,this.totalItems=0,this.totalPages=0,this.searchText="",this.currentSearchTerm="",this.searchCache=new Map,this.activeMode=null,this.singleDate="",this.startDate="",this.endDate="",this.isLoading=!1,this.isSearching=!1,this.isPaginating=!1,this.paginationDirection=null,this.nextCursor=null,this.currentCursor=null,this.previousCursors=[],this.unsubscribe$=new I}ngOnInit(){this.loadNavList()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}getCurrentPageRange(){let t=(this.currentPage-1)*this.itemsPerPage+1,c=Math.min(this.currentPage*this.itemsPerPage,this.totalItems);return`${t}-${c}`}getCurrentSerialNumber(t){return(this.currentPage-1)*this.itemsPerPage+t+1}performSearch(){let t=this.searchText.trim();t!==this.currentSearchTerm&&(this.currentSearchTerm=t,this.isSearching=!0,this.resetPagination(),this.currentSearchTerm!==t&&this.searchCache.clear(),this.loadNavList())}clearSearch(){this.searchText="",this.currentSearchTerm="",this.searchCache.clear(),this.resetPagination(),this.loadNavList()}loadNavList(){!this.isSearching&&!this.isPaginating&&(this.isLoading=!0);let t=`${this.currentSearchTerm}_${this.currentCursor||"first"}_${this.itemsPerPage}_page_${this.currentPage}`;if(this.currentSearchTerm&&this.searchCache.has(t)){let c=this.searchCache.get(t);this.handleResponse(c);return}this.navService.listsNav(this.itemsPerPage,this.currentSearchTerm,this.currentCursor||"").pipe(w(this.unsubscribe$)).subscribe(c=>{this.currentSearchTerm&&this.searchCache.set(t,c),this.handleResponse(c)},c=>{this.handleError(c)})}handleResponse(t){this.isLoading=!1,this.isSearching=!1,this.isPaginating=!1,this.paginationDirection=null,t.data&&Array.isArray(t.data.data)?(this.navInterfaceList=t.data.data,this.nextCursor=t.data.next_cursor,this.totalItems=t.data.total_count||0,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage)):(console.error("Unexpected API response structure:",t),this.showError("Failed to load NAV list: Unexpected API response structure"))}handleError(t){this.isLoading=!1,this.isSearching=!1,this.isPaginating=!1,this.paginationDirection=null,t.code!=="ERR_CANCELED"&&(console.error("Error loading NAV list:",t),this.showError("An error occurred while loading the NAV list"))}nextPage(){this.nextCursor&&!this.isLoading&&!this.isSearching&&!this.isPaginating&&this.currentPage<this.totalPages&&(this.isPaginating=!0,this.paginationDirection="next",this.previousCursors.push(this.currentCursor||""),this.currentCursor=this.nextCursor,this.currentPage++,this.loadNavList())}previousPage(){this.currentPage>1&&!this.isLoading&&!this.isSearching&&!this.isPaginating&&(this.isPaginating=!0,this.paginationDirection="prev",this.currentPage--,this.previousCursors.length>0?this.currentCursor=this.previousCursors.pop()||null:this.currentCursor=null,this.loadNavList())}resetPagination(){this.currentCursor=null,this.currentPage=1,this.nextCursor=null,this.previousCursors=[],this.isPaginating=!1,this.paginationDirection=null}canGoNext(){return this.nextCursor!==null&&this.currentPage<this.totalPages&&!this.isPaginating}canGoPrevious(){return this.currentPage>1&&!this.isPaginating}isSearchActive(){return this.currentSearchTerm.length>0}activateMode(t){this.activeMode=t}resetMode(){this.activeMode=null,this.singleDate="",this.startDate="",this.endDate=""}convertDateFormat(t){let c=new Date(t),i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${c.getDate().toString().padStart(2,"0")}-${i[c.getMonth()]}-${c.getFullYear()}`}submitSingleDate(){if(this.singleDate){this.isLoading=!0;let t=this.convertDateFormat(this.singleDate);this.navService.fetchNavData(t).then(c=>{this.isLoading=!1,v.default.fire("Success","NAV data fetched successfully","success").then(()=>{this.refreshList()})}).catch(c=>{this.isLoading=!1,this.showError("Failed to fetch NAV data")})}else v.default.fire("Warning","Please select a date","warning")}submitDateRange(){if(this.startDate&&this.endDate){this.isLoading=!0;let t=this.convertDateFormat(this.startDate),c=this.convertDateFormat(this.endDate);this.navService.fetchHistoricNavData(t,c).then(i=>{this.isLoading=!1,v.default.fire("Success","Historic NAV data fetched successfully","success").then(()=>{this.refreshList()})}).catch(i=>{this.isLoading=!1,this.showError("Failed to fetch historic NAV data")})}else v.default.fire("Warning","Please select both start and end dates","warning")}deleteAum(t){return N(this,null,function*(){if((yield v.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{if((yield this.navService.deleteNav(t.toString())).data.code===1)this.navInterfaceList=this.navInterfaceList.filter(p=>p.id!==t),this.totalItems--,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.searchCache.clear(),yield v.default.fire("Deleted!","NAV has been deleted.","success"),this.navInterfaceList.length===0&&this.currentPage>1?this.previousPage():this.navInterfaceList.length===0&&this.loadNavList();else throw new Error("Failed to delete NAV")}catch(i){console.error("Error deleting NAV:",i),this.showError("An error occurred while deleting the NAV")}})}refreshList(){this.searchCache.clear(),this.resetPagination(),this.loadNavList()}showError(t){v.default.fire("Error",t,"error")}handleSearchFallback(){return N(this,null,function*(){try{let t=yield this.navService.listNavFallback(this.itemsPerPage,this.currentSearchTerm,this.currentCursor||"").toPromise();this.handleResponse(t)}catch(t){console.error("Fallback search also failed:",t),this.showError("Search functionality is temporarily unavailable")}})}handleLargeDataset(){this.totalItems>1e4&&console.warn("Large dataset detected. Consider implementing virtual scrolling.")}static{this.\u0275fac=function(c){return new(c||r)(k(ue))}}static{this.\u0275cmp=V({type:r,selectors:[["app-list-nav"]],standalone:!0,features:[B],decls:84,vars:18,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],["class","d-grid gap-2 d-md-flex justify-content-md",4,"ngIf"],["md","4",1,"mb-4","flex","justify-content-md-end"],[1,"input-group"],["cFormControl","","id","searchInput","type","search","placeholder","Search AMC, Fund Name, or NAV...",3,"ngModelChange","keyup.enter","ngModel","disabled"],["cButton","","color","primary","type","button",3,"click","disabled"],["aria-hidden","true","size","sm",4,"ngIf"],[4,"ngIf"],["cButton","","color","secondary","type","button",3,"disabled","click",4,"ngIf"],["class","d-flex justify-content-between align-items-center mb-3",4,"ngIf"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[3,"ngClass",4,"ngFor","ngForOf"],["class","d-flex justify-content-between align-items-center",4,"ngIf"],[1,"d-grid","gap-2","d-md-flex","justify-content-md"],["cButton","","color","primary","role","button",3,"click"],["cFormControl","","type","date","name","singleDate",3,"ngModelChange","ngModel"],["cButton","","color","primary","role","button",3,"click","disabled"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-secondary","border-0","mt-2","py-0",3,"click","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["aria-hidden","true","size","sm"],["cFormControl","","type","date","name","startDate","placeholder","Start Date",3,"ngModelChange","ngModel"],["cFormControl","","type","date","name","endDate","placeholder","End Date",3,"ngModelChange","ngModel"],["cButton","","color","secondary","type","button",3,"click","disabled"],[1,"d-flex","justify-content-between","align-items-center","mb-3"],[1,"text-muted","small"],["colspan","6",1,"text-center","py-4"],[1,"ms-2"],[1,"text-muted"],[3,"ngClass"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],[1,"d-flex","justify-content-between","align-items-center"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["aria-hidden","true","size","sm","class","me-1",4,"ngIf"],[1,"active"],["cPageLink",""],["class","disabled",4,"ngIf"],["aria-hidden","true","size","sm",1,"me-1"],["cPageLink","",1,"text-muted"],[1,"disabled"]],template:function(c,i){c&1&&(n(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2),d(4,Ce,5,0,"div",3)(5,ye,7,6,"div",3)(6,Ee,8,7,"div",3),a()()()(),n(7,"c-row"),e(8,`
  `),n(9,"c-col",0),e(10,`
    `),n(11,"c-card",1),e(12,`
      `),n(13,"c-card-body"),e(14,`
        `),e(15,`
        `),n(16,"c-col",4),e(17,`
          `),n(18,"div",5),e(19,`
            `),n(20,"input",6),y("ngModelChange",function(L){return P(i.searchText,L)||(i.searchText=L),L}),u("keyup.enter",function(){return i.performSearch()}),a(),e(21,`
            `),n(22,"button",7),u("click",function(){return i.performSearch()}),e(23,`
              `),d(24,be,1,0,"c-spinner",8),e(25,`
              `),d(26,Te,2,0,"span",9),e(27,`
            `),a(),e(28,`
            `),d(29,De,2,1,"button",10),e(30,`
          `),a(),e(31,`
        `),a(),e(32,`

        `),e(33,`
        `),d(34,Ie,8,4,"div",11),e(35,`

        `),n(36,"table",12),e(37,`
          `),n(38,"thead"),e(39,`
            `),n(40,"tr"),e(41,`
              `),n(42,"th",13),e(43,"S.No"),a(),e(44,`
              `),n(45,"th",13),e(46,"AMC Name"),a(),e(47,`
              `),n(48,"th",13),e(49,"Fund Name"),a(),e(50,`
              `),n(51,"th",13),e(52,"Nav"),a(),e(53,`
              `),n(54,"th",13),e(55,"Date"),a(),e(56,`
              `),n(57,"th",13),e(58,"Action"),a(),e(59,`
            `),a(),e(60,`
          `),a(),e(61,`
          `),n(62,"tbody"),e(63,`
            `),e(64,`
            `),d(65,we,10,1,"tr",9),e(66,`
            `),e(67,`
            `),d(68,Ve,10,0,"tr",9),e(69,`
            `),e(70,`
            `),d(71,Me,8,0,"tr",9),e(72,`
            `),e(73,`
            `),d(74,ke,26,15,"tr",14),e(75,`
          `),a(),e(76,`
        `),a(),e(77,`

        `),e(78,`
        `),d(79,$e,46,17,"div",15),e(80,`
      `),a(),e(81,`
    `),a(),e(82,`
  `),a(),e(83,`
`),a()),c&2&&(o(4),s("ngIf",!i.activeMode),o(),s("ngIf",i.activeMode==="single"),o(),s("ngIf",i.activeMode==="historic"),o(14),S("ngModel",i.searchText),s("disabled",i.isSearching),o(2),s("disabled",i.isSearching),o(2),s("ngIf",i.isSearching),o(2),s("ngIf",!i.isSearching),o(3),s("ngIf",i.searchText),o(5),s("ngIf",!i.isSearching&&!i.isPaginating&&i.navInterfaceList.length>0),o(2),s("hover",!0)("striped",!0)("bordered",!0),o(29),s("ngIf",i.isPaginating),o(3),s("ngIf",i.isSearching&&!i.isPaginating),o(3),s("ngIf",!i.isSearching&&!i.isPaginating&&i.navInterfaceList.length===0),o(3),s("ngForOf",i.navInterfaceList),o(5),s("ngIf",i.totalItems>i.itemsPerPage&&!i.isSearching))},dependencies:[W,j,G,R,oe,J,$,Z,Q,X,Y,ge,pe,se,ce,le,he,de,me,K,q,U,re,ie,te,ee,ae,ne]})}}return r})();export{dt as ListNavComponent};
