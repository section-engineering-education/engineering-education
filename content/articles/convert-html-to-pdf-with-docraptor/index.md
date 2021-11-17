### Introduction
It is easy for anyone to deliver PDFs because they are a standard document presentation format. Everything is given as a PDF now, including requests, receipts, and appropriation reports. However, the planned duration of PDF can be inconvenient if you need to create a large number of PDFs quickly. 
DocRaptor is an HTML-to-PDF API that significantly enhances the current situation and has a PHP framework for simple joining. This article will guide the reader on using DocRaptor to convert HTML into a PDF.
### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Installation](#installation)
- [API authentication](#api-authentication)
- [Adding HTML content or a URL](#adding-html-content-or-a-url)
- [API document options](#api-document-options)
- [Get documentation for the library](#get-documentation-for-the-library)
- [Conclusion](#conclusion)
 
### Installation
To get started with Docraptot, we need to install it in our local machine. Installation can be done in two ways. The first way is using the composer dependency manager, while the second way is by downloading a zip file of the library and extracting it in the specific project folder.
- Downloading using composer
Download composer from this [link](https://getcomposer.org/download/) then execute the command below to install Docraptor.
```php
Composer require docraptor/docraptor
```
- Installation using a zip file
Navigate through [this](https://docraptor.com/documentation) link to find the installation zip file. Download the file, then extract it into your workspace. Create a new file and name it `docraptor.php`, and include "autoload.php" in it.
```php
//docraptor.php
require_once('./path/to/docraptor-php/autoload.php');
```
### API authentication
Every project where an API is used needs an API key. The key identifies the machine from where the request for specific resources is coming. Our project is not an exception; therefore, we need to add an API key to authenticate the source of our help. We will use the phrase "KEY YOUR API HERE" as our API key, which we get after sending an HTTP request. This key, however, only allows us to use watermarked documents.
```php
$configuration=DocRaptor\configuration::getDefaultconfiguration();  //requests for API key 
$configuration->setUsername('KEY_YOUR_API_HERE');   //works for test document 
```
### Adding HTML content or a URL
This section is where most of the work is done as we add the HTML content to be converted here. Any HTML that we need to convert must exist in the single document we are working on. In the file name`docaptor.php`, add the code snippet below:
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
               style=" style="color: #807c80;  font-size: 12px">Jon Bentley
            </td>
            <td class="it style="color: #807c80;  font-sie: 12px">Jon Bentley
            </td>
            <td class="item-stock" style="text-align: center">In Stock</td>
            <td class="item-qty" style="text-align: center">1</td>
            <td class="item-price" style="text-align: right">$30.02</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; vertical-align: middle;">
              <strong class="book-title" style="color: #395870;  display: block;">Introduction to Algorithms</strong>
               style="color: #807c80;  font-size: 12px">by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein
            </td>
            <td class="item-stock" style="text-align: center;">In Stock</td>
            <td class="item-qty" style="text-align: center;">2</td>
            <td class="item-price" style="text-align: right;">$52.94</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; vertical-align: middle;">
              <strong class="book-title" style="color: #395870;  display: block;">Introducing JAVA</strong>
               style="color: #807c80;  font-size: 12px">by Bruce Lawson &#38; Remy Sharp
            </td>
            <td class="item-stock" style="text-align: center;">Out of Stock</td>
            <td class="item-qty" style="text-align: center;">1</td>
            <td class="item-price" style="text-align: right;">$22.23</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; vertical-align: middle;">
              <strong class="book-title" style="color: #395870;  display: block;">Working effectively with Legacy Code</strong>
               style="color: #807c80;  font-size: 12px">by Michael Feathers
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
Notice that at times, we may want to convert a document that only exists in the internet space as opposed to having it locally on our machines. Therefore, we need to provide the link to the document we plan to use for such an instance. This process can be done as follows:
```php
$docraptor = newDocRaptor\DocApi();
$doc = newDocRaptor\doc();
$doc = setDocumentUrl("http: //DocRaptor.com/returns/sales.html");  //or use a url
```
Whether you use HTML or URLs in your report, all of the resources you reference should be accessible via the internet for DocRaptor to work. So we need to have an internet connection.
### API document options
Given that DocRaptor may also convert documents into other files, for instance, HTML to Excel, we must create the correct document. Hence, set the document type as PDF.
```php
$doc->setDocumentType("pdf");   //pdf or xls or xlsx or help you find the document later
```
Additionally, because we are using a free API key, we should create a test document, but when the test is set to `true`, we need to note that the generated document will be watermarked, limited to 5 downloads, and expires after five days.
```php
$doc->setTest(true);    //test documents are free but watermarked
```
Another essential thing to note is that by default, JavaScript is off, but you need to enable it to enhance speed during the document creation process.
```php
$doc->setJavaScript('true');    //enable javascript processing 
```
### Get documentation for the library
Following the configuration of your API, run this code to generate your file. Document creation is a one-line code.  It also includes an error-handling mechanism that consolidates mistakes in managing the structure if something goes wrong.
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
The complete code for the application can be found [here](https://github.com/taves-hub/convert-html-to-pdf-with-docraptor), and upon running the code above, it results in the following output.
![generated-pdf](/engineering-education/convert-html-to-pdf-with-docraptor/converted-pdf-with-docraptor.png)
### Conclusion
DocRaptor has been used to convert HTML to PDF format for a long time. Its strategy differs from other strategies because it is more detailed, compact, and direct. It is considered when we need to convert multiple reports to PDF format. From the establishment to the documentation and links provided, the means of use are provided where other cases are involved.
This article will be beneficial because diverse techniques are organized with proper documentation. In addition, the code snippets are easy to understand and experiment with. You can find more about the topic [here](https://www.phptutorial.net/php-tutorial/php-csv/) and more information about Docraptord at [docraptor's API documentation](https://github.com/DocRaptor/docraptor-php)
Happy Coding