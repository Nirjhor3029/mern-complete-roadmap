# Interview Q&A - Week 6 Project

## Q1: Where did you use React.memo and why?

**Answer:** I used React.memo on ProductCard component. This prevents unnecessary re-renders when the parent (ProductGrid) re-renders but the product data hasn't changed. With 100 products, without memo each parent re-render would cause 100 child re-renders.

```javascript
const ProductCard = React.memo(({ product, onAdd }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAdd(product)}>Add</button>
    </div>
  );
});
```

---

## Q2: Why use useMemo on filters?

**Answer:** The filter+sort operation runs on every render. With 100 products, this creates new array references every time. useMemo prevents recalculation unless products or query changes.

```javascript
const filteredProducts = useMemo(() => {
  return products
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.price - b.price);
}, [products, query]);
```

---

## Q3: Why useCallback on add/remove?

**Answer:** Without useCallback, a new function reference is created on every render. This breaks React.memo optimization because the prop changes. useCallback keeps the function stable.

```javascript
const add = useCallback((product) => {
  setCart(prev => [...prev, product]);
}, []);
```

---

## Q4: Why lazy load the cart sidebar?

**Answer:** The cart sidebar might not be needed immediately when user lands on dashboard. Lazy loading defers loading that code until needed, reducing initial bundle size and improving First Contentful Paint (FCP).

```javascript
const CartSidebar = lazy(() => import("./CartSidebar"));
```

---

## Q5: Why isolate analytics with Error Boundary?

**Answer:** If analytics widget crashes, it shouldn't break the entire dashboard. Error Boundary catches errors in that subtree and displays fallback UI, keeping the rest of the app functional.

```javascript
<ErrorBoundary>
  <AnalyticsWidget cart={cart} />
</ErrorBoundary>
```

---

## Q6: How would you optimize for 1000 products?

**Answer:**
1. Virtual scrolling (react-window) - only render visible items
2. Pagination - load products in chunks
3. Debounce search input
4. Web Workers for heavy filtering

---

## Q7: What's the difference between useMemo and useCallback?

**Answer:**
- `useMemo(value, deps)` - memoizes a computed value
- `useCallback(fn, deps)` - memoizes a function (equivalent to useMemo(() => fn, deps))

---

## Q8: When would you NOT use React.memo?

**Answer:** When:
- Component is simple (overhead > savings)
- Props change frequently anyway
- Component is a leaf node (no children to optimize)

---

## Q9: How do Error Boundaries work?

**Answer:** Error Boundaries are class components with `componentDidCatch` or static `getDerivedStateFromError`. They catch JavaScript errors in their child tree and display fallback UI.

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) return <p>Something went wrong</p>;
    return this.props.children;
  }
}
```

---

## Q10: What performance metrics would you measure?

**Answer:**
- Lighthouse score (FCP, LCP)
- Render count (React DevTools Profiler)
- Bundle size (webpack bundle analyzer)
- Time to Interactive (TTI)