// Interview Trap Questions - Execution Context
// These are common questions in JavaScript interviews

console.log("=== INTERVIEW TRAP QUESTIONS ===\n");

// ─────────────────────────────────────────────────────────────────────────
// Trap 1: Function Declaration vs Expression Hoisting
// ─────────────────────────────────────────────────────────────────────────
console.log("Trap 1: Function Declaration vs Expression");

// Question 1: What happens?
console.log("Q1: myFunc() =", myFunc());
function myFunc() {
  return 10;
}
// Answer: 10 ✅ (function declaration fully hoisted)

// Question 2: What happens?
// console.log("Q2: myVar() =", myVar()); // TypeError!
var myVar = function() {
  return 10;
};
// Answer: TypeError (var myVar = undefined, then calling undefined)

// ─────────────────────────────────────────────────────────────────────────
// Trap 2: Hoisting with var
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 2: Hoisting with var");

console.log(x); // undefined
var x = 5;
// What JavaScript sees:
// var x;           (hoisted as undefined)
// console.log(x);  (undefined)
// x = 5;           (assignment happens here)

// ─────────────────────────────────────────────────────────────────────────
// Trap 3: Order of var and function
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 3: var vs function precedence");

var x = 1;

function x() {
  return 2;
}

console.log(typeof x); // "number"
// Why? In memory phase, function x is stored
// In execution phase, x = 1 overwrites it

// ─────────────────────────────────────────────────────────────────────────
// Trap 4: Nested function hoisting
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 4: Nested function hoisting");

function alpha() {
  console.log("   alpha:", beta());
  function beta() {
    return "Hello";
  }
}

alpha();
// Answer: "Hello"
// Both alpha and beta are fully hoisted

// ─────────────────────────────────────────────────────────────────────────
// Trap 5: Scope chain confusion
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 5: Scope chain");

var a = 1;

function outer() {
  var a = 2;
  
  function inner() {
    console.log("   a =", a); // Which a?
  }
  
  inner();
}

outer();
// Answer: 2 (inner uses parent's a due to scope chain)

// ─────────────────────────────────────────────────────────────────────────
// Trap 6: Closures with for loop (review for Day 3)
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 6: Loop closure (preview)");

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("   var i:", i), 10);
}
// Wait for all setTimeouts to complete
setTimeout(() => {
  console.log("\n(Expected: 3, 3, 3 - the var bug!)");
  console.log("   This is why we use let in loops");
}, 50);

// ─────────────────────────────────────────────────────────────────────────
// Trap 7: Function expression reassignment
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 7: Function expression behavior");

var fn = function() {
  return "first";
};

console.log("   Before:", fn()); // "first"

fn = function() {
  return "second";
};

console.log("   After:", fn()); // "second"
// var fn is reassigned, not hoisted function

// ─────────────────────────────────────────────────────────────────────────
// Trap 8: IIFE and scope
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 8: IIFE (Immediately Invoked Function Expression)");

(function() {
  var secret = "I'm private";
  console.log("   Inside IIFE:", secret);
})();

// console.log(secret); // ReferenceError - not accessible

// ─────────────────────────────────────────────────────────────────────────
// Trap 9: this in different contexts
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 9: this binding");

function whatIsThis() {
  console.log("   this =", this);
}

whatIsThis(); // window (in browser) or global (in Node)

const obj = {
  fn: whatIsThis
};

obj.fn(); // obj (this refers to calling object)

// ─────────────────────────────────────────────────────────────────────────
// Trap 10: Return function before declaration
// ─────────────────────────────────────────────────────────────────────────
console.log("\nTrap 10: Return function before declaration");

console.log("   Result:", foo());

function foo() {
  return bar();
  
  function bar() {
    return "bar called";
  }
}
// Answer: "bar called"
// Functions are fully hoisted, so bar() exists even before declaration

console.log("\n✅ Interview trap examples complete");
