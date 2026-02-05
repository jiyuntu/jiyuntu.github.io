---
title: "Connect Merriam Webster to Anki"
date: "2026-02-04"
---

# Connect Merriam Webster to Anki

Code: https://github.com/jiyuntu/MW-flashcards

<video controls style="max-width:100%;height:auto;" src="/connect-merriam-webster-to-anki-demo.mov">Your browser does not support the video tag.</video>

## Motivation
I used to look up English words I didn’t understand on Google Translate. The problem with this approach was that I wouldn’t memorize the word. In fact, it turned out that I repeatedly searched for the same words. This was not efficient nor effective, so I decided that the vocabularies had to go to [Anki](https://apps.ankiweb.net/), the most powerful flashcard I’d ever used, for me to review them. However, it is a tedious process to manually look up words and enter them into Anki. So why not automate it?

## Design
The program aims to streamline two processes: (1) Look up a word (2) Add the word and its definition to Anki.

For (1), I could think of two approaches. One is to continue using Google Translate, the other is to consult a proper dictionary. I prefer the latter because I prefer an elaboration instead of a translation. As Merriam-Webster is a well-known online dictionary and it provides well-documented APIs, I decided to query it for the definitions.

### Merriam Webster API
There are multiple product [entries](https://dictionaryapi.com/products/index) for various dictionaries on MW, such as Collegiate Dictionary and Learner’s Dictionary. I would start with the Collegiate Dictionary. Example [request url](https://dictionaryapi.com/products/api-collegiate-dictionary) and [sound track requests](https://dictionaryapi.com/products/json#sec-2.prs) can be found on their [developer center](https://dictionaryapi.com/).

### Parsing Merriam Webster Response
I thought about using existing libraries to parse MW response such as:

- [merriam-webster-api](https://github.com/pfeyz/merriam-webster-api/tree/master): These are Python scripts to call Merriam-Webster APIs. The problems with this API are that it was written years ago and it reads xml. MW has switched to json response years ago and XML is a legacy, and I’m not a big fan of legacy in terms of coding. Unlike json, with XML, the definition is not sorted according to frequency. Also, some of the code was written in Python2 which is not supported now.

I didn’t find another Python script which I would prefer, so I decided to implement a parser by myself (and AI).

Sometimes there would be multiple entries for a single word in the dictionary, so does online MW. For example, “bike” has one entry for being a noun and another entry for being a verb. To simplify things, multiple entries of the same word are combined into a single card in the program. For example, the definition in the “bike” card is

> [noun] bicycle; motorcycle; motorbike\
[verb] to ride a bike\
[noun] a nest of wild bees, wasps, or hornets; a crowd or swarm of people

For convenience, the example sentence and the audio would be grabbed from the first available entry.

The below table summarizes the source of the data of an entry.
| Class Field | Raw Data (json) Field |
| ----------- | --------------------- |
| Word        | `data["hwi"]["hw"]`   |
| Part of Speech | `data["fl"]`       |
| Audio       | `data[“hwi”][“prs”][0][“sound”][“audio”]` [1] |
| Definitions | `data[“shortdef”]`    |
| Example sentence | See [vis](https://dictionaryapi.com/products/json#sec-2.vis). The first available example sentence is picked. [2] |

Notes:
- [1] There might be multiple pronunciation objects for a single entry, e.g. pajama01[🔈](https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama01.mp3) and pajama02[🔈](https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama02.mp3). It always picks the first one (not necessarily 01).
- [2] An entry might have multiple meanings, each might have different example sentences. For convenience, the one for the first meaning is picked.

### Export the Vocabularies to Anki
In order to add cards to a deck, the program uses [AnkiConnect](https://git.sr.ht/~foosoft/anki-connect#codeaddnotecode) APIs. In addition to the definition and example sentences, pronunciation sound tracks would also be included in the flash cards. This should be feasible since the addNote API allows embedded audio. To avoid duplication, `allowDuplicate` will be set to false in the request.

### Edge Cases
**Situation 1:** “Bike”: There is an “e-bike” entry

**Explanation:** Querying for “bike” would yield a result of “e-bike” since “e-bike” is a variant of “bike”.

**Solution:** Add a method to the Entry class to filter out the results that do not exactly match the query.


**Situation 2:** “Furtively”: There is a “Furtive” entry but not “Furtively”

**Explanation:** Querying for “Furtively” would yield a result of “Furtive” since the query option could be either headword or stems.

**Solution:** Ask the user if they want to add the other headwords instead.