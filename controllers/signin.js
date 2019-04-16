const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!(email && password)) {
        return res.status(400).json('Incorrect form submission');
    }
    return db.select('email', 'hash')
        .from('login')
        .where('email', '=', req.body.email)
        .then(user => {
            const isValid = bcrypt.compareSync(req.body.password, user[0].hash);
            if (isValid) {
                return db.select('*')
                    .from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(() => res.status(400).json("Unable to get user"))
            } else {
                res.status(400).json("Wrong credentials");
            }
        })
        .catch(() => res.status(400).json("Wrong credentials"));
};

module.exports = {
    handleSignin: handleSignin
};
