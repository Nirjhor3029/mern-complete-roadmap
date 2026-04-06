// Temporal Dead Zone (TDZ) - let and const
// Variables are hoisted but cannot be accessed before declaration

{
  // ❌ TDZ START - Cannot access yet!
  // console.log(score); // ReferenceError: Cannot access 'score' before initialization
  let score = 100; // ← Declaration line - TDZ ends here
  console.log("After TDZ:", score); // ✅ 100
  // ✅ TDZ END
}

// Another TDZ example
function tdzExample() {
  console.log("Before let:", typeof myVar); // "undefined" (typeof is safe)
  // console.log(myVar); // ReferenceError
  let myVar = "declared";
  console.log("After let:", myVar);
}

tdzExample();

// const also has TDZ
{
  // console.log(constVar); // ReferenceError
  const constVar = "const value";
  console.log(constVar);
}

// Why TDZ exists - catches bugs early
// This would be a bug in real code:
function calculate() {
  // console.log(result); // Bug! Using before declaration
  let result = 10 * 5;
  return result;
}

console.log("Calculate:", calculate());

console.log("✅ TDZ example complete");
