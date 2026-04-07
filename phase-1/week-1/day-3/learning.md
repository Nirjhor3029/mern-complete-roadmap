# Week 1 — Day 3: Closures + Lexical Scope + Advanced Function Patterns

## 🎯 Today's Goal

আজকের শেষে তুমি বুঝতে পারবে:
- Closure কী এবং কেন important
- Lexical Scope কীভাবে কাজ করে
- Private variables কিভাবে তৈরি করা যায়
- Currying, Partial Application, Factory Functions
- Loop ধেয়ে closure bug fix করতে পারবে
- React & Node async bugs বুঝতে পারবে

---

## 🧠 Topic 1: Lexical Scope

### Definition (Interview Answer)
> **Lexical Scope** means that a function's scope is determined by where it is written in the source code, not where it is called. The inner function can access variables from its parent's scope because of where it was defined.

### বাংলায় বোঝা
Lexical Scope মানে হলো function কোথায় লেখা হয়েছে সেটা important, কোথায় call করা হয়েছে না। ধরো তুমি Dhaka University-এ পড়ো। তোমার friends যতই Dhaka-এর বাইরে থাকুক, তুমি Dhaka University-এর student। এটা lexical scope-এর মতো — function declare করার জায়গা থেকে scope তৈরি হয়।

### Visual Example

```javascript
function outer() {
  let outerVar = "I'm outer";
  
  function inner() {
    console.log(outerVar); // Can access outerVar!
  }
  
  inner(); // inner() এ লেখা আছে তাই outerVar access করতে পারে
}

outer(); // Output: "I'm outer"
```

**Scope Chain:**
```
inner() → outer() → Global
   ↓         ↓
outerVar   outerVar
```

### Key Point
```javascript
function outer() {
  let x = 10;
  
  function inner() {
    console.log(x);
  }
  
  return inner; // Return function, not call it
}

const fn = outer();
// fn is now a closure that remembers x = 10
fn(); // Output: 10
```

---

## ⚡ Topic 2: What is Closure?

### Definition
> **Closure** is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. The function "closes over" its lexical environment.

### বাংলায় বোঝা
Closure মানে হলো function তার parent function-এর variable গুলোকে remember করে রাখে, even after parent function return করে যায়। ধরো তুমি একটা hostel থেকে graduated করলে। কিন্তু তোমার friends, memories সব তোমার সাথে থাকে — এটাই closure।

### Simple Closure Example

```javascript
function makeCounter() {
  let count = 0;
  
  return function() {
    count++;
    console.log(count);
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
// count variable is "trapped" in closure!
```

### Why This is Powerful
- **Data Encapsulation**: Private variables possible
- **State Preservation**: Keep state without global variables
- **Function Factories**: Create specialized functions

---

## ✅ Topic 3: Practical Closure Patterns

### 3.1 Private Variables (Data Hiding)

```javascript
function Person(name) {
  let secret = "shh!"; // Private variable
  
  this.name = name;
  
  this.getSecret = function() {
    return secret;
  };
}

const p = new Person("Nirjhor");
console.log(p.getSecret()); // "shh!"
console.log(p.secret);      // undefined - can't access directly!
```

### 3.2 Module Pattern (IIFE : Immediately Invoked Function Expression)

```javascript
const CounterModule = (function() {
  let count = 0; // Private
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
})();

console.log(CounterModule.increment()); // 1
console.log(CounterModule.increment()); // 2
console.log(CounterModule.getCount());  // 2
// count is encapsulated - no direct access!
```

### 3.3 Loop Closure Bug (CRITICAL!)

```javascript
// ❌ THE BUG (using var)
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// Output: 3, 3, 3 ❌ (All same variable!)

// Fix 1: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✅

// Fix 2: IIFE (Immediately Invoked Function Expression)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 100);
  })(i);
}
// Output: 0, 1, 2 ✅
```

### Why This Happens
1. `var i` is function-scoped (or global)
2. All setTimeout callbacks share the SAME `i` variable
3. By the time callbacks run, loop has finished, `i = 3`
4. All log the same value: 3

---

