const fs = require('fs').promises;
const path = require('path')

const delete_file = async(filepath)=>{
    try {
        await fs.unlink(filepath)
        // console.log(" File deleted successfully");
    } catch (error) {
        console.log(error)
    }
}

module.exports = {delete_file}