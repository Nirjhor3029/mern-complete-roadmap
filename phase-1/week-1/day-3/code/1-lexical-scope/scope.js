// Lexical Scope - Scope determined by where function is WRITTEN, not called

console.log("=== LEXICAL SCOPE EXAMPLES ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Basic lexical scope
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Basic lexical scope:");

function outer() {
  let outerVar = "I'm outer";
  
  function inner() {
    console.log("   inner sees:", outerVar);
  }
  
  inner(); // inner() can access outerVar
}

outer();

// Scope chain: inner → outer → global
// inner() looks for variables in order: inner → outer → global

// ─────────────────────────────────────────────────────────────────────────
// 2. Scope determined by WHERE WRITTEN, not called
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Written location matters:");

function createFunction() {
  let x = 10;
  
  // This function "remembers" x from where it was written
  return function() {
    console.log("   x =", x);
  };
}

const fn = createFunction();
// Even if we call fn() from somewhere else, it still uses x from createFunction
fn(); // 10

// ─────────────────────────────────────────────────────────────────────────
// 3. Multiple levels of scope
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Multiple scope levels:");

let globalVar = "global";

function level1() {
  let level1Var = "level1";
  
  function level2() {
    let level2Var = "level2";
    
    function level3() {
      // Can access all!
      console.log("   global:", globalVar);
      console.log("   level1:", level1Var);
      console.log("   level2:", level2Var);
    }
    
    level3();
  }
  
  level2();
}

level1();

// ─────────────────────────────────────────────────────────────────────────
// 4. Scope chain lookup
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Scope chain lookup:");

let a = 1;

function first() {
  let a = 10;
  
  function second() {
    let a = 100;
    
    function third() {
      console.log("   a =", a); // Which a? 100
    }
    
    third();
  }
  
  second();
}

first();

// ─────────────────────────────────────────────────────────────────────────
// 5. Closures preserve lexical environment
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Closures preserve lexical environment:");

function outer() {
  let value = "original";
  
  return {
    getValue: () => value,
    setValue: (v) => value = v
  };
}

const obj = outer();
console.log("   Before:", obj.getValue()); // "original"
obj.setValue("changed");
console.log("   After:", obj.getValue()); // "changed"

console.log("\n✅ Lexical scope examples complete");