## 🔥 Topic 4: Advanced Function Patterns

### 4.1 Currying

```javascript
// Currying: Transform function with multiple args into sequence of functions
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10

const triple = multiply(3);
console.log(triple(5)); // 15

// Or use it directly:
console.log(multiply(4)(5)); // 20
```

### 4.2 Partial Application

```javascript
function add(a, b, c) {
  return a + b + c;
}

// Partial application with bind
const add5 = add.bind(null, 5);
console.log(add5(3, 2)); // 10 (5 + 3 + 2)

// More examples:
const add10 = add.bind(null, 10, 0); // Fixed first two args
console.log(add10(5)); // 15 (10 + 0 + 5)
```

### 4.3 Factory Functions

```javascript
function createUser(name) {
  let role = "user";
  
  return {
    name,
    getRole: () => role,
    setRole: (newRole) => role = newRole
  };
}

const user1 = createUser("Akash");
const user2 = createUser("Rahim");

console.log(user1.getRole()); // "user"
user1.setRole("admin");
console.log(user1.getRole()); // "admin"
console.log(user2.getRole()); // "user" (separate closure!)
```

### 4.4 Memoization (Caching)

```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log("From cache:", key);
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const slowMultiply = memoize((a, b) => {
  console.log("Computing...", a, b);
  return a * b;
});

console.log(slowMultiply(2, 3)); // Computing... 6
console.log(slowMultiply(2, 3)); // From cache: [2,3] 6
```

---

## 🧪 Practice Tasks

### Task 1: Counter with Reset
```javascript
function createCounter() {
  // Create counter with increment, decrement, and reset methods
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.reset();
counter.increment(); // 1
```

### Task 2: Private Balance
```javascript
function createAccount(initialBalance) {
  // Private balance
  // deposit(amount) - adds to balance
  // withdraw(amount) - subtracts if sufficient
  // getBalance() - returns current balance
}

const account = createAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance()); // 120
```

### Task 3: Predict Output
```javascript
function outer() {
  let x = 10;
  return function() {
    console.log(x);
  };
}
const fn = outer();
x = 20;
fn();
```

### Task 4: Button Index (Loop Closure)
```javascript
// Create 5 buttons (simulate), each logs its index when clicked
// Without using let - use IIFE to capture index
```

---

## 💼 Real-World Use Cases

### 1. React useState (simplified)
```javascript
function createUseState(initialValue) {
  let state = initialValue;
  
  function setState(newValue) {
    state = newValue;
  }
  
  function getState() {
    return state;
  }
  
  return [getState, setState];
}

const [count, setCount] = createUseState(0);
console.log(count()); // 0
setCount(5);
console.log(count()); // 5
```

### 2. Event Handlers
```javascript
function createClickHandler(message) {
  return function() {
    console.log(message);
  };
}

const handler1 = createClickHandler("Button 1 clicked");
const handler2 = createClickHandler("Button 2 clicked");
// Attach handler1 and handler2 to buttons
```

### 3. Data Caching
```javascript
function createCache() {
  const cache = {};
  
  return {
    get: (key) => cache[key],
    set: (key, value) => { cache[key] = value; }
  };
}
```

---

## 🎯 Summary

| Pattern | Use Case |
|---------|----------|
| **Closure** | Function remembers parent scope |
| **Lexical Scope** | Scope determined by declaration location |
| **Private Variables** | Hide data from outside |
| **Module Pattern** | Encapsulate related functions |
| **Currying** | Create specialized functions |
| **Factory Functions** | Create multiple similar objects |

---

## 📖 Quick Reference

### Closure Formula
```
Closure = Function + Lexical Environment

When a function is:
- Returned from another function
- Passed as a callback
- Stored in a variable

It "captures" its surrounding scope!
```

### Loop Bug Fixes
```javascript
// Fix 1: Use let (recommended)
for (let i = 0; i < 3; i++) { }

// Fix 2: Use IIFE
for (var i = 0; i < 3; i++) {
  (function(j) { })(i);
}

// Fix 3: Store in array
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(function() { return i; });
}
```
