// Loop Closure Bug - THE most important closure concept for interviews

console.log("=== LOOP CLOSURE BUG ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. THE BUG with var
// ─────────────────────────────────────────────────────────────────────────
console.log("1. THE BUG - var in loop:");

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("   var i:", i);
  }, 50);
}

// Wait for all setTimeout to complete
setTimeout(() => {
  console.log("\n   Expected: 3, 3, 3 ❌");
  console.log("   Reason: All callbacks share same 'i' variable");
  console.log("   At execution time, i = 3");
}, 200);

// ─────────────────────────────────────────────────────────────────────────
// 2. Fix with let (RECOMMENDED)
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n2. Fix with let:");

  for (let j = 0; j < 3; j++) {
    setTimeout(() => {
      console.log("   let j:", j);
    }, 50);
  }

  setTimeout(() => {
    console.log("\n   Expected: 0, 1, 2 ✅");
    console.log("   Reason: let creates new binding per iteration");
    console.log("   Each callback gets its own j");
  }, 300);
}, 250);

// ─────────────────────────────────────────────────────────────────────────
// 3. Fix with IIFE (Immediately Invoked Function Expression)
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n3. Fix with IIFE:");

  for (var k = 0; k < 3; k++) {
    (function(index) {
      setTimeout(() => {
        console.log("   IIFE index:", index);
      }, 50);
    })(k);
  }

  setTimeout(() => {
    console.log("\n   Expected: 0, 1, 2 ✅");
    console.log("   Reason: IIFE creates new scope for each iteration");
  }, 400);
}, 500);

// ─────────────────────────────────────────────────────────────────────────
// 4. Fix with closure factory function
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n4. Fix with closure function:");

  function createLogger(index) {
    return function() {
      console.log("   logger index:", index);
    };
  }

  for (var m = 0; m < 3; m++) {
    setTimeout(createLogger(m), 50);
  }

  setTimeout(() => {
    console.log("\n   Expected: 0, 1, 2 ✅");
    console.log("   Reason: createLogger(m) returns new function with m captured");
  }, 600);
}, 650);

// ─────────────────────────────────────────────────────────────────────────
// 5. Real-world React example
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n5. Real-world scenario - Creating buttons:");

  // This simulates creating 3 buttons
  function createButtons() {
    const buttons = [];
    
    for (var i = 0; i < 3; i++) {
      // In real React: onClick={() => alert(i)}
      // All buttons would alert 3!
      buttons.push({
        id: i,
        onClick: function() {
          return "Clicked button " + i;
        }
      });
    }
    
    return buttons;
  }

  const buttons = createButtons();
  console.log("   Button 0 click:", buttons[0].onClick()); // "Clicked button 3"
  console.log("   Button 1 click:", buttons[1].onClick()); // "Clicked button 3"
  console.log("   Button 2 click:", buttons[2].onClick()); // "Clicked button 3"

  console.log("\n   FIX: Use let or wrap in function:");
  console.log("   for (let i = 0; i < 3; i++) { ... }");
}, 700);

// ─────────────────────────────────────────────────────────────────────────
// 6. Why does this happen?
// ─────────────────────────────────────────────────────────────────────────
setTimeout(() => {
  console.log("\n6. WHY does this happen?");
  console.log("   Step-by-step:");
  console.log("   1. var i is function-scoped (or global)");
  console.log("   2. Only ONE 'i' variable exists");
  console.log("   3. All setTimeout callbacks reference SAME 'i'");
  console.log("   4. Loop completes, i becomes 3");
  console.log("   5. When callbacks run, i = 3");
  console.log("   6. All print: 3, 3, 3");
  console.log("\n   let fixes this because:");
  console.log("   - let is block-scoped");
  console.log("   - Creates NEW variable for each iteration");
  console.log("   - Each callback gets different variable");
}, 800);

setTimeout(() => {
  console.log("\n✅ Loop closure bug examples complete");
}, 900);
