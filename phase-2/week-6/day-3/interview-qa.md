# Interview Q&A: useCallback + Stable Function References

## Q1: Why does a memoized child still re-render even when wrapped with React.memo?

**Definition:** React.memo compares props shallowly. When a parent passes a callback function, a new function reference is created on every render. Even though React.memo checks for prop changes, the new reference triggers a re-render because function identity (reference) changes.

**Real-life Example:** It's like giving someone a new copy of the same recipe book every time you meet - even though the content is identical, it's a new book (new reference), so they think something changed. In React, functions are objects, so each function definition creates a new reference.

**Code Use Case:**
```jsx
function Parent() {
  // ❌ New function every render - breaks memo!
  function handleClick() {
    console.log("clicked");
  }

  return <Child onClick={handleClick} />;
}

// React.memo compares onClick === onClick
// But on every render, a new function is created
// So === returns false, triggering re-render
const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

**Real-world MERN Use Case:** In an e-commerce product grid with 50 ProductCard components wrapped in React.memo, clicking one "Add to Cart" would re-render all 50 cards because each re-render creates a new handleAddToCart function.

---

## Q2: What does useCallback cache?

**Definition:** useCallback caches the function reference itself, not the function's return value. It ensures the same function instance is returned across renders until dependencies change.

**Real-life Example:** It's like having a saved contact in your phone - you don't write a new contact every time you want to call someone. useCallback keeps the same "phone number" (function reference) until the person (dependency) changes.

**Code Use Case:**
```jsx
// Without useCallback - new reference every render
function handleClick() {
  console.log("clicked");
}

// With useCallback - same reference (unless deps change)
const handleClick = useCallback(() => {
  console.log("clicked");
}, []); // Empty deps = never changes

// Both do the same thing, but second one keeps stable reference
```

**Real-world MERN Use Case:** In a chat application, passing useCallback-stabilized handlers to message components ensures that new messages don't cause all existing message components to re-render.

---

## Q3: What is the difference between useMemo and useCallback?

**Definition:** useMemo caches a computed VALUE, while useCallback caches a FUNCTION REFERENCE. useMemo returns the result of a function, useCallback returns the function itself.

**Real-life Example:**
- useMemo: Saving the result of 2+2=4 on paper - you remember the answer
- useCallback: Keeping the same pen - you use the same tool to write, not getting a new pen each time

**Code Use Case:**
```jsx
// useMemo - caches a VALUE
const expensiveResult = useMemo(() => {
  return heavyCalculation(a, b);
}, [a, b]);

// useCallback - caches a FUNCTION
const handleClick = useCallback(() => {
  console.log(a + b);
}, [a, b]);

// They are equivalent internally:
const handleClick = useMemo(() => () => console.log(a + b), [a, b]);
```

**Real-world MERN Use Case:** Use useMemo for computed dashboard metrics, useCallback for click handlers passed to children. Both improve performance but in different ways.

---

## Q4: What is the stale closure problem with useCallback?

**Definition:** Stale closure happens when a callback captures old state values because dependencies weren't properly specified. The callback "closes over" stale data from when it was created.

**Real-life Example:** It's like writing down yesterday's score in a game scoreboard - you forgot to update it, so everyone sees old information. The callback is "stuck" with old data.

**Code Use Case:**
```jsx
// ❌ WRONG - Stale closure
const handleClick = useCallback(() => {
  console.log(count); // Always logs initial 0!
}, []); // Missing dependency!

// ✅ CORRECT - Updates when count changes
const handleClick = useCallback(() => {
  console.log(count);
}, [count]); // Recreates function when count changes
```

**Real-world MERN Use Case:** In a form with validation, if you use useCallback without proper dependencies, the validation might always check against initial empty values, never seeing what the user actually typed.

---

## Q5: When should you avoid using useCallback?

**Definition:** You should avoid useCallback when there's no actual performance benefit, when it adds unnecessary complexity, or when the overhead of memoization exceeds the cost of just re-creating the function.

**Real-life Example:** It's like using a vault to store a single sheet of paper - the security overhead isn't worth it for something so simple. Using useCallback everywhere is overkill that slows down your app with extra memory and comparison logic.

**Code Use Case:**
```jsx
// ❌ WRONG - Simple function, no child passing
function App() {
  const sayHi = useCallback(() => console.log("hi"), []);
  // Just use a regular function
  function sayHi() {
    console.log("hi");
  }

  // ❌ WRONG - Child is not memoized anyway
  function Parent() {
    const handleClick = useCallback(() => {}, []);
    return <RegularChild onClick={handleClick} />;
  }
}

