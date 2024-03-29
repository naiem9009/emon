const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

const loginController = (req, res) => {
    const {email, password} = req.body

    prisma.user.findUnique({where: {email}}).then( async (user) => {
        const passCompare = await bcrypt.compare(password, user?.password)
        if (!passCompare) return res.status(200).render('admin/auth/login', {"success": false, "message": "Password Incorrect"})

        return res.status(200).render('admin/auth/login', {"success": true, "message": "Login Successful"})
    }).catch((err) => {
        return res.status(200).render('admin/auth/login', {"success": false, "message": "Login failed"} )
    })
    
}

// export const registerController = async (req:Request, res:Response) => {
//     const {email, password, fullName} = req.body
    
//     const hashPassword = await bcrypt.hashSync(password, 10)

//     prisma.user.create({
//         data:{
//             email,
//             password: hashPassword,
//             fullName
//         }
//     }).then((user:any) => {
//         res.json(user)
//     })


// }

module.exports = {
    loginController
}