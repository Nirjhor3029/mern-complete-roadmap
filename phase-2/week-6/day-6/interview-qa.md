# Interview Q&A - Custom Hooks

## Q1: What is a Custom Hook in React?

**Answer:** A custom hook is a JavaScript function whose name starts with "use" that allows you to extract and reuse stateful logic across multiple components. It uses built-in React hooks (useState, useEffect, etc.) internally to create reusable functionality.

**Example:**
```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  // ... fetch logic
  return { data, loading };
}
```

---

## Q2: Why do custom hooks start with "use"?

**Answer:** This is a React convention (Rules of Hooks) that allows React to statically analyze code and ensure hooks are called correctly. The "use" prefix signals to React that this function follows hook rules and should be checked for proper usage.

---

## Q3: What is the difference between a custom hook and a component?

| Aspect | Custom Hook | Component |
|--------|-------------|-----------|
| Purpose | Reuse stateful logic | Reuse UI |
| Returns | Data/functions | JSX |
| Can use hooks | Yes | Yes |
| Can return JSX | No | Yes |

**Answer:** Components are for UI reuse, hooks are for logic reuse. A hook returns state and functions, while a component returns JSX.

---

## Q4: What are the Rules of Hooks?

**Answer:**
1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call hooks from React components or other custom hooks
3. Hooks must be called in the same order every render

```javascript
// ❌ WRONG
if (condition) {
  useState(); // Don't call conditionally
}

// ✅ CORRECT
const [state, setState] = useState(0); // Top level
```

---

## Q5: Can custom hooks return JSX?

**Answer:** No. Custom hooks should only return data (state, functions, objects). Returning JSX violates the separation of concerns - that's what components do.

```javascript
// ❌ WRONG
function useCard() {
  return <div>Card</div>; // Don't do this
}

// ✅ CORRECT
function useCard() {
  return { isVisible: true, toggle: () => {} };
}
```

---

## Q6: How do custom hooks help in large applications?

**Answer:** 
- **DRY Principle:** Eliminate code duplication
- **Separation of Concerns:** Logic separated from UI
- **Testability:** Test logic independently from components
- **Team Scalability:** Multiple developers can work on hooks
- **Maintainability:** Single source of truth for logic

---

## Q7: Can custom hooks access component state?

**Answer:** Yes, when a custom hook is called within a component, it has access to that component's execution context and can share state through the component that calls it.

---

## Q8: How do you handle cleanup in custom hooks?

**Answer:** Use the cleanup function in useEffect to prevent memory leaks:

```javascript
function useFetch(url) {
  useEffect(() => {
    let isMounted = true;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) setData(data);
      });

    return () => { isMounted = false; }; // Cleanup
  }, [url]);
}
```

---

## Q9: What is the difference between useMemo/useCallback and custom hooks?

**Answer:**
- `useMemo`/`useCallback`: Built-in optimization hooks for memoization
- Custom Hooks: User-defined reusable logic containers

They're complementary - you can use `useMemo` inside custom hooks for performance.

---

## Q10: How would you test a custom hook?

**Answer:** Use React Testing Library's `renderHook` or test it through a component:

```javascript
import { renderHook, act } from '@testing-library/react';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```