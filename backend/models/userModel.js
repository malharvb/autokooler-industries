const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
} )


userSchema.statics.signIn = async function(username, password) {
    const user = await this.findOne({username})

    if (!user) {
        throw Error('Invalid user name')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        throw Error('Invalid password')
    }

    return user
}


userSchema.statics.changePassword = async function(username, password, newPassword) {
    const user = await this.findOne({username})

    if (!user) {
        throw Error('Invalid user name')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        throw Error('Invalid password')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedNewPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedNewPassword
    user.save()

    return user

}

userSchema.statics.changePassword = async function(username, password, newPassword) {
    const user = await this.findOne({username})

    if (!user) {
        throw Error('Invalid user name')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        throw Error('Invalid password')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedNewPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedNewPassword
    user.save()

    return user

}

module.exports = mongoose.model('User', userSchema)