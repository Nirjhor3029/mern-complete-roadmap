# Day 7: Weekly Mini Project - Blog Dashboard

## Quick Overview

| Topic | Description |
|-------|-------------|
| **Subject** | Week 5 Complete Project |
| **Goal** | Apply all React fundamentals together |
| **Key Concept** | Component architecture + state management |

---

## What You Built

A complete Blog Dashboard with:

- ✅ Blog Post List (with keys!)
- ✅ Add Post Form (controlled components)
- ✅ Search/Filter (case-insensitive)
- ✅ Like Button (functional state update)
- ✅ Delete Button (filter + deselect)
- ✅ Selected Post Preview (live update)

---

## Architecture

```
App (All state here - lifting state up!)
├── SearchBar (query → props)
├── AddPostForm (onAdd → callback)
├── PostList (posts → props)
│   └── PostCard (post → props, actions → callbacks)
└── SelectedPostPreview (selectedPost → props)
```

---

## Key Code Patterns

### State in App
```jsx
const [posts, setPosts] = useState(initialPosts);
const [query, setQuery] = useState("");
const [selectedPost, setSelectedPost] = useState(null);
```

### Add Post
```jsx
setPosts((prev) => [...prev, newPost]);
```

### Like Post
```jsx
setPosts((prev) =>
  prev.map((post) =>
    post.id === id ? { ...post, likes: post.likes + 1 } : post
  )
);
```

### Delete Post
```jsx
setPosts((prev) => prev.filter((post) => post.id !== id));
```

### Filter Posts
```jsx
posts.filter((post) =>
  post.title.toLowerCase().includes(query.toLowerCase())
);
```

---

## Interview Questions to Review

1. Why all state in App component?
2. Why use functional updates?
3. Why keys matter in lists?
4. How does search filtering work?
5. Where can this be optimized later?

---

## Week 5 Complete! 🎉

**You've learned:**

| Day | Topic |
|-----|-------|
| 1 | JSX + Components |
| 2 | Props + State |
| 3 | Events + Forms |
| 4 | useState + useEffect |
| 5 | Controlled Components |
| 6 | Lifting State Up |
| 7 | Full Project |

**Next: Week 6 - Advanced React** 🔥