### Customizing Django Admin
Django is a Web framework for perfectionists with deadlines. That is why it comes with its admin site. Django gives programmers the power of customizing this admin site into suiting the requirements of the project or even the likeness of the client.

### Prerequisites
You should at least have the following before we begin:
 - Python3 installed on your machine
 - Django installed on a  your machine
 - Some basic knowledge in Python
 - Visual Studio Code or any other code editor that you will be comfortable with

### Step 1 – Creating our  Django app
Open your command line and type in the following command to create the project.
```bash 
$ django-admin startproject Custom
```
Now let's change our directory to `/Custom`.
```bash
$ cd Custom
```
In Custom, let's go ahead and create our app called Bookstore.
```bash
$ django-admin startapp Bookstore
```
Then add it to amongst the installed apps in *settings.py*
```py
INSTALLED_APPS  = [
# ...
'Bookstore' # new
]
```
Next, we use the following command to create a virtual environment just in the project-level folder,
```bash 
$ py -m venv .venv
```
whereby we will also activate it as follows.
```bash
$ .venv\Scripts\activate.bat
```
Now we can install Django in the virtual environment.
```bash
$ pip install django$ pip install django
```
###  Creating Models
Add the following code to your *models.py* to create some models.

```py
from django.db.models.deletion import CASCADE

class  Category(models.Model):
  cat_romance  =  "Romance"
  cat_fantacy  =  "Fantacy"
  cat_thriller=  "Thriller"
  cat_horror  =  "Horror"
  cat_crime  =  "Crime"
  cat_true_story=  "True Story"
  category  =  models.CharField(
      max_length=100,
      choices=(
      (cat_crime, cat_crime),
      (cat_fantacy, cat_fantacy),
      (cat_horror, cat_horror),
      (cat_romance, cat_romance),
      (cat_thriller, cat_thriller),
      (cat_true_story, cat_true_story)
        )
        )

  def  __str__(self):
      return  self.category

class  Publisher(models.Model):
  publisher_name  =  models.CharField(max_length=100)
  publish_date  =  models.DateField

  def  __str__(self):
      return  self.publisher_name

class  Author(models.Model):
  gender_male  =  "Male"
  gender_female  =  "Female"
  gender_other  =  "Other"
  name  =  models.CharField(max_length=100)
  gender  =  models.CharField(max_length=100,
      choices=(
      (gender_female, gender_female),
      (gender_male, gender_male),
      (gender_other, gender_other)
      )
      )
  country  =  models.CharField(max_length=100)

  def  __str__(self):
      return  self.name

class  Details(models.Model):
  book_name  =  models.CharField(max_length=100)
  category = models.ForeignKey(Category, on_delete=CASCADE)
  pages = models.IntegerField(default=1)
  publisher  =  models.ForeignKey(Publisher, on_delete=models.CASCADE)
  Author  =  models.ForeignKey(Author, on_delete=CASCADE)

  def  __str__(self):
      return  self.book_name
```
We can now go ahead and register our models in *admin.py*
by adding the following lines of code,
```py
from django.contrib import admin
from django.db import models
from .models import Category, Publisher ,Details, Author

class  categoryAdmin(admin.ModelAdmin):
  pass

class  publisherAdmin(admin.ModelAdmin):
  pass

class  detailsAdmin(admin.ModelAdmin):
  pass

class  authorAdmin(admin.ModelAdmin):
  pass

admin.site.register(Category, categoryAdmin)
admin.site.register(Publisher, publisherAdmin)
admin.site.register(Details, detailsAdmin)
admin.site.register(Author, authorAdmin)  
```
Then make migrations and migrate using the below commands.
```bash
$ py manage.py makemigrations
```
```bash
$ py manage.py migrate
```
Now let us create the superuser in order to start customizing our admin site.
```bash
$ py manage.py createsuperuser
```
Now run the localhost,
```bash
$ py manage.py runserver
```
then log in using [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
and use the credentials you submitted while creating the superuser above to log in. You should see something similar to this.
###  1 -  Setting plural text for models
In your *models.py* just we can change how the models *category* and *details* are appearing in plural at the admin site by adding the below code.
```py 
class  Category(models.Model):
# ...
  class  Meta:  #new
      verbose_name_plural  =  "Categories"     

class  Details(models.Model):
# ...
  class  Meta:   #new
      verbose_name_plural  =  "Details"
```
###  2- Changing *Django administration * text
To change the admin site text that appears at the top, the login page and the HTML title tag so that we can put the name of our bookstore instead, add the following code in *urls.py* 
```py
#...
admin.site.site_header  =  "Custom bookstore admin"  
admin.site.site_title  =  "Custom bookstore admin site"
admin.site.index_title  =  "Custom Bookstore Admin"
```
 *site_header* changes the *Django administration* text which appears on the login page, *site_title* is for the one that appears on the admin page after we have logged in, and *index_title* changes our website's title that appears on the top of the browser.
###  3 - Removing default apps
Let's say we want to get rid of the *Groups* app that is by default found in our Django admin site, we will go ahead and simply unregister it in *admin.py* after importing it.
```py
from  django.contrib.auth.models  import  Group  # new
#...
admin.site.unregister(Group)  # new
```
If you like, you could also go ahead and unregister *users* through the same process.
###  4 - Using 'list_display'
 You might also want your *details* model to display more than one column on the change list page. To add other fields we will have to make some adjustments in *admin.py*.
```py
class  detailsAdmin(admin.ModelAdmin):
  list_display=('book_name','category','Author','pages','publisher')
#pass
```
### 5 - Adding an image in Django admin'
we might also want to consider adding the image of the Author besides their name using list display. To do that we will first have to import a third-party app called *pillow* using pip in the *cmd*.
```bash
$ pip install pillow
```
Then we get into *settings.py* and add the following lines that tell Django where we want the images stored
```py
import os          # at the top
```
then
```py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR , 'media')
```
Now let's create the media folder and add an images folder inside it.
```bash
$ mkdir media\images 
```
The next thing is going to our  *urls.py*  and adding the below lines of code which adds our *media* folder to the static files.
```py 
# below the other imports
from .import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
```
then at the bottom:
```py
urlpatterns +=staticfiles_urlpatterns()
urlpatterns +=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
In *models.py*  we are going to import *mark_safe* and add the *image field* to our model *Author* then add a function that will enable us to view the image in our admin site.
```py
# at the top
from django.utils.safestring import mark_safe
# in our Author model
class  Author(models.Model):

author_pic = models.ImageField(upload_to='images/', null=True)

def  image_tag(self):
    return mark_safe('<img src="/../../media/%s" width="150" height="150" />' % (self.author_pic))

image_tag.allow_tags = True 
```
Now let us makemigrations then migrate to reflect the changes in our database.
```bash
$ py manage.py makemigrations
$ py manage.py migrate
```
What is remaining now is just calling our function inside the list display, so lets go to our *admin.py* and modify *authorAdmin* 
```py
class  authorAdmin(admin.ModelAdmin):
    list_display=['name','image_tag']
```
Now you can go ahead and run the localhost and enjoy the view.
###  Conclusion
With the information above, you are now capable of customizing your Django admin.
Happy coding!  








