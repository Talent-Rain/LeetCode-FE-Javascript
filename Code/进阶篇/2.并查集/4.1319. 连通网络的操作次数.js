/*
 * @Author: your name
 * @Date: 2021-07-18 15:31:38
 * @LastEditTime: 2021-07-18 15:47:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/并查集/4.1319. 连通网络的操作次数.js
 */

// 1319. 连通网络的操作次数

/**
 * @分析
 * 1. 如果连接线小于 n-1，则肯定失败，直接返回 —1 即可
 * 2. 用并查集将 n 个网络根据 connections 连接成集合，查看总共有几个集合
 * 3. 如果刚好是 1 个，则不用拨动，返回 -1；否则返回 k-1 个
 */
 var makeConnected = function (n, connections) {
    const len = connections.length; // 连接线数量
    if (len < n - 1) return - 1;
    // 创建并查集
    const uf = new UnionFind(n)
    connections.forEach(([x,y]) =>{
      uf.connect(x,y)
    })
    const ufSize = uf.sizes
    return ufSize-1
  };
  
  class UnionFind {
    constructor(sizes) {
      this.father = Array.from({ length: sizes }).map((_, index) => index);
      this.sizes = sizes
    }
  
    find(x) {
      if (x !== this.father[x]) {
        this.father[x] = this.find(this.father[x]);
      }
      return this.father[x];
    }
    connect(x,y){
        let cx = this.find(x)
        let cy = this.find(y)
        if(cx === cy) return 
        this.father[cx] = cy
        this.sizes-- 
    }
  }
  