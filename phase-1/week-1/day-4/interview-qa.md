# Interview Q&A — Week 1 Day 4

## this keyword + Bind/Call/Apply + Context Tricks

---

## Q1: What is `this` in JavaScript?

### Short Answer
> `this` refers to the current execution context - the object that the code is currently operating on. Its value depends on how a function is called.

### Detailed Answer
`this` is a special keyword that refers to the current context. The value is determined by how the function is called:

1. **Global context**: `window` (browser) or `global` (Node.js)
2. **Function call**: `undefined` (strict) or global
3. **Method call**: The object before the dot
4. **Constructor**: The newly created instance
5. **Arrow function**: Lexical `this` from parent scope

### Real-life Example
Think of `this` like saying "me" in a conversation:
- At home: "I'm Nirjhor's son"
- At office: "I'm Employee #123"
- The person is the same, but the context changes who "me" refers to.

---

## Q2: Explain the 5 rules of `this`.

### Short Answer
> 1. Global: window/global, 2. Function: undefined/global, 3. Method: object, 4. Constructor: new instance, 5. Arrow: lexical parent

### Table Form

| Rule | How Called | Value of `this` |
|------|------------|-----------------|
| **Global** | Direct execution | `window` (browser) / `global` (Node) |
| **Implicit** | `obj.method()` | `obj` |
| **Explicit** | `.call()`, `.apply()`, `.bind()` | Specified object |
| **New** | `new Constructor()` | New instance |
| **Arrow** | Arrow function | Parent's `this` |

---

## Q3: What is the difference between `.call()`, `.apply()`, and `.bind()`?

### Short Answer
> `.call()` executes immediately with arguments, `.apply()` is similar but takes array, `.bind()` creates a new function with bound context.

### Code Examples
```javascript
function greet(greeting, name) {
  console.log(`${greeting}, ${name}! I am ${this.role}`);
}

const user = { role: "Admin" };

// .call() - immediate execution, individual args
greet.call(user, "Hello", "Nirjhor"); // "Hello, Nirjhor! I am Admin"

// .apply() - immediate execution, array args
greet.apply(user, ["Hi", "Akash"]); // "Hi, Akash! I am Admin"

// .bind() - create new function, no execution
const adminGreet = greet.bind(user, "Hey");
adminGreet("Rahim"); // "Hey, Rahim! I am Admin"
```

### When to Use Each
- **.call()**: When you need to call immediately with different args
- **.apply()**: When you have args in an array
- **.bind()**: When passing callback that needs specific `this`

---

## Q4: What is the output and why?

```javascript
const obj = {
  name: "Nirjhor",
  getName: function() {
    return this.name;
  }
};

const fn = obj.getName;
console.log(fn());
```

### Answer
```
undefined
```

### Explanation
- `fn` is assigned the function value (not the method)
- When called as `fn()`, it's a function call, not method call
- `this` becomes undefined (strict) or global
- `this.name` is undefined

### Fix
```javascript
const fn = obj.getName.bind(obj); // Bind context
console.log(fn()); // "Nirjhor"
```

---

## Q5: How does arrow function's `this` work?

### Short Answer
> Arrow functions don't create their own `this`. They use the `this` from their lexical (parent) scope - where they were defined, not where they're called.

### Code Example
```javascript
const obj = {
  name: "Nirjhor",
  
  // Regular function - creates its own this
  regular: function() {
    console.log("regular:", this.name);
  },
  
  // Arrow function - uses lexical this
  arrow: () => {
    console.log("arrow:", this.name);
  }
};

obj.regular(); // "regular: Nirjhor" ✅
obj.arrow();   // "arrow: undefined" ❌
```

### Why Use Arrow in Classes?
```javascript
class Button {
  constructor() {
    this.text = "Click";
  }
  
  // Regular function - loses this in callbacks
  click() {
    setTimeout(function() {
      console.log(this.text); // undefined!
    }, 100);
  }
  
  // Arrow function - preserves this
  clickArrow() {
    setTimeout(() => {
      console.log(this.text); // "Click"
    }, 100);
  }
}
```

