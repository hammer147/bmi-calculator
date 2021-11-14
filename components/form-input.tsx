import { ChangeEventHandler } from 'react'

type Props = {
  title: string
  name: string
  type: 'text' | 'number'
  value: string
  handleChange: ChangeEventHandler
}

const FormInput = ({ title, name, type, value, handleChange }: Props) => {
  return (
    <div>
      <label>{title}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        autoComplete="false"
      />
    </div>
  )
}

export default FormInput
