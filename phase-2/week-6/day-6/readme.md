# Day 6: Custom Hooks + Reusable Logic Extraction

## Quick Overview

Custom Hooks allow you to extract and reuse stateful logic across components. This is the key to building scalable, maintainable React applications.

## Key Concepts

| Concept | Description |
|---------|-------------|
| Custom Hook | Function starting with "use" that encapsulates reusable logic |
| Logic Reuse | Extract stateful logic separate from UI |
| Separation of Concerns | Hooks handle logic, components handle UI |

## Today's Goals

- [x] Understand what custom hooks are
- [x] Learn why hooks start with "use"
- [x] Build useCounter, useInput, useFetch, useCart hooks
- [x] Follow the Rules of Hooks
- [x] Organize hooks in scalable folder structure

## Code Snippets

### useCounter
```javascript
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}
```

### useFetch
```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url).then(res => res.json())
      .then(json => { setData(json); setLoading(false); });
  }, [url]);
  
  return { data, loading };
}
```

## Rules to Remember

✅ **Do:**
- Prefix with "use"
- Call at top level
- Return meaningful data

❌ **Don't:**
- Call conditionally
- Return JSX
- Call from regular functions

## Tomorrow

**Day 7:** Weekly Advanced React Project → Optimized Ecommerce Dashboard - Apply all week 6 concepts!