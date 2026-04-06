// Block Scope - Variable accessible only inside {} braces
if (true) {
  let age = 25;
  var oldAge = 30;
  console.log("Inside block - let:", age);
  console.log("Inside block - var:", oldAge);
}

// console.log(age); // ReferenceError - age is block scoped
console.log("Outside block - var:", oldAge); // Works! var ignores block scope

// Nested block scope
{
  const blockVar = "I'm in block";
  {
    const nestedBlockVar = "I'm in nested block";
    console.log(blockVar, nestedBlockVar);
  }
  // console.log(nestedBlockVar); // ReferenceError
}

console.log("✅ Block scope example complete");
