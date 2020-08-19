const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../Database");

const passportLogin = (passport) => {
  // Local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        //   Match username and Password
        try {
          const user = await User.findOne({ where: { username } });
          if (!user) {
            console.log('Invalid username')
            return done(null, false, { msg: 'Invalid username or password' })
          }
          let isMatch = await user.matchPassword(password);
          console.log('isMatch ', isMatch)
          console.log('Users ', user)
          if (user && isMatch) {
            return done(null, user);
          }
        } catch (err) {
          console.log('Log in failed ', err)
          return done(null, false, { msg: "Login failed" });
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(function (user) {
      if (user) {
        done(null, user.get())
      } else {
        done(user.errors, null)
      }
    })
  });
};

module.exports = passportLogin;
