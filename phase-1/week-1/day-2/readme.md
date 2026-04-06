# Week 1 — Day 2: Execution Context + Call Stack + Memory Phase

## 🎯 Quick Overview

আজকের দিনে আমরা শিখব JavaScript কীভাবে code execute করে - এটা বুঝলে senior engineer হওয়া সহজ।

## 📋 Topics Covered

| Topic | Key Point |
|-------|-----------|
| **Execution Context** | Environment where code runs |
| **Memory Creation Phase** | Hoisting happens here |
| **Code Execution Phase** | Line by line execution |
| **Call Stack** | LIFO function tracking |

## ⚡ Must Remember

```javascript
// Two Phases:
1. Memory Creation Phase:
   - var → undefined
   - let/const → TDZ
   - functions → fully hoisted

2. Code Execution Phase:
   - Line by line execution
   - Assignments happen here

// Call Stack:
function first() {
  second();
  console.log("first");
}
function second() {
  console.log("second");
}
first();

// Stack: first() → second() → pop → pop
// Output: second, first
```

## 🔑 Key Differences

| Phase | What Happens |
|-------|--------------|
| **Memory Phase** | Hoisting, allocate memory |
| **Execution Phase** | Run code, function calls |

## 📚 What to Read

1. **learning.md** — Full explanation
2. **interview-qa.md** — Interview questions
3. **resources.md** — Free videos & articles

## ✅ Today's Tasks

- [ ] Solve 5 practice tasks
- [ ] Create execution-playground.js with 10 examples
- [ ] Draw call stack diagrams
- [ ] Push to GitHub

## ⏭️ Next: Day 3

**Closures + Lexical Scope + Advanced function patterns**

---

*Quick reference - যদি কোনো topic quickly review করতে চাও, এই file টাই দেখো।*
