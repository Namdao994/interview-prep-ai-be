import sendMail from './send-mail'

export const sendVerificationOtpEmail = async (
  username: string,
  email: string,
  otp: string
) => {
  const subjectEmail = 'Your Interview Prep AI verification code'

  const htmlContent = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; background-color: #f5f7fa; padding: 40px;">
    <div style="max-width: 600px; background: #ffffff; border-radius: 12px; margin: 0 auto; padding: 40px; box-shadow: 0 6px 20px rgba(0,0,0,0.06);">

      <h2 style="color: #262626; text-align: center; margin-bottom: 8px;">
        Verify your <span style="color:#1677ff;">Interview Prep AI</span> account
      </h2>

      <p style="text-align: center; color: #8c8c8c; margin-top: 0;">
        Practice smarter. Interview better.
      </p>

      <p>Hi <b>${username || 'there'}</b>,</p>

      <p>
        Use the verification code below to confirm your email address and activate your
        <b>Interview Prep AI</b> account.
      </p>

      <div style="
        background-color: #e6f4ff;
        color: #0958d9;
        padding: 16px;
        border-radius: 8px;
        font-size: 14px;
        margin: 24px 0;
        text-align: center;
      ">
        ⏰ This code will expire in <b>5 minutes</b>
      </div>

      <div style="
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 6px;
        text-align: center;
        color: #1677ff;
        margin: 24px 0;
      ">
        ${otp}
      </div>

      <p style="text-align: center; color: #8c8c8c; font-size: 14px;">
        Enter this code in the verification screen to continue.
      </p>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #f0f0f0;">

      <p style="font-size: 13px; color: #8c8c8c; text-align: center;">
        If you didn’t create an account with Interview Prep AI, you can safely ignore this email.
      </p>
    </div>
  </div>
  `

  await sendMail(email, subjectEmail, htmlContent)
}
