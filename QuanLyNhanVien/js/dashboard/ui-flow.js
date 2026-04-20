import { elements, state } from "./core.js"

// hàm renderDanhSachNV
export const renderDanhSachNV = () => {
    // B1: xóa hết nội dung cũ trong tableDanhSachNV
    elements.tableDanhSachNV.innerHTML = ""
    
    // B2: duyệt qua state.danhSachNV để tạo ra các row mới
    // và append vào tableDanhSachNV
    // danhSachNV => map => tạo ra mảng các row (dạng string) => join lại thành 1 string duy nhất
    const rows = state.danhSachNV.map((nv) => (
        `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLamViec}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luong}</td>
                <td>Giỏi</td>
            </tr>
        `
    ))
    elements.tableDanhSachNV.innerHTML = rows.join("")
}