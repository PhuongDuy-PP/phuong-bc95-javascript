// define endpoint API
const API_URL = "https://69ca679fba5984c44bf31927.mockapi.io/api/v1/phone"

// liệt kê tất cả các thẻ trên html để tương tác
const el = {
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
    btnCloseGioHang: document.getElementById("btnCloseGioHang"),
    noiDungGioHang: document.getElementById("noiDungGioHang"),

    // header
    btnGioHang: document.getElementById("btnGioHang"),
    // dom tới thẻ hiển thị số lượng sản phẩm trong giỏ hàng (nếu có)
    badgeGioHang: document.getElementById("badgeGioHang"),

}

// define các biến: danh sách sản phẩm, giỏ hàng, tổng tiền
let danhSachSP = []
let gioHang = []

// define các hàm: call aPI, filter sản phẩm,  thêmvào giỏ hàng,...
const filterSP = () => {
    // B1: lấy giá trị từ ô search và select
    // NGUYÊN TẮC: toLowerCase: chuyển chuỗi về chữ thường, trim: xóa khoảng trắng đầu và cuối chuỗi
    const keyword = el.searchSP.value.toLowerCase().trim()
    const type = el.filterSP.value

    // tạo biến để lưu ket quả sau khi filter
    let ketQua = [...danhSachSP]

    // B2: lọc sản phẩm theo từ khóa và loại sản phẩm
    // B2.1: filter theo từ khóa
    if (keyword) {
        ketQua = ketQua.filter((phone) => {
            // tên phone
            const phoneName = phone.name.toLowerCase()
            // mô tả phone
            const phoneDesc = phone.desc.toLowerCase()
            // tương lai: filter cấu hình: screen, cam trước, cam sau,...

            // includes: tìm kiếm tương đối, trả về true nếu chuỗi chứa từ khóa, ngược lại trả về false
            return phoneName.includes(keyword) || phoneDesc.includes(keyword)
        })
    }

    // B2.2: filter theo loại sản phẩm
    if (type !== "") { // nếu type khác rỗng (tức là có chọn loại sản phẩm)
        ketQua = ketQua.filter((phone) => phone.type.toLowerCase() === type.toLowerCase())
    }

    // B3: hiển thị kết quả sau khi filter
    renderDanhSachSP(ketQua)
}

// thêm event cho ô search và select để gọi hàm filterSP mỗi khi user nhập vào ô search
// và chọn loại sản phẩm

// input -> event là input
// VD: user gõ iphone -> event input sẽ kích hoạt 6 lần tương ứng với 6 ký tự nhập vào
// "i" -> "ip" -> "iph" -> "ipho" -> "iphon" -> "iphone"
// YÊU CẦU THÊM: thêm tính năng debounce để tối ưu hiệu suất khi filter sản phẩm,
// tránh gọi hàm filter quá nhiều lần khi user nhập vào ô search

// tạo biến timerId để lưu id của timer (để hủy timer khi user nhập tiếp)
// VD: user gõ iphon -> lưu timerId -> 1s sau gọi hàm filterSP,
// nếu user tiếp tục gõ chữ "e" -> hủy timer cũ và tạo timer mới
let timerId = null
const debounce = () => {
    // HỦY TIMER CŨ NẾU USER NHẬP TIẾP
    clearTimeout(timerId)

    // TẠO TIMER MỚI, 1s sau gọi hàm filterSP
    timerId = setTimeout(() => {
        filterSP()
    }, 1000)
}

el.searchSP.addEventListener("input", debounce)

// select -> event là change
el.filterSP.addEventListener("change", filterSP)

