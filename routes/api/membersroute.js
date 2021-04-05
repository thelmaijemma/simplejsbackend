const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');

// Beyond A Static Folder: ROUTES 
// See Routes Folder
// MEMBERS API ROUTES
// R: get all members 
router.get('/', (req, res) => res.json(members));
    // check in postman localhost:5000/api/members

// R: get a single member
router.get('/:id', (req, res) => {
    // first, lets handle scenarios 
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
    //res.send(req.params.id);
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
}); 

// Create A Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email'})
    }
    // return statement needed (or else)

    // if using a db like mongodb
    // member.save(newMember)

    members.push(newMember);
    /// res.json(members);
    // json moved to json button
    res.redirect('/');

    // res.send(req.body)
});

// Update Member
router.put('/:id', (req, res) => {
    // first, lets handle scenarios 
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name: member.name;
                member.email = updMember.email ? updMember.email: member.email;

                res.json({ msg: 'Member updated', member})
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
});

// Delete Member

router.delete('/:id', (req, res) => {
    // first, lets handle scenarios 
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
    res.json({ 
        msg: 'Member deleted',  
        members: members.filter(member => member.id !== parseInt(req.params.id))
    });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
}) 


module.exports = router; 