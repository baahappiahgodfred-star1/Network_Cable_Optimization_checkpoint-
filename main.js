// edges: [node1, node2, cost]
let edges = [
    ["A", "B", 4],
    ["A", "C", 2],
    ["B", "C", 5],
    ["B", "D", 10],
    ["C", "D", 3],
    ["C", "E", 4],
    ["D", "E", 1]
  ];
  
  
  // ===== UNION FIND =====
  class DSU {
    constructor(nodes) {
      this.parent = {};
  
      for (let n of nodes) {
        this.parent[n] = n;
      }
    }
  
    find(x) {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }
  
    union(a, b) {
      let pa = this.find(a);
      let pb = this.find(b);
  
      if (pa !== pb) {
        this.parent[pb] = pa;
        return true;
      }
      return false;
    }
  }
  
  
  // ===== KRUSKAL =====
  function kruskal(edges) {
    // get all nodes
    let nodes = new Set();
    for (let e of edges) {
      nodes.add(e[0]);
      nodes.add(e[1]);
    }
  
    let dsu = new DSU(nodes);
  
    // sort edges by cost
    edges.sort((a, b) => a[2] - b[2]);
  
    let mst = [];
    let total = 0;
  
    for (let e of edges) {
      let [u, v, w] = e;
  
      // if no cycle
      if (dsu.union(u, v)) {
        mst.push(e);
        total += w;
      }
    }
  
    return { mst, total };
  }
  
  
  // ===== RUN =====
  let result = kruskal(edges);
  
  console.log("Selected edges:");
  console.log(result.mst);
  
  console.log("Total cost:");
  console.log(result.total);