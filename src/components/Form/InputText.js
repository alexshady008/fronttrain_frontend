import {useField} from 'formik'

const InputText = ({label, ...props}) => {
    const [field, meta] = useField(props)

    return(
        <div className='input--container'>
            <label className='label-admin'> 
                {label}
                 <input {...field} {...props}  />
            </label>
            { meta.touched && meta.error ? (
                <div className='error' > {meta.error} </div>
            ) : null }
        </div>
    )
}


export default InputText