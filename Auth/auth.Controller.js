
const { generateToken, verifytoken } = require('./jwtservices.js')
const { encryptpass, dcryptpass } = require('./bcrypt.js')
const postUser = require('../models/userModel');


async function checkalreadyUser(email) {
    const response = await postUser.findOne({ "email": email })
    if (response) {
        return response;
    } else {
        return false;
    }
}

async function register(req, res) {
    const body = req.body
    // console.log(body)
    let userexists = await checkalreadyUser(body.email)
    if (userexists) {
        res.status(409).send({
            responseStatus: "FAILED",
            error: "User Already Registered",
            data: null,
            request: "OK",
            message:""
        })
    } else {
        const encpass = encryptpass(body.password)
        body.password = encpass
        const response = await postUser.insertMany([body])
        response[0].password = ""
        res.status(201).send({
            responseStatus: "SUCCESS",
            error: "",
            data: response,
            request: "OK",
            message: "User Registered Successfully"
        })
    }
}

async function login(req, res) {
    const email = req.body.email
    const response = await checkalreadyUser(email)
    if (!response) {
        res.status(501).send({
            responseStatus: "FAILED",
            error: "Invalid Mail",
            message: "",
            data: null,
            request: "OK",
            token: null,
            _id : null
        })
        return;
    }
    const isvalidpass = dcryptpass(req.body.password, response.password)
    if (isvalidpass) {
        let payload = {
            email : response.email,
            firstName : response.firstName,
            lastName : response.lastName,
            securityQuestion : response.securityQuestion,
            _id : response._id
        }
        const token = generateToken(payload);
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            message: "Login Successfully",
            data: payload,
            request: "OK",
            token: token
        });
    } else {
        res.status(400).send({
            responseStatus: "FAILED",
            error: "Password Do Not Match",
            message: "",
            data: null,
            request: "OK",
            token: null
        })
    }

}

module.exports = {register, login }