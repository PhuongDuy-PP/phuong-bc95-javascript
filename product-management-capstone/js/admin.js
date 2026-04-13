
// Phần 1: thêm các event

import { fetchDanhSachSP } from "./admin/crud-flow.js";

// OPTIONAL: liên quan tới admin thì cần có flow reset form

// phần 2: hiển thị list sản phẩm khi load trang
fetchDanhSachSP()