import{a as ye}from"./chunk-DUJ2QR6G.js";import{a as fe}from"./chunk-MTLOIHVI.js";import{a as ue}from"./chunk-3IPB5M6Y.js";import{a as ge}from"./chunk-AJEUVWKL.js";import{Aa as Z,B as $,Ba as ee,Ga as te,Ha as ie,Ja as ne,M as H,Ma as re,N as z,Na as ae,O as j,Oa as oe,P as G,Pa as le,Q as W,Qa as se,Ra as de,Ta as me,U as X,Ua as ce,V as J,Va as pe,Z as K,_ as Q,q as O,x as B,y as R,ya as Y,za as p}from"./chunk-K3LN6DFK.js";import{$a as C,Ga as c,H as h,Ia as l,Ka as T,Lb as q,Mb as A,Qb as k,S as _,Sa as i,Sb as U,Ta as n,Ua as d,Ya as S,Z as x,_ as F,_a as b,c as N,fc as V,jb as e,kb as E,lb as M,nb as w,pa as s,q as D,qa as g,sb as L,wb as I,yb as P}from"./chunk-WAGJM7NU.js";import{f as Fe}from"./chunk-MYAK5QVS.js";var u=Fe(ge());function be(o,m){if(o&1&&(i(0,"option",55),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),E(t.amcName)}}function Ee(o,m){o&1&&(i(0,"c-form-feedback",56),e(1,"Please select a Fund House."),n()),o&2&&l("valid",!1)}function Ce(o,m){if(o&1&&(i(0,"option",55),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),E(t.fundName)}}function Se(o,m){o&1&&(i(0,"c-form-feedback",56),e(1,"Please select a Fund Name."),n()),o&2&&l("valid",!1)}function ve(o,m){o&1&&(i(0,"c-form-feedback",56),e(1,"Please provide a valid Amount."),n()),o&2&&l("valid",!1)}function Ne(o,m){if(o&1&&(i(0,"option",55),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),E(t.transcationModeName)}}function De(o,m){o&1&&(i(0,"c-form-feedback",56),e(1,"Please select a Transaction Mode."),n()),o&2&&l("valid",!1)}function _e(o,m){if(o&1&&(i(0,"option",55),e(1),n()),o&2){let t=m.$implicit;l("value",t.id),s(),E(t.issueTypeName)}}function Te(o,m){o&1&&(i(0,"c-form-feedback",56),e(1,"Please select a Transaction Type."),n()),o&2&&l("valid",!1)}function Me(o,m){o&1&&(i(0,"span"),e(1,`
                    Upload Document: Accepted formats: PDF, DOC, DOCX (Max 10MB)
                  `),n())}function we(o,m){o&1&&(i(0,"span",57),e(1,`
                    `),d(2,"i",58),e(3,`
                    Document upload is only available for offline transactions
                  `),n())}function Le(o,m){if(o&1&&(i(0,"small",57),e(1),I(2,"date"),n()),o&2){let t=C(2);s(),w(`
                        Size: `,t.formatFileSize(t.selectedFile.size),` |
                        Type: `,t.selectedFile.type||"Unknown",` |
                        Modified: `,P(2,3,t.selectedFile.lastModified,"short"),`
                      `)}}function Ie(o,m){if(o&1){let t=S();i(0,"div",59),e(1,`
                `),i(2,"div",60),e(3,`
                  `),i(4,"div",61),e(5,`
                    `),d(6,"i",62),e(7,`
                    `),i(8,"div",63),e(9,`
                      `),i(10,"strong",64),e(11),n(),e(12,`
                      `),d(13,"br"),e(14,`
                      `),c(15,Le,3,6,"small",44),e(16,`
                    `),n(),e(17,`
                  `),n(),e(18,`
                  `),e(19,`
                  `),i(20,"button",65),b("click",function(){x(t);let r=C();return F(r.removeSelectedFile())}),e(21,`
                    `),i(22,"small"),e(23,"\u2715"),n(),e(24,`
                  `),n(),e(25,`
                `),n(),e(26,`

                `),i(27,"div",66),e(28,`
                  `),i(29,"small",67),e(30,`
                    `),d(31,"i",68),e(32,`
                    File ready for upload
                  `),n(),e(33,`
                `),n(),e(34,`
              `),n()}if(o&2){let t=C();s(11),E(t.selectedFileName),s(4),l("ngIf",t.selectedFile)}}function Pe(o,m){if(o&1&&(i(0,"div",69),e(1,`
                `),d(2,"i",70),e(3),n()),o&2){let t=C();s(3),M(`
                `,t.fileError,`
              `)}}function qe(o,m){o&1&&d(0,"span",71)}var Ye=(()=>{class o{constructor(t,a,r,f,y){this.fb=t,this.router=a,this.dailyEntryService=r,this.issueService=f,this.amcService=y,this.customStylesValidated=!1,this.submitted=!1,this.loading=!1,this.dataLoading=!0,this.isDocumentUploadEnabled=!1,this.amcList=[],this.fundList=[],this.issueTypes=[],this.transactionModes=[],this.selectedFile=null,this.fileError="",this.selectedFileName="",this.filePreviewUrl="",this.destroy$=new N,this.currentDate=new Date().toISOString().split("T")[0],this.dailyEntryForm=this.initForm()}ngOnInit(){this.loadInitialData(),this.setupFormListeners()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.filePreviewUrl&&URL.revokeObjectURL(this.filePreviewUrl)}initForm(){return this.fb.group({searchTerm:[""],applicationDate:[this.currentDate,p.required],clientPanNumber:["",p.required],clientName:["",p.required],clientPhoneCountryCode:["",p.required],clientMobileNumber:["",p.required],clientFolioNumber:[""],fundHouse:["",p.required],fundName:["",p.required],amount:["",[p.required,p.min(0)]],clientChequeNumber:[""],transactionType:["",p.required],transactionMode:["",p.required],sipDate:["",p.required],transactionAddDetail:["",p.required],staffName:[localStorage.getItem("user_name")||localStorage.getItem("username")||"",p.required]})}loadInitialData(){this.showLoader("Loading data..."),D({amcs:this.amcService.getAmc(),issueTypes:this.issueService.getIssueType(),transactionModes:this.dailyEntryService.getTransactionModes()}).pipe(h(this.destroy$)).subscribe({next:t=>{console.log("API Responses:",t),this.amcList=t.amcs.data||[],this.issueTypes=t.issueTypes.data||[],Array.isArray(t.transactionModes)?this.transactionModes=t.transactionModes:t.transactionModes&&t.transactionModes.data?this.transactionModes=t.transactionModes.data:this.transactionModes=[],console.log("Transaction Modes:",this.transactionModes),this.dataLoading=!1,this.hideLoader()},error:t=>{console.error("Error loading initial data:",t),this.dataLoading=!1,this.hideLoader(),u.default.fire("Error","Failed to initialize the form. Please try again.","error")}})}setupFormListeners(){this.dailyEntryForm.get("fundHouse")?.valueChanges.pipe(h(this.destroy$)).subscribe(t=>{t?this.loadFundsByAmc(t):(this.fundList=[],this.dailyEntryForm.get("fundName")?.disable())}),this.dailyEntryForm.get("transactionMode")?.valueChanges.pipe(h(this.destroy$)).subscribe(t=>{this.handleTransactionModeChange(t)})}get f(){return this.dailyEntryForm.controls}loadFundsByAmc(t){this.showLoader("Loading Funds..."),this.dailyEntryService.getFundsByAmc(t).pipe(h(this.destroy$)).subscribe({next:a=>{this.fundList=a.data||[];let r=this.dailyEntryForm.get("fundName");r&&(this.fundList.length>0?(r.enable(),r.setValue("")):(r.disable(),r.setValue(""))),this.hideLoader()},error:a=>{console.error("Error loading funds:",a),this.fundList=[],this.dailyEntryForm.get("fundName")?.disable(),this.hideLoader(),u.default.fire("Error","Failed to load funds for the selected AMC.","error")}})}searchClient(){let t=this.dailyEntryForm.get("searchTerm")?.value;t?(this.showLoader("Searching Client..."),this.dailyEntryService.getClientDetails(t).pipe(h(this.destroy$)).subscribe({next:a=>{if(this.hideLoader(),a.code===1){let r=a.data;this.patchClientDetails(r)}else u.default.fire("Not Found","No client found with the given PAN or mobile number.","info")},error:a=>{console.error("Error searching client:",a),this.hideLoader(),u.default.fire("Error","An error occurred while searching for the client.","error")}})):u.default.fire("Error","Please enter a search term.","error")}patchClientDetails(t){this.dailyEntryForm.patchValue({clientName:t.client_name,clientPanNumber:t.client_pan_no,clientPhoneCountryCode:t.client_phone_dial_code,clientMobileNumber:t.client_phone})}handleTransactionModeChange(t){let a=this.transactionModes.find(r=>r.id==t);a?(this.isDocumentUploadEnabled=a.id===2,console.log("Transaction mode changed:",a.transcationModeName,"Upload enabled:",this.isDocumentUploadEnabled),!this.isDocumentUploadEnabled&&this.selectedFile&&this.removeSelectedFile()):(this.isDocumentUploadEnabled=!1,this.selectedFile&&this.removeSelectedFile())}onFileChange(t){if(!this.isDocumentUploadEnabled){console.log("Document upload is disabled for online transactions");return}let a=t.target;if(a.files&&a.files.length>0){let r=a.files[0],f=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],y=[".pdf",".doc",".docx"];if(!(f.includes(r.type)||y.some(xe=>r.name.toLowerCase().endsWith(xe)))){this.fileError="Please select a valid file format (PDF, DOC, DOCX only)",this.resetFileSelection(a);return}let he=10*1024*1024;if(r.size>he){this.fileError="File size must be less than 10MB",this.resetFileSelection(a);return}this.fileError="",this.selectedFile=r,this.selectedFileName=r.name,this.filePreviewUrl&&URL.revokeObjectURL(this.filePreviewUrl),this.filePreviewUrl=URL.createObjectURL(r),console.log("File selected successfully:",{name:r.name,size:r.size,type:r.type,lastModified:new Date(r.lastModified)})}else this.resetFileSelection(a)}resetFileSelection(t){this.selectedFile=null,this.selectedFileName="",this.filePreviewUrl&&(URL.revokeObjectURL(this.filePreviewUrl),this.filePreviewUrl=""),t&&(t.value="")}removeSelectedFile(){this.resetFileSelection(),this.fileError="";let t=document.getElementById("dailyEntryFile");t&&(t.value="")}formatFileSize(t){if(t===0)return"0 Bytes";let a=1024,r=["Bytes","KB","MB","GB"],f=Math.floor(Math.log(t)/Math.log(a));return parseFloat((t/Math.pow(a,f)).toFixed(2))+" "+r[f]}onSubmit(){if(this.customStylesValidated=!0,this.submitted=!0,this.dailyEntryForm.invalid){let a=this.getMissingRequiredFields();if(a.length>0){this.showMissingFieldsAlert(a);return}}if(this.loading)return;this.loading=!0,this.showLoader("Submitting...");let t=new FormData;t.append("applicationDate",this.dailyEntryForm.get("applicationDate")?.value||""),t.append("dailyEntryClientPanNumber",this.dailyEntryForm.get("clientPanNumber")?.value||""),t.append("dailyEntryClientName",this.dailyEntryForm.get("clientName")?.value||""),t.append("clientFolioNumber",this.dailyEntryForm.get("clientFolioNumber")?.value||""),t.append("clientPhoneCountryCode",this.dailyEntryForm.get("clientPhoneCountryCode")?.value||""),t.append("clientMobileNumber",this.dailyEntryForm.get("clientMobileNumber")?.value||""),t.append("dailyEntryFundHouse",this.dailyEntryForm.get("fundHouse")?.value||""),t.append("dailyEntryFundName",this.dailyEntryForm.get("fundName")?.value||""),t.append("amount",this.dailyEntryForm.get("amount")?.value||""),t.append("clientChequeNumber",this.dailyEntryForm.get("clientChequeNumber")?.value||""),t.append("dailyEntryIssueType",this.dailyEntryForm.get("transactionType")?.value||""),t.append("dailyEntryTranscationMode",this.dailyEntryForm.get("transactionMode")?.value||""),t.append("sipDate",this.dailyEntryForm.get("sipDate")?.value||""),t.append("staffName",this.dailyEntryForm.get("staffName")?.value||""),t.append("transactionAddDetail",this.dailyEntryForm.get("transactionAddDetail")?.value||""),this.selectedFile&&(t.append("dailyEntryFile",this.selectedFile,this.selectedFile.name),console.log("File being uploaded:",this.selectedFile.name,"Size:",this.selectedFile.size)),console.log("FormData being submitted:"),t&&typeof t.forEach=="function"&&t.forEach((a,r)=>{console.log(r+": "+(a instanceof File?`File: ${a.name} (${a.size} bytes)`:a))}),this.dailyEntryService.processDailyEntryWithFormData(t).pipe(h(this.destroy$)).subscribe({next:a=>{this.loading=!1,this.hideLoader(),console.log("Server response:",a),a.code===1?(u.default.fire("Added!","Daily entry and issue created successfully","success"),this.router.navigate(["/forms/dailyEntry"])):u.default.fire("Failed!",a.message||"Error creating daily entry and issue","error")},error:a=>{console.error("Error submitting form:",a),this.loading=!1,this.hideLoader();let r="An error occurred while processing the entry.";a.response?.data?.message?r=a.response.data.message:a.message&&(r=a.message),u.default.fire("Failed!",r,"error")}})}getMissingRequiredFields(){let t=[];return Object.keys(this.dailyEntryForm.controls).forEach(a=>{let r=this.dailyEntryForm.get(a);r&&r.errors&&"required"in r.errors&&r.errors.required&&t.push(this.getFieldDisplayName(a))}),t}getFieldDisplayName(t){return{searchTerm:"Search Term",applicationDate:"Application Date",clientPanNumber:"Client PAN",clientName:"Client Name",clientMobileNumber:"Mobile Number",fundHouse:"Fund House",fundName:"Fund Name",amount:"Amount",transactionType:"Transaction Type",transactionMode:"Transaction Mode",sipDate:"SIP Date",staffName:"Staff Name",transactionAddDetail:"Transaction Add Detail"}[t]||t}showMissingFieldsAlert(t){let a=t.join(", ");u.default.fire({title:"Required Fields Missing",html:`Please fill in the following required fields:<br><br><strong>${a}</strong>`,icon:"warning",confirmButtonText:"Ok"})}showLoader(t="Loading..."){u.default.fire({title:t,allowOutsideClick:!1,didOpen:()=>{u.default.showLoading()}})}hideLoader(){u.default.close()}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.resetFileSelection(),this.fileError="",this.isDocumentUploadEnabled=!1;let t=document.getElementById("dailyEntryFile");t&&(t.value=""),this.dailyEntryForm.reset({applicationDate:this.currentDate,staffName:localStorage.getItem("user_name")||localStorage.getItem("username")||""}),this.fundList=[],this.dailyEntryForm.get("fundName")?.disable()}static{this.\u0275fac=function(a){return new(a||o)(g(me),g(V),g(fe),g(ye),g(ue))}}static{this.\u0275cmp=_({type:o,selectors:[["app-create-daily-entry"]],standalone:!0,features:[L],decls:230,vars:37,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","3"],["id","searchTerm","formControlName","searchTerm","type","text","cFormControl","","placeholder","Search by PAN/Mobile"],["cButton","","color","secondary","id","button-addon2","type","button","variant","outline",3,"click"],["md","6"],["md","6",3,"cFormFloating"],["cFormControl","","id","applicationDate","formControlName","applicationDate","required","","type","date","placeholder","Application Date",3,"value"],["cLabel","","for","applicationDate",1,"ms-2"],["cFormControl","","id","clientPanNumber","formControlName","clientPanNumber","required","","type","text","placeholder","Client PAN","readonly",""],["cLabel","","for","clientPanNumber",1,"ms-2"],["cFormControl","","id","clientName","formControlName","clientName","required","","type","text","placeholder","Client Name","readonly",""],["cLabel","","for","clientName",1,"ms-2"],[1,"d-flex"],[1,"w-25",3,"cFormFloating"],["cFormControl","","id","clientPhoneCountryCode","formControlName","clientPhoneCountryCode","type","text","placeholder","Code","readonly",""],["for","clientPhoneCountryCode"],[1,"w-75",3,"cFormFloating"],["cFormControl","","id","clientMobileNumber","formControlName","clientMobileNumber","required","","type","text","placeholder","Mobile Number","readonly",""],["cLabel","","for","clientMobileNumber",1,"ms-2"],["cSelect","","id","fundHouse","formControlName","fundHouse","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","fundHouse",1,"ms-2"],[3,"valid",4,"ngIf"],["cSelect","","id","fundName","formControlName","fundName","required",""],["cLabel","","for","fundName",1,"ms-2"],["cFormControl","","id","clientFolioNumber","formControlName","clientFolioNumber","type","text","placeholder","Client Folio Number"],["cLabel","","for","clientFolioNumber",1,"ms-2"],["cFormControl","","id","amount","formControlName","amount","required","","type","number","placeholder","Amount","step","0.01","min","0"],["cLabel","","for","amount",1,"ms-2"],["cFormControl","","id","clientChequeNumber","formControlName","clientChequeNumber","type","text","placeholder","Client Cheque Number"],["cLabel","","for","clientChequeNumber",1,"ms-2"],["cSelect","","id","transactionMode","formControlName","transactionMode","required",""],["cLabel","","for","transactionMode",1,"ms-2"],["cSelect","","id","transactionType","formControlName","transactionType","required",""],["cLabel","","for","transactionType",1,"ms-2"],["cFormControl","","id","sipDate","formControlName","sipDate","type","date","placeholder","SIP Date","required",""],["cLabel","","for","sipDate",1,"ms-2"],["cFormControl","","id","dailyEntryFile","type","file","accept",".pdf,.doc,.docx",1,"form-control",3,"change","disabled"],["cLabel","","for","dailyEntryFile",1,"form-label"],[4,"ngIf"],["class","text-muted",4,"ngIf"],["class","mt-2 p-3 bg-light border rounded shadow-sm",4,"ngIf"],["class","alert alert-danger mt-2 py-2",4,"ngIf"],["cFormControl","","id","staffName","formControlName","staffName","required","","type","text","placeholder","Staff Name","readonly",""],["cLabel","","for","staffName",1,"ms-2"],["md","12",3,"cFormFloating"],["cFormControl","","id","transactionAddDetail","formControlName","transactionAddDetail","rows","3","placeholder","Transaction Add Detail","required",""],["cLabel","","for","transactionAddDetail",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1",3,"disabled"],["class","spinner-border spinner-border-sm me-2","role","status",4,"ngIf"],["cButton","","color","secondary","type","reset",3,"click","disabled"],[3,"value"],[3,"valid"],[1,"text-muted"],[1,"fas","fa-info-circle","me-1"],[1,"mt-2","p-3","bg-light","border","rounded","shadow-sm"],[1,"d-flex","justify-content-between","align-items-center"],[1,"d-flex","align-items-center","flex-grow-1"],[1,"fas","fa-file-alt","me-2","text-primary"],[1,"flex-grow-1"],[1,"text-dark"],["type","button","title","Remove file",1,"btn","btn-sm","btn-outline-danger",3,"click"],[1,"mt-2"],[1,"text-success"],[1,"fas","fa-check-circle","me-1"],[1,"alert","alert-danger","mt-2","py-2"],[1,"fas","fa-exclamation-triangle","me-2"],["role","status",1,"spinner-border","spinner-border-sm","me-2"]],template:function(a,r){if(a&1){let f=S();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"New Daily Entry Form"),n(),e(10,`
      `),n(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),b("ngSubmit",function(){return x(f),F(r.onSubmit())}),e(16,`

        `),i(17,"c-col",4),e(18,`
          `),i(19,"c-input-group"),e(20,`
            `),d(21,"input",5),e(22,`
            `),i(23,"button",6),b("click",function(){return x(f),F(r.searchClient())}),e(24,`
              Search
            `),n(),e(25,`
          `),n(),e(26,`
        `),n(),e(27,`


        `),i(28,"c-col",7),e(29,`
        `),n(),e(30,`

          `),i(31,"c-col",8),e(32,`
            `),d(33,"input",9),e(34,`
            `),i(35,"label",10),e(36,"Application Date"),n(),e(37,`
          `),n(),e(38,`

          `),i(39,"c-col",8),e(40,`
            `),d(41,"input",11),e(42,`
            `),i(43,"label",12),e(44,"Client PAN"),n(),e(45,`
          `),n(),e(46,`


          `),i(47,"c-col",8),e(48,`
            `),d(49,"input",13),e(50,`
            `),i(51,"label",14),e(52,"Client Name"),n(),e(53,`
          `),n(),e(54,`

          `),i(55,"c-col",7),e(56,`
            `),i(57,"c-input-group",15),e(58,`
              `),i(59,"c-col",16),e(60,`
                `),d(61,"input",17),e(62,`
                `),i(63,"label",18),e(64,"Country Code"),n(),e(65,`
              `),n(),e(66,`
              `),i(67,"c-col",19),e(68,`
                `),d(69,"input",20),e(70,`
                `),i(71,"label",21),e(72,"Mobile Number"),n(),e(73,`
              `),n(),e(74,`
            `),n(),e(75,`
          `),n(),e(76,`

          `),i(77,"c-col",8),e(78,`
            `),i(79,"select",22),e(80,`
              `),i(81,"option",23),e(82,"Select Fund House"),n(),e(83,`
              `),c(84,be,2,2,"option",24),e(85,`
            `),n(),e(86,`
            `),i(87,"label",25),e(88,"Fund House"),n(),e(89,`
            `),c(90,Ee,2,1,"c-form-feedback",26),e(91,`
          `),n(),e(92,`

          `),i(93,"c-col",8),e(94,`
            `),i(95,"select",27),e(96,`
              `),i(97,"option",23),e(98,"Select Fund Name"),n(),e(99,`
              `),c(100,Ce,2,2,"option",24),e(101,`
            `),n(),e(102,`
            `),i(103,"label",28),e(104,"Fund Name"),n(),e(105,`
            `),c(106,Se,2,1,"c-form-feedback",26),e(107,`
          `),n(),e(108,`

          `),i(109,"c-col",8),e(110,`
            `),d(111,"input",29),e(112,`
            `),i(113,"label",30),e(114,"Client Folio Number"),n(),e(115,`
          `),n(),e(116,`

          `),i(117,"c-col",8),e(118,`
            `),d(119,"input",31),e(120,`
            `),i(121,"label",32),e(122,"Amount"),n(),e(123,`
            `),c(124,ve,2,1,"c-form-feedback",26),e(125,`
          `),n(),e(126,`

          `),i(127,"c-col",8),e(128,`
            `),d(129,"input",33),e(130,`
            `),i(131,"label",34),e(132,"Client Cheque Number"),n(),e(133,`
          `),n(),e(134,`

          `),i(135,"c-col",8),e(136,`
            `),i(137,"select",35),e(138,`
              `),i(139,"option",23),e(140,"Select Transaction Mode"),n(),e(141,`
              `),c(142,Ne,2,2,"option",24),e(143,`
            `),n(),e(144,`
            `),i(145,"label",36),e(146,"Transaction Mode"),n(),e(147,`
            `),c(148,De,2,1,"c-form-feedback",26),e(149,`
          `),n(),e(150,`

          `),i(151,"c-col",8),e(152,`
            `),i(153,"select",37),e(154,`
              `),i(155,"option",23),e(156,"Select Transaction Type"),n(),e(157,`
              `),c(158,_e,2,2,"option",24),e(159,`
            `),n(),e(160,`
            `),i(161,"label",38),e(162,"Transaction Type"),n(),e(163,`
            `),c(164,Te,2,1,"c-form-feedback",26),e(165,`
          `),n(),e(166,`

          `),i(167,"c-col",8),e(168,`
            `),d(169,"input",39),e(170,`
            `),i(171,"label",40),e(172,"SIP Date"),n(),e(173,`
          `),n(),e(174,`

          `),i(175,"c-col",7),e(176,`
            `),i(177,"div"),e(178,`
              `),i(179,"input",41),b("change",function(v){return x(f),F(r.onFileChange(v))}),n(),e(180,`

              `),i(181,"label",42),e(182,`
                `),i(183,"small"),e(184,`
                  `),c(185,Me,2,0,"span",43),e(186,`
                  `),c(187,we,4,0,"span",44),e(188,`
                `),n(),e(189,`
              `),n(),e(190,`

              `),e(191,`
              `),c(192,Ie,35,2,"div",45),e(193,`

              `),e(194,`
              `),c(195,Pe,4,1,"div",46),e(196,`
            `),n(),e(197,`
          `),n(),e(198,`

          `),i(199,"c-col",8),e(200,`
            `),d(201,"input",47),e(202,`
            `),i(203,"label",48),e(204,"Staff Name"),n(),e(205,`
          `),n(),e(206,`

          `),i(207,"c-col",49),e(208,`
            `),d(209,"textarea",50),e(210,`
            `),i(211,"label",51),e(212,"Transaction Add Detail"),n(),e(213,`
          `),n(),e(214,`

          `),i(215,"c-col",1),e(216,`
            `),i(217,"button",52),e(218,`
              `),c(219,qe,1,0,"span",53),e(220,`
              Save
            `),n(),e(221,`
            `),i(222,"button",54),b("click",function(){return x(f),F(r.onReset())}),e(223,`
              Reset
            `),n(),e(224,`
          `),n(),e(225,`
        `),n(),e(226,`
      `),n(),e(227,`
    `),n(),e(228,`
  `),n(),e(229,`
`),n()}a&2&&(s(14),l("formGroup",r.dailyEntryForm)("validated",r.customStylesValidated),s(17),l("cFormFloating",!0),s(2),l("value",r.currentDate),s(6),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(12),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(10),l("cFormFloating",!0),s(7),l("ngForOf",r.amcList),s(6),l("ngIf",r.f.fundHouse.errors&&(r.f.fundHouse.touched||r.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngForOf",r.fundList),s(6),l("ngIf",r.f.fundName.errors&&(r.f.fundName.touched||r.submitted)),s(3),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(7),l("ngIf",r.f.amount.errors&&(r.f.amount.touched||r.submitted)),s(3),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(7),l("ngForOf",r.transactionModes),s(6),l("ngIf",r.f.transactionMode.errors&&(r.f.transactionMode.touched||r.submitted)),s(3),l("cFormFloating",!0),s(7),l("ngForOf",r.issueTypes),s(6),l("ngIf",r.f.transactionType.errors&&(r.f.transactionType.touched||r.submitted)),s(3),l("cFormFloating",!0),s(12),l("disabled",!r.isDocumentUploadEnabled),s(2),T("text-muted",!r.isDocumentUploadEnabled),s(4),l("ngIf",r.isDocumentUploadEnabled),s(2),l("ngIf",!r.isDocumentUploadEnabled),s(5),l("ngIf",r.selectedFileName&&r.isDocumentUploadEnabled),s(3),l("ngIf",r.fileError),s(4),l("cFormFloating",!0),s(8),l("cFormFloating",!0),s(10),l("disabled",r.loading),s(2),l("ngIf",r.loading),s(3),l("disabled",r.loading))},dependencies:[A,U,q,k,Q,K,B,$,R,pe,te,oe,le,Y,ie,ae,Z,ee,de,se,ne,re,J,ce,H,W,X,z,j,G,O]})}}return o})();export{Ye as CreateDailyEntryComponent};
