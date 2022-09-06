
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const e = require('express');

var nodemailer = require('nodemailer');


app.use(bodyParser.json())//is use for teking data into json format
//app.use(express.static('public'))// send static html page
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })) //convert into html format
mongoose.connect('mongodb://localhost:27017/firstdb', { useNewUrlParser: true, useUnifiedTopology: true }); // connect to MongoDB database server
var db = mongoose.connection;// establish connection to MongoDB
var card = {}
db.on('error', () => { console.log('Error in database connection'); });
db.once('open', () => { console.log('database is open for once'); });

app.post('/payment.html', (req, res) => {
    let name = req.body.na;
    let email = req.body.em;
    let phone = req.body.nu;
    console.log(name, email, phone)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rukhmabhosiwad@gmail.com',
            pass: 'gndtcxeulybfggif'
        }
    });

    var mailOptions = {
        from: 'rukhmabhosiwad@gmail.com',
        to: email,
        subject: 'Requirment from :',
        text: ' Requirment for '
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/index.html')
})

app.post('/Sign', (req, res) => {
    let firstname = req.body.fname;
    let Lastname = req.body.lname;
    let phone = req.body.mobile;
    let email = req.body.email;
    let state = req.body.select1;
    let city = req.body.city;
    let password = req.body.password;
    let data = {
        'firstname': firstname,
        'lastname': Lastname,
        'email': email,
        'phone': phone,
        'password': password,
        'city': city,
        'state': state
    }
    console.log(data);
    db.collection("users").find(data).toArray(function (err, result) {
        if (err) throw err;
        try {
            result[0]['email']
            res.redirect('http://localhost:3000')
        }
        catch {
            db.collection("users").insertOne(data, (err, collection) => {
                if (err) throw err;
                console.log('successfully insert data');
            });

            console.log('pankaj')
            res.redirect('http://localhost:4000/index.html')//redirect to success page
        }
    });
})
app.post('/login.html', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let data = {

        'email': email,
        'password': password

    }
    db.collection("users").find(data).toArray(function (err, result) {
        if (err) throw err;
        try {
            if (result[0]['email'] == email && result[0]['password'] == password) {
                res.set({
                    "Allow-access-Allow-Origin": '*'
                })
                return res.sendFile(__dirname + '/index.html')
            }
            else {
                res.set({
                    "Allow-access-Allow-Origin": '*'
                })
                return res.sendFile(__dirname + '/login.html')
            }
        }
        catch {
            res.set({
                "Allow-access-Allow-Origin": '*'
            })
            return res.sendFile(__dirname + '/login.html')
        }
    });

    //return res.sendFile(__dirname+'/login.html')//redirect to success page


})
app.post('/Addtocart', (req, res) => {
    var title = req.body.title;
    var price = parseInt(req.body.price);
    var count = req.body.itemid;
    var items = { 'title': title, 'price': price * parseInt(count), 'count': count };
    const fs = require('fs');
    fs.readFile("./data.json", 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("error while reading file", err);
        } else {
            data = JSON.parse(data)
            items._id = items._id.toString()

            data = data.filter(function (element) {
                return element !== undefined;
            });

            let foundElement = data.find(innerele => innerele.title === items.title)
            if (foundElement) {
                foundElement["count"] =  parseInt(foundElement["count"]) + parseInt(items.count)
                foundElement["price"] =  parseInt(foundElement["price"]) + parseInt(items.price)
            } else {
                data.push(items)
            }
            fs.writeFile("./data.json", JSON.stringify(data), 'utf8', err => {
                if (err) throw err;
                console.log('File has been saved!');
            });
        }
    });

    db.collection('users').insertOne(items, (err, collection) => {
        if (err) throw err;
        console.log('successfully insert data');
    });

    return res.sendFile(__dirname + '/orderdetail.html')//redirect to success page
})
app.get('/data.json', (req, res) => {
    return res.sendFile(__dirname + '/data.json')
})
app.get('/Addtocart', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/orderdetail.html')
})
app.get('/payment', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/public/payment.html')
})
app.get('/thankyou', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/public/tq.html')
})
app.post('/action_page', (req, res) => {
    var review = req.body.review;
    var data = { 'review': review };
    // var reviewbody = JSON.parse(review)
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log(data.review)
        console.log('successfully insert data');
    });
    return res.sendFile(__dirname + '/index.html')//redirect to success page
})


app.get('/resigster.html', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/resigster.html')
})
app.get('/login.html', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/login.html')
})
app.get('/index.html', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/index.html')
})
app.post('/SignUp', (req, res) => {
    var name = req.body.name;
    email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    console.log(name.value)
    var data = {
        'name': name,
        'email': email,
        'phone': phone,
        'password': password
    }
    console.log(data);
    db.collection("User").find(data).toArray(function (err, result) {
        if (err) throw err;
        try {
            result[0]['email']
            res.redirect('http://localhost:3000')
        }
        catch {
            db.collection("users").insertOne(data, (err, collection) => {
                if (err) throw err;
                console.log('successfully insert data');
            });

            console.log('pankaj')
            res.redirect('http://localhost:4000/index.html')//redirect to success page
        }
    });
})
app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(__dirname + '/index.html')
}).listen(4000);
console.log(`Server started on port ${4000}`)