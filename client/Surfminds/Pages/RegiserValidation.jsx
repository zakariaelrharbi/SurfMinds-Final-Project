import * as Yup from 'yup'

export const RegiserValidation = Yup.object ({
    username: Yup.string().required("Please Enter Username").minLength(3).maxLength(25),
    email: Yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
    password: Yup.string().required("Please Enter Password").minLength(8).maxLenght(25),

});
