import {renderDanhSachSP} from './product-flow.js'
import {el, state} from './core.js'

let { danhSachSP, timerId } = state

export const filterSP = () => {
    // B1: lấy giá trị từ ô search và select
    // NGUYÊN TẮC: toLowerCase: chuyển chuỗi về chữ thường, trim: xóa khoảng trắng đầu và cuối chuỗi
    const keyword = el.searchSP.value.toLowerCase().trim()
    const type = el.filterSP.value

    // tạo biến để lưu ket quả sau khi filter
    let ketQua = [...danhSachSP]

    // B2: lọc sản phẩm theo từ khóa và loại sản phẩm
    // B2.1: filter theo từ khóa
    if (keyword) {
        ketQua = ketQua.filter((phone) => {
            // tên phone
            const phoneName = phone.name.toLowerCase()
            // mô tả phone
            const phoneDesc = phone.desc.toLowerCase()
            // tương lai: filter cấu hình: screen, cam trước, cam sau,...

            // includes: tìm kiếm tương đối, trả về true nếu chuỗi chứa từ khóa, ngược lại trả về false
            return phoneName.includes(keyword) || phoneDesc.includes(keyword)
        })
    }

    // B2.2: filter theo loại sản phẩm
    if (type !== "") { // nếu type khác rỗng (tức là có chọn loại sản phẩm)
        ketQua = ketQua.filter((phone) => phone.type.toLowerCase() === type.toLowerCase())
    }

    // B3: hiển thị kết quả sau khi filter
    renderDanhSachSP(ketQua)
}

const debounce = () => {
    // HỦY TIMER CŨ NẾU USER NHẬP TIẾP
    clearTimeout(timerId)

    // TẠO TIMER MỚI, 1s sau gọi hàm filterSP
    timerId = setTimeout(() => {
        filterSP()
    }, 1000)
}

// GOM 2 event vào 1 hàm filterSP để tái sử dụng, tránh lặp code
export const bindFilterEvent = () => {
    el.searchSP.addEventListener("input", debounce)
    // select -> event là change
    el.filterSP.addEventListener("change", filterSP)
}