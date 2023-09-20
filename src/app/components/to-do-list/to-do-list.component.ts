import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from 'src/app/services/storage.service';
import { CaixaEdicaoComponent } from '../caixa-edicao/caixa-edicao.component';
import { ITarefa } from 'src/app/interfaces/tarefa.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  itens: Array<ITarefa> = [];
  itensExibidos: Array<ITarefa> = [];

  filtro: string = '';

  constructor(
    public storageService: StorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buscarLista();
  }

  private buscarLista(): void {
    const lista = this.storageService.lerItem('itens');
    if (lista) {
      const itens = JSON.parse(lista);
      this.itens = itens;
      this.itensExibidos = itens;
    } else {
      this.itens = [];
    }
  }

  protected mudarPosicao(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.itensExibidos,
      event.previousIndex,
      event.currentIndex
    );
  }

  protected adicionarTarefa(): void {
    const dialogRef = this.dialog.open(CaixaEdicaoComponent, {
      width: '250px',
      data: '',
    });

    dialogRef.afterClosed().subscribe((resposta) => {
      if (resposta) {
        const novo = {
          id: this.gerarChaveAleatoria(),
          nome: resposta,
          feito: false,
        };
        this.itens.unshift(novo);
        this.salvarDados();
        this.filtrarExibidos(2);
      }
    });
  }

  private gerarChaveAleatoria(): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let chave = '';
    for (let i = 0; i < 16; i++) {
      chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return chave;
  }

  protected receberTarefa(tarefa: ITarefa): void {
    if (tarefa.id) this.excluirtarefa(tarefa.id);
  }

  private excluirtarefa(id: string): void {
    const indice = this.itens.findIndex((item) => item.id === id);
    if (indice > -1) {
      this.itens.splice(indice, 1);
    }
    this.salvarDados();
  }

  protected salvarDados(): void {
    const lista = JSON.stringify(this.itens);
    this.storageService.gravarItem('itens', lista);
  }

  protected filtrarExibidos(option: number): void {
    switch (option) {
      case 0:
        this.itensExibidos = this.itens.filter(function (tarefa) {
          return tarefa.feito === false;
        });
        break;
      case 1:
        this.itensExibidos = this.itens.filter(function (tarefa) {
          return tarefa.feito === true;
        });
        break;
      case 2:
        this.itensExibidos = this.itens;
        break;
      default:
        console.log('error');
    }
  }

  protected filtrarExibidosPor(entrada: string): void {
    this.itensExibidos = this.itens.filter(function (tarefa) {
      return tarefa.nome!.toLowerCase().indexOf(entrada.toLowerCase()) > -1;
    });
  }

  protected limparFiltro(): void {
    this.filtro = '';
    this.filtrarExibidosPor('');
  }

  protected contarItensFeitos(): number {
    return this.itens.filter((item) => item.feito === true).length;
  }

  protected contarItensNaoFeitos(): number {
    return this.itens.filter((item) => item.feito === false).length;
  }
}
