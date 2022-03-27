import passport from "passport";
import passportLocal from "passport-local";

const authData = [
    { id: 0, email: "con@email.com", password: "abcd1234" },
    { id: 1, email: "ab@email.com", password: "abcd1234" },
];

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
    done(null, authData[id]);
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: true,
        },
        (email, password, done) => {
            if (email !== "con@email.com") return done(null, false, { message: "wrong" });
            if (password !== "abcd1234") return done(null, false, { message: "wrong" });
            return done(null, authData[0]);
        },
    ),
);

export default passport;
