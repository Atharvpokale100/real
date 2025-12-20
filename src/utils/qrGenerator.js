// QR Code Generator Utility
export const generateQRCode = async (text, size = 200) => {
  // Using QR Server API for QR code generation
  const encodedText = encodeURIComponent(text)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`
  return qrUrl
}

export const generateApplicationQR = (applicationId, email) => {
  // Create a tracking URL
  const trackingUrl = `${window.location.origin}/track?appId=${applicationId}&email=${encodeURIComponent(email)}`
  return generateQRCode(trackingUrl, 300)
}