// hàm hiển thị danh sách sản phẩm
const renderDanhSachSP = (danhSach) => {
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
                            data-action="show-detail"
                            data-id="${phone.id}"
                        >Xem chi tiết</button>
                        <button
                            class="flex-1 bg-blue-500 text-white px-3 py-2 rounded"
                            data-action="add-to-cart"
                            data-id="${phone.id}"
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


// thêm hàm filter sản phẩm theo tên, mô tả, loại sản phẩm
// C1: filter trực tiếp data sau khi lấy từ API -> render lại danh sách sản phẩm
// data từ API -> filter theo từ khóa nhận ở ô search -> render lại danh sách sản phẩm


// C2: call API mỗi lần nhập vào ô input -> render lại danh sách sản phẩm

// hàm hiển thị chi tiết sản phẩm
const showChiTietSP = (phoneId) => {
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
            data-action="add-to-cart"
            data-id="${phone.id}"
        >Thêm vào giỏ</button>
    `
    el.popup.classList.remove("hidden")
}


// hàm thêm sản phẩm vào giỏ hàng
const themVaoGioHang = (phoneId) => {
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

const capNhatSoLuongGioHang = () => {
    // tính tổng số lượng sản phẩm trong giỏ hàng
    // duyệt từng item trong giỏ hàng -> lấy số lượng -> cộng dồn lại -> reduce
    const tongSoLuong = gioHang.reduce((tong, item) => tong + item.soLuong, 0)

    // cập nhật số lượng sản phẩm trong giỏ hàng hiển thị ở badge
    el.badgeGioHang.textContent = tongSoLuong
}

const tangSoLuong = (phoneId) => {
    const item = gioHang.find((phone) => phone.id == phoneId)
    if (!item) return

    item.soLuong += 1
    capNhatSoLuongGioHang()
    renderGioHang()
}

const giamSoLuong = (phoneId) => {
    const item = gioHang.find((phone) => phone.id == phoneId)
    if (!item || item.soLuong <= 1) return

    item.soLuong -= 1
    capNhatSoLuongGioHang()
    renderGioHang()
}

const xoaSanPham = (phoneId) => {
    gioHang = gioHang.filter((phone) => phone.id != phoneId)
    capNhatSoLuongGioHang()
    renderGioHang()
}

// hàm hiển thị các item trong giỏ hàng
const renderGioHang = () => {
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
                            class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-600"
                            data-action="decrease"
                            data-id="${item.id}"
                        >-</button>
                        <span class="w-10 text-center font-semibold text-sm text-gray-700">${item.soLuong}</span>
                        <button
                            class="w-7 h-7 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                            data-action="increase"
                            data-id="${item.id}"
                        >+</button>
                    </div>

                    <div class="w-32 text-right">
                        <p class="font-bold text-gray-900">${(item.price * item.soLuong).toLocaleString()} <span class="text-xs uppercase">vnd</span></p>
                    </div>

                    <button
                        class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all ml-2"
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        Xóa
                    </button>
                </div>
        `
    })

    // gộp tất cả các thẻ html lại thành một chuỗi và hiển thị lên trang
    el.noiDungGioHang.innerHTML = contentHtmlList.join("")

    // remove class hidden của popup giỏ hàng để hiển thị popup
    el.popupGioHang.classList.remove("hidden")

}

// ------------------------------------------------------------
// LOGIC CODE CLOSE POPUP CHI TIẾT SẢN PHẨM
// cách mới: define function closePopupChiTiet() được gọi ở html, khi click vào nút đóng popup
const closePopupChiTiet = () => {
    el.popup.classList.add("hidden")
}

// cách cũ: addEventListener cho nút đóng popup
// el.btnClosePopup.addEventListener("click", () => {
//     el.popup.classList.add("hidden")
// })

// close popup khi click ra ngoài nội dung popup - overlay
// khi thêm event click cho overlay -> nơi nào có id overlay sẽ có thể đóng popup khi click vào đó
el.overlay.addEventListener("click", closePopupChiTiet)


// LOGIC CODE POPUP GIỎ HÀNG

const closePopupGioHang = () => {
    el.popupGioHang.classList.add("hidden")
}

el.overlayGioHang.addEventListener("click", closePopupGioHang)
el.btnCloseGioHang.addEventListener("click", closePopupGioHang)

el.btnClosePopup.addEventListener("click", closePopupChiTiet)

el.danhSachSP.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]")
    if (!button) return

    const action = button.dataset.action
    const phoneId = button.dataset.id

    if (action === "show-detail") showChiTietSP(phoneId)
    if (action === "add-to-cart") themVaoGioHang(phoneId)
})

el.contentPopup.addEventListener("click", (event) => {
    const button = event.target.closest('button[data-action="add-to-cart"]')
    if (!button) return

    themVaoGioHang(button.dataset.id)
})

el.noiDungGioHang.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]")
    if (!button) return

    const action = button.dataset.action
    const phoneId = button.dataset.id

    if (action === "increase") tangSoLuong(phoneId)
    if (action === "decrease") giamSoLuong(phoneId)
    if (action === "remove") xoaSanPham(phoneId)
})

// --------------------------------------------------------------


// viết hàm hiển thị giỏ hàng sau khi click vào nút giỏ hàng ở header
el.btnGioHang.addEventListener("click", renderGioHang)

// hàm lấy danh sách sản phẩm từ API
const layDanhSachSP = async () => {
    // hiển thị loading
    el.loading.classList.remove("hidden")

    // call API
    try {
        const response = await axios.get(API_URL)
        // lưu dữ liệu vào biến danhSachSP
        danhSachSP = response.data

        // ẩn loading
        el.loading.classList.add("hidden")

        // hiển thị danh sách sản phẩm -> viết hàm renderDanhSachSP
        renderDanhSachSP(danhSachSP)

    } catch (error) {
        // show error message
        el.danhSachSP.innerHTML = `
            <p class="text-red-500 text-center">Lỗi tải dữ liệu</p>
        `
        // ẩn loading
        el.loading.classList.add("hidden")

    }
}

// gọi hàm lấy danh sách sản phẩm khi trang web được tải
// DOMContentLoaded: sự kiện được kích hoạt khi toàn bộ nội dung của trang đã được tải xong,
// bao gồm cả hình ảnh, script, css,

// window: object toàn cục của javascript, đại diện cho cửa sổ trình duyệt
// khi mở trang web trên trình duyệt -> auto tạo object window
// -> có thể truy cập các thuộc tính và phương thức của window mà không cần khai báo
// c1: gọi hàm trực tiếp
layDanhSachSP()

// c2: gọi hàm khi sự kiện DOMContentLoaded được kích hoạt
// window.addEventListener("DOMContentLoaded", layDanhSachSP)