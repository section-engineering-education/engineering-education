---
layout: engineering-education
status: publish
published: true
url: /building-faq-page-using-react-styled-components-and-react/
title: Building FAQ Page using React Styled Components and React.js
description: This tutorial will guide the reader on how to build an FAQ page using React.js and React-styled components.
author: kingsley-jack
date: 2021-11-27T00:00:00-13:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-faq-page-using-react-styled-components-and-react/hero.jpg
    alt: Building FAQ page using React-styled React.js Hero Image
---
Addressing user questions and concerns is a priority for corporations, online vendors, and even your small blog or website. An efficient way of handling user queries is having a comprehensive frequently asked questions (FAQ) page.
<!--more-->
In this tutorial, we will use a modern web design library known as React-styled components alongside React.js to create an attractive FAQ page that can be adopted and integrated into a new or already existing website.

### Key takeaways
By reading this tutorial, the reader will gain a good understanding of the following:
- Creating FAQ page with React-styled component and React.js.
- Adding and using styled-components.
- Styling and customizing the FAQ pages.
- Adding questions and answers with JSON.
- Creating reusable components with React-styled components.

### Prerequisites
Although this article is extremely beginner-friendly, basic knowledge of React.js and any other design framework will enable you to follow along with the tutorial.

Take a moment and enroll in a crash course if you do not possess any of the above.

### Tutorial overview
This article will be broken down into various steps required to create an FAQ page using React-styled component and React.js.

Let's begin with the first step:

#### Step 1: Creating the React.js app
Every React development cycle begins with the creation of the `react app`.

To achieve this, in your command terminal, run the command as shown below:

```bash
npm create-react-app Faq-app
```

Alternative, if you're a `yarn` user:

```bash
yarn create-react-app Faq-app
```

The above command will set up your application and install the default dependencies required to begin the development.

#### Step 2: Setting up the dependencies
React.js alone is capable of doing a lot of cool things. When we combine that power with some package dependencies, in our case React-styled components. This will dramatically reduce the complexity of developing and styling our application.

To install the dependencies into our `react app`, we go back to the command terminal and run the command below:

```bash
npm install styled-components
```

For `yarn` users:

```bash
yarn add styled-components
```

As simple as that, we have successfully added styled-components to our application.

Feel free to open up the `package.json` file and check the dependencies for `styled-components`.

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

#### Step 3: Creating an array of questions and answers
The approach we intend to adopt in this tutorial, is to have a `JSON` file that contains an array of questions and their corresponding answers.

Let's name the file as `faq.json`.

Then, we display the questions by creating a `map` function that loops over the array and displays all our questions and answers accordingly.

To achieve this in the `src` folder, create a `faq.json` file that accommodates the questions and answer as shown below:

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

Here, we have used an array of sample questions.

But, you could make use of actual questions about your website, products, or services.

Each dummy question has an `id`, which is required for mapping operations to prevent a repetition of data. We also have a question field, and a corresponding answer field.

#### Step 4: Creating the banner component
The banner component is the container where the questions and answers will be displayed.

To set up the component, we will create an `Banner.js` file with the code as shown below:

```JavaScript
import React, { useState } from "react";
import { Container, Header, Entity, Inner, Question, Text } from "./styles ";

const QuestionContext = React.createContext();
export default function Banner({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}
Banner.Header = function BannerHeader({ children, ...restProps }) {
  return <Header {...restProps}> {children}</Header>;
};
Banner.Entity = function BannerEntity({ children, ...restProps }) {
  const [open, setOpen] = useState(false);
  return (
    <QuestionContext.Provider value={{ open, setOpen }}>
      <Entity {...restProps}> {children}</Entity>
    </QuestionContext.Provider>
  );
};
Banner.Question = function BannerHeader({ children, ...restProps }) {
  const { open, setOpen } = React.useContext(QuestionContext);

  return (
    <Question onClick={() => setOpen((open) => !open)} {...restProps}>
      {children}
      {open ? <h3>^</h3> : <h3>+</h3>}
    </Question>
  );
};
Banner.Text = function BannerText({ children, ...restProps }) {
  const { open } = React.useContext(QuestionContext);
  return open ? <Text {...restProps}>{children}</Text> : null;
};
```

