// 📱 LIFF Configuration API
// GET /api/liff/config?tenant=restaurant1

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId') || 'restaurant1';

    // Get restaurant configuration from database
    const restaurant = await prisma.restaurant.findFirst({
      where: { slug: tenantId },
      select: {
        id: true,
        name: true,
        slug: true,
        domain: true,
        liffId: true,
        lineChannelId: true,
        primaryColor: true,
        secondaryColor: true,
        logo: true,
      }
    });

    if (!restaurant) {
      return NextResponse.json({
        success: false,
        message: 'Restaurant not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        tenantId: restaurant.slug,
        name: restaurant.name,
        domain: restaurant.domain,
        liffId: restaurant.liffId,
        theme: {
          primaryColor: restaurant.primaryColor || '#10b981',
          secondaryColor: restaurant.secondaryColor || '#059669',
          logo: restaurant.logo || '/images/logo_1_1.png',
        }
      }
    });

  } catch (error) {
    console.error('LIFF config API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
} 