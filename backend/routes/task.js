const express=require("express")
const router=express.Router()
const requireAuth=require("../middleware/requireAuth")

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/tasks")

router.use(requireAuth)

router.route('/v1').get(getAllTasks).post(createTask)
router.route('/v1/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router