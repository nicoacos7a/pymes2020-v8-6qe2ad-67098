import { Component, OnInit } from '@angular/core';
import { Equipo } from "../../models/equipo";
import { EquiposService } from "../../services/equipos.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}