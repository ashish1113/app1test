const mongoose = require('mongoose');
const shortid = require('shortid');

const Meeting=mongoose.model('meeting')

let createMeeting=(req,res)=>{

    let validateMeeting = () => {
        return new Promise((resolve, reject) => {

                if(req.body.date && req.body.startTime && req.body.endTime){
                    Meeting.find({"startTime":{
                        $gte:req.body.startTime,
                        $lte:req.body.endTime} , "endTime":{$gte:req.body.endTime} }) .exec((err, res) => {

                            if (err) {
                                
                                let apiResponse ={"error":true, "message":'Failed to create meeting ',"data": res}
                                reject(apiResponse)
                            } else if (res.length >0) {
                                let apiResponse = {"error":true, "message":'Already ',"data": res}
                                reject(apiResponse)
                            }else{

                                resolve(req);
                            }
               
                })
            }

        })
    }

    let createMeeting = (req) => {


        return new Promise((resolve, reject) => {

            let packet ={
                "meetingId":shortid.generate(),
                ...req.body
            }

            let newMeeting =new Meeting(packet)

            newMeeting.save((err, newMeeting) => {
                if (err) {
                    
                    let apiResponse ={"error":true, "message":'Failed to create meeting ',"data": res}
                    reject(apiResponse)
                    
                   
                } else {
                    let newMeetingObj = newMeeting.toObject();
                    resolve(newMeetingObj)
                }
            })


        })
    }

    validateMeeting(req, res)
    .then(createMeeting)
    .then((resolve) => {
       
        let apiResponse = response.generate(false, 'meeting created ', 200, resolve)
        res.send(apiResponse)
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })

}



// let getAllAvailableSlotOfADay=(req,res)=>{


//     let findAllMeetingOfADAy=()=>{
//         return new Promise((resolve, reject) => {

//             Meeting.find()


//         })
//     }
// }


module.exports={
    createMeeting:createMeeting
}