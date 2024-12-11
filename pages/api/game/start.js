import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { gameId } = req.body;

    try {
      // Получаем игру и проверяем, что оба игрока указаны
      const game = await prisma.game.findUnique({
        where: { game_id: gameId },
        include: { inviter: true, invited: true },
      });

      if (!game.inviter || !game.invited) {
        return res.status(400).json({ error: 'Оба игрока должны быть указаны' });
      }

      // Обновляем expires для первого хода
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + game.duration);

      // Создаем игроков
      await prisma.player.createMany({
        data: [
          { gameId: gameId, email: game.inviter, color: 'WHITE', name: 'Player 1' },
          { gameId: gameId, email: game.invited, color: 'BLACK', name: 'Player 2' },
        ],
      });

      // Обновляем expires в игре
      await prisma.game.update({
        where: { game_id: gameId },
        data: { expires },
      });

      return res.status(200).json({ status: 'success', expires });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка при начале игры' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
}
