// viết hàm hiển thị list sản phẩm vào file crud 
// vì hàm này liên quan tới method GET

import { API_URL, dom, state } from "./core.js"
import { renderDanhSachSP } from "./ui-flow.js"

export const fetchDanhSachSP = async () => {
    try {
        const response = await axios.get(API_URL)
        // lưu dữ liệu vào state.danhSachSP
        state.danhSachSP = response.data

        // render danh sách sản phẩm
        // logic hiển thị dữ liệu NÊN viết trong file ui-flow, trong function này
        // sẽ gọi hàm để hiển thị dữ liệu
        renderDanhSachSP(state.danhSachSP)

    } catch (error) {
        dom.productTableBody.innerHTML = `
            <tr>
                <td colspan="7">Error fetching product list</td>
            </tr>
        `
        console.log(error)
    }
}

// vì hàm editProduct và deleteProduct nằm trong HTMl
//  => chuyển 2 hàm này thành global function => window.editProduct, window.deleteProduct để có thể gọi được từ HTML

window.editProduct = (productId) => {
    console.log("Sản phẩm cần sửa có id là", productId)
    // B1: tìm sản phẩm trong state.danhSachSP dựa trên id
    const product = state.danhSachSP.find((phone) => phone.id == productId)

    // B2.1: nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
    if (!product) {
        alert("Không tìm thấy sản phẩm")
        return
    }
    // console.log("Sản phẩm cần sửa là", product)

    // B2.2: nếu tìm thấy sản phẩm => hiển thị thông tin sản phẩm lên form
    state.editingProduct = product // lưu sản phẩm đang sửa vào state để có thể sử dụng khi cập nhật sản phẩm
    // hiển thị thông tin sản phẩm lên form
    dom.name.value = product.name
    dom.price.value = product.price
    dom.desc.value = product.desc
    dom.type.value = product.type
    dom.screen.value = product.screen
    dom.frontCamera.value = product.frontCamera
    dom.backCamera.value = product.backCamera
    dom.img.value = product.img

    // hiển thị nút cập nhật, ẩn nút lưu
    dom.btnUpdate.classList.remove("hidden")
    dom.btnSave.classList.add("hidden")
}

window.deleteProduct = (productId) => {
    console.log("Sản phẩm cần xóa có id là", productId)
}