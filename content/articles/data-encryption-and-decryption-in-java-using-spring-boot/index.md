# Data Encryption/Decryption of Request/Response in Java using Spring Boot

Encryption is a mechanism applied in many facets of life, which ensures that data being transmitted is enciphered and kept sealed, secured against prying, unwanted eyes. On the one end of the communication channel, the message being sent is encrypted such that only the person, on the other end of this channel, and for whom this message is meant, can decipher this cryptic message and get the actual content intended for him.

In software engineering, owing to the growing cases of sniffing and security vulnerabilities, it has become even more essential for encryption and decryption to take centre stage in data and message exchange over a network – local or internet-based; especially over HTTP.

In this article, we will learn data encryption and decryption in Spring Boot by building a gateway to intercept requests as they come in and does same to responses before they go out.

### Table of Contents

This tutorial will touch:
- Encryption and Decryption Algorithms – Symmetric vs Asymmetric
- Gateway vs In-Method
- Advantages of using a gateway
- Implementing the gateway
- Testing the gateway
- Conclusion

### Prerequisites

To make the most of this tutorial, it is required to have:
- Intermediate knowledge of Java
- A running client project which we will interact with behind gateway
- Familiarity with Spring Boot framework
- Familiarity with microservices
- Intellij Professional Code editor installed

#### Encryption and Decryption Algorithms – Symmetric vs Asymmetric

Two approaches in the data security space – Symmetric and Asymmetric Encryption and Decryption. The easiest kind of encryption, Symmetric Encryption uses a single key to encrypt and decrypt data. This is a security concern because all of the parties involved in the data exchange would have to pass that single key around for them to be able to both encrypt and decrypt transmitted data. Asymmetric Encryption is more recent and proves to be more secure. It uses a pair of keys – public and private keys - to protect data. The public key is used to encrypt data, while the secret key decrypts it. The public key is shared over the network for whomever might want to send data while the private key is kept secret key by only you, the recipient of data. Asymmetric approach is better in enduring the safety of data during communication transmission.

Gateway vs In-Method

![Gateway description](/engineering-education/data-encryption-and-decryption-in-java-using-Spring-Boot/encrypter.jpg)

In reality, a gateway is an access route that leading somewhere. This route can be open or closed. In technical terms, gateways are devices that connect different networks. In this gateway, entries and exits are centrally screened before permitted.

In-method approach implies that every method (or request) coming from the sending party must come with the key, which is used to encrypt the data. This system is less appealing because keys will have to be passed around in the code.

#### Advantages of Using a Gateway

- This will reduce the amount of effort needed to modify, test and deploy them, since the code is located in one place.
- The point above ensures that the entire code is clearer and more understandable
- Separation of concern. No one has to know about data authentication or encryption, they only focus on what they have todo while the gateway is maintained by someone else.

### Implementing the Gateway

#### The Target Application
To create a Spring boot maven application, please check the Section.io catalogue. In this target project, we will have two classes: a model and a controller
The model is simple and shown below:

```java
import lombok.Data;

@Data
public class Pupil {
private String firstName;
    private int age;
}
```

The controller

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class PupilController {

@PostMapping("check-eligibility")
public ResponseEntity<String>checkAge(@RequestBody Pupil pupil) {
if (pupil.getAge() <= 16) {
return new ResponseEntity<>("The child is not eligible for a license", HttpStatus.BAD_REQUEST);
}
else {
return new ResponseEntity<>("The child is eligible for a license", HttpStatus.OK);
    }
  }
}
```
The application.properties file to indicate the port we want this target service to run on
```java
server.port=8009
```

Run the application using postman with the endpoint in the controller, as displayed in the image below:
![Target Service running in Postman] Look for the image on Linux and add here

### EncryptDecrypt Helper

First, create a helper class, let’s call it the EncryptDecryptHelper class. ED stands for EncryptionDecryption. This class would serve to provide methods for encrypting and decrypting requests and responses respectively. This helper class can be more robust, as this is just a sample. This is written on its own so it can be modified as required and can also be configured to be a bean

```java
@Slf4j
public class EncryptDecryptHelper {
	private static final String SECRET_KEY = "Thisisatestkeyfortesting";
	private static SecretKeySpec secretKey;
	private static byte[] key;
	public static String encrypt(String strToEncrypt){
		return encrypt(strToEncrypt, SECRET_KEY);
	}
	public static String decrypt(String strToDecrypt){
		return decrypt(strToDecrypt, SECRET_KEY);
	}
	public static void setKey(String myKey)
	{
		MessageDigest sha = null;
		try {
			key = myKey.getBytes("UTF-8");
			sha = MessageDigest.getInstance("SHA-1");
			key = sha.digest(key);
			key = Arrays.copyOf(key, 16);
			secretKey = new SecretKeySpec(key, "AES");
		}
		catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {e.printStackTrace();}
	}

