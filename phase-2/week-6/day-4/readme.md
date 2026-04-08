# Week 6, Day 4: Code Splitting + lazy() + Suspense

## Today's Topic

**Code Splitting + lazy() + Suspense**

## What You'll Learn

- Bundle size problems
- Code splitting concept
- React.lazy() for lazy loading
- Suspense for loading fallbacks
- Route-level optimization

## Quick Summary

**Problem:** All code loads at once → slow initial load

**Solution:** Code splitting divides bundle into chunks loaded on demand

**Key APIs:**
- `lazy(() => import('./Component'))` - load component when used
- `<Suspense fallback={<Loading />}>` - show while loading

**Golden Rule:** Don't load what user doesn't need yet

## Practice Tasks

1. lazy load one component
2. add button → load on click
3. add loading fallback UI
4. simulate route split

## Tomorrow

**Error Boundaries** - Handling UI failures gracefully
