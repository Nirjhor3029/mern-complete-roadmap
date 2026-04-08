# Week 6, Day 2: useMemo + Expensive Calculation Optimization

## Today's Topic

**useMemo + Expensive Calculation Optimization**

## What You'll Learn

- What problem useMemo solves
- How to cache expensive computations
- Dependency array importance
- Common mistakes
- useMemo + React.memo combo

## Quick Summary

useMemo caches computed values and only recalculates when dependencies change. This prevents expensive operations from running on every render.

**Problem:** Every render runs all code inside component - expensive calculations run unnecessarily.

**Solution:** `useMemo(() => result, [deps])` - caches result until deps change.

**Gold Rule:** Cache derived data, not source state.

## Practice Tasks

1. Heavy multiply function optimize
2. Product search filter
3. Order total reduce
4. Test without memo vs with memo logs

## Tomorrow

**useCallback** - Stable function references + memo child optimization
