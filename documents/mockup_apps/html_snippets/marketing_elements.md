# Saved HTML Snippets

This folder contains reusable HTML snippets from various mockup iterations to be used for future development.

## Animated Logo
```html
<div class="flex items-center gap-3 cursor-pointer group">
  <div class="p-2 bg-[#1A1A1A] rounded-full text-[#FAF9F7] transition-transform duration-500 group-hover:rotate-[360deg]">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="3" r="1.2" fill="currentColor" stroke="none"></circle>
      <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
      <path d="M13 4.5c.8 3 0 7-2 9"></path>
      <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
      <path d="M11 15l1 7" opacity="0.3" stroke-width="1.2000000000000002"></path>
      <path d="M11 7.5l3.5 1.5-1 4"></path>
    </svg>
  </div>
  <span class="font-cormorant text-2xl tracking-widest uppercase">Pose &amp; Poise</span>
</div>
```

## Well-worded and Stylish Hero
```html
<section class="hero-section" style="min-height: auto; display: flex; align-items: flex-start; padding: 180px 48px 80px; position: relative;">
  <div class="fade-in delay-3 hero-image-container" style="position: absolute; top: 160px; right: 5%; width: clamp(260px, 25vw, 380px); height: clamp(360px, 45vh, 520px); z-index: 0; overflow: hidden;">
    <div style="position: absolute; inset: 0px; background: linear-gradient(135deg, rgba(196, 164, 132, 0.1) 0%, transparent 40%, transparent 60%, rgba(250, 249, 247, 0.6) 100%); z-index: 2; pointer-events: none;"></div>
    <div style="position: absolute; inset: -8px; border: 1px solid rgba(196, 164, 132, 0.2); z-index: 1; pointer-events: none;"></div>
    <img alt="Model in urban setting" src="/images/hero-model.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: saturate(0.85) contrast(0.95); opacity: 0.9;">
  </div>
  <div class="decorative-circle fade-in delay-4" style="position: absolute; bottom: 10%; left: 5%; width: 120px; height: 120px; border: 1px solid rgba(196, 164, 132, 0.2); border-radius: 50%; z-index: 0;"></div>
  <div style="max-width: 900px; position: relative; z-index: 1;">
    <p style="font-family: Outfit, sans-serif; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: rgb(196, 164, 132); margin-bottom: 32px;">
      <span class="fade-up delay-1">The Portfolio Platform for Models</span>
    </p>
    <h1 class="fade-up delay-2" style="font-size: clamp(48px, 8vw, 96px); font-weight: 300; line-height: 1.05; margin-bottom: 40px; letter-spacing: -1px;">
      Your craft,<br><em style="font-weight: 300;">beautifully</em> presented
    </h1>
    <p class="fade-up delay-3" style="font-family: Outfit, sans-serif; font-size: 17px; font-weight: 300; line-height: 1.8; color: rgba(26, 26, 26, 0.7); max-width: 480px; margin-bottom: 48px;">
      Create a stunning portfolio that captures your essence. Share your comp cards, get discovered by top agencies, and book your next opportunity—all in one place.
    </p>
    <form class="hero-form " style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <input placeholder="Enter your email" required="" class="pp-input" type="email" value="" style="background: transparent; border: 1px solid rgba(26, 26, 26, 0.2); padding: 24px; font-family: Outfit, sans-serif; font-size: 14px; width: 100%; max-width: 320px; outline: none;">
      <button type="submit" class="pp-button" style="background: rgb(26, 26, 26); color: rgb(250, 249, 247); border: none; padding: 24px 48px; font-family: Outfit, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; opacity: 1; transition: 0.2s;">Get Started Free</button>
    </form>
    <p class="fade-up delay-5" style="font-family: Outfit, sans-serif; font-size: 12px; color: rgba(26, 26, 26, 0.4); margin-top: 24px;">Join 2,400+ models already on the platform</p>
  </div>
</section>
```

