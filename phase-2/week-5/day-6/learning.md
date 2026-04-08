# Lifting State Up + Parent/Child Data Flow + Reusable Components

## Overview

আজকের দিনে আমরা React এর সবচেয়ে important architecture concept নিয়ে আলোচনা করবো - "lifting state up"। এটা জানা না থাকলে component architecture design করা impossible। Senior React interviews-এ এই question সবচেয়ে common: "Where should state live?"

---

## 1. The Problem - Duplicated State

### Defining (English)

When multiple components need access to the same data, keeping that data in separate state within each component causes synchronization problems. The data becomes inconsistent because each component maintains its own copy.

### Explanation (Bengali)

ধরো তুমি একটা temperature converter build করছো। একটা input থাকবে Celsius-এ, আরেকটা display থাকবে Fahrenheit-এ। যদি দুইটা child component নিজের নিজের state রাখে, তাহলে sync হবে না!

### Visual Problem

```
❌ WRONG - Each Child Owns State

ChildA Component          ChildB Component
┌─────────────┐          ┌─────────────┐
│ state: 0°C  │          │ state: 32°F │
│             │          │             │
│ [Celsius]   │          │ [Fahrenheit]│
└─────────────┘          └─────────────┘
      ↓                       ↓
   User changes C          User changes F
      ↓                       ↓
   They don't talk       They don't talk
      ↓                       ↓
   Data INCONSISTENT!    Data INCONSISTENT!
```

### The Core Issue

```jsx
// ❌ WRONG - Each child has its own state
function ChildA() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

function ChildB() {
  const [value, setValue] = useState("");
  return <h2>Preview: {value}</h2>;
}
```

Problem: দুইটা component এর state আলাদা। একটায় কিছু type করলে অন্যটায় দেখাবে না!

---

## 2. The Solution - Lifting State Up

### Defining (English)

**Lifting state up** is the React pattern where you move shared state to the closest common ancestor (parent) of all components that need that data. The parent holds the "single source of truth" and passes data down to children via props.

### Explanation (Bengali)

Shared data common parent-এ রাখো। Parent-এর state change হলে সব child re-render হবে এবং সবাই same data দেখবে।

### Visual Solution

```
✅ CORRECT - Parent Owns State

         Parent Component
         ┌──────────────┐
         │ state: "Hi"  │ ← Single Source of Truth!
         └──────┬───────┘
                │
        ┌───────┴───────┐
        │               │
        ↓               ↓
   ┌─────────┐     ┌─────────┐
   │ ChildA  │     │ ChildB  │
   │  props  │     │  props  │
   │ value   │     │ value   │
   └─────────┘     └─────────┘
        │               │
        ↓               ↓
   Input Box        Preview
   Same data!     Same data!
```

### Code Example

```jsx
// ✅ CORRECT - Parent owns state
function Parent() {
  const [name, setName] = useState("");

  return (
    <div>
      <InputBox value={name} onChange={setName} />
      <Preview value={name} />
    </div>
  );
}

function InputBox({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Preview({ value }) {
  return <h2>Hello, {value}!</h2>;
}
```

---

## 3. Parent/Child Data Flow - One-Way Data Flow

### Defining (English)

React follows **unidirectional data flow** (one-way data flow). Data flows DOWN from parent to child via props, and updates flow UP via callback functions. This makes React applications predictable and easier to debug.

### Explanation (Bengali)

React এ data সবসময় উপর থেকে নিচে যায় - parent থেকে child-এ। Data change করতে হলে callback function ব্যবহার করতে হবে।

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                  PARENT COMPONENT                   │
│                  ┌───────────┐                      │
│                  │   STATE   │                      │
│                  └─────┬─────┘                      │
│                        │                            │
│                        ↓ (props)                    │
│  ┌─────────────────────────────────────────────┐   │
│  │              CHILD COMPONENTS                 │   │
│  │  ┌─────────┐      ┌─────────┐               │   │
│  │  │ Child A │      │ Child B │               │   │
│  │  │  props  │      │  props  │               │   │
│  │  └─────────┘      └─────────┘               │   │
│  └─────────────────────────────────────────────┘   │
│                        │                            │
│                        ↑ (callback)                 │
│                  ┌───────────┐                      │
│                  │  SETTER   │                      │
│                  │ FUNCTION  │                      │
│                  └───────────┘                      │
└─────────────────────────────────────────────────────┘

