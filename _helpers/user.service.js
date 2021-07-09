const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    addToRecent,
    delete: _delete
};
 
async function authenticate({ userName, hash }) {
    const user = await User.findOne({ userName });
    if (user && bcrypt.compareSync(hash, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ userName: userParam.userName })) {
        throw 'UserName "' + userParam.userName + '" is already taken';
    }

    const user = new User(userParam);

    // hash hash
    if (userParam.hash) {
        user.hash = bcrypt.hashSync(userParam.hash, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.userName !== userParam.userName && await User.findOne({ userName: userParam.userName })) {
        throw 'UserName "' + userParam.userName + '" is already taken';
    }

    // hash hash if it was entered
    if (userParam.hash) {
        userParam.hash = bcrypt.hashSync(userParam.hash, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}


async function addToRecent(userId, projectId) {
    return await User.updateMany({"_id" : userId},
    {$set:{"recentProjects":{ "recentID": projectId}}},
    {
        upsert: true}
    );
    
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}