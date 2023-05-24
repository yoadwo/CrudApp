# Crud App Step-by Step

## Server
1. Generate WebApi
2. Create "Models" directory
3. Create Blog.cs with files from _https://learn.microsoft.com/en-us/ef/core/_. 
Specify `[JsonIgnore]` over any associated entity (for example, Blog property in Post class)
4. Create "DAL" directory and copy code from _https://learn.microsoft.com/en-us/ef/core/_
5. Create a free MySQL account from _www.freemysqlhosting.net_
6. Add NuGet "MySql.EntityFrameworkCore"
7. Register DbContect: builder.Services.AddDbContext<BloggingContext>(options =>
            options.UseMySQL(connStr));

8. Right-click on Controllers, Add..., New Scaffolded Item. Select API on the left and then "Api Controller
with read-write and Entity Framework". This won't work without having a DbContext class.
In the dialog, select Blog.cs
9. Setup the Db.
10. Test Run.
11. GetAll and GetById should work, without associations. Use "Include(blog => blog.Posts)" for that.
12. Post and Put may cause problems. Just make "Blog" nullable under the Post class. Also make sure you iterate associated entities and mark them "modified" as well.
If anybody asks:, explain about explicit (iterate and change stage) to implicit (attach, worse performance)
13. enable cors:  policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();


## client
1. npm install -g @angular/cli or use npx
2. (npx) ng new my-blog-app
2. 1. if you're not planning to use external UI library, move the style section from app.component.html to global styles.css
3. Install with routing
4. Create "model" directory
5. Create blog.ts and post.ts
6. Create "components" directory, and "blog-form" sub-directory
7. Under "blog-form", create a component with same name
7. 1. In the .ts file, inject service called "formBuilder", and implement "onSubmit" to print its value
7. 2. In the .html implement your form, using `form [formGroup]="blogForm" (ngSubmit)="onSubmit()`
7. 3. If using `formGroup`, make sure you import `ReactiveFormsModule` into the app.module
11. Connect to the API using `HttpClientModule`
11. 1. In app.module and desired components, add import { HttpClientModule } from '@angular/common/http';
11. 2. in desired component use: this.http.post<Blog>('https://localhost:7134/API/Blogs', blog).subscribe
12. Create "blog-list" under "components".
12. 1. Use the simplest table. Under `<tbody>` use `<tr *ngFor="let blog of blogs$ | async">`
12. 2. In the .ts file, use: `this.http.get<Blog[]>(environment.blogsBaseUrl)`
13. Make it nice by having separate routes. 
13. 1. Edit the navbar to include `button routerLink=""`
13. 2. Edit the app-routing module to include both form and list components
13. 3. Would be nice to also include a Home componente


