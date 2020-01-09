# envoy
    A app to manage visitors

# Node configuration for this project
    bpatel:envoy bpatel$ nvm version
    v6.16.0
    bpatel:envoy bpatel$ node -v
    v6.16.0
    bpatel:envoy bpatel$ npm -v 
    3.10.10
    
    
    You will need to install node modules first. Do the following.
    
    bpatel:envoy bpatel$ npm install 

# Unit testing 

jest and enzyme is used for unit testing in this project. 
   
    
    bpatel:envoy bpatel$ jest
     
   
To check the code coverage by unit tests run the following comamnd.

```
snv-bpatel:envoy bpatel$ jest --coverage -u 
 PASS  src/components/visitors/visitors.test.js
 PASS  src/components/visitor/visitor.test.js
 PASS  src/components/search/Search.test.js
 PASS  src/components/visitorForm/visitorForm.test.js
------------------------|----------|----------|----------|----------|-------------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------------|----------|----------|----------|----------|-------------------|
All files               |    94.29 |    88.16 |    95.65 |    94.29 |                   |
 components/search      |       85 |    66.67 |    83.33 |       85 |                   |
  search.js             |       85 |    66.67 |    83.33 |       85 |          68,69,81 |
 components/visitor     |    94.44 |    91.67 |      100 |    94.44 |                   |
  index.js              |        0 |        0 |        0 |        0 |                   |
  visitor.js            |    94.44 |    91.67 |      100 |    94.44 |                43 |
 components/visitorForm |    97.22 |    92.31 |      100 |    97.22 |                   |
  index.js              |        0 |        0 |        0 |        0 |                   |
  visitorForm.js        |    97.22 |    92.31 |      100 |    97.22 |                45 |
 components/visitors    |      100 |      100 |      100 |      100 |                   |
  index.js              |        0 |        0 |        0 |        0 |                   |
  visitors.js           |      100 |      100 |      100 |      100 |                   |
 services               |    95.65 |     87.5 |      100 |    95.65 |                   |
  entryService.js       |    95.65 |     87.5 |      100 |    95.65 |                34 |
------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 4 passed, 4 total
Tests:       18 passed, 18 total
Snapshots:   11 passed, 11 total
Time:        4.124s
Ran all test suites.
snv-bpatel:envoy bpatel$ 

```
        

# Run the application

This is a node and webpack based project. npm command can be used to run the application. 

    bpatel:envoy bpatel$ npm run start
    

If built/compiled successfully the app will run on http://localhost:8080

    Built at: 12/04/2019 4:57:56 PM
         Asset       Size  Chunks                   Chunk Names
     bundle.js   1.47 MiB    main  [emitted]        main
    bundle.map   2.62 MiB    main  [emitted] [dev]  main
    index.html  806 bytes          [emitted]        
    Entrypoint main = bundle.js bundle.map
    [0] multi (webpack)-dev-server/client?http://localhost:8080 ./src/index.js 40 bytes {main} [built]

## Next Steps

##### Write e2e test for browser testing
##### Deploy to CICD and run tests on code checkin
##### Simulate the production environment 
##### Perform performance/stress testing

# Future enhancements

The redux integration is done successfully and it was working. The final changes do not have the redux piece in working condition.


