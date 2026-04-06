// Memory Allocation - How variables are stored in different contexts

console.log("=== MEMORY ALLOCATION EXAMPLES ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Global memory allocation
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Global memory:");

var globalVar = "I'm global";
let globalLet = "I'm also global";
const globalConst = "I'm constant global";

function globalFunc() {
  console.log("   Global function can access:", globalVar);
}

console.log("   Global scope variables allocated in GEC");
globalFunc();

// ─────────────────────────────────────────────────────────────────────────
// 2. Function memory allocation
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Function memory:");

function foo() {
  var localVar = "I'm local to foo";
  let localLet = "I'm also local";
  const localConst = "I'm constant";
  
  console.log("   foo() local:", localVar, localLet, localConst);
}

foo();
// localVar, localLet, localConst exist only during foo() execution

// ─────────────────────────────────────────────────────────────────────────
// 3. Nested memory (scope chain)
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Nested memory & scope chain:");

var a = 10;

function outer() {
  var b = 20;
  
  function inner() {
    var c = 30;
    console.log("   a:", a, "b:", b, "c:", c);
    // inner can access all: a, b, c
  }
  
  inner();
  // inner() EC destroyed after this
  // but inner closure keeps reference to b
}

outer();

// Memory allocation:
// Global EC: { a: 10, outer: function }
// outer() EC: { b: 20, inner: function }
// inner() EC: { c: 30 }

// ─────────────────────────────────────────────────────────────────────────
// 4. Memory visualization
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Memory at each level:");

var x = 1;

function level1() {
  var x = 10;
  
  function level2() {
    var x = 100;
    
    function level3() {
      var x = 1000;
      console.log("   level3 x:", x);      // 1000 (local)
      console.log("   level2 x:", x);      // 100 (parent)
      console.log("   level1 x:", x);      // 10 (grandparent)
      console.log("   global x:", x);       // 1 (global)
    }
    
    level3();
  }
  
  level2();
}

level1();

// Scope chain: inner → outer → global

// ─────────────────────────────────────────────────────────────────────────
// 5. Memory lifecycle
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Memory lifecycle:");

function createData() {
  const data = { id: 1, name: "Test" };
  console.log("   Created:", data.name);
  return data;
}

const result = createData();
console.log("   After function returns:", result);
// Note: result keeps the object alive even after function returns

// Memory lifecycle:
// 1. createData() called - EC created with data
// 2. function returns - EC should be destroyed
// 3. But result still references the object
// 4. Object stays in memory (closure concept!)

console.log("\n✅ Memory allocation examples complete");
