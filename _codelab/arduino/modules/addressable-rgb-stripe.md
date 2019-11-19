---
categories:
- arduino
- modules
title: Addressable RGB stripe
layout: default
nav:
  level_1: []

---
# Адресная RGB лента

WS2812B

Описание...

## Подключение {#podklyuchenie}

![Схема подключения ленты](/uploads/rgbledstrip_bb.png "Схема подключения ленты")

GND - GND

DIn - D9

Питание подавать на ленту от отдельного блока (GND, +5V)

Земля общая на ленту и ардуинку

## Использование {#ispolzovanie}

Библиотека FastLED

```c++
    #include <FastLED.h>

    const uint8_t LED = 8;
    const uint8_t NUM_LEDS = 30;

    CRGB leds[NUM_LEDS];

    void setup() {
      Serial.begin(9600);
      FastLED.addLeds<WS2812B, LED, GRB>(leds, NUM_LEDS);
    }

    void loop() {
      for(int8_t i = 0; i < NUM_LEDS; i++){
        leds[i] = CRGB(0, 0, 255);
        FastLED.show();
        delay(50);
      }
      for(int8_t i = NUM_LEDS-1; i >= 0; i--){
        leds[i] = CRGB(255, 0, 255);
        FastLED.show();
        delay(50);
      }
    }
```

## Проекты {#proekty}