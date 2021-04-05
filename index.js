const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars')
const members = require('./members')

const app = express();

// initialize middleware
// app.use(logger);
// console after each postman send: ' http://localhost:5000/api/members: 2021-04-02T01:39:44+00:00 '
// this and other req res activity can be turned into a variable, stored, etc

// middleware for handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Homepage Route for Handlebars
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

{/* examples of how to render a page (replaced by static folder below)
app.get('/', (req, res) => {
    // res.send('<h1> Hello World</h1>')
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
*/}

// Body Parser Middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// SET A STATIC FOLDER (This is an alt section of code to routes)
app.use(express.static(path.join(__dirname, 'public')));
// / renders index.html /about renders about.html


app.use('/api/members', require('./routes/api/membersroute'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

