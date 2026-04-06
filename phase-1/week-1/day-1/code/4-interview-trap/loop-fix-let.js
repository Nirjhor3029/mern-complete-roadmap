// FIX THE LOOP BUG - Multiple Solutions

console.log("=== SOLUTION 1: Use let ===");
console.log("Wait for setTimeout...");

// let creates a new binding for each iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("let i:", i);
  }, 100);
}
// Output: 0, 1, 2 ✅

// ─────────────────────────────────────────────────────────────────────────
// Solution 2: IIFE (Immediately Invoked Function Expression)
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n=== SOLUTION 2: IIFE ===");
  for (var j = 0; j < 3; j++) {
    (function(index) {
      setTimeout(() => {
        console.log("IIFE index:", index);
      }, 100);
    })(j);
  }
}, 200);

// ─────────────────────────────────────────────────────────────────────────
// Solution 3: Create closure with function
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n=== SOLUTION 3: Closure Function ===");
  function createLogger(index) {
    return function() {
      console.log("Closure index:", index);
    };
  }
  
  for (var k = 0; k < 3; k++) {
    setTimeout(createLogger(k), 100);
  }
}, 400);

// ─────────────────────────────────────────────────────────────────────────
// Solution 4: Store in array
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n=== SOLUTION 4: Array Storage ===");
  var logs = [];
  for (var m = 0; m < 3; m++) {
    logs[m] = function() {
      console.log("Array m:", m);
    };
  }
  logs.forEach((log, idx) => {
    setTimeout(log, 100);
  });
}, 600);

setTimeout(() => {
  console.log("✅ All loop fixes complete");
}, 800);
