import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from 'src/models/file';
import { FileManagerService } from './file-manager.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'],
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

  constructor(private fileManagerSvc: FileManagerService) {}

  ngOnInit(): void {
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

  showImageUploadDialog() {}

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
}
