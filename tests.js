QUnit.test('Checker', function (assert){
  assert.teststr(Checker.proc(R.add)(3, 4), "7");
  assert.throws(function (){
    Checker.proc(R.add)(C.mknum("3+i"), 4);
  });
  assert.teststr(Checker.proc(R.add)(C.mknum("3"), 4), "7");
  assert.teststr(Checker.proc(R.add)(2.1, R.mknum("4")), "6.1");
  assert.throws(function (){
    Checker.proc(R.add)("abc", R.mknum("4"));
  });
  assert.throws(function (){
    Checker.proc(R.add)(R.mknum("4"));
  });

  assert.testcstr(Checker.proc(C.add)(3, 4), "7");
  assert.testcstr(Checker.proc(C.add)(C.mknum("3+i"), 4), "7+i");
  assert.testcstr(Checker.proc(C.add)(C.mknum("3"), 4), "7");
  assert.testcstr(Checker.proc(C.add)(2.1, R.mknum("4")), "6.1");

  assert.teststr(Checker.proc(R.exp)(2), "7.3890560989306502");
  assert.throws(function (){
    Checker.proc(R.exp)(2, 0.3);
  });
  assert.teststr(Checker.proc(R.exp)(2, -1), "10");

  assert.testcstr(Checker.proc(C.exp)(2), "7.3890560989306502");
  assert.throws(function (){
    Checker.proc(C.exp)(2, 0.3);
  });
  assert.testcstr(Checker.proc(C.exp)(2, -1), "10");

  assert.teststr(Checker.proc(R.sfrac)(function (n){return 1;}), "1.6180339887498948");
  assert.teststr(Checker.proc(R.sfrac)(function (n){if (n == 3)return null; return 1;}), "1.5");
  assert.throws(function (){
    Checker.proc(R.sfrac)(function (n){return (n == 2)?C.mknum("1+i"):1;});
  });
  assert.throws(function (){
    Checker.proc(R.frac)(function (n){return 1;}, function (n){return C.mknum("1+i");});
  });

  assert.teststr(Checker.proc(R.mulran)(2, 3), "6");
  assert.throws(function (){
    Checker.proc(R.mulran)(2, 3.4);
  });
  assert.throws(function (){
    Checker.proc(R.mulran)(2, R.mknum("3.4"));
  });
  assert.throws(function (){
    Checker.proc(R.mulran)(2, C.mknum("3.4"));
  });
});
