// this Basics - Understanding the 5 rules of this

console.log("=== THIS BASICS ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Global context - this = window (browser) or global (Node)
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Global this:");
console.log("   this:", typeof this);

// In Node.js, this = module.exports (when in module)
// In browser, this = window

// ─────────────────────────────────────────────────────────────────────────
// 2. Function call - default binding
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Function call (default binding):");

function sayHi() {
  console.log("   this in function:", this);
}

sayHi(); // undefined (strict) or global object

// ─────────────────────────────────────────────────────────────────────────
// 3. Method call - implicit binding
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Method call (implicit binding):");

const obj = {
  name: "Nirjhor",
  greet: function() {
    console.log("   Hello, I am", this.name);
  }
};

obj.greet(); // this = obj

// Same function, different this
const obj2 = { name: "Akash", greet: obj.greet };
obj2.greet(); // this = obj2

// ─────────────────────────────────────────────────────────────────────────
// 4. Constructor - new keyword
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Constructor (new keyword):");

function Person(name) {
  this.name = name;
  console.log("   Creating person:", this.name);
}

const p1 = new Person("Nirjhor");
const p2 = new Person("Akash");

console.log("   p1.name:", p1.name);
console.log("   p2.name:", p2.name);

// ─────────────────────────────────────────────────────────────────────────
// 5. Explicit binding - call/apply/bind
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Explicit binding:");

function introduce(role) {
  console.log("   I am", this.name, "and I am a", role);
}

const user = { name: "Rahim" };

introduce.call(user, "Developer");
introduce.apply(user, ["Designer"]);

const boundFn = introduce.bind(user, "Admin");
boundFn();

console.log("\n✅ this basics complete");
