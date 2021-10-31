### Introduction
It is easy for anyone to deliver PDFs because it is a standard part of programming. Everything is given as a PDF now, including requests, receipts, and appropriation reports. However, the planned duration of PDF can be inconvenient if you need to create a large number of PDFs quickly.

DocRaptor is an HTML-to-PDF API that greatly enhances the current situation in addition to having a PHP framework for simple joining. During this instructive exercise, students will want to walk around and illustrate how DocRaptor converts HTML into a PDF.

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
Download the most recent provided document to your computer and unzip it into your hard drive. You have two options for introducing it:

- using author 

If you are collaborating with an author, you will need to mention their name in the purchase line of your order confirmation.
```javascript
composer require docraptor/docraptor
```
- If you are not working with an arranger, you should download the most recent document and unzip it into your work area instead. Then, create a new record with the name `docraptor.php` and include the file `autoload.php` in it.

```javascript
require_once('./path/to/docraptor-php/autoload.php');
```
### Authentication
You can use the key `KEY YOUR API HERE`, which will not require you to have a record, but this will only work with watermarked archives and will not work with unwatermarked archives. In any case, you will need to have a track record that's up to date.

```javascript
$configuration=DocRaptor\configuration::getDefaultconfiguration();
$configuration->setUsername('KEY_YOUR_API_HERE');
```

### Add HTML or a URL
Any HTML that will need to be converted to PDF may be included in your document.

```javascript
$docraptor = newDocRaptor\DocAPI();
$doc = newDocRaptor\doc();
$doc = setDocumentContent("<html><title> convert HTML to PDF </title><body> HTML to PDF made easier </body></html");
```

In the case of an online archive, you may want to refer to the URL rather than the substance of the records themselves.

```javascript
$docraptor = newDocRaptor\DocApi();
$doc = newDocRaptor\doc();
$doc = setDocumentUrl("http: //DocRaptor.com/returns/sales.html");
```

Whether you use HTML or URLs in your report, all of the resources you reference should be accessible via the internet since DocRaptor will need to access them.

### API options
Given that DocRaptor may also convert reports into various records, such as HTML to Excel, we must create the right archive for each report.

```javascript
$doc->setDocumentType("pdf");
```
Additionally, because we are using a free API key, we should create a test archive:

```javascript
$doc->setTest(true);
```

Of course, JavaScript is on its way to becoming more efficient during record production, but you can use it on the web.

```javascript
$doc->setJavaScript('true');
```

More information about documentation may be found at [docraptor's API documentation](https://docraptor.com/documentation/api)

### Get documentation
Following the configuration of your API decisions, run this code to generate your file. It moreover consolidates blunders in managing the structure if something goes wrong.

```javascript
try{
    $creat-response=$DocRaptor->creatDoc($doc);
} catch (DocRaptor\ApiException $Error){
    echo $error ."\n";
    echo $error->getMessage() ."\n";
    echo $error->getCode() ."\n";
    echo $error->getResponseBody() ."\n";
}
```

You might save it to your server using the following snippet:

```javascript
$fie = fopen("/tmp/DocRaptor-php.pdf" , "wb");
$fwrite($file , $create_response);
$fclose($file);
```

else the client can download it by

```javascript
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

The complete code:
    ```PHP
    <?php
        //docraptor.hp
        require_once('/path/to/docraptor-php/autoload.php');
        //free account
        $configuration = DocRaptor\configuration::getDefaultonfiguration();
        $configuration -> setUsername('KEY_YOUR_API_HERE');
        
        //adding HTML archive that needs to be converted
        $docraptor = newDocRaptor\DocApi();
        $doc = new DocRaptor\doc();
        $doc = setDocumentContent("<html><title> convert HTML to PDF </title><body> HTML to PDF made easier </body></html");
        //online archive
        $doc = setDocumentUrl("http: //DocRaptor.com/returns/sales.html"); 
        //specification of archive type
        $doc->setDocumentType("pdf"); //DocRaptor also makes other archives
        //creataing a test archive
        $doc->setTest(true);  
        $doc->setJavaScript('true');
        
        //error handling
        try{
            $creat-response=$DocRaptor->creatDoc($doc);
        } catch (DocRaptor\ApiException $Error){
            echo $error ."\n";
            echo $error->getMessage() ."\n";
            echo $error->getCode() ."\n";
            echo $error->getResponseBody() ."\n";
        }
        //saving to the server
        $fie = fopen("/tmp/DocRaptor-php.pdf" , "wb");
        $fwrite($file , $create_response);
        $fclose($file);
        
       //let the user download it
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
        
### Conclusion
DocRapor has been working on the method for converting HTML to PDF format. Its strategy differs from other strategies in that it is more detailed. It has been considered if multiple reports should have been converted to PDF format. From the establishment to the documentation and links provided, the means are given if other cases are investigated.
This will be beneficial because diverse techniques are organized with proper documentation. In addition, the code snippets are easy to understand and experiment with.

#### Further activity reading
[PHP CSV](https://www.phptutorial.net/php-tutorial/php-csv/)

Happy Coding!
