// PDF Conversion Utilities
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PDFDocument } from 'pdf-lib';
import * as mammoth from 'mammoth';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

/**
 * Main function to convert any supported document to PDF
 * @param {File} file - The file to convert
 * @returns {Promise<Blob>} - The converted PDF as a Blob
 */
export const convertToPDF = async (file) => {
  try {
    const fileType = file.type;
    const extension = file.name.split('.').pop().toLowerCase();

    // Handle different file types
    if (fileType.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
      return await convertImageToPDF(file);
    } else if (['doc', 'docx'].includes(extension)) {
      return await convertDocxToPDF(file);
    } else if (['xls', 'xlsx'].includes(extension)) {
      return await convertExcelToPDF(file);
    } else if (['ppt', 'pptx'].includes(extension)) {
      return await convertPresentationToPDF(file);
    } else if (['txt', 'rtf', 'md'].includes(extension) || fileType.includes('text')) {
      return await convertTextToPDF(file);
    } else if (extension === 'html' || extension === 'htm' || fileType.includes('html')) {
      return await convertHtmlToPDF(file);
    } else if (extension === 'pdf' || fileType === 'application/pdf') {
      return file; // Already a PDF
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error('Error converting file to PDF:', error);
    throw error;
  }
};

/**
 * Convert image file to PDF
 * @param {File} imageFile - The image file
 * @returns {Promise<Blob>} - The PDF blob
 */
export const convertImageToPDF = async (imageFile) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = function(event) {
        const imgData = event.target.result;

        // Create PDF with image dimensions
        const img = new Image();
        img.src = imgData;

        img.onload = function() {
          // Calculate dimensions to fit on PDF page
          const imgWidth = img.width;
          const imgHeight = img.height;

          // A4 dimensions in pts (595.28 x 841.89)
          let pdfWidth = 595.28;
          let pdfHeight = 841.89;

          // Calculate scaling
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.9;
          const scaledWidth = imgWidth * ratio;
          const scaledHeight = imgHeight * ratio;

          // Center the image on the page
          const x = (pdfWidth - scaledWidth) / 2;
          const y = (pdfHeight - scaledHeight) / 2;

          const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'pt',
            format: 'a4'
          });

          pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);

          resolve(pdf.output('blob'));
        };
      };

      reader.onerror = function(error) {
        reject(error);
      };

      reader.readAsDataURL(imageFile);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Convert Word document to PDF
 * @param {File} docFile - The Word document file
 * @returns {Promise<Blob>} - The PDF blob
 */
