require('./database')
const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")
const user=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    
    date:{
        type:Date,
        default: Date.now()
    }
})




const waybillitems=new mongoose.Schema({
    serial_number:{
        type:[Number],
        required:true
    },
    item_name:{
        type:[String],
        required:true
    },
    item_description:{
        type:[String],
       
    },
    item_quantity:{
        type:[Number],
        required:true
    },
    item_unit:{
        type:[String],
        required:true
    }
})

const waybillapproved=new mongoose.Schema({
    approvers_comment:{
        type:String,
    },
    approved:{
        type:Boolean,
        default:false,
    },
    approved_date:{
        type:Date,
        default:Date.now
    },
    user:[{
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    }]
})



const waybill= new mongoose.Schema({
    waybill_id:{
        type:String,
        unique: true,
        index:true,
        required:true
    },
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true
    },
    t_name:{
        type:String,
        required:true
    },
    t_type:{
        type:String,
        required:true
    },
    t_registration:{
        type:String,
        required:true
    },
    date_Created:{
        type:Date,
        required:true,
        default:Date.now
    },

    note:{
        type:String
    },
    items:[waybillitems],
    approved_details:[waybillapproved],
    user:[{
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String
        },
        role:{
            type:String,
            required:true
        }
    }]
    
})





const Waybill= mongoose.model("Waybill",waybill)

// module.exports=mongoose.model('Waybill',waybill)

const User=mongoose.model("User",user)
// module.exports=mongoose.model("User",user)

module.exports={Waybill,User}

// module.exports=mongoose.model('waybill',waybillitems)