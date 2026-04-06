// Common Context Traps - Real-world problems and fixes

console.log("=== CONTEXT TRAPS ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. setTimeout loses context
// ─────────────────────────────────────────────────────────────────────────
console.log("1. setTimeout context loss:");

class Button {
  constructor(name) {
    this.name = name;
  }
  
  click() {
    console.log("   Button clicked:", this.name);
  }
}

const btn = new Button("Save");

// ❌ Problem: Context lost
setTimeout(btn.click, 50);

// ✅ Fix 1: .bind()
setTimeout(btn.click.bind(btn), 100);

// ✅ Fix 2: Arrow wrapper
setTimeout(() => btn.click(), 150);

// ─────────────────────────────────────────────────────────────────────────
// 2. Array method callbacks
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Array method callbacks:");

const users = [
  { name: "Nirjhor", score: 80 },
  { name: "Akash", score: 90 }
];

const obj = { title: "Winner" };

// ❌ Problem: this is undefined
try {
  users.filter(function(user) {
    return user.score > this.score;
  });
} catch (e) {
  console.log("   Error: this is undefined");
}

// ✅ Fix: Arrow function
const result = users.filter((user) => user.score > 85);
console.log("   filter > 85:", result.map(u => u.name));

// ─────────────────────────────────────────────────────────────────────────
// 3. Method extraction loses context
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Method extraction:");

const person = {
  name: "Rahim",
  getName() {
    return this.name;
  }
};

const getName = person.getName;
console.log("   Extracted:", getName()); // undefined!

// ✅ Fix: Bind
const boundGetName = person.getName.bind(person);
console.log("   Bound:", boundGetName());

// ─────────────────────────────────────────────────────────────────────────
// 4. Event listeners
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Event listener pattern:");

const element = {
  id: "btn-submit",
  // Simulating addEventListener
  addListener(callback) {
    // In real DOM: element.addEventListener('click', callback)
    // callback() loses 'this' here
    callback.call(this); // This simulates what happens without bind
  }
};

const handlerObj = {
  id: "btn-submit",
  handleClick() {
    console.log("   Clicked:", this.id);
  }
};

// Without bind - loses context
element.addListener(handlerObj.handleClick);

// With bind - preserves context
element.addListener(handlerObj.handleClick.bind(handlerObj));

// ─────────────────────────────────────────────────────────────────────────
// 5. Chained methods
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Chained method calls:");

const calculator = {
  value: 0,
  
  add(n) {
    this.value += n;
    return this; // Return this for chaining
  },
  
  subtract(n) {
    this.value -= n;
    return this;
  },
  
  multiply(n) {
    this.value *= n;
    return this;
  },
  
  getValue() {
    return this.value;
  }
};

// Chain methods
const result = calculator
  .add(10)
  .subtract(3)
  .multiply(2)
  .getValue();

console.log("   Chained result:", result); // (10-3)*2 = 14

// ─────────────────────────────────────────────────────────────────────────
// 6. Class methods in React style
// ─────────────────────────────────────────────────────────────────────────
console.log("\n6. Class method pattern:");

class ReactButton {
  constructor(text) {
    this.text = text;
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    console.log("   Clicked:", this.text);
  }
  
  render() {
    return `<button>${this.text}</button>`;
  }
}

const reactBtn = new ReactButton("Submit");
const handler = reactBtn.handleClick;
handler(); // Works! Because we bound in constructor

console.log("\n✅ Context traps complete");
