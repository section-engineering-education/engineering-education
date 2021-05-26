---
layout: engineering-education
status: publish
published: true
url: /http-code-cheat-sheet/
title: HTTP Code Cheat Sheet - What You Need to Know About HTTP Requests and Responses
description: HTTP codes are important to understand, especially if you are developing a web application and are trying to debug based upon the console responses.
author: gregory-manley
date: 2020-05-25T00:00:00-07:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/http-code-cheat-sheet/hero.jpg
    alt: http cheatsheet laptop
---
If you have ever copied a link from your browser and noticed that `http://` or `https://` had been added before the domain, you are looking at the protocol used which defines how messages are formatted and transmitted. It also defines how web servers and browsers should respond to various commands.
<!--more-->

HTTP stands for HyperText Transfer Protocol and is used, or at least the variant HyperText Transfer Protocol Secure (HTTPS), for nearly every single website on the internet.

### HTTP Codes
All HTTP response codes can be separated into five categories:
*   ___1xx informational response___ - the request has been received and continuing process
*   ___2xx successful___ - the request has been received, understood, and accepted
*   ___3xx redirection___ - further action is needed in order to complete the request
*   ___4xx client error___ - the request contains bad syntax or cannot be fulfilled
*   ___5xx server error___ - the server failed to fulfill the apparently valid request

### 1xx: Information

<table>

<tbody>

<tr style="font-weight: 600">

<td style="padding-right: 30%;">Message</td>

<td>Description</td>

</tr>

<tr>

<td>100 Continue</td>

<td>The server has received the request headers and the client should proceed to send the request body providing that the request has been accepted.</td>

</tr>

<tr>

<td>101 Switching Protocols</td>

<td>The requester has asked to switch protocols and the server has agreed.</td>

</tr>

<tr>

<td>102 Processing</td>

<td>A WebDAV request may take a long time to process, since it involves file operations. This code is used to indicate that the server has received the request and is processing, but does not have a response yet.</td>

</tr>

<tr>

<td>103 Early Hints</td>

<td>This code is used to return some response headers before the final HTTP message is sent.</td>

</tr>

</tbody>

</table>

### 2xx: Success

<table>

<tbody>

<tr style="font-weight: 600">

<td style="padding-right: 30%;">Message</td>

<td>Description</td>

</tr>

<tr>

<td>200 OK</td>

<td>This is the standard response for successful HTTP requests. Code 200 means everything is okay.</td>

</tr>

<tr>

<td>201 Created</td>

<td>The fulfilled request resulted in the creation of a new resource.</td>

</tr>

<tr>

<td>202 Accepted</td>

<td>The request has been accepted for processing, but has not completed processing.</td>

</tr>

<tr>

<td>203 Non-Authoritative Information</td>

<td>The information contained in the entity header is from a local or third-party copy, not from the original.</td>

</tr>

<tr>

<td>204 No Content</td>

<td>The server successfully processed the request, but is not returning any content.</td>

</tr>

<tr>

<td>205 Reset Content</td>

<td>The requester should clear the form used for the transaction.</td>

</tr>

<tr>

<td>206 Partial Content</td>

<td>The server is only delivering part of the resource due to a range header that was sent by the client. This range header is used by HTTP clients to enable resuming interrupted downloads or split downloads in multiple simultaneous streams.</td>

</tr>

<tr>

<td>207 Multi Status</td>

<td>This code indicates that the following message body contains an XML message and can contain multiple separate response codes.</td>

</tr>

<tr>

<td>208 Already Reported</td>

<td>The members of a DAV binding were already enumerated in a previous part of the response and thus, are not being included again</td>

</tr>

<tr>

<td>226 IM Used</td>

<td>The server has fulfilled a request for the resource. The response is a representation of the result of one or more instance-manipulations that were applied to the instance.</td>

</tr>

</tbody>

</table>

### 3xx Redirection

<table>

<tbody>

<tr style="font-weight: 600">

<td style="padding-right: 30%;">Message</td>

