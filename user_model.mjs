/* NOTE; support for using bcrypt was gathered from
a tutorial at this link https://www.youtube.com/watch?v=b91XgdyX-SM&ab_channel=codedamn
and the github repository here: https://github.com/mehulmpt/node-auth-youtube/tree/master
*/

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.connect(
    'mongodb://127.0.0.1:27017/users_db',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

const userSchema = mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userFName: { type: String, required: true },
    userLName: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    phone: { type: String, required: false, unique: false }
});

const User = mongoose.model("User", userSchema);

const createUser = async (userName, password, userFName, userLName, email, phone) => {
    const user = new User({ userName: userName, password: password, userFName:userFName, userLName: userLName, email: email, phone: phone })
    //console.log(user.save());
    return user.save();
}

const verifyUser = async (userName, password) => {
    // verify that the user exists entered for the login
    const user = await User.findOne({ userName }).lean()

    if (!user) return false;

    if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		return true
	}

	return false
}

export {createUser, verifyUser};