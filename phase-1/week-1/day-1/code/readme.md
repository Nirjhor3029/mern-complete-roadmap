# Code Run Guide — Week 1 Day 1

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
cd <your-downloaded-path>/phase-1/week-1/day-1/code

# Or navigate to code folder and run:
node 1-scope/global-scope.js
node 2-variables/var-example.js
```

### Run All Files in a Folder
```bash
# Linux/Mac
for file in 1-scope/*.js; do node "$file"; done

# Windows (CMD)
for %f in (1-scope\*.js) do node "%f"

# Windows (PowerShell)
Get-ChildItem 1-scope/*.js | ForEach-Object { node $_.FullName }
```

---

## 🌐 Method 2: Browser Console

### Quick Test
1. Chrome/Firefox খুলো
2. Press `F12` → Developer Tools
3. Click `Console` tab
4. Paste code এবং Enter

### Example
```javascript
// Browser console-এ paste করো:
const appName = "MERN Journey";
console.log(appName);
```

---

## 📂 Folder Structure

```
code/
├── index.js                    # Main index (overview)
│
├── 1-scope/                    # Scope examples
│   ├── global-scope.js
│   ├── function-scope.js
│   └── block-scope.js
│
├── 2-variables/               # var/let/const examples
│   ├── var-example.js
│   ├── let-example.js
│   └── const-example.js
│
├── 3-hoisting/                 # Hoisting examples
│   ├── var-hoisting.js
│   ├── function-hoisting.js
│   └── tdz-example.js
│
└── 4-interview-trap/            # Interview trap (loop bug)
    ├── loop-bug-var.js
    └── loop-fix-let.js
```

---

## 📋 Run Order (Suggested)

### Part 1: Scope
```bash
node 1-scope/global-scope.js
node 1-scope/function-scope.js
node 1-scope/block-scope.js
```

### Part 2: Variables
```bash
node 2-variables/var-example.js
node 2-variables/let-example.js
node 2-variables/const-example.js
```

### Part 3: Hoisting
```bash
node 3-hoisting/var-hoisting.js
node 3-hoisting/function-hoisting.js
node 3-hoisting/tdz-example.js
```

### Part 4: Interview Trap
```bash
node 4-interview-trap/loop-bug-var.js
node 4-interview-trap/loop-fix-let.js
```

---

## ⚡ Quick Commands Reference

| Command | Description |
|---------|-------------|
| `node <filename>.js` | Run single file |
| `node .` | Run index.js (if exists) |
| `node --version` | Check Node.js version |
| `npm init -y` | Initialize Node.js project |

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

### global-scope.js
```
Inside function: MERN Journey
From another function: MERN Journey
Outside function: MERN Journey
✅ Global scope example complete
```

### loop-bug-var.js
```
=== LOOP BUG WITH VAR ===
Wait for setTimeout...
var i: 3
var i: 3
var i: 3
✅ Loop bug with var example complete
```

### loop-fix-let.js
```
=== SOLUTION 1: Use let ===
Wait for setTimeout...
let i: 0
let i: 1
let i: 2
✅ All loop fixes complete
```

---

## ❓ Troubleshooting

### "node is not recognized"
→ Install Node.js from https://nodejs.org

### "Cannot find module"
→ Make sure you're in correct directory

### "setTimeout shows same value"
→ Expected! That's the bug we're demonstrating

---

## 📖 Next Steps

After running all files:
1. Understand each output
2. Modify code to test different scenarios
3. Create your own examples
4. Move to Day 2 learning

---

*Happy Coding! 🚀*
