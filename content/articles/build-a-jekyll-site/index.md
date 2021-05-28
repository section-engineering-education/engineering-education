---
layout: engineering-education
status: publish
published: true
url: /build-a-jekyll-site/
title: Building a Blog site from Scratch using Jekyll
description: This tutorial guides beginners on how to build a blog website from scratch using Jekyll using HTML and CSS.
author: geoffrey-mungai
date: 2020-10-01T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-a-jekyll-site/hero.jpg
    alt: image build a Jekyll site
---
Building a website nowadays is not as hard or expensive as it was in the past. These days, you do not have to learn a crazy programming language to have your site up and running.
<!--more-->
Instead, you can go the Jamstack way. In this article, we go through how to build and deploy a Jekyll site.

### Introduction
[Jekyll](https://jekyllrb.com/) is a [Jamstack](https://jamstack.org/) static website generator. Jamstack is a **concept** of building websites that don't depend on web servers and *databases*.

Jekyll was released back in 2008 and has been one of the most convenient ways of building [all types of sites](https://jekyllrb.com/showcase/). It's written in [Ruby](https://www.ruby-lang.org/en/) and uses the [Liquid](https://shopify.github.io/liquid/) template engine to render web pages.

### Prerequisites
To follow through this tutorial, you will need:
- A code editor. Feel free to use your preferred code editor. You can download VS Code [here](https://code.visualstudio.com/download).
- Some basic skills in HTML and CSS.

By the end of this tutorial, you will be able to build a Jekyll blog from scratch.

### Step 1 -- Install Ruby
Since Jekyll is written in Ruby, you will need a Ruby installation on your machine to run Jekyll. In Linux, you can install it using [Snap](https://snapcraft.io/) or [Apt](https://wiki.debian.org/Apt) package manager.

1. **Install using apt package manager**.

First, update your apt repositories to look for the latest Ruby version.

```bash
$ sudo apt-get update
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

If you are running Windows, install Ruby using Ruby Installer. Install the latest Ruby Installer with Dev kit from [here](https://rubyinstaller.org/downloads/).
To confirm the Ruby installation, run the command `ruby -v` in a terminal. The output should be similar but may vary from the one below.

```bash
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091)
```

For Linux, you'll need to set up a gem installation directory to prevent permission errors. Add the lines below at the bottom of the `.bashrc` file located in the home folder.

```bash
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

You can use the `echo` command to append the above lines at the bottom of the `.bashrc` file.

```bash
$ echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
```

```bash
$ echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
```

Then execute the `.bashrc` file.

```bash
$ source ~/.bashrc
```

### Step 2 -- Install Jekyll
Jekyll comes as a [Ruby Gem](https://guides.rubygems.org/what-is-a-gem/) and can be installed in any system running Ruby. Run the command below in a terminal to install Jekyll.

```bash
$ gem install jekyll bundler
```

### Step 3 -- Create a new Jekyll site
Create a new Jekyll site using the command below.

```bash
$ jekyll new blog
$ cd blog
```

`blog` is the site name. Feel free to change the site name. The command creates files with the following folder structure.

```bash
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
```

The command builds your site and you can access the site at http://127.0.0.1:4000 by default. You can run the site using the `--livereload` flag to auto-reload the site after making changes.

```bash
$ bundle exec jekyll serve --livereload
```

If you encounter: `Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'` error, reinstall the Event Machine.

```bash
$ gem uninstall eventmachine
$ gem install eventmachine --platform ruby
$ bundle exec jekyll serve --livereload
```

### Understanding the Folder Structure
Now, let's look at the site structure. There are 2 main folders, `_site` and `_posts`. The `_posts` folder contains blog posts while `_site` contains the generated site. You should not edit the contents of the `_site` folder. The `_config.yml` is a YAML file that stores site settings and **rarely** changed variables. Go ahead and edit some site properties available in this file. For example, name, description, etc.

The next important file is the `Gemfile`. The site dependencies are defined here. There is also a `Gemfile.lock` file which is a more detailed version of the `Gemfile`. The specific versions of the **currently installed** dependencies defined in the Gemfile are recorded in this file.

This file is important as it prevents version conflicts if you were to share your site as a theme. This file shouldn't be edited directly.

You can learn more about the folder structure [here](https://jekyllrb.com/docs/structure/).

### Step 4 -- Add blog posts
Jekyll blog posts and pages are written in [Markdown](https://www.markdownguide.org/getting-started/). Markdown is a markup language which uses plain-text formatting syntax. For example, headings in markdown are made by a set preceding `#` sign(s). Below is a `h3` HTML equivalent in markdown.

```markdown
### This is a third level heading
```

You can learn common markdown syntax [here](https://www.markdownguide.org/cheat-sheet/).

Open the main folder in your favorite code editor and navigate to the `_posts` folder.

There is a welcome post written in markdown. The blog posts file names follow a `date-slug.md` naming convention. The date should be formatted like this `YYYY-MM-DD`. The slug is the part of the URL identifying a particular post.

To create a new post, create a markdown file and name it `2020-09-14-my-new-site.md`. Feel free to change the date and slug. If you reload your site, you can see you have a new post. If you click it at this point, it opens a blank page.

Add the following content inside the new post markdown file.

```yaml
---
layout: post
title: "Welcome to my new site!"
date: 2020-09-14 14:37:43 +0300
categories: technology
---
```

The content above is called the front matter and uses YAML syntax. It's found at the top of the page and is used to maintain metadata for the page. Let's look at the front matter.

```yaml
---
layout: # specifies the layout to use for this file
title: # post name
date: # post publish date
categories: # the categories of this post. You can separate multiple categories using a single space
---
```

You can then go ahead and add some text below the front matter. Save the file and reload the page. Your post should be showing now.

### Step 5 -- Applying a custom layout
Up to now, you are still using the default post layout provided by Jekyll. To be able to customize your posts page and other pages, you'll need custom layouts.

Create a `_layouts` folder in the base directory and create a `post.html` file inside. This file overrides the default `post` layout provided by Jekyll. Place the following content inside it.

```jinja
{% if page.title%}
	<h1>{{page.title}}</h1>
{% else %}
	<h1>Untitled post</h1>
{% endif %}
{{ page.date | date: "%b %d, %Y" }}
{{ content }}
```

Reload the page to see the changes.

Jekyll uses Liquid template engine to generate the HTML files. You can learn more about Liquid tags and filters [here](https://shopify.github.io/liquid/).

### Step 6 -- Adding images to posts
To use images in your posts, create an `assets` folder in your base directory. Create an `images` folder inside `assets` and another `welcome` folder inside `images`. We are going to add a hero image and another image to your post.

```bash
$ mkdir -p assets/images/welcome
```

Copy 2 images to this directory and name one `hero.jpg` and the other `new-site.jpg`. You can download free stock photos from [Unsplash](https://unsplash.com/). The folder structure looks like this:

```bash
├── assets
│   └── images
│       └── welcome
│           └── hero.jpg
|           └── new-site.jpg
```

Let's add the hero image to one of your markdown files in the `_posts` folder. Add a `hero` property at the bottom of your front matter in your post markdown file.

```yaml
hero: /assets/images/welcome/hero.jpg
```

Add the `new-site.jpg` image at the bottom of your file.

```markdown
![demo image](/engineering-education/assets/images/welcome/new-site.jpg)
```

In your post layout file, add the hero image at the top.

```jinja
{% if page.hero %}
	<img src="{{page.hero}}">
{% endif %}
```

Save and reload the page. The hero image is displayed at the top and the other image appears at the bottom.

### Step 7 -- Add navigation to your posts
Up to this stage, the post doesn't have a navbar or a footer. These parts are an essential part of any site and should be on every page.

Create an `_includes` folder in your base directory and create a `navbar.html` file inside. Put the following content inside it.

```html
<style>
ul {
  list-style-type: none;
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

```jinja
{% include navbar.html %}
```

Save the files and reload the page to see the changes. The simple navbar in the `navbar.html` file will now be shown in each file that adopts the post layout. You can add the footer the same way.

### Step 8 -- Adding custom styling to your blog
Up to this stage, you've been using the default `minima` theme provided by Jekyll. To style the site from scratch, delete the `theme` property in `_config.yml`.

If you reload your site, it probably looks broken right now. Let's go ahead and rectify that. Create the following files under `_layouts`.

- `default.html`
- `page.html`
- `home.html`

Put the following content inside the files.

```jinja
<!--default.html-->

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

```jinja
<!--page.html-->

---
layout: default
---
{{content}}
```

```jinja
<!--home.html-->

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

> Jekyll uses [Sass](https://sass-lang.com/) stylesheets. You can learn Sass basics [here](https://sass-lang.com/guide).

Create a `_sass` folder in your base directory and create a `main.scss` inside it. Also create a `css` folder inside the `assets` folder and create a `styles.scss`. Put the following content inside the files.

```scss
// styles.scss

---
---

@import "main";
```

```scss
// main.scss

body {
  background-color: rgb(20, 20, 20);
  color: #fff;
}
a{
    color: rgb(2, 170, 38);
    text-decoration: none;
}
```

The empty front matter in `main.css` tells Jekyll that the file should be processed. Now, you need to import the stylesheet in `default.html`. Put the following line between the `head` tags in `default.html`.

```html
<link rel="stylesheet" href="/assets/css/styles.css">
```

Note that the imported stylesheet is a `css` file and not `scss`. This is because most browsers don't support sass. Therefore, Jekyll converts the sass stylesheet to a CSS file compatible with all browsers. The imported file is located at `_site/assets/css/style.css`. Reload the page to see the stylesheet at work.

### Conclusion
Nowadays, you don't need expert-level programming skills to build your blog site. You can install Jekyll and build a static site without much hassle. The only skills required to create a Jekyll powered site are HTML and CSS skills.

Put some of these skills to the test and start by building your simple Jekyll static site.

### Additional Resources
Additional important Jekyll concepts and practices can be found below.

- [Jekyll data files](https://jekyllrb.com/docs/datafiles/)
- [Permalinks in a Jekyll site](https://jekyllrb.com/docs/permalinks/)
- [Deploying a Jekyll site](https://jekyllrb.com/docs/deployment/)
- [Using Jekyll template themes](https://jekyllrb.com/docs/themes/)
- [Useful Jekyll Plugins](http://planetjekyll.github.io/plugins/)

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
