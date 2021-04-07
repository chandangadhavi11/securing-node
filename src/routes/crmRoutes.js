
const {addNewContact, getContacts, getContactWithId, updateContact, deleteContact} = require("../controllers/crmController")
const {loginRequired, login, register} = require("../controllers/userControllers")

const routes = (app) => {
    app.route("/contact")
    // GET Request
    .get((req, res, next) => {
        console.log(`Request from : ${req.originalUrl}`);
        console.log(`Request type : ${req.method}`);
        next();
    }, loginRequired, getContacts)

    // .get(getContacts)

    // POST Request
    .post(loginRequired, addNewContact)

    // Second Route
    app.route("/contact/:contactId")

    .get(loginRequired, getContactWithId)

    .put(loginRequired, updateContact)

    .delete(loginRequired, deleteContact)


    // Registration Route
    app.route("/auth/register")
    .post(register)

    // Login Route
    app.route("/login")
    .post(login)


}   
module.exports = routes