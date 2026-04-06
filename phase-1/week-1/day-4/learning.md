# Week 1 — Day 4: this keyword + Bind/Call/Apply + Context Tricks

## 🎯 Today's Goal

আজকের শেষে তুমি বুঝতে পারবে:
- `this` কাকে refer করে বিভিন্ন পরিস্থিতিতে
- `.bind()`, `.call()`, `.apply()` এর পার্থক্য
- Arrow function vs normal function এর `this` পার্থক্য
- Event handlers এ context loss এর সমাধান
- React/Node practical bugs fix করতে পারবে

---

## 🧠 Topic 1: this Explained

### Definition (Interview Answer)
> `this` refers to the current execution context - the object that the code is currently operating on. Its value depends on how a function is called.

### বাংলায় বোঝা
`this` মানে হলো বর্তমান execution context। ধরো তুমি একটা party-তে গেছ। "এই" বললে তোমার কথা বুঝবে না, কিন্তু "এই person" বললে বুঝবে। JavaScript-এ `this` টা exactly তেমন - কোন object-এর সাথে কাজ করছি সেটা indicate করে।

### The 5 Rules of this

| Context | Value of `this` |
|---------|-----------------|
| **Global** | Browser: `window`, Node: `global` |
| **Function call** | `undefined` (strict) or global |
| **Method call** | Object before the dot |
| **Constructor (new)** | Newly created instance |
| **Arrow function** | Lexical `this` (parent scope) |

---

## 🔄 Topic 2: Function vs Method

### Function Call (Default Binding)
```javascript
function sayHi() {
  console.log("this:", this);
}

sayHi(); // window (browser) or global (Node)
// OR undefined in strict mode
```

### Method Call (Implicit Binding)
```javascript
const obj = {
  name: "Nirjhor",
  greet: function() {
    console.log("Hello, I am", this.name);
  }
};

obj.greet(); // "Hello, I am Nirjhor"
// this = obj (the object before the dot)
```

### Key Insight
```javascript
const obj = { name: "Nirjhor", greet: sayHi };
obj.greet(); // this = obj

const another = { name: "Akash", greet: sayHi };
another.greet(); // this = another

// Same function, different this!
```

---

## 🏗️ Topic 3: Constructor this

### Using `new` Keyword
```javascript
function Person(name) {
  console.log("Constructor running...");
  this.name = name; // this = new object
}

const p1 = new Person("Nirjhor");
const p2 = new Person("Akash");

console.log(p1.name); // "Nirjhor"
console.log(p2.name); // "Akash"

p1.name = "Rahim";
console.log(p1.name); // "Rahim"
console.log(p2.name); // "Akash" (separate instances!)
```

### What `new` Does
1. Creates new empty object
2. Sets `this` to that object
3. Executes constructor function
4. Returns the object

---

## ➡️ Topic 4: Arrow Function this

### The Problem
```javascript
const obj = {
  name: "Nirjhor",
  greet: () => {
    console.log("Hello, I am", this.name);
  }
};

obj.greet(); // undefined (or error!)
// Arrow function uses lexical this = global/window!
```

### The Solution
```javascript
// Option 1: Regular function in object
const obj = {
  name: "Nirjhor",
  greet: function() {
    console.log("Hello, I am", this.name);
  }
};

// Option 2: Arrow inside regular function
const obj = {
  name: "Nirjhor",
  greet() {
    const inner = () => {
      console.log("Hello, I am", this.name);
    };
    inner();
  }
};

obj.greet(); // "Hello, I am Nirjhor" ✅
```

### Why Arrow Functions?
```javascript
function Counter() {
  this.count = 0;
  
  setInterval(() => {
    this.count++; // ✅ Arrow keeps this from Counter
    console.log(this.count);
  }, 1000);
}

// With regular function:
// setInterval(function() { this.count++ }, 1000);
// ❌ this would be different!

const c = new Counter();
```

---

## 🔗 Topic 5: Bind / Call / Apply

### 5.1 .call() - Immediate Execution

```javascript
function greet(greeting) {
  console.log(`${greeting}, I am ${this.name}`);
}

const user = { name: "Nirjhor" };

greet.call(user, "Hello");   // "Hello, I am Nirjhor"
greet.call(user, "Hi");      // "Hi, I am Nirjhor"
greet.call(user, "Welcome"); // "Welcome, I am Nirjhor"
```

### 5.2 .apply() - With Array

```javascript
function introduce(age, city) {
  console.log(`I am ${this.name}, ${age} years old, from ${city}`);
}

const user = { name: "Akash" };

introduce.apply(user, [25, "Dhaka"]); // "I am Akash, 25 years old, from Dhaka"

// Same as:
introduce.call(user, 25, "Dhaka");
```

