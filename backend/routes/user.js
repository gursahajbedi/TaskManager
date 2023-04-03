const express=require("express")
const router=express.Router()


const {
    login,
    signup,
    getallusers
}=require("../controllers/user")

router.route("/login").post(login).get(getallusers)
router.route("/signup").post(signup).get(getallusers)

module.exports = router