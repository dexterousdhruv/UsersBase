const { Router } = require("express")
const { userPost, getAllUsers, getUser, updateUser, deleteUser, updateStatus, exportUser } = require("../controllers/user.controllers")
const upload = require("../multer/storageConfig")

const router = Router()


//routes
router.post("/user/register", upload.single('user_profile'), userPost)
router.get("/users/all", getAllUsers)
router.get("/user/:_id", getUser)
router.put('/user/edit/:_id', upload.single('user_profile'), updateUser)
router.delete("/user/delete/:_id", deleteUser)
router.patch("/user/status/:_id", updateStatus)
router.get("/users/export", exportUser)

module.exports = router 