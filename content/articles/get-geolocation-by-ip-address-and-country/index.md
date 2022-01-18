### Introduction

Is your website requesting the customers to submit their nationality or other location related data? if so, it is better to retrieve it automatically by using a geolocation API. For my digital product shop, I used a popular geolocation API service to collect the clients' whereabouts. It's usually a good idea to make data entry easier for the end user. We should make them happy by making the process as painless as possible. We'll look at how to get geolocation using an IP address and a country name and code. It’s a two step process where the step1 is to get the IP address and the step 2 is to get the geolocation.

### Table of content

- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Geolocation Marketing for Business](#geolocation-marketing-for-business)
- [Different uses of getting Geolocation](#different-uses-of-getting-geolocation)
- [Get and validate current IP address](#get-and-validate-current-ip-address)
- [Prepare API request to get geolocation via PHP cURL](#prepare-api-request-to-get-geolocation-via-php-curl)
- [country geolocation in response to an API call](#country-geolocation-in-response-to-an-api-call)
- [Alternate Geolocation API](#alternate-geolocation-api)
- [Conclusion](#conclusion)
  - [Further reading](#further-reading)

### Prerequisites

- Fundamentals of PHP

### Objectives

> After completing this model, students should know the major principles of geolocation.

- Get the current IP address.
- Get the area using the PHP cURL API.
- Different uses of getting Geolocation
- How to enable/disable Geolocation API.

### Geolocation Marketing for Business

- Customizing and delivering material (e.g., truck area and manifest status)
- Suit and administrative e-disclosure
- Autonomous vehicles
- Coercion recognition and forecasting using IP area technology and misrepresentation profile data
- Constant geolocation progress of logs and other IT information
  > Businesses need a geolocation and mobile technology. With cross-platform mobile applications, companies may combine location with online media and other data to generate superior services.

### Different uses of getting Geolocation

There are more uses for getting the geolocation of the users by the IP address.

- It gives accuracy and dependability of the location data whereas the user may enter wrong data.
- It provides a single entry point to get the data that will be used in many places, like location-based currency convertor, shipping calculation or many.
- To calculate the visit statistics based on the region.
- It helps to switch the language of the multilingual website content by localizing the visitors.
- To plot the users’ location on a map layer of the UI. Google Maps JavaScript API provides Geolocation services to display the location of the users and device on a map.

### Get and validate current IP address

This is the home page code which contains the HTML code to acknowledge users with the current geolocation data. It imports the location service class invokes the methods to get and validate the IP address. Once the IP is validated and returns true, it requests the geolocation data. Or else, it will display the error message to the UI.

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

### Prepare API request to get geolocation via PHP cURL

The `getIPAddress()` function builds an if-else-if ladder of the majority of the scenario to get the non-empty IP address using the `$_SERVER` variable. Once the IP is validated and returns true, the `getLocation()` function to request the ipwhois API via cURL. The API will return a JSON response as a result. This example decodes the JSON response and parses the geolocation data to get the country details from it.

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

### country geolocation in response to an API call

The below images show the location data with the country name, code.

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

### Conclusion

> Your customers' actual location is available at all times thanks to geolocation, which can be used on any Internet-connected device. Geolocation data may be utilized for several reasons in this context, including:

- Personalization and limitation of access to certain parts of the site
- Restrictions on access and delivery based on topography.
- Avoiding dishonesty.
- Keeping tabs on the flow of information throughout the firm.

#### Further reading

- [Google Maps](https://developers.google.com/maps/documentation/javascript/)

Happy Coding!
