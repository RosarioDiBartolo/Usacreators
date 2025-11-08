// src/server/actions/subscribeCreator.ts
import { createServerFn } from '@tanstack/react-start'
import admin from 'firebase-admin'
import { db } from '@/lib/firebase/admin'
import crypto from 'crypto' 
import { readCurrentLegal } from '../../../api/legal'
import { hashIP } from '@/lib/utils'
import {   getRequestHeader, setResponseHeader, setResponseStatus } from '@tanstack/react-start/server'
 import { serverSchema as FormSchema,   EmailVerificationSchema, persistSchema} from "@/lib/creators/schemas/creator-apply-server" 
  
export const subscribeCreator = createServerFn({ method: 'POST' })
  .inputValidator( FormSchema)
   .handler(async ({ data }) => {
 

    // (Optional) set headers/status like an API
    setResponseHeader('Vary', 'Origin')
    setResponseHeader('Cache-Control', 'no-store')

    // Legal pinning
    const { termsVersion, privacyVersion } = readCurrentLegal()
    if (data.termsVersion !== termsVersion || data.privacyVersion !== privacyVersion) {
      setResponseStatus(409)
      return { ok: false as const, code: 'VERSION_MISMATCH', termsVersion, privacyVersion }
    }

    // Context (server-only)
    const ua = (getRequestHeader('user-agent') || '').slice(0, 300)
    const country = String(getRequestHeader('x-vercel-ip-country') || 'unknown')
    const fwd = (getRequestHeader('x-forwarded-for') || '').split(',')[0].trim()
    const ip = fwd || getRequestHeader('x-real-ip') || 'unknown'
    const ipHashVal = hashIP(ip)

    // Dedupe
    const existing = await db.collection('creator_subscriptions')
      .where('email', '==', data.email).limit(1).get()
    if (!existing.empty && existing.docs[0].get('status') === 'active') {
      return { ok: true as const, id: existing.docs[0].id, already: true }
    }

    // Turnstile (optional)
    if (data.turnstileToken) {
      try {
        const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY ?? '',
            response: data.turnstileToken,
          }),
        })
        const j = await r.json()
        if (!j.success) {
          setResponseStatus(403)
          return { ok: false as const, code: 'CAPTCHA_FAILED' }
        }
      } catch {
        setResponseStatus(503)
        return { ok: false as const, code: 'CAPTCHA_ERROR' }
      }
    }

    // Email verification token (double opt-in)
    const emailToken = crypto.randomUUID()
    const emailTokenHash = crypto.createHash('sha256').update(emailToken).digest('hex')
    const expiresAt = admin.firestore.Timestamp.fromMillis(Date.now() + 1000 * 60 * 30) // 30m

    const docRef = existing.empty
      ? await db.collection('creator_subscriptions').add( await persistSchema.parse({
          name: data.name,
          email: data.email,
          status: 'pending',
          channels: { email: true },
          source: 'subscribe_form',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          verify: { emailTokenHash, expiresAt },
          legal: {
            termsVersion,
            privacyVersion,
            acceptedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          ipHash: ipHashVal,
          userAgent: ua,
          country,
        }))
      : (await existing.docs[0].ref.update({
          status: 'pending',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          verify: { emailTokenHash, expiresAt },
        }), existing.docs[0].ref)

    // TODO send the email (Resend/SendGrid/SES) with link:
    // `${process.env.PUBLIC_APP_URL}/verify?token=${encodeURIComponent(emailToken)}&id=${docRef.id}`

    return { ok: true as const, id: docRef.id, needsVerify: true }
  })

// src/server/actions/verifyEmail.ts
 
const err = (code: string) => ({ ok: false as const, code })

export const verifyEmail = createServerFn({ method: 'POST' }).inputValidator(EmailVerificationSchema)
.handler(
  async ({ data: {id, token} }) => {
   
    const snap = await db.collection('creator_subscriptions').doc(id).get()
    if (!snap.exists) return err('NOT_FOUND')

    const data = snap.data()!
    if (data.status === 'active') return { ok: true as const, id, already: true }

    const v = data.verify
    if (!v?.emailTokenHash || !v?.expiresAt) return err('NO_TOKEN')
    const now = admin.firestore.Timestamp.now()
    if (now.toMillis() > v.expiresAt.toMillis()) return err('EXPIRED')

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    if (tokenHash !== v.emailTokenHash) return err('BAD_TOKEN')

    await snap.ref.update({
      status: 'active',
      verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      verify: admin.firestore.FieldValue.delete(), // single-use
    })

    // Optional: send welcome email here

    return { ok: true as const, id }
  },
)
