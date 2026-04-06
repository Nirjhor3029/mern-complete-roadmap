// let - Block Scoped, Mutable
// ✅ Use when you need to reassign

function letExample() {
  if (true) {
    let blockScoped = "I'm block scoped";
    console.log("Inside block:", blockScoped);
  }
  // console.log(blockScoped); // ReferenceError - properly blocked
}

letExample();

// Reassignment allowed
let count = 0;
count = count + 1;
count += 5;
console.log("Count:", count);

// let in loop - creates new binding each iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("let i:", i), 100);
}

console.log("✅ let example complete");
