import { create } from 'tailwind-rn';
import styles from './styles.json'; // On va le générer après

const { tailwind, getColor } = create(styles);

export { tailwind, getColor };
