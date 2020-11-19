const express = require("express");
const connectDB = require('./config/db');
const port = process.env.PORT || 4000;
const path = require('path');
const app = express();

connectDB();
app.use(express.json());
app.use('/api/v1/users', require('./routes/userRouter'));
app.use('/api/v1/auth', require('./routes/authRouter'));
app.use('/api/v1/events', require('./routes/eventRouter'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


app.listen(port, function () {
    console.log("server is listening at 4000")
})