import React, { useState } from 'react';
import { useEffect } from 'react';
import { Session, User } from '../requests';
import { useNavigate } from "react-router-dom";


const SignInPage = (props) => {
    const navigate = useNavigate();
    const { onSignIn } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        const params = {
            email: email,
            password: password
        }
        Session.create(params).then(data => {
            if(data.status === 404){
               let wrongPasswordMsg = document.getElementById('invalid')
               wrongPasswordMsg.classList.remove('disabled')
            }
            else if (data.id){
                navigate("/")
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
                    <h2 className='step-title'>Sign In</h2>
                    <p id='invalid' className='disabled'>* Incorrect email or password</p>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input required type="email" name="email" id="email" onChange={event => {
                        setEmail(event.currentTarget.value); }}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={event => {
                        setPassword(event.currentTarget.value); }}/>
                    </div>
                    <input className='submit-btn' type="submit" value="Sign In" />
                </div>
            </form>
        </main>
    )
}

export default SignInPage;
