// Counting Sort Algorithm
async function countingSort(visualizer) {
    visualizer.updateStatus('Starting Counting Sort...');
    
    // Find the maximum element
    const max = Math.max(...visualizer.array);
    
    // Create count array
    const count = new Array(max + 1).fill(0);
    const output = new Array(visualizer.array.length);
    
    // Store count of each element
    for (let i = 0; i < visualizer.array.length && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        count[visualizer.array[i]]++;
    }
    
    if (visualizer.shouldStop) return;
    
    // Change count[i] so that count[i] contains actual
    // position of this element in output array
    for (let i = 1; i <= max && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        count[i] += count[i - 1];
    }
    
    if (visualizer.shouldStop) return;
    
    // Build the output array
    for (let i = visualizer.array.length - 1; i >= 0 && !visualizer.shouldStop; i--) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        output[count[visualizer.array[i]] - 1] = visualizer.array[i];
        
        // Highlight element being placed
        await visualizer.highlightSwapping([i]);
    }
    
    if (visualizer.shouldStop) return;
    
    // Copy the output array to array, so that array now
    // contains sorted elements
    for (let i = 0; i < visualizer.array.length && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        visualizer.array[i] = output[i];
        
        // Update display
        visualizer.getNumberBox(i).textContent = visualizer.array[i];
        
        // Highlight sorted element
        visualizer.markSorted(i);
    }
    
    visualizer.updateStatus('Counting Sort completed!');
}