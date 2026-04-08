# Interview Q&A - Lifting State Up + Parent/Child Data Flow + Reusable Components

## Q1: What is "lifting state up" in React?

### Definition (English)

**Lifting state up** is a React pattern where you move shared state from multiple child components to their closest common parent component. This ensures all children that need the same data stay in sync, with the parent acting as the single source of truth.

### Real-life Example

Think of two friends sharing a Google Doc:
- If each person has their own copy (like duplicated state), changes don't sync
- If they share one document (like lifting state to parent), both see the same content in real-time

### Code Example

```jsx
// ❌ WRONG - Each child has its own state
function ChildA() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={e => setValue(e.target.value)} />;
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

### MERN Real-world Use Case

In an e-commerce product page:
- Price display component needs quantity
- Quantity buttons component needs quantity
- Both should share quantity state in parent (ProductPage component)
- When user clicks +/- buttons, price updates immediately

---

## Q2: When should state live in the parent vs child?

### Definition (English)

State should live in the parent when:
1. Multiple child components need to access the same data
2. One child's change should affect another child's display
3. You need a "single source of truth"

State can live in a child when:
1. The data is only used by that single child
2. The data doesn't need to be shared with siblings
3. It's purely UI state (like open/close of a modal within that component)

### Real-life Example

Think of a household:
- **Parent (House)**: Utility bills, wifi password - shared by all
- **Child (Room)**: Your personal lamp, your books - only yours

### Code Example

```jsx
// ✅ Parent - Shared data
function ShoppingCart() {
  const [qty, setQty] = useState(1);  // Used by multiple children
  
  return (
    <>
      <QuantityInput qty={qty} setQty={setQty} />
      <PriceDisplay qty={qty} />
    </>
  );
}

// ✅ Child - Local UI state
function Modal({ isOpen }) {
  const [animation, setAnimation] = useState(false);  // Only this component
  return <div className={animation ? 'fade' : ''}>...</div>;
}
```

### MERN Real-world Use Case

- **Parent state**: User authentication info (used by Header, Sidebar, Content)
- **Child state**: A dropdown's open/close state (only that dropdown)

---

## Q3: Why is React's one-way data flow important?

### Definition (English)

**One-way data flow** (or unidirectional data flow) is React's architectural pattern where:
1. Data flows DOWN from parent to child via props
2. Updates flow UP from child to parent via callback functions

This makes applications predictable, easier to debug, and easier to understand because you always know where data originates and where changes go.

### Real-life Example

Think of a company's hierarchy:
- CEO (parent) makes decisions
- Decisions flow down to managers, then to employees
- Employees report back up through the chain

It's never chaos where anyone can change anything from anywhere!

### Code Example

```jsx
function Parent() {
  const [name, setName] = useState("");  // Source of truth
  
  return (
    <div>
      {/* Data flows DOWN */}
      <InputField value={name} onChange={setName} />
      {/* Data flows DOWN */}
      <Display name={name} />
    </div>
  );
}
```

### MERN Real-world Use Case

In a dashboard:
- User clicks "Filter" button in child component
- Callback fires to parent
- Parent updates filter state
- All data tables, charts, and displays re-render with filtered data
- Easy to trace: button click → state update → UI change

---

## Q4: What is prop drilling and how do you solve it?

### Definition (English)

**Prop drilling** occurs when you need to pass data through multiple layers of components that don't actually need the data themselves - they just pass it along to reach a deep child that does need it.

### Real-life Example

Think of a WhatsApp message going through multiple group admins:
- Original message (GrandParent)
- Passed through Parent1 (doesn't read it, just forwards)
- Passed through Parent2 (doesn't read it, just forwards)
- Finally reaches the actual recipient (Child)

The "middle admins" are doing nothing but passing props!

### Code Example

```jsx
// Prop drilling problem
function GrandParent() {
  const [user, setUser] = useState("Nirjhor");
  return <Parent user={user} setUser={setUser} />;
}

function Parent({ user, setUser }) {
  // Parent doesn't need user, just passes it down!
  return <Child user={user} setUser={setUser} />;
}

function Child({ user, setUser }) {
  // Child actually uses it
  return <h1>Hello, {user}</h1>;
}
```

### Solutions

```
Level 1 (Simple): Accept prop drilling if only 1-2 levels deep

Level 2 (Medium): Use composition - pass components as children

Level 3 (Advanced): Use Context API (Week 7, Day 1)

