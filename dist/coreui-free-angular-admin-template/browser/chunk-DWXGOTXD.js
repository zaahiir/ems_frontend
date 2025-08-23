import{a as ue}from"./chunk-DUJ2QR6G.js";import{a as ce}from"./chunk-MTLOIHVI.js";import{a as me}from"./chunk-3IPB5M6Y.js";import{a as ye}from"./chunk-AJEUVWKL.js";import{Aa as K,B,Ba as Q,Ga as Z,Ha as ee,Ja as te,M as R,Ma as ie,N as H,Na as ne,O as j,Oa as re,P as $,Pa as ae,Q as G,Ra as oe,Ta as le,U as z,Ua as se,V as W,Va as de,Z as X,_ as Y,q as P,x as V,y as O,ya as J,za as p}from"./chunk-K3LN6DFK.js";import{$a as N,Ga as u,H as v,Ia as l,Lb as U,Mb as k,S as w,Sa as i,Sb as L,Ta as n,Ua as y,Ya as _,Z as g,_ as E,_a as C,c as D,dc as A,fc as q,jb as e,kb as h,lb as M,pa as s,q as T,qa as b,sb as I}from"./chunk-WAGJM7NU.js";import{f as fe,g as S}from"./chunk-MYAK5QVS.js";var c=fe(ye());function he(o,m){if(o&1&&(i(0,"option",54),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),h(t.amcName)}}function xe(o,m){o&1&&(i(0,"c-form-feedback",55),e(1,"Please select a Fund House."),n()),o&2&&l("valid",!1)}function Fe(o,m){if(o&1&&(i(0,"option",54),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),h(t.fundName)}}function ge(o,m){o&1&&(i(0,"c-form-feedback",55),e(1,"Please select a Fund Name."),n()),o&2&&l("valid",!1)}function Ee(o,m){o&1&&(i(0,"c-form-feedback",55),e(1,"Please provide a Folio Number."),n()),o&2&&l("valid",!1)}function be(o,m){o&1&&(i(0,"c-form-feedback",55),e(1,"Please provide a valid Amount."),n()),o&2&&l("valid",!1)}function Ce(o,m){o&1&&(i(0,"c-form-feedback",55),e(1,"Please provide a Cheque Number."),n()),o&2&&l("valid",!1)}function ve(o,m){if(o&1&&(i(0,"option",54),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),h(t.transcationModeName)}}function Ne(o,m){o&1&&(i(0,"c-form-feedback",55),e(1,"Please select a Transaction Mode."),n()),o&2&&l("valid",!1)}function Se(o,m){if(o&1&&(i(0,"option",54),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),h(t.issueTypeName)}}function _e(o,m){o&1&&(i(0,"c-form-feedback",55),e(1,"Please select a Transaction Type."),n()),o&2&&l("valid",!1)}function De(o,m){o&1&&(i(0,"span",56),e(1," "),i(2,"small"),e(3,"(Available only for Offline transactions)"),n(),e(4," "),n())}function Te(o,m){if(o&1&&(i(0,"c-form-feedback",55),e(1),n()),o&2){let t=N();l("valid",!1),s(),h(t.fileError)}}function we(o,m){if(o&1){let t=_();i(0,"div",57),e(1,`
                `),i(2,"div",58),e(3,`
                  `),i(4,"div",59),e(5,`
                    `),i(6,"span",60),e(7),n(),e(8,`
                    `),i(9,"a",61),C("click",function(){g(t);let a=N();return E(a.onExistingFileClick())}),e(10,`
                      `),i(11,"small")(12,"strong"),e(13),n()(),e(14,`
                    `),n(),e(15,`
                    `),i(16,"span",62),e(17,`
                      `),i(18,"small"),e(19),n(),e(20,`
                    `),n(),e(21,`
                  `),n(),e(22,`
                  `),i(23,"button",63),C("click",function(){g(t);let a=N();return E(a.removeExistingFile())}),e(24,`
                    `),i(25,"small"),e(26,"\u2715"),n(),e(27,`
                  `),n(),e(28,`
                `),n(),e(29,`
                `),i(30,"div",64),e(31,`
                  `),i(32,"small",56),e(33,"Existing document"),n(),e(34,`
                `),n(),e(35,`
              `),n()}if(o&2){let t=N();s(7),h(t.getFileIcon(t.existingFileName)),s(2),l("title",t.canViewInBrowser(t.existingFileName)?"Click to view":"Click to download"),s(4),h(t.existingFileName),s(6),h(t.canViewInBrowser(t.existingFileName)?"View":"Download")}}function Me(o,m){if(o&1&&(i(0,"div",65),e(1,`
                `),i(2,"div",59),e(3,`
                  `),i(4,"span",60),e(5),n(),e(6,`
                  `),i(7,"span",66),e(8,`
                    `),i(9,"small")(10,"strong"),e(11),n()(),e(12,`
                  `),n(),e(13,`
                  `),i(14,"span",67),e(15,`
                    `),i(16,"small"),e(17,"New"),n(),e(18,`
                  `),n(),e(19,`
                `),n(),e(20,`
                `),i(21,"div",64),e(22,`
                  `),i(23,"small",56),e(24),n(),e(25,`
                `),n(),e(26,`
              `),n()),o&2){let t=N();s(5),h(t.getFileIcon(t.selectedFile.name)),s(6),h(t.selectedFile.name),s(13),M("New file selected (",(t.selectedFile.size/1024/1024).toFixed(2)," MB)")}}var ze=(()=>{class o{constructor(t,r,a,d,f,x){this.fb=t,this.route=r,this.router=a,this.dailyEntryService=d,this.issueService=f,this.amcService=x,this.submitted=!1,this.customStylesValidated=!1,this.loading=!1,this.fileError="",this.selectedFile=null,this.existingFileUrl="",this.existingFileName="",this.shouldRemoveExistingFile=!1,this.hasExistingFile=!1,this.isFileUploadDisabled=!0,this.amcList=[],this.fundList=[],this.issueTypes=[],this.transactionModes=[],this.destroy$=new D,this.dailyEntryForm=this.initForm()}ngOnInit(){this.entryId=this.route.snapshot.params.id,this.shouldRemoveExistingFile=!1,this.loadInitialData()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initForm(){return this.fb.group({searchTerm:[""],applicationDate:["",p.required],clientPanNumber:["",p.required],clientName:["",p.required],clientPhoneCountryCode:["",p.required],clientMobileNumber:["",p.required],clientFolioNumber:[""],fundHouse:["",p.required],fundName:["",p.required],amount:["",[p.required,p.min(0)]],clientChequeNumber:[""],transactionType:["",p.required],transactionMode:["",p.required],sipDate:["",p.required],transactionAddDetail:["",p.required],staffName:["",p.required]})}loadInitialData(){return S(this,null,function*(){this.showLoader("Loading data..."),T({amcs:this.amcService.getAmc(),issueTypes:this.issueService.getIssueType(),transactionModes:this.dailyEntryService.getTransactionModes()}).pipe(v(this.destroy$)).subscribe({next:t=>S(this,null,function*(){console.log("API Responses:",t),this.amcList=t.amcs.data||[],this.issueTypes=t.issueTypes.data||[],Array.isArray(t.transactionModes)?this.transactionModes=t.transactionModes:t.transactionModes&&t.transactionModes.data?this.transactionModes=t.transactionModes.data:this.transactionModes=[],console.log("Transaction Modes:",this.transactionModes);try{yield this.loadExistingEntry(),this.setupFormListeners()}catch(r){console.error("Error loading existing entry:",r),c.default.fire("Error","Failed to load entry data. Please try again.","error")}}),error:t=>{console.error("Error loading initial data:",t),c.default.fire("Error","Failed to load initial data. Please try again.","error")},complete:()=>{this.hideLoader()}})})}setupFormListeners(){this.dailyEntryForm.get("fundHouse")?.valueChanges.pipe(v(this.destroy$)).subscribe(r=>{r?this.loadFundsByAmc(r):(this.fundList=[],this.dailyEntryForm.get("fundName")?.setValue(""),this.dailyEntryForm.get("fundName")?.disable())}),this.dailyEntryForm.get("transactionMode")?.valueChanges.pipe(v(this.destroy$)).subscribe(r=>{this.handleTransactionModeChange(r)});let t=this.dailyEntryForm.get("transactionMode")?.value;t&&this.handleTransactionModeChange(t)}handleTransactionModeChange(t){if(console.log("Transaction Mode ID received:",t),!t||t===""){this.isFileUploadDisabled=!0,console.log("No transaction mode selected, disabling file upload");return}let r=this.transactionModes.find(a=>a.id==t);if(console.log("Selected transaction mode:",r),r){let a=r.id===2||r.transcationModeName.toLowerCase()==="offline";this.isFileUploadDisabled=!a,console.log("Transaction Mode:",r.transcationModeName,"Is Offline:",a,"File Upload Disabled:",this.isFileUploadDisabled),!a&&this.selectedFile&&this.clearFileSelection()}else this.isFileUploadDisabled=!0,console.log("Transaction mode not found in list, disabling file upload")}clearFileSelection(){if(this.selectedFile){this.selectedFile=null,this.fileError="";let t=document.getElementById("dailyEntryFile");t&&(t.value=""),c.default.fire({title:"File Cleared",text:"File upload is only available for Offline transactions. Your selected file has been cleared.",icon:"info",timer:3e3,showConfirmButton:!1,toast:!0,position:"top-end"})}}searchClient(){let t=this.dailyEntryForm.get("searchTerm")?.value;t?(this.showLoader("Searching Client..."),this.dailyEntryService.getClientDetails(t).subscribe(r=>{if(this.hideLoader(),r.code===1){let a=r.data;this.patchClientDetails(a)}else c.default.fire("Not Found","No client found with the given PAN or mobile number.","info")},r=>{this.hideLoader(),console.error("Error searching client:",r),c.default.fire("Error","An error occurred while searching for the client.","error")})):c.default.fire("Error","Please enter a search term.","error")}patchClientDetails(t){this.dailyEntryForm.patchValue({clientName:t.client_name,clientPanNumber:t.client_pan_no,clientPhoneCountryCode:t.client_phone_dial_code,clientMobileNumber:t.client_phone})}loadExistingEntry(){return S(this,null,function*(){try{let t=yield this.dailyEntryService.getDailyEntryById(this.entryId.toString()).toPromise();if(t&&t.code===1&&t.data){let r=t.data;this.shouldRemoveExistingFile=!1,r.dailyEntryFile?(this.hasExistingFile=!0,this.existingFileUrl=r.dailyEntryFile,this.existingFileName=this.extractFileNameFromUrl(r.dailyEntryFile)):(this.hasExistingFile=!1,this.existingFileUrl="",this.existingFileName="");let a=null;if(r.dailyEntryFundHouse){let F=this.amcList.find(pe=>pe.amcName===r.dailyEntryFundHouse);F&&(a=F.id)}a&&(yield this.loadFundsByAmc(a));let d=this.fundList.find(F=>F.fundName===r.dailyEntryFundName),f=this.issueTypes.find(F=>F.issueTypeName===r.dailyEntryIssueType),x=this.transactionModes.find(F=>F.transcationModeName===r.dailyEntryTranscationMode);this.dailyEntryForm.patchValue({applicationDate:r.applicationDate,clientPanNumber:r.dailyEntryClientPanNumber,clientName:r.dailyEntryClientName,clientPhoneCountryCode:r.dailyEntryClientCountryCode,clientMobileNumber:r.dailyEntryClientMobileNumber,clientFolioNumber:r.dailyEntryClientFolioNumber,fundHouse:a,fundName:d?d.id:"",amount:r.dailyEntryAmount,clientChequeNumber:r.dailyEntryClientChequeNumber,transactionType:f?f.id:"",transactionMode:x?x.id:"",sipDate:r.dailyEntrySipDate,transactionAddDetail:r.dailyEntryTransactionAddDetails,staffName:r.dailyEntryStaffName},{emitEvent:!1}),this.fundList.length>0&&this.dailyEntryForm.get("fundName")?.enable(),x&&this.handleTransactionModeChange(x.id)}else this.handleErrorResponse("Failed to load entry data or no data found.")}catch(t){console.error("Error loading existing entry:",t),this.handleErrorResponse("An error occurred while loading the entry data.")}})}loadFundsByAmc(t){return S(this,null,function*(){this.showLoader("Loading funds...",!0);try{let r=yield this.dailyEntryService.getFundsByAmc(t).toPromise();if(r&&r.data){this.fundList=r.data;let a=this.dailyEntryForm.get("fundName");a&&(this.fundList.length>0?a.enable():(a.disable(),a.setValue("")))}else this.fundList=[],this.dailyEntryForm.get("fundName")?.disable(),this.dailyEntryForm.patchValue({fundName:""})}catch(r){console.error("Error loading funds:",r),this.fundList=[],this.dailyEntryForm.get("fundName")?.disable(),this.dailyEntryForm.patchValue({fundName:""})}finally{this.hideLoader()}})}resetFileState(){this.selectedFile=null,this.fileError="",this.shouldRemoveExistingFile=!1;let t=document.getElementById("dailyEntryFile");t&&(t.value="")}onFileChange(t){let r=t.target.files[0];if(this.fileError="",r){if(!["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(r.type)){this.fileError="Only PDF, DOC, and DOCX files are allowed.",t.target.value="",this.selectedFile=null;return}if(r.size>5242880){this.fileError="File size must be less than 5MB.",t.target.value="",this.selectedFile=null;return}this.selectedFile=r}else this.selectedFile=null}extractFileNameFromUrl(t){let r=t.split("/");return r[r.length-1].split("?")[0]}getFileExtension(t){return t.split(".").pop()?.toLowerCase()||""}canViewInBrowser(t){let r=this.getFileExtension(t);return["pdf","jpg","jpeg","png","gif","bmp","svg"].includes(r)}onExistingFileClick(){if(!this.existingFileUrl)return;let t=this.dailyEntryService.getFileUrl(this.existingFileUrl);console.log("Opening file URL:",t),this.canViewInBrowser(this.existingFileName)?window.open(t,"_blank"):this.downloadFileWithAuth(this.existingFileUrl,this.existingFileName)}downloadFileWithAuth(t,r){this.showLoader("Downloading file...",!0),this.dailyEntryService.downloadFile(t).pipe(v(this.destroy$)).subscribe({next:a=>{this.hideLoader();let d=window.URL.createObjectURL(a),f=document.createElement("a");f.href=d,f.download=r,document.body.appendChild(f),f.click(),document.body.removeChild(f),window.URL.revokeObjectURL(d)},error:a=>{this.hideLoader(),console.error("Error downloading file:",a),c.default.fire("Error","Failed to download file. Please try again.","error")}})}downloadFile(t,r){let a=this.dailyEntryService.getFileUrl(t),d=document.createElement("a");d.href=a,d.download=r,d.target="_blank",document.body.appendChild(d),d.click(),document.body.removeChild(d)}getFileIcon(t){switch(this.getFileExtension(t)){case"pdf":return"\u{1F4C4}";case"doc":case"docx":return"\u{1F4DD}";case"jpg":case"jpeg":case"png":case"gif":case"bmp":case"svg":return"\u{1F5BC}\uFE0F";default:return"\u{1F4CE}"}}removeExistingFile(){c.default.fire({title:"Remove File?",text:"Are you sure you want to remove the existing file? This action cannot be undone.",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, remove it",cancelButtonText:"Cancel",confirmButtonColor:"#d33"}).then(t=>{t.isConfirmed&&(this.hasExistingFile=!1,this.existingFileUrl="",this.existingFileName="",this.shouldRemoveExistingFile=!0,c.default.fire({title:"File Marked for Removal",text:"The file will be permanently deleted when you save the form.",icon:"info",timer:2e3,showConfirmButton:!1}))})}get f(){return this.dailyEntryForm.controls}handleErrorResponse(t){c.default.fire("Error",t,"error")}getMissingRequiredFields(){let t=[];return Object.keys(this.dailyEntryForm.controls).forEach(r=>{let a=this.dailyEntryForm.get(r);a&&a.errors&&"required"in a.errors&&a.errors.required&&t.push(this.getFieldDisplayName(r))}),t}getFieldDisplayName(t){return{searchTerm:"Search Term",applicationDate:"Application Date",clientPanNumber:"Client PAN",clientName:"Client Name",clientPhoneCountryCode:"Country Code",clientMobileNumber:"Mobile Number",fundHouse:"Fund House",fundName:"Fund Name",amount:"Amount",transactionType:"Transaction Type",transactionMode:"Transaction Mode",sipDate:"SIP Date",transactionAddDetail:"Transaction Details",staffName:"Staff Name"}[t]||t}showMissingFieldsAlert(t){let r=t.join(", ");c.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br><strong>${r}</strong>`,icon:"warning",confirmButtonText:"Ok"})}onSubmit(){if(this.customStylesValidated=!0,this.submitted=!0,this.dailyEntryForm.invalid){let r=this.getMissingRequiredFields();if(r.length>0){this.showMissingFieldsAlert(r);return}}if(this.loading)return;this.loading=!0,this.showLoader("Updating...");let t=new FormData;t.append("applicationDate",this.dailyEntryForm.get("applicationDate")?.value||""),t.append("dailyEntryClientPanNumber",this.dailyEntryForm.get("clientPanNumber")?.value||""),t.append("dailyEntryClientName",this.dailyEntryForm.get("clientName")?.value||""),t.append("clientFolioNumber",this.dailyEntryForm.get("clientFolioNumber")?.value||""),t.append("clientPhoneCountryCode",this.dailyEntryForm.get("clientPhoneCountryCode")?.value||""),t.append("clientMobileNumber",this.dailyEntryForm.get("clientMobileNumber")?.value||""),t.append("dailyEntryFundHouse",this.dailyEntryForm.get("fundHouse")?.value||""),t.append("dailyEntryFundName",this.dailyEntryForm.get("fundName")?.value||""),t.append("amount",this.dailyEntryForm.get("amount")?.value||""),t.append("clientChequeNumber",this.dailyEntryForm.get("clientChequeNumber")?.value||""),t.append("dailyEntryIssueType",this.dailyEntryForm.get("transactionType")?.value||""),t.append("dailyEntryTranscationMode",this.dailyEntryForm.get("transactionMode")?.value||""),t.append("sipDate",this.dailyEntryForm.get("sipDate")?.value||""),t.append("staffName",this.dailyEntryForm.get("staffName")?.value||""),t.append("transactionAddDetail",this.dailyEntryForm.get("transactionAddDetail")?.value||""),this.selectedFile&&t.append("dailyEntryFile",this.selectedFile),this.shouldRemoveExistingFile&&t.append("removeExistingFile","true"),console.log("FormData being sent:"),t.forEach((r,a)=>{console.log(`${a}: ${r instanceof File?`File: ${r.name}`:r}`)}),this.dailyEntryService.processDailyEntryWithFormData(t,this.entryId.toString()).pipe(v(this.destroy$)).subscribe(r=>{this.loading=!1,this.hideLoader(),r.code===1?(this.shouldRemoveExistingFile=!1,c.default.fire({title:"Updated!",text:"Daily entry updated successfully",icon:"success",confirmButtonText:"Ok"}).then(a=>{a.isConfirmed&&this.router.navigate(["/forms/dailyEntry"])})):c.default.fire({title:"Failed!",text:r.message||"Error updating daily entry",icon:"error",confirmButtonText:"Ok"})},r=>{this.loading=!1,this.hideLoader(),console.error("Error updating entry:",r),c.default.fire({title:"Failed!",text:"An error occurred while updating the entry.",icon:"error",confirmButtonText:"Ok"})})}onCancel(){this.router.navigate(["/forms/dailyEntry"])}showLoader(t,r=!1){c.default.fire({title:t,allowOutsideClick:!1,didOpen:()=>{c.default.showLoading()},customClass:{popup:r?"swal2-small":""}})}hideLoader(){c.default.close()}static{this.\u0275fac=function(r){return new(r||o)(b(le),b(A),b(q),b(ce),b(ue),b(me))}}static{this.\u0275cmp=w({type:o,selectors:[["app-update-daily-entry"]],standalone:!0,features:[I],decls:234,vars:34,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","3"],["id","searchTerm","formControlName","searchTerm","type","text","cFormControl","","placeholder","Search by PAN/Mobile"],["cButton","","color","secondary","id","button-addon2","type","button","variant","outline",3,"click"],["md","6",3,"cFormFloating"],["cFormControl","","id","applicationDate","formControlName","applicationDate","required","","type","date","placeholder","Application Date"],["cLabel","","for","applicationDate",1,"ms-2"],["cFormControl","","id","clientPanNumber","formControlName","clientPanNumber","required","","type","text","placeholder","Client PAN","readonly",""],["cLabel","","for","clientPanNumber",1,"ms-2"],["cFormControl","","id","clientName","formControlName","clientName","required","","type","text","placeholder","Client Name","readonly",""],["cLabel","","for","clientName",1,"ms-2"],["md","6"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cFormControl","","id","clientPhoneCountryCode","formControlName","clientPhoneCountryCode","type","text","placeholder","Code","readonly",""],["for","clientPhoneCountryCode"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","clientMobileNumber","formControlName","clientMobileNumber","required","","type","text","placeholder","Mobile Number","readonly",""],["cLabel","","for","clientMobileNumber",1,"ms-2"],["cSelect","","id","fundHouse","formControlName","fundHouse","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","fundHouse",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","id","fundName","formControlName","fundName","required",""],["cLabel","","for","fundName",1,"ms-2"],["cFormControl","","id","clientFolioNumber","formControlName","clientFolioNumber","type","text","placeholder","Client Folio Number"],["cLabel","","for","clientFolioNumber",1,"ms-2"],["cFormControl","","id","amount","formControlName","amount","required","","type","number","placeholder","Amount"],["cLabel","","for","amount",1,"ms-2"],["cFormControl","","id","clientChequeNumber","formControlName","clientChequeNumber","type","text","placeholder","Client Cheque Number"],["cLabel","","for","clientChequeNumber",1,"ms-2"],["cSelect","","id","transactionMode","formControlName","transactionMode","required",""],["cLabel","","for","transactionMode",1,"ms-2"],["cSelect","","id","transactionType","formControlName","transactionType","required",""],["cLabel","","for","transactionType",1,"ms-2"],["cFormControl","","id","sipDate","formControlName","sipDate","type","date","placeholder","SIP Date","required",""],["cLabel","","for","sipDate",1,"ms-2"],[1,"mb-0"],["cFormControl","","id","dailyEntryFile","type","file","accept",".pdf,.doc,.docx",1,"form-control",3,"change","disabled"],["cLabel","","for","dailyEntryFile",1,"form-label"],["class","text-muted",4,"ngIf"],["class","mt-2 p-2 border rounded bg-light",4,"ngIf"],["class","mt-2 p-2 border rounded bg-success bg-opacity-10",4,"ngIf"],["cFormControl","","id","staffName","formControlName","staffName","required","","type","text","placeholder","Staff Name","readonly",""],["cLabel","","for","staffName",1,"ms-2"],["md","12",3,"cFormFloating"],["cFormControl","","id","transactionAddDetail","formControlName","transactionAddDetail","rows","3","placeholder","Transaction Add Detail","required",""],["cLabel","","for","transactionAddDetail",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"value"],[3,"valid"],[1,"text-muted"],[1,"mt-2","p-2","border","rounded","bg-light"],[1,"d-flex","align-items-center","justify-content-between"],[1,"d-flex","align-items-center"],[1,"me-2"],["href","javascript:void(0)",1,"text-primary","text-decoration-none",3,"click","title"],[1,"ms-2","badge","bg-secondary"],["type","button","title","Remove existing file",1,"btn","btn-sm","btn-outline-danger",3,"click"],[1,"mt-1"],[1,"mt-2","p-2","border","rounded","bg-success","bg-opacity-10"],[1,"text-success"],[1,"ms-2","badge","bg-success"]],template:function(r,a){if(r&1){let d=_();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"Update Daily Entry"),n(),e(10,`
      `),n(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),C("ngSubmit",function(){return g(d),E(a.onSubmit())}),e(16,`
          `),i(17,"c-col",4),e(18,`
            `),i(19,"c-input-group"),e(20,`
              `),y(21,"input",5),e(22,`
              `),i(23,"button",6),C("click",function(){return g(d),E(a.searchClient())}),e(24,`
                Search
              `),n(),e(25,`
            `),n(),e(26,`
          `),n(),e(27,`

          `),i(28,"c-col",7),e(29,`
          `),n(),e(30,`

          `),i(31,"c-col",7),e(32,`
            `),y(33,"input",8),e(34,`
            `),i(35,"label",9),e(36,"Application Date"),n(),e(37,`
          `),n(),e(38,`

          `),i(39,"c-col",7),e(40,`
            `),y(41,"input",10),e(42,`
            `),i(43,"label",11),e(44,"Client PAN"),n(),e(45,`
          `),n(),e(46,`

          `),i(47,"c-col",7),e(48,`
            `),y(49,"input",12),e(50,`
            `),i(51,"label",13),e(52,"Client Name"),n(),e(53,`
          `),n(),e(54,`

          `),i(55,"c-col",14),e(56,`
            `),i(57,"c-input-group",15),e(58,`
              `),i(59,"c-col",16),e(60,`
                `),y(61,"input",17),e(62,`
                `),i(63,"label",18),e(64,"Country Code"),n(),e(65,`
              `),n(),e(66,`
              `),i(67,"c-col",19),e(68,`
                `),y(69,"input",20),e(70,`
                `),i(71,"label",21),e(72,"Mobile Number"),n(),e(73,`
              `),n(),e(74,`
            `),n(),e(75,`
          `),n(),e(76,`

          `),i(77,"c-col",7),e(78,`
            `),i(79,"select",22),e(80,`
              `),i(81,"option",23),e(82,"Select Fund House"),n(),e(83,`
              `),u(84,he,2,2,"option",24),e(85,`
            `),n(),e(86,`
            `),i(87,"label",25),e(88,"Fund House"),n(),e(89,`
            `),u(90,xe,2,1,"c-form-feedback",26),e(91,`
          `),n(),e(92,`

          `),i(93,"c-col",7),e(94,`
            `),i(95,"select",27),e(96,`
              `),i(97,"option",23),e(98,"Select Fund Name"),n(),e(99,`
              `),u(100,Fe,2,2,"option",24),e(101,`
            `),n(),e(102,`
            `),i(103,"label",28),e(104,"Fund Name"),n(),e(105,`
            `),u(106,ge,2,1,"c-form-feedback",26),e(107,`
          `),n(),e(108,`

          `),i(109,"c-col",7),e(110,`
            `),y(111,"input",29),e(112,`
            `),i(113,"label",30),e(114,"Client Folio Number"),n(),e(115,`
            `),u(116,Ee,2,1,"c-form-feedback",26),e(117,`
          `),n(),e(118,`

          `),i(119,"c-col",7),e(120,`
            `),y(121,"input",31),e(122,`
            `),i(123,"label",32),e(124,"Amount"),n(),e(125,`
            `),u(126,be,2,1,"c-form-feedback",26),e(127,`
          `),n(),e(128,`

          `),i(129,"c-col",7),e(130,`
            `),y(131,"input",33),e(132,`
            `),i(133,"label",34),e(134,"Client Cheque Number"),n(),e(135,`
            `),u(136,Ce,2,1,"c-form-feedback",26),e(137,`
          `),n(),e(138,`

          `),i(139,"c-col",7),e(140,`
            `),i(141,"select",35),e(142,`
              `),i(143,"option",23),e(144,"Select Transaction Mode"),n(),e(145,`
              `),u(146,ve,2,2,"option",24),e(147,`
            `),n(),e(148,`
            `),i(149,"label",36),e(150,"Transaction Mode"),n(),e(151,`
            `),u(152,Ne,2,1,"c-form-feedback",26),e(153,`
          `),n(),e(154,`

          `),i(155,"c-col",7),e(156,`
            `),i(157,"select",37),e(158,`
              `),i(159,"option",23),e(160,"Select Transaction Type"),n(),e(161,`
              `),u(162,Se,2,2,"option",24),e(163,`
            `),n(),e(164,`
            `),i(165,"label",38),e(166,"Transaction Type"),n(),e(167,`
            `),u(168,_e,2,1,"c-form-feedback",26),e(169,`
          `),n(),e(170,`

          `),i(171,"c-col",7),e(172,`
            `),y(173,"input",39),e(174,`
            `),i(175,"label",40),e(176,"SIP Date"),n(),e(177,`
          `),n(),e(178,`

          `),i(179,"c-col",14),e(180,`
            `),i(181,"div",41),e(182,`
              `),e(183,`
              `),i(184,"input",42),C("change",function(x){return g(d),E(a.onFileChange(x))}),n(),e(185,`
              `),i(186,"label",43),e(187,`
                `),i(188,"small"),e(189,"Upload Document: Accepted formats: PDF, DOC, DOCX"),n(),e(190,`
                `),u(191,De,5,0,"span",44),e(192,`
              `),n(),e(193,`

              `),e(194,`
              `),u(195,Te,2,2,"c-form-feedback",26),e(196,`

              `),e(197,`
              `),u(198,we,36,4,"div",45),e(199,`

              `),e(200,`
              `),u(201,Me,27,3,"div",46),e(202,`
            `),n(),e(203,`
          `),n(),e(204,`

          `),i(205,"c-col",7),e(206,`
            `),y(207,"input",47),e(208,`
            `),i(209,"label",48),e(210,"Staff Name"),n(),e(211,`
          `),n(),e(212,`

          `),i(213,"c-col",49),e(214,`
            `),y(215,"textarea",50),e(216,`
            `),i(217,"label",51),e(218,"Transaction Add Detail"),n(),e(219,`
          `),n(),e(220,`

          `),i(221,"c-col",1),e(222,`
            `),i(223,"button",52),e(224,`
              Update
            `),n(),e(225,`
            `),i(226,"button",53),C("click",function(){return g(d),E(a.onCancel())}),e(227,`
              Cancel
            `),n(),e(228,`
          `),n(),e(229,`
        `),n(),e(230,`
      `),n(),e(231,`
    `),n(),e(232,`
  `),n(),e(233,`
`),n()}r&2&&(s(14),l("formGroup",a.dailyEntryForm)("validated",a.customStylesValidated),s(14),l("cFormFloating",!0),s(3),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(12),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(10),l("cFormFloating",!0),s(7),l("ngForOf",a.amcList),s(6),l("ngIf",a.f.fundHouse.errors&&(a.f.fundHouse.touched||a.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngForOf",a.fundList),s(6),l("ngIf",a.f.fundName.errors&&(a.f.fundName.touched||a.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngIf",a.f.clientFolioNumber.errors&&(a.f.clientFolioNumber.touched||a.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngIf",a.f.amount.errors&&(a.f.amount.touched||a.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngIf",a.f.clientChequeNumber.errors&&(a.f.clientChequeNumber.touched||a.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngForOf",a.transactionModes),s(6),l("ngIf",a.f.transactionMode.errors&&(a.f.transactionMode.touched||a.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngForOf",a.issueTypes),s(6),l("ngIf",a.f.transactionType.errors&&(a.f.transactionType.touched||a.submitted)),s(3),l("cFormFloating",!0),s(13),l("disabled",a.isFileUploadDisabled),s(7),l("ngIf",a.isFileUploadDisabled),s(4),l("ngIf",a.fileError),s(3),l("ngIf",a.hasExistingFile&&!a.isFileUploadDisabled),s(3),l("ngIf",a.selectedFile&&!a.isFileUploadDisabled),s(4),l("cFormFloating",!0),s(8),l("cFormFloating",!0))},dependencies:[L,U,k,de,Z,re,ae,J,ee,ne,K,Q,oe,te,ie,se,Y,X,V,B,O,W,R,G,z,H,j,$,P]})}}return o})();export{ze as UpdateDailyEntryComponent};
