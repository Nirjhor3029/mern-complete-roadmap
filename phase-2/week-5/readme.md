# Week 5: React Core Fundamentals

## Overview

Week 5 হলো React এর foundation। এই week-এ সব fundamental concepts শিখেছো যা React developer হতে গুরুত্বপূর্ণ। এই concepts গুলো without strong understanding, advanced React অসম্ভব।

---

## Week Summary

| Topic | Description | Importance |
|-------|-------------|------------|
| **JSX** | JavaScript + HTML syntax | ⭐⭐⭐⭐⭐ |
| **Components** | Reusable UI blocks | ⭐⭐⭐⭐⭐ |
| **Props** | Data passing between components | ⭐⭐⭐⭐⭐ |
| **State** | Component's dynamic data | ⭐⭐⭐⭐⭐ |
| **Events** | User interactions | ⭐⭐⭐⭐⭐ |
| **Forms** | Controlled inputs | ⭐⭐⭐⭐⭐ |
| **Lifting State** | State architecture | ⭐⭐⭐⭐⭐ |

---

## Topic Index

### Day 1: React Basics + JSX + Functional Components
- [Learning Material](./day-1/learning.md)
- [Interview Q&A](./day-1/interview-qa.md)
- [Quick Reference](./day-1/readme.md)
- [Resources](./day-1/resources.md)

**Topics Covered:**
- What is React? (Library, Components, Virtual DOM)
- JSX syntax and rules
- Functional Components
- Props (read-only data passing)
- Component Composition
- ReactDOM.render()

---

### Day 2: JSX Advanced + Conditional Rendering + Lists & Keys
- [Learning Material](./day-2/learning.md)
- [Interview Q&A](./day-2/interview-qa.md)
- [Quick Reference](./day-2/readme.md)
- [Resources](./day-2/resources.md)

**Topics Covered:**
- Advanced JSX expressions
- Conditional Rendering (ternary, &&, if/else)
- Lists with map()
- Keys (importance, rules, unique IDs)
- Combining conditionals with lists

---

### Day 3: Event Handling + Event Binding + Arguments
- [Learning Material](./day-3/learning.md)
- [Interview Q&A](./day-3/interview-qa.md)
- [Quick Reference](./day-3/readme.md)
- [Resources](./day-3/resources.md)

**Topics Covered:**
- React Synthetic Events
- Function reference vs call
- Passing arguments to handlers
- Event object properties
- Events in loops (closures)

---

### Day 4: useState() + Re-rendering + Stale Updates
- [Learning Material](./day-4/learning.md)
- [Interview Q&A](./day-4/interview-qa.md)
- [Quick Reference](./day-4/readme.md)
- [Resources](./day-4/resources.md)

**Topics Covered:**
- Why normal variables fail
- useState() hook
- Re-rendering flow
- Stale state bug
- Functional updates (prev => ...)
- Object state with spread operator

---

### Day 5: Forms + Controlled Components + Two-Way Binding
- [Learning Material](./day-5/learning.md)
- [Interview Q&A](./day-5/interview-qa.md)
- [Quick Reference](./day-5/readme.md)
- [Resources](./day-5/resources.md)

**Topics Covered:**
- Controlled Components
- Two-way binding pattern
- Form submit with preventDefault()
- Multiple inputs with object state
- Dynamic keys with name attribute
- Spread operator for object updates

---

### Day 6: Lifting State Up + Parent/Child Data Flow + Reusable Components
- [Learning Material](./day-6/learning.md)
- [Interview Q&A](./day-6/interview-qa.md)
- [Quick Reference](./day-6/readme.md)
- [Resources](./day-6/resources.md)

**Topics Covered:**
- Lifting state up pattern
- One-way data flow
- Parent → Child (props)
- Child → Parent (callback)
- Reusable components
- Prop drilling problem

---

### Day 7: Mini Project - Blog Dashboard
- [Learning Material](./day-7/learning.md)
- [Interview Q&A](./day-7/interview-qa.md)
- [Quick Reference](./day-7/readme.md)
- [Resources](./day-7/resources.md)

**Topics Covered:**
- Complete project architecture
- Components: SearchBar, AddPostForm, PostList, PostCard, SelectedPostPreview
- Full state management in App
- CRUD operations (add, like, delete)
- Search filtering

---

## Key Concepts Summary

### Data Flow
```
┌─────────────────────────────────────────────────────┐
│                    App Component                     │
│  ┌─────────────────────────────────────────────┐    │
│  │         State (Single Source of Truth)       │    │
│  └─────────────────────────────────────────────┘    │
│                         │                            │
│                ┌────────┴────────┐                 │
│                ↓                 ↓                  │
│           Props Down       Callback Up             │
│                ↓                 ↑                  │
│     ┌──────────────┐     ┌──────────────┐          │
│     │   Children   │     │   Children   │          │
│     └──────────────┘     └──────────────┘          │
└─────────────────────────────────────────────────────┘
```

### React Rule
```
1. Props flow DOWN (parent → child)
2. State lives in the owner (common parent)
3. Callbacks flow UP (child → parent)
4. State changes trigger re-render
5. Use functional updates to avoid stale state
```

---

## Quick Code Reference

### State
```jsx
const [state, setState] = useState(initialValue);
```

### Props
```jsx
<ChildComponent data={value} onAction={handler} />
```

### List with Keys
```jsx
{arr.map(item => <Item key={item.id} />)}
```

### Controlled Input
```jsx
<input value={val} onChange={e => setVal(e.target.value)} />
```

### Functional Update
```jsx
setCount(prev => prev + 1);
```

### Lifting State Up
```jsx
// Move state to parent, pass down via props
<Parent>
  <ChildA value={state} onChange={setState} />
  <ChildB value={state} />
</Parent>
```

---

## Interview Prep Questions

### Must-Know Questions
1. What is React and why use it?
2. Difference between props and state?
3. How does conditional rendering work?
4. Why are keys important in lists?
5. What is controlled vs uncontrolled component?
6. What is lifting state up?
7. Why use functional updates?
8. How does React's one-way data flow work?

---

## Next: Week 6

**Advanced React + Performance Optimization**

- useMemo - expensive calculation caching
- useCallback - function memoization
- React.memo - component optimization
- Lazy loading + Suspense
- Error boundaries
- Performance profiling

Week 5 foundation এর উপর build করবো! 🔥

---

## Resources

- [React Official Docs](https://react.dev)
- [MERN Roadmap Reference](../mern_engineer_journey_24_week_day_by_day_roadmap.md)
- [Mentor Reference](../mentor-reference.md)