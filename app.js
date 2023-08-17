const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];

app.get('/', (req, res) => {
    // users.push({
    //     id: 1,
    //     name: 'Test User',
    //     email: 'test@test.com'
    // });
    res.status(200).json(users)
})

app.post('/user', (req, res) => {
    users.push(req.body);
    res.json(users)
})

app.get('/user/:id', (req, res) => {
    const userById = users.find(user => user.id === req.params.id);
    if(userById) {
        res.json(userById)
    } else {
        res.status(400).json({
            message: 'No user found with given ID'
        })
    }
})

app.put('/user/:id', (req, res) => {
    const userByIdIndex = users.findIndex(user => user.id === req.params.id);
    if(userByIdIndex !== -1) {
        const userById = { ...users[userByIdIndex], ...req.body }
        users[userByIdIndex] = userById;
        res.json(users[userByIdIndex])
    } else {
        res.status(400).json({
            message: 'No user found with given ID'
        })
    }
})


app.listen(4000, () => {
    console.log('Server started at 4000')
})

module.exports = app;