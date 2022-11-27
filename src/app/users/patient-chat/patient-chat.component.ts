import {
  Component,
  ElementRef,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { CompanyChatService } from 'src/app/services/company-chat.service';
import { TeamsService } from 'src/app/services/teams.service';
import { VoicerecorderService } from 'src/app/voicerecorder.service';
import { ChatService } from './../../services/chat.service';
import { CompanyService } from './../../services/company.service';
import { UserService } from './../../services/user.service';
const SOCKET_ENDPOINT = 'https://realtime.aroundorder.com:3200';

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css'],
})
export class PatientChatComponent implements OnInit {
  message;
  text;
  userconnected: any;
  recieverid: number;
  recieveruser: any;
  chatlogfilename: string;
  isRecording = false;
  recordedTime;
  blobUrl;
  contacts: any[] = [];
  final_contacts: any[] = [];
  currentuserid: number;
  members: any[] = [];
  memberss: any[] = [];
  unseenmessages: Map<number, any> = new Map<number, any>();
  allchatlogs: Map<number, any[]> = new Map<number, any[]>();
  allchatlogfiles: Map<number, string> = new Map<number, string>();
  groupchatlist: any[] = [];
  currentchatuser: any = null;
  currentgroupchat: any;
  currentuser: string = '';
  socket: any;
  chatlog: any[] = [];
  currenttab: string = 'users';
  currentchatlogfilename: string;
  messagetext: string;
  chatloggrp: any[] = [];
  currentchatmembers: any[] = [];
  static currentlyconnectedmembers: any[] = [];
  currentchatterflname: string = '';
  @ViewChild('target') private myScrollContainer: ElementRef;
  constructor(
    public router: Router,
    public userserv: UserService,
    public chatser: ChatService,
    private audioRecordingService: VoicerecorderService,
    private sanitizer: DomSanitizer,
    private teamser: TeamsService,
    private compser: CompanyService,
    private compserchat: CompanyChatService
  ) {
    this.userconnected = localStorage.getItem('main');
    this.currentuserid = JSON.parse(this.userconnected).id;

    this.chatser
      .getallcontacts(JSON.parse(this.userconnected).id)
      .subscribe((conts: any) => {
        this.contacts = conts.message;

        this.contacts.forEach((element: any) => {
          if (element.user11.id == JSON.parse(this.userconnected).id) {
            this.final_contacts.push(element.user21);
            this.allchatlogfiles.set(element.user21.id, element.filename);
            this.unseenmessages.set(element.user21.id, { nbr: 0, msg: '' });
          } else {
            this.final_contacts.push(element.user11);
            this.recieveruser = this.final_contacts[0];

            this.allchatlogfiles.set(element.user11.id, element.filename);
            this.unseenmessages.set(element.user11.id, { nbr: 0, msg: '' });
          }
        });

        this.recieveruser = this.final_contacts[0];

        this.getuser(this.recieveruser.id);
        this.switchuser(this.recieveruser);
      });
    this.compserchat
      .getchatgroupsbyuser(this.currentuserid)
      .subscribe((flcht: any) => {
        this.groupchatlist = flcht.groups;
        this.currentgroupchat = this.groupchatlist[0];
      });
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.files[0] = new File([data.blob], data.title);
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }
  joinchatroom(chatroomid: string) {}
  ngOnInit(): void {}

  getuser(id: number) {
    this.userserv.getuserbyid(id).subscribe((usr: any) => {
      this.recieveruser = usr.message;
    });
  }

