// Arrow Function this - Lexical this vs Dynamic this

console.log("=== ARROW FUNCTION THIS ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Arrow doesn't create its own this
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Arrow function this:");

const obj = {
  name: "Nirjhor",
  
  // Arrow - uses lexical this (global/outer)
  arrowGreet: () => {
    console.log("   Arrow:", this.name);
  },
  
  // Regular - uses dynamic this (obj)
  regularGreet: function() {
    console.log("   Regular:", this.name);
  }
};

obj.regularGreet(); // "Regular: Nirjhor" ✅
obj.arrowGreet();   // "Arrow: undefined" ❌

// ─────────────────────────────────────────────────────────────────────────
// 2. Arrow in object method
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Arrow inside method:");

const person = {
  name: "Akash",
  
  // Regular function as method
  greet() {
    // Arrow function inside - uses parent's this
    const innerArrow = () => {
      console.log("   Hello,", this.name);
    };
    innerArrow();
    
    // Regular function inside - creates its own this
    const innerRegular = function() {
      console.log("   (regular this):", this.name);
    };
    innerRegular();
  }
};

person.greet();

// ─────────────────────────────────────────────────────────────────────────
// 3. Arrow in class/setTimeout
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Arrow in callbacks:");

function Counter() {
  this.count = 0;
  
  // Arrow preserves this from constructor
  setTimeout(() => {
    this.count++;
    console.log("   Arrow count:", this.count);
  }, 50);
  
  // Regular would lose this
  setTimeout(function() {
    console.log("   Regular this:", this); // undefined or global
  }, 50);
}

const c = new Counter();

setTimeout(() => {
  console.log("\n✅ Arrow function this complete");
}, 100);
