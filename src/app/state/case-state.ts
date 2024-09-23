import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { State } from './state';
import { Hardware } from '@/app/entities/hardware';
import { HardwareModel } from '@/app/entities/hardware-model';
import { PsuState } from './psu-state';

export class CaseState extends State {
    protected name = HARDWARE_TYPES.CASE;

    public filter(hardwareList: Hardware[]): void {
        this.hardwareList = hardwareList
            .filter((hardware) => hardware.type === HARDWARE_TYPES.CASE)
            .map((hardware) => new HardwareModel(hardware));
    }

    public nextState(): void {
        console.log('CaseState: No next state');
    }

    public prevState(): void {
        this.order.setState(new PsuState(this.order));
    }
}
