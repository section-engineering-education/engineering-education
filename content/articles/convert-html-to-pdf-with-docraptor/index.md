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
$doc = setDocumentContent("<html><title> convert HTML to PDF </title><body>HTML to PDF made easier</body></html");    //supply content directly 
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
    <?php
        //docraptor.hp
        require_once('/path/to/docraptor-php/autoload.php');
        $configuration = DocRaptor\configuration::getDefaultonfiguration(); //requests for API key
        $configuration -> setUsername('KEY_YOUR_API_HERE'); //works for test document 
        $docraptor = newDocRaptor\DocApi();
        $doc = new DocRaptor\doc();     //identifies the type of file required
        $doc = setDocumentContent("<html><title> convert HTML to PDF </title><body> HTML to PDF made easier </body></html");    //supply content directly
        //$doc = setDocumentUrl("http: //DocRaptor.com/returns/sales.html");    //or use a url
        $doc->setDocumentType("pdf");   //help you find the document later
        $doc->setTest(true);        //test document are free but watermarked
        //$doc->setJavaScript('true');  //enable javascript processing 
        try{
            $creat-response=$DocRaptor->creatDoc($doc); //generate the document
       
        $fie = fopen("/tmp/DocRaptor-php.pdf" , "wb");
        $fwrite($file , $create_response);
        $fclose($file);

        //instructs php to return a file download 
        
        //$header('Content-Description: file Transfer');
        //$header('Content-Type: Application/pdf');
        //$header('Content-Deposition: attachment; filename=sales.pdf');
        //$header('Content-Transfer-Encoding: binary');
        //$header('Expires: 0');
        //$header('Content-Description: file Transfer');
        //$header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        //$header('Pragma: public');
        //$header('Content-Length: ' .strlen($creat-response));
        //ob_clean();
        //flush();
        //echo($create_response);
        //exit;
         } catch (DocRaptor\ApiException $Error){
            echo $error ."\n";  //shows the error
            echo $error->getMessage() ."\n";     //returns the error message
            echo $error->getCode() ."\n";   //shows the line of code with the error
            echo $error->getResponseBody() ."\n";
        }
```        
### Conclusion
DocRapor has been working on the method for converting HTML to PDF format. Its strategy differs from other strategies in that it is more detailed. It has been considered if multiple reports should have been converted to PDF format. From the establishment to the documentation and links provided, the means are given if other cases are investigated.
This will be beneficial because diverse techniques are organized with proper documentation. In addition, the code snippets are easy to understand and experiment with.
#### Further activity reading
[PHP CSV](https://www.phptutorial.net/php-tutorial/php-csv/)

Happy Coding!
