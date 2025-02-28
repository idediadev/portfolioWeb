## Setting Up EmailJS for Your Contact Form

To make the contact form send emails to `davidetaddia95@gmail.com`, follow these steps:

### 1. Install EmailJS package

```bash
npm install @emailjs/browser
```

### 2. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your account through the email they send you

### 3. Set Up Email Service

1. Log in to your EmailJS account
2. Go to "Email Services" in the left sidebar
3. Click "Add New Service"
4. Choose an email service provider (Gmail is a good option)
5. Follow the authentication steps for your chosen provider
6. Once connected, note down the "Service ID" for later use

### 4. Create an Email Template

1. Go to "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person who submitted the form
   - `{{from_email}}` - The email of the person who submitted the form
   - `{{message}}` - The message/project details
   - `{{budget}}` - The selected budget range
   - `{{services}}` - The services they're interested in
4. Make sure to set the "To email" field to `davidetaddia95@gmail.com`
5. Save the template and note down the "Template ID"

### 5. Get Your Public Key

1. Go to "Account" in the left sidebar
2. Find your "Public Key" under the "API Keys" section

### 6. Update Your Code

Replace the placeholders in the `ContactForm.js` file with your actual EmailJS credentials:

```javascript
emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  templateParams,
  'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
)
```

### 7. Initialize EmailJS in Your App

Add the following code to your `App.js` file (at the top after the imports):

```javascript
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Then inside your App component:
useEffect(() => {
  emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
}, []);
```

### 8. Test Your Form

1. Run your app with `npm start`
2. Fill out the contact form and submit
3. Check if the email arrives at `davidetaddia95@gmail.com`
4. Make sure to verify the form sends correctly before deploying

### Additional Tips

1. **Free Tier Limitations**: The free EmailJS plan allows 200 emails per month
2. **Spam Prevention**: Consider adding reCAPTCHA to prevent spam submissions
3. **Error Handling**: The form has built-in error handling, but you may want to customize the error messages
4. **Custom Domain**: For a more professional look, consider upgrading to use your own domain for sending emails