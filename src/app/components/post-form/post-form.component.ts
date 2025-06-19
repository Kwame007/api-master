import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.interface';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  loading = false;
  error: string | null = null;
  isEditMode = false;
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(20)]],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.postId = +id;
        this.loading = true;
        this.apiService.GET(this.postId).subscribe({
          next: (post) => {
            this.postForm.patchValue({
              title: post.title,
              body: post.body
            });
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Failed to load post.';
            this.loading = false;
          }
        });
      }
    });
  }

  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.loading = true;
      this.error = null;
      const postData = {
        title: this.postForm.value.title,
        body: this.postForm.value.body,
        userId: 1,
        id: this.postId || undefined
      };
      if (this.isEditMode && this.postId) {
        this.apiService.PUT({ ...postData, id: this.postId }).subscribe({
          next: (response) => {
            this.loading = false;
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.loading = false;
            this.error = 'Failed to update post. Please try again.';
          }
        });
      } else {
        this.apiService.POST(postData).subscribe({
          next: (response) => {
            this.loading = false;
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.loading = false;
            this.error = 'Failed to create post. Please try again.';
          }
        });
      }
    } else {
      this.postForm.markAllAsTouched();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

