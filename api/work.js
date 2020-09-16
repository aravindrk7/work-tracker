const router = require('express').Router();
const works = require('../models/works');

router.post('/add', async (req, res) => {
    const work = new works({
        category: req.body.category,
        subCategory: req.body.subCategory,
        status: req.body.status,
        title: req.body.title,
        earning: req.body.earning,
        startdate: Date.now()
    });
    try {
        const savedWork = await work.save();
        res.json(savedWork);
    }
    catch (err) {
        res.json({ message: err });
    }

});


router.patch('/update', async (req, res) => {
    try {
        const updatedWork = await works.findByIdAndUpdate(req.body._id, req.body);
        res.json(updatedWork);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedWork = await works.findByIdAndRemove(req.params.id);
        res.json(deletedWork);
    }
    catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;