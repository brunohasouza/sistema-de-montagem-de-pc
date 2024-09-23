import { HARDWARE_TYPES } from './hardware-type';
import { MANUFACTURERS } from './manufacurers';

export interface Hardware {
    id: number;
    title: string;
    manufacturer: MANUFACTURERS;
    price: number;
    image: string;
    type: HARDWARE_TYPES;
}
