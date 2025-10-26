
/**
 * Triggers a browser download for a given data URL.
 * @param dataUrl - The data URL of the file to download (e.g., `data:image/jpeg;base64,...`).
 * @param filename - The desired name for the downloaded file.
 */
export const downloadImage = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
