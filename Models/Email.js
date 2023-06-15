const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.office365.com",
	port: 587,
	secure: false,
	auth: {
		user: "diego.alves.santana@hotmail.com",
		pass: "pkbfmkedqujenjym"
	}
})

module.exports = transporter;