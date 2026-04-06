# Code Run Guide — Week 1 Day 4

এই guide তোমার জন্য যে কিভাবে এই code files run করবে।

---

## 🚀 Run with Node.js

```bash
cd <your-downloaded-path>/phase-1/week-1/day-4/code

node 1-this-basics/this-rules.js
node 2-arrow-this/arrow-this.js
node 3-bind-call-apply/bind-call-apply.js
node 4-context-traps/traps.js
```

---

## 📂 Folder Structure

```
code/
├── index.js
├── 1-this-basics/this-rules.js
├── 2-arrow-this/arrow-this.js
├── 3-bind-call-apply/bind-call-apply.js
└── 4-context-traps/traps.js
```

---

## ⚡ Quick Reference

```
this binding rules:
1. Global → window/global
2. fn() → undefined/global
3. obj.method() → obj
4. new Constructor() → instance
5. Arrow → lexical parent

Fix context loss:
• btn.click.bind(btn)
• () => btn.click()
• Arrow in setTimeout/callbacks
```

---

*Happy Coding! 🚀*
