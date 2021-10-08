// 1202. 交换字符串中的元素
// https://leetcode-cn.com/problems/smallest-string-with-swaps/

/**
 * @分析 -- 超时了
 * 1. 不断的交换 pairs ，使得最终的字符串 str 是最小的字符串，所以就是要将 pairs 中同一集合的找出来，按顺序排好，然后再组合好
 * 2. 因为同一集合之间可以联通，所以可以经过多次之后，将集合中最小的字符串放在其它字符之前
 * 3. 用一个 root_strArr 来缓存根节点下的字符串数组，然后每次合并的时候，根据 root_strArr 来拍平字符串的缓存，然后缓存两者的数组，最后得到根节点下缓存的集合数组
 * 4. 最后在交换字符串的时候，每一次都找到这个集合剩余的最小的那个值，然后输出出去
 * 5. 超时了
 */
var smallestStringWithSwaps = function (s, pairs) {
  const parents = Array.from({ length: s.length }).map((_, index) => index);
  const root_strArr = Array.from({ length: s.length }).map((_, index) => [s[index].charCodeAt()]);
  const _find = (x) => {
    if (x !== parents[x]) {
      parents[x] = _find(parents[x]);
    }
    return parents[x];
  };

  const _connect = (x, y) => {
    const px = _find(x);
    const py = _find(y);
    if (px === py) return;
    if (root_strArr[px].length > root_strArr[py].length) {
      parents[py] = px;
      root_strArr[px] =  _connectTwoArr(root_strArr[px],root_strArr[py])
    } else {
      parents[px] = py;
      root_strArr[py]=_connectTwoArr(root_strArr[px],root_strArr[py])
    }
  };
  
    //  合并两个有序数组
  const _connectTwoArr = (xArr,yArr) => {
    const xLen = xArr.length
    const yLen = yArr.length
    let x = y = 0
    const ret = []
    while(x<xLen && y<yLen){
        if(xArr[x]>yArr[y]){
            ret.push(yArr[y])
            y++
        }else{
            ret.push(xArr[x])
            x++ 
        }
    }
    while(x<xLen) {
        ret.push(xArr[x])
        x++
    }
    while(y<yLen) {
        ret.push(yArr[y])
        y++
    }
    return ret
  }
  for (let p of pairs) {
    _connect(p[0], p[1]);
  }
  let ret = "";
  for (let i = 0; i < s.length; i++) {
    const root = _find(i); // 看一下根节点
    const arr = root_strArr[root]; // 找出这个根节点下的集合，并找出 字典下的最小字符
    const minStr = String.fromCharCode(arr.shift());
    ret += minStr;
  }
  return ret;
};

/**
 * @分析
 * 1. amazing，上面一直超时，一直想在连接的时候进行排序操作，所以自己进行有序数组的排序，比较转成 unicode 格式的，都超时了
 * 2. 反而在集合合并的时候直接合并数组，然后在一次性将每个集合进行排序，最后得到的结果可以 ac
 * 3. 遍历集合数量，然后进行集合排序，相当于是对所有字符的排序，时间复杂度是 ${nlogn}$ 其中 n 是 s.length; 
 */
var smallestStringWithSwaps = function (s, pairs) {
    const parents = Array.from({ length: s.length }).map((_, index) => index);
    const root_strArr = Array.from({ length: s.length }).map((_, index) => [s[index]]);
    const _find = (x) => {
      if (x !== parents[x]) {
        parents[x] = _find(parents[x]);
      }
      return parents[x];
    };
  
    const _connect = (x, y) => {
      const px = _find(x);
      const py = _find(y);
      if (px === py) return;
      if (root_strArr[px].length > root_strArr[py].length) {
        parents[py] = px;
        root_strArr[px].push(...root_strArr[py])
      } else {
        parents[px] = py;
        root_strArr[py].push(...root_strArr[px])
      }
    };
    
    // 连接
    for (let p of pairs) {
      _connect(p[0], p[1]);
    }

    // 各个模块排序
    root_strArr.map(arr => arr.sort());
    let ret = "";
    for (let i = 0; i < s.length; i++) {
      const root = _find(i); // 看一下根节点
      const arr = root_strArr[root]; // 找出这个根节点下的集合，并找出 字典下的最小字符
      const minStr = arr.shift()
      ret += minStr;
    }
    return ret;
  };