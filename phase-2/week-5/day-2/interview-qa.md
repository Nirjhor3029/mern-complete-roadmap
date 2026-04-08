# JSX Advanced + Conditional Rendering + Lists & Keys - Interview Q&A

## Q1: What is JSX? What are its limitations?

**Answer:**

JSX (JavaScript XML) হলো JavaScript এর মধ্যে HTML-like syntax লেখার একটি সুযোগ দেয়।

**Limitations:**

1. **Expressions Only, Not Statements**
   ```jsx
   // ❌ Won't work
   if (condition) { ... }
   for (let i=0; i<10; i++) { ... }
   
   // ✅ Use expressions
   condition && <Component />
   items.map(item => <Component />)
   ```

2. **Single Root Element**
   ```jsx
   // ❌ Wrong
   return (
     <h1>Title</h1>
     <p>Text</p>
   );
   
   // ✅ Correct
   return (
     <div>
       <h1>Title</h1>
       <p>Text</p>
     </div>
   );
   ```

3. **className Instead of class**
   ```jsx
   // ❌ Wrong
   <div class="container">...</div>
   
   // ✅ Correct
   <div className="container">...</div>
   ```

4. **CamelCase Attributes**
   ```jsx
   // ❌ Wrong
   <div onclick={handler}>...</div>
   
   // ✅ Correct
   <div onClick={handler}>...</div>
   ```

---

## Q2: Explain 3 ways to do conditional rendering in React.

**Answer:**

### 1. Ternary Operator (? : )

সবচেয়ে common approach। Condition true/false এর উপর নির্ভর করে দুটোর একটি render করে।

```jsx
const isLoggedIn = true;

{isLoggedIn ? <button>Logout</button> : <button>Login</button>}
```

**When to use:** যখন দুটো option এর মধ্যে choose করতে হবে।

### 2. Logical AND (&&)

Condition true হলে কিছে render করতে চাইলে।

```jsx
const hasUnread = true;

{hasUnread && <span className="badge">New Messages</span>}
```

**Important:** falsy values (0, false, '') render হতে পারে!
```jsx
// ❌ Wrong - renders 0
{count && <Component />}

// ✅ Correct
{count > 0 && <Component />}
```

**When to use:** যখন কিছে show/hide করতে হবে।

### 3. Function with if/else

Complex logic এর জন্য।

```jsx
function Greeting({ user, isLoading }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

**When to use:** Multiple conditions বা complex logic।

---

## Q3: Why are keys needed in lists? What happens if keys are missing?

**Answer:**

**Keys এর কাজ:**

Keys হলো unique identifiers যা React কে বলে:
1. কোন element change হয়েছে
2. কোন element add হয়েছে  
3. কোন element remove হয়েছে

এটা React এর Reconciliation process এর জন্য critical।

**Without Keys (Problems):**

```jsx
// ❌ Without keys - inefficient
const items = ['a', 'b', 'c'];
items.map(item => <li>{item}</li>)

// Problem: React has to recreate ALL elements
// Performance issues
// State bugs in complex components
// Unpredictable behavior
```

**With Keys (Benefits):**

```jsx
// ✅ With keys - efficient
const items = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' }
];
items.map(item => <li key={item.id}>{item.name}</li>)

// React knows exactly what changed
// Only updates changed elements
// Better performance
```

**What happens if key is missing:**

1. **Console Warning**: React warning দেয়
2. **Performance Issue**: DOM reconciliation inefficient হয়
3. **State Problems**: Component state may behave unexpectedly
4. **Re-rendering**: Unnecessary re-renders

---

## Q4: What is the best practice for keys in dynamic lists?

**Answer:**

### Best Practice Rules:

1. **Use Unique ID from Database**
   ```jsx
   // ✅ Best - database ID
   products.map(product => 
     <ProductCard key={product.id} {...product} />
   )
   ```

2. **Use Stable, Unique Values**
   ```jsx
   // ✅ Good - unique and stable
   <li key="unique-string-123">Content</li>
   ```

3. **Index as Last Resort**
   ```jsx
   // ⚠️ Only if list NEVER reorders
   items.map((item, index) => 
     <li key={index}>{item}</li>
   )
   ```

### Common Mistakes to Avoid:

```jsx
// ❌ Using random values - bad
items.map(item => 
  <li key={Math.random()}>{item}</li>
)

// ❌ Using index when list can change - bad  
items.map((item, index) => 
  <li key={index}>{item}</li>  // Don't do this with sortable lists!
)

