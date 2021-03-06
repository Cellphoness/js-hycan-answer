const { Observable, concat, zip } = require("rxjs");
const { concatWith } = require('rxjs/operators')

let sig1 = new Observable(sub => {
  setTimeout(() => {
    sub.next('a')
    sub.complete()
  }, 2500)
})

let sig2 = new Observable(sub => {
  setTimeout(() => {
    sub.next('b')
    sub.complete()
  }, 1000)
})

let sig3 = new Observable(sub => {
  setTimeout(() => {
    sub.next('c')
    sub.complete()
  }, 2000)
})

let sig4 = new Observable(sub => {
  setTimeout(() => {
    sub.next('d')
    sub.complete()
  }, 1000)
})

// 1、合并 sig1 sig2 sig3 三股信号，三个都complete了才回调：输出 [ 'a', 'b', 'c' ] on complete 
zip(sig1, sig2, sig3)
.subscribe({
  next: val => {
      console.log(val)
  },
  error: e => {
      console.log('on error', e)
  },
  complete: () => {
      console.log('on complete')
  }
})

// 2 依次执行 sig1 sig2 sig3 sig4四个信号 ：输出 a b c d on complete

// concat(sig1, sig2, sig3, sig4) //也可以
sig1.pipe(
  concatWith(sig2),
  concatWith(sig3),
  concatWith(sig4),
)
.subscribe({
  next: val => {
      console.log(val)
  },
  error: e => {
      console.log('on error', e)
  },
  complete: () => {
      console.log('on complete')
  }
})
