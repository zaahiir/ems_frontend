import{a as ie}from"./chunk-AIQX5OXY.js";import{a as re}from"./chunk-AJEUVWKL.js";import{Aa as H,B as U,Ba as $,Ga as J,Ja as K,M as w,Ma as Q,N as V,Na as X,Oa as Y,P as O,Pa as Z,Q as M,Ra as ee,Ta as te,U as G,Ua as ne,V as R,Va as ae,Z as j,_ as W,q as T,x as L,y as q,ya as z,za as d}from"./chunk-K3LN6DFK.js";import{Bb as h,Ga as s,Ia as o,Lb as A,Mb as P,S as g,Sa as n,Sb as D,Ta as a,Ua as p,Ya as _,Z as C,_ as k,_a as b,dc as B,fc as E,jb as e,k as x,kb as N,l as F,pa as m,qa as f,sb as I}from"./chunk-WAGJM7NU.js";import{f as oe,g as S}from"./chunk-MYAK5QVS.js";var v=oe(re());function me(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please select a Statement Date."),a()),i&2&&o("valid",!1)}function le(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide an Investor Name."),a()),i&2&&o("valid",!1)}function se(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide an Investor PAN No."),a()),i&2&&o("valid",!1)}function ce(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please select an Investment Date."),a()),i&2&&o("valid",!1)}function de(i,c){if(i&1&&(n(0,"option",45),e(1),a()),i&2){let r=c.$implicit;o("value",r.id),m(),N(r.amcName)}}function pe(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please select an AMC."),a()),i&2&&o("valid",!1)}function ue(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Fund Name."),a()),i&2&&o("valid",!1)}function fe(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Cost of Investment."),a()),i&2&&o("valid",!1)}function Se(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Current Value."),a()),i&2&&o("valid",!1)}function ve(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please select a SIP Date."),a()),i&2&&o("valid",!1)}function ye(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SIP Amount."),a()),i&2&&o("valid",!1)}function Ce(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SWP Amount."),a()),i&2&&o("valid",!1)}function ke(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SIP Bank Name."),a()),i&2&&o("valid",!1)}function be(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SIP Bank Account Type."),a()),i&2&&o("valid",!1)}function xe(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide SIP Bank Account Last 4 Digits."),a()),i&2&&o("valid",!1)}function Fe(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Primary Bank Name."),a()),i&2&&o("valid",!1)}function ge(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Primary Bank Account Type."),a()),i&2&&o("valid",!1)}function _e(i,c){i&1&&(n(0,"c-form-feedback",44),e(1,"Please provide Primary Bank Last 4 Digits."),a()),i&2&&o("valid",!1)}var je=(()=>{class i{constructor(r,l,t,u,y){this.fb=r,this.router=l,this.route=t,this.statementService=u,this.cdr=y,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.statementId="0",this.amcs=[],this.statementUpdateForm=this.fb.group({statementDate:["",d.required],statementInvestorName:["",d.required],statementInvestorPanNo:["",d.required],statementInvestmentDate:["",d.required],statementAmcName:["",d.required],statementFundName:["",d.required],statementCostOfInvestment:["",d.required],statementCurrentValue:["",d.required],statementSipDate:["",d.required],statementSipAmount:["",d.required],statementSwpAmount:["",d.required],statementSipBankName:["",d.required],statementSipBankAccountType:["",d.required],statementSipBankAccountLastFourDigit:["",d.required],statementPrimaryBankName:["",d.required],statementPrimaryBankAccountType:["",d.required],statementPrimaryBankAccountLastFourDigit:["",d.required]})}ngOnInit(){return S(this,null,function*(){try{yield this.loadAmcs();let r=yield F(this.route.params);this.statementId=r.id||"0",yield this.loadStatementData()}catch(r){console.error("Error initializing component:",r)}})}get f(){return this.statementUpdateForm.controls}loadAmcs(){return S(this,null,function*(){try{let r=yield this.statementService.getAmc();this.amcs=r.data,this.cdr.detectChanges()}catch(r){console.error("Error loading AMCs:",r)}})}loadStatementData(){return S(this,null,function*(){try{let r=yield this.statementService.getStatementById(this.statementId.toString()).toPromise();if(r&&r.code===1&&r.data){let l=r.data,t=this.amcs.find(u=>u.amcName===l.statementAmcName)?.id;this.statementUpdateForm.patchValue({statementDate:l.statementDate,statementInvestorName:l.statementInvestorName,statementInvestorPanNo:l.statementInvestorPanNo,statementInvestmentDate:l.statementInvestmentDate,statementAmcName:t,statementFundName:l.statementFundName,statementCostOfInvestment:l.statementCostOfInvestment,statementCurrentValue:l.statementCurrentValue,statementSipDate:l.statementSipDate,statementSipAmount:l.statementSipAmount,statementSwpAmount:l.statementSwpAmount,statementSipBankName:l.statementSipBankName,statementSipBankAccountType:l.statementSipBankAccountType,statementSipBankAccountLastFourDigit:l.statementSipBankAccountLastFourDigit,statementPrimaryBankName:l.statementPrimaryBankName,statementPrimaryBankAccountType:l.statementPrimaryBankAccountType,statementPrimaryBankAccountLastFourDigit:l.statementPrimaryBankAccountLastFourDigit}),this.cdr.detectChanges()}}catch(r){console.error("Error loading Statement data:",r)}})}onSubmit(){return S(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.statementUpdateForm.invalid){Object.keys(this.statementUpdateForm.controls).forEach(t=>{let u=this.statementUpdateForm.get(t);u&&u.invalid&&u.markAsTouched()});return}console.log("Submit...");let r=this.statementUpdateForm.value,l={statementDate:r.statementDate,statementInvestorName:r.statementInvestorName,statementInvestorPanNo:r.statementInvestorPanNo,statementInvestmentDate:r.statementInvestmentDate,statementAmcName:r.statementAmcName,statementFundName:r.statementFundName,statementCostOfInvestment:r.statementCostOfInvestment,statementCurrentValue:r.statementCurrentValue,statementSipDate:r.statementSipDate,statementSipAmount:r.statementSipAmount,statementSwpAmount:r.statementSwpAmount,statementSipBankName:r.statementSipBankName,statementSipBankAccountType:r.statementSipBankAccountType,statementSipBankAccountLastFourDigit:r.statementSipBankAccountLastFourDigit,statementPrimaryBankName:r.statementPrimaryBankName,statementPrimaryBankAccountType:r.statementPrimaryBankAccountType,statementPrimaryBankAccountLastFourDigit:r.statementPrimaryBankAccountLastFourDigit,hideStatus:0};this.loading=!0;try{let t=yield x(this.statementService.processStatement(l,this.statementId));t.code==1?(yield v.default.fire("Updated!",t.message,"success"),this.router.navigate(["/forms/statement"])):yield v.default.fire("Failed!",t.message,"error")}catch(t){console.error("Error updating Statement:",t),yield v.default.fire("Failed!","An error occurred while updating the Statement entry.","error")}finally{this.loading=!1}})}onCancel(){this.customStylesValidated=!1,this.router.navigate(["/forms/statement"])}static{this.\u0275fac=function(l){return new(l||i)(f(te),f(E),f(B),f(ie),f(h))}}static{this.\u0275cmp=g({type:i,selectors:[["app-update-statement"]],standalone:!0,features:[I],decls:206,vars:37,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","statementDate","required","","type","date","placeholder","Statement Date"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","statementInvestorName","required","","type","text","placeholder","Investor Name"],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","statementInvestorPanNo","required","","type","text","placeholder","Investor PAN No"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","statementInvestmentDate","required","","type","date","placeholder","Investment Date"],["cLabel","","for","validationCustom04",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom05","formControlName","statementAmcName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","statementFundName","required","","type","text","placeholder","Fund Name"],["cLabel","","for","validationCustom06",1,"ms-2"],["cFormControl","","id","validationCustom07","formControlName","statementCostOfInvestment","required","","type","text","placeholder","Cost of Investment"],["cLabel","","for","validationCustom07",1,"ms-2"],["cFormControl","","id","validationCustom08","formControlName","statementCurrentValue","required","","type","text","placeholder","Current Value"],["cLabel","","for","validationCustom08",1,"ms-2"],["cFormControl","","id","validationCustom09","formControlName","statementSipDate","required","","type","date","placeholder","SIP Date"],["cLabel","","for","validationCustom09",1,"ms-2"],["cFormControl","","id","validationCustom10","formControlName","statementSipAmount","required","","type","text","placeholder","SIP Amount"],["cLabel","","for","validationCustom10",1,"ms-2"],["cFormControl","","id","validationCustom11","formControlName","statementSwpAmount","required","","type","text","placeholder","SWP Amount"],["cLabel","","for","validationCustom11",1,"ms-2"],["cFormControl","","id","validationCustom12","formControlName","statementSipBankName","required","","type","text","placeholder","SIP Bank Name"],["cLabel","","for","validationCustom12",1,"ms-2"],["cFormControl","","id","validationCustom13","formControlName","statementSipBankAccountType","required","","type","text","placeholder","SIP Bank Account Type"],["cLabel","","for","validationCustom13",1,"ms-2"],["cFormControl","","id","validationCustom14","formControlName","statementSipBankAccountLastFourDigit","required","","type","text","placeholder","SIP Bank Account Last 4 Digits"],["cLabel","","for","validationCustom14",1,"ms-2"],["cFormControl","","id","validationCustom15","formControlName","statementPrimaryBankName","required","","type","text","placeholder","Primary Bank Name"],["cLabel","","for","validationCustom15",1,"ms-2"],["cFormControl","","id","validationCustom16","formControlName","statementPrimaryBankAccountType","required","","type","text","placeholder","Primary Bank Account Type"],["cLabel","","for","validationCustom16",1,"ms-2"],["cFormControl","","id","validationCustom17","formControlName","statementPrimaryBankAccountLastFourDigit","required","","type","text","placeholder","Primary Bank Last 4 Digits"],["cLabel","","for","validationCustom17",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary",3,"click"],[3,"valid"],[3,"value"]],template:function(l,t){if(l&1){let u=_();n(0,"c-row"),e(1,`
  `),n(2,"c-col",1),e(3,`
    `),n(4,"c-card",2),e(5,`
      `),n(6,"c-card-header"),e(7,`
        `),n(8,"strong"),e(9,"Update Statement Entry Form"),a(),e(10,`
      `),a(),e(11,`
      `),n(12,"c-card-body"),e(13,`
        `),n(14,"form",3,0),b("ngSubmit",function(){return C(u),k(t.onSubmit())}),e(16,`
          `),n(17,"c-col",4),e(18,`
            `),p(19,"input",5),e(20,`
            `),n(21,"label",6),e(22,"Statement Date"),a(),e(23,`
            `),s(24,me,2,1,"c-form-feedback",7),e(25,`
          `),a(),e(26,`
          
          `),n(27,"c-col",4),e(28,`
            `),p(29,"input",8),e(30,`
            `),n(31,"label",9),e(32,"Investor Name"),a(),e(33,`
            `),s(34,le,2,1,"c-form-feedback",7),e(35,`
          `),a(),e(36,`
          
          `),n(37,"c-col",4),e(38,`
            `),p(39,"input",10),e(40,`
            `),n(41,"label",11),e(42,"Investor PAN No"),a(),e(43,`
            `),s(44,se,2,1,"c-form-feedback",7),e(45,`
          `),a(),e(46,`
          
          `),n(47,"c-col",4),e(48,`
            `),p(49,"input",12),e(50,`
            `),n(51,"label",13),e(52,"Investment Date"),a(),e(53,`
            `),s(54,ce,2,1,"c-form-feedback",7),e(55,`
          `),a(),e(56,`
          
          `),n(57,"c-col",4),e(58,`
            `),n(59,"select",14),e(60,`
              `),n(61,"option",15),e(62,"Select an AMC"),a(),e(63,`
              `),s(64,de,2,2,"option",16),e(65,`
            `),a(),e(66,`
            `),n(67,"label",17),e(68,"AMC Name"),a(),e(69,`
            `),s(70,pe,2,1,"c-form-feedback",7),e(71,`
          `),a(),e(72,`
          
          `),n(73,"c-col",4),e(74,`
            `),p(75,"input",18),e(76,`
            `),n(77,"label",19),e(78,"Fund Name"),a(),e(79,`
            `),s(80,ue,2,1,"c-form-feedback",7),e(81,`
          `),a(),e(82,`
          
          `),n(83,"c-col",4),e(84,`
            `),p(85,"input",20),e(86,`
            `),n(87,"label",21),e(88,"Cost of Investment"),a(),e(89,`
            `),s(90,fe,2,1,"c-form-feedback",7),e(91,`
          `),a(),e(92,`
          
          `),n(93,"c-col",4),e(94,`
            `),p(95,"input",22),e(96,`
            `),n(97,"label",23),e(98,"Current Value"),a(),e(99,`
            `),s(100,Se,2,1,"c-form-feedback",7),e(101,`
          `),a(),e(102,`
          
          `),n(103,"c-col",4),e(104,`
            `),p(105,"input",24),e(106,`
            `),n(107,"label",25),e(108,"SIP Date"),a(),e(109,`
            `),s(110,ve,2,1,"c-form-feedback",7),e(111,`
          `),a(),e(112,`
          
          `),n(113,"c-col",4),e(114,`
            `),p(115,"input",26),e(116,`
            `),n(117,"label",27),e(118,"SIP Amount"),a(),e(119,`
            `),s(120,ye,2,1,"c-form-feedback",7),e(121,`
          `),a(),e(122,`
          
          `),n(123,"c-col",4),e(124,`
            `),p(125,"input",28),e(126,`
            `),n(127,"label",29),e(128,"SWP Amount"),a(),e(129,`
            `),s(130,Ce,2,1,"c-form-feedback",7),e(131,`
          `),a(),e(132,`
          
          `),n(133,"c-col",4),e(134,`
            `),p(135,"input",30),e(136,`
            `),n(137,"label",31),e(138,"SIP Bank Name"),a(),e(139,`
            `),s(140,ke,2,1,"c-form-feedback",7),e(141,`
          `),a(),e(142,`
          
          `),n(143,"c-col",4),e(144,`
            `),p(145,"input",32),e(146,`
            `),n(147,"label",33),e(148,"SIP Bank Account Type"),a(),e(149,`
            `),s(150,be,2,1,"c-form-feedback",7),e(151,`
          `),a(),e(152,`
          
          `),n(153,"c-col",4),e(154,`
            `),p(155,"input",34),e(156,`
            `),n(157,"label",35),e(158,"SIP Bank Account Last 4 Digits"),a(),e(159,`
            `),s(160,xe,2,1,"c-form-feedback",7),e(161,`
          `),a(),e(162,`
          
          `),n(163,"c-col",4),e(164,`
            `),p(165,"input",36),e(166,`
            `),n(167,"label",37),e(168,"Primary Bank Name"),a(),e(169,`
            `),s(170,Fe,2,1,"c-form-feedback",7),e(171,`
          `),a(),e(172,`
          
          `),n(173,"c-col",4),e(174,`
            `),p(175,"input",38),e(176,`
            `),n(177,"label",39),e(178,"Primary Bank Account Type"),a(),e(179,`
            `),s(180,ge,2,1,"c-form-feedback",7),e(181,`
          `),a(),e(182,`
          
          `),n(183,"c-col",4),e(184,`
            `),p(185,"input",40),e(186,`
            `),n(187,"label",41),e(188,"Primary Bank Last 4 Digits"),a(),e(189,`
            `),s(190,_e,2,1,"c-form-feedback",7),e(191,`
          `),a(),e(192,`
          
          `),n(193,"c-col",1),e(194,`
            `),n(195,"button",42),e(196,`
              Update
            `),a(),e(197,`
            `),n(198,"button",43),b("click",function(){return C(u),k(t.onCancel())}),e(199,`
              Cancel
            `),a(),e(200,`
          `),a(),e(201,`
        `),a(),e(202,`
      `),a(),e(203,`
    `),a(),e(204,`
  `),a(),e(205,`
`),a()}l&2&&(m(14),o("formGroup",t.statementUpdateForm)("validated",t.customStylesValidated),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementDate.errors&&(t.f.statementDate.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementInvestorName.errors&&(t.f.statementInvestorName.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementInvestorPanNo.errors&&(t.f.statementInvestorPanNo.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementInvestmentDate.errors&&(t.f.statementInvestmentDate.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngForOf",t.amcs),m(6),o("ngIf",t.f.statementAmcName.errors&&(t.f.statementAmcName.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementFundName.errors&&(t.f.statementFundName.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementCostOfInvestment.errors&&(t.f.statementCostOfInvestment.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementCurrentValue.errors&&(t.f.statementCurrentValue.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementSipDate.errors&&(t.f.statementSipDate.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementSipAmount.errors&&(t.f.statementSipAmount.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementSwpAmount.errors&&(t.f.statementSwpAmount.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementSipBankName.errors&&(t.f.statementSipBankName.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementSipBankAccountType.errors&&(t.f.statementSipBankAccountType.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementSipBankAccountLastFourDigit.errors&&(t.f.statementSipBankAccountLastFourDigit.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementPrimaryBankName.errors&&(t.f.statementPrimaryBankName.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementPrimaryBankAccountType.errors&&(t.f.statementPrimaryBankAccountType.touched||t.submitted)),m(3),o("cFormFloating",!0),m(7),o("ngIf",t.f.statementPrimaryBankAccountLastFourDigit.errors&&(t.f.statementPrimaryBankAccountLastFourDigit.touched||t.submitted)))},dependencies:[D,A,P,W,j,L,U,R,q,ae,J,Y,Z,z,X,H,$,ee,K,Q,ne,w,M,G,V,O,T]})}}return i})();export{je as UpdateStatementComponent};
