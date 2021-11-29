import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Disco } from '../models/disco';
import { DiscoService } from '../shared/disco.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  public toast: any;

  constructor(private apiService: DiscoService, private toastCtrl: ToastController) { }

  public insertarDisco(titulo: HTMLInputElement, artista: HTMLInputElement, anyoPublicacion: HTMLInputElement)
  {
    if (titulo.value !== '' && artista.value !== '' && anyoPublicacion.value !== '')
    {
      this.apiService.añadirDisco(new Disco(0,titulo.value,artista.value, parseInt(anyoPublicacion.value, 10)))
      .subscribe((data) =>
      {
        titulo.value = '';
        artista.value = '';
        anyoPublicacion.value = '';
        this.presentToast('Usuario Insertado Correctamente con id:' + data);
        console.log(data);
      });
    }
    else
    {
      this.presentToast('Falta algún campo para poder realizar la inserción');
    }

  };

  public presentToast(mensaje: string) {
    this.toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  };

  ngOnInit() {
  }

}
