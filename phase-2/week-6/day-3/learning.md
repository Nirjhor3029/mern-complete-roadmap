# useCallback + Stable Function References + Memo Child Optimization

## Overview

Today you'll learn about `useCallback` - the final piece of React's memoization toolkit. While `useMemo` caches values, `useCallback` caches functions. This is critical for making `React.memo` work properly with callback props.

---

## The Problem: New Function Reference on Every Render

Every time a component re-renders, all code inside runs again - including function definitions. This creates a new function reference every render, which breaks `React.memo`.

### Code Example: The Problem

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // New function created on EVERY render!
  function handleClick() {
    console.log("clicked");
  }

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} />
    </>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});
```

**What happens:**
1. Parent re-renders (when count changes)
2. A NEW `handleClick` function is created
3. This new reference is passed to Child
4. React.memo sees prop changed → re-renders Child ❌

Even though the function does the same thing, the reference is different. This breaks memoization.

---

## The Solution: useCallback

`useCallback` memoizes a function, keeping the same reference across renders unless dependencies change.

### Syntax

```jsx
const memoizedCallback = useCallback(() => {
  // function body
}, [dependency1, dependency2]);
```

- **First argument**: The function to memoize
- **Second argument**: Dependency array - when these change, create new function

### Code Example: useCallback Solution

```jsx
import { useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // Same reference across renders!
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // Empty deps = never changes

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} />
    </>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});
```

Now when count changes:
- Parent re-renders
- `handleClick` stays the same reference
- Child sees same prop → doesn't re-render ✅

---

## Mental Model

| Hook | What it Caches | Syntax |
|------|---------------|--------|
| `useMemo` | Value (result) | `const value = useMemo(() => compute(), [deps])` |
| `useCallback` | Function (reference) | `const fn = useCallback(() => {}, [deps])` |

**Internal relationship:**

```jsx
// These are equivalent:
const fn = useCallback(() => compute(a, b), [a, b]);

const fn = useMemo(() => () => compute(a, b), [a, b]);
```

useCallback is essentially useMemo for functions.

---

## Real-World MERN Examples

### 1. E-commerce Add to Cart

```jsx
function ProductList({ products }) {
  const [cart, setCart] = useState([]);

  // Stable reference - won't change on re-renders
  const handleAddToCart = useCallback((productId) => {
    setCart((prev) => [...prev, productId]);
  }, []); // Empty deps = stable reference

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
});
```

**Why powerful:** With 100 product cards, clicking one "Add to Cart" shouldn't re-render all 100 cards. useCallback + React.memo ensures only the clicked card re-renders.

---

## Common Mistakes

### ❌ Mistake 1: Stale Closure (Wrong Dependencies)

```jsx
// WRONG - Captures old count value
const logCount = useCallback(() => {
  console.log(count);
}, []); // Missing dependency!

// CORRECT - Updates when count changes
const logCount = useCallback(() => {
  console.log(count);
}, [count]);
```

**What happens:** Without the dependency, the callback always logs the initial count value (0), not the current value.

### ❌ Mistake 2: Using for Everything

```jsx
// WRONG - Unnecessary complexity
const sayHi = useCallback(() => console.log("hi"), []);

// CORRECT - Just define the function
function sayHi() {
  console.log("hi");
}
```

**When to avoid:**
- Simple components that don't need optimization
- Functions that aren't passed to memoized children
- When the overhead exceeds the benefit

---

## The Super Combo: useCallback + React.memo

This is the ultimate optimization pattern in React:

```jsx
const DeleteButton = React.memo(({ onDelete }) => {
  return <button onClick={onDelete}>Delete</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleDelete = useCallback(() => {
    console.log("deleted");
  }, []); // Stable reference

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <DeleteButton onDelete={handleDelete} />
    </div>
  );
}
```

**Result:**
- Count updates → Parent re-renders
- handleDelete stays the same reference
- DeleteButton sees same prop → doesn't re-render ✅

---

## Performance Thinking: The Gold Rule

> **Memoize values with useMemo, functions with useCallback**

In big React apps, this is your optimization foundation:
- useMemo for computed values (filtered lists, derived data)
- useCallback for callback functions (event handlers)
- React.memo for display components

**When to use useCallback:**
- Callback props to memoized children
- Expensive child component trees
- When stable function reference matters (event handlers, API calls)

---

## Mini Project: Product Grid Optimization

Build a product grid that demonstrates useCallback optimization:

**Requirements:**
1. 50 memoized product cards
2. Add to cart callback with useCallback
3. Unrelated counter state
4. Observe that clicking unrelated button doesn't affect product cards

This demonstrates:
- useCallback keeps addToCart stable
- React.memo on ProductCard prevents unnecessary re-renders
- Only the actually clicked card should re-render

---

## Tomorrow's Topic

Tomorrow you'll learn about **Code Splitting + lazy() + Suspense** - route-level optimization for production apps. This is where real frontend engineering begins.
