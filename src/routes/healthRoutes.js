const express = require('express');
const router = express.Router();
const healthRecordController = require('../controllers/healthRecordController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/records', healthRecordController.createRecord);
router.get('/records', healthRecordController.getRecords);
router.get('/records/:id', healthRecordController.getRecord);
router.put('/records/:id', healthRecordController.updateRecord);
router.delete('/records/:id', healthRecordController.deleteRecord);

router.post('/reminders', healthRecordController.createReminder);
router.get('/reminders', healthRecordController.getReminders);
router.put('/reminders/:id', healthRecordController.updateReminder);
router.delete('/reminders/:id', healthRecordController.deleteReminder);

module.exports = router; 