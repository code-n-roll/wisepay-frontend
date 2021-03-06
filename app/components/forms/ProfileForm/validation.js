import { email, password, required } from '../validations';
import messages from '../messages';

export const validate = values => {
  const errors = {}
  errors.username = required(values.get('username'));

  errors.email = required(values.get('email'));
  if (!errors.email) {
    errors.email = email(values.get('email'));
  }

  if (values.get('newPassword')) {
    errors.newPassword = password(values.get('newPassword'));
    errors.password = required(values.get('password'));
    errors.passwordConfirmation = required(values.get('passwordConfirmation'));

    if (values.get('newPassword') !== values.get('passwordConfirmation')) {
      errors.passwordConfirmation = messages.passwordsDontMatch;
    }
  }

  return errors;
}
