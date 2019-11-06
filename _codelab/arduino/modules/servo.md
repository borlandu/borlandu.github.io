---
title: 'Servo'
description: 'Сервопривод — это привод с управлением через отрицательную обратную связь, позволяющую точно управлять параметрами движения'
categories: ['arduino', 'modules']
layout: default
nav:
  level_1:
    - title: 'Подключение'
      url: '#podklyuchenie'
      level_2:
        - title: 'subtitle'
          url: '#h2'
    - title: 'Использование'
      url: '#ispolzovanie'
    - title: 'Проекты'
      url: '#proekty'
---

# servo

::: warning
Это заготовка страницы
:::


Описать что может библиотека Servo.h - т.е. какие функции и т.д.



## Подключение {#podklyuchenie}

| SERVO  | ARDUINO |
| :----: | :-----: |
| SIGNAL | D9~     |
| VCC    | 5V      |
| GND    | GND     |

[![Схема подключения сервопривода к arduino](https://orpi.borland.ml/codelab/images/e8291e7e-87ed-4001-8254-39d8eb7048cf.png "Схема подключения сервопривода к arduino")](https://orpi.borland.ml/codelab/images/e8291e7e-87ed-4001-8254-39d8eb7048cf.png)
## Использование {#ispolzovanie}
Пример поворачивает серву на 90градусов

```c
#include <Servo.h>
Servo myservo;

void setup(){
  Serial.begin(9600);
  myservo.attach(9);
}

int s = 90;

void loop(){
  if(Serial.available() > 0){
    s = Serial.parseInt();
  }
  myservo.write(s);

  Serial.println(myservo.read());
}
```

## Проекты {#proekty}
