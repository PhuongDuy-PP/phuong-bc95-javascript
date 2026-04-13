// core flow:
// endpoint API
// element DOM

// state (data)
// trạng thái hiện tại của ứng dụng, có thể thay đổi theo thời gian
// khi người dùng tương tác với ứng dụng
// VD: giỏ hàng (tăng, giảm, xóa sản phầm), sản phẩm (thêm, sửa, xóa),...
// danhSachSP, gioHang, timeId,...
// state: boolean, number, string, array, object,...

// ES6: import, export
// default các biến, hàm, class => private, tức là nội bộ trong file .js dùng
// được, không thể truy cập từ file khác => export để biến, hàm, class có thể truy cập được

export const API_URL = "https://69ca679fba5984c44bf31927.mockapi.io/api/v1/phone"


// document là thẻ con của window

export const el = {
    danhSachSP: document.getElementById("danhSachSP"),
    loading: document.getElementById("loading"),
    searchSP: document.getElementById("searchInput"),
    filterSP: document.getElementById("filterSelect"),
    // popup chi tiết sản phẩm
    popup: document.getElementById("popupChiTiet"),
    btnClosePopup: document.getElementById("btnClose"),
    contentPopup: document.getElementById("popupContent"),
    overlay: document.getElementById("overlay"),

    // giỏ hàng
    popupGioHang: document.getElementById("popupGioHang"),
    overlayGioHang: document.getElementById("overlayGioHang"),
    noiDungGioHang: document.getElementById("noiDungGioHang"),

    // header
    btnGioHang: document.getElementById("btnGioHang"),
    // dom tới thẻ hiển thị số lượng sản phẩm trong giỏ hàng (nếu có)
    badgeGioHang: document.getElementById("badgeGioHang"),

}

export const state = {
    danhSachSP: [],
    gioHang: [],
    timerId: null
}