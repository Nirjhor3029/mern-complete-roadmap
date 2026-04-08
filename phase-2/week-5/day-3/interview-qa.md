# Event Handling + Event Binding + Passing Arguments - Interview Q&A

## Q1: Why do we write onClick={handleClick} and not onClick={handleClick()}?

**Answer:**

আমরা function reference pass করি, function call না। কারণ:

```jsx
// ✅ CORRECT - passes function reference
<button onClick={handleClick}>Click</button>

// ❌ WRONG - calls function immediately on render
<button onClick={handleClick()}>Click</button>
```

**Why it matters:**
- `onClick={handleClick}` বললে React শুধু reference টা store করে, click হলে execute করে
- `onClick={handleClick()}` বললে JavaScript render সময়েই function call করে ফেলে

**Real-world analogy:** 
ধরো তুমি রেস্তোরাঁতে order দিচ্ছ। "খাবার আনো" (reference) বললে wait করবে, আর "খাবার আনো" (call) বললে এখনই kitchen এ চলে যাবে।

---

## Q2: How do you pass parameters to an event handler?

**Answer:**

Arrow function এর মাধ্যমে parameter pass করা হয়:

```jsx
function deleteUser(id) {
  console.log("Delete:", id);
}

// ✅ Use arrow function wrapper
<button onClick={() => deleteUser(101)}>Delete</button>

// ❌ Can't do this - function executes immediately
<button onClick={deleteUser(101)}>Delete</button>
```

**Multiple parameters:**

```jsx
function handleAction(action, id, name) {
  console.log(`${action} user ${id}: ${name}`);
}

<button onClick={() => handleAction('edit', 1, 'Nirjhor')}>
  Edit
</button>
```

---

## Q3: What is SyntheticEvent in React?

**Answer:**

SyntheticEvent হলো React এর cross-browser event wrapper। এটা browser এর native events কে normalize করে যাতে সব browser এ same API কাজ করে।

```jsx
function handleClick(event) {
  // This is SyntheticEvent, not native browser event
  console.log(event.type);        // "click"
  console.log(event.target);      // DOM element
  console.log(event.preventDefault()); // Prevent default
  console.log(event.stopPropagation()); // Stop bubbling
}
```

**Why SyntheticEvent?**
1. **Cross-browser compatibility** - সব browser এ same behavior
2. **Performance** - Event pooling through করে
3. **Consistency** - Same API সব events এর জন্য

**Key difference from native events:**
```jsx
function handleClick(e) {
  // Native event
  console.log(e.nativeEvent); 
  
  // Synthetic event
  console.log(e.target);
}
```

---

## Q4: What are the pros and cons of inline arrow functions in onClick?

**Answer:**

**Pros:**
- ✅ সহজ এবং readable ছোট logic এর জন্য
- ✅ কোনো external function না লিখেই কাজ হয়
- ✅ Parameter pass করা সহজ

**Cons:**
- ❌ প্রতিটি render এ নতুন function create হয়
- ❌ Child components unnecessary re-render হতে পারে (যদি props হিসেবে pass করা হয়)
- ❌ Large applications এ performance issue

```jsx
// Small logic - OK
<button onClick={() => setCount(c => c + 1)}>+</button>

// Large logic - Better to define outside
function handleHeavyAction() {
  bigCalculation();
  fetchData();
  updateState();
}
<button onClick={handleHeavyAction}>Process</button>
```

---

## Q5: Why do closures matter in React event handlers inside loops?

**Answer:**

Loop এ event handlers এ closures অত্যন্ত important। JavaScript closure এর মাধ্যমে প্রতিটি function তার own `user.id` value ধরে রাখে।

```jsx
const users = [
  { id: 1, name: "Nirjhor" },
  { id: 2, name: "Akash" }
];

function UserList() {
  function showUser(id) {
    console.log("Clicked:", id);
  }

  return (
    <div>
      {users.map(user => (
        // Each button has its own closure with user.id
        <button 
          key={user.id} 
          onClick={() => showUser(user.id)}
        >
          {user.name}
        </button>
      ))}
    </div>
  );
}
```

