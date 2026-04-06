// ═══════════════════════════════════════════════════════════════════════════
// Week 1 - Day 1: Complete Code Index
// Run this file or run individual modules
// ═══════════════════════════════════════════════════════════════════════════

console.log("╔══════════════════════════════════════════════════════════════════╗");
console.log("║     WEEK 1 - DAY 1: SCOPE, VAR/LET/CONST, HOISTING               ║");
console.log("╚══════════════════════════════════════════════════════════════════╝\n");

// Import and run all examples
// In Node.js, we run each file separately

const examples = {
  scope: [
    "1-scope/global-scope.js",
    "1-scope/function-scope.js", 
    "1-scope/block-scope.js"
  ],
  variables: [
    "2-variables/var-example.js",
    "2-variables/let-example.js",
    "2-variables/const-example.js"
  ],
  hoisting: [
    "3-hoisting/var-hoisting.js",
    "3-hoisting/function-hoisting.js",
    "3-hoisting/tdz-example.js"
  ],
  interviewTrap: [
    "4-interview-trap/loop-bug-var.js",
    "4-interview-trap/loop-fix-let.js"
  ]
};

console.log("📁 Code Structure:");
console.log("------------------\n");

Object.entries(examples).forEach(([category, files]) => {
  console.log(`📂 ${category}:`);
  files.forEach(file => {
    console.log(`   ├── ${file}`);
  });
  console.log();
});

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("To run individual examples, use: node <filename>.js");
console.log("To run all scope examples: node 1-scope/*.js");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("⚡ Quick Reference:");
console.log("------------------");
console.log("1. Always use 'const' by default");
console.log("2. Use 'let' only when reassignment needed");
console.log("3. Never use 'var' - causes bugs in loops/async");
console.log("4. Remember TDZ - let/const can't access before declaration");
console.log("5. var is function-scoped, let/const are block-scoped");
console.log("\n✅ Index loaded!");
