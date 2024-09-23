import { HardwareModel } from './hardware-model';
import { HARDWARE_TYPES } from './hardware-type';

export class Desktop {
    private cpu?: HardwareModel;
    private motherboard?: HardwareModel;
    private ram?: HardwareModel;
    private gpu?: HardwareModel;
    private storage?: HardwareModel;
    private psu?: HardwareModel;
    private case?: HardwareModel;

    public getCpu() {
        return this.cpu;
    }
    public getMotherboard() {
        return this.motherboard;
    }
    public getRam() {
        return this.ram;
    }
    public getGpu() {
        return this.gpu;
    }

    public getStorage() {
        return this.storage;
    }

    public getPsu() {
        return this.psu;
    }

    public getCase() {
        return this.case;
    }

    public getTotalPrice(): number {
        return this.toList().reduce((acc, hardware) => {
            if (hardware !== undefined) {
                acc += hardware.price;
            }

            return acc;
        }, 0);
    }

    public getPriceFormatted(): string {
        const { format } = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return format(this.getTotalPrice() / 100);
    }

    public addHardware(hardware: HardwareModel) {
        switch (hardware.type) {
            case HARDWARE_TYPES.CPU:
                this.cpu = hardware;
                break;
            case HARDWARE_TYPES.MOTHERBOARD:
                this.motherboard = hardware;
                break;
            case HARDWARE_TYPES.RAM:
                this.ram = hardware;
                break;
            case HARDWARE_TYPES.GPU:
                this.gpu = hardware;
                break;
            case HARDWARE_TYPES.STORAGE:
                this.storage = hardware;
                break;
            case HARDWARE_TYPES.PSU:
                this.psu = hardware;
                break;
            case HARDWARE_TYPES.CASE:
                this.case = hardware;
                break;
        }
    }

    public toList() {
        return [
            this.cpu,
            this.motherboard,
            this.ram,
            this.gpu,
            this.storage,
            this.psu,
            this.case,
        ];
    }

    public toObject() {
        return {
            [HARDWARE_TYPES.CPU]: this.cpu,
            [HARDWARE_TYPES.MOTHERBOARD]: this.motherboard,
            [HARDWARE_TYPES.RAM]: this.ram,
            [HARDWARE_TYPES.GPU]: this.gpu,
            [HARDWARE_TYPES.STORAGE]: this.storage,
            [HARDWARE_TYPES.PSU]: this.psu,
            [HARDWARE_TYPES.CASE]: this.case,
        };
    }
}
