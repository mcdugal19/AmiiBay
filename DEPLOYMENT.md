# AmiiBay Deployment Guide

## Quick Deployment to Render (FREE)

This guide will walk you through deploying AmiiBay to Render's free tier in about 15 minutes.

---

## Prerequisites

1. GitHub account with AmiiBay repository pushed
2. Render account (sign up at https://render.com - free, no credit card required)
3. Stripe test API keys (from https://dashboard.stripe.com/test/apikeys)

---

## Step-by-Step Deployment

### Step 1: Push to GitHub (if not already done)

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with your GitHub account (easiest option)
3. Authorize Render to access your repositories

### Step 3: Deploy with Blueprint (Automated)

Render will automatically detect the `render.yaml` file in your repository and set up everything for you!

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Blueprint"**
3. **Connect Repository**: 
   - Select your AmiiBay repository
   - Click "Connect"
4. **Review Blueprint**:
   - Render will show you what it will create:
     - ✅ Web Service (amiibay)
     - ✅ PostgreSQL Database (amiibay-db)
   - Service name: `amiibay` (or customize)
5. **Click "Apply"**

Render will now:
- Create PostgreSQL database
- Create web service
- Install dependencies
- Build React app
- Start Express server

This takes about 5-10 minutes for the first deployment.

### Step 4: Configure Environment Variables

After deployment starts, you need to add your Stripe key:

1. Go to your **amiibay** service in Render dashboard
2. Click **"Environment"** tab
3. Find `SECRET_KEY` variable
4. Click **Edit** → Enter your Stripe test secret key
   - Get it from: https://dashboard.stripe.com/test/apikeys
   - Starts with `sk_test_...`
5. Click **Save**

The service will automatically redeploy with the new key.

### Step 5: Initialize Database

Once the service is running (green status), seed the database:

1. In Render dashboard, go to your **amiibay** service
2. Click **"Shell"** tab on the left
3. Click **"Launch Shell"**
4. Run the database initialization command:
   ```bash
   npm run db:build
   ```
5. Wait for "Database initialized successfully!" message

### Step 6: Access Your Live Site! 🎉

1. In Render dashboard, find your service URL (format: `https://amiibay-xxxx.onrender.com`)
2. Click the URL to open your live site
3. Test the application:
   - Browse products
   - Register an account
   - Add items to cart
   - Test checkout (use Stripe test cards)

---

## Important Notes

### Free Tier Limitations

- **Cold Starts**: Service spins down after 15 minutes of inactivity
  - First request after sleep takes ~30 seconds to wake up
  - Subsequent requests are fast
- **Database**: 100MB storage (plenty for demo)
- **Hours**: 750 hours/month (enough for portfolio demo)

### Stripe Test Mode

Your deployment uses Stripe **TEST mode** by default:
- No real money is charged
- Use test credit cards: `4242 4242 4242 4242`
- Any future date, any CVC

### Custom Domain (Optional)

To add a custom domain:
1. Go to service Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

---

## Troubleshooting

### Build Fails

**Check build logs** in Render dashboard:
- Common issue: Missing dependencies
- Solution: Ensure `package.json` is complete
- Try: Clear cache and redeploy

### Database Connection Error

**Symptoms**: "Database is closed for repairs" in logs

**Solutions**:
1. Check DATABASE_URL is set correctly
2. Verify database is running (should be automatic)
3. Restart web service

### Site is Slow to Load

**Expected behavior** on free tier:
- First load after inactivity: ~30 seconds (cold start)
- Subsequent loads: Fast

**To avoid cold starts**:
- Use paid plan ($7/month, no cold starts)
- Or: Use a service like UptimeRobot to ping your site every 14 minutes

### Environment Variable Issues

**If features don't work**:
1. Verify all environment variables are set:
   - `DATABASE_URL` (auto-set by Render)
   - `JWT_SECRET` (auto-generated)
   - `COOKIE_SECRET` (auto-generated)
   - `SECRET_KEY` (your Stripe key - must be set manually)
2. Check for typos in variable names
3. Redeploy after changes

---

## Updating Your Deployment

Render auto-deploys on every push to main branch:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main
```

Render will automatically:
1. Detect the push
2. Run build
3. Deploy new version
4. Takes 3-5 minutes

---

## Monitoring

### View Logs

Real-time logs in Render dashboard:
1. Go to your service
2. Click **"Logs"** tab
3. See all server output

### Check Service Status

- **Green**: Running normally
- **Yellow**: Deploying
- **Red**: Error (check logs)

---

## Cost Breakdown

### Current Setup (FREE)
- Web Service: Free tier ($0/month)
- PostgreSQL: Free tier ($0/month)
- SSL Certificate: Included ($0)
- **Total: $0/month**

### If You Need Better Performance
- Web Service: $7/month (no cold starts, better resources)
- PostgreSQL: $7/month (1GB storage, better performance)
- **Total: $14/month** (still very affordable)

---

## Next Steps After Deployment

1. **Test thoroughly**: Try all features on the live site
2. **Update portfolio**: Add the live URL to your portfolio/resume
3. **Update README**: Add the live demo link
4. **Share**: Send the link to potential employers!

---

## Alternative Deployment Options

If Render doesn't work for you:

### Railway.app ($5 credit)
- Better performance than Render free tier
- No cold starts during trial
- Similar setup process

### Fly.io (Free tier)
- 3 VMs free
- No cold starts
- Requires Dockerfile (more complex)

### Vercel + Separate Backend
- Frontend on Vercel (best performance)
- Backend elsewhere
- More complex setup

---

## Support

### Render Documentation
- https://render.com/docs
- Excellent docs with examples

### Common Issues
Check Render community forum:
- https://community.render.com

### AmiiBay Issues
- Check your repository's Issues tab
- Review application logs in Render dashboard

---

## Security Reminders

### Before Going Live
- ✅ Use strong JWT_SECRET (auto-generated by Render)
- ✅ Use strong COOKIE_SECRET (auto-generated by Render)
- ✅ Keep Stripe keys in environment variables (never in code)
- ✅ Use HTTPS (automatic with Render)

### For Production (Real Store)
- Switch to Stripe live mode keys
- Set up proper error monitoring
- Add rate limiting
- Implement CSRF protection
- Regular security audits

---

## Congratulations! 🎉

Your AmiiBay e-commerce platform is now live and accessible to the world. Share your deployed URL on:
- LinkedIn
- Your portfolio website  
- GitHub README
- Job applications

**Your deployed URL format**: `https://amiibay-xxxx.onrender.com`

---

*Last updated: November 14, 2025*
