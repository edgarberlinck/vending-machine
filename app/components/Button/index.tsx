import React from 'react'
import styles from './Button.module.scss'

export interface ButtonProps {
  children: typeof React.Children
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
