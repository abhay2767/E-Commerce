const Product_From_Model = require('../Model/Product_Model')
const mongoose = require('mongoose')
const path = require('path')
const {delete_file} = require('../Helper/Delete_Image')

const Add_Product = async(req,res) =>{
    try {
        const {title, slug, desc, category, size, color, price, availableQty} = req.body;
        const slug_exist = await Product_From_Model.findOne({slug:slug})
        if(slug_exist){
            res.status(400).json({message: "Slug is already available"})
        }
        const Product = new Product_From_Model({
            title: title,
            slug: slug,
            desc: desc,
            images: req.file.filename,
            category: category,
            size: size,
            color: color,
            price: price,
            availableQty: availableQty
        })
        const Product_Data = await Product.save();
        res.status(200).json(Product_Data)
    } catch (error) {
        console.log(error)
    }
}

const Get_Products = async(req,res)=>{
    try {
        const Products = await Product_From_Model.find()
        res.status(200).json(Products)
    } catch (error) {
        console.log(error)
    }
}

const Update_Product = async(req,res)=>{
    try {
        const {title, slug, desc, category, size, color, price, availableQty} = req.body;
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({Message: "Invalid Id format"})
        }
        const old_product = await Product_From_Model.findById(id)
        if(!old_product){
            res.status(400).json({Message: "Product not found"})
        }
        // console.log(product.images)
        const data = {
            title, slug, desc, category, size, color, price, availableQty
        }
        if(req.file.filename !== undefined){
            data.images = req.file.filename;
            const oldimg = await path.join(__dirname,'../Public/images/' + old_product.images)
            if(req.file.filename == old_product.images ){
                return res.status(400).json({Message:"Please choose new image"})
            }
            // console.log(oldimg)
            delete_file(oldimg)
        }
        const new_product = await Product_From_Model.findByIdAndUpdate({_id:id},{$set:data}, {new:true})
        res. status(200).json({ new_product,  Message:"Product Updated"})
    } catch (error) {
        console.log(error)
    }
}

const Delete_Product = async(req,res)=>{
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({Message: "Invalid Id format"})
        }
        const product = await Product_From_Model.findById(id)
        if(!product){
            res.status(400).json({Message: "Product not found"})
        }
        const delete_product = await path.join(__dirname,'../Public/images/'+product.images)
        delete_file(delete_product)
        await Product_From_Model.findByIdAndDelete(id)
        res.status(200).json({Message:"Product is deleted"})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {Add_Product,Get_Products,Update_Product,Delete_Product}