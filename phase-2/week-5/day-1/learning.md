# React Basics + JSX + Functional Components

## Overview

আজকের দিনে আমরা React-এর মূল ভিত্তি শিখব। React হলো Facebook দ্বারা তৈরি একটি JavaScript library যা দিয়ে interactive UI তৈরি করা হয়। এই দিনে আমরা বুঝব React কি, JSX কি এবং কিভাবে Functional Components তৈরি করতে হয়।

---

## 1. What is React?

### Definition (Interview Answer)

**React হলো একটি JavaScript library যা user interface তৈরি করতে ব্যবহৃত হয়। এটি component-based architecture অনুসরণ করে এবং virtual DOM ব্যবহার করে efficient rendering প্রদান করে।**

### Bengali Explanation

React হলো একটি tool যা দিয়ে আমরা ওয়েবসাইটের UI তৈরি করি। ধরো তুমি একটি Facebook এর মতো app বানাতে চাইছো। সেখানে অনেক component থাকবে - like button, comment box, post, profile picture ইত্যাদি। React এই component গুলোকে আলাদা আলাদা করে তৈরি করার সুযোগ দেয়।

### Key Points

- **Library, not Framework**: React শুধু UI তৈরির জন্য। Full-stack framework নয় (যেমন Angular)
- **Component-Based**: পুরো app ছোট ছোট reusable components এ ভাগ করা হয়
- **Virtual DOM**: Real DOM এর একটি virtual copy। পরিবর্তন হলে প্রথমে virtual DOM এ update হয়, তারপর optimized way এ real DOM update হয়
- **Data-Driven**: Data (props ও state) পরিবর্তন হলে UI automatically update হয়

### Real-Life Example (Bangladeshi Context)

ধরো তুমি biriyani করছো। Traditional way তে যদি তুমি একটি ingredient পরিবর্তন করো, তাহলে পুরো biriyani again বানাতে হয়। কিন্তু React এর virtual DOM তে তুমি শুধু oile বদলাও, বাকি ingredients same থাকে। এটাই React এর efficiency।

### Code Example

```jsx
// React একটি simple element তৈরি করা
import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement('h1', null, 'Hello, Nirjhor!');
ReactDOM.render(element, document.getElementById('root'));
```

### Real-World MERN Use Case

E-commerce app এ Product Card component একবার তৈরি করে অনেক product এ ব্যবহার করা যায়। প্রতিটি product এর জন্য আলাদা data pass করলে React সেটা automatically render করে।

---

## 2. JSX Explained

### Definition

**JSX হলো JavaScript XML - এটি JavaScript এর মধ্যে HTML-like syntax লেখার একটি সুযোগ দেয় যা React এর সাথে কাজ করে।**

### Bengali Explanation

JSX মানে হলো JavaScript এর মধ্যে HTML লেখা। সাধারণত HTML আলাদা থাকে, JS আলাদা। কিন্তু JSX এ আমরা একই জায়গায় দুটো লিখতে পারি। এটা code read করা সহজ করে।

### JSX Rules

1. **Single Parent**: প্রতিটি JSX element অবশ্যই একটি parent element return করবে
2. **Curly Braces {}**: JavaScript expression ব্যবহার করতে curly braces ব্যবহার করতে হবে
3. **className**: CSS এর class এর বদলে className ব্যবহার করতে হবে
4. **CamelCase**: HTML attributes camelCase এ লিখতে হবে (যেমন onClick, onChange)
5. **Inline Styles**: Object আকারে লিখতে হবে

### Code Examples

```jsx
// Basic JSX
const element = <h1>Hello, Nirjhor!</h1>;

// JS with JSX
const name = "Nirjhor";
const greeting = <h1>Hello, {name}!</h1>;

// Expression in JSX
const sum = <p>2 + 3 = {2 + 3}</p>;

// Current year
const year = <p>Current Year: {new Date().getFullYear()}</p>;

// Multiple elements - need parent wrapper
const app = (
  <div>
    <h1>My App</h1>
    <p>Welcome!</p>
  </div>
);

// className usage
const heading = <h1 className="title">Hello</h1>;

// Inline styles
const style = { 
  color: "blue", 
  fontSize: "20px",
  backgroundColor: "#f0f0f0"
};
const styledElement = <p style={style}>Styled Text</p>;
```

### Real-World MERN Use Case

Dashboard এর জন্য user এর name, role, status dynamic ভাবে দেখাতে JSX এ expression ব্যবহার করা হয়।

```jsx
const UserCard = ({ user }) => (
  <div className="user-card">
    <h2>{user.name}</h2>
    <p>Role: {user.role}</p>
    <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
  </div>
);
```

---

## 3. Functional Components

### Definition

**Functional Components হলো JavaScript functions যা JSX return করে। এগুলো modern React এর standard way এবং class components এর চেয়ে simple ও memory efficient।**

### Bengali Explanation

Functional component হলো একটি normal JavaScript function যা HTML (JSX) return করে। ধরো তুমি একটি function লিখবে যা name input নেবে আর "Hello [name]" return করবে। এটাই component।

### Why Functional Components?

- **Simpler**: Less boilerplate code
- **Hooks**: React Hooks শুধু functional components এ কাজ করে
- **Performance**: Less memory usage
- **Recommended**: React team functional components ব্যবহার করতে encouraged করে

### Code Examples

