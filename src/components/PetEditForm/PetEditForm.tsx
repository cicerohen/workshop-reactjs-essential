import { FormikState, FormikHandlers } from 'formik';
import { Input } from '../Input';
import { Field } from '../Field';

import { Values } from './usePetEditForm';
import React from 'react';

export type PetEditFormProps = FormikHandlers & FormikState<Values>;

export const PetEditForm = ({
  handleSubmit,
  handleBlur,
  handleChange,
  isSubmitting,
  values,
  errors
}: PetEditFormProps) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Field
        name="name"
        label="Pet name"
        component={Input as React.FunctionComponent}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        invalid={!!errors.name}
        errorMessage={errors.name}
      />
      <Field
        name="breed"
        label="Pet breed"
        component={Input as React.FunctionComponent}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.breed}
        invalid={!!errors.breed}
        errorMessage={errors.breed}
      />
      <div className="space-x-2 flex justify-end">
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-indigo-600 px-4 py-2 rounded-md text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};
