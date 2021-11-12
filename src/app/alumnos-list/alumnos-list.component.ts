import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {

  listaDatos: Datos[] = []
  fCodAlu = new FormControl();

  CODALU: string = ''
  NOMALU: string = ''
  APEALU: string = ''
  CODCUR: string = ''
  NOMCUR: string = ''
  NOTA: number = 0
  CREDITO: number = 0
  promedio: number = 0

  constructor(
    private service: ServicesService,

  ) { }

  ngOnInit(): void {


  }

  fnMostrarUsuario() {
    let CODALU: string;
    CODALU = this.fCodAlu.value;

    this.service.getData(CODALU).subscribe(
      (res: any) => {

        this.listaDatos = res;
        console.log(this.listaDatos)
        //this.fNombre.setValue(this.lZona[0].sNombre);
        //this.fRutaImagen.setValue(this.lZona[0].sRutaImagen);


      },
      //Mensaje erroneo
      err => console.error(err)
    );
  }

  async getUsuario() {
    let CODALU: string;
    CODALU = this.fCodAlu.value;

    await this.service.getData(CODALU)
      .subscribe(res => this.respuesta(res));

  }

  respuesta(res: any) {
    this.listaDatos = res
    console.log(this.listaDatos)

    this.CODALU = ''
    this.APEALU = ''
    this.CODCUR = ''
    this.NOMCUR = ''
    this.NOTA = 20

    this.promediar();

  }

  promediar() {
    //Multiplicacion Nota * credito / sumaCreditos
    let notaCred: number = 0
    let sumaCred: number = 0
    if (this.listaDatos.length > 0) {
      for (let i = 0; i < this.listaDatos.length; i++) {
        if (this.listaDatos[0].nota != null) {
          notaCred = notaCred + (this.listaDatos[0].nota * this.listaDatos[0].credito)
        }
        sumaCred = sumaCred + this.listaDatos[0].credito
      }
      this.promedio = (notaCred / sumaCred);
    }
    else {
      this.promedio = 0
    }

  }
}

interface Datos {
  codalu: string,
  nomalu: string,
  apealu: string,
  codcur: string,
  nomcur: string,
  nota: number,
  credito: number
}