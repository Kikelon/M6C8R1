import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Disco } from '../models/disco';

@Injectable({
  providedIn: 'root'
})

export class DiscoService {

  //Atributos

  public discos: Disco[];
  private url = 'http://localhost:3000/discos';

  constructor(private http: HttpClient) {
  }

  // Metodo para recoger un dato de la tabla filtrado por id
  public obtenerDisco(id: number){
    return this.http.get(this.url + '/' + id);
  };

  // Metodo para recoger todos los datos de la tabla
  public obtenerDiscos(){
    return this.http.get(this.url);
  };

  // Método para añadir un nuevo dato a la tabla
  public añadirDisco(newDisco: Disco){
    return this.http.post(this.url, newDisco);
  };

  // Metodo para actualizar un dato de la tabla filtrado por id
  public actualizarDisco(disco: Disco){
    return this.http.put(this.url, disco);
  };

  // Metodo para borrar un dato de la tabla filtrado por id
  public borrarDisco(index: number){
    const httpOptions = {headers: null, body: {id : index}};
    return this.http.delete(this.url, httpOptions);
  };
}
