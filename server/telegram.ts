import axios from 'axios';

// Telegram configuration
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Проверка наличия необходимых переменных окружения
if (!telegramToken || !chatId) {
  console.warn('Warning: Telegram token or chat ID not provided in environment variables.');
}

const baseUrl = telegramToken ? `https://api.telegram.org/bot${telegramToken}` : '';

/**
 * Sends a message to the Telegram chat
 * @param message The message to send
 * @returns Promise resolving to the API response
 */
export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    // Если токены не настроены, логируем сообщение и возвращаем ошибку
    if (!telegramToken || !chatId || !baseUrl) {
      console.error('Telegram configuration is missing. Check your environment variables.');
      return false;
    }
    
    const url = `${baseUrl}/sendMessage`;
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

/**
 * Format a contact form submission for Telegram
 */
export function formatContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
<b>📞 New Contact Form Submission</b>

<b>Name:</b> ${data.name}
<b>Email:</b> ${data.email}
<b>Subject:</b> ${data.subject}
<b>Message:</b> ${data.message}
`;
}

/**
 * Format a visitor form submission for Telegram
 */
export function formatVisitorMessage(data: {
  name: string;
  email: string;
  country: string;
  purpose: string;
  comments?: string;
  exhibition?: string;
}): string {
  return `
<b>👋 New Exhibition Visitor Registration</b>
${data.exhibition ? `<b>Exhibition:</b> ${data.exhibition}\n` : ''}
<b>Name:</b> ${data.name}
<b>Email:</b> ${data.email}
<b>Country:</b> ${data.country}
<b>Purpose:</b> ${data.purpose}
<b>Comments:</b> ${data.comments || 'N/A'}
`;
}

/**
 * Format a participant form submission for Telegram
 */
export function formatParticipantMessage(data: {
  name: string;
  email: string;
  company: string;
  country: string;
  participationType: string;
  industry: string;
  registrationAssistance: string;
  logistics: string;
  comments?: string;
  exhibition?: string;
}): string {
  return `
<b>🏢 New Exhibition Participant Registration</b>
${data.exhibition ? `<b>Exhibition:</b> ${data.exhibition}\n` : ''}
<b>Name:</b> ${data.name}
<b>Email:</b> ${data.email}
<b>Company:</b> ${data.company}
<b>Country:</b> ${data.country}
<b>Participation Type:</b> ${data.participationType}
<b>Industry:</b> ${data.industry}
<b>Registration Assistance:</b> ${data.registrationAssistance}
<b>Logistics Support:</b> ${data.logistics}
<b>Comments:</b> ${data.comments || 'N/A'}
`;
}

/**
 * Format a business mission form submission for Telegram
 */
export function formatBusinessMissionMessage(data: {
  name: string;
  email: string;
  country: string;
  comments?: string;
  exhibition?: string;
}): string {
  return `
<b>🌎 New Business Mission Interest</b>
${data.exhibition ? `<b>Mission:</b> ${data.exhibition}\n` : ''}
<b>Name:</b> ${data.name}
<b>Email:</b> ${data.email}
<b>Country:</b> ${data.country}
<b>Comments:</b> ${data.comments || 'N/A'}
`;
}

/**
 * Format an IT Solutions form submission for Telegram
 */
export function formatITSolutionsMessage(data: {
  name: string;
  company: string;
  phone: string;
  comment?: string;
}): string {
  return `
<b>💻 Новая заявка — IT-решения</b>

<b>Имя:</b> ${data.name}
<b>Компания:</b> ${data.company}
<b>Телефон/Telegram:</b> ${data.phone}
<b>Комментарий:</b> ${data.comment || 'Не указан'}
`;
}

/**
 * Format a business tour form submission for Telegram
 */
export function formatBusinessTourMessage(data: any) {
  return `
🎫 New Business Tour Booking

👤 Name: ${data.name}
📧 Email: ${data.email}
🏢 Company: ${data.company}
📱 Phone: ${data.phone}
🌍 Country: ${data.country}
📦 Package: ${data.selectedPackage}

💭 Comments:
${data.comments || 'No comments provided'}
`;
}