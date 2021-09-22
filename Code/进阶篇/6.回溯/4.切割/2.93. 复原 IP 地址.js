// 93. 复原 IP 地址
// https://leetcode-cn.com/problems/restore-ip-addresses/

/**
 * @分析
 * 1. 这道题和 [131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/solution/di-gui-shuang-zhi-zhen-hui-wen-pan-duan-tirng/) 类似
 * 2. 这里也是切分字符串，只是判定条件变成了每一分段都要符合有效的 IP 地址，但是架子是一样的
 * 3. 这里的判定条件也多，只需要将合乎要求的条件算上，就能砍掉不少的分支
 */
var restoreIpAddresses = function (s) {
  const ret = [];

  function isValid(s) {
    if (s.length > 1 && s[0] == 0) return false; // 不能以 0 起头
    if (s >= 1 << 8) return false; // 要在 [0,255] 之间
    return true;
  }

  const dfs = (start, arr) => {
    if (arr.length === 4 && start !== s.length) return; // 已经分成4分，但是还没分完
    if (start === s.length) {
      if (arr.length === 4) {
        ret.push(arr.join("."));
      }
      // 无论是否分成四份，都离开了
      return;
    }

    let str = "";
    for (let i = start; i < s.length && i < start + 3; i++) {
      str += s[i];
      if (isValid(str)) {
        dfs(i + 1, [...arr, str]);
      }
    }
  };
  dfs(0, []);
  return ret;
};
