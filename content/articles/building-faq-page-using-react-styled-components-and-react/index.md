### Building FAQ page using React-styled components and React.js
Addressing user questions and concerns is a priority for corporations, online vendors, and even your small blog or website. An efficient way of handling user queries is having a comprehensive frequently asked questions (FAQ) page. In this tutorial, we will use a modern web design library known as React-styled components alongside React.js to create an attractive FAQ page that can be adopted and integrated into a new or already existing website.

#### Key takeaways
After this tutorial, the reader is expected to understand and also have the knowledge to perform the following:
i. Creating FAQ page with React-styled component and React.js
ii. Adding and using Styled-components
iii. Styling and customizing the FAQ page
iv. Adding questions and answers with JSON
v. Creating reusable components with React-styled components

#### Prerequisite
Although this article is extremely beginner-friendly, basic knowledge of React.js and any other design framework will enable you to follow up with the tutorial. Take a moment and enroll in a crash course if you do not possess the above.

#### Tutorial Overview
For ease of understanding, this article will be broken down into various steps required to create an FAQ page using React-styled component and React.js. let's begin with the first step:

#### Step 1: Creating the React App
As you are already familiar with, every React development cycle begins with the creation of the `react app`. This step is very easy and we will go through it together. To achieve this, in your `command terminal, run the following command below

```bash
npm create-react-app Faq-app
```

Alternative, if you're a yarn user

```bash
Yarn create-react-app Faq-app
```

That's it, the above command will set up your application and install the default dependencies required to begin the development.

#### Step 2: Setting up the Dependencies
React.js alone is capable of doing a lot of cool things, but combining that power with some package dependencies, in our case React-styled components will dramatically reduce the complexity of developing and styling our application. To install the dependencies into our `react app`, we go back to the command terminal and run the command below

```bash
npm install styled-components
```

Or for yarn users

```bash
yarn add styled-components
```

As simple as that, we have successfully added styled-components to our application. Feel free to open up the `package.json` file and check the dependencies for `styled-components`.
It should look similar to this:

```JSON
"dependencies": {
"chartist": "^0.11.4",
"classnames": "^2.3.1",
"react": "^17.0.2",
"react-chartist": "^0.14.4",
"react-dom": "^17.0.2",
"react-scripts": "4.0.3",
"styled-components": "^5.2.3",
"web-vitals": "^1.1.1"
}
```

#### Step 3: Creating the Array of Questions and Answers (faq.json)
The approach we intend to adopt in this tutorial is to have a `JSON` file that contains an array of questions and their corresponding answers. Afterward, we display the questions by creating a `map` function that loops over the array and displays all our questions and answers accordingly. To achieve this, in the `src` folder, create a `faq.json` file which will accommodate the questions and answer below:

```JSON
[
{
"id": 1,
"question": "What are the services do you offer",
"answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?"
},
{
"id": 2,
"question": "what are our preferred method of payment",
"answer": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto veniam eveniet labore impedit nam"
},
{
"id": 3,
"question": "Are your services beginners friendly",
"answer": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores,"
},
{
"id": 4,
"question": "what how does it take to upgrade a package",
"answer": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi."
},
{
"id": 5,
"question": "Where are your offices located around the world",
"answer": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi."
}
]
```

I decided to use an array of dummies questions but you could make use of actual questions about your websites, products, or services.
Each dummy question has an id, which is required during all React mapping operations to prevent a repetition of data, there is a question field and also a corresponding answer field. That wraps up this step, time to proceed to the next step.

#### Step 4: Creating the Accordion component (Accordion.js)
The accordion component is the container of which the questions and answers will be displayed, think of it as a showcase for the FAQs. To set up the component, we will create an `Accordion.js` file, thereafter we implement the code snippet below:

```JavaScript
import React, { useState, useContext, createContext } from "react";
import {
Container,
Title,
Item,
Inner,
Question,
Body,
} from "./styles ";

