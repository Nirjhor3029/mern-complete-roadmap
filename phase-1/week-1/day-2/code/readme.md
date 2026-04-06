# Code Run Guide — Week 1 Day 2

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
cd <your-downloaded-path>/phase-1/week-1/day-2/code

# Run a single file
node 1-execution-context/global-context.js
node 2-phases/memory-vs-execution.js
node 3-call-stack/stack-basics.js
```

---

## 🌐 Method 2: Browser Console

### Quick Test
1. Chrome/Firefox খুলো
2. Press `F12` → Developer Tools
3. Click `Console` tab
4. Paste code এবং Enter

---

## 📂 Folder Structure

```
code/
├── index.js                    # Main index (overview)
│
├── 1-execution-context/        # Execution Context examples
│   └── global-context.js
│
├── 2-phases/                  # Memory vs Execution Phase
│   └── memory-vs-execution.js
│
├── 3-call-stack/              # Call Stack basics
│   └── stack-basics.js
│
├── 4-memory-allocation/       # Memory structure
│   └── memory-structure.js
│
└── 5-interview-traps/         # Common interview questions
    └── traps.js
```

---

## 📋 Run Order (Suggested)

### Part 1: Execution Context
```bash
node 1-execution-context/global-context.js
```

### Part 2: Two Phases
```bash
node 2-phases/memory-vs-execution.js
```

### Part 3: Call Stack
```bash
node 3-call-stack/stack-basics.js
```

### Part 4: Memory Allocation
```bash
node 4-memory-allocation/memory-structure.js
```

### Part 5: Interview Traps
```bash
node 5-interview-traps/traps.js
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

### global-context.js
```
=== EXECUTION CONTEXT EXAMPLES ===

1. GEC created - globalVar: I'm global
Inside greet function: I'm global

2. FEC - inside createUser: Name: Nirjhor, Age: 25

3a. Outer function starts
3b. Inner function - deeply nested
3c. Outer function ends

4. Add: 30
4. Multiply: 200

✅ Execution Context examples complete
```

### traps.js
```
=== INTERVAL TRAP QUESTIONS ===

Q1: myFunc() = 10
Q2: (would be TypeError if uncommented)

undefined

number

   alpha: Hello

   var i: 3
   var i: 3
   var i: 3

(Expected: 3, 3, 3 - the var bug!)
   This is why we use let in loops

✅ Interview trap examples complete
```

---

## ❓ Troubleshooting

### "node is not recognized"
→ Install Node.js from https://nodejs.org

### "Cannot find module"
→ Make sure you're in correct directory

### "setTimeout shows same value"
→ Expected! That's the bug we're demonstrating (review Day 1)

---

*Happy Coding! 🚀*
