// B1: DOM tới nút Login và add event (function) login
// TH hàm không có tham số thì phải có dấu ()
document.getElementById("btn-login").addEventListener("click", () => {
    // B2: DOM tới các ô input và lấy giá trị
    // B2.1 DOm tới input username
    let username = document.getElementById("input-username")
    console.dir(username)
    console.log(`username: ${console.dir(username)}`)
    // B2.2: lấy value từ input username
    let usernameValue = username.value

    // C2: gom line code 6 và 10 thành 1 line code
    // let username = document.getElementById("input-username").value

    // làm tương tự cho input password
    let password = document.getElementById("input-password").value

    // xử lý username, password
    // sau này: call API để kiểm tra
    // bây giờ: giả lập nhập đúng username, password
    // show username, password ra ngoài thẻ p có id là result

    // tạo biến chứa code html của username, password
    let result = `
        Username: ${usernameValue} \n
        Password: ${password}
    `

    // DOM tới thẻ p có id là result
    let pResult = document.getElementById("result")

    // gán result này vào thẻ p để hiển thị lên giao diện
    pResult.innerText = result
})