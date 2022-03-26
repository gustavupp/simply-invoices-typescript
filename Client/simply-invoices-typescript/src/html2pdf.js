export const downloadInvoice = (invoiceNumber, element) => {
  let opt = {
    margin: 0,
    filename: `invoice-${invoiceNumber}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { dpi: 192, scale: 4, letterRendering: true, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }
  window.html2pdf(element, opt)
}
