const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const eventsFilePath = path.join(__dirname, '../data/events.json');

const loadEvents = () => {
    try {
        const data = fs.readFileSync(eventsFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading events file:", error);
        return [];
    }
};

const saveEvents = (events) => {
    try {
        fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), "utf8");
    } catch (error) {
        console.error("Error writing events file:", error);
    }
};

exports.createEvent = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() });
    }

    const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;
    let events = loadEvents();
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;

    const newEvent = {
        id: newId,
        name: eventName,
        description: eventDescription,
        location,
        requiredSkills,
        urgency,
        date: eventDate,
        assignedVolunteers: []
    };

    events.push(newEvent);
    saveEvents(events);
    console.log("Event created successfully!", newEvent);
    return res.status(201).json({ message: "Event created successfully!", event: newEvent });
};