// ❌ Duplicate keys - error!
items.map((item, index) => 
  <li key={index}>{item}</li>  // If items have same values
)
```

---

## Q5: How would you render a list with conditional styling?

**Answer:**

```jsx
const users = [
  { id: 1, name: "Nirjhor", age: 25 },
  { id: 2, name: "Akash", age: 28 },
  { id: 3, name: "Rohan", age: 22 }
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li 
          key={user.id}
          style={{
            backgroundColor: user.age > 25 ? '#ffe6e6' : '#ffffff',
            padding: '10px',
            border: '1px solid #ddd'
          }}
        >
          {user.name} - {user.age} years old
        </li>
      ))}
    </ul>
  );
}
```

**Explanation:**
- `key={user.id}` - unique identifier
- `user.age > 25 ? ... : ...` - ternary for conditional style
- Inline styles with object syntax

---

## Q6: How do you handle empty states in lists?

**Answer:**

```jsx
function UserList({ users }) {
  // Check if empty
  if (!users || users.length === 0) {
    return <div className="empty-state">No users found</div>;
  }
  
  // Render list
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Alternative with Logical AND:**

```jsx
function UserList({ users }) {
  return (
    <div>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Q7: Explain the difference between if/else and && in React.

**Answer:**

| Aspect | if/else | && (Logical AND) |
|--------|---------|------------------|
| **Location** | Outside JSX, in function body | Inside JSX, as expression |
| **Use Case** | Different components | Same location, show/hide |
| **Returns** | Any JSX or null | JSX or falsy value |
| **Flexibility** | More flexible | Quick conditional |

**if/else Example:**
```jsx
function Component({ user }) {
  if (!user) {
    return <div>Please login</div>;
  }
  return <div>Welcome {user.name}</div>;
}
```

**&& Example:**
```jsx
function Component({ user }) {
  return (
    <div>
      {user && <span>Welcome {user.name}</span>}
    </div>
  );
}
```

---

## Q8: How would you filter and render a list in React?

**Answer:**

```jsx
const products = [
  { id: 1, name: 'iPhone', price: 999, inStock: true },
  { id: 2, name: 'Samsung', price: 899, inStock: false },
  { id: 3, name: 'Pixel', price: 699, inStock: true }
];

function ProductList({ showInStockOnly }) {
  const filteredProducts = showInStockOnly
    ? products.filter(p => p.inStock)
    : products;
    
  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>
          {product.name} - ${product.price}
          {product.inStock ? ' ✓' : ' (Out of Stock)'}
        </li>
      ))}
    </ul>
  );
}
```

---

## Q9: What is the difference between map() and filter() in React lists?

**Answer:**

**map()** - প্রতিটি element transform করে, same number of items:
```jsx
// সব user এর name বড় করে
users.map(user => <li key={user.id}>{user.name.toUpperCase()}</li>)
```

**filter()** - condition pass করলে item রাখে, কম items হতে পারে:
```jsx
// শুধু 18+ users
users.filter(user => user.age >= 18)
```

**Combine Both:**
```jsx
// Filter first, then map
users
  .filter(user => user.age >= 18)
  .map(user => <li key={user.id}>{user.name}</li>)
```

---

## Q10: How do you render nested lists in React?

**Answer:**

```jsx
const categories = [
  {
    id: 1,
    name: 'Electronics',
    products: ['Laptop', 'Phone', 'Tablet']
  },
  {
    id: 2,
    name: 'Books',
    products: ['React Guide', 'JS Basics', 'Node.js']
  }
];

function CategoryList() {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id} className="category">
          <h3>{category.name}</h3>
          <ul>
            {category.products.map((product, index) => (
              // For nested items without IDs, use index
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

**Note:** Nested items এর জন্য index ব্যবহার করা যায় যদি list stable হয় (reorder হয় না)।

---

## Quick Revision

1. **JSX Limitations**: Expressions only, single root, className, camelCase
2. **Conditional Rendering**: Ternary (? :), &&, if/else function
3. **Keys**: Unique, stable, use database ID
4. **List Best Practice**: filter → map pattern, handle empty state
5. **Performance**: Keys make reconciliation efficient

---

## Preparation Tips

- তিনটি conditional rendering এর way মনে রাখো
- Key এর importance বুঝো
- Empty state handling practice করো
- map vs filter এর difference clear থাকতে হবে
- Code examples নিজে লিখে practice করো
