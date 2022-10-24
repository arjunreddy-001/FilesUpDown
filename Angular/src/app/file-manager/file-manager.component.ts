import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from 'src/models/file';
import { FileManagerService } from './file-manager.service';

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

  showDialog(file: File) {
    this.dialog.src = environment.apiUrl + '/' + file.path;
    this.dialog.title = file.actualName;
    this.dialog.alt = file.altText;
    this.dialog.description = file.description;
    this.dialog.display = true;
  }
}
