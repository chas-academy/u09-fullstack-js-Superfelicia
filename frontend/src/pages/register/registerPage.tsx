import CreateUserComponent from '../../components/createUserComponent'

const RegisterPage = () => {
    return (
        <div className="flex flex-col items-start space-y-2">
            <h2>Register</h2>

            <CreateUserComponent
                onSuccess={() => console.log('User created successfully!')}
                buttonText="Register"
            />
        </div>
    )
}

export default RegisterPage
