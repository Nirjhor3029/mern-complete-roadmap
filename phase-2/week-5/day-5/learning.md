# Forms + Controlled Components + Two-Way Binding

## Overview

আজকের দিনে আমরা React এর সবচেয়ে common task নিয়ে আলোচনা করবো - forms! Login, signup, search, profile edit, checkout - সব জায়গায় forms লাগে। এই topic না বুঝলে real MERN app বানানো impossible।

---

## 1. Controlled Component - The Foundation

### Defining (English)

A **Controlled Component** is a React component where the form input's value is controlled by React state. The input's value flows from state to the input field, and changes flow back from input to state - this is called "two-way binding" or "bidirectional data flow".

### Explanation (Bengali)

React এ normal HTML input এর মতো behave করে না। তুমি যদি চাও input এর value track করতে, তাহলে সেটা React state এ রাখতে হবে। Input field React control করবে - এটাই controlled component।

Traditional HTML এ input নিজে তার value track করে:

```html
<!-- Traditional HTML -->
<input type="text" />
```

React এ input React control করে:

```jsx
<!-- React Controlled -->
<input value={myValue} onChange={handleChange} />
```

### Why This Matters

```
Traditional HTML:
User types → Input handles → Value in input

React Controlled:
User types → onChange fires → State updates → Component re-renders → Input gets new value
```

এটা React এর declarative nature এর সাথে perfect match।

---

## 2. Two-Way Binding - The Core Concept

### Defining (English)

**Two-way binding** is a data flow pattern where data flows from state to UI (for display) AND from UI to state (for updates). Both directions are synchronized automatically.

### Visual Flow

```
┌─────────────────────────────────────────────────────┐
│                   React Component                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────┐       ┌──────────┐                 │
│   │  State   │ ←──── │  Input   │                 │
│   │  (name)  │       │  Field   │                 │
│   └──────────┘       └──────────┘                 │
│        ↑                   ↑                        │
│        │                   │                        │
│   Display            onChange                      │
│   Value              Event                         │
│                                                     │
└─────────────────────────────────────────────────────┘

Step 1: user types "J" → onChange fires
Step 2: setName("J") → state updates  
Step 3: component re-renders
Step 4: input shows "J" (from state)
```

### Code Example

```jsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <h2>Hello, {name}!</h2>
    </div>
  );
}
```

### Live Preview Behavior

- Type "N" → state becomes "N" → UI shows "Hello, N!"
- Type "i" → state becomes "Ni" → UI shows "Hello, Ni!"
- Type "r" → state becomes "Nir" → UI shows "Hello, Nir!"
- Type "j" → state becomes "Nirj" → UI shows "Hello, Nirj!"

এটাই React এর magic feeling ✨

---

## 3. Form Submit - Handling Data

### Defining (English)

**Form submission** in React requires preventing the default browser behavior (page reload) and handling the form data programmatically through state.

### Why preventDefault()?

Browser এর default behavior হলো form submit করলে page reload হওয়া। কিন্তু Single Page Application (SPA) এ page reload চাই না। তাই:

```jsx
function handleSubmit(e) {
  e.preventDefault();  // Stop page reload
  console.log("Form submitted!");
}
```

### Basic Login Form

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted email:", email);
    // API call to login
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Real-World MERN Example

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log("Login success:", data);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

---

## 4. Multiple Inputs - The Important Part

### The Challenge

Forms এ usually একাধিক input থাকে। প্রত্যেকটার জন্য separate state করলে code অনেক বড় হয়ে যায়:

```jsx
// ❌ Too many states - hard to manage
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
```

### The Solution - Object State with Dynamic Keys

```jsx
// ✅ One object, all inputs
const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  address: ""
});
```

### How Dynamic Keys Work

JavaScript এ object এ property access করা যায় bracket notation দিয়ে:

```jsx
const key = "name";
const value = "Nirjhor";

const obj = {
  [key]: value  // same as: name: "Nirjhor"
};

console.log(obj);  // { name: "Nirjhor" }
```

### Reusable handleChange

