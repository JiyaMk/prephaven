const express=require("express");
const app=express();
require("dotenv").config();
const passport=require("passport");
const User=require("./models/User");
const authRoutes=require("./routes/auth");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const port=9000;
const mongoose=require("mongoose");

app.use(express.json());

mongoose
    .connect("mongodb+srv://charvi23:"+process.env.MONGO_PWD+"@majorproject.srb6sep.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((x)=>{
        console.log("CONNECTED TO MONGO <3");
    })
    .catch((err)=>{
        console.log("Error while connecting to Mongo :(");
    });

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'sec_sec';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/", (req, res)=>{
    res.send("Hello world");
});
app.use("/auth", authRoutes);
app.listen(port, ()=>{
    console.log("App is running on port: "+ port);
});