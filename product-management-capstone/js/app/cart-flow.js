import {state, el} from './core.js'

let {gioHang} = state

window.tangSoLuong = (phoneId) => {
    // tìm sản phẩm trong giỏ hàng dựa trên id
    const item = gioHang.find((phone) => phone.id == phoneId)

    // nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
    if (!item) {
        alert("Không tìm thấy sản phẩm trong giỏ hàng")
        return
    }

    // nếu tìm thấy sản phẩm thì tăng số lượng lên 1
    item.soLuong += 1
    
    // cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge
    capNhatSoLuongGioHang()

    // render lại giỏ hàng để cập nhật số lượng và tổng tiền
    renderGioHang()
}

window.giamSoLuong = (phoneId) => {
    // tìm sản phẩm trong giỏ hàng dựa trên id
    const item = gioHang.find((phone) => phone.id == phoneId)

    // nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
    if (!item) {
        alert("Không tìm thấy sản phẩm trong giỏ hàng")
        return
    }
    // nếu tìm thấy sản phẩm
    // nếu số lượng bằng 1 => không cho giảm nữa
    if (item.soLuong === 1) {
        return
    }

    // nếu số lượng lớn hơn 1 thì giảm số lượng xuống 1
    item.soLuong -= 1

    // cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge
    capNhatSoLuongGioHang()

    // render lại giỏ hàng để cập nhật số lượng và tổng tiền
    renderGioHang()
}

// const -> window -> chuyển xoaSanPham thành global function để có thể gọi được từ HTML
window.xoaSanPham = (phoneId) => {
    // cập nhật mảng giỏ hàng không chứa sản phẩm muốn xóa
    gioHang = gioHang.filter((phone) => phone.id != phoneId)

    // cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge
    capNhatSoLuongGioHang()

    // render lại giỏ hàng để cập nhật danh sách và tổng tiền
    renderGioHang()
}

export const renderGioHang = () => {
    // nếu giỏ hàng rỗng thì hiển thị thông báo
    if (gioHang.length === 0) {
        el.popupGioHang.classList.remove("hidden")
        el.noiDungGioHang.innerHTML = `
            <h2>Giỏ hàng</h2>
            <p class="text-gray-500 text-center">Giỏ hàng của bạn đang trống</p>
        `
        return
    }
    // tạo html để hiển thị giỏ hàng
    // list item -> map -> list html -> join("") -> string html -> innerHTML
    const contentHtmlList = gioHang.map((item) => {
        // thêm logic disable button giảm số lượng khi số lượng bằng 1, không cho giảm nữa
        // toán tử ba ngôi là cách viết gọn của if else
        // điều kiện ? giá trị nếu đúng : giá trị nếu sai
        // let disableGiam;
        // if (item.soLuong === 1) {
        //     disableGiam = "disabled opacity-50 cursor-not-allowed"
        // } else {
        //     disableGiam = ""
        // }

        const disableGiam = item.soLuong === 1 ? "disabled opacity-50 cursor-not-allowed" : ""

        return `
            <div
                    class="flex items-center gap-4 py-4 px-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <div class="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg p-1">
                        <img src=${item.img}
                            alt=${item.name} class="w-full h-full object-contain mix-blend-multiply">
                    </div>

                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-gray-800 truncate">${item.name}</h3>
                        <p class="text-blue-600 font-medium text-sm">${item.price.toLocaleString()} <span class="underline">đ</span></p>
                    </div>

                    <div class="flex items-center border border-gray-200 rounded-full px-1 py-1 shadow-sm bg-white">
                        <button
                            class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-600 ${disableGiam}"
                            onclick="giamSoLuong(${item.id})"
                        >-</button>
                        <span class="w-10 text-center font-semibold text-sm text-gray-700">${item.soLuong}</span>
                        <button
                            class="w-7 h-7 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                            onclick="tangSoLuong(${item.id})"
                        >+</button>
                    </div>

                    <div class="w-32 text-right">
                        <p class="font-bold text-gray-900">${(item.price * item.soLuong).toLocaleString()} <span class="text-xs uppercase">vnd</span></p>
                    </div>

                    <button
                        class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all ml-2"
                        onclick="xoaSanPham(${item.id})"
                    >
                        Xóa
                    </button>
                </div>
        `
    })

    // gộp tất cả các thẻ html lại thành một chuỗi và hiển thị lên trang
    el.noiDungGioHang.innerHTML = contentHtmlList.join("")

    // thêm logic tính tổng tiền của giỏ hàng
    const tongTien = gioHang.reduce((tong, item) => tong + item.price * item.soLuong, 0)

    // ghép HTML hiển thị tổng tiền vào cuối nội dung giỏ hàng
    el.noiDungGioHang.innerHTML += `
        <div class="flex justify-end py-4 px-3">
            <p class="text-lg font-bold text-gray-900">Tổng tiền: ${tongTien.toLocaleString()} <span class="text-xs uppercase">vnd</span></p>
        </div>
    `

    // remove class hidden của popup giỏ hàng để hiển thị popup
    el.popupGioHang.classList.remove("hidden")
}