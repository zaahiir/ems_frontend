import './polyfills.server.mjs';
import{a as Te}from"./chunk-IVRD3AOI.mjs";import{a as De,b as we}from"./chunk-UTQWTK35.mjs";import{a as Ge}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as Ee,Fa as ye,G as ie,Ga as _e,Ha as Ce,I as re,Ia as Fe,J as oe,K as ae,Ka as Ie,L as le,M as se,Ma as be,Na as Ne,O as ce,Oa as Ae,S as de,T as me,ca as pe,da as ue,j as Z,n as J,oa as he,q as ee,qa as fe,r as te,sa as G,ta as ge,u as ne,ua as xe,ya as Se,za as ve}from"./chunk-B4NKEOAB.mjs";import{d as Q}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as M,Fb as N,Gb as S,Lc as Y,Mb as $,Mc as q,Nb as P,Ob as B,Qb as t,Qc as z,Rb as v,Rc as X,Sa as d,Sb as E,Sc as H,Ta as w,Tb as O,Vb as L,Wb as j,Xb as K,Zb as W,bc as _,dc as C,f as k,ia as U,lb as f,nb as u,p as R,pb as V,sa as I,ta as b,xb as o,yb as a,zb as T}from"./chunk-S7ATBOQE.mjs";import{g as Re,h as y}from"./chunk-COT65Y5O.mjs";var g=Re(Ge());var ke=["fileInput"];function Ue(c,h){if(c&1&&(o(0,"option",21),t(1),a()),c&2){let e=h.$implicit;u("value",e.id),d(),v(e.arnNumber)}}function Ve(c,h){c&1&&(o(0,"c-form-feedback",22),t(1,`
              Please select an ARN.
            `),a()),c&2&&u("valid",!1)}function $e(c,h){c&1&&(o(0,"c-form-feedback",22),t(1,`
              Please select an Excel file.
            `),a()),c&2&&u("valid",!1)}function Pe(c,h){c&1&&T(0,"span",23)}function Be(c,h){if(c&1){let e=M();o(0,"form",9),t(1,`
          `),o(2,"c-col",10),t(3,`
            `),o(4,"select",11),t(5,`
              `),o(6,"option",12),t(7,"Select an ARN"),a(),t(8,`
              `),f(9,Ue,2,2,"option",13),t(10,`
            `),a(),t(11,`
            `),o(12,"label",14),t(13,"ARN Number"),a(),t(14,`
            `),f(15,Ve,2,1,"c-form-feedback",15),t(16,`
          `),a(),t(17,`

          `),o(18,"c-col",16),t(19,`
            `),o(20,"input",17,0),N("change",function(n){I(e);let i=S();return b(i.onFileSelected(n))}),a(),t(22,`
            `),f(23,$e,2,1,"c-form-feedback",15),t(24,`
          `),a(),t(25,`

          `),o(26,"c-col",1),t(27,`
            `),o(28,"button",18),N("click",function(){I(e);let n=S();return b(n.processExcelFile())}),t(29,`
              `),f(30,Pe,1,0,"span",19),t(31),a(),t(32,`
            `),o(33,"button",20),N("click",function(){I(e);let n=S();return b(n.onReset())}),t(34,`
              Reset
            `),a(),t(35,`
          `),a(),t(36,`
        `),a()}if(c&2){let e=S();u("formGroup",e.uploadForm),d(2),u("cFormFloating",!0),d(7),u("ngForOf",e.arn),d(6),u("ngIf",e.f.selectedArn.errors&&e.f.selectedArn.touched),d(8),u("ngIf",e.f.excelFile.errors&&e.f.excelFile.touched),d(5),u("disabled",e.loading||e.uploadForm.invalid),d(2),u("ngIf",e.loading),d(),E(`
              `,e.loading?"Processing...":"Process Excel File",`
            `)}}function Oe(c,h){if(c&1&&(o(0,"div",2),t(1,`
          `),o(2,"h6"),t(3,"Processing Records..."),a(),t(4,`
          `),o(5,"c-progress"),t(6,`
            `),o(7,"c-progress-bar",21),t(8),_(9,"number"),a(),t(10,`
          `),a(),t(11,`
          `),o(12,"small",24),t(13),a(),t(14,`
        `),a()),c&2){let e=S();d(7),u("value",e.processingProgress),d(),E("",C(9,4,e.processingProgress,"1.0-0"),"%"),d(5),O("",e.processedRecords," of ",e.totalRecords," records processed")}}function Le(c,h){if(c&1&&(o(0,"span"),t(1),a()),c&2){let e=S().$implicit;d(),E(`
                    `,e.matchedAmcName,`
                  `)}}function je(c,h){c&1&&(o(0,"span"),t(1,`
                    Not Matched
                  `),a())}function Ke(c,h){if(c&1&&(o(0,"small",36),t(1),T(2,"br"),t(3,`
                    `),a()),c&2){let e=h.$implicit;d(),E(`
                      \u2022 `,e,"")}}function We(c,h){if(c&1&&(o(0,"div",34),t(1,`
                    `),f(2,Ke,4,1,"small",35),t(3,`
                  `),a()),c&2){let e=S().$implicit;d(2),u("ngForOf",e.errors)}}function Ye(c,h){if(c&1){let e=M();o(0,"tr"),t(1,`
                `),o(2,"td"),t(3),a(),t(4,`
                `),o(5,"td"),t(6,`
                  `),o(7,"strong"),t(8),a(),t(9,`
                `),a(),t(10,`
                `),o(11,"td"),t(12),a(),t(13,`
                `),o(14,"td"),t(15),a(),t(16,`
                `),o(17,"td"),t(18),_(19,"date"),a(),t(20,`
                `),o(21,"td"),t(22),_(23,"number"),a(),t(24,`
                `),o(25,"td"),t(26),_(27,"number"),a(),t(28,`
                `),o(29,"td"),t(30),_(31,"number"),a(),t(32,`
                `),o(33,"td"),t(34),_(35,"number"),a(),t(36,`
                `),o(37,"td"),t(38),_(39,"number"),a(),t(40,`
                `),o(41,"td"),t(42,`
                  `),f(43,Le,2,1,"span",29),t(44,`
                  `),f(45,je,2,0,"span",29),t(46,`
                  `),t(47,`
                  `),f(48,We,4,1,"div",30),t(49,`
                `),a(),t(50,`
                `),o(51,"td"),t(52,`
                  `),o(53,"div",31),t(54,`
                    `),o(55,"c-form-check"),t(56,`
                      `),o(57,"input",32),K("ngModelChange",function(n){let i=I(e).$implicit;return j(i.gstRegistered,n)||(i.gstRegistered=n),b(n)}),a(),t(58,`
                      `),o(59,"label",33),t(60,`
                        GST Registered
                      `),a(),t(61,`
                    `),a(),t(62,`
                  `),a(),t(63,`
                `),a(),t(64,`
              `),a()}if(c&2){let e=h.$implicit,r=h.index;V("table-warning",e.isDuplicate)("table-danger",e.errors.length),d(3),v(e.sNo),d(5),v(e.invoicedTo),d(4),v(e.gstNo),d(3),v(e.invoiceNo),d(3),v(C(19,20,e.invoiceDate,"shortDate")),d(4),v(C(23,23,e.taxableValue,"1.2-2")),d(4),v(C(27,26,e.igst,"1.2-2")),d(4),v(C(31,29,e.cgst,"1.2-2")),d(4),v(C(35,32,e.sgst,"1.2-2")),d(4),v(C(39,35,e.totalInvoiceValue,"1.2-2")),d(5),u("ngIf",e.matchedAmcName),d(2),u("ngIf",!e.matchedAmcName),d(3),u("ngIf",e.errors.length),d(9),u("id","gst-reg-"+r),L("ngModel",e.gstRegistered),d(2),u("for","gst-reg-"+r)}}function qe(c,h){if(c&1&&(o(0,"div",25),t(1,`
          `),o(2,"table",26),t(3,`
            `),o(4,"thead"),t(5,`
              `),o(6,"tr"),t(7,`
                `),o(8,"th",27),t(9,"S.No"),a(),t(10,`
                `),o(11,"th",27),t(12,"Invoice To (Excel)"),a(),t(13,`
                `),o(14,"th",27),t(15,"GST No."),a(),t(16,`
                `),o(17,"th",27),t(18,"Invoice No."),a(),t(19,`
                `),o(20,"th",27),t(21,"Invoice Date"),a(),t(22,`
                `),o(23,"th",27),t(24,"Taxable Value"),a(),t(25,`
                `),o(26,"th",27),t(27,"IGST"),a(),t(28,`
                `),o(29,"th",27),t(30,"CGST"),a(),t(31,`
                `),o(32,"th",27),t(33,"SGST"),a(),t(34,`
                `),o(35,"th",27),t(36,"Total Value"),a(),t(37,`
                `),o(38,"th",27),t(39,"Matched AMC"),a(),t(40,`
                `),o(41,"th",27),t(42,"GST Registration"),a(),t(43,`
              `),a(),t(44,`
            `),a(),t(45,`

            `),t(46,`
            `),o(47,"tbody"),t(48,`
              `),f(49,Ye,65,38,"tr",28),t(50,`
            `),a(),t(51,`
          `),a(),t(52,`
        `),a()),c&2){let e=S();d(2),u("hover",!0)("striped",!0)("bordered",!0),d(47),u("ngForOf",e.excelData)}}function ze(c,h){if(c&1&&(o(0,"div",37),t(1,`
          `),o(2,"c-col",38),t(3,`
            `),o(4,"div",39),t(5,`
              `),o(6,"c-badge",40),t(7),a(),t(8,`
            `),a(),t(9,`
          `),a(),t(10,`
          `),o(11,"c-col",38),t(12,`
            `),o(13,"div",39),t(14,`
              `),o(15,"c-badge",41),t(16),a(),t(17,`
            `),a(),t(18,`
          `),a(),t(19,`
          `),o(20,"c-col",38),t(21,`
            `),o(22,"div",39),t(23,`
              `),o(24,"c-badge",42),t(25),a(),t(26,`
            `),a(),t(27,`
          `),a(),t(28,`
          `),o(29,"c-col",38),t(30,`
            `),o(31,"div",39),t(32,`
              `),o(33,"c-badge",43),t(34),a(),t(35,`
            `),a(),t(36,`
          `),a(),t(37,`
        `),a()),c&2){let e=S();d(7),E(`
                Total Records: `,e.excelData.length,`
              `),d(9),E(`
                Valid Records: `,e.getValidCount(),`
              `),d(9),E(`
                Duplicates: `,e.getDuplicateCount(),`
              `),d(9),E(`
                Errors: `,e.getErrorCount(),`
              `)}}function Xe(c,h){c&1&&T(0,"span",23)}function He(c,h){if(c&1){let e=M();o(0,"div",44),t(1,`
          `),o(2,"button",45),N("click",function(){I(e);let n=S();return b(n.saveSelectedEntries())}),t(3,`
            `),f(4,Xe,1,0,"span",19),t(5),a(),t(6,`
          `),o(7,"button",46),N("click",function(){I(e);let n=S();return b(n.onReset())}),t(8,`
            Upload New File
          `),a(),t(9,`
        `),a()}if(c&2){let e=S();d(2),u("disabled",e.getSelectedCount()===0||e.loading),d(2),u("ngIf",e.loading),d(),E(`
            Save (`,e.getSelectedCount(),`)
          `)}}function Qe(c,h){c&1&&(o(0,"div",47),t(1,`
          `),o(2,"h5",24),t(3,"No valid data found in the Excel file"),a(),t(4,`
          `),o(5,"p",24),t(6,"Please check the file format and try again."),a(),t(7,`
        `),a())}var vt=(()=>{class c{constructor(e,r,n){this.fb=e,this.router=r,this.gstEntryFormsService=n,this.loading=!1,this.processing=!1,this.uploaded=!1,this.amc=[],this.arn=[],this.excelData=[],this.selectedArn="",this.selectedFile=null,this.destroy$=new k,this.processingProgress=0,this.totalRecords=0,this.processedRecords=0,this.commonStopWords=["MUTUAL","FUND","FUNDS","MANAGEMENT","LTD","LIMITED","COMPANY","PVT","PRIVATE","ASSET","INVESTMENT","INVESTMENTS","ADVISORS","ADVISORS","MANAGERS","MANAGER","TRUSTEE","TRUSTEES","SERVICES","INDIA","INDIAN","GLOBAL","INTERNATIONAL","SECURITIES","CAPITAL","FINANCE","FINANCIAL","GROUP","CORPORATION","CORP","THE","AND","OF","FOR","WITH","AMC"],this.initForm()}initForm(){this.uploadForm=this.fb.group({selectedArn:["",G.required],excelFile:["",G.required]})}ngOnInit(){return y(this,null,function*(){yield this.loadAmcData(),yield this.loadArnData()})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}get f(){return this.uploadForm.controls}loadAmcData(){return y(this,null,function*(){try{let e=yield this.gstEntryFormsService.getAmc();this.amc=e.data,console.log("Loaded AMC data:",this.amc.length,"records")}catch(e){console.error("Error loading AMC data:",e),yield g.default.fire("Error","Failed to load AMC data","error")}})}loadArnData(){return y(this,null,function*(){try{let e=yield this.gstEntryFormsService.getArn();this.arn=e.data,console.log("Loaded ARN data:",this.arn.length,"records")}catch(e){console.error("Error loading ARN data:",e),yield g.default.fire("Error","Failed to load ARN data","error")}})}onFileSelected(e){let r=e.target.files[0];if(r){if(r.type!=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"&&r.type!=="application/vnd.ms-excel"){g.default.fire("Error","Please select a valid Excel file (.xlsx or .xls)","error"),this.fileInput.nativeElement.value="",this.selectedFile=null,this.uploadForm.get("excelFile")?.setErrors({required:!0}),this.uploadForm.get("excelFile")?.markAsTouched();return}this.selectedFile=r,this.uploadForm.get("excelFile")?.setValue("file-selected"),this.uploadForm.get("excelFile")?.setErrors(null)}else this.selectedFile=null,this.uploadForm.get("excelFile")?.setErrors({required:!0}),this.uploadForm.get("excelFile")?.markAsTouched()}processExcelFile(){return y(this,null,function*(){if(this.uploadForm.invalid){if(!this.f.selectedArn.value){yield g.default.fire("Error","Please select an ARN first","error");return}if(!this.selectedFile){yield g.default.fire("Error","Please select an Excel file","error");return}}this.loading=!0,this.selectedArn=this.f.selectedArn.value;try{if(!this.selectedFile)throw new Error("No file selected");let e=De(yield this.selectedFile.arrayBuffer(),{type:"array"}),r=e.Sheets[e.SheetNames[0]],n=we.sheet_to_json(r,{header:1});yield this.parseExcelData(n),this.uploaded=!0}catch(e){console.error("Error processing Excel file:",e),yield g.default.fire("Error","Failed to process Excel file","error")}finally{this.loading=!1}})}parseExcelData(e){return y(this,null,function*(){this.excelData=[];let r=-1;for(let n=0;n<e.length;n++)if(e[n]&&e[n].some(i=>typeof i=="string"&&(i.toLowerCase().includes("s.no")||i.toLowerCase().includes("serial")||i.toLowerCase().includes("s no")))){r=n;break}if(r===-1)throw new Error('Header row not found in Excel file. Please ensure your Excel file has a header row with "S.No." column.');for(let n=r+1;n<e.length;n++){let i=e[n];if(!i||i.length<10||!i[0]||!i[1])continue;let l=p=>Math.round((p+Number.EPSILON)*100)/100,m=p=>{if(p==null||p==="")return 0;let x=parseFloat(p.toString().replace(/[^\d.-]/g,""));return isNaN(x)?0:x},s={sNo:parseInt(i[0])||n-r,invoicedTo:i[1]?.toString().trim()||"",gstNo:i[2]?.toString().trim()||"",invoiceNo:i[3]?.toString().trim()||"",invoiceDate:this.parseExcelDate(i[4]),taxableValue:l(m(i[5])),igst:l(m(i[6])),cgst:l(m(i[7])),sgst:l(m(i[8])),totalInvoiceValue:l(m(i[9])),selected:!0,gstRegistered:m(i[6])>0||m(i[7])>0||m(i[8])>0,errors:[]};this.validateExcelRow(s),yield this.matchAmc(s),this.excelData.push(s)}yield this.checkDuplicates()})}validateExcelRow(e){e.invoicedTo||e.errors.push("Missing Invoiced To"),e.invoiceNo||e.errors.push("Missing Invoice Number"),e.invoiceDate||e.errors.push("Invalid Invoice Date"),e.totalInvoiceValue<=0&&e.errors.push("Invalid Total Invoice Value"),e.taxableValue<0&&e.errors.push("Taxable Value cannot be negative"),e.igst<0&&e.errors.push("IGST cannot be negative"),e.cgst<0&&e.errors.push("CGST cannot be negative"),e.sgst<0&&e.errors.push("SGST cannot be negative")}parseExcelDate(e){if(!e)return"";try{if(typeof e=="number"){let r=new Date(1900,0,1),n=new Date(r.getTime()+(e-2)*24*60*60*1e3);return n.getFullYear()<2e3&&n.setFullYear(n.getFullYear()+100),n.toISOString().split("T")[0]}if(typeof e=="string"){let r=e.trim().replace(/\s+/g," "),n=null;if(/^\d{1,2}-\w{3}-\d{2,4}$/.test(r)?n=new Date(r):n=new Date(r),n&&!isNaN(n.getTime()))return(n.getFullYear()<100||n.getFullYear()<2e3)&&n.setFullYear(n.getFullYear()+2e3),n.toISOString().split("T")[0]}return""}catch(r){return console.warn("Date parsing error:",r),""}}matchAmc(e){return y(this,null,function*(){if(!e.invoicedTo){e.errors.push("Cannot match AMC - Missing Invoice To field");return}let r=e.invoicedTo.toUpperCase().trim();console.log(`Matching AMC for: "${r}"`);let n=null,i=0;for(let l of this.amc){let m=l.amcName.toUpperCase().trim();if(m===r){n=l,i=1,console.log(`Exact match found: ${m}`);break}}if(!n){let l=this.performFuzzyMatching(r,this.amc);l.length>0&&(n=l[0].amc,i=l[0].score,console.log(`Fuzzy match found: ${n.amcName} (Score: ${i})`))}if(!n||i<.7){let l=this.findKeywordMatch(r,this.amc);l&&l.score>i&&(n=l.amc,i=l.score,console.log(`Keyword match found: ${n.amcName} (Score: ${i})`))}if(!n||i<.6){let l=this.findBrandMatch(r,this.amc);l&&l.score>i&&(n=l.amc,i=l.score,console.log(`Brand match found: ${n.amcName} (Score: ${i})`))}if(!n||i<.5){let l=this.findAcronymMatch(r,this.amc);l&&l.score>i&&(n=l.amc,i=l.score,console.log(`Acronym match found: ${n.amcName} (Score: ${i})`))}n&&i>=.4?(e.matchedAmcId=n.id.toString(),e.matchedAmcName=n.amcName,e.matchScore=i,console.log(`Final match: ${n.amcName} (Score: ${i})`)):(e.errors.push(`AMC not matched for: "${e.invoicedTo}"`),console.log(`No match found for: "${e.invoicedTo}"`))})}performFuzzyMatching(e,r){let n=[];for(let i of r){let l=i.amcName.toUpperCase().trim(),m=this.calculateSimilarity(e,l),s=this.calculateJaccardSimilarity(e,l),p=this.calculateContainmentScore(e,l),x=this.calculateTokenSimilarity(e,l),F=m*.3+s*.25+p*.25+x*.2;F>.3&&n.push({amc:i,score:F})}return n.sort((i,l)=>l.score-i.score)}findKeywordMatch(e,r){let n=this.extractMeaningfulKeywords(e),i=null,l=0;for(let m of r){let s=this.extractMeaningfulKeywords(m.amcName),p=this.calculateKeywordMatchScore(n,s);p>l&&p>.5&&(l=p,i={amc:m,score:p})}return i}findBrandMatch(e,r){let n=this.extractBrandNames(e);for(let i of n)if(i.length>=3)for(let l of r){let m=l.amcName.toUpperCase();if(m.includes(i)){let s=i.length/Math.max(e.length,m.length),p=Math.min(.8,s+.3);return{amc:l,score:p}}}return null}findAcronymMatch(e,r){let n=this.extractAcronyms(e);for(let i of n)if(i.length>=2)for(let l of r){let m=l.amcName.toUpperCase();if(m.includes(i))return{amc:l,score:.7};let p=m.split(/\s+/).filter(x=>!this.commonStopWords.includes(x)&&x.length>1).map(x=>x.charAt(0)).join("");if(p.includes(i)||i.includes(p))return{amc:l,score:.6}}return null}extractMeaningfulKeywords(e){let r=e.split(/\s+/).map(n=>n.replace(/[^A-Z0-9]/g,"")).filter(n=>n.length>2&&!this.commonStopWords.includes(n));return[...new Set(r)]}extractBrandNames(e){let r=e.split(/\s+/).map(n=>n.replace(/[^A-Z]/g,"")).filter(n=>n.length>=3&&!this.commonStopWords.includes(n));return[...new Set(r)]}extractAcronyms(e){let r=e.match(/\b[A-Z]{2,}\b/g)||[];return[...new Set(r)]}calculateKeywordMatchScore(e,r){if(e.length===0||r.length===0)return 0;let n=0,i=0;for(let l of e){let m=0;for(let s of r)if(l===s){m=1;break}else if(l.includes(s)||s.includes(l))m=Math.max(m,.8);else{let p=this.calculateSimilarity(l,s);p>.7&&(m=Math.max(m,p))}m>0&&(n+=m,i++)}return i>0?n/Math.max(e.length,r.length):0}calculateJaccardSimilarity(e,r){let n=new Set(e.split("")),i=new Set(r.split("")),l=new Set([...n].filter(s=>i.has(s))),m=new Set([...n,...i]);return l.size/m.size}calculateContainmentScore(e,r){let n=e.length<r.length?e:r,i=e.length<r.length?r:e,l=0,m=n.split(/\s+/).filter(s=>s.length>2);for(let s of m)i.includes(s)&&(l+=s.length/n.length);return Math.min(1,l)}calculateTokenSimilarity(e,r){let n=e.split(/\s+/).filter(s=>s.length>1),i=r.split(/\s+/).filter(s=>s.length>1);if(n.length===0||i.length===0)return 0;let l=0,m=0;for(let s of n){let p=0;for(let x of i){let F=this.calculateSimilarity(s,x);p=Math.max(p,F)}p>.6&&(m+=p,l++)}return l>0?m/Math.max(n.length,i.length):0}calculateSimilarity(e,r){if(e===r)return 1;let n=e.length>r.length?e:r,i=e.length>r.length?r:e;if(n.length===0)return 1;let l=this.levenshteinDistance(n,i);return(n.length-l)/n.length}levenshteinDistance(e,r){let n=Array(r.length+1).fill(null).map(()=>Array(e.length+1).fill(0));for(let i=0;i<=r.length;i++)n[i][0]=i;for(let i=0;i<=e.length;i++)n[0][i]=i;for(let i=1;i<=r.length;i++)for(let l=1;l<=e.length;l++)r.charAt(i-1)===e.charAt(l-1)?n[i][l]=n[i-1][l-1]:n[i][l]=Math.min(n[i-1][l-1]+1,n[i][l-1]+1,n[i-1][l]+1);return n[r.length][e.length]}checkDuplicates(){return y(this,null,function*(){this.processing=!0,this.totalRecords=this.excelData.filter(e=>e.matchedAmcId&&e.invoiceDate).length,this.processedRecords=0;for(let e of this.excelData)if(e.matchedAmcId&&e.invoiceDate&&e.invoiceNo){try{let r=yield R(this.gstEntryFormsService.checkDuplicate(this.selectedArn,e.matchedAmcId,e.invoiceNo,e.invoiceDate));e.isDuplicate=r.exists,e.duplicateCheck=!0,e.isDuplicate&&(e.selected=!1,e.errors.push("Duplicate entry found for this ARN, AMC, Invoice Number and Date"))}catch(r){console.error("Error checking duplicate:",r),e.duplicateCheck=!1}this.processedRecords++,this.processingProgress=this.processedRecords/this.totalRecords*100}this.processing=!1})}getSelectedCount(){return this.excelData.filter(e=>e.selected&&e.errors.length===0).length}getValidCount(){return this.excelData.filter(e=>e.errors.length===0).length}getErrorCount(){return this.excelData.filter(e=>e.errors.length>0).length}getDuplicateCount(){return this.excelData.filter(e=>e.isDuplicate).length}getMatchedCount(){return this.excelData.filter(e=>e.matchedAmcId).length}getUnmatchedCount(){return this.excelData.filter(e=>!e.matchedAmcId).length}hasErrors(e){return e.errors.length>0}getRowErrorCount(e){return e.errors.length}saveSelectedEntries(){return y(this,null,function*(){let e=this.excelData.filter(s=>s.selected&&s.errors.length===0);if(e.length===0){yield g.default.fire("Warning","No valid entries selected for saving","warning");return}if(!(yield g.default.fire({title:"Confirm Save",text:`Save ${e.length} GST entries?`,icon:"question",showCancelButton:!0,confirmButtonText:"Yes, Save",cancelButtonText:"Cancel"})).isConfirmed)return;this.loading=!0,this.processing=!0,this.totalRecords=e.length,this.processedRecords=0,g.default.fire({title:"Processing...",html:`
        <div>
          <p>Saving GST entries...</p>
          <div class="progress" style="height: 20px; margin: 10px 0;">
            <div class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style="width: 0%; background-color: #007bff;"
                id="save-progress-bar">
              <span id="save-progress-text">0%</span>
            </div>
          </div>
          <p><span id="save-status">0 of ${e.length} entries processed</span></p>
        </div>
      `,allowOutsideClick:!1,allowEscapeKey:!1,showConfirmButton:!1,didOpen:()=>{g.default.showLoading()}});let n=0,i=0,l=[],m=s=>Math.round((s+Number.EPSILON)*100)/100;for(let s of e){try{let A={gstInvoiceDate:s.invoiceDate,gstInvoiceNumber:s.invoiceNo,gstAmcName:s.matchedAmcId,gstArnNumber:this.selectedArn,gstRegistered:s.gstRegistered,gstTotalValue:m(s.totalInvoiceValue),gstTaxableValue:m(s.taxableValue),gstIGst:m(s.igst),gstSGst:m(s.sgst),gstCGst:m(s.cgst),hideStatus:0},D=yield R(this.gstEntryFormsService.processGst(A,"0"));if(D.code===1)n++,s.selected=!1;else{i++;let Me=`Row ${s.sNo}: ${D.message}`;l.push(Me),s.errors.push(`Save failed: ${D.message}`)}}catch{i++;let D=`Row ${s.sNo}: Network error`;l.push(D),s.errors.push("Save failed: Network error")}this.processedRecords++,this.processingProgress=this.processedRecords/this.totalRecords*100;let p=document.getElementById("save-progress-bar"),x=document.getElementById("save-progress-text"),F=document.getElementById("save-status");if(p&&x&&F){let A=Math.round(this.processingProgress);p.style.width=`${A}%`,x.textContent=`${A}%`,F.textContent=`${this.processedRecords} of ${this.totalRecords} entries processed`}}this.processing=!1,this.loading=!1,g.default.close(),n>0&&i===0?(yield g.default.fire("Success",`All ${n} entries saved successfully!`,"success"),this.router.navigate(["/forms/gst"])):n>0&&i>0?yield g.default.fire({title:"Partial Success",html:`
          <p><strong>${n}</strong> entries saved successfully</p>
          <p><strong>${i}</strong> entries failed</p>
          <div style="max-height: 200px; overflow-y: auto; text-align: left;">
            ${l.map(s=>`<small>\u2022 ${s}</small>`).join("<br>")}
          </div>
        `,icon:"warning"}):yield g.default.fire({title:"Save Failed",html:`
          <p>All entries failed to save:</p>
          <div style="max-height: 200px; overflow-y: auto; text-align: left;">
            ${l.map(s=>`<small>\u2022 ${s}</small>`).join("<br>")}
          </div>
        `,icon:"error"})})}onReset(){this.uploadForm.reset(),this.excelData=[],this.uploaded=!1,this.processing=!1,this.processingProgress=0,this.processedRecords=0,this.totalRecords=0,this.selectedFile=null,this.fileInput&&(this.fileInput.nativeElement.value="")}static{this.\u0275fac=function(r){return new(r||c)(w(be),w(Q),w(Te))}}static{this.\u0275cmp=U({type:c,selectors:[["app-upload-gst-entry-form"]],viewQuery:function(r,n){if(r&1&&$(ke,5),r&2){let i;P(i=B())&&(n.fileInput=i.first)}},standalone:!0,features:[W],decls:35,vars:6,consts:[["fileInput",""],["xs","12"],[1,"mb-4"],["class","row g-3 mb-4",3,"formGroup",4,"ngIf"],["class","mb-4",4,"ngIf"],["class","table-responsive",4,"ngIf"],["class","row mb-4",4,"ngIf"],["class","mb-3",4,"ngIf"],["class","text-center py-4",4,"ngIf"],[1,"row","g-3","mb-4",3,"formGroup"],["md","6",3,"cFormFloating"],["cSelect","","cFormControl","","id","arnSelect","formControlName","selectedArn","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","arnSelect",1,"ms-2"],[3,"valid",4,"ngIf"],["md","6"],["type","file","accept",".xlsx,.xls","required","",1,"form-control",3,"change"],["cButton","","color","primary","type","button",3,"click","disabled"],["class","spinner-border spinner-border-sm me-2",4,"ngIf"],["cButton","","color","secondary","type","button",1,"ms-2",3,"click"],[3,"value"],[3,"valid"],[1,"spinner-border","spinner-border-sm","me-2"],[1,"text-muted"],[1,"table-responsive"],["cTable","",3,"hover","striped","bordered"],["scope","col"],[3,"table-warning","table-danger",4,"ngFor","ngForOf"],[4,"ngIf"],["class","mt-1",4,"ngIf"],[1,"d-flex","justify-content-center"],["cFormCheckInput","","type","checkbox",3,"ngModelChange","id","ngModel"],["cFormCheckLabel","",1,"ms-1",3,"for"],[1,"mt-1"],["class","text-danger",4,"ngFor","ngForOf"],[1,"text-danger"],[1,"row","mb-4"],["md","3"],[1,"d-grid"],["color","primary",1,"p-2"],["color","success",1,"p-2"],["color","warning",1,"p-2"],["color","danger",1,"p-2"],[1,"mb-3"],["cButton","","color","primary",3,"click","disabled"],["cButton","","color","secondary",1,"ms-2",3,"click"],[1,"text-center","py-4"]],template:function(r,n){r&1&&(o(0,"c-row"),t(1,`
  `),o(2,"c-col",1),t(3,`
    `),o(4,"c-card",2),t(5,`
      `),o(6,"c-card-header"),t(7,`
        `),o(8,"strong"),t(9,"Upload GST Entry Form"),a(),t(10,`
      `),a(),t(11,`
      `),o(12,"c-card-body"),t(13,`
        `),t(14,`
        `),f(15,Be,37,8,"form",3),t(16,`

        `),t(17,`
        `),f(18,Oe,15,7,"div",4),t(19,`

        `),t(20,`
        `),f(21,qe,53,4,"div",5),t(22,`

        `),t(23,`
        `),f(24,ze,38,4,"div",6),t(25,`

        `),t(26,`
        `),f(27,He,10,3,"div",7),t(28,`

        `),t(29,`
        `),f(30,Qe,8,0,"div",8),t(31,`
      `),a(),t(32,`
    `),a(),t(33,`
  `),a(),t(34,`
`),a()),r&2&&(d(15),u("ngIf",!n.uploaded),d(3),u("ngIf",n.processing),d(3),u("ngIf",n.uploaded&&n.excelData.length>0),d(3),u("ngIf",n.uploaded&&!n.processing),d(3),u("ngIf",n.uploaded&&!n.processing),d(3),u("ngIf",n.uploaded&&n.excelData.length===0))},dependencies:[q,H,Y,X,z,me,de,ee,ce,ne,te,Ae,ve,Ce,Fe,fe,_e,ge,xe,Ie,Ee,ye,Ne,Se,oe,ie,re,le,se,ae,Z,he,ue,pe,J]})}}return c})();export{vt as UploadGstEntryFormComponent};
