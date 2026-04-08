# Free Learning Resources - JSX Advanced + Conditional Rendering + Lists & Keys

## Videos

### English Tutorials
1. **React Lists and Keys Tutorial**
   - Channel: Traversy Media
   - URL: https://www.youtube.com/watch?v=0s0lQY8O7j8
   - Topics: Lists, keys, mapping arrays

2. **React Conditional Rendering**
   - Channel: Net Ninja
   - URL: https://www.youtube.com/watch?v=AsT5V53kP8A
   - Topics: If/else, ternary, && operators

3. **React Crash Course (includes these topics)**
   - Channel: Traversy Media
   - URL: https://www.youtube.com/watch?v=w7ejDZ8SWv8
   - Full React basics

## Articles & Documentation

### Official Documentation
1. **React Docs - Rendering Lists**
   - URL: https://beta.reactjs.org/learn/rendering-lists
   - Official documentation on keys and lists

2. **React Docs - Conditional Rendering**
   - URL: https://beta.reactjs.org/learn/conditional-rendering
   - Official guide on if/else, &&, ternary

### Beginner Guides
3. **MDN - React Interactivity (Filtering + Conditional)**
   - URL: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_interactivity_filtering_conditional_rendering
   - Great for understanding filtering and conditional rendering

4. **Conditional Rendering Guide - DEV Community**
   - URL: https://dev.to/ahmad_mahboob/conditional-rendering-in-react-a-practical-guide-for-beginners-3i39
   - Practical beginner guide

5. **React Lists and Keys Guide**
   - URL: https://code.zeba.academy/rendering-dynamic-data-react/
   - Comprehensive list rendering guide

6. **React Lists - Best Practices**
   - URL: https://tutorial.techaltum.com/rendering-lists.html
   - map(), filter(), keys explained

## Practice Platforms

1. **CodeSandbox**
   - URL: https://codesandbox.io/
   - Practice rendering lists

2. **StackBlitz**
   - URL: https://stackblitz.com/
   - Browser-based React coding

3. **Scrimba - Learn React**
   - URL: https://scrimba.com/learn/learnreact
   - Interactive React course

## Bengali Resources

1. **Anisul Islam (JavaScript & React)**
   - YouTube: youtube.com/@anisulislam
   - Bengali tutorials

2. **Learn with Sumit**
   - YouTube: @LearnWithSumit
   - Bangla React tutorials

---

## Quick Reference

### Conditional Rendering Patterns

```jsx
// Ternary
{condition ? <A /> : <B />}

// Logical AND
{condition && <Component />}

// If/else function
function Component({ condition }) {
  if (condition) return <A />;
  return <B />;
}
```

### List Rendering Pattern

```jsx
// Basic
items.map(item => <li key={item.id}>{item.name}</li>)

// Filter + Map
items
  .filter(item => item.active)
  .map(item => <li key={item.id}>{item.name}</li>)

// With Conditional
items.map(item => (
  <li key={item.id}>
    {item.done ? <s>{item.text}</s> : item.text}
  </li>
))
```

---

## Recommended Learning Path

**Day 2:**
1. Read React Official Docs - Conditional Rendering
2. Read React Official Docs - Rendering Lists
3. Watch Traversy Media video on lists
4. Practice on CodeSandbox with examples

**Key Focus:**
- Understand when to use ternary vs &&
- Practice with keys - always add keys!
- Handle empty states
- Try filtering + mapping combinations
