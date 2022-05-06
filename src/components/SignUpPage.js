import React from 'react';
import { useEffect } from 'react';
import { Session, User } from '../requests';
import { useNavigate } from "react-router-dom";


const SignUpPage = (props) => {
    let navigate = useNavigate();
    const { onSignUp } = props;
    const handleSubmit = event => {
        const { currentTarget } = event
        event.preventDefault()
        const formData = new FormData(currentTarget)
        const params = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation'),
            img: formData.get('profile-pic'),
        }
        User.create(params).then(user => {
            console.log(user)
            if(user?.id){
                navigate("/Sign_In")
            }
        })


    }

    useEffect(() => {
        const multiStepForm = document.querySelector("[data-multi-step]")
        const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
        let currentStep = formSteps.findIndex(step => {
        return step.classList.contains("active")
        })

        if (currentStep < 0) {
        currentStep = 0
        showCurrentStep()
        }

        multiStepForm.addEventListener("click", e => {
        let incrementor
        const inputs = [...formSteps[currentStep].querySelectorAll("input")]
        const allValid = inputs.every(input => input.reportValidity())
        if (e.target.matches("[data-next]")) {
            incrementor = 1
        } else if (e.target.matches("[data-previous]")) {
            incrementor = -1
            currentStep += incrementor
            showCurrentStep()
        }

        if (incrementor == null) return

        if (allValid) {
            currentStep += incrementor
            showCurrentStep()
        }
        })

        formSteps.forEach(step => {
        step.addEventListener("animationend", e => {
            formSteps[currentStep].classList.remove("hide")
            e.target.classList.toggle("hide", !e.target.classList.contains("active"))
        })
        })

        function showCurrentStep() {
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep)
        })
        }
    }, [])
    return(
        <main className='signUpForm'>
            <form onSubmit={handleSubmit} data-multi-step>
                <div data-step className='card active'>
                    <h2 className='step-title'>Sign Up</h2>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" required name='email' id='email' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" required name='password' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input type="password_confirmation" required name='password_confirmation' id='password_confirmation' />
                    </div>
                    <button type='button' data-next>Next</button>
                </div>
                <div data-step className='card'>
                <h2 className='step-title'>Sign Up</h2>
                    <div className='form-group'>
                        <label htmlFor="first_name">First Name</label>
                        <input type="first_name" required name='first_name' id='first_name' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="last_name" required name='last_name' id='last_name' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="profile-pic">Profile Picture Url</label>
                        <input type="profile-pic" name='profile-pic' id='profile-pic' />
                    </div>
                    <button type='button' className='previous-btn' data-previous >Previous</button>
                    <input className='submit-btn' type="submit" value="Sign Up" />
                </div>
            </form>
        </main>
    )
}

export default SignUpPage;
