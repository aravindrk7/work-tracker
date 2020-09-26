const router = require('express').Router();
const Work = require('../models/workModel');

router.get('/', async (req, res) => {
    res.send("Work API ✍");
});

router.post('/add', async (req, res) => {
    const newWork = new Work({
        category: req.body.category,
        subCategory: req.body.subCategory,
        status: req.body.status,
        title: req.body.title,
        earning: req.body.earning,
        startdate: Date.now()
    });
    try {
        const savedWork = await newWork.save();
        res.json(savedWork);
    }
    catch (err) {
        res.json({ message: err });
    }

});


router.patch('/update', async (req, res) => {
    try {
        const updatedWork = await Work.findByIdAndUpdate(req.body._id, req.body);
        res.json(updatedWork);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedWork = await Work.findByIdAndRemove(req.params.id);
        res.json(deletedWork);
    }
    catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;