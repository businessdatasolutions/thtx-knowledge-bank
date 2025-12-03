/**
 * Utility for conditional class name concatenation
 *
 * Filters out falsy values and joins remaining strings with spaces.
 * Useful for conditionally applying Tailwind classes.
 *
 * @param classes - Class names (strings) or falsy values to filter out
 * @returns A single string with all truthy class names joined by spaces
 *
 * @example
 * classNames('base-class', isActive && 'active', isDisabled && 'disabled')
 * // Returns: 'base-class active' if isActive is true and isDisabled is false
 *
 * @example
 * classNames(
 *   'btn',
 *   variant === 'primary' && 'bg-blue-500',
 *   variant === 'secondary' && 'bg-gray-500',
 *   size === 'lg' && 'text-lg px-6'
 * )
 */
export function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Alias for classNames - commonly used shorthand
 */
export const cn = classNames;

export default classNames;
