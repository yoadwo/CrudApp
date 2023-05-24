import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { Blog } from '../../model/blog';
import { Post } from '../../model/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      // posts: this.formBuilder.array([]) // Initialize the posts FormArray
    });
  }

  ngOnInit(): void {
  }

  get posts(): FormArray {
    return this.blogForm.get('posts') as FormArray;
  }

  addPost() {
    const postFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.posts.push(postFormGroup);
  }

  removePost(index: number) {
    this.posts.removeAt(index);
  }

  onSubmit() {
    if (this.blogForm.invalid) {
      return;
    }

    const blog: Blog = {
      // id: 1, // Assign a unique ID as per your application's requirements
      id: undefined,
      title: this.blogForm.value.title,
      url: this.blogForm.value.url
      //posts: this.blogForm.value.posts
    };
    // Perform actions with the submitted blog object
    console.log(blog);
    this.http.post<Blog>(environment.blogsBaseUrl, blog).subscribe(data => {
        console.log("response", data);
    })
  }

}