Step 1: Parent has state (single source of truth)
Step 2: Passes data down via props
Step 3: Child displays data
Step 4: User interaction → child calls callback
Step 5: Parent updates state
Step 6: All children re-render with new data
```

### The Rule

```
Data flow in React:

         Parent State
              ↓
         (props)
              ↓
         Child UI
              ↓
         (callback)
              ↓
         Parent Setter
              ↓
         Parent State (updated)
              ↓
         ...repeat
```

---

## 4. Real-World Example - Shopping Cart

### Defining (English)

A shopping cart quantity system demonstrates real-world state lifting. The quantity is used by both the input controls and the price display, so they must share the same state.

### Explanation (Bengali)

E-commerce app-এ quantity এবং price একসাথে থাকা উচিত। Quantity change হলে price update হবে।

### Complete Code

```jsx
// Parent Component - Holds the shared state
function Cart() {
  const [qty, setQty] = useState(1);

  return (
    <div>
      <QuantityInput qty={qty} setQty={setQty} />
      <PricePreview qty={qty} />
    </div>
  );
}

// Child Component 1 - Input control
function QuantityInput({ qty, setQty }) {
  return (
    <div>
      <button onClick={() => setQty(qty - 1)}>-</button>
      <span>{qty}</span>
      <button onClick={() => setQty(qty + 1)}>+</button>
    </div>
  );
}

// Child Component 2 - Display only
function PricePreview({ qty }) {
  const price = qty * 100;
  return <h3>Total: ${price}</h3>;
}
```

### Why This Architecture?

```
┌──────────────────────────────────────┐
│            Cart (Parent)              │
│  ┌────────────────────────────────┐  │
│  │         state: qty = 1         │  │
│  └────────────────────────────────┘  │
│               │                       │
│      ┌────────┴────────┐              │
│      ↓                 ↓              │
│  ┌────────┐      ┌────────────┐       │
│  │Quantity│      │PricePreview│       │
│  │ Input  │      │            │       │
│  │ qty=1  │      │ Total: $100│       │
│  └────────┘      └────────────┘       │
│      ↑                 ↑              │
│      └────────┬────────┘              │
│               │                       │
│      setQty(qty + 1)                  │
│               ↓                       │
│         state updates                 │
│               ↓                       │
│     Both children re-render           │
└──────────────────────────────────────┘
```

---

## 5. Reusable Components Pattern

### Defining (English)

A **reusable component** is a component designed to work with any data passed to it via props. Instead of hardcoding values, the component accepts parameters (props) that make it flexible and reusable across the application.

### Explanation (Bengali)

Reusable component এমন component যা যেকোনো data দিয়ে কাজ করতে পারে। Props passing করে different data দিলে different output পাওয়া যায়।

### Basic Reusable Input

```jsx
// Reusable Input Component
function TextInput({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Usage in Parent
function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form>
      <TextInput
        label="Name"
        value={name}
        onChange={setName}
      />
      <TextInput
        label="Email"
        value={email}
        onChange={setEmail}
      />
    </form>
  );
}
```

### Why Reusable?

```
Before (Duplication):
┌─────────────────────┐
│ Login Form          │
│ <input placeholder="Email" />    │
│ <input placeholder="Password" /> │
└─────────────────────┘
┌─────────────────────┐
│ Register Form       │
│ <input placeholder="Name" />     │
│ <input placeholder="Email" />    │
│ <input placeholder="Password" /> │
└─────────────────────┘

After (Reusable):
┌─────────────────────┐
│ TextInput Component │
│ (used everywhere!) │
└─────────────────────┘

Single component → Multiple uses
```

### Real-World MERN Example

```jsx
// Reusable form field component
function FormField({ label, name, type = "text", value, onChange, error }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Used in different pages
function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  
  return (
    <form>
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
    </form>
  );
}

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  
  return (
    <form>
      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
    </form>
  );
}
```

---

## 6. Common Mistakes

### Mistake 1: Duplicated State in Siblings

```jsx
// ❌ WRONG - Both children have their own state
function ChildA() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

function ChildB() {
  const [value, setValue] = useState("");  // Separate state!
  return <h2>Preview: {value}</h2>;
}

// ✅ CORRECT - Lift state to parent
function Parent() {
  const [value, setValue] = useState("");
  
  return (
    <>
      <ChildA value={value} onChange={setValue} />
      <ChildB value={value} />
    </>
  );
}
```

### Mistake 2: Mutating Props

```jsx
// ❌ WRONG - Never mutate props!
function Child({ user }) {
  user.name = "New Name";  // NEVER DO THIS!
  return <div>{user.name}</div>;
}

