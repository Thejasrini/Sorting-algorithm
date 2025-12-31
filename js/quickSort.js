// Quick Sort Algorithm
async function quickSort(visualizer, low, high) {
    if (low < high && !visualizer.shouldStop) {
        const pi = await partition(visualizer, low, high);
        
        // Mark pivot as sorted
        visualizer.markSorted(pi);
        
        await quickSort(visualizer, low, pi - 1);  // Before pi
        if (visualizer.shouldStop) return;
        
        await quickSort(visualizer, pi + 1, high); // After pi
    }
}

// Partition function for Quick Sort
async function partition(visualizer, low, high) {
    const pivot = visualizer.array[high];
    let i = low - 1;
    
    visualizer.updateStatus(`Pivot element: ${pivot}`);
    
    for (let j = low; j < high && !visualizer.shouldStop; j++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return pi;
        
        // Highlight elements being compared
        await visualizer.highlightComparing([j, high]);
        
        if (visualizer.array[j] < pivot) {
            i++;
            
            if (i !== j) {
                // Highlight elements being swapped
                await visualizer.highlightSwapping([i, j]);
                
                // Swap elements
                [visualizer.array[i], visualizer.array[j]] = [visualizer.array[j], visualizer.array[i]];
                
                // Update display
                visualizer.getNumberBox(i).textContent = visualizer.array[i];
                visualizer.getNumberBox(j).textContent = visualizer.array[j];
                
                visualizer.updateStatus(`Swapping ${visualizer.array[j]} and ${visualizer.array[i]}`);
            } else {
                visualizer.updateStatus(`Element ${visualizer.array[j]} is in correct position`);
            }
        } else {
            visualizer.updateStatus(`Element ${visualizer.array[j]} is greater than pivot`);
        }
    }
    
    // Swap pivot element with element at i+1
    // Highlight elements being swapped
    await visualizer.highlightSwapping([i + 1, high]);
    
    [visualizer.array[i + 1], visualizer.array[high]] = [visualizer.array[high], visualizer.array[i + 1]];
    
    // Update display
    visualizer.getNumberBox(i + 1).textContent = visualizer.array[i + 1];
    visualizer.getNumberBox(high).textContent = visualizer.array[high];
    
    visualizer.updateStatus(`Pivot ${pivot} placed at correct position`);
    
    return i + 1;
}