export const convertDocxToPDF = async (docFile) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = async function(event) {
        try {
          const arrayBuffer = event.target.result;

          // Convert DOCX to HTML using mammoth
          const result = await mammoth.convertToHtml({ arrayBuffer });
          const html = result.value;

          // Create a hidden div to render the HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          tempDiv.style.width = '8.27in'; // A4 width
          tempDiv.style.padding = '1in';
          tempDiv.style.backgroundColor = 'white';
          tempDiv.style.position = 'absolute';
          tempDiv.style.left = '-9999px';
          document.body.appendChild(tempDiv);

          // Convert HTML to PDF
          const pdf = new jsPDF({
            unit: 'pt',
            format: 'a4'
          });

          html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            logging: false
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const margin = 40;
            const pdfWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Add each page of content
            let heightLeft = pdfHeight;
            let position = 0;
            let page = 1;

            pdf.addImage(imgData, 'PNG', margin, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight() - margin;

            while (heightLeft >= 0) {
              position = heightLeft - pdfHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', margin, position, pdfWidth, pdfHeight);
              heightLeft -= pdf.internal.pageSize.getHeight();
              page++;
            }

            document.body.removeChild(tempDiv);
            resolve(pdf.output('blob'));
          });
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = function(error) {
        reject(error);
      };

      reader.readAsArrayBuffer(docFile);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Convert Excel file to PDF
 * @param {File} excelFile - The Excel file
 * @returns {Promise<Blob>} - The PDF blob
 */
export const convertExcelToPDF = async (excelFile) => {
  // For Excel files, without SheetJS we'll create a simple table representation
  return new Promise((resolve, reject) => {
    try {
      const fileName = excelFile.name;

      // Create PDF
      const pdf = new jsPDF();

      // Add a title
      pdf.setFontSize(16);
      pdf.setTextColor(0, 102, 204);
      pdf.text(`Converted from Excel: ${fileName}`, 20, 20);

      // Create a sample table for demonstration
      pdf.autoTable({
        head: [['This is a converted Excel document']],
        body: [
          ['Excel documents require further processing to extract actual data.'],
          ['A full implementation would use the SheetJS library to extract real Excel data.'],
          ['This PDF contains a placeholder for the Excel content.']
        ],
        startY: 30,
        theme: 'grid',
        headStyles: {
          fillColor: [79, 129, 189],
          fontSize: 12,
          halign: 'center'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        }
      });

      // Add file information
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Original File: ${fileName}`, 20, pdf.lastAutoTable.finalY + 20);
      pdf.text(`Conversion Date: ${new Date().toLocaleDateString()}`, 20, pdf.lastAutoTable.finalY + 30);

      resolve(pdf.output('blob'));

    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Convert presentation file to PDF
 * @param {File} presentationFile - The presentation file
 * @returns {Promise<Blob>} - The PDF blob
 */
export const convertPresentationToPDF = async (presentationFile) => {
  // For presentations, we create a simple representation
  return new Promise((resolve) => {
    const fileName = presentationFile.name;

    // Create PDF with slide-like pages
    const pdf = new jsPDF();

    // Title slide
    pdf.setFillColor(70, 130, 180);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text('Converted Presentation', pdf.internal.pageSize.getWidth() / 2, 60, { align: 'center' });

    pdf.setFontSize(16);
    pdf.text(`Original file: ${fileName}`, pdf.internal.pageSize.getWidth() / 2, 90, { align: 'center' });

    // Add additional sample slides
    pdf.addPage();

    // Sample content slide
    pdf.setFillColor(240, 240, 240);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 30, 'F');

    pdf.setTextColor(70, 130, 180);
    pdf.setFontSize(16);
    pdf.text('Sample Slide', 20, 20);

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text('• This is a converted slide from your presentation', 20, 50);
    pdf.text('• The actual content from your original file would appear here', 20, 70);
    pdf.text('• A full implementation would extract real presentation content', 20, 90);

    // Add a third sample slide
    pdf.addPage();

    pdf.setFillColor(240, 240, 240);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 30, 'F');

    pdf.setTextColor(70, 130, 180);
    pdf.setFontSize(16);
    pdf.text('Thank You', 20, 20);

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text('Your presentation has been converted to PDF format', 20, 50);

    // Add conversion info
    pdf.text(`Conversion Date: ${new Date().toLocaleDateString()}`, 20, 80);

    resolve(pdf.output('blob'));
  });
};

/**
 * Convert text file to PDF
 * @param {File} textFile - The text file
 * @returns {Promise<Blob>} - The PDF blob
 */
export const convertTextToPDF = async (textFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      try {
        const text = event.target.result;
        const pdf = new jsPDF();

        // Add a title
        pdf.setFontSize(16);
        pdf.setTextColor(0, 102, 204);
        pdf.text(`Converted from: ${textFile.name}`, 20, 20);

        // Add the text content with proper wrapping
        const pageWidth = pdf.internal.pageSize.getWidth() - 40;
        const fontSize = 12;
        pdf.setFontSize(fontSize);
        pdf.setTextColor(0, 0, 0);

        const splitText = pdf.splitTextToSize(text, pageWidth);
        pdf.text(splitText, 20, 40);

        resolve(pdf.output('blob'));
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function(error) {
      reject(error);
    };

    reader.readAsText(textFile);
  });
};

/**
 * Convert HTML file to PDF
 * @param {File} htmlFile - The HTML file
 * @returns {Promise<Blob>} - The PDF blob
 */
export const convertHtmlToPDF = async (htmlFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      try {
        const htmlContent = event.target.result;

        // Create a hidden div to render the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        tempDiv.style.width = '8.27in'; // A4 width
        tempDiv.style.padding = '0.5in';
        tempDiv.style.backgroundColor = 'white';
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);

        // Convert to PDF using html2canvas
        html2canvas(tempDiv, {
          scale: 2,
          useCORS: true,
          logging: false
        }).then((canvas) => {
          const pdf = new jsPDF('p', 'pt', 'a4');
          const imgData = canvas.toDataURL('image/png');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

          // Clean up
          document.body.removeChild(tempDiv);

          resolve(pdf.output('blob'));
        }).catch(error => {
          document.body.removeChild(tempDiv);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function(error) {
      reject(error);
    };

    reader.readAsText(htmlFile);
  });
};

/**
 * Save the PDF to the user's device
 * @param {Blob} pdfBlob - The PDF blob
 * @param {string} fileName - The original file name
 */
export const savePDF = (pdfBlob, fileName) => {
  // Extract base name without extension
  const baseName = fileName.split('.').slice(0, -1).join('.');
  const pdfFileName = baseName ? `${baseName}.pdf` : 'converted.pdf';

  saveAs(pdfBlob, pdfFileName);
};

/**
 * Create a preview URL from a blob
 * @param {Blob} blob - The blob to create a URL for
 * @returns {string} - The preview URL
 */
export const createPreviewUrl = (blob) => {
  return URL.createObjectURL(blob);
};
