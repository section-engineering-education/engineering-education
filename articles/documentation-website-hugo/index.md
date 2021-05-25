---
layout: engineering-education
status: publish
published: true
url: /engineering-education/documentation-website-hugo/
title: Building a Documentation Site from Scratch using Hugo
description: This tutorial will go over how to create a documentation site for your software projects using Hugo static generator using the Docsy theme.
author: quadri-sheriff
date: 2020-11-21T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/documentation-website-hugo/hero.jpg
    alt: Hugo Documentation site example image
---
Documentation is a must in every software development project. Reliable documentation provides an accurate overview of your software, good insight on how to use your software, and easy onboarding for new users of your software.
<!--more-->
In this tutorial, I will teach you how to build a documentation website for your software projects using [Hugo](https://gohugo.io) and the [Docsy](https://www.docsy.dev/) theme. Hugo is a speed optimized static site generator written in the Go programming language. Hugo can generate documentation websites, blogs portfolio websites, etc. directly from a markdown file and HTML files.

### Table of contents
- Install Hugo.
- Create your website.
- Install and set up the Docsy theme.
- Add a content section to your website.
- Add a documentation page to your website.
- Preview your website.
- Build your website.
- Conclusion.

### Prerequisites
This guide assumes that you have th following installed:
- Go installed on your local machine - visit [ednsquare.com](https://ednsquare.com/story/how-to-install-golang-on-windows-linux-mac------T3VRkO) for instructions on how to install Go on macOS, Windows, and Linux.
- [Homebrew](https://brew.sh/) (macOS and Linux) - visit [brew.sh](https://brew.sh/) for instructions on how to install homebrew on macOS and Linux.
- [Chocolatey](https://chocolatey.org/) (Windows) - visit [chocolatey.org](https://chocolatey.org/) for instructions on how to install chocolatey on Windows.
- [npm](https://www.npmjs.com/): Download [Nodejs](https://nodejs.org/en/download/) to install npm on your local machine.

### Step 1 - Install Hugo
The Docsy theme uses the Hugo-extended version of Hugo. Install the Hugo-extended version on macOS and Linux with Homebrew.

```bash
 brew install hugo
 ```

 Verify your installation.

 ```bash
 $ hugo version
 Hugo Static Site Generator v0.64.1/extended darwin/amd64 BuildDate: unknown
 ```

Install the Hugo-extended version on Windows with Chocolatey.

 ```bash
 choco install hugo-extended -confirm
 ```

 Verify your installation.

 ```bash
 $ hugo version
 Hugo Static Site Generator v0.78.1/extended windows/amd64 BuildDate: unknown
 ```

### Step 2 - Create your website
Create a new Hugo website with the `hugo new site` command.

```bash
$ hugo new site documentation-website

Congratulations! Your new Hugo site is created in /Users/sheriff/hugo-project.

Just a few more steps and you are ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```

The `hugo new site` command will also generate a directory with the following file structure:

```bash
hugo-project/
   ├── archetypes
   ├── config.toml
   ├── content
   ├── data
   ├── layouts
   ├── static
   └── themes
```

The following files are:
- `archetypes`: Directory for storing content template files.
- `config.toml`: Hugo configuration file.
- `content`: Directory for content files.
- `data`: Directory for storing configuration files.
- `layouts`: Directory for storing .html template files.
- `static`: Directory for storing all static contents.
- `themes`: Directory for storing your themes.

### Step 3 - Install the Docsy theme
The Docsy theme is a Hugo theme that is built specifically for creating medium to large technical documentation websites. The theme comes preloaded with basic documentation features like the search bar, the menu, etc.

To install the Docsy theme, we can follow these steps:

1. cd to your project's directory.

```bash
cd documentation-website
```

2. Install postCSS and autoprefixer.
 - On macOS and Linux.

```bash
sudo npm install -D --save autoprefixer
sudo npm install -D --save postcss-cli
```
 - On Windows.

```bash
npm install -D --save autoprefixer
npm install -D --save postcss-cli
```

3. Install the Docsy theme by adding it into your project as a git submodule.

```bash
git init
git submodule add https://github.com/google/docsy.git themes/docsy
echo 'theme = "docsy"' >> config.toml
git submodule update --init --recursive
```

### Step 4 - Add a content section to your website
All your website's content files are stored in the `content` folder found in your root folder. The top-level subfolders in the `content` folder will determine the sections of your website by default, and the nested subfolders inside these top-level subfolders combine to form your website structure as they are organized in their top-level subfolders.

```bash
content      <-- Content folder
   |--- Documentation        <-- Top level subfolder(main section in your website).
         |
         |---- New Documentation    <-- Nested subfolder(subsection found in the documentation section).
```

To add a custom section to your website, we can do the following:

1. cd to the `content` folder.

```bash
cd content
```

2. Create a new subfolder with the custom section name ie `documentation`.

```bash
mkdir documentation
```

3. Add the new section to your `menu` for easier navigation by editing your config.toml file.

```config.toml
[menu]

  [[menu.main]]
    identifier = "documentation"
    name = "Documentation"
    pre = "<i class='fa fa-heart'></i>"
    url = "/documentation/"
    weight = 20
```

***Note: Most editing apps will encode your cofig.toml file incorrectly. Make sure to open your config.toml file with notepad++ on windows `start notepad++ .\config.toml`, or use a code editor like [Visual Studio Code](https://code.visualstudio.com/download).***

Visit [gohugo.io](https://gohugo.io/content-management/sections/) to learn more about creating sections.

### Step 5 - Add a documentation page to your website
Add pages to your website by creating markdown or HTML files inside the subfolders found in the content folder, and then specify the page layout in the page's frontmatter. Layouts in Hugo determine your page's header, footer, navigation, and are provided by your theme.

Docsy ships with layout for 3 type of content,

- `docs` for documentation content.
- `blog` for blog content.
- `community` for your community-oriented content.

To add a documentation page to our documentation section:

1. Create and add the markdown or HTML file into the documentation folder.

```bash
touch index.md
```

or for Windows.

```bash
notepad index.md
```

2. Add the following yaml frontmatter to configure the page's information and layout type.
```bash
---
title: "A new documentation page"
weight: 1
type: docs
summary: A new page for our Hugo documentation website.
---
```

3. Add markup to your page.

```bash
# Hugo project website

This is our new documentation page.
```

Visit [docsy.dev](https://www.docsy.dev/docs/adding-content/content/) to learn more about adding content to your website.

### Step 6 - Preview your website
Hugo ships with a web server that has live reload built-in. This allows you to preview your changes in real-time when your web server is running.

Start your web server with the following command:

```bash
hugo server command
```

The web server will be hosted at http://localhost:1313, and will automatically reload when you make any changes in your website's files.

![Documentation-website-preview](/engineering-education/documentation-website-hugo/website.png)

### Step 7 - Build your website
Build your website with the `hugo` command. The command will generate all your website's static files and store them in the `./public/` directory.

You can deploy your website on different hosting platforms like [AWS](https://aws.amazon.com/), [Github pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), etc. with the generated static files.

### Conclusion
Documentation is an essential part of any software development project and can determine the success of failure of your project. By following this tutorial, you can have your Hugo documentation website set up easily with all your static files generated.

There are tons of other configuration options you can edit to improve the look and feel of your website.

Visit [gohugo.io](https://gohugo.io/documentation/) and [Docsy.dev](https://www.docsy.dev/docs/) to check out these other options.

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
