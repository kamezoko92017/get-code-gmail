const express = require("express");
const routes = require("./routes");

const { Base64 } = require('js-base64');

require('dotenv').config()

const app = express();

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
})

app.use('/api', routes);

app.get("/", async (req, res) => {
    // const result=await sendMail();
    res.send('Welcome to Gmail API with NodeJS')
})

// let encoded="VHdpdHRlciANCj4gaHR0cHM6Ly90d2l0dGVyLmNvbQ0KDQpC4bqhbiBjw7MgMyB0aMO0bmcgYsOhbyBn4bqnbiDEkcOieSB0csOqbiBUd2l0dGVyDQoNCkjDo3kgeGVtDQo-IGh0dHBzOi8vdHdpdHRlci5jb20vaS9ub3RpZmljYXRpb25zDQoNCj0NCg0KVHLhu6MgZ2nDunAgDQo-IGh0dHBzOi8vc3VwcG9ydC50d2l0dGVyLmNvbS8NCg0KQ8OgaSDEkeG6t3QgDQo-IGh0dHBzOi8vdHdpdHRlci5jb20vc2V0dGluZ3MNCg0KSOG7p3kgxJHEg25nIGvDvSANCj4gaHR0cHM6Ly90d2l0dGVyLmNvbS9pL3U_dD0xJmFtcDtjbj1ZV04wYVhacGRIbGZaR2xuWlhOMFgzZHBkR2hmYUdWaFpHeHBibVZmWTJoaGJtZGwmYW1wO3NpZz1lZDhmNzhkZDY1OTRhOTZhNGI4ZjljOTFjN2MyZDhmNjc5OWQ2Y2M0JmFtcDtpaWQ9Mjk4Yzg5NjQzMTFkNGJiMGFjYWExYjgxZmI0MjRmZGUmYW1wO3VpZD05ODgxMjEyMjAzNTk5Mjk4NTYmYW1wO25pZD0yNDQrMjYmYW1wO3VzYmlkPTE2DQoNCkNow7puZyB0w7RpIMSRw6MgZ-G7rWkgdOG7m2kgQHRyYWlxdWU4OC4gSOG7p3kgxJHEg25nIGvDvSANCj4gaHR0cHM6Ly90d2l0dGVyLmNvbS9pL3U_dD0xJmFtcDtjbj1ZV04wYVhacGRIbGZaR2xuWlhOMFgzZHBkR2hmYUdWaFpHeHBibVZmWTJoaGJtZGwmYW1wO3NpZz1lZDhmNzhkZDY1OTRhOTZhNGI4ZjljOTFjN2MyZDhmNjc5OWQ2Y2M0JmFtcDtpaWQ9Mjk4Yzg5NjQzMTFkNGJiMGFjYWExYjgxZmI0MjRmZGUmYW1wO3VpZD05ODgxMjEyMjAzNTk5Mjk4NTYmYW1wO25pZD0yNDQrMjYmYW1wO3VzYmlkPTE2DQoNClR3aXR0ZXIsIEluYy4gMTM1NSBNYXJrZXQgU3RyZWV0LCBTdWl0ZSA5MDAgU2FuIEZyYW5jaXNjbywgQ0EgOTQxMDM=";

// console.log(Base64.decode(encoded));
// let chuoi="Verify your account Once your account is verified, you&#39;ll have full access to your account features. Verify account Having trouble? Enter the code below instead C9KM4 Blog Newsletter Terms Privacy";

// let k=chuoi.indexOf("instead");
// console.log('code la: ',chuoi.substr(k+8,5));


