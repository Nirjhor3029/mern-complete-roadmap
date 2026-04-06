// Advanced Function Patterns - Currying, Partial Application, Factory Functions

console.log("=== ADVANCED FUNCTION PATTERNS ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Currying
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Currying:");

// Normal function
function add(a, b, c) {
  return a + b + c;
}
console.log("   add(1,2,3):", add(1, 2, 3));

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log("   curriedAdd(1)(2)(3):", curriedAdd(1)(2)(3));

// Practical currying - create specialized functions
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);
const quadruple = multiply(4);

console.log("   double(5):", double(5)); // 10
console.log("   triple(5):", triple(5)); // 15
console.log("   quadruple(5):", quadruple(5)); // 20

// ─────────────────────────────────────────────────────────────────────────
// 2. Partial Application
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Partial Application:");

function multiply(a, b, c) {
  return a * b * c;
}

// Using bind(null, value) - first argument is 'this'
const partial1 = multiply.bind(null, 2);
console.log("   partial1(3, 4):", partial1(3, 4)); // 2*3*4 = 24

const partial2 = multiply.bind(null, 2, 3);
console.log("   partial2(4):", partial2(4)); // 2*3*4 = 24

// More practical example
function fetchFrom(baseUrl) {
  return function(endpoint) {
    return function(options) {
      return baseUrl + endpoint;
    };
  };
}

const api = fetchFrom("https://api.example.com");
const users = api("/users");
console.log("   API call:", users({ method: "GET" }));

// ─────────────────────────────────────────────────────────────────────────
// 3. Function Composition
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Function Composition:");

const compose = (f, g) => (x) => f(g(x));

const add10 = (x) => x + 10;
const multiply3 = (x) => x * 3;

const add10ThenMultiply3 = compose(multiply3, add10);
const multiply3ThenAdd10 = compose(add10, multiply3);

console.log("   add10(5):", add10(5)); // 15
console.log("   multiply3(5):", multiply3(5)); // 15
console.log("   add10ThenMultiply3(5):", add10ThenMultiply3(5)); // (5+10)*3 = 45
console.log("   multiply3ThenAdd10(5):", multiply3ThenAdd10(5)); // (5*3)+10 = 25

// ─────────────────────────────────────────────────────────────────────────
// 4. Once - Run function only once
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Once (run once):");

function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const initOnce = once(() => {
  console.log("   Initialization running...");
  return "Initialized";
});

console.log("   First call:", initOnce()); // Runs
console.log("   Second call:", initOnce()); // Returns cached
console.log("   Third call:", initOnce()); // Returns cached

// ─────────────────────────────────────────────────────────────────────────
// 5. Memoization (Caching expensive computations)
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Memoization:");

function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      console.log("   Cache hit for:", key);
      return cache[key];
    }
    
    console.log("   Computing for:", key);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log("   fib(5):", fibonacci(5)); // Computes
console.log("   fib(5) again:", fibonacci(5)); // Cache hit
console.log("   fib(3):", fibonacci(3)); // Computes
console.log("   fib(3) again:", fibonacci(3)); // Cache hit

// ─────────────────────────────────────────────────────────────────────────
// 6. Debounce with closure
// ─────────────────────────────────────────────────────────────────────────
console.log("\n6. Debounce:");

function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedLog = debounce((msg) => {
  console.log("   Debounced:", msg);
}, 100);

debouncedLog("call 1");
debouncedLog("call 2");
debouncedLog("call 3");
console.log("   (wait 100ms for debounced output)");

setTimeout(() => {
  console.log("\n✅ Advanced function patterns complete");
}, 150);
