## Building  documentation websites with Docusaurus version 2

### Introduction

Have you always wanted to start your blog? Are you working on a project and not sure how to go about the documentation? Well, Docusaurus is an open-source project for building, deploying, and maintaining documentation websites.

Docusaurus is maintained by the Facebook Open Source community and there is a lot of support around it, so you don't have to worry if something goes wrong during development. For this tutorial, we are going to use Docusaurus version 2.

### What are the benefits of Docusaurus?

There are a lot of static site-generating projects available today, but what makes Docusaurus version 2 unique?

**Highly customizable** - Docusaurus is very customizable, it can be used for pretty much anything to do with static websites including landing pages since it is built with React.js. So you don't have to worry if your page is going to be unique enough.

**SEO friendly** - Page-specific SEO to help users land on the official documentation site directly relating their problems at hand.

**Easy to setup** - Docusaurus does not require you to be a seasoned programmer for you to set it up. As long as you can follow instructions and curious enough to try, then you are set to go.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 12.13.0 or above installed

- [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) version 1.5 installed

### Installation

Now that you are ready to build your site let us start with the installation. Docusaurus can be installed as an npm package on the command line interface.

```bash
npx @docusaurus/init@latest init [name] [template]
```

For the ***name*** part, you are going to use your preferred name for this project.

For the ***template*** enter the name of the template you are going to use. Docusaurus comes with three templates Classic, Facebook, and Bootstrap. The Facebook template is used for Facebook open-source projects and comes with Facebook-specific defaults, bootstrap template is used when you want the bootstrap framework website. For this tutorial, we are going to use the classic template.

Run the following command.

```bash
npx @docusaurus/init@latest init my-blog classic
```

### File structure

The command generates a directory known as my-blog. Navigate into the directory to see the generated files. Some of the files and folders that you should pay attention to are `docusaurus.config.js`, the `src` folder, and the `blog` folder. Let us run and build the project and see how it looks like without any customization.

```bash
npm run start
```

```bash
npm run build
```

Visit [http://localhost:3000/](http://localhost:3000/) on your browser to view how uncustomized websites look like.

![Uncustomised Website](/engineering-education/building-documentation-websites-with-docusaurus-v2/image1.png)

### Modifying the contents of the homepage

To change the contents of the homepage we are going to edit the `docusaurus.config.js` file.

```javascript
module.exports = {
  title: '', // Here goes the title of your website
  tagline: '', // Here goes the tagline of your blog
  url: '', // Here goes the link to your site
  baseUrl: '/', // baseurl of the site
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '',  // link to the favicon
  organizationName: '', // Usually your GitHub org/user name.
  projectName: '', // Usually your repo name.

  // This block of command is for customising your naviagtion bar
  themeConfig: {
    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: '', 
          label: '',
          position: 'right',
        },
      ],
    },

    // This block of code is for customizing the footer
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community/socials',
          items: [
            {
              label: 'Github',
              href: '', // Github link
            },
            {
              label: 'Instagram',
              href: '', // Instagram link
            },
            {
              label: 'Twitter',
              href: '', // Twitter link
            },
          ],
        },
        
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
};
```

### Modifying the style of the homepage

To change the look and feel of the Homepage navigate to the `src` folder, then the `CSS` folder, and open the `custom.css` file. If you want to style your website further this is the file to add the CSS.

```css
:root {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: rgb(33, 175, 144);
  --ifm-color-primary-darker: rgb(31, 165, 136);
  --ifm-color-primary-darkest: rgb(26, 136, 112);
  --ifm-color-primary-light: rgb(70, 203, 174);
  --ifm-color-primary-lighter: rgb(102, 212, 189);
  --ifm-color-primary-lightest: rgb(146, 224, 208);
  --ifm-code-font-size: 95%;
}

.docusaurus-highlight-code-line {
  background-color: rgb(72, 77, 91);
  display: block;
  margin: 0 calc(-1 * var(--ifm-pre-padding));
  padding: 0 var(--ifm-pre-padding);
}
```

### Creating your first blog post

To create your first blog post, navigate to the Blog folder and delete the existing dummy markdown files. Create a new markdown file with the following name format, `year-month-day-title.md`. For example, `2021-4-20-first-blogpost.md`. When that is done, you are finally ready to write your blog post in the following format.

```markdown
---
slug: <!-- slug -->
title: <!-- here goes the title of your blog -->
author: <!-- here goes the name of the author -->
author_title: <!-- author's team (if any) --> 
author_url: <!-- link to the authors profile -->
author_image_url: <!-- link to the author's avatar -->
tags: [tag1, tag2] <!-- tags to categorise the blogpost -->
---
content of the article
```

### Deploying with Github pages

Navigate to the `docusaurus.config.js` file and edit the following block of code adding your own Github information.

```javascript
module.exports = {
  // ...
  url: 'https://username.github.io', // Your website URL
  baseUrl: '/',
  projectName: 'username.github.io',
  organizationName: 'username',
  // ...
};

```

Finally, deploy using the following command.

```bash
GIT_USER=<GITHUB_USERNAME> yarn deploy
```

Now go to your GitHub page and see your newly deployed website.

### Summary

In this article, we have gone through how to set up Docusaurus, how to customize and deploy. Docusaurus is a very simple and convenient way of deploying a documentation site or blog. Having fun experimenting on this and stay safe. You can find an example of this website right [here](https://github.com/calebroHQ/calebrohq.github.io).

### Reference

- [Docusaurus Documentation](https://docusaurus.io/docs)

- [Docusaurus npm package](https://www.npmjs.com/package/docusaurus)
