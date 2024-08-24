const express = require("express")

const {handleGenerateNewShortURL,
    handleGetUrlAnalytics,
    handleGetSingleUrl,
    handleGetAllUrls,
    handleDeleteUrlById,
    handleDeleteAllUrl
} = require("../controllers/urlC")

const router = express.Router()

//the route is already base/url/
router.get("/", handleGetAllUrls)
router.post('/', handleGenerateNewShortURL)
router.delete("/", handleDeleteAllUrl)

router.get('/:shortId', handleGetSingleUrl)
router.delete("/:shortId", handleDeleteUrlById)
router.get('/analytics/:shortId', handleGetUrlAnalytics )

module.exports = router;