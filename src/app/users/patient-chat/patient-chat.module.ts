import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { PatientChatRoutingModule } from './patient-chat-routing.module';
import { PatientChatComponent, SafePipe } from './patient-chat.component';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
@NgModule({
  declarations: [PatientChatComponent, SafePipe],
  imports: [
    CommonModule,
    PatientChatRoutingModule,
    FormsModule,
    NgxDropzoneModule,
    NgAudioRecorderModule,
    PdfViewerModule,
    NgxDocViewerModule,
  ],
})
export class PatientChatModule {}
