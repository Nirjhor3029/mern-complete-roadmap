// var - Function Scoped (ignores block scope)
// ⚠️ AVOID using var in modern JavaScript

function varExample() {
  if (true) {
    var functionScoped = "I'm function scoped";
  }
  console.log("Inside function:", functionScoped); // Works! var ignores block
}

varExample();

// Global var bug
if (true) {
  var globalBug = "I leak out!";
}
console.log("Outside block:", globalBug);

console.log("✅ var example complete");
