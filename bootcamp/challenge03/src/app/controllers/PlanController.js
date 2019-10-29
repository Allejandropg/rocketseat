import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Title not valid'),
      price: Yup.number().required('Price is not valid'),
      date: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validate fail.' });
    }
    console.log('storePlan', req.body);
    const { title, price, date } = await Plan.create(req.body);
    return res.json({ title, price, date });
  }
}
export default new PlanController();
