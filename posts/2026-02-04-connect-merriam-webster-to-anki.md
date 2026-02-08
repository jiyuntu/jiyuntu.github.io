---
title: "Connect Merriam Webster to Anki"
date: "2026-02-04"
---

# Connect Merriam Webster to Anki

Code: https://github.com/jiyuntu/MW-flashcards

<video controls style="max-width:100%;height:auto;" src="/connect-merriam-webster-to-anki-demo.mov">Your browser does not support the video tag.</video>

## Motivation
I used to look up English words I didn’t understand on Google Translate. The problem with this approach was that I couldn't memorize the word and I repeatedly searched for the same words. This was not efficient nor effective, so I decided that the vocabularies had to go to [Anki](https://apps.ankiweb.net/), the most powerful flashcard I’d ever used, for me to review them. But honestly, it is a tedious process to manually look up words and enter them into Anki. So why not automate it?

## Design
The program aims to streamline two processes: (1) Look up a word (2) Add the word and its definition to Anki.

For (1), I could think of two approaches. One is to continue using Google Translate, the other is to consult a proper dictionary. I choose the latter because I prefer an elaboration instead of a translation. Among the online dictionaries, Merriam-Webster provides well-documented APIs, so I decided to query it for the definitions.

### Merriam Webster API
There are multiple product [entries](https://dictionaryapi.com/products/index) for various dictionaries on MW, such as Collegiate Dictionary and Learner’s Dictionary. I would start with the Collegiate Dictionary. Example [request url](https://dictionaryapi.com/products/api-collegiate-dictionary) and [sound track requests](https://dictionaryapi.com/products/json#sec-2.prs) can be found on their [developer center](https://dictionaryapi.com/).

### Parsing Merriam Webster Response
I thought about using existing libraries to parse MW response such as:

- [merriam-webster-api](https://github.com/pfeyz/merriam-webster-api/tree/master): Python scripts to call Merriam-Webster APIs. The main problems is that it was written years ago. The legacy code leads to two problems: (1) MW used to use XML as responses but has switched to json a while ago. The definitions were not sorted according to frequency in XML response, but they are in current json entries. (2) Some of the code was written in Python2 which is not supported now.

I didn’t find another Python script which I would prefer, so I decided to implement a parser by myself (and AI).

In my implementation, multiple entries of the same word are combined into a single card. For example, in the raw response, “bike” has two entry for being nouns and another entry for being a verb. In this program, they would be combined into one, with the top entry being the most frequently used

> [noun] bicycle; motorcycle; motorbike\
[verb] to ride a bike\
[noun] a nest of wild bees, wasps, or hornets; a crowd or swarm of people

For convenience, the example sentence and the pronunciation would be grabbed from the first available entry.

The below table maps the information to the raw json field
| Class Field | Raw Data (json) Field |
| ----------- | --------------------- |
| Word        | `data["hwi"]["hw"]`   |
| Part of Speech | `data["fl"]`       |
| Audio       | `data[“hwi”][“prs”][0][“sound”][“audio”]` [1] |
| Definitions | `data[“shortdef”]`    |
| Example sentence | See [vis](https://dictionaryapi.com/products/json#sec-2.vis). The first available example sentence is picked. [2] |

Notes:
- [1] There might be multiple pronunciation objects for a single entry, e.g. pajama01[🔈](https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama01.mp3) and pajama02[🔈](https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama02.mp3). I always pick the first one (not necessarily pajama01 though).
- [2] An entry might have multiple meanings, each might have different example sentences. For convenience, the example sentence for the first meaning is picked.

### Export the Vocabularies to Anki
In order to add cards to a deck, the program uses [AnkiConnect](https://git.sr.ht/~foosoft/anki-connect#codeaddnotecode) APIs. In addition to the definition and example sentences, pronunciation sound tracks would also be included in the flash cards. This should be feasible since the addNote API allows embedded audio. To avoid duplication, `allowDuplicate` will be set to false in the request.

### Edge Cases
**Situation 1** Looking up “Bike”, but it also returns an “e-bike” entry: Querying for “bike” would yield a result of “e-bike” since “e-bike” is a variant of “bike”.

**Solution:** Add a method to the Entry class to filter out the results that do not exactly match the query.


**Situation 2** Looking up “Furtively”, and found that there is a “Furtive” entry but not “Furtively”: There is not a "Furtively" entry, but querying for “Furtively” would yield the entry of “Furtive” since the query option could be either headword or stems.

**Solution:** Ask the user if they want to add the other headwords instead.