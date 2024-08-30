// algorithms.js

function bubbleSort(arr) {
    let len = arr.length;
    let snapshots = [];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Capture snapshot of the elements being swapped
                snapshots.push({ element1: arr[j], element2: arr[j + 1] });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return { sortedArray: arr, snapshots };
}

function quickSort(arr) {
    let snapshots = [];
    
    function sort(array) {
        if (array.length <= 1) return array;
        let pivot = array[array.length - 1];
        let left = [], right = [];
        
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < pivot) left.push(array[i]);
            else right.push(array[i]);
        }

        // Capture snapshot of the partitioning process
        snapshots.push({
            pivot,
            left,
            right
        });

        return [...sort(left), pivot, ...sort(right)];
    }

    return { sortedArray: sort(arr), snapshots };
}

module.exports = { bubbleSort, quickSort };
