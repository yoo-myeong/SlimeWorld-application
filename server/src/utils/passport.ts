import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import passport from "passport";
import passportLocal from "passport-local";
import { User } from "../entity/users/users.entity";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
    try {
        const user = await getRepository(User).findOne({ where: { id } });
        done(null, {
            username: user.username,
            position: user.position,
        });
    } catch (e) {
        done(null, null);
    }
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: true,
        },
        async (email, password, done) => {
            const user = await getRepository(User).findOne({ email });
            if (!user) {
                return done(null, false, { message: "wrong" });
            }

            const compared = await bcrypt.compare(password, user.password);
            if (!compared) {
                return done(null, false, { message: "wrong" });
            }

            return done(null, user);
        },
    ),
);

export default passport;
