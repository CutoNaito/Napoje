import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import axios from 'axios';
import 'dotenv/config';
import bcrypt from 'bcrypt';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_API_CLIENT_ID,
            clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
            callbackURL: '/auth/google/redirect'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('passport callback function fired');
            
            async function getUser() {
                const user = await axios.get('http://localhost:4000/api/users/name/' + profile["displayName"]);
                const result = user.data;
                if (result.message === 'User found!') {
                    console.log('This user already exists in the database');
                    done(null, result.result);
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const token = await bcrypt.hash(profile["id"], salt);
                    const newUser = await axios.post('http://localhost:4000/api/users', {
                        name: profile["displayName"],
                        email: profile["emails"][0]["value"],
                        password: profile["id"],
                        token: token
                    });
                    document.cookie = "token=" + token;
            }
            getUser();
        }
    )
);

export default passport;