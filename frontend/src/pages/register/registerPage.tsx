import CreateUserComponent from '../../components/createUserComponent'

const RegisterPage = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-2">
            <h2>Register</h2>

            <CreateUserComponent
                buttonText="Register"
                onSubmit={() => {}}
                closeDialog={() => {}}
            />
        </div>
    )
}

export default RegisterPage
