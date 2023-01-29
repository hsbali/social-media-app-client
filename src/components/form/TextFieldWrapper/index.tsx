import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

export default function TextfieldWrapper({
    name,
    ...otherProps
}: TextFieldProps & { name: string }): JSX.Element {
    const [field, meta] = useField(name);

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
    };

    if (meta && meta.touched && meta.error) {
        configTextfield.error = true;
        configTextfield.helperText = meta.error;
    }

    return (
        <TextField {...configTextfield} />
    );
};