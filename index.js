const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const properties = require('./properties');

let emails = [];

const PORT = process.env.PORT || 5000


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send({message: 'HOME'});
})
app.post('/newsletter', (req, res) => {
    let email = req.body.email;
    if(validateEmail(email)) {
        return res.status(200).send({success: true, message: 'Você assinou a newsletter.'});
    }else {
        return res.status(400).send({success: false, message: 'O email enviado não é válido'});
    }

});

app.get('/emails', (req, res) => {
    res.send({
        emails: emails
    });
});

app.get('/properties', (req, res) => {
    res.send(properties);
});


app.get('*', (req, res) => {
    res.send({message: 'hey'});
});


app.listen(PORT, () => console.log(`listening at port ${PORT}`));