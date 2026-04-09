# Week 6: Advanced React Performance

## Overview

Week 6 covers advanced React optimization techniques that are essential for building production-ready, high-performance applications. These concepts separate junior developers from senior engineers.

---

## Summary

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | React.memo | Re-render prevention, shallow comparison |
| Day 2 | useMemo | Expensive calculation caching |
| Day 3 | useCallback | Stable function references |
| Day 4 | Lazy Loading | Code splitting, Suspense |
| Day 5 | Error Boundaries | Failure isolation |
| Day 6 | Custom Hooks | Reusable logic extraction |
| Day 7 | Project | Optimized Ecommerce Dashboard |

---

## Topic Index

### Day 1: React.memo + Re-rendering
- [Learning Material](./day-1/learning.md)
- [Interview Q&A](./day-1/interview-qa.md)
- [Resources](./day-1/resources.md)

**Key Topics:**
- What triggers re-renders in React
- Why parent re-renders cause child re-renders
- React.memo with shallow comparison
- Custom comparison functions

### Day 2: useMemo
- [Learning Material](./day-2/learning.md)
- [Interview Q&A](./day-2/interview-qa.md)
- [Resources](./day-2/resources.md)

**Key Topics:**
- Memoizing expensive calculations
- Dependency array behavior
- When NOT to use useMemo

### Day 3: useCallback
- [Learning Material](./day-3/learning.md)
- [Interview Q&A](./day-3/interview-qa.md)
- [Resources](./day-3/resources.md)

**Key Topics:**
- Function memoization
- useCallback + React.memo combination
- When to use vs useMemo

### Day 4: Code Splitting + Lazy Loading
- [Learning Material](./day-4/learning.md)
- [Interview Q&A](./day-4/interview-qa.md)
- [Resources](./day-4/resources.md)

**Key Topics:**
- React.lazy for component splitting
- Suspense for loading states
- Route-level code splitting

### Day 5: Error Boundaries
- [Learning Material](./day-5/learning.md)
- [Interview Q&A](./day-5/interview-qa.md)
- [Resources](./day-5/resources.md)

**Key Topics:**
- Class-based Error Boundaries
- componentDidCatch
- getDerivedStateFromError
- Error isolation patterns

### Day 6: Custom Hooks
- [Learning Material](./day-6/learning.md)
- [Interview Q&A](./day-6/interview-qa.md)
- [Resources](./day-6/resources.md)

**Key Topics:**
- Creating reusable hooks
- Rules of hooks
- useCart, useFetch, useInput patterns

### Day 7: Week 6 Project
- [Learning Material](./day-7/learning.md)
- [Interview Q&A](./day-7/interview-qa.md)
- [Resources](./day-7/resources.md)

**Project:** Optimized Ecommerce Dashboard integrating all Week 6 concepts

---

## Key Takeaways

1. **Memoization** - Use React.memo, useMemo, useCallback strategically
2. **Code Splitting** - Lazy load components to reduce bundle size
3. **Error Handling** - Isolate failures with Error Boundaries
4. **Logic Reuse** - Extract stateful logic into custom hooks

---

## What's Next: Week 7

**State Management + Forms + Data Fetching**
- Context API
- Redux Toolkit
- Zustand
- TanStack Query
- React Hook Form

---

## Quick Reference

```javascript
// Memoization
const MemoizedComponent = React.memo(Component, (prev, next) => {});
const cachedValue = useMemo(() => expensive(), [deps]);
const stableFn = useCallback(() => {}, [deps]);

// Code Splitting
const LazyComponent = lazy(() => import('./Component'));
<Suspense fallback={<Loading />}><LazyComponent /></Suspense>

// Error Boundary
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
}
```