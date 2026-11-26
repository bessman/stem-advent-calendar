# Day 24 · The Grand Christmas Invention

![A cardboard Christmas signal station with a button and two glowing LEDs](../images/experiments/day-24.svg){ .activity-illustration }

**Field:** Engineering · Programming · Electronics  
**Time:** 40–60 minutes (Thursday 24 December 2026)  
**Age group:** 6–9  
**Progression:** On [Day 22](day-22.md), we practised Morse code with light. Today we combine the circuit, button and programming skills from Days 17–20 to build a Christmas Signal Station that flashes a name. We will plan, prototype and test the display as one final mission.

## Introduction

Can you build an invention that sends a message when someone presses a button? Plan a simple cardboard display, connect two LEDs and a button to an Arduino, then upload a program that flashes a name in Morse code.

By the end of this mission, the child can:

- Plan and build a simple cardboard display around a working circuit.
- Combine a button input, a program and LED outputs.
- Explain how short and long flashes encode a message.

**The big question:** How do the button, program and lights work together to send a message?

## Materials list

Reuse the Arduino and most circuit parts from Days 17–20.

| Item | Amount needed | Notes |
| --- | --- | --- |
| Green or other colour 5 mm LED | 1 | New second signal light. |
| 220-ohm resistor | 1 additional | New; connect in series with the second LED. |
| Thin cardboard | 1 panel, about 10 × 15 cm | Use clean, uncoated packaging. |
| Red 5 mm LED | 1 | Reuse the LED from Day 17, keeping its resistor connected in series. |
| 220-ohm resistor | 1 | Reuse the resistor from Day 17 for the red LED. |
| Breadboard-compatible momentary pushbutton | 1 | Reuse the pushbutton from Day 20. |
| Mini solderless breadboard | 1 | Reuse the breadboard from Day 20. |
| Male-to-male jumper wire | 5 | Reuse the wires from Day 20. |
| Arduino board | 1 | Reuse the board from Days 19–20. Do not use an external battery pack. |
| USB data cable | 1 | Reuse the cable from Day 19. |
| Computer with Arduino IDE installed | 1 | Reuse the computer from Day 19. |
| Adhesive tape | A small amount | Child-safe tape for the cardboard display. |

## What's inside the box?

- [ ] **One second LED** in a different colour.
- [ ] **One additional 220-ohm resistor.**
- [ ] **One folded Day 24 mission card.**

**Reuse from earlier days:** Red LED and resistor from Day 17; Arduino, USB cable and computer from Day 19; button, breadboard and jumper wires from Day 20.

**Household items to supply separately:** Cardboard, adhesive tape and scissors.

## Child's mission card

<div class="mission-card" markdown="1">
<div class="mission-card__translation" lang="en" data-language-label="English" markdown="1">

!!! example "🎄 DAY 24 — THE GRAND CHRISTMAS INVENTION"
    **Your mission:** Build a station that flashes a name!

    **You need:** Arduino, button, breadboard, two LEDs, resistors and cardboard.

    **1. Plan!** Sketch a display with two lights and an easy-to-reach button.

    **2. Build!** Make the cardboard front. Keep the Arduino and wires uncovered.

    **3. Connect!** With USB unplugged, connect the button and LEDs as shown by your adult.

    **4. Program and test!** Upload the name code, press the button and improve your display.

    ⭐ **Inventor's question:** How do the flashes spell a name?

</div>

<div class="mission-card__translation" lang="sv" data-language-label="Svenska" markdown="1">

!!! example "🎄 DAG 24 — DEN STORA JULUPPFINNINGEN"
    **Ditt uppdrag:** Bygg en station som blinkar ett namn!

    **Du behöver:** Arduino, knapp, kopplingsplatta, två LED-lampor, motstånd och kartong.

    **1. Planera!** Rita en display med två lampor och en knapp som är lätt att nå.

    **2. Bygg!** Gör en framsida av kartong. Täck inte över Arduino eller sladdar.

    **3. Koppla!** Koppla ur USB. Anslut knappen och lamporna med hjälp av en vuxen.

    **4. Programmera och testa!** Ladda upp namnprogrammet, tryck på knappen och förbättra displayen.

    ⭐ **Uppfinnarens fråga:** Hur stavar blinkningarna ett namn?

</div>
</div>

## Setup notes

### Preparation (5–10 minutes before the activity)

1. Bring out the Arduino, USB data cable, computer, breadboard and pushbutton from Days 19–20, plus the red LED/resistor assembly from Day 17. Keep the AA battery holder disconnected and out of the Arduino circuit.
2. With the Arduino unplugged, prepare the circuit: connect GND to the breadboard ground rail; connect the pushbutton across the centre gap between digital pin 2 and GND; connect each LED through its own **220-ohm resistor** to pins 8 and 9, with both short legs to GND.
3. Set `NAME` in the program below to the child's name using ASCII letters A–Z. Test the circuit before the child begins. Keep all electronics uncovered and accessible.
4. Set out a cardboard panel, tape, pencil and scissors. The child can plan the display around the pre-tested circuit.

