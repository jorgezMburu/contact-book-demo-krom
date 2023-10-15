const express = require('express')
const router = express.Router()
const models = require('../models/index')
const encyptor = require('../utils/encryption')

router.get('/', ( req, res ) => {
    res.send({
        status_code: 200, 
        message: "Allmost there! Write the correct route to proceed"
    });
})

/**Creates a single contact to the database - encypted using 'aes-256-cbc' algorithm */
router.post('/contact/create', async ( req, res ) => {
    var encypted_full_name = encyptor.encrypt(req.body.full_name)
    var encypted_phone_number = encyptor.encrypt(req.body.phone_number)

    // Check is user exists before creating them - and return error plus status code 299
    var existingUser = await fetchUserByPhoneNumber(encypted_phone_number);
    if ( existingUser ) {
        return res.send({
            status_code: 299, 
            message: "Phone number already exists!"
        });
    }

    models.contact_book_model.create({
        full_name: encypted_full_name,
        phone_number: encypted_phone_number
    }); 

    res.send({
        status_code: 200, 
        message: "Contact created successfully"
    });
})


/**Retrieves all contacts from the database and decrytps them*/
router.get('/contact/index', async ( req, res ) => {

    var contacts = await models.contact_book_model.findAll({
        attributes: ['id','full_name','phone_number','created_at']
    }); 

    await contacts.map(contact => {
        contact.full_name = contact.full_name && contact.full_name !== '' ? encyptor.decrypt(contact.full_name) : '';
        contact.phone_number = contact.phone_number && contact.phone_number !== '' ? encyptor.decrypt(contact.phone_number) : '';
    });

    res.send({
        status_code: 200, 
        message: "Contacts retrieved successfully",
        data: contacts
    });
})

/**We update a contacts full names using their phone number */
router.post('/contact/update', async ( req, res ) => {
    var encypted_full_name = encyptor.encrypt(req.body.full_name)
    var encypted_phone_number = encyptor.encrypt(req.body.phone_number)

    // Check is user exists so that you dont update what doesnt exist
    var existingUser = await fetchUserByPhoneNumber(encypted_phone_number);
    if ( ! existingUser ) {
        return res.send({
            status_code: 299, 
            message: "Phone number does not exists! Create the contact first"
        });
    }

    models.contact_book_model.update({
        full_name: encypted_full_name 
    }, { where: { phone_number: encypted_phone_number }
    }); 

    res.send({
        status_code: 200, 
        message: "User Updated Successfully"
    });
})


/**We delete a contacts using their phone number */
router.post('/contact/delete', async ( req, res ) => {
    var encypted_phone_number = encyptor.encrypt(req.body.phone_number)

    // Check is user exists so that you dont update what doesnt exist
    var existingUser = await fetchUserByPhoneNumber(encypted_phone_number);
    if ( ! existingUser ) {
        return res.send({
            status_code: 299, 
            message: "Phone number does not exists! Create the contact first"
        });
    }

    models.contact_book_model.destroy({ 
        where: { phone_number: encypted_phone_number }
    }); 

    res.send({
        status_code: 200, 
        message: "Contact Deleted Successfully"
    });
})

const fetchUserByPhoneNumber = async ( phone_number ) => {
    return await models.contact_book_model.findOne({ where: { phone_number: phone_number} }); 
}

module.exports = router