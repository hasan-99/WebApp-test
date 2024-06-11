import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  life: number = 6000; // 6 Seconds

  constructor(private messageService: MessageService) { }

  success(myMessage: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: myMessage });
  }
  error(myMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: myMessage });
  }
  server_error(myMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Server Error', detail: myMessage });
  }
  app_error(myMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Application Error', detail: myMessage });
  }
  status_401_error(myMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Token Interceptor', detail: myMessage });
  }


}
