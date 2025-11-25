import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sentResetPasswordEmail = async (email: string, resetLink: string) => {

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset your Password',
        html: `
              <p>Click the link below to reset your password:</p>
              <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 2 minutes.</p>
  
  `
    });

}