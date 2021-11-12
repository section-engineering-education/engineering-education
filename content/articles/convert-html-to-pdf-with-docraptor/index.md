### Introduction
It is easy for anyone to deliver PDFs because it is a standard forat for document presentation. Everything is given as a PDF now, including requests, receipts, and appropriation reports. However, the planned duration of PDF can be inconvenient if you need to create a large number of PDFs quickly. DocRaptor is an HTML-to-PDF API that greatly enhances the current situation in addition to having a PHP framework for simple joining. This article will guide the reader on how to use DocRaptor to converts HTML into a PDF.

### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Installation](#installation)
- [Authentication](#authentication)
- [Add HTML or a URL](#add-html-or-a-url)
- [API options](#api-options)
- [Get documentation](#get-documentation)
- [Conclusion](#conclusion)
  - [Further activity reading](#further-activity-reading)
 
### Installation
To get startd with Docraptotr, we need to first install it in our local machine. Installation can be done in two ways. The first way is using composer dependecy manager while the second way is by donwloading a zip file of the library and extracting in the specific project folder.

#### Using composer
- Download composer from this [link](https://getcomposer.org/download/) then execute the command below to install Docraptor.

```php
composer require docraptor/docraptor
```

#### Installation using  a zip file
Navigate through [this](https://docraptor.com/documentation) link to fins the installation zip file. DOwnload the file then extract in your workspace. Create a new file and name it "docraptor.php" and include "autoload.php" in it

```php
//docraptor.php
require_once('./path/to/docraptor-php/autoload.php');
```

### Authentication
EVery project where an API is used needs an API key to identify the machine from where request for specific resources are coming from. Our project is not an exception therefore we need to add an API Key to authenticate the source of our resource. We will use the phrase "KEY YOUR API HERE" as our API key which we get after sending an HTTP request. THis key however only allows us to use watermaked documents.


```php
$configuration=DocRaptor\configuration::getDefaultconfiguration();  //requests for API key 
$configuration->setUsername('KEY_YOUR_API_HERE');   //works for test document 
```

### Add HTML or a URL
This is the where most of the work is done as we add the HTML content to be converted here. Any HTML that we need to cnvert ust exit in the singke document that we are working on.In the file names `docaptor.php` add the code snipet below:

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

Notice that at times, we may want to convert a document that only exists in the internet space as opposed to having it locally on our machines. For such an instance , we neeed to provide the link to the document we plan use. This process can be done ad follows:

```php
$docraptor = newDocRaptor\DocApi();
$doc = newDocRaptor\doc();
$doc = setDocumentUrl("http: //DocRaptor.com/returns/sales.html");  //or use a url
```

Whether you use HTML or URLs in your report, all of the resources you reference should be accessible via the internet for DocRaptor to work. So we need to have an internet connection.

### API options
Given DocRaptor may also converts documents into other files for instance HTML to Excel, we must create the right document. Hence set the document type as PDF.

```php
$doc->setDocumentType("pdf");   //pdf or xls or xlsx    //help you find the document later
```

Additionally, because we are using a free API key, we should create a test document but when the test is set to `true` but we need tonote that the generated document will be watermarked, limited to 5 downloads and expires after 5 days.

```php
$doc->setTest(true);    //test document are free but watermarked
```

Another important thing to note is that by default, JavaScript is off but you need to enable it to enhance speed during document creation process.

```php
$doc->setJavaScript('true');    //enable javascript processing 
```

### Get documentation
Following the configuration of your API, run this code to generate your file. Document creation is a one-line code.  It also includes an error handling mechanism which consolidates mistakes in managing the structure if something goes wrong.

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

Add the following code snippet to your file to enable the file to be saved in the the server.

```php
//saving to server
$fie = fopen("/tmp/DocRaptor-php.pdf" , "wb");
$fwrite($file , $create_response);
$fclose($file);
```

The following code snippet will enable the user download the documents.

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

The complete code can be found [here](https://github.com/taves-hub/convert-html-to-pdf-with-docraptor) and upon running code above it results to the following output.

![generated-pdf](/engineering-education/convert-html-to-pdf-with-docraptor/converted-pdf-with-docraptor.png)

### Conclusion
DocRapor has been used for conversion of HTML to PDF format for long. Its strategy differs from other strategies in that it is more detailed, compact and direct. It is considered when multiple reports should be converted to PDF format. From the establishment to the documentation and links provided, the means are given if other cases are investigated.

This will be beneficial because diverse techniques are organized with proper documentation. In addition, the code snippets are easy to understand and experiment with. You can find more about the toic [here](https://www.phptutorial.net/php-tutorial/php-csv/).

More information about documentation may be found at [docraptor's API documentation](https://github.com/DocRaptor/docraptor-php)

Happy Coding!
