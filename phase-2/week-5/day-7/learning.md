# Weekly Mini Project: Blog Dashboard + All React Fundamentals

## Overview

আজকের দিনে আমরা Week 5-এর সব concepts একসাথে apply করে একটা complete mini Blog Dashboard build করবো। এটা শুধু project না - এটা React architecture thinking-এর practice।

---

## Project Overview

### What We're Building

```
┌─────────────────────────────────────────────────────────────┐
│                    Mini Blog Dashboard                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────────────────────────────┐  │
│  │ SearchBar   │  │                                     │  │
│  └─────────────┘  │                                     │  │
│                   │                                     │  │
│  ┌─────────────┐  │       SelectedPostPreview          │  │
│  │ AddPostForm │  │                                     │  │
│  └─────────────┘  │                                     │  │
│                   └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   PostList                           │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐            │   │
│  │  │PostCard │  │PostCard │  │PostCard │            │   │
│  │  └─────────┘  └─────────┘  └─────────┘            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Features Required

1. **Blog Post List** - Display all posts with title, author, likes
2. **Add Post Form** - Create new posts with title and author
3. **Live Preview** - Show selected post details
4. **Like Button** - Increment likes on posts
5. **Search Input** - Filter posts by title

### Concepts Applied from Week 5

| Day | Concept | Used In |
|-----|---------|---------|
| Day 1 | JSX | All components |
| Day 2 | Components + Props | All components |
| Day 3 | Events + Forms | SearchBar, AddPostForm |
| Day 4 | useState | All components |
| Day 5 | Controlled Components | Forms |
| Day 6 | Lifting State Up | App component |

---

## Architecture - Component Structure

### Defining (English)

React application architecture follows a tree structure where components are split by responsibility, and state is centralized by ownership. The parent component (App) holds shared state, while child components receive data via props and communicate via callbacks.

### Explanation (Bengali)

React app structure-এ components split করা হয় responsibility অনুযায়ী। যে components একসাথে কাজ করে সেগুলো এক group-এ। Shared state সবসময় common parent-এ থাকে।

### Component Tree

```
App (Parent - Holds all state)
├── SearchBar (UI - receives query props)
├── AddPostForm (UI - receives onAdd callback)
├── PostList (Container - receives posts array)
│   └── PostCard (Presentational - receives single post)
└── SelectedPostPreview (Display - receives selected post)
```

### Data Flow

```
App State
├── posts: []        → PostList → PostCard
├── query: ""        → SearchBar
└── selectedPost    → SelectedPostPreview

Callbacks
├── setPosts         → AddPostForm, PostCard (like/delete)
├── setQuery         → SearchBar
└── setSelectedPost → PostCard
```

---

## Step-by-Step Implementation

### 1. Starter Data and Main State

```jsx
import { useState } from "react";

