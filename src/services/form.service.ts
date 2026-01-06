import { FormModel } from '../models/form.model';
import { sendUserEmail, sendAdminEmail } from './email.service';
import { FormInputType } from '../schemas/form.schema';

export async function submitFormService(data: FormInputType) {
 
  const savedForm = await FormModel.create(data);

 
  Promise.all([
    sendUserEmail(data.email, data.name),
    sendAdminEmail(data)
  ]).catch(console.error);

  return savedForm;
}
