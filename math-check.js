/***** Math Validity Checker 3.0.1 *****/

/* require tools 4.10.3 */
/* optional prec-math 5.0.0 */
/* optional cmpl-math 2.0.0 */

(function (udf){
  ////// Import //////
  
  var nodep = $.nodep;
  
  var apl = $.apl;
  
  var pos = $.pos;
  var tfna = $.tfna;
  
  var prms = $.prms;
  
  var err = $.err;
  
  var hasC = typeof C !== "undefined";
  var hasR = typeof R !== "undefined";
  
  function cmpl(a){
    if (hasC)return C.cmpl(a);
    err(cmpl, "C not loaded");
  }
  
  function real(a){
    if (hasC)return C.real(a);
    if (hasR)return R.real(a);
    err(real, "R not loaded");
  }
  
  function realint(a){
    if (hasC)return C.realint(a);
    if (hasR)return R.realint(a);
    err(realint, "R not loaded");
  }
  
  ////// General processors //////
  
  // dynamic variables used when the processor is running
  var func;
  var prm;
  var i;
  
  function proc(f){
    var tps = types(f);
    var p = prms(f);
    function f2(){
      func = f; prm = p;
      var a = arguments;
      var arr = [];
      for (i = 0; i < tps.length; i++){
        arr[i] = process(a[i], tps[i]);
      }
      return apl(f, arr);
    }
    return f2;
  }
  
  function process(arg, type){
    if (arg == udf){
      if (type == "nprec")return arg;
      err(func, prm[i] + " is undefined");
    }
    switch (type){
      case "cmpl": return processCmpl(arg);
      case "real": return processReal(arg);
      case "nprec":
      case "int": return processInt(arg);
      case "fracfn": return processFracfn(arg);
      default: err(process, "Unknown type $1 in function $2", type, func);
    }
  }
  
  function processCmpl(arg){
    var r = cmpl(arg);
    if (r !== false)return r;
    err(func, prm[i] + " = $1 is an invalid complex number", arg);
  }
  
  function processReal(arg){
    var r = real(arg);
    if (r !== false)return r;
    err(func, prm[i] + " = $1 is an invalid real number", arg);
  }
  
  function processInt(arg){
    var r = realint(arg);
    if (r !== false)return r;
    err(func, prm[i] + " = $1 is an invalid integer", arg);
  }
  
  function processFracfn(arg){
    // closure func, save variables so they can be used when a(n) is called
    var cfunc = func;
    var cprm = prm;
    var ci = i;
    return function (n){
      var an = arg(n);
      if (an === null)return an;
      var r = real(an);
      if (r !== false)return r;
      err(cfunc, cprm[ci] + "($1) = $2 is an invalid real number", n, an);
    };
  }
  
  ////// Functions //////
  
  var funcs = [];
  var funcprms = [];
  
  function fref(ref){
    var p = pos(tfna(ref), funcs);
    if (p == -1)return udf;
    return funcprms[p];
  }
  
  function fn(ref, params){
    funcs.push(ref);
    funcprms.push(params);
  }
  
  function types(ref){
    var tp = fref(ref);
    if (tp === udf)err(types, "Unknown function $1", ref);
    return tp;
  }
  
  //// Complex ////
  
  if (hasC){
    fn(C.add, ["cmpl", "cmpl", "nprec"]);
    fn(C.sub, ["cmpl", "cmpl", "nprec"]);
    fn(C.mul, ["cmpl", "cmpl", "nprec"]);
    fn(C.div, ["cmpl", "cmpl", "nprec"]);
    
    fn(C.rnd, ["cmpl", "nprec"]);
    fn(C.cei, ["cmpl", "nprec"]);
    fn(C.flr, ["cmpl", "nprec"]);
    fn(C.trn, ["cmpl", "nprec"]);
    
    fn(C.abs, ["cmpl", "nprec"]);
    fn(C.arg, ["cmpl", "nprec"]);
    fn(C.sgn, ["cmpl", "nprec"]);
    fn(C.re, ["cmpl"]);
    fn(C.im, ["cmpl"]);
    fn(C.conj, ["cmpl"]);
    
    fn(C.exp, ["cmpl", "nprec"]);
    fn(C.ln, ["cmpl", "nprec"]);
    fn(C.pow, ["cmpl", "cmpl", "nprec"]);
    fn(C.root, ["cmpl", "cmpl", "nprec"]);
    fn(C.sqrt, ["cmpl", "nprec"]);
    fn(C.cbrt, ["cmpl", "nprec"]);
    fn(C.fact, ["real", "nprec"]);
    fn(C.bin, ["real", "real", "nprec"]);
    fn(C.agm, ["cmpl", "cmpl", "nprec"]);
    fn(C.sin, ["cmpl", "nprec"]);
    fn(C.cos, ["cmpl", "nprec"]);
    fn(C.sinh, ["cmpl", "nprec"]);
    fn(C.cosh, ["cmpl", "nprec"]);
    
    fn(C.atan2, ["real", "real", "nprec"]);
    
    fn(C.pi, ["nprec"]);
    fn(C.e, ["nprec"]);
    fn(C.phi, ["nprec"]);
    fn(C.ln2, ["nprec"]);
    fn(C.ln5, ["nprec"]);
    fn(C.ln10, ["nprec"]);
  }
  
  //// Real ////
  
  if (hasR){
    fn(R.intp, ["real"]);   
    fn(R.decp, ["real"]);
    fn(R.negp, ["real"]);
    fn(R.evnp, ["real"]);
    fn(R.oddp, ["real"]);
    fn(R.div5p, ["real"]);
    
    fn(R.byzero, ["real", "nprec"]);
    fn(R.diffbyzero, ["real", "real", "nprec"]);
    
    fn(R.left, ["real", "int"]);
    fn(R.right, ["real", "int"]);
    
    fn(R.gt, ["real", "real"]);
    fn(R.lt, ["real", "real"]);
    fn(R.ge, ["real", "real"]);
    fn(R.le, ["real", "real"]);
    
    fn(R.add, ["real", "real", "nprec"]);
    fn(R.sub, ["real", "real", "nprec"]);
    fn(R.mul, ["real", "real", "nprec"]);
    fn(R.div, ["real", "real", "nprec"]);
    
    fn(R.rnd, ["real", "nprec"]);
    fn(R.cei, ["real", "nprec"]);
    fn(R.flr, ["real", "nprec"]);
    fn(R.trn, ["real", "nprec"]);
    
    fn(R.exp, ["real", "nprec"]);
    fn(R.ln, ["real", "nprec"]);
    fn(R.pow, ["real", "real", "nprec"]);
    fn(R.sqrt, ["real", "nprec"]);
    fn(R.fact, ["real"]);
    fn(R.bin, ["real", "real"]);
    fn(R.agm, ["real", "real", "nprec"]);
    fn(R.sin, ["real", "nprec"]);
    fn(R.cos, ["real", "nprec"]);
    fn(R.sinh, ["real", "nprec"]);
    fn(R.cosh, ["real", "nprec"]);
    
    fn(R.neg, ["real"]);
    fn(R.abs, ["real"]);
    
    fn(R.pi, ["nprec"]);
    fn(R.e, ["nprec"]);
    fn(R.phi, ["nprec"]);
    fn(R.ln2, ["nprec"]);
    fn(R.ln5, ["nprec"]);
    fn(R.ln10, ["nprec"]);
    
    fn(R.qar, ["real", "real"]);
    fn(R.mulran, ["int", "int"]);
    fn(R.frac, ["fracfn", "fracfn", "nprec"]);
    fn(R.sfrac, ["fracfn", "nprec"]);
  }
  
  ////// Object exposure //////
  
  var Checker = {
    proc: proc,
    fn: fn,
    fref: fref
  };
  
  if (nodep)module.exports = Checker;
  else window.Checker = Checker;
  
  ////// Testing //////
  
  
  
})();
