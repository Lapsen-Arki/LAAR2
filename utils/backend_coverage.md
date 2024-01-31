# Backend Coverage

```
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s    
------------------------------|---------|----------|---------|---------|----------------------
All files                     |   26.57 |    55.55 |   13.63 |   26.57 |                      
 src                          |   85.18 |        0 |     100 |   85.18 |                      
  app.ts                      |   85.18 |        0 |     100 |   85.18 | 22-25                
 src/api                      |   94.44 |      100 |     100 |   94.44 |                      
  routers.ts                  |   94.44 |      100 |     100 |   94.44 | 23,50-51             
 src/api/controllers          |   14.28 |       50 |   14.28 |   14.28 |                      
  adminAddData.ts             |   10.76 |      100 |       0 |   10.76 | 6-63                 
  editProfile.ts              |   10.14 |      100 |       0 |   10.14 | 6-67                 
  emailVerification.ts        |    7.54 |      100 |       0 |    7.54 | 5-53                 
  profiles.ts                 |   20.43 |       50 |   33.33 |   20.43 | 22-46,50-89,92-135   
  testingEmail.ts             |   15.38 |      100 |       0 |   15.38 | 5-26                 
 src/api/controllers/register |   13.79 |      100 |       0 |   13.79 |                      
  register.ts                 |   15.11 |      100 |       0 |   15.11 | 12-84                
  validateAndSanitizeName.ts  |   27.27 |      100 |       0 |   27.27 | 5-20                 
  validatePassword.ts         |    7.57 |      100 |       0 |    7.57 | 4-64                 
 src/config                   |   60.43 |    66.66 |   33.33 |   60.43 |                      
  firebseConfig.ts            |    62.9 |    66.66 |      40 |    62.9 | 18,21,27,30-31,42-59 
  nodeMailer.ts               |     100 |      100 |     100 |     100 |                      
  stripeClient.ts             |   23.52 |      100 |       0 |   23.52 | 3-15                 
 src/middleware               |   15.21 |      100 |       0 |   15.21 |                      
  adminAuth.ts                |   18.75 |      100 |       0 |   18.75 | 5-30                 
  checkAuth.ts                |   13.33 |      100 |       0 |   13.33 | 7-58                 
 src/utils                    |   15.71 |      100 |       0 |   15.71 |                      
  getUserIdFromTokenUtil.ts   |   42.85 |      100 |       0 |   42.85 | 5-12                 
  sendVerification.ts         |    9.37 |      100 |       0 |    9.37 | 4-32                 
  testController.ts           |   33.33 |      100 |       0 |   33.33 | 3-6                  
  verificationMessage.ts      |       0 |      100 |       0 |       0 | 1-18                 
```