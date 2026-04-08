# React Basics - Interview Q&A

## Q1: What is React? Why use it over vanilla JavaScript?

**Answer:**

React হলো Facebook দ্বারা তৈরি একটি JavaScript library যা user interface তৈরি করতে ব্যবহৃত হয়। এটি component-based architecture অনুসরণ করে।

**Vanilla JavaScript এর তুলনায় React এর সুবিধা:**

1. **Component-Based**: Code reusability বাড়ে। একবার component তৈরি করে অনেক জায়গায় ব্যবহার করা যায়।

2. **Virtual DOM**: React virtual DOM ব্যবহার করে। পরিবর্তন হলে প্রথমে virtual DOM এ update হয়, তারপর optimized way এ real DOM update হয়। এতে performance ভালো হয়।

3. **Declarative**: আমরা শুধু বলি কি দেখাতে হবে, কিভাবে দেখাতে হবে React নিজে handle করে।

4. **Data-Driven**: State বা props পরিবর্তন হলে UI automatically update হয়।

5. **Ecosystem**: Huge community, many libraries, easy to find solutions।

**Real-world Example:**
E-commerce app এ product card একবার তৈরি করে সব product এ ব্যবহার করা যায়। প্রতিটি product এর জন্য শুধু data পরিবর্তন করলেই হয়।

---

## Q2: What is JSX? Why do we need it?

**Answer:**

JSX = JavaScript XML। এটি JavaScript এর মধ্যে HTML-like syntax লেখার একটি সুযোগ দেয়।

**Why JSX?**

1. **Readable Code**: HTML এর মতো লিখতে পারি যা code read করা সহজ।

2. **Declarative**: UI কেমন দেখাবে সেটা সহজে বলতে পারি।

3. **Developer Experience**: Syntax errors সহজে ধরা যায়।

**Example:**
```jsx
// Without JSX
React.createElement('h1', null, 'Hello');

// With JSX
<h1>Hello</h1>
```

---

## Q3: What is the difference between Functional Components and Class Components?

**Answer:**

| Feature | Functional Components | Class Components |
|---------|---------------------|------------------|
| Definition | Plain JavaScript function | ES6 class extending React.Component |
| Syntax | Simple function | More verbose with render method |
| State | useState hook (after React 16.8) | this.state |
| Lifecycle | useEffect hook | componentDidMount, componentDidUpdate etc |
| Performance | Lighter, less memory | Slightly heavier |
| this keyword | No need | Required |
| Recommended | Yes (modern React) | Legacy |

**Modern Approach:**
React team functional components এবং hooks ব্যবহার করতে encouraged করে। Class components এখন legacy считается।

**Code Comparison:**

```jsx
// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Class Component (legacy)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

---

## Q4: What are Props in React?

**Answer:**

Props (Properties) হলো component এ pass করা read-only data। এটা function এর parameter এর মতো কাজ করে।

**Key Points:**

1. **Read-only**: Props পরিবর্তন করা যায় না।
2. **Passed from parent**: Parent component থেকে child component এ পাঠানো হয়।
3. **One-way data flow**: Parent → Child direction এ data flow হয়।
4. **Immutable**: Component এর মধ্যে props change করা যায় না।

**Example:**
```jsx
function UserCard({ name, age, city }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}

// Usage
<UserCard name="Nirjhor" age={25} city="Dhaka" />
```

---

## Q5: What is the difference between State and Props?

**Answer:**

| Aspect | Props | State |
|--------|-------|-------|
| Definition | Component এ pass করা data | Component এর internal data |
| Mutability | Read-only (immutable) | Mutable |
| Ownership | Parent থেকে pass হয় | Component নিজে manage করে |
| Updates | Parent update করে | Component নিজে update করে |
| Re-render | Props change হলে re-render | State change হলে re-render |

**Simple Explanation:**
- **Props**: Like function parameters - বাইরে থেকে আসে, পরিবর্তন করা যায় না
- **State**: Like local variables - component এর মধ্যে থাকে, পরিবর্তন করা যায়

**When to use what?**
- **Props**: Parent component থেকে data pass করতে
- **State**: Component এর নিজস্ব data রাখতে যা পরিবর্তন হবে

---

## Q6: Why do we need ReactDOM.render()?

**Answer:**

ReactDOM.render() হলো React element কে actual HTML DOM এ render করে। এটা React এর browser এ দেখানোর entry point।

**How it works:**

1. React তৈরি করে virtual DOM
2. ReactDOM.render() virtual DOM কে real DOM এ convert করে
3. Browser এ HTML element এ show হয়

**Example:**
```jsx
import ReactDOM from 'react-dom';

