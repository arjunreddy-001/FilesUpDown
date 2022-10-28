import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from 'src/models/file';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private http: HttpClient) {}

  endPoint = environment.apiUrl + '/api/File';

  onUploadSuccess = new EventEmitter();

  getFiles() {
    return this.http.get<File[]>(this.endPoint);
  }

  uploadFile(uploadFileData: FormData) {
    return this.http.post(this.endPoint, uploadFileData, {
      headers: new HttpHeaders(),
    });
  }

  downloadFile(id: number) {
    return this.http.get(this.endPoint + `/download/${id}`, {
      responseType: 'blob',
    });
  }
}
