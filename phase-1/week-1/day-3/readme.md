# Week 1 — Day 3: Closures + Lexical Scope + Advanced Function Patterns

## 🎯 Quick Overview

আজকের দিনে আমরা শিখব JavaScript-এর সবচেয়ে powerful concepts — closures। এটা বুঝলে React, Node, async সব easy হয়ে যাবে।

## 📋 Topics Covered

| Topic | Key Point |
|-------|-----------|
| **Lexical Scope** | Scope determined by declaration location |
| **Closure** | Function remembers parent scope |
| **Private Variables** | Data encapsulation |
| **Module Pattern** | IIFE + closure |
| **Currying** | Transform multi-arg functions |
| **Loop Bug Fix** | var vs let in async |

## ⚡ Must Remember

```javascript
// Closure = Function + Lexical Environment
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3

// Loop Bug Fix:
// ❌ for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }
//    Output: 3, 3, 3

// ✅ for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }
//    Output: 0, 1, 2
```

## 📚 What to Read

1. **learning.md** — Full explanation
2. **interview-qa.md** — Interview questions
3. **resources.md** — Free videos & articles

## ✅ Today's Tasks

- [ ] Solve 4 practice tasks
- [ ] Create closures-playground.js with examples
- [ ] Understand loop closure bug
- [ ] Push to GitHub

## ⏭️ Next: Day 4

**[this keyword + Bind/Call/Apply + Context Tricks](../day-4/readme.md)**

---

*Quick reference - যদি কোনো topic quickly review করতে চাও, এই file টাই দেখো।*
