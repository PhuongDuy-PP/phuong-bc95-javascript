document.getElementById("btn-calc").addEventListener("click", () => {
    let number = Number(document.getElementById("input-number").value)

    // VD: 89
    // 8 => Math.floor(89/10) = 8
    // 9 => 89%10 = 9
    // floor: hàm làm tròn xuống
    let soHangChuc = Math.floor(number/10)
    let soHangDonVi = number % 10
    let sum = soHangChuc + soHangDonVi

    let result = document.getElementById("result-calc")
    result.innerText = `
        Tổng 2 chữ số của số ${number} là: ${sum}
    `
})