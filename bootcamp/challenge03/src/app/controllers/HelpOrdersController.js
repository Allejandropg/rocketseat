import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import HelpOrderMail from '../jobs/HelpOrderMail';

// Crie uma rota para a academia listar todos pedidos de auxílio sem resposta;
class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const registrations = await HelpOrder.findAll({
      where: { answer: null },
      order: ['created_at'],
      attributes: [
        'id',
        'student_id',
        'question',
        'answer',
        'answer',
        'answer_at',
      ],
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
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }
    const { answer } = req.body;
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
