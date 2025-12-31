// Radix Sort Algorithm
async function radixSort(visualizer) {
    visualizer.updateStatus('Starting Radix Sort...');
    
    // Find the maximum number to know number of digits
    const max = Math.max(...visualizer.array);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0 && !visualizer.shouldStop; exp *= 10) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        await countingSortForRadix(visualizer, exp);
        visualizer.updateStatus(`Sorted by digit at position: ${Math.log10(exp) + 1}`);
    }
    
    // Mark all as sorted
    for (let i = 0; i < visualizer.array.length; i++) {
        visualizer.markSorted(i);
    }
    
    visualizer.updateStatus('Radix Sort completed!');
}

// Counting sort for Radix Sort (by specific digit)
async function countingSortForRadix(visualizer, exp) {
    const n = visualizer.array.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences of each digit
    for (let i = 0; i < n && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        const digit = Math.floor(visualizer.array[i] / exp) % 10;
        count[digit]++;
    }
    
    if (visualizer.shouldStop) return;
    
    // Change count[i] so that count[i] contains actual
    // position of this digit in output array
    for (let i = 1; i < 10 && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        count[i] += count[i - 1];
    }
    
    if (visualizer.shouldStop) return;
    
    // Build the output array
    for (let i = n - 1; i >= 0 && !visualizer.shouldStop; i--) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        const digit = Math.floor(visualizer.array[i] / exp) % 10;
        output[count[digit] - 1] = visualizer.array[i];
        
        // Highlight element being placed
        await visualizer.highlightSwapping([i]);
    }
    
    if (visualizer.shouldStop) return;
    
    // Copy the output array to array
    for (let i = 0; i < n && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        visualizer.array[i] = output[i];
        
        // Update display
        visualizer.getNumberBox(i).textContent = visualizer.array[i];
    }
}