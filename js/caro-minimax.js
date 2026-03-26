// =====================================================================
//  GAME CARO - MINIMAX + ALPHA-BETA PRUNING
// =====================================================================
//
//  MINIMAX là gì?
//  Thuật toán AI thử TẤT CẢ nước đi có thể, giả sử cả 2 bên
//  đều chơi TỐI ƯU, rồi chọn nước có lợi nhất.
//
//  - MAX (AI): cố gắng TỐI ĐA hoá điểm (chọn nước cao nhất)
//  - MIN (Người): cố gắng TỐI THIỂU hoá điểm (chọn nước thấp nhất)
//
//  ALPHA-BETA PRUNING là gì?
//  Kỹ thuật tối ưu giúp minimax BỎ QUA những nhánh không cần thiết,
//  tăng tốc độ tính toán rất nhiều mà KẾT QUẢ KHÔNG ĐỔI.
//
//  - alpha: điểm TỐT NHẤT mà MAX đã tìm thấy
//  - beta:  điểm TỐT NHẤT mà MIN đã tìm thấy
//  - Nếu alpha >= beta → cắt nhánh (không cần tìm tiếp)
//
// =====================================================================

const WIN_COUNT = 5

// --- State ---
let SIZE = 10
let DEPTH = 3
let board = []
let gameOver = false
let currentPlayer = "X"
let lastMove = null
let winCells = []
let scoreX = 0
let scoreO = 0

// --- DOM ---
const boardEl = document.getElementById("board")
const statusEl = document.getElementById("status")
const thinkingEl = document.getElementById("thinking")
const scoreXEl = document.getElementById("score-x")
const scoreOEl = document.getElementById("score-o")

// =====================================================================
//  KHỞI TẠO GAME
// =====================================================================

const initGame = () => {
    SIZE = Number(document.getElementById("board-size").value)
    DEPTH = Number(document.getElementById("difficulty").value)
    board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
    gameOver = false
    currentPlayer = "X"
    lastMove = null
    winCells = []
    renderBoard()
    setStatus("Lượt của bạn", "default")
}

const setStatus = (text, type) => {
    statusEl.textContent = text
    const styles = {
        default: "bg-slate-800 text-slate-300 border-slate-700",
        win: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        lose: "bg-red-500/20 text-red-400 border-red-500/30",
        draw: "bg-slate-700 text-slate-400 border-slate-600",
        thinking: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    }
    statusEl.className = `px-5 py-2 rounded-full text-sm font-semibold border min-w-[160px] text-center ${styles[type] || styles.default}`
}

// =====================================================================
//  RENDER GIAO DIỆN
// =====================================================================

const renderBoard = () => {
    boardEl.style.gridTemplateColumns = `repeat(${SIZE}, 36px)`
    boardEl.innerHTML = ""

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const cell = document.createElement("div")
            cell.className = "cell"
            cell.dataset.row = r
            cell.dataset.col = c

            if (board[r][c]) {
                cell.textContent = board[r][c]
                cell.classList.add(board[r][c].toLowerCase())
            }

            if (lastMove && lastMove[0] === r && lastMove[1] === c) {
                cell.classList.add("last-move")
            }

            if (winCells.some(([wr, wc]) => wr === r && wc === c)) {
                cell.classList.add("win")
            }

            if (!board[r][c] && !gameOver) {
                cell.addEventListener("click", () => handlePlayerMove(r, c))
            }

            boardEl.appendChild(cell)
        }
    }
}

// =====================================================================
//  XỬ LÝ NƯỚC ĐI CỦA NGƯỜI CHƠI
// =====================================================================

const handlePlayerMove = (row, col) => {
    if (gameOver || currentPlayer !== "X" || board[row][col]) return

    board[row][col] = "X"
    lastMove = [row, col]

    const result = checkWin(board, row, col)
    if (result) {
        winCells = result
        gameOver = true
        scoreX++
        scoreXEl.textContent = `${scoreX} thắng`
        setStatus("Bạn thắng!", "win")
        renderBoard()
        return
    }

    if (isBoardFull(board)) {
        gameOver = true
        setStatus("Hoà!", "draw")
        renderBoard()
        return
    }

    currentPlayer = "O"
    setStatus("AI đang suy nghĩ...", "thinking")
    renderBoard()

    // Dùng setTimeout để UI kịp update trước khi AI tính
    thinkingEl.classList.remove("hidden")
    setTimeout(() => {
        aiMove()
        thinkingEl.classList.add("hidden")
    }, 50)
}

// =====================================================================
//  AI - MINIMAX CHỌN NƯỚC ĐI
// =====================================================================

