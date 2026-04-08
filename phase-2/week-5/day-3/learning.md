# Event Handling + Event Binding + Passing Arguments

## Overview

আজকের দিনে আমরা React এর সবচেয়ে practical topic নিয়ে আলোচনা করব। Event handling জানা না থাকলে button click, form submit, delete item, modal open, dropdown - কিছুই build করা যায় না। এটা React application এ user interaction এর মূল ভিত্তি।

---

## 1. React Event System Basics

### What are Events in React?

React events দেখতে HTML events এর মতোই, কিন্তু internally React একটি SyntheticEvent system ব্যবহার করে। এটা browser এর native events কে wrap করে React এর cross-browser compatibility নিশ্চিত করে।

### Defining (English)

**Event Handling** is the process of capturing user interactions (clicks, inputs, form submissions) in React components and executing appropriate functions in response.

### Explanation (Bengali)

React এ event handle করার জন্য আমাদের একটি function লাগবে যা event টা handle করবে। এই function কে JSX এ `onClick`, `onChange`, `onSubmit` এর মতো attributes এ pass করতে হবে।

### Code Example

```jsx
function App() {
  function handleClick() {
    console.log("Button clicked!");
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

### Important Concept - Function Reference vs Function Call

এখানে সবচেয়ে important বিষয় হলো: **function call না, function reference pass করতে হবে।**

```jsx
// ✅ CORRECT - Function reference
<button onClick={handleClick}>Click</button>

