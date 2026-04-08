# Week 6, Day 1: React Re-rendering + React.memo

## Today's Topic

**Re-rendering Deep Dive + React.memo**

## What You'll Learn

- What triggers re-renders in React
- Why children re-render when parent updates
- How React.memo optimizes performance
- Shallow comparison
- Performance thinking mindset

## Quick Summary

React re-renders when:
1. State changes
2. Props change
3. Parent re-renders

By default, parent re-render → all children re-render. React.memo prevents unnecessary re-renders by skipping rendering when props haven't changed.

**Key insight:** React renders by default, optimizes manually.

## Practice Tasks

1. Create Parent + Child → observe console logs
2. Wrap Child with React.memo → test again
3. Pass primitive prop → test memo behavior
4. Pass object prop → observe memo failure
5. Build counter with one memo and one non-memo child

## Tomorrow

**useMemo** - for expensive calculation optimization
