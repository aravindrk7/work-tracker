const router = require('express').Router();
const Work = require('../models/workModel');

router.get('/', async (req, res) => {
    res.send("Dashboard API 👨‍💻");
});

// Get all work info
router.get('/all', async (req, res) => {
    try {
        const workData = await Work.find();
        if (workData) {
            res.json(getWorkData(workData));
        }
        else {
            res.json(workData);
        }

    }
    catch (err) {
        res.json({ message: err });
    }
});

// Get specific work info
router.get('/:category', async (req, res) => {
    console.log(req.params['category']);
    try {
        const workData = await Work.find({ category: req.params['category'] });
        if (workData) {
            res.json(getWorkData(workData));
        }
        else {
            res.json(workData);
        }
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.post('/add-work', async (req, res) => {
    const addWork = new Work({
        category: req.body.category,
        subCategory: req.body.subCategory,
        status: req.body.status,
        title: req.body.title,
        earning: req.body.earning,
        startdate: Date.now()
    });
    try {
        const savedWork = await addWork.save();
        res.json(savedWork);
    }
    catch (err) {
        res.json({ message: err });
    }

});


function getGraphData(data) {
    let series = [];
    for (let i = 0; i < 12; i++) {
        series.push(data.filter(item => {
            return item.startdate.getMonth() == i;
        }).length);
    }
    return series;
}

function getWorkData(data) {
    let obj = {
        projects: data.length,
        earnings: data.reduce((sum, item) => { return sum + item.earning }, 0),
        earningsPerProject: Math.ceil(data.reduce((sum, item) => { return sum + item.earning }, 0) / data.length),
        projectPerMonth: data.length / 12,
        open: data.filter(item => item.status == 'open').length,
        inProgress: data.filter(item => item.status == 'inProgress').length,
        completed: data.filter(item => item.status == 'completed').length,
        list: data.sort((a, b) => b.startdate - a.startdate),
        graph: getGraphData(data)
    };
    return obj;
}

module.exports = router;