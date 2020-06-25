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
    L: "(Listado)"
  };

  AccionABMC = "L";

  Mensajes = {
    RD: " Revisar los datos ingresados..."
  };

  Lista: Equipo[] = [];

  SinBusquedasRealizadas = true;

  FormReg: FormGroup;

  submitted = false;

  constructor(
    private equiposService: EquiposService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit() {
    this.Buscar()

    this.FormReg = this.formBuilder.group({

      IdEquipo: [0],
      
      EquipoNombre: [null, [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50)
      ]],

      EquipoRanking: [null, [
        Validators.required, 
        Validators.pattern("[0-9]{1,10}")
      ]]

    });
  }

  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset(this.FormReg.value);
    this.submitted = false;
    this.FormReg.markAsUntouched();
  }

  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.equiposService.get().subscribe((res: Equipo[]) => {
      this.Lista = res;
    });
  }

  Grabar() {
    this.submitted = true;

    if (this.FormReg.invalid) {
      return;
    }

    const itemCopy = { ...this.FormReg.value };
 
    if (itemCopy.IdEquipo == 0 || itemCopy.IdEquipo == null) {
      this.equiposService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Equipo agregado exitosamente');
        this.Buscar();
      });
    } 
  }

  Volver() {
    this.AccionABMC = "L";
  }

}