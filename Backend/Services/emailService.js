import nodemailer from 'nodemailer';
import "dotenv/config";

const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: EMAIL,
        pass: PASS
    },
});

export async function sendEmail(mailOptions){
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
};