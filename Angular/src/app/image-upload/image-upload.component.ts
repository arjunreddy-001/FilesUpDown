import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileManagerService } from '../file-manager/file-manager.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  selectedFiles: any[] = [];

  form = this.fb.group({
    fileMetas: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private fileManagerSvc: FileManagerService
  ) {}

  ngOnInit(): void {}

  onFilesSelection(event: any) {
    for (let file of event.currentFiles) {
      this.selectedFiles.push(file);

      file.fg = this.createFileMetadataFormGroup(file);
      this.fileMetas.push(file.fg);
    }
  }

  onClearFilesSelection() {
    this.fileMetas.clear();
  }

  uploadHandler() {
    this.fileMetas.value.forEach((e: any) => {
      const formData = new FormData();

      formData.append('file', e.file);
      formData.append('altText', e.altText);
      formData.append('description', e.description);

      this.fileManagerSvc.uploadFile(formData).subscribe(() => {
        this.fileManagerSvc.onUploadSuccess.emit(e.file.name);
      });
    });
  }

  createFileMetadataFormGroup(file: any): FormGroup {
    return this.fb.group({
      file: new FormControl(file),
      description: new FormControl(''),
      altText: new FormControl(''),
    });
  }

  get fileMetas(): FormArray {
    return <FormArray>this.form.get('fileMetas');
  }
}