const aiMove = () => {
    const [bestRow, bestCol] = findBestMove(board, DEPTH)

    board[bestRow][bestCol] = "O"
    lastMove = [bestRow, bestCol]

    const result = checkWin(board, bestRow, bestCol)
    if (result) {
        winCells = result
        gameOver = true
        scoreO++
        scoreOEl.textContent = `${scoreO} thắng`
        setStatus("AI thắng!", "lose")
        renderBoard()
        return
    }

    if (isBoardFull(board)) {
        gameOver = true
        setStatus("Hoà!", "draw")
        renderBoard()
        return
    }

    currentPlayer = "X"
    setStatus("Lượt của bạn", "default")
    renderBoard()
}

// =====================================================================
//  TÌM NƯỚC ĐI TỐT NHẤT (MINIMAX + ALPHA-BETA)
// =====================================================================

const findBestMove = (board, depth) => {
    const moves = getCandidateMoves(board)

    // Nước đi đầu tiên → chọn giữa bàn
    if (moves.length === SIZE * SIZE || moves.length === 0) {
        const mid = Math.floor(SIZE / 2)
        return [mid, mid]
    }

    let bestScore = -Infinity
    let bestMove = moves[0]

    for (const [r, c] of moves) {
        board[r][c] = "O"
        const score = minimax(board, depth - 1, false, -Infinity, Infinity, r, c)
        board[r][c] = null

        if (score > bestScore) {
            bestScore = score
            bestMove = [r, c]
        }
    }

    return bestMove
}

// =====================================================================
//  THUẬT TOÁN MINIMAX + ALPHA-BETA PRUNING
// =====================================================================
//
//  minimax(board, depth, isMaximizing, alpha, beta)
//
//  Tham số:
//    board         : trạng thái bàn cờ hiện tại
//    depth         : số tầng còn lại muốn tìm (càng sâu AI càng giỏi)
//    isMaximizing  : true = lượt AI (cố gắng MAX), false = lượt người (MIN)
//    alpha         : điểm tốt nhất AI đã tìm thấy (khởi tạo -Infinity)
//    beta          : điểm tốt nhất người đã tìm thấy (khởi tạo +Infinity)
//    lastR, lastC  : vị trí nước đi vừa rồi (để check win nhanh)
//
//  Trả về: ĐIỂM SỐ đánh giá (số dương = AI có lợi, số âm = người có lợi)
//
// =====================================================================

const minimax = (board, depth, isMaximizing, alpha, beta, lastR, lastC) => {
    // Kiểm tra nếu nước vừa đi thắng
    if (checkWin(board, lastR, lastC)) {
        // Ai vừa đi? Nếu isMaximizing = false → vừa rồi AI đi (O) → AI thắng
        return isMaximizing ? -100000 - depth : 100000 + depth
    }

    if (isBoardFull(board)) return 0

    // Hết depth → đánh giá heuristic
    if (depth === 0) return evaluateBoard(board)

    const moves = getCandidateMoves(board)

    if (isMaximizing) {
        // Lượt AI (O) → tìm MAX
        let maxScore = -Infinity
        for (const [r, c] of moves) {
            board[r][c] = "O"
            const score = minimax(board, depth - 1, false, alpha, beta, r, c)
            board[r][c] = null

            maxScore = Math.max(maxScore, score)
            alpha = Math.max(alpha, score)
            if (alpha >= beta) break // ALPHA-BETA PRUNING: cắt nhánh
        }
        return maxScore
    } else {
        // Lượt Người (X) → tìm MIN
        let minScore = Infinity
        for (const [r, c] of moves) {
            board[r][c] = "X"
            const score = minimax(board, depth - 1, true, alpha, beta, r, c)
            board[r][c] = null

            minScore = Math.min(minScore, score)
            beta = Math.min(beta, score)
            if (alpha >= beta) break // ALPHA-BETA PRUNING: cắt nhánh
        }
        return minScore
    }
}

// =====================================================================
//  LẤY DANH SÁCH NƯỚC ĐI ỨNG VIÊN
// =====================================================================
//  Thay vì thử TẤT CẢ ô trống (quá chậm), chỉ thử các ô
//  NẰM GẦN các quân đã đặt (trong phạm vi 2 ô).
// =====================================================================

const getCandidateMoves = (board) => {
    const candidateSet = new Set()
    const radius = 2

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (board[r][c]) {
                for (let dr = -radius; dr <= radius; dr++) {
                    for (let dc = -radius; dc <= radius; dc++) {
                        const nr = r + dr
                        const nc = c + dc
                        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && !board[nr][nc]) {
                            candidateSet.add(nr * SIZE + nc)
                        }
                    }
                }
            }
        }
    }

    return [...candidateSet].map((pos) => [Math.floor(pos / SIZE), pos % SIZE])
}

// =====================================================================
//  KIỂM TRA THẮNG
// =====================================================================
//  Kiểm tra 4 hướng từ vị trí (row, col):
//  → ngang, ↓ dọc, ↘ chéo chính, ↗ chéo phụ
//  Trả về mảng toạ độ nếu thắng, null nếu chưa
// =====================================================================

