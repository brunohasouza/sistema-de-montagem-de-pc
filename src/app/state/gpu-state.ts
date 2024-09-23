import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { Hardware } from '@/app/entities/hardware';
import { HardwareModel } from '@/app/entities/hardware-model';
import { State } from './state';
import { RamState } from './ram-state';
import { StorageState } from './storage-state';

export class GpuState extends State {
    protected name = HARDWARE_TYPES.GPU;

    public filter(hardwareList: Hardware[]): void {
        this.hardwareList = hardwareList
            .filter((hardware) => hardware.type === HARDWARE_TYPES.GPU)
            .map((hardware) => new HardwareModel(hardware));
    }

    public nextState(): void {
        this.order.setState(new StorageState(this.order));
    }

    public prevState(): void {
        this.order.setState(new RamState(this.order));
    }
}
