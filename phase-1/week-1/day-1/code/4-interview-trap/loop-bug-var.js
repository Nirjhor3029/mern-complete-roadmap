// THE FAMOUS INTERVIEW TRAP - Loop with var
// This is one of the most common interview questions!

console.log("=== LOOP BUG WITH VAR ===");
console.log("Wait for setTimeout...");

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("var i:", i);
  }, 100);
}

// What happens:
// 1. var i is function/global scoped
// 2. All three setTimeout callbacks share the SAME i variable
// 3. By the time callbacks run, loop has finished and i = 3
// 4. All three log: 3, 3, 3 ❌

// Solution: Use let instead (see loop-fix-let.js)
console.log("✅ Loop bug with var example complete");
