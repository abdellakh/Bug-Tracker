const User = require("../models/users");


let allowedToAccess = async (decoded) => {
    const user = await User.findById(decoded.user.id);
    return new Promise((resolve) => {
        if (!user || user.account.suspention.status || user.account.archived || user.credentials.loginToken !== decoded.user.loginToken)
            return resolve({ success: false });
        resolve({ success: true, user: user })
    })
}

module.exports.isAllowed = async (decoded) => {
    return await allowedToAccess(decoded);
};

module.exports.isAdmin = async (decoded) => {
    const user = await User.findById(decoded.user.id);
    return new Promise(async (resolve) => {
        let check = await allowedToAccess(decoded);
        if (!check.success)
            return resolve(check);
        else
            if (check.user.account.role != "admin")
                return resolve(false)
            else
                return resolve(true)
    })
};

