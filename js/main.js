// Main Sorting Visualizer Class
class SortingVisualizer {
    constructor() {
        // DOM elements
        this.arrayContainer = document.getElementById('array-container');
        this.statusElement = document.getElementById('status');
        this.sizeInput = document.getElementById('size');
        this.speedInput = document.getElementById('speed');
        this.algorithmSelect = document.getElementById('algorithm');
        this.generateBtn = document.getElementById('generate-btn');
        this.sortBtn = document.getElementById('sort-btn');
        this.stopBtn = document.getElementById('stop-btn');
        
        // Complexity info elements
        this.timeComplexityElement = document.getElementById('time-complexity');
        this.spaceComplexityElement = document.getElementById('space-complexity');
        
        // Array and visualization properties
        this.array = [];
        this.arraySize = parseInt(this.sizeInput.value);
        this.speed = parseInt(this.speedInput.value);
        this.isSorting = false;
        this.shouldStop = false;
        this.originalArray = [];
        this.animationSpeed = 500; // Base speed in ms
        
        // Initialize the visualizer
        this.initialize();
    }
    
    initialize() {
        // Set up event listeners
        this.sizeInput.addEventListener('input', () => this.handleSizeChange());
        this.speedInput.addEventListener('input', () => this.handleSpeedChange());
        this.generateBtn.addEventListener('click', () => this.generateArray());
        this.sortBtn.addEventListener('click', () => this.startSorting());
        this.stopBtn.addEventListener('click', () => this.stopSorting());
        this.algorithmSelect.addEventListener('change', () => this.updateComplexityInfo());
        
        // Generate initial array
        this.generateArray();
        this.updateComplexityInfo();
    }
    
    // Handle array size change
    handleSizeChange() {
        this.arraySize = parseInt(this.sizeInput.value);
        document.getElementById('size-value').textContent = this.arraySize;
        this.generateArray();
    }
    
    // Handle speed change
    handleSpeedChange() {
        this.speed = parseInt(this.speedInput.value);
        document.getElementById('speed-value').textContent = this.speed;
        // Adjust animation speed based on slider (higher value = faster)
        this.animationSpeed = 1000 - (this.speed * 40); // Range: 200ms to 800ms
    }
    
    // Generate random array
    generateArray() {
        if (this.isSorting) return;
        
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            // Generate random numbers between 1 and 99
            this.array.push(Math.floor(Math.random() * 99) + 1);
        }
        
        // Store the original array for reset functionality
        this.originalArray = [...this.array];
        
        this.displayArray();
        this.statusElement.textContent = 'Array generated. Ready to sort.';
    }
    
    // Display the array as number boxes
    displayArray() {
        this.arrayContainer.innerHTML = '';
        
        this.array.forEach((num, index) => {
            const numberBox = document.createElement('div');
            numberBox.className = 'number-box';
            numberBox.textContent = num;
            numberBox.dataset.index = index;
            this.arrayContainer.appendChild(numberBox);
        });
    }
    
    // Get a number box by index
    getNumberBox(index) {
        return this.arrayContainer.children[index];
    }
    
    // Highlight a number box for comparison
    async highlightComparing(indices) {
        indices.forEach(index => {
            if (this.getNumberBox(index)) {
                this.getNumberBox(index).classList.add('comparing');
            }
        });
        await this.delay();
        indices.forEach(index => {
            if (this.getNumberBox(index)) {
                this.getNumberBox(index).classList.remove('comparing');
            }
        });
    }
    
    // Highlight a number box for swapping
    async highlightSwapping(indices) {
        indices.forEach(index => {
            if (this.getNumberBox(index)) {
                this.getNumberBox(index).classList.add('swapping');
            }
        });
        await this.delay();
        indices.forEach(index => {
            if (this.getNumberBox(index)) {
                this.getNumberBox(index).classList.remove('swapping');
            }
        });
    }
    
    // Mark a number as sorted
    markSorted(index) {
        if (this.getNumberBox(index)) {
            this.getNumberBox(index).classList.add('sorted');
        }
    }
    
    // Update status text
    updateStatus(text) {
        this.statusElement.textContent = text;
    }
    
    // Delay function for animation
    delay() {
        return new Promise(resolve => setTimeout(resolve, this.animationSpeed));
    }
    
    // Update complexity information based on selected algorithm
    updateComplexityInfo() {
        const algorithm = this.algorithmSelect.value;
        let timeComplexity = '';
        let spaceComplexity = '';
        
        switch(algorithm) {
            case 'bubble':
                timeComplexity = 'O(n²)';
                spaceComplexity = 'O(1)';
                break;
            case 'insertion':
                timeComplexity = 'O(n²)';
                spaceComplexity = 'O(1)';
                break;
            case 'selection':
                timeComplexity = 'O(n²)';
                spaceComplexity = 'O(1)';
                break;
            case 'quick':
                timeComplexity = 'O(n²) worst, O(n log n) average';
                spaceComplexity = 'O(log n)';
                break;
            case 'merge':
                timeComplexity = 'O(n log n)';
                spaceComplexity = 'O(n)';
                break;
            case 'heap':
                timeComplexity = 'O(n log n)';
                spaceComplexity = 'O(1)';
                break;
            case 'counting':
                timeComplexity = 'O(n + k)';
                spaceComplexity = 'O(k)';
                break;
            case 'radix':
                timeComplexity = 'O(d(n + k))';
                spaceComplexity = 'O(n + k)';
                break;
        }
        
        this.timeComplexityElement.textContent = `Time Complexity: ${timeComplexity}`;
        this.spaceComplexityElement.textContent = `Space Complexity: ${spaceComplexity}`;
    }
    
    // Start the sorting process
    async startSorting() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.shouldStop = false;
        this.sortBtn.disabled = true;
        this.generateBtn.disabled = true;
        this.stopBtn.disabled = false;
        
        const algorithm = this.algorithmSelect.value;
        
        try {
            // Call the appropriate sorting algorithm based on selection
            switch(algorithm) {
                case 'bubble':
                    await bubbleSort(this);
                    break;
                case 'insertion':
                    await insertionSort(this);
                    break;
                case 'selection':
                    await selectionSort(this);
                    break;
                case 'quick':
                    await quickSort(this, 0, this.array.length - 1);
                    break;
                case 'merge':
                    await mergeSort(this, 0, this.array.length - 1);
                    break;
                case 'heap':
                    await heapSort(this);
                    break;
                case 'counting':
                    await countingSort(this);
                    break;
                case 'radix':
                    await radixSort(this);
                    break;
            }
            
            if (!this.shouldStop) {
                // Mark all elements as sorted when done
                for (let i = 0; i < this.array.length; i++) {
                    this.markSorted(i);
                }
                
                this.updateStatus('Sorting completed!');
            }
        } catch (error) {
            console.error('Error during sorting:', error);
            this.updateStatus('Error occurred during sorting.');
        } finally {
            this.isSorting = false;
            this.shouldStop = false;
            this.sortBtn.disabled = false;
            this.generateBtn.disabled = false;
            this.stopBtn.disabled = true;
        }
    }
    
    // Stop the sorting process
    stopSorting() {
        this.shouldStop = true;
        this.updateStatus('Sorting stopped by user. Resetting array...');
        
        // Reset the array to its original state
        this.array = [...this.originalArray];
        this.displayArray();
        this.updateStatus('Sorting stopped. Array reset to original state.');
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.visualizer = new SortingVisualizer();
});