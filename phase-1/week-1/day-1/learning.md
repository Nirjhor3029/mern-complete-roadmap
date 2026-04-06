# Week 1 — Day 1: Scope, var/let/const, Hoisting

## 🎯 Today's Goal

আজকের শেষে তুমি explain করতে পারবে:
- Scope কী এবং JS variable কোথায় live করে
- var vs let vs const এর পার্থক্য
- Hoisting actually কী
- Temporal Dead Zone কী
- Interview trap questions কিভাবে solve করতে হয়

---

## 🧠 Topic 1: Scope — Variable কোথায় accessible

### Definition (Interview Answer)
> **Scope** is the region of code where a variable is accessible. In JavaScript, there are three main types: global scope, function scope, and block scope.

### বাংলায় বোঝা
Scope মানে হলো variable টা কোন জায়গা থেকে access করা যাবে। যেমন ঢাকার বাইরে থেকে কেউ ঢাকার ভিতরের কথা শুনতে পায় না — ঠিক অনেকটা সেই রকম।

### Code Examples

#### Global Scope
```javascript
const appName = "MERN Journey";

function show() {
  console.log(appName); // ✅ Accessible
}

show();
console.log(appName); // ✅ Accessible
```

#### Function Scope
```javascript
function user() {
  const name = "Nirjhor";
  console.log(name); // ✅ Accessible - "Nirjhor"
}

user();
console.log(name); // ❌ ReferenceError - name is not defined
```

#### Block Scope
```javascript
if (true) {
  let age = 25;
  var oldAge = 30;
  console.log(age); // ✅ 25
}

console.log(age); // ❌ ReferenceError
console.log(oldAge); // ✅ 30 (var is function scoped, not block scoped!)
```

### Real-life Example (Bangladeshi Context)
ধরো তুমি BD Metro-তে যাচ্ছ। Metro-র station area হলো global scope — সবাই ঢুকতে পারে। প্রতিটা coach হলো function scope — শুধু ঐ coach-এর যাত্রীরা। আর seat হলো block scope — শুধু ঐ seat-এ বসা person।

---

## ⚔️ Topic 2: var vs let vs const

### Definition
> **var** is function-scoped and can be re-declared. **let** is block-scoped and mutable. **const** is block-scoped and immutable (but objects can be mutated).

### var — কেন ব্যবহার করবে না
```javascript
if (true) {
  var x = 10;
}
console.log(x); // ✅ 10 — var ignores block scope!

// 🚨 Problem in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 ❌ (All same variable!)
```

### let — সবচেয়ে safe
```javascript
if (true) {
  let y = 20;
}
console.log(y); // ❌ ReferenceError — let respects block scope

// ✅ Correct loop behavior
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✅
```

### const — Default choice
```javascript
const z = 30;
z = 40; // ❌ TypeError: Assignment to constant variable

// ✅ But mutation is allowed
const user = { name: "Akash" };
user.name = "Rahim"; // ✅ Allowed - same reference
user = { name: "Karim" }; // ❌ Cannot reassign

// 🔒 Freeze if needed
const frozen = Object.freeze({ name: "Test" });
frozen.name = "Hack"; // ❌ Error in strict mode
```

### Production Rule (Remember This!)
```
default → const        ( safest )
if reassign needed → let
never → var            ( causes bugs )
```

---

## 🚀 Topic 3: Hoisting

### Definition
> **Hoisting** is JavaScript's behavior of moving declarations to the top of their scope during the compilation phase. Only declarations are hoisted, not initializations.

### বাংলায় বোঝা
Hoisting মানে হলো JavaScript code run করার আগে নিজে থেকে variable declarations memory-তে তুলে নেওয়া। কিন্তু শুধু declaration, value না!

### How JavaScript Executes

#### Phase 1: Compilation (Memory Creation)
```javascript
// Your code:
console.log(a);
var a = 10;

// What JavaScript actually does:
var a;           // ✅ Hoisted (declaration only)
console.log(a);  // undefined
a = 10;          // Assignment stays here
```

#### Output
```
undefined
```

### let and const are Different!
```javascript
console.log(b);
let b = 20;

// ❌ ReferenceError: Cannot access 'b' before initialization
// This is Temporal Dead Zone (TDZ)!
```

---

## ⚠️ Topic 4: Temporal Dead Zone (TDZ)

### Definition
> **Temporal Dead Zone** is the period between entering scope and the actual declaration where let/const variables cannot be accessed.

### Visual Explanation
```javascript
{
  // ❌ TDZ START - can't access yet
  console.log(score); // ReferenceError
  let score = 100;   // ← Declaration line
  console.log(score); // ✅ Now accessible - 100
  // ✅ TDZ END
}
```

### Why TDZ Exists?
TDZ helps catch bugs early:
- Accessing variables before declaration is almost always a bug
- Makes code more predictable
- Forces developers to declare variables at the top of blocks

---

## 💣 Interview Trap — The Famous Loop Bug

### The Trap Question
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// What is the output?
```

### ❌ Wrong Answer
0, 1, 2

### ✅ Correct Answer
```
3
3
3
```

### Explanation
1. `var i` is function-scoped (or global-scoped)
2. All three setTimeout callbacks share the SAME `i` variable
3. By the time callbacks run, loop has finished and `i = 3`
4. All three log the same value: 3

### The Fix
```javascript
// Use let instead of var
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✅
```

### Why let works?
`let` creates a NEW binding for each iteration — each callback gets its own copy of `i`.

---

## 🧪 Practice Tasks (Solve These)

### Task 1: Predict Output
```javascript
console.log(a);
var a = 5;
```

### Task 2: Error or Output?
```javascript
{
  let x = 10;
}
console.log(x);
```

### Task 3: What logs?
```javascript
const user = { name: "A" };
user.name = "B";
console.log(user);
```

### Task 4: Fix the Bug
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
// Make it print 0, 1, 2, 3, 4
```

### Task 5: Hoisting Prediction
```javascript
console.log(foo());
function foo() {
  return "hello";
}
```

---

## 💼 Real-World Use Cases

### 1. React useState Bugs
```javascript
// ❌ Bug: Using var in loop
for (var i = 0; i < items.length; i++) {
  useEffect(() => {
    console.log(items[i]); // Wrong! i is final value
  }, []);
}

// ✅ Fix: Use let or create new scope
for (let i = 0; i < items.length; i++) {
  useEffect(() => {
    console.log(items[i]); // Correct!
  }, []);
}
```

### 2. Module-level Constants
```javascript
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;

// Cannot accidentally reassign
API_URL = "https://other.com"; // Error!
```

### 3. Block-scoped Error Handling
```javascript
try {
  const data = JSON.parse(userInput);
  // use data here
} catch (error) {
  console.log(data); // ❌ ReferenceError - data not accessible
}
```

---

## 🎯 Summary

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Reassignment | ✅ | ✅ | ❌ |
| Redclaration | ✅ | ❌ | ❌ |
| Use in Production | ❌ No | ✅ When needed | ✅ Default |

---

## 📖 Quick Reference

### Scope Types
- **Global**: Accessible everywhere
- **Function**: Only inside function
- **Block**: Inside `{}` braces

### Hoisting Rules
- `var` → Hoisted with `undefined`
- `let` → Hoisted but in TDZ
- `const` → Hoisted but in TDZ
- Functions → Fully hoisted

### Golden Rules
1. Default use `const`
2. Use `let` only when reassignment needed
3. Never use `var` in modern JS
4. Declare variables at top of blocks
5. Understand TDZ to avoid bugs
