---
layout: engineering-education
status: publish
published: true
url: /unit-testing-with-vue-test-utils/
title: Unit Testing with Vue-test-utils
description: This article will teach the reader how to write unit tests with the Vue-test-utils library. Vue-test-utils is a testing library that is built on Jest.
author: mercy-bassey
date: 2022-04-19T00:00:00-17:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/unit-testing-with-vue-test-utils/hero.png
    alt: Vue 3 Unit Testing Jest
---
There are different frameworks for building apps and there are various libraries for writing unit tests. But when it comes to the Vue framework, [Vue-test-utils](https://v1.test-utils.vuejs.org/) is the most preferred library.
<!--more-->
Vue-test-utils is a testing library that is built on Jest. Its concept is like that of Jest, so it's easy to catch up with if you are already familiar with Jest. 

This article will teach you how to write unit tests with the [Vue-test-utils](https://v1.test-utils.vuejs.org/) library. 

### Prerequisites
To follow this article, you need to have the following:
- Node.js, locally installed.
- An IDE that supports Vue.js or just a text editor.
- A basic understanding of the Vue3 composition API.

### Scaffolding
For illustration purposes, I recommend that you [download]((https://github.com/mercybassey/vuetestutils-starter-project)) the starter project we will be using in this tutorial.

The starter project consists of:
- The `GithubUser` component: This component displays the result of a searched `Github` user.
- The `GithubUsers` component: This component displays the list of all Github users.
- Home view: This page serves as the main component of our application.
- Details view: This page displays the details of each Github user.

Our test scenarios will be to:
- Write a sanity test.
- Test our `views/DetailsView.vue` component for text content.
- Test our `components/GithubUser.vue` component for props.
- Test if a specific element in our `GithubUser.vue` component is rendered.
- Test if our `views/HomeView.vue` is rendering lists of Github users.
- Test if our `views/HomeView.vue` components can search for Github users.

### Installation
Now that we have our scaffolding set, we install `vue-test-utils` into our application. 

Run the following command on your terminal to install the `vue-test-utils` library.
```bash
vue add unit-jest
```

With `vue-test-utils` successfully installed; you should have the following in your project root directory:
- The `test/unit` folder: This is where jest searches for tests exclusively.
- The `test/unit/example.spec.js` file: This is just a sample test with the `vue-test-utils` library.
- The `jest.config` file contains the configuration settings for jest to work with Vue.

#### Writing a sanity test
The first test we will be writing is called a sanity test. In some cases, a test may fail not because anything is wrong with our code; but because the tools we are using are not working correctly.

Therefore, we need a way to verify that it's the tool that failed and not our tests. 

A clever way to tackle this issue is to write a test that will always pass. And if it doesn't, we will know that our problem is with the tools and not our codebase. 

This is what is called a sanity test. Moreover, it is highly recommended that you write a sanity test as your first test.

In our project directory, we will rename the `test/unit/example.spec.js` file to be `sanity.spec.js` and edit it to have the following code snippets below.

```javascript
it('sanity test', () => {
  expect(true).toBe(true);
})
```

And then run our test as shown below:
```bash
npm run test:unit                                                
```

Output:

```bash
PASS  tests/unit/sanity.spec.js
  ✓ sanity test (5 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        11.793 s
Ran all test suites.
```

The above output shows that our sanity test passed. Therefore, we can now proceed to the next phase of our test.

#### Test our 'views/DetailsView.vue' component for text content
Currently, in the `DetailsView.vue` component, we have an `h1` tag with `This is the details Page` inside it. 

> NOTE: The text in your case may be different. However, the concepts should be the same.

We'll write a test that checks if the component renders the text content inside it.

Create a file in the `test/unit` directory called `detailsview.spec.js`. 

In the `detailsview.spec.js` file, we will first import a function from the `vue-test-utils` library that will help us mount an instance of the component we want to test.

It will return an object with properties and methods for interacting with the instance. 

And also, import the component we want to test. In our case, the `DetailsView` component.

Let's proceed and add the code snippets below in the `detailsview.spec.js` file.
```javascript
import {shallowMount} from '@vue/test-utils';  
import DetailsView from '@/views/DetailsView.vue' 
```

After the import, we'll call a function called `describe` that allows us to group one or more tests, usually known as the test suite. 

This function takes two arguments: the `description` of the test suite we are creating and the `callback` function containing the tests.

The description for our test will be `renders text content`.

Next, proceed and add the code snippets below in the `detailsview.spec.js` file.
```javascript
describe('Details.vue', () => {
    it('renders text content', () => {
        
    });
});
```

We'll create a variable called `wrapper` inside the test function.

This variable is then set to the value returned by the `shallowMount` function passing in the component we'd like to test, in this case, the `DetailsView` component. 

And then, we'll write an assertion to check if the text content in our `DetailsView.vue` component is the same as what we expect.

In the test function, add the code snippet below: 
```javascript
const wrapper = shallowMount(DetailsView);
expect(wrapper.text()).toContain('This is the details Page');
```

The complete code looks like this: 
```javascript
import {shallowMount} from '@vue/test-utils';
import DetailsView from '@/views/DetailsView.vue'

describe('Details.vue', () => {
    it('renders inner text', () => {
        const wrapper = shallowMount(DetailsView);
        expect(wrapper.text()).toContain('This is the details Page');
    });
});
```

Run the following command below to run our test:
```bash
npm run test:unit
```

Output:
```bash
PASS  tests/unit/details.spec.js (7.326 s)
PASS  tests/unit/sanity.spec.js

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        12.956 s
Ran all test suites.
```

The above output shows that our test passed.                         

#### Test our 'components/GithubUser.vue' component for props
The next component we will be testing is the `components/GithubUser.vue` component. 

This component relies on the `HomeView` component to pass down the data. The data that powers this component comes from a `prop` called `userInfo` in the' script' block.

We will write a test to confirm if the `GithubUser.vue` component is rending the `userInfo` data. 

To achieve this, we can use mock data. First, in the `unit/tests` directory, create a file called `githubuser.spec.js`.

Import the `shallowMount` function from the `vue-test-utils` library and the component to test, in this case, the `GithubUser.vue` component. 

Add the code snippets below to the `githubuser.spec.js` file.
```javascript
import {shallowMount} from '@vue/test-utils';
import GithubUser from '@/components/GithubUser.vue'                                       
```

The `GithubUser.vue` component isn't rendering static contents; everything is entirely dynamic. So we'll just need to take extra steps to test this kind of component. 

So, we'll write a test to check if the component is rendering the name of a `Github` user. That is, `userInfo.name`.  

Let's create a mock data by defining a variable called `userInfo`, set it to an object, and define a property called `name` with the value of `test`. 
```javascript
describe('GithubUser.vue', () => {
    it('renders userInfo.name', () => {
        const userInfo = {
            name : 'test',
        }
    });
});
```

Then, we mount the `GithubUser.vue` component as shown below:
```javascript
const wrapper = shallowMount(GithubUser)   
```

With that done, we'll pass down the `userInfo` data to the component to be able to test the component correctly.

The `shallowMount` function has a second argument we can use to achieve this. This argument is an object that will allow us to pass down data to the component.

Inside the object of the second argument, we will add an option called `props`.

> The props option is where we can add `props` for the component. 

Then, we'll write an assertion to test if the component is rendering the name of a `Github user`. 

Add the code snippet below:
```javascript
const wrapper = shallowMount(GithubUser, {
            props: {
                userInfo
            }
       });
expect(wrapper.text()).toContain(userInfo.name);
```

This test will check if the component's `name` property is present.

The complete code looks like this:
```javascript
import {shallowMount, RouterLinkStub} from '@vue/test-utils';
import GithubUser from '@/components/GithubUser.vue'

describe('GithubUser.vue', () => {
    it('renders userInfo.name', () => {
        const userInfo = {
            name : 'test',
        }
       const wrapper = shallowMount(GithubUser, {
            propsData: {
                userInfo
            }
       }); 
       expect(wrapper.text()).toContain(userInfo.name);
    });
});
```

Run the command below to run our test:
```bash
npm run test:unit
```

Output:
```bash
PASS  tests/unit/githubuser.spec.js
  ● Console

    console.warn
      [Vue warn]: Failed to resolve component: router-link
      If this is a native custom element, exclude it from component resolution via compilerOptions.isCustomElement. 
        at <GithubUser userInfo= { name: 'test' } ref="VTU_COMPONENT" > 
        at <VTUROOT>

      at warn (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:40:17)
      at resolveAsset (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5931:13)
      at resolveComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5880:12)
      at Proxy.render (src/components/GithubUser.vue:27:60)
      at renderComponentRoot (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:887:44)
      at ReactiveEffect.componentUpdateFn [as fn] (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4963:57)
      at ReactiveEffect.run (node_modules/@vue/reactivity/dist/reactivity.cjs.js:171:25)
      at setupRenderEffect (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5089:9)

 PASS  tests/unit/details.spec.js
 PASS  tests/unit/sanity.spec.js

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        7.529 s, estimated 8 s
Ran all test suites.
```

We can see from the above output that our test passed, but there are some warnings.

This warning is because we are using an undefined component; in this case, the `router-link` component. 

When it comes to testing, we test bits and pieces of our code in isolation.

This implies that we don't have access to components registered globally by the `vue-router` library; therefore, the `router-link` component isn't defined.

To resolve this, we'll do what is called stubbing. Stubs are fake or dummy components. 

They are used to trick Vue into rendering an utterly different component or element. 

Luckily, the `vue-test-utils` library has a predefined set of stubs for such a situation and has a stub for the `router-link` component.

At the top of the file, we'll update the `import` statement for the `vue-test-utils` package and add the `RouterLinkStub` component. 
```javascript
import {shallowMount, RouterLinkStub} from '@vue/test-utils';
```

Then, in the `shallowMount` function, we add a property called `stubs`, allowing us to register the `components` we want to `stub`.

In our case, we will be registering the `router-link` component. 
Next,add the following code snippets:
```javascript
const wrapper = shallowMount(GithubUser, {
            propsData: {
                userInfo
            },
            global: {
                stubs: {
                    'router-link':RouterLinkStub,
                }
            }
       });
```

After making these changes, this is what the complete code will look like:
```javascript
import {shallowMount, RouterLinkStub} from '@vue/test-utils';
import GithubUser from '@/components/GithubUser.vue'

describe('GithubUser.vue', () => {
    it('renders userInfo.name', () => {
        const userInfo = {
            name : 'test',
        }
       const wrapper = shallowMount(GithubUser, {
            propsData: {
                userInfo,
            },
            global: {
                stubs: {
                    'router-link': RouterLinkStub,
                }
            },
       }); 
       expect(wrapper.text()).toContain(userInfo.name);
    });
});
```

Output:
```bash
PASS  tests/unit/githubuser.spec.js (6.209 s)
PASS  tests/unit/sanity.spec.js
PASS  tests/unit/details.spec.js

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        21.363 s
Ran all test suites.
```

In the above output, we see that our test passed, and there are no warnings.

#### Test if a specific element in our 'GithubUser.vue' component is rendered
We can improve our test for specificity to check if the component renders the name of a `Github user` in a specific location in our `GithubUser.vue` component. 

The `wrapper` API comes with a function to select elements in a component. You can think of it as a function similar to the `querySelector` function. 

We'll first create a `githubUser` property with the value `wrapper.find()` that takes in a `CSS` query selector to find the element.

In our case, the `Github user` name is found in a `p` tag with a class of `user-name`. So the `CSS` query selector will be `.user-name`.

Let's modify our code to use the `find()` function.

In the `githubuser.spec.js` file, add the code below, above the assertion.
```javascript
const githubUser = wrapper.find('.user-name');         
```

And, have our assertion strictly check for that element with an exact match:
```javascript
expect(compositionUser.text()).toBe(userInfo.name);
```

Our code now looks like the code snippets below:
```javascript
import {shallowMount, RouterLinkStub} from '@vue/test-utils';
import GithubUser from '@/components/GithubUser.vue'

describe('GithubUser.vue', () => {
    it('renders userInfo.name', () => {
        const userInfo = {
            name : 'test',
        }
       const wrapper = shallowMount(GithubUser, {
            propsData: {
                userInfo,
            },
            global: {
                stubs: {
                    'router-link': RouterLinkStub,
                }
            },
       }); 
       const compositionUser = wrapper.find('.user-name');

       expect(compositionUser.text()).toBe(userInfo.name);
    });
});
```

Run the command below to run this test:
```bash
npm run test:unit
```

With the test report below, our test passed. So we are confident that the element we accessed only has the name of a `Github user` inside it.
```bash
PASS  tests/unit/githubuser.spec.js (8.467 s)
PASS  tests/unit/details.spec.js
PASS  tests/unit/sanity.spec.js

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        25.894 s
Ran all test suites.
```

#### Test if our 'views/HomeView.vue' is rendering lists of users
Our next test is to check if our `HomeView` component renders the list of all `Github Users`. 

In the `tests/unit` directory, create a new test file called `homeview.spec.js`.

We'll import the `HomeView` component and the `shallowMount` function in this test file. 

Next, call the `describe` function with an identifier of `HomeView.vue` and also, the  `test` function with a description of `renders lists of users`.
```javascript
import {shallowMount} from '@vue/test-utils';
import HomeView from '@/components/HomeView.vue'
describe('HomeView.vue', () => {
    it('renders list of users',  () => {
        
    })
})
```

In the `HomeView` component, we have a reactive property called `users` set to an empty array. 

The `users` variable gets filled when we make request to the `Github users` API in the `onMounted` life cycle function. Therefore, we will not rely on this request to add data to the variable. 

Sending `HTTP` requests in a test can be unreliable. This is something we have to avoid as the request may fail. 

In this case, it's good practice to use mock data. We'll create a variable called `users` and set it an array of three empty objects inside our test.
```javascript
const users = [{},{},{}];
```

We are using empty objects because we are not interested in providing complete data to the component.

We just want to check if the `HomeView` component is capable of rendering the list of users if there are users in the `users` array.

Therefore, we don't need the object to be filled with properties. 

In our case, the test should generate three `GithubUsers` components based on the data of the `HomeView` component. 

So, we'll mount our component and return the `users` variable into a `setup` option in the object returned by the `shallowMount` function.
```javascript
const wrapper = shallowMount(HomeView, {
            setup() {
                return{
                    users,
                };
            },
        });
```

The next step is to select the list of users in the component. For example, if you look at our `views/HomeView.vue` component, the component looped through to generate the lists of users is the `GithubUsers.vue` component.

So, we might want to import this component as we will need it in our test. At the top of the `homeview.spec.js` file, import the `GithubUsers.vue` component:
```javascript
import GithubUsers from '@/components/GithubUsers.vue'
```

Then, below the `shallowMount` function; we'll create a variable called `listsOfUsers` and set it to the value returned by the `wrapper.findAllComponents()` function passing in the `GithubUsers` component.

Also, we'll write an assertion to test if the number of the `GithubUsers` component is equal to the number of objects in our `users` array. 

Add the code snippets below:
```javascript
const listsOfUsers =  wrapper.findAllComponents(GithubUsers);
expect((listsOfUsers).length).toEqual(users.length) 
```

This is what the overall code looks like:
```javascript
import {shallowMount} from '@vue/test-utils';
import GithubUsers from '@/components/GithubUsers.vue'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
    it('renders list of users',  () => {
        const users = [{},{},{}]
        const wrapper = shallowMount(HomeView, {
            setup() {
                return{
                    users
                };
            },
        });
        

        const listsOfUsers =  wrapper.findAllComponents(GithubUsers);
        expect((listsOfUsers).length).toEqual(users.length)
    })
})
```

The next step is to run our test. 

Run the command below to run our test:
```bash
npm run test:unit
```

Output:
```bash
PASS  tests/unit/homeview.spec.js
  ● Console

    console.warn
      [Vue warn]: Property "searchQuery" was accessed during render but is not defined on instance. 
        at <HomeView ref="VTU_COMPONENT" > 
        at <VTUROOT>

      at warn (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:40:17)
      at Object.get (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:6681:17)
      at Proxy.render (src/views/HomeView.vue:104:30)
      at renderComponentRoot (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:887:44)
      at ReactiveEffect.componentUpdateFn [as fn] (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4963:57)
      at ReactiveEffect.run (node_modules/@vue/reactivity/dist/reactivity.cjs.js:171:25)
      at setupRenderEffect (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5089:9)
      at mountComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4872:9)

    console.warn
      [Vue warn]: Property "userInfo" was accessed during render but is not defined on instance. 
        at <HomeView ref="VTU_COMPONENT" > 
        at <VTUROOT>

      at warn (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:40:17)
      at Object.get (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:6681:17)
      at Proxy.render (src/views/HomeView.vue:109:67)
      at renderComponentRoot (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:887:44)
      at ReactiveEffect.componentUpdateFn [as fn] (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4963:57)
      at ReactiveEffect.run (node_modules/@vue/reactivity/dist/reactivity.cjs.js:171:25)
      at setupRenderEffect (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5089:9)
      at mountComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4872:9)

    console.warn
      [Vue warn]: Property "loading" was accessed during render but is not defined on instance. 
        at <HomeView ref="VTU_COMPONENT" > 
        at <VTUROOT>

      at warn (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:40:17)
      at Object.get (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:6681:17)
      at Proxy.render (src/views/HomeView.vue:126:14)
      at renderComponentRoot (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:887:44)
      at ReactiveEffect.componentUpdateFn [as fn] (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4963:57)
      at ReactiveEffect.run (node_modules/@vue/reactivity/dist/reactivity.cjs.js:171:25)
      at setupRenderEffect (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5089:9)
      at mountComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4872:9)

 PASS  tests/unit/details.spec.js
 PASS  tests/unit/sanity.spec.js
 PASS  tests/unit/githubuser.spec.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        4.985 s, estimated 9 s
Ran all test suites.
```

With the test report above, our test passed. But also, this time with a warning:

This means we have to mock these properties too. But this is optional. We might want to ignore them since we aren't using these properties. 

In a case where you don't want to ignore them, our overall code will look like this:
```javascript
import {shallowMount, mount} from '@vue/test-utils';
import GithubUsers from '@/components/GithubUsers.vue'
import GithubUser from '@/components/GithubUser.vue'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
    it('renders list of users',  () => {
        const users = [{},{},{}];
        const searchQuery = '';
        const userInfo = '';
        const loading = false;
       

        const wrapper = shallowMount(HomeView, {
            setup() {
                return{
                    users,
                    searchQuery,
                    userInfo,
                    loading
                };
            },
        });
        const listsOfUsers =  wrapper.findAllComponents(GithubUsers);
        expect((listsOfUsers).length).toEqual(users.length)
    })
})

```

With that done, our test will pass without warning:
```bash
PASS  tests/unit/homeview.spec.js (8.765 s)
PASS  tests/unit/githubuser.spec.js
PASS  tests/unit/details.spec.js
PASS  tests/unit/sanity.spec.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        18.507 s
Ran all test suites.
```

#### Test if our 'views/HomeView.vue' component can search for users.
Finally, we want to test if our `views/HomeView.vue` component can search for `Github users`.  In the `homeview.spec.js` file, we will write another test inside the describe function with a description of `search for users`. 

In our `HomeView.vue` component, the component that displays the searched user information is the `GithubUser.vue` component.

So, we import the `GithubUser.vue` component:
```javascript
import GithubUser from '@/components/GithubUser.vue'
```

Then, the code below will be able to perform this test:
```javascript
it('search for user',  async () => {
        const userInfo = ''
        const searchQuery = 'octocat';
    
        const wrapper = shallowMount(HomeView, {
            setup(){
                return{userInfo, searchQuery}
            }
        })

        await wrapper.get('.search-input').setValue('octocat');
        await wrapper.get('.search-button').trigger('submit');

        const searchResult = wrapper.findAllComponents(GithubUser);
        expect((searchResult).length).toEqual(userInfo.length)
    })
```

The overall code should look like this:
```javascript
import {shallowMount, mount} from '@vue/test-utils';
import GithubUsers from '@/components/GithubUsers.vue'
import GithubUser from '@/components/GithubUser.vue'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
    it('renders list of users',  () => {
        const users = [{},{},{}];
        const searchQuery = '';
        const userInfo = '';
        const loading = false;
       
        const wrapper = shallowMount(HomeView, {
            setup() {
                return{
                    users,
                    searchQuery,
                    userInfo,
                    loading
                };
            },
        });
        const listsOfUsers =  wrapper.findAllComponents(GithubUsers);
        expect((listsOfUsers).length).toEqual(users.length)
    })

    it('search for user',  async () => {
        const userInfo = ''
        const searchQuery = 'octocat';
                 const loading = false;
                 const users = '';
    

        const wrapper = shallowMount(HomeView, {
            setup(){
                return{userInfo, searchQuery}
            }
        })

        await wrapper.get('.search-input').setValue('octocat');
        await wrapper.get('.search-button').trigger('submit');

        const searchResult = wrapper.findAllComponents(GithubUser);
        expect((searchResult).length).toEqual(userInfo.length)
    })
})
```

With the test result below, our test passed:

```bash
PASS  tests/unit/homeview.spec.js
PASS  tests/unit/detailsview.spec.js
PASS  tests/unit/githubuser.spec.js
PASS  tests/unit/sanity.spec.js

Test Suites: 4 passed, 4 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        6.308 s
Ran all test suites.
```

### Conclusion
In this article, you've learned how to test different bits and pieces of our project with the `vue-test-utils` library. This is a head start to getting up and running with the `vue-test-utils` library. 

There's a lot more you can achieve with this library and its usefulness is terrific as far as the Vue framework is concerned.

I recommend that you make references to the [Jest](https://jestjs.io/docs/getting-started) and [vue-test-utils](https://v1.test-utils.vuejs.org/) libraries documentation, respectively if you'd like to dive in deeper on how to utilize them in your Vue projects.

Again, it's all Jest working under the hood. 

You can find the code for this tutorial right [here](https://github.com/mercybassey/vue-test-utils).

Thank you for reading, and Happy coding.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
