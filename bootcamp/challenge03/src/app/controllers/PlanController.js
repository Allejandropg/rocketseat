import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Title not valid'),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required('Price is not valid'),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validate fails.' });
    }

    const { title, duration, price } = await Plan.create(req.body);
    return res.json({ title, price, duration });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }
    const { title, duration, price } = await plan.update(req.body);
    return res.json({ title, price, duration });
  }

  async delete(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }
    const { title, duration, price } = plan;
    const canceled = plan.destroy();
    return res.json({ title, price, duration, canceled });
  }
}
export default new PlanController();
