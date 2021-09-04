const { calculateTip, faherenheitToCelsius, celsiusToFaherenheit, add } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('default value', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('celsiustToFaherenheite', () => {
    const degree = celsiusToFaherenheit(0)
    expect(degree).toBe(32)
})

test('faherenheitToCelsius', () => {
    const celsius = faherenheitToCelsius(32)
    expect(celsius).toBe(0)
})

test('Async test Demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000)

})

test('Should add two numbers',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await',async()=>{
    const sum = await add(2,3)
        expect(sum).toBe(5)
})