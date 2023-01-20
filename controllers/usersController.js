// Creating the sign up & login logic for the users
const userData = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.userSignup = async (req, res) => {
    const {username, password} = req.body

    try{
        // You usually store the hashed password because in case there is database injection from hackers, you wouldn't want your users password
        // to be plainly available string.
        const hashPassword = await bcrypt.hash(password, 12)
        const user = await userData.create({
            username,
            password: hashPassword
        })
        res.status(200).json({
            status: 'Success',
            data: {
                post
            }
        })

    }catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }

}

exports.userLogin = async (req, res) => {
    const {username, password} = req.body
    try{
        // Check if there exist a user given
        const user = await userData.findOne({username})
        
        if(!user){
            return res.status(404).json({
                status: 'Failed :(',
                message: 'No user found'
            })
        }

        // Compares the given password with the hashed password and returns bool
        const isCorrect = await bcrypt.compare(password, user.password)

        // If correct then log-in or request failed
        if(isCorrect){
            res.status(200).json({
                status: 'Success',
            })
        } else {
            res.status(400).json({
                status: 'Failed',
                message: 'Incorrect password or username'
            })
        }
        

    }catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }

}