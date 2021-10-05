// 721. 账户合并
// https://leetcode-cn.com/problems/accounts-merge/

/**
 * @分析
 * 1. 首先题目已知邮箱属于唯一的一个name，而name的名字是可以相同但是代表不同的人的，所以 name 只能算是一个标记而已,所以一开始做合并操作不需要计算 name，用 email_name_map 缓存起来，直到最后再用
 * 2. 由于邮箱是一个字符串，而这里显然需要将同一个用户的邮箱缓存到一起，所以这里用下标来标记不同的邮箱，并缓存到 email_index_map 
 * 3. 开始使用并查集，将同一个用户下 email 连接起来
 * 4. 连接完之后，现在在并查集 parents 里面都是一些 index 表示的东西，他们代表一种关联逻辑，
 * 5. 但是具体怎么重新排列，需要通过 email_index_map 来找到找到原始的 email,然后查找是否属于同一个集合的，然后再缓存在在一起；
 * 6. 这个时候所有相同集合的值后缓存在了 email_index_map 的 value 中了，取出来，排序，然后从 email_name_map 取出 name，然后合并成一个数组，然后作为二维数组的一个 item push 到 merge 数组里
 * 7. 时间复杂度 ${nlogn}$ -- 每一次并查集合并的时候，需要进行2次查找1次合并；空间复杂度 ${O(n)}$
 */
 var accountsMerge = function(accounts) {
    const email_index_map=new Map()
    const email_name_map=new Map()
    let emailIndex = 0 // 设置下标，作为唯一标识 -- 也代表了 emails 的数量
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        const name = account[0]
        for(let i = 1;i<account.length;i++){
            const email = account[i]
            if(!email_index_map.has(email)){
                email_index_map.set(email,emailIndex)
                email_name_map.set(email,name)
                emailIndex++
            }
        }
    }
    const parents = Array.from({length:emailIndex}).map((_,index) => index) 
    function _find(x){
        if(parents[x]=== x) return x
        return _find(parents[x])
    }
    function _connect(x,y) {
        const px = _find(x)
        const py = _find(y)
        parents[py] = px // 让 py 指向 py
    }
    // 开始使用并查集，将同一个用户下 email 连接起来
    for (let i = 0; i < accounts.length; i++) {
        const firstEmail = accounts[i][1];
        const firstIndex = email_index_map.get(firstEmail);
        for(let j = 2;j<accounts[i].length;j++){
            const secondEmail = accounts[i][j];
            const secondIndex = email_index_map.get(secondEmail);
            _connect(firstIndex,secondIndex)
        }
    }

    // 现在每一个 email 的关联关系都通过 index 连接好了，现在需要用一个数据结构将他们取出来
    // 这 key 值是根 emailIndex, values 就是这个集合的 emails 
    const index_email_map = new Map() 
    for(let email of email_index_map.keys()) {
        const emailIndex = email_index_map.get(email)
        const root = _find(emailIndex)
        index_email_map.set(root,index_email_map.has(root)? [...index_email_map.get(root),email]:[email])
    }

    const merge = []
    for(let emailsArr of index_email_map.values()){
        emailsArr.sort();
        const name = email_name_map.get(emailsArr[0])
        merge.push([name,...emailsArr])
    }
    return merge
}
