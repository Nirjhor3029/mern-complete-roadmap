# Week 1 — Day 4: this keyword + Bind/Call/Apply + Context Tricks

## 🎯 Quick Overview

আজকের দিনে আমরা শিখব JavaScript-এর সবচেয়ে confusing concept - `this`। এটা বুঝলে React, Node, OOP সব easy হয়ে যাবে।

## 📋 Topics Covered

| Topic | Key Point |
|-------|-----------|
| **this** | Current execution context |
| **Function vs Method** | Different binding |
| **Constructor** | new creates instance |
| **Arrow this** | Lexical this |
| **Bind/Call/Apply** | Explicit context control |
| **Context traps** | Event handlers, setTimeout |

## ⚡ Must Remember

```javascript
// The 5 rules of this:
1. Global: window/global
2. fn(): undefined (strict) or global
3. obj.method(): obj
4. new Constructor(): new instance
5. Arrow function: lexical parent this

// Context fixing:
setTimeout(btn.click, 100);               // ❌ undefined
setTimeout(btn.click.bind(btn), 100);     // ✅ Save
setTimeout(() => btn.click(), 100);       // ✅ Save
```

## 📚 What to Read

1. **learning.md** — Full explanation
2. **interview-qa.md** — Interview questions
3. **resources.md** — Free videos & articles

## ✅ Today's Tasks

- [ ] Solve 4 practice tasks
- [ ] Create this-bind-playground.js
- [ ] Understand all 5 this rules
- [ ] Push to GitHub

## ⏭️ Next: Day 5

**[Prototypes + Prototype Chain + Inheritance](../day-5/readme.md)**

---

*Quick reference - যদি কোনো topic quickly review করতে চাও, এই file টাই দেখো।*
