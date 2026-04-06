# Interview Q&A — Week 1 Day 3

## Closures + Lexical Scope + Advanced Function Patterns

---

## Q1: What is a Closure in JavaScript?

### Short Answer
> A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. It "closes over" its lexical environment.

### Detailed Answer
When a function is created:
1. It remembers the scope where it was defined
2. This "memory" stays with the function
3. Even if the outer function returns, the inner function can still access those variables

### Code Example
```javascript
function outer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
// count is still accessible - that's closure!
```

### Real-life Example
Think of closure like a photo album:
- The function (you) can look at old photos (variables)
- Even though the event (outer function) is over
- The memories (variables) are still accessible

---

## Q2: What is the difference between Lexical Scope and Dynamic Scope?

### Short Answer
> **Lexical Scope** is determined by where functions are written in the code. **Dynamic Scope** would be determined by where functions are called from.

### JavaScript Uses Lexical Scope
```javascript
function outer() {
  let x = 10;
  
  function inner() {
    console.log(x); // Uses x from outer - where inner was WRITTEN
  }
  
  return inner;
}

const fn = outer();
// Even if we call fn() from somewhere else, it still uses x from outer
fn(); // 10
```

### Key Point
> "It's about where the function is DEFINED, not where it's CALLED"

---

## Q3: How do closures enable data encapsulation?

### Short Answer
> Closures create private variables. Variables inside a closure cannot be accessed from outside - only through getter/setter methods.

### Code Example
```javascript
function createBankAccount() {
  let balance = 0; // Private!
  
  return {
    deposit: (amount) => {
      balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      if (amount > balance) return "Insufficient";
      balance -= amount;
      return balance;
    },
    getBalance: () => balance
  };
}

const account = createBankAccount();
console.log(account.deposit(100)); // 100
console.log(account.balance);      // undefined! Can't access directly
```

### Why Important
- No `private` keyword in JavaScript before ES6
- Closures provide data hiding
- Modules use this pattern

---

## Q4: What is Currying? Give a practical example.

### Short Answer
> Currying is transforming a function with multiple arguments into a sequence of functions, each taking a single argument.

### Code Example
```javascript
// Normal function
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

curriedAdd(1)(2)(3); // 6

// Practical use: Create specialized functions
const add10 = curriedAdd(10);
console.log(add10(5)(3)); // 18
```

### Real-world Use
```javascript
// API helper
function fetchFrom(url) {
  return function(endpoint) {
    return function(options) {
      return fetch(url + endpoint, options);
    };
  };
}

const api = fetchFrom("https://api.example.com");
const users = api("/users");
```

---

## Q5: What is the loop closure bug? How do you fix it?

### Short Answer
> When using `var` in a loop with async callbacks, all callbacks share the same variable. The fix is to use `let` or create a new scope with IIFE.

### The Bug
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 ❌
```

### Fix 1: Use let (Recommended)
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✅
```

### Fix 2: IIFE (Immediately Invoked Function Expression)
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Output: 0, 1, 2 ✅
```

### Why This Happens
- `var` is function-scoped
- All setTimeout callbacks share ONE `i` variable
- By the time callbacks run, loop finished, `i = 3`

---

## Q6: How does closure relate to React's useState?

### Short Answer
> React's useState uses closures to maintain state. Each useState call returns a getter and setter - the setter is a function that "closes over" the current state value.

### Simplified Implementation
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

// Usage
const [count, setCount] = createUseState(0);
count();    // 0
setCount(5);
count();    // 5 - state preserved through closure!
```

### React Actual Use
- Each component instance gets its own closure
- State persists between renders
- This is why stale closures are a common React bug

---

## Q7: What is a Factory Function? How does it use closures?

### Short Answer
> A factory function is a function that creates and returns objects. It uses closures to give each object its own private state.

### Code Example
```javascript
function createUser(name) {
  let role = "user"; // Private to each user
  
  return {
    name,
    getRole: () => role,
    setRole: (newRole) => role = newRole
  };
}

const user1 = createUser("Akash");
const user2 = createUser("Rahim");

user1.setRole("admin");
console.log(user1.getRole()); // "admin"
console.log(user2.getRole()); // "user" - separate closure!
```

---

## Q8: What is the output and why?

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

### Answer
```
10
```

### Explanation
- The closure captures the VARIABLE, not the VALUE
- When `outer()` ran, `x` was 10
- The function `fn` references the variable `x`
- When `fn()` runs, it reads current value of `x`
- But the assignment `x = 20` happened AFTER closure creation
- Output is 10

---

## Q9: What is Memoization and how do closures enable it?

### Short Answer
> Memoization is caching function results. Closures enable this by keeping the cache object alive across function calls.

### Code Example
```javascript
function memoize(fn) {
  const cache = {}; // Private cache via closure
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(40); // Fast due to caching!
```

---

## Q10: Explain the Module Pattern using closures.

### Short Answer
> The Module Pattern uses IIFE to create private scope and returns an object with public methods. Closures keep private variables accessible only to those methods.

### Code Example
```javascript
const MyModule = (function() {
  // Private variables
  let privateVar = "I'm private";
  let count = 0;
  
  // Private functions
  function privateMethod() {
    return "Private method called";
  }
  
  // Public API
  return {
    getPrivateVar: () => privateVar,
    increment: () => {
      count++;
      return count;
    },
    callPrivate: () => privateMethod()
  };
})();

console.log(MyModule.getPrivateVar()); // "I'm private"
console.log(MyModule.increment());     // 1
console.log(MyModule.privateVar);      // undefined
```

---

## 🎯 Quick Answer Formula

For any interview question:

1. **Give definition** (in English)
2. **Show code example**
3. **Explain output**
4. **Give real-world use case**

---

## 🔥 Common Trap Questions to Practice

| Question | Key Point |
|----------|-----------|
| Closure output after reassignment | Value at creation time |
| Loop with var vs let | Different bindings |
| Multiple closures sharing variable | All share same variable |
| Module pattern | IIFE + closure |

---

## 📝 Remember This Formula

```
Closure = Function + Lexical Environment

Uses:
- Data encapsulation (private variables)
- Function factories
- Currying
- Event handlers
- Memoization
- React state management
```
