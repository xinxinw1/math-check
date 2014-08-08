# Math Checking Library

This library allows you to add checking layers over the prec-math and cmpl-math functions so that calling R.add(3, 5) will return "8". It works in both web js and Node.js

Unfortunately, the code is a bit too tied to the prec-math and cmpl-math libraries, requiring that every time a function is created there, an entry must be added here. I would greatly appreciate it if someone could help me resolve this.

## How to use in HTML

1. Go to https://github.com/xinxinw1/tools/releases and download the latest release.
2. Go to https://github.com/xinxinw1/prec-math/releases and download the latest release.
3. Optionally, if you want complex number functions, go to https://github.com/xinxinw1/cmpl-math/releases and download the latest release.
4. Go to https://github.com/xinxinw1/math-check/releases and download the latest release.
5. Extract `tools.js` from the first download, `prec-math.js` from the second, and `cmpl-math.js` from the third, and `math-check.js` from the fourth into your project directory.
6. Add
   
   ```html
   <script src="tools.js"></script>
   <script src="prec-math.js"></script>
   <script src="cmpl-math.js"></script> <!-- if you want complex numbers -->
   <script src="math-check.js"></script>
   ```
   
   to your html file.
7. Run `$.al(Checker.proc(R.mul)(2534, 5253))` to make sure it works.  
   (Should output `13311102`)
8. If you are using complex numbers, run `$.al(Checker.proc(C.mul)(2534, "5253"))` to make sure it works.  
   (Should output `["13311102", "0"]`)

See http://xinxinw1.github.io/math-check/ for a demo.

## How to use in Node.js

1. Go to https://github.com/xinxinw1/tools/releases and download the latest release.
2. Go to https://github.com/xinxinw1/prec-math/releases and download the latest release.
3. Optionally, if you want complex number functions, go to https://github.com/xinxinw1/cmpl-math/releases and download the latest release.
4. Go to https://github.com/xinxinw1/math-check/releases and download the latest release.
5. Extract `tools.js` from the first download, `prec-math.js` from the second, and `cmpl-math.js` from the third, and `math-check.js` from the fourth into your project directory.
6. Run `$ = require("./tools.js")` in node.
7. Run `R = require("./prec-math.js")` in node
8. If you want complex numbers, run `C = require("./cmpl-math.js")` in node
9. Run `Checker = require("./math-check.js")` in node.
10. Run `$.prn(Checker.proc(R.mul)(2534, 5253))` to make sure it works.  
    (Should output `13311102` and return `undefined`)
11. If you are using complex numbers, run `$.prn(Checker.proc(C.mul)(2534, "5253"))` to make sure it works.  
    (Should output `["13311102", "0"]` and return `undefined`)

## Function reference

```
Note: These are all accessed by Checker.<insert name>

proc(f)           create a function that processes the inputs before sending
                    them to the function f; function must already be known
                    to the processor by running Checker.fn; most prec-math
                    and cmpl-math functions are already included
fn(ref, params)   add a function and its parameters to the checker database;
                    params must be an array with parameter types specified in
                    order; parameter types are all defined in the internal
                    process function
spec(f, proc)     add a special function that is to be processed with the given
                    proc function instead of the original proc function
```
