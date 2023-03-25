const itemDB = require("../models/addItem")
const postUser = require('../models/userModel');

async function addItem(req, res) {
    // console.log(req.body)
    const response = await itemDB.insertMany([req.body])
    // console.log(response)
    if(response) {
        res.status(201).send({
            responseStatus: "SUCCESS",
            error: "",
            data: response[0],
            request: "OK",
            message:"Iteam Added Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}

async function getAllItem(req, res) {
    // console.log(req.body)
    let body = {
        assignTo : req.params.email
    }
    const response = await itemDB.find(body)
    // let page = req.body.page
    // let limit = req.body.limit
    // let totalRecords = response.length
    // let result = response.splice(page*limit, limit)
    // let arr = result.map(ele => {
    //     return {
    //         _id : ele._id,
    //         type : ele.type,
    //         status : ele.status,
    //         details : ele.details
    //     }
    // })
    if(response) {
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            data: response,
            request: "OK",
            message:"Iteam Recieved Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}

async function editItem(req, res) {
    // console.log(req.body)

    const response = await itemDB.updateOne({_id:req.params._id}, req.body)
    if(response) {
        // console.log(response)
        res.status(204).send({
            responseStatus: "SUCCESS",
            error: "",
            data: [],
            request: "OK",
            message:"Iteam Updated Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}

async function deleteItem(req, res) {
    // console.log(req.params)
    const response = await itemDB.deleteOne({_id:req.params._id})
    console.log(response)
    if(response) {
        res.status(204).send({
            responseStatus: "SUCCESS",
            error: "",
            data: {
                Message : "Data Deleted"
            },
            request: "OK",
            message:"Iteam Deleted Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}

async function allUsers(req, res) {
    const response = await postUser.find({});
    if (response) {
      let arr = [];
      response.map((ele) => {
        if (ele.email != req.params.email) {
          arr.push({
            email: ele.email,
            _id: ele._id
          });
        }
      });
      res.status(200).send({
        responseStatus: "SUCCESS",
        error: "",
        data: arr,
        request: "OK",
        message: "Users Fetched Successfully",
      });
    } else {
      res.status(500).send({
        responseStatus: "FAILED",
        error: "",
        data: [],
        request: "OK",
        message: "Something went wrong",
      });
    }
  }

module.exports = {addItem, getAllItem, editItem, deleteItem, allUsers}