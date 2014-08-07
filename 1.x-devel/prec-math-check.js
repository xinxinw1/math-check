/***** PrecMath Validity Checker Extension 1.0 *****/

/* requires "tools.js" */
  /* functions getFuncName, getParams, addAttributes, isFalse */
/* requires "prec-math.js" */

(function (window, undefined){
  ////// General processors //////
  
  function makeProcessor(func){
    var types = getParamTypes(func);
    if (types == "spec")return makeSpecProcessor(func);
    var name = $.getFuncName(func);
    var params = $.getParams(func);
    return function newfunc(){
      var arr = [];
      var curr;
      for (var i = 0; i < types.length; i++){
        arr[i] = process(arguments[i], types[i], name, params[i]);
      }
      var ret = func.apply(this, arr);
      $.addAttributes(func, newfunc);
      return ret;
    };
  }
  
  function process(arg, type, name, pname){ // pname = param name
    if (arg == undefined){
      if (type == "nprec")return arg;
      error("Error: " + name + ": " + pname + " is undefined");
    }
    switch (type){
      case "comp":
        return processComp(arg, name, pname);
      case "real":
        return processReal(arg, name, pname);
      case "num":
        return processNum(arg, name, pname);
      case "nprec":
      case "int":
        return processInt(arg, name, pname);
      default:
        error("Error: process: Unknown paramater type \"" + type + "\"");
    }
  }
  
  function processComp(arg, name, pname){
    if (!$.isFalse(prep = C.prep(arg)))return prep;
    if (!$.isFalse(prep = R.prep(arg)))return [prep, "0"];
    
    error("Error: " + name + ": " + pname + " = \"" + arg + "\" is an invalid complex number");
  }
  
  function processReal(arg, name, pname){
    if (!$.isFalse(prep = C.prepReal(arg)))return prep;
    if (!$.isFalse(prep = R.prep(arg)))return prep;
    
    error("Error: " + name + ": " + pname + " = \"" + arg + "\" is an invalid real number");
  }
  
  function processNum(arg, name, pname){
    if (!$.isFalse(prep = C.prepNum(arg)))return prep;
    if (!$.isFalse(prep = R.prepNum(arg)))return prep;
    
    error("Error: " + name + ": " + pname + " = \"" + arg + "\" is an invalid javascript number");
  }
  
  function processInt(arg, name, pname){
    if (!$.isFalse(prep = C.prepInt(arg)))return prep;
    if (!$.isFalse(prep = R.prepInt(arg)))return prep;
    
    error("Error: " + name + ": " + pname + " = \"" + arg + "\" is an invalid javascript integer");
  }
  
  ////// Special processors //////
  
  function makeSpecProcessor(func){
    switch (func){
      case R.genContFrac:
        return processGenContFrac();
      case R.simpContFrac:
        return processSimpContFrac();
      default:
        error("Error: process: Unknown special function \"" + $.getFuncName(func) + "\"");
    }
  }
  
  function processGenContFrac(){
    return function genContFrac(a, b, nprec){
      var an = function (n){
        var ret = a(n);
        if (ret === null)return ret;
        return String(ret);
      }
      
      var bn = function (n){
        var ret = b(n);
        if (ret === null)return ret;
        return String(ret);
      }
      
      var ret = R.genContFrac(an, bn, nprec);
      $.addAttributes(R.genContFrac, genContFrac);
      return ret;
    };
  }
  
  function processSimpContFrac(){
    return function simpContFrac(a, nprec){
      var an = function (n){
        var ret = a(n);
        if (ret === null)return ret;
        return String(ret);
      }
      
      var ret = R.simpContFrac(an, nprec);
      $.addAttributes(R.simpContFrac, simpContFrac);
      return ret;
    };
  }
  
  ////// Functions //////
  
  function addFunc(ref, params){
    funcs.push([ref, params]);
  }
  
  function getParamTypes(func){
    for (var i = 0; i < funcs.length; i++){
      if (funcs[i][0] === func)return funcs[i][1];
    }
    error("Error: getParamTypes(func): Unknown function \"" + $.getFuncName(func) + "\"");
  }
  
  var funcs = [];
  
  //// Complex ////
  
  addFunc(C.add, ["comp", "comp", "nprec"]);
  addFunc(C.sub, ["comp", "comp", "nprec"]);
  addFunc(C.mult, ["comp", "comp", "nprec"]);
  addFunc(C.div, ["comp", "comp", "nprec"]);
  
  addFunc(C.round, ["comp", "nprec"]);
  addFunc(C.ceil, ["comp", "nprec"]);
  addFunc(C.floor, ["comp", "nprec"]);
  addFunc(C.trunc, ["comp", "nprec"]);
  
  addFunc(C.exp, ["comp", "nprec"]);
  addFunc(C.ln, ["comp", "nprec"]);
  addFunc(C.pow, ["comp", "comp", "nprec"]);
  addFunc(C.root, ["real", "comp", "nprec"]);
  addFunc(C.sqrt, ["comp", "nprec"]);
  addFunc(C.cbrt, ["comp", "nprec"]);
  addFunc(C.fact, ["real", "nprec"]);
  addFunc(C.bin, ["real", "real", "nprec"]);
  addFunc(C.agm, ["real", "real", "nprec"]);
  addFunc(C.sin, ["comp", "nprec"]);
  addFunc(C.cos, ["comp", "nprec"]);
  addFunc(C.tan, ["comp", "nprec"]);
  addFunc(C.sinh, ["comp", "nprec"]);
  addFunc(C.cosh, ["comp", "nprec"]);
  
  addFunc(C.abs, ["comp", "nprec"]);
  addFunc(C.arg, ["comp", "nprec"]);
  addFunc(C.sgn, ["comp", "nprec"]);
  addFunc(C.re, ["comp"]);
  addFunc(C.im, ["comp"]);
  addFunc(C.conj, ["comp"]);
  
  addFunc(C.pi, ["nprec"]);
  addFunc(C.e, ["nprec"]);
  addFunc(C.phi, ["nprec"]);
  addFunc(C.ln2, ["nprec"]);
  addFunc(C.ln5, ["nprec"]);
  addFunc(C.ln10, ["nprec"]);
  
  //// Real ////
  
  addFunc(R.isInt, ["real"]);   
  addFunc(R.isDec, ["real"]);
  addFunc(R.isNeg, ["real"]);
  addFunc(R.isEven, ["real"]);
  addFunc(R.isDivFive, ["real"]);
  
  addFunc(R.padZeros, ["real", "real"]);
  addFunc(R.isZero, ["real", "nprec"]);
  addFunc(R.isDiffZero, ["real", "real", "nprec"]);
  
  addFunc(R.mDotLeft, ["real", "int"]);
  addFunc(R.mDotRight, ["real", "int"]);
  
  addFunc(R.gt, ["real", "real"]);
  addFunc(R.lt, ["real", "real"]);
  addFunc(R.ge, ["real", "real"]);
  addFunc(R.le, ["real", "real"]);
  
  addFunc(R.add, ["real", "real", "nprec"]);
  addFunc(R.sub, ["real", "real", "nprec"]);
  addFunc(R.mult, ["real", "real", "nprec"]);
  addFunc(R.div, ["real", "real", "nprec"]);
  
  addFunc(R.round, ["real", "nprec"]);
  addFunc(R.ceil, ["real", "nprec"]);
  addFunc(R.floor, ["real", "nprec"]);
  addFunc(R.trunc, ["real", "nprec"]);
  
  addFunc(R.pow, ["real", "real", "nprec"]);
  addFunc(R.fact, ["real", "nprec"]);
  addFunc(R.bin, ["real", "real", "nprec"]);
  addFunc(R.exp, ["real", "nprec"]);
  addFunc(R.ln, ["real", "nprec"]);
  addFunc(R.sqrt, ["real", "nprec"]);
  addFunc(R.agm, ["real", "real", "nprec"]);
  addFunc(R.sin, ["real", "nprec"]);
  addFunc(R.cos, ["real", "nprec"]);
  
  addFunc(R.neg, ["real"]);
  addFunc(R.abs, ["real"]);
  
  addFunc(R.e, ["nprec"]);
  addFunc(R.phi, ["nprec"]);
  addFunc(R.pi, ["nprec"]);
  addFunc(R.ln2, ["nprec"]);
  addFunc(R.ln5, ["nprec"]);
  addFunc(R.ln10, ["nprec"]);
  
  addFunc(R.quotAndRem, ["real", "real"]);
  addFunc(R.multRange, ["int", "int"]);
  addFunc(R.genContFrac, "spec");
  addFunc(R.simpContFrac, "spec");
  
  ////// Error handling //////
  
  function error(str){
    throw str;
  }
  
  ////// Object exposure //////
  
  window.PMath = $.addAttributes({
    makeProcessor: makeProcessor
  }, PMath);
  
})(window);
