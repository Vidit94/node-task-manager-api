const calculateTip = (total, tippercent = 0.25) => total + (total * tippercent)

const faherenheitToCelsius = (temp) => (temp - 32) / 1.8

const celsiusToFaherenheit = (temp) => (temp * 1.8) + 32

const add = (a,b) =>{
    return new Promise((resolve,reject)=>{
        if(a<0 || b<0){
            reject("No Non negative number are to be added")
        }
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
    
}
module.exports = {
    calculateTip,
    faherenheitToCelsius,
    celsiusToFaherenheit,
    add
}