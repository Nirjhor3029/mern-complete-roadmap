# Custom Hooks - Reusable Logic Extraction

## Definition (Interview Focus)

A **Custom Hook** in React is a JavaScript function whose name starts with "use" that allows you to extract and reuse stateful logic across multiple components. It enables you to combine built-in React hooks (useState, useEffect, useContext, etc.) into reusable functions.

## Bengali Explanation

Custom Hook হলো একটি special function যা তোমার stateful logic কে reuse করার সুযোগ দেয়। যদি ৫টা component-এ একই logic থাকে (যেমন counter, form input, API call), তাহলে সেটা custom hook এ বের করে সব জায়গায় use করতে পারো। এটা React এর "DRY" (Don't Repeat Yourself) principle implement করার সবচেয়ে powerful উপায়।

## Real-life Example (Bangladeshi Context)

ধরো তুমি একটি e-commerce site বানাচ্ছো:
- Product page এ add to cart button
- Cart page এ remove item
- Header এ cart count দেখাতে হবে

সব জায়গায় cart এর same logic লাগছে। এখন প্রতিটা component-এ আলাদা state না বানিয়ে, একটা `useCart()` hook বানাও এবং সব জায়গায় use করো। এটাই real-world production pattern!

## Code Examples

### 1. Basic Custom Hook - useCounter

```javascript
import { useState } from "react";

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
}

// Usage
function App() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### 2. useFetch - API Data Fetching Hook

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function ProductList() {
  const { data: products, loading, error } = useFetch('/api/products');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### 3. useInput - Form Input Hook

```javascript
import { useState } from "react";

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => setValue(initialValue);

  return {
    value,
    onChange: handleChange,
    reset,
    setValue
  };
}

// Usage
function LoginForm() {
  const email = useInput("");
  const password = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email.value, password.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email.value} 
        onChange={email.onChange} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password.value} 
        onChange={password.onChange} 
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 4. useCart - E-commerce Cart Hook

```javascript
import { useState } from "react";

function useCart() {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}
```

### 5. useLocalStorage - Persist Data

```javascript
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [language, setLanguage] = useLocalStorage("language", "bn");

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
```

## Real-world MERN Use Case

### E-commerce Dashboard with Custom Hooks

```javascript
// hooks/useProductSearch.js - Search with debouncing
import { useState, useEffect } from "react";

function useProductSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        const response = await fetch(`/api/products/search?q=${query}`);
        const data = await response.json();
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { query, setQuery, results, loading };
}

// hooks/useAuth.js - Authentication state
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, login, logout };
}
```

## Important Rules

### ✅ Do's
- Always prefix with "use" (useCounter, useFetch, useCart)
- Only call hooks at the top level of your function
- Only call hooks from React components or other custom hooks
- Return meaningful data structure

### ❌ Don'ts
- Don't call hooks conditionally (inside if statements, loops)
- Don't call hooks from regular JavaScript functions
- Don't return JSX from hooks (that's what components do)
- Don't use useState inside conditional blocks

```javascript
// ❌ WRONG - Conditional hook call
if (showCounter) {
  const { count } = useCounter(); // NEVER DO THIS
}

// ❌ WRONG - Hook inside loop
for (let i = 0; i < 10; i++) {
  useCounter(); // NEVER DO THIS
}

// ❌ WRONG - Regular function calling hook
function regularFunction() {
  useCounter(); // NEVER DO THIS
}

// ❌ WRONG - Hook returning JSX
function useCard() {
  return <div>Hello</div>; // NEVER DO THIS
}
```

## Architecture & Best Practices

### Folder Structure for Scalable Apps

```
src/
├── components/
│   ├── ProductCard.jsx
│   └── Cart.jsx
├── hooks/
│   ├── useCounter.js
│   ├── useFetch.js
│   ├── useCart.js
│   ├── useInput.js
│   ├── useLocalStorage.js
│   └── index.js          # Barrel export
├── pages/
│   └── Dashboard.jsx
└── App.jsx
```

### Barrel Export Pattern

```javascript
// hooks/index.js
export { useCounter } from './useCounter';
export { useFetch } from './useFetch';
export { useCart } from './useCart';
export { useInput } from './useInput';
export { useLocalStorage } from './useLocalStorage';

// Usage: import { useCart, useFetch } from '../hooks';
```

## Common Interview Questions

1. **What is a custom hook?** - A function starting with "use" that encapsulates reusable stateful logic
2. **Why use custom hooks?** - DRY principle, separation of concerns, testability, code organization
3. **Rules of hooks?** - Only call at top level, only from React components, always in same order
4. **Can custom hooks return JSX?** - No, that's component's job
5. **Difference between custom hook and component?** - Hooks handle logic, components handle UI
6. **Can hooks access component state?** - Yes, because they're called inside components
7. **How to handle async operations in hooks?** - Use useEffect with cleanup function

## Practice Exercise

Create a custom hook called `useToggle` that:
- Takes an optional initial boolean value
- Returns `value` (boolean) and `toggle` (function)
- Can also provide `setTrue` and `setFalse` functions

```javascript
// Solution
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}
```