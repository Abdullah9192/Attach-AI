// Client-side JSON export utility
export function downloadJSON(filename: string, data: any) {
  console.log("[v0] Backend not connected — this is a mock JSON export only")
  
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
