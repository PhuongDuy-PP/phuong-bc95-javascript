export const state = {
    danhSachNV: [
        {
            taiKhoan: "nguyen-van-a",
            hoTen: "Nguyễn Văn A",
            email: "nguyen.van.a@email.com",
            ngayLamViec: "01/01/2020",
            chucVu: "Nhân viên",
            luong: "15,000,000"
        }
    ], // lưu trữ danh sách nhân viên
    editingNV: null
}

// define các element cần thao tác với DOM ở đây để tiện sử dụng lại
export const elements = {
    taiKhoan: document.getElementById("tknv"),
    hoTen: document.getElementById("name"),
    email: document.getElementById("email"),
    matKhau: document.getElementById("password"),
    ngayLam: document.getElementById("datepicker"),
    luongCB: document.getElementById("luongCB"),
    chucVu: document.getElementById("chucvu"),
    gioLam: document.getElementById("gioLam"),
    btnThemNV: document.getElementById("btnThem"),
    btnTaoNVModal: document.getElementById("btnThemNV"),
    btnCapNhat: document.getElementById("btnCapNhat"),
    tableDanhSachNV: document.getElementById("tableDanhSach"),

    // modal thêm/sửa nhân viên
    modal: document.getElementById("myModal"),
    titleModel: document.getElementById("header-title")
}