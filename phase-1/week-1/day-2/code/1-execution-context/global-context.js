// Execution Context - What happens when JS runs
// Every piece of code runs in an Execution Context

console.log("=== EXECUTION CONTEXT EXAMPLES ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Global Execution Context (GEC)
// ─────────────────────────────────────────────────────────────────────────
const globalVar = "I'm global";

function greet() {
  console.log("Inside greet function:", globalVar);
}

console.log("1. GEC created - globalVar:", globalVar);
greet();

// ─────────────────────────────────────────────────────────────────────────
// 2. Function Execution Context (FEC)
// ─────────────────────────────────────────────────────────────────────────
function createUser() {
  const name = "Nirjhor";
  const age = 25;
  
  function getDetails() {
    return `Name: ${name}, Age: ${age}`;
  }
  
  console.log("2. FEC - inside createUser:", getDetails());
}

createUser();

// ─────────────────────────────────────────────────────────────────────────
// 3. Multiple FEC creation
// ─────────────────────────────────────────────────────────────────────────
function outer() {
  console.log("3a. Outer function starts");
  
  function inner() {
    console.log("3b. Inner function - deeply nested");
  }
  
  inner();
  console.log("3c. Outer function ends");
}

outer();

// ─────────────────────────────────────────────────────────────────────────
// 4. Nested function with own context
// ─────────────────────────────────────────────────────────────────────────
function calculator() {
  const a = 10;
  const b = 20;
  
  function add() {
    return a + b;
  }
  
  function multiply() {
    return a * b;
  }
  
  console.log("4. Add:", add());
  console.log("4. Multiply:", multiply());
}

calculator();

console.log("\n✅ Execution Context examples complete");
