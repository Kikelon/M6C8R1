import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Disco } from '../models/disco';
import { DiscoService } from '../shared/disco.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.page.html',
  styleUrls: ['./vista.page.scss'],
})

export class VistaPage implements OnInit {

  public disco: Disco;
  public toast: any;

  constructor(private apiService: DiscoService, private toastCtrl: ToastController) {
    this.disco = null;
  }

  mostrarDisco(discoId: HTMLInputElement){
    if (discoId.value !== ''){
        this.apiService.obtenerDisco(parseInt(discoId.value, 10)).subscribe((data: any) =>
        {
            this.disco = data[0];
						const message = 'No hay nigún disco con el id:\"' + discoId.value + '\" en la base de datos';
						if (data[0]==null) {
							this.presentToast(message);
						};
						discoId.value = '';
          });
        }
      else
      {
        this.presentToast('Ha de introducir un id por el que buscar.');
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
