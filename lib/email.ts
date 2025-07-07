import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailTemplate {
  to: string
  subject: string
  html: string
}

export async function sendCapsuleDeliveryEmail({
  userEmail,
  userName,
  capsule,
}: {
  userEmail: string
  userName: string
  capsule: {
    id: string
    title: string
    content: string
    createdAt: Date
    images?: string[]
  }
}) {
  const timeAgo = getTimeAgo(capsule.createdAt)
  
  const emailTemplate: EmailTemplate = {
    to: userEmail,
    subject: `📧 Your Time Capsule "${capsule.title}" Has Arrived!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Time Capsule Has Arrived</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #c4a9db, #9f7fc0); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border: 1px solid #e1e5e9; }
            .capsule-content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c4a9db; }
            .footer { background: #f8f9fa; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; color: #666; }
            .btn { display: inline-block; background: #c4a9db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 10px 0; }
            .meta { color: #666; font-size: 14px; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🕰️ Your Time Capsule Has Arrived!</h1>
              <p>A message from your past self</p>
            </div>
            
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              <p>Your time capsule "<strong>${capsule.title}</strong>" that you created <strong>${timeAgo}</strong> is now ready to be opened!</p>
              
              <div class="capsule-content">
                <div class="meta">
                  📅 Created on: ${capsule.createdAt.toLocaleDateString()}
                  <br>
                  ⏰ Time passed: ${timeAgo}
                </div>
                
                <h3>Your Message:</h3>
                <div style="white-space: pre-wrap;">${capsule.content}</div>
                
                ${capsule.images && capsule.images.length > 0 ? `
                  <div style="margin-top: 20px;">
                    <h4>📸 Your Images:</h4>
                    <p>Your capsule contains ${capsule.images.length} image(s). View them in your dashboard.</p>
                  </div>
                ` : ''}
              </div>
              
              <p>Take a moment to reflect on how much has changed since you wrote this message. Sometimes the most beautiful discoveries are the ones we leave for ourselves.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/capsules/${capsule.id}" class="btn">
                View Full Capsule 📖
              </a>
            </div>
            
            <div class="footer">
              <p>Sent with 💜 from Pastel - Your Memory Journal</p>
              <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings">Update notification preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@pastel.app',
      to: emailTemplate.to,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })
    
    return { success: true, data: result }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: (error as Error).message }
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
  } else {
    return 'today'
  }
} 