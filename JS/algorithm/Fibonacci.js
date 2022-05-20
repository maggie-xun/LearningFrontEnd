
// function fib(n){
//      if(n<2) return n
//        return fib(n-1)+fib(n-2)
// }

// for循环版本
// function fib(n){
//     let f0=0,f1=1,curFib=0
//     if(n<2) return n
//     for(let i=1;i<n;i++){
//         curFib=f0+f1
//         f0=f1
//         f1=curFib
//     }
//     return curFib
// }

// 去除重复计算的递归版本   高阶函数
// function fib(n){
//     if(n<2) return n
//     function _fib(n,a,b){
//         if(n===0) return a
//         return _fib(n-1,b,a+b)
//     }
//    return _fib(n,0,1)
// }

// 数组方法
// function fib(n){
//     let arr=[0,1]
//     for(let i=1;i<n;i++){
//         arr[i+1]=arr[i]+arr[i-1]
//     }
//     return arr[n]
// }
console.log(fib(100))