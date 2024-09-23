import { Hardware } from '@/app/entities/hardware';
import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { HardwareModel } from '@/app/entities/hardware-model';
import { State } from './state';
import { CpuState } from './cpu-state';
import { RamState } from './ram-state';
import { MANUFACTURERS } from '@/app/entities/manufacurers';

export class MotherboardState extends State {
    protected name = HARDWARE_TYPES.MOTHERBOARD;

    public filter(hardwareList: Hardware[]): void {
        const manufacturer = this.order.getDesktop().getCpu()?.manufacturer;
        let motherboards = hardwareList.filter(
            (item) => item.type === HARDWARE_TYPES.MOTHERBOARD,
        );

        if (manufacturer) {
            const chipset: string[] = [];

            switch (manufacturer) {
                case MANUFACTURERS.INTEL:
                    chipset.push('LGA1700', 'LGA 1700');
                    break;

                case MANUFACTURERS.AMD:
                    chipset.push('AM5');
                    break;
            }

            motherboards = motherboards.filter((item) => {
                return chipset?.some((c) => item.title.includes(c));
            });
        }

        this.hardwareList = motherboards.map(
            (hardware) => new HardwareModel(hardware),
        );
    }

    public nextState(): void {
        this.order.setState(new RamState(this.order));
    }

    public prevState(): void {
        this.order.setState(new CpuState(this.order));
    }
}
