# AnyDoc2PDF

[![GitHub stars](https://img.shields.io/github/stars/RorriMaesu/anyDoc2PDF?style=social)](https://github.com/RorriMaesu/anyDoc2PDF/stargazers)
[![GitHub license](https://img.shields.io/github/license/RorriMaesu/anyDoc2PDF)](https://github.com/RorriMaesu/anyDoc2PDF/blob/main/LICENSE)

A free, high-end document-to-PDF converter web application that runs entirely in the browser. Convert any document format to high-quality PDFs without uploading your files to any server - all processing happens locally in your browser for maximum privacy and security.

## 🖼️ Screenshots

<div align="center">
  <img src="docs/screenshots/main-screen.png" alt="AnyDoc2PDF Main Screen" width="80%" />
  <p><em>Main conversion interface with drag-and-drop functionality</em></p>

  <img src="docs/screenshots/dark-mode.png" alt="AnyDoc2PDF Dark Mode" width="80%" />
  <p><em>Dark mode for comfortable use in low-light environments</em></p>

  <img src="docs/screenshots/pdf-preview.png" alt="PDF Preview" width="80%" />
  <p><em>Interactive PDF preview with zoom and page navigation</em></p>
</div>

> Note: The screenshots folder will be created when you take actual screenshots of your application.

## Features

- **Multiple Format Support**: Convert various document formats to PDF
- **High-Quality Output**: Professional-grade PDF conversion with preserved formatting
- **100% Private & Secure**: All processing happens client-side - your files never leave your browser
- **No Registration Required**: No accounts, no email collection, just instant conversion
- **Modern UI**: Elegant, responsive design with smooth animations
- **Dark Mode Support**: Easy on the eyes with automatic theme detection
- **Completely Free**: No hidden fees, no premium tiers, no limitations

## Supported File Types

- **Documents**: Word (.docx, .doc), PDF, Rich Text (.rtf)
- **Spreadsheets**: Excel (.xlsx, .xls), CSV
- **Presentations**: PowerPoint (.pptx, .ppt)
- **Images**: JPEG, PNG, GIF, BMP, TIFF, WebP
- **Web**: HTML, MHTML
- **Text**: Plain text (.txt), Markdown (.md)
- **And more**: Support for additional formats is continuously being added

## Technology Stack

- **Frontend Framework**: [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- **Animations**:
  - [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
  - [GSAP](https://greensock.com/gsap/) - Professional-grade animation for the modern web
- **PDF Processing**:
  - [jsPDF](https://github.com/parallax/jsPDF) - Client-side JavaScript PDF generation
  - [pdf-lib](https://github.com/Hopding/pdf-lib) - Create and modify PDF documents in any JavaScript environment
  - [html2canvas](https://github.com/niklasvh/html2canvas) - Screenshots with JavaScript
- **Document Processing**:
  - [mammoth.js](https://github.com/mwilliamson/mammoth.js) - Convert Word documents (.docx files) to HTML
  - [SheetJS](https://github.com/SheetJS/sheetjs) - Spreadsheet Data Toolkit

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RorriMaesu/anyDoc2PDF.git
   cd anyDoc2PDF
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development server (the exact port may vary):
   ```
   http://localhost:5173/anydoc2pdf/
   ```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for GitHub Pages deployment. The included GitHub Actions workflow automatically builds and deploys the application when changes are pushed to the main branch.

### Manual Deployment

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to GitHub Pages or any static hosting service of your choice.

## Performance Optimization

AnyDoc2PDF is optimized for performance in several ways:

- **Lazy Loading**: Components and libraries are loaded only when needed
- **Code Splitting**: The application is split into smaller chunks for faster loading
- **Optimized Assets**: Images and animations are optimized for web delivery
- **Efficient Rendering**: React's virtual DOM minimizes expensive DOM operations

## Privacy & Security

We take privacy seriously:

- **No Server Processing**: All document conversion happens in your browser
- **No Data Collection**: We don't collect any personal information or analytics
- **No Cookies**: The application doesn't use cookies or tracking mechanisms
- **Open Source**: The code is open for inspection by anyone

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

AnyDoc2PDF wouldn't be possible without these amazing open-source projects:

- All the libraries mentioned in the Technology Stack section
- The open-source community for their continuous support and inspiration
