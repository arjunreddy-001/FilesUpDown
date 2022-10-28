import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { FileManagerService } from '../file-manager/file-manager.service';

@Component({
  selector: 'app-edit-file-details',
  templateUrl: './edit-file-details.component.html',
  styleUrls: ['./edit-file-details.component.css'],
})
export class EditFileDetailsComponent implements OnInit {
  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private fileManagerSvc: FileManagerService
  ) {}

  file: any;

  form: FormGroup = this.fb.group({
    description: new FormControl(''),
    altText: new FormControl(''),
  });

  ngOnInit(): void {
    this.file = { ...this.config.data.f };
    this.file.path = environment.apiUrl + '/' + this.file.path;

    this.form.patchValue({
      description: this.file.description,
      altText: this.file.altText,
    });
  }

  saveUpdatedFileDetails() {
    let data = { ...this.form.value, id: this.file.id };

    this.fileManagerSvc.updateFileDetails(data).subscribe((res) => {
      console.log(res);

      this.fileManagerSvc.onUpdateSuccess.emit(res);
    });
  }

  resetForm() {
    this.form.reset();
  }
}
