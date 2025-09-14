// Lưu trữ tập hợp hash của các thẻ script hiện tại
let scriptHashes = new Set();

/**
 * Lấy tập hợp hash của các thẻ script từ trang chủ
 * @returns {Promise<Set<string>>} Trả về tập hợp hash của các thẻ script
 */
async function fetchScriptHashes() {
  // Lấy nội dung HTML của trang chủ
  const html = await fetch("/").then((res) => res.text());
  // Dùng regex để lấy tất cả thẻ <script>
  const scriptRegex = /<script[^>]*>[\s\S]*<\/script>/g;
  // Lấy nội dung các thẻ <script>
  const scripts = html.match(scriptRegex) ?? [];
  // Trả về tập hợp các nội dung script
  return new Set(scripts);
}

/**
 * So sánh tập hợp hash script hiện tại với tập hợp mới để kiểm tra cập nhật
 */
function automaticUpdate(updateNotice, time = 3000) {
  let timer = null;
  const polling = async () => {
    // Lấy tập hợp hash script mới
    const newScriptHashes = await fetchScriptHashes();
    if (scriptHashes.size === 0) {
      // Lần đầu lưu lại hash script hiện tại
      scriptHashes = newScriptHashes;
    } else if (
      scriptHashes.size !== newScriptHashes.size ||
      ![...scriptHashes].every((hash) => newScriptHashes.has(hash))
    ) {
      timer && clearInterval(timer);
      updateNotice && updateNotice();
    }
  };
  timer = setInterval(polling, time);
}

export default automaticUpdate;
