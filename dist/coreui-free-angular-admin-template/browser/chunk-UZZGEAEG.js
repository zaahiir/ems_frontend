import{a as ce}from"./chunk-3AQQD4W2.js";import{Ja as U,ra as O}from"./chunk-HZTH2PGK.js";import{a as me}from"./chunk-AJEUVWKL.js";import{Aa as te,Ba as ie,Da as ne,Fa as re,Ga as oe,M as Y,U as $,Ua as ae,Va as le,Z as z,_ as q,b as G,ga as J,ha as K,ia as Q,q as W,va as X,wa as Z,x as j,y as H,ya as ee}from"./chunk-K3LN6DFK.js";import{$ as E,$a as m,Ga as f,Ha as C,Ia as s,Kb as N,Lb as V,Mb as A,S as T,Sa as n,Sb as B,Ta as r,Ua as P,Ya as y,Z as h,_,_a as d,aa as w,gc as R,jb as e,kb as p,ob as M,pa as a,pb as F,qa as b,qb as D,sb as I,tb as k,ub as v}from"./chunk-WAGJM7NU.js";import{a as L,b as S,f as se}from"./chunk-MYAK5QVS.js";var g=se(me());var pe=()=>["/employees/add"],de=l=>["/employees/update",l],ge=l=>({active:l});function ue(l,u){if(l&1){let t=y();n(0,"tr"),e(1,`
              `),n(2,"th"),e(3),r(),e(4,`
              `),n(5,"td"),e(6),r(),e(7,`
              `),n(8,"td"),e(9),r(),e(10,`
              `),n(11,"td"),e(12),r(),e(13,`
              `),n(14,"td"),e(15),r(),e(16,`
              `),n(17,"td"),e(18,`
                `),n(19,"a",11),E(),P(20,"svg",12),r(),e(21,`
                `),w(),n(22,"a",13),d("click",function(){let i=h(t).$implicit,c=m();return _(c.deleteForm(i.id))}),E(),P(23,"svg",14),r(),e(24,`
              `),r(),e(25,`
            `),r()}if(l&2){let t=u.$implicit,o=u.index,i=m();a(3),p((i.currentPage-1)*i.itemsPerPage+o+1),a(3),p(t.employeeName),a(3),p(t.employeeUserType),a(3),p(t.employeeEmail),a(3),p(t.fullMobile),a(4),s("routerLink",v(10,de,t.id))("cTooltip",i.tooltipEditText),a(),s("cIcon",i.icons.cilPen),a(2),s("cTooltip",i.tooltipDeleteText),a(),s("cIcon",i.icons.cilTrash)}}function xe(l,u){if(l&1){let t=y();n(0,"c-page-item"),e(1,`
              `),n(2,"a",17),d("click",function(){let i=h(t).$implicit,c=m(2);return _(c.changePage(i))}),e(3),r(),e(4,`
            `),r()}if(l&2){let t=u.$implicit,o=m(2);a(2),s("ngClass",v(2,ge,o.currentPage===t)),a(),p(t)}}function he(l,u){if(l&1){let t=y();n(0,"c-pagination",15),e(1,`
            `),n(2,"c-page-item"),e(3,`
              `),n(4,"a",16),d("click",function(){h(t);let i=m();return _(i.previousPage())}),e(5,"Previous"),r(),e(6,`
            `),r(),e(7,`
            `),f(8,xe,5,4,"c-page-item",9),e(9,`
            `),n(10,"c-page-item"),e(11,`
              `),n(12,"a",16),d("click",function(){h(t);let i=m();return _(i.nextPage())}),e(13,"Next"),r(),e(14,`
            `),r(),e(15,`
          `),r()}if(l&2){let t=m();a(4),C("aria-disabled",t.currentPage===1),a(4),s("ngForOf",t.pageRange),a(4),C("aria-disabled",t.currentPage===t.totalPages)}}var Ae=(()=>{class l{constructor(t){this.employeeService=t,this.icons={cilPen:O,cilTrash:U},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.employeeList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm=""}updatePageRange(){let t=this.totalPages,o=Math.max(1,this.currentPage-1);Math.min(t,o+2)===t&&(o=Math.max(1,t-2)),this.pageRange=Array.from({length:Math.min(3,t)},(c,x)=>o+x)}changePage(t){t>=1&&t<=this.totalPages&&(this.currentPage=t,this.updatePageRange())}nextPage(){this.currentPage<this.totalPages&&this.changePage(this.currentPage+1)}previousPage(){this.currentPage>1&&this.changePage(this.currentPage-1)}ngOnInit(){this.loadEmployeeList()}loadEmployeeList(){this.employeeService.listsEmployee("0").then(t=>{t.data.code===1?(this.employeeList=t.data.data.map(o=>S(L({},o),{fullMobile:o.full_mobile})),this.updatePageRange()):g.default.fire("Error","Failed to load AUM list","error")}).catch(t=>{console.error("Error loading AUM list:",t),g.default.fire("Error","An error occurred while loading the AUM list","error")})}search(){this.currentPage=1,this.updatePageRange()}get paginatedEmployeeList(){let t=this.employeeList;if(this.searchTerm){let i=this.searchTerm.toLowerCase();t=this.employeeList.filter(c=>c.employeeName.toLowerCase().includes(i)||c.employeeEmail.toLowerCase().includes(i)||c.fullMobile.toLowerCase().includes(i)||c.employeeAddress.toLowerCase().includes(i))}let o=(this.currentPage-1)*this.itemsPerPage;return t.slice(o,o+this.itemsPerPage)}get totalPages(){let t=this.searchTerm?this.employeeList.filter(o=>{let i=this.searchTerm.toLowerCase();return o.employeeName.toLowerCase().includes(i)||o.employeeEmail.toLowerCase().includes(i)||o.fullMobile.toLowerCase().includes(i)||o.employeeAddress.toLowerCase().includes(i)}).length:this.employeeList.length;return Math.ceil(t/this.itemsPerPage)}deleteForm(t){g.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(o=>{o.isConfirmed&&this.employeeService.deleteEmployee(t.toString()).then(i=>{g.default.fire("Deleted!","Form has been deleted.","success"),this.loadEmployeeList()}).catch(i=>{console.error("Error deleting form:",i),g.default.fire("Error","An error occurred while deleting the form","error")})})}static{this.\u0275fac=function(o){return new(o||l)(b(ce))}}static{this.\u0275cmp=T({type:l,selectors:[["app-list-employees"]],standalone:!0,features:[I],decls:57,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom09","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink","",3,"click","ngClass"]],template:function(o,i){o&1&&(n(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create Employee"),r()()()()()(),n(7,"c-row"),e(8,`
    `),n(9,"c-col",0),e(10,`
      `),n(11,"c-card",1),e(12,`
        `),n(13,"c-card-body"),e(14,`
          `),n(15,"c-col",5),e(16,`
          `),n(17,"input",6),d("input",function(){return i.search()}),D("ngModelChange",function(x){return F(i.searchTerm,x)||(i.searchTerm=x),x}),r(),e(18,`
          `),r(),e(19,`
          `),n(20,"table",7),e(21,`
            `),n(22,"thead"),e(23,`
            `),n(24,"tr"),e(25,`
              `),n(26,"th",8),e(27,"S.No"),r(),e(28,`
              `),n(29,"th",8),e(30,"Employee Name"),r(),e(31,`
              `),n(32,"th",8),e(33,"Employee Type"),r(),e(34,`
              `),n(35,"th",8),e(36,"Email"),r(),e(37,`
              `),n(38,"th",8),e(39,"Phone"),r(),e(40,`
              `),n(41,"th",8),e(42,"Action"),r(),e(43,`  
            `),r(),e(44,`
            `),r(),e(45,`
            `),n(46,"tbody"),e(47,`
            `),f(48,ue,26,12,"tr",9),e(49,`
            `),r(),e(50,`
          `),r(),e(51,`
          `),f(52,he,16,3,"c-pagination",10),e(53,`
        `),r(),e(54,`
      `),r(),e(55,`
    `),r(),e(56,`
`),r()),o&2&&(a(5),s("routerLink",k(7,pe)),a(12),M("ngModel",i.searchTerm),a(3),s("hover",!0)("striped",!0)("bordered",!0),a(28),s("ngForOf",i.paginatedEmployeeList),a(4),s("ngIf",i.employeeList.length>i.itemsPerPage))},dependencies:[N,B,V,A,Z,G,R,q,z,j,H,le,oe,ee,te,ie,ae,re,ne,Y,$,W,X,Q,K,J]})}}return l})();export{Ae as ListEmployeesComponent};
