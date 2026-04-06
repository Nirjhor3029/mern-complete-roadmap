// Hoisting with var - Declaration hoisted, not initialization
// JavaScript executes in 2 phases: Compilation + Execution

console.log("Before declaration:", hoistedVar); // undefined (not error!)
var hoistedVar = 5;

// What JavaScript actually does:
// var hoistedVar;           // Phase 1: Declaration hoisted
// console.log(hoistedVar); // Phase 2: undefined
// hoistedVar = 5;          // Assignment stays here

// Multiple var declarations
console.log(x, y); // undefined undefined
var x = 1;
var y = 2;

// var re-declaration (weird behavior!)
var hoistedVar = 10; // No error - re-declares!
console.log("Re-declared:", hoistedVar);

console.log("✅ var hoisting example complete");