### How to help (40–60 minutes total)

| Time | What to do |
| --- | --- |
| 0–5 min | Recall the Day 22 Morse activity. Sketch a display with two light openings, a reachable button and a clear message target. |
| 5–15 min | Make the cardboard front. Mark and cut openings for the LEDs; plan where the button can be reached. Keep electronics outside the cardboard. |
| 15–25 min | With USB disconnected, position the LEDs and button. An adult checks the circuit and every connection before power is applied. |
| 25–35 min | Connect USB and upload the prepared program. Press the button to flash the name; decode it with the Day 22 Morse key. |
| 35–50 min | Test the display from the viewer's position. Adjust the openings, button access or timing if needed. |
| 50–60 min | Disconnect USB, collect loose parts and celebrate the finished signal station. |

```cpp
const int buttonPin = 2;
const int firstLedPin = 8;
const int secondLedPin = 9;
const int dotTime = 200;

const char *morseTable[] = {
  ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---",
  "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-",
  "..-", "...-", ".--", "-..-", "-.--", "--.."
};

const char *NAME = "";

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(firstLedPin, OUTPUT);
  pinMode(secondLedPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    sendName();
    while (digitalRead(buttonPin) == LOW) {
    }
    delay(50);
  }
}

void flashSignal(int onTime) {
  digitalWrite(firstLedPin, HIGH);
  digitalWrite(secondLedPin, HIGH);
  delay(onTime);
  digitalWrite(firstLedPin, LOW);
  digitalWrite(secondLedPin, LOW);
  delay(dotTime);
}

void sendMorseLetter(const char *code) {
  for (int symbolIndex = 0; code[symbolIndex] != '\0'; symbolIndex++) {
    flashSignal(code[symbolIndex] == '.' ? dotTime : dotTime * 3);
  }
}

void sendName() {
  int letterIndex = 0;
  char letter;
  while ((letter = NAME[letterIndex++]) != '\0') {
    if (letter >= 'a' && letter <= 'z') letter -= 'a' - 'A';
    if (letter < 'A' || letter > 'Z') continue;
    sendMorseLetter(morseTable[letter - 'A']);
    delay(dotTime * 2);
  }
  delay(dotTime * 6);
}
```

**Keep it a fair test:** Test the circuit before mounting the LEDs in the display. Change one connection or design feature at a time, with USB unplugged before wiring changes.

### Safety

- With USB disconnected, check all wiring before connecting. Use only the Arduino's USB connection; do not connect an AA holder, mains electricity or an external power supply.
- Every external LED must have its own **220-ohm resistor in series**. Never connect an LED directly between an Arduino pin and GND.
- Keep drinks and wet materials away from the computer, board and breadboard. Disconnect USB before moving wires or changing the circuit.
- Do not cover or enclose the Arduino, breadboard or USB connection in cardboard.
- Cut cardboard openings with child-safe scissors and adult supervision. Keep lights pointed toward a nearby wall or viewer, never into eyes or toward roads.

### Why it works

The pushbutton is an input connected to pin 2. With `INPUT_PULLUP`, the input reads `HIGH` when the button is open and `LOW` when the button connects the pin to GND. When the program detects `LOW`, it calls `sendName()`.

The LEDs are outputs on pins 8 and 9. The program turns them on together for a short duration (a dot) or a longer duration (a dash), with pauses between flashes and letters. The resistors limit current through the LEDs. The cardboard display holds the lights, while the Arduino and breadboard remain open and accessible.

### Troubleshooting and optional extension

- **Neither LED lights:** Disconnect USB. Check GND, button wiring, LED polarity and pin numbers. Confirm each LED has its own 220-ohm resistor in series.
- **One LED stays off:** With USB disconnected, check that its short leg reaches GND and its resistor connects toward the correct output pin.
- **The message repeats while the button is held:** Check that the button is between pin 2 and GND and that the code waits for release.
- **The button does not start the message:** Check the pin 2 and GND connections and confirm the code uses `INPUT_PULLUP` and tests for `LOW`.
- **Extra challenge for older children:** Change `NAME` to another word using the Day 22 Morse key. Predict the light pattern first.

**Next experiment:** The calendar's final invention is complete. Keep the station as a reminder that small observations and ideas can grow into something you build.

[← Back to the calendar](../index.md) · [← Day 23: The Skittles Rainbow Painting](day-23.md)
