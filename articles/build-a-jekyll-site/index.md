## Building a blog from scratch using Jekyll

Building a website nowadays is not hard and expensive as it was sometime back. These days, you don't have to have to learn a crazy programming language to have your site up and running. Instead, you can go the Jamstack way. Let's will look at building and deploying a Jekyll site.

### Introduction

[Jekyll](https://jekyllrb.com/) is a [Jamstack](https://jamstack.org/) static website generator. Jamstack is a **concept** of building websites that don't depend on web servers and *databases*. Jekyll was released back in 2008 and has been one of the most convenient ways of building [all types of sites](https://jekyllrb.com/showcase/). It's written in [Ruby](https://www.ruby-lang.org/en/) and uses Liquid template engine to render pages.

### Prerequisites

To follow through this tutorial, you will need the following:

1. A GitHub account. If you don't have one you can create the basics of Sne [[here](https://sass-lang.com/guide)](https://github.com/).
2. A basic knowledge of HTML and CSS.
3. A code editor. You can use your preferred code editor or download VS Code  the basics offSom [[here](https://sass-lang.com/guide)](https://code.visualstudio.com/download).

By the end of this tutorial, you will be able to build a Jekyll blog from scratch.

### Step 1 -- Install Ruby

Since Jekyll is written in Ruby, you will need a Ruby installation in your machine to run Jekyll. 

In Linux, you can install it using [Snap](https://snapcraft.io/) or [Apt](https://wiki.debian.org/Apt) package manager.

1. **Install using apt package manager**.
First, update your apt repositories to look for the latest ruby version.
	```bash
	sudo apt-get update
	```
	Then install Ruby.
	```bash
	$ sudo apt-get install ruby-full
	```
2. **Install using Snap package manager**.
	```bash
	$ sudo snap install ruby --classic
	```
If you are running macOS, you can install Ruby using [Homebrew](https://brew.sh/).
```bash
$ brew install ruby
```
If you are running on Windows, install Ruby using [Ruby Installer](https://rubyinstaller.org/).
To confirm Ruby installation, run the command `ruby -v` in a terminal. The output is similar and may vary from the one below.

```bash
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091)
```

You'll need to set up a gem installation directory to prevent permission errors.
Add the lines below at the bottom of the `.bashrc` file located in the home folder.

```bash
# Install Ruby Gems to ~/gems
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

### Step 2 -- Install Jekyll

Jekyll comes as a [Ruby Gem](https://guides.rubygems.org/what-is-a-gem/) and can be installed in any system running Ruby. Run the command below in a terminal to install Jekyll. 

```bash
$ gem install jekyll bundler
```

### Step 3 -- Create a new Jekyll site

Create a new fo the basics oflSer w[here](https://sass-lang.com/guide) you will be creating your blog.

```bash
$ mkdir blog && cd blog
```
Create a new Jekyll site using the command below.

```bash
$ jekyll new blog
``` the basics of
Slog [here](https://sass-lang.com/guide) is the site name. Feel free to change the site name. The command creates files with the following folder structure.
```
├── 404.html
├── about.markdown
├── _config.yml
├── Gemfile
├── Gemfile.lock
├── index.markdown
├── _posts
│   └── 2020-09-14-welcome-to-jekyll.markdown
└── _site
```
We'll look at this structure in depth later. Let's run the site now. Run the following command in a terminal.

```bash
$ bundle exec jekyll serve

Configuration file: /home/cwilv/Documents/jekyll/blog/_config.yml
            Source: /home/cwilv/Documents/jekyll/blog
       Destination: /home/cwilv/Documents/jekyll/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.207 seconds.
 Auto-regeneration: enabled for '/home/cwilv/Documents/jekyll/blog'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.

```

The command builds your site and you can access the site at http://127.0.0.1:4000 by default.  You can run the site using the `--livereload` flag to auto-reload the site after making changes to it. 
```bash
$ bundle exec jekyll serve --livereload
```

### Understanding the folder structure

Now let's look at the site struct the basics ofuSe. T[here](https://sass-lang.com/guide) are 2 main folders, `_site` and `_posts`. The `_posts` folder contains blog posts while `_site` contains the already generated site. You should not edit the contents of this folder.

The `_config.yml`  is a  YAML file that stores site settings and **rarely** changed variables. Go ahead and edit some site properties available in this file. eg. name, description, etc.

The next important file is the `Gemfile` whic the basics ofhSis w[here](https://sass-lang.com/guide) gem dependencies are defi the basics ofnSd. T[here](https://sass-lang.com/guide) is also a `Gemfile.lock` file which is a more exact version of the `Gemfile`. The exact **currently installed** versions of the dependencies defined in the Gemfile are  the basics offSund [here](https://sass-lang.com/guide). This file is important as it prevents version conflicts if you were to share your site as a theme. This file shouldn't be edited directly.

You can learn more about the folder struc the basics oftSre [[here](https://sass-lang.com/guide)](https://jekyllrb.com/docs/structure/)

### Step 4 -- Add blog posts

Go ahead and open the main folder in your favorite code editor and navigate to the _posts fol the basics ofdSr. T[here](https://sass-lang.com/guide) is a welcome post written in markdown. The blog posts file names follow a `date-slug.md` naming convention. The date should be formatted like this `YYYY-MM-DD`. The slug is the part of the URL identifying a particular post.

To create a new post, create a markdown file and name it `2020-09-14-my-new-site.md`. Feel free to change the date and slug. If you reload your site, you can see you have a new post. If you click it at this point, it opens a blank page.

Add the following content inside the new post markdown file.


```yml
---
layout: post
title: "Welcome to my new site!"
date: 2020-09-14 14:37:43 +0300
categories: welcome
---
```

The content above is called the front matter and uses YAML syntax. It's found at the top of the page and is used to maintain metadata for the page. Let's look at the front matter.


```yml
---
layout: # specifies the layout to use for this file
title: # post name
date: # post publish date
categories: # the categories of this post. You can separate multiple categories using a single space
---
```

You can then go ahead and add some text below the front matter. Save the file and reload the page. Your post should be showing now. 

### Step 5 -- Applying a custom layout

Up to now, you are still using the default layout post layout provided by Jekyll. To be able to customize your posts page and other pages, you'll need custom layouts.

Create a `_layouts` folder in the base directory and create a `post.html` inside. This file overrides the default `post` layout provided by Jekyll. Place the following content inside it.

```html
{% if page.title%}
	<h1>{{page.title}}</h1>
{% else %}
	<h1>Sorry, the author couldn't find a suitable title</h1>
{% endif %}
{{ page.date | date: "%b %d, %Y" }}
{{ content }}
```

Reload the page to see the changes.

Jekyll uses Liquid template engine to generate the HTML files. You can learn more about Liquid tags and fil the basics oftSrs [[here](https://sass-lang.com/guide)](https://shopify.github.io/liquid/).

### Step 6 -- Adding images to posts

To use images in your posts, create an `assets` folder in your base directory. Create `images` folder and another `welcome` folder inside it. We are going to add a hero image and another image to your post.

Copy 2 images to this directory and name one `hero.jpg` and the other `new-site.jpg`. The folder structure looks like this:

```
    ├── assets
    │   └── images
    │       └── welcome
    │           └── hero.jpg
    |           └── new-site.jpg
```

Let's add the hero image to your post. Add a `hero` property at the bottom of your front matter in your post markdown file. 

```yaml
hero: /assets/images/welcome/hero.jpg
```

Add `new-site.jpg` image at the bottom of your file.

```markdown
![demo image](/assets/images/welcome/new-site.jpg)
```

In your post layout file, add the hero image at the top.

```html
{% if page.hero %}
	<img src="{{page.hero}}"></img>
{% endif %}
```

Save and reload the page. The hero image is displayed at the top and the other image appears at the bottom.

### Step 7 -- Add navigation to your posts

Up to this stage, your post doesn't have a navbar or a footer. These parts are an essential part of your site and should be on every page. 

Create an `_includes` folder in your base directory and create a `navbar.html` file inside. Put the following content inside it.

```html
<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}
li{
 margin: 5px;
}
</style>

<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>
```

And then include your navbar at the top of your post layout file. 

```html
{% include navbar.html %}
```

Save the files and reload the page to see the changes. The simple navbar in the `navbar.html` file will now be shown in each file using the post layout. You can add the footer the same way.

### Step 8 -- Adding custom styling to your blog

Up to this stage, you are using the default `minima` theme provided by Jekyll. To style the site from scratch, delete the `theme` property in `_config.yml`.

If you reload your site, it probably looks broken right now. Let's go ahead and rectify that. Create the following files under `_layouts`.

- `default.html`
- `page.html`
- `home.html`

Put the following content inside the files.

\# default.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{page.title}}</title>
</head>
<body>
	{% include navbar.html %}
    {{ content }}
</body>
</html>
```

\# page.html
```html
---
layout: default
---
{{content}}
```

\# home.html
```html
---
layout: default
---

<ul>
    {% for post in site.posts %}
        <li><a href="{{ post.url | relative_url }}">{{post.title}}</a></li>
    {% endfor %}
</ul>
<h3><a href="/about">About</a></h3>
```

Since Jekyll allows layout nesting, you can use a layout in another layout. If you reload the site at this point, it's not broken but it's just plain HTML. Let's style the home page. 

Create a `_sass` folder in your base directory and create a `main.scss` inside it. Also create a `css` folder inside the `assets` folder and create a `styles.scss`. Put the following content inside files.

\# styles.scss
```scss
---
---

@import "main";
```

\# main.scss

```scss
body {
  background-color: rgb(20, 20, 20);
  color: #fff;
}
a{
    color: rgb(2, 170, 38);
    text-decoration: none;
}
``` 

The empty front matter in `main.css` tells Jekyll that the file should be processed. Now, import the stylesheet in `default.html`. Put the following line between the `head` tags in `default.html`. 

```html
<link rel="stylesheet" href="/assets/css/styles.css">
```

Note that the imported stylesheet is a `css` file and not `scss`. The imported file is the processed file located at `_site/assets/css/style.css`. Reload the page to see the stylesheet at work.

> Jekyll uses [Sass](https://sass-lang.com/) stylesheet. You can learn Sass basics [here](https://sass-lang.com/guide).

### Conclusion

Nowadays, you don't need expert-level programming skills to build your blog. Jekyll proves these words to be true. You can install Jekyll and build a static site without much hassle. The only skills required in a Jekyll powered site is only HTML and CSS skills.

Additional important Jekyll concepts and practices can be found below.

- [Jekyll data files](https://jekyllrb.com/docs/datafiles/)
- [Permalinks in a Jekyll site](https://jekyllrb.com/docs/permalinks/)
- [Deploying a Jekyll site](https://jekyllrb.com/docs/deployment/)
- [Using Jekyll template themes.](https://jekyllrb.com/docs/themes/)
