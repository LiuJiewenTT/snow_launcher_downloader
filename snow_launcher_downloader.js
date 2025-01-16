
function download_launcher() {
    let server_name = document.querySelector("input[name='server']:checked")?.value || "jinshan";
    let launcher_version = document.querySelector("input[name='version']:checked")?.value || "2.0.0";

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

    let download = document.createElement('a');
    download.href = url;
    download.download = `Snowbreak_Launcher_${server_name}_v${launcher_version}.exe`;
    download.click();
}
