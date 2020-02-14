const mysql=require('mysql')
var reader=require("../utils/readfile");



const db=reader.config('db.json');
const pool=mysql.createPool(db);


module.exports = pool;