---

## Q6: What is the output?

```javascript
function Person(name) {
  this.name = name;
}

const p1 = new Person("Nirjhor");
const p2 = new Person("Akash");

p1.name = "Rahim";
console.log(p1.name, p2.name);
```

### Answer
```
Rahim Akash
```

### Explanation
- `new Person("Nirjhor")` creates object with `this = new object`
- `this.name = name` sets property on that object
- `p1` and `p2` are SEPARATE instances
- Changing `p1.name` doesn't affect `p2.name`

---

## Q7: How would you fix the event handler context problem?

### Problem
```javascript
class Button {
  constructor(name) {
    this.name = name;
  }
  
  click() {
    console.log(this.name);
  }
}

const btn = new Button("Save");
setTimeout(btn.click, 100); // undefined!
```

### Solutions

**Solution 1: .bind()**
```javascript
setTimeout(btn.click.bind(btn), 100); // "Save"
```

**Solution 2: Arrow function wrapper**
```javascript
setTimeout(() => btn.click(), 100); // "Save"
```

**Solution 3: Class property arrow function**
```javascript
class Button {
  constructor(name) {
    this.name = name;
  }
  
  click = () => {
    console.log(this.name);
  }
}
```

**Solution 4: Arrow in constructor**
```javascript
class Button {
  constructor(name) {
    this.name = name;
    this.click = this.click.bind(this);
  }
  
  click() {
    console.log(this.name);
  }
}
```

---

## Q8: What is explicit binding?

### Short Answer
> Explicit binding is when you explicitly specify what `this` should be using `.call()`, `.apply()`, or `.bind()` methods.

### Example
```javascript
const user = { name: "Nirjhor", role: "Admin" };

function introduce(city) {
  console.log(`I am ${this.name}, ${this.role} from ${city}`);
}

// All explicit binding methods:
introduce.call(user, "Dhaka");      // I am Nirjhor, Admin from Dhaka
introduce.apply(user, ["Dhaka"]);    // I am Nirjhor, Admin from Dhaka

const boundFn = introduce.bind(user, "Dhaka");
boundFn();                           // I am Nirjhor, Admin from Dhaka
```

---

## Q9: Predict the output:

```javascript
const user = {
  name: "Nirjhor",
  greet() {
    console.log(this.name);
  }
};

setTimeout(user.greet, 100);
```

### Answer
```
undefined
```

### Explanation
- `setTimeout` receives the function `user.greet`
- When it executes, it's called as a function, not a method
- `this` is not `user`, it's the global object
- `global.name` is undefined

### Fix
```javascript
setTimeout(user.greet.bind(user), 100); // "Nirjhor"
setTimeout(() => user.greet(), 100);     // "Nirjhor"
```

---

## Q10: How does `new` keyword affect `this`?

### Short Answer
> When using `new`, JavaScript creates a new object, sets `this` to that object, executes the constructor, and returns the object.

### Step by Step
```javascript
function Person(name) {
  this.name = name;
}

// When you do: new Person("Nirjhor")

// Step 1: Create new empty object
// Step 2: Set [[Prototype]] to Person.prototype
// Step 3: Bind this to the new object
// Step 4: Execute constructor (this.name = "Nirjhor")
// Step 5: Return the object

const p = new Person("Nirjhor");
console.log(p.name); // "Nirjhor"
```

---

## 🎯 Quick Answer Formula

For any interview question:

1. **Give definition** (in English)
2. **Show code example**
3. **Explain output**
4. **Give fix if bug**

---

## 🔥 Common Trap Questions

| Question | Key Point |
|----------|-----------|
| `fn()` vs `obj.fn()` | Different `this` binding |
| Arrow in object | Lexical vs own this |
| setTimeout with method | Context loss |
| .bind() vs .call() | New function vs execute |

---

## 📝 Remember This

```
this binding order (highest to lowest):
1. new Constructor()
2. .bind() / .call() / .apply()
3. obj.method()
4. function() (default: undefined/global)
5. Arrow function (lexical this)
```
