const express = require('express')
const bodyParser = require('body-parser')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write()

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', (req, res) => 
{
    res.render('index', {
        name: 'Ken'
    });

});

app.get('/users', function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    })
})

app.get('/users/search', function(req, res){    
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.indexOf(q) !== -1;
    })

    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', function(req, res){
    res.render('users/create');
});

app.post('/users/create', function(req, res){
    db.get('users').push({name: req.body.name, phone: req.body.phone}).write();
    res.redirect('/users');
})

app.listen(port, function(){
    console.log('server listen....');
});