// ✅ CORRECT - When passing to memoized children
function Parent() {
  const handleClick = useCallback(() => {}, []);
  return <MemoizedChild onClick={handleClick} />;
}
```

**Real-world MERN Use Case:** Don't wrap every single function in useCallback. Only use it for functions passed to expensive components or frequently re-rendering children.

---

## Q6: How do useCallback and React.memo work together?

**Definition:** React.memo prevents re-renders based on prop comparison, but it compares prop references. useCallback keeps callback props stable, allowing React.memo to work correctly. Together they form the complete optimization pattern.

**Real-life Example:** It's like a well-organized kitchen:
- useCallback: Keeps the same cutting board (function reference) in place
- React.memo: Only brings out knives (re-renders) when ingredients (props) actually change

**Code Use Case:**
```jsx
const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add</button>
    </div>
  );
});

function ProductList() {
  const [cart, setCart] = useState([]);

  // Stable reference - ProductCard won't re-render when this changes unnecessarily
  const handleAddToCart = useCallback((id) => {
    setCart(prev => [...prev, id]);
  }, []);

  return products.map(p => (
    <ProductCard
      key={p.id}
      product={p}
      onAddToCart={handleAddToCart}
    />
  ));
}
```

**Real-world MERN Use Case:** In a dashboard with many data rows, using useCallback for row actions ensures that clicking one row's edit button doesn't re-render all other rows.

---

## Q7: What happens when you pass an inline arrow function to useCallback?

**Definition:** Using an inline arrow function inside useCallback works the same way - it still memoizes the function. The inline syntax is just a different way to write the same thing.

**Real-life Example:** It's like saying "call me at this number" vs "call me at the number I gave you yesterday" - both result in the same phone call, just phrased differently.

**Code Use Case:**
```jsx
// Both are equivalent:
const handleClick1 = useCallback(() => {
  console.log("clicked");
}, []);

const handleClick2 = useCallback(
  () => console.log("clicked"),
  []
);

// With dependencies:
const handleAdd = useCallback((id) => {
  setCart(prev => [...prev, id]);
}, []);
```

**Real-world MERN Use Case:** Both forms work identically in real applications. Choose whichever is more readable for your team.

---

## Q8: Why is the dependency array in useCallback important?

**Definition:** The dependency array controls when the callback is recreated. When any dependency changes, a new function is created. Missing dependencies cause stale data; unnecessary dependencies cause excessive re-creation.

**Real-life Example:** It's like a subscription service - you should only get new deliveries (recreated callbacks) when what you ordered (dependencies) actually changes. If you forget to update your subscription, you keep getting old stuff.

**Code Use Case:**
```jsx
// Empty deps = function never changes
const stableCallback = useCallback(() => {
  console.log("never changes");
}, []);

// With deps = recreates when deps change
const dynamicCallback = useCallback((id) => {
  setItems(prev => [...prev, id]); // Uses setItems - needs stable reference
}, []); // Empty because setItems is stable from useState

// Recreates when userId changes
const fetchUser = useCallback(async () => {
  const data = await fetch(`/api/users/${userId}`);
  setUser(data);
}, [userId]); // Must include userId!
```

**Real-world MERN Use Case:** In a user profile page, the fetchUser callback should depend on userId so when viewing different users, the callback updates accordingly.

---

## Quick Recap

| Question | Key Answer |
|----------|------------|
| Why memo child re-renders? | New function reference every render |
| What does useCallback cache? | Function reference, not value |
| useMemo vs useCallback? | Caches value vs caches function |
| Stale closure problem? | Missing deps → old captured values |
| When to avoid? | Simple components, non-memo children |
| How they work together? | Stable callback + memo prop = no re-render |
