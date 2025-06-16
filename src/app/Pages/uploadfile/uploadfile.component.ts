import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BasUrl } from '../../Models/UrlModel';
import { ConfirmComponentComponent } from '../../Components/confirm-component/confirm-component.component';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';
import { LoadingComponent } from '../../Components/loading/loading.component';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class UploadfileComponent implements OnInit {
  files: any[] = [];
  displayedFiles: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  apiUrl = new BasUrl() // Use consistent API

  showUploadModal = false;
  type :string ='';
  fileName: string = '';
  selectedFile: File | null = null;

  constructor(private http: HttpClient,private dialog: MatDialog) {}

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.http.get<{ files: any[] }>(`${this.apiUrl.BaseUrl}/StudentHelp/GetAdminFiles`).subscribe({
      next: (response) => {
        this.files = response.files ?? [];
        this.totalPages = Math.ceil(this.files.length / this.pageSize);
        this.updateDisplayedFiles();
      },
      error: (error) => console.error('Error fetching files:', error)
    });
  }


  updateDisplayedFiles() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedFiles = this.files.slice(startIndex, startIndex + this.pageSize);

  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedFiles();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedFiles();
    }
  }

  deleteFile(id: number) {
this.dialog.open(ConfirmComponentComponent, {
 width: '350px',
 disableClose: true,
}).afterClosed().subscribe((result) => {

      this.http.delete(`${this.apiUrl.BaseUrl}/StudentHelp/DeleteFileById/DeleteFileById/${id}`).subscribe({
        next: (res:any) => {

          console.log(res);
          this.dialog.open(FinalMessageComponent, {
            width: '350px',
            disableClose: true,
            data: { message: res.message }
          });
          this.files = this.files.filter(file => file.id !== id);
          this.totalPages = Math.ceil(this.files.length / this.pageSize);
          this.updateDisplayedFiles();
        },
        error: (error) => {
          console.error('Error deleting file:', error);
          this.dialog.open(FinalMessageComponent, {
            width: '350px',
            disableClose: true,
            data: { message: 'Error deleting file' }
          });
        }
      });
    });
  }

  openUploadModal() {
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
    this.fileName = '';
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

//   uploadFile() {
//     if (!this.selectedFile || !this.fileName) {
//       this.dialog.open(FinalMessageComponent, {
//           width: '350px',
//           disableClose: true,
//           data: { message: 'please upload a file' }
//         });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('fileName', this.fileName);
//     formData.append('type',this.type);

// if(this.selectedFile.type !=='application/pdf'){


//       this.dialog.open(FinalMessageComponent, {
//         width: '350px',
//         disableClose: true,
//         data: { message: 'Please upload a PDF file' }
//       });
//       return;
// }

//     this.http.post(`${this.apiUrl.BaseUrl}/StudentHelp/UploadFile`, formData).subscribe({
//       next: (res:any) => {
// if (res.success) {
// this.dialog.open(FinalMessageComponent, {
//           width: '350px',
//           disableClose: true,
//           data: { message: 'File uploaded successfully' }
//         });
// }
// else {

//   this.dialog.open(FinalMessageComponent, {
//           width: '350px',
//           disableClose: true,
//           data: { message: res.message }
//         });
// }
//         this.closeUploadModal();
//         this.loadFiles();
//       },
//       error: (error) => console.error('Error uploading file:', error)
//     });
//   }

uploadFile() {
  if (!this.selectedFile || !this.fileName) {
    this.dialog.open(FinalMessageComponent, {
      width: '350px',
      disableClose: true,
      data: { message: 'Please upload a file' }
    });
    return;
  }

  if (this.selectedFile.type !== 'application/pdf') {
    this.dialog.open(FinalMessageComponent, {
      width: '350px',
      disableClose: true,
      data: { message: 'Please upload a PDF file' }
    });
    return;
  }


  const loadingRef = this.dialog.open(LoadingComponent, {
    width: '300px',
    disableClose: true
  });

  if (this.fileName.length >50){

    this.dialog.open(FinalMessageComponent, {
      width: '350px',
      disableClose: true,
      data: { message: 'File name should not exceed 50 characters' }
    });
    loadingRef.close();
    return;
  }
  const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('fileName', this.fileName);
  formData.append('type', this.type);

  this.http.post(`${this.apiUrl.BaseUrl}/StudentHelp/UploadFile`, formData).subscribe({
    next: (res: any) => {
      loadingRef.close();
      this.dialog.open(FinalMessageComponent, {
        width: '350px',
        disableClose: true,
        data: { message: res.success ? 'File uploaded successfully' : res.message }
      });
      this.closeUploadModal();
      this.loadFiles();
    },
    error: () => {
      loadingRef.close();
      this.dialog.open(FinalMessageComponent, {
        width: '350px',
        disableClose: true,
        data: { message: 'Error uploading file' }
      });
    }
  });
}
}
