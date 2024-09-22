const dbConnection = require('./database');

module.exports = {
    UserList: async function () {
            try {
                const query = "select * from User_TB";
                const result = await new Promise((resolve, reject) => {
                    dbConnection.query(query, function (err, rows, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                        console.log(rows);
                    });
                });
    
                if (result.length === 0) {
                    throw new Error("No data found for the User_TB");
                }
    
                return { result: result, error: null };
            } catch (error) {
                return { result: null, error: error };
            }
    }
};
