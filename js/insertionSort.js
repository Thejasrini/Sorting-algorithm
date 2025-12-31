// Insertion Sort Algorithm
async function insertionSort(visualizer) {
    visualizer.updateStatus('Starting Insertion Sort...');
    const n = visualizer.array.length;
    
    for (let i = 1; i < n && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        let key = visualizer.array[i];
        let j = i - 1;
        
        visualizer.updateStatus(`Inserting ${key} into sorted portion`);
        
        // Highlight the element being inserted
        await visualizer.highlightComparing([i]);
        
        while (j >= 0 && visualizer.array[j] > key && !visualizer.shouldStop) {
            // Check if stop was requested
            if (visualizer.shouldStop) return;
            
            // Highlight elements being compared
            await visualizer.highlightComparing([j, j + 1]);
            
            // Move element
            visualizer.array[j + 1] = visualizer.array[j];
            
            // Update display
            visualizer.getNumberBox(j + 1).textContent = visualizer.array[j + 1];
            
            j--;
            
            visualizer.updateStatus(`Moving ${visualizer.array[j + 1]} to the right`);
        }
        
        if (!visualizer.shouldStop) {
            visualizer.array[j + 1] = key;
            
            // Update display
            visualizer.getNumberBox(j + 1).textContent = key;
            
            // Mark current position as sorted
            visualizer.markSorted(i);
        }
    }
    
    // Mark all as sorted
    for (let i = 0; i < n; i++) {
        visualizer.markSorted(i);
    }
}