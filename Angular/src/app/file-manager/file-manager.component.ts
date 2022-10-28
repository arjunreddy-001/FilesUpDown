import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from 'src/models/file';
import { FileManagerService } from './file-manager.service';
import { saveAs } from 'file-saver';
import { DialogService } from 'primeng/dynamicdialog';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditFileDetailsComponent } from '../edit-file-details/edit-file-details.component';

@Component({
  selector: 'file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class FileManagerComponent implements OnInit {
  files!: File[];

  dialog = {
    display: false,
    src: '',
    alt: '',
    title: '',
    description: '',
    maximized: false,
  };

  constructor(
    private fileManagerSvc: FileManagerService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllFiles();
  }

  getAllFiles() {
    this.fileManagerSvc.getFiles().subscribe((res) => {
      res.map((file) => {
        file.dateAdded = new Date(file.dateAdded).toDateString();
      });

      this.files = res;
    });
  }

  showViewImageDialog(file: File) {
    this.dialog.src = environment.apiUrl + '/' + file.path;
    this.dialog.title = file.actualName;
    this.dialog.alt = file.altText;
    this.dialog.description = file.description;
    this.dialog.display = true;
  }

  showImageUploadDialog() {
    const ref = this.dialogService.open(ImageUploadComponent, {
      header: 'Select File',
      width: '50%',
    });

    this.fileManagerSvc.onUploadSuccess.subscribe((fileName) => {
      ref.close();

      this.messageService.clear();

      this.messageService.add({
        severity: 'success',
        summary: 'Uploaded Successfully',
        detail: 'File name: ' + fileName,
      });

      this.getAllFiles();
    });
  }

  showEditFileDetailsDialog(file: any) {
    const ref = this.dialogService.open(EditFileDetailsComponent, {
      header: 'Edit File Details',
      width: '30%',
      data: {
        f: file,
      },
    });

    this.fileManagerSvc.onUpdateSuccess.subscribe((file: File) => {
      ref.close();

      this.messageService.clear();

      this.messageService.add({
        severity: 'success',
        summary: 'Updated Successfully',
      });

      this.updateFileRecord(file);
    });
  }

  onViewImageMaximize(event: any) {
    this.dialog.maximized = event.maximized;
  }

  resetViewImageDialog() {
    this.dialog = {
      display: false,
      src: '',
      alt: '',
      title: '',
      description: '',
      maximized: false,
    };
  }

  downloadFile(file: File) {
    this.fileManagerSvc.downloadFile(file.id).subscribe((res: Blob) => {
      const blob = new Blob([res], { type: file.contentType });

      // To download (using FileSaver.js)
      saveAs(blob, file.actualName);

      // To download (without using any external library)
      // const anchor = document.createElement('a');
      // const objectUrl = URL.createObjectURL(blob);
      // anchor.href = objectUrl;
      // anchor.download = file.actualName;
      // anchor.click();
      // URL.revokeObjectURL(objectUrl);

      // To open file (image) in new tab
      // const url = window.URL.createObjectURL(blob);
      // window.open(url);
    });
  }

  updateFileRecord(file: File) {
    let exitingFileRecord = this.files.find((f) => f.id === file.id);

    exitingFileRecord.description = file.description;
    exitingFileRecord.altText = file.altText;
  }

  confirmDelete(event: any, fileId: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fileManagerSvc.deleteFile(fileId).subscribe(() => {
          this.files = this.files.filter((f) => f.id !== fileId);

          this.messageService.clear();
          this.messageService.add({
            severity: 'info',
            summary: 'Delete Successful',
          });
        });
      },
    });
  }
}