const DIRECTIONS = [
    [0, 1],   // → ngang
    [1, 0],   // ↓ dọc
    [1, 1],   // ↘ chéo chính
    [1, -1],  // ↗ chéo phụ
]

const checkWin = (board, row, col) => {
    const player = board[row][col]
    if (!player) return null

    for (const [dr, dc] of DIRECTIONS) {
        const cells = [[row, col]]

        // Đếm về 1 phía
        for (let i = 1; i < WIN_COUNT; i++) {
            const r = row + dr * i
            const c = col + dc * i
            if (r < 0 || r >= SIZE || c < 0 || c >= SIZE || board[r][c] !== player) break
            cells.push([r, c])
        }

        // Đếm về phía ngược lại
        for (let i = 1; i < WIN_COUNT; i++) {
            const r = row - dr * i
            const c = col - dc * i
            if (r < 0 || r >= SIZE || c < 0 || c >= SIZE || board[r][c] !== player) break
            cells.push([r, c])
        }

        if (cells.length >= WIN_COUNT) return cells
    }

    return null
}

const isBoardFull = (board) => board.every((row) => row.every((cell) => cell !== null))

// =====================================================================
//  ĐÁNH GIÁ BÀN CỜ (HEURISTIC)
// =====================================================================
//
//  Khi minimax hết depth mà chưa có ai thắng, dùng hàm này để
//  ƯỚC LƯỢNG ai đang có lợi thế hơn.
//
//  Cách tính: quét toàn bộ bàn cờ theo 4 hướng, đếm các chuỗi liên
//  tiếp (patterns) và gán điểm:
//
//  | Pattern      | Điểm   | Ý nghĩa                      |
//  |------------- |--------|-------------------------------|
//  | 5 liên tiếp  | 100000 | Thắng                         |
//  | 4 hở 2 đầu   | 10000  | Gần như chắc thắng           |
//  | 4 hở 1 đầu   | 1000   | Nguy hiểm                    |
//  | 3 hở 2 đầu   | 1000   | Tấn công mạnh                |
//  | 3 hở 1 đầu   | 100    | Có tiềm năng                 |
//  | 2 hở 2 đầu   | 100    | Bắt đầu hình thành           |
//  | 2 hở 1 đầu   | 10     | Yếu                          |
//
//  Điểm AI (O) là dương, điểm người (X) là âm.
//
// =====================================================================

const SCORE_TABLE = {
    5: 100000,
    "4_open2": 10000,
    "4_open1": 1000,
    "3_open2": 1000,
    "3_open1": 100,
    "2_open2": 100,
    "2_open1": 10,
}

const evaluateBoard = (board) => {
    let score = 0

    for (const [dr, dc] of DIRECTIONS) {
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                if (!board[r][c]) continue

                // Chỉ quét theo hướng dương để tránh đếm trùng
                const player = board[r][c]
                let count = 1

                // Đếm liên tiếp theo hướng dương
                for (let i = 1; i < WIN_COUNT; i++) {
                    const nr = r + dr * i
                    const nc = c + dc * i
                    if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE || board[nr][nc] !== player) break
                    count++
                }

                // Kiểm tra ô ngay trước (hướng âm) có phải cùng player không
                // Nếu có → đoạn này đã được đếm từ ô trước → bỏ qua
                const prevR = r - dr
                const prevC = c - dc
                if (prevR >= 0 && prevR < SIZE && prevC >= 0 && prevC < SIZE && board[prevR][prevC] === player) {
                    continue
                }

                if (count < 2) continue

                // Kiểm tra 2 đầu có trống không (open ends)
                const endR1 = r - dr
                const endC1 = c - dc
                const endR2 = r + dr * count
                const endC2 = c + dc * count

                const open1 = endR1 >= 0 && endR1 < SIZE && endC1 >= 0 && endC1 < SIZE && !board[endR1][endC1]
                const open2 = endR2 >= 0 && endR2 < SIZE && endC2 >= 0 && endC2 < SIZE && !board[endR2][endC2]

                const openEnds = (open1 ? 1 : 0) + (open2 ? 1 : 0)

                if (openEnds === 0 && count < WIN_COUNT) continue

                let patternScore = 0
                if (count >= WIN_COUNT) {
                    patternScore = SCORE_TABLE[5]
                } else {
                    const key = `${count}_open${openEnds}`
                    patternScore = SCORE_TABLE[key] || 0
                }

                score += player === "O" ? patternScore : -patternScore
            }
        }
    }

    return score
}

// =====================================================================
//  EVENT LISTENERS
// =====================================================================

document.getElementById("btn-reset").addEventListener("click", initGame)
document.getElementById("board-size").addEventListener("change", initGame)
document.getElementById("difficulty").addEventListener("change", () => {
    DEPTH = Number(document.getElementById("difficulty").value)
})

// Khởi tạo game lần đầu
initGame()
