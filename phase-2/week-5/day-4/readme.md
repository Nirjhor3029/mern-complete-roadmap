# Day 4: useState() + Re-rendering + Stale Updates

## Today's Topic

React's core state management - useState hook, re-rendering process, and handling stale state updates.

## What You'll Learn

- Why normal variables don't trigger UI updates
- How useState() works
- The re-rendering cycle in React
- Stale state bug and how to fix it
- Functional update pattern
- Object state management with spread operator

## Key Concepts

1. **State**: Component-specific data that triggers UI updates
2. **useState**: Hook for managing state in functional components
3. **Re-render**: Process of calling component function again when state changes
4. **Stale State**: Using outdated state value in updates
5. **Functional Update**: Pattern using previous state value

## Quick Reference

```jsx
// Basic useState
const [count, setCount] = useState(0);

// Update state
setCount(count + 1);

// Functional update (fixes stale state)
setCount(prev => prev + 1);

// Object state with spread
setUser({ ...user, age: user.age + 1 });
```

## Important: Stale State Bug

```jsx
// ❌ Wrong - stale state
setCount(count + 1);
setCount(count + 1);  // uses same old count!

// ✅ Correct - functional update
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

## What's Next?

Tomorrow we'll learn about **Forms + Controlled Components + Two-way Binding** - essential for real-world applications!