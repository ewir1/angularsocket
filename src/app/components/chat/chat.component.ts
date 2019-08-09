import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajeSubscription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor( public chatcService: ChatService ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajeSubscription = this.chatcService.getMessages().subscribe( msg => {
      console.log(msg);

      this.mensajes.push(msg);
      
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });
  }

  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }

  enviar() {

    if (this.texto.trim().length === 0) {
      return;
    }

    this.chatcService.sendMessage(this.texto);
    this.texto = '';
  }

}
