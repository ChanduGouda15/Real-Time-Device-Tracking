const express=require ('express')
const router=express.Router()
const {getRoute}=require('../controllers/locationController.js')

router.post('/route',getRoute)

module.exports=router;