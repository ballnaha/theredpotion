import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle LINE Login Callback
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    console.log('LINE Callback received:', { code, state, error, errorDescription });

    // Handle error case
    if (error) {
      console.error('LINE Login error:', error, errorDescription);
      
      const errorPageUrl = new URL('/login/error', request.url);
      errorPageUrl.searchParams.set('error', error);
      errorPageUrl.searchParams.set('description', errorDescription || 'Unknown error');
      
      return NextResponse.redirect(errorPageUrl);
    }

    // Handle success case
    if (code) {
      try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: `${new URL(request.url).origin}/api/callback/line`,
            client_id: process.env.LINE_CHANNEL_ID || '',
            client_secret: process.env.LINE_CHANNEL_SECRET || '',
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error(`Token exchange failed: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();
        const { access_token, id_token } = tokenData;

        // Get user profile
        const profileResponse = await fetch('https://api.line.me/v2/profile', {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error(`Profile fetch failed: ${profileResponse.statusText}`);
        }

        const profile = await profileResponse.json();

        // Store or update user in database
        const user = await prisma.user.upsert({
          where: { lineId: profile.userId },
          update: {
            lineDisplayName: profile.displayName,
            linePictureUrl: profile.pictureUrl,
            lastLoginAt: new Date(),
          },
          create: {
            lineId: profile.userId,
            lineDisplayName: profile.displayName,
            linePictureUrl: profile.pictureUrl,
            firstName: profile.displayName.split(' ')[0] || 'ลูกค้า',
            lastName: profile.displayName.split(' ').slice(1).join(' ') || 'LINE',
            role: 'CUSTOMER',
            status: 'ACTIVE',
            loginProvider: 'LINE',
            lastLoginAt: new Date(),
          },
        });

        console.log('User authenticated via LINE:', user.id);

        // Redirect to success page with user info
        const successUrl = new URL('/', request.url);
        successUrl.searchParams.set('login', 'success');
        successUrl.searchParams.set('provider', 'line');
        
        // Parse state for tenant info if available
        if (state) {
          try {
            const stateData = JSON.parse(decodeURIComponent(state));
            if (stateData.tenant) {
              successUrl.searchParams.set('tenant', stateData.tenant);
            }
          } catch (e) {
            console.warn('Failed to parse state:', e);
          }
        }

        return NextResponse.redirect(successUrl);

      } catch (tokenError) {
        console.error('Token exchange error:', tokenError);
        
        const errorPageUrl = new URL('/login/error', request.url);
        errorPageUrl.searchParams.set('error', 'token_exchange_failed');
        errorPageUrl.searchParams.set('description', 'Failed to exchange authorization code for token');
        
        return NextResponse.redirect(errorPageUrl);
      }
    }

    // No code or error - invalid callback
    const errorPageUrl = new URL('/login/error', request.url);
    errorPageUrl.searchParams.set('error', 'invalid_callback');
    errorPageUrl.searchParams.set('description', 'Invalid callback parameters');
    
    return NextResponse.redirect(errorPageUrl);

  } catch (error) {
    console.error('LINE Callback error:', error);
    
    const errorPageUrl = new URL('/login/error', request.url);
    errorPageUrl.searchParams.set('error', 'server_error');
    errorPageUrl.searchParams.set('description', 'Internal server error');
    
    return NextResponse.redirect(errorPageUrl);
  }
}

// Handle POST requests (for webhook-style callbacks)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('LINE Callback POST:', body);

    // Handle different types of POST callbacks
    const { type, data } = body;

    switch (type) {
      case 'liff_login':
        // Handle LIFF login callback
        return handleLiffLogin(data);
      
      case 'rich_menu_action':
        // Handle Rich Menu interactions
        return handleRichMenuAction(data);
      
      default:
        console.log('Unknown callback type:', type);
        return NextResponse.json({ 
          success: false, 
          message: 'Unknown callback type' 
        }, { status: 400 });
    }

  } catch (error) {
    console.error('LINE Callback POST error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

// Handle LIFF Login Callback
async function handleLiffLogin(data: any) {
  try {
    const { userId, profile, tenantId } = data;

    if (!userId || !profile) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required data' 
      }, { status: 400 });
    }

    // Store or update user
    const user = await prisma.user.upsert({
      where: { lineId: userId },
      update: {
        lineDisplayName: profile.displayName,
        linePictureUrl: profile.pictureUrl,
        lastLoginAt: new Date(),
      },
      create: {
        lineId: userId,
        lineDisplayName: profile.displayName,
        linePictureUrl: profile.pictureUrl,
        firstName: profile.displayName.split(' ')[0] || 'ลูกค้า',
        lastName: profile.displayName.split(' ').slice(1).join(' ') || 'LINE',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        loginProvider: 'LINE',
        lastLoginAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user.id,
        lineId: user.lineId,
        displayName: user.lineDisplayName,
      }
    });

  } catch (error) {
    console.error('LIFF Login callback error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process login' 
    }, { status: 500 });
  }
}

// Handle Rich Menu Action Callback
async function handleRichMenuAction(data: any) {
  try {
    const { userId, action, tenantId } = data;

    console.log('Rich Menu Action:', { userId, action, tenantId });

    // Log the action for analytics
    // You can extend this to trigger specific business logic

    return NextResponse.json({
      success: true,
      message: 'Action processed'
    });

  } catch (error) {
    console.error('Rich Menu Action callback error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process action' 
    }, { status: 500 });
  }
} 