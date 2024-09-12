function bubbleSort(arr) {
    let len = arr.length;
    let snapshots = [];
    let swapped;

    for (let i = 0; i < len; i++) {
        swapped = false;
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {

                snapshots.push({ index1: j, index2: j + 1 });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return { sortedArray: arr, snapshots };
}


function quickSort(arr) {
    let snapshots = [];

    function partition(low, high) {

        let randomPivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        if (arr[high] !== arr[randomPivotIndex]) {
            snapshots.push({ index1: high, index2: randomPivotIndex });
            [arr[high], arr[randomPivotIndex]] = [arr[randomPivotIndex], arr[high]];
        }

        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                if (arr[i] !== arr[j]) {
                    snapshots.push({ index1: i, index2: j });
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
        }
        if (arr[i + 1] !== arr[high]) {
            snapshots.push({ index1: i + 1, index2: high });
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        }
        return i + 1;
    }

    function sort(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        }
    }

    sort(0, arr.length - 1);
    return { sortedArray: arr, snapshots };
}

function insertionSort(arr) {
    let snapshots = [];
    let len = arr.length;

    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            snapshots.push({ index1: j, index2: j + 1 });
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }

    return { sortedArray: arr, snapshots };
}

function selectionSort(arr) {
    let snapshots = [];
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            snapshots.push({ index1: i, index2: minIndex });
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return { sortedArray: arr, snapshots };
}

function bogoSort(arr) {
    let snapshots = [];

    function isSorted(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) return false;
        }
        return true;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            if (i !== j) {
                snapshots.push({ index1: i, index2: j });
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    }

    while (!isSorted(arr)) {
        shuffle(arr);
    }

    return { sortedArray: arr, snapshots };
}

function heapSort(arr) {
    let snapshots = [];
    let len = arr.length;

    function heapify(n, i) {
        let largest = i;
        while (true) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }

            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }

            if (largest !== i) {
                snapshots.push({ index1: i, index2: largest });
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                i = largest;
            } else {
                break;
            }
        }
    }

    function sort() {

        for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
            heapify(len, i);
        }

        for (let i = len - 1; i > 0; i--) {

            if (arr[0] !== arr[i]) {
                snapshots.push({ index1: 0, index2: i });
                [arr[0], arr[i]] = [arr[i], arr[0]];
            }
            heapify(i, 0);
        }
    }

    sort();
    return { sortedArray: arr, snapshots };
}

module.exports = { bubbleSort, quickSort, insertionSort, selectionSort, bogoSort, heapSort };