	public static String encrypt(String payload, String secret)
	{
		try
		{
			setKey(secret);
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
			return Base64.getEncoder().encodeToString(cipher.doFinal(payload.getBytes("UTF-8")));
		}
		catch (Exception e)
		{System.out.println("Error while encrypting: "+ e.toString());}
		return null;
	}

	public static String decrypt(String strToDecrypt, String secret)
	{
		try {
			setKey(secret);
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey);
			return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
		}
		catch (Exception e) {System.out.println("Error while decrypting: "+ e.toString());}
		return null;
	}

	public static void main(String[] args) {
		String key = "Thisisatestkeyfortesting";
		String data = "{\n"
				+ "\"name\": \"TestTitle1\",\n"
				+ "\"age\": \"10\"\n"
				+ "}";
		System.out.println("Original String: "+ data);
		String encryptedString = EncryptDecryptHelper.encrypt(data, key);
		System.out.println("Encrypted String: "+ encryptedString);
		String decryptedString = EncryptDecryptHelper.decrypt(encryptedString, key);
		System.out.println("Decrypted String: "+ decryptedString);
		String response = EncryptDecryptHelper.decrypt("xwTmmBs8P2hsGLUe/7h6CQ==", key);
		System.out.println("Decrypted response :"+ response);
	}


	public static MultiValueMap<String, String>convertJsonToQueryParamMap(String json ) {
		MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
		ObjectMapper mapper = new ObjectMapper();
		JsonNode jsonNode = null;
		try {jsonNode = mapper.readTree(json);}
		catch (JsonProcessingException e) {e.printStackTrace();}
		Iterator<Map.Entry<String, JsonNode>> fields = jsonNode.fields();
		while ( fields.hasNext() ){Map.Entry<String, JsonNode> entry = fields.next();
			multiValueMap.add(entry.getKey(), entry.getValue().asText());
		}
		return multiValueMap;
	}
}
```
### EncryptDecrypt Filter

For us to build the gateway filter, using Spring Cloud Gateway, we implement the `AbstractGatewayFilterFactory`. The Config class offers a means for passing needed parameters to this filter.

```java
@Component
public class EncryptDecryptFilter extends AbstractGatewayFilterFactory<EncryptDecryptFilter.Config> {
	private final Map<String, MessageBodyDecoder>messageBodyDecoders;
	private final Map<String, MessageBodyEncoder>messageBodyEncoders;
	public EncryptDecryptFilter(Set<MessageBodyDecoder> messageBodyDecoders,
Set<MessageBodyEncoder> messageBodyEncoders){
		super(Config.class);
		this.messageBodyDecoders = messageBodyDecoders.stream()
				.collect(Collectors.toMap(MessageBodyDecoder::encodingType, identity()));
		this.messageBodyEncoders = messageBodyEncoders.stream()
				.collect(Collectors.toMap(MessageBodyEncoder::encodingType, identity()));
	}

	@Override
	public GatewayFilter apply(Config config) {
		return new OrderedGatewayFilter( (exchange, chain) -> {
				System.out.println("Applying encrypt-decrypt filter");
				return DataBufferUtils.join(exchange.getRequest().getBody()).flatMap(dataBuffer -> {
					ServerHttpRequest mutatedHttpRequest = getServerHttpRequest(exchange, dataBuffer);
					ServerHttpResponse mutatedHttpResponse = getServerHttpResponse(exchange);
					return chain.filter(exchange.mutate().request(mutatedHttpRequest).response(mutatedHttpResponse).build());
				});
		}, -2);
	}

	private ServerHttpRequest getServerHttpRequest(ServerWebExchange exchange, DataBuffer dataBuffer) {
		DataBufferUtils.retain(dataBuffer);
		Flux<DataBuffer> cachedFlux = Flux.defer(() -> Flux.just(dataBuffer.slice(0, dataBuffer.readableByteCount())));
		String body = toRaw(cachedFlux);
		String decryptedBody = EncryptDecryptHelper.decrypt(body);
		byte[] decryptedBodyBytes = decryptedBody.getBytes(StandardCharsets.UTF_8);
		return new ServerHttpRequestDecorator(exchange.getRequest()) {
			@Override
			public HttpHeaders getHeaders(){
				HttpHeaders httpHeaders = new HttpHeaders();
				httpHeaders.putAll(exchange.getRequest().getHeaders());
				if (decryptedBodyBytes.length >0) {httpHeaders.setContentLength(decryptedBodyBytes.length);}
				httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
				return httpHeaders;
			}


			@Override
			public Flux<DataBuffer>getBody() {
				return Flux.just(body).
						map(s -> {return new DefaultDataBufferFactory().wrap(decryptedBodyBytes);});
			}
		};
	}

