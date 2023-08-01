# user_database

How to run database:
Currently I have created an express server running locally on PORT 3001. The user_controller.mjs
file can be adjust to run the database on another server. Additionally, MongoDB was used for the 
database with support of Mongoose. The schema can be found in the user_model.mjs file. To develop
the database, support was used from CS290 modules as well as the walkthrough here:
https://www.youtube.com/watch?v=b91XgdyX-SM&ab_channel=codedamn and the GitHub repository here:
https://github.com/mehulmpt/node-auth-youtube/tree/master. This outside support was used due to unfamiliarity
with validating user login information.

The database as currently written can be run using the command "node user_controller.mjs" lines 15 and 16:
const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, 'static')))
Can be deleted as this was used to link to the static pages. My partner will implement the UI and client interface
to interact with the database.


How to make request and receive data using Javascript:
Add user with endpoint '/users:
const result = await fetch('/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password,
                        fname,
                        lname,
                        email,
                        phone
					})
				}).then((res) => res.json())

Get users with endpoint '/users':
const response = await fetch('/users');
Query parameters can be added with '/users?${_id}' in request

Verify user login with endpoint '/user_login':
const result = await fetch('/user_login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password
					})
				}).then((res) => res.json())

Put to update user with endpoint '/users/:_id':
 const response = await fetch(`/${userToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedUser),
            headers: {
                'Content-Type': 'application/json',
            },
        });

Delete user with endpoint '/users/:_id':
const response = await fetch(`/users/${_id}`, {method: 'DELETE'});

The response from the database will be sent through the 'response' varible and the status can be verified to ensure it was successful


UML Diagram
![image](https://github.com/chambbri/user_database/assets/81598075/7ca9493b-59c4-4dde-977e-b53a70794d31)





