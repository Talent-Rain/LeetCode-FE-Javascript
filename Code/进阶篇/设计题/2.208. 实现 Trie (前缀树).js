// 208. 实现 Trie (前缀树)
// https://leetcode-cn.com/problems/implement-trie-prefix-tree/

/**
 * @分析
 * 1. 在实现 Trie 树的时候，我们需要考虑当前节点是否是插入的字符串的终点，用在 search 方法的判断上，所以节点就必须有 isEnd 这样一个属性
 * 2. 考虑这里只展示 26 个小写字母，所以 children 可以是长度为 26 的数组进行缓存，那么就要有一个方法将字母转成数组的下标，方便搜索，这个时候搜索的复杂度 ${O(1)}$
 * 3. 每次插入的字符串有可能不一致，但是他们都存在同一个 Trie 树中，所以 this.root 是一个虚拟的根节点，我们每次判断都是用 children 来进行的
 * 4. 在插入操作中，每次判断当前的字符 w 是否在上一个节点 root 的 children 中，如果是就继续遍历，如果不是，就创建对应的节点，然后再遍历
 * 5. 最后 start 只需要判断完全匹配的最后一个根节点 root 的 isEnd 即可；
 * 6. 时间复杂度： 插入操作 ${O(m)}$ -- m 是插入字符的长度, startsWith 和 search 也都是  ${O(m)}$
 */
function TrieNode (val = null) {
    this.isEnd = false // 默认不是终点
    this.val = val;
    this.children = [];
}

// 用数组来缓存子节点，每个字母有对应的下标
function wordToIndex(s){
    return s.charCodeAt() - 'a'.charCodeAt()
}

var Trie = function() {
    this.root = new TrieNode(); //初始化根节点 -- 这个相当于是虚拟更节点，因为不确保插入的 word 的首个字母都是一样的
};


Trie.prototype.insert = function(word) {
    let root = this.root // 这一层的 root
    for(let w of word) {
        const wi = wordToIndex(w)
        if(!root.children[wi]){
            // 没有设置，则新建一个，放在对应的位置上
            root.children[wi] = new TrieNode(w)
        }
        // 如果已经存在了，那么继续搜索
        root = root.children[wi]
    }
    root.isEnd = true // 这个就是当前 word 的结束位置
};

Trie.prototype.search = function(word) {
    let root = this.root
    for(let w of word) {
        const wi = wordToIndex(w)
        if(!root.children[wi]) return false
        root = root.children[wi]
    }
    // 需要判断是否是终点
    return root.isEnd 
};

Trie.prototype.startsWith = function(prefix) {
    let root = this.root
    for(let w of word) {
        const wi = wordToIndex(w)
        if(!root.children[wi]) return false
        root = root.children[wi]
    }
    return true
};
