// Selection Sort Algorithm
async function selectionSort(visualizer) {
    visualizer.updateStatus('Starting Selection Sort...');
    const n = visualizer.array.length;
    
    for (let i = 0; i < n - 1 && !visualizer.shouldStop; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        let minIdx = i;
        
        // Highlight current position
        await visualizer.highlightComparing([i]);
        
        for (let j = i + 1; j < n && !visualizer.shouldStop; j++) {
            // Check if stop was requested
            if (visualizer.shouldStop) return;
            
            // Highlight elements being compared
            await visualizer.highlightComparing([minIdx, j]);
            
            if (visualizer.array[j] < visualizer.array[minIdx]) {
                minIdx = j;
            }
            
            visualizer.updateStatus(`Comparing ${visualizer.array[i]} with ${visualizer.array[j]}`);
        }
        
        if (!visualizer.shouldStop && minIdx !== i) {
            // Highlight elements being swapped
            await visualizer.highlightSwapping([i, minIdx]);
            
            // Swap elements
            [visualizer.array[i], visualizer.array[minIdx]] = [visualizer.array[minIdx], visualizer.array[i]];
            
            // Update display
            visualizer.getNumberBox(i).textContent = visualizer.array[i];
            visualizer.getNumberBox(minIdx).textContent = visualizer.array[minIdx];
            
            visualizer.updateStatus(`Swapping ${visualizer.array[minIdx]} and ${visualizer.array[i]}`);
        } else if (!visualizer.shouldStop) {
            visualizer.updateStatus(`No swap needed for position ${i}`);
        }
        
        if (!visualizer.shouldStop) {
            // Mark current position as sorted
            visualizer.markSorted(i);
        }
    }
    
    // Mark the last element as sorted
    visualizer.markSorted(n - 1);
}