	private ServerHttpResponse getServerHttpResponse(ServerWebExchange exchange) {
		ServerHttpResponse originalResponse = exchange.getResponse();
		return new ServerHttpResponseDecorator(originalResponse) {
			@Override
			public Mono<Void>writeWith(Publisher<? extends DataBuffer> body) {
				HttpHeaders httpHeaders = new HttpHeaders();
				httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE);
				httpHeaders.set(HttpHeaders.CONTENT_ENCODING, "application/octet-stream");
				ClientResponse clientResponse = prepareClientResponse(body, httpHeaders);
				Mono<String> modifiedBody = extractBody(exchange, clientResponse)
						.flatMap( originalBody -> Mono.just(Objects.requireNonNull(EncryptDecryptHelper.encrypt(originalBody))))
						.switchIfEmpty(Mono.empty());
				BodyInserter<Mono<String>, ReactiveHttpOutputMessage> bodyInserter = BodyInserters.fromPublisher(modifiedBody, String.class);
				CachedBodyOutputMessage outputMessage = new CachedBodyOutputMessage(exchange,
						exchange.getResponse().getHeaders());
				return bodyInserter.insert(outputMessage, new BodyInserterContext())
						.then(Mono.defer(() -> {
							Mono<DataBuffer> messageBody = updateBody(getDelegate(), outputMessage);
							HttpHeaders headers = getDelegate().getHeaders();
							headers.setContentType(MediaType.TEXT_PLAIN);
							if (headers.containsKey(HttpHeaders.CONTENT_LENGTH)) {
								messageBody = messageBody.doOnNext(data -> {
									headers.setContentLength(data.readableByteCount());
								});
							}
							return getDelegate().writeWith(messageBody);
						}));
			}

			private Mono<String>extractBody(ServerWebExchange exchange1, ClientResponse clientResponse) {
				List<String> encodingHeaders = exchange.getResponse().getHeaders()
						.getOrEmpty(HttpHeaders.CONTENT_ENCODING);
				for (String encoding : encodingHeaders) {
					MessageBodyDecoder decoder = messageBodyDecoders.get(encoding);
					if (decoder != null) {
						return clientResponse.bodyToMono(byte[].class)
								.publishOn(Schedulers.parallel()).map(decoder::decode)
								.map(bytes ->exchange.getResponse().bufferFactory()
										.wrap(bytes))
								.map(buffer -> prepareClientResponse(Mono.just(buffer),
										exchange.getResponse().getHeaders()))
								.flatMap(response -> response.bodyToMono(String.class));
					}
				}
				return clientResponse.bodyToMono(String.class);
			}

			private Mono<DataBuffer>updateBody(ServerHttpResponse httpResponse,
					CachedBodyOutputMessage message) {
				Mono<DataBuffer> response = DataBufferUtils.join(message.getBody());
				List<String> encodingHeaders = httpResponse.getHeaders()
						.getOrEmpty(HttpHeaders.CONTENT_ENCODING);
				for (String encoding : encodingHeaders) {
					MessageBodyEncoder encoder = messageBodyEncoders.get(encoding);
					if (encoder != null) {
						DataBufferFactory dataBufferFactory = httpResponse.bufferFactory();
						response = response.publishOn(Schedulers.parallel())
								.map(encoder::encode).map(dataBufferFactory::wrap);
						break;
					}
				}
				return response;
			}

			private ClientResponse prepareClientResponse(Publisher<? extends DataBuffer> body, HttpHeaders httpHeaders) {
				ClientResponse.Builder builder = ClientResponse.create(exchange.getResponse().getStatusCode(),
						HandlerStrategies.withDefaults().messageReaders());
				return builder.headers(headers -> headers.putAll(httpHeaders)).body(Flux.from(body)).build();
			}
		};
	}

	private static String toRaw(Flux<DataBuffer> body) {
		AtomicReference<String> rawRef = new AtomicReference<>();
		body.subscribe(buffer -> {
			byte[] bytes = new byte[buffer.readableByteCount()];
			buffer.read(bytes);
			DataBufferUtils.release(buffer);
			rawRef.set(Strings.fromUTF8ByteArray(bytes));
		});
		return rawRef.get();
	}

	public static class Config {
		public Config() {
		}
	}
}
```

Our gateway’s constructor filter accepts two arguments, a pair of sets of  `MessageBodyDecoder` and `MessageBodyEncoder`, to parse requests and build a response

#### Ordering the filter
It is vital to order the filter, especially if we want requests and responses filtered. This filter should be applied after the  `NettyRewriteResponseFilter`, which has a `filter order` of -1. Consequently, our filter would take a lower number, say -2, and it can now modify responses. Without this, our filter will not work as expected.

#### Request Decryption
For us to decrypt the incoming request, extract the request body from `Flux<DataBuffer>`, create a cached flux from it and parse the request body. After this, decrypt using the `EncryptDecryptHelper` and create a `ServerHttpRequestDecorator` object to create a new request from the modified body.

#### Response Encryption
Encrypting response is inspired from Spring’s provision of `ModifyResponseGateway`. Like the request, we first extract the response so as to be able to encrypt it. We create a `ServerHttpResponseDecorator` object and override the `writeWith` method. Create a `ClientResponse` model to hold both the body and the headers. Then, extract the body and encrypt it using the `EncryptDecryptHelper` class.

The `extractBody` method considers the message body being injected while building the filter. If decorators are found, the are used to decode the body buffer. Once there is a body, an instance of `BodyInserter` class helps us create an updates response

The `updateBody` method also takes into consideration the message body encoders and uses them to encode the outgoing response appropriately. The created `ServerHttpResponseDecorator` is then used to update the exchange and passed through the chain for further filters to be applied. This completes the filter as both the request and response have been mutated.

### Configuration

We configure the gateway filter in the `application.properties` (or `application.yaml`) file, depending on which is more convenient. The code snippet below shows the needed configuration:

```java
server:
port: 8080

