---
layout: engineering-education
status: publish
published: true
url: /convert-html-to-pdf-with-docraptor/
title: Converting HTML to PDF using the Docraptor Library
description: This article will guide the reader on using DocRaptor to convert HTML into a PDF.
author: kennedy-ndutha
date: 2021-12-20T00:00:00-14:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/convert-html-to-pdf-with-docraptor/hero.jpg 
    alt: Convert HTML to pdf using Docraptor Image
---
Portable Document Format (PDF) is a standard document presentation format. Everything is given as a PDF now, including payment requests, receipts, and appropriation reports. 
<!--more-->
However, the amount of time it takes to generate many custom PDFs can be lengthy especially if you want to generate many PDF documents.

### Introduction
DocRaptor is an HTML-to-PDF API that significantly enhances converting HTML to PDF. In addition, the API  has a PHP framework for easy integration with PHP projects. This article will guide the reader through using DocRaptor to convert HTML documents into PDFs.

### Table of content
- [Introduction.](#introduction)
- [Table of content](#table-of-content)
- [Installation](#installation)
- [API Authentication](#api-authentication)
- [Adding HTML content or a URL](#adding-html-content-or-a-url)
- [API document options](#api-document-options)
- [Document generation](#document-generation)
- [Conclusion](#conclusion)

### Installation
To get started with DocRaptor, we need to install it on our local machine. Installation can be done in two ways. The first way is using composer dependency manager, while the second way is by downloading a zip file of the library and extracting it in the specific project folder.

#### Downloading using composer
Composers is a PHP dependency manager. It downloads, installs, and updates your project dependencies. Download Composer from this [link](https://getcomposer.org/download/), open your command prompt, and then execute the command below to install DocRaptor.

```php
composer require docraptor/docraptor
```

#### Installation using a zip file
Navigate through this [link](https://github.com/taves-hub/convert-html-to-pdf-with-docraptor/blob/main/docraptor.rar) to download the zip file. 

Download the file, then extract it into your workspace. Create a new file and name it `docraptor.php`, and include `autoload.php` in it. In the `docraptor.php` file, add the code snippet below.

```php
//docraptor.php
require_once('./path/to/docraptor-php/autoload.php');
```

### API authentication
Every project where an API is used needs an API key. The key identifies the machine from where the request for specific resources is coming. Therefore, we need to add an API key to authenticate the source of our requests. 

To get started, you can use the `free to use` API key, "YOUR_API_KEY_HERE," to get started. This key, however, only allows us to use watermarked documents and limits the document number of downloads to five.

```php
$configuration=DocRaptor\configuration::getDefaultconfiguration();  //requests for API key 
$configuration->setUsername('KEY_YOUR_API_HERE');   //works for test document
``` 

### Adding HTML content or a URL
This section is where most of the work is done, as we add the HTML content to be converted here. Any HTML that we need to convert must exist in the single document we are working on. Add the code snippet below to the file named `docaptor.php`:

```php
$docraptor = newDocRaptor\DocAPI();
$doc = new DocRaptor\doc(); //identifies the type of file required
$doc = setDocumentContent("<!DOCTYPE html>
<html lang="en">
  <head> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="m8GCXCxn8DS2r8zNl1wmhb4O0n79avTSc9puuaqd">
    <title>Home</title>
    <!-- Bootstrap CSS --><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<body>
    <div class="container" style="margin-top: 8%; margin-left: 30%; border-color: #1dcf06 ;">
      <table style="border-collapse: separate; border-spacing: 0; color: #4a4a4d;  font: 14px/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif;">
        <thead style="background: #395870; background: linear-gradient(#49708f, #293f50); color: #fff; font-size: 11px; text-transform: uppercase;">
          <tr>
            <th scope="col" colspan="2" style="padding: 10px 15px; vertical-align: middle;">Item</th>
            <th scope="col" style="padding: 10px 15px; vertical-align: middle;">Qty</th>
            <th scope="col" style="padding: 10px 15px;  vertical-align: middle;">Price</th>
          </tr>
        </thead>
        <tbody style="background: #f0f0f2;">
          <tr>
            <td style="padding: 10px 15px; vertical-align: middle;">
              <strong class="book-title">Programming pearls</strong>
               <span class="text-offset" style="color: #807c80;  font-size: 12px">Jon Bentley</span>
            </td>
            <td class="item-stock" style="text-align: center">In Stock</td>
            <td class="item-qty" style="text-align: center">1</td>
            <td class="item-price" style="text-align: right">$30.02</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; vertical-align: middle;">
              <strong class="book-title" style="color: #395870;  display: block;">Introduction to Algorithms</strong>
                <span class="text-offset" style="color: #807c80;  font-size: 12px">by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein</span>
            </td>
            <td class="item-stock" style="text-align: center;">In Stock</td>
            <td class="item-qty" style="text-align: center;">2</td>
            <td class="item-price" style="text-align: right;">$52.94</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; vertical-align: middle;">
              <strong class="book-title" style="color: #395870;  display: block;">Introducing JAVA</strong>
              <span class="text-offset" style="color: #807c80;  font-size: 12px">by Bruce Lawson &#38; Remy Sharp</span>
            </td>
            <td class="item-stock" style="text-align: center;">Out of Stock</td>
            <td class="item-qty" style="text-align: center;">1</td>
            <td class="item-price" style="text-align: right;">$22.23</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; vertical-align: middle;">
              <strong class="book-title" style="color: #395870;  display: block;">Working effectively with Legacy Code</strong>
               <span class="text-offset" style="color: #807c80;  font-size: 12px">by Michael Feathers</span>
            </td>
            <td class="item-stock" style="text-align: center;">In Stock</td>
            <td class="item-qty" style="text-align: center;">1</td>
            <td class="item-price" style="text-align: right;">$30.17</td>
          </tr>
        </tbody>
        <tfoot style="text-align: right;">
          <tr class="text-offset" style="color: #807c80;  font-size: 12px">
            <td colspan="3"style="padding: 10px 15px; vertical-align: middle;">Subtotal</td>
            <td>$135.36</td>
          </tr>
          <tr class="text-offset" style="color: #807c80;  font-size: 12px">
            <td colspan="3" style="padding: 10px 15px; vertical-align: middle;">Tax</td>
            <td>$13.54</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 10px 15px; vertical-align: middle;">Total</td>
            <td>$148.90</td>
          </tr>
        </tfoot>
      </table>
    </div>
</body>
</html>");    //supply content directly 
```

Notice that at times, we may want to convert a document that only exists in the internet space as opposed to having it stored locally on our machines. Therefore, we need to provide the link to the document we plan to use for such an instance. 

This process can be done as follows:
```php
$docraptor = newDocRaptor\DocApi();
$doc = newDocRaptor\doc();
$doc = setDocumentUrl("http: //DocRaptor.com/returns/sales.html");  //or use a url
```

Whether you use HTML or URLs in your report, all the resources you reference should be accessible via the internet for DocRaptor to work. So we need to have an internet connection.

### API document options
Given that DocRaptor may also convert documents into other files, for instance, HTML to Excel, we must ensure that we create the correct document. Hence, set the document type as `PDF`.

```php
$doc->setDocumentType("pdf");   //pdf or xls or xlsx //helps you find the document later
```

Additionally, we should create a test document because we are using a free API key. When the test is set to `true`, we must note that the generated PDF document will be watermarked, limited to five downloads, and expire after five days.

```php
$doc->setTest(true);    //test document are free but watermarked
```

Another essential thing to note is that, by default, JavaScript is off, but you need to enable it to enhance the speed during the document creation process.

```php
$doc->setJavaScript('true');    //enable JavaScript processing 
```

### Document generation
Following the configuration of your API, run this code to generate your file. Document creation is a one-line code. It also includes an error-handling mechanism that consolidates mistakes in managing the structure if something goes wrong.

```php
try{
    $creat-response=$DocRaptor->creatDoc($doc); //generate the document
} catch (DocRaptor\ApiException $Error){
    echo $error ."\n";  //shows the error
    echo $error->getMessage() ."\n";    //returns the error message
    echo $error->getCode() ."\n";       //shows the line of code with the error
    echo $error->getResponseBody() ."\n";
}
```

Add the following code snippet to your file to enable the file to be saved on the server.

```php
//saving to server
$fie = fopen("/tmp/DocRaptor-php.pdf" , "wb");
$fwrite($file , $create_response);
$fclose($file);
```

The following code snippet will enable the user to download the documents.

```php
//instructs php to return a file download 
$header('Content-Description: file Transfer');
$header('Content-Type: Application/pdf');
$header('Content-Deposition: attachment; filename=sales.pdf');
$header('Content-Transfer-Encoding: binary');
$header('Expires: 0');
$header('Content-Description: file Transfer');
$header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
$header('Pragma: public');
$header('Content-Length: ' .strlen($creat-response));
ob_clean();
flush();
echo($creat_response);
exit;
```

You can find the complete code for the implementation [here](https://github.com/taves-hub/convert-html-to-pdf-with-docraptor), and upon running the code above, it results in the following output:

![generated pdf](/engineering-education/convert-html-to-pdf-with-docraptor/converted-pdf-with-docraptor.png)

### Conclusion
For a long time, DocRaptor has converted HTML documents to PDF format. Its strategy differs from other strategies because it is more detailed, compact, and direct. It is considered when we need to convert multiple reports to PDF format.

This article covered converting HTML documents to PDF using the DocRaptor API. The article is beneficial with the diverse techniques used and organized with proper documentation. 

In addition, the code snippets are easy to understand and test. You can find more information about DocRaptor at [DocRaptor's API documentation](https://github.com/DocRaptor/docraptor-php).

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
