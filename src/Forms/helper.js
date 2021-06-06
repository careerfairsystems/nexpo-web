import * as React from 'react';
import type { FieldProps, InputProps } from 'redux-form/es/FieldProps.types.js.flow'
import { trim } from 'lodash/fp';
import { Form } from 'antd';

const FormItem = Form.Item;
type PasswordValues = {
  password?: string,
  passwordConfirmation?: string
};

export const validatePassword = (values: PasswordValues): any => {
  const errors = {};
  if (values && values.password && values.passwordConfirmation) {
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords Must Match';
    }
  }
  return errors;
};
export const required = (value: string): ?string =>
  trim(value) ? undefined : "Field can't be empty";

type Props = FieldProps & {
  accept: string,
  children: Node,
  format: string,
  label: string,
  hasFeedback: Boolean,
  required: Boolean
};

const makeField = (Component: React.ComponentType<any>) : React.ComponentType<any> => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  required,
  ...rest
}: Props) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      required={required}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component label={label} {...input} {...(rest: $Rest<Object, InputProps & {label: string}>)} >
        {children}
      </Component>
    </FormItem>
  );
}

export default makeField