// ✅ CORRECT - Props are read-only
function Child({ user }) {
  return <div>{user.name}</div>;
}
```

### Mistake 3: Not Lifting State High Enough

```jsx
// ❌ WRONG - State too low, grandchild can't access
function GrandParent() {
  return (
    <Parent>
      <Child />  // Can't access grandparent's data!
    </Parent>
  );
}

// ✅ CORRECT - State at the right level
function GrandParent() {
  const [data, setData] = useState("");
  
  return (
    <Parent data={data} setData={setData}>
      <Child data={data} />  // Can access via props!
    </Parent>
  );
}
```

---

## 7. Prop Drilling - The Problem

### Defining (English)

**Prop drilling** occurs when you need to pass data through multiple layers of components that don't actually need the data, just to get it to a child that does need it. It's a common issue in deeply nested component trees.

### Explanation (Bengali)

Prop drilling হলো যখন data অনেক component এর মধ্যে দিয়ে pass করতে হয়, কিন্তু মাঝের component গুলোর actually data-এর দরকার নেই।

### The Problem Visual

```
GrandParent (has data)
    ↓
Parent (doesn't need data, just passes through)
    ↓
Child (actually needs the data)

This is prop drilling!
```

### Code Example of Prop Drilling

```jsx
function GrandParent() {
  const [user, setUser] = useState({ name: "Nirjhor" });
  
  return <Parent user={user} setUser={setUser} />;
}

function Parent({ user, setUser }) {
  // Parent doesn't need user, but must pass it down
  return <Child user={user} setUser={setUser} />;
}

function Child({ user, setUser }) {
  // Child actually uses the data
  return <h1>Hello, {user.name}</h1>;
}
```

### When It's Okay vs Not Okay

```
Prop drilling is OK when:
- 1-2 levels deep
- Simple apps

Prop drilling is PROBLEM when:
- 5+ levels deep
- Same props passed through many components
- Hard to maintain
```

### Solution for Deep Prop Drilling (Preview)

```
When prop drilling becomes a problem, use:
- Context API (Week 7, Day 1)
- State management (Redux, Zustand)

We'll learn these next week!
```

---

## 8. Practice Exercises

### Task 1: Live Name Preview

```jsx
function Parent() {
  const [name, setName] = useState("");
  
  return (
    <div>
      <Input value={name} onChange={setName} />
      <Preview value={name} />
    </div>
  );
}

function Input({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Preview({ value }) {
  return <h1>Hello, {value}!</h1>;
}
```

### Task 2: Cart Quantity + Price

```jsx
function Cart() {
  const [qty, setQty] = useState(1);
  const pricePerItem = 50;
  
  return (
    <div>
      <QuantityControls qty={qty} setQty={setQty} />
      <PriceDisplay total={qty * pricePerItem} />
    </div>
  );
}

function QuantityControls({ qty, setQty }) {
  return (
    <div>
      <button onClick={() => setQty(qty - 1)}>-</button>
      <span>{qty}</span>
      <button onClick={() => setQty(qty + 1)}>+</button>
    </div>
  );
}

function PriceDisplay({ total }) {
  return <h3>Total: ${total}</h3>;
}
```

### Task 3: Profile Form with Reusable Inputs

```jsx
function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form>
      <ReusableInput
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <ReusableInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <ReusableInput
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
      />
    </form>
  );
}

function ReusableInput({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
```

### Task 4: Shared Counter Between Siblings

```jsx
function CounterApp() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <CounterDisplay count={count} />
      <CounterControls setCount={setCount} count={count} />
    </div>
  );
}

function CounterDisplay({ count }) {
  return <h1>Count: {count}</h1>;
}

function CounterControls({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

## Summary

আজকে শিখলাম:

- **Lifting State Up** - Shared state common parent-এ রাখা
- **One-Way Data Flow** - Parent → Child (props), Child → Parent (callback)
- **Reusable Components** - Props দিয়ে flexible component baua
- **Prop Drilling** - Data pass করতে গিয়ে middle components এর মধ্যে দিয়ে যাওয়া

**সবচেয়ে important rule:**

```
State should live where it's used by the most components.

If multiple siblings need the same data → lift to parent
```

এটাই React architecture-এর foundation। Next week-এ prop drilling এর solution হিসেবে Context API শিখবো!

---

## Next Day Preview

Tomorrow (Day 7) তে পুরো week-এর concepts apply করে একটা mini project বানাবো:

- Blog UI
- State management
- Forms
- Event handling
- Components

সব একসাথে practice করবো 🔥