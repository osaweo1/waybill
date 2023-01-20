
const {Waybill,User}=require('../models/waybillgenerate')
const jwt=require("jsonwebtoken")



const requireAuth=(req,res,next)=>{
    
    const token=req.cookies.token
    // console.log(token)

    if(token){
        // console.log(token)
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedtoken)=>{
            if(err){
                console.log(err)
                res.redirect("/")
            }
            else{
                // console.log(decodedtoken)
                next()
            }
        })
    }
    else{
        res.redirect("/")
    }
    
}


const checkUser= (req,res, next)=>{
    const token=req.cookies.token

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedtoken)=>{
            if(err){
                console.log(err)
                res.locals.user=null
                next()
            }
            else{
                // console.log(decodedtoken)
                let user= await User.findById(decodedtoken._id)
                // console.log(user)
                res.locals.user=user
                next()
            }
        })
    }
    else{
        res.locals.user=null
        next()
    }
}

const userArea=(req,res,next)=>{
    const token=req.cookies.token
    if(token){

        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedtoken)=>{
            if(decodedtoken){
                let user= await User.findById(decodedtoken._id)
                if(user.role==="User"){
                    next()
                }
                else{
                    res.cookie('token','',{
                        maxAge:1,
                    })
                    res.redirect('/')
                }
            }
            else{
                // console.log(decodedtoken)
                res.redirect('/')
            }
        })
    }
    else{
        res.redirect('/')
    }
}
const userApprove=(req,res,next)=>{
    const token=req.cookies.token
    if(token){

        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedtoken)=>{
            if(decodedtoken){
                let user= await User.findById(decodedtoken._id)
                if(user.role==="Approver"){
                    next()
                }
                else{
                    res.cookie('token','',{
                        maxAge:1,
                    })
                    res.redirect('/')
                }
            }
            else{
                // console.log(decodedtoken)
                res.redirect('/')
            }
        })
    }
    else{
        res.redirect('/')
    }
}


module.exports={requireAuth,checkUser,userArea,userApprove}


