# Konkan · Supabase Setup Guide

End-to-end checklist for Supabase auth + the wishlist feature. After
running through it once, the deployed Vercel site should let users sign
up, confirm via email, sign in, and save items to a wishlist that
persists across devices.

---

## 1. Run the wishlist schema

**Supabase Dashboard → SQL Editor → New query.**
Paste the contents of `wishlist-schema.sql` (next to this file) and **Run**.
Verify: *Table Editor → `wishlists`* appears with RLS enabled.

## 2. Set the Site URL and Redirect URLs

The single most common cause of "magic link points to localhost".

**Authentication → URL Configuration:**

- **Site URL:** `https://konkan-konkan.vercel.app`  *(no trailing slash)*
- **Redirect URLs:** click *Add URL*, paste `https://konkan-konkan.vercel.app/**`

Hit **Save changes**. Any auth email generated from now on will point to
your live domain.

## 3. Install the branded email templates

All Konkan auth emails (sign-up, magic link, password reset) use a custom
HTML template that matches the site's design language. Three files live
in `supabase/email-templates/`:

| Template in Supabase | File in this repo |
|---|---|
| Confirm signup | `email-templates/confirm-signup.html` |
| Magic Link | `email-templates/magic-link.html` |
| Reset Password | `email-templates/reset-password.html` |

**Authentication → Emails → Templates.** For each of those three:

1. Click the template to open the editor.
2. Open the corresponding `.html` file, copy everything from
   `<!DOCTYPE html>` to `</html>`, paste it into the **HTML** field.
3. Set the **Subject** to:
   - Confirm signup: `Confirm your Konkan account`
   - Magic Link: `Your sign-in link for Konkan`
   - Reset Password: `Reset your Konkan password`
4. Click **Save**.

The templates use Supabase's `{{ .ConfirmationURL }}` variable — this is
filled in automatically per recipient.

## 4. Set Vercel environment variables

**Vercel Dashboard → your project → Settings → Environment Variables.**
Add both for the **Production** environment:

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://YOUR-PROJECT-REF.supabase.co` |
| `VITE_SUPABASE_ANON` | the *anon public* key from *Supabase Project Settings → API* |

Then **Redeploy** (Vercel → Deployments → ⋯ on latest → Redeploy). Vite
reads these at build time only, so the redeploy is required.

## 5. (Optional) Skip email confirmation

For development convenience, you can let users sign in immediately
without clicking a confirmation link. **Authentication → Providers →
Email:** toggle off **Confirm email**. Re-enable before going live.

## 6. (Optional) Browse users from Table Editor

Users created via Supabase Auth don't appear in a regular `users` table
— they live in `auth.users`. They're viewable in
*Authentication → Users* (the admin panel you already found). If you
also want them as rows you can query in the *Table Editor*:

**SQL Editor:**

```sql
create or replace view public.user_directory as
  select
    id,
    email,
    created_at,
    last_sign_in_at,
    raw_user_meta_data->>'name' as name
  from auth.users;

grant select on public.user_directory to anon, authenticated;
```

After running, *Table Editor → `user_directory`* will list every signup.

---

## End-to-end test

1. Open `https://konkan-konkan.vercel.app`.
2. *Sign in* → *Sign up* with a fresh email.
3. Open the confirmation email — it should be the **branded** Konkan
   template with maroon CTA.

   ✅ *Click "Confirm account" → land back on the site, signed in.*
4. Heart a destination or a stay.
5. Reload the page — hearted item should still be marked.
6. Open another browser/incognito — the item should still be there once
   you sign in (this proves Supabase sync).

If `https://app.supabase.com → Authentication → Users` lists your test
email, the whole flow is wired.

---

## Troubleshooting

- **Magic link points to `localhost:3000`** → §2 Site URL is wrong.
- **Email looks unbranded / generic** → §3: re-paste the HTML and Save.
- **Hearting an item doesn't persist after reload** → §4: env vars not
  set or `wishlists` table not created → §1.
- **Email never arrives** → *Supabase → Logs → Auth Logs* will show
  outbound email events; failures usually point to a misconfigured
  SMTP / the free tier rate limit (4/hr) on the default mailer. For
  production traffic, configure a custom SMTP provider under
  *Authentication → SMTP Settings.*
