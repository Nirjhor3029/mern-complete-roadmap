# Week 6, Day 5: Error Boundaries + Handling UI Failures

## Today's Topic

**Error Boundaries + Handling UI Failures Gracefully**

## What You'll Learn

- Why one component crash = whole app crash
- Error Boundary concept and implementation
- Fallback UI patterns
- Placement strategy
- What Error Boundaries don't catch

## Quick Summary

**Problem:** Component throws error → entire app white screen

**Solution:** Error Boundary (class component) catches render errors → shows fallback UI

**Implementation:**
- `getDerivedStateFromError(error)` - update state
- `componentDidCatch(error, info)` - log error
- `render()` - show fallback if error

**Golden Rule:** Fail small, keep the app alive

## What Error Boundaries Catch

- Render errors ✅
- Lifecycle errors ✅
- Child component tree errors ✅

## What NOT Caught

- Event handler errors ❌
- Async errors ❌
- setTimeout errors ❌
- API failures ❌

## Tomorrow

**Custom Hooks + Reusable Logic Extraction** - scalable React architecture
