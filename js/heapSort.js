// Heap Sort Algorithm
async function heapSort(visualizer) {
    visualizer.updateStatus('Starting Heap Sort...');
    const n = visualizer.array.length;
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0 && !visualizer.shouldStop; i--) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        await heapify(visualizer, n, i);
    }
    
    if (visualizer.shouldStop) return;
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0 && !visualizer.shouldStop; i--) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        // Move current root to end
        // Highlight elements being swapped
        await visualizer.highlightSwapping([0, i]);
        
        [visualizer.array[0], visualizer.array[i]] = [visualizer.array[i], visualizer.array[0]];
        
        // Update display
        visualizer.getNumberBox(0).textContent = visualizer.array[0];
        visualizer.getNumberBox(i).textContent = visualizer.array[i];
        
        visualizer.updateStatus(`Moving ${visualizer.array[i]} to end`);
        
        // Mark the last element as sorted
        visualizer.markSorted(i);
        
        // Call heapify on the reduced heap
        await heapify(visualizer, i, 0);
    }
    
    // Mark the first element as sorted
    visualizer.markSorted(0);
}

// Heapify function for Heap Sort
async function heapify(visualizer, n, i) {
    // Check if stop was requested
    if (visualizer.shouldStop) return;
    
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // If left child is larger than root
    if (left < n && visualizer.array[left] > visualizer.array[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && visualizer.array[right] > visualizer.array[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest !== i && !visualizer.shouldStop) {
        // Highlight elements being compared
        await visualizer.highlightComparing([i, largest]);
        
        // Swap and continue heapifying
        [visualizer.array[i], visualizer.array[largest]] = [visualizer.array[largest], visualizer.array[i]];
        
        // Update display
        visualizer.getNumberBox(i).textContent = visualizer.array[i];
        visualizer.getNumberBox(largest).textContent = visualizer.array[largest];
        
        visualizer.updateStatus(`Swapping ${visualizer.array[largest]} and ${visualizer.array[i]}`);
        
        await heapify(visualizer, n, largest);
    }
}