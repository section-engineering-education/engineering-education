---
layout: engineering-education
status: publish
published: true
url: /open-source-licenses/
title: Guide to Open Source Licenses
description: This article will go over some of the most commonly used open source license agreements. We will go over some of the most often used license agreements and understand their utilities.
author: lalithnarayan-c
date: 2021-01-17T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/open-source-licenses/hero.jpg
    alt: open source licenses
---
An essential aspect of a developers job is assigning the appropriate license to the work done. The license ensures the work gets it due credit it deserves. They help define the boundaries of use by an external party. The open-source community is responsible for the tremendous growth the world of technology has seen.
<!--more-->
Every aspect of technology, be it distributed computing, virtualization, machine learning, or web development, has been transformed through open source community contributions. 

However, there are scenarios where a small organization or a group of developers will push code onto the web. The reasons behind making their code public could be many. It might be to educate the public and help bridge the gap to learn the technology, or it might be a way to let others use the software commercially with no restrictions. 

This article will go over some of the most often used license agreements and understand their utilities.

### Table of contents
- [Table of contents](#table-of-contents)
- [How to license](#how-to-license)
- [MIT License](#mit-license)
  - [Permissions](#permissions)
  - [Limitations](#limitations)
- [GNU General Public License(GPL)](#gnu-general-public-licensegpl)
  - [Permissions](#permissions-1)
  - [Limitations](#limitations-1)
- [Apache License](#apache-license)
  - [Permissions](#permissions-2)
  - [Limitations](#limitations-2)
- [Creative Commons Attribution](#creative-commons-attribution)
  - [Permissions](#permissions-3)
- [The Unlicense](#the-unlicense)
  - [Permissions](#permissions-4)
  - [Limitations](#limitations-3)
- [Codebase with no license included](#codebase-with-no-license-included)
- [Comparison](#comparison)
- [Conclusion](#conclusion)

### How to license
After going through this article, you will know which license would best fit your use case. Whichever license you choose, you must include the license along with the source code. There are a couple of ways to ensure the license is included.

1. Go to the link of the license page and find the license. Include a link to the license and mention that the work presented is licensed under the respective license.
2. The second way is to include the markdown version of the license in a `LICENSE.md` file. GitHub recognizes this file and displays the type of license on the right panel of the repository page.

### MIT License
This is one of the most popular licenses used across developers. It allows developers to reuse, modify, and distribute code through various channels. There is no restriction on the commercial usage of the source code. However, the software released should include the MIT license.

#### Permissions
- Commercial Use of Software
- Modification
- Distribution
- Private Use of Software
  
#### Limitations
- No warranty or liability is provided.
  
### GNU General Public License (GPL)
There are two versions of the GNU GPL license. The earlier version is called GPL 2.0, and the latter version is called GPL version 3.0. It is a good practice to include the latest version of any license. Let's discuss the GNU GPL 3.0 license in detail.

#### Permissions
- Modification
- Private Use
  
#### Limitations
- Should not be commercialized.
- Derived work should be kept open-sourced.

### Apache license
Designed to enable a faster progress of open source development, the Apache license is the go-to license for organizations releasing open-source software. 

The license gives complete access to the person using it, including the ability to file for a patent. This is one of the few licenses available that allows the work built using this software to be eligible for patent application.  

#### Permissions
-  Commercial use
-  Distribution
-  Modification
-  Patent use
-  Private Use

#### Limitations
- No warranty or liability is provided.

### Creative Commons Attribution
This is one of the stricter licenses made for sharing knowledge with the world without boundaries. This is the sole objective of this license. 

#### Permissions
There are two main variants of this license:
1. Creative Commons Attribution
  - Allows the user to copy, redistribute, transform, and build over the work given the attribution. 
  - Commercial usage is allowed.
2. Creative Commons Attribution ShareAlike License (CC BY-SA 4.0)
  - Allows the user to copy, redistribute, transform, and build over the work given the attribution. 
  - Commercial usage is allowed, provided the work is licensed with the same license, CC BY-SA 4.0.


### The Unlicense
> Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

#### Permissions
-  Commercial use
-  Distribution
-  Modification
-  Private Use

#### Limitations
- No warranty or liability is provided.

### Codebase with no license included
Often times the author or contributors may release the code without any license file attached with it. In such cases, one should contact the contributors and ask them to include a license. This would ensure minimal legal conflicts, if any, in the future. Until a license is included, the author or contributors have exclusive rights over the code. One may not copy or use it without their permission. 

### Comparison 
| License | Permissions | Limitations |
| ------- | ----------- | ----------- |
| MIT License | A no-frills license allowing users to use the code unconditionally provided the author's attribution. | The code or work is provided without a warranty of any kind.|
| GNU General Public License(GPL)| Created to ensure the work is used for educational purposes. Proper attribution to the original author is necessary. | One should not use work with GNU license for commercial purposes, and any derived work must be kept open-sourced |
| Apache License | Similar to MIT license, except it allows one to patent any derived work as well.| The code or work is provided without a warranty of any kind. |
| Creative Commons Attribution License | Created to enable sharing knowledge with appropriate attribution. Commercial usage is allowed. | The same license needs to be used to modify or build over the work licensed through CC BY-SA 4.0.  |
| The Unlicense | This is a no-frills license that one can assign to allow maximum reach | The code or work does not come with any warranty. |
| Codebase with no license included | None | Request the author to attach a license before building on the work. |

### Conclusion
While deciding what license to use for a project, I find this [website](https://choosealicense.com/) particularly helpful. The majority of my work is MIT licensed. Other projects that need to be kept private are stored under private repositories. 

I hope reading this article helped you understand the various licenses and guidelines. While this article is an overview of the various licenses available, always check the original licenses for accurate and the most up to date information. 

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)