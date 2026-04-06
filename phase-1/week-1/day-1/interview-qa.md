# Interview Q&A — Week 1 Day 1

## Scope, var/let/const, Hoisting

---

## Q1: What is the difference between var, let, and const?

### Short Answer
> `var` is function-scoped and can be re-declared, `let` is block-scoped and mutable, `const` is block-scoped and immutable (but objects can be mutated).

### Detailed Answer
- **var**: Function-scoped, hoisted with undefined, can be re-declared and reassigned. Avoid in modern JavaScript.
- **let**: Block-scoped, hoisted but in Temporal Dead Zone, can be reassigned but not re-declared in same scope.
- **const**: Block-scoped, cannot be reassigned. For objects, the reference is immutable but properties can still be modified.

### Real-life Example
Think of it like:
- `var` = Open office (everyone sees everything)
- `let` = Meeting room (only people inside can use it)
- `const` = Your personal locker (you have the only key, can't swap lockers)

---

## Q2: What is hoisting in JavaScript?

### Short Answer
> Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the compilation phase. Only declarations are hoisted, not initializations.

### Detailed Answer
JavaScript has two phases:
1. **Compilation Phase**: Scans code, allocates memory for declarations
2. **Execution Phase**: Runs code line by line

During compilation:
- `var` declarations are hoisted and initialized as `undefined`
- `let` and `const` are hoisted but stay in Temporal Dead Zone
- Function declarations are fully hoisted

### Code Example
```javascript
console.log(a); // undefined (not error!)
var a = 5;

// Behind the scenes:
var a;          // hoisted + undefined
console.log(a); // undefined
a = 5;          // assignment runs here
```

---

## Q3: What is Temporal Dead Zone (TDZ)?

### Short Answer
> TDZ is the period between entering a block and the declaration of let/const variables where accessing them throws a ReferenceError.

### Why It Exists
- Prevents accidental access before declaration
- Catches bugs early
- Makes code more predictable

### Interview Tip
> "TDZ is why `let` is safer than `var` - it forces you to declare variables before use, preventing bugs from hoisting."

---

## Q4: Why does `var` cause bugs in async code/loops?

### Short Answer
> Because `var` is function-scoped (or global-scoped), not block-scoped. In a loop, all async callbacks share the same variable, which ends up at its final value.

### Code Example
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 ❌

// Fix with let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✅
```

### Explanation
With `var`, there's only ONE `i` variable shared by all callbacks. When the loop finishes, `i = 3`, so all callbacks log 3.

With `let`, each iteration creates a NEW binding - each callback gets its own copy of `i`.

---

## Q5: What is the difference between lexical scope and block scope?

### Short Answer
> **Lexical scope** is determined by where functions are written in the code (static). **Block scope** is determined by `{}` curly braces.

### Lexical Scope Example
```javascript
const x = 10;

function outer() {
  const y = 20;
  
  function inner() {
    console.log(x, y); // Can access both!
  }
  
  inner();
}
```

The inner function can access `x` and `y` because of where it was defined - that's lexical scope.

### Block Scope Example
```javascript
if (true) {
  let blockVar = "only here";
}
console.log(blockVar); // Error!
```

---

## Q6: Can you modify a const object?

### Short Answer
> Yes! `const` prevents reassignment of the variable, but doesn't make objects immutable. You can add/modify properties.

### Code Example
```javascript
const user = { name: "Rahim" };
user.name = "Karim"; // ✅ Allowed
user.age = 25;       // ✅ Allowed

user = { name: "New" }; // ❌ Error - cannot reassign
```

### How to Freeze Completely
```javascript
const frozen = Object.freeze({ name: "Test" });
frozen.name = "Hack"; // ❌ Error in strict mode
```

---

## Q7: What gets hoisted - the value or the declaration?

### Short Answer
> Only the DECLARATION is hoisted, not the initialization/assignment.

### Example
```javascript
console.log(a); // undefined, not 10!
var a = 10;

// JavaScript sees it as:
var a;              // Declaration hoisted
console.log(a);      // undefined
a = 10;             // Assignment stays in place
```

---

## Q8: Why should we use const by default in modern JavaScript?

### Short Answer
1. **Safety**: Prevents accidental reassignment
2. **Optimization**: Helps engines optimize code
3. **Readability**: Signals intent clearly
4. **Bug Prevention**: Reduces mutable state bugs

### Production Rule
```
if (value won't change) → const
if (must reassign) → let
never → var
```

---

## Q9: What is the output and why?

```javascript
console.log(foo());
function foo() {
  return "hello";
}
```

### Answer
```
hello
```

### Explanation
Function declarations are fully hoisted - both declaration AND body. So the function is available throughout the entire scope.

---

## Q10: What happens if we try to use a variable before it's declared with let?

### Short Answer
> ReferenceError: Cannot access 'variableName' before initialization

### Example
```javascript
console.log(x); // ❌ ReferenceError
let x = 10;
```

### Why
This is the Temporal Dead Zone (TDZ). The variable is hoisted but cannot be accessed until the declaration line executes.

---

## 🎯 Quick Answer Formula

For any interview question:

1. **Give definition** (in English)
2. **Explain in Bengali** if needed
3. **Show code example**
4. **Give real-world use case**

---

## 🔥 Common Trap Questions to Practice

| Question | Answer |
|----------|--------|
| Output of `var` loop | Same value repeated |
| `const` with object | Properties can change |
| Hoisting with `let` | ReferenceError (TDZ) |
| `var` vs `let` in async | Different outputs |

---

## 📝 Write These Answers in Your Notes

Practice writing these answers by hand 3 times each. The formula:

> Definition → Example → Real-world Use → Why Important

Remember: Interviewers want to see you understand the "WHY", not just memorize the "WHAT".
