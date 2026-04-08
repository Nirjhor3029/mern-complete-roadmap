# React Re-rendering Deep Dive + React.memo

## Overview

Today you'll understand how React's rendering engine works, why unnecessary re-renders happen, and how React.memo optimizes performance. This is your first step into becoming a performance-conscious React engineer.

---

## What Triggers a Re-render in React?

A React component re-renders when:

1. **State changes** - When `useState` or `useReducer` updates
2. **Props change** - When parent passes new props to child
3. **Parent re-renders** - When the parent component re-renders, all children re-render by default
4. **Context changes** - When a Context provider's value changes

### Code Example: Basic Re-render

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child />
    </div>
  );
}

function Child() {
  console.log("Child rendered"); // This logs EVERY time Parent re-renders
  return <h2>I am child</h2>;
}
```

**What happens when button is clicked:**
1. `setCount(count + 1)` is called
2. Parent component re-renders
3. Child component also re-renders (even though it has no relation to `count`)

---

## Why Does Child Re-render?

React doesn't track which components need updates. By default:

> **Parent re-render → All children re-render**

React's philosophy is "render by default, optimize manually." This is because React cannot know in advance whether a child component needs to re-render or not.

### The Problem

In large applications with many components, unnecessary re-renders cause:
- Slow UI updates
- Battery drain on mobile devices
- Poor user experience
- Wasted computational resources

---

## React.memo: The Solution

`React.memo` is a higher-order component (HOC) that memoizes a component, preventing re-renders when props haven't changed.

### Syntax

```jsx
import React from "react";

const MemoizedChild = React.memo(function Child() {
  console.log("Child rendered");
  return <h2>I am child</h2>;
});
```

### How React.memo Works

1. **Shallow comparison** - It compares new props with previous props
2. **If props are same** - Skip re-render, return cached result
3. **If props changed** - Re-render the component

### With Props Example

```jsx
const Child = React.memo(function Child({ name }) {
  console.log("Child rendered");
  return <h2>Hello, {name}</h2>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name="Nirjhor" />
    </div>
  );
}
```

Now when you click the button:
- Parent re-renders (count changes)
- Child does NOT re-render because `name` prop is still "Nirjhor"

---

## Common Mistake: Object Props

```jsx
// ❌ WRONG - Creates new object every render
<Child name={{ value: "Nirjhor" }} />

// ✅ CORRECT - Primitive stays same
<Child name="Nirjhor" />
```

When you pass an object as a prop, a new object reference is created every render. This causes `React.memo` to fail because the reference changes, even if the values inside are the same.

### Solution: Stable References

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ Stable reference - created once
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

---

## When to Use React.memo

### ✅ Use When:
- Component renders expensive calculations
- Component is heavy (many DOM nodes)
- Props are stable (don't change often)
- Component is used multiple times in a list

### ❌ Don't Use When:
- Component is small and simple
- Props change on every render anyway
- Adding memo causes more overhead than it saves

---

## Real-World MERN Example: E-commerce Product Card

In a real MERN application, you often have product lists:

```jsx
const ProductCard = React.memo(function ProductCard({ product }) {
  // Expensive rendering - image processing, formatting, etc.
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
});

function ProductList({ products }) {
  const [filter, setFilter] = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

Without `React.memo`, every keystroke in the search box would re-render ALL product cards, even ones that haven't changed. With `React.memo`, only the filtered list re-renders.

---

## Mini Exercise: Memo vs Non-Memo

Build this to understand the difference:

```jsx
import React, { useState } from "react";

// Non-memoized child
function RegularChild() {
  console.log("RegularChild rendered");
  return <div>Regular Child</div>;
}

// Memoized child
const MemoChild = React.memo(function MemoChild() {
  console.log("MemoChild rendered");
  return <div>Memo Child</div>;
});

export default function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <RegularChild />
      <MemoChild />
    </div>
  );
}
```

**Observe:** Click the button multiple times. You'll see:
- "RegularChild rendered" - logs every click
- "MemoChild rendered" - logs only once (initial render)

---

## Performance Thinking

As a React engineer, you should think:

1. **What triggers re-renders?** - State, props, parent
2. **Is this re-render necessary?** - Can we skip it?
3. **Which components are expensive?** - Focus optimization there
4. **Are props stable?** - Use memo for stable props

---

## Tomorrow's Topic

Tomorrow you'll learn about `useMemo` - another powerful hook for optimizing expensive calculations and preventing unnecessary re-creations of values.
