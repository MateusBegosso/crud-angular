import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'node:console';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (data) => console.log(data),
      (error) => this.onError()
    );
  }

  onCancel() {}

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', { duration: 5000 });
  }
}