<td>Description</td>

</tr>

<tr>

<td>300 Multiple Choices</td>

<td>A list of links, from which the requester can select one and go to it. For example, this code could be used to present multiple video formats.</td>

</tr>

<tr>

<td>301 Moved Permanently</td>

<td>The requested page has been moved permanently to a new URL.</td>

</tr>

<tr>

<td>302 Found</td>

<td>The request has been moved temporarily to a new URL.</td>

</tr>

<tr>

<td>303 See Other</td>

<td>The response can be found under another URL.</td>

</tr>

<tr>

<td>304 Not Modified</td>

<td>The response code to an If-Modified-Since or If-None-Match header where the URL has not been modified since the specified date.</td>

</tr>

<tr>

<td>305 Use Proxy</td>

<td>The requested resource is only available through a proxy, whose address is provided in the response. This code is generally disobeyed for security reasons</td>

</tr>

<tr>

<td>306 Unused</td>

<td>This code is currently unused, but was used for "Switch Proxy".</td>

</tr>

<tr>

<td>307 Temporary Redirect</td>

<td>The requested page has temporarily moved to new URL.</td>

</tr>

<tr>

<td>308 Permanent Redirect</td>

<td>The request should be repeated using another URL, but the HTTP method cannot change.</td>

</tr>

</tbody>

</table>

### 4xx Client Errors

<table>

<tbody>

<tr style="font-weight: 600">

<td style="padding-right: 30%;">Message</td>

<td>Description</td>

</tr>

<tr>

<td>400 Bad Request</td>

<td>There is an apparent client error and therefore the server cannot or will not process the request.</td>

</tr>

<tr>

<td>401 Unauthorized</td>

<td>The requested page requires a username and password.</td>

</tr>

<tr>

<td>402 Payment Required</td>

<td>This code is reserved for future use. Its original intention was to be used as a part of digital cash or micropayment system.</td>

</tr>

<tr>

<td>403 Forbidden</td>

<td>The request was understood by the server, but the server will not take action. This may be due to the user not having necessary permissions.</td>

</tr>

<tr>

<td>404 Not Found</td>

<td>The requested resource cannot be found. Most people know or have heard about this code. Most have even seen the error once or twice.</td>

</tr>

<tr>

<td>405 Method Not Allowed</td>

<td>The method is not supported for the resource. For example performing a GET request on a form that uses POST.</td>

</tr>

<tr>

<td>406 Not Acceptable</td>

<td>The server cannot generate a response that is accepted by the client.</td>

</tr>

<tr>

<td>407 Proxy Authentication Required</td>

<td>You must first authenticate with the proxy.</td>

</tr>

<tr>

<td>408 Request Timeout</td>

<td>The request took longer than the server was willingly to wait.</td>

</tr>

<tr>

<td>409 Conflict</td>

<td>This code indicates that the request could not be processed because of conflict in the current state of the resource.</td>

</tr>

<tr>

<td>410 Gone</td>

<td>The requested is no longer available.</td>

</tr>

<tr>

<td>411 Length Required</td>

<td>The request did not specify the length of its content. The server cannot accept the request without it.</td>

</tr>

<tr>

<td>412 Precondition Failed</td>

<td>The pre-condition that was given in the request evaluated to false by the server.</td>

</tr>

<tr>

<td>413 Request Entity Too Large</td>

<td>Since the request entity is too large, the server will not accept the request.</td>

</tr>

<tr>

<td>414 Request-url Too Long</td>

<td>The requested URL was too long for the server to process.</td>

</tr>

<tr>

<td>415 Unsupported Media Type</td>

<td>The server will not accept the request since the mediatype is not supported.</td>

</tr>

<tr>

<td>416 Request Range Not Satisfiable</td>

<td>The client has asked for a portion of the file, but the server cannot provide that portion.</td>

</tr>

<tr>

<td>417 Expectation Failed</td>

<td>The server cannot meet the requirement given by the Expect request-header field.</td>

