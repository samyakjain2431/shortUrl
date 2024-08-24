const express = require("express");

const { handleCreateNewUser,
    handleGetAllUser,
} = require("../controllers/userHandle");

const router = express.Router()

router.get('/', handleGetAllUser)
router.post('/', handleCreateNewUser)

module.exports = router;