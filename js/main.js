// BÀI 1: getElementById + innerText
// đối tượng để tương tác với HTML => document
let btn = document.getElementById("btn-result")
console.log("btn: ", btn)
console.dir(btn)


document.getElementById("btn-result").addEventListener("click", function(){
    // show dữ liệu lên thẻ p
    // B1: truy cập tới thẻ p trên HTML
    let text = document.getElementById("text-result")
    // B2: gán giá trị vào trong thẻ p
    text.innerText = "Nội dung sau khi click"
})

// ES6: arrow function

// ES5:
function add(a, b) {
    return a + b
}

const add1 = (a, b) => {
    // logic code ở đây
    return a + b
}

// TH1: nếu chỉ có 1 dòng code => lược bớt dấu {} và return
const add2 = (a, b) => a + b

// TH2: nếu chỉ có 1 tham số => lược bớt dấu ()
const binhPhuong = a => a * a

// template string
// phím gần với phím !
let result = `function ES5: ${add(3, 4)}`

let result1 = `
    zxczxc ${binhPhuong(3)}
    zxczxc ${add1(3, 4)}
    zxczxc
    zxczxc ${add(3, 4)}
`


console.log(result)
console.log("function ES5: ", add(3, 4))
console.log("function ES6: ", add1(3, 4))
console.log("function 1 line code ES6: ", add2(3, 4))
console.log("function 1 parameter and 1 line code: ", binhPhuong(3))

let btn1 = document.getElementsByClassName("font-bold")
console.log("btn1: ", btn1)

console.log("17/3: ", 17/3)
console.log("17/3: ", Math.floor(17/3))
