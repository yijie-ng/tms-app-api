const { Router } = require('express');
const router = Router();
const apiController = require('../controller/tasksAPIController.js');
const { authentication } = require('../middlewares/basicAuth');

router.post('/v1/task/new', authentication, apiController.createTask);
router.get('/v1/tasks', authentication, apiController.getTasksByState);
router.put('/v1/task/:taskId', authentication, apiController.approveDone);

module.exports = router;