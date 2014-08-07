/***** Math Validity Checker Devel *****/

/* require tools */
/* require prec-math */
/* require cmpl-math */

(function (win, udf){
  ////// Import //////
  
  var apl = $.apl;
  var att = $.att;
  
  var oref = $.oref;
  var oset = $.oset;
  
  var prms = $.prms;
  
  var err = $.err;
  
  ////// General processors //////
  
  var func; // dynamic variables
  var prm;
  var i;
  
  function proc(f){
    var tps = types(f);
    if (tps == "spec")return sref(f)();
    var p = prms(f);
    return function f2(){
      func = f; prm = p;
      var a = arguments;
      var arr = [];
      for (i = 0; i < tps.length; i++){
        arr[i] = process(a[i], tps[i]);
      }
      var ret = apl(f, arr);
      att(f, f2);
      return ret;
    };
  }
  
  function process(arg, type){
    if (arg == udf){
      if (type == "nprec")return arg;
      err(func, prm[i] + " is undefined");
    }
    switch (type){
      case "comp": return processComp(arg);
      case "real": return processReal(arg);
      case "nprec":
      case "int": return processInt(arg);
      default: err(process, "Unknown type $1 in function $2", type, func);
    }
  }
  
  function processComp(arg){
    var r = C.cmpl(arg);
    if (r !== false)return r;
    err(func, prm[i] + " = $1 is an invalid complex number", arg);
  }
  
  function processReal(arg){
    var r = C.real(arg);
    if (r !== false)return r;
    err(func, prm[i] + " = $1 is an invalid real number", arg);
  }
  
  function processInt(arg){
    var r = C.realint(arg);
    if (r !== false)return r;
    err(func, prm[i] + " = $1 is an invalid integer", arg);
  }
  
  ////// Functions //////
  
  var funcs = {};
  
  function fref(ref){
    return oref(funcs, ref);
  }
  
  function fn(ref, params){
    return oset(funcs, ref, params);
  }
  
  function types(ref){
    var tp = fref(ref);
    if (tp === udf)err(types, "Unknown function $1", ref);
    return tp;
  }
  
  //// Complex ////
  
  fn(C.add, ["comp", "comp", "nprec"]);
  fn(C.sub, ["comp", "comp", "nprec"]);
  fn(C.mul, ["comp", "comp", "nprec"]);
  fn(C.div, ["comp", "comp", "nprec"]);
  
  fn(C.rnd, ["comp", "nprec"]);
  fn(C.cei, ["comp", "nprec"]);
  fn(C.flr, ["comp", "nprec"]);
  fn(C.trn, ["comp", "nprec"]);
  
  fn(C.exp, ["comp", "nprec"]);
  fn(C.ln, ["comp", "nprec"]);
  fn(C.pow, ["comp", "comp", "nprec"]);
  fn(C.root, ["real", "comp", "nprec"]);
  fn(C.sqrt, ["comp", "nprec"]);
  fn(C.cbrt, ["comp", "nprec"]);
  fn(C.fact, ["real", "nprec"]);
  fn(C.bin, ["real", "real", "nprec"]);
  fn(C.agm, ["real", "real", "nprec"]);
  fn(C.sin, ["comp", "nprec"]);
  fn(C.cos, ["comp", "nprec"]);
  fn(C.sinh, ["comp", "nprec"]);
  fn(C.cosh, ["comp", "nprec"]);
  
  fn(C.abs, ["comp", "nprec"]);
  fn(C.arg, ["comp", "nprec"]);
  fn(C.sgn, ["comp", "nprec"]);
  fn(C.re, ["comp"]);
  fn(C.im, ["comp"]);
  fn(C.conj, ["comp"]);
  
  fn(C.pi, ["nprec"]);
  fn(C.e, ["nprec"]);
  fn(C.phi, ["nprec"]);
  fn(C.ln2, ["nprec"]);
  fn(C.ln5, ["nprec"]);
  fn(C.ln10, ["nprec"]);
  
  //// Real ////
  
  fn(R.intp, ["real"]);   
  fn(R.decp, ["real"]);
  fn(R.negp, ["real"]);
  fn(R.evnp, ["real"]);
  fn(R.oddp, ["real"]);
  fn(R.div5p, ["real"]);
  
  fn(R.pad, ["real", "real"]);
  fn(R.zero, ["real", "nprec"]);
  fn(R.diff, ["real", "real", "nprec"]);
  
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
  fn(R.fact, ["real", "nprec"]);
  fn(R.bin, ["real", "real", "nprec"]);
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
  
  ////// Special //////
  
  var specs = {};
  
  function sref(f){
    return oref(specs, f);
  }
  
  function spec(f, proc){
    fn(f, "spec");
    return oset(specs, f, proc);
  }
  
  ////// Object exposure //////
  
  win.PMath = att({
    proc: proc,
    fn: fn,
    spec: spec
  }, PMath);
  
  ////// Testing //////
  
  
  
})(window);
