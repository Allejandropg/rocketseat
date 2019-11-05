import { Op } from 'sequelize';
import { startOfWeek, addDays } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;
    const studentExists = Student.findByPk(id);
    if (!studentExists) {
      return res.status(400).json({ error: 'Invalid Student' });
    }

    const enrollment = Enrollment.findOne({
      where: { student_id: studentExists.id, canceled_at: null },
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid Enrollment' });
    }
    const checkins = await Checkin.findAll({
      where: { student_id: id },
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(400).json({ error: 'Invalid Student' });
    }
    const startWeek = startOfWeek(new Date());
    const endWeek = addDays(startWeek, 7);
    const checkins = await Checkin.findAndCountAll({
      where: { created_at: { [Op.between]: [startWeek, endWeek] } },
    });
    if (checkins.count >= 5) {
      return res
        .status(401)
        .json({ error: 'You have reached the checkins limit.' });
    }
    const enrollment = await Enrollment.findOne({
      where: { student_id: student.id, canceled_at: null },
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid Enrollment' });
    }

    const checkin = await Checkin.create({
      student_id: student.id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
