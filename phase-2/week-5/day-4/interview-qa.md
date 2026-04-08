# useState() + Re-rendering + Stale Updates - Interview Q&A

## Q1: Why doesn't a normal variable update the UI in React?

**Answer:**

React শুধু **state change** detect করলে re-render করে। Normal JavaScript variable change track করে না।

```jsx
function Counter() {
  let count = 0;  // ❌ This is just a local variable

  function increment() {
    count++;  // Variable changes, but React doesn't know!
  }

  return <button onClick={increment}>{count}</button>;
}
```

**Why React needs state:**
- React এর virtual DOM compare করার জন্য জানতে হবে কখন UI update দরকার
- Normal variables change হলে React জানে না
- State variables change হলে React re-render trigger করে

---

## Q2: What does useState() return?

**Answer:**

useState() দুইটা value return করে array destructuring এ:

```jsx
const [count, setCount] = useState(0);
```

| Item | Description |
|------|-------------|
| `count` | Current state value |
| `setCount` | Function to update state |
| `0` | Initial state value |

**Internally:** useState returns an array with exactly two elements:
1. Current state (initialized with the argument)
2. Setter function that triggers re-render

---

## Q3: What is the re-rendering process in React?

**Answer:**

```
1. State changes (setCount called)
       ↓
2. React detects state change
       ↓
3. React schedules re-render
       ↓
4. Component function runs again
       ↓
5. New JSX returned with updated values
       ↓
6. React compares old vs new virtual DOM
       ↓
7. Only changed parts update in real DOM
```

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  //          ↑
  //    First render: count = 0

  function handleClick() {
    setCount(count + 1);
    // Triggers re-render → count = 1
  }

  return <button onClick={handleClick}>{count}</button>;
  // Updated UI shows count = 1
}
```

---

## Q4: What is stale state / stale closure in React?

**Answer:**

**Stale state** হয় যখন state update এ outdated value ব্যবহার হয়:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function incrementTwice() {
    setCount(count + 1);  // uses count = 0
    setCount(count + 1);  // also uses count = 0!
  }

  return <button onClick={incrementTwice}>{count}</button>;
  // Output: 1 (not 2!) 😮
}
```

**Why it happens:**
- JavaScript closure captures the value at render time
- Both updates use the same stale value from first render
- React may batch these updates

---

## Q5: How do you fix stale state updates?

**Answer:**

**Functional update pattern** ব্যবহার করতে হবে:

```jsx
function FixedCounter() {
  const [count, setCount] = useState(0);

  function incrementTwice() {
    setCount(prev => prev + 1);  // prev = latest value
    setCount(prev => prev + 1);  // prev = updated value
  }

  return <button onClick={incrementTwice}>{count}</button>;
  // Output: 2 ✓
}
```

**Why it works:**
- `prev` parameter হলো React এর সবচেয়ে recent state
- প্রতিটি call আগের updated value পায়
- No stale closure problem

---

## Q6: When should you use functional updates?

**Answer:**

**Always use functional updates when:**
1. Multiple state updates in same function
2. Update depends on previous value
3. Complex calculations with current state

```jsx
// ✅ Good cases for functional updates
function Counter() {
  const [count, setCount] = useState(0);

  // Case 1: Multiple updates
  function incrementBy3() {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  // Case 2: Depends on previous value
  function increment() {
    setCount(prev => prev + 1);
  }

  // Case 3: Complex calculation
  function addTen() {
    setCount(prev => prev + 10);
  }
}
```

---

## Q7: How do you update object state in React?

**Answer:**

**Important:** Always use spread operator to preserve other properties:

```jsx
const [user, setUser] = useState({
  name: "Nirjhor",
  age: 22,
  email: "nirjhor@example.com"
});

function updateAge() {
  setUser({
    ...user,           // Copy all existing properties
    age: user.age + 1  // Update only age
  });
}

// Wrong approach - loses other properties:
// setUser({ age: user.age + 1 })
// Result: { age: 23 } - name and email gone!
```

**Key rule:**
```jsx
setUser({
  ...user,  // Spread to preserve
  updates   // Add new/updated fields
})
```

---

## Q8: What is the difference between setState and direct assignment?

**Answer:**

