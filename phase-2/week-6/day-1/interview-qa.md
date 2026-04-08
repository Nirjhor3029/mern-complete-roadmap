# Interview Q&A: React Re-rendering + React.memo

## Q1: What triggers a re-render in React?

**Definition:** A re-render in React occurs when the component's state or props change, causing React to re-execute the component function and update the DOM.

**Real-life Example:** Think of a TV that turns on automatically when someone presses the remote button. The TV (component) re-renders (turns on) when the button (state change) is pressed.

**Code Use Case:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```
Clicking the button triggers a re-render because `setCount` changes the state.

**Real-world MERN Use Case:** In a dashboard, when a user clicks "Refresh Data," the state updates, and the dashboard re-renders to show new data from the API.

---

## Q2: Why does a child component re-render when its parent re-renders?

**Definition:** React doesn't track which components actually need to update. By default, when a parent re-renders, React recursively re-renders all child components because it cannot know in advance which children need updates.

**Real-life Example:** It's like a family eating dinner - when the father (parent) comes home, everyone (children) wakes up and moves, even if they don't need to. React doesn't know which children are "sleeping" (don't need updates).

**Code Use Case:**
```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child /> {/* Child re-renders even though it has no relation to count */}
    </div>
  );
}

function Child() {
  console.log("Child rendered");
  return <h2>I am child</h2>;
}
```

**Real-world MERN Use Case:** In an e-commerce product page, clicking a quantity input updates the cart state, but the entire page re-renders - including unrelated components like the header, footer, and unrelated product cards.

---

## Q3: What is React.memo and how does it work?

**Definition:** React.memo is a higher-order component that memoizes a functional component. It performs a shallow comparison of props and skips re-rendering if the props haven't changed.

**Real-life Example:** It's like a photo copy machine that keeps the last copy ready. If you ask for the same thing again, it gives you the existing copy instantly without printing again. Only when you ask for something different does it print a new copy.

**Code Use Case:**
```jsx
import React from "react";

const MemoizedChild = React.memo(function Child({ name }) {
  console.log("Child rendered");
  return <h2>Hello, {name}</h2>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoChild name="Nirjhor" />
    </div>
  );
}
```
Now, clicking the button won't re-render the child because the `name` prop remains "Nirjhor".

**Real-world MERN Use Case:** In a chat application, when new messages arrive, React.memo on individual message components prevents re-rendering messages that haven't changed.

---

## Q4: What is shallow comparison in React.memo?

**Definition:** Shallow comparison checks if the primitive values of props are the same or if object references are the same. It doesn't do a deep comparison of nested objects or arrays.

**Real-life Example:** It's like checking if two photo frames look the same from the outside - you see they're both "blue frames" without opening them to check the photos inside. You only check the top-level reference, not the contents.

**Code Use Case:**
```jsx
// ✅ Shallow comparison works - same primitive
<Child name="Nirjhor" />  // name is "Nirjhor" on both renders

// ❌ Shallow comparison fails - new object reference
<Child user={{ name: "Nirjhor" }} />  // new object created every render
```

**Real-world MERN Use Case:** In a social media feed, passing a new object for user info every render breaks memoization, causing unnecessary re-renders of the post component.

---

## Q5: When should you NOT use React.memo?

**Definition:** You should avoid React.memo when the component is simple, props change frequently, or the memoization overhead costs more than the re-render itself.

**Real-life Example:** Using a locksmith to protect a cardboard box - the lock costs more than the contents are worth. Similarly, memo adds overhead (memory + comparison time) that might exceed the cost of just re-rendering.

**Code Use Case:**
```jsx
// ❌ Don't use memo for simple components
const SimpleButton = React.memo(function ({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
});

// This adds unnecessary overhead - the component is already cheap to render
```

**Real-world MERN Use Case:** Don't wrap simple UI elements like buttons, labels, or icons in React.memo - the overhead of comparison isn't worth the savings.

---

## Q6: How do you handle object props with React.memo?

**Definition:** Use `useMemo` to create stable object references, ensuring the same object is passed on every render unless the values actually change.

**Real-life Example:** It's like giving someone your home address - you write it once on paper and give them that same paper every time they visit, rather than writing a new address each time.

**Code Use Case:**
```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Stable reference - only changes when name actually changes
  const userInfo = useMemo(() => ({ name: "Nirjhor" }), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child userInfo={userInfo} />
    </div>
  );
}

const Child = React.memo(function Child({ userInfo }) {
  return <h2>Hello, {userInfo.name}</h2>;
});
```

**Real-world MERN Use Case:** In an admin dashboard, when passing user permissions or configuration objects to components, use `useMemo` to prevent breaking memoization.

---

## Q7: What is the difference between useMemo and React.memo?

**Definition:** `useMemo` memoizes a computed value (return value of a function), while `React.memo` memoizes a component (skips re-rendering based on props).

**Real-life Example:** 
- `useMemo` is like remembering the result of 2+2 = 4, so you don't calculate it again
- `React.memo` is like keeping a printed photo - you don't take a new photo if nothing changed

**Code Use Case:**
```jsx
// useMemo - memoizes a value
const expensiveResult = useMemo(() => {
  return heavyCalculation(a, b);
}, [a, b]);

// React.memo - memoizes a component
const MemoizedComponent = React.memo(function Component({ data }) {
  return <div>{data}</div>;
});
```

**Real-world MERN Use Case:** Use `useMemo` for filtering/searching lists (expensive calculation) and `React.memo` for display components like product cards or message items.

---

## Q8: How does React.memo improve performance in a MERN application?

**Definition:** React.memo prevents unnecessary re-renders by skipping component execution when props haven't changed, reducing DOM operations and improving UI responsiveness.

**Real-life Example:** It's like a smart TV that stays in sleep mode until you press a button. Without it, the TV turns on and off constantly, wasting electricity.

**Real-world MERN Use Case:** In an e-commerce product listing with 100 products, filtering by category would re-render all 100 product cards without memoization. With React.memo, only the filtered results re-render, making the search feel instant.

---

## Quick Recap

| Question | Key Answer |
|----------|------------|
| What triggers re-render? | State change, props change, parent re-render |
| Why child re-renders? | React doesn't track dependencies - renders all children |
| What is React.memo? | HOC that skips re-render when props are same |
| Shallow comparison? | Checks top-level references, not nested values |
| When NOT to use? | Simple components, frequently changing props |
| How to handle objects? | Use useMemo for stable references |
