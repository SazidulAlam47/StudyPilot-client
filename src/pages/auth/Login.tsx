import { googleLogin } from '../../firebase/firebase.action';

const Login = () => {
    const handleGoogleLogin = async () => {
        const userInfo = await googleLogin();
        const idToken = await userInfo.user.getIdToken();

        console.log(idToken);
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>google login</button>
        </div>
    );
};

export default Login;
