import { Component, OnInit } from '@angular/core';
import { Equipo } from "../../models/equipo";
import { EquiposService } from "../../services/equipos.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  Titulo = "Equipos";
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)

  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  ListaEquipos: Equipo[] = [];
  SinBusquedasRealizadas = true;
  FormReg: FormGroup;
  submitted = false;

  constructor(
    private equiposService: EquiposService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit() {
  }

}