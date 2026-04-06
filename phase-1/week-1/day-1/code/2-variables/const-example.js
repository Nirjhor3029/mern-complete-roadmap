// const - Block Scoped, Immutable Reference
// ✅ Default choice for variables that won't be reassigned

const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;
// API_URL = "https://other.com"; // TypeError: Assignment to constant

// Object mutation allowed (but not reassignment)
const user = { name: "Akash" };
user.name = "Rahim"; // ✅ Allowed
user.age = 25;       // ✅ Allowed
// user = {};          // ❌ Error - cannot reassign

console.log("User:", user);

// Array mutation allowed
const numbers = [1, 2, 3];
numbers.push(4); // ✅ Allowed
// numbers = [];    // ❌ Error

console.log("Numbers:", numbers);

// Object.freeze() for true immutability
const frozen = Object.freeze({ name: "Test" });
// frozen.name = "Hack"; // Error in strict mode

console.log("✅ const example complete");
