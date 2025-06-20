import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Types
export interface User {
  id: string;
  email?: string;
  role: string;
  loginProvider: 'EMAIL' | 'LINE' | 'BOTH';
  lineId?: string;
  lineDisplayName?: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

// Password hashing functions
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

// JWT functions
export function generateToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    loginProvider: user.loginProvider,
    lineId: user.lineId,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
}

// Email/Password login (สำหรับ Admin, Restaurant, Rider)
export async function loginWithEmail(
  email: string, 
  password: string,
  prisma: any
): Promise<LoginResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        status: true,
        loginProvider: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      return { success: false, message: 'ไม่พบผู้ใช้งาน' };
    }

    if (user.status !== 'ACTIVE') {
      return { success: false, message: 'บัญชีผู้ใช้ถูกระงับ' };
    }

    if (user.loginProvider !== 'EMAIL' && user.loginProvider !== 'BOTH') {
      return { success: false, message: 'กรุณาใช้ LINE Login' };
    }

    if (!user.password || !verifyPassword(password, user.password)) {
      return { success: false, message: 'รหัสผ่านไม่ถูกต้อง' };
    }

    const token = generateToken({
      id: user.id,
      email: user.email!,
      role: user.role,
      loginProvider: user.loginProvider as any,
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email!,
        role: user.role,
        loginProvider: user.loginProvider as any,
      },
      token,
    };
  } catch (error) {
    console.error('Email login error:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดในระบบ' };
  }
}

// LINE login (สำหรับ Customer)
export async function loginWithLine(
  lineId: string,
  lineProfile: {
    displayName: string;
    email?: string;
    pictureUrl?: string;
  },
  prisma: any
): Promise<LoginResult> {
  try {
    let user = await prisma.user.findUnique({
      where: { lineId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        loginProvider: true,
        lineId: true,
        lineDisplayName: true,
        linePictureUrl: true,
        firstName: true,
        lastName: true,
      },
    });

    // ถ้าไม่พบ user ให้สร้างใหม่ (Auto Registration)
    if (!user) {
      user = await prisma.user.create({
        data: {
          lineId,
          lineDisplayName: lineProfile.displayName,
          lineEmail: lineProfile.email,
          linePictureUrl: lineProfile.pictureUrl,
          firstName: lineProfile.displayName.split(' ')[0] || 'ลูกค้า',
          lastName: lineProfile.displayName.split(' ').slice(1).join(' ') || 'LINE',
          role: 'CUSTOMER',
          status: 'ACTIVE',
          loginProvider: 'LINE',
        },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          loginProvider: true,
          lineId: true,
          lineDisplayName: true,
          linePictureUrl: true,
          firstName: true,
          lastName: true,
        },
      });
    } else {
      // อัปเดตข้อมูลจาก LINE (ในกรณีที่มีการเปลี่ยนแปลง)
      user = await prisma.user.update({
        where: { lineId },
        data: {
          lineDisplayName: lineProfile.displayName,
          lineEmail: lineProfile.email,
          linePictureUrl: lineProfile.pictureUrl,
          lastLoginAt: new Date(),
        },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          loginProvider: true,
          lineId: true,
          lineDisplayName: true,
          linePictureUrl: true,
          firstName: true,
          lastName: true,
        },
      });
    }

    if (user.status !== 'ACTIVE') {
      return { success: false, message: 'บัญชีผู้ใช้ถูกระงับ' };
    }

    if (user.role !== 'CUSTOMER') {
      return { success: false, message: 'กรุณาใช้ Email Login สำหรับบัญชีนี้' };
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      loginProvider: user.loginProvider as any,
      lineId: user.lineId!,
      lineDisplayName: user.lineDisplayName!,
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        loginProvider: user.loginProvider as any,
        lineId: user.lineId!,
        lineDisplayName: user.lineDisplayName!,
      },
      token,
    };
  } catch (error) {
    console.error('LINE login error:', error);
    return { success: false, message: 'เกิดข้อผิดพลาดในระบบ' };
  }
} 