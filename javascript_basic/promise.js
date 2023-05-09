/*'use strict'
// javascript --> typescript 

// XMLHttpRequest (이벤트 핸들러)로 비동기 구현
let request = new XMLHttpRequest() // webBrowser에서 webServer로 request를 요청 가능
// 서버로부터 응답이 왔을 때, 실행될 코드를 지정, 핸들러, 이벤트 핸들러를 지정해서
// 응답을 처리

// 위의 요청에 대한 응답이 로딩될 때 
request.onload = ()=>{
    if(status ===200){
        console.log('응답이 제대로 왔음)
        request.log(request.responseText)
    }
    else{
        console.log('응답이 제대로 오지 않았음)
    }
}

request.open('GET', 'http://127.0.0.1:5501/boolean.html', false)
// http 프로토콜 get 하는 애임 (127.0.0.1 --> 본인 IP)
// 5501 : 포트번호
// false : 비동기식으로 하지 않겠다. -> true로 하면 비동기로 구현 가능
request.send(null)

if(request.status === 200){
    console.log(request.responseText)
}

for(let i=0; i<10;i++){
    console.log(i)
} // 위의 html 파일이 엄청 크면 얘는 쓸데없이 너무 기다리게 됨 -> 비동기 처리를 해야함
*/


// 정리하면 1. XMLHttpRequest로 만들고 2. open하고 3. send하고 4.responseText 출력하고
// 5. for문 출력하고, 6. onload에서 응답 로딩되고 마무리

// ----------------------------------------------------------------------------

// promise --> 비동기 실행 구현 

/*const a = new Promise((resolve, reject)=>{ // reject는 실패한 경우
    //--------해야 할 일을 지정
    console.log('hello')
    setTimeout(() => {
        resolve('ended') // 다 잘 끝났다는 표시
    }, 3000);
})

a.then((v)=>{
    //Promise 객체가 성공적으로 완수되면 then이 불림 이때 v는 위 resolve의 인자를 받음
    console.log(`then received: ${v}`)
})

for(let i=0; i<10;i++){
    console.log(i)
} // Promise 비동기로 돌아가기 때문에 3초 뒤에 출력되는 애 제끼고 얘가 먼저 출력
*/


// -------------------------------
// 얘도 Promise 쓰는 거임. (fetch를 이용) --> 비동기 구현
// fetch : '가져오다', 서버로부터 wep Page를 가져오다

fetch('https://127.0.0.1:5501/boolean.html') // 얘의 반환값은 promise
// const a로 굳이 안 받아도 됨
// fetch가 성공적으로 받아오면 resolve->then 호출, 
// 실패면 reject -> catch 호출

.then((response)=>{// fetch가 성공하여 서버로부터 제대로 응답이 왔을 때 실행
    //(오류가 와도 온 거임)
    console.log(`서버응답: ${response}`)
    return response.text()
    // response.text의 반환값은 문자열이 아님 -> 또 다른 promise를 반환하는 것
})
.then((data)=>{ // 여기 data는 response.text() 를 문자열로 성공적으로 바꾼 것
    console.log(`문자열로 바꾼 응답: ${data}`) // promise chaining
})
.catch((err)=>{// fetch가 실패하여 서버로부터 응답이 안 왔을 때 실행
    console.log(`서버 응답 에러: ${err}` )
})