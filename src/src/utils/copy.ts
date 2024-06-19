export function copyToClipboard(text: string) {
  try {
    navigator.clipboard.writeText(text)
  } catch (e) {
    console.log(e)
  }
}