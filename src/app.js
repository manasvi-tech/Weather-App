const express = require('express');
const app = express();
const path = require('path')
const port = process.env.PORT || 3000; //required at the time of hosting OTHERWISE WILL GO TO THAT PORT NUMBER
const hbs = require('hbs');
const { template } = require('handlebars');

//public static path
const staticPath = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.static(staticPath));

app.set('view engine','hbs');
app.set('views',template_path)

hbs.registerPartials(partials_path)

// routing
app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/weather',(req,res)=>{
    res.render('weather');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/*',(req,res)=>{
    res.render('404error',{ //passing an object alongside
        errorMsg:'Oops, Page Not found'
    });
})

app.listen(port,()=>{
    console.log('Listening to port 3000')
})

