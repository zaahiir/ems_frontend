import './polyfills.server.mjs';
import{a as he}from"./chunk-ND5M5W3N.mjs";import{Ba as W,Ja as z,ra as H}from"./chunk-7JE25W2O.mjs";import{a as _e}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{$ as ie,F as X,N as Z,Na as ue,Oa as ge,S as ee,T as te,aa as ne,b as q,ba as re,j as J,oa as oe,pa as ae,q as K,r as Q,ra as le,ta as se,ua as ce,wa as me,ya as de,za as pe}from"./chunk-B4NKEOAB.mjs";import{e as G}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{$b as R,$c as Y,Db as v,F as I,Fb as u,Gb as d,K as M,Lc as $,Mc as O,Qb as e,Rb as b,Sa as a,Sb as F,Sc as j,Ta as y,Tb as D,V as S,Vb as U,Wb as A,Xb as N,Zb as B,_b as V,f as C,ia as P,lb as f,mb as T,nb as m,sa as g,ta as h,ua as _,va as E,xb as n,yb as r,zb as w}from"./chunk-S7ATBOQE.mjs";import{g as ke,h as k}from"./chunk-COT65Y5O.mjs";var p=ke(_e());var we=()=>["/forms/marketing/add"],ve=l=>["/forms/marketing/update",l];function Ce(l,x){if(l&1){let t=v();n(0,"button",19),u("click",function(){g(t);let i=d().$implicit,s=d();return h(s.previewFile(i.id,i.marketingFile))}),e(1),r()}if(l&2){let t=d().$implicit,o=d();a(),F(`
                  `,o.getFileName(t.marketingFile),`
                `)}}function Se(l,x){l&1&&(n(0,"span"),e(1,"No file"),r())}function Ee(l,x){if(l&1){let t=v();n(0,"tr"),e(1,`
              `),n(2,"th"),e(3),r(),e(4,`
              `),n(5,"td"),e(6),r(),e(7,`
              `),n(8,"td"),e(9),r(),e(10,`
              `),n(11,"td"),e(12),r(),e(13,`
              `),n(14,"td"),e(15,`
                `),f(16,Ce,2,1,"button",11),e(17,`
                `),f(18,Se,2,0,"span",12),e(19,`
              `),r(),e(20,`
              `),n(21,"td"),e(22,`
                `),n(23,"a",13),_(),w(24,"svg",14),r(),e(25,`
                `),E(),n(26,"a",15),u("click",function(){let i=g(t).$implicit,s=d();return h(s.shareMedia(i.id))}),_(),w(27,"svg",16),r(),e(28,`
                `),E(),n(29,"a",17),u("click",function(){let i=g(t).$implicit,s=d();return h(s.deleteForm(i.id))}),_(),w(30,"svg",18),r(),e(31,`
              `),r(),e(32,`
            `),r()}if(l&2){let t=x.$implicit,o=x.index,i=d();a(3),b((i.currentPage-1)*i.itemsPerPage+o+1),a(3),b(t.marketingAmcName),a(3),b(t.marketingType),a(3),b(t.marketingDescription),a(4),m("ngIf",t.marketingFile),a(2),m("ngIf",!t.marketingFile),a(5),m("routerLink",R(13,ve,t.id))("cTooltip",i.tooltipEditText),a(),m("cIcon",i.icons.cilPen),a(2),m("cTooltip",i.tooltipShareText),a(),m("cIcon",i.icons.cilShare),a(2),m("cTooltip",i.tooltipDeleteText),a(),m("cIcon",i.icons.cilTrash)}}function ye(l,x){if(l&1){let t=v();n(0,"c-pagination",20),e(1,`
            `),n(2,"c-page-item"),e(3,`
              `),n(4,"a",21),u("click",function(){g(t);let i=d();return h(i.previousPage())}),e(5,"Previous"),r(),e(6,`
            `),r(),e(7,`
            `),n(8,"c-page-item"),e(9,`
              `),n(10,"a",22),e(11),r(),e(12,`
            `),r(),e(13,`
            `),n(14,"c-page-item"),e(15,`
              `),n(16,"a",21),u("click",function(){g(t);let i=d();return h(i.nextPage())}),e(17,"Next"),r(),e(18,`
            `),r(),e(19,`
          `),r()}if(l&2){let t=d();a(4),T("aria-disabled",t.currentPage===1),a(7),D("",t.currentPage," / ",t.totalPages,""),a(5),T("aria-disabled",!t.nextCursor)}}var Ke=(()=>{class l{constructor(t,o){this.marketingService=t,this.http=o,this.icons={cilPen:H,cilTrash:z,cilShare:W},this.tooltipEditText="Edit",this.tooltipDeleteText="Delete",this.tooltipShareText="Share on SocialMedia",this.marketingList=[],this.pageRange=[],this.currentPage=1,this.itemsPerPage=10,this.searchTerm="",this.totalItems=0,this.totalPages=1,this.isLoading=!1,this.nextCursor=null,this.prevCursors=[],this.searchTerms=new C,this.currentSearchTerms={},this.unsubscribe$=new C}getFileName(t){if(!t)return"";let o=t.split("/");return o[o.length-1]}ngOnInit(){return k(this,null,function*(){yield this.loadMarketingList(),this.setupSearch()})}setupSearch(){this.searchTerms.pipe(S(this.unsubscribe$),I(300),M()).subscribe(t=>{this.searchTerm=t,this.resetPagination(),this.loadMarketingList()})}search(t){let o=t.target;this.searchTerms.next(o.value)}resetPagination(){this.currentPage=1}nextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.loadMarketingList())}previousPage(){this.currentPage>1&&(this.currentPage--,this.loadMarketingList())}previewFile(t,o){if(!o){p.default.fire("Error","No file path provided","error");return}let i=this.marketingService.getFullUrl(o);window.open(i,"_blank")}getFullUrl(t){return t?this.marketingService.getFullUrl(t):""}shareMedia(t){this.marketingService.getShareLinks(t).then(o=>{if(o.data.code===1){let i=o.data.data,s=i.file_url,c=s.split("/").pop(),L=encodeURIComponent(i.title),xe=`https://web.whatsapp.com/send?text=${L}%20${encodeURIComponent(s)}`,fe=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(s)}`,be=`https://t.me/share/url?url=${encodeURIComponent(s)}&text=${L}`;p.default.fire({title:"Share Marketing Material",html:`
            <p>Choose an action:</p>
            <button id="download-btn" class="swal2-confirm swal2-styled">Download File</button>
            <button id="whatsapp-btn" class="swal2-confirm swal2-styled">Share to WhatsApp</button>
            <button id="telegram-btn" class="swal2-confirm swal2-styled">Share to Telegram</button>
            <button id="facebook-btn" class="swal2-confirm swal2-styled">Share to Facebook</button>
            <button id="youtube-btn" class="swal2-confirm swal2-styled">Upload to YouTube</button>
            <button id="instagram-btn" class="swal2-confirm swal2-styled">Share on Instagram</button>
          `,showConfirmButton:!1,showCloseButton:!0,focusConfirm:!1,didOpen:()=>{document.getElementById("download-btn")?.addEventListener("click",()=>this.downloadFile(s,c)),document.getElementById("whatsapp-btn")?.addEventListener("click",()=>window.open(xe,"_blank")),document.getElementById("telegram-btn")?.addEventListener("click",()=>window.open(be,"_blank")),document.getElementById("facebook-btn")?.addEventListener("click",()=>window.open(fe,"_blank")),document.getElementById("youtube-btn")?.addEventListener("click",()=>this.openYouTubeUpload()),document.getElementById("instagram-btn")?.addEventListener("click",()=>this.openInstagramApp())}})}else p.default.fire("Error","Failed to generate share links","error")}).catch(o=>{console.error("Error fetching share links:",o),p.default.fire("Error","An error occurred while generating the share links","error")})}downloadFile(t,o){this.http.get(t,{responseType:"blob"}).subscribe(i=>{let s=window.URL.createObjectURL(i),c=document.createElement("a");c.href=s,c.download=o,c.style.display="none",document.body.appendChild(c),c.click(),document.body.removeChild(c),window.URL.revokeObjectURL(s)},i=>{console.error("Download failed:",i),p.default.fire("Error","Failed to download the file. Please try again.","error")})}openYouTubeUpload(){window.open("https://studio.youtube.com/channel/upload","_blank")}openInstagramApp(){window.location.href="instagram://",setTimeout(()=>{window.location.href="https://www.instagram.com/"},1e3)}loadMarketingList(){return k(this,null,function*(){this.isLoading||(this.isLoading=!0,this.marketingService.listsMarketing(this.currentPage,this.itemsPerPage,this.searchTerm).pipe(S(this.unsubscribe$)).subscribe(t=>{this.handleResponse(t)},t=>{this.handleError(t)}))})}handleResponse(t){this.isLoading=!1,t&&t.code===1&&Array.isArray(t.data)?(this.marketingList=t.data,this.totalItems=t.total_count||0,this.totalPages=t.total_pages||1,this.currentPage=t.current_page||1):(console.error("Unexpected API response structure:",t),p.default.fire("Error","Failed to load AUM list: Unexpected API response structure","error"))}handleError(t){this.isLoading=!1,console.error("Error loading AUM list:",t),p.default.fire("Error","An error occurred while loading the AUM list","error")}get paginatedMarketingList(){return this.marketingList}deleteForm(t){return k(this,null,function*(){if((yield p.default.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{yield this.marketingService.deleteMarketing(t.toString()),yield p.default.fire("Deleted!","Form has been deleted.","success"),yield this.loadMarketingList()}catch(i){console.error("Error deleting form:",i),yield p.default.fire("Error","An error occurred while deleting the form","error")}})}static{this.\u0275fac=function(o){return new(o||l)(y(he),y(Y))}}static{this.\u0275cmp=P({type:l,selectors:[["app-list-marketing"]],standalone:!0,features:[B],decls:57,vars:8,consts:[["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3"],[1,"col-auto"],["cButton","","color","primary","role","button",3,"routerLink"],["md","3",1,"mb-4","flex","justify-content-md-end"],["cFormControl","","id","searchInput","type","search","placeholder","search",3,"input","ngModelChange","ngModel"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Page navigation",4,"ngIf"],["class","btn btn-link p-0",3,"click",4,"ngIf"],[4,"ngIf"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-primary","border-0","py-0",3,"routerLink","cTooltip"],["size","xl","title","List Icon",3,"cIcon"],["cButton","","color","btn-transparent","role","button","cTooltipPlacement","top",1,"btn-sm","text-secondary","border-0","py-0",3,"click","cTooltip"],["size","xl","title","Share  Icon",3,"cIcon"],["role","button","cTooltipPlacement","top",1,"btn-sm","text-danger","border-0","py-0",3,"click","cTooltip"],["width","25","title","List Icon",3,"cIcon"],[1,"btn","btn-link","p-0",3,"click"],["aria-label","Page navigation"],["cPageLink","",3,"click"],["cPageLink",""]],template:function(o,i){o&1&&(n(0,"c-col",0)(1,"c-card",1)(2,"c-card-body")(3,"form",2)(4,"div",3)(5,"a",4),e(6,"Create New Marketing Form"),r()()()()()(),n(7,"c-row"),e(8,`
    `),n(9,"c-col",0),e(10,`
      `),n(11,"c-card",1),e(12,`
        `),n(13,"c-card-body"),e(14,`
          `),n(15,"c-col",5),e(16,`
          `),n(17,"input",6),u("input",function(c){return i.search(c)}),N("ngModelChange",function(c){return A(i.searchTerm,c)||(i.searchTerm=c),c}),r(),e(18,`
          `),r(),e(19,`
          `),n(20,"table",7),e(21,`
            `),n(22,"thead"),e(23,`
            `),n(24,"tr"),e(25,`
              `),n(26,"th",8),e(27,"S.No"),r(),e(28,`
              `),n(29,"th",8),e(30,"AMC Name"),r(),e(31,`
              `),n(32,"th",8),e(33,"File Type"),r(),e(34,`
              `),n(35,"th",8),e(36,"Description"),r(),e(37,`
              `),n(38,"th",8),e(39,"File Upload"),r(),e(40,`
              `),n(41,"th",8),e(42,"Action"),r(),e(43,`  
            `),r(),e(44,`
            `),r(),e(45,`
            `),n(46,"tbody"),e(47,`
            `),f(48,Ee,33,15,"tr",9),e(49,`
            `),r(),e(50,`
          `),r(),e(51,`
          `),f(52,ye,20,4,"c-pagination",10),e(53,`
        `),r(),e(54,`
      `),r(),e(55,`
    `),r(),e(56,`
`),r()),o&2&&(a(5),m("routerLink",V(7,we)),a(12),U("ngModel",i.searchTerm),a(3),m("hover",!0)("striped",!0)("bordered",!0),a(28),m("ngForOf",i.paginatedMarketingList),a(4),m("ngIf",i.totalItems>i.itemsPerPage))},dependencies:[j,$,O,ae,q,G,te,ee,K,Q,ge,pe,le,se,ce,ue,de,me,X,Z,J,oe,re,ne,ie]})}}return l})();export{Ke as ListMarketingComponent};
