# Day 20 · The Magic Button

![A push button controlling a light on a small circuit board](../images/experiments/day-20.svg){ .activity-illustration }

**Field:** Technology · Programming · Inputs and outputs  
**Time:** 20–30 minutes (Sunday 20 December 2026)  
**Age group:** 6–9  
**Progression:** On [Day 19](day-19.md), we programmed an Arduino's built-in LED to blink. Today a pushbutton becomes an input that controls the light. Save the button, breadboard and jumper wires for the Christmas invention on Day 24.

## Introduction

How can an Arduino know that you pressed a button? Connect a pushbutton between an input pin and ground. The program checks the button and turns the built-in LED on while it is pressed.

By the end of this mission, the child can:

- Identify a button as an input and an LED as an output.
- Observe how a program responds to a changing input.
- Explain that the Arduino repeats the check in its program loop.

**The big question:** How does the Arduino know when the button is pressed?

## Shopping list

The Arduino Uno is already available. The pushbutton and breadboard will be reused on Day 24.

| Item | Amount needed | Notes |
| --- | --- | --- |
| Small solderless breadboard | 1 | A mini board is sufficient for the button. |
| Breadboard-compatible momentary pushbutton | 1 | Normally open, four-leg tactile button. |
| Insulated jumper wires | 5 | Male-to-male wires; use two today and save all five for Day 24. |
| Printed Day 20 mission card | 1 folded card | Ordinary paper is fine. |

**Household items supplied separately:** Arduino Uno, the USB data cable from Day 19, and a computer with the Arduino IDE. No external power supply, battery or LED is needed; use the Uno's built-in LED.

## What's inside the 7 × 7 × 7 cm box?

- [ ] **One small solderless breadboard.**
- [ ] **One momentary pushbutton**, packed separately.
- [ ] **Five insulated jumper wires**, coiled loosely.
- [ ] **One folded Day 20 mission card** (below).

**Packing:** A mini breadboard, button, five wires and folded card fit inside the box. Keep the Arduino Uno, USB cable and computer outside.

## Child's mission card

<div class="mission-card" markdown="1">
<div class="mission-card__translation" lang="en" data-language-label="English" markdown="1">

!!! example "🔘 DAY 20 — THE MAGIC BUTTON"
    **Your mission:** Make a button control an Arduino light!

    **You need:** An Arduino Uno, breadboard, button and jumper wires from your box, plus a computer and a grown-up.

    **1. Predict!** What will the light do when you press the button? What about when you let go?

    **2. Connect!** Ask your grown-up to put the button across the middle gap of the breadboard. Connect one side to pin 2 and the other to GND.

    **3. Program!** Upload the button program. Press and release the button. What does the built-in light do?

    **4. Discover!** Is the button an input or an output? Is the light an input or an output?

    ⭐ **Scientist's question:** What does the program check again and again?

</div>

<div class="mission-card__translation" lang="sv" data-language-label="Svenska" markdown="1">

!!! example "🔘 DAG 20 — DEN MAGISKA KNAPPEN"
    **Ditt uppdrag:** Låt en knapp styra en lampa på Arduino-kortet!

    **Du behöver:** En Arduino Uno, kopplingsplatta, knapp och sladdar från lådan samt en dator och en vuxen.

    **1. Gissa!** Vad gör lampan när du trycker på knappen? Vad händer när du släpper?

    **2. Koppla!** Be en vuxen sätta knappen över springan i mitten av kopplingsplattan. Anslut ena sidan till pinne 2 och den andra till GND.

    **3. Programmera!** Ladda upp knapp-programmet. Tryck och släpp knappen. Vad gör den inbyggda lampan?

    **4. Upptäck!** Är knappen en inmatning eller utmatning? Är lampan en inmatning eller utmatning?

    ⭐ **Forskarens fråga:** Vad kontrollerar programmet om och om igen?

</div>
</div>

## Adult instructions

### Preparation (before the activity)

1. Check that the Arduino IDE is installed and that the Uno from Day 19 can connect over USB.
2. Place the momentary pushbutton across the breadboard's centre gap. Connect one side of the button to **digital pin 2** and the other to **GND** with jumper wires. On a four-leg tactile button, the two legs on each side are internally connected; straddling the gap avoids connecting both wires to the same side.
3. Pack the button, mini breadboard, two jumper wires and folded card. The Arduino, computer and USB cable stay outside the box.

### How to help (20–30 minutes total)

| Time | What to do |
| --- | --- |
| 0–4 min | Recall that an input gives information to the Arduino and an output does something. Ask which role the button and light might have. |
| 4–8 min | With the Uno unplugged, place the button across the breadboard gap and connect it between pin 2 and GND. Check the wiring before connecting USB. |
| 8–15 min | Upload the sketch below. The built-in LED should turn on only while the button is held down. |
| 15–22 min | Let the child press and release the button. Ask what the program reads and how the output changes. |
| 22–30 min | Disconnect USB, then store the button, breadboard and jumper wires together for Day 24. |

```cpp
const int buttonPin = 2;
const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}
```

**Keep it a fair comparison:** Keep the wiring and program the same while testing. Pressing the button changes the input; the program changes the output in response.

### Safety

- An adult should check every connection while the Uno is unplugged. Use only the Uno's USB connection; no wall adapters, AA packs or mains electricity.
- Keep drinks and wet materials away from the board and computer. Disconnect USB before changing wires.
- Do not connect the 5V pin directly to GND. The button goes between pin 2 and GND as described.
- Keep small buttons and wires away from mouths, younger children and pets.

### Why it works

The button is an **input**: it changes the electrical signal the Arduino reads on pin 2. `INPUT_PULLUP` uses a small internal pull-up resistor, so the unpressed pin reads `HIGH`. Pressing the button connects pin 2 to ground, so it reads `LOW`.

The `if` statement checks that reading each time `loop()` repeats. When the reading is `LOW`, the program sets the built-in LED output to `HIGH`; otherwise it sets it to `LOW`. The button is active-low, so a pressed button reads LOW.

### Troubleshooting and optional extension

- **The light stays on or never changes:** Check that the button straddles the breadboard gap and that its wires go to pin 2 and GND, not two legs on the same side.
- **The IDE reports an upload error:** Check the selected Uno board and port, as on Day 19.
- **The light flickers when pressed:** Make sure the button is seated firmly. Some buttons may bounce briefly; the activity is to explore the input, not to count individual presses.
- **Extra challenge for older children:** Change the program so the light is on when the button is not pressed. Ask what condition must change.

**Next experiment:** On [Day 21](day-21.md), we will revisit the cress seeds and compare their growth with the prediction from Day 14.

[← Back to the calendar](../index.md) · [← Day 19: Hello, Arduino!](day-19.md)