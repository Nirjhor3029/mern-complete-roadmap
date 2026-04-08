# Error Boundaries + Handling UI Failures Gracefully

## Overview

Today you'll learn about Error Boundaries - a critical production stability feature. When one component crashes, Error Boundaries prevent the entire app from crashing, keeping the user experience intact.

---

## The Problem: One Component Crash = Whole App Crash

In React, if any component throws an error during rendering, the entire component tree unmounts. This results in a white screen (blank page) that frustrates users.

### Code Example: The Problem

```jsx
function BuggyComponent() {
  throw new Error("Something broke!");
}

function App() {
  return (
    <div>
      <h1>Dashboard</h1>
      <BuggyComponent />
    </div>
  );
}
```

**Result:** The entire app shows a white screen or crashes completely. Users see nothing and often leave.

### Why This Happens

React's error handling model: uncaught errors → component tree unmounts → blank screen. There was no way to catch and handle errors gracefully - until Error Boundaries.

---

## What is an Error Boundary?

An Error Boundary is a React component that:
1. **Catches** JavaScript errors in its child component tree
2. **Logs** those errors for debugging
3. **Displays** a fallback UI instead of crashing

**Important:** Error Boundaries are **class components** (not functional components).

---

## How Error Boundaries Work

Error Boundaries use two lifecycle methods:

1. `static getDerivedStateFromError(error)` - Update state to show fallback
2. `componentDidCatch(error, info)` - Log the error for debugging

### Basic Error Boundary Implementation

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong 😢</h2>;
    }

    return this.props.children;
  }
}
```

### Using the Error Boundary

```jsx
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

**Result:**
- BuggyComponent throws error
- Error Boundary catches it
- Fallback UI ("Something went wrong") shown
- App continues working ✅

---

## Placement Strategy

Where you place Error Boundaries determines the user experience when things go wrong.

### 1. Page-Level

```jsx
<ErrorBoundary>
  <DashboardPage />
</ErrorBoundary>
```

**Good for:** Entire pages that can fail independently. If one page crashes, others still work.

### 2. Widget-Level

```jsx
function Dashboard() {
  return (
    <div className="dashboard">
      <ErrorBoundary>
        <RevenueChart />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <UserStats />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <RecentOrders />
      </ErrorBoundary>
    </div>
  );
}
```

**Good for:** Dashboards with multiple widgets. One widget crashing doesn't affect others.

### 3. Best Practice: Combine Both

```jsx
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary>
        <DashboardPage />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
```

---

## What Error Boundaries DO NOT Catch

Important limitations to understand:

| NOT Caught | Why | Solution |
|------------|-----|----------|
| Event handlers | Not during render | Use try/catch |
| Async errors | Not in React render | Use .catch() |
| setTimeout errors | Outside React lifecycle | Use try/catch |
| API failures | Network errors happen outside React | Handle in API calls |
| SSR errors | Server-side has different model | Framework handles |

### Example: Event Handler Error (Not Caught)

```jsx
function BuggyButton() {
  // This will NOT be caught by Error Boundary!
  return (
    <button onClick={() => {
      throw new Error("Fail!");
    }}>
      Click Me
    </button>
  );
}

// Must use try/catch instead:
<button onClick={() => {
  try {
    throw new Error("Fail!");
  } catch (e) {
    console.log(e);
  }
}}>
  Click Me
</button>
```

---

## Real-World MERN Example

### Dashboard with Multiple Widgets

```jsx
class WidgetErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="widget-fallback">
          <h3>{this.props.widgetName} unavailable</h3>
          <p>Please try again later.</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function Dashboard() {
  return (
    <div className="dashboard">
      <WidgetErrorBoundary widgetName="Revenue Chart">
        <RevenueChart />
      </WidgetErrorBoundary>
      
      <WidgetErrorBoundary widgetName="User Stats">
        <UserStats />
      </WidgetErrorBoundary>
      
      <WidgetErrorBoundary widgetName="Recent Orders">
        <RecentOrders />
      </WidgetErrorBoundary>
    </div>
  );
}
```

**Result:**
- If RevenueChart crashes → only that widget shows fallback
- User Stats and Recent Orders continue working
- User can still use the dashboard

---

## Reusable Fallback with Retry

Great UX includes a way for users to recover:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    logToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops! Something went wrong</h2>
          <p>We're working on fixing this.</p>
          <button onClick={this.handleRetry}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## Senior Engineer Mindset: Fail Small, Keep App Alive

The golden rule:

> **Fail small, keep the app alive**

This means:
- Isolate failures to individual components
- Never let one component crash take down the whole app
- Provide meaningful fallback UI
- Log errors for debugging
- Give users ways to recover

---

## Mini Project: Safe Dashboard

Build a dashboard with isolated Error Boundaries:

**Requirements:**
1. Chart widget (can be buggy)
2. Profile widget (works)
3. Analytics widget (can be buggy)
4. Error Boundary around each widget
5. Fallback UI with retry button

This demonstrates production-level error handling where one component failing doesn't affect others.
