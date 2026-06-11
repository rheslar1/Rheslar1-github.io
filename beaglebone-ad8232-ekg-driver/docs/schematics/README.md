# AD8232 BeagleBone Schematics

This folder stores schematic evidence for the AD8232 Single-Lead Heart Rate Monitor connected to a BeagleBone Black ADC input.

## Files

- `ad8232-beaglebone-wiring.svg`: wiring schematic for AD8232 `OUT`, `GND`, `3.3V`, `LO+`, `LO-`, divider protection, and BeagleBone Black AIN/GPIO pins.
- `ad8232-beaglebone-wiring.png`: rendered screenshot of the SVG schematic for portfolio evidence.

## Electrical Boundary

- BeagleBone Black analog inputs are limited to 1.8 V.
- AD8232 breakout output can swing toward the 3.3 V supply.
- The schematic shows a 10 kOhm / 12 kOhm divider model with an approximate 1.8333 reconstruction ratio.
- Patient-connected testing requires isolation, reviewed electrodes, and medical-grade safety controls outside this portfolio scope.
