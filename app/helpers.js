const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;
const fs=require('fs')
// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
    const getUserInfo = {
        _id: request._id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        role: request.role,
        image:request.image
    };

    return getUserInfo;
};

exports.getRole = function getRole(checkRole) {
    let role;

    switch (checkRole) {
        case ROLE_ADMIN:
            role = 4;
            break;
        case ROLE_OWNER:
            role = 3;
            break;
        case ROLE_CLIENT:
            role = 2;
            break;
        case ROLE_MEMBER:
            role = 1;
            break;
        default:
            role = 1;
    }

    return role;
};
exports.saveFile=function saveFile(file){
    let name= Math.round(Math.random()*10000000) +""+ +new Date();
    let path=process.cwd()+"/public/uploads/"+name;
    let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    let imbuffer = new Buffer(matches[2], 'base64')
    fs.writeFileSync(path, imbuffer);
    return 'https://yalabenanotlob.herokuapp.com/uploads/'+name;
}
exports.removeFile=function removeFile(file){
    let matches = file.match(/\/([^/]+)$/);
    let path=process.cwd()+"/public/uploads/"+matches[1];
    if (fs.existsSync(path)) {
        fs.unlink(path);
    }

}
