User acceptance testing(UAT) is the final stage in the software development process before moving to production. The provided software solution or product is validated against business requirements. This article will discuss UAT in detail.

### What is user acceptance testing (UAT)?
UAT is conducting a test on whether a software product meets the business requirements. It is the final stage of software development before moving to production. The end-user does it to verify a software system before moving the software product to the live environment. It confirms whether the solution works well for the user or not.

UAT is different from [unit testing](https://www.tutorialspoint.com/software_testing_dictionary/unit_testing.htm), [integration testing](https://www.guru99.com/integration-testing.html), and [system testing](https://www.softwaretestinghelp.com/system-testing/). System testing ensures that the system does not crash and meets the documented requirements. On the other hand, UAT ensures that the software system is working as per the business requirements. The system is evaluated in real-life scenarios from the external user point of view. You should do the test in an environment equivalent to a production environment.

The diagram below shows where UAT falls in the software development process.

![software process](/engineering-education/how-to-carry-out-effective-user-acceptance-testing-uat/software-process.jpg)

#### Objectives of UAT
- To confirm that the software product can perform all the business functions.
- To confirm that the software product is usable from the end-users perspective.
- To certify that the software product is ready to move to production.

#### Who conducts UAT?
The end-users or the client conducts UAT. These can be the end-users of a custom made software or someone who has requested custom software from a software developer as a service. The people performing the test are called the test team. In an organization, the team should comprise members from all departments and different groups. The testing team should comprise of subject matter experts. For example, accounting software UAT should involve accountants.

#### UAT Prerequisites
Some requirements must be met before performing a UAT test. These includes:
- Provide business requirements to the testing team. UAT is done against business requirements.
- The system must be fully developed and error-free. Only cosmetic defects are allowed. These are low-priority errors from a business point of view and do not affect the testing process.
- System testing, integration testing, and unit testing should be completed. System errors are not expected at this stage. The reported flaws are already fixed and evaluated before UAT.
- UAT environment should be available.
- [Regression testing](https://www.guru99.com/regression-testing.html) should be complete to confirm that recent code changes do not affect the software.

### Why you need user acceptance testing
Developers develop software according to their interpretation of the requirements provided. Developers may think they followed the requirements specified only to discover errors after a product is rolled out. It is thus important to confirm that the software is conforming to the business requirements.

There could be some business changes that might not have been communicated to the development team effectively. UAT would be able to capture such.

#### UAT process
The UAT process can be divided into four phases. In each phase, there are several activities done, as listed below.
**1. Planning**
- The list of business processes to be tested is prepared.
- Defining the acceptance criteria.
- Select the testing team.
- Prepare the test data. The test data should cover all the software's functional scenarios in real-world usage.
- Prepare a UAT test plan. UAT test Plan is prepared for the test execution.

**2. Design**
- Design the test. We use the information collected in the planning phase to design the tests.

**3. Execution**
- Execute the test using the test data and document the results. Defects found in the system are resolved and re-tested.

**4. Confirmation of business objectives**
- Sign-off: This states that the software product meets the business requirements and is ready for production. The overall UAT process's deliverables are Test Plan, UAT scenarios and test cases, test results, and defect Log.

### User acceptance testing tips
It is every test engineer's dream to ensure that the right solution is delivered to the users. This section will discuss tips for performing UAT and best practices.
- Set up the right environment: Having a production-like test environment is important. Accurate performance testing cannot be carried out in test environments.
- Plan your test: Design a clear test acceptance plan during the requirement analysis and design phase. Planning reduces pressure to meet deadlines.
- Train the UAT staff enough: The testers need to be trained on the developed business requirements. During the planning phase, select and train testers. This can significantly increase the success of UAT.
- Have the right communication channel. UAT involves collaboration between the development, quality assurance(QA), and UAT team. Having a proper communication channel is key to the success of UAT, especially when the teams are working remotely. 
- Do not use the functional testing team: Functional testers are not meant to perform UAT. Functional testers may end up not testing all real-world scenarios. This leads to end-users finding issues when the software is in production.

### Conclusion
UAT is the last chance to identify and rectify defects. Businesses may suffer losses if UAT is not performed. The losses occur due to fixing system issues after production, which is more expensive than fixing before production. The organization may also lose reputations as a result of moving defective software to production. Therefore, UAT is vital. Software testing is a broad field in computing. Certifications such as [Certified Test Engineer(CSE)](https://www.softwaretestinghelp.com/cste-certification-guide/) are also available.