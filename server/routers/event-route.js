const express= require('express')
const router= express.Router()
const Event= require('../models/event-model')
const auth = require("../middlewares/auth-middleware");

router.get('/', async(req, res)=>{
    res.status(200).json({msg: "Events route"})
})

router.post('/add',auth, async (req, res) => {
    try {
        const {date, time, type, remark}= req.body

    const newEvent = await Event.create({
        user: req.user,
        date,
        time,
        type, 
        remark
    })
     res.status(201).json({ msg: "Event created successfully", event: newEvent });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to create event"})
    }
    
})

router.get("/my-events", auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user }).sort({ date: 1 }); // Sorted by date
    res.status(200).json(events);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  const id= req.params.id
  try {
    await Event.findOneAndDelete({_id: id, user: req.user})
    res.status(200).json({msg: "Event deleted"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

module.exports = router;