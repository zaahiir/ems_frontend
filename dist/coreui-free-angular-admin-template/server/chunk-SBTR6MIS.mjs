import './polyfills.server.mjs';
import{a as ee}from"./chunk-I62Y5RZT.mjs";import{a as ie}from"./chunk-72TWDDAR.mjs";import"./chunk-XVVEKXPH.mjs";import{Ca as $,F as T,Fa as z,G as L,Ga as J,Ha as K,I as q,Ia as Q,J as w,Ka as U,Ma as X,N as V,Na as Y,O,Oa as Z,S as M,T as G,j as P,q as E,r as D,ra as R,sa as s,ta as j,u as B,ua as W,za as H}from"./chunk-B4NKEOAB.mjs";import{d as A}from"./chunk-M3IOWYDM.mjs";import"./chunk-6SRIGPTT.mjs";import{Db as F,Fb as b,Lc as h,Mc as N,Qb as e,Rb as _,Sa as o,Sc as I,Ta as v,Zb as g,ia as k,lb as m,nb as r,p as x,sa as C,ta as y,xb as n,yb as i,zb as c}from"./chunk-S7ATBOQE.mjs";import{g as ne,h as f}from"./chunk-COT65Y5O.mjs";var S=ne(ie());function ae(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please select a Statement Date."),i()),a&2&&r("valid",!1)}function re(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide an Investor Name."),i()),a&2&&r("valid",!1)}function oe(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide an Investor PAN No."),i()),a&2&&r("valid",!1)}function me(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please select an Investment Date."),i()),a&2&&r("valid",!1)}function le(a,l){if(a&1&&(n(0,"option",45),e(1),i()),a&2){let d=l.$implicit;r("value",d.id),o(),_(d.amcName)}}function se(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please select an AMC."),i()),a&2&&r("valid",!1)}function ce(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Fund Name."),i()),a&2&&r("valid",!1)}function de(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Cost of Investment."),i()),a&2&&r("valid",!1)}function pe(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Current Value."),i()),a&2&&r("valid",!1)}function ue(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please select a SIP Date."),i()),a&2&&r("valid",!1)}function fe(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SIP Amount."),i()),a&2&&r("valid",!1)}function ve(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SWP Amount."),i()),a&2&&r("valid",!1)}function Se(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SIP Bank Name."),i()),a&2&&r("valid",!1)}function Ce(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SIP Bank Account Type."),i()),a&2&&r("valid",!1)}function ye(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a SIP Bank Account Last 4 Digits."),i()),a&2&&r("valid",!1)}function be(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Primary Bank Name."),i()),a&2&&r("valid",!1)}function xe(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Primary Bank Account Type."),i()),a&2&&r("valid",!1)}function ke(a,l){a&1&&(n(0,"c-form-feedback",44),e(1,"Please provide a Primary Bank Last 4 Digits."),i()),a&2&&r("valid",!1)}var je=(()=>{class a{constructor(d,p,t){this.fb=d,this.router=p,this.statementService=t,this.customStylesValidated=!1,this.loading=!1,this.submitted=!1,this.amc=[],this.statementCreateForm=this.fb.group({statementDate:["",s.required],statementInvestorName:["",s.required],statementInvestorPanNo:["",s.required],statementInvestmentDate:["",s.required],statementAmcName:["",s.required],statementFundName:["",s.required],statementCostOfInvestment:["",s.required],statementCurrentValue:["",s.required],statementSipDate:["",s.required],statementSipAmount:["",s.required],statementSwpAmount:["",s.required],statementSipBankName:["",s.required],statementSipBankAccountType:["",s.required],statementSipBankAccountLastFourDigit:["",s.required],statementPrimaryBankName:["",s.required],statementPrimaryBankAccountType:["",s.required],statementPrimaryBankAccountLastFourDigit:["",s.required]})}ngOnInit(){return f(this,null,function*(){yield this.loadAmcData()})}get f(){return this.statementCreateForm.controls}loadAmcData(){return f(this,null,function*(){try{let d=yield this.statementService.getAmc();this.amc=d.data}catch(d){console.error("Error loading AMCs:",d)}})}onSubmit(){return f(this,null,function*(){if(this.customStylesValidated=!0,this.submitted=!0,this.statementCreateForm.invalid){Object.keys(this.statementCreateForm.controls).forEach(t=>{let u=this.statementCreateForm.get(t);u&&u.invalid&&u.markAsTouched()});return}console.log("Submit...");let d={statementDate:this.f.statementDate.value,statementInvestorName:this.f.statementInvestorName.value,statementInvestorPanNo:this.f.statementInvestorPanNo.value,statementInvestmentDate:this.f.statementInvestmentDate.value,statementAmcName:this.f.statementAmcName.value,statementFundName:this.f.statementFundName.value,statementCostOfInvestment:this.f.statementCostOfInvestment.value,statementCurrentValue:this.f.statementCurrentValue.value,statementSipDate:this.f.statementSipDate.value,statementSipAmount:this.f.statementSipAmount.value,statementSwpAmount:this.f.statementSwpAmount.value,statementSipBankName:this.f.statementSipBankName.value,statementSipBankAccountType:this.f.statementSipBankAccountType.value,statementSipBankAccountLastFourDigit:this.f.statementSipBankAccountLastFourDigit.value,statementPrimaryBankName:this.f.statementPrimaryBankName.value,statementPrimaryBankAccountType:this.f.statementPrimaryBankAccountType.value,statementPrimaryBankAccountLastFourDigit:this.f.statementPrimaryBankAccountLastFourDigit.value,hideStatus:0},p="0";this.loading=!0;try{let t=yield x(this.statementService.processStatement(d,"0"));t.code==1?(yield S.default.fire("Added!",t.message,"success"),this.router.navigate(["/forms/statement"])):yield S.default.fire("Failed!",t.message,"error")}catch(t){yield S.default.fire("Failed!","An error occurred while processing the statement.","error"),console.error("Error processing statement:",t)}finally{this.loading=!1}})}onReset(){this.customStylesValidated=!1,console.log("Reset... 1")}static{this.\u0275fac=function(p){return new(p||a)(v(X),v(A),v(ee))}}static{this.\u0275cmp=k({type:a,selectors:[["app-create-statement"]],standalone:!0,features:[g],decls:206,vars:37,consts:[["customStylesForm","ngForm"],["xs","12"],[1,"mb-4"],["cForm","",1,"row","g-3","needs-validation",3,"ngSubmit","formGroup","validated"],["md","6",3,"cFormFloating"],["cFormControl","","id","validationCustom01","formControlName","statementDate","required","","type","date","placeholder","Statement Date"],["cLabel","","for","validationCustom01",1,"ms-2"],[3,"valid",4,"ngIf"],["cFormControl","","id","validationCustom02","formControlName","statementInvestorName","required","","type","text","placeholder","Investor Name"],["cLabel","","for","validationCustom02",1,"ms-2"],["cFormControl","","id","validationCustom03","formControlName","statementInvestorPanNo","required","","type","text","placeholder","Investor PAN No"],["cLabel","","for","validationCustom03",1,"ms-2"],["cFormControl","","id","validationCustom04","formControlName","statementInvestmentDate","required","","type","date","placeholder","Investment Date"],["cLabel","","for","validationCustom04",1,"ms-2"],["cSelect","","cFormControl","","id","validationCustom05","formControlName","statementAmcName","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["cLabel","","for","validationCustom05",1,"ms-2"],["cFormControl","","id","validationCustom06","formControlName","statementFundName","required","","type","text","placeholder","Fund Name"],["cLabel","","for","validationCustom06",1,"ms-2"],["cFormControl","","id","validationCustom07","formControlName","statementCostOfInvestment","required","","type","text","placeholder","Cost of Investment"],["cLabel","","for","validationCustom07",1,"ms-2"],["cFormControl","","id","validationCustom08","formControlName","statementCurrentValue","required","","type","text","placeholder","Current Value"],["cLabel","","for","validationCustom08",1,"ms-2"],["cFormControl","","id","validationCustom09","formControlName","statementSipDate","required","","type","date","placeholder","SIP Date"],["cLabel","","for","validationCustom09",1,"ms-2"],["cFormControl","","id","validationCustom10","formControlName","statementSipAmount","required","","type","text","placeholder","SIP Amount"],["cLabel","","for","validationCustom10",1,"ms-2"],["cFormControl","","id","validationCustom11","formControlName","statementSwpAmount","required","","type","text","placeholder","SWP Amount"],["cLabel","","for","validationCustom11",1,"ms-2"],["cFormControl","","id","validationCustom12","formControlName","statementSipBankName","required","","type","text","placeholder","SIP Bank Name"],["cLabel","","for","validationCustom12",1,"ms-2"],["cFormControl","","id","validationCustom13","formControlName","statementSipBankAccountType","required","","type","text","placeholder","SIP Bank Account Type"],["cLabel","","for","validationCustom13",1,"ms-2"],["cFormControl","","id","validationCustom14","formControlName","statementSipBankAccountLastFourDigit","required","","type","text","placeholder","SIP Bank Account Last 4 Digits"],["cLabel","","for","validationCustom14",1,"ms-2"],["cFormControl","","id","validationCustom15","formControlName","statementPrimaryBankName","required","","type","text","placeholder","Primary Bank Name"],["cLabel","","for","validationCustom15",1,"ms-2"],["cFormControl","","id","validationCustom16","formControlName","statementPrimaryBankAccountType","required","","type","text","placeholder","Primary Bank Account Type"],["cLabel","","for","validationCustom16",1,"ms-2"],["cFormControl","","id","validationCustom17","formControlName","statementPrimaryBankAccountLastFourDigit","required","","type","text","placeholder","Primary Bank Last 4 Digits"],["cLabel","","for","validationCustom17",1,"ms-2"],["cButton","","color","primary","type","submit",1,"me-1"],["cButton","","color","secondary","type","reset",3,"click"],[3,"valid"],[3,"value"]],template:function(p,t){if(p&1){let u=F();n(0,"c-row"),e(1,`
  `),n(2,"c-col",1),e(3,`
    `),n(4,"c-card",2),e(5,`
      `),n(6,"c-card-header"),e(7,`
        `),n(8,"strong"),e(9,"New Statement Entry Form"),i(),e(10,`
      `),i(),e(11,`
      `),n(12,"c-card-body"),e(13,`
        `),n(14,"form",3,0),b("ngSubmit",function(){return C(u),y(t.onSubmit())}),e(16,`
          `),n(17,"c-col",4),e(18,`
            `),c(19,"input",5),e(20,`
            `),n(21,"label",6),e(22,"Statement Date"),i(),e(23,`
            `),m(24,ae,2,1,"c-form-feedback",7),e(25,`
          `),i(),e(26,`
          
          `),n(27,"c-col",4),e(28,`
            `),c(29,"input",8),e(30,`
            `),n(31,"label",9),e(32,"Investor Name"),i(),e(33,`
            `),m(34,re,2,1,"c-form-feedback",7),e(35,`
          `),i(),e(36,`
          
          `),n(37,"c-col",4),e(38,`
            `),c(39,"input",10),e(40,`
            `),n(41,"label",11),e(42,"Investor PAN No"),i(),e(43,`
            `),m(44,oe,2,1,"c-form-feedback",7),e(45,`
          `),i(),e(46,`
          
          `),n(47,"c-col",4),e(48,`
            `),c(49,"input",12),e(50,`
            `),n(51,"label",13),e(52,"Investment Date"),i(),e(53,`
            `),m(54,me,2,1,"c-form-feedback",7),e(55,`
          `),i(),e(56,`
          
          `),n(57,"c-col",4),e(58,`
            `),n(59,"select",14),e(60,`
              `),n(61,"option",15),e(62,"Select an AMC"),i(),e(63,`
              `),m(64,le,2,2,"option",16),e(65,`
            `),i(),e(66,`
            `),n(67,"label",17),e(68,"AMC Name"),i(),e(69,`
            `),m(70,se,2,1,"c-form-feedback",7),e(71,`
          `),i(),e(72,`
          
          `),n(73,"c-col",4),e(74,`
            `),c(75,"input",18),e(76,`
            `),n(77,"label",19),e(78,"Fund Name"),i(),e(79,`
            `),m(80,ce,2,1,"c-form-feedback",7),e(81,`
          `),i(),e(82,`
          
          `),n(83,"c-col",4),e(84,`
            `),c(85,"input",20),e(86,`
            `),n(87,"label",21),e(88,"Cost of Investment"),i(),e(89,`
            `),m(90,de,2,1,"c-form-feedback",7),e(91,`
          `),i(),e(92,`
          
          `),n(93,"c-col",4),e(94,`
            `),c(95,"input",22),e(96,`
            `),n(97,"label",23),e(98,"Current Value"),i(),e(99,`
            `),m(100,pe,2,1,"c-form-feedback",7),e(101,`
          `),i(),e(102,`
          
          `),n(103,"c-col",4),e(104,`
            `),c(105,"input",24),e(106,`
            `),n(107,"label",25),e(108,"SIP Date"),i(),e(109,`
            `),m(110,ue,2,1,"c-form-feedback",7),e(111,`
          `),i(),e(112,`
          
          `),n(113,"c-col",4),e(114,`
            `),c(115,"input",26),e(116,`
            `),n(117,"label",27),e(118,"SIP Amount"),i(),e(119,`
            `),m(120,fe,2,1,"c-form-feedback",7),e(121,`
          `),i(),e(122,`
          
          `),n(123,"c-col",4),e(124,`
            `),c(125,"input",28),e(126,`
            `),n(127,"label",29),e(128,"SWP Amount"),i(),e(129,`
            `),m(130,ve,2,1,"c-form-feedback",7),e(131,`
          `),i(),e(132,`
          
          `),n(133,"c-col",4),e(134,`
            `),c(135,"input",30),e(136,`
            `),n(137,"label",31),e(138,"SIP Bank Name"),i(),e(139,`
            `),m(140,Se,2,1,"c-form-feedback",7),e(141,`
          `),i(),e(142,`
          
          `),n(143,"c-col",4),e(144,`
            `),c(145,"input",32),e(146,`
            `),n(147,"label",33),e(148,"SIP Bank Account Type"),i(),e(149,`
            `),m(150,Ce,2,1,"c-form-feedback",7),e(151,`
          `),i(),e(152,`
          
          `),n(153,"c-col",4),e(154,`
            `),c(155,"input",34),e(156,`
            `),n(157,"label",35),e(158,"SIP Bank Account Last 4 Digits"),i(),e(159,`
            `),m(160,ye,2,1,"c-form-feedback",7),e(161,`
          `),i(),e(162,`
          
          `),n(163,"c-col",4),e(164,`
            `),c(165,"input",36),e(166,`
            `),n(167,"label",37),e(168,"Primary Bank Name"),i(),e(169,`
            `),m(170,be,2,1,"c-form-feedback",7),e(171,`
          `),i(),e(172,`
          
          `),n(173,"c-col",4),e(174,`
            `),c(175,"input",38),e(176,`
            `),n(177,"label",39),e(178,"Primary Bank Account Type"),i(),e(179,`
            `),m(180,xe,2,1,"c-form-feedback",7),e(181,`
          `),i(),e(182,`
          
          `),n(183,"c-col",4),e(184,`
            `),c(185,"input",40),e(186,`
            `),n(187,"label",41),e(188,"Primary Bank Last 4 Digits"),i(),e(189,`
            `),m(190,ke,2,1,"c-form-feedback",7),e(191,`
          `),i(),e(192,`
          
          `),n(193,"c-col",1),e(194,`
            `),n(195,"button",42),e(196,`
              Save
            `),i(),e(197,`
            `),n(198,"button",43),b("click",function(){return C(u),y(t.onReset())}),e(199,`
              Reset
            `),i(),e(200,`
          `),i(),e(201,`
        `),i(),e(202,`
      `),i(),e(203,`
    `),i(),e(204,`
  `),i(),e(205,`
`),i()}p&2&&(o(14),r("formGroup",t.statementCreateForm)("validated",t.customStylesValidated),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementDate.errors&&(t.f.statementDate.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementInvestorName.errors&&(t.f.statementInvestorName.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementInvestorPanNo.errors&&(t.f.statementInvestorPanNo.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementInvestmentDate.errors&&(t.f.statementInvestmentDate.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngForOf",t.amc),o(6),r("ngIf",t.f.statementAmcName.errors&&(t.f.statementAmcName.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementFundName.errors&&(t.f.statementFundName.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementCostOfInvestment.errors&&(t.f.statementCostOfInvestment.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementCurrentValue.errors&&(t.f.statementCurrentValue.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementSipDate.errors&&(t.f.statementSipDate.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementSipAmount.errors&&(t.f.statementSipAmount.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementSwpAmount.errors&&(t.f.statementSwpAmount.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementSipBankName.errors&&(t.f.statementSipBankName.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementSipBankAccountType.errors&&(t.f.statementSipBankAccountType.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementSipBankAccountLastFourDigit.errors&&(t.f.statementSipBankAccountLastFourDigit.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementPrimaryBankName.errors&&(t.f.statementPrimaryBankName.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementPrimaryBankAccountType.errors&&(t.f.statementPrimaryBankAccountType.touched||t.submitted)),o(3),r("cFormFloating",!0),o(7),r("ngIf",t.f.statementPrimaryBankAccountLastFourDigit.errors&&(t.f.statementPrimaryBankAccountLastFourDigit.touched||t.submitted)))},dependencies:[N,I,h,G,M,E,O,B,D,Z,H,K,Q,R,J,j,W,U,$,z,Y,T,w,V,L,q,P]})}}return a})();export{je as CreateStatementComponent};
