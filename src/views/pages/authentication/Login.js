// ** React Imports
import {useContext, Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';

// ** Custom Hooks
import {useSkin} from '@hooks/useSkin';
import useJwt from '@src/auth/jwt/useJwt';

// ** Third Party Components
import {useDispatch} from 'react-redux';
import {toast, Slide} from 'react-toastify';
import {useForm, Controller} from 'react-hook-form';
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
} from 'react-feather';

// ** Actions
import {handleLogin} from '@store/authentication';

// ** Context
import {AbilityContext} from '@src/utility/context/Can';
import logo from "../../../assets/images/logo/image.png"

// ** Custom Components
import Avatar from '@components/avatar';
import InputPasswordToggle from '@components/input-password-toggle';

// ** Utils
import {getHomeRouteForLoggedInUser} from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  UncontrolledTooltip,
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import AxiosConfigadmin from '../../../Config/AxiosConfig copy';
import {End_Urls} from '../../../Config/End_Urls';

const ToastContent = ({name, role}) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to SAA. Now you can
        start to explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

const defaultValues = {
  password: '',
  loginEmail: '',
};

const Login = () => {
  // ** Hooks
  const {skin} = useSkin();
  const dispatch = useDispatch();
  const history = useHistory();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues});
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const adminlogin = data => {
  

    AxiosConfigadmin.post(End_Urls.login, {
      email: data.email,
      password: data.password,
    })
      .then(res => {
        console.log(res.data.token);

        localStorage.setItem('token', res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmit = data => {
    adminlogin({email: data.loginEmail, password: data.password});
    if (Object.values(data).every(field => field.length > 0)) {
      useJwt
        .login({email: data.loginEmail, password: data.password})
        .then(res => {
          const data = {
            ...res.data.userData,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          };

          dispatch(handleLogin(data));
          ability.update(res.data.userData.ability);
          history.push(getHomeRouteForLoggedInUser(data.role));
          toast.success(
            <ToastContent
              name={data.fullName || data.username || 'John Doe'}
              role={data.role || 'admin'}
            />,
            {
              icon: false,
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000,
            },
          );
        })
        .catch(err => console.log(err));
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
          });
        }
      }
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={e => e.preventDefault()}>
         <img src={logo} alt='' style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
          <h2 className="brand-text text-primary ms-1">Shruthilaya Academy of Arkansas</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to Shruthilaya Academy of Arkansas! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            {/* <Alert color="primary">
              <div className="alert-body font-small-2">
                <p>
                  <small className="me-50">
                    <span className="fw-bold">Admin:</span> admin@gamil.com |
                    123456
                  </small>
                </p>
                <p>
                  <small className="me-50">
                    <span className="fw-bold">Client:</span> client@demo.com |
                    client
                  </small>
                </p>
              </div>
              <HelpCircle
                id="login-tip"
                className="position-absolute"
                size={18}
                style={{top: '10px', right: '10px'}}
              />
              <UncontrolledTooltip target="login-tip" placement="left">
                This is just for ACL demo purpose.
              </UncontrolledTooltip>
            </Alert> */}
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Controller
                  id="loginEmail"
                  name="loginEmail"
                  control={control}
                  render={({field}) => (
                    <Input
                      autoFocus
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({field}) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button type="submit" color="primary" block>
                Sign in
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