```jsx
// Basic Functional Component
function Welcome(props) {
  return <h2>Hello, {props.name}!</h2>;
}

// Arrow Function Component
const Greeting = (props) => {
  return <h1>Welcome, {props.name}!</h1>;
};

// Shorthand (implicit return)
const Welcome = props => <h2>Hello, {props.name}!</h2>;

// Using component
ReactDOM.render(
  <Welcome name="Nirjhor" />,
  document.getElementById('root')
);
```

### Props কি?

**Props হলো component এ pass করা data। এটা function এর parameter এর মতো। Props read-only - component এর মধ্যে পরিবর্তন করা যায় না।**

```jsx
// Props usage
function UserProfile(props) {
  return (
    <div>
      <h3>Name: {props.name}</h3>
      <p>Age: {props.age}</p>
      <p>City: {props.city}</p>
    </div>
  );
}

// Using with multiple props
<UserProfile name="Nirjhor" age={25} city="Dhaka" />
```

### Real-World MERN Use Case

E-commerce এ product card component তৈরি করা যায় যা product data props হিসেবে নেয়।

```jsx
const ProductCard = ({ title, price, image }) => (
  <div className="product-card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>Price: ${price}</p>
    <button>Add to Cart</button>
  </div>
);
```

---

## 4. Component Composition

### Definition

**Component Composition হলো একটি component এর মধ্যে অন্য component ব্যবহার করা। এটি code reusability বাড়ায় এবং complex UI তৈরি করতে সাহায্য করে।**

### Bengali Explanation

Composition মানে হলো component গুলোকে একসাথে জোড়া। ধরো একটি House এর মধ্যে Bedroom, Kitchen, Living Room আছে। তেমনি React এ App এর মধ্যে Header, Sidebar, Content, Footer থাকে।

### Code Examples

```jsx
// Child Components
function Header() {
  return <header><h1>My App</h1></header>;
}

function Footer() {
  return <footer><p>&copy; 2024</p></footer>;
}

function Content() {
  return <main><p>Main Content Here</p></main>;
}

// Parent Component (App) - composes children
function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

### Nested Props Passing

```jsx
// Simple greeting component
function Greeting({ name, message }) {
  return (
    <div className="greeting">
      <h2>Hello, {name}!</h2>
      <p>{message}</p>
    </div>
  );
}

// Profile component
function Profile({ age, city }) {
  return (
    <div className="profile">
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}

// Footer component
function Footer() {
  return (
    <footer>
      <p>Thanks for visiting!</p>
    </footer>
  );
}

// Main App - composes all
function App() {
  return (
    <div>
      <Greeting name="Nirjhor" message="Welcome to my app!" />
      <Greeting name="Akash" message="Good morning!" />
      <Profile age={25} city="Dhaka" />
      <Footer />
    </div>
  );
}
```

### Real-World MERN Use Case

Blog application এ PostList component এর মধ্যে multiple Post component থাকে।

```jsx
const Post = ({ title, content, author }) => (
  <article>
    <h2>{title}</h2>
    <p>{content}</p>
    <small>By: {author}</small>
  </article>
);

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post 
        key={post.id}
        title={post.title}
        content={post.content}
        author={post.author}
      />
    ))}
  </div>
);
```

---

## 5. ReactDOM.render()

### Definition

**ReactDOM.render() হলো React element কে actual HTML DOM এ render করে। এটা React এর browser এ দেখানোর entry point।**

### Bengali Explanation

ReactDOM.render() হলো সেই function যা React কে browser এ দেখায়। এটা React এর virtual DOM কে actual HTML এ convert করে।

### Code Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>Hello, World!</h1>;

ReactDOM.render(element, document.getElementById('root'));
```

### Modern React (React 18+)

```jsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello, World!</h1>);
```

---

## 6. State vs Props

### Props
- **Read-only**: Component এ পাঠানো হয়, পরিবর্তন করা যায় না
- **Passed from parent**: Parent component থেকে আসে
- **External data**: Component এর বাইরে থেকে আসে

### State
- **Mutable**: Component এর মধ্যে পরিবর্তন করা যায়
- **Internal**: Component এর নিজস্ব data
- **Triggers re-render**: State পরিবর্তন হলে component re-render হয়

### Note: State শিখব Day-2 তে

---

## Practice Exercise

নিচের practice tasks গুলো করো:

### Task 1: Greeting Component
```jsx
// Greeting component তৈরি করো যা name নেয় আর "Hello, [name]!" দেখায়
function Greeting(props) {
  // তোমার code এখানে
}
```

### Task 2: Profile Component
```jsx
// Profile component তৈরি করো যা age আর city props নেয়
function Profile(props) {
  // তোমার code এখানে
}
```

### Task 3: Component Nesting
```jsx
// App এ 2-3 component nest করো
function App() {
  // তোমার code এখানে
}
```

### Task 4: JSX Expressions
```jsx
// চেষ্টা করো: {2 + 3}, {new Date().getFullYear()}
```

---

## Summary

আজকে আমরা শিখলাম:
- React হলো UI library যা component-based architecture ব্যবহার করে
- JSX হলো JavaScript এর মধ্যে HTML-like syntax
- Functional Components হলো simple, reusable UI blocks
- Props দিয়ে component এ data pass করা হয়
- Component Composition দিয়ে complex UI তৈরি হয়
- ReactDOM.render() দিয়ে browser এ render হয়

---

## Next Day Preview

আগামীকাল (Day-2) আমরা শিখব:
- JSX Advanced - Complex JSX
- Conditional Rendering - if/else, ternary, && operator
- Lists & Keys - Array rendering, key importance
