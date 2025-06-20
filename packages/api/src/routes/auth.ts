import express from 'express';
import { z } from 'zod';
import { prisma } from '@theredpotion/database';
import { loginWithEmail, loginWithLine } from '../utils/auth';

const router = express.Router();

// Validation schemas
const emailLoginSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
});

const lineLoginSchema = z.object({
  lineId: z.string().min(1, 'LINE ID จำเป็น'),
  lineProfile: z.object({
    displayName: z.string().min(1, 'ชื่อแสดงจำเป็น'),
    email: z.string().email().optional(),
    pictureUrl: z.string().url().optional(),
  }),
});

// 📧 Email/Password Login (สำหรับ Admin, Restaurant, Rider)
router.post('/login/email', async (req, res) => {
  try {
    const validatedData = emailLoginSchema.parse(req.body);
    const { email, password } = validatedData;

    const result = await loginWithEmail(email, password, prisma);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    return res.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'ข้อมูลไม่ถูกต้อง',
        errors: error.errors,
      });
    }

    console.error('Email login route error:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ',
    });
  }
});

// 💚 LINE Login (สำหรับ Customer)
router.post('/login/line', async (req, res) => {
  try {
    const validatedData = lineLoginSchema.parse(req.body);
    const { lineId, lineProfile } = validatedData;

    const result = await loginWithLine(lineId, lineProfile, prisma);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    return res.json({
      success: true,
      message: 'เข้าสู่ระบบ LINE สำเร็จ',
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'ข้อมูล LINE ไม่ถูกต้อง',
        errors: error.errors,
      });
    }

    console.error('LINE login route error:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ',
    });
  }
});

// 🔍 Get Current User Profile
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'ต้องการ Authorization header',
      });
    }

    const token = authHeader.substring(7);
    const jwt = require('jsonwebtoken');
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          loginProvider: true,
          lineId: true,
          lineDisplayName: true,
          linePictureUrl: true,
          phone: true,
          avatar: true,
          createdAt: true,
          lastLoginAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'ไม่พบผู้ใช้งาน',
        });
      }

      return res.json({
        success: true,
        data: { user },
      });
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Token ไม่ถูกต้อง',
      });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ',
    });
  }
});

// 🚪 Logout (Optional - for token blacklisting in the future)
router.post('/logout', (req, res) => {
  // ในขณะนี้ client จะลบ token เอง
  // ในอนาคตอาจจะเพิ่ม token blacklisting
  return res.json({
    success: true,
    message: 'ออกจากระบบสำเร็จ',
  });
});

// 📋 Check Login Status
router.get('/status', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(200).json({
        success: true,
        authenticated: false,
        message: 'ไม่ได้เข้าสู่ระบบ',
      });
    }

    const token = authHeader.substring(7);
    const jwt = require('jsonwebtoken');
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      return res.json({
        success: true,
        authenticated: true,
        user: {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          loginProvider: decoded.loginProvider,
          lineId: decoded.lineId,
        },
      });
    } catch (jwtError) {
      return res.status(200).json({
        success: true,
        authenticated: false,
        message: 'Token หมดอายุหรือไม่ถูกต้อง',
      });
    }
  } catch (error) {
    console.error('Check status error:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ',
    });
  }
});

export default router; 