```jsx
// ❌ WRONG - Direct assignment
function Wrong() {
  const [count, setCount] = useState(0);
  
  function increment() {
    count = count + 1;  // This doesn't trigger re-render!
  }
}

// ✅ CORRECT - Using setter
function Correct() {
  const [count, setCount] = useState(0);
  
  function increment() {
    setCount(count + 1);  // This triggers re-render
  }
}
```

**Why it matters:**
- Direct assignment (`count = 5`) just changes local variable
- Setter function (`setCount(5)`) tells React to re-render
- Without setter, UI never updates!

---

## Q9: Is useState synchronous or asynchronous?

**Answer:**

**State updates are asynchronous** but appear synchronous in most cases.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);  // Still shows old value! 😮
    // But UI will show new value after render
  }
}
```

**Why async?**
- React batches multiple updates for performance
- Updates are scheduled, not immediate
- Next render shows updated value

```jsx
function Demo() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(1);
    setCount(2);
    setCount(3);
    // Final will be 3, not 1→2→3
    // React batches to single render
  }
}
```

---

## Q10: How does closure relate to stale state in React?

**Answer:**

**Closures** cause stale state when event handlers capture old state values.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    // This function is a closure over 'count' from render time
    setCount(count + 1);
    // If called quickly, uses stale value
  }
}
```

**The closure problem:**
- Event handler is created during render (captures current count)
- When clicked later, it uses that captured value
- If state changed since, you get stale value

**Solution - Functional update:**
```jsx
function increment() {
  setCount(prev => prev + 1);  // No closure over state!
  // React provides latest value via 'prev' parameter
}
```

---

## Q11: Can you have multiple useState calls in one component?

**Answer:**

**Yes!** Multiple independent state variables is a common pattern:

```jsx
function UserDashboard() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "Nirjhor" });
  const [isActive, setIsActive] = useState(false);
  const [items, setItems] = useState([]);

  // Each is independent - change one doesn't affect others
  function handleAction() {
    setCount(c => c + 1);
    setIsActive(!isActive);
  }

  return <div>{/* use all states */}</div>;
}
```

**Why separate states?**
- Better organization and readability
- Each state can update independently
- Easier to debug

---

## Q12: What is the initial value of useState?

**Answer:**

The argument passed to useState is only used for the **first render**:

```jsx
function Demo() {
  const [count, setCount] = useState(0);  // 0 used only first time

  function reset() {
    setCount(0);  // Manual reset to initial value
  }

  function change() {
    setCount(5);  // Any value can be set
  }

  return <div>{count}</div>;
}
```

**Important:** Initial value is only read once, not on every render!

```jsx
function Counter() {
  const [count, setCount] = useState(Math.random() * 100);
  // Random value only used FIRST render!
  // Subsequent renders use stored state value
  
  function reset() {
    setCount(Math.random() * 100);  // Set new random if needed
  }
}
```

---

## Q13: What happens if you don't pass an initial value to useState?

**Answer:**

State will be `undefined` initially:

```jsx
function Demo() {
  const [value, setValue] = useState();
  
  console.log(value);  // undefined initially
  
  return <div>{value ?? 'No value'}</div>;
}
```

**Common pattern for optional initial:**

```jsx
const [user, setUser] = useState(null);
// Use null when initial state might be empty
```

---

## Q14: How do you reset state to initial value?

**Answer:**

Simply call setState with the initial value:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function reset() {
    setCount(0);  // Reset to initial value
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

## Q15: What are common useState interview questions?

**Answer:**

1. **What is the difference between state and props?**
   - Props: passed from parent, read-only
   - State: internal to component, mutable

2. **Why can't we modify state directly?**
   - Won't trigger re-render
   - React's state management won't work

3. **When does a component re-render?**
   - State changes
   - Props changes
   - Parent re-renders

4. **How do you optimize useState performance?**
   - Use functional updates for dependent updates
   - Split state if only some values change often
   - Use useMemo for derived values

---

## Quick Revision

1. **Normal variable** → No UI update
2. **useState** → Triggers UI update
3. **Stale state** → Using old value in updates
4. **Functional update** → `prev => newValue` fixes stale
5. **Object state** → Use spread operator `...obj`
6. **Multiple states** → Separate useState calls
7. **Async updates** → Batch for performance

---

## Preparation Tips

- Practice writing useState in different scenarios
- Understand when stale state happens
- Be ready to explain re-rendering flow
- Know the difference between direct assignment and setter
- Understand closure relationship with state