const { TestModel } = require('../models');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports = {
    post1: async (req, res, next) => {
        const dataBody = req.body;
        try {
            let result = []
            dataBody.filter((v, i, a) => a.findIndex(v2 => (v2.master === v.master)) === i).find(pre => {
                result.push({
                    master: pre.master,
                    slave: dataBody.filter(filter => filter.master == pre.master).map(map => map.slave)
                })
            })
            res.json(result)
        } catch (error) {
            next(error)
        }
    },
    post2: async (req, res, next) => {
        const dataBody = req.body;
        try {
            let result = {};
            dataBody.filter((v, i, a) => a.findIndex(v2 => (v2.master === v.master)) === i).find(pre => {
                result[`${pre.master}`] = dataBody.filter(filter => filter.master == pre.master).map(map => map.slave)
            })
            res.json(result)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }
}


