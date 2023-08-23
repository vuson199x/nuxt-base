const usePassword = (ruleForm: any, ruleFormRef: any) => {
    const checkPwd = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the password'))
        } else {
            if (ruleForm.password_confirmation !== '') {
                if (!ruleFormRef.value) return
                ruleFormRef.value.validateField('password_confirmation', () => null)
            }
            callback()
        }
    }
    const checkConfirmPwd = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Please input the password again'))
        } else if (value !== ruleForm.password) {
            callback(new Error("Confirm password does not match new password!"))
        } else {
            callback()
        }
    }

    return {
        checkPwd,
        checkConfirmPwd
    }
}

export default usePassword
