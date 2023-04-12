type DebounceFunction<T extends any[]> = (...args: T ) => void;

function debounce<T extends any[]>(func: DebounceFunction<T>, delay: number): DebounceFunction<T> {
    let timerId: NodeJS.Timeout | null; // Stores the timer ID returned by setTimeout
  
    // The debounced function
    return function(...args: T) {
      // Clear the previous timer, if any
      if (timerId) {
        clearTimeout(timerId);
      }
  
      // Set a new timer to call the function after the specified delay
      timerId = setTimeout(() => {
        func(...args); // Call the original function with the provided arguments
      }, delay);
    };
  }

  export default debounce;