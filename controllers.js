const axios = require('axios');
const { generateConfig } = require('./utils')
const nodemailer = require("nodemailer");
const CONSTANTS = require('./constants')
const { google } = require("googleapis");
const { query, response } = require('express');
require('dotenv').config()

// const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)
// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function getAllMessage(req, res) {
    try {
        // console.log('req:',req.query.email);
        const oAuth2Client = new google.auth.OAuth2(req.query.CLIENT_ID, req.query.CLIENT_SECRET, req.query.REDIRECT_URL)
        oAuth2Client.setCredentials({ refresh_token: req.query.REFRESH_TOKEN });

        const sub = "CoinMarketCap Earn";

        //Cú pháp của truy vấn tham khảo tai: https://developers.google.com/gmail/api/guides/filtering#differences
        //Tham số của truy vấn tham khảo tại: https://support.google.com/mail/answer/7190

        // const url = `https://gmail.googleapis.com/gmail/v1/users/${req.query.email}/messages?q=before:2020/09/13 subject:${sub}`;
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.query.email}/messages?q=from:accounts@e.coinmarketcap.com`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        //Lấy id của Email mà Coinmarketcap gửi đến
        let idGmail = response.data.messages[0].id;


        //Đọc gmail theo ID đã lấy
        try {
            const url = `https://gmail.googleapis.com//gmail/v1/users/${req.query.email}/messages/${idGmail}`;

            const { token } = await oAuth2Client.getAccessToken();
            const config = generateConfig(url, token);
            const response = await axios(config);

            //   let data = await response.data.payload.parts;
            let data = await response.data.snippet;

            let k = data.indexOf("code");
            console.log('code la: ', data.substr(k + 6, 6));

            // console.log('data Coinmarketcap: ', data);
            // res.json(data);
        } catch (error) {
            // res.send(error);
        }


    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

async function readMail(req, res) {
    try {
        const oAuth2Client = new google.auth.OAuth2(req.query.CLIENT_ID, req.query.CLIENT_SECRET, req.query.REDIRECT_URL)
        oAuth2Client.setCredentials({ refresh_token: req.query.REFRESH_TOKEN });

        const url = `https://gmail.googleapis.com//gmail/v1/users/${req.query.email}/messages/${req.params.messageId}`;

        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);

        //   let data = await response.data.payload.parts;
        let data = await response.data.snippet;

        res.json(data);
    } catch (error) {
        res.send(error);
    }
}

async function sendMail(req, res) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                ...CONSTANTS.auth,
                accessToken: accessToken
            }
        })
        const mailOptions = {
            ...CONSTANTS.mailoptions,
            text: 'The Gmail API with NodeJS works'
        }
        const result = await transport.sendMail(mailOptions)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

async function getUser(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config)
        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

async function getDrafts(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config)
        res.json(response.data)

    } catch (error) {
        console.log(error)
        return error;
    }
}

async function searchMail(req, res) {
    try {
        const url = `https://www.googleapis.com/gmail/v1/users/me/messages?q=${req.params.search}`
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token)
        const response = await axios(config);
        console.log(response);
        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

};

module.exports = {
    getUser,
    sendMail,
    getDrafts,
    searchMail,
    readMail,
    getAllMessage,
}