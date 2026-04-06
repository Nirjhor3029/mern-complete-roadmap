# Interview Q&A — Week 1 Day 2

## Execution Context + Call Stack + Memory Phase

---

## Q1: What is Execution Context in JavaScript?

### Short Answer
> Execution Context is the environment where JavaScript code executes. It contains variables, functions, scope chain, and `this` binding for a particular code unit.

### Detailed Answer
JavaScript creates an execution context for:
1. **Global Code** - When program starts (GEC)
2. **Function Call** - Each function creates new context (FEC)
3. **eval()** - Rare, avoid using

Each context has:
- **Variable Environment** - var/let/const, functions
- **Scope Chain** - accessible variables
- **This Binding** - current context

### Real-life Example
Think of execution context like a workspace:
- Global context = entire office
- Function context = individual meeting rooms
- Each room has its own materials (variables)
- But can access common office resources (global)

---

## Q2: What are the two phases of Execution Context?

### Short Answer
> 1. **Memory Creation Phase** - Hoisting happens here
> 2. **Code Execution Phase** - Line by line execution

### Detailed Answer

#### Memory Creation Phase:
- Scan code for variable declarations
- `var` → initialize as `undefined`
- `let/const` → Temporal Dead Zone (TDZ)
- Function declarations → store full definition

#### Code Execution Phase:
- Execute code line by line
- Process assignments
- Execute function calls (create new FEC)
- Evaluate expressions

### Interview Tip
> "Memory phase is like reserving tables before guests arrive. Execution phase is when guests actually eat."

---

## Q3: Explain the Call Stack in JavaScript

### Short Answer
> Call Stack is a LIFO (Last In, First Out) data structure that tracks which function is currently executing and the order of function calls.

### Visual Explanation

```
function first() {
  second();
  console.log("first");
}

function second() {
  console.log("second");
}

first();
```

**Stack Flow:**
```
[first()]    ← second() called
[first()]    ← second() returns
[GEC]        ← first() returns
```

**Output:**
```
second
first
```

### Why It Matters
- JavaScript is single-threaded
- Only one thing executes at a time
- Stack overflow if too many nested calls

---

## Q4: What gets hoisted in Memory Phase?

### Short Answer
| Declaration | What Happens |
|-------------|--------------|
| `var` | Initialized as `undefined` |
| `let/const` | In Temporal Dead Zone (TDZ) |
| Function Declaration | Full function stored |
| Function Expression | Treated like `var` |

### Code Example
```javascript
console.log(a); // undefined
var a = 5;

// JavaScript sees:
var a;              // undefined in memory phase
console.log(a);    // undefined in execution phase
a = 5;             // assignment in execution phase
```

---

## Q5: What is the difference between function declaration and expression hoisting?

### Short Answer
> Function declarations are fully hoisted (declaration + body). Function expressions are hoisted like variables (only declaration, not the function).

### Code Example
```javascript
// Function Declaration - Works! ✅
console.log(declared()); // "I'm declared"
function declared() {
  return "I'm declared";
}

// Function Expression - Error! ❌
console.log(expressed()); // TypeError
var expressed = function() {
  return "I'm expressed";
};
```

### Explanation
- Declaration: `var expressed;` → undefined
- Calling `expressed()` → undefined is not a function

---

## Q6: How does the Call Stack handle nested function calls?

### Short Answer
> When a function is called, it's pushed onto the stack. When it completes, it's popped off. The stack follows LIFO order.

### Example
```javascript
function A() { B(); console.log("A"); }
function B() { C(); console.log("B"); }
function C() { console.log("C"); }

A();
```

**Stack:**
```
Step 1: A() pushed
[A]

Step 2: B() pushed (inside A)
[B]
[A]

Step 3: C() pushed (inside B)
[C]
[B]
[A]

Step 4: C() completes, popped
[B]
[A]

Step 5: B() completes, popped
[A]

Step 6: A() completes, popped
[]
```

**Output:** C, B, A

---

## Q7: What is the difference between Global Execution Context and Function Execution Context?

### Short Answer
> **GEC** - One per program, created when script starts, `this` = global object. **FEC** - Created for each function call, has own variable environment.

### Comparison Table

| Feature | GEC | FEC |
|---------|-----|-----|
| Created | When script starts | When function called |
| `this` | Global object | Depends on call |
| Variables | Global vars | Local vars + closure |
| Count | Only 1 | Many (per call) |

---

## Q8: What happens when call stack overflows?

### Short Answer
> Stack overflow occurs when there are too many function calls without returning, usually from infinite recursion.

### Example
```javascript
function recursive() {
  recursive(); // Never returns!
}

recursive(); // RangeError: Maximum call stack size exceeded
```

---

## Q9: Predict the output and explain:

```javascript
console.log(foo());
var foo = function() { return 5; }

console.log(bar());
function bar() { return 10; }
```

### Answer
```
TypeError: foo is not a function
10
```

### Explanation
- `var foo` hoisted as undefined
- Trying to call undefined → TypeError
- `function bar()` fully hoisted → returns 10

---

## Q10: How does Execution Context relate to closures?

### Short Answer
> Closures work because functions "remember" their lexical environment. Each function execution context has access to its parent's scope chain even after the parent function has returned.

### Code Example
```javascript
function outer() {
  let counter = 0;
  return function() {
    counter++;
    return counter;
  };
}

const increment = outer();
console.log(increment()); // 1
console.log(increment()); // 2
```

### Why It Works
1. `outer()` creates FEC with `counter = 0`
2. When `outer()` returns, its FEC should be destroyed
3. But the inner function still references `counter`
4. JavaScript keeps the EC alive as a "closure"

---

## 🎯 Quick Answer Formula

For any interview question:

1. **Give definition** (in English)
2. **Explain with diagram** if needed
3. **Show code example**
4. **Give real-world use case**

---

## 🔥 Common Trap Questions to Practice

| Question | Key Point |
|----------|-----------|
| Function decl vs expr hoisting | Different hoisting behavior |
| var vs let in loop | Shared vs new binding |
| Call stack overflow | Infinite recursion |
| Nested EC | Stack builds up and unwinds |

---

## 📝 Remember This Formula

```
Execution Context = Variables + Functions + Scope Chain + This

Two Phases:
1. Memory Creation → Hoisting (var=undefined, let=TDZ, functions=full)
2. Code Execution → Line by line, create new EC for each function

Call Stack:
- Push when function called
- Pop when function returns
- LIFO order
```

---

## 📌 Interview Pro Tip

When asked about Execution Context:

> "JavaScript executes code in contexts. Each context has two phases: memory (where hoisting happens) and execution (where actual code runs). The call stack manages these contexts - pushing when called, popping when returned. This is why JavaScript is single-threaded but can handle async operations through the event loop."
