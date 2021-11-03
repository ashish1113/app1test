const express = require('express');
const router = express.Router();
const meetingController=require("./controller/meetingController")

module.exports.setRouter = (app, ) => {

    app.post(`create/meet`, meetingController.createMeeting);

}