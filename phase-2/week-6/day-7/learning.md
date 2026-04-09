# Week 6 Project: Optimized Ecommerce Dashboard

## Project Overview

Build an optimized ecommerce dashboard that demonstrates all Week 6 performance concepts in a real application.

## Architecture

```
src/
├── components/
│   ├── ProductGrid.jsx
│   ├── ProductCard.jsx      # React.memo
│   ├── SearchBar.jsx
│   ├── CategoryFilter.jsx
│   ├── CartSidebar.jsx       # Lazy loaded
│   ├── AnalyticsWidget.jsx  # Error isolated
│   └── ErrorBoundary.jsx
├── hooks/
│   ├── useCart.js            # useCallback
│   ├── useProducts.js
│   └── useSearch.js          # useMemo
└── pages/
    └── Dashboard.jsx
```

## Key Performance Patterns

### 1. Memoized Product Cards
```javascript
const ProductCard = React.memo(({ product, onAdd }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAdd(product)}>Add</button>
    </div>
  );
});
```

### 2. Memoized Search & Filter
```javascript
const filteredProducts = useMemo(() => {
  return products
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.price - b.price);
}, [products, query]);
```

### 3. Stable Callbacks with useCallback
```javascript
const handleAdd = useCallback((product) => {
  add(product);
}, [add]);
```

### 4. Lazy Loading
```javascript
const CartSidebar = lazy(() => import("./CartSidebar"));

<Suspense fallback={<p>Loading cart...</p>}>
  <CartSidebar />
</Suspense>
```

### 5. Error Boundary Isolation
```javascript
<ErrorBoundary>
  <AnalyticsWidget cart={cart} />
</ErrorBoundary>
```

## Requirements

- 100 fake products
- Memoized ProductCard components
- Search with memoized filter
- Category filter
- Price sorting
- Cart sidebar (lazy loaded)
- Analytics widget (error isolated)
- Custom hooks: useCart, useSearch, useProducts

## Key Metrics to Track

1. **Render Count** - Log in ProductCard to see memo working
2. **Bundle Size** - Lazy loading reduces initial bundle
3. **Error Isolation** - Widget crash shouldn't break dashboard