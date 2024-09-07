function bubbleSort(arr) {
    let len = arr.length;
    let snapshots = [];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                snapshots.push({ index1: j, index2: j + 1 });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return { sortedArray: arr, snapshots };
}
function quickSort(arr) {
    let snapshots = [];

    function partition(low, high) {
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

        // Place pivot in the correct position and record the swap only if elements are different
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

module.exports = { bubbleSort, quickSort };
