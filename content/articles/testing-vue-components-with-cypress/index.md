### Introdution
Cypress is a front-end testing tool that is fully based on JavaScript and is tailored to today's web. Its purpose is to make testing an application less complex for developers and quality assurance experts. Cypress is a more developer-friendly tool that uses a unique **DOM** manipulation method and operates directly in the browser, making it easier to use.

Vue Test Utils, the official low-level component testing framework, allows users to access Vue-specific APIs. For individuals new to testing Vue apps, Vue Testing Library, an abstraction over Vue Test Utils, is suggested.
In this tutorial, am going to talk more about how we can test Vue Components With Cypress.

### Table of content
- [Introdution](#introdution)
- [Table of content](#table-of-content)
- [Overview of what is a component test file](#overview-of-what-is-a-component-test-file)
- [Testing components](#testing-components)
- [How vue components tests work with and without cypress](#how-vue-components-tests-work-with-and-without-cypress)
- [Vuetify importation](#vuetify-importation)
- [Adding Vuetify's needed characteristics](#adding-vuetifys-needed-characteristics)
- [How can we get the specification files?](#how-can-we-get-the-specification-files)
- [Command file conflict](#command-file-conflict)
- [How to access the Vue Test Utils wrapper](#how-to-access-the-vue-test-utils-wrapper)
- [Conclusion](#conclusion)

### Overview of what is a component test file
 Component testing; as the name recommends, is a strategy of testing the most reduced or the littlest unit of any application. Part testing at times is likewise alluded to as Program or Module Testing. An application can be thought about a mix and combination of numerous little individual modules

Here's an illustration of a Cypress components test that includes some of the aspects we'll go through:

```javascript
import { mount } from '@cypress/vue'; // include the mount method from vue-test-utils
import PrivatePoliteNote from './PrivatePoliteNote.vue'; 
describe('PrivatePoliteNote', () => {
 
 it('gives that topic', () => {
    
    mount(PrivatePoliteNote); 
    
    // certify that certain text is present at the appropriate header level
    cy.contain('h01', 'Private Polite').should('be.viable'); 
  });

  it('whenever the confirm button is pressed, it triggers the "confirm" event.', () => {
    
    mount(PrivatePoliteNote);

    
    cy.contain('button', '/^OK/') // locate a button object with the label OK on it.
    .click() 
    .vue() 
    .then((wrapper) => {
      
      expect(wrapper.emitted('confirm')).to.have.length(01) 
      
    });
  });

});
```

Some of the comments concern the user interface, while others concern the developer interface.
As a developer, we will verify what events are emitted whenever we wish to target particular elements with their appropriate text content for the `UI`. This also means that we'll be testing the component to make sure it's produced correctly by Vue.

Let's take a step back and look at how this fits into our broader testing strategy. These words have a variety of meanings. From our small codebase, these are outlined below.

- When an engineer does a unit test, single capacities ought to proceed as planned. 

- Component assessments Individual UI parts ought to be introduced in seclusion and tried to guarantee that they proceed as expected when utilized by an engineer and a client.
- Test from beginning to completion. 
- Finally, mix testing is an ambiguous term since it might happen at any level, a unit that imports different capacities, a part that imports different parts, or even a end-to-end test that taunts API reactions however doesn't arrive at the information base, these are examples of intergration tests.They look at the interoperability of various parts of a program, yet not the whole application.

### Testing components

- Who will use a piece of code and what the agreement with that individual is characterize by  many testing levels. Therefore, a capacity that arranges the time ought to consistently return the right yield if we supply a legitimate date item, and it should deliver clear blunders on the off chance that you offer something different. These are things we can confirm by running the capacity all alone and ensuring it works in a scope of situations, paying little mind to the UI. 

- The 'engineer interface' of a technique is worried about code associating with other code.

The contract of a component is two contacts:
- The part is working suitably to the developer if the expected occasions are conveyed relying upon client input or different activities. Since genius types and approval rules can be tried at the unit level, we can remember them for our meaning of 'right designer confronting conduct.' 

- The UI is working effectively assuming that it generally addresses the situation with the part to the individual drawing in with it. This is more than simply a matter of appearance. Consider the component to be behaving wrongly if it does not produce the right HTML for the contents. The HTML made by the part is the reason for its availability tree, which gives the API to devices like screen perusers to sufficiently declare the information. Tests at the part level are a decent method for monitoring things. 

While precluding imperative data, the tests ought to affirm all of a part's significant trademark, the expressed conduct that is relied upon

### How vue components tests work with and without cypress
Vue Test Utils let you mount a part, arrange its settings, and phony out various elements that a part could depend on to work appropriately. It likewise delivers a covering object for the mounted part, making it somewhat easier to make claims concerning what's new with it. 

Jest is an astounding test sprinter, and it will set up the mounted part in a program setting utilizing jsdom. The primary contrast between the two techniques is setting, as cypress' part test sprinter mounts vue parts utilizing vue Test Utils. Cypress as of now finishes to-end tests in the program, and parts tests work similarly. This suggests we can watch our tests run, stop them in the middle, associate with the application, or study occasions from prior in the run, and realize that the program APIs our application depends on are genuine program conduct, not jsdom imagined portrayals of similar abilities. 

When the part is introduced, all of the ordinary cypress things that we've been acting in start to finish tests apply, and a couple of niggling issues with part choice are no more. Cypress will be responsible for mimicking all client cooperations and making declarations concerning how the application will react. This deals with the agreement's client confronting parts, yet what might be said about the agreement's designer confronting perspectives, like occasions, props, and all the other things? Vue Test Utils comes in accommodating in the present circumstance.
We may make assertions on the covering that Vue Test Utils gives around the mounted part utilizing cypress. We can test the part's usefulness as a client without composing any system explicit code, and we can simply use Vue Test Utils to mount the part and notice specific structure movement on a case by case basis. In the wake of performing something Vue-explicit, you never need to trust that a '$nexttick' from Vue will refresh the condition of the part

### Vuetify importation
The code in that repo is organized in a pretty normal manner, with a plugins subdirectory containing plugins that produce veutif instances. The application imports this, but our test setup may also import it and utilize it to mount the component that is being tested. In the repo, a command has been added to cypress that will use one instead of the normal mount function.
Here's the code we'll all need if we're going to perform everything in commands. We'll use our own cy.mount command instead of using the Vue Test Utils mount method directly in our tests because this is a custom implementation.

```javascript
// the vue-test-utils mount method is wrapped in the Cypress mount function.
Cypress.Command.add("mount", (ModuleMounted, option) => {
  return mount(ModuleMounted, {
    vuetify: new Vuetify({});, 
    ...options, 
  });
});

```
We'll always have Vuetify with us when our components are mounted, allowing us to pass in all of the extra settings we require for that component.

### Adding Vuetify's needed characteristics
Vuetify components anticipate being rendered in a certain DOM context. Everything in a Vuetify app is wrapped around a v-app> component, which represents the app's root element. There are a few ways to deal with this, but the simplest is to add some setup to your command before it mounts a component.

```javascript
 
  const root = document.getElementById("__cy_root");

  if (!root.classList.contains("v-application")) {
    root.classList.add("v-application");
  }
  
  ```

This takes use of Cypress's need to create a root element to which your component may be attached. That root element, which has the ID __cy root, is your component's parent. This gives everyone a handy spot to add the classes and characteristics that Vuetify expects to find. Vuetify-based components will now appear and perform as expected. A flex display property exists in the needed v-application class. Some unacceptable visual side effects can be mounted on a single element, which you must override prior to actually installing the component:

  ```javascript
  root.setAttribute('style', 'display: block');
  ```

At this point, we'll be done adjusting the surrounding environment so that components may be mounted.

### How can we get the specification files?
A cypress.json configuration file such to the one shown below is often used in component testing examples:

If this is the case, search any folder for files with the extension.spec.js, according to this.
In the node modules folder, you may eliminate some superfluous spec.js files by prefixing them with the following.
With node modules, you can do the following:

```javascript
"testFiles": "!(node_modules)**/*.spec.js"
```

### Command file conflict
Following the steps above to get Vuetify to work with our component tests caused an issue. Everyone's orders were put into the same bucket. your normal end-to-end testing js file. So, while you were able to run a few component tests, you couldn't get your end-to-end testing started. One of the imports committed a little error that was simply needed for component testing.
Recommendation: put the mounting order and its conditions in its own record and only use it in component tests when necessary.
There is just one drawback to running both sets of tests, and that is that it is simple to remove it from the end-to-end context.

### How to access the Vue Test Utils wrapper
In the context of a component test, the Vue Test Utils wrapper is accessible as Cypress.vueWrapper. Use cy.wrap to make the output chainable when making assertions using it.
The following was added to commands.js:

```javascript
  return cy.wrap(Cypress.vueWrapper);
```
This may be used in a test similar to this:

```javascript
 expect(wrapper.emitted('the-thing')).to.have.length(01);
  ```
 When engaging with the user interface, this begins to read quite organically and clearly differentiates itself from analyzing subtleties exposed by the Vue Test Utils wrapper.
Cypress also stresses the need of familiarizing yourself with the tools it uses, rather than simply Cypress itself, in order to get the most out of it.. Cypress is a wrapper for libraries like as Mocha, Chai, and others. Recall that Vue Test Utils is an outsider open source arrangement with its own arrangement of documentation, and that we're in Vue Test Utils Land — not Cypress Land — so you can obtain support and documentation from the right people.

### Conclusion
As evidenced in this tutorial, testing Vue components with Cypress includes so many other open source tools in the testing ecosystem, establishing a mental image of what Cypress is all about is tough.You can get ready for action with Cypress fast even if you don't have a complete information on what different instruments are utilized behind the scenes.

Happy Coding!
