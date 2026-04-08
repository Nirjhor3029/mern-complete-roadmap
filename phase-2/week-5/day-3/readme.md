# Day 3: Event Handling + Event Binding + Passing Arguments

## Today's Topic

React event handling, event binding, and passing arguments to event handlers.

## What You'll Learn

- How to handle click events in React
- Function reference vs function call
- Passing arguments to event handlers
- Event object (SyntheticEvent)
- Closures in React loops
- Common mistakes and performance considerations

## Key Concepts

1. **Event Handler**: A function that runs when an event occurs
2. **SyntheticEvent**: React's cross-browser event wrapper
3. **Closure**: Function capturing values from surrounding scope
4. **Inline Function**: Arrow function directly in JSX

## Quick Reference

```jsx
// Correct - function reference
<button onClick={handleClick}>Click</button>

// Wrong - function call (executes on render!)
<button onClick={handleClick()}>Click</button>

// Pass argument
<button onClick={() => handleClick(id)}>Delete</button>

// Event object
function handleClick(e) {
  console.log(e.target.innerText);
}
```

## What's Next?

Tomorrow we'll learn about **useState hook** and state management in React - the heart of React!