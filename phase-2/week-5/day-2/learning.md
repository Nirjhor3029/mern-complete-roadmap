# JSX Advanced + Conditional Rendering + Lists & Keys

## Overview

আজকের দিনে আমরা React এর advanced JSX features, conditional rendering এবং lists with keys শিখব। এগুলো dynamic UI তৈরি করার জন্য অত্যন্ত গুরুত্বপূর্ণ। প্রায় সব real-world React application এ এই concepts প্রতিদিন ব্যবহার হয়।

---

## 1. Advanced JSX

### JSX Expressions

JSX এর মধ্যে JavaScript expressions ব্যবহার করা যায় curly braces `{}` এর মাধ্যমে।

```jsx
const user = { name: "Nirjhor", age: 21 };

const element = <h1>Hello, {user.name}, you are {user.age} years old!</h1>;
```

### What Works in JSX

```jsx
// Math expressions
<p>2 + 2 = {2 + 2}</p>

// Function calls
function formatName(user) {
  return user.name.toUpperCase();
}
const element = <h2>Hello, {formatName(user)}!</h2>

// Ternary operators
const status = <p>{age >= 18 ? 'Adult' : 'Minor'}</p>

// Array methods
const names = ['Nirjhor', 'Akash', 'Rohan'];
const list = names.map(name => <li>{name}</li>);
```

### What Does NOT Work in JSX

```jsx
// ❌ Statements don't work
if (condition) { ... }
for (loop) { ... }
switch (value) { ... }

// ✅ Use expressions instead
condition && <Component />
condition ? <True /> : <False />
```

### Real-World MERN Use Case

Dashboard এ user data dynamically render করা:

```jsx
const UserCard = ({ user }) => (
  <div className="user-card">
    <h2>{user.name}</h2>
    <p>Age: {user.age}</p>
    <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
    <p>Balance: ${user.balance.toFixed(2)}</p>
  </div>
);
```

---

## 2. Conditional Rendering

React এ conditional rendering এর তিনটি main ways আছে।

### 2.1 Ternary Operator (? : )

সবচেয়ে common approach। Condition true হলে একটা, false হলে অন্যটা দেখায়।

```jsx
const isLoggedIn = true;

const element = (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
  </div>
);
```

### Real-World Example

```jsx
function LoginButton({ isLoggedIn }) {
  return (
    <button>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
}

function UserGreeting({ user }) {
  return (
    <div>
      {user ? <p>Welcome, {user.name}!</p> : <p>Please login</p>}
    </div>
  );
}
```

### 2.2 Logical AND (&&)

কোনো condition true হলে কিছে render করতে চাইলে && ব্যবহার করা হয়।

```jsx
const showMessage = true;

const element = (
  <div>
    {showMessage && <p>This is a message</p>}
  </div>
);
```

### Real-World Example

```jsx
function Notification({ unreadCount }) {
  return (
    <div>
      {unreadCount > 0 && (
        <span className="badge">{unreadCount} new messages</span>
      )}
    </div>
  );
}

function AdminPanel({ isAdmin }) {
  return (
    <div>
      {isAdmin && <button>Delete User</button>}
    </div>
  );
}
```

### Important Note About &&

**Never put 0 or empty string as left side!**

```jsx
// ❌ Wrong - will render 0
{count && <Component />}

// ✅ Correct
{count > 0 && <Component />}
```

### 2.3 Function-based Conditional (if/else)

Component এর মধ্যে if/else ব্যবহার করতে চাইলে function এর মধ্যে লিখতে হবে।

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}
```

### Real-World Example

```jsx
function Dashboard({ user, isLoading }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <div>Please login to continue</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
}
```

### Summary: Which to Use?

| Scenario | Approach |
|----------|----------|
| Either A or B | Ternary `condition ? A : B` |
| Show/hide based on condition | Logical AND `condition && A` |
| Complex logic | Function with if/else |
| Multiple conditions | Switch or nested ternaries |

---

## 3. Rendering Lists & Keys

Array থেকে multiple elements render করার জন্য map() function ব্যবহার করা হয়।

### Basic List Rendering

```jsx
const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((num) => 
  <li key={num}>{num}</li>
);

function NumberList() {
  return <ul>{listItems}</ul>;
}
```

### Real-World Example

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
        <li key={user.id}>
          {user.name} - {user.age} years old
        </li>
      ))}
    </ul>
  );
}
```

