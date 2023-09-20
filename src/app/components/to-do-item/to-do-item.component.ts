import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CaixaEdicaoComponent } from '../caixa-edicao/caixa-edicao.component';
import { CaixaConfirmarComponent } from '../caixa-confirmar/caixa-confirmar.component';
import { ITarefa, Tarefa } from 'src/app/interfaces/tarefa.model';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css'],
})
export class ToDoItemComponent implements OnInit {
  @Input() tarefa: ITarefa = new Tarefa();

  @Output() emitir = new EventEmitter<ITarefa>();
  @Output() salvar = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  protected editarTarefa(): void {
    const dialogRef = this.dialog.open(CaixaEdicaoComponent, {
      width: '250px',
      data: this.tarefa.nome,
    });

    dialogRef.afterClosed().subscribe((resposta) => {
      if (resposta && resposta.trim().length > 0) {
        this.tarefa.nome = resposta.trim();
        this.salvar.emit();
      }
    });
  }

  protected marcarTarefa(): void {
    this.tarefa.feito = !this.tarefa.feito;
    this.salvar.emit();
  }

  protected chamarExclusao(): void {
    const dialogRef = this.dialog.open(CaixaConfirmarComponent, {
      width: '300px',
      data: {
        mensagem: `Excluir ${this.tarefa.nome}?`,
        nome: this.tarefa.nome,
      },
    });

    dialogRef.afterClosed().subscribe((resposta) => {
      if (resposta === true) {
        this.emitir.emit(this.tarefa);
      }
    });
  }
}
