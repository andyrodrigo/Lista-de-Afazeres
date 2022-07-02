import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() remove: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  removeTodo(): void {
    this.remove.emit(this.todo)
  }

  markAsDone():void{
    this.feito = true;
  }

}
