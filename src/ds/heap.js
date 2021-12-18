const Heap = function (compare) {
    this.heap = [];
    this.comparator = !compare
        ? (a, b) => a - b
        : compare;
}

Heap.prototype.getSize = function () {
    return this.heap.length;
};

Heap.prototype.peek = function () {
    return this.heap[this.getSize() - 1];
};

Heap.prototype.get = function (index) {
    return this.heap[index];
};

Heap.prototype.pop = function () {
    return this.heap.pop();
};

Heap.prototype.push = function (item) {
    const n = this.getSize();
    let insertIndex = -1;
    for (let step = n; step > 0; step = Math.floor(step / 2)) {
        while (insertIndex + step < n && this.comparator(item, this.heap[insertIndex + step]) < 0) {
            insertIndex += step;
        }
    }
    insertIndex++;
    if (insertIndex === 0) {
        this.heap.unshift(item);
    } else if (insertIndex === this.getSize()) {
        this.heap.push(item);
    } else {
        for (let i = this.getSize(); i > insertIndex; i--) {
            this.heap[i] = this.heap[i - 1];
        }
        this.heap[insertIndex] = item;
    }
};

Heap.prototype.toString = function () {
    return "[" + this.heap.toString() + "]";
}
