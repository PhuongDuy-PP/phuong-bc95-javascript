document.getElementById("btn-hcn").addEventListener("click", () => {
    // LƯU Ý: dù nhập số vào ô input nhưng kết quả trả về là kiểu chữ
    // => chuyển chữ => số
    let chieuDai = Number(document.getElementById("input-width").value)
    let chieuRong = Number(document.getElementById("input-height").value)

    let chuVi = (chieuDai + chieuRong) * 2
    let dienTich = chieuDai * chieuRong

    let result = document.getElementById("result-hcn")
    result.innerText = `
        Chu vi: ${chuVi}
        Diện tích: ${dienTich}
    `
})