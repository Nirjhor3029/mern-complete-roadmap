# useMemo + Expensive Calculation Optimization

## Overview

Today you'll learn about `useMemo` - one of the most practical React hooks for performance optimization. Understanding this hook is critical for building responsive applications with filtering, searching, and data processing.

---

## The Problem: Recalculation on Every Render

Every time a component re-renders, all code inside the component function runs again - including expensive calculations.

### Code Example: The Problem

```jsx
function App() {
  const [count, setCount] = useState(0);

  // This runs on EVERY render!
  const total = heavyCalculation();

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count} | Total: {total}
    </button>
  );
}

function heavyCalculation() {
  console.log("Heavy calculation running...");
  // Expensive computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result;
}
```

**What happens:**
1. Button click triggers `setCount`
2. Component re-renders
3. `heavyCalculation()` runs again - even though result hasn't changed!

This causes:
- Filter lag on every keystroke
- Slow search functionality
- Dashboard freezing
- Wasted CPU cycles

---

## The Solution: useMemo

`useMemo` memoizes a computed value, caching the result and only recalculating when dependencies change.

### Syntax

```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

- **First argument**: Function that returns the computed value
- **Second argument**: Dependency array - when these values change, recalculate

### Code Example: useMemo Solution

```jsx
import { useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [price] = useState(100);

  const total = useMemo(() => {
    console.log("Calculating total...");
    return price * 1000;
  }, [price]); // Only recalculate when 'price' changes

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count} | Total: {total}
    </button>
  );
}
```

Now when you click the button:
- `count` changes → component re-renders
- `total` is NOT recalculated because `price` hasn't changed
- Cached value is returned instantly

---

## Real-World MERN Examples

### 1. E-commerce Product Search

```jsx
function ProductSearch({ products }) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Why powerful:** With 1000 products, filtering on every keystroke without memoization would be extremely slow. `useMemo` caches the filtered result until the query actually changes.

### 2. Dashboard Analytics

```jsx
function Dashboard({ orders }) {
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  const totalOrders = useMemo(() => {
    return orders.length;
  }, [orders]);

  const averageOrder = useMemo(() => {
    return totalRevenue / totalOrders;
  }, [totalRevenue, totalOrders]);

  return (
    <div>
      <h1>Revenue: ${totalRevenue}</h1>
      <h2>Orders: {totalOrders}</h2>
      <h3>Average: ${averageOrder}</h3>
    </div>
  );
}
```

**Why powerful:** Dashboard aggregations involve expensive reduce/map operations. Without memoization, every state change (like typing in a search box) would trigger expensive recalculations.

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Using for Simple Values

```jsx
// WRONG - No computation happening
const name = useMemo(() => "Nirjhor", []);

// CORRECT - Just use a regular variable
const name = "Nirjhor";
```

`useMemo` adds overhead (memory allocation + comparison). Don't use it when there's no expensive computation.

### ❌ Mistake 2: Missing Dependencies

```jsx
// WRONG - Stale result when query changes
const filtered = useMemo(() => {
  return products.filter(p => p.name.includes(query));
}, []); // Missing query!

// CORRECT - Include all used values
const filtered = useMemo(() => {
  return products.filter(p => p.name.includes(query));
}, [products, query]);
```

This is a bug that causes stale data. Always include every value used inside the memo function.

### ❌ Mistake 3: Wrong Dependency

```jsx
// WRONG - Recalculates when count changes, but total doesn't depend on count
const total = useMemo(() => price * 1000, [count]);

// CORRECT - Only depend on what you actually use
const total = useMemo(() => price * 1000, [price]);
```

---

## When to Use useMemo

### ✅ Use When:

- **Expensive loops** - Processing large arrays
- **Filter/map/reduce on large data** - Searching, sorting, aggregating
- **Derived state** - Data computed from other state/props
- **Heavy object generation** - Creating complex objects
- **Stable props for memo children** - Working with React.memo

### ❌ Don't Use When:

- Simple calculations that are fast
- Primitives (strings, numbers) that don't need computation
- The overhead of memoization exceeds the cost of recalculation

---

## The Super Combo: useMemo + React.memo

When used together, these provide maximum optimization:

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Stable reference - same array every render
  const users = useMemo(() => generateUsers(), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <UserList users={users} />
    </div>
  );
}

// Memoized child - won't re-render when count changes
const UserList = React.memo(function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
});
```

**How it works:**
1. `useMemo` creates a stable `users` reference (same array every render)
2. `React.memo` on UserList prevents re-render when props are same
3. Result: Maximum optimization - count updates don't affect UserList at all!

---

## Performance Thinking: The Gold Rule

> **Cache derived data, not source state**

In dashboard and analytics applications:
- Source state: raw API data from server
- Derived data: filtered, sorted, aggregated results

Always memoize derived data. This is the gold rule for MERN applications.

---

## Mini Project: Product Search Dashboard

Build a product search dashboard that demonstrates useMemo optimization:

**Requirements:**
1. Search input for filtering products
2. 100 fake products array
3. Memoized filter function
4. Unrelated count button
5. No lag when clicking count button

This demonstrates that clicking the count button (unrelated to products) shouldn't trigger re-filtering.

---

## Tomorrow's Topic

Tomorrow you'll learn about `useCallback` - the hook for stabilizing function references. Combined with what you've learned about React.memo and useMemo, you'll have the complete React optimization toolkit.