const element = <h1>Hello, World!</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

**Note:** React 18 এ নতুন approach আছে:
```jsx
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello!</h1>);
```

---

## Q7: What is Virtual DOM? How does it work?

**Answer:**

Virtual DOM হলো real DOM এর একটি lightweight JavaScript representation।

**How it works:**

1. **Create Virtual DOM**: JS objects এর মাধ্যমে DOM structure তৈরি হয়
2. **Update Virtual DOM**: Data change হলে প্রথমে virtual DOM update হয়
3. **Diffing**: আগের virtual DOM এবং নতুন virtual DOM এর পার্থক্য বের করা হয় (reconciliation)
4. **Update Real DOM**: শুধু পরিবর্তিত অংশ real DOM এ update হয়

**Benefits:**

- **Performance**: পুরো DOM re-render না করে শুধু পরিবর্তিত অংশ update হয়
- **Cross-platform**: React Native এর মতো platform এ কাজ করতে পারে
- **Efficient**: Memory efficient

**Real-world Example:**
Facebook এ post like করলে শুধু like count update হয়, পুরো page re-render হয় না। এটা Virtual DOM এর সুবিধা।

---

## Q8: What are the rules of JSX?

**Answer:**

1. **Single Parent**: Must return single parent element
   ```jsx
   // ❌ Wrong
   return (
     <h1>Hello</h1>
     <p>World</p>
   );

   // ✅ Correct
   return (
     <div>
       <h1>Hello</h1>
       <p>World</p>
     </div>
   );
   ```

2. **className instead of class**
   ```jsx
   // ❌ Wrong
   <div class="container">...</div>

   // ✅ Correct
   <div className="container">...</div>
   ```

3. **Curly braces for JS expressions**
   ```jsx
   <p>{2 + 2}</p>
   <p>{name.toUpperCase()}</p>
   <p>{isActive ? 'Yes' : 'No'}</p>
   ```

4. **CamelCase for attributes**
   ```jsx
   // ❌ Wrong
   <div onclick={handleClick}>...</div>

   // ✅ Correct
   <div onClick={handleClick}>...</div>
   <input autoFocus />
   ```

5. **Inline styles as object**
   ```jsx
   <div style={{ color: 'blue', fontSize: '20px' }}>...</div>
   ```

6. **Self-closing tags**
   ```jsx
   <img src="photo.jpg" />
   <input type="text" />
   <br />
   ```

---

## Q9: How do you pass data between components?

**Answer:**

React এ data parent থেকে child এ props এর মাধ্যমে pass হয়। এটা one-way data flow।

**Parent to Child:**
```jsx
// Parent Component
function App() {
  return <ChildComponent name="Nirjhor" age={25} />;
}

// Child Component
function ChildComponent(props) {
  return <p>{props.name} is {props.age} years old</p>;
}
```

**Real-world MERN Use Case:**
Dashboard এ user data parent থেকে child components (UserCard, UserProfile, Stats) এ pass করা হয়।

**Note:** Data child থেকে parent এ পাঠাতে callback functions ব্যবহার করা হয় (শিখব Phase-2 Week-5 Day-2 এ)।

---

## Q10: What is Component Composition?

**Answer:**

Component Composition হলো একটি component এর মধ্যে অন্য component ব্যবহার করা। এটি code reusability বাড়ায়।

**Example:**
```jsx
function Header() {
  return <header><h1>My App</h1></header>;
}

function Footer() {
  return <footer><p>&copy; 2024</p></footer>;
}

function App() {
  return (
    <div>
      <Header />
      <main>Content</main>
      <Footer />
    </div>
  );
}
```

**Benefits:**

- **Reusability**: একই component অনেক জায়গায় ব্যবহার করা যায়
- **Maintainability**: ছোট ছোট component সহজে maintain করা যায়
- **Separation of Concerns**: প্রতিটি component একটি নির্দিষ্ট কাজ করে
- **Testing**: ছোট component আলাদাভাবে test করা যায়

---

## Quick Revision Points

1. **React** = UI library, component-based, virtual DOM
2. **JSX** = JavaScript + HTML syntax
3. **Functional Component** = Simple function returning JSX
4. **Props** = Read-only data passed from parent
5. **State** = Internal mutable data (Day-2)
6. **ReactDOM.render()** = Browser এ render করে
7. **Composition** = Components inside components

---

## Preparation Tips

- প্রতিটি concept এর definition মনে রাখো
- Code examples নিজে লিখে practice করো
- Real-world use case think করো
- Props vs State এর difference clear থাকতে হবে
- Virtual DOM এর concept বুঝো
