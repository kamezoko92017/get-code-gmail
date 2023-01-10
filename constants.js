require('dotenv').config()

const auth={
    type:'OAuth2',
    user:'traique8888@gmail.com',
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    refreshToken:process.env.REFRESH_TOKEN
    
}

const mailoptions = {
    from:'Siddhant <traique8888@gmail.com>',
    to:'nguyenvanmot73@gmail.com',
    subject:'Gmail API NodeJS',
}
module.exports={
    auth,
    mailoptions
}