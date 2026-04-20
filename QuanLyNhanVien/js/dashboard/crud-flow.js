import { elements, state } from "./core.js"
import { renderDanhSachNV } from "./ui-flow.js"

const getFormData = () => {

    return {
        taiKhoan: elements.taiKhoan.ariaValueMax.trim(),
        hoTen: elements.hoTen.value.trim(),
        email: elements.email.value.trim(),
        ngayLamViec: elements.ngayLam.value.trim(),
        chucVu: elements.chucVu.value.trim(),
        luong: elements.luongCB.value.trim()
    }
}

// Bài 2: tạo nhân viên mới
export const themNV = () => {
    // B1: lấy dữ liệu từ form popup
    // viết hàm getFormData để lấy dữ liệu từ form popup
    const newNV = getFormData()

    // B2: thêm nhân viên mới vào state.danhSachNV
    state.danhSachNV.push(newNV)

    // B3: hiển thị lại danh sách nhân viên trên giao diện
    // viết hàm renderDanhSachNV để hiển thị lại danh sách nhân viên trên giao diện
    renderDanhSachNV()
}