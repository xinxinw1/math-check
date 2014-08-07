/***** PrecMath Validity Checker Extension Devel *****/

/* requires "tools.js" */
/* requires "prec-math.js" */

(function (window, undef){
  ////// Import variables //////
  
  var err = $.err;
  
  ////// General processors //////
  
  var func; // dynamic variables
  var parms;
  var i;
  
  function proc(f){
    var typs = types(f);
    if (typs == "spec")return get(f, specs)();
    var p = $.parms(f);
    return function f2(){
      func = f; parms = p;
      var args = arguments;
      var a = [];
      for (i = 0; i < typs.length; i++){
        a[i] = process(args[i], typs[i]);
      }
      var ret = $.apply(f, a);
      $.append(f, f2);
      return ret;
    };
  }
  
  function process(arg, type){ // pname = param name
    if (arg === undef){
      if (type == "nprec")return arg;
      err(func, parms[i] + " is undefined");
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
    var ret = C.comp(arg);
    if (ret !== false)return ret;
    err(func, parms[i] + " = $1 is an invalid complex number", arg);
  }
  
  function procReal(arg){
    var ret = R.real(arg);
    if (ret !== false)return ret;
    err(func, parms[i] + " = $1 is an invalid real number", arg);
  }
  
  function procNum(arg){
    var ret = R.real(arg);
    if (ret !== false)return Number(ret);
    err(func, parms[i] + " = $1 is an invalid number", arg);
  }
  
  function procInt(arg){
    var ret = R.realInt(arg);
    if (ret !== false)return Number(ret);
    err(func, parms[i] + " = $1 is an invalid integer", arg);
  }
  
  ////// Variables //////
  
  function set(a, val, vars){
    vars[a] = val;
  }
  
  function get(a, vars){
    if (vars[a] !== undef)return vars[a];
    err(get, "Unknown entry $1", a);
  }
  
  ////// Functions //////
  
  var fs = [];
  
  function add(f, p){
    set(f, p, fs);
  }
  
  function types(f){
    try {
      return get(f, fs);
    } catch (e){
      err(types, "Unknown function $1", f);
    }
  }
  
  //// Complex ////
  
  add(C.add, ["comp", "comp", "nprec"]);
  add(C.sub, ["comp", "comp", "nprec"]);
  add(C.mult, ["comp", "comp", "nprec"]);
  add(C.div, ["comp", "comp", "nprec"]);
  
  add(C.round, ["comp", "nprec"]);
  add(C.ceil, ["comp", "nprec"]);
  add(C.floor, ["comp", "nprec"]);
  add(C.trunc, ["comp", "nprec"]);
  
  add(C.exp, ["comp", "nprec"]);
  add(C.ln, ["comp", "nprec"]);
  add(C.pow, ["comp", "comp", "nprec"]);
  add(C.root, ["real", "comp", "nprec"]);
  add(C.sqrt, ["comp", "nprec"]);
  add(C.cbrt, ["comp", "nprec"]);
  add(C.fact, ["real", "nprec"]);
  add(C.bin, ["real", "real", "nprec"]);
  add(C.agm, ["real", "real", "nprec"]);
  add(C.sin, ["comp", "nprec"]);
  add(C.cos, ["comp", "nprec"]);
  add(C.sinh, ["comp", "nprec"]);
  add(C.cosh, ["comp", "nprec"]);
  
  add(C.abs, ["comp", "nprec"]);
  add(C.arg, ["comp", "nprec"]);
  add(C.sgn, ["comp", "nprec"]);
  add(C.re, ["comp"]);
  add(C.im, ["comp"]);
  add(C.conj, ["comp"]);
  
  add(C.pi, ["nprec"]);
  add(C.e, ["nprec"]);
  add(C.phi, ["nprec"]);
  add(C.ln2, ["nprec"]);
  add(C.ln5, ["nprec"]);
  add(C.ln10, ["nprec"]);
  
  //// Real ////
  
  add(R.intp, ["real"]);   
  add(R.decp, ["real"]);
  add(R.negp, ["real"]);
  add(R.evenp, ["real"]);
  add(R.oddp, ["real"]);
  add(R.fivep, ["real"]);
  
  add(R.padZeros, ["real", "real"]);
  add(R.zero, ["real", "nprec"]);
  add(R.diffZero, ["real", "real", "nprec"]);
  
  add(R.left, ["real", "int"]);
  add(R.right, ["real", "int"]);
  
  add(R.gt, ["real", "real"]);
  add(R.lt, ["real", "real"]);
  add(R.ge, ["real", "real"]);
  add(R.le, ["real", "real"]);
  
  add(R.add, ["real", "real", "nprec"]);
  add(R.sub, ["real", "real", "nprec"]);
  add(R.mult, ["real", "real", "nprec"]);
  add(R.div, ["real", "real", "nprec"]);
  
  add(R.round, ["real", "nprec"]);
  add(R.ceil, ["real", "nprec"]);
  add(R.floor, ["real", "nprec"]);
  add(R.trunc, ["real", "nprec"]);
  
  add(R.exp, ["real", "nprec"]);
  add(R.ln, ["real", "nprec"]);
  add(R.pow, ["real", "real", "nprec"]);
  add(R.sqrt, ["real", "nprec"]);
  add(R.fact, ["real", "nprec"]);
  add(R.bin, ["real", "real", "nprec"]);
  add(R.agm, ["real", "real", "nprec"]);
  add(R.sin, ["real", "nprec"]);
  add(R.cos, ["real", "nprec"]);
  add(R.sinh, ["real", "nprec"]);
  add(R.cosh, ["real", "nprec"]);
  
  add(R.neg, ["real"]);
  add(R.abs, ["real"]);
  
  add(R.pi, ["nprec"]);
  add(R.e, ["nprec"]);
  add(R.phi, ["nprec"]);
  add(R.ln2, ["nprec"]);
  add(R.ln5, ["nprec"]);
  add(R.ln10, ["nprec"]);
  
  add(R.qar, ["real", "real"]);
  add(R.multRange, ["int", "int"]);
  
  ////// Special //////
  
  var specs = [];
  
  function spec(f, p){
    add(f, "spec");
    set(f, p, specs);
  }
  
  ////// Object exposure //////
  
  window.PMath = $.append({
    proc: proc,
    addProc: add,
    addSpec: spec
  }, PMath);
  
  ////// Testing //////
  
  //var test = proc(R.add);
  //$.alert(test(3, 4, ["33", "0"]));
  
  
})(window);
