# Week 1 — Day 1: Scope, var/let/const, Hoisting

## 🎯 Quick Overview

আজকের দিনে আমরা শিখব JavaScript-এর সবচেয়ে fundamental concepts — যা ছাড়া advanced topics বোঝা অসম্ভব।

## 📋 Topics Covered

| Topic | Key Point |
|-------|-----------|
| **Scope** | Variable কোথায় accessible |
| **var vs let vs const** | Block vs function scoped |
| **Hoisting** | Declaration move to top |
| **TDZ** | Temporal Dead Zone |

## ⚡ Must Remember

```javascript
// Rule 1: Default use const
const API_URL = "https://api.com";

// Rule 2: Use let only when reassigning
let count = 0;
count = count + 1;

// Rule 3: Never use var
// var causes bugs in loops!

// Rule 4: var loop trap
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 ❌

// Fix: use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✅
```

## 🔑 Key Differences

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Reassign | ✅ | ✅ | ❌ |

## 📚 What to Read

1. **learning.md** — Full explanation
2. **interview-qa.md** — Interview questions
3. **resources.md** — Free videos & articles

## ✅ Today's Tasks

- [ ] Solve 5 practice tasks
- [ ] Write interview answers 3 times
- [ ] Create scope-playground.js with 10 examples
- [ ] Push to GitHub

## ⏭️ Next: Day 2

**Execution Context + Call Stack + Memory Creation Phase**

---

*Quick reference - যদি কোনো topic quickly review করতে চাও, এই file টাই দেখো।*
