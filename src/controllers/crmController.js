const mongoose = require('mongoose');
const ContactSchema = require('../models/crmModel');

const Contact = mongoose.model("Contact", ContactSchema);

const addNewContact = (req, res) => {
    const newContact = new Contact(req.body)

    newContact.save((err, contact) => {
        if (err){
            res.send(err)
        }
        res.json(contact)
    } )
}

const getContacts = (req, res) => {
    Contact.find({}, (err, contact) => {
        if (err){
            res.send(err)
        }
        res.json(contact)
    } )
}

const getContactWithId = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if(err){
            res.send(err)
        }
        res.json(contact)
    })
}

const updateContact = (req, res) => {
    Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, {new: true, useFindAndModify: false }, (err, contact) => {
        if(err){
            res.send(err)
        }
        res.json(contact)
    })
    
}

const deleteContact = (req, res) => {
    Contact.remove({ _id : req.params.contactId}, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json({message : "Successfully Deleted Item"})
    })
}



module.exports = {
    addNewContact : addNewContact,
    getContacts : getContacts,
    getContactWithId : getContactWithId,
    updateContact : updateContact,
    deleteContact : deleteContact
}