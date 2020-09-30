import { Component, OnInit } from '@angular/core';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScrip', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  habilitar: boolean = true;

  constructor() { }

  setHabilitar(): void{
    this.habilitar = (this.habilitar == true)? false: true;
  }

}
