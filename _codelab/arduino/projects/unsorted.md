---
title: Всяко разно
description: Всяко разно
categories:
- arduino
- projects
layout: default

---
# Всё подряд

::: warning
Это заготовка страницы
:::

::: danger
Тут такая ебанина содержится, что пиздец
:::

## P1 {#p1}

RGB Led заменяет ленту, потенциометр - микрофон

Орём в микрофон и получаем разный цвет на "ленте"
![0](https://orpi.borland.ml/codelab/images/0bfe7af5-e8f4-4818-9682-2b7ad9f05f4a.png)

```c
#define pinR 12
#define pinG 11
#define pinB 10
#define pinMicro A0
#define pinButton 7
 
int micro;
bool button, button_flag;
int colorMode = 0;
 
void setup(){
  Serial.begin(9600);
  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinB, OUTPUT);
  
  pinMode(pinMicro, INPUT);
  pinMode(pinButton, INPUT_PULLUP);
  
  Serial.println("Start.");
}
 
void loop(){
  micro = analogRead(pinMicro) * 5.0 / 1024.0 * 1000.0;
  Serial.println(micro);
  
  
  button = !digitalRead(pinButton);
  if(button && !button_flag){
    button_flag = 1;
    
    colorMode++;
    if(colorMode > 2) colorMode = 0;
    
    Serial.print("Mode: ");
    Serial.println(colorMode);
  }
  else if(!button && button_flag){
    button_flag = 0;
  }
  //if(colorMode == 0) ledmagic(0);
  //if(colorMode == 1) ledmagic(random(1, 7));
    /*if(micro > 0) ledmagic(random(1, 7));
    else ledmagic(0);*/
    
  if(colorMode == 0){
    if(micro <= 0) ledmagic(0);
    else if(micro <= 60) ledmagic(1);
    else if(micro <= 70) ledmagic(2);
    else if(micro <= 80) ledmagic(3);
    else if(micro <= 200) ledmagic(4);
    else if(micro <= 400) ledmagic(3);
    else if(micro <= 800) ledmagic(2);
    else if(micro <= 1600) ledmagic(1);
    else if(micro <= 3000) ledmagic(1);
  }
 
// delay(500);
}
 
void ledmagic(int p){
  switch(p){
    case 1: rgb(0, 0, 1); break;//blue
    case 2: rgb(0, 1, 0); break;//green
    case 3: rgb(1, 0, 0); break;//red
    case 4: rgb(0, 1, 1); break;//l blue
    case 5: rgb(1, 0, 1); break;//pink
    case 6: rgb(1, 1, 0); break;//yellow
    case 7: rgb(1, 1, 1); break;//white
    default: rgb(0, 0, 0); break;//off
  }
}
 
void rgb(bool r, bool g, bool b){
  digitalWrite(pinR, r);
  digitalWrite(pinG, g);
  digitalWrite(pinB, b);
}
```

## StupidHome

```c
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <EtherCard.h>
//
#define jX A0
#define jY A1
#define jSW 13
//
LiquidCrystal_I2C lcd(0x27, 16, 2);
//Setup lan module
// MAC Address должен быть уникальным в вашей сети. Можно менять.

static byte mymac[] = {

0x5A,0x5A,0x5A,0x5A,0x5A,0x5A };

// ip статический / постоянный Address нашей Web страницы.

static byte myip[] = {

192,168,1,222 };

// Буфер, чем больше данных на Web странице, тем больше понадобится значения буфера.

byte Ethernet::buffer[900];

BufferFiller bfill;

// Массив задействованных номеров Pins Arduino, для управления например 8 реле.

int LedPins[] = {

2,3,4,5,6,7,8,9};

// Массив для фиксации изменений.

boolean PinStatus[] = {

1,2,3,4,5,6,7,8};
//
const char http_OK[] PROGMEM = 
"HTTP/1.0 200 OK\r\n"
"Content-Type: text/html\r\n"
"Pragma: no-cache\r\n\r\n";

const char http_Found[] PROGMEM =
"HTTP/1.0 302 Found\r\n"
"Location: /\r\n\r\n";

const char http_Unauthorized[] PROGMEM =
"HTTP/1.0 401 Unauthorized\r\n"
"Content-Type: text/html\r\n\r\n"
"<h1>401 Unauthorized</h1>";

void homePage(){

bfill.emit_p(PSTR("$F"
"<meta charset=\"utf-8\">"
"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
"<title>StupidRoom</title>"
"<style>*{font-size:32px}</style>"


"ArduinoPIN 1: <a href=\"?ArduinoPIN1=$F\">$F</a><br />"

"ArduinoPIN 2: <a href=\"?ArduinoPIN2=$F\">$F</a><br />"

"ArduinoPIN 3: <a href=\"?ArduinoPIN3=$F\">$F</a><br />"

"ArduinoPIN 4: <a href=\"?ArduinoPIN4=$F\">$F</a><br />"

"ArduinoPIN 5: <a href=\"?ArduinoPIN5=$F\">$F</a><br />"

"ArduinoPIN 6: <a href=\"?ArduinoPIN6=$F\">$F</a><br />"

"ArduinoPIN 7: <a href=\"?ArduinoPIN7=$F\">$F</a><br />"

"ArduinoPIN 8: <a href=\"?ArduinoPIN8=$F\">$F</a>"),

http_OK,

PinStatus[1]?PSTR("off"):PSTR("on"),

PinStatus[1]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"),

PinStatus[2]?PSTR("off"):PSTR("on"),

PinStatus[2]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"),

PinStatus[3]?PSTR("off"):PSTR("on"),

PinStatus[3]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"),

PinStatus[4]?PSTR("off"):PSTR("on"),

PinStatus[4]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"),

PinStatus[5]?PSTR("off"):PSTR("on"),

PinStatus[5]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"),

PinStatus[6]?PSTR("off"):PSTR("on"),

PinStatus[6]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"),

PinStatus[7]?PSTR("off"):PSTR("on"),

PinStatus[7]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"),

PinStatus[8]?PSTR("off"):PSTR("on"),

PinStatus[8]?PSTR("<font color=\"green\"><b>ON</b></font>"):PSTR("<font color=\"red\">OFF</font>"));

}


void setup(){
  Serial.begin(9600);
  
  pinMode(jX, INPUT);
  pinMode(jY, INPUT);
  pinMode(jSW, INPUT_PULLUP);
  //
  lcd.begin();
  lcd.backlight();

  lcd.setCursor(3, 0);
  lcd.print("Welcome to");
  lcd.setCursor(3, 1);
  lcd.print("StupidRoom");


  //lan
  // По умолчанию в Библиотеке "ethercard" (CS-pin) = № 8.

// if (ether.begin(sizeof Ethernet::buffer, mymac) == 0).

// and change it to: Меняем (CS-pin) на 10.

// if (ether.begin(sizeof Ethernet::buffer, mymac, 10) == 0).

if (ether.begin(sizeof Ethernet::buffer, mymac,53) == 0);

if (!ether.dhcpSetup());

// Выводим в Serial монитор IP адрес который нам автоматический присвоил наш Router.

// Динамический IP адрес, это не удобно, периодический наш IP адрес будет меняться.

// Нам придётся каждый раз узнавать кой адрес у нашей страницы.

ether.printIp("My Router IP: ", ether.myip); // Выводим в Serial монитор IP адрес который нам присвоил Router.

// Здесь мы подменяем наш динамический IP на статический / постоянный IP Address нашей Web страницы.

// Теперь не важно какой IP адрес присвоит нам Router, автоматический будем менять его, например на "192.168.1.222".

ether.staticSetup(myip);

ether.printIp("My SET IP: ", ether.myip); // Выводим в Serial монитор статический IP адрес.

//-----

for(int i = 0; i <= 8; i++)

{

pinMode(LedPins[i],OUTPUT);

PinStatus[i]=false;

}

  
}

//
bool jFlag = false;
int counter = 0;
//

void loop(){
  int _jX = analogRead(jX);
  int _jY = analogRead(jY);
  //Serial.print("jX: ");
  //Serial.println(_jX);
  //Serial.println(_jY);
  
  if(_jX >= 600 && jFlag == false){
    jFlag = true;
    counter++;
    
    lcd.print("Menu:");
    lcd.setCursor(6, 0);
    lcd.print(counter);
  }
  
  if(_jX > 350 && _jX < 550){
    jFlag = false;
    //Serial.println(jFlag);
  }
  
  if(_jX <= 300 && jFlag == false){
    jFlag = true;
    counter--;
    
    lcd.print("Menu:");
    lcd.setCursor(6, 0);
    lcd.print(counter);
  }

  delay(1);




  //lan

  word len = ether.packetReceive(); // check for ethernet packet / проверить ethernet пакеты.

word pos = ether.packetLoop(len); // check for tcp packet / проверить TCP пакеты.

if (pos) {

bfill = ether.tcpOffset();

char *data = (char *) Ethernet::buffer + pos;

if (strncmp("GET /", data, 5) != 0) {

bfill.emit_p(http_Unauthorized);

}

else {

data += 5;

if (data[0] == ' ') {

homePage(); // Return home page Если обнаружено изменения на станице, запускаем функцию.

for (int i = 0; i <= 7; i++)digitalWrite(LedPins[i],PinStatus[i+1]);

}

// "16" = количество символов "?ArduinoPIN1=on ".

else if (strncmp("?ArduinoPIN1=on ", data, 16) == 0) {

PinStatus[1] = true;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN2=on ", data, 16) == 0) {

PinStatus[2] = true;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN3=on ", data, 16) == 0) {

PinStatus[3] = true;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN4=on ", data, 16) == 0) {

PinStatus[4] = true;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN5=on ", data, 16) == 0) {

PinStatus[5] = true;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN6=on ", data, 16) == 0) {

PinStatus[6] = true;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN7=on ", data, 16) == 0) {

PinStatus[7] = true;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN8=on ", data, 16) == 0) {

PinStatus[8] = true;

bfill.emit_p(http_Found);

}

//------------------------------------------------------

else if (strncmp("?ArduinoPIN1=off ", data, 17) == 0) {

PinStatus[1] = false;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN2=off ", data, 17) == 0) {

PinStatus[2] = false;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN3=off ", data, 17) == 0) {

PinStatus[3] = false;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN4=off ", data, 17) == 0) {

PinStatus[4] = false;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN5=off ", data, 17) == 0) {

PinStatus[5] = false;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN6=off ", data, 17) == 0) {

PinStatus[6] = false;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN7=off ", data, 17) == 0) {

PinStatus[7] = false;

bfill.emit_p(http_Found);

}

else if (strncmp("?ArduinoPIN8=off ", data, 17) == 0) {

PinStatus[8] = false;

bfill.emit_p(http_Found);

}


else if(strncmp("?text=", data, 6) == 0){
  String _data = data;
  _data = _data.substring(6, _data.indexOf(" ", 6));
  Serial.println(_data);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(_data);
  bfill.emit_p(http_Found);
}

//---------------------------

else {

// Page not found

bfill.emit_p(http_Unauthorized);

}

}

ether.httpServerReply(bfill.position()); // send http response

}

}
```