</tr>

<tr>

<td>418 I'm a teapot</td>

<td>This code was introduced as an April Fools' joke. It is currently unexpected to be implemented by actual servers.</td>

</tr>

<tr>

<td>421 Misdirected Request</td>

<td>The request was directed to a server that is not able to produce a response.</td>

</tr>

<tr>

<td>422 Unprocessable Entity</td>

<td>The request was well-formed but the server was unable to follow due to semantic errors.</td>

</tr>

<tr>

<td>423 Locked</td>

<td>The resource that is being accessed is locked.</td>

</tr>

<tr>

<td>424 Failed Dependency</td>

<td>The request failed because the request it depended upon failed.</td>

</tr>

<tr>

<td>425 Too Early</td>

<td>The server is unwilling to process a request that might be replayed later.</td>

</tr>

<tr>

<td>426 Upgrade Required</td>

<td>The client should switch to a different protocol that is given in the Upgrade header field.</td>

</tr>

<tr>

<td>428 Precondition Required</td>

<td>The origin server requires the client request to be conditional.</td>

</tr>

<tr>

<td>429 Too Many Requests</td>

<td>The client has sent too many request in a given amount of time.</td>

</tr>

<tr>

<td>431 Request Header Fields Too Large</td>

<td>The server refuses to process the client requests because the request's HTTP headers are too long.</td>

</tr>

<tr>

<td>451 Unavailable for Legal Reasons</td>

<td>This indicates that the requested resource is not available due to legal reasons.</td>

</tr>

</tbody>

</table>

### 5xx Server Errors

<table>

<tbody>

<tr style="font-weight: 600">

<td style="padding-right: 30%;">Message</td>

<td>Description</td>

</tr>

<tr>

<td>500 Internal Server Error</td>

<td>This code indicates that the server experienced an unexpected condition which prevented it from fulfilling the request.</td>

</tr>

<tr>

<td>501 Not Implemented</td>

<td>The server did not recognize the request method or is unable to fulfill the request.</td>

</tr>

<tr>

<td>502 Bad Gateway</td>

<td>The server, while acting as either a gateway or proxy, has received an invalid response from the upstream server.</td>

</tr>

<tr>

<td>503 Service Unavailable</td>

<td>The server cannot handle the request.</td>

</tr>

<tr>

<td>504 Gateway Timeout</td>

<td>The server, while acting as either a gateway or proxy, did not receive a timely response from the upstream server.</td>

</tr>

<tr>

<td>505 HTTP Version Not Supported</td>

<td>The client HTTP protocol version used in the request is not supported by the server.</td>

</tr>

<tr>

<td>506 Variant Also Negotiates</td>

<td>The server encountered an internal configuration error in which the chosen variant is configured to engage in content negotiation.</td>

</tr>

<tr>

<td>507 Insufficient Storage</td>

<td>This indicates that the server cannot perform the request as the server cannot store the representation needed to complete the request.</td>

</tr>

<tr>

<td>508 Loop Detected</td>

<td>While processing the request, the server detected an infinite loop.</td>

</tr>

<tr>

<td>510 Not Extended</td>

<td>The request needed further extensions for the server to fulfill it.</td>

</tr>

<tr>

<td>511 Network Authentication Required</td>

<td>The client needs to authenticate to gain network access. This code is not sent by the origin server, however it is generated by intercepting proxies that control access to the network.</td>

</tr>

</tbody>

</table>

### HTTP unassigned codes
There are many HTTP codes that are unassigned. Some of them may be introduced in later revisions. Even with the limited amount of currently assigned codes, some people may never see many of these codes. Many end-users, however, may be familiar with 404 and 500 as they have an auto-generated error page.

HTTP codes are important to understand, especially if you are developing a web application and are trying to debug based upon the console responses. Knowing these codes came in handy while I was working on my website and forgot to allow methods through the function. This returned a 501 code, allowing me to easily find my mistake. Hopefully this guide of codes can help you!
