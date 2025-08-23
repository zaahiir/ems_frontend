import{a as ue}from"./chunk-PTDH2SQH.js";import{Ba as j,H as G,Ja as z,ra as H}from"./chunk-HZTH2PGK.js";import{a as Ce}from"./chunk-AJEUVWKL.js";import{Aa as le,Ba as ce,Da as se,Fa as me,Ga as pe,M as Q,U as X,Ua as de,Va as he,Z,_ as ee,b as K,ga as te,ha as ie,ia as ne,q as Y,va as re,wa as oe,x as q,y as J,ya as ae}from"./chunk-K3LN6DFK.js";import{$ as g,$a as d,A as L,Ga as w,H as S,Ha as P,Ia as c,Lb as $,Mb as O,S as W,Sa as i,Sb as U,Ta as n,Ua as C,Ya as T,Z as u,_ as x,_a as h,aa as b,c as v,gc as R,jb as e,kb as f,mb as D,ob as F,pa as o,pb as V,qa as A,qb as M,sb as N,tb as B,ub as E,x as k}from"./chunk-WAGJM7NU.js";import{f as ge,g as I}from"./chunk-MYAK5QVS.js";var s=ge(Ce());var fe=()=>["/clients/add"],be=l=>["/clients/update",l],_e=l=>["/clients/view",l];function ve(l,_){if(l&1){let t=T();i(0,"tr"),e(1,`
              `),i(2,"th"),e(3),n(),e(4,`
              `),i(5,"td"),e(6),n(),e(7,`
              `),i(8,"td"),e(9),n(),e(10,`
              `),i(11,"td"),e(12),n(),e(13,`
              `),i(14,"td"),e(15,`
                `),i(16,"a",11),g(),C(17,"svg",12),n(),e(18,`
                `),b(),i(19,"a",13),g(),C(20,"svg",14),n(),e(21,`
                `),b(),i(22,"a",15),h("click",function(){let r=u(t).$implicit,m=d();return x(m.shareOnWhatsApp(r))}),g(),C(23,"svg",16),n(),e(24,`
                `),b(),i(25,"a",17),h("click",function(){let r=u(t).$implicit,m=d();return x(m.deleteClient(r.id))}),g(),C(26,"svg",18),n(),e(27,`
              `),n(),e(28,`
            `),n()}if(l&2){let t=_.$implicit,a=_.index,r=d();o(3),f((r.currentPage-1)*r.itemsPerPage+a+1),o(3),f(t.clientName),o(3),f(t.clientEmail),o(3),f(t.full_mobile),o(4),c("routerLink",E(14,be,t.id))("cTooltip",r.tooltipEditText),o(),c("cIcon",r.icons.cilPen),o(2),c("routerLink",E(16,_e,t.id))("cTooltip",r.tooltipViewText),o(),c("cIcon",r.icons.cilCheck),o(2),c("cTooltip",r.tooltipShareText),o(),c("cIcon",r.icons.cilShare),o(2),c("cTooltip",r.tooltipDeleteText),o(),c("cIcon",r.icons.cilTrash)}}function Se(l,_){if(l&1){let t=T();i(0,"c-pagination",19),e(1,`
            `),i(2,"c-page-item"),e(3,`
              `),i(4,"a",20),h("click",function(){u(t);let r=d();return x(r.previousPage())}),e(5,"Previous"),n(),e(6,`
            `),n(),e(7,`
            `),i(8,"c-page-item"),e(9,`
              `),i(10,"a",21),e(11),n(),e(12,`
            `),n(),e(13,`
            `),i(14,"c-page-item"),e(15,`
              `),i(16,"a",20),h("click",function(){u(t);let r=d();return x(r.nextPage())}),e(17,"Next"),n(),e(18,`
            `),n(),e(19,`
          `),n()}if(l&2){let t=d();o(4),P("aria-disabled",t.currentPage===1),o(7),D("",t.currentPage," / ",t.totalPages,""),o(5),P("aria-disabled",!t.nextCursor)}}var je=(()=>{class l{constructor(t){this.clientService=t,this.icons={cilPen:H,cilTrash:z,cilShare:j,cilCheck:G},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.tooltipShareText="Share on WhatsApp",this.tooltipViewText="View Details",this.client=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new v,this.currentSearchTerms={},this.unsubscribe$=new v}ngOnInit(){this.loadClient(),this.setupSearch()}setupSearch(){this.searchTerms.pipe(S(this.unsubscribe$),k(300),L()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadClient()})}search(t){let a=t.target;this.searchTerms.next(a.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadClient())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadClient())}shareOnWhatsApp(t){return I(this,null,function*(){let a=this.formatPhoneNumber(t.clientPhone),m=`Please check the client details here:
${`${window.location.origin}/clients/${t.id}`}`,p=encodeURIComponent(m),xe=`https://web.whatsapp.com/send?phone=${a}&text=${p}`;try{if(yield s.default.fire({title:"Opening WhatsApp Web",text:`Preparing to send message to ${t.clientName}...`,icon:"info",showConfirmButton:!1,timer:2e3}),window.open(xe,"_blank"))yield s.default.fire({title:"WhatsApp Web Opened",html:`
            <p>WhatsApp Web has been opened in a new tab with the pre-filled message for ${t.clientName}.</p>
            <p>Please follow these steps:</p>
            <ol>
              <li>Switch to the newly opened WhatsApp Web tab</li>
              <li>Wait for WhatsApp Web to load completely</li>
              <li>Click the send button to share the update link</li>
              <li>Close the WhatsApp Web tab when done</li>
            </ol>
          `,icon:"success",confirmButtonText:"OK"});else throw new Error("Popup blocked")}catch(y){console.error("Error opening WhatsApp Web:",y),yield s.default.fire({title:"Error",text:"There was an error opening WhatsApp Web. Please ensure popups are allowed for this site and try again.",icon:"error",confirmButtonText:"OK"})}})}formatPhoneNumber(t){let a=t.replace(/\D/g,"");return a.startsWith("91")?a:`91${a}`}loadClient(){this.isLoading||(this.isLoading=!0,this.clientService.listsClient(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(S(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.client=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),s.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),s.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedClient(){return this.client}deleteClient(t){s.default.fire({title:"Are you sure?",text:"This will permanently delete the client and all related data. You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(a=>{a.isConfirmed&&this.clientService.deleteClient(t.toString()).then(r=>{r.data.code===1?(s.default.fire("Deleted!","Client and all related data have been deleted.","success"),this.loadClient()):s.default.fire("Error","Failed to delete Client","error")}).catch(r=>{console.error("Error deleting client:",r),s.default.fire("Error","An error occurred while deleting the client","error")})})}static{this.\u0275fac=function(a){return new(a||l)(A(ue))}}static{this.\u0275cmp=W({type:l,selectors:[["app-list-clients"]],standalone:!0,features:[N],decls:54,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","validationCustom02","type","search","placeholder","search client",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation example",4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","Edit Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-dark","border-0","py-0",3,"routerLink","cTooltip"],["width","25","title","Share  Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-secondary","border-0","py-0",3,"click","cTooltip"],["size","xl","title","Share  Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","Delete Icon",3,"cIcon"],["aria-label","Page navigation example"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(a,r){a&1&&(i(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create Client"),n()()()()()(),i(7,"c-row"),e(8,`
    `),i(9,"c-col",0),e(10,`
      `),i(11,"c-card",1),e(12,`
        `),i(13,"c-card-body"),e(14,`
          `),i(15,"c-col",5),e(16,`
          `),i(17,"input",6),h("input",function(p){return r.search(p)}),M("ngModelChange",function(p){return V(r.searchTerm,p)||(r.searchTerm=p),p}),n(),e(18,`
          `),n(),e(19,`
          `),i(20,"table",7),e(21,`
            `),i(22,"thead"),e(23,`
            `),i(24,"tr"),e(25,`
              `),i(26,"th",8),e(27,"S.No"),n(),e(28,`
              `),i(29,"th",8),e(30,"Client Name"),n(),e(31,`
              `),i(32,"th",8),e(33,"Email"),n(),e(34,`
              `),i(35,"th",8),e(36,"Phone"),n(),e(37,`
              `),i(38,"th",8),e(39,"Action"),n(),e(40,`  
            `),n(),e(41,`
            `),n(),e(42,`
            `),i(43,"tbody"),e(44,`
            `),w(45,ve,29,18,"tr",9),e(46,`
            `),n(),e(47,`
          `),n(),e(48,`
          `),w(49,Se,20,4,"c-pagination",10),e(50,`
        `),n(),e(51,`
      `),n(),e(52,`
    `),n(),e(53,`
`),n()),a&2&&(o(5),c("routerLink",B(7,fe)),o(12),F("ngModel",r.searchTerm),o(3),c("hover",!0)("striped",!0)("bordered",!0),o(25),c("ngForOf",r.paginatedClient),o(4),c("ngIf",r.totalItems>r.itemsPerPage))},dependencies:[U,$,O,oe,K,R,ee,Z,q,J,he,pe,ae,le,ce,de,me,se,Q,X,Y,re,ne,ie,te]})}}return l})();export{je as ListClientsComponent};
