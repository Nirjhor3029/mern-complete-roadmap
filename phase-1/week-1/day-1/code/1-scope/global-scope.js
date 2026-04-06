// Global Scope - Variable accessible everywhere
const appName = "MERN Journey";

function showGlobal() {
  console.log("Inside function:", appName);
}

function anotherFunction() {
  console.log("From another function:", appName);
}

showGlobal();
anotherFunction();
console.log("Outside function:", appName);

console.log("✅ Global scope example complete");
