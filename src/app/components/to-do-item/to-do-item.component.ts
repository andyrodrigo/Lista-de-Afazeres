import { Component, Input, OnInit } from '@angular/core';
import { ToDo } from 'src/app/interfaces/to-do';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {

  feito = false;

  @Input() todo: ToDo = {
    id: 0,
    titulo: '',
    feito: false
  }
  


  constructor() { }

  ngOnInit(): void {
  }

  removeTodo(): void {

  }

  markAsDone():void{
    this.feito = true;
  }

}
