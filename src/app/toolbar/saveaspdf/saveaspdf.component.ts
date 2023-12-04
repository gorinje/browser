import { Component, ElementRef, ViewChild } from '@angular/core';
import { faFilePdf, faHomeUser } from "@fortawesome/free-solid-svg-icons";
import { PdfGeneratorService } from "../../services/pdf-generator.service";

@Component({
  selector: 'app-saveaspdf',
  templateUrl: './saveaspdf.component.html',
  styleUrls: ['./saveaspdf.component.css']
})
export class SaveaspdfComponent {

  protected readonly faHomeUser = faHomeUser;
  protected readonly faFilePdf = faFilePdf;
  @ViewChild('getpdf') searchElement: ElementRef = new ElementRef({});

  constructor(private pdfGeneratorService: PdfGeneratorService) {}

  generatePDF() {
    const options = { /* your PDF generation options */ };

    this.pdfGeneratorService.generatePDF(options).then(data => {
      // Use the data to trigger a download
      this.downloadPdf(data);
    }).catch(error => {
      console.error(error);
    });
  }

  private downloadPdf(data: string): void {
    const blob = new Blob([Buffer.from(data, 'base64')], { type: 'application/pdf' });
    const blobURL = URL.createObjectURL(blob);

    // Create a hidden anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = blobURL;
    downloadLink.download = 'your-file-name.pdf'; // Set the desired file name

    // Simulate a click on the anchor element to trigger the download
    downloadLink.click();

    // Clean up: remove the anchor element and revoke the blob URL
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobURL);
  }
}
