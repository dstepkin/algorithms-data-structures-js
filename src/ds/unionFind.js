const UnionFind = function (size) {
    this.size = size;
    this.sizes = new Array(size).fill(1);
    this.ids = new Array(size).fill(0);
    this.componentAmount = size;
    for (let i = 0; i < size; i++) {
        this.ids[i] = i;
    }
};

UnionFind.prototype.find = function (p) {
    let root = p;
    while (root !== this.ids[root]) {
        root = this.ids[root];
    }
    while (p !== root) {
        const next = this.ids[p];
        this.ids[p] = root;
        p = next;
    }
    return root;
};

UnionFind.prototype.isConnected = function (p, q) {
    return this.find(p) === this.find(q);
};

UnionFind.prototype.getComponentSize = function (p) {
    return this.sizes[this.find(p)];
};

UnionFind.prototype.getSize = function () {
    return this.size;
};

UnionFind.prototype.getComponentAmount = function () {
    return this.componentAmount;
};

UnionFind.prototype.unify = function (p, q) {
    if (this.isConnected(p, q)) {
        return;
    }
    const root1 = this.find(p);
    const root2 = this.find(q);
    if (this.sizes[root1] < this.sizes[root2]) {
        this.unify(q, p);
        return;
    }
    this.sizes[root1] += this.sizes[root2];
    this.ids[root2] = root1;
    this.sizes[root2] = 0;
    this.componentAmount--;
};