  getvalue(id: number) {
    return this.unseenmessages.get(id).nbr;
  }
  getchatmembetname(id: number) {
    var mem: any;
    this.currentchatmembers.forEach((element: any) => {
      if (element.id === id) {
        mem = element;
      }
    });
    return mem;
  }
  getmessage(id: number) {
    return this.unseenmessages.get(id).msg;
  }
  checkifconnected(id: number) {
    if (PatientChatComponent.currentlyconnectedmembers.indexOf(id) > -1) {
      return true;
    } else {
      return false;
    }
  }
  setupSocketConnection(chatlogfilen: string) {
    this.socket = io(SOCKET_ENDPOINT);

    this.socket.on('connection', (data: string) => {
      if (data) {
      }
    });

    this.socket.emit('savemytoken', {
      id: JSON.parse(this.userconnected).id,
    });
    /*user to user  chat */
    this.socket.on('chatlog', (data: any) => {
      data.log.forEach((element) => {
        if (element.sender == JSON.parse(this.userconnected).id) {
          element.me = true;
        } else {
          element.me = false;
        }
      });
      this.chatlog = data.log;
    });
    this.socket.on('message', (data: any) => {
      if (data.sender == this.recieveruser.id) {
        var nbn = this.unseenmessages.get(data.sender).nbr + 1;
        var msgn = data.message;
        this.unseenmessages.set(this.recieveruser.id, { nbr: nbn, msg: msgn });
        if (data.sender == JSON.parse(this.userconnected).id) {
          data.me = true;
        } else {
          data.me = false;
        }

        this.chatlog.push(data);
        this.chatlog.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else {
        var nbn = this.unseenmessages.get(data.sender).nbr + 1;
        var msgn = data.message;
        this.unseenmessages.set(data.sender, { nbr: nbn, msg: msgn });
      }
    });
    if (this.currenttab == 'users') {
      this.socket.emit('connectrochat', {
        idsender: JSON.parse(this.userconnected).id,
        idreciever: this.recieverid,
        filelog: chatlogfilen,
      });
    } else {
      this.socket.emit('room', {
        room: this.currentgroupchat.file_name,
        sender: this.currentuserid,
      });
      this.socket.emit('getroomclients', {
        idsender: JSON.parse(this.userconnected).id,

        room: this.currentgroupchat.file_name,
      });
      this.socket.emit('joingrouproom', {
        idsender: JSON.parse(this.userconnected).id,

        filelog: this.currentgroupchat.file_name,
      });
    }

    /*user to group  chat */
    this.socket.on('connectToRoom', function (data) {});
    this.socket.on('getclients', function (data) {
      var arrays: number[] = [];
      data.clients.forEach((element) => {
        PatientChatComponent.currentlyconnectedmembers.push(element);
      });
    });
    this.socket.on('chatloggrp', (data: any) => {
      data.log.forEach((element) => {
        if (element.sender == JSON.parse(this.userconnected).id) {
          element.me = true;
        } else {
          element.me = false;
        }
      });
      this.chatloggrp = data.log;
    });
    this.socket.on('messagegrp', (data: any) => {
      this.chatloggrp.push(data);
      this.chatloggrp.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  }

  switchuser(item: any) {
    this.recieveruser = item;
    this.currentchatterflname = item.first_name + ' ' + item.last_name;
    this.chatlogfilename = this.allchatlogfiles.get(item.id);
    var nbn = 0;
    var msgn = '';
    this.unseenmessages.set(item.id, { nbr: nbn, msg: msgn });
    this.setupSocketConnection(this.chatlogfilename);
  }
  switchgroup(grp: any) {
    this.currentgroupchat = grp;
    this.currentchatterflname = grp.company.company_name;

    this.currentchatmembers = grp.members;

    this.setupSocketConnection(grp.file_name);
  }
  changetouser() {
    this.currenttab = 'users';
    this.switchuser(this.final_contacts[0]);
  }

  changetogroup() {
    this.currenttab = 'groups';
    this.currentgroupchat = this.groupchatlist[0];
    this.currentchatlogfilename = this.currentgroupchat.file_name;
    this.currentchatmembers = this.currentgroupchat.members;
    this.currentchatterflname = this.groupchatlist[0].company.company_name;
    this.setupSocketConnection(this.currentgroupchat.file_name);
  }
  send() {
    if (this.currenttab == 'users') {
      if (this.messagetext != null || this.files.length > 0) {
        if (this.files.length > 0) {
          const formData = new FormData();
          var fichier: File;
          fichier = this.files[0];
          var ext = fichier.name.split('.').pop();
          formData.append(
            'file',
            this.files[0],
            this.chatlogfilename + '-' + this.chatlog.length + '.' + ext
          );
          this.chatser
            .uploadchatattachement(formData, this.chatlogfilename)
            .subscribe((element: any) => {
              var msg: any = {
                message: this.messagetext,
                reciever: this.recieveruser.id,
                time: Date.now(),
                type: ext,
                state: 'unseen',
                sender: JSON.parse(this.userconnected).id,
                filelog: this.chatlogfilename,
                id: this.chatlog.length,
              };
              this.socket.emit('message', msg);
              msg.me = true;
              this.chatlog.push(msg);
              this.chatlog.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              this.messagetext = '';
              this.files = [];
              this.addingattach = false;
            });
        } else {
          if (this.messagetext != '') {
            var msg: any = {
              message: this.messagetext,
              reciever: this.recieveruser.id,
              time: Date.now(),
              type: 'message',
              sender: JSON.parse(this.userconnected).id,
              filelog: this.chatlogfilename,
              state: 'unseen',
              id: this.chatlog.length,
            };
            this.socket.emit('message', msg);
            msg.me = true;
            this.chatlog.push(msg);
            this.chatlog.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            this.messagetext = '';
          }
        }
      }
    } else {
      if (this.messagetext != null || this.files.length > 0) {
        if (this.files.length > 0) {
          const formData = new FormData();
          var fichier: File;
          fichier = this.files[0];
          var ext = fichier.name.split('.').pop();
          formData.append(
            'file',
            this.files[0],
            this.currentgroupchat.file_name +
              '-' +
              this.chatloggrp.length +
              '.' +
              ext
          );
          this.chatser
            .uploadchatattachement(formData, this.currentgroupchat.file_name)
            .subscribe((element: any) => {
              var msg: any = {
                message: this.messagetext,
                reciever: this.recieveruser.id,
                time: Date.now(),
                type: ext,
                state: 'unseen',
                sender: JSON.parse(this.userconnected).id,
                filelog: this.currentgroupchat.file_name,
                id: this.chatloggrp.length,
              };
              this.socket.emit('messagetogroup', msg);
              msg.me = true;
              this.chatloggrp.push(msg);
              this.chatloggrp.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              this.messagetext = '';
              this.files = [];
              this.addingattach = false;
            });
        } else {
          if (this.messagetext != '') {
            var msg: any = {
              message: this.messagetext,
              reciever: this.recieveruser.id,
              time: Date.now(),
              type: 'message',
              sender: JSON.parse(this.userconnected).id,
              filelog: this.currentgroupchat.file_name,
              state: 'unseen',
              id: this.chatloggrp.length,
            };
            this.socket.emit('messagetogroup', msg);
            msg.me = true;
            this.chatloggrp.push(msg);
            this.chatloggrp.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            this.messagetext = '';
          }
        }
      }
    }
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,

      left: 0,

      behavior: 'smooth',
    });
  }
  scrollToElement(): void {
    var nbn = 0;
    var msgn = '';
    this.unseenmessages.set(this.recieveruser.id, { nbr: nbn, msg: msgn });
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,

      left: 0,

      behavior: 'smooth',
    });
  }
  files: File[] = [];
  onSelect(event) {
    if (this.files.length > 0) {
      this.files.splice(0, 1);
      this.files.push(...event.addedFiles);
    } else {
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  addingattach: boolean = false;
  showdrop() {
    this.addingattach = !this.addingattach;
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }
}
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
