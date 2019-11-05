import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import HelpOrderMail from '../jobs/HelpOrderMail';

// Crie uma rota para a academia listar todos pedidos de auxílio sem resposta;
class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await HelpOrder.findAll({
      where: { answer: null },
      order: ['created_at'],
      attributes: ['id', 'student_id', 'answer', 'answer', 'answer_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'age'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async store(req, res) {
    const { answer } = req.query;
    const { id } = req.params;
    const helpOrder = await HelpOrder.findOne({ where: { id } });
    if (!helpOrder) {
      return res.status(400).json({ error: 'Help not found.' });
    }
    await helpOrder.update({ answer, answer_at: new Date() });

    const student = await Student.findOne({
      where: { id: helpOrder.student_id },
    });
    Queue.add(HelpOrderMail.key, { student, helpOrder });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
