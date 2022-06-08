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