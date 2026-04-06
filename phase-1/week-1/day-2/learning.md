# Week 1 — Day 2: Execution Context + Call Stack + Memory Phase

## 🎯 Today's Goal

আজকের শেষে তুমি বুঝতে পারবে:
- JavaScript কীভাবে code execute করে
- Memory Creation Phase vs Execution Phase
- Call Stack কীভাবে function calls track করে
- Execution Context কী এবং কেন important
- Interview trap questions solve করতে পারবে

---

## 🧠 Topic 1: Execution Context (EC)

### Definition (Interview Answer)
> **Execution Context** is the environment where JavaScript code executes. It contains all necessary information like variables, functions, scope chain, and `this` binding for a particular code unit.

### বাংলায় বোঝা
Execution Context মানে হলো JavaScript code run করার সময় যে environment তৈরি হয়। ধরো তুমি একটা exam hall-এ পরীক্ষা দিচ্ছ। Exam hall হলো execution context — এখানে তোমার সব instruments (variables, functions) আছে।

### Types of Execution Context

#### 1. Global Execution Context (GEC)
- পুরো program শুরু হলে তৈরি হয়
- একটা program-এ শুধুমাত্র একটা GEC থাকে
- `this` = global object (window in browser, global in Node.js)

```javascript
const appName = "MERN Journey"; // GEC-এর অংশ

function greet() {
  console.log("Hello");
}

console.log(appName); // GEC থেকেই access
```

#### 2. Function Execution Context (FEC)
- প্রতিটা function call করলে নতুন FEC তৈরি হয়
- প্রতিটার নিজস্ব variable environment থাকে
- Call Stack-এ push হয় execution-এর সময়

```javascript
function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second");
}

first();
```

#### 3. Eval Execution Context
- `eval()` function-এর জন্য
- সাধারণত use করা হয় না, performance খারাপ

---

## ⚙️ Topic 2: Two Phases of Execution Context

Execution Context দুইটা phase-এ কাজ করে:

### Phase 1: Memory Creation Phase (Compilation)

```javascript
function greet() {
  console.log(message);
  var message = "Hi!";
}
greet();
```

**Memory Phase-এ:**

| Variable/Function | Value |
|------------------|-------|
| `greet` | function definition |
| `message` | undefined |

### Phase 2: Code Execution Phase (Running)

```javascript
var message;  // hoisted
console.log(message); // undefined
message = "Hi!";       // assignment
```

**Output:**
```
undefined
```

### Visual Representation

```
┌─────────────────────────────────────────────────────────┐
│                  EXECUTION CONTEXT                      │
├─────────────────────────────────────────────────────────┤
│  MEMORY CREATION PHASE                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │ var variables    → undefined                    │   │
│  │ let/const       → TDZ (Temporal Dead Zone)     │   │
│  │ function decl.  → full function                 │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  CODE EXECUTION PHASE                                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Line by line execution                         │   │
│  │ Assignments, Function calls, Expressions       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Topic 3: Call Stack

### Definition
> **Call Stack** is a LIFO (Last In, First Out) data structure that tracks function execution. Every time a function is called, it's pushed onto the stack. When it returns, it's popped off.

### বাংলায় বোঝা
Call Stack মানে হলো stack of execution contexts। ধরো plate stacking এর মতো — সবার উপরের plate আগে নেওয়া হয়। তাই Last In, First Out।

### Visual Example

```javascript
function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second");
}

first();
```

**Call Stack Flow:**

```
Step 1: first() called
┌─────────────┐
│ first()     │  ← Top
├─────────────┤
│ GEC         │
└─────────────┘

Step 2: second() called inside first()
┌─────────────┐
│ second()    │  ← Top
├─────────────┤
│ first()     │
├─────────────┤
│ GEC         │
└─────────────┘

Step 3: second() returns (popped)
┌─────────────┐
│ first()     │  ← Back to first
├─────────────┤
│ GEC         │
└─────────────┘

Step 4: first() returns (popped)
┌─────────────┐
│ GEC         │  ← Only GEC remains
└─────────────┘
```

**Output:**
```
first start
second
first end
```

---

## 💾 Topic 4: Memory Allocation Example

```javascript
var a = 10;

