// DOMContentLoaded là sự kiện được kích hoạt khi DOM đã được tải xong,

import { elements } from "./dashboard/core.js"
import { themNV } from "./dashboard/crud-flow.js"
import { renderDanhSachNV } from "./dashboard/ui-flow.js"

// lúc này chúng ta có thể an toàn thao tác với DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM đã được tải xong, có thể thao tác với DOM tại đây")

    // state để lưu trữ dữ liệu: danh sách nhân viên, nhân viên đang được
    // chỉnh sửa, trạng thái hiển thị modal,...

    // thêm event click cho nút "Thêm nhân viên" để hiển thị modal thêm nhân viên
    elements.btnThemNV.addEventListener("click", () => {
        // hiển thị modal thêm nhân viên
        elements.modal.style.display = "block"
        elements.modal.classList.add("show")
        // set tiêu đề cho modal
        elements.titleModel.innerText = "Thêm nhân viên"

        // gọi hàm thêm nhân viên mới
        themNV()
    })

    // Bài 1: render danh sách nhân viên
    renderDanhSachNV()
})