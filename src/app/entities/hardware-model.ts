import { Hardware } from './hardware';
import { HARDWARE_TYPES } from './hardware-type';
import { MANUFACTURERS } from './manufacurers';

export class HardwareModel {
    constructor(private readonly hardware: Hardware) {}

    get id(): number {
        return this.hardware.id;
    }

    get title(): string {
        return this.hardware.title;
    }

    get manufacturer(): MANUFACTURERS {
        return this.hardware.manufacturer;
    }

    get price(): number {
        return this.hardware.price;
    }

    get image(): string {
        return this.hardware.image;
    }

    get type(): HARDWARE_TYPES {
        return this.hardware.type;
    }

    get priceFormatted(): string {
        const { format } = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return format(this.hardware.price / 100);
    }
}