const initialPosts = [
  { id: 1, title: "React Basics", author: "Nirjhor", likes: 0 },
  { id: 2, title: "JS Closures", author: "Akash", likes: 2 },
  { id: 3, title: "State Management", author: "Rahim", likes: 5 }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="app">
      <SearchBar query={query} setQuery={setQuery} />
      <AddPostForm onAdd={handleAdd} />
      <div className="main-content">
        <PostList 
          posts={filteredPosts} 
          onLike={handleLike} 
          onDelete={handleDelete}
          onSelect={setSelectedPost}
        />
        <SelectedPostPreview post={selectedPost} />
      </div>
    </div>
  );
}
```

### 2. SearchBar Component

```jsx
function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        type="text"
      />
    </div>
  );
}
```

### 3. AddPostForm Component

```jsx
function AddPostForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      likes: 0
    };

    onAdd(newPost);
    setTitle("");
    setAuthor("");
  }

  return (
    <form className="add-post-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author name"
      />
      <button type="submit">Add Post</button>
    </form>
  );
}
```

### 4. PostList Component

```jsx
function PostList({ posts, onLike, onDelete, onSelect }) {
  if (posts.length === 0) {
    return <p>No posts found</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
```

### 5. PostCard Component

```jsx
function PostCard({ post, onLike, onDelete, onSelect }) {
  return (
    <div 
      className="post-card" 
      onClick={() => onSelect(post)}
    >
      <h3>{post.title}</h3>
      <p>Author: {post.author}</p>
      <p>Likes: {post.likes}</p>
      <div className="card-buttons">
        <button onClick={(e) => {
          e.stopPropagation();
          onLike(post.id);
        }}>
          ❤️ Like
        </button>
        <button onClick={(e) => {
          e.stopPropagation();
          onDelete(post.id);
        }}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
```

### 6. SelectedPostPreview Component

```jsx
function SelectedPostPreview({ post }) {
  if (!post) {
    return (
      <div className="preview empty">
        <p>👈 Click on a post to see details</p>
      </div>
    );
  }

  return (
    <div className="preview">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Likes:</strong> {post.likes}</p>
      <div className="preview-content">
        <p>This is the detailed view of the selected post. In a real application, this would contain the full post content, comments, and more interactions.</p>
      </div>
    </div>
  );
}
```

---

## Event Handlers in App Component

### 1. Add Post Handler

```jsx
function handleAdd(newPost) {
  setPosts((prevPosts) => [...prevPosts, newPost]);
}
```

**Why use functional update?**
- Ensures you have the latest state
- Prevents race conditions
- More predictable than using the variable directly

### 2. Like Handler

```jsx
function handleLike(id) {
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === id
        ? { ...post, likes: post.likes + 1 }
        : post
    )
  );
}
```

**How it works:**
- `.map()` creates a new array
- Find the post with matching ID
- Create new object with `...post` (spread)
- Update only the `likes` property
- Return unchanged posts for others

### 3. Delete Handler

```jsx
function handleDelete(id) {
  setPosts((prevPosts) => 
    prevPosts.filter((post) => post.id !== id)
  );
}
```

**How it works:**
- `.filter()` creates a new array
- Keep only posts where ID doesn't match
- Selected post gets deselected if deleted

### 4. Search Filter

```jsx
const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(query.toLowerCase())
);
```

**How it works:**
- Convert both to lowercase for case-insensitive search
- Check if title contains the search query
- Return matching posts

---

## Keys and Why They Matter

### Defining (English)

**Keys** are special string attributes that React uses to identify which items have changed, been added, or removed in a list. They help React optimize rendering by tracking elements across re-renders.

### Explanation (Bengali)

Keys হলো unique identifiers যা React কে বলে কোন item change হয়েছে। এটা ছাড়া React সঠিকভাবে DOM update করতে পারে না।

### Why Keys Are Critical Here

```jsx
// ✅ GOOD - Unique keys
{posts.map((post) => (
  <PostCard key={post.id} post={post} />
))}

// ❌ BAD - Using index
{posts.map((post, index) => (
  <PostCard key={index} post={post} />
))}
```

### Problem with Index as Key

```
Scenario: User deletes second post from a list of 3

Using index as key:
[Post A, Post B, Post C] → delete index 1
→ React thinks: Post A changed, Post B changed, Post C removed
→ Re-renders everything incorrectly!

Using ID as key:
[Post A(id:1), Post B(id:2), Post C(id:3)] → delete id:2
→ React knows exactly: Post B was removed
→ Only removes the correct element!
```

---

## Full App - Complete Code

```jsx
import { useState } from "react";

const initialPosts = [
  { id: 1, title: "React Basics", author: "Nirjhor", likes: 0 },
  { id: 2, title: "JS Closures", author: "Akash", likes: 2 },
  { id: 3, title: "State Management", author: "Rahim", likes: 5 }
];

export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  function handleAdd(newPost) {
    setPosts((prev) => [...prev, newPost]);
  }

  function handleLike(id) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }

  function handleDelete(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📝 Blog Dashboard</h1>
      
      <SearchBar query={query} setQuery={setQuery} />
      <AddPostForm onAdd={handleAdd} />
      
      <div className="main-content">
        <PostList 
          posts={filteredPosts}
          onLike={handleLike}
          onDelete={handleDelete}
          onSelect={setSelectedPost}
        />
        <SelectedPostPreview post={selectedPost} />
      </div>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search posts..."
      className="search-input"
    />
  );
}

function AddPostForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    onAdd({
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      likes: 0
    });

    setTitle("");
    setAuthor("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <button type="submit">Add Post</button>
    </form>
  );
}

function PostList({ posts, onLike, onDelete, onSelect }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function PostCard({ post, onLike, onDelete, onSelect }) {
  return (
    <div className="post-card" onClick={() => onSelect(post)}>
      <h3>{post.title}</h3>
      <p>By {post.author}</p>
      <p>❤️ {post.likes} likes</p>
      <div className="card-actions">
        <button onClick={(e) => {
          e.stopPropagation();
          onLike(post.id);
        }}>Like</button>
        <button onClick={(e) => {
          e.stopPropagation();
          onDelete(post.id);
        }}>Delete</button>
      </div>
    </div>
  );
}

function SelectedPostPreview({ post }) {
  if (!post) return <div className="preview">Select a post</div>;

  return (
    <div className="preview">
      <h2>{post.title}</h2>
      <p>Author: {post.author}</p>
      <p>Likes: {post.likes}</p>
    </div>
  );
}
```

---

## CSS Styles (Optional Enhancement)

```css
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.search-input, .add-form input {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.post-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.post-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-actions button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.preview {
  border: 2px solid #007bff;
  padding: 20px;
  border-radius: 8px;
  min-height: 200px;
}
```

---

## Common Mistakes and Fixes

### Mistake 1: Not using stopPropagation on nested events

```jsx
// ❌ WRONG - click bubbles up to parent
<button onClick={() => onLike(post.id)}>Like</button>

// ✅ CORRECT - stops click from reaching parent
<button onClick={(e) => {
  e.stopPropagation();
  onLike(post.id);
}}>Like</button>
```

### Mistake 2: Forgetting to deselect when deleting

```jsx
// ❌ WRONG - deleted post still shows in preview
function handleDelete(id) {
  setPosts((prev) => prev.filter((post) => post.id !== id));
}

// ✅ CORRECT - clear selection if deleted post was selected
function handleDelete(id) {
  setPosts((prev) => prev.filter((post) => post.id !== id));
  if (selectedPost?.id === id) {
    setSelectedPost(null);
  }
}
```

### Mistake 3: Not clearing form after submit

```jsx
// ❌ WRONG - form keeps old values
function handleSubmit(e) {
  e.preventDefault();
  onAdd(newPost);
  // No clearing!
}

// ✅ CORRECT - clear form fields
function handleSubmit(e) {
  e.preventDefault();
  onAdd(newPost);
  setTitle("");
  setAuthor("");
}
```

### Mistake 4: Not validating empty input

```jsx
// ❌ WRONG - allows empty posts
function handleSubmit(e) {
  e.preventDefault();
  onAdd({ title, author, likes: 0 });
}

// ✅ CORRECT - validate before adding
function handleSubmit(e) {
  e.preventDefault();
  if (!title.trim() || !author.trim()) {
    alert("Please fill all fields");
    return;
  }
  onAdd({ title: title.trim(), author: author.trim(), likes: 0 });
}
```

---

## Summary

আজকে শিখলাম:

- **Project Architecture** - Components split by responsibility
- **State Management** - All shared state in App component
- **Data Flow** - Props down, callbacks up
- **Event Handling** - Forms, buttons, search
- **List Rendering** - Map with unique keys
- **Data Updates** - Functional updates (map, filter)

**Key Takeaway:**

```
Components split by responsibility,
State centralized by ownership

→ This is React architecture!
```

---

## Next Week Preview

**Phase-2 / Week 6: Advanced React**

- useMemo - expensive calculations optimization
- useCallback - function memoization
- React.memo - component optimization
- Lazy loading + Suspense
- Error boundaries
- Performance profiling

এরপর তুমি mid-level React developer zone-এ ঢুকবে! 🔥