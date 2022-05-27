const { Router } = require('express');
const router = Router();
const apiController = require('../controller/tasksAPIController.js');
// const { authentication } = require('../middlewares/basicAuth');

router.post('/task/new', apiController.createTask);
router.get('/tasks', apiController.getTasksByState);
router.put('/task/:taskId', apiController.approveDone);

module.exports = router;