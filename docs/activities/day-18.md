# Day 18 · The Blink-Pattern Button

![A push button and a glowing LED connected to an Arduino board](../images/experiments/day-18.svg){ .activity-illustration }

**Field:** Technology · Programming · Inputs and outputs  
**Time:** 10–15 minutes (Friday 18 December 2026)  
**Age group:** 6–9  
**Progression:** On [Day 17](day-17.md), a paperclip switch turned an LED on and off. Today the same LED is controlled by an Arduino, and a button tells the program to change to the next blink pattern. Tomorrow, we will switch from circuits to chemistry and grow a crystal tower.

## Introduction

What if a switch could do more than just on and off? Connect yesterday's LED and a pushbutton to an Arduino and upload a short program. Every press of the button makes the Arduino change to a new blink pattern: slow, fast, twinkle or lighthouse.

By the end of this mission, the child can:

- Identify a button as an input and an LED as an output.
- Recognize that a program is a set of instructions the Arduino repeats again and again.
- Change a number in the program and predict how the blink pattern changes.

**The big question:** How does the Arduino know which blink pattern to show next?

## Materials list

The Arduino is a reusable item that may already be available. Reuse the LED and resistor from Day 17.

| Item | Amount needed | Notes |
| --- | --- | --- |
| Arduino board | 1 | An Arduino Uno or compatible board with at least two GND pins. Not packed in the box. |
| USB data cable | 1 | Must support data, not only charging, and fit the Arduino. |
| Computer with Arduino IDE installed | 1 | For uploading the program. |
| Mini solderless breadboard | 1 | A small board is enough. |
| Breadboard-compatible momentary pushbutton | 1 | Normally open, four-leg tactile button. |
| Male-to-male jumper wire | 4 | Insulated wires; one extra is a useful spare. |
| Red 5 mm LED | 1 | Reuse the LED from Day 17, keeping its resistor connected in series. |
| 220-ohm resistor | 1 | Reuse the resistor from Day 17. Never connect the LED to the Arduino without it. |

## What's inside the box?

- [ ] **One mini solderless breadboard.**
- [ ] **One momentary pushbutton**, packed separately.
- [ ] **Four insulated jumper wires**, coiled loosely.
- [ ] **One folded Day 18 mission card** (below).

**Reuse from Day 17:** Red LED with its 220-ohm resistor. **Supply separately:** Arduino, USB data cable and computer.

## Child's mission card

<div class="mission-card" markdown="1">
<div class="mission-card__translation" lang="en" data-language-label="English" markdown="1">

!!! example "🔘 DAY 18 — THE BLINK-PATTERN BUTTON"
    **Your mission:** Program a button that changes how a light blinks!

    **You need:** Arduino, breadboard, button, wires, yesterday's LED and a computer.

    **1. Predict!** What will pressing the button tell the Arduino?

    **2. Connect!** USB unplugged. Button to pin 2 and GND. LED to pin 8 and GND.

    **3. Program!** Upload the code. Press the button again and again. How many patterns are there?

    **4. Invent!** Change one number in the code, upload and find your new pattern.

    ⭐ **Scientist's question:** How does the Arduino remember which pattern comes next?

</div>

<div class="mission-card__translation" lang="sv" data-language-label="Svenska" markdown="1">

!!! example "🔘 DAG 18 — BLINKKNAPPEN"
    **Ditt uppdrag:** Programmera en knapp som ändrar hur lampan blinkar!

    **Du behöver:** Arduino, kopplingsplatta, knapp, sladdar, gårdagens LED och en dator.

    **1. Gissa!** Vad berättar knapptrycket för Arduino?

    **2. Koppla!** USB urkopplad. Knappen till pinne 2 och GND. LED-lampan till pinne 8 och GND.

    **3. Programmera!** Ladda upp koden. Tryck på knappen flera gånger. Hur många mönster finns det?

    **4. Uppfinn!** Ändra ett tal i koden, ladda upp och hitta ditt nya mönster.

    ⭐ **Forskarens fråga:** Hur vet Arduino vilket mönster som kommer härnäst?

</div>
</div>

## Setup notes

### Preparation (before the activity)

1. Install the Arduino IDE ahead of time. Connect the Arduino, select the board and port, and test an upload of the sketch below so the session can focus on the circuit and the patterns.
2. Disconnect USB. Check that the Day 17 LED/resistor joint is still insulated and that the free resistor leg and LED short leg are straight enough to push into the breadboard.
3. Set out the Arduino, USB cable, computer, breadboard, button, jumper wires and LED on a dry, uncluttered table. Keep the AA battery holder away from today's circuit.

