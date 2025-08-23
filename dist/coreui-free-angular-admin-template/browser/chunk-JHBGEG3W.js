import{a as ie}from"./chunk-CEB5S2F6.js";import{Ja as N,ra as B}from"./chunk-HZTH2PGK.js";import{a as re}from"./chunk-AJEUVWKL.js";import{Aa as X,Fa as Z,U as H,Ua as ee,Va as te,Z as Y,_ as $,b as O,ga as z,ha as q,ia as J,q as W,va as K,wa as Q,x as j,y as G,ya as U}from"./chunk-K3LN6DFK.js";import{$ as v,$a as m,Ga as f,Ha as A,Ia as c,Kb as D,Lb as I,Mb as k,S as M,Sa as i,Sb as V,Ta as n,Ua as w,Ya as P,Z as u,_ as x,_a as p,aa as S,gc as R,jb as e,kb as _,ob as T,pa as s,pb as y,qa as E,qb as F,sb as b,ub as L}from"./chunk-WAGJM7NU.js";import{f as ne,g as h}from"./chunk-MYAK5QVS.js";var C=ne(re());var ae=o=>["/forms/amc/update",o],oe=o=>({active:o});function se(o,g){if(o&1){let t=P();i(0,"tr"),e(1,`
              `),i(2,"td"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12,`
                `),i(13,"a",8),v(),w(14,"svg",9),n(),e(15,`
                `),S(),i(16,"a",10),p("click",function(){let r=u(t).$implicit,l=m();return x(l.deleteAmc(r.id))}),v(),w(17,"svg",11),n(),e(18,`
              `),n(),e(19,`
            `),n()}if(o&2){let t=g.$implicit,a=g.index,r=m();s(3),_((r.currentPage-1)*r.itemsPerPage+a+1),s(3),_(t.amcName),s(3),_(t.amcAddress),s(4),c("routerLink",L(8,ae,t.id))("cTooltip",r.tooltipEditText),s(),c("cIcon",r.icons.cilPen),s(2),c("cTooltip",r.tooltipDeleteText),s(),c("cIcon",r.icons.cilTrash)}}function ce(o,g){if(o&1){let t=P();i(0,"c-page-item"),e(1,`
              `),i(2,"a",14),p("click",function(){let r=u(t).$implicit,l=m(2);return x(l.changePage(r))}),e(3),n(),e(4,`
            `),n()}if(o&2){let t=g.$implicit,a=m(2);s(2),c("ngClass",L(2,oe,a.currentPage===t)),s(),_(t)}}function le(o,g){if(o&1){let t=P();i(0,"c-pagination",12),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",13),p("click",function(){u(t);let r=m();return x(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),f(8,ce,5,4,"c-page-item",6),e(9,`
            `),i(10,"c-page-item"),e(11,`
              `),i(12,"a",13),p("click",function(){u(t);let r=m();return x(r.nextPage())}),e(13,"Next"),n(),e(14,`
            `),n(),e(15,`
          `),n()}if(o&2){let t=m();s(4),A("aria-disabled",t.currentPage===1),s(4),c("ngForOf",t.pageRange),s(4),A("aria-disabled",t.currentPage===t.totalPages)}}var Fe=(()=>{class o{constructor(t){this.amcMasterFormService=t,this.icons={cilPen:B,cilTrash:N},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.amcList=[],this.filteredAmcList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm=""}ngOnInit(){return h(this,null,function*(){yield this.loadAmcList()})}updatePageRange(){let t=this.totalPages,a=Math.max(1,this.currentPage-1);Math.min(t,a+2)===t&&(a=Math.max(1,t-2)),this.pageRange=Array.from({length:Math.min(3,t)},(l,d)=>a+d)}changePage(t){t>=1&&t<=this.totalPages&&(this.currentPage=t,this.updatePageRange())}nextPage(){this.currentPage<this.totalPages&&this.changePage(this.currentPage+1)}previousPage(){this.currentPage>1&&this.changePage(this.currentPage-1)}loadAmcList(){return h(this,null,function*(){try{let t=yield this.amcMasterFormService.listsAmc("0");if(t.data.code===1){this.amcList=t.data.data,this.applyFilter();let a=Math.ceil(this.filteredAmcList.length/this.itemsPerPage);this.currentPage>a&&(this.currentPage=Math.max(1,a)),this.updatePageRange()}else yield this.showError("Failed to load AMC list")}catch(t){console.error("Error loading AMC list:",t),yield this.showError("An error occurred while loading the AMC list")}})}search(){this.currentPage=1,this.applyFilter(),this.updatePageRange()}applyFilter(){this.searchTerm?this.filteredAmcList=this.amcList.filter(t=>t.amcAddress.toLowerCase().includes(this.searchTerm.toLowerCase())||t.amcName.toLowerCase().includes(this.searchTerm.toLowerCase())):this.filteredAmcList=[...this.amcList]}get paginatedAmcList(){let t=(this.currentPage-1)*this.itemsPerPage;return this.filteredAmcList.slice(t,t+this.itemsPerPage)}get totalPages(){return Math.ceil(this.filteredAmcList.length/this.itemsPerPage)}deleteAmc(t){return h(this,null,function*(){if((yield C.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{if((yield this.amcMasterFormService.deleteAmc(t.toString())).data.code===1){yield C.default.fire("Deleted!","AMC has been deleted.","success");let l=this.filteredAmcList.length,d=this.paginatedAmcList.length===1;yield this.loadAmcList(),d&&this.currentPage>1&&l===this.itemsPerPage*this.currentPage&&this.currentPage--,this.applyFilter(),this.updatePageRange()}else yield this.showError("Failed to delete AMC")}catch(r){console.error("Error deleting AMC:",r),yield this.showError("An error occurred while deleting the AMC")}})}showError(t){return h(this,null,function*(){yield C.default.fire("Error",t,"error")})}static{this.\u0275fac=function(a){return new(a||o)(E(ie))}}static{this.\u0275cmp=M({type:o,selectors:[["app-list-amc-master-form"]],standalone:!0,features:[b],decls:44,vars:6,consts:[["xs","12"],[1,"mb-4"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink","",3,"click","ngClass"]],template:function(a,r){a&1&&(i(0,"c-row"),e(1,`
    `),i(2,"c-col",0),e(3,`
      `),i(4,"c-card",1),e(5,`
        `),i(6,"c-card-body"),e(7,`
          `),i(8,"c-col",2),e(9,`
          `),i(10,"input",3),p("input",function(){return r.search()}),F("ngModelChange",function(d){return y(r.searchTerm,d)||(r.searchTerm=d),d}),n(),e(11,`
          `),n(),e(12,`
          `),i(13,"table",4),e(14,`
            `),i(15,"thead"),e(16,`
            `),i(17,"tr"),e(18,`
              `),i(19,"th",5),e(20,"S.No"),n(),e(21,`
              `),i(22,"th",5),e(23,"AMC"),n(),e(24,`
              `),i(25,"th",5),e(26,"Address"),n(),e(27,`
              `),i(28,"th",5),e(29,"Action"),n(),e(30,`  
            `),n(),e(31,`
            `),n(),e(32,`
            `),i(33,"tbody"),e(34,`
            `),f(35,se,20,10,"tr",6),e(36,`
            `),n(),e(37,`
          `),n(),e(38,`
          `),f(39,le,16,3,"c-pagination",7),e(40,`
        `),n(),e(41,`
      `),n(),e(42,`
    `),n(),e(43,`
`),n()),a&2&&(s(10),T("ngModel",r.searchTerm),s(3),c("hover",!0)("striped",!0)("bordered",!0),s(22),c("ngForOf",r.paginatedAmcList),s(4),c("ngIf",r.amcList.length>r.itemsPerPage))},dependencies:[D,V,I,k,Q,O,R,$,Y,j,G,te,U,X,ee,Z,H,W,K,J,q,z]})}}return o})();export{Fe as ListAmcMasterFormComponent};
