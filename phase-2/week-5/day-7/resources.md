# Resources - Week 5 Project: Blog Dashboard

## Official Documentation

- [React Quick Start - react.dev](https://react.dev/learn)
- [Thinking in React - React Official](https://beta.reactjs.org/learn/thinking-in-react)
- [Describing the UI - React Official](https://beta.reactjs.org/learn/describing-the-ui)

---

## Week 5 Review Resources

### Day 1: JSX + Components
- [Your First Component - React Docs](https://beta.reactjs.org/learn/your-first-component)

### Day 2: Props + State
- [Passing Props to a Component](https://beta.reactjs.org/learn/passing-props-to-a-component)
- [State: A Component's Memory](https://beta.reactjs.org/learn/state-a-components-memory)

### Day 3: Events + Forms
- [Responding to Events](https://beta.reactjs.org/learn/responding-to-events)

### Day 4: useState + useEffect
- [useState Hook](https://beta.reactjs.org/reference/useState)
- [useEffect Hook](https://beta.reactjs.org/reference/useEffect)

### Day 5: Controlled Components
- [Forms](https://beta.reactjs.org/learn/forms)

### Day 6: Lifting State Up
- [Sharing State Between Components](https://beta.reactjs.org/learn/sharing-state-between-components)

---

## Project Building Resources

### Beginner Projects
- [Build a Todo App in React - FreeCodeCamp](https://www.freecodecamp.org/news/build-a-todo-app-in-react/)
- [React Todo List Tutorial - Traversy Media](https://www.youtube.com/watch?v=pQwPz3iNHmM)

### Practice Platforms
- [Scrimba - Interactive React](https://scrimba.com/learn/learnreact)
- [React Exercises - FreeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/#react)

---

## Quick Reference - Week 5

| Concept | Key Pattern |
|---------|-------------|
| Component | `function Component() { return <div>...</div> }` |
| Props | `<Child data={value} />` |
| State | `const [state, setState] = useState(initial)` |
| Event | `onClick={() => handler()}` |
| Form | `value={val} onChange={e => setVal(e.target.value)}` |
| List | `{arr.map(item => <Item key={item.id} />)}` |
| Lift State | Move state to common parent |
| Filter | `arr.filter(item => item.prop.includes(search))` |

---

## Next: Week 6 Preview

- **useMemo** - Expensive calculation optimization
- **useCallback** - Function memoization
- **React.memo** - Component optimization
- **Performance** - Rendering optimization

Build upon this foundation! 🔥