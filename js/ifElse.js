
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

// tính tiền taxi
// 1 km đầu: 15.000 (giá mở cửa)
// từ km 2 -> 5: 12.000/km
// trên 5km -> 11.000/km
// trên 30 km: giảm 10% tổng bill

// case 1: 1km -> 15000
// case 2: 5km -> 15000 + (5-1)*12000
// case 3: 10km -> 15000 + (5-1)*12000 + 5*11000
// case 4: 35km -> 15000 + 4*12000+ 30*11000
// (15000 + 4*12000+ 30*11000)*0.9

const tinhTienTaxi = (soKm) => {
    if (soKm < 0) {
        console.log("Số km phải lớn hơn 0")
        return "Số km phải lớn hơn 0"
    }

    let tongTien = 0
    if (soKm <= 1) {
        tongTien = 15000
    } else if (soKm <= 5) {
        tongTien = 15000 + (soKm - 1) * 12000
    } else {
        tongTien = 15000 + 4 * 12000 + (soKm - 5) * 11000
    }

    if (soKm > 30) {
        tongTien = tongTien * 0.9
    }

    return `Quãng đường ${soKm}km -> tổng tiền: ${tongTien} VND`
}

console.log(tinhTienTaxi(0))
console.log(tinhTienTaxi(5))
console.log(tinhTienTaxi(10))
console.log(tinhTienTaxi(35))

// switch-case
// nhập số trong khoảng 1->7
// 1 -> chủ nhật
// 2 -> thứ 2
// ...
// 7 -> thứ 7 
// không nằm trong 1->7 => lỗi
// minimax
const ngayTrongTuan = (thu) => {
    switch (thu) {
        case 1:
            console.log("Chủ nhật")
            break;
        case 2:
            console.log("Thứ hai")
            break
        case 3:
            console.log("Thứ ba")
            break
        case 4:
            console.log("Thứ tư")
            break
        case 5:
            console.log("Thứ năm")
            break
        case 6:
            console.log("Thứ sáu")
            break
        case 7:
            console.log("Thứ bảy")
            break
        default:
            console.log("Không hợp lệ (nhập 1-7)")
            break;
    }
}

ngayTrongTuan(8)
ngayTrongTuan(1)
ngayTrongTuan(5)

// code
// best case
// worst case
// độ phức tạp thuật toán: (best case + worst case) /2

// kiểm tra mùa
// nhập vào 1 tháng bất kỳ trong năm (1->12)
// mùa nào (xuân, hè, thu, đông)
const kiemTraMua = (thang) => {
    switch(thang) {
        case 1: case 2: case 3: case "mot": case "1":
            console.log("Mùa xuân")
            break
        case 4: case 5: case 6:
            console.log("Mùa hè")
            break
        case 7: case 8: case 9:
            console.log("Mùa thu")
            break
        case 10: case 11: case 12:
            console.log("Mùa đông")
            break
        default:
            console.log("Tháng không hợp lệ (nhập 1-12)")
            break
    }

}
kiemTraMua("mot")
kiemTraMua(1)
kiemTraMua(4)
kiemTraMua(8)
kiemTraMua(12)
kiemTraMua(20)