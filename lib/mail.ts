import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail  = async(
    email: string,
    token: string
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@gontay.xyz",
        to: email,
        subject: "Confirm your email",
        html: `<p> Click <a href="${confirmLink}">here</a> to confirm your email </p>`
    })
}

export const sendPassworResetEmail  = async(
    email: string,
    token: string
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "auth@gontay.xyz",
        to: email,
        subject: "Password Reset Link",
        html: `<p> Click <a href="${resetLink}">here</a> to reset your password </p>`
    })
}