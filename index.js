const Nightmare = require('nightmare')
require("dotenv").config();
const nightmare = Nightmare({ show: true })
const nodemailer  =  require ("nodemailer");
const transporter  = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.pass,
        pass : process.env.email
    }

})

 let mailOptions1 = {
     from : "1ms19ec121@gmail.com",
     to : "jamyia22@pyjgoingtd.com",
     subject : "Price Drop",
     text : "Buy it now"
 }
 let mailOptions2 = {
    from : "1ms19ec121@gmail.com",
    to : "jamyia22@pyjgoingtd.com",
    subject : " Not a much Price Drop",
    text : "Wait for it"
}


const arguments = process.argv.slice(2);
const url  = arguments[0];
const checkprice = arguments[1];
let priceString 
var price 
async function check(){
 priceString = await
nightmare
  .goto(url)
  .wait('#priceblock_ourprice')
  .evaluate(() => document.querySelector('#priceblock_ourprice').innerText)
  .end()

   var str = priceString.replace(',','')
  var price = parseInt(str.slice(2,6));
  if(price<checkprice)
  {
    transporter.sendMail(mailOptions1,(err)=>{
        if(err)
        console.log(err)
        else
        console.log("Email sent Price Drop");
    })
  }
  
   else
   {
    transporter.sendMail(mailOptions2,(err)=>{
        if(err)
        console.log(err)
        else
        console.log("Email Sent Wait");
    })
   }
  

}
check();


