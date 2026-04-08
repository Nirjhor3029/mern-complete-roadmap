# Week 6, Day 3: useCallback + Stable Function References

## Today's Topic

**useCallback + Stable Function References + Memo Child Optimization**

## What You'll Learn

- Why new function references break React.memo
- How useCallback solves this
- useMemo vs useCallback
- Stale closure bugs
- When to avoid useCallback

## Quick Summary

**Problem:** New function created every render → breaks React.memo

**Solution:** `useCallback(() => {}, [deps])` - keeps function reference stable

**Gold Rule:** Memoize values with useMemo, functions with useCallback

## Practice Tasks

1. memo child + normal callback → observe re-render
2. fix with useCallback
3. todo delete callback optimize
4. stale dependency bug reproduce

## Tomorrow

**Code Splitting + lazy() + Suspense** - route-level optimization
