# [**Tasks Manager**](http://43.204.231.245/)

**A user oriented app that allows its users to manage their daily tasks.**

_This app uses a login system on top of the task manager app, that separates the user's data with the help of id's._

_The app uses OAuth 2.0 authentication using JSON Web Token,_

_Meaning a user can only access the app if he has an access token,_

_And to get the access token the user has to either register or login._

_The access token also controls the endpoints at the backend as well, protecting the data from both sides._

_In terms of password protection, it is first encrypted using bcrypt then, is sent to the db. Also, when comparing the passwords, we use a bcrypt.compare function that performs the password matching without decrypting it, hence the password remains safe on both sides._

_The app allows the user to enter a task name and submit it, the tasks are all collected below in a container that displays all the tasks the user has entered. The task box is provided with 2 features, first of editing the task to change its name and second of completing the task to remove it from the container._

_When the user's session is done, the user can log out as well and open the app whenever he/she sees fit._

**The Technologies Used:**

- _Node.js_
- _Express.js_
- _MongoDB_
- _React.js_

**Additional Packages:**

- _Validator_
- _Bcrypt_
- _JsonWebToken_

_To access the website you can go to its link given_ [_here_](http://43.204.231.245/)_._

 **To Run The App on your own localhost:** 

- _First clone the repo using:_

>> git clone https://github.com/gursahajbedi/taskmanager.git

- _Then open your cmd and navigate to the folder you cloned the file into._

- _Now navigate to the_ _ **"frontend"** _ _and use:_

>> npm install

- _Also run this command to get a production build of the frontend:_

>> npm run build

- _Now navigate to the_ _ **"backend"** _ _and use:_


>> npm install

- _After all of this create you .env file in the backend:_

1. _Inside the .env file write:_

_(The uri will be provided by mongoDB and the secret will be written by you)_

>> _MONGO\_URI =_ mongodb+srv://\<username\>:\<password@\<clustername&id\>.mongodb.net/\<database\>?retryWrites=true&w=majority

>> SECRET= yourownsecret

- _After you have made the changes in the env file just run the following command in the CMD (which is navigated to backend):_

>> _npm start_

_And with that you're all set to run the following app on your localhost._
