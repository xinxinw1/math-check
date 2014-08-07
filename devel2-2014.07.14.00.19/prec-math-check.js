/***** PrecMath Validity Checker Extension Devel *****/

/* requires "tools.js" */
/* requires "prec-math.js" */
/* requires "cmpl-math.js" */

(function (win, udf){
  ////// Import variables //////
  
  var udfp = $.udfp;
  var len = $.len;
  var att = $.att;
  var apl = $.apl;
  var prms = $.prms;
  var aref = $.aref;
  var aset = $.aset;
  var num = Number;
  var err = $.err;
  
  ////// General processors //////
  
  var func; // dynamic variables
  var prm;
  var i;
  
  function proc(f){
    var tps = types(f);
    if (tps == "spec")return get(f, specs)();
    var p = prms(f);
    return function f2(){
      func = f; prm = p;
      var args = arguments;
      var a = [];
      for (i = 0; i < len(tps); i++){
        a[i] = process(args[i], tps[i]);
      }
      var ret = apl(f, a);
      att(f, f2);
      return ret;
    };
  }
  
  function process(arg, type){ // pname = param name
    if (udfp(arg)){
      if (type == "nprec")return arg;
      err(func, prm[i] + " is undefined");
    }
    switch (type){
      case "comp": return procComp(arg);
      case "real": return procReal(arg);
      case "num": return procNum(arg);
      case "nprec":
      case "int": return procInt(arg);
      default: err(process, "Unknown type $1 in function $2", type, func);
    }
  }
  
  function procComp(arg){
    var ret = C.cmpl(arg);
    if (ret !== false)return ret;
    err(func, prm[i] + " = $1 is an invalid complex number", arg);
  }
  
  function procReal(arg){
    var ret = R.real(arg);
    if (ret !== false)return ret;
    err(func, prm[i] + " = $1 is an invalid real number", arg);
  }
  
  function procNum(arg){
    var ret = R.real(arg);
    if (ret !== false)return num(ret);
    err(func, prm[i] + " = $1 is an invalid number", arg);
  }
  
  function procInt(arg){
    var ret = R.realint(arg);
    if (ret !== false)return num(ret);
    err(func, prm[i] + " = $1 is an invalid integer", arg);
  }
  
  ////// Functions //////
  
  var funcs = [];
  
  function fref(f){
    return aref(funcs, f);
  }
  
  function fset(f, types){
    return aset(funcs, f, types);
  }
  
  function types(f){
    var tp = fref(f);
    if (udfp(tp))err(types, "Unknown function $1", f);
    return tp;
  }
  
  //// Complex ////
  
  var fn = fset;
  
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
  
  function spec(f, proc){
    fn(f, "spec");
    oset(specs, f, proc);
  }
  
  ////// Object exposure //////
  
  win.PMath = att({
    proc: proc,
    fn: fn,
    spec: spec
  }, PMath);
  
  ////// Testing //////
  
  //var test = proc(R.add);
  //$.alert(test(3, 4, ["33", "0"]));
  
  
})(window);
