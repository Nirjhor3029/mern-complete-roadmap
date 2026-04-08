# Resources - Lifting State Up + Parent/Child Data Flow + Reusable Components

## Official Documentation

- [Sharing State Between Components - React Official](https://beta.reactjs.org/learn/sharing-state-between-components)
- [Passing Props to a Component - React Official](https://beta.reactjs.org/learn/passing-props-to-a-component)
- [Lifting State Up - React Official](https://react.dev/learn/lifting-state-up)

---

## Articles & Tutorials

### Beginner
- [Understanding Lifting State Up in React - Coding Architect Dev](https://codingarchitect.dev/blog/understanding-lifting-state-up-in-react/)
- [What Is Lifting State Up in React - TheLinuxCode](https://thelinuxcode.com/what-is-lifting-state-up-in-react-an-expert-guide/)
- [Essential React Pattern: Lifting State Up - Medium](https://medium.com/@tsmolarczyk/basic-react-pattern-lifting-state-up-633b5fac686c)

### Intermediate
- [React State Management in 2025 - Developer Way](https://www.developerway.com/posts/react-state-management-2025)
- [How to Lift State Up in React Applications - Medium](https://medium.com/@nitishnegi79/how-to-lift-state-up-in-react-applications-9c632d612f15)

---

## Video Tutorials

### Free Videos
- [React State: Lifting State Up - Dave Gray](https://www.youtube.com/watch?v=4aPCCZDE1g4)
- [React Parent Child Component Communication](https://www.youtube.com/watch?v=0ylD1zNdqF0)
- [Building Reusable Components in React](https://www.youtube.com/watch?v=7q4T5CrmA2w)

---

## Practice Platforms

- [Scrimba - Learn React](https://scrimba.com/learn/learnreact)
- [FreeCodeCamp - React Challenges](https://www.freecodecamp.org/learn/front-end-development-libraries/)

---

## Quick Reference

| Concept | Key Code |
|---------|----------|
| Lift state to parent | Move `useState` to common ancestor |
| Pass data down | `<Child value={state} />` |
| Pass update up | `<Child onChange={setState} />` |
| Reusable component | Accept props, return JSX |