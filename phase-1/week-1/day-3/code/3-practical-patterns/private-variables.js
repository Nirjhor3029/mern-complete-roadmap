// Practical Closure Patterns - Real-world examples

console.log("=== PRACTICAL CLOSURE PATTERNS ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Private Variables (Data Encapsulation)
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Private variables:");

function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private!
  
  return {
    deposit: (amount) => {
      balance += amount;
      return `Deposited ${amount}, Balance: ${balance}`;
    },
    withdraw: (amount) => {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return `Withdrawn ${amount}, Balance: ${balance}`;
    },
    getBalance: () => balance
  };
}

const account = createBankAccount(1000);
console.log("  ", account.deposit(500)); // 1500
console.log("  ", account.withdraw(200)); // 1300
console.log("  ", account.getBalance()); // 1300
// console.log(account.balance); // undefined!

// ─────────────────────────────────────────────────────────────────────────
// 2. Module Pattern (IIFE)
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Module pattern (IIFE):");

const Calculator = (function() {
  let result = 0;
  
  return {
    add: (n) => { result += n; return result; },
    subtract: (n) => { result -= n; return result; },
    multiply: (n) => { result *= n; return result; },
    divide: (n) => { result /= n; return result; },
    reset: () => { result = 0; return result; },
    getResult: () => result
  };
})();

console.log("   Add 10:", Calculator.add(10)); // 10
console.log("   Add 5:", Calculator.add(5)); // 15
console.log("   Multiply 2:", Calculator.multiply(2)); // 30
console.log("   Result:", Calculator.getResult()); // 30
Calculator.reset();
console.log("   After reset:", Calculator.getResult()); // 0

// ─────────────────────────────────────────────────────────────────────────
// 3. Factory Functions
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Factory functions:");

function createUser(name) {
  let role = "user";
  let loginCount = 0;
  
  return {
    name,
    getRole: () => role,
    setRole: (newRole) => { role = newRole; },
    login: () => { loginCount++; return `Logged in (${loginCount})`; },
    getLoginCount: () => loginCount
  };
}

const user1 = createUser("Akash");
const user2 = createUser("Rahim");

console.log("   user1 login:", user1.login()); // Logged in (1)
console.log("   user1 role:", user1.getRole()); // user
user1.setRole("admin");
console.log("   user1 new role:", user1.getRole()); // admin
console.log("   user2 role:", user2.getRole()); // user (separate!)

// ─────────────────────────────────────────────────────────────────────────
// 4. Event Handlers with Closures
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Event handler pattern:");

function createClickHandler(message) {
  return function() {
    console.log("   Clicked:", message);
  };
}

const handler1 = createClickHandler("Save clicked!");
const handler2 = createClickHandler("Delete clicked!");

handler1(); // Simulating click
handler2(); // Simulating click

// In real DOM:
// button.addEventListener('click', handler1);

// ─────────────────────────────────────────────────────────────────────────
// 5. Cache/Memoization
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Memoization pattern:");

function createCache() {
  const cache = {};
  
  return {
    get: (key) => cache[key] || null,
    set: (key, value) => { cache[key] = value; },
    clear: () => { 
      Object.keys(cache).forEach(k => delete cache[k]); 
    },
    size: () => Object.keys(cache).length
  };
}

const cache = createCache();
cache.set("user1", { name: "Akash", age: 25 });
cache.set("user2", { name: "Rahim", age: 30 });

console.log("   Get user1:", cache.get("user1"));
console.log("   Get user2:", cache.get("user2"));
console.log("   Cache size:", cache.size());

console.log("\n✅ Practical closure patterns complete");
