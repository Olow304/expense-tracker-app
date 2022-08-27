import nodemailer from 'nodemailer';

export async function sendEmail(email: string, url: string) {

    // create gmail transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    // create email
    return await transporter.sendMail({
        from: `"Expense" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Reset Password',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            url + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    });

}