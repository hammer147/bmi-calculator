import type { NextPage } from 'next'
import { useState } from 'react'
import Calculator from '../components/calculator'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Home: NextPage = () => {
  const [bmi, setBmi] = useState(0)

  const calculateBmiCategory = (bmi: number): string => {
    if (bmi > 0 && bmi < 18.5) return 'Underweight'
    if (bmi >= 18.5 && bmi < 25) return 'Normal Weight'
    if (bmi >= 25 && bmi < 30) return 'Overweight'
    if (bmi >= 30) return 'Obese'
    return 'Fill in the fields'
  }

  const bmiCategory = calculateBmiCategory(bmi)
  const catClass = bmiCategory.split(' ')[0].toLowerCase() // css class and image name

  return (
    <div className={`${styles.container} ${styles[catClass]}`}>
      <div className={`${styles.title}`}>Body Mass Index Calculator</div>
      <div className={`${styles.results}`}>
        <div className={`${styles.bmiValue}`}>BMI = {bmi}</div>
        <div className={`${styles.bmiCategory}`}>{bmiCategory}</div>
      </div>
      <Calculator catClass={catClass} setBmi={setBmi} />
      <Image src={`/images/${catClass}.png`} alt={catClass} width={120} height={240} />
    </div>
  )
}

export default Home
