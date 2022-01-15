/** 文件工具 */
export class FileUtil {

    /**
     * @description 保存文件，不支持IE，即不采用 window.navigator.msSaveBlob保存文件
     * @param fileName 文件名称
     * @param blob 文件二进制流
     */
    static saveFile(fileName: string, blob: Blob): void {
        const fileBlob = new Blob([blob]);
        const elink = document.createElement('a');
        elink.download = fileName; // 命名下载文件名称
        elink.style.display = 'none';
        elink.href = window.URL.createObjectURL(fileBlob);
        document.body.appendChild(elink); // 添加节点
        elink.click(); // 点击触发下载
        URL.revokeObjectURL(elink.href); // 释放URL对象
        document.body.removeChild(elink); // 移除elink节点
    }

}
