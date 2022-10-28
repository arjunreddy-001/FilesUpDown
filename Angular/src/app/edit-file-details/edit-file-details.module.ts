import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFileDetailsComponent } from './edit-file-details.component';
import { ImageModule } from 'primeng/image';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileManagerService } from '../file-manager/file-manager.service';

@NgModule({
  declarations: [EditFileDetailsComponent],
  imports: [
    CommonModule,
    ImageModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [EditFileDetailsComponent],
  providers: [FileManagerService],
})
export class EditFileDetailsModule {}