// ❌ WRONG - Function call (executes immediately on render)
<button onClick={handleClick()}>Click</button>
```

**Why is this wrong?** `onClick={handleClick()}` লিখলে JavaScript handleClick() function কে immediately execute করবে render সময়ে। এটা event wait করবে না, সরাসরি চলে যাবে।

---

## 2. Inline Arrow Functions

### When to Use Inline Functions?

ছোট logic হলে inline arrow function ব্যবহার করা সুবিধাজনক।

### Code Example

```jsx
function App() {
  return (
    <button onClick={() => console.log("Clicked!")}>
      Click Me
    </button>
  );
}
```

### Real-World MERN Use Case

```jsx
function ToggleSwitch({ isOn, onToggle }) {
  return (
    <button 
      onClick={() => onToggle(!isOn)}
      className={`toggle ${isOn ? 'on' : 'off'}`}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

---

## 3. Passing Arguments to Event Handlers

### The Problem

Real-world application এ প্রায়ই parameter pass করতে হয় event handler এ। যেমন কোনো user delete করতে চাইলে তার ID pass করতে হয়।

### Solution: Arrow Function Wrapper

```jsx
function App() {
  function deleteUser(id) {
    console.log("Delete user:", id);
  }

  return (
    <button onClick={() => deleteUser(101)}>
      Delete User
    </button>
  );
}
```

### Real-World Example

```jsx
function ProductList() {
  const products = [
    { id: 1, name: "iPhone", price: 999 },
    { id: 2, name: "Samsung", price: 899 },
    { id: 3, name: "Pixel", price: 699 }
  ];

  function addToCart(productId) {
    console.log("Adding to cart:", productId);
    // API call to add product to cart
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <button onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Multiple Arguments

```jsx
function handleEdit(id, name) {
  console.log(`Edit user ${id}: ${name}`);
}

<button onClick={() => handleEdit(1, "Nirjhor")}>
  Edit
</button>
```

---

## 4. Event Object (SyntheticEvent)

### What is Event Object?

React এ event handler এর parameter হিসেবে একটি event object আসে। এটা React এর SyntheticEvent, যা browser এর native event কে wrap করে।

### Code Example

```jsx
function App() {
  function handleClick(event) {
    console.log("Event:", event);
    console.log("Event Type:", event.type);
    console.log("Target Element:", event.target);
    console.log("Clicked Text:", event.target.innerText);
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

### Event Object Properties

| Property | Description |
|----------|-------------|
| `event.type` | Event এর ধরন (click, change, submit) |
| `event.target` | DOM element যেখানে event হয়েছে |
| `event.currentTarget` | Event listener যুক্ত element |
| `event.preventDefault()` | Default behavior prevent করে |
| `event.stopPropagation()` | Event propagation বন্ধ করে |

### Real-World Example

```jsx
function LinkButton({ url, children }) {
  function handleClick(event) {
    event.preventDefault();
    console.log("Navigating to:", url);
    // Custom navigation logic
  }

  return (
    <a href={url} onClick={handleClick}>
      {children}
    </a>
  );
}
```

---

## 5. Events in Loops (Closures)

### Important Concept

React এ loop এ event handler ব্যবহার করলে JavaScript closure concept কাজ করে। এটা বুঝলে React অনেক সহজ হয়ে যায়।

### Code Example

```jsx
const users = [
  { id: 1, name: "Nirjhor" },
  { id: 2, name: "Akash" },
  { id: 3, name: "Rohan" }
];

function UserList() {
  function showUser(id) {
    console.log("Selected User ID:", id);
  }

  return (
    <div>
      {users.map(user => (
        <button 
          key={user.id} 
          onClick={() => showUser(user.id)}
        >
          {user.name}
        </button>
      ))}
    </div>
  );
}
```

### How Closures Work Here

এখানে প্রতিটি button এর onclick এ একটি arrow function আছে যা `user.id` capture করে রাখে। এটাই closure - function তার surrounding scope থেকে variable ধরে রাখে।

### Real-World MERN Use Case

```jsx
function AdminDashboard() {
  const users = [
    { id: 101, name: "Nirjhor", role: "admin" },
    { id: 102, name: "Akash", role: "user" },
    { id: 103, name: "Rohan", role: "user" }
  ];

  function viewUser(userId) {
    console.log("Viewing user:", userId);
    // Navigate to user profile page
  }

  function deleteUser(userId) {
    console.log("Deleting user:", userId);
    // API call to delete user
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => viewUser(user.id)}>
                View
              </button>
              {user.role !== 'admin' && (
                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## 6. Common Mistakes to Avoid

### Mistake 1: Calling Function Immediately

```jsx
// ❌ WRONG - executes on render
<button onClick={deleteUser(5)}>Delete</button>

// ✅ CORRECT - executes on click
<button onClick={() => deleteUser(5)}>Delete</button>
```

### Mistake 2: Heavy Inline Functions

```jsx
// ❌ BAD - function recreated on every render
<button onClick={() => heavyCalculation()}>Click</button>

// ✅ GOOD - define outside or use useCallback
function handleClick() {
  heavyCalculation();
}
<button onClick={handleClick}>Click</button>
```

### Mistake 3: Forgetting Keys in Loops

```jsx
// ❌ WRONG - no key
users.map(user => <li>{user.name}</li>)

// ✅ CORRECT - with key
users.map(user => <li key={user.id}>{user.name}</li>)
```

---

## 7. Performance Considerations

### Why Inline Functions Can Be Problematic

প্রতিটি render এ নতুন function create হয়। ছোট applications এ এটা fine, কিন্তু large applications এ performance issue হতে পারে।

### Solution: Define Outside or Use useCallback

```jsx
function App() {
  // Function defined outside JSX - same reference
  function handleClick() {
    console.log("Clicked!");
  }

  return <button onClick={handleClick}>Click</button>;
}

// For props
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);
```

---

## Practice Exercises

### Task 1: Basic Click Handler

Button click করলে console এ "Hello React" log করো।

```jsx
function App() {
  function sayHello() {
    console.log("Hello React");
  }

  return <button onClick={sayHello}>Click Me</button>;
}
```

### Task 2: Multiple Buttons with Different IDs

তিনটা button বানাও: "Edit 1", "Edit 2", "Edit 3"। Click করলে respective ID log হবে।

```jsx
function EditButtons() {
  function handleEdit(id) {
    console.log("Edit ID:", id);
  }

  return (
    <div>
      <button onClick={() => handleEdit(1)}>Edit 1</button>
      <button onClick={() => handleEdit(2)}>Edit 2</button>
      <button onClick={() => handleEdit(3)}>Edit 3</button>
    </div>
  );
}
```

### Task 3: List with Click Events

Array থেকে names render করো। Click করলে selected name দেখাও।

```jsx
function NameList() {
  const names = ["Nirjhor", "Akash", "Rohan", "Riya"];

  function handleSelect(name) {
    console.log("Selected:", name);
  }

  return (
    <ul>
      {names.map((name, index) => (
        <li key={index} onClick={() => handleSelect(name)}>
          {name}
        </li>
      ))}
    </ul>
  );
}
```

### Task 4: Event Target Usage

Button এর clicked text বের করো।

```jsx
function ButtonWithText() {
  function handleClick(event) {
    console.log("Clicked:", event.target.innerText);
  }

  return (
    <button onClick={handleClick}>Submit</button>
  );
}
```

---

## Summary

আজকে শিখলাম:
- Event handling এর মূল concepts
- Function reference vs function call
- Arguments pass করার technique
- Event object এর properties
- Loop এ closures এর ব্যবহার
- Common mistakes এবং সেগুলোর সমাধান
- Performance considerations

---

## Next Day Preview

Day-4 তে শিখব:
- useState hook
- State management in React
- Re-rendering concepts
- Stale updates এবং এড়ানোর উপায়

এটা React এর সবচেয়ে important concept!