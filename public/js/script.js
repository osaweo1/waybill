const open =document.getElementById('open')
const login=document.querySelector('.login-dis')
const cancel=document.querySelector('.cancel')
const date=new Date()
const displaydate =document.getElementById('date')
const displaytime =document.getElementById('time')
const generate=document.querySelector('.generate')
const reprint=document.querySelector('.re-print')
const edit=document.querySelector('.edit')
const view=document.querySelector('.view')
const generatewaybill=document.querySelector('.generate-waybill')
const reprintwaybill=document.querySelector('.reprint-waybill')
const editwaybill=document.querySelector('.edit-waybill')
const viewwaybill=document.querySelector('.view-waybill')
const motland=document.querySelector('#land')
const motwater=document.querySelector('#water')
const transporttype=document.querySelector('.transporttype')
const dname=document.querySelector('#d-name')
const vtype=document.querySelector('#v-type')
const addbutton=document.querySelector('#add')
const Cancel =document.querySelector('#cancel')
const table=document.getElementsByTagName('table')
const Delete =document.querySelectorAll('.delete')
const tradd=document.querySelectorAll('.tradd')
const cancelapprove=document.getElementById('approvecancel')

const waybillNumber=document.getElementById('waybillNumber')

const printwaybill=document.querySelector('.print-waybill')

const detailbody=document.querySelector('.detailbody')

let checkapprove=document.getElementById('approve')



let i


// console.log(login)

if(open){
    open.addEventListener('click',()=>{
        // console.log(login)
       login.style.display="flex"
    })
}
if(cancel){
    cancel.addEventListener('click',(e)=>{
        e.preventDefault()
        login.style.display="none"
    })
}


displaydate.innerHTML=date.toDateString()
let yr=date.getUTCFullYear()
let hr=date.getHours()
let min=date.getMinutes()
let sec=date.getSeconds()
let session="AM"
if(hr==0){hr=12}
if(hr>12){hr=hr-12;session="PM";}
// hr=(hr<10)? "0"+hr:hr
displaytime.innerHTML=hr +":"+min+":"+sec + session;




// Menu Control

if(generate){
    generate.addEventListener('click',(e)=>{
        e.preventDefault()
        // console.log(generatewaybill)
        generatewaybill.style.display='flex'
        generate.classList.add('active-button')
        reprint.classList.remove('active-button')
        edit.classList.remove('active-button')
        view.classList.remove('active-button')
        viewwaybill.style.display='none'
        reprintwaybill.style.display='none'
        viewwaybill.style.display='none'
        // transporttype.style.display='none'
    })
}
if(reprint){
    reprint.addEventListener('click',(e)=>{
        e.preventDefault()
        generatewaybill.style.display='none'
        generate.classList.remove('active-button')
        reprint.classList.add('active-button')
        edit.classList.remove('active-button')
        view.classList.remove('active-button')
        reprintwaybill.style.display='flex'
        editwaybill.style.display='none'
        viewwaybill.style.display='none'
        
    })
}
if(edit){
    edit.addEventListener('click',(e)=>{
        e.preventDefault()
        generatewaybill.style.display='none'
        generate.classList.remove('active-button')
        reprint.classList.remove('active-button')
        edit.classList.add('active-button')
        view.classList.remove('active-button')
        editwaybill.style.display='flex'
        reprintwaybill.style.display='none'
        viewwaybill.style.display='none'        
    })
}
if(view){
    view.addEventListener('click',(e)=>{
        e.preventDefault()
        generatewaybill.style.display='none'
        generate.classList.remove('active-button')
        reprint.classList.remove('active-button')
        edit.classList.remove('active-button')
        view.classList.add('active-button')
        viewwaybill.style.display='flex'
        editwaybill.style.display='none'
        reprintwaybill.style.display='none'
        
    })
}


const motselect=()=>{
    if(motland.checked){
        transporttype.style.display='flex'
        dname.innerHTML="Driver's Name:"
        vtype.innerHTML-"Vehicle Type:"
    }
    if(motwater.checked){
        transporttype.style.display='flex'
        dname.innerHTML="Captain's Name:"
        vtype.innerHTML="Boat Type:"
    }
}


const radio=document.getElementsByName('mot')
radio.forEach(element => {
    element.addEventListener('click',()=>{
        motselect()
    })
});

let counter=1;
if(addbutton){
    let newfield=''
    addbutton.addEventListener('click',(e)=>{
        e.preventDefault()
        const tr=document.createElement('tr')
        tr.setAttribute('class','tradd')
        newfield=`<td><input type="number" min="1" name="serialnumber"></td>
        <td><input type="text" name="iname" id='itemname_'+counter+''></td>
        <td><textarea name="idescription" id="description_'+counter+'" ></textarea></td>
        <td><input type="number" min="1" name="quantity" id="quantity_'+counter+'"></td>
        <td><input type="text" name="unit" id="unit"></td>
        <input class="deleted" type="button" value="-" onclick="remove(this)"/>`
        tr.innerHTML=newfield
        table[0].appendChild(tr)
        // console.log(Delete)
        counter++
    })
}

if(Cancel){
    Cancel.addEventListener('click',(e)=>{
        e.preventDefault()
        generatewaybill.style.display='none'
        generate.classList.remove('active-button')
        window.location.reload()
    })
}

if(cancelapprove){
    cancelapprove.addEventListener('click',(e)=>{
        e.preventDefault()
        viewwaybill.style.display='none'
        generate.classList.remove('active-button')
        window.location.reload()
    })
}


function remove(e){
    // e.preventDefault()
    e.parentNode.remove()
}
if(printwaybill){
    printwaybill.addEventListener('click',()=>{
        alert('hello')
    })
}
waybillNumber.value=`GPNL/WB/${yr}/${Math.floor(Math.random()*10000)}`





// if(checkapprove){
//     approvebutton.style.pointerEvents='visible'
// }


// checkapprove.addEventListener('click',(e)=>{
//     if(checkapprove.checked==true){
//         approvebutton.style.pointerEvents='visible'
//     }
// })