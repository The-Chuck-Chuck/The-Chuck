import Modal from "../../components/Modal";
import kakaoLogin from "../../asset/kakao_login_large_wide.png";
import googleLogin from "../../asset/web_light_sq_SU.svg";

const LoginModal = ({ setIsOpened }) => {
  return (
    <Modal drection="horizontal" title="Login!" setIsOpened={setIsOpened}>
      <div className="mt-7 flex flex-col justify-center items-center gap-5">
        <img src={kakaoLogin} alt="kakao login" className="w-80" />
        <img src={googleLogin} alt="goolge login" className="w-64" />
      </div>
    </Modal>
  );
};

export default LoginModal;
