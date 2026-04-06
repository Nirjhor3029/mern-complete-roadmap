// Function Declaration Hoisting - Fully hoisted!
// Function declarations are fully hoisted (declaration + body)

console.log("Hoisted function:", foo()); // Works!

function foo() {
  return "hello from hoisted function";
}

// Function is available before and after declaration
console.log(bar());
function bar() {
  return "bar";
}

// Function Expression is different!
console.log(fnExpression); // undefined (not the function!)
var fnExpression = function() {
  return "I'm a function expression";
};
// console.log(fnExpression()); // TypeError - undefined is not a function

// Named function expression
var namedFn = function myFunction() {
  return "named";
};
console.log(namedFn());

console.log("✅ function hoisting example complete");
