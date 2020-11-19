const eventModel = require('../models/eventModel');
const {
    validationResult
} = require('express-validator');


const createEvent = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        eventName,
        eventType,
        location,
        date
    } = req.body;

    try {
        const newEvent = new eventModel({
            eventName,
            eventType,
            location,
            date,
            user_id: req.user.id
        })

        const event = await newEvent.save();

        res.status(200).json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

}

const getUserEvent = async (req, res) => { // Gets all events with uid

    try {

        const events = await eventModel.find({
            user_id: req.user.id
        });

        if (!events) {
            return res.status(400).json({
                'msg': `Event doesn't exists`
            })
        }

        res.status(200).json(events);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const getEvent = async (req, res) => { // Gets single event with eid

    try {
        const events = await eventModel.find({
            _id: req.params.eid
        });

        console.log(events);

        if (!events) {
            return res.status(400).json({
                'msg': `Events doesn't exists`
            })
        }

        res.status(200).json(events);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const getAllEvents = async (req, res) => { // Gets all user's all events

    try {

        const events = await eventModel.find();

        if (!events) {
            return res.status(400).json({
                'msg': `Event doesn't exists`
            })
        }

        res.status(200).json(events);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}

const deleteEvent = async (req, res) => {

    try {
        let event = await eventModel.findOneAndDelete({
            _id: req.params.eid
        });

        if (!event) {

            return res.status(400).json({
                'msg': `Event doesn't exists`
            })
        }

        res.status(200).json({
            event,
            'msg': `Event deleted`
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }


}

const updateEvent = async (req, res) => {

    try {
        
        let event = await eventModel.findOneAndUpdate({
            _id: req.params.eid
        }, req.body, {
            new: true
        });

        if (!event) {
            return res.status(400).json({
                'msg': `Event doesn't exists`
            })
        }

        res.status(200).json({
            event,
            'msg': `Event updated`
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}


module.exports.createEvent = createEvent; //C
module.exports.getEvent = getEvent; //R
module.exports.getUserEvent = getUserEvent;
module.exports.getAllEvents = getAllEvents;
module.exports.updateEvent = updateEvent; //U
module.exports.deleteEvent = deleteEvent; //D  

// "dev" : "concurrently  \"npm run server\" \"cd../frontend/hx_app\"  \"npm start\"",