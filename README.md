# EXCEPTIONS MANAGEMENT

## 1. Application Overview

A microservice-based application that stores exceptions generated from various applications belonging to different organizational units. It allows to manage exceptions by providing a web interface to view, update, resolve and compare exceptions. It provides a flexible interface to filter exceptions based on desired criteria. The application also presents a statistical analysis of the generated exceptions specific to an organization unit. The application provides an API that can be used for connecting to any 3rd-Party application.

Project Link-
[http://exception-management-ui-db-intern-2020.apps.123.252.203.195.nip.io/](http://exception-management-ui-db-intern-2020.apps.123.252.203.195.nip.io/)

## 2. Approach
The main idea was to make the system modularised.

To achieve this Layered Architecture is Implemented.

All the components are Decoupled Isolated Components/Layers.

1. Business Logic (BL) - 
This Layer is responsible for handling all the Business Logic for the application. All of the logic is implemented in this Layer.
2. Database (DB)
This Layer is responsible for persisting and finding the Data for Business Logic Layer.
3. API - 
This Layer is responsible for providing an Interface for the Users to access. This Layer also implements Authentication and Authorization.

Everything is based around Business Logic.

![](images/layer_diagram.jpg)

All the other layers are interchangeable.
Multiple API and DB Layer can be present at the same time.

The business logic is completely decoupled from Database Logic and Communication Logic. This allows us to have multiple Database and Communication at the same time. Everything is modularised so its easy to plug any new Database or API Protocol.

The approach is highly scalable as individual Layers can also be Scaled separately.

For Authentication and Authorization JWT Based Token Mechanism is used.
But it also interchangeable and multiple Authentication and Authorization Mechanisms can exists at the same time. 

For actual implementation Spring Boot is used.
Front-end is implemented using React, React-Admin and few other supporting libraries.

The implementation approach is container ready and can be deployed on any container based platform. And if required can also be deployed on bare metal server.

An automated deployment pipeline is also created for CI/CD.

This Pipeline is written is Jenkins which has three Stages - 
1. Fetch Code
2. Build the Container Image
3. Deploy the Container Image

![](images/deployment_pipeline.png)


The project is currently deployed on an OpenShift Platform.

## 3. Technology Stack
Front end:
* React
* React-Admin
* Material UI
* Victory

Back end:
* JAVA Spring Boot Microservices
* JWT authentication
* REST APIs

Database:
* PostgreSQL

Deployment:
* Openshift
* Jenkins


## 4. Features
### Login and Registration
* User login and registration, Admin login.

### Users
1. Exceptions
* Exception Table showing all the exceptions from the user’s organization unit
* Edit exception that includes resolving an exception, adding a comment, etc.
* Store versions of every exception and compare different versions with each other. 

2. Business Components
* List of business components under the organization unit.
* User can add a new business component but needs admin approval to be able to use it.

3. Summary
* Exception summary based on status and severity.

### Admin
1. Users
* List of registered users. Admin can grant/revoke access to a user.

2. Organization Unit
* List of organization units. Admin can create new organizational units.

3. Business Components
* Grant/Revoke approval to business components.

4. Rejected exceptions
* Exceptions with invalid fields such as non- existential organization units or business components.

## 5. Architecture Diagram

![](images/architecture_diagram.jpg)

## 6. Data Flow Diagram

![](images/data_flow_diagram.jpg)

## 7. SDLC
Agile SDLC model is a combination of iterative and incremental process models with focus on process adaptability and customer satisfaction by rapid delivery of working software product. Agile Methods break the product into small incremental builds. These builds are provided in iterations. Each iteration typically lasts from about one to three weeks. Every iteration involves cross functional teams working simultaneously on various areas like −

* Planning
* Requirements Analysis
* Design
* Coding
* Unit Testing and
* Acceptance Testing.

At the end of the iteration, a working product is displayed to the customer and important stakeholders.

## 8. Error Handling

Within the application an error handling mechanism is placed to handle various runtime errors that occur in the system. For each of the errors and appropriate response is sent to the Client.

1. During Exception Validation -
 - If any of the required fields are missing
 - Data-type of the fields are incorrect
 - Org Unit and/or Business Component is incorrect

2. During Finding Exceptions -
- Provided Filter is invalid
- The requested page data is not present

3. During Finding an Exception and its versions -
- Requesting User is not allowed the access to requested Exception
- The requested Exception is not found

4. During Authentication -
- Provided Credentials are Invalid
- Authenticating User is not approved

5. During Business Component Management -
- Requesting User is not allowed the access to requested Business Component
- The requested Business Component is not found

6. During Org Unit Management -
- Requesting User is not allowed the access to requested Org Unit
- The requested Org Unit is not found


## 9. API Documentation
Link - [http://dbx-dbx.apps.123.252.203.195.nip.io/swagger-ui.html](http://dbx-dbx.apps.123.252.203.195.nip.io/swagger-ui.html)

## 10. UI Documentation

### 1. SignIn and SignUp Page
* Users can sign-in and sign-up by providing the necessary credentials.	
![](images/ui/login.jpeg)
![](images/ui/register.jpeg)


### 2. User 

2.1 Exception Table
* Table showing exceptions and its details.
![](images/ui/exceptions.jpeg)

2.1.1 Filters
* The table can be filtered based upon status, severity, severity order, category, and source.

![](images/ui/filter.jpeg)

2.1.2 Edit Button
* An exception can be edited in the following ways.
* Change severity
* Change status (Unresolved to resolved)
* Change technical description
* Add/ Change comment.

![](images/ui/edit_exception.png)

2.1.3 Versions
* Click on the exception row to view the exception details and version history. 
* Click on the compare button to compare a particular version to its latest version.

![](images/ui/exception_overview.jpeg)
![](images/ui/version_compare.jpeg)

2.2 Business Components
* List of business components under that organization unit.

![](images/ui/user_business_component.png)

* User can create a new business component but needs admin approval before proceeding further.

![](images/ui/create_business_component.png)

2.3 Summary
* Summary includes -
* Pie Chart depicting exception statuses.
* Pie Chart depicting exception severity.
* Stack Chart depicting exception severity of exceptions generated in the past 7 days.

![](images/ui/summary.jpeg)

### 3. Admin
3.1 Users
* List of all users along with their details.

![](images/ui/users.jpeg)

3.1.1 Edit
* Approve / Disapprove a user for exceptions access.

![](images/ui/user_edit.png)

3.2 Organization Units
* List of organization units.

![](images/ui/org_units.jpeg)

3.2.1 Create 
* Admin can create new Organization Units.

![](images/ui/create_org_unit.png)

3.3 Rejected Exceptions
* Exceptions with invalid fields such as non- existential organization units or business components.
* Admin can approve such exceptions if corresponding organization units or business components are created and approved.

![](images/ui/rejected_exceptions.jpeg)

3.4 Business Components
* List of all business components.

![](images/ui/admin_business_components.jpeg)

3.4.1 Edit 
* Grant/Revoke approval to business components.

![](images/ui/edit_business_component.png)

## 11. Code Coverage Report

![](images/code_coverage.png)

## 12. Estimation and Time Planning

| No. | Component | Description | UI | API |
|:--- |:---:| ---:| --- | --- |
| 1. | Auth | User authentication and authorization | 3 | 6 |
| 2. | Org Unit | Org Unit creation and listing | 3 | 3 |
| 3. | Business Component | Business Component creation, approval and listing | 3 | 3 |
| 4. | User | User registration, log and approval | 11 | 13 |
| 5. | Accept Exceptions | Accept Incoming Exception generated | - | 8 |
| 6. | Validate Exception | Validating incoming exception and ensuring correctness | - | 14 |
| 7. | Find Exceptions | Finding Exceptions for the user | 5 | 8 |
| 8.  | Rejected Exceptions Approval | Rechecking rejected exceptions for approval | 3 | 5 |
| 9. | Exception Filtering | Filtering desired exceptions | 5 | 12 |
| 10. | Summary | Summary of the Exceptions | 3 | 2 |
| 11. | Unit Tests | Unit Testing | - | 24 |
| 12. | Miscellaneous | Miscellaneous | 2 | 2 |
| 13. | Deployment Pipeline | Creating Deployment Pipeline and Deploying the application | 3 | 2 |
| 14. | Documentation | Documentation of API and UI Guide | 4 | 3 |
|  |  | Total | 45 | 105 |

**Cost** - $10 * 150 = $1500

