# Rishitha Gorupati — Author, Poet & Writer

Official portfolio and dynamic literary catalog for **Rishitha Gorupati**, author of *That Day Is Inevitable*, poet, and writer.

Designed with a warm, minimalist literary paper aesthetic (`#FDFBF7`), elegant serif typography, and rich interactive features.

---

## 🌟 Key Features

* **Home**: Split-column editorial hero, featured verse spotlight, selected works, and author bio.
* **Poetry (`/poetry`)**: Curated collection of 24 poems with real-time search, tag filtering, and dedicated reading view pages (`/poetry/:slug`).
* **Musings & Zentangles (`/musings`)**: Psychological inquiries and long-form journal essays (*"Fractals of Thought: A Psychological Inquiry into Zentangle Practice"*), accompanied by high-resolution sketchbook plates and an interactive lightbox viewer.
* **Books & Publications (`/books`)**: Featuring *That Day Is Inevitable* with front and back covers, 3D edition mockup, book synopsis, ISBN/publisher details, and direct Amazon purchase links (`/books/:slug`).
* **About Me (`/about`)**: Authentic author biography, garden portraits, philosophical reflections, and literary milestones timeline.
* **Contact (`/contact`)**: Dynamic inquiry form connected to author email (`rishithagorupati@gmail.com`), plus verified LinkedIn and Instagram profiles.
* **Author & Admin Portal (`/admin`)**: Password-protected private dashboard allowing the author to dynamically add, edit, or delete poems, books, musings, author bio details, and update the access passkey without code changes.

---

