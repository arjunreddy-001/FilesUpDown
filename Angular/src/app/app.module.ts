import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FileManagerComponent } from './file-manager/file-manager.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AppComponent, FileManagerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    MenubarModule,
    TooltipModule,
    DynamicDialogModule,
    ImageUploadModule,
    ToastModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
