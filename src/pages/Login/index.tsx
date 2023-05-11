import { Form, Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";

import { getUser } from "../../services/user";
import { setLogged } from "../../store/actions/user";
import { SignInSchema } from "../../utils/validators/schemas";

const email = "Ola92@gmail.com";
const senha = "nFRb2uF4jGqRC6y";
console.log(email, senha);

const initialValues: ISignInForm = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();

  const onSubmit = async (values: ISignInForm) => {
    const user = await getUser(values.email);

    if (user.senha === values.password) {
      dispatch(
        setLogged({
          user,
          isLogged: true,
        })
      );
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SignInSchema}
        enableReinitialize
      >
        {(props: FormikProps<ISignInForm>) => {
          const { values, handleChange, handleBlur, dirty, isValid } = props;

          return (
            <Form>
              <h1>Sign In</h1>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <label htmlFor="password">
                Senha
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <button type="submit" disabled={!isValid || !dirty}>
                Logar
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
