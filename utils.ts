/**
 * Throttle function execution. Throttling will ensure the function
 * will not be called again until a certain amount of time has passed.
 * If throttle is called during the throttle limit, it will execute
 * function after the limit with the most recent parameters.
 *
 * @template T The function type.
 * @param func The function to throttle.
 * @param limit The throttle limit in milliseconds.
 * @returns The throttled function.
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let shouldRunOnTimeoutEnd = false;
  let latestArgs: Parameters<T>;

  // This function will be called when the throttle timeout ends
  const runner = () => {
    if (shouldRunOnTimeoutEnd) {
      func(...latestArgs);
      shouldRunOnTimeoutEnd = false;
      timeout = setTimeout(runner, limit); // Reset the timer to handle subsequent calls
    } else {
      timeout = null;
    }
  };

  return ((...innerArgs: Parameters<T>): void => {
    latestArgs = innerArgs;
    if (timeout === null) {
      func(...latestArgs);
      timeout = setTimeout(runner, limit);
    } else {
      shouldRunOnTimeoutEnd = true;
    }
  }) as T;
}
