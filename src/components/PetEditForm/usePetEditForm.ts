import * as Yup from 'yup';
import { useFormik, FormikConfig } from 'formik';

export type Values = {
  id: string;
  name: string;
  breed: string;
};

const Schema = Yup.object({
  name: Yup.string().required('Name is required'),
  breed: Yup.string().required('Breed is required')
});

export const usePetEditForm = ({
  onSubmit
}: Pick<FormikConfig<Values>, 'onSubmit'>) => {
  return useFormik<Values>({
    initialValues: {
      id: '',
      name: '',
      breed: ''
    },

    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false
  });
};
