import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Trim all inputs
    const name = (body.name || '').trim();
    const company = (body.company || '').trim();
    const phone = (body.phone || '').trim();
    const email = (body.email || '').trim();
    const message = (body.message || '').trim();

    // Basic validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Обязательные поля не заполнены' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Некорректный формат email' },
        { status: 400 }
      );
    }

    // Length limits
    if (name.length > 100 || company.length > 150 || phone.length > 30 || email.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Одно или несколько полей слишком длинные' },
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

    // === Формируем письмо (HTML + Plain Text) ===
    // Отправка обоих версий сильно повышает доставляемость и снижает попадание в спам

    // Экранируем пользовательский ввод для безопасности (защита от XSS в письме)
    const safeName = escapeHtml(name);
    const safeCompany = company ? escapeHtml(company) : 'Не указана';
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = message ? escapeHtml(message) : '';

    const emailSubject = `Новая заявка от ${name} (${company || 'без компании'})`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <h2 style="color: #16A34A; font-size: 26px; font-weight: 600; border-bottom: 2px solid #16A34A; padding-bottom: 10px; margin-bottom: 20px;">
          Новая заявка на ГЛЮКОМЕТРЫ
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #333;">ФИО:</td>
            <td style="padding: 8px 0; color: #333;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Компания:</td>
            <td style="padding: 8px 0; color: #333;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Телефон:</td>
            <td style="padding: 8px 0;">
              <a href="tel:${phone}" style="color: #013CC6; text-decoration: none;">${safePhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${email}" style="color: #013CC6; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
        </table>

        ${message ? `
          <div style="margin-bottom: 25px;">
            <strong style="color: #333;">Сообщение:</strong>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 8px; white-space: pre-wrap; color: #333; border: 1px solid #eee;">
              ${safeMessage}
            </div>
          </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
          Заявка поступила с сайта на глюкометры<br>
          Дата: ${new Date().toLocaleString('ru-RU')}
        </div>

        <div style="margin-top: 20px; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 15px;">
          ООО «Консунг Рус»<br>
          ИНН 7839134720<br>
          190005, г. Санкт-Петербург, наб. Обводного канала, д. 118А, лит. Х, офис 306
        </div>
      </div>
    `;

    // Plain Text версия (очень важна для антиспам-фильтров)
    const emailText = `
Новая заявка на ГЛЮКОМЕТРЫ

ФИО: ${name}
Компания: ${company || 'Не указана'}
Телефон: ${phone}
Email: ${email}
${message ? `\nСообщение:\n${message}\n` : ''}

Заявка поступила с сайта на глюкометры
Дата: ${new Date().toLocaleString('ru-RU')}

---
ООО «Консунг Рус»
ИНН 7839134720
190005, г. Санкт-Петербург, наб. Обводного канала, д. 118А, лит. Х, офис 306
    `.trim();

    // === Настройка получателя и отправителя ===
    // Получатель заявок (основной email компании)
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'info@konsungrus.ru';

    // Отправитель письма (From)
    // По умолчанию используется безопасный адрес Resend.
    // После подтверждения домена konsungrus.ru в Resend можно переопределить через переменную окружения:
    // FROM_EMAIL="Сайт Консунг Рус <info@konsungrus.ru>"
    const FROM_EMAIL = process.env.FROM_EMAIL || 'Сайт Консунг Рус <onboarding@resend.dev>';

    // Отправляем через Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: emailSubject,
        html: emailHtml,
        text: emailText,           // ← Plain Text версия (сильно помогает против спама)
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend API error:', JSON.stringify(errorData, null, 2));

      // Более понятная ошибка для пользователя
      let userMessage = 'Не удалось отправить заявку. Попробуйте позже.';

      if (errorData?.message?.includes('verify')) {
        userMessage = 'Ошибка отправки: домен не подтверждён в Resend. Свяжитесь с администратором.';
      } else if (errorData?.message) {
        userMessage = `Ошибка отправки: ${errorData.message}`;
      }

      return NextResponse.json(
        { error: userMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);

    // В production не отдаём технические детали клиенту
    const isProduction = process.env.NODE_ENV === 'production';
    const userError = isProduction 
      ? 'Не удалось отправить заявку. Попробуйте позже.' 
      : (error?.message || 'Не удалось отправить заявку.');

    return NextResponse.json(
      { error: userError },
      { status: 500 }
    );
  }
}
