# Day 5: Forms + Controlled Components + Two-Way Binding

## Quick Overview

| Topic | Description |
|-------|-------------|
| **Subject** | React Forms & Controlled Components |
| **Goal** | Master form handling in React |
| **Key Concept** | Two-way binding between state and inputs |

---

## What You Will Learn

- ✅ Control input fields with React state
- ✅ Handle form submissions without page reload
- ✅ Manage multiple inputs with one object state
- ✅ Build reusable form handlers
- ✅ Create real login/search/profile forms

---

## Key Concepts

### 1. Controlled Component
Input value = React state
- `value={state}` → UI reads from state
- `onChange` → state updates from UI

### 2. Two-Way Binding
```
User types → onChange fires → State updates → Component re-renders → New value shows
```

### 3. Multiple Inputs Pattern
```jsx
const [form, setForm] = useState({
  name: "",
  email: "",
  city: ""
});

function handleChange(e) {
  setForm({
    ...form,           // Copy existing
    [e.target.name]: e.target.value  // Update changed field
  });
}
```

---

## Code Patterns

### Login Form
```jsx
function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();  // Stop page reload!
    console.log(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Profile Form (Multiple Inputs)
```jsx
function ProfileForm() {
  const [form, setForm] = useState({ name: "", email: "", city: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="city" value={form.city} onChange={handleChange} />
    </form>
  );
}
```

---

## Interview Questions to Review

1. Controlled vs Uncontrolled components?
2. Why use preventDefault()?
3. How handle multiple inputs?
4. Why spread operator needed?
5. What is two-way binding?

---

## Tomorrow's Topic

**Day 6: Lifting State Up + Parent/Child Data Flow + Reusable Components**

Component architecture begins! 🔥
