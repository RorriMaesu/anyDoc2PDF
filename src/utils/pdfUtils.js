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
 * Convert Word document to PDF with improved formatting
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

          // Convert DOCX to HTML using mammoth with style map for better formatting
          const options = {
            arrayBuffer,
            styleMap: [
              "p[style-name='Heading 1'] => h1:fresh",
              "p[style-name='Heading 2'] => h2:fresh",
              "p[style-name='Heading 3'] => h3:fresh",
              "p[style-name='Heading 4'] => h4:fresh",
              "p[style-name='Heading 5'] => h5:fresh",
              "p[style-name='Heading 6'] => h6:fresh",
              "p[style-name='Title'] => h1.title:fresh",
              "p[style-name='Subtitle'] => h2.subtitle:fresh",
              "r[style-name='Strong'] => strong",
              "r[style-name='Emphasis'] => em",
              "p[style-name='Quote'] => blockquote",
              "p[style-name='Intense Quote'] => blockquote.intense",
              "p[style-name='List Paragraph'] => p.list-paragraph",
              "table => table.docx-table",
              "p:empty => p"
            ]
          };

          const result = await mammoth.convertToHtml(options);
          const html = result.value;

          // Create a hidden div to render the HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;

          // Apply styling for better rendering
          tempDiv.style.width = '8.27in'; // A4 width
          tempDiv.style.padding = '0.75in';
          tempDiv.style.backgroundColor = 'white';
          tempDiv.style.position = 'absolute';
          tempDiv.style.left = '-9999px';
          tempDiv.style.fontFamily = 'Arial, sans-serif';
          tempDiv.style.lineHeight = '1.5';
          tempDiv.style.fontSize = '12pt';
          tempDiv.style.color = '#333';

          // Add CSS to ensure proper formatting
          const styleTag = document.createElement('style');
          styleTag.textContent = `
            * { box-sizing: border-box; }
            body, html { margin: 0; padding: 0; }
            h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0.5em; page-break-after: avoid; }
            h1 { font-size: 1.8em; color: #2c3e50; }
            h2 { font-size: 1.5em; color: #34495e; }
            h3 { font-size: 1.3em; color: #2c3e50; }
            h4, h5, h6 { font-size: 1.1em; }
            p { margin-bottom: 0.8em; text-align: justify; }
            img { max-width: 100%; height: auto; }
            table.docx-table { width: 100%; border-collapse: collapse; margin: 1em 0; }
            table.docx-table td, table.docx-table th { padding: 8px; border: 1px solid #ddd; }
            blockquote { margin: 1em 0; padding: 0.5em 1em; border-left: 4px solid #ccc; background: #f9f9f9; }
            blockquote.intense { border-left-color: #3498db; background: #ecf0f1; }
            ul, ol { padding-left: 2em; margin-bottom: 1em; }
            li { margin-bottom: 0.3em; }
            a { color: #3498db; text-decoration: none; }
            hr { border: none; border-top: 1px solid #eee; margin: 1.5em 0; }
            .title { text-align: center; color: #2980b9; }
            .subtitle { text-align: center; color: #7f8c8d; font-weight: normal; }
            .list-paragraph { margin-left: 1em; }
          `;
          tempDiv.appendChild(styleTag);

          document.body.appendChild(tempDiv);

          // Function to process the document in multiple pages if needed
          const processDocument = async () => {
            const pdf = new jsPDF({
              unit: 'pt',
              format: 'a4'
            });

            // Get dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 40; // points

            // Get the total height of the content
            const totalHeight = tempDiv.offsetHeight;

            // For very large documents, we need to render in chunks
            if (totalHeight > 3000) { // Arbitrary threshold for large documents
              // Calculate how many chunks we need
              const chunkHeight = pdfHeight - (margin * 2);
              const chunkCount = Math.ceil(totalHeight / chunkHeight);

              // Create a temporary container for each chunk
              const chunkContainer = document.createElement('div');
              chunkContainer.style.width = tempDiv.style.width;
              chunkContainer.style.position = 'absolute';
              chunkContainer.style.left = '-9999px';
              chunkContainer.style.backgroundColor = 'white';
              chunkContainer.style.fontFamily = tempDiv.style.fontFamily;
              chunkContainer.style.lineHeight = tempDiv.style.lineHeight;
              chunkContainer.style.fontSize = tempDiv.style.fontSize;
              document.body.appendChild(chunkContainer);

              // Process each chunk
              for (let i = 0; i < chunkCount; i++) {
                // Clone the content for this chunk
                chunkContainer.innerHTML = '';
                const clonedContent = tempDiv.cloneNode(true);

                // Adjust the clone to show only the current chunk
                clonedContent.style.height = `${chunkHeight}px`;
                clonedContent.style.overflow = 'hidden';
                clonedContent.style.marginTop = `-${i * chunkHeight}px`;

                chunkContainer.appendChild(clonedContent);

                // Render this chunk
                const canvas = await html2canvas(chunkContainer, {
                  scale: 2,
                  useCORS: true,
                  logging: false,
                  windowWidth: 1200, // Fixed width for consistent rendering
                });

                // Add a new page for all chunks except the first
                if (i > 0) {
                  pdf.addPage();
                }

                // Add the image to the PDF
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - (margin * 2), 0, '', 'FAST');
              }

              // Add page numbers
              for (let i = 1; i <= chunkCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(9);
                pdf.setTextColor(100, 100, 100);
                pdf.text(`Page ${i} of ${chunkCount}`, pdfWidth - 60, pdfHeight - 20);
              }

              // Clean up
              document.body.removeChild(chunkContainer);

              return pdf;
            } else {
              // For smaller documents, use the standard approach
              const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1200, // Fixed width for consistent rendering
              });

              const imgData = canvas.toDataURL('image/png');
              const imgProps = pdf.getImageProperties(imgData);
              const scaledWidth = pdfWidth - (margin * 2);
              const scaledHeight = (imgProps.height * scaledWidth) / imgProps.width;

              // If the content is taller than a page, we need to split it
              if (scaledHeight > pdfHeight - (margin * 2)) {
                let heightLeft = scaledHeight;
                let position = 0;
                let pageCount = 0;

                while (heightLeft > 0) {
                  // Add image to the current page
                  pdf.addImage(imgData, 'PNG', margin, margin + position, scaledWidth, scaledHeight, '', 'FAST');
                  heightLeft -= (pdfHeight - (margin * 2));

                  // Add a new page if we have more content
                  if (heightLeft > 0) {
                    position -= pdfHeight - (margin * 2);
                    pdf.addPage();
                    pageCount++;
                  }
                }

                // Add page numbers
                if (pageCount > 0) {
                  for (let i = 1; i <= pageCount + 1; i++) {
                    pdf.setPage(i);
                    pdf.setFontSize(9);
                    pdf.setTextColor(100, 100, 100);
                    pdf.text(`Page ${i} of ${pageCount + 1}`, pdfWidth - 60, pdfHeight - 20);
                  }
                }
              } else {
                // Just add the image for a single page document
                pdf.addImage(imgData, 'PNG', margin, margin, scaledWidth, scaledHeight, '', 'FAST');
              }

              return pdf;
            }
          };

          // Process the document
          processDocument().then(pdf => {
            // Clean up
            document.body.removeChild(tempDiv);
            resolve(pdf.output('blob'));
          }).catch(error => {
            // Clean up on error
            if (document.body.contains(tempDiv)) {
              document.body.removeChild(tempDiv);
            }
            console.error('Error processing Word document:', error);
            reject(error);
          });
        } catch (error) {
          console.error('Error in Word document conversion:', error);
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
 * Convert text file to PDF with intelligent formatting
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

        // Set document properties
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20; // Margin in points
        const titleMargin = 30; // Space after title
        const lineHeight = 1.15; // Line height multiplier

        // Determine optimal font size based on text length
        let fontSize = 12; // Default font size
        if (text.length > 10000) {
          fontSize = 10; // Smaller font for very long documents
        } else if (text.length > 5000) {
          fontSize = 11; // Medium font for moderately long documents
        }

        // Add a title
        pdf.setFontSize(16);
        pdf.setTextColor(0, 102, 204);
        pdf.text(`Converted from: ${textFile.name}`, margin, margin);

        // Set up for main text content
        pdf.setFontSize(fontSize);
        pdf.setTextColor(0, 0, 0);

        // Calculate available width for text
        const textWidth = pageWidth - (margin * 2);

        // Process the text content
        const paragraphs = text.split(/\r?\n\r?\n/); // Split by double line breaks (paragraphs)
        let currentY = margin + titleMargin;

        // Process each paragraph
        for (let i = 0; i < paragraphs.length; i++) {
          // Handle single line breaks within paragraphs
          const lines = paragraphs[i].split(/\r?\n/);

          for (let j = 0; j < lines.length; j++) {
            const line = lines[j].trim();
            if (line === '') continue; // Skip empty lines

            // Split the line to fit within page width
            const splitLines = pdf.splitTextToSize(line, textWidth);

            // Check if we need to add a new page
            if (currentY + (splitLines.length * fontSize * lineHeight) > pageHeight - margin) {
              pdf.addPage();
              currentY = margin; // Reset Y position for new page
            }

            // Add the text
            pdf.text(splitLines, margin, currentY);

            // Update Y position for next line
            currentY += splitLines.length * fontSize * lineHeight;
          }

          // Add space between paragraphs
          currentY += fontSize * 0.8;

          // Check if we need to add a new page for the next paragraph
          if (i < paragraphs.length - 1 && currentY + fontSize > pageHeight - margin) {
            pdf.addPage();
            currentY = margin; // Reset Y position for new page
          }
        }

        // Add page numbers if document has multiple pages
        const pageCount = pdf.internal.getNumberOfPages();
        if (pageCount > 1) {
          for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 40, pageHeight - 10);
          }
        }

        resolve(pdf.output('blob'));
      } catch (error) {
        console.error('Error in text conversion:', error);
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
 * Convert HTML file to PDF with improved formatting
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

        // Apply styling for better rendering
        tempDiv.style.width = '8.27in'; // A4 width
        tempDiv.style.padding = '0.5in';
        tempDiv.style.backgroundColor = 'white';
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.fontFamily = 'Arial, sans-serif';
        tempDiv.style.lineHeight = '1.4';
        tempDiv.style.fontSize = '12pt';

        // Add CSS to ensure text wrapping and proper formatting
        const styleTag = document.createElement('style');
        styleTag.textContent = `
          * { box-sizing: border-box; }
          body, html { margin: 0; padding: 0; }
          p { margin-bottom: 0.8em; text-align: justify; }
          img { max-width: 100%; height: auto; }
          table { width: 100%; border-collapse: collapse; }
          td, th { padding: 8px; border: 1px solid #ddd; }
          pre, code { white-space: pre-wrap; font-size: 0.9em; background: #f5f5f5; padding: 0.2em; }
          h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
          ul, ol { padding-left: 2em; }
        `;
        tempDiv.appendChild(styleTag);

        document.body.appendChild(tempDiv);

        // Function to split content into multiple pages if needed
        const processMultiplePages = async (element) => {
          const pdf = new jsPDF('p', 'pt', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const margin = 40; // points

          // Get the total height of the content
          const totalHeight = element.offsetHeight;

          // If content is very large, we'll need to render it in chunks
          if (totalHeight > 3000) { // Arbitrary threshold for large content
            // Calculate how many canvas renders we need
            const pageHeight = pdfHeight - (margin * 2);
            const pageCount = Math.ceil(totalHeight / pageHeight);

            // Create a temporary container for each page section
            const pageContainer = document.createElement('div');
            pageContainer.style.width = element.style.width;
            pageContainer.style.position = 'absolute';
            pageContainer.style.left = '-9999px';
            pageContainer.style.backgroundColor = 'white';
            pageContainer.style.fontFamily = element.style.fontFamily;
            pageContainer.style.lineHeight = element.style.lineHeight;
            pageContainer.style.fontSize = element.style.fontSize;
            document.body.appendChild(pageContainer);

            // Process each page
            for (let i = 0; i < pageCount; i++) {
              // Clone the content for this page section
              pageContainer.innerHTML = '';
              const clonedContent = element.cloneNode(true);

              // Adjust the clone to show only the current page section
              clonedContent.style.height = `${pageHeight}px`;
              clonedContent.style.overflow = 'hidden';
              clonedContent.style.marginTop = `-${i * pageHeight}px`;

              pageContainer.appendChild(clonedContent);

              // Render this page section
              const canvas = await html2canvas(pageContainer, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1200, // Fixed width for consistent rendering
              });

              // Add a new page for all pages except the first
              if (i > 0) {
                pdf.addPage();
              }

              // Add the image to the PDF
              const imgData = canvas.toDataURL('image/png');
              pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - (margin * 2), 0, '', 'FAST');
            }

            // Clean up
            document.body.removeChild(pageContainer);

            return pdf;
          } else {
            // For smaller content, use the standard approach
            const canvas = await html2canvas(element, {
              scale: 2,
              useCORS: true,
              logging: false,
              windowWidth: 1200, // Fixed width for consistent rendering
            });

            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const scaledWidth = pdfWidth - (margin * 2);
            const scaledHeight = (imgProps.height * scaledWidth) / imgProps.width;

            // If the content is taller than a page, we need to split it
            if (scaledHeight > pdfHeight - (margin * 2)) {
              let heightLeft = scaledHeight;
              let position = 0;
              let pageCount = 0;

              while (heightLeft > 0) {
                // Add image to the current page
                pdf.addImage(imgData, 'PNG', margin, margin + position, scaledWidth, scaledHeight, '', 'FAST');
                heightLeft -= (pdfHeight - (margin * 2));

                // Add a new page if we have more content
                if (heightLeft > 0) {
                  position -= pdfHeight - (margin * 2);
                  pdf.addPage();
                  pageCount++;
                }
              }

              // Add page numbers if we have multiple pages
              if (pageCount > 0) {
                for (let i = 1; i <= pageCount + 1; i++) {
                  pdf.setPage(i);
                  pdf.setFontSize(9);
                  pdf.setTextColor(100, 100, 100);
                  pdf.text(`Page ${i} of ${pageCount + 1}`, pdfWidth - 60, pdfHeight - 20);
                }
              }
            } else {
              // Just add the image for a single page document
              pdf.addImage(imgData, 'PNG', margin, margin, scaledWidth, scaledHeight, '', 'FAST');
            }

            return pdf;
          }
        };

        // Process the HTML content
        processMultiplePages(tempDiv).then(pdf => {
          // Clean up
          document.body.removeChild(tempDiv);
          resolve(pdf.output('blob'));
        }).catch(error => {
          // Clean up on error
          if (document.body.contains(tempDiv)) {
            document.body.removeChild(tempDiv);
          }
          console.error('Error processing HTML:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Error in HTML conversion:', error);
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
