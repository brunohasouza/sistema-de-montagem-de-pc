import { Hardware } from '@/app/entities/hardware';
import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { HardwareModel } from '@/app/entities/hardware-model';
import { MANUFACTURERS } from '@/app/entities/manufacurers';
import { Desktop } from '@/app/entities/desktop';
import { State } from './state';
import { GpuState } from './gpu-state';
import { MotherboardState } from './motherboard-state';

export class RamState extends State {
    protected name = HARDWARE_TYPES.RAM;
    private chipsets = [
        'B760M-A',
        'B760-Plus',
        'B760M-Plus',
        'B760',
        'B760M',
        'H610',
        'Z790-A',
    ];

    public filter(hardwareList: Hardware[]): void {
        const desktop: Desktop = this.order.getDesktop();

        let type: string = '';

        if (desktop.getCpu()?.manufacturer === MANUFACTURERS.AMD) {
            type = 'DDR5';
        }

        if (desktop.getCpu()?.manufacturer === MANUFACTURERS.INTEL) {
            const mb = desktop.getMotherboard();

            const isDdr4 = this.chipsets.some((chipset) => {
                if (chipset === 'B760M' || chipset === 'Z790-A') {
                    return (
                        mb?.title.includes(chipset) &&
                        !mb?.title.includes('DDR5')
                    );
                }

                return mb?.title.includes(chipset);
            });

            type = isDdr4 ? 'DDR4' : 'DDR5';
        }

        this.hardwareList = hardwareList
            .filter(
                (hardware) =>
                    hardware.type === HARDWARE_TYPES.RAM &&
                    hardware.title.includes(type),
            )
            .map((hardware) => new HardwareModel(hardware));
    }

    public nextState(): void {
        this.order.setState(new GpuState(this.order));
    }

    public prevState(): void {
        this.order.setState(new MotherboardState(this.order));
    }
}
