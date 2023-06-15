import {
  Component,
  VERSION,
  ViewChild,
  OnInit,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-recording-vidio-and-audio',
  templateUrl: './recording-vidio-and-audio.component.html',
  styleUrls: ['./recording-vidio-and-audio.component.scss']
})
export class RecordingVidioAndAudioComponent {
  @ViewChild('recordedVideo') recordVideoElementRef: ElementRef;
  @ViewChild('video') videoElementRef: ElementRef;

  videoElement: HTMLVideoElement;
  recordVideoElement: HTMLVideoElement;
  mediaVideoRecorder: any;
  mediaRecorder: any;

  constraints = {
    audio: true,
    video: true
  };

  recordedBlobs: Blob[];
  isRecording: boolean = false;
  downloadUrl: string;
  stream: MediaStream;

  constructor() {}

  async ngOnInit() {
   console.log(navigator.mediaDevices.enumerateDevices());
   
   navigator.mediaDevices.enumerateDevices().then((devices)=>{
    console.log(devices);

    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: "84c309958c0b4f9b73c0adf03744aeaab51f5d2252784635f56501804c9fca48",
          frameRate: { ideal: 10 },
          width: 426,
          height: 240
        },
        audio: true
      })
      .then(stream => {
        this.videoElement = this.videoElementRef.nativeElement;        
        this.recordVideoElement = this.recordVideoElementRef.nativeElement;

        this.stream = stream;
        this.videoElement.srcObject = this.stream;
      });
  })
  }

  startRecording() {
    this.recordedBlobs = [];
    let options: any = {
      mimeType: 'video/webm'
    };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = !this.isRecording;
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
    console.log('Recorded Blobs: ', this.recordedBlobs);
  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      console.log('cannot play.');
      return;
    }
    this.recordVideoElement.play();
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        console.log(event);
        
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm'
        });
        this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        this.recordVideoElement.src = this.downloadUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }
}
