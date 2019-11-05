import { Op } from 'sequelize';
import { startOfWeek, addDays } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const student_id = req.studentID;

    const enrollment = Enrollment.findOne({
      where: { student_id, canceled_at: null },
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid Enrollment' });
    }
    const checkins = await Checkin.findAll({
      where: { student_id },
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const student_id = req.studentID;
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
      where: { student_id, canceled_at: null },
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid Enrollment' });
    }

    const checkin = await Checkin.create({
      student_id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