### 5.3 .bind() - Create New Function

```javascript
function greet(greeting) {
  console.log(`${greeting}, I am ${this.name}`);
}

const user = { name: "Nirjhor" };

// Create permanently bound function
const greetNirjhor = greet.bind(user, "Hey");
greetNirjhor(); // "Hey, I am Nirjhor"
greetNirjhor(); // "Hey, I am Nirjhor"
// Same result every time!

// Partial application
const greetAge = greet.bind(user, "Hello");
greetAge(); // "Hello, I am Nirjhor"
```

### Comparison Table

| Method | Purpose | Arguments | Returns |
|--------|---------|-----------|---------|
| `.call()` | Execute immediately | `this, arg1, arg2...` | Function result |
| `.apply()` | Execute with array | `this, [args...]` | Function result |
| `.bind()` | Create new function | `this, arg1, arg2...` | New function |

---

## 💣 Topic 6: Common JS/React Traps

### 6.1 Event Handlers

```javascript
class Button {
  constructor(name) {
    this.name = name;
  }
  
  click() {
    console.log("Clicked:", this.name);
  }
}

const btn = new Button("Save");

// ❌ Problem: setTimeout loses context
setTimeout(btn.click, 100); // "Clicked: undefined"

// ✅ Fix 1: bind
setTimeout(btn.click.bind(btn), 100); // "Clicked: Save"

// ✅ Fix 2: arrow function
setTimeout(() => btn.click(), 100); // "Clicked: Save"

// ✅ Fix 3: arrow in class
class ButtonFixed {
  constructor(name) {
    this.name = name;
  }
  
  click = () => {
    console.log("Clicked:", this.name);
  }
}
```

### 6.2 Array Methods

```javascript
const users = [
  { name: "Akash", age: 25 },
  { name: "Rahim", age: 30 }
];

// ❌ Problem: this loses context
users.forEach(function(user) {
  console.log(user.name, this.age); // this = undefined
});

// ✅ Fix: arrow function
users.forEach((user) => {
  console.log(user.name, this.age); // this = lexical
});
```

### 6.3 Object Methods

```javascript
const obj = {
  name: "Nirjhor",
  
  // Regular function - this = obj
  regular() {
    console.log("regular:", this.name);
  },
  
  // Arrow function - this = global
  arrow: () => {
    console.log("arrow:", this.name);
  }
};

obj.regular(); // "regular: Nirjhor" ✅
obj.arrow();   // "arrow: undefined" ❌
```

---

## 🧪 Practice Tasks

### Task 1: Predict Output
```javascript
console.log(this); // ?
function fn() { console.log(this); }
fn();
```

### Task 2: Predict Output
```javascript
const obj = { name: "A", getName: function() { return this.name; }};
const f = obj.getName;
console.log(f()); // ?
```

### Task 3: Fix with .bind()
```javascript
const obj = { name: "A", getName: function() { return this.name; }};
const f = obj.getName;
console.log(f()); // Should print "A"
```

### Task 4: Class Counter with setTimeout
```javascript
class Counter {
  constructor() {
    this.count = 0;
  }
  
  increment() {
    setTimeout(() => {
      console.log(this.count); // Should print 1
    }, 100);
  }
}

const c = new Counter();
c.increment();
```

---

## 💼 Real-World Use Cases

### 1. React Class Components
```javascript
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    console.log(this.props.name);
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

### 2. Event Listeners
```javascript
document.getElementById('btn').addEventListener('click', function() {
  console.log(this.id); // "btn"
});
```

### 3. Array Methods with Context
```javascript
const mathOps = {
  numbers: [1, 2, 3],
  multiplier: 2,
  
  double() {
    return this.numbers.map(n => n * this.multiplier);
  }
};
```

---

## 🎯 Summary

| Scenario | Value of `this` |
|----------|-----------------|
| `fn()` | `undefined` or global |
| `obj.fn()` | `obj` |
| `new Fn()` | new instance |
| `fn.call(obj)` | `obj` |
| `fn.bind(obj)()` | `obj` |
| Arrow function | Parent's `this` |

### Quick Fixes
```javascript
// Problem: this = undefined/global
setTimeout(obj.method, 100);

// Solutions:
setTimeout(obj.method.bind(obj), 100);
setTimeout(() => obj.method(), 100);
setTimeout(obj.method.bind(obj), 100);
```

---

## 📖 Quick Reference

```
this binding priority (highest to lowest):
1. new (constructor)
2. call/apply/bind (explicit)
3. obj.method (implicit)
4. default (global/undefined)

Arrow functions:
- Don't create their own this
- Use lexical this from parent scope
- Use in: callbacks, setTimeout, class methods
```
