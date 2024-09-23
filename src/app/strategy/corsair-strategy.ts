import { Desktop } from '@/app/entities/desktop';
import { DesktopOrder } from '@/app/entities/desktop-order';
import { HardwareModel } from '@/app/entities/hardware-model';
import { MANUFACTURERS } from '@/app/entities/manufacurers';
import { DISCOUNTS } from '@/app/entities/discounts';
import { Strategy } from './strategy';

export class CorsairStrategy implements Strategy {
    name: DISCOUNTS = DISCOUNTS.CORSAIR_10_OFF;

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

                if (hardware.manufacturer === MANUFACTURERS.CORSAIR) {
                    rawHardware.price = hardware.price * 0.9; // 10% OFF
                }

                discountDesktop.addHardware(new HardwareModel(rawHardware));
            }
        });

        return discountDesktop;
    }
}
