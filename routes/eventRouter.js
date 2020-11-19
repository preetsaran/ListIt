const express = require('express');
const auth = require('../middlewares/auth');
const { body } = require('express-validator');
const { createEvent , getAllEvents ,getUserEvent,getEvent ,deleteEvent ,updateEvent} = require('../controllers/eventController');
const check = [
                body('eventName', 'eventName is required').notEmpty(),
                body('eventType', 'eventType is required').notEmpty(),
                body('location', 'location is required').notEmpty(),
                body('date', 'Date is required').notEmpty(),
]

const router = express.Router();

router
    .route('/')
    .get(getAllEvents)
    .post([auth, check], createEvent)

router
    .route('/user')
    .get(auth , getUserEvent)

router
    .route('/:eid')
    .get(auth, getEvent)
    .delete(auth,deleteEvent)
    .patch(auth,updateEvent)
    
    
module.exports = router;

// { <input type="hidden" name="goto_date" value="goto_date"></input> }