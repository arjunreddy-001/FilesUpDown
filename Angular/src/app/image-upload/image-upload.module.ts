import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';

import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FileManagerService } from '../file-manager/file-manager.service';

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  exports: [ImageUploadComponent],
  providers: [FileManagerService],
})
export class ImageUploadModule {}
