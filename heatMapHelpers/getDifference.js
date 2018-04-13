function diff(arr1, arr2) {
    var set1 = new Set(arr1);
    var set2 = new Set(arr2);
    for (let item of set1) {
        if (set2.has(item)) {
            set2.delete(item);
            set1.delete(item);
        }
    }
    return Array.from(set1).concat( Array.from(set2) );
}

export default diff;