Let's better understand the code snippet above: 
- We created and used a context API named `QuestionContext` to monitor the state of our Banner component and to ensure that two questions cannot be opened simultaneously.
- Additionally, we imported a few reusable components, i.e. the Header, Questions, Text, and Entity which we will create and export soon. 
- The header will be displayed at the top of the page telling the user that it is an FAQ page. While the `Question` and `Text` will shown as the questions and answers respectively.

#### Step 5: Styling the Banner component
Those reusable components we imported earlier will now be created and styled also using React-styled component libraries.

The idea of reusable components is that they can be imported and used in any part of the website without having to write the same code block over again.

To do that, we open a new `Styles.js` file which we will subsequently write all our styles functions below:

```JavaScript
import styled from "styled-components/macro";

export const Container = styled.div`
  border-bottom: 9px solid #070707;
  display: flex;
`;
export const Entity = styled.div`
  color: #070707;
  border: 1px solid #070707;
  max-width: 690px;
  width: 99%;
  margin-bottom: 10px;
  margin: auto;
  &:first-of-type {
    margin-top: 1.5em;
  }
`;
export const Inner = styled.div`
  padding: 75px 40px;
  max-width: 800px;
  margin: auto;
  flex-direction: column;
  display: flex;
`;
export const Question = styled.div`
  font: 25px;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 2px;
  display: flex;
  font-weight: normal;
  background: #1a1919;
  padding: 0.75em 1.12em;
  align-items: center;
`;
export const Text = styled.p`
  max-height: 1190px;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  background: #303030;
  transition: max-height 0.23s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.9em 2.1em 0.7em 1.4em;
  user-select: none;
  white-space: pre-wrap;

  @media (max-width: 550px) {
    font-size: 15px;
    line-height: 25px;
  }
`;
export const Header = styled.h1`
  color: #070707;
  line-height: 7;
  margin-top: 0 !important;
  font-size: 45px;
  margin-bottom: 9px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 33px;
  }

  color: #070707;
`;
```

For starters, those are not pure CSS codes, we are simply using the styled-component library to implement JavaScript looking like CSS (CSS-in-JS), which is the beauty of this approach.

The first thing to do when using styled-components libraries is to import it to any file you wish to use it in as shown above.

Then, we added some responsiveness to keep our page looking good on large, medium, and small screens.

#### Step 6: Mapping and displaying the FAQs
It is believed that the most preferred way of displaying items from an array is with the use of a `map` function.

In our `App.js`, first, we clear the default boilerplate. 

Thereafter, we will import our sample questions from the JSON file we created earlier, then set up the `map` function by:

```JavaScript
import React from "react";
import questions from "./Faq.json";
import Banner from "./Banner";
export function App() {
  return (
    <Banner>
      <Banner.Header>Frequently Asked Questions</Banner.Header>
      {questions.map((question) => (
        <Banner.Entity key={question.id}>
          <Banner.Question>{question.question}</Banner.Question>
          <Banner.Text>{question.answers}</Banner.Text>
        </Banner.Entity>
      ))}
      <h4>
        Question not on the list? Contact out help desk for further enquiries
      </h4>
    </Banner>
  );
}
```

From the snippet above, we imported our FAQs, mapped, and displayed them with their corresponding answers using reusable `Banner` component.

Our FAQ page is ready for viewing on our browser. To do that, we open the `command terminal` in our text editor and run the command below.

```bash
npm start
```

Alternatively:

```bash
yarn start
```

Once the development server is up and running, you should get a page that looks like this:

![faq page](/engineering-education/building-faq-page-using-react-styled-components-and-react/image1.jpg)

Finally, to further enhance the beauty of our page, we will go ahead, and add some font classes, remove unnecessary margins and change the background color of the page to #070707.

To do that, delete the `app.css` file, and then in the `index.css` file, simply paste the code snippet below:

```CSS
body {
  background-color: #070707 !important;
  margin: 0;
  color: white;
  font-family: "Arial", "Helvetica Neue", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smothing: grayscale;
  font-size: 16px;
}
```

Once the code snippet is correctly implemented, your FAQ page should look like this below:

![faq page](/engineering-education/building-faq-page-using-react-styled-components-and-react/image2.jpg)

### Conclusion
React-styled components, as we have discussed extensively in this article, combined with React.js can be used in numerous productive ways. In this tutorial, we created, styled, and displayed an FAQ page with React-styled component.

You can find the full code [here](https://github.com/KingsleyJack/faq-app).

Happy coding.

### References
- [React styled components](https://www.styled-components.com/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
