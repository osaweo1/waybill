require('../models/database')
const {Waybill,User}=require('../models/waybillgenerate')


const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


console.log({Waybill} )
console.log({User})

exports.homepage= async(req,res)=>{

    try{
        content={
            title:'Waybill Home'
        }
        
        res.render('index',content)
        res.sendStatus(200)
    }
    catch(error){
        console.log(error)
    }

}

exports.menu=async(req, res)=>{
    const infoErrorsObj=req.flash('infoErrors')
    const infoSubmitObj=req.flash('infoSubmit')
    try{
        const results=await Waybill.aggregate([{$unwind:"$approved_details"},{$match:{"approved_details.approved":true
    }},{$sort:{"approved_details.approved_date":-1}}])
    let counts=await Waybill.aggregate([{$unwind:"$approved_details"},
    {$match:{"approved_details.approved":true}},
    {$group:{_id:null,count:{$sum:1}}}])

        // console.log(results)
        // console.log(counts)

        content={
            title:"waybill menu",
            results:results,
            counts:counts,
            infoErrorsObj:infoErrorsObj,
            infoSubmitObj:infoSubmitObj
        }
        res.render('waybill',content)
        
    }
    catch(error){
        console.log(error)
    }
    
}


exports.waybillgenerate=async(req,res)=>{
    try{
        // const waybillNumber=document.getElementById('waybillNumber')
        const {waybillNumber, destination,from_destination, drivers_name,
            vehicle_type,vehicle_number,note,serialnumber,iname,
            idescription,quantity,unit,fullname,role,email}=req.body
            console.log(fullname)

        Waybill.findOne({waybill_id:waybillNumber}, (result)=>{
            if(result){
                
                req.flash('infoErrors','waybill number already used reload to Re-generate')
                res.redirect('/menu')
            }else{
                let waybill=new Waybill({
                    waybill_id:waybillNumber,
                    from:from_destination,
                    to:destination,
                    t_name:drivers_name,
                    t_type:vehicle_type,
                    t_registration:vehicle_number,
                    note:note,
                    items:{
                        serial_number:serialnumber,
                        item_name:iname,
                        item_description:idescription,
                        item_quantity:quantity,
                        item_unit:unit
                    },
                    approved_details:{
                        approvers_comment:""
                    },
                    user:{
                        fullname:fullname,
                        email:email,
                        role:role
                    }
                   
                    
        
                })
                waybill.save((err,responds)=>{
                    if(responds){
                        req.flash('infoSubmit','Waybill Sent For Approver')
                        res.redirect('/menu')
                    }else{
                        console.log(err)
                        res.redirect('/')
                    }
                })
                
            }
        })
        
    }
    catch(error){
        console.log(error)
    }
}

exports.wayBillDetails= async (req,res)=>{
    try{
        let details=await Waybill.findById({_id:req.params.id})
        const content={
            title:'Waybill Details',
            detail:details
        }
        res.render('printwaybills', content)
    }
    catch(error){
        console.log(error)
    }

}


exports.wayBillApproved=async(req,res)=>{
    //  console.log(req.params.id)
    try{
        let details=await Waybill.findById({_id:req.params.id})
        const content={
            title:'Waybill Approve',
            detail:details

        }
        res.render('approvedwaybill', content)
    }
    catch(error){
        console.log(error)
    }
}


exports.waybillToApproved=async(req,res)=>{
    const infoErrorsObj=req.flash('infoErrors')
    const infoSubmitObj=req.flash('infoSubmit')
    try{
        // let results=await Waybill.find({"waybill_details":{$eleMatch:{approved:"false"}}})
        const results=await Waybill.aggregate([{$unwind:"$approved_details"},{$match:{"approved_details.approved":false
    }},{$sort:{"approved_details.approved_date":-1}}])
        let counts=await Waybill.aggregate([{$unwind:"$approved_details"},
        {$match:{"approved_details.approved":false}},
        {$group:{_id:null,count:{$sum:1}}}])
 
        // console.log(counts)
        
        content={
            title:"waybill to Approved",
            results:results,
            counts:counts,
            infoErrorsObj:infoErrorsObj,
            infoSubmitObj,infoSubmitObj
        }
        res.render('waybilltoapproved',content)
        }
    catch(error){
        console.log(error)
    }


}

