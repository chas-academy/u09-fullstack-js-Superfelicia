import FormComponent from '../../components/formComponent'

const LoginPage = () => {
    const loginFields = [
        {
            label: 'Username',
            type: 'text',
            placeholder: 'Enter username',
            name: 'username',
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            name: 'password',
        },
    ]

    return (
        <div>
            <h2>Login</h2>
            <FormComponent
                fields={loginFields}
                buttonText="Login"
                onSubmit={(data) => console.log('Login form data:', data)}
            />
        </div>
    )
}

export default LoginPage