## Pricing Section
```html
<section id="pricing" class="section-padding" style="padding: 80px 48px; background: rgb(250, 249, 247);">
  <div style="max-width: 1200px; margin: 0px auto;">
    <div class="scroll-fade-up visible" style="text-align: center; margin-bottom: 48px;">
      <p style="font-family: Outfit, sans-serif; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: rgb(196, 164, 132); margin-bottom: 32px;">Pricing</p>
      <h2 style="font-size: clamp(36px, 5vw, 56px); font-weight: 300; line-height: 1.15; margin-bottom: 24px;">Simple, transparent pricing</h2>
      <p style="font-family: Outfit, sans-serif; font-size: 15px; font-weight: 300; color: rgba(26, 26, 26, 0.7); max-width: 480px; margin: 0px auto;">Start for free, upgrade when you're ready. No hidden fees.</p>
    </div>
    <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; align-items: stretch;">
      
      <!-- Free Plan -->
      <div class="pp-pricing-card scroll-scale-in stagger-1 visible" style="background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(26, 26, 26, 0.05); padding: 40px; display: flex; flex-direction: column; position: relative; transition: transform 0.3s, box-shadow 0.3s;">
        <h3 style="font-family: &quot;Cormorant Garamond&quot;, Georgia, serif; font-size: 24px; font-weight: 400; color: rgb(26, 26, 26); margin-bottom: 8px;">Free</h3>
        <p style="font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7); margin-bottom: 32px;">Perfect for getting started</p>
        <div style="margin-bottom: 32px;">
          <div style="display: flex; align-items: baseline; gap: 4px;">
            <span style="font-family: &quot;Cormorant Garamond&quot;, Georgia, serif; font-size: 48px; font-weight: 300; color: rgb(26, 26, 26);">$0</span>
            <span style="font-family: Outfit, sans-serif; font-size: 15px; color: rgba(26, 26, 26, 0.4);">/month</span>
          </div>
          <p style="font-family: Outfit, sans-serif; font-size: 12px; color: rgba(26, 26, 26, 0.4); margin-top: 8px; font-style: italic;">No credit card required</p>
        </div>
        <a class="pp-pricing-cta" href="/signup" style="display: block; text-align: center; font-family: Outfit, sans-serif; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; padding: 24px 32px; background: rgb(26, 26, 26); color: rgb(250, 249, 247); text-decoration: none; margin-bottom: 32px; transition: 0.3s;">Get Started</a>
        <div style="height: 1px; background: rgba(26, 26, 26, 0.1); margin-bottom: 32px;"></div>
        <ul style="list-style: none; padding: 0px; margin: 0px; flex: 1 1 0%; display: flex; flex-direction: column; gap: 16px;">
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Up to 10 portfolio images</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Subdomain portfolio URL</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Basic comp card generator</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Portfolio analytics</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Read community posts</li>
        </ul>
      </div>

      <!-- Professional Plan -->
      <div class="pp-pricing-card scroll-scale-in stagger-2 visible" style="background: rgb(26, 26, 26); border: none; padding: 40px; display: flex; flex-direction: column; position: relative; transition: transform 0.3s, box-shadow 0.3s;">
        <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: rgb(196, 164, 132); color: rgb(250, 249, 247); font-family: Outfit, sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px;">Most Popular</div>
        <h3 style="font-family: &quot;Cormorant Garamond&quot;, Georgia, serif; font-size: 24px; font-weight: 400; color: rgb(250, 249, 247); margin-bottom: 8px;">Professional</h3>
        <p style="font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.7); margin-bottom: 32px;">For serious models building their career</p>
        <div style="margin-bottom: 32px;">
          <div style="display: flex; align-items: baseline; gap: 4px;">
            <span style="font-family: &quot;Cormorant Garamond&quot;, Georgia, serif; font-size: 48px; font-weight: 300; color: rgb(250, 249, 247);">$20</span>
            <span style="font-family: Outfit, sans-serif; font-size: 15px; color: rgba(250, 247, 242, 0.7);">/month</span>
          </div>
          <p style="font-family: Outfit, sans-serif; font-size: 14px; color: rgb(196, 164, 132); margin-top: 8px;">$200/year — Save $40</p>
        </div>
        <a class="pp-pricing-cta" href="/signup?plan=professional" style="display: block; text-align: center; font-family: Outfit, sans-serif; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; padding: 24px 32px; background: rgb(250, 249, 247); color: rgb(26, 26, 26); text-decoration: none; margin-bottom: 32px; transition: 0.3s;">Start Free Trial</a>
        <div style="height: 1px; background: rgba(250, 247, 242, 0.2); margin-bottom: 32px;"></div>
        <ul style="list-style: none; padding: 0px; margin: 0px; flex: 1 1 0%; display: flex; flex-direction: column; gap: 16px;">
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Everything in Free</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Up to 50 portfolio images</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Choose from layout templates</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Choose from color themes</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>All comp card templates</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>PDF export</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Priority support</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(250, 247, 242, 0.9);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Read &amp; write community posts</li>
        </ul>
      </div>

      <!-- Deluxe Plan -->
      <div class="pp-pricing-card scroll-scale-in stagger-3 visible" style="background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(26, 26, 26, 0.05); padding: 40px; display: flex; flex-direction: column; position: relative; transition: transform 0.3s, box-shadow 0.3s;">
        <h3 style="font-family: &quot;Cormorant Garamond&quot;, Georgia, serif; font-size: 24px; font-weight: 400; color: rgb(26, 26, 26); margin-bottom: 8px;">Deluxe</h3>
        <p style="font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7); margin-bottom: 32px;">For professionals who want it all</p>
        <div style="margin-bottom: 32px;">
          <div style="display: flex; align-items: baseline; gap: 4px;">
            <span style="font-family: &quot;Cormorant Garamond&quot;, Georgia, serif; font-size: 48px; font-weight: 300; color: rgb(26, 26, 26);">$30</span>
            <span style="font-family: Outfit, sans-serif; font-size: 15px; color: rgba(26, 26, 26, 0.4);">/month</span>
          </div>
          <p style="font-family: Outfit, sans-serif; font-size: 14px; color: rgb(196, 164, 132); margin-top: 8px;">$300/year — Save $60</p>
        </div>
        <a class="pp-pricing-cta" href="/signup?plan=deluxe" style="display: block; text-align: center; font-family: Outfit, sans-serif; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; padding: 24px 32px; background: rgb(26, 26, 26); color: rgb(250, 249, 247); text-decoration: none; margin-bottom: 32px; transition: 0.3s;">Start Free Trial</a>
        <div style="height: 1px; background: rgba(26, 26, 26, 0.1); margin-bottom: 32px;"></div>
        <ul style="list-style: none; padding: 0px; margin: 0px; flex: 1 1 0%; display: flex; flex-direction: column; gap: 16px;">
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Everything in Professional</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Unlimited portfolio images</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Custom domain support</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Central message hub</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>SMS notifications</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Calendar &amp; event planning</li>
          <li style="display: flex; align-items: flex-start; gap: 16px; font-family: Outfit, sans-serif; font-size: 14px; color: rgba(26, 26, 26, 0.7);"><span style="flex-shrink: 0; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: rgb(196, 164, 132);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Promote photographers &amp; agencies</li>
        </ul>
      </div>
    
    </div>
  </div>
</section>
```
