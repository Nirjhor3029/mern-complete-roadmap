// Call Stack - LIFO (Last In, First Out) structure
// Tracks which function is currently executing

console.log("=== CALL STACK EXAMPLES ===\n");

// ─────────────────────────────────────────────────────────────────────────
// 1. Simple call stack
// ─────────────────────────────────────────────────────────────────────────
console.log("1. Simple stack:");

function first() {
  console.log("   first() starts");
  console.log("   first() ends");
}

function second() {
  console.log("   second() called");
  first();
  console.log("   second() finished");
}

second();

// Stack flow:
// [GEC]
// [second, GEC]
// [first, second, GEC]  ← first pops, then second

// ─────────────────────────────────────────────────────────────────────────
// 2. Three level stack
// ─────────────────────────────────────────────────────────────────────────
console.log("\n2. Three level stack:");

function A() {
  console.log("   A starts");
  B();
  console.log("   A ends");
}

function B() {
  console.log("   B starts");
  C();
  console.log("   B ends");
}

function C() {
  console.log("   C running");
}

A();

// Stack: A → B → C → pop → pop → pop

// ─────────────────────────────────────────────────────────────────────────
// 3. Visual call stack representation
// ─────────────────────────────────────────────────────────────────────────
console.log("\n3. Visual stack trace:");

function step1() {
  console.log("   [Stack] step1");
}

function step2() {
  console.log("   [Stack] step2");
  step1();
  console.log("   [Stack] step2 done");
}

function step3() {
  console.log("   [Stack] step3");
  step2();
  console.log("   [Stack] step3 done");
}

step3();

// Output shows the LIFO nature:
// step3 → step2 → step1 → step1 done → step2 done → step3 done

// ─────────────────────────────────────────────────────────────────────────
// 4. With return values
// ─────────────────────────────────────────────────────────────────────────
console.log("\n4. Return values in stack:");

function multiply(a, b) {
  return a * b;
}

function add(a, b) {
  return a + b;
}

function calculate() {
  const sum = add(5, 3);
  const product = multiply(sum, 2);
  return product;
}

const result = calculate();
console.log("   Result:", result);

// Stack: calculate → add → pop → multiply → pop → calculate → result = 16

// ─────────────────────────────────────────────────────────────────────────
// 5. Recursion stack overflow
// ─────────────────────────────────────────────────────────────────────────
console.log("\n5. Stack overflow demo (limited):");

function recursive(n) {
  if (n > 3) {
    console.log("   Stack limit reached at n =", n);
    return;
  }
  console.log("   n =", n);
  recursive(n + 1);
}

recursive(1);
// Shows how stack builds up and unwinds

console.log("\n✅ Call Stack examples complete");
