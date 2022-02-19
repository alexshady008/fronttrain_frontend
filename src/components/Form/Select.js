import {useField} from 'formik'

const Select = ({label, children, ...props}) => {
    const [field, meta] = useField(props)
    return(
        <div className='input--container'>
            <label>
                {label}
                <select {...field} {...props} >
                    {children}
                </select>
            </label>
            { meta.touched && meta.error ? (
                <div className='error' > {meta.error} </div>
            ) : null }
        </div>
    )
}


export default Select

