
// khai báo, tạo hàm
const kiemTraChanLe = () => {
    let number = 10

    // dùng if-else khi biết rõ chỉ có 1 trong 2 kết quả
    if(number % 2 === 0) { // if(number % 2)
        console.log(`Số ${number} là số chẵn`)
    } else {
        console.log(`Số ${number} là số lẻ`)
    }
}

// bài 2: nhập vào điểm học sinh
// xuất ra học lực của học sinh đó

const xepLoai = () => {
    let diem = 9

    // if-else if-...-else
    // xuất sắc: 9 <= diem <= 10
    // 9 <= diem && diem <= 10
    // diem >= 9 && diem <= 10

    if((9 <= diem) && (diem <= 10)) {
        console.log("xuất sắc")
    } else if ((8 <= diem) && (diem < 9)) {
        // 8 <= diem < 9
        console.log("Gioi")
    } else {
        console.log("Yếu")
    }

    // các if() độc lập
    if ((9 <= diem) && (diem <= 10)) {
        console.log("xuất sắc")
    }

    if ((8 <= diem) && (diem < 9)) {
        console.log("Gioi")
    }

    if (diem < 8) {
        console.log("Yếu")
    }
}

// gọi hàm ra sử dụng
kiemTraChanLe()
console.log(kiemTraChanLe())

xepLoai()

// 9 <= diem && diem <= 10