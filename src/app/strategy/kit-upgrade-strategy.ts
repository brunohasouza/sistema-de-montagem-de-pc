import { Desktop } from '@/app/entities/desktop';
import { DesktopOrder } from '@/app/entities/desktop-order';
import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { HardwareModel } from '@/app/entities/hardware-model';
import { DISCOUNTS } from '@/app/entities/discounts';
import { Strategy } from './strategy';

export class KitUpgradeStrategy implements Strategy {
    name: DISCOUNTS = DISCOUNTS.CPU_MOTHERBOARD_RAM_10_OFF;

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

                if (
                    hardware.type === HARDWARE_TYPES.CPU ||
                    hardware.type === HARDWARE_TYPES.MOTHERBOARD ||
                    hardware.type === HARDWARE_TYPES.RAM
                ) {
                    rawHardware.price = hardware.price * 0.9; // 10% OFF
                }

                discountDesktop.addHardware(new HardwareModel(rawHardware));
            }
        });

        return discountDesktop;
    }
}
