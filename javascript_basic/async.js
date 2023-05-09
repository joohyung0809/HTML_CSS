'use strict'

// async: syntatic sugar for promise
/*
function fetchUser() {
    return new Promise((resolve, reject)=>{
        console.log(`promise 실행`)
        resolve('실행 끝')
    })
}

const a = fetchUser()

a
.then((v)=>{
    console.log(`fetchUser result: ${v}`)
}) */


// syntantic sugar

function B(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('B가 실행')
            resolve(45)
        }, 3000);
    })
}


async function fetchUser(a) {
        console.log(`promise 실행`) // 원래 실행되어야 하는 부분

        const k = await B() // await 함수는 async 안에서만 사용 가능
        // await는 현재 B함수가 3초를 기다려야 하기 때문에 비동기 실행에서 무시하고 진행
        // fetchUser에서는 B함수의 resolve를 받아야 해서 기다려주는 함수임
        // 즉 Promise 안에서 또 다른 Promise를 동기적으로 실행할 수 있도록 해줌

        if(k >= 0){
            return '실행 끝' // async가 붙어서 resolve에 해당
        }
        else{
            throw new Error('음수') // reject에 해당할 때 error 를 throw함
        }
}


// -- 아래는 변하지 않음
const a = fetchUser(10) // 위의 a에 해당

a
.then((v)=>{ // async로 인해 resolve값에 해당하는 '실행 끝'이 v로 들어감
    console.log(`fetchUser result: ${v}`)
})
.catch((error)=>{
    console.log(`에러발생: ${error}`)
})
.finally(()=>{
    // resolve 혹은 reject에 상관없이 promise가 종료되면서 공통적으로 실행되야 하는 부분
    console.log(`promise 끝 from finally`)
})

// 그러니까 promise 반환은 .then으로 받아야 
// 해당 promise에서 던져준 resolve를 쓸 수 있다.
// reject 쓰려면 .catch 하던지