## 🛠️ Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: Tailwind CSS + Custom Literary Design System tokens
* **Icons**: [Lucide React](https://lucide.dev/)
* **Router**: [React Router v7](https://reactrouter.com/)
* **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)
* `npm` or `yarn` / `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/Rushindra-D/personal-website.git
cd personal-website

# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev
```

The application will run locally at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build production bundle
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

---

## 📬 Contact Form Email Setup

The contact form uses a dedicated backend API route (`/api/contact`) deployed as a Vercel Serverless Function and powered by [Resend](https://resend.com/).

Visitor submissions are processed directly through the secure backend and delivered straight to the author's inbox, with the visitor's email set as `Reply-To` for instant one-click replies.

### 1. Create a Resend Account
1. Visit [https://resend.com/signup](https://resend.com/signup) and create a free account.
2. Verify your signup email address.

### 2. Obtain Your Resend API Key
1. Go to your [Resend API Keys dashboard](https://resend.com/api-keys).
2. Click **Create API Key**.
3. Name it (e.g. `Portfolio Contact Form`), select **Full access** (or Sending access), and click **Add**.
4. Copy the API key starting with `re_...` immediately (it will only be displayed once).

### 3. Required Environment Variables

| Variable Name | Required | Default / Example Value | Description |
| :--- | :---: | :--- | :--- |
| `RESEND_API_KEY` | **Yes** | `re_123456789abcdef` | Your private Resend API key. |
| `CONTACT_RECEIVER_EMAIL` | Optional | `rishithagorupati@gmail.com` | The author's inbox that receives visitor messages. |
| `CONTACT_SENDER_EMAIL` | Optional | `onboarding@resend.dev` | The verified sender address in Resend (see DNS verification below). |

### 4. Local Configuration (Development)
1. In the project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and paste your actual Resend API key:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   CONTACT_RECEIVER_EMAIL=rishithagorupati@gmail.com
   CONTACT_SENDER_EMAIL=onboarding@resend.dev
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The local Vite server has an embedded API middleware that handles `POST /api/contact` using your `.env.local` credentials.

### 5. Production Configuration on Vercel
To configure the environment variables on your deployed Vercel site:
1. Open the [Vercel Dashboard](https://vercel.com/dashboard).
2. Select your project: **personal-website** (or author portfolio project).
3. Navigate to: **Settings** &rarr; **Environment Variables**.
4. Add the following variables:
   * **Key**: `RESEND_API_KEY`
     * **Value**: `re_your_actual_api_key_here`
     * **Environments**: Check **Production**, **Preview**, and **Development**.
   * **Key**: `CONTACT_RECEIVER_EMAIL`
     * **Value**: `rishithagorupati@gmail.com` (or your preferred inbox)
     * **Environments**: Check **Production**, **Preview**, and **Development**.
   * **Key**: `CONTACT_SENDER_EMAIL`
     * **Value**: `onboarding@resend.dev` (for initial setup) OR your verified domain sender like `Rishitha Gorupati <hello@rishithagoripati.com>`
     * **Environments**: Check **Production**, **Preview**, and **Development**.
5. Click **Save**.

### 6. Domain Verification & DNS Records (For Production Custom Domain)

> [!NOTE]
> During initial testing, you can use Resend's default sender: `onboarding@resend.dev`. Note that in Resend's free test mode with `onboarding@resend.dev`, emails can only be delivered to the email address registered with your Resend account.
> 
> To send emails to any recipient inbox and send from your custom domain (e.g., `rishithagoripati.com`), verify your domain in Resend.

To verify your custom domain in Resend:
1. In the Resend dashboard, navigate to **Domains** &rarr; **Add Domain**.
2. Enter your domain (e.g. `rishithagoripati.com`).
3. Resend will provide DNS records to add at your DNS provider (Namecheap, GoDaddy, Cloudflare, etc.):
   * **DKIM (TXT Record)**:
     * **Name / Host**: `resend._domainkey` (or as displayed in Resend)
     * **Value**: `p=MIGf...` (public key from Resend)
   * **SPF (TXT Record)**:
     * **Name / Host**: `send` (or `@` if sending from root domain)
     * **Value**: `v=spf1 include:amazonses.com ~all`
   * **MX Record** (for bounce and delivery management):
     * **Name / Host**: `send`
     * **Value**: `feedback-smtp.us-east-1.amazonses.com` (Priority: `10`)
   * **DMARC (TXT Record)**:
     * **Name / Host**: `_dmarc`
     * **Value**: `v=DMARC1; p=none;`
4. Wait 5–15 minutes for DNS propagation, then click **Verify Domain** in Resend until status turns **Verified**.
5. Update `CONTACT_SENDER_EMAIL` in Vercel to use your verified domain:
   ```env
   CONTACT_SENDER_EMAIL=Rishitha Gorupati <hello@rishithagoripati.com>
   ```

### 7. Redeploy After Adding Environment Variables
After adding or changing environment variables in Vercel:
1. In the Vercel Dashboard, go to the **Deployments** tab.
2. On the latest deployment, click the **three dots (...)** menu and select **Redeploy**.
3. (Alternatively, push a commit to the `main` branch to trigger an automatic redeployment).

### 8. Testing the Production Contact Form
1. Visit your live site at `/contact`.
2. Enter your name, email, subject, and a short message.
3. Click **Send Message**.
4. You will see:
   - The button state change to `Sending...` with a loading spinner.
   - A success confirmation: *"Message sent successfully. Thank you for contacting Rishitha."*
   - The form fields will automatically reset.
5. Check `rishithagorupati@gmail.com` to verify delivery.
6. Click "Reply" in your email client to verify that the visitor's email address is correctly set in the `Reply-To` field.

### 9. Troubleshooting Email Delivery
* **Form displays "Unable to send your message right now. Please try again later."**:
  * Check that `RESEND_API_KEY` is added to Vercel Environment Variables and that the project was redeployed after adding it.
  * Check the Vercel Function logs (**Vercel Dashboard** &rarr; **Logs**) for the `/api/contact` function to see detailed diagnostics.
* **Resend error: "You can only send to your own email address while using the testing domain"**:
  * When using `CONTACT_SENDER_EMAIL=onboarding@resend.dev`, Resend only permits delivery to the email address registered on the Resend account.
  * To deliver to `rishithagorupati@gmail.com` if your Resend account is registered under another email, either sign up for Resend using `rishithagorupati@gmail.com` or complete Domain Verification in Step 6.
* **Email delivered to Spam / Junk folder**:
  * Mark the email as "Not Spam".
  * Ensure SPF, DKIM, and DMARC DNS records are verified in Resend.
* **Rate limit triggered**:
  * The backend includes a rate limiter allowing up to 5 submissions per 10-minute window per IP address to prevent spam bots. Wait a few minutes before retrying.

---

## 🔐 Author Portal Access

* **URL**: `/admin`
* **Default Passkey**: `rishitha` (or customized via Author Profile > Security)
* Full dynamic control over site content with local persistence and backup/restore capabilities.

---

## 📄 License

© 2026 Rishitha Gorupati. All rights reserved.