function foo() {
  var b = 20;
  function bar() {
    var c = 30;
    console.log(a, b, c); // 10 20 30
  }
  bar();
}

foo();
```

**Memory Allocation:**

| Context | Variables |
|---------|-----------|
| Global | `a = 10`, `foo = function` |
| foo() EC | `b = 20`, `bar = function` |
| bar() EC | `c = 30` |

**Scope Chain:**
```
bar() → can access a, b, c
foo() → can access a, b
Global → can access a
```

---

## 💣 Topic 5: Interview Trap Questions

### Trap 1: Function Declaration vs Expression

```javascript
// Question 1
console.log(myFunc());
function myFunc() { return 10; }

// Answer: 10 ✅
// Function declaration fully hoisted in memory phase
```

```javascript
// Question 2
console.log(myVar());
var myVar = function() { return 10; }

// Answer: TypeError: myVar is not a function
// var myVar = undefined → then trying to call undefined
```

### Trap 2: Order of Execution

```javascript
var x = 1;
console.log(x); // ?

function x() {
  return 2;
}

console.log(typeof x); // ?
```

**Explanation:**
- In memory phase: `x` is hoisted as function
- In execution phase: `x = 1` reassigns it to number
- Output: `1` then `number`

### Trap 3: Nested Function Hoisting

```javascript
alpha();

function alpha() {
  console.log(beta());
  function beta() {
    return "Hello";
  }
}

// Answer: "Hello" ✅
// Both alpha and beta are fully hoisted
```

---

## 🧪 Practice Tasks (Solve These)

### Task 1: Predict Output
```javascript
console.log(x);
var x = 5;
```

### Task 2: Predict Output
```javascript
console.log(y);
let y = 10;
```

### Task 3: Predict Output
```javascript
function alpha() {
  console.log(beta());
  function beta() {
    return "Hello";
  }
}
alpha();
```

### Task 4: Predict Output
```javascript
var a = 1;
function outer() {
  var a = 2;
  function inner() {
    console.log(a);
  }
  inner();
}
outer();
```

### Task 5: Draw Call Stack
Draw the call stack diagram for this code:

```javascript
function first() {
  second();
  console.log("first");
}

function second() {
  third();
  console.log("second");
}

function third() {
  console.log("third");
}

first();
```

---

## 💼 Real-World Use Cases

### 1. Understanding React State Updates
```javascript
// Why this causes issues:
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Shows final value
  }, 100);
}
// Call stack: i shared across all callbacks
```

### 2. Debugging Async Code
```javascript
// Understanding execution order:
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Output: 1, 3, 2 (setTimeout goes to Web API, then callback queue)
```

### 3. Memory Leak Detection
```javascript
// Understanding why memory leaks happen:
function createClosure() {
  var bigArray = new Array(1000000);
  return function() {
    return bigArray[0];
  };
}
// Each closure keeps bigArray in memory
```

---

## 🎯 Summary

| Concept | Key Point |
|---------|-----------|
| **Execution Context** | Environment where code runs |
| **Memory Phase** | Hoisting happens here |
| **Execution Phase** | Line by line execution |
| **Call Stack** | LIFO structure for function tracking |
| **GEC** | One per program |
| **FEC** | One per function call |

---

## 📖 Quick Reference

### How JS Executes:
```
1. Global Execution Context Created
   ↓
2. Memory Creation Phase
   - Scan for var → undefined
   - Scan for let/const → TDZ
   - Scan for functions → store definition
   ↓
3. Code Execution Phase
   - Execute line by line
   - Create new FEC for each function call
   - Push to Call Stack
   ↓
4. Function returns → Pop from stack
   ↓
5. Program completes → GEC remains
```

---

## 🔑 Key Takeaways

1. **Every function call = new Execution Context**
2. **Call Stack tracks the execution flow**
3. **Memory Phase ≠ Execution Phase**
4. **var hoisted as undefined, functions fully hoisted**
5. **Understanding EC is key to understanding closures**
