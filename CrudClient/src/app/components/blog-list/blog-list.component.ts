import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../../model/blog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs$: Observable<Blog[]> | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.blogs$ = this.http.get<Blog[]>(environment.blogsBaseUrl); // Replace 'http://localhost/api/blogs' with your API endpoint URL
  }

}
