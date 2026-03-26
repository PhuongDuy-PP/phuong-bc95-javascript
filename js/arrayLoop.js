// khai báo mảng số nguyên
let numbers = [1, 2, 3, 4, 5, 6]
let fruits = ["cam", "nho", "tao", "le", "man"]

console.log(`numbers: ${numbers}`)
console.log(`fruits: ${fruits}`)
console.log(numbers[2])
console.log(fruits[3])

// 1. đếm số lượng phần tử của mảng
console.log(`số lượng phần tử của mảng là: ${numbers.length}`)
// 2. Lấy phần tử cuối cùng của mảng
// chỉ số phần tử cuối cùng của mảng: length - 1
let lastIndex = numbers.length - 1
console.log(`Phần tử cuối cùng của mảng là: ${numbers[lastIndex]}`)

//   unshift() => [đầu mảng][1, 2, 3, 4, 5, 6][cuối mảng] <= push()
//   shift()   <= [đầu mảng][1, 2, 3, 4, 5, 6][cuối mảng] => pop()
// push(): thêm phần tử vào cuối mảng
numbers.push(7)
console.log(`mảng số nguyên mới là: ${numbers}`) // [1, 2, 3, 4, 5, 6, 7]

// unshift(): thêm phần tử vào đầu mảng
numbers.unshift(0)
console.log(`mảng số nguyên mới sau khi thêm vào đầu mảng là: ${numbers}`)

// pop(): xóa phần tử cuối cùng của mảng
let removedItem = numbers.pop()
console.log(`Phần tử bị xóa là: ${removedItem}. Mảng mới là: ${numbers}`)

// shift(): xóa phần tử đầu tiên của mảng
let removedFirst = numbers.shift()
console.log(`Phần tử bị xóa là: ${removedFirst}. Mảng mới là: ${numbers}`)

// splice: có thể xóa, sửa, thêm
// splice(vị trí bắt đầu, số lượng xóa, phần tử thêm vào (xóa))
// LƯU Ý: hàm này sẽ làm thay đổi mảng gốc
// XÓA - splice(vị trí bắt đầu xóa, số lượng phần tử cần xóa)
let food = ["Phở", "Cơm", "Mì", "Gỏi cuốn", "bún bò"]
// TH1: xóa Cơm
food.splice(1, 1)
console.log(`Mảng mới: ${food}`)
// TH2: xóa hết
food.splice(0)
console.log(`Mảng sau khi xóa hết: ${food}`)

// THÊM - splice(vị trí bắt đầu thêm, 0, những item cần thêm)
let langs = ["HTML", "CSS", "Javascript"]
// thêm python và java ở giữa HTML và CSS
langs.splice(1, 0, "python", "java")
console.log(`Mảng sau khi thêm là: ${langs}`)

// THAY THẾ - splice(vị trí bắt đầu thay thế, số lượng xóa, những item cần thêm)
let team = ["An", "Bình", "Cường", "Dũng", "Em"]
team.splice(1, 1, "Trinh", "Thúy")
console.log(`Mảng mới sau khi thay thế là: ${team}`)

// ES6:
// 1. arrow function: () => {}
// 2. let, const
// let: dùng cho những biến mà có thể thay đổi giá trị được
// const: dùng cho những biến mà không thể thay đổi được
// 3. template string: `${variable hoặc function}`

// 4. default parameter
const add10 = (number1=1, number2=2, number3=10) => {
    // code mới thêm
    if (number3) {
        return number1 + number2 + number3
    }
    // ---------

    // code cũ
    return number1 + number2
}
console.log("default parameter")
console.log(add10(3, 4))
console.log(add10(5))
console.log(add10())
console.log(add10(1, 2))

// 5. spread operator
// spread - trải ra
// dùng trong:
// - copy mảng/object
// - nối mảng/ merge object
// - truyền vào hàm
// Ý nghĩa: giảm thiểu code thủ công: copy mảng, nối mảng, truyền vào hàm
// TH1. Copy mảng
const original = [1, 2, 3]
// dùng const và ... để copy mảng
const copyOriginal = [...original]
copyOriginal.push(4)
console.log(`mảng cũ: ${original}`)
console.log(`Mảng mới: ${copyOriginal}`)

// TH2: nối mảng
const frontend = ["html", "css", "javascript"]
const backend = ["expressJS", "nestJS"]
const fullstack = [...frontend, ...backend]
console.log(`Fullstack: ${fullstack}`)


// JS buổi 3: bài tập

// Bài 1: in các số từ 1 đến n với n nhập từ bàn phím
const printNumbers = (n) => {
    // kiểm tra giá trị n có hợp lệ hay không
    // TH1: n < 0 => lỗi
    // TH2: n là không phải là số => lỗi
    if (n < 0 || isNaN(n)) {
        console.log("Giá trị n không hợp lệ")
        return
    }

    for(let i = 1; i <= n; i++){
        console.log(i)
    }
}
printNumbers(5)
printNumbers(-3)
printNumbers("abc")

// bài 2: in các số chẵn từ 1 -> n
const printEvenNumbers = (n) => {
    if (n < 0 || isNaN(n)) {
        console.log("Giá trị n không hợp lệ")
        return
    }

    // C1: dùng if
    // for(let i = 1; i <= n; i++){
    //     if (i % 2 === 0) {
    //         console.log(i)
    //     }
    // }

    // C2: tăng i lên 2 đơn vị
    for (let i = 2; i <= n ;i += 2) {
        console.log(i)
    }
}
printEvenNumbers(5)
printEvenNumbers(-3)
printEvenNumbers("abc")