```jsx
function handleChange(e) {
  const { name, value } = e.target;
  
  setForm({
    ...form,           // Copy existing properties
    [name]: value      // Update only the changed field
  });
}
```

### Complete Multiple Input Form

```jsx
function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data:", form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City"
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Why Spread Operator is Critical

```jsx
// ❌ WITHOUT spread - other fields lost!
setForm({
  name: e.target.value
});
// Result: { name: "Nirjhor" }
// email, city are GONE!

// ✅ WITH spread - other fields preserved
setForm({
  ...form,
  name: e.target.value
});
// Result: { name: "Nirjhor", email: "old@email.com", city: "old city" }
```

---

## 5. Real-World MERN Examples

### Search Box (E-commerce)

```jsx
function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <p>Searching for: {query}</p>
      
      {/* Filter products based on query */}
      {products
        .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        .map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

### User Profile Edit Form

```jsx
function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: "Nirjhor",
    email: "nirjhor@example.com",
    bio: "MERN Developer",
    website: "https://nirjhor.dev"
  });

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    alert("Profile updated!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={profile.name} onChange={handleChange} />
      <input name="email" value={profile.email} onChange={handleChange} />
      <textarea name="bio" value={profile.bio} onChange={handleChange} />
      <input name="website" value={profile.website} onChange={handleChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
}
```

### Checkout Form

```jsx
function CheckoutForm() {
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: ""
  });

  function handleChange(e) {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form>
      <h3>Shipping Address</h3>
      <input
        name="fullName"
        value={shipping.fullName}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        name="address"
        value={shipping.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        name="city"
        value={shipping.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        name="zipCode"
        value={shipping.zipCode}
        onChange={handleChange}
        placeholder="ZIP Code"
      />
    </form>
  );
}
```

---

## 6. Common Mistakes

### Mistake 1: No Value Binding (Uncontrolled)

```jsx
// ❌ WRONG - uncontrolled component
<input onChange={(e) => console.log(e.target.value)} />
// No value controlled by state

// ✅ CORRECT - controlled component
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Mistake 2: Object Overwrite Bug

```jsx
// ❌ WRONG - loses other fields
function handleChange(e) {
  setForm({
    name: e.target.value  // email, city are lost!
  });
}

// ✅ CORRECT - spread preserves fields
function handleChange(e) {
  setForm({
    ...form,
    name: e.target.value
  });
}
```

### Mistake 3: Forgetting name Attribute

```jsx
// ❌ WRONG - no name attribute
<input
  value={form.name}
  onChange={handleChange}
/>
// handleChange won't know which field changed

// ✅ CORRECT - name attribute matches state key
<input
  name="name"
  value={form.name}
  onChange={handleChange}
/>
```

### Mistake 4: Not Preventing Default

```jsx
// ❌ WRONG - page will reload
function handleSubmit(e) {
  console.log(form);  // This works but page reloads!
}

// ✅ CORRECT - prevent default behavior
function handleSubmit(e) {
  e.preventDefault();
  console.log(form);  // No page reload
}
```

---

## Practice Exercises

### Task 1: Live Name Preview

```jsx
function LiveNamePreview() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <h1>Hello, {name}!</h1>
    </div>
  );
}
```

### Task 2: Email Login Form

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login email:", email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Task 3: Profile Form with Three Fields

```jsx
function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Task 4: Search Input Live Preview

```jsx
function SearchInput() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <p>Current search: "{query}"</p>
    </div>
  );
}
```

---

## Summary

আজকে শিখলাম:

- Controlled component কী - React state দিয়ে input control
- Two-way binding - state থেকে UI তে, UI থেকে state তে data flow
- Form submit - preventDefault দিয়ে page reload রোধ
- Multiple inputs - object state + dynamic keys + spread operator
- Reusable handleChange function

**সবচেয়ে important:**

```
JS object spread + dynamic keys = React forms architecture
```

এটা না বুঝলে complex forms painful হবে!

---

## Next Day Preview

Tomorrow (Day 6) তে শিখব:

- Lifting State Up
- Parent/Child Data Flow
- Reusable Components

এটা component architecture এর foundation 🔥
