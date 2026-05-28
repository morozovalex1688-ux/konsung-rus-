import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, phone, email, message } = body;

    // Basic validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Обязательные поля не заполнены' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Сервер не настроен для отправки писем' },
        { status: 500 }
      );
    }

    // Формируем красивое письмо
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #013CC6; border-bottom: 2px solid #013CC6; padding-bottom: 10px;">
          Новая заявка с сайта Консунг Рус
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">ФИО:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Компания:</td>
            <td style="padding: 8px 0;">${company || 'Не указана'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Телефон:</td>
            <td style="padding: 8px 0;">
              <a href="tel:${phone}" style="color: #013CC6;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${email}" style="color: #013CC6;">${email}</a>
            </td>
          </tr>
        </table>

        ${message ? `
          <div style="margin-top: 25px;">
            <strong>Сообщение:</strong>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 8px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          Заявка отправлена с сайта konsungrus.ru<br>
          Дата: ${new Date().toLocaleString('ru-RU')}
        </div>
      </div>
    `;

    // Отправляем через Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Сайт Консунг Рус <onboarding@resend.dev>', // Можно поменять после настройки домена
        to: ['info@konsungrus.ru'],
        subject: `Новая заявка от ${name} (${company || 'без компании'})`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend error:', errorData);
      throw new Error('Ошибка отправки письма');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
