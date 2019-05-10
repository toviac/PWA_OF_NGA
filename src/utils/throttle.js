/**
 * @method 节流方法（时间戳）
 * @param {Function} fn 需要节流的实际方法
 * @param {Number} wait 需要控制的时间长度
 * @description 根据上一次执行的时间，和这一次执行的时间做比较，如果大于控制的时间，就可以执行
 */
function throttle(fn, wait) {
  var prev = 0; // 第一次执行的时候是0，所以第一次点击的时候肯定大于这个数，所以会立马执行
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now(); // 实际执行的时间
    if (now - prev >= wait) { // 执行的时间是不是比上次执行的时间大于需要延迟的时间，大于，我们就执行
      fn.apply(context, args);
      prev = now; // 执行了以后，重置上一次执行的时间为刚刚执行这次函数的时间，下次执行就用这个时间为基准
    }
  }
}