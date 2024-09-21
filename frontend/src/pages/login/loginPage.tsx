import FormComponent from '../../components/formComponent'

const LoginPage = () => {
    const loginFields = [
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email',
            name: 'email',
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            name: 'password',
        },
    ]

    return (
        <div className='flex flex-col items-start space-y-2 mb-10'>
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
