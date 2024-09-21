import FormComponent from '../../components/formComponent'

const RegisterPage = () => {
    const registerFields = [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            name: 'name',
        },
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
        {
            label: 'Confirm password',
            type: 'password',
            placeholder: 'Confirm password',
            name: 'confirmPassword',
        },
    ]

    return (
        <div className='flex flex-col items-start space-y-2'>
            <h2>Register</h2>
            <FormComponent
                fields={registerFields}
                buttonText="Register"
                onSubmit={(data) => console.log('Login form data:', data)}
            />
        </div>
    )
}

export default RegisterPage
