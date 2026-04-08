# Free Learning Resources - Event Handling + Event Binding + Passing Arguments

## Videos

### English Tutorials
1. **React Events Tutorial**
   - Channel: Traversy Media
   - URL: https://www.youtube.com/watch?v=w7ejDZ8SWv8
   - Topics: Complete React basics including events

2. **React Event Handling**
   - Channel: Net Ninja
   - URL: https://www.youtube.com/watch?v=i9fX-6G5z6c
   - Topics: onClick, onChange, event handling

3. **React Events Deep Dive**
   - Channel: JavaScript Mastery
   - URL: https://www.youtube.com/watch?v=3e1K3zJ5_cM
   - Topics: Synthetic events, performance

4. **React Forms and Events**
   - Channel: FreeCodeCamp
   - URL: https://www.youtube.com/watch?v=Ke90Tje7VS0
   - Full React course with form handling

### Bengali Tutorials
5. **React Event Handling (Bengali)**
   - Channel: Learn With Sumit
   - URL: https://www.youtube.com/watch?v=6Dhzan7uN3k
   - Bangla tutorial on events

---

## Articles & Documentation

### Official Documentation
1. **React Docs - Responding to Events**
   - URL: https://beta.reactjs.org/learn/responding-to-events
   - Official guide on event handling

2. **React Docs - State and Events**
   - URL: https://beta.reactjs.org/learn/state-a-components-memory
   - Events with useState

### Beginner Guides
3. **Event Handling in React - W3Schools**
   - URL: https://www.w3schools.com/react/react_events.asp
   - Basic event handling examples

4. **React Events - GeeksforGeeks**
   - URL: https://www.geeksforgeeks.org/react-js-events/
   - Comprehensive guide

5. **React Synthetic Events - DigitalOcean**
   - URL: https://www.digitalocean.com/community/tutorials/react-synthetic-events
   - Deep dive into SyntheticEvent

6. **Passing Arguments to Event Handlers**
   - URL: https://www.geeksforgeeks.org/passing-arguments-to-event-handlers-in-react-js/
   - Multiple examples

### Advanced Topics
7. **React Performance - Inline Functions**
   - URL: https://medium.com/@CaiOLL/why-inline-functions-are-problematic-in-react-51f81d0534c4
   - Performance considerations

8. **Understanding Event Delegation**
   - URL: https://www.builder.io/blog/event-delegation-react
   - Advanced event handling patterns

---

## Practice Platforms

1. **CodeSandbox**
   - URL: https://codesandbox.io/
   - Practice event handling

2. **StackBlitz**
   - URL: https://stackblitz.com/
   - Browser-based React coding

3. **Scrimba - React Course**
   - URL: https://scrimba.com/learn/learnreact
   - Interactive React learning

---

## Quick Reference

### Event Handler Patterns

```jsx
// Basic click
function handleClick() {
  console.log("Clicked!");
}
<button onClick={handleClick}>Click</button>

// With argument
function handleDelete(id) {
  console.log("Delete:", id);
}
<button onClick={() => handleDelete(1)}>Delete</button>

// With event object
function handleClick(e) {
  console.log(e.target.innerText);
}
<button onClick={handleClick}>Click</button>

// With event + argument
function handleAction(id, e) {
  console.log(id, e.target);
}
<button onClick={(e) => handleAction(1, e)}>Action</button>
```

### Common Events

| Event | Use Case |
|-------|----------|
| `onClick` | Button clicks, links |
| `onChange` | Input, textarea, select |
| `onSubmit` | Form submission |
| `onMouseEnter` | Mouse hover |
| `onKeyDown` | Keyboard input |

---

## Recommended Learning Path

**Day 3:**
1. Read React Official Docs - Responding to Events
2. Watch Traversy Media React crash course (events section)
3. Practice on CodeSandbox with different event types
4. Understand SyntheticEvent behavior

**Key Focus:**
- Master function reference vs function call
- Practice passing arguments
- Understand closure in loops
- Learn performance implications