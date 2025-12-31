// Merge Sort Algorithm
async function mergeSort(visualizer, left, right) {
    if (left < right && !visualizer.shouldStop) {
        const mid = Math.floor((left + right) / 2);
        
        await mergeSort(visualizer, left, mid);
        if (visualizer.shouldStop) return;
        
        await mergeSort(visualizer, mid + 1, right);
        if (visualizer.shouldStop) return;
        
        await merge(visualizer, left, mid, right);
    }
}

// Merge function for Merge Sort
async function merge(visualizer, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Create temporary arrays
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);
    
    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
        leftArray[i] = visualizer.array[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = visualizer.array[mid + 1 + j];
    }
    
    let i = 0, j = 0, k = left;
    
    visualizer.updateStatus('Merging subarrays...');
    
    while (i < n1 && j < n2 && !visualizer.shouldStop) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        // Highlight elements being compared
        await visualizer.highlightComparing([left + i, mid + 1 + j]);
        
        if (leftArray[i] <= rightArray[j]) {
            visualizer.array[k] = leftArray[i];
            i++;
        } else {
            visualizer.array[k] = rightArray[j];
            j++;
        }
        
        // Update display
        visualizer.getNumberBox(k).textContent = visualizer.array[k];
        
        // Highlight the element being placed
        await visualizer.highlightSwapping([k]);
        
        k++;
    }
    
    // Copy remaining elements of leftArray
    while (i < n1 && !visualizer.shouldStop) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        visualizer.array[k] = leftArray[i];
        
        // Update display
        visualizer.getNumberBox(k).textContent = visualizer.array[k];
        
        // Highlight the element being placed
        await visualizer.highlightSwapping([k]);
        
        i++;
        k++;
    }
    
    // Copy remaining elements of rightArray
    while (j < n2 && !visualizer.shouldStop) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        visualizer.array[k] = rightArray[j];
        
        // Update display
        visualizer.getNumberBox(k).textContent = visualizer.array[k];
        
        // Highlight the element being placed
        await visualizer.highlightSwapping([k]);
        
        j++;
        k++;
    }
    
    // Mark merged elements as sorted
    for (let idx = left; idx <= right; idx++) {
        visualizer.markSorted(idx);
    }
}