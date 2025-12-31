// Bubble Sort Algorithm
async function bubbleSort(visualizer) {
    visualizer.updateStatus('Starting Bubble Sort...');
    const n = visualizer.array.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Check if stop was requested
        if (visualizer.shouldStop) return;
        
        for (let j = 0; j < n - i - 1; j++) {
            // Check if stop was requested
            if (visualizer.shouldStop) return;
            
            // Highlight elements being compared
            await visualizer.highlightComparing([j, j + 1]);
            
            if (visualizer.array[j] > visualizer.array[j + 1]) {
                // Highlight elements being swapped
                await visualizer.highlightSwapping([j, j + 1]);
                
                // Swap elements
                [visualizer.array[j], visualizer.array[j + 1]] = [visualizer.array[j + 1], visualizer.array[j]];
                
                // Update display
                visualizer.getNumberBox(j).textContent = visualizer.array[j];
                visualizer.getNumberBox(j + 1).textContent = visualizer.array[j + 1];
                
                visualizer.updateStatus(`Swapping ${visualizer.array[j + 1]} and ${visualizer.array[j]}`);
            } else {
                visualizer.updateStatus(`Comparing ${visualizer.array[j]} and ${visualizer.array[j + 1]} - No swap needed`);
            }
        }
        
        // Mark the last element as sorted
        visualizer.markSorted(n - i - 1);
    }
    
    // Mark the first element as sorted
    visualizer.markSorted(0);
}