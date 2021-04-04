const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 7000;

const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => { console.log("MongoDb Connected... ") })
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다. 

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, error: err });
        return res.status(200).json({
            success: true,
        })
    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})