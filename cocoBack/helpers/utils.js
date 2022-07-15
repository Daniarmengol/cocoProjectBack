const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");


// 2+ queries de una.
const executeQuery = (pQuery, values = []) => {
    return new Promise((resolve, reject) => {
        db.query(pQuery, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


// Solo 1 query.
const executeQueryOne = (pQuery, values) => {
    return new Promise((resolve, reject) => {
        db.query(pQuery, values, (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) return resolve(null);
            resolve(result[0]);
        });
    });
};


// Expiración token: 1 día.
// expDate: dayjs().add(1, "days").unix()
// cambiar el () del .add(valor, 'tiempo')
const createToken = (user) => {
    const obj = {
        userId: user.id,
        expDate: dayjs().add(1, "days").unix()
    };
    return jwt.sign(obj, "baba12345");
};


module.exports = { executeQuery, executeQueryOne, createToken };