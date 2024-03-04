const express = require('express')
const router = express.Router()
const {Add_Product,Get_Products,Update_Product,Delete_Product} = require('../Controller/Product_Controller')
const bodyParser = require('body-parser')

router.use(express.json())

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

const multer = require("multer")
const path = require("path")

router.use(express.static('Public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,path.join(__dirname,'../Public/images/'));
    },
    filename: function(req,file,cb){
        const name = file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage: storage});

router.route('/Add_Product').post(upload.single('images'),Add_Product)
router.route('/Get_Products').get(Get_Products)
router.route('/Update_Product/:id').patch(upload.single('images'),Update_Product)
router.route('/Delete_Product/:id').delete(Delete_Product)

module.exports = router;