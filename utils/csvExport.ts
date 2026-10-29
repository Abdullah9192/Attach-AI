// Client-side CSV export utility
export function convertToCSV(data: any[], headers: string[]): string {
  console.log("[v0] Backend not connected — this is a mock CSV export only")
  
  const headerRow = headers.join(',')
  const dataRows = data.map(row => {
    return headers.map(header => {
      const value = row[header] || ''
      // Escape commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  })
  
  return [headerRow, ...dataRows].join('\n')
}

export function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
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
