import './polyfills.server.mjs';
import{a as ue,b as fe}from"./chunk-UTQWTK35.mjs";import{a as pe}from"./chunk-J7ALGH4D.mjs";import{a as ve}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as ne,F as q,Fa as re,G,Ga as ae,Ha as oe,I as j,Ia as le,J as X,Ka as me,Ma as ce,N as H,Na as se,O as J,Oa as de,S as K,T as Q,j as B,oa as Y,q as O,r as z,ra as Z,sa as D,ta as ee,u as W,ua as te,za as ie}from"./chunk-B4NKEOAB.mjs";import{d as L}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as N,Fb as b,Gb as E,Lc as R,Mc as V,Qb as e,Rb as S,Rc as P,Sa as m,Sb as _,Sc as $,Ta as F,Zb as U,bc as T,dc as k,ia as M,lb as h,nb as p,p as I,sa as C,ta as w,xb as i,yb as n,zb as g}from"./chunk-S7ATBOQE.mjs";import{g as ge,h as A}from"./chunk-COT65Y5O.mjs";var v=ge(ve());function Ee(l,x){if(l&1&&(i(0,"option",19),e(1),n()),l&2){let t=x.$implicit;p("value",t.id),m(),S(t.arnNumber)}}function _e(l,x){l&1&&(i(0,"c-form-feedback",20),e(1,`
              Please select an ARN.
            `),n()),l&2&&p("valid",!1)}function Se(l,x){l&1&&(i(0,"c-form-feedback",20),e(1,`
              Please select an Excel file.
            `),n()),l&2&&p("valid",!1)}function ye(l,x){if(l&1&&(i(0,"c-col",1),e(1,`
            `),i(2,"div",21),e(3,`
              `),i(4,"strong"),e(5,"Extracted Month:"),n(),e(6),n(),e(7,`
          `),n()),l&2){let t=E();m(6),_(" ",t.extractedMonth,`
            `)}}function Ae(l,x){if(l&1&&(i(0,"div",42),e(1,`
                            `),i(2,"strong",43),e(3),n(),e(4,`
                            `),g(5,"br"),e(6,`
                            `),i(7,"small",44),e(8,`
                              `),g(9,"i",45),e(10,`
                              Auto-matched
                            `),n(),e(11,`
                          `),n()),l&2){let t=E().$implicit;m(3),S(t.matchedAmcName)}}function Ce(l,x){if(l&1&&(i(0,"option",19),e(1),n()),l&2){let t=x.$implicit;p("value",t.id),m(),S(t.amcName)}}function we(l,x){if(l&1){let t=N();i(0,"div"),e(1,`
                            `),i(2,"select",46),b("change",function(r){C(t);let o=E().index,d=E(2);return w(d.updateAmcSelection(o,r))}),e(3,`
                              `),i(4,"option",47),e(5,"Select AMC to match"),n(),e(6,`
                              `),h(7,Ce,2,2,"option",7),e(8,`
                            `),n(),e(9,`
                            `),i(10,"small",48),e(11,`
                              `),g(12,"i",49),e(13,`
                              Manual matching required
                            `),n(),e(14,`
                          `),n()}if(l&2){let t=E().$implicit,a=E(2);m(2),p("value",t.amcId||""),m(5),p("ngForOf",a.amc)}}function be(l,x){if(l&1){let t=N();i(0,"tr"),e(1,`
                        `),i(2,"td"),e(3),n(),e(4,`
                        `),i(5,"td"),e(6,`
                          `),i(7,"strong"),e(8),n(),e(9,`
                        `),n(),e(10,`
                        `),i(11,"td"),e(12),T(13,"number"),n(),e(14,`
                        `),i(15,"td"),e(16,`
                          `),e(17,`
                          `),h(18,Ae,12,1,"div",38),e(19,`

                          `),e(20,`
                          `),h(21,we,15,2,"div",39),e(22,`
                        `),n(),e(23,`
                        `),i(24,"td"),e(25,`
                          `),i(26,"button",40),b("click",function(){let r=C(t).index,o=E(2);return w(o.removeItem(r))}),e(27,`
                            `),g(28,"i",41),e(29,`
                            Remove
                          `),n(),e(30,`
                        `),n(),e(31,`
                      `),n()}if(l&2){let t=x.$implicit,a=x.index;m(3),S(a+1),m(5),S(t.originalAmcName),m(4),S(k(13,5,t.aumAmount,"1.2-2")),m(6),p("ngIf",t.matched),m(3),p("ngIf",!t.matched)}}function Fe(l,x){if(l&1&&(i(0,"div",50),e(1,`
                  `),g(2,"i",51),e(3,`
                  `),i(4,"strong"),e(5,"Note:"),n(),e(6),n()),l&2){let t=E(2);m(6),_(" Only matched AMCs will be uploaded. Please match the remaining ",t.getUnmatchedCount(),` AMC(s) or remove them before uploading.
                `)}}function Ne(l,x){if(l&1&&(i(0,"c-col",1),e(1,`
            `),i(2,"c-card",22),e(3,`
              `),i(4,"c-card-header"),e(5,`
                `),i(6,"strong"),e(7),n(),e(8,`
              `),n(),e(9,`
              `),i(10,"c-card-body"),e(11,`
                `),i(12,"div",23),e(13,`
                  `),i(14,"table",24),e(15,`
                    `),i(16,"thead"),e(17,`
                      `),i(18,"tr"),e(19,`
                        `),i(20,"th",25),e(21,"#"),n(),e(22,`
                        `),i(23,"th",25),e(24,"AMC Name (from Excel)"),n(),e(25,`
                        `),i(26,"th",25),e(27,"AUM Amount"),n(),e(28,`
                        `),i(29,"th",25),e(30,"Matched AMC"),n(),e(31,`
                        `),i(32,"th",25),e(33,"Action"),n(),e(34,`
                      `),n(),e(35,`
                    `),n(),e(36,`
                    `),i(37,"tbody"),e(38,`
                      `),h(39,be,32,8,"tr",26),e(40,`
                    `),n(),e(41,`
                  `),n(),e(42,`
                `),n(),e(43,`

                `),i(44,"div",22),e(45,`
                  `),i(46,"div",27),e(47,`
                    `),i(48,"div",28),e(49,`
                      `),i(50,"div",29),e(51,`
                        `),g(52,"i",30),e(53,`
                        `),i(54,"strong"),e(55,"Matched:"),n(),e(56),n(),e(57,`
                    `),n(),e(58,`
                    `),i(59,"div",28),e(60,`
                      `),i(61,"div",31),e(62,`
                        `),g(63,"i",32),e(64,`
                        `),i(65,"strong"),e(66,"Not Matched:"),n(),e(67),n(),e(68,`
                    `),n(),e(69,`
                    `),i(70,"div",28),e(71,`
                      `),i(72,"div",33),e(73,`
                        `),g(74,"i",34),e(75,`
                        `),i(76,"strong"),e(77,"Total:"),n(),e(78),n(),e(79,`
                    `),n(),e(80,`
                    `),i(81,"div",28),e(82,`
                      `),i(83,"div",35),e(84,`
                        `),g(85,"i",36),e(86,`
                        `),i(87,"strong"),e(88,"Ready to Upload:"),n(),e(89),n(),e(90,`
                    `),n(),e(91,`
                  `),n(),e(92,`
                `),n(),e(93,`

                `),e(94,`
                `),h(95,Fe,7,1,"div",37),e(96,`
              `),n(),e(97,`
            `),n(),e(98,`
          `),n()),l&2){let t=E();m(7),_("Preview - AUM Data (",t.parsedData.length," records found)"),m(7),p("hover",!0)("striped",!0)("bordered",!0),m(25),p("ngForOf",t.parsedData),m(17),_(" ",t.getMatchedCount(),`
                      `),m(11),_(" ",t.getUnmatchedCount(),`
                      `),m(11),_(" ",t.parsedData.length,`
                      `),m(11),_(" ",t.getMatchedCount(),`
                      `),m(6),p("ngIf",t.getUnmatchedCount()>0)}}function Ie(l,x){l&1&&g(0,"span",52)}function De(l,x){l&1&&g(0,"i",36)}var it=(()=>{class l{constructor(t,a,r){this.fb=t,this.router=a,this.aumEntryService=r,this.loading=!1,this.submitted=!1,this.customStylesValidated=!1,this.arn=[],this.amc=[],this.selectedFile=null,this.parsedData=[],this.extractedMonth="",this.showPreview=!1,this.uploadForm=this.fb.group({aumArnNumber:["",D.required],excelFile:["",D.required]})}ngOnInit(){return A(this,null,function*(){try{yield Promise.all([this.loadArn(),this.loadAmc()])}catch(t){console.error("Error initializing component:",t),yield v.default.fire("Error","Failed to initialize the form. Please try again.","error")}})}get f(){return this.uploadForm.controls}loadArn(){return A(this,null,function*(){try{let t=yield this.aumEntryService.getArn();this.arn=t.data}catch(t){throw console.error("Error loading ARN:",t),t}})}loadAmc(){return A(this,null,function*(){try{let t=yield this.aumEntryService.getAmc();this.amc=t.data}catch(t){throw console.error("Error loading AMC:",t),t}})}onFileSelected(t){let a=t.target.files[0];a&&(a.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||a.type==="application/vnd.ms-excel"?(this.selectedFile=a,this.parseExcelFile(a)):(v.default.fire("Error","Please select a valid Excel file (.xlsx or .xls)","error"),t.target.value=""))}parseExcelFile(t){let a=new FileReader;a.onload=r=>{try{let o=new Uint8Array(r.target.result),d=ue(o,{type:"array"}),c=d.SheetNames[0],s=d.Sheets[c],f=fe.sheet_to_json(s,{header:1,raw:!1});this.extractMonthFromFirstRow(f),this.extractAumData(f)}catch(o){console.error("Error parsing Excel file:",o),v.default.fire("Error","Failed to parse Excel file. Please check the file format.","error")}},a.readAsArrayBuffer(t)}extractMonthFromFirstRow(t){if(t.length>0&&t[0].length>0){let r=(t[0][0]||"").toString().match(/(\d{2}\/\d{2}\/\d{4})/);if(r){let o=r[1].split("/"),d=o[0],c=o[1],s=o[2];this.extractedMonth=`${s}-${c}`}else v.default.fire("Warning","Could not extract date from the first row. Please verify the file format.","warning")}}extractAumData(t){this.parsedData=[];let a=-1,r=-1,o=-1;for(let d=0;d<t.length;d++){let c=t[d];if(c&&Array.isArray(c)){for(let s=0;s<c.length;s++)c[s]&&c[s].toString().toLowerCase().includes("amc name")&&(a=d,r=s),c[s]&&c[s].toString().toLowerCase()==="aum"&&(o=s);if(a!==-1&&r!==-1&&o!==-1)break}}if(a===-1||r===-1||o===-1){v.default.fire("Error","Could not find required columns (AMC Name, AUM) in the Excel file.","error");return}for(let d=a+1;d<t.length;d++){let c=t[d];if(c&&Array.isArray(c)&&c[r]&&c[o]){let s=c[r].toString().trim(),f=this.parseAumAmount(c[o]);if(s&&f>0){let u=this.findMatchingAmc(s);this.parsedData.push({originalAmcName:s,amcName:s,aumAmount:f,amcId:u.amc?u.amc.id.toString():void 0,matched:!!u.amc,matchedAmcName:u.amc?u.amc.amcName:void 0,matchType:u.matchType,rowIndex:d+1})}}}this.showPreview=this.parsedData.length>0,this.parsedData.length===0&&v.default.fire("Warning","No valid AUM data found in the Excel file.","warning")}parseAumAmount(t){if(!t)return 0;let a=t.toString().replace(/,/g,""),r=parseFloat(a);return isNaN(r)?0:r}findMatchingAmc(t){let a=t.toLowerCase().trim(),r=this.amc.find(s=>s.amcName.toLowerCase().trim()===a);if(r)return{amc:r,matchType:"exact"};let o=a.replace(/\s*(mutual\s*fund|mf)\s*$/i,"").trim();if(r=this.amc.find(s=>s.amcName.toLowerCase().replace(/\s*(mutual\s*fund|mf)\s*$/i,"").trim()===o),r)return{amc:r,matchType:"fuzzy"};let c=o.split(/\s+/)[0];return c&&c.length>=3&&(r=this.amc.find(s=>{let f=s.amcName.toLowerCase().replace(/\s*(mutual\s*fund|mf)\s*$/i,"").trim();return f.split(/\s+/)[0]===c||f.includes(o)||o.includes(f)}),r)?{amc:r,matchType:"fuzzy"}:(r=this.amc.find(s=>{let f=s.amcName.toLowerCase().replace(/\s*(mutual\s*fund|mf)\s*$/i,"").trim();return f.includes(o)||o.includes(f)}),r?{amc:r,matchType:"fuzzy"}:{})}updateAmcSelection(t,a){let r=a.target.value;if(this.parsedData[t])if(this.parsedData[t].amcId=r,this.parsedData[t].matched=!!r,r){let o=this.amc.find(d=>d.id.toString()===r);this.parsedData[t].matchedAmcName=o?o.amcName:void 0,this.parsedData[t].matchType="manual"}else this.parsedData[t].matchedAmcName=void 0,this.parsedData[t].matchType=void 0}getMatchedCount(){return this.parsedData.filter(t=>t.matched).length}getUnmatchedCount(){return this.parsedData.filter(t=>!t.matched).length}checkForDuplicates(t,a,r){return A(this,null,function*(){try{return(yield I(this.aumEntryService.checkDuplicate(t,a,r))).exists}catch(o){return console.error("Error checking duplicates:",o),!1}})}onSubmit(){return A(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.uploadForm.invalid){yield v.default.fire({title:"Required Fields Missing",text:"Please select ARN and upload an Excel file.",icon:"error"});return}if(!this.showPreview||this.parsedData.length===0){yield v.default.fire("Error","No data to upload. Please select a valid Excel file.","error");return}let t=this.parsedData.filter(a=>!a.matched);if(!(t.length>0&&!(yield v.default.fire({title:"Unmatched AMCs Found",text:`${t.length} AMC(s) could not be matched. Do you want to proceed with only matched items?`,icon:"warning",showCancelButton:!0,confirmButtonText:"Proceed",cancelButtonText:"Cancel"})).isConfirmed)&&!this.loading){this.loading=!0;try{let a=this.parsedData.filter(u=>u.matched),r=0,o=0,d=0,c=[],s=this.f.aumArnNumber.value;for(let u of a){if(yield this.checkForDuplicates(s,u.amcId,this.extractedMonth)){d++,c.push(`${u.matchedAmcName} - Duplicate entry`);continue}let he={aumArnNumber:s,aumAmcName:u.amcId,aumAmount:u.aumAmount,aumMonth:this.extractedMonth,hideStatus:0};try{let y=yield I(this.aumEntryService.processAum(he,"0"));console.log("API Response:",y),y.code===1?r++:(o++,c.push(`${u.matchedAmcName} - ${y.message||"Unknown error"}`),console.error(`Failed to process ${u.matchedAmcName}:`,y))}catch(y){o++,c.push(`${u.matchedAmcName} - API Error`),console.error(`Error processing ${u.matchedAmcName}:`,y)}}let f=`Successfully uploaded ${r} entries.`;d>0&&(f+=` ${d} duplicates skipped.`),o>0&&(f+=` ${o} entries failed.`),c.length>0&&console.log("Failed items:",c),r>0?(yield v.default.fire("Upload Complete!",f,r===a.length-d?"success":"warning"),r>0&&this.router.navigate(["/forms/aum"])):yield v.default.fire("Upload Failed!","No entries were uploaded successfully.","error")}catch(a){console.error("Error during bulk upload:",a),yield v.default.fire("Failed!","An error occurred during the upload process.","error")}finally{this.loading=!1}}})}onReset(){this.customStylesValidated=!1,this.submitted=!1,this.uploadForm.reset(),this.selectedFile=null,this.parsedData=[],this.extractedMonth="",this.showPreview=!1}removeItem(t){this.parsedData.splice(t,1),this.parsedData.length===0&&(this.showPreview=!1)}static{this.\u0275fac=function(a){return new(a||l)(F(ce),F(L),F(pe))}}static{this.\u0275cmp=M({type:l,selectors:[["app-upload-aum-entry"]],standalone:!0,features:[U],decls:71,vars:14,consts:[["uploadFormRef","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cSelect","","id","arnSelect","formControlName","aumArnNumber","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","arnSelect",1,"ms-2"],[3,"valid",4,"ngIf"],["type","file","cFormControl","","id","excelFile","formControlName","excelFile","accept",".xlsx,.xls","required","",3,"change"],["cLabel","","for","excelFile",1,"form-label"],[1,"form-text"],["xs","12",4,"ngIf"],["cButton","","color","primary","type","submit",1,"me-2",3,"disabled"],["class","spinner-border spinner-border-sm me-2","role","status",4,"ngIf"],["class","fas fa-upload me-2",4,"ngIf"],["cButton","","color","secondary","type","button",3,"click","disabled"],[1,"fas","fa-refresh","me-2"],[3,"value"],[3,"valid"],[1,"alert","alert-info"],[1,"mt-3"],[1,"table-responsive"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[4,"ngFor","ngForOf"],[1,"row"],[1,"col-md-3"],[1,"alert","alert-success","mb-2"],[1,"fas","fa-check-circle","me-2"],[1,"alert","alert-warning","mb-2"],[1,"fas","fa-exclamation-triangle","me-2"],[1,"alert","alert-info","mb-2"],[1,"fas","fa-list","me-2"],[1,"alert","alert-primary","mb-2"],[1,"fas","fa-upload","me-2"],["class","alert alert-warning",4,"ngIf"],["class","matched-amc-display",4,"ngIf"],[4,"ngIf"],["type","button","cButton","","size","sm","color","danger","title","Remove this item",3,"click"],[1,"fas","fa-times","me-1"],[1,"matched-amc-display"],[1,"text-success"],[1,"text-muted"],[1,"fas","fa-check-circle","text-success","me-1"],["cSelect","",1,"form-select","form-select-sm",3,"change","value"],["value",""],[1,"text-muted","mt-1","d-block"],[1,"fas","fa-exclamation-triangle","text-warning","me-1"],[1,"alert","alert-warning"],[1,"fas","fa-info-circle","me-2"],["role","status",1,"spinner-border","spinner-border-sm","me-2"]],template:function(a,r){if(a&1){let o=N();i(0,"c-row"),e(1,`
  `),i(2,"c-col",1),e(3,`
    `),i(4,"c-card",2),e(5,`
      `),i(6,"c-card-header"),e(7,`
        `),i(8,"strong"),e(9,"Upload AUM Entry from Excel"),n(),e(10,`
      `),n(),e(11,`
      `),i(12,"c-card-body"),e(13,`
        `),i(14,"form",3,0),b("ngSubmit",function(){return C(o),w(r.onSubmit())}),e(16,`
          `),i(17,"c-col",4),e(18,`
            `),i(19,"select",5),e(20,`
              `),i(21,"option",6),e(22,"Select an ARN"),n(),e(23,`
              `),h(24,Ee,2,2,"option",7),e(25,`
            `),n(),e(26,`
            `),i(27,"label",8),e(28,"ARN"),n(),e(29,`
            `),h(30,_e,2,1,"c-form-feedback",9),e(31,`
          `),n(),e(32,`

          `),i(33,"c-col",4),e(34,`
            `),i(35,"input",10),b("change",function(c){return C(o),w(r.onFileSelected(c))}),n(),e(36,`
            `),i(37,"label",11),e(38,"Upload Excel File"),n(),e(39,`
            `),h(40,Se,2,1,"c-form-feedback",9),e(41,`
            `),i(42,"div",12),e(43,`
              Upload Excel file with AUM data. Expected format: First row should contain date, and columns should include AMC Name and AUM.
            `),n(),e(44,`
          `),n(),e(45,`

          `),e(46,`
          `),h(47,ye,8,1,"c-col",13),e(48,`

          `),e(49,`
          `),h(50,Ne,99,10,"c-col",13),e(51,`

          `),i(52,"c-col",1),e(53,`
            `),i(54,"button",14),e(55,`
              `),h(56,Ie,1,0,"span",15),e(57,`
              `),h(58,De,1,0,"i",16),e(59),n(),e(60,`
            `),i(61,"button",17),b("click",function(){return C(o),w(r.onReset())}),e(62,`
              `),g(63,"i",18),e(64,`
              Reset
            `),n(),e(65,`
          `),n(),e(66,`
        `),n(),e(67,`
      `),n(),e(68,`
    `),n(),e(69,`
  `),n(),e(70,`
`),n()}a&2&&(m(14),p("formGroup",r.uploadForm)("validated",r.customStylesValidated),m(3),p("cFormFloating",!0),m(7),p("ngForOf",r.arn),m(6),p("ngIf",r.f.aumArnNumber.errors&&(r.f.aumArnNumber.touched||r.submitted)),m(3),p("cFormFloating",!1),m(7),p("ngIf",r.f.excelFile.errors&&(r.f.excelFile.touched||r.submitted)),m(7),p("ngIf",r.extractedMonth),m(3),p("ngIf",r.showPreview),m(4),p("disabled",r.loading||!r.showPreview||r.getMatchedCount()===0),m(2),p("ngIf",r.loading),m(2),p("ngIf",!r.loading),m(),_(`
              `,r.loading?"Uploading...":"Upload AUM Data ("+r.getMatchedCount()+" entries)",`
            `),m(2),p("disabled",r.loading))},dependencies:[V,$,R,P,Q,K,O,W,z,de,ie,oe,le,Z,ae,ee,te,me,ne,re,J,se,q,X,H,G,j,B,Y]})}}return l})();export{it as UploadAumEntryComponent};
