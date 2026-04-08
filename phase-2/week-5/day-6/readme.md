# Day 6: Lifting State Up + Parent/Child Data Flow + Reusable Components

## Quick Overview

| Topic | Description |
|-------|-------------|
| **Subject** | React Component Architecture |
| **Goal** | Master state placement and data flow |
| **Key Concept** | "Where should state live?" |

---

## What You Will Learn

- ✅ Lift shared state to common parent
- ✅ Implement one-way data flow pattern
- ✅ Build reusable UI components
- ✅ Understand prop drilling problem
- ✅ Make architecture decisions

---

## Key Concepts

### 1. Lifting State Up

```
Problem: Siblings have separate states → data inconsistent
Solution: Move state to parent → single source of truth
```

### 2. One-Way Data Flow

```
Parent State → (props) → Child UI → (callback) → Parent Setter → State Updates
```

### 3. Reusable Components

```jsx
function TextInput({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}
```

---

## Code Patterns

### Shared State Pattern

```jsx
function Parent() {
  const [value, setValue] = useState("");
  
  return (
    <>
      <InputBox value={value} onChange={setValue} />
      <PreviewDisplay value={value} />
    </>
  );
}
```

### Cart Example

```jsx
function Cart() {
  const [qty, setQty] = useState(1);
  
  return (
    <div>
      <QuantityControls qty={qty} setQty={setQty} />
      <PriceDisplay total={qty * 100} />
    </div>
  );
}
```

---

## Interview Questions to Review

1. What is lifting state up?
2. When should state live in parent vs child?
3. Why is one-way data flow important?
4. What is prop drilling and how to solve?
5. How to build reusable components?

---

## Tomorrow's Topic

**Day 7: Mini Project Week**

Build a complete Blog UI with:
- State management
- Forms
- Event handling
- Components
- All concepts from Week 5

Apply everything learned this week! 🔥