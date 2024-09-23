import { Desktop } from '@/app/entities/desktop';
import { DesktopOrder } from '@/app/entities/desktop-order';
import { HardwareModel } from '@/app/entities/hardware-model';
import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { MANUFACTURERS } from '@/app/entities/manufacurers';
import { DISCOUNTS } from '@/app/entities/discounts';
import { Strategy } from './strategy';

export class AmdStrategy implements Strategy {
    public name = DISCOUNTS.CPU_GPU_AMD_20_OFF;

    calculate(order: DesktopOrder): Desktop {
        const desktop = order.getDesktop();
        const discountDesktop = new Desktop();

        desktop.toList().forEach((hardware) => {
            if (hardware !== undefined) {
                const rawHardware = {
                    type: hardware.type,
                    title: hardware.title,
                    id: hardware.id,
                    image: hardware.image,
                    manufacturer: hardware.manufacturer,
                    price: hardware.price,
                };

                const isCpu =
                    hardware.type === HARDWARE_TYPES.CPU &&
                    hardware.manufacturer === MANUFACTURERS.AMD;

                const isGpu =
                    hardware.type === HARDWARE_TYPES.GPU &&
                    hardware.title.includes(MANUFACTURERS.AMD);

                if (isCpu || isGpu) {
                    rawHardware.price = hardware.price * 0.8; // 20% OFF
                }

                discountDesktop.addHardware(new HardwareModel(rawHardware));
            }
        });

        return discountDesktop;
    }
}
