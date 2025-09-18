export function downloadAsFile(
  fileName: string,
  dataBase64: string,
  type: string = "application/pdf"
) {
  let a = document.createElement("a");
  a.href = `data:${type};base64,${dataBase64}`;
  a.download = fileName;

  a.click();
}