// bài 3: đếm xem có bao nhiêu số chẵn, số lẻ từ 1 -> n
const countEvenOdd = (n) => {
    // tao 2 biến đếm số chẵn và số lẻ
    let countChan = 0
    let countLe = 0
    for(let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            countChan++
        } else {
            countLe++
        }
    }
    console.log(countChan, countLe)
}
countEvenOdd(10)

// Loop qua mảng
const numbers2 = [1, 2, 3, 4, 5]
// đk bắt đầu vòng lặp: duyệt từ item đầu tiên của mảng thông
// qua index (chỉ số) -> let i = 0

// đk kết thúc vòng lặp: duyệt tới cuối mảng
// i < số lượng phần tử của mảng (numbers2.length)

// bước nhảy: tăng i lên 1 đơn vị -> i++
// item đầu tiên -> 0
// item cuối cùng -> length - 1

// 7.   8.     5.     9.    2
// 0.   1.      2.     3.   4 (5 - 1)
// i => 0 -> length - 1 (i <= length - 1) -> i < length
const printArray = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
}

// WHILE
const printArrayWithWhile = (arr) => {
    let i = 0
    while(i < arr.length) {
        console.log(arr[i])
        i++
    }
}

console.log("in mảng số nguyên")
// LƯU arr và numbers2 phải cùng kiểu dữ liệu (mảng)
printArray(numbers2)

const printEvenArray = (arr) => {
    // for(let i = 0; i < arr.length; i++) {
    //     if(arr[i] % 2 === 0) {
    //         console.log(arr[i])
    //     }
    // }

    let i = 0
    while(i < arr.length) {
        if(arr[i] % 2 === 0) {
            console.log(arr[i])
        }

        i++
    }
}
printEvenArray(numbers2)

// tìm số lớn nhất trong mảng
// 4, 3, 7, 1, 9, 10, -4, -5

const findMax = (arr) => {
    let max = arr[0] // giả sử phần tử đầu tiên là lớn nhất
    // for(let i = 1 ; i < arr.length; i++) {
    //     if(arr[i] > max) {
    //         max = arr[i]
    //     }
    // }

    let i = 1
    while(i < arr.length) {
        if(arr[i] > max){
            max = arr[i]
        }
        i++
    }
    console.log(`Số lớn nhất trong mảng là: ${max}`)
}

const arr1 = [4, 3, 7, 1, 9, 10, -4, -5]
findMax(arr1)

// đảo ngược mảng
// 1, 2, 3, 4, 5 -> 5, 4, 3, 2, 1
const reverseArray = (arr) => {
    let reversed = []
    for(let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i])
    }
    console.log(`Mảng đảo ngược là: ${reversed}`)
}
const arr2 = [1, 2, 3, 4, 5]
reverseArray(arr2)

// LÀM BÀI TẬP MẢNG CÁC ĐỐI TƯỢNG (OBJECT)
// danh sách sinh viên: tên, tuổi, điểm trung bình

const students = [
    {name: "An", age: 20, gpa: 8.5 },
    {name: "Bình", age: 20, gpa: 7 },
    {name: "Cường", age: 19, gpa: 9.0 },
    {name: "Dương", age: 20, gpa: 5.5 },
]

// in ra sinh viên có điểm trung bình cao nhất lớp
const findTopStudent = (students) => {
    let topStudent = students[0]
        for(let i = 1; i < students.length; i++) {
            if(students[i].gpa > topStudent.gpa) {
                topStudent = students[i]
            }

        }
    console.log(`Sinh viên có điểm trung bình cao nhất là: ${topStudent.name} với điểm trung bình là: ${topStudent.gpa.toFixed(1)}`)

}
findTopStudent(students)

// sắp xếp sinh viên theo điểm trung bình từ cao đến thấp (thấp -> cao)
// sort có sẵn của javascript để hỗ trợ sắp xếp mảng
// LƯU Ý: hàm sort sẽ làm thay đổi mảng gốc => NÊN COPY MẢNG TRƯỚC KHI SẮP XẾP
const sortStudentsByGPA = (students) => {
    // copy mảng gốc => dùng spread operator
    const copyStudents = [...students]
    // khi muốn sắp xếp giảm dần thì dùng b - a
    // khi muốn sắp xếp tăng dần thì dùng a - b
    copyStudents.sort((a, b) => b.gpa - a.gpa)
    console.log(`Danh sách sinh viên sau khi sắp xếp theo điểm trung bình từ cao đến thấp:`)
    console.dir(copyStudents)

}
sortStudentsByGPA(students)


// DÙNG FOR OF ĐỂ LOOP QUA MẢNG
// KHÔNG DÙNG CHỈ SỐ NHƯ FOR THƯỜNG
const colors = ["đỏ", "xanh", "vàng", "tím"]
for(let color of colors) {
    console.log(color)
}

const findTopStudent1 = (students) => {
    let topStudent = students[0]
        for(let student of students) {
            if(student.gpa > topStudent.gpa) {
                topStudent = student
            }
        }
    console.log(`Sinh viên có điểm trung bình cao nhất là: ${topStudent.name} với điểm trung bình là: ${topStudent.gpa.toFixed(1)}`)

}

// FOR DÀNH CHO OBJECT
const student1 = {
    name: "An",
    age: 20,
    gpa: 8.5
}

for(let key in student1) {
    console.log(`key: ${key}, value: ${student1[key]}`)
}

// map(), filter(), reduce(), some(), every(), .......



// 7. import, export

// 8. destructuring

// 9. async/await, promise, callback - bất đồng bộ trong JS
// dừng để chờ kết quả trả về từ server rồi mới chạy tiếp