import * as Yup from 'yup';
import { parseISO, addMonths, isBefore } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const enrollments = await Enrollment.findAll({
      order: ['created_at'],
      attributes: ['student_id', 'plan_id', 'start_date', 'end_date', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'age'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });
    /**
     * Fields validation
     */
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validate fails.' });
    }

    /**
     * Student Validation
     */
    const { student_id } = req.body;
    const student = await Student.findByPk(student_id);
    if (!student) {
      res.status(400).json({ error: 'Plan not found.' });
    }
    /**
     * Plan Validation
     */
    const { plan_id } = req.body;
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      res.status(400).json({ error: 'Plan not found.' });
    }

    const { start_date } = req.body;
    /**
     * Check past dates
     */
    if (isBefore(start_date, new Date())) {
      return res.status(400).json({ erro: 'Past dates are not permitted' });
    }
    const mounthEnd = addMonths(parseISO(start_date), plan.duration);
    const enrollment = await Enrollment.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date,
      end_date: mounthEnd,
      price: plan.price,
    });

    Queue.add(EnrollmentMail.key, { student, plan, enrollment });
    return res.json(enrollment);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new EnrollmentController();
