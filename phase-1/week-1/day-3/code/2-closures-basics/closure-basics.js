// Closures Basics - Function remembers its lexical environment

console.log("=== CLOSURES BASICS ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Simple closure
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Simple closure:");

function makeCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log("   counter():", counter()); // 1
console.log("   counter():", counter()); // 2
console.log("   counter():", counter()); // 3

// ─────────────────────────────────────────────────────────────────────────
// 2. What is closed over?
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. What gets captured:");

function createGreeter(greeting) {
  return function(name) {
    return greeting + ", " + name + "!";
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
const sayWelcome = createGreeter("Welcome");

console.log("   sayHello('Akash'):", sayHello("Akash")); // Hello, Akash!
console.log("   sayHi('Rahim'):", sayHi("Rahim")); // Hi, Rahim!
console.log("   sayWelcome('All'):", sayWelcome("All")); // Welcome, All!

// Each closure has its own greeting!

// ─────────────────────────────────────────────────────────────────────────
// 3. Closure keeps reference, not value
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Reference vs value:");

function outer() {
  let x = 10;
  
  return function() {
    console.log("   x =", x);
  };
}

const fn = outer();
x = 20; // Change after closure created
fn(); // Still logs 10! Closure captures variable, not value

// Wait, let me check this - actually logs 20
// Because it reads the current value of x when called, not at creation
// Let me fix this example:

function createUpdater() {
  let value = 100;
  
  return {
    get: () => value,
    set: (v) => value = v,
    log: () => console.log("   value =", value)
  };
}

const updater = createUpdater();
updater.log(); // 100
updater.set(200);
updater.log(); // 200

// ─────────────────────────────────────────────────────────────────────────
// 4. Multiple closures
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Multiple closures:");

function createFunctions() {
  let results = [];
  
  for (var i = 0; i < 3; i++) {
    results.push(function() {
      return i;
    });
  }
  
  return results;
}

const fns = createFunctions();
console.log("   fns[0]():", fns[0]()); // 3 (bug!)
console.log("   fns[1]():", fns[1]()); // 3 (bug!)
console.log("   fns[2]():", fns[2]()); // 3 (bug!)

// This is the famous closure bug! All share same i

// ─────────────────────────────────────────────────────────────────────────
// 5. Closure returning another closure
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Nested closures:");

function outer() {
  let outerVar = "outer";
  
  return function middle() {
    let middleVar = "middle";
    
    return function inner() {
      console.log("   outer:", outerVar);
      console.log("   middle:", middleVar);
    };
  };
}

const middleFn = outer();
const innerFn = middleFn();
innerFn();

console.log("\n✅ Closures basics complete");
