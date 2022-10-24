import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from 'src/models/file';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get<File[]>(environment.apiUrl + '/api/File');
  }
}