### Keys কেন দরকার?

Keys হলো unique identifiers যা React কে বলে কোন element change হয়েছে, add হয়েছে বা remove হয়েছে। এটা performance এর জন্য critical।

```jsx
// ✅ Good - using unique id
const users = [
  { id: 101, name: "Nirjhor" },
  { id: 102, name: "Akash" }
];
const userList = users.map(user => 
  <li key={user.id}>{user.name}</li>
);

// ⚠️ Acceptable - only if list never reorders
const items = ['a', 'b', 'c'];
const list = items.map((item, index) => 
  <li key={index}>{item}</li>
);

// ❌ Bad - keys should be unique
const items = ['a', 'a', 'a']; // duplicate keys!
```

### Key Rules

1. **Unique**: প্রতিটি key sibling elements এর মধ্যে unique হতে হবে
2. **Stable**: Key পরিবর্তন হওয়া উচিত না re-render এর সময়
3. **Use ID**: Database থেকে আসা unique ID ব্যবহার করো
4. **Last Resort**: Index শুধু তখনই ব্যবহার করো যখন list কখনো reorder হয় না

### Real-World MERN Use Case

E-commerce product list:

```jsx
const products = [
  { id: 'p1', name: 'iPhone', price: 999, inStock: true },
  { id: 'p2', name: 'Samsung', price: 899, inStock: false },
  { id: 'p3', name: 'Pixel', price: 699, inStock: true }
];

function ProductList() {
  return (
    <div className="products">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>
            {product.inStock 
              ? <span className="in-stock">In Stock</span>
              : <span className="out-of-stock">Out of Stock</span>
            }
          </p>
        </div>
      ))}
    </div>
  );
}
```

---

## 4. Combining Conditional + Lists

Lists এবং conditional rendering combine করে powerful dynamic UI তৈরি করা যায়।

### Example 1: Todo List with Done Status

```jsx
const todos = [
  { id: 1, text: "Learn React", done: true },
  { id: 2, text: "Practice JS", done: false },
  { id: 3, text: "Build Project", done: false }
];

function TodoList() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.done ? <s>{todo.text}</s> : todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### Example 2: Filtered List

```jsx
const users = [
  { id: 1, name: "Nirjhor", age: 25 },
  { id: 2, name: "Akash", age: 28 },
  { id: 3, name: "Rohan", age: 22 }
];

function UserList({ minAge }) {
  return (
    <ul>
      {users
        .filter(user => user.age >= minAge)
        .map(user => (
          <li key={user.id}>{user.name} ({user.age})</li>
        ))
      }
    </ul>
  );
}

// Usage: <UserList minAge={25} />
```

### Example 3: Empty State

```jsx
function UserList({ users }) {
  if (users.length === 0) {
    return <p>No users found</p>;
  }
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Example 4: Nested Lists

```jsx
const groups = [
  {
    id: 1,
    name: "Developers",
    members: ["Nirjhor", "Akash"]
  },
  {
    id: 2,
    name: "Designers",
    members: ["Riya", "Maya"]
  }
];

function GroupList() {
  return (
    <div>
      {groups.map(group => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <ul>
            {group.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

---

## Practice Exercises

### Task 1: UserList Component
Array of objects থেকে name এবং age render করো।

### Task 2: Conditional Highlight
25 বছরের বেশি বয়সী users কে highlight করো।

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li 
          key={user.id}
          style={{ backgroundColor: user.age > 25 ? 'yellow' : 'white' }}
        >
          {user.name} - {user.age}
        </li>
      ))}
    </ul>
  );
}
```

### Task 3: Multiple Conditionals
Ternary এবং && operators ব্যবহার করে dynamic messages render করো।

### Task 4: Nested Lists
Groups → Users structure তৈরি করো।

---

## Summary

আজকে শিখলাম:
- Advanced JSX: JavaScript expressions `{}` এর মধ্যে
- Ternary Operator: `condition ? A : B`
- Logical AND: `condition && Component`
- Function-based if/else: Complex logic এর জন্য
- Lists: `array.map()` দিয়ে render
- Keys: Unique identifiers, performance এর জন্য গুরুত্বপূর্ণ
- Combining: Lists + Conditionals একসাথে ব্যবহার

---

## Next Day Preview

Day-3 তে শিখব:
- Handling Events
- Event Binding
- Passing Arguments to Event Handlers
- Form handling basics
