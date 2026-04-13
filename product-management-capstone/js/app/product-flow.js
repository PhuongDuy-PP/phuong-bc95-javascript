import {el, state, API_URL} from './core.js'

let { danhSachSP } = state

window.showChiTietSP = (phoneId) => {
    // tìm sản phẩm trong danh sách sản phẩm dựa trên id
    const phone = danhSachSP.find((sp) => sp.id == phoneId)

    // nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
    if (!phone) {
        alert("Không tìm thấy sản phẩm")
        return
    }

    // hiển thị popup chi tiết sản phẩm
    el.contentPopup.innerHTML = `
        <img
            src=${phone.img}
            alt=${phone.name}
            class="w-full h-64 object-contain mb-5"
        >
        <h2 class="text-2xl font-bold mb-2">${phone.name}</h2>
        <p class="text-blue-600 font-bold text-2xl mb-4">${phone.price.toLocaleString()} VND</p>
        <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <table class="w-full text-sm">
                <tbody class="divide-y divide-gray-200">
                    <tr>
                        <td class="py-3 text-gray-500 font-medium w-1/3">Loại</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.type}</td>
                    </tr>
                    <tr>
                        <td class="py-3 text-gray-500 font-medium">Màn hình</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.screen}</td>
                    </tr>
                    <tr>
                        <td class="py-3 text-gray-500 font-medium">Camera trước</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.frontCamera}</td>
                    </tr>
                    <tr>
                        <td class="py-3 text-gray-500 font-medium">Camera sau</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.backCamera}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p class="mb-4">${phone.desc}</p>
        <button
            class="bg-blue-500 text-white px-4 py-2 rounded"
            onclick="themVaoGioHang(${phone.id})"
        >Thêm vào giỏ</button>
    `
    el.popup.classList.remove("hidden")
}

const capNhatSoLuongGioHang = () => {
    // tính tổng số lượng sản phẩm trong giỏ hàng
    // duyệt từng item trong giỏ hàng -> lấy số lượng -> cộng dồn lại -> reduce
    const tongSoLuong = gioHang.reduce((tong, item) => tong + item.soLuong, 0)

    // cập nhật số lượng sản phẩm trong giỏ hàng hiển thị ở badge
    el.badgeGioHang.textContent = tongSoLuong
}

window.themVaoGioHang = (phoneId) => {
    // B1: tìm sản phẩm trong danh sách sản phẩm dựa trên phoneId
    const phone = danhSachSP.find((phone) => phone.id == phoneId)

    // B2.1: nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
    if (!phone) {
        alert("Không tìm thấy sản phẩm")
        return
    }

    // B2.2: nếu tìm thấy sản phẩm thì thêm vào giỏ hàng
    // kiểm tra phone này đã có trong giỏ hàng chưa dựa trên id
    const phoneTrongGioHang = gioHang.find((item) => item.id == phoneId)

    // B2.2.1: kiểm tra sản phẩm này có trong giỏ hàng chưa. Nếu chưa có thì thêm mới với số lượng là 1
    if (!phoneTrongGioHang) {
        gioHang.push({
            ...phone,
            soLuong: 1
        })
    } else { // B2.2.2: nếu đã có trong giỏ hàng thì tăng số lượng lên 1
        phoneTrongGioHang.soLuong += 1
    }

    console.log(gioHang)
    // B3: cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge trên nút giỏ hàng
    // => nên viết hàm xử lý riêng để cập nhật số lượng sản phẩm trong giỏ hàng hiển thị ở badge
    capNhatSoLuongGioHang()
}

export const renderDanhSachSP = (danhSach) => {
    // xóa nội dung cũ
    el.danhSachSP.innerHTML = ""

    // kiểm tra nếu danh sách rỗng thì hiển thị thông báo
    if (danhSach.length === 0) {
        el.danhSachSP.innerHTML = `
            <p> class="text-gray-500 text-center">Không tìm thấy sản phẩm nào</p>
        `
        return
    }
    // duyệt qua danh sách sản phẩm và tạo thẻ html để hiển thị
    // dùng map để duyệt qua mảng và trả về một mảng mới chứa các thẻ html
    // API: dữ liệu đơn thuần -> map -> list thẻ html -> join("") -> string html -> innerHTML
    const content = danhSach.map((phone) => {

        //         {
        //     "id": "1",
        //     "name": "iphoneX",
        //     "price": 1000,
        //     "screen": "screen 68",
        //     "backCamera": "2 camera 12 MP",
        //     "frontCamera": "7 MP",
        //     "img": "https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg",
        //     "desc": "Thiết kế mang tính đột phá",
        //     "type": "iphone"
        //   }
        return `
         <div class="bg-white rounded-lg shadow hover:shadow-lg p-5">
                    <img src=${phone.img} alt=${phone.name} class="w-full h-48 object-contain mb-3">
                    <h3>${phone.name}</h3>
                    <p>${phone.desc}</p>
                    <p>${phone.price} VND</p>
                    <span>${phone.type}</span>

                    <div class="flex gap-2 mt-auto">
                        <button
                            class="flex-1 bg-gray-200 px-3 py-2 rounded"
                            onclick="showChiTietSP(${phone.id})"
                        >Xem chi tiết</button>
                        <button
                            class="flex-1 bg-blue-500 text-white px-3 py-2 rounded"
                            onclick="themVaoGioHang(${phone.id})"
                            >Thêm vào giỏ</button>
                    </div>
                </div>    
        `
    })
    // gộp tất cả các thẻ html lại thành một chuỗi và hiển thị lên trang
    // join: dùng để gộp tất cả các phần tử trong mảng thành một chuỗi
    // VD: ["a", "b", "c"].join("-") -> "a-b-c"
    // VD: ["a", "b", "c"].join("") -> "abc"
    el.danhSachSP.innerHTML = content.join("")
}


export const layDanhSachSP = async () => {
    // hiển thị loading
    el.loading.classList.remove("hidden")

    // call API
    try {
        const response = await axios.get(API_URL)
        // lưu dữ liệu vào biến danhSachSP
        danhSachSP = response.data

        console.log(danhSachSP)

        // ẩn loading
        el.loading.classList.add("hidden")

        // hiển thị danh sách sản phẩm -> viết hàm renderDanhSachSP
        renderDanhSachSP(danhSachSP)

    } catch (error) {
        // show error message
        el.danhSachSP.innerHTML = `
            <p class="text-red-500 text-center">Lỗi tải dữ liệu</p>
        `

        console.log(error)
        // ẩn loading
        el.loading.classList.add("hidden")

    }
}