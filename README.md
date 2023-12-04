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

### Containerize App
1. Right-click on the project, Add -> Docker Support -> Linus OS
2. Add <DockerfileTag> element to csproj such as `<docker user name>/<project name>-api`. Use dashes for spaces.
3. Right-click on the project, Publish -> Docker Container Registry -> Docker Hub -> username, leave password empty.

### Deploy App
1. Add k8s\api-deployment.yaml. Add environment variables for the pod
1. 1. ASPNETCORE_ENVIRONMENT=Development (or any other environment)
1. 2. ASPNETCORE_URLS=https://+:443;http://+:80, remove the https if you don't plan to provide a certificate
1. 3. ConnectionStrings__BloggingContext=server=xxx.freemysqlhosting.net;database=<db>;Uid=<user>;Pwd=<pwd>;
2. Add k8s\api-service.yaml. The type doesn't matter. Port can be anything, TargetPort should be 80 (match dockerfile)
3. Expose with `minikube service` (`tunnel` should suffice if chose NodePort\LoadBalancer)

### Setup DB
1. To create db: `Create database <db name>`; then `use <db name>`;
2. To create tables: `CREATE TABLE Blogs (ID INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), url VARCHAR(255), rating INT);` then `CREATE TABLE Posts (ID INT AUTO_INCREMENT PRIMARY KEY, Title VARCHAR(255), Content VARCHAR(255), BlogId INT)`
3. You can try a k8s version as seen on link _https://kubernetes.io/docs/tasks/run-application/run-single-instance-stateful-application/_

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

### Containerize App
There are two ways to expose the client, with as a loadbalancer service with nginx config,
or with Ingress. The following steps describe nginx config:
1. add nginx.conf which will redirect requests starting with /api to your backend
2. change your baseUrl value (usually at environments.ts) to begin with /api
3. your dockerfile should copy the nginx conf and the transpiled files to `/usr/share/nginx/html`
4. build and push to `<docker user name>/<project name>-client`

Note: the attached ingress.yaml is not in use!

### Deploy your App
1. Add k8s\client-deployment.yaml. Add environment variables for the pod
2. Add k8s\client-service.yaml. The type doesn't matter. Port can be anything, TargetPort should be 80 (match dockerfile)
3. Expose with `minikube service` (`tunnel` should suffice if chose NodePort\LoadBalancer)
