
import { dom } from "./admin/core.js";
import { createProduct, fetchDanhSachSP, updateProduct } from "./admin/crud-flow.js";
import { resetForm } from "./admin/ui-flow.js";

// OPTIONAL: liên quan tới admin thì cần có flow reset form

// Phần 1: thêm các event
// thêm event SUBMIT cho form để xử lý thêm/sửa sản phẩm
dom.productForm.addEventListener("submit", (event) => {
    event.preventDefault() // ngăn form submit theo cách truyền thống

    // hàm xử lý tạo mới sản phẩm
    // => viết hàm tạo mới sản phẩm trong crud-flow.js
    createProduct()
})

// phần 2: thêm event click cho nút cập nhật sản phẩm
dom.btnUpdate.addEventListener("click", () => {
    // viết hàm cập nhật sản phẩm trong crud-flow.js
    updateProduct()
})

// phần 3: thêm event click cho nút reset
dom.btnReset.addEventListener("click", () => {
    // khi click vào nút reset => sẽ reset form về trạng thái ban đầu
    resetForm()
})


// phần 2: hiển thị list sản phẩm khi load trang
fetchDanhSachSP()