const ToggleContext = createContext();
export default function Accordion({ children, ...restProps }) {
return (
<Container {...restProps}>
<Inner>{children}</Inner>
</Container>
);
}
Accordion.Title = function AccordionTitle({ children, ...restProps }) {
return <Title {...restProps}> {children}</Title>;
};
Accordion.Item = function AccordionItem({ children, ...restProps }) {
const [toggle, setToggle] = useState(false);
return (
<ToggleContext.Provider value={{ toggle, setToggle }}>
<Item {...restProps}> {children}</Item>
</ToggleContext.Provider>
);
};
Accordion.Question = function AccordionHeader({ children, ...restProps }) {
const { toggle, setToggle } = useContext(ToggleContext);

return (
<Question onClick={() => setToggle((toggle) => !toggle)} {...restProps}>
{children}
{toggle ? <h3>^</h3> : <h3>+</h3>}
</Question>
);
};
Accordion.Body = function AccordionBody({ children, ...restProps }) {
const { toggle } = useContext(ToggleContext);

return toggle ? <Body {...restProps}>{children}</Body> : null;
};
```

Let's go over what is happening with our code block. First, we created and used a context API named `ToggleContext` to monitor the state of our accordion component and to ensure that two questions cannot be opened simultaneously. Additionally, we imported a few reusable components, i.e. the Title, Questions, Body, and Item which we will create and export soon. The title will be displayed at the top of the page telling the user that it is an FAQ page. While the question and Body will show the questions and answers respectively.

#### Step 5: Styling the Accordion component (Styles.js)
Those reusable components we imported earlier will now be created and styled also using React-styled component libraries. the idea of reusable components is that they can be imported and used in any part of the website without writing the same code block over again. To do that, we open a new `Styles.js` file which we will subsequently write all our styles functions below:

```JavaScript
import styled from "styled-components/macro";

export const Container = styled.div`
display: flex;
border-bottom: 8px solid black;
`;
export const Item = styled.div`
color: black;
border: 1px solid black;
margin-bottom: 10px;
max-width: 700px;
width: 100%;
margin: auto;
&:first-of-type {
margin-top: 1em;
}
`;
export const Inner = styled.div`
display: flex;
padding: 70px 45px;
flex-direction: column;
max-width: 815px;
margin: auto;
`;
export const Question = styled.div`
display: flex;
font: 20px;
justify-content: space-between;
cursor: pointer;
margin-bottom: 1px;
font-weight: normal;
background: #303030;
padding: 0.8em 1.2em;
user-select: none;
align-items: center;
`;
export const Body = styled.p`
max-height: 1200px;
transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
font-size: 16px;
font-weight: normal;
line-height: normal;
background: #303030;
padding: 0.8em 2.2em 0.8em 1.3em;
white-space: pre-wrap;
user-select: none;

@media (max-width: 600px) {
font-size: 16px;
line-height: 22px;
}
`;
export const Title = styled.h1`
font-size: 50px;
line-height: 6;
margin-top: 0;
margin-bottom: 8px;
color: black;
text-align: center;

@media (max-width: 600px) {
font-size: 35px;
}

color: black;
`;

`;
```

Our styles functions are fairly easy to understand. For starters those are not pure CSS codes, we are simply using the Styled-component library to implement JavaScript looking like CSS (CSS-in-JS), which is the beauty of this approach. The first thing to do when using styled-components libraries is to import it to any file you wish to use it in as shown above.
Finally, we added some responsiveness to keep our page looking good on large, medium, and small screens.

#### Step 6: Mapping and displaying the FAQs (Faq.js)
It is believed that the most preferred way of displaying items from an array is with the use of a `map` function. In our `App.js`, first, we clear the default boilerplate, thereafter We will import our dummies question from the JSON file we created earlier, then set up the `map` function by:

```JavaScript
import React from "react";
import faqsData from "./Faq.json";
import Accordion from "./Accordion";
export function App() {
return (
<Accordion>
<Accordion.Title>Frequently Asked Questions</Accordion.Title>
{faqsData.map((item) => (
<Accordion.Item key={item.id}>
<Accordion.Question>{item.question}</Accordion.Question>
<Accordion.Body>{item.answers}</Accordion.Body>
</Accordion.Item>
))}
<h5 >
Question not on the list? Contact out help desk for further enquiries
</h5>
</AppForm>
</Accordion>
);
}
```
from the snippet above, we imported our faq, mapped, and displayed them with their corresponding answers. we also made use of our reusable `Accordion` component.
Our FAQ page is ready for viewing on our browser. To do that, we open the `command terminal` in our text editor and run the command below

```bash
npm start
```

Alternatively

```bash
yarn start
```

Once the development server is up and running, you should get a page that looks like this:
![faq page](/engineering education/ building-faq-page-using-react-styled-components-with-react/image1)
Finally, to further enhance the beauty of our page, we will go ahead and add some font classes, remove unnecessary margins and change the background color of the page to black. To do that, delete the `app.css` file, thereafter, in the `index.css` file, simply paste the code snippet below:

```CSS
body {
background-color: black !important;
margin: 0;
color: white;
font-family: 'Arial', 'Helvetica Neue', 'sans-serif',;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smothing: grayscale;
font-size: 16px;
}
```

Once the code snippet is correctly implemented, your FAQ page should look like this below:
![faq page](/engineering education/ building-faq-page-using-react-styled-components-with-react/image2)

#### Conclusion
React-styled components, as we have discussed extensively in this article, combined with React.js can be used in numerous productive ways. In this tutorial, we created, styled, and displayed an FAQ page with React-styled component. you're at liberty to use the libraries in your next project. I hope this article was helpful to you.
Happy Coding!

#### References
https://www.styled-components.com/

