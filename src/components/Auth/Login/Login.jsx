import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { login } from '../../../api/services/auth';

const MySwal = withReactContent(Swal);

const LoginPopup = async () => {
  return MySwal.fire({
    title: 'Accede a tu cuenta',
    html: `
    <div>
      <input type="email" id="email" class="swal2-input" placeholder="Correo eletrònico">
      <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
    </div>
    <div>
      <label style="color:black;">Recordar usuario</label>
      <input type="checkbox" id="remember">
    </div>`,
    confirmButtonText: 'Entra',
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const email = Swal.getPopup().querySelector('#email').value;
      const password = Swal.getPopup().querySelector('#password').value;
      const remember = Swal.getPopup().querySelector('#remember').checked;

      if (!email || !password)
        MySwal.showValidationMessage(`Rellena todos los campos`);

      return { email, password, remember };
    },
  }).then((result) => {
    const credentials = {
      email: result.value.email,
      password: result.value.password,
      remember: result.value.remember,
    };
    login(credentials)
      .then((data) => console.log(data))
      .catch((error) => MySwal.fire(`${error.message}`));
  });
};

export default LoginPopup;
