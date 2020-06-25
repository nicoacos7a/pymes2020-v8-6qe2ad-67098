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
        Validators.pattern("[0-9]{1,3}")
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

  BuscarPorId(eq, AccionABMC) {
    window.scroll(0, 0);

    this.equiposService.getById(eq.IdEquipo).subscribe((res: any) => {
      this.FormReg.patchValue(res);
      this.AccionABMC = AccionABMC;
    });
  }

  // Consultar(emp) {
  //   this.BuscarPorId(emp, "C");
  // }

  // Modificar(emp) {
  //   this.submitted = false;
  //   this.FormReg.markAsPristine();
  //   this.FormReg.markAsUntouched();
  //   this.BuscarPorId(emp, "M");
  // }

  Grabar() {
    this.submitted = true;

    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };
 
    // agregar post
    if (itemCopy.IdEquipo == 0 || itemCopy.IdEquipo == null) {
      this.equiposService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
      // modificar put
      this.equiposService.put(itemCopy.IdEquipo, itemCopy).subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.Buscar();
        });
    }
  }

  Volver() {
    this.AccionABMC = "L";
  }

}