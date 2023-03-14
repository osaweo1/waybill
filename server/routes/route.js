const express= require('express')

const router=express.Router()

const waybillcontorller= require('../controller/waybillcontorller')

const {requireAuth,checkUser,userArea,userApprove,userreload, userAuditor,deleteToken}=require('../middleware/authmiddleware')

// router.get('*',checkUser)

router.get('/',deleteToken,checkUser,waybillcontorller.homepage)

router.get('/menu',requireAuth,userArea,checkUser,waybillcontorller.menu)

router.post('/menu',waybillcontorller.waybillgenerate)

router.get('/waybillDetails/:id',requireAuth,checkUser,waybillcontorller.wayBillDetails)

router.post('/updated',waybillcontorller.waybillapprover)

router.get('/waybillDetail/:id',requireAuth,checkUser,waybillcontorller.wayBillApproved)

router.get('/approve/:id',requireAuth,checkUser,waybillcontorller.wayBillApproved)

router.get('/approve',requireAuth,userApprove,checkUser,waybillcontorller.waybillToApproved)

router.post('/updated',waybillcontorller.waybillapprover)

router.get('/administration',requireAuth,checkUser,waybillcontorller.waybilladministration)

router.post('/register',waybillcontorller.registerUser)

router.post('/login',waybillcontorller.loginSub)

router.get('/logout',waybillcontorller.logout)

router.post('/reprint',waybillcontorller.reprint)

router.get('/audit',requireAuth,userAuditor,checkUser,waybillcontorller.approvedWaybill)

router.get('/waybillDetailed/:id',requireAuth,checkUser,waybillcontorller.wayBillDetailed)


module.exports=router