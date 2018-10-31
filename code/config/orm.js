const connection = require('./connection.js');

// Helper function for SQL syntax.
// ["?", "?", "?"].toString() => "?,?,?";
const printQuestionMarks = num => {
    const questionMarkArray = [];

    for (let i = 0; i < num; i++) {
        questionMarkArray.push('?');
    }

    return questionMarkArray.toString();
};

// helper function to convert object key: value pairs to SQL syntax
const objToSql = obj => {
    const arr = [];

    for (const key in obj) {
        const value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }

            arr.push(`${key}=${value}`);
        };
        console.log(arr, 'array')
    }
    return arr.toString();
}

console.log(objToSql({thing: "value", otherThing: "otherValue"}))

const orm = {
    selectAll: (table, _cb) => {
        let query = `SELECT * FROM ${table};`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            _cb(res);
        });
    },

    insertOne: (table, columns, values, _cb) => {
        let query = `INSERT INTO ${table} (${columns.toString()}) VALUES (${printQuestionMarks(values.length)});`;
        console.log(query);
        connection.query(query, values, (err, res) => {
            if (err) throw err;
            _cb(res);
        });
    },

    // objColVals is the data being changes, e.g. {name: "burgerName", devoured: true}, condition is where its changed
    updateOne: (table, objColVals, condition, _cb) => {
        let query = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE id = ${condition};`;
        console.log(query);
        connection.query(query, (err, res) => {
            if (err) throw err;
            _cb(res);
        });
    }
};

module.exports = orm;