exports.waybillapprover=async(req,res)=>{
   try{
        const {comment,approved,waybill_id,id,fullname,email}=req.body
        // const apid=id.toString()
        Waybill.findByIdAndUpdate({_id:id},{
            approved_details:{
            approvers_comment:comment,
            approved:"true",
            user:{
                fullname:fullname,
                email:email
            }
        }},(err,result)=>{
            console.log(result)
            if(err){
                req.flash('infoErrors','Waybill Not Approved')
                res.redirect(`/wayBillDetail/:${id}`)
            }else{
                // console.log(result)
                req.flash('infoSubmit','Waybill Approved Successfully')
                res.redirect('/approve')
            }
        }
        )

   }
   catch(error){
    console.log(error)
   }

}


exports.waybilladministration=(req,res)=>{
    const infoErrorsObj=req.flash('infoErrors')
    const infoSubmitObj=req.flash('infoSubmit')

    try{
        const content={
            title:"Administration",
            infoErrorsObj:infoErrorsObj,
            infoSubmitObj:infoSubmitObj
        }

        res.render('admin',content)
    }
    catch(error){
        console.log(error)
    }


}

exports.registerUser=(req,res)=>{
    try{
        const {f_name,username,password,password1,email,role}=req.body
        // console.log(f_name,username,password,password1,email, role)
        if(password===password1){
            let pass=bcrypt.hashSync(password,10)
            User.findOne({username:username,email:email},(result)=>{
                if(result){
                    req.flash('infoError','UserName or Email Taken Already')
                    res.redirect("/administration")
                }else{
                    let newUser=new User({
                        fullname:f_name,
                        username:username,
                        email:email,
                        role,role,
                        password:pass
                    })
                    newUser.save()
                    req.flash('infoSubmit','user Created Successfully')
                    res.redirect("/administration")

                }
            })
        }
         
            
    }
    catch(error){
        console.log(error)
    }
}

//login

exports.loginSub=async(req,res)=>{
    try{
        const {username, password,role}=req.body
        // console.log(username, password,role)
        const maxAge=1*24*60*60

        const user= await User.findOne({username:username})
        if(user){
            const passwordMatch= await bcrypt.compare(password,user.password)
            if(role===user.role){ 
                if(passwordMatch){
                    const token=await jwt.sign({_id:user._id.toString(),username:user.username},process.env.JWT_SECRET,{
                        expiresIn:maxAge,
                    })
                    res.cookie('token',token,{httpOnly:true,maxAge:maxAge *1000})
                    // res.status(200).json({user:user._id})
                    if(user.role==="User"){
                        res.redirect("/menu")
                    }
                    else if(user.role==="Approver"){
                        res.redirect("/approve")
                    }else{
                        res.redirect("/Admin")
                    }
                }else{
                    console.log("wrong password")
                    res.redirect("/")
                }
            }else{
                console.log("invalid ")
                res.redirect('/')
            }
        }else{
            console.log("invalid Credencials")
            res.redirect('/')
        }
    } 
    
    catch(error){
        console.log(error)
    }
}


exports.logout=(req,res)=>{
    res.cookie('token','',{
        maxAge:1,
    })
    res.redirect('/')
}


exports.reprint=(req,res)=>{
    try{
        const {search}=req.body
        // console.log(search)
        if (search!=""){
            Waybill.find({waybill_id:search},(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if ("result.approved_details.approved" ===true) {
                        console.log(result)
                    }
                }
                
                
            })
        }
        else{
            console.log("Feild Cannot Be Empty")
            res.redirect("/menu")
        }

        
    }
    catch(error){
        console.log(error)
    }
}
