const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read JSON files
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return [];
    }
};

// Define getVolunteers function
const getVolunteers = (req, res) => {
    const users = readJsonFile(usersFilePath);
    const volunteers = users.filter(user => user.userType === 'volunteer');
    res.json(volunteers);
};

// Define matchVolunteersToEvent function (example implementation)
const matchVolunteersToEvent = (req, res) => {
    // ... your code to match volunteers to events ...
    res.json({ message: 'Matched volunteer to event' });
};

// Define getVolunteerById function (example implementation)
const getVolunteerById = (req, res) => {
    const users = readJsonFile(usersFilePath);
    const { id } = req.params;
    const volunteer = users.find(user => user.id.toString() === id && user.userType === 'volunteer');
    if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json(volunteer);
};

// Define createVolunteer function
const createVolunteer = (req, res) => {
    const users = readJsonFile(usersFilePath);
    const newVolunteer = req.body; // Assumes volunteer data is provided in request body
    users.push(newVolunteer);
    // Optionally write the updated users array back to file using writeJsonFile if defined
    res.status(201).json({ message: "Volunteer created", volunteer: newVolunteer });
};

module.exports = {
    getVolunteers,
    matchVolunteersToEvent,
    getVolunteerById,
    createVolunteer,
};