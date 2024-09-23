import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { Hardware } from '@/app/entities/hardware';
import { HardwareModel } from '@/app/entities/hardware-model';
import { State } from './state';
import { StorageState } from './storage-state';
import { CaseState } from './case-state';

export class PsuState extends State {
    protected name = HARDWARE_TYPES.PSU;
    private psuExcludes: { [key: string]: string[] } = {
        '4060': ['350W', '400W'],
        '7600': ['350W', '400W'],
        '4070': ['350W', '400W', '500W', '550W'],
        '7700': ['350W', '400W', '500W', '550W'],
        '7800': ['350W', '400W', '500W', '550W', '600W', '650W'],
        '7900': [
            '350W',
            '400W',
            '500W',
            '550W',
            '600W',
            '650W',
            '800W',
            '850W',
        ],
    };

    public filter(hardwareList: Hardware[]): void {
        const desktopGpu = this.order.getDesktop().getGpu();
        let filteredHardware: Hardware[] = hardwareList.filter(
            (hardware) => hardware.type === HARDWARE_TYPES.PSU,
        );

        if (desktopGpu) {
            const gpuVersion = Object.keys(this.psuExcludes).find((gpu) =>
                desktopGpu.title.includes(gpu),
            );
            const excludes = gpuVersion ? this.psuExcludes[gpuVersion] : [];

            filteredHardware = filteredHardware.filter((item) => {
                return !excludes.some((exclude) =>
                    item.title.includes(exclude),
                );
            });
        }

        this.hardwareList = filteredHardware.map(
            (hardware) => new HardwareModel(hardware),
        );
    }

    public nextState(): void {
        this.order.setState(new CaseState(this.order));
    }

    public prevState(): void {
        this.order.setState(new StorageState(this.order));
    }
}
