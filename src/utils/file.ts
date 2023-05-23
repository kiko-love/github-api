const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 KB";

  const k = 1024;
  const sizes = ["KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  let fileSize = Math.ceil(bytes / Math.pow(k, i));

  // 如果文件大小小于 1 KB，将其显示为 1 KB
  if (i === 0 && fileSize < 1024) {
    fileSize = 1;
    return fileSize.toFixed(0) + " " + sizes[i];
  } else {
    return fileSize.toFixed(0) + " " + sizes[i - 1];
  }
};

export { formatFileSize };
