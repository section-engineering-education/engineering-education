# Introduction to open source licenses

An essential aspect of a developer's job is assigning the appropriate license to the work done. The license ensures the work gets the due credit it deserves. They help in defining the boundaries of usage by an external party. The open-source community is responsible for the tremendous growth the world of technology has seen. Every aspect of technology, be it distributed computing, virtualization, machine learning, or web development, has been transformed through open source community contributions. 

However, there are scenarios where a small organization or a group of developers would push code onto the web. The reason behind making the code public can be many. It might be to educate the public and help bridge the gap to learn the technology, or it might be a way to let others use the software commercially without any restrictions. This article will go over some of the most often used license agreements and understand their utilities.

### Table of contents

1. How to license
2. MIT license
3. GNU General Public License(GPL)
4. Apache License
5. Creative Commons Attribution
6. The Unlicense
7. Codebases with no license included

### How to license

After going through this article, you will know which license would be the best fit for your use case. Whichever license you choose, you must include the license along with the source code. There are a couple of ways to ensure the license is included.

1. Go to the link of the license page and find the license. Include a link to the license and mention that the work presented is licensed under the respective license.
2. The second way is to include the markdown version of the license in a file called LICENSE.md. GitHub recognizes this file and displays the type of license on the right panel of the repository page.

### MIT License

This is one of the most popular licenses used across developers. It allows developers to reuse, modify, and distribute code through various channels. There is no restriction on the commercial usage of the source code. However, the software released should include the MIT license.

#### Permissions

- Commercial Use of Software
- Modification
- Distribution
- Private Use of Software
  
#### Limitations
- No warranty or liability is provided
  

### GNU General Public License(GPL)

There are two versions of the GNU GPL license. The earlier version is called GPL 2.0, and the latter version is called GPL version 3.0. It is a good practice to include the latest version of any license. Let us discuss the GNU GPL 3.0 license in detail.

#### Permissions
- Modification
- Private Use
  
#### Limitations
- Should not be commercialized
- No private use: should be kept open-sourced.

### Apache License

Designed to enable faster progress of open source development, the Apache license is the go-to license for organizations releasing open-source software. The license gives complete access to the person using it, including the ability to file for a patent. This is one of the few licenses available that allows the work built using this software to be eligible for patent application.  

#### Permissions
-  Commercial use
-  Distribution
-  Modification
-  Patent use
-  Private Use

#### Limitations

- No warranty or liability is provided

### Creative Commons Attribution

This is one of the stricter licenses made for sharing knowledge with the world without boundaries. This is the sole objective of this license. Apart from this objective, it does not allow one to create, distribute copies, either original or modified, through any other channels than the original one. There are several variants of this license. 

#### Permissions

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material
for any purpose, even commercially.
under the terms that attribution where necessary is given. 

Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material
for any purpose, even commercially.

under the terms that attribution where necessary is given. and the same file is shared under the same license as the original.

### The Unlicense

> Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

#### Permissions

-  Commercial use
-  Distribution
-  Modification
-  Private Use


#### Limitations
- No warranty or liability is provided


### Codebase with no license included

Many times the author or contributors may release the code without any license file attached with it. In such cases, one should contact the contributors and ask them to include a license. This would ensure minimal legal conflicts, if any, in the future. Until a license is included, the author or contributors have exclusive rights over the code. One may not copy or use it without their permission. 

### Conclusion

While deciding what license to use for a project, I find this [website](https://choosealicense.com/) particularly helpful. The majority of my work is MIT licensed. Other projects that need to be kept private are stored under private repositories. I hope reading this article helped you understand the various licenses and guidelines. While this article is an overview of the various licenses available, always check the original licenses for accurate and up to date information. 
