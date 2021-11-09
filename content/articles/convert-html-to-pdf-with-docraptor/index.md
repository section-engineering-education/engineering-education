### Introduction
It is easy for anyone to deliver PDFs because it is a standard forat for document presentation. Everything is given as a PDF now, including requests, receipts, and appropriation reports. However, the planned duration of PDF can be inconvenient if you need to create a large number of PDFs quickly.
DocRaptor is an HTML-to-PDF API that greatly enhances the current situation in addition to having a PHP framework for simple joining. This article will guide the reader on how to use DocRaptor to converts HTML into a PDF.

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
Download the latest released file and unzip it into your pc. You can install it by either:

- using composer but in case you have not installed composer you can download it [here](https://getcomposer.org/download/) after which you are required to run the command below in your command line to install docraptor in your workspace.


```php
composer require docraptor/docraptor
```

- or download the recent docraptor version [here](https://docraptor.com/documentation) and unzip it into your workspace instead. Create a new file and name it "docraptor.php" and include "autoload.php" in it

```php
//docraptor.php
require_once('./path/to/docraptor-php/autoload.php');
```

### Authentication
You may use the key "KEY YOUR API HERE" which you get after sending an HTTP request. It will not require you to have an account but this only applies to watermarked documents (archive). In any case, you will need to have a track record that's up to date.


```php
$configuration=DocRaptor\configuration::getDefaultconfiguration();  //requests for API key 
$configuration->setUsername('KEY_YOUR_API_HERE');   //works for test document 
```

### Add HTML or a URL
Any HTML that will need to be converted to PDF may be included in your document

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

incase of online document you may want to refer to theRL rather than the substance ot the records themselves.

```php
$docraptor = newDocRaptor\DocApi();
$doc = newDocRaptor\doc();
$doc = setDocumentUrl("http: //DocRaptor.com/returns/sales.html");  //or use a url
```

Whether you use HTML or URLs in your report, all of the resources you reference should be accessible via the internet for DocRaptor to work.

### API options
Given DocRaptor may also converts documents into other files for instance HTML to Excel, we must create the right document. Hence set the document type as PDF.

```php
$doc->setDocumentType("pdf");   //pdf or xls or xlsx    //help you find the document later
```

Additionally, because we are using a free API key, we should create a test document but when the test is set to true there are a few things to note
- generated pdf will be watermarked
- `hosted document` will be limited to 5 downloads
- `hosted document` will expire after 5 days

```php
$doc->setTest(true);    //test document are free but watermarked
```

by default, JavaScript is off but you need to enable it to enhance speed during document creation

```php
$doc->setJavaScript('true');    //enable javascript processing 
```

More information about documentation may be found at [docraptor's API documentation](https://github.com/DocRaptor/docraptor-php)

### Get documentation
Following the configuration of your API decisions, run this code to generate your file. Document creation is a one-line code.  It also includes an error handling mechanism which consolidates blunders in managing the structure if something goes wrong.

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
You may save it to the server using the following snippet:

```php
//saving to server
$fie = fopen("/tmp/DocRaptor-php.pdf" , "wb");
$fwrite($file , $create_response);
$fclose($file);
```

else the client can download it by

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

The complete code can be found [here](https://github.com/taves-hub/convert-html-to-pdf-with-docraptor):
    
```php       
       $docraptor = new DocRaptor\DocApi();
        $docraptor->getConfig()->setUsername("YOUR_API_KEY_HERE");

        $doc = new DocRaptor\Doc();
        $doc->setTest(true);   // test documents are free but watermarked
        // HTML Table page as parameter
        $doc->setDocumentContent(<!DOCTYPE html>
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
</html>);     // supply content directly
        $doc->setName("docraptor-php.pdf");                                    // help you find a document later
        $doc->setDocumentType("pdf");                                          // pdf or xls or xlsx
        $create_response = $docraptor->createDoc($doc);
        // Instruct PHP to return a file download.
        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename=example.pdf');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . strlen($create_response));
        ob_clean();
        flush();
        echo($create_response);
         } catch (DocRaptor\ApiException $Error){
            echo $error ."\n";  //shows the error
            echo $error->getMessage() ."\n";     //returns the error message
            echo $error->getCode() ."\n";   //shows the line of code with the error
            echo $error->getResponseBody() ."\n";
        }
``` 
on running code above it results to the following output:

![generated-pdf](/engineering-education/convert-html-to-pdf-with-docraptor/converted-pdf-with-docraptor.png)
### Conclusion
DocRapor has been working on the method for converting HTML to PDF format. Its strategy differs from other strategies in that it is more detailed. It has been considered if multiple reports should have been converted to PDF format. From the establishment to the documentation and links provided, the means are given if other cases are investigated.
This will be beneficial because diverse techniques are organized with proper documentation. In addition, the code snippets are easy to understand and experiment with.
#### Further activity reading
[PHP CSV](https://www.phptutorial.net/php-tutorial/php-csv/)

Happy Coding!
