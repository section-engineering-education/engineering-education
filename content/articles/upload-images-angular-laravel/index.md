---
layout: engineering-education
status: publish
published: true
url: /upload-images-angular-laravel/
title: Handling Angular Base64 images in a RESTFul API with Laravel
description: This tutorial discusses how images can be uploaded from an Angular application as base64 and uploaded to the server as an image.
author: naomi-seint
date: 2021-12-30T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/upload-images-angular-laravel/hero.png
    alt: angular laravel image base64
---

Handling images in web applications has become the norm. Almost 99% of the applications we interact with daily have images in one way or another.
<!--more-->
However, dealing with the back-end images has proven to be a very complex task. For this reason, developers have come up with alternatives to handling images.

This tutorial goes through how images can be uploaded from an Angular application as base64 and uploaded to the server as an image.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up Angular application](#setting-up-angular-application)
- [Setting up server for image upload](#setting-up-server-for-image-upload)
- [Testing](#testing)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, you need to have:
- PHP 7.3+ locally installed.
- Laravel 8  installed.
- Angular 12 installed.
- Basic knowledge of SQL and MySQL locally installed.
- An IDE of your interest. We'll use both the PhpStorm for PHP and Webstorm for Angular in this article.

> By the end of this tutorial, the reader should know how to handle base64 images in both Angular and Laravel.

### Setting up Angular application
There are different ways of setting up Angular applications. However, this article installs our application using the Angular CLI.

Type in the following to check your currently installed version:
```bash
# command to check the current ng version
ng --version
...
# My installed version CLI (this may differ from your version)
Angular CLI: 12.2.3
# My current Node version 
Node: 16.5.0 
# My current npm version
Package Manager: npm 7.19.1
# On ubuntu 20.04
OS: linux x64
... 
```

> Note that the above output may vary and not necessarily match your versions

Next, proceed and install the Angular application by running the following commands:
```bash
ng new base64 # this installs a new angular application
```

Depending on your internet connection, the above command may take some time to execute.

Upon installation, navigate into the project root and create an image component as follows:
```bash
cd base64
ng g c image
```

The above command generates four files, including the template and TypeScript files.

Now that we have the image component, edit the `app.component.html` file as shown below:

```html
<app-image></app-image>
```

The above tags ensure that the image component gets displayed when the `AppComponent` is executed.

Let's change our `ImageComponent` template as shown below:
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

You notice we've added an `onchange` event handler in the above template. This ensures that an image will only be uploaded every time a new image is added.

Next, edit the `ImageComponent` script file as shown below:
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
          // if response is successful
          this.toastrService.success(res.message);
          this.submitting=false;
        }
        else{
          // if the response fails, show error alert
          this.toastrService.error(res.message,'Failed');
          this.submitting=false;
        }
      },error => {
        //if an error occurs during the api request
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
    // check for image to upload
    // this checks if the user has uploaded any file
    if (fileToUpload.target.files && fileToUpload.target.files[0]) {
      // calculate your image sizes allowed for upload
      const max_size = 20971510;
      // the only MIME types allowed
      const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
      // max image height allowed
      const max_height = 14200;
      //max image width allowed
      const max_width = 15600;

      // check the file uploaded by the user
      if (fileToUpload.target.files[0].size > max_size) {
        //show error
        this.error = 'max image size allowed is ' + max_size / 1000 + 'Mb';
        //show an error alert using the Toastr service.
        this.toastrService.error(this.imageError,'Error');
        return false;
      }
      // check for allowable types
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        // define the error message due to wrong MIME type
        let error = 'The allowed images are: ( JPEG | JPG | PNG )';
        // show an error alert for MIME
        this.toastrService.error(error,'Error');
        //return false since the MIME type is wrong
        return false;
      }
      // define a file reader constant
      const reader = new FileReader();
      // read the file on load
      reader.onload = (e: any) => {
        // create an instance of the Image()
        const image = new Image();
        // get the image source
        image.src = e.target.result;
        // @ts-ignore
        image.onload = rs => {
          // get the image height read
          const img_height = rs.currentTarget['height'];
          // get the image width read
          const img_width = rs.currentTarget['width'];
          // check if the dimensions meet the required height and width
          if (img_height > max_height && img_width > max_width) {
            // throw error due to unmatched dimensions
            error =
              'Maximum dimensions allowed: ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            // otherise get the base64 image
            this.uploadedImageBase64 = e.target.result;
           
          }
        };
      };
      // reader as data url
      reader.readAsDataURL(fileToUpload.target.files[0]);
    }
  }
}

