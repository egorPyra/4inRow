import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { inviterEmail, duration, invitationTimeout } = req.body;

    try {
      // Вычисляем expires
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + invitationTimeout);

      // Создаем игру
      const game = await prisma.game.create({
        data: {
          expires,
          duration,
          inviter: inviterEmail,
        },
      });

      return res.status(201).json({ status: 'success', game });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка при создании игры' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
}
