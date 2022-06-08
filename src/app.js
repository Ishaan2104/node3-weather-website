const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

//define paths for express config
const publicdir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'ishaan'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Page',
        name:'peechu'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'help me',
        name:'joey'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            Error:'You must provide address'
        }    )
    }
    
    const geocode = require('./utils/geocode.js')
    const forecast = require('./utils/forecast.js')
    const address = req.query.address
    
    
geocode(address, (error, {lat,longi,label } = {}) => {
    if(error){
        return res.send({error});
    }
    forecast(lat, longi, (error, Fdata) => {
        if(error){
            return res.send({error});
        }

        res.send({
            Location : label,
            Weather : Fdata,
            address:address
        })
      })
    
})

})

app.get('/help/*',(req,res) =>{
    res.render('notHelp',{
        title : 'notHelp',
        name : 'Shikhar',
        errorMsg : 'Help article not found'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title : '404',
        name : 'pooja',
        errorMsg : 'Page Not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})