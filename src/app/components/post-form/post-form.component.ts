import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiClientService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(20)]],
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
        userId: 1 // Default user ID for demo
      };

      this.apiService.POST(postData).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Post created successfully:', response);
          
          // Navigate back to the list
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to create post. Please try again.';
          console.error('Error creating post:', error);
        }
      });
    } else {
      this.postForm.markAllAsTouched();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

