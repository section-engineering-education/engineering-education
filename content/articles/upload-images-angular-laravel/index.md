Handling Angular base64 images in a RESTFul API with Laravel
### Introduction
Handling images in web applications have become a norm. Almost 99% of applications we interact with on a daily basis have images in one way or another.

However, dealing with images in the backend have proven to be a very a complex task. It's for this reason that developers have come up with alternatives to handling images.

In this tutorial, we discuss how images can be uploaded from an Angular application as base64 and uploaded to the server as image.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up Angular application](#setting-up-angular-application)
- [Converting image to base64](#converting-image-to-base64)
- [Setting up server for image upload](#setting-up-server-for-image-upload)
- [Testing](#testing)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, you need have:
- PHP 7.3+ locally installed.
- Laravel 8 installed via composer/ Laravel installer.
- Angular 12 installed.
- Basic knowledge of SQL and MySQL locally installed.
- An IDE of your interest. In this article, we'll use both the PhpStorm for PHP and Webstorm for Angular.

### Objectives
By the end of this tutorial, the learner is expected to have enough knowledge to handle base64 images in both Angular and Laravel.

### Setting up Angular application
There are different ways of setting up Angular applications, however, in this article we install our application using the Angular CLI.

Type in the following to check your currently installed version:
```bash
ng --version
...
Angular CLI: 12.2.3
Node: 16.5.0 
Package Manager: npm 7.19.1
OS: linux x64

Angular: undefined
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1202.3 (cli-only)
@angular-devkit/core         12.2.3 (cli-only)
@angular-devkit/schematics   12.2.3 (cli-only)
@schematics/angular          12.2.3 (cli-only)
```

> Note that the above output maybe vary and not necessarily match your versions

Next, proceed and install Angular application by running the following commands:
```bash
ng new base64 # this installs new angular applciation
```

The above command may take some time to execute depending on your internet connection.

Upon installation, `cd` into the project root and create an image component as follows:
```bash
cd base64
ng g c image
```

The above command generates 4 files, including the template and TypeScript files.

Now that we've the image component, next, proceed and edit the `app.component.html` file as shown below:

```html
<app-image></app-image>
```

The above tags ensures that image component gets displayed when the `AppComponent` is executed.

Let's now proceed and edit our `ImageComponent` template as shown below:
```html
<div class="content mat-elevation-z8">
  <h2 class="text-center text-dark">Upload Image</h2>
  <form [formGroup]="uploadForm" (ngSubmit)="onSubmit()">
      <div class="form-row m-3">
        <div class="col-md-6">
          <label for="news_banner">Image</label>
          <input type="file" id="file" (change)="handleImageUpload($event)" class="form-control-file"required="">
        </div>
      </div>
  </form>
</div>
```

In the above template, you notice we've added an an `onchange` even handler. This ensures that an image will only be uploaded every time a new image is added.

Next, proceed and edit the `ImageComponent` script file as shown below:
```ts
...
import {ApiService} from "../../../core/services/api.service";
import {ToastrService} from "ngx-toastr";
import * as _ from 'lodash';
...
export class ImageComponent implements OnInit {

  //image
  uploadImageBase64: string;
  ...
  /**
   * on image submit
   */
  onSubmit(){
    let upload:uploads={
      banner_image: this.uploadImageBase64,
    }
    this.apiService.uploadImage(news)
      .subscribe((res)=>{
        if(res){
          this.toastrService.success(res.message);
          this.submitting=false;
        }
        else{
          this.toastrService.error(res.message,'Failed');
          this.submitting=false;
        }
      },error => {
        this.toastrService.error(error.error.message,'Error');
        this.submitting=false;
      })
  }

  /**
   * handle image upload
   * @param fileToUpload
   */
  // @ts-ignore
  handleImageUpload(fileToUpload) {
    this.imageError = null;
    if (fileToUpload.target.files && fileToUpload.target.files[0]) {
      // calculate your image sizes allowed for upload
      const max_size = 20971510;
      const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
      const max_height = 14200;
      const max_width = 15600;

      // check the file uploaded by the user
      if (fileToUpload.target.files[0].size > max_size) {
        //show error
        this.error = 'max image size allowed is ' + max_size / 1000 + 'Mb';
        this.toastrService.error(this.imageError,'Error');
        return false;
      }
      // check for allowable types
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'The allowed images are: ( JPEG | JPG | PNG )';
        this.toastrService.error(this.imageError,'Error');
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        // @ts-ignore
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimensions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            this.uploadedImageBase64 = e.target.result;
           
          }
        };
      };
      reader.readAsDataURL(fileToUpload.target.files[0]);
    }
  }
}

```

In the above script, we have the `onSubmit()` method. This method is used to submit the uploaded base64 image.

The `handleImageUpload()` method is our image handler. it first checks the image size being uploaded. If the image size meets our predefined size, we proceed with our upload.

Next, we check if the image only contains the required MIME, i.e JPG, PNG and JPEG. When our checks are complete, we proceed to process our images using the `FileReader` inbuilt method.

### Setting up server for image upload
Now that we've the 
