const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger')
const members = require('./Members')

const app = express();


//init middleware
// app.use(logger);

//handlebars  middle

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
//homepage route
app.get('/', (req, res) => res.render('index', {
    title: "Member App",
    members
}));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })
//set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members', require('./routes/api/Members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));