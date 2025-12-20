import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const generateApplicationPDF = (application) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Header
  doc.setFillColor(99, 102, 241) // Indigo
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Smart Admission System', pageWidth / 2, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Application Details', pageWidth / 2, 32, { align: 'center' })

  let yPos = 50

  // Application ID
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Application ID:', 20, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(application.id, 80, yPos)
  yPos += 10

  // Status
  doc.setFont('helvetica', 'bold')
  doc.text('Status:', 20, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(application.status, 80, yPos)
  yPos += 10

  // Date Applied
  doc.setFont('helvetica', 'bold')
  doc.text('Date Applied:', 20, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(new Date(application.dateApplied).toLocaleDateString(), 80, yPos)
  yPos += 20

  // Personal Information Table
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(99, 102, 241)
  doc.text('Personal Information', 20, yPos)
  yPos += 10

  doc.autoTable({
    startY: yPos,
    head: [['Field', 'Details']],
    body: [
      ['Full Name', application.fullName],
      ['Email', application.email],
      ['Phone', application.phone],
      ['Date of Birth', new Date(application.dateOfBirth).toLocaleDateString()],
      ['Address', application.address],
      ['City', application.city],
      ['Country', application.country],
      application.postalCode ? ['Postal Code', application.postalCode] : null,
    ].filter(Boolean),
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  })

  yPos = doc.lastAutoTable.finalY + 15

  // Academic Information Table
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(99, 102, 241)
  doc.text('Academic Information', 20, yPos)
  yPos += 10

  doc.autoTable({
    startY: yPos,
    head: [['Field', 'Details']],
    body: [
      ['Course', application.course],
      ['Degree Level', application.degree],
      ['Previous Qualification', application.qualification],
      ['GPA/Percentage', application.gpa],
    ],
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  })

  yPos = doc.lastAutoTable.finalY + 15

  // Personal Statement
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(99, 102, 241)
  doc.text('Personal Statement', 20, yPos)
  yPos += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  
  const statementLines = doc.splitTextToSize(application.statement, pageWidth - 40)
  doc.text(statementLines, 20, yPos, { align: 'left', maxWidth: pageWidth - 40 })

  // Documents
  if (application.documents && application.documents.length > 0) {
    yPos = doc.lastAutoTable.finalY + 50
    if (yPos > pageHeight - 30) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(99, 102, 241)
    doc.text('Uploaded Documents', 20, yPos)
    yPos += 10

    const documentRows = application.documents.map((doc) => [
      doc.name,
      `${(doc.size / 1024 / 1024).toFixed(2)} MB`,
    ])

    doc.autoTable({
      startY: yPos,
      head: [['Document Name', 'Size']],
      body: documentRows,
      theme: 'striped',
      headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 10 },
      margin: { left: 20, right: 20 },
    })
  }

  // Footer
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Page ${i} of ${totalPages} - Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
  }

  return doc
}

export const generateReportPDF = (applications, title = 'Applications Report') => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Header
  doc.setFillColor(99, 102, 241)
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Smart Admission System', pageWidth / 2, 20, { align: 'center' })
  
  doc.setFontSize(16)
  doc.setFont('helvetica', 'normal')
  doc.text(title, pageWidth / 2, 32, { align: 'center' })

  // Summary Statistics
  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === 'Pending').length,
    reviewing: applications.filter((app) => app.status === 'Reviewing').length,
    accepted: applications.filter((app) => app.status === 'Accepted').length,
    rejected: applications.filter((app) => app.status === 'Rejected').length,
  }

  let yPos = 50

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary Statistics', 20, yPos)
  yPos += 10

  doc.autoTable({
    startY: yPos,
    head: [['Metric', 'Count']],
    body: [
      ['Total Applications', stats.total],
      ['Pending', stats.pending],
      ['Reviewing', stats.reviewing],
      ['Accepted', stats.accepted],
      ['Rejected', stats.rejected],
    ],
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  })

  yPos = doc.lastAutoTable.finalY + 15

  // Applications Table
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Application Details', 20, yPos)
  yPos += 10

  const tableData = applications.map((app) => [
    app.id,
    app.fullName,
    app.email,
    app.course,
    app.degree,
    app.status,
    new Date(app.dateApplied).toLocaleDateString(),
  ])

  doc.autoTable({
    startY: yPos,
    head: [['ID', 'Name', 'Email', 'Course', 'Degree', 'Status', 'Date Applied']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2 },
    margin: { left: 20, right: 20 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
      3: { cellWidth: 35 },
      4: { cellWidth: 30 },
      5: { cellWidth: 25 },
      6: { cellWidth: 30 },
    },
  })

  // Footer
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Page ${i} of ${totalPages} - Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  return doc
}

