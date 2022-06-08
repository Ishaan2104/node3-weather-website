console.log('client side js');

//fetching data from url
// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=abc').then((response) =>{
//     response.json().then((data) =>{
//         if(data.TypeError){
//             console.log(data.TypeError);
//         }
//        console.log(data);
//         console.log(data.Weather)
//         console.log(data.Location);
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mssg1 = document.querySelector('#mssg1')
const mssg2 = document.querySelector('#mssg2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    
    mssg1.textContent = 'Loading...'
    mssg2.textContent = ''
    
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.TypeError){
            mssg1.textContent = data.Error
     
        }else{
            mssg1.textContent = data.Location
            mssg2.textContent = data.Weather
        }

    })
})
})