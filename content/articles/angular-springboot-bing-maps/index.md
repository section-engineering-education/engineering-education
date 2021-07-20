---
layout: engineering-education
status: publish
published: true
url: /angular-springboot-bing-maps/
title: Integrating Bing Maps in a Spring Boot Application Using Angular
description: We often find ourselves in a position to integrate maps in our applications. This tutorial will show you how to integrate `Bing Maps` with Angular, Spring Boot, and relational databases.
author: owino-wendy
date: 2021-07-16T00:00:00-10:55
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/angular-springboot-bing-maps/hero.jpg
    alt: Bing Maps Image Example
---

We often find ourselves in a position to integrate maps in our applications. This tutorial will show you how to integrate `Bing Maps` with Angular, Spring Boot, and relational databases.
<!--more-->
Users will be able to play around with the map to show different site properties at different times.

### Table of contents
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Setting up the project backend](#setting-up-the-project-backend)
- [Setting up the frontend for Bing map](#setting-up-the-frontend-for-bing-map)
- [Conclusion](#conclusion)

### Objectives
This tutorial will walk you through everything you need to know about [MS Bing Maps](https://www.bing.com/maps/), how to integrate it using Angular 11, Spring Boot backend, and H2/Postgres relational databases.

### Prerequisites
To follow this article, you'll need to have;
- Basic knowledge of Angular, especially designing RESTful endpoints.
- Background knowledge of using the [Spring Boot framework](https://spring.io/projects/spring-boot).
- Java Persistence API(JPA) for persisting data between Java objects and relational databases.
- Bing maps portal [account](https://www.bingmapsportal.com) to generate API keys for our application maps.
- Basic [liquibase](https://www.liquibase.org) knowledge.

> It's also important to note that this is not an introductory tutorial to Angular and Spring Boot. To follow along this tutorial, you should have an application up and running. Additionally, you can clone the source code from my [GitHub](https://github.com/owinowendy/AngularAndSpringWithMaps) repository.

### Setting up the project backend
Since we will need a database for this project, we are going load our data from [liquibase](https://www.liquibase.org) for [testing](https://sadalage.com/post/using-liquibase-to-load-data-and-ignore-some-columns/).

We will also create a repository that will be used to set different dates to filter data. For example, if we need data for 2010, we set it there and so on.

Let's look at an example:

```Java
// defining how to retrieve site data from a repo
public interface SiteRepository extends JpaRepository<Site, Long>{
 @Query("select cs from CompanySite cs where lower(cs.title) like %:title% and cs.atDate >= :from and cs.atDate <= :to")
 List<Site> findByTitleFromTo(@Param("title") String title, @Param("from") LocalDate from,  @Param("to") LocalDate to);
}
```

In the above snippet, we query data from our database to retrieve the `name` and the `date`.

With this repository, we can create a service to load the data as shown below:

```Java
public Collection<Site> findSiteByTitleAndYear(String title, Long year) {
  if (title == null || title.length() < 2) {
   return List.of();
  }
  // define beginning year of type LocalDate and endOfYear
  LocalDate beginOfYear = LocalDate.of(year.intValue(), 1, 1);
  LocalDate endOfYear = LocalDate.of(year.intValue(), 12, 31);
  //return the result
  return this.SiteRepository.findByTitleFromTo(title.toLowerCase(), beginOfYear, endOfYear);
 }
```

Now that we've defined our repository and services, we can proceed to create a controller and design our RESTful endpoints for the application.

```Java
// in this section, we inject the previously created service in the controller
public SiteController(SiteService SiteService, EntityDtoMapper entityDtoMapper) {
  this.SiteService = SiteService;
  this.entityDtoMapper = entityDtoMapper;
 }
 // RequestMapping to get api data
 @RequestMapping(value = "/title/{title}/year/{year}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
 public ResponseEntity<List<SiteDto>> getSiteByTitle(@PathVariable("title") String title,
   @PathVariable("year") Long year) {
  List<CSiteDto> SiteDtos = this.SiteService.findSiteByTitleAndYear(title, year)
    .stream().map(Site -> this.entityDtoMapper.mapToDto(Site)).collect(Collectors.toList());
  return new ResponseEntity<List<SiteDto>>(SiteDtos, HttpStatus.OK);
 }
```

In the above code, we import the service and inject it into our controller.

We then proceed to define our RESTful endpoints using the `RequestMapping` annotation. We return the result using the `ResponseEntity` with a HTTP status of `200` i.e `OK`.

Do not forget to update the `application.properties` as shown below:

```bash
bing.maps-key=${BINGMAPKEY:AlqIk2T-YourBingKey}
```

Get the complete backend code [here](https://github.com/owinowendy/AngularAndSpringWithMaps).

### Setting up the frontend for Bing map
This part assumes you have gone through the documentation of Bing maps. Otherwise, get the full tutorial [here](https://www.bingmapsportal.com/Announcement?redirect=True).

This frontend is designed using the [Angular Material](https://material.angular.io) to display locations and properties as shown below:

![bing map application screenshot](/engineering-education/angular-springboot-bing-maps/forms.png)

Let's add the `HTML` content that we will use to display the Bing map for our site.

```html
<div>
  <!-- the form fields(inputs)-->
  <div>
    <!-- BEGIN company site input field-->
    <mat-form-field class="example-full-width">
      <input
        type="text"
        placeholder="Pick one"
        aria-label="Number"
        matInput
        formControlName="{{COMPANY_SITE}}"
        [matAutocomplete]="auto"
      />
      <!-- this is a material feature for input autocomplete -->
      <mat-autocomplete
        autoActiveFirstOption
        #auto="matAutocomplete"
        [displayWith]="displayTitle"
      >
        <mat-option
          *ngFor="let option of companySiteOptions | async"
          [value]="option"
        >
          {{option.title}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>
  <!-- END company site input field-->
  <div>
    <!-- BEGIN year slider -->
    <mat-slider
      class="my-slider"
      thumbLabel
      [displayWith]="formatLabel"
      step="10"
      min="1970"
      max="2020"
      formControlName="{{SLIDER_YEAR}}"
    >
    </mat-slider>
    <span class="my-year" i18n="@@companysite.slideryear">
      Year: {{ componentForm.get('sliderYear').value }}</span
    >
  </div>
  <!-- END year slider -->
</div>
```

In the above markup, we use the Angular Material to design our page layout, starting with the `company site` input which has an autocomplete feature and an output field for `year slider`.

It's important to note that the Angular form group in the above HTML won't work until we define it in the `ts` file as shown below:

```Javascript
//manipulte DOM elements
 bingMapContainer: ElementRef;
//get new locations
 newLocations: NewLocation[] = [];
 map: Microsoft.Maps.Map = null;
 resetInProgress = false;
//an observable to get company options
 companySiteOptions: Observable<CompanySite[]>;
    //a form builder for reactive forms
 componentForm = this.formBuilder.group({
  companySite: ['Finkenwerder', Validators.required],
  sliderYear: [2020],
  property: ['add Property', Validators.required]
 });
```

In the above code, we define `bingMapContainer` to wrap our DOM elements to inject the map. We've also added the form builder to create reactive forms for our Bing application.

Get the complete frontend code in [this](https://github.com/owinowendy/AngularAndSpringWithMaps) GitHub repository.

### Conclusion
In this tutorial, we have built an Angular 11 project with Spring Boot and a JPA H2 database. We have seen how to integrate Bing Maps into the application and display them on the browser.

You can clone the project and test its functionality. The project is configured to use Gradle which may take a while to build as well as Kubernetes and docker.

![Full application Screenshot](/engineering-education/angular-springboot-bing-maps/full-app.png)

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
