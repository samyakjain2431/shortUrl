const URL = require('./models/urlSchema')

const handleRedirectUrl = async (req, res) => {
    const shortId = req.params.shortId;
    console.log(`Received shortId: ${shortId}`);
    try {
      const data = await URL.findOneAndUpdate(
        { shortId: shortId },
        { $push: { visitHistory: { timestamp:  new Date().toLocaleString() } } },
        { new: true } // to return the modified document
      );
      console.log({message: 'entry found', shortId : data.shortId, redirectUrl : data.redirectURL});
      if (data && data.redirectURL) {
        res.redirect(data.redirectURL); // Default 302 redirect
      } else {
        res.status(404).send('Entry not found or redirectURL missing');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

module.exports = {handleRedirectUrl}