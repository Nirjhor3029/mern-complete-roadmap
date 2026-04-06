# Code Run Guide — Week 1 Day 3

এই guide তোমার জন্য যে কিভাবে এই code files run করবে।

---

## 🚀 Method 1: Node.js (Recommended)

### Install Node.js
```bash
# Check if Node.js installed
node --version

# If not, download from: https://nodejs.org
```

### Run Single File
```bash
# Terminal/Command Prompt খুলো
cd <your-downloaded-path>/phase-1/week-1/day-3/code

# Run a single file
node 1-lexical-scope/scope.js
node 2-closures-basics/closure-basics.js
node 3-practical-patterns/private-variables.js
```

---

## 📂 Folder Structure

```
code/
├── index.js                    # Main index (overview)
│
├── 1-lexical-scope/           # Lexical scope examples
│   └── scope.js
│
├── 2-closures-basics/         # Closure fundamentals
│   └── closure-basics.js
│
├── 3-practical-patterns/     # Practical patterns
│   └── private-variables.js
│
├── 4-advanced-patterns/       # Advanced patterns
│   └── currying.js
│
└── 5-loop-bug/               # Loop closure bug
    └── loop-closure-bug.js
```

---

## 📋 Run Order (Suggested)

### Part 1: Lexical Scope
```bash
node 1-lexical-scope/scope.js
```

### Part 2: Closures Basics
```bash
node 2-closures-basics/closure-basics.js
```

### Part 3: Practical Patterns
```bash
node 3-practical-patterns/private-variables.js
```

### Part 4: Advanced Patterns
```bash
node 4-advanced-patterns/currying.js
```

### Part 5: Loop Bug (IMPORTANT!)
```bash
node 5-loop-bug/loop-closure-bug.js
```

---

## 🔧 VS Code Tips

### Run from VS Code
1. Open folder in VS Code
2. Right-click any `.js` file
3. Select "Run Code" (or press `F5`)

### Use Terminal in VS Code
1. Press `` Ctrl + ` ``
2. Type `node filename.js`

---

## 🎯 Expected Output Examples

### scope.js
```
=== LEXICAL SCOPE EXAMPLES ===

1. Basic lexical scope:
   inner sees: I'm outer

2. Written location matters:
   x = 10
   Before: original
   After: changed

...
✅ Lexical scope examples complete
```

### loop-closure-bug.js
```
=== LOOP CLOSURE BUG ===

   var i: 3
   var i: 3
   var i: 3

   Expected: 3, 3, 3 ❌
   Reason: All callbacks share same 'i' variable

   let j: 0
   let j: 1
   let j: 2

   Expected: 0, 1, 2 ✅
...
```

---

## ❓ Troubleshooting

### "node is not recognized"
→ Install Node.js from https://nodejs.org

### "setTimeout shows same value"
→ Expected! That's the bug we're demonstrating - THIS IS WHAT YOU NEED TO FIX IN YOUR CODE!

### Loop bug shows 3, 3, 3
→ This is WRONG - use `let` or IIFE to fix

---

*Happy Coding! 🚀*
