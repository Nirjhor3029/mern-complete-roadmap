// Function Scope - Variable accessible only inside function
function user() {
  const name = "Nirjhor";
  console.log("Inside user():", name);
}

user();

// console.log(name); // ReferenceError - name is not defined

console.log("✅ Function scope example complete");
