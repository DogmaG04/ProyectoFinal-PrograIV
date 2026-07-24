import Papa from 'papaparse'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportCSV(data: Record<string, unknown>[], filename: string) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}

export function exportPDF(
  title: string,
  headers: string[],
  rows: string[][],
  filename: string,
) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text(title, 14, 22)

  doc.setFontSize(9)
  doc.setTextColor(120)
  doc.text(`Generado: ${new Date().toLocaleDateString('es-BO')}`, 14, 30)

  autoTable(doc, {
    startY: 36,
    head: [headers],
    body: rows,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [77, 124, 254] },
    alternateRowStyles: { fillColor: [245, 245, 250] },
  })

  doc.save(`${filename}.pdf`)
}
