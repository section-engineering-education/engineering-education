### Introduction
Static assets such as *.js*, *.CSS* and *.json* text files are commonly used in web application projects, with redundancy and compression playing an important role. ,Data compression is the process of encoding files to reduce their size, making them take up less space on your server and allowing them to be transferred to site clients more quickly. Compression reduces the amount of bandwith required for website rendering, which speeds up the process.

### Prerequisites
- Compression algorithm

### What is Brotli
Brotli is a lossless data compression algorithm that employs a variant of the *LZ77 algorithm*, as well as *Huffman coding* and *second-order context modelling*. Its compression ratio is comparable to the best general-purpose compression methods currently available.

### How Brotli works
The browser sends an `Accept-Encoding` header with the algorithms it supports and their priority order; the server chooses one, uses it to compress the body of the `content-encoding` header to inform the browser of its choice. Because content negotiation was used to select a representation based on its encoding, the server must include a vary header in the response that includes at least `Accept-encoding`; this allows caches to cache the various representations of the resource.

### Application of Brotli
There are two ways by which we can deliver Brotli compressed assets:
1. Enabling Brotli on web-server
2. Enabling Brotli on CDNs

### Compression with Nginx statically
Static compression is when assets are compressed on the disk before the user requests them, this is known as pre-compression. Compression is not perfomed when a user requests an asset. The asset is simply served from the disk after it has been compressed.
Nginx has static compression capability for Brotli. Google has provided a [module](https://github.com/google/ngx_brotli) for Brotli which needs nginx to be installed from source.
Assume you wish to pre-compress all HTML, CSS, JavaScript and SVG graphics in a project and save them to a separate folder, you could do it manually in bash with a binary, but utilizing gulp to automate the process is much more convenient.

```javaScript
const brotlicompress = () => {
    let src = "src/**/*.{html,js,css,svg}",
        dest = "dist";

    return gulp.src(src)
        .pipe(brotli.compress({
            extension: "br",
            quality: 11
        }))
        .pipe(gulp.dest(dest));
};

exports.brotlicompress = brotlicompress;
```
After that, the brotliCompress task is called as follows:
```bash
gulp brotliCompress
```
All assets matched by the file glob(provided in the source variable) will be processed, and Brotli compresssed versions will be exported to the destination directory(specified in the dest variable). *Script.js* will become *scripts.js.br*, and *style.css* will become *style.css.br* 
This is how to specify Brotli-encoded assets:
```html,css,javascript
<files *.js.br>
    AddType "text/javascript" .br
    AddEncoding br.br
</files>
<files *.css.br>
    AddType "text/css" .br
    AddEncoding br.br
</files>
<files *.svg.br>
    AddType "image/svg+xml".br
    AddEncoding br.br
</files>
<files *.html.br>
    AddType "text/html".br
    AddEncoding br.br
</files>
```
For browsers that do not understand Brotli encoding, you can also specify gzip-encoded version:

```html,css,javascript
<Files  *.js.gz>
    АddTyрe "text/jаvаsсriрt" .gz
        АddEnсоding  gz  .gz
</Files>
<Files  *.сss.gz>
        АddTyрe "text/сss" .gz
        АddEnсоding gz .gz
</Files>
<Files  *.svg.gz>
        АddTyрe  "imаge/svg+xml" .gz
        АddEnсоding  gz  .gz
</Files>
<Files  *.html.gz>
        АddTyрe  "text/html"  .gz
        АddEnсоding  gz  .gz
</Files>

```
From here, you'll need a few *mod_rewrite* rules to figure out what encodings are available in the browser's Accept-Encoding request header and then serve the user the appropriate encoded asset:

```bash
#  Turn оn mоd_rewrite
RewriteEngine  Оn

#  Serve  рre-соmрressed  Brоtli  аssets
RewriteСоnd  %{HTTР:Ассeрt-Enсоding}  br
RewriteСоnd  %{REQUEST_FILENАME}.br  -f
RewriteRule  ^(.*)$  $1.br  [L]

#  Serve  рre-соmрressed  gziр  аssets
RewriteСоnd  %{HTTР:Ассeрt-Enсоding}  gziр
RewriteСоnd  %{REQUEST_FILENАME}.gz  -f
RewriteRule  ^(.*)$  $1.gz  [L]
```
The browser will serve pre-compressed Brotli content to browsers that specify it in their Accept-Encoding request headers if these rules are followed. Other browsers will get **gzip versions** that are statically compressed. That is all there is to it.

### Streams and Brotli combination in Node.js
Streams in Node.js are objects that let you move data from one place to another over time.
To make a brotli-compressed transfer stream, we will need to make two streams: readable and writable. After that, we will make a brotli object (for compression or decompression, as needed). Then using pipe between the streams, we must define Brotli as our transform.


### Configuring with AWS CloudFront distribution
You can use AWS CloudFront to compress files of specific types automatically and offer the compressed files to viewers that support them(viewers indicate their support for compressed files with the Accept-Encoding HTTP header). The gzip and Brotli compression formats are supported by CloudFront. CloudFront uses Brotli when theviewer supports both formats.

### Conclusion
Compared to *gzip*, Brotli is a more powerful compression method. You will experience significant sie speeed improvements when you use Brotli for static content, especially in low bandwidth settings. Brotli has a lot of potential, and most of the web developers recommend that every website invest in alllowing it for a better user experience.


