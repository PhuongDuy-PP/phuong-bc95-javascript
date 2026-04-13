import { renderGioHang } from "./app/cart-flow.js";
import { el } from "./app/core.js";
import { bindFilterEvent } from "./app/filter-flow.js";
import { bindPopupEvents } from "./app/popup-flow.js";
import { layDanhSachSP } from "./app/product-flow.js";

// Phần 1: add tất cả những event cho thẻ input, select, button,...
bindPopupEvents()
bindFilterEvent()

// add event hiển thị giỏ hàng khi click vào nút giỏ hàng
el.btnGioHang.addEventListener("click", renderGioHang)

// Phần 2: gọi hàm hiển thị danh sách sản phẩm khi load trang
layDanhSachSP()