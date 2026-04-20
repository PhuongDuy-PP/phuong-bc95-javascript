// viết hàm hiển thị list sản phẩm vào file crud 
// vì hàm này liên quan tới method GET

import { API_URL, dom, state } from "./core.js"
import { getProductDataFromForm, renderDanhSachSP, resetForm } from "./ui-flow.js"

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

export const createProduct = async () => {
    // B1: lấy dữ liệu từ form
    const newProduct = getProductDataFromForm()

    // B2: call API để tạo mới sản phẩm
    try {
        // validate dữ liệu (optional)
        // viết hàm validate riêng để validate dữ liệu nếu cần thiết
        // các nhóm sẽ làm

        const response = axios.post(API_URL, newProduct)
        // reset form sau khi tạo mới thành công
        resetForm()
        alert("Tạo mới sản phẩm thành công")

        // B3.1: nếu tạo mới thành công => hiển thị lại danh sách sản phẩm
        // LƯU Ý: vì hàm fetchDanhSachSP là hàm bất đồng bộ => cần sử dụng await
        await fetchDanhSachSP()
    } catch (error) {
        // B3.2: nếu tạo mới thất bại => hiển thị thông báo lỗi
        console.log(error)
        alert("Có lỗi xảy ra khi tạo mới sản phẩm", error)
    }
    
}

export const updateProduct = async () => {
    // B1: lấy dữ liệu từ form
    const updatedProduct = getProductDataFromForm()

    // B2: call API để cập nhật sản phẩm
    try {
        // LƯU Ý: endpoint của API update sẽ có format:
        // API_URL/{id} => cần truyền id của sản phẩm cần cập nhật vào endpoint
        // id sẽ được lưu trong state.editingProduct
        // B3.1: nếu cập nhật thành công => hiển thị lại danh sách sản phẩm
        // vì hiện tại editingProduct đang lưu dạng object => cần lấy id từ object
        await axios.put(`${API_URL}/${state.editingProduct.id}`, updatedProduct)
        alert("Cập nhật sản phẩm thành công")
        resetForm() // reset form sau khi cập nhật thành công
        await fetchDanhSachSP()
    } catch (error) {
        // B3.2: nếu cập nhật thất bại => hiển thị thông báo lỗi
        console.error(error)
        alert("Có lỗi xảy ra khi cập nhật sản phẩm", error)
    }
}

const deleteProduct = async (productId) => {
    // B1: confirm lại user có thực sự muốn xóa sản phẩm hay không
    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")
    if (!isConfirmed) {
        return
    }
    // B2: call API để xóa sản phẩm
    try {
        await axios.delete(`${API_URL}/${productId}`)
        alert("Xóa sản phẩm thành công")
        // B3.1: nếu xóa thành công => hiển thị lại danh sách sản phẩm
        await fetchDanhSachSP()
    } catch (error) {
        // B3.2: nếu xóa thất bại => hiển thị thông báo lỗi
        console.error(error)
        alert("Có lỗi xảy ra khi xóa sản phẩm", error)
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
    deleteProduct(productId)
}