**Without closure (Wrong):**
```jsx
// ❌ WRONG - all buttons will show last id
let id;  // outer variable
users.map(user => {
  id = user.id;
  return <button onClick={() => console.log(id)}>{user.name}</button>
});
```

**Why this works:**
- Arrow function creates closure over `user.id`
- Each iteration gets its own copy of the parameter
- When clicked, it uses the captured value, not current value

---

## Q6: What is the difference between event.target and event.currentTarget?

**Answer:**

```jsx
function handleClick(event) {
  console.log(event.target);      // The actual clicked element
  console.log(event.currentTarget); // The element with the listener
}
```

**Example:**
```jsx
function OuterComponent() {
  function handleClick(e) {
    console.log("target:", e.target.innerText);      // "Inner Button"
    console.log("currentTarget:", e.currentTarget.innerText); // "Outer Div"
  }

  return (
    <div onClick={handleClick}>
      <button>Inner Button</button>
    </div>
  );
}
```

**When to use:**
- `event.target` - clicked element এর info লাগলে
- `event.currentTarget` - listener যুক্ত element এর info লাগলে

---

## Q7: How would you prevent default form submission behavior?

**Answer:**

```jsx
function MyForm() {
  function handleSubmit(event) {
    event.preventDefault();  // Stop page reload
    console.log("Form submitted!");
    // Do API call
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Common uses:**
- Prevent page reload on form submit
- Prevent anchor tag navigation
- Prevent browser default behavior

---

## Q8: What are common performance mistakes with event handlers?

**Answer:**

### 1. Inline function in props causing re-renders
```jsx
// ❌ Bad - new function every render
<ChildComponent onClick={() => handleClick(id)} />

// ✅ Good - stable reference
<ChildComponent onClick={handleClick} />
```

### 2. Not using useCallback for callbacks
```jsx
// For complex apps, use useCallback
const handleClick = useCallback((id) => {
  console.log(id);
}, []);
```

### 3. Heavy computation in event handler
```jsx
// ❌ Bad
<button onClick={() => heavyFunction()}>

// ✅ Good - move to handler function
function handleClick() {
  heavyFunction();
}
<button onClick={handleClick}>
```

---

## Q9: How do you handle multiple event types in one component?

**Answer:**

```jsx
function InteractiveComponent() {
  function handleClick() {
    console.log("Clicked!");
  }

  function handleMouseEnter() {
    console.log("Mouse entered!");
  }

  function handleKeyDown(event) {
    console.log("Key pressed:", event.key);
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      Interact with me
    </div>
  );
}
```

---

## Q10: How do you attach event listeners to dynamically added elements?

**Answer:**

React এ dynamically added elements এর জন্য event listener attach করতে হলে useEffect ব্যবহার করতে হয়:

```jsx
function DynamicList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Event delegation - attach to parent
    const parent = document.getElementById('list-container');
    
    const handleClick = (e) => {
      if (e.target.matches('.item')) {
        console.log("Clicked:", e.target.dataset.id);
      }
    };

    parent.addEventListener('click', handleClick);
    
    return () => parent.removeEventListener('click', handleClick);
  }, []);

  return (
    <div id="list-container">
      {items.map(item => (
        <div key={item.id} className="item" data-id={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

**Alternative (preferred):** Direct event binding on elements:
```jsx
function List() {
  function handleClick(id) {
    console.log(id);
  }

  return (
    <div>
      {items.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

---

## Quick Revision

1. **`onClick={fn}` not `onClick={fn()}`** - Reference, not call
2. **Pass arguments** with arrow function: `onClick={() => fn(arg)}`
3. **SyntheticEvent** - React's cross-browser wrapper
4. **Inline functions** - Good for small, bad for heavy
5. **Closures in loops** - Each iteration gets own value
6. **`event.target`** vs `event.currentTarget` - clicked vs listener element

---

## Preparation Tips

- Practice passing different types of arguments
- Understand SyntheticEvent vs native event
- Be ready to explain closure in React context
- Know when to use inline vs external functions
- Understand event delegation patterns