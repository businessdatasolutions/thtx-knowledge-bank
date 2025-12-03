/**
 * Utility Function Tests
 *
 * These are compile-time and basic validation tests.
 */

import { shuffle } from '../shuffle';
import { classNames, cn } from '../classNames';

// ============================================================================
// Shuffle Tests
// ============================================================================

function testShuffle() {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffle(original);

  // Test: Array length unchanged
  console.assert(
    shuffled.length === original.length,
    'Shuffle should preserve array length'
  );

  // Test: All elements preserved
  const originalSorted = [...original].sort();
  const shuffledSorted = [...shuffled].sort();
  console.assert(
    JSON.stringify(originalSorted) === JSON.stringify(shuffledSorted),
    'Shuffle should preserve all elements'
  );

  // Test: Original array not mutated
  console.assert(
    original[0] === 1 && original[1] === 2,
    'Shuffle should not mutate original array'
  );

  // Test: Returns new array instance
  console.assert(
    shuffled !== original,
    'Shuffle should return a new array'
  );

  console.log('✅ All shuffle tests passed');
}

// ============================================================================
// ClassNames Tests
// ============================================================================

function testClassNames() {
  // Test: Basic concatenation
  const result1 = classNames('class1', 'class2', 'class3');
  console.assert(
    result1 === 'class1 class2 class3',
    'Should concatenate strings with spaces'
  );

  // Test: Filter out falsy values
  const result2 = classNames('base', false && 'active', null, undefined, 'end');
  console.assert(
    result2 === 'base end',
    'Should filter out falsy values'
  );

  // Test: Conditional classes
  const isActive = true;
  const isDisabled = false;
  const result3 = classNames('btn', isActive && 'active', isDisabled && 'disabled');
  console.assert(
    result3 === 'btn active',
    'Should handle conditional classes correctly'
  );

  // Test: Empty input
  const result4 = classNames();
  console.assert(
    result4 === '',
    'Should return empty string for no arguments'
  );

  // Test: cn alias works
  const result5 = cn('class1', 'class2');
  console.assert(
    result5 === 'class1 class2',
    'cn alias should work identically to classNames'
  );

  console.log('✅ All classNames tests passed');
}

// ============================================================================
// Run Tests
// ============================================================================

testShuffle();
testClassNames();

export { testShuffle, testClassNames };
