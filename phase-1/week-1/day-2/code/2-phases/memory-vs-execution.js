// Two Phases of Execution Context
// Phase 1: Memory Creation (Hoisting)
// Phase 2: Code Execution

console.log("=== TWO PHASES EXAMPLES ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Memory Phase - What gets hoisted
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Before code runs - hoisting happens first:");

// In memory phase, these are hoisted:
console.log("   x hoisted as:", x); // undefined
var x = 5;

console.log("   fn hoisted as:", typeof fn); // function
function fn() { return "I'm a function"; }

console.log("   expr hoisted as:", typeof expr); // undefined
var expr = function() { return "expression"; };

// ─────────────────────────────────────────────────────────────────────────
// 2. Memory Phase vs Execution Phase
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Memory Phase vs Execution Phase:");

// Code:
var message = "Hello";

function greet() {
  console.log("   In greet:", message);
}

greet();

// What happens:
// MEMORY PHASE:
//   message = undefined (will be reassigned in execution)
//   greet = function definition
// EXECUTION PHASE:
//   message = "Hello" (assignment)
//   greet() called - creates new FEC

// ─────────────────────────────────────────────────────────────────────────
// 3. Step by step execution
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Step by step:");

// Line 1:
console.log("   Line 1: var a");
var a;

// Line 2:
console.log("   Line 2: console.log(a)");
console.log("   Output:", a); // undefined!

// Line 3:
console.log("   Line 3: a = 10");
var a = 10;

// Line 4:
console.log("   Line 4: console.log(a)");
console.log("   Output:", a); // 10

// ─────────────────────────────────────────────────────────────────────────
// 4. let/const in Memory Phase (TDZ!)
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. let/const in Memory Phase:");

// var - hoisted as undefined
console.log("   var before declaration:", typeof varTest); // undefined
var varTest = "value";

// let - hoisted but in TDZ
// console.log(letTest); // ReferenceError! 
let letTest = "value";
console.log("   let after declaration:", letTest); // works

// const - hoisted but in TDZ
const constTest = "value";
console.log("   const after declaration:", constTest);

// ─────────────────────────────────────────────────────────────────────────
// 5. Function hoisting differences
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Function hoisting:");

// Function declaration - fully hoisted
console.log("   Declared function:", declared()); // works!
function declared() {
  return "I'm declared";
}

// Function expression - only var hoisted
// console.log(expressed()); // TypeError!
var expressed = function() {
  return "I'm expressed";
};
console.log("   Expression after:", expressed()); // works now

console.log("\n✅ Two Phases examples complete");
