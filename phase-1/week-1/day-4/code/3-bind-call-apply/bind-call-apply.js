// Bind / Call / Apply - Controlling context explicitly

console.log("=== BIND / CALL / APPLY ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. .call() - Immediate execution
// ─────────────────────────────────────────────────────────────────────────
console.log("1. .call() - Immediate execution:");

function greet(greeting, punctuation) {
  console.log("   " + greeting + ", " + this.name + punctuation);
}

const user1 = { name: "Nirjhor" };
const user2 = { name: "Akash" };

greet.call(user1, "Hello", "!");  // Hello, Nirjhor!
greet.call(user2, "Hi", "?");    // Hi, Akash?

// ─────────────────────────────────────────────────────────────────────────
// 2. .apply() - With array arguments
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. .apply() - With array:");

function introduce(age, city, country) {
  console.log("   I am " + this.name + ", " + age + " years old");
  console.log("   From " + city + ", " + country);
}

const person = { name: "Rahim" };

introduce.apply(person, [25, "Dhaka", "Bangladesh"]);

// .apply() is useful when you have array of arguments
const args = [30, "Chittagong", "Bangladesh"];
introduce.apply(person, args);

// ─────────────────────────────────────────────────────────────────────────
// 3. .bind() - Create new function
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. .bind() - Create new function:");

function multiply(factor, number) {
  return factor * number;
}

const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log("   double(5):", double(5));   // 10
console.log("   triple(5):", triple(5));   // 15

// Bind with object context
const obj = { name: "Karim" };

function sayName() {
  console.log("   My name is", this.name);
}

const boundSayName = sayName.bind(obj);
boundSayName(); // "My name is Karim"
boundSayName(); // Same result every time

// ─────────────────────────────────────────────────────────────────────────
// 4. Partial application with bind
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Partial application:");

function add(a, b, c) {
  return a + b + c;
}

const add5 = add.bind(null, 5);
const add5And10 = add.bind(null, 5, 10);

console.log("   add5(3, 2):", add5(3, 2));      // 5 + 3 + 2 = 10
console.log("   add5And10(2):", add5And10(2));   // 5 + 10 + 2 = 17

// ─────────────────────────────────────────────────────────────────────────
// 5. Practical use cases
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Practical examples:");

// Array method with custom this
const nums = [1, 2, 3];
const mathObj = { multiplier: 10 };

const doubled = nums.map(function(n) {
  return n * this.multiplier;
}, mathObj);

console.log("   doubled:", doubled); // [10, 20, 30]

// Event handler context
const button = {
  label: "Click Me",
  click: function() {
    console.log("   Button clicked:", this.label);
  }
};

const handler = button.click.bind(button);
handler(); // Works!

console.log("\n✅ Bind / Call / Apply complete");
