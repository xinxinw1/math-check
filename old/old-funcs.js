function processFunc(arg, name, pname){
  if ($.isFunc(arg))return arg;
  
  error("Error: " + name + ": " + pname + " must be a function; given \"" + arg + "\"");
}

function processFuncReal(arg, name, pname){
  if ($.isFunc(arg)){
    return function (){
      return processReal(arg.apply(this, arguments), name, pname);
    }
  }
  
  error("Error: " + name + ": " + pname + " must be a function; given \"" + arg + "\"");
}


