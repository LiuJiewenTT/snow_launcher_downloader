
async function download_launcher() {
    let server_name = document.querySelector("input[name='server']:checked")?.value || "jinshan";
    let launcher_version = document.querySelector("input[name='version']:checked")?.value || "2.0.0";

    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status');

    let url = '';
    switch (server_name) {
        case "jinshan":
            url = `https://cbjq-content.xoyocdn.com/ob202307/launcher/jinshan/updates/${launcher_version}.exe`;
            break;
        case "bilibili":
            url = `https://cbjq-content.xoyocdn.com/ob202307/launcher/bilibili/updates/${launcher_version}.exe`;
            break;
        case "worldwide":
            url = `https://snowbreak-content.amazingseasuncdn.com/ob202307/launcher/seasun/updates/${launcher_version}.exe`;
            break;
    }

    try {
        const response = await fetch(url, { mode: 'cors' }); // 确保服务器允许跨域
        if (!response.ok) throw new Error('文件下载失败');

        // 获取文件大小
        const contentLength = response.headers.get('Content-Length');
        if (!contentLength) throw new Error('无法获取文件大小');

        const total = parseInt(contentLength, 10);
        let loaded = 0;

        // 创建可读流并读取数据
        const reader = response.body.getReader();
        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            loaded += value.length;

            // 更新进度条和状态
            const percent = ((loaded / total) * 100).toFixed(2);
            progressBar.style.width = `${percent}%`;
            statusText.textContent = `已下载: ${percent}%`;
        }

        // 合并所有下载的数据块
        const blob = new Blob(chunks);

        // 创建下载链接
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `Snowbreak_Launcher_${server_name}_v${launcher_version}.exe`; // 指定文件名
        a.click();
        statusText.textContent = '下载完成！';

        // 释放 URL 对象
        URL.revokeObjectURL(a.href);
    } catch (error) {
        console.error('下载失败：', error);
        statusText.textContent = '下载失败！';
        alert('下载失败');
    }
}
