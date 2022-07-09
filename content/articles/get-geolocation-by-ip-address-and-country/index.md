---
layout: engineering-education
status: publish
published: true
url: /get-geolocation-by-ip-address-and-country/
title: How to Get Geolocation Using and IP Address and Country Code
description: In this tutorial will walk through how to get a geolocation using an IP address, country name, and code.
author: frankline-mwangi
date: 2022-02-09T00:00:00-07:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/get-geolocation-by-ip-address-and-country/hero.jpg
    alt: How to Get Geolocation using and IP Address and Country Code Hero Image
---
Geolocation provides information about the geographic location of a user. Specifically, the IP address is used by the geolocation service to determine the location.
<!--more-->
In this tutorial, you will learn how to get geolocation using an IP address and a country name and code. It’s a two step process where the first is to get the IP address and the second is to get the geolocation.

### Table of content
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [About the example](#about-the-example)
- [File structure](#file-structure)
- [Step 1: Get and validate current IP address](#step-1-get-and-validate-current-ip-address)
- [Step 2: Prepare API request to get geolocation via PHP cURL](#step-2-prepare-api-request-to-get-geolocation-via-php-curl)
- [Country geolocation in response to an API call](#country-geolocation-in-response-to-an-api-call)
- [Alternate Geolocation API](#alternate-geolocation-api)
- [Different uses of getting Geolocation](#different-uses-of-getting-geolocation)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
- Fundamentals of PHP.
- Text-Editor - VScode.

### Objectives
After completing this tutorial, you should be able to do the following:
- Get the current IP address.
- Get the area using the PHP cURL API.
- Know the different uses of getting Geolocation
- How to enable/disable Geolocation API.

### About the example
This example uses IPWhoIs geolocation API tool to lookup the location data by using the IP address. This API endpoint looks for any IPV4, IPv6 or any domain as a parameter along with the geolocation request to read.

![Example](/engineering-education/get-geolocation-by-ip-address-and-country/example.jpg)

This code executes a 2-step process to output the location data. It creates a PHP service with a function to get the user IP address from the `$_SERVER` array. Then, it will use the IP address to set the cURL option to read the geolocation data. This will output the country name, code, and the given IP by parsing the API JSON response.

### File structure
The below file structure image shows the simplicity of this example with the minimal number of files. The `Request.php` file has the prime functions that execute the two steps to get IP and geolocation data. The `index.php` file calls the service to get the location data and populate them in the UI.

![File-structure](/engineering-education/get-geolocation-by-ip-address-and-country/file-structure.jpg)

### Step 1: Get and validate current IP address
This is the home page code which contains the HTML code to acknowledge users with the current geolocation data. It imports the location service class, invokes the methods to get and validate the IP address. Once the IP is validated and returns true, it requests the geolocation data. Or else, it will display the error message to the UI.

- index.php

```php
<?php
require_once 'lib/Request.php';
$requestModel = new Request();
$ip = $requestModel->getIpAddress();
$isValidIpAddress = $requestModel->isValidIpAddress($ip);
?>
<HTML>
<HEAD>
<TITLE>Get Geo Location by the IP address</TITLE>
<link href="assets/css/style.css" type="text/css" rel="stylesheet" />
</HEAD>
<BODY>
	<div class="txt-heading">Get Geo Location by the IP address</div>
			<?php
if ($isValidIpAddress == "") {
    echo "<div class='error'>Invalid IP address $ip</div>";
} else {
    $geoLocationData = $requestModel->getLocation($ip);
    print "<PRE>";
    print_r($geoLocationData);
    ?>
	<div id="location">
		<div class="geo-location-detail">

			<div class="row">
				<div class="form-label">
					Country Name: <?php  echo $geoLocationData['country'];?>
				</div>
			</div>
			<div class="row">
				<div class="form-label">
					Country Code: <?php   echo $geoLocationData['country_code'];?>
				</div>
			</div>
			<div class="row">
				<div class="form-label">
					Ip Address: <?php  echo $geoLocationData['ip'];?>
				</div>
			</div>
		</div>
	</div>
<?php }?>
</BODY>
</HTML>
```

### Step 2: Prepare API request to get geolocation via PHP cURL
The `getIPAddress()` function builds an if-else-if ladder of the majority of the scenario to get the non-empty IP address using the `$_SERVER` variable. Once the IP is validated and returns true, the `getLocation()` function to request the ipwhois API via cURL. The API will return a JSON response as a result. This example decodes the JSON response and parses the geolocation data to get the country details from it.

- Request.php

```php
<?php
class Request
{

    public function getIpAddress()
    {
        $ipAddress = '';
        if (! empty($_SERVER['HTTP_CLIENT_IP']) && $this->isValidIpAddress($_SERVER['HTTP_CLIENT_IP'])) {
            // check for shared ISP IP
            $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
        } else if (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // check for IPs passing through proxy servers
            // check if multiple IP addresses are set and take the first one
            $ipAddressList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            foreach ($ipAddressList as $ip) {
                if ($this->isValidIpAddress($ip)) {
                    $ipAddress = $ip;
                    break;
                }
            }
        } else if (! empty($_SERVER['HTTP_X_FORWARDED']) && $this->isValidIpAddress($_SERVER['HTTP_X_FORWARDED'])) {
            $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
        } else if (! empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && $this->isValidIpAddress($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])) {
            $ipAddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
        } else if (! empty($_SERVER['HTTP_FORWARDED_FOR']) && $this->isValidIpAddress($_SERVER['HTTP_FORWARDED_FOR'])) {
            $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
        } else if (! empty($_SERVER['HTTP_FORWARDED']) && $this->isValidIpAddress($_SERVER['HTTP_FORWARDED'])) {
            $ipAddress = $_SERVER['HTTP_FORWARDED'];
        } else if (! empty($_SERVER['REMOTE_ADDR']) && $this->isValidIpAddress($_SERVER['REMOTE_ADDR'])) {
            $ipAddress = $_SERVER['REMOTE_ADDR'];
        }
        return $ipAddress;
    }

    public function isValidIpAddress($ip)
    {
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            return false;
        }
        return true;
    }

    public function getLocation($ip)
    {
        $ch = curl_init('http://ipwhois.app/json/' . $ip);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($ch);
        curl_close($ch);
        // Decode JSON response
        $ipWhoIsResponse = json_decode($json, true);
        // Country code output, field "country_code"
        return $ipWhoIsResponse;
    }
}
```

### Country geolocation in response to an API call
The below images shows the location data with the country name and code.

![geolocation-output-2](/engineering-education/get-geolocation-by-ip-address-and-country/geolocation-output-2.jpg)

If the IP address is not a valid one, then the code will return the error message to acknowledge the user.

![geolocation-output-1](/engineering-education/get-geolocation-by-ip-address-and-country/geolocation-output-1.jpg)

### Alternate Geolocation API
These are some of the alternatives API providing services to access location data programmatically.

- GeoPlugin service allows access from PHP, ASP, JavaScript and more.
- IPinfo library to get location via token-based authentication.
- PHP supports integrating the GeoIP2 package of PECL extension to get the location data by using predefined functions. The code to get the country name from the IP address or domain name is,

```php
geoip_country_name_by_name ( $hostname );
```

### Different uses of getting Geolocation
There are more uses in order to get the geolocation of the users by the IP address.

- It gives accuracy and dependability of the location data whereas the user may enter incorrect data.
- It provides a single entry point to get the data that will be used in many places, like location-based currency convertor, shipping calculation or many more.
- To calculate the visit statistics based on the region.
- It helps to switch the language of the multilingual website content by localizing the visitors.
- To plot the users’ location on a map layer of the UI. Google Maps JavaScript API provides Geolocation services to display the location of the users and device on a map.

### Conclusion
Throughout the article you have learned how you can get geolocation data of your website. Furthermore, Geolocation data may be utilized for several reasons in this context, this may includes:
- Personalization and limitation of access to certain parts of the site.
- Restrictions on access and delivery based on topography.
- Avoiding dishonesty.
- Keeping tabs on the flow of information throughout the firm.

With what you have learned you can now get geolocation with an IP address and country like a pro!
For practice sake be sure to check the source code [here](https://github.com/Frankline012/get-geolocation-by-ip-address-and-country)

### Further reading
- [Google Maps](https://developers.google.com/maps/documentation/javascript/)

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