### Wiring (USB unplugged)

1. Push the button across the breadboard's **centre gap**.
2. Connect **pin 2** to one button leg and **GND** to the **diagonally opposite** leg. Diagonal legs are always on different sides of the switch, so the button only connects them when pressed.
3. Push the free **resistor leg** into one empty row and the LED's **short leg** into a different empty row. Nothing else may share those rows.
4. Connect **pin 8** to the resistor row and a second **GND** pin to the LED short-leg row.

**LED path:** Pin 8 → resistor → LED long leg → LED short leg → GND.

### How to help (10–15 minutes total)

| Time | What to do |
| --- | --- |
| 0–2 min | Recall Day 17: the paperclip opened and closed the loop. Today the Arduino will open and close the LED circuit, and the button gives it information. Ask which part is the input and which is the output. |
| 2–6 min | With USB unplugged, build the circuit following the wiring steps. An adult checks every connection before USB is connected. |
| 6–8 min | Connect USB and upload the sketch. The LED starts with a slow blink. |
| 8–11 min | Press the button again and again. Count the patterns and give each one a name. |
| 11–15 min | Change one number in `onTimes` or `offTimes`, upload and test the new pattern. Disconnect USB and store the parts. |

```cpp
const int buttonPin = 2;
const int ledPin = 8;

// Time on and time off (milliseconds) for each pattern.
const int onTimes[]  = {1000, 200, 100, 1500};
const int offTimes[] = {1000, 200, 900,  500};
const int patternCount = 4;

int pattern = 0;
bool ledOn = false;
bool wasPressed = false;
unsigned long lastChange = 0;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool pressed = digitalRead(buttonPin) == LOW;
  if (pressed != wasPressed) {
    if (pressed) {
      pattern = (pattern + 1) % patternCount;
      ledOn = false;
      lastChange = 0;
    }
    wasPressed = pressed;
    delay(50);
  }

  unsigned long waitTime = ledOn ? onTimes[pattern] : offTimes[pattern];
  if (millis() - lastChange >= waitTime) {
    ledOn = !ledOn;
    digitalWrite(ledPin, ledOn ? HIGH : LOW);
    lastChange = millis();
  }
}
```

**Patterns:** 1 = slow blink, 2 = fast blink, 3 = twinkle, 4 = lighthouse. After the fourth pattern, the next press starts again at the first.

**Keep it a fair comparison:** Change only one number between uploads, so you know which change made the difference. Keep every on and off time at **150 ms or more**.

### Safety

- Check all wiring with USB unplugged. Use only the Arduino's USB connection for power; do not connect the AA battery holder, a wall adapter or mains electricity.
- The LED must always have its **220-ohm resistor in series**. Never connect pin 8 or 5V directly to GND.
- Keep drinks and wet materials away from the board and computer. Disconnect USB before moving wires.
- Avoid very fast flashing: keep on and off times at 150 ms or longer, and stop if anyone finds the flashing uncomfortable.

### Why it works

The button is an **input**. `INPUT_PULLUP` uses a resistor inside the Arduino so that pin 2 reads `HIGH` when the button is up. Pressing the button connects pin 2 to GND, so it reads `LOW`.

The LED is an **output**. `digitalWrite` turns pin 8 on (`HIGH`) or off (`LOW`), doing the same job as the paperclip on Day 17, but thousands of times faster and following instructions.

The Arduino runs `loop()` over and over. Each time, it checks the button and the clock. The variable `pattern` is the Arduino's memory: it stores which pattern is active, and each new press adds one. The `%` sign makes the count wrap back to the first pattern after the last. The lists `onTimes` and `offTimes` hold how long the light stays on and off for each pattern. The short `delay(50)` ignores the tiny bounces a button makes when its metal contacts touch.

### Troubleshooting and optional extension

- **The LED never lights:** Unplug USB. Check that the long LED leg is joined to the resistor, the resistor is in the pin 8 row and the short leg is in the GND row.
- **The pattern never changes:** Check that the button straddles the centre gap and that the wires go to diagonally opposite legs.
- **The pattern changes by itself or skips:** A wire may be loose, or both button wires may be on the same internal side. Re-seat the button and use diagonal legs.
- **Upload fails:** Check the board and port selection and that the USB cable supports data.
- **Extra challenge for older children:** Add a fifth pattern: put a new number at the end of both lists and change `patternCount` to 5.

**Next experiment:** On [Day 19](day-19.md), we will turn a clear, cool liquid into a crystal tower in seconds.

[← Back to the calendar](../index.md) · [← Day 17: Light It, Switch It!](day-17.md)
