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

  public discos: Disco;
  public toast: any;

  constructor(private apiService: DiscoService, private toastCtrl: ToastController) {
    this.discos = null;
  }

  mostrarDisco(discoId: HTMLInputElement){
    if (discoId.value !== ''){
        this.apiService.obtenerDisco(parseInt(discoId.value, 10)).subscribe((data: any) =>
        {
            this.discos = data;
						if (data[0]==null) {
              const message = 'No hay nigún disco con el id: \"' + discoId.value + '\" en la base de datos';
              this.discos = null;
							this.presentToast(message);
						};
						discoId.value = '';
          });
        }
      else {
        this.apiService.obtenerDiscos().subscribe((data: any) =>
        {
            this.discos = data;
            console.log(this.discos);
						if (data==null) {
              const message = 'No hay nigún disco en la base de datos';
              this.discos = null;
							this.presentToast(message);
						};
						discoId.value = '';
        });
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
