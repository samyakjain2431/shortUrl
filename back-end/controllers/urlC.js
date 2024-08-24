const shortId = require('shortid')
const URL = require('../models/urlSchema')

function ensureHttpPrefix(receivedURL) {
    if (!receivedURL.startsWith('http://') && !receivedURL.startsWith('https://')) {
      receivedURL = 'http://' + receivedURL;
    }
    return receivedURL;
}

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : 'url is required'})
    const recievedURL = ensureHttpPrefix(body.url);
    const shortID = shortId();
    const newURL = new URL({
        shortId : shortID,
        redirectURL : recievedURL,
        visitHistory : [],
    });
    try{
        await newURL.save()
        console.log("added")
        res.status(200).json({msg : "recorded successfully", shortId : shortID, url : recievedURL})
    }
    catch(err){
        console.log(err)
        res.status(404).send(err)
    }
}

const handleGetUrlAnalytics = async (req, res) =>{
    const myShortId = req.params.shortId;
    console.log("myshortid = ", myShortId)
    const entry = await URL.findOne({shortId : myShortId});
    console.log(entry)
    return res.json({
        shortId : myShortId,
        redirectUrl : entry.redirectURL,
        totalClicks : entry.visitHistory.length,
        analytics : entry.visitHistory
    })
}

const handleGetAllUrls = async (req, res) =>{
    await URL.find({}).sort({createdAt : -1})
    .then((data)=> {console.log("number of Urls : ",data.length); res.send(data)})
    .catch((err)=>{console.log(err); res.send(err)})
}

const handleGetSingleUrl = async (req, res) =>{
    const shortId = req.params.shortId
    await URL.findOne({shortId : shortId })
    .then((data)=> {console.log({message : "data found", shortId : data.shortId, redirectURL : data.redirectURL}); res.send(data)})
    .catch((err)=>{console.log("err", err); res.send(err)})
}

const handleDeleteUrlById = async (req, res) =>{
    const shortId = req.params.shortId
    await URL.deleteOne({shortId : shortId })
    .then((data)=> {console.log(data); res.send(data)})
    .catch((err)=>{console.log(err); res.send(err)})
}

const handleDeleteAllUrl = async (req, res) =>{
    await URL.deleteMany({})
    .then((data)=> {console.log(data); res.send(data)})
    .catch((err)=>{console.log(err); res.send(err)})
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetUrlAnalytics,
    handleGetAllUrls,
    handleGetSingleUrl,
    handleDeleteUrlById,
    handleDeleteAllUrl
}