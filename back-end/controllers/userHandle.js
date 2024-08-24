const User = require('../models/userSchema')

async function handleCreateNewUser (req, res) {
    const body = req.body;
    if(!body.name || !body.email || !body.password) return res.status(400).json({error : 'name, email and password are not filled completely'})

    const newUser = new User({
        name : body.name,
        email : body.email,
        password : body.password
    });
    try{
        await newUser.save()
        console.log("added new User")
        res.status(200).json({msg : "recorded successfully", name : body.name, email : body.email, password : body.password})
    }
    catch(err){
        console.log(err)
        res.status(404).send(err)
    }
}

async function handleGetAllUser (req, res){
    await User.find({}).sort({createdAt : -1})
    .then((data)=> {console.log("number of Users : ",data.length); res.send(data)})
    .catch((err)=>{console.log(err); res.send(err)})
}

module.exports = {
    handleCreateNewUser,
    handleGetAllUser
}