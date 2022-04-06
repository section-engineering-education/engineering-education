# Unit Testing with Vue-test-utils

Just like there are different frameworks for building apps, there are various libraries for writing unit tests too. But when it comes to the Vue framework, [Vue-test-utils](https://v1.test-utils.vuejs.org/) is the perfect library.

Vue-test-utils is a testing library that is built on Jest. And is the recommended testing library when performing unit testing in Vue. Its concept is like that of Jest, so it’s very simple to catch up with if you are already familiar with Jest. It's simply Jest working under the hood.

This article will teach you how to write unit tests with the [Vue-test-utils](https://v1.test-utils.vuejs.org/) library. 

### Pre-requisites

To follow this article, you need to have the following:

- Node.js, locally installed.
- Text editor (e.g. Vs Code).
- A basic understanding of the Vue3  composition API.

### Scaffolding

For illustration purposes, I recommend you download the starter project we will be using in this tutorial. Follow the link to download the starter project right [here](https://github.com/mercybassey/vuetestutils-starter-project).

The starter project consists of:

- **GithubUser component:** This component displays the result of a searched `Github` user.
- **GithubUsers component:** This component displays the list of all `Github` users.
- **Home View:** This page serves as the main component of our application.
- **Details View:** This page displays the details of each `Github` user.

Our test scenarios will be to:

- Write a sanity test.
- Test our `views/DetailsView.vue` component for text content.
- Test our `components/GithubUser.vue` component for props.
- Test if a specific element in our `GithubUser.vue` component is rendered.
- Test if our `views/HomeView.vue` is rendering lists of `Github` users.
- Test if our `views/HomeView.vue` components can search for `Github` users.

### Installation

Now that we have our scaffolding set, we go right to install `vue-test-utils` into our application. Type the command below on your terminal to install the `vue-test-utils` library.

```bash
vue add unit-jest
```

With `vue-test-utils` successfully installed; you should have the following in your project directory:

- `test/unit` **folder**: This is where jest searches for tests exclusively.
- `test/unit/example.spec.js` **file**: This is just a sample test that comes with the `vue-test-utils` library.
- `jest.config` **file**: This file contains the configuration settings for jest to work with Vue.

#### Write a sanity test

The first test we will be writing is called a sanity test. In some cases, a test may not fail because anything is wrong with our code; it can be because the tools we are using are not working correctly.

In this case, we need a way to verify that it’s the tool that failed and not our tests. A clever way to tackle this case is to write a test that will always pass. And if it doesn’t we will know that our problem is from the tools and not our codebase. This is what is called a sanity test. Moreover, it is highly recommended that you write a sanity test as your first test.

In our project directory, we will rename the `test/unit/example.spec.js` file to be `sanity.spec.js` and edit it to have the following code snippets below.

```javascript
it('sanity test', () => {
  expect(true).toBe(true);
})
```

And then, we run the command below to run our test:

```bash
npm run test:unit                                                
```

With the below test report, our sanity test passed. Now we can begin to test other parts of our application.

```bash
PASS  tests/unit/sanity.spec.js
  ✓ sanity test (5 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        11.793 s
Ran all test suites.
```

#### Test our `views/DetailsView.vue` component for text content

The next part we will be testing in our Vue application is the `views/DetailsView.vue` component. Currently, in the `DetailsView.vue` component; we have an `h1` tag with the text `This is the details Page` inside it. 

We’ll simply write a test that checks if the component is rendering the text content inside it.

Create a file in the `test/unit` directory called `detailsview.spec.js`. In the `detailsview.spec.js` file, the first thing we will do is import a function from the `vue-test-utils` library that’ll help us mount an instance of the component we want to test that will return an object with properties and methods for interacting with the instance. And also, import the component we want to test. In our case the `DetailsView` component.

 Add the code snippets below in the `detailsview.spec.js` file.

```javascript
import {shallowMount} from '@vue/test-utils';  
import DetailsView from '@/views/DetailsView.vue' 
```

After the import, we’ll call a function called `describe` that allows us to group one or more tests usually known as the test suite. 

This function takes two arguments; which are, the description of the test suite we are creating and the callback function containing the tests. The description for our test will be `renders text content`.

Add the code snippets below :

```javascript
describe('Details.vue', () => {
    it('renders text content', () => {
        
    });
});
```

Inside the test function, we’ll create a variable called `wrapper` that is set to the value returned by the `shallowMount` function passing in the component we’ll like to test which is in our case the `DetailsView` component. And then, we’ll write an assertion to check if the text content in our `DetailsView.vue` component is outputted.

Inside the test function add the code snippet below: 

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

With the below test report our test passed. This means the `DetailsView.vue` component renders the `This is the details Page` text.

```bash
PASS  tests/unit/details.spec.js (7.326 s)
PASS  tests/unit/sanity.spec.js

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        12.956 s
Ran all test suites.
```

                                               

#### Test our `components/GithubUser.vue` component for props

The next component we will be testing is the `components/GithubUser.vue` component. This component relies on the `HomeView` component to pass down data. In the `script` block the data that powers this component are coming from a `prop` called `userInfo`.

We are going to write a test to confirm if the `GithubUser.vue` component is rending the `userInfo` data. To achieve this, we’ll use what is called mock data. In the `unit/tests` directory, create a file called `githubuser.spec.js`.

Import the `shallowMount` function from the `vue-test-utils` library, and then import the component we want to test, which is in our case the `GithubUser.vue` component. 

Add the code snippets below:

```javascript
import {shallowMount} from '@vue/test-utils';
import GithubUser from '@/components/GithubUser.vue'                                       
```

The `GithubUser.vue` component isn’t rendering static contents, everything is completely dynamic. To test this kind of component, we’ll just need to take extra steps. 

So, we’ll write a test to check if the component is rendering the name of a `Github` user. That is `userInfo.name`.  

Inside the test, we’ll create mock data. That is, we’ll create a variable called `userInfo`, set it to an object, and define a property called `name` with the value of `test`. Just like the code snippets below:

```javascript
describe('GithubUser.vue', () => {
    it('renders userInfo.name', () => {
        const userInfo = {
            name : 'test',
        }
    });
});
```

Then, we mount the `GithubUser.vue` component, like so:

```javascript
const wrapper = shallowMount(GithubUser)   
```

With that done, what’ll do next is pass down the `userInfo` data to the component to be able to test the component properly.

To achieve this, the `shallowMount` function has a second argument we can use. This argument is an object that will allow us to pass down data to the component.

Inside the object of the second argument, we will add an option called `props`. The `props` option is where we can add `props` for the component. 

Then, we’ll write an assertion to test if the component is rendering the name of a `Github user`. 

Add the code snippet below:

```javascript
const wrapper = shallowMount(GithubUser, {
            props: {
                userInfo
            }
       });
expect(wrapper.text()).toContain(userInfo.name);
```

This test will essentially check if the `name` property is present in the component. And This is what the complete code looks like:

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

And now, our test passed. But this time with a warning:

```bash
PASS  tests/unit/githubuser.spec.js
  ● Console

    console.warn
      [Vue warn]: Failed to resolve component: router-link
      If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. 
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

This warning is due to, we are using an undefined component; in this case the `router-link` component. 

When it comes to testing, we are actually testing bits and pieces of our code in isolation, so we don’t have access to components registered globally by the `vue-router` library, therefore; the `router-link` component isn’t defined.

To resolve this, we’ll do what is called stubbing. Stubs are fake or dummy components. There are used to trick Vue into rendering a completely different component or element. 

Luckily, the `vue-test-utils` library comes with a predefined set of stubs for such a situation, and also, has a stub for the `router-link` component.

At the top of the file, we’ll update the `import` statement for the `vue-test-utils` package and add on the `RouterLinkStub` component. Just like the code below:

```javascript
import {shallowMount, RouterLinkStub} from '@vue/test-utils';
```

Then, in the `shallowMount` function, we add a property called `stubs` which will allow us to register the `components` we want to `stub`. In our case, we will be registering the `router-link` component. 

Add the following code snippets below:

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

After making these changes, this is what the complete code looks like:

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

And now, our test passes without a warning. 

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

#### Test if a specific element in our `GithubUser.vue` component is rendered

For specificity, we can improve our test to check if the component renders the name of a `Github user` in a specific location in our `GithubUser.vue` component. 

The `wrapper` API comes with a function for selecting elements in a component called `find`. You can think of it as a function that is similar to the `querySelector` function. 

The first thing we’ll do is, create a variable called `githubUser` with the value `wrapper.find()` that takes in a `CSS` query selector to find the element.

In our case, the `Github user` name is found in a `p` tag with a class of `user-name`. So the `CSS` query selector will be `.user-name`.

With that, let’s modify our code to use the  `find()` function.

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

With the test report below, our test passed. So we are certain that the element we accessed only have the name of a `Github user` inside it.

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

#### Test if our `views/HomeView.vue` is rendering lists of users

Our next test is to check if our `HomeView` component is rending the list of all `Github Users`. In the `tests/unit` directory, create a new test file called `homeview.spec.js`.

In this test file, we’ll import the `HomeView` component and the `shallowMount` function. Then, call the `describe` function with an identifier of `HomeView.vue` and also, the  `test` function with a description of `renders lists of users`. Just like the code below:

```javascript
import {shallowMount} from '@vue/test-utils';
import HomeView from '@/components/HomeView.vue'
describe('HomeView.vue', () => {
    it('renders list of users',  () => {
        
    })
})
```

In the `HomeView` component, we have a reactive variable called `users` set to an empty array. 

The `users` variable gets filled when we request to the `Github users` API in the `onMounted` life cycle function. So, we are not going to rely on this request to add data to the variable. 

Sending `HTTP` requests in a test can be unreliable. This is something we have to avoid as the request may fail. 

In this case, it’s good practice to use mock data. Inside our test, we’ll create a variable called `users` and set it to be an array of three empty objects. Just like the code below:

```javascript
const users = [{},{},{}];
```

We are using empty objects because we are not interested in providing complete data to the component. We just want to check if the `HomeView` component is capable of rendering the list of users if there are users in the `users` array. So, we don’t need the object to be filled with properties to accomplish that. 

In our case, the test should generate three `GithubUsers` components based on the data of the `HomeView` component. 

So, we’ll mount our component and return the `users` variable, into a `setup` option in the object returned by the `shallowMount` function.

```javascript
const wrapper = shallowMount(HomeView, {
            setup() {
                return{
                    users,
                };
            },
        });
```

The next step is to select the list of users in the component. If you take a look at our `views/HomeView.vue` component, the component that is been looped through to generate the lists of users is the `GithubUsers.vue` component. So, we might want to import this component as we will be needing it in our test. 

At the top of the `homeview.spec.js` file, import the `GithubUser.vue` component like so:

```javascript
import GithubUsers from '@/components/GithubUsers.vue'
```

Then, below the `shallowMount` function; we’ll create a variable called `listsOfUsers` and set it to the value returned by the `wrapper.findAllComponents()` function passing in the `GithubUsers` component. Also, we’ll write an assertion to test if the number of the `GithubUsers` component is equal to the number of objects in our `users` array. 

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

The next step is to run our test. Run the command below to run our test:

```bash
npm run test:unit
```

With the test report below, our test passed. But also, this time with a warning:

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

This means we have to mock these properties too. But this is optional. We might want to ignore them since we aren’t making use of these properties. 

In a case where you don’t want to ignore them, our overall code will look like this:

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

With that done, we’ll have our test to pass without a warning:

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

#### Test if our `views/HomeView.vue` component can search for users.

Finally, we want to test if our `views/HomeView.vue` component can search for `Github users`. In the `homeview.spec.js` file, we will write another test, inside the describe function with a description of `search for users`. 

In our `HomeView.vue` component, the component that displays the searched user information is the `GithubUser.vue` component. So, we import the `GithubUser.vue` component like so:

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

The overall code looks like this:

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

With the test result below our test passed:

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

In this article, you’ve learned how to test different bits and pieces of our project with the `vue-test-utils` library. This is a head start to getting up and running with the `vue-test-utils` library. There’s a lot more you can achieve with this library, its usefulness is wonderful as far as the Vue framework is concerned.

I recommend that you make references to the `[Jest](https://jestjs.io/docs/)`  and `[vue-test-utils](https://v1.test-utils.vuejs.org/)` libraries documentation respectively if you’d like to dive in deeper on how to utilize them in your Vue projects.

Again, it’s all Jest working under the hood. 

You can find the code for this tutorial right [here](https://github.com/mercybassey/vue-test-utils). Thank you for reading and Happy coding.