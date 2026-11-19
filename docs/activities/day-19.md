# Day 19 · Hello, Arduino!

![An Arduino-style board blinking an LED](../images/experiments/day-19.svg){ .activity-illustration }

**Field:** Technology · Programming · Electronics  
**Time:** 20–30 minutes (Saturday 19 December 2026)  
**Age group:** 6–9  
**Progression:** Days 17–18 introduced an LED circuit and a switch. Today we use an Arduino and a short program to blink its built-in light. Tomorrow, we will make a button control a light. Keep the saved LED parts for the final invention.

## Introduction

Can a computer board follow instructions to make a light blink? Connect the Arduino to a computer and upload a short program. The board's built-in LED will turn on and off in a repeating pattern.

By the end of this mission, the child can:

- Recognize that a program is a set of instructions for a computer.
- Upload a program that turns a light on and off.
- Change a time value and observe how the blink pattern changes.

**The big question:** How does the Arduino know when to turn its light on and off?

## Shopping list

The Arduino is already available. Reuse its compatible USB data cable.

| Item | Amount needed | Notes |
| --- | --- | --- |
| USB data cable | 1 | Reuse a data-capable cable compatible with the supplied Arduino. |
| Printed Day 19 mission card | 1 folded card | Ordinary paper is fine. |

**Household items supplied separately:** Arduino, computer with the Arduino IDE installed, and a clear, dry table. Use the built-in LED; no external wiring or battery pack is needed.

## What's inside the box?

- [ ] **One USB data cable** compatible with the supplied Arduino.
- [ ] **One folded Day 19 mission card** (below).

**Packing:** Coil the cable loosely and place it with the folded mission card. The Arduino and computer stay outside the box. The saved Day 17–18 circuit parts are not needed today; keep them together for later activities.

## Child's mission card

<div class="mission-card" markdown="1">
<div class="mission-card__translation" lang="en" data-language-label="English" markdown="1">

!!! example "🤖 DAY 19 — HELLO, ARDUINO!"
    **Your mission:** Teach an Arduino to blink its little light!

    **You need:** An Arduino, the USB cable in your box, a computer and a grown-up.

    **1. Predict!** What do you think the board will do when it receives a program?

    **2. Connect!** Ask your grown-up to connect the Arduino to the computer and open the blink program.

    **3. Upload!** Your grown-up will choose the Arduino board and upload the program. Watch the built-in light blink!

    **4. Change!** Find the number that controls the waiting time. Try a bigger or smaller number, then upload again.

    ⭐ **Scientist's question:** What instruction makes the light turn on? What makes it turn off?

</div>

<div class="mission-card__translation" lang="sv" data-language-label="Svenska" markdown="1">

!!! example "🤖 DAG 19 — HEJ, ARDUINO!"
    **Ditt uppdrag:** Lär en Arduino att blinka med sin lilla lampa!

    **Du behöver:** En Arduino, USB-sladden i lådan, en dator och en vuxen.

    **1. Gissa!** Vad tror du att kortet gör när det får ett program?

    **2. Anslut!** Be en vuxen ansluta Arduino-kortet till datorn och öppna blinkprogrammet.

    **3. Ladda upp!** Den vuxna väljer Arduino-kortet och laddar upp programmet. Titta när den inbyggda lampan blinkar!

    **4. Ändra!** Hitta talet som bestämmer väntetiden. Prova ett större eller mindre tal och ladda upp igen.

    ⭐ **Forskarens fråga:** Vilken instruktion tänder lampan? Vilken släcker den?

</div>
</div>

## Adult instructions

### Preparation (before the activity)

1. Install the Arduino IDE and check that the USB cable supports data, not just charging. Open the IDE before the session if setup time is limited.
2. Set out the Arduino and the USB cable from the box on a dry, uncluttered table. Do not connect any external circuit or battery pack today.
3. Pack the USB data cable and folded mission card. The existing Arduino is a household item and is excluded from the per-activity budget.

### How to help (20–30 minutes total)

| Time | What to do |
| --- | --- |
| 0–4 min | Explain that a program is a list of instructions. Find the small built-in LED marked **L** on most Arduino boards. |
| 4–9 min | Connect the Arduino to the computer with USB. In the Arduino IDE, select the Arduino board and the correct port. |
| 9–16 min | Open or enter the sketch below. Read the instructions together: set the LED pin as an output, turn it on, wait, turn it off, wait. |
| 16–22 min | Upload the sketch and observe the built-in LED. If it does not blink, check the board/port selection and upload status. |
| 22–30 min | Change both `delay(500)` values to `delay(150)` or `delay(1000)`, upload again and compare the speed. |

```cpp
const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(500);
  digitalWrite(ledPin, LOW);
  delay(500);
}
```

**Keep it a fair comparison:** Change only the delay number between uploads. The board and program structure stay the same.

### Safety

- An adult should connect the USB cable, select the board and port, and supervise computer use.
- Use only the computer's USB connection to power the Arduino. Do not connect the project to mains electricity, a wall adapter or the AA battery holder.
- Keep drinks and wet materials away from the board. Disconnect USB before moving or packing it.
- The board and USB cable are not toys; keep them away from younger children and pets.

### Why it works

The Arduino runs the instructions inside `loop()` again and again. `digitalWrite` sets the built-in LED pin to `HIGH` (on) or `LOW` (off). `delay(500)` pauses for 500 milliseconds, or half a second, before the next instruction.

Because the board repeats the loop, the light blinks continuously. A smaller delay makes each part of the pattern shorter; a larger delay makes the blink slower. The pin name `LED_BUILTIN` helps the same sketch work on Arduino boards that label the built-in LED differently.

### Troubleshooting and optional extension

- **The IDE cannot find the board:** Check the USB cable, select the Arduino model and choose the port that appears when the board is connected. Some USB cables only charge.
- **Upload fails:** Check the selected board and port, close any other program using the port, then try again.
- **The LED does not blink after upload:** Look for the small **L** LED near the USB connector; some Arduino-compatible boards label it differently. Upload the sketch again and check for a success message.
- **Extra challenge for older children:** Replace both delay values with different numbers. Predict the pattern before uploading and explain the result.

**Next experiment:** On [Day 20](day-20.md), a button will control a light using an input and an output.

[← Back to the calendar](../index.md) · [← Day 18: Invent a Switch](day-18.md)