spring:
cloud:
gateway:
default-filters:
        - name: EncryptDecryptFilter

routes:
        - id: eligibility_service
          uri: http://localhost:8009/
          predicates:
            - Path=/check-eligibility
```

Above, a new route eligibility_service is created leading to the target url; http://localhost:8009, which is the base url for our target service project. The new route can be named with anything
Requests are intercepted by the `EncryptDecryptFilter`. The body is extracted, decrypted and passed on to `Rewrite` command, which transforms the URL to `/check-eligibility` and pushes the request. The target service responds and this response is again intercepted by the `EncryptDecryptFilter`, encrypted and passed to the client.

### Testing

For us to test this filter, we need to ensure that out target service is running. Start the Gateway via the GatewayApplication class, run the sample request through the main method in the `EncryptDecryptHelper` class. Let’s test out our gateway now.

```java
public static void main(String[] args) {
    String key = "Thisisatestkeyfortesting";
    String data = "{\n"
                    + " \"firstName\": \"Student\",\n"
                    + " \"age\": \"10\"\n"
                    + "}";
                System.out.println("Original String: " + data);
                String encryptedString = EncryptDecryptHelper.encrypt(data, key);
                System.out.println("Encrypted String: " + encryptedString);
            }
```

The result is displayed below:
![Pre-Response Output](/engineering-education/data-encryption-and-decryption-in-java-using-Spring-Boot/Preresponse.jpg)

You see that we made a similar request to the request body expected by our target service and beneath this request is the encrypted request, returned as a string. Copy this string; it is time to go over to postman. On postman, the method will be post (because the target service states a post method). The URL, instead of conforming to the target service’s 8009, will conform to the gateway’s 8081. The configuration takes care of the rest for us, in terms of routing. Send this and get the encrypted response from the gateway. The body is a raw text.
Click the send button and you will see a string displayed in the response pane.

![Postman Output](/engineering-education/data-encryption-and-decryption-in-java-using-Spring-Boot/postman.jpg)


To see what this response is, let’s go back to the code and copy this response string from postman and paste in the main method’s decrypt line as shown below.

```java
public static void main(String[] args) {
        String key = "Thisisatestkeyfortesting";
                String data = "{\n"
                + " \"firstName\": \"Student\",\n"
                + " \"age\": \"10\"\n"
                + "}";
            System.out.println("Original String: " + data);
            String encryptedString = EncryptDecryptHelper.encrypt(data, key);
            System.out.println("Encrypted String: " + encryptedString);
            String decryptedString = EncryptDecryptHelper.decrypt(encryptedString, key);
            System.out.println("Decrypted String: " + decryptedString);
            String response = EncryptDecryptHelper.decrypt("XFul3hGceClqej22UAFkHp9qf9QBuWrQKILMHUj7sE98crIruc5lwcDKIU8lm4f5", key);
            System.out.println("Decrypted response :" + response);
        }
```

Run this main method and you will see the decrypted response sent by the target service.

![Postman Response](/engineering-education/data-encryption-and-decryption-in-java-using-Spring-Boot/postpostman.jpg)

This time, we see the raw request, the encrypted request and the decrypted response, which corresponds to what we expect from the target service.

### Conclusion
Gateways are crucial for data security. In this tutorial, we built a lightweight gateway to decrypt requests and encrypt responses. The full code for the target application can be found here: [Target Application](https://github.com/teevyne/gateway-target) and the gateway itself can be found here: [Gateway Project](https://github.com/teevyne/gateway).

I hope you found this useful. Keep coding; change the world!
Thank you

### Further reading
- https://www.trentonsystems.com/blog/symmetric-vs-asymmetric-encryption
- https://www.baeldung.com/java-aes-encryption-decryption
- https://www.baeldung.com/java-rsa
