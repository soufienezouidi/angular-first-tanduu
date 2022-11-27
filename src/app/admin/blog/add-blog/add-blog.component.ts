import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import { TranslateService } from '../../services/translate.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
	selector: 'app-blog',
	templateUrl: './add-blog.component.html',
	styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

	selectedFiles?: FileList;
	currentFile?: File;
	progress = 0;
	message = '';

	fileInfos?: Observable<any>;

	constructor(private uploadService: FileUploadService) { }
	ngOnInit(): void {
		this.fileInfos = this.uploadService.getFiles();
	}

	selectFile(event: any): void {
		this.selectedFiles = event.target.files;
	}

	upload(): void {
		this.progress = 0;

		if (this.selectedFiles) {
			const file: File | null = this.selectedFiles.item(0);

			if (file) {
				this.currentFile = file;

				this.uploadService.upload(this.currentFile).subscribe(
					(event: any) => {
						if (event.type === HttpEventType.UploadProgress) {
							this.progress = Math.round(100 * event.loaded / event.total);
						} else if (event instanceof HttpResponse) {
							this.message = event.body.message;
							this.fileInfos = this.uploadService.getFiles();
						}
					},
					(err: any) => {
						//console.log(err);
						this.progress = 0;

						if (err.error && err.error.message) {
							this.message = err.error.message;
						} else {
							this.message = 'Could not upload the file!';
						}

						this.currentFile = undefined;
					});

			}

			this.selectedFiles = undefined;
		}
	}


}
