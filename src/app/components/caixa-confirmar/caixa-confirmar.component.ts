import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-caixa-confirmar',
  templateUrl: './caixa-confirmar.component.html',
  styleUrls: ['./caixa-confirmar.component.css'],
})
export class CaixaConfirmarComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CaixaConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensagem: string }
  ) {}

  ngOnInit(): void {}

  protected confirmar(): void {
    this.dialogRef.close(true);
  }

  protected rejeitar(): void {
    this.dialogRef.close(false);
  }
}
