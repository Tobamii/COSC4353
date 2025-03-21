const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

// ─────────────────────────────────────────────────────────────────────────────
// GET ALL EVENTS
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', getAllEvents);

// ─────────────────────────────────────────────────────────────────────────────
// GET SINGLE EVENT BY ID
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:eventId', getEvent);

// ─────────────────────────────────────────────────────────────────────────────
// CREATE EVENT
// ─────────────────────────────────────────────────────────────────────────────
router.post(
    '/',
    [
        check('eventName').notEmpty().withMessage('Event name is required'),
        check('eventDescription').notEmpty().withMessage('Event description is required'),
        check('location').notEmpty().withMessage('Location is required'),
        check('requiredSkills').isArray().withMessage('Required skills must be an array'),
        check('urgency').notEmpty().withMessage('Urgency is required'),
        check('eventDate').notEmpty().withMessage('Event date is required'),
    ],
    createEvent
);

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE EVENT
// ─────────────────────────────────────────────────────────────────────────────
router.put(
    '/:eventId',
    [
        // You can make these optional if not all fields need to be updated
        check('eventName').optional().notEmpty().withMessage('Event name cannot be empty'),
        check('eventDescription').optional().notEmpty().withMessage('Event description cannot be empty'),
        check('location').optional().notEmpty().withMessage('Location cannot be empty'),
        check('requiredSkills').optional().isArray().withMessage('Required skills must be an array if provided'),
        check('urgency').optional().notEmpty().withMessage('Urgency cannot be empty'),
        check('eventDate').optional().notEmpty().withMessage('Event date cannot be empty'),
    ],
    updateEvent
);

// ─────────────────────────────────────────────────────────────────────────────
// DELETE EVENT
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:eventId', deleteEvent);

module.exports = router;

