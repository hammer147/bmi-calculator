import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect, useState } from 'react'
import styles from './calculator.module.css'
import FormInput from './form-input'

type UnitSystem = 'metric' | 'imperial'

type Props = {
  catClass: string
  setBmi: Dispatch<SetStateAction<number>>
}

const Calculator = ({ catClass, setBmi }: Props) => {

  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [values, setValues] = useState({
    length: '0',
    inches: '0',
    mass: '0'
  })
  const { length, inches, mass } = values

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
    e.target.value === 'metric' ? setUnitSystem('metric') : setUnitSystem('imperial')
    setValues({ length: '0', inches: '0', mass: '0' })
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleResetClick: MouseEventHandler = () => setValues({ length: '0', inches: '0', mass: '0' })

  // round to 2 decimals, note that EPSILON is needed for cases like 1.005
  const round = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100

  // useCallback because in dep arr
  const metricBMI = useCallback((l: number, m: number): number => {
    if (l > 0 && m > 0) return round(m / (l / 100) ** 2)
    return 0
  }, [])

  // setBmi updates the bmi state in the parent component
  useEffect(() => {
    let l, m
    if (unitSystem === 'metric') {
      l = +length
      m = +mass
    } else {
      l = +length * 30.48 + +inches * 2.54
      m = +mass * 0.45359237
    }
    setBmi(metricBMI(l, m))
  }, [inches, length, mass, metricBMI, setBmi, unitSystem])

  return (
    <div className={styles.inputs}>
      <div >
        <label>Units</label>
        <select name="units" value={unitSystem} onChange={handleSelectChange}>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>
      </div>
      <div className={styles.formInputs}>
        <FormInput
          type="number"
          name="length"
          title={`Height (${unitSystem === 'metric' ? 'cm' : 'ft'})`}
          value={length}
          handleChange={handleInputChange}
        />
        {
          unitSystem === 'imperial' ?
            <FormInput
              type="number"
              name="inches"
              title={`Height (in)`}
              value={inches}
              handleChange={handleInputChange}
            /> :
            null
        }
        <FormInput
          type="number"
          name="mass"
          title={`Weight (${unitSystem === 'metric' ? 'kg' : 'lbs'})`}
          value={mass}
          handleChange={handleInputChange}
        />
      </div>
      <button type="button" onClick={handleResetClick} className={styles[catClass]}>Reset</button>
      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
    </div>
  )
}

export default Calculator
