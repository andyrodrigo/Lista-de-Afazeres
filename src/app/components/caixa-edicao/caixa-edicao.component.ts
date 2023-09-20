import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-caixa-edicao',
  templateUrl: './caixa-edicao.component.html',
  styleUrls: ['./caixa-edicao.component.css'],
})
export class CaixaEdicaoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CaixaEdicaoComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: string
  ) {}

  ngOnInit(): void {}

  protected enviar(): void {
    this.dialogRef.close(this.data);
  }

  protected cancelar(): void {
    this.dialogRef.close(undefined);
  }
}