```

We have the `onSubmit()` method in the above script. This method is used to submit the uploaded base64 image.

The `handleImageUpload()` method is our image handler. It first checks the image size being uploaded. If the image size meets our predefined size, we upload it.

Next, we check if the image only contains the required MIME, i.e., JPG, PNG, and JPEG. When our checks are complete, we process our images using the `FileReader` method.

### Setting up the server for image upload
Now that we have the Angular application up and running let's set up our Laravel 8 server to handle the image.

First, set up the database configurations by editing the `.env` file as shown below:
```properties
...
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=image
DB_USERNAME=yourDBusername
DB_PASSWORD=yourDBpassword
```

Next, create the `Image` model by running the following commands:
```bash
php artisan make:model Image --m
```

The above command generates a model in the `App/Models` folder and a migration file.

Now, edit both the model and the migration file as shown below:
```php
<?php
//edit model as shown below
namespace App\Models;
class Image extends Model
{
    ....
    protected $fillable=[
        'image_path',
    ];
  ...
}

```

The above script creates a model with `image_path`, which we'll later use to store our uploaded file's path.

```php
<?php

...
class CreateImageTable extends Migration
{
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('images');
    }
}

```

The above script creates our database table to store our uploaded files details.

Next, execute the following commands to migrate our database:
```bash
php artisan migrate
```

With the database and model setup complete, let's create a controller to handle the image from the Angular application.  

To handle this, first create an image repository in the `App/Repos` namespace and update it as follows:
```php
<?php
namespace App\Repos;
...
use Intervention\Image\Facades\Image;
...
class ImageRepository
{
  // define a method to upload our image
    public function upload_image($base64_image,$image_path){
        //The base64 encoded image data
        $image_64 = $base64_image;
        // exploed the image to get the extension
        $extension = explode(';base64',$image_64);
        //from the first element
        $extension = explode('/',$extension[0]);
        // from the 2nd element
        $extension = $extension[1];

        $replace = substr($image_64, 0, strpos($image_64, ',')+1);

        // finding the substring from 
        // replace here for example in our case: data:image/png;base64,
        $image = str_replace($replace, '', $image_64);
        // replace
        $image = str_replace(' ', '+', $image);
        // set the image name using the time and a random string plus
        // an extension
        $imageName = time().'_'.Str::random(20).'.'.$extension;
        // save the image in the image path we passed from the 
        // function parameter.
        Storage::disk('public')->put($image_path.'/' .$imageName, base64_decode($image));
        // return the image path and feed to the function that requests it
        return $image_path.'/'.$imageName;
    }
}

```

In the above script, we've defined the `ImageRepository` class. The class has the `upload_image()` method that takes two parameters, i.e, the base64 image submitted from the frontend and the image_path.

The image path passed in the above method would be where we store the image.

The function also has a couple of variables:
- `$image_64` holds the image in base64 format.
- `$extension` refers to the extension of the image i.e png.
- `$imageName`. We use the PHP inbuilt method `time()` and a random string concatenated together to come up with image name. This ensures uniqueness in image names.
- The return statement returns the image path.

Next, let's create our controller. Run the following commands to create a controller in the `App/Http/Controllers` directory:
```bash
php artisan make:controller ImageUploaderController
```

Open this new file `App/Http/Controllers/ImageUploaderController.php` and update it as follows:
```php
<?php
    /**
     * @group Image
     * Create new images uploaded
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUploadedImages(Request $request) {
      // validate the incoming API requests to ensure
      // that they contain the images to upload
        $validator=Validator::make($request->all(),[
            'image'       =>'required',
        ]);

      // if the request does not contain the image
      // handle the error message as shown below
        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->errors()->first(),
            ],400);
        }
        // otherwise the image has been received and it's time handle them
       $attachment_url= (new ImageRepository)
       ->upload_image($request->input('banner_image'),'test-images');
       //use Image model to create image
        $image=Image::create([
            'image' =>$attachment_url
        ]);
        // return the success response
        return response()->json([
            'success'=>true,
            'message'=>"You have successfully created a test image",
        ],201);
    }
```

In the above controller, we define the `createUploadedImages` method to handle the requests. Then, we proceed to validate this request and handle the image.

We have called the image repository class to handle our image. We then create an image in the database table using the image class instance.

Finally, the return statement sends a success message to the uploading application, in this case, the Angular frontend.


### Testing
To test our application, we need to define our routes and ensure that all the images submitted to the server are base64.

Therefore, edit the `routes/api.php` file as shown below:
```php
...
 Route::post('image-uploader',[ImageUploaderController::class,'createUploadedImages']);
...

```

Next, serve the application by running the following commands:
```bash
php artisan serve
```

Now that you have the API server running in your Angular application, edit the api service you had initially created as follows:
```javascript
....
/**
   * Upload new images
   */
  uploadImage(image:Image):Observable<Image>{
    return this.httpClient.post<Image>(`${environment.API_BASE_URL}/image-uploader`,image);
  }
  ...
```

The above api service ensures that we only submit the image to the route we have defined in the API server route.

And with that, you can now handle images easily using Angular and Laravel.

### Conclusion
In this article, we have discussed image upload in depth. We have also seen how we can convert images to base64 using events.

We have also seen how we can handle this base64 image using an image repository and save the image path to the database on the server.

Happy coding!


---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