Level 4 (Large App): Use state management (Redux, Zustand)
```

### MERN Real-world Use Case

A deeply nested admin panel:
- Theme setting needs to reach deeply nested components
- Instead of passing theme through 10 layers, use Context API
- Any component can access theme without passing props

---

## Q5: What are the rules for building reusable components?

### Definition (English)

Reusable components should:
1. Accept all necessary data via props
2. Be agnostic to the specific data (work with any data passed)
3. Handle their own UI state if needed, but expose ways for parent to control them
4. Have clear, descriptive prop names
5. Be single-purpose (do one thing well)

### Real-life Example

Think of a reusable form input like an Amazon delivery form:
- Works for addresses in Dhaka, Chittagong, or any city
- Accepts the address data as input
- Doesn't care what the specific address is
- Can be used for shipping, billing, or pickup

### Code Example

```jsx
// ✅ Good reusable component
function ReusableInput({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}

// Usage - can use for any type of input
<ReusableInput label="Email" type="email" value={email} onChange={setEmail} />
<ReusableInput label="Phone" type="tel" value={phone} onChange={setPhone} />
<ReusableInput label="Password" type="password" value={pass} onChange={setPass} />
```

### MERN Real-world Use Case

A reusable `ProductCard` component:
- Accepts product data as props
- Used in: homepage, search results, cart, wishlist, related products
- Same component, different data = maximum reusability

---

## Q6: How do you decide where to place state in a React application?

### Definition (English)

The decision follows these rules:
1. Find all components that use the data
2. Find their closest common ancestor
3. Place state in that ancestor
4. If only one component uses it, keep it there

This ensures data is accessible where needed without unnecessary complexity.

### Real-life Example

```
Components using "user" data:
- Header (needs user for display)
- Sidebar (needs user for personalized menu)
- Content (needs user for permissions)

Closest common ancestor: App component
→ Place user state in App
```

### Decision Flow Chart

```
Is the data used by multiple components?
  YES → Find common ancestor → Place state there
  NO  → Only one component uses it?
          YES → Keep state in that component
          NO  → Consider if it should be lifted later
```

### MERN Real-world Use Case

Building an online exam app:
- Timer (countdown) - used by TimerDisplay and QuestionNav → place in ExamPage parent
- Current question - used by QuestionDisplay and ProgressBar → place in ExamPage parent
- Selected answer - only used by AnswerOption component → keep in that component

---

## Q7: What happens when parent state changes in React?

### Definition (English)

When parent state changes:
1. Parent component re-renders
2. All child components receive new prop values
3. Children re-render with new data
4. This cascade continues through the entire component tree below

This is called "top-down reconciliation" - React ensures the UI stays in sync with state.

### Real-life Example

Think of a radio station:
- Changing station (parent state change)
- All speakers in the house (children) receive the new signal
- Everyone hears the same station now

### Code Example

```jsx
function Parent() {
  const [message, setMessage] = useState("Hello");
  
  return (
    <div>
      {/* Both children will re-render when message changes */}
      <Display message={message} />
      <Input onChange={setMessage} />
    </div>
  );
}
```

### MERN Real-world Use Case

A live sports scoreboard:
- Score changes (parent state)
- Score display updates
- History list updates
- Statistics chart updates
- All from one state change!

---

## Q8: Explain the relationship between props and state in React.

### Definition (English)

**Props** and **state** work together:
- **State**: Internal data that a component owns and manages
- **Props**: External data passed from parent to child

When a component's state changes, it can pass that data down to children via props. Props are read-only from the child's perspective - they cannot modify props directly.

### Real-life Example

Think of a restaurant:
- **State**: The kitchen's current inventory (internal)
- **Props**: The order ticket passed from customer to kitchen (external)

The kitchen uses its inventory (state) to prepare food, and receives orders (props) from outside.

### Code Example

```jsx
function Parent() {
  // State lives here
  const [count, setCount] = useState(0);
  
  // Pass state to child as props
  return <Child count={count} onIncrement={setCount} />;
}

function Child({ count, onIncrement }) {
  // Props are READ-ONLY
  // Can't do: props.count = 5
  // Must use callback to update parent state
  return <button onClick={() => onIncrement(count + 1)}>{count}</button>;
}
```

### MERN Real-world Use Case

- **State in parent**: User's cart items from MongoDB
- **Props to children**: Each cart item passed to CartItem component
- **Update via callback**: AddToCart function passed as prop to update parent state