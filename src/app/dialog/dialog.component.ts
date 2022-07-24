import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  //genderOptions: string[] = ["Brand New", "Second Hand", "Refurbished"];
  genderOptions: string[] = ['M', 'F'];
  pollsterForm!: FormGroup;
  actionBtn: string = 'Guardar';
  hide = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  get passwordInput() {
    return this.pollsterForm.get('Password');
  }

  ngOnInit(): void {
    this.pollsterForm = this._formBuilder.group({
      CI: ['', [Validators.required]],
      Names: ['', [Validators.required]],
      Lastnames: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.required]],
      Password: ['', [Validators.required, Validators.min(3)]],
      Phone: ['', [Validators.required]],
      Gender: [''],
      Address: [''],
    });

    // Set the values
    if (this.editData) {
      this.actionBtn = 'Update';

      this.pollsterForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.pollsterForm.controls['category'].setValue(this.editData.category);
      this.pollsterForm.controls['freshness'].setValue(this.editData.freshness);
      this.pollsterForm.controls['price'].setValue(this.editData.price);
      this.pollsterForm.controls['comment'].setValue(this.editData.comment);
      this.pollsterForm.controls['date'].setValue(this.editData.date);
    }
  }

  addPollster() {
    if (!this.editData) {
      if (this.pollsterForm.valid) {
        this._apiService.addPollster(this.pollsterForm.value).subscribe({
          next: (res) => {
            alert('Encuestador registrado!');
            this.pollsterForm.reset();
            this._dialogRef.close('save');
          },
          error: (e) => {
            console.log(e);
            alert('Error ocurrido al registrar a encuestador!.');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this._apiService
      .putProduct(this.pollsterForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Product Updated Successfully!');
          this.pollsterForm.reset();
          this._dialogRef.close('update');
        },
        error: (res) => {
          alert('Error while updating!');
        },
      });
  }
}
