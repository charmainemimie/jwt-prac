require('dotenv').config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

//array of objects
const posts = [
    { username: "Kyle", 
            title: "Post 1" 
    },
    { username: "Charm", 
    title: "Post 2" 
    },
];
//endpoint1
app.get("/posts",authenticateToken, (req, res) => {
    console.log('done')
  res.json(posts.filter(post => post.username===req.user.username));
});

//use jwt nto create token
app.post("/login", (req, res) => {
    //authenticate user

    const username=req.body.username
    const user={name:username}

    //to create access token.......run node then require('crypto').randomBytes(64).toString('hex')
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken});
});


const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token =  authHeader && authHeader.split(' ')[1]  //Bearer TOKEN

    if (token==null) {
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{f
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
  
}

app.listen(3001);
