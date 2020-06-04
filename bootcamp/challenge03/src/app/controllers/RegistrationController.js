import * as Yup from 'yup';
import { parseISO, addMonths, isBefore } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await Registration.findAll({
      where: { canceled_at: null },
      order: ['created_at'],
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
      ],
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
    return res.json(registrations);
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
    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ erro: 'Past dates are not permitted' });
    }
    const mounthEnd = addMonths(parseISO(start_date), plan.duration);
    const registration = await Registration.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date,
      end_date: mounthEnd,
      price: plan.price,
    });

    Queue.add(RegistrationMail.key, { student, plan, registration });
    return res.json(registration);
  }

  async update(req, res) {
    const { id } = req.params;
    const registrationExists = await Registration.findByPk(id);
    if (!registrationExists) {
      return res.status(400).json({ error: 'Invalid Registration' });
    }
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }
    /**
     * Plan Validation
     */
    const plan = await Plan.findByPk(registrationExists.plan_id);

    const { start_date } = req.body;
    /**
     * Check past dates
     */
    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ erro: 'Past dates are not permitted' });
    }
    const mounthEnd = addMonths(parseISO(start_date), plan.duration);
    await registrationExists.update({
      start_date,
      end_date: mounthEnd,
    });
    return res.json(registrationExists);
  }

  async delete(req, res) {
    const { id } = req.params;
    const registrationExists = await Registration.findByPk(id);
    if (!registrationExists) {
      return res.status(400).json({ error: 'Invalid Registration' });
    }
    // await registrationExists.destroy();
    registrationExists.canceled_at = new Date();
    await registrationExists.save();
    return res.json(registrationExists);
  }
}

export